<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :key="item.name" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" :model="teacherForm" :rules="teacherRules" ref="teacherForm">
      <el-form-item label="教师工号：" align="left" prop="teacherNum">
        <el-input v-model="teacherForm.teacherNum" class="width-300"></el-input>
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
        <el-date-picker v-model="teacherForm.teacherBirthday" value-format="yyyy-MM-dd" @change="changedate" default-value="1995-01-01" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item align="left">
        <el-button type="primary" @click="addTeacher('teacherForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Visit from '@/resources/axios'
  import {TeacherResource} from "../../resources";

  export default {
    name: "teacherAdd",
    data() {
      return {
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
            name: '新建教师'
          }
        ],
        teacherForm:{
          teacherNum: '',
          teacherName: '',
          teacherGender: '',
          teacherBirthday: ''
        },
        teacherRules: {
          teacherNum: [
            { required: true, message: '工号不能为空！', trigger: 'blur'},
          ],
          teacherName: [
            { required: true, message: '姓名不能为空！', trigger: 'blur'}
          ],
          teacherGender: [
            { required: true, message: '性别不能为空！', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      window.aaa = this
    },
    methods: {
      changedate (date) {
        console.log(date)
        this.teacherForm.teacherBirthday = date
      },
      async saveTeacher (param ,body, callback){
        try {
          await Visit.save(TeacherResource, param, body ).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('保存失败！')
        }
      },
      addTeacher(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              action: 'save_one'
            };
            let body = {
              teacherNum: this.teacherForm.teacherNum,
              teacherName: this.teacherForm.teacherName,
              teacherGender: this.teacherForm.teacherGender,
              teacherBirthday: this.teacherForm.teacherBirthday
            };
            this.saveTeacher(param, body, res => {
              if (res.data.t === 1){
                this.$message.success('保存成功！')
              } else if (res.data.t === 0) {
                this.$message.warning('保存失败！')
              }
            })
          }else {
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
