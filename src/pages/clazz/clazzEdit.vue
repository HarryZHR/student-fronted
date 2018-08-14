<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text-left margin-bottom-20">
      班级名：<span>{{ clazzName }}</span>
    </div>
    <div class="text-left margin-bottom-20">
      班主任：
      <el-input class="width-200" v-model="headTeacher.teacherName">
        <i class="el-icon-edit el-input__icon cursor-pointer" slot="suffix" @click="openDialog">
        </i>
      </el-input>
      <el-dialog title="选择班主任" :visible.sync="dialogTableVisible">
        <div align="center">
          教师工号：
          <el-input class="width-150" v-model="selectTeacherNum"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
          教师姓名：
          <el-input class="width-150" v-model="selectTeacherName"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" @click="dialogPageChange(1)">搜索</el-button>
        </div>
        <el-table :data="teachers" align="center">
          <el-table-column property="teacherNum" label="工号" width="150" align="center"></el-table-column>
          <el-table-column property="teacherName" label="姓名" width="150" align="center"></el-table-column>
          <el-table-column property="clazzName" label="管理班级" width="150" align="center"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button @click="selectTeacher(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block text-right padding-top-20">
          <el-pagination background layout="prev, pager, next" @current-change="dialogPageChange" :total="teacherTotal * 10">
          </el-pagination>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table>
        <el-table-column property="studentNum" label="学号" width="150" align="center"></el-table-column>
        <el-table-column property="studentName" label="姓名" width="200" align="center"></el-table-column>
        <el-table-column property="studentGender" label="性别" width="200" align="center"></el-table-column>
        <el-table-column property="studentAge" label="年龄" width="200" align="center"></el-table-column>
        <el-table-column property="studentPost" label="职务" width="200" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button>选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block text-right padding-top-20">
        <el-pagination background layout="prev, pager, next" @current-change="dialogPageChange" :total="teacherTotal * 10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Visit from '@/resources/axios'
  import {TeacherResource, ClazzResource} from '../../resources/index'
  export default {
    name: "clazzEdit",
    data() {
      return{
        breadCrumbList: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '班级管理',
            link: '/clazz-manage'
          },
          {
            name: '编辑班级',
          }
        ],
        clazzName: '高三(8)班',
        headTeacher:{
          teacherName: '李四',
          teacherId: '212121'
        },
        dialogTableVisible: false,
        teachers:[],
        teacherTotal: '',
        selectTeacherNum: '',
        selectTeacherName: ''
      }
    },
    methods: {
      async getClazz(param = {}, id, callback) {
        try {
          await Visit.get(ClazzResource, param, id).then(function (res) {
            callback && callback(res)
          })
        }catch (e) {
          console.log(e);
          this.$message.error('获取班级信息失败！')
        }

      },
      async getTeacher(param = {}, callback) {
        try {
          await Visit.get(TeacherResource, param).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('获取教师信息失败')
        }

      },
      openDialog() {
        this.dialogTableVisible = true;
        this.getTeacher({action: 'get_page'}, res => {
          this.teachers = res.data.t;
          this.teacherTotal = res.data.totalPages
          for (let i = 0; i < this.teachers.length; i++) {
            if (this.teachers[i].clazzName === null) {

            }
          }
        })
      },
      dialogPageChange(page) {
        let param = {
          action: 'get_page',
          pageNo: page,
          teacherNum: this.selectTeacherNum,
          teacherName: this.selectTeacherName
        };
        this.getTeacher(param, res => {
          this.teachers = res.data.t;
          this.teacherTotal = res.data.totalPages
        })
      },
      selectTeacher(row) {
        this.headTeacher.teacherId = row.teacherId;
        this.headTeacher.teacherName = row.teacherName;
        this.dialogTableVisible = false
      }
    },
    mounted() {
      this.clazzId = this.$route.params.id
      this.getClazz({}, this.clazzId, res => {
        this.clazzName = res.data.t.clazzName;
        this.headTeacherName = res.data.t.headTeacherName
      })
    }
  }
</script>

<style scoped>
  .el-table td, .el-table th {
    padding: 5px 0;
  }
</style>
