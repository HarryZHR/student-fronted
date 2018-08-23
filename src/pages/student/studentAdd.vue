<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :key="item.name" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" :model="studentForm" :rules="studentRules" ref="studentForm">
      <el-form-item label="学生学号：" align="left" prop="studentNo">
        <el-input v-model="studentForm.studentNo" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名：" align="left" prop="studentName">
        <el-input v-model="studentForm.studentName" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="入学年份：" align="left" prop="startYear">
        <el-input type="number" v-model.number="studentForm.startYear" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="学生性别：" align="left" prop="studentGender">
        <el-radio-group v-model="studentForm.studentGender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生年月：" align="left">
        <el-date-picker v-model="studentForm.studentBirthday" value-format="yyyy-MM-dd" @change="changedate" default-value="2003-01-01" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item align="left">
        <el-button type="primary" @click="addStudent('studentForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {StudentResource} from "../../resources";
  import Visit from '@/resources/axios'
  export default {
    name: "studentAdd",
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
            name: '新建学生'
          }
        ],
        studentForm:{
          studentNo: '',
          studentName: '',
          studentGender: '',
          studentBirthday: '',
          startYear: ''
        },
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
      async saveStudent (param, body, callback) {
        try {
          await Visit.save(StudentResource, param, body).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('保存失败！')
        }
      },
      changedate() {

      },
      addStudent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              action: 'save_one'
            };
            let body = {
              studentNo: this.studentForm.studentNo,
              studentName: this.studentForm.studentName,
              studentGender: this.studentForm.studentGender,
              studentBirthday: this.studentForm.studentBirthday,
              startYear: this.studentForm.startYear
            };
            this.saveStudent(param, body, res => {
              if (res.data.t === 1) {
                this.$message.success('保存成功！')
              } else if (res.data.t === 0) {
                this.$message.warning('保存失败！')
              } else if (res.data.t === -1) {
                this.$message.warning('学号重复，保存失败！')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 300px;
  }
</style>
