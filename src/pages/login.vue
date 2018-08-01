<template>
  <div class="content">
    <div class="middle">
      <div class="login-input">
        <div>
          <h3>用户登陆</h3>
        </div>
        <div>
          <el-input
            placeholder="请输入用户名"
            v-model="username"
            class="width-300"
            clearable>
          </el-input>
        </div>
        <div class="margin-bottom-20"></div>
        <div>
          <el-input
            placeholder="请输入密码"
            v-model="password"
            class="width-300"
            type="password">
          </el-input>
        </div>
        <div class="margin-bottom-20"></div>
        <div>
          <el-radio-group v-model="role">
            <el-radio :label="1">学生</el-radio>
            <el-radio :label="2">教师</el-radio>
            <el-radio :label="3">管理员</el-radio>
          </el-radio-group>
        </div>
        <div class="margin-bottom-20"></div>
        <div>
          <el-button type="primary" round class="width-300" @click="login">登  陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getStudent,getTeacher} from "../resources";
  export default {
      name: "login",
      data() {
        return {
          username: '199900001',
          password: '123',
          role: 3,
          teacherIdentity: ''
        }
      },
      methods: {
        login: function () {
          if (this.role === 1) {
            this.$axios.get(getStudent,{params: {
                action: 'student_login',
                studentId: this.username,
                password: this.password
              } }).then(res => {
              console.log(res)
            }).catch(function (err) {
              console.log(err)
            })
          }else {
            this.$axios.get(getTeacher,{params: {
                action: 'teacher_login',
                teacherNum: this.username,
                password: this.password
              } }).then(res => {
              this.teacherIdentity = res.data.identity
              if (this.teacherIdentity === "admin") {
                // this.$router.push({ path: '/home'})
                window.loaction.href = window.location.host + '/#/home'
              }
            }).catch(function (err) {
              console.log(err)
            })
          }
        }

      },
      mounted () {
        window.aaa = this
      },
    }
</script>

<style scoped>
  .width-300 {
    width: 300px;
  }
  .margin-bottom-20 {
    margin-bottom: 20px;
  }
  .login-input {
    border: 1px solid brown;
    width: 400px;
    height: 280px;
    padding-top: 10px;
  }
  .content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    padding: 10%;
  }
</style>
