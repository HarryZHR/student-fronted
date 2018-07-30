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
          <el-button type="primary" round class="width-300">登  陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          username: '',
          password: '',
          role: 1
        }
      }
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
