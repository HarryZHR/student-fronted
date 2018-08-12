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
          <el-table-column property="teacherName" label="姓名" width="200" align="center"></el-table-column>
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
            <el-button @click="selectTeacher(scope.row)">选择</el-button>
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
  import {TeacherResource} from '../../resources/index'
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
      async getTeacher(param = {}, callback) {
        try {
          await Visit.get(TeacherResource, param).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e)
          this.$message.error('获取教师信息失败')
        }

      },
      openDialog() {
        this.dialogTableVisible = true
        this.getTeacher({action: 'get_page'}, res => {
          this.teachers = res.data.pageList
          this.teacherTotal = res.data.total
        })
      },
      dialogPageChange(page) {
        let param = {
          action: 'get_page',
          pageNo: page,
          teacherNum: this.selectTeacherNum,
          teacherName: this.selectTeacherName
        }
        this.getTeacher(param, res => {
          this.teachers = res.data.pageList
          this.teacherTotal = res.data.total
        })
      },
      selectTeacher(row) {
        this.headTeacher.teacherId = row.id
        this.headTeacher.teacherName = row.name
        this.dialogTableVisible = false
      }
    }
  }
</script>

<style scoped>
  .el-table td, .el-table th {
    padding: 5px 0;
  }
</style>
