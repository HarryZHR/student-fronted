<template>
  <el-row class="tac box-shadow">
    <el-col :span="24">
      <h5>学生管理系统</h5>
      <el-menu default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <router-link to="/clazz-manage">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">班级管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/teacher-manage">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">教师管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/student-manage">
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/test1">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">课程管理</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "leftNav",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
