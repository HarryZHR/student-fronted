<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :key="item.name" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text-left margin-bottom-20 font-14 color-gray">
      班级名：<span>{{ clazzName }}</span>
    </div>
    <div class="text-left margin-bottom-20 font-14 color-gray">
      班主任：
      <el-input class="width-200" v-model="headTeacher.teacherName">
        <i class="el-icon-edit el-input__icon cursor-pointer" slot="suffix" @click="openDialog('teacher')">
        </i>
      </el-input>
      <el-button type="warning" :disabled="headTeacher.teacherName === '暂未设置'" @click="cancelHeadTeacher">解除关系</el-button>
    </div>
    <div>
      <div class="text-left margin-bottom-20 font-14 color-gray">
        所属学生：
        <el-button @click="openDialog('student')">添加学生</el-button>
      </div>
      <el-table>
        <el-table-column property="studentNum" label="学号" width="150" align="center"></el-table-column>
        <el-table-column property="studentName" label="姓名" width="200" align="center"></el-table-column>
        <el-table-column property="studentGender" label="性别" width="200" align="center"></el-table-column>
        <el-table-column property="studentAge" label="年龄" width="200" align="center"></el-table-column>
        <el-table-column property="studentPost" label="职务" width="200" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block text-right padding-top-20">
        <el-pagination background layout="prev, pager, next" @current-change="dialogPageChange" :total="studentTotal * 10" :current-page="studentCurrPage">
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="select === 'teacher' ? '选择班主任' : '选择学生'" :visible.sync="dialogTableVisible">
      <div align="center">
        <label v-text="select === 'teacher' ? '教师工号：' : '学生学号：'"></label>
        <el-input class="width-150" v-model="selectNo"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
        <label v-text="select === 'teacher' ? '教师姓名：' : '学生姓名：'"></label>
        <el-input class="width-150" v-model="selectName"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="dialogPageChange(1)">搜索</el-button>
      </div>
      <el-table :data="dialogData" align="center">
        <el-table-column :property="select === 'teacher' ? 'teacherNum' : 'studentNo'" :label="select === 'teacher' ? '工号' : '学号'" width="150" align="center"></el-table-column>
        <el-table-column :property="select === 'teacher' ? 'teacherName' : 'studentName'" label="姓名" width="150" align="center"></el-table-column>
        <!--<el-table-column property="clazzName" label="管理班级" width="150" align="center"></el-table-column>-->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button v-if="select === 'teacher'" :disabled="scope.row.clazzName !== null" @click="selectTeacher(scope.row)">选择</el-button>
            <el-button v-if="select === 'student'" @click="selectStudent(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block text-right padding-top-20">
        <el-pagination background layout="prev, pager, next" @current-change="dialogPageChange" :total="dialogDataTotal * 10" :current-page="dialogDataCurrPage">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Visit from '@/resources/axios'
  import {TeacherResource, ClazzResource, StudentResource} from '../../resources/index'
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
        clazzName: '',
        headTeacher:{
          teacherName: '',
          teacherId: ''
        },
        dialogTableVisible: false,
        dialogData:[],
        dialogDataTotal: '',
        dialogDataCurrPage: 1,
        studentTotal: '',
        studentCurrPage: 1,
        selectNo: '',
        selectName: '',
        clazzId: '',
        select: ''
      }
    },
    methods: {
      async getStudent(param, callback) {
        try {
          Visit.get(StudentResource, param).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('获取学生信息失败！')
        }
      },
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
      async saveClazz(param, body, callback) {
        try {
          await Visit.save(ClazzResource, param, body).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('出错，操作失败！')
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
      async updateClazz(param, body, id, callback) {
        try {
          await Visit.update(ClazzResource, param, body, id ).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error("修改班级信息失败!")
        }
      },
      updClazz(teacherId, message) {
        let id = this.clazzId;
        let body = {
          headTeacherId: teacherId
        };
        this.updateClazz({},body, id, res => {
          if (res.data.t === 1) {
            this.$message.success( message + '成功！')
          } else {
            this.$message.warning( message + '失败！')
          }
        })
      },
      openDialog(select) {
        this.dialogTableVisible = true;
        this.select = select;
        // 选择班主任
        if (select === 'teacher') {
          this.getTeacher({action: 'get_page',pageType: 'headTeacher'}, res => {
            this.dialogData = res.data.t;
            this.dialogDataTotal = res.data.totalPages;
          })
        } else if (select === 'student') {
          this.getStudent({action: 'get_list'}, res => {
            this.dialogData =res.data.t;
            this.dialogDataTotal = res.data.totalPages;
          })
        }
      },
      dialogPageChange(page) {
        if (this.select === 'teacher') {
          this.dialogDataCurrPage = page;
          let param = {
            action: 'get_page',
            pageNo: page,
            pageSize: 5,
            pageType: 'headTeacher',
            teacherNum: this.selectNo,
            teacherName: this.selectName
          };
          this.getTeacher(param, res => {
            this.dialogData = res.data.t;
            this.dialogDataTotal = res.data.totalPages
          });
        } else if (this.select === 'student') {
          this.dialogDataCurrPage = page;
          let param = {
            action: 'get_list',
            pageNo: page,
            pageSize: 5,
            studentNo: this.selectNo,
            teacherName: this.selectName
          };
          this.getStudent(param, res => {
            this.dialogData = res.data.t;
            this.dialogDataTotal = res.data.totalPages
          });
        }
      },
      selectTeacher(row) {
        this.headTeacher.teacherId = row.teacherId;
        this.headTeacher.teacherName = row.teacherName;
        this.dialogTableVisible = false;
        this.updClazz(row.teacherId, '修改');
      },
      selectStudent(row) {
        let param = {
          action: 'save_clazz_student',
          studentId: row.studentId,
          clazzId: this.clazzId
        };
        this.saveClazz(param,{},res => {

        });
      },
      cancelHeadTeacher() {
        this.updClazz(null, '解除');
        this.headTeacher.teacherName = '暂未设置'

      }
    },
    mounted() {
      this.clazzId = this.$route.params.id;
      this.getClazz({}, this.clazzId, res => {
        this.clazzName = res.data.t.clazzName;
        this.headTeacher.teacherName = res.data.t.headTeacherName
      })
    }
  }
</script>

<style scoped>
  .el-table td, .el-table th {
    padding: 5px 0;
  }

  .bottom {
    position: fixed;
    bottom: 20px;
  }
</style>
