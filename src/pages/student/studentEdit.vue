<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :key="item.name" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" :model="studentForm" :rules="studentRules" ref="studentForm">
      <el-form-item label="学生学号：" align="left" prop="studentNo" required>
        <el-input v-model="studentForm.studentNo" class="width-300" disabled></el-input>
      </el-form-item>
      <el-form-item label="学生姓名：" align="left" prop="studentName">
        <el-input v-model="studentForm.studentName" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="学生性别：" align="left" prop="studentGender">
        <el-radio-group v-model="studentForm.studentGender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="入学年份：" align="left" prop="startYear">
        <el-input type="number" v-model.number="studentForm.startYear" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="出生年月：" align="left">
        <el-date-picker v-model="studentForm.studentBirthday" default-value="2003-01-01" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item align="left">
        <el-button type="primary" @click="updStudent('studentForm')">修改</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Visit from '@/resources/axios'
  import {StudentResource} from "../../resources";
  export default {
    name: "studentEdit",
    data() {
      return {
        breadCrumbList: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '学生管理',
            link: '/student-manage'
          },
          {
            name: '编辑学生',
          }
        ],
        studentId: '',
        studentForm: {
          studentNo: '',
          studentName: '',
          studentGender: '',
          studentBirthday: '',
          startYear: ''
        },
        studentData: {},
        studentRules: {
          studentNo: [
            {required: true, message: '学号不能为空！', trigger: 'blur'}
          ],
          studentName: [
            {required: true, message: '姓名不能为空！', trigger: 'blur'}
          ],
          studentGender: [
            {required: true, message: '性别不能为空！', trigger: 'blur'}
          ],
          startYear: [
            {required: true, message: '入学年份不能为空！', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      async getStudentOne(param = {}, id ,callback) {
        try {
          await Visit.get(StudentResource, param, id).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('获取学生信息失败！')
        }
      },
      async updateStudent(param = {}, body = {}, id, callback) {
        try {
          await Visit.update(StudentResource, param, body, id).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('更新学生信息失败！')
        }
      },
      initData() {
        this.studentForm.studentNo = this.studentData.studentNo;
        this.studentForm.studentName = this.studentData.studentName;
        this.studentForm.studentBirthday = this.studentData.studentBirthday;
        this.studentForm.studentGender = this.studentData.studentGender;
        this.studentForm.startYear = this.studentData.startYear;
      },
      updStudent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              action: 'update_one'
            };
            let body = {
              studentNo: this.studentForm.studentNo,
              studentName: this.studentForm.studentName,
              studentGender: this.studentForm.studentGender,
              studentBirthday: this.studentForm.studentBirthday,
              startYear: this.studentForm.startYear
            };
            this.updateStudent(param, body, this.studentId, res => {
              if (res.data.t === 1) {
                this.$message.success('更新成功！')
              } else if (res.data.t === 0) {
                this.$message.warning('更新失败！')
              } else if (res.data.t === -1) {
                this.$message.warning('该学生不存在！')
              }
            })
          }
        });
      },
      resetForm() {
        this.initData();
      }
    },
    mounted() {
      this.studentId = this.$route.params.id;
      this.getStudentOne({action: 'get_one'}, this.studentId, res => {
        this.studentData = res.data.t;
        this.initData();
      });

    }
  }
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 300px;
  }
</style>
