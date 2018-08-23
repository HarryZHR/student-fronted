<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :key="item.name" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" :model="teacherForm" :rules="teacherRules" ref="teacherForm">
      <el-form-item label="教师工号：" align="left" prop="teacherNum" required>
        <el-input v-model="teacherForm.teacherNum" class="width-300" disabled></el-input>
      </el-form-item>
      <el-form-item label="教师姓名：" align="left" prop="teacherName">
        <el-input v-model="teacherForm.teacherName" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="教师性别：" align="left" prop="teacherGender">
        <el-radio-group v-model="teacherForm.teacherGender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生年月：" align="left">
        <el-date-picker v-model="teacherForm.teacherBirthday" default-value="1980-01-01" type="date"  value-format="yyyy-MM-dd" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item align="left">
        <el-button type="primary" @click="updTeacher('teacherForm')">修改</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // import Vue from 'vue'
  import Visit from '@/resources/axios'
  import {TeacherResource} from "../../resources";
  // Vue.prototype.$methos.changedata = function () {
  //   alert('执行成功')
  // }
  export default {
    name: "teacherEdit",
    data() {
      return{
        breadCrumbList: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '教师管理',
            link: '/teacher-manage'
          },
          {
            name: '编辑教师',
          }
        ],
        teacherForm:{
          teacherNum: '',
          teacherName: '',
          teacherGender: '',
          teacherBirthday: ''
        },
        teacherData: {},
        teacherRules: {
          teacherName: [
            { required: true, message: '姓名不能为空！', trigger: 'blur'}
          ],
          teacherGender: [
            { required: true, message: '性能不能为空！', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      async getTeacher(param = {}, id, callback) {
        try {
          await Visit.get(TeacherResource, param, id).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('获取教师信息失败！')
        }
      },
      async updateTeacher(param = {}, body, id, callback) {
        try {
          await Visit.update(TeacherResource, param, body, id).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('保存教师信息失败！')
        }
      },
      initTeacherData () {
        this.teacherForm.teacherGender = this.teacherData.teacherGender;
        this.teacherForm.teacherName = this.teacherData.teacherName;
        this.teacherForm.teacherNum = this.teacherData.teacherNum;
        this.teacherForm.teacherBirthday = this.teacherData.teacherBirthday
      },
      updTeacher(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              action: 'update_one'
            };
            let body = {
              teacherName: this.teacherForm.teacherName,
              teacherGender: this.teacherForm.teacherGender,
              teacherBirthday: this.teacherForm.teacherBirthday
            };
            let id = this.$route.params.id;
            this.updateTeacher(param, body, id, res => {
              if (res.data.t === 1) {
                this.$message.success('修改成功！')
              } else {
                this.$message.warning('修改失败！')
              }
            })
          }
        })
      },
      resetForm() {
        // this.$refs.teacherForm.resetFields()
        // this.teacherForm.teacherBirthday =
        this.initTeacherData()
      }
    },
    mounted() {
      let id = this.$route.params.id;
      this.getTeacher({action: 'get_one'},id, res => {
        this.teacherData = res.data.t;
        this.initTeacherData()
      });
      window.aaa = this
    }
  }
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 300px;
  }
</style>
