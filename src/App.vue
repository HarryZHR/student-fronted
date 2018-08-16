<template>
  <div id="app">
    <el-container class="back-color-grey position-abs width-height-100">
      <el-header width="100%" class="padding-0">
        <top class="top-box-shadow back-color-white height-60 "></top>
      </el-header>
      <el-container class="padding-top-20 padding-bottom-20">
        <el-aside width="12%" class="margin-left-20 back-color-white left-box-shadow">
          <left-nav></left-nav>
        </el-aside>
        <el-main class="padding-0 padding-left-20 padding-right-20">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Top from "./components/top";
  import LeftNav from "./components/leftNav";
  import Home from "./pages/home";
  import ClazzManage from "./pages/clazz/clazzManage";

  export default {
    name: 'App',
    components: {ClazzManage, Home, LeftNav, Top},
  }
</script>

<style>
  @import '../style/common.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  body {
    margin: 0;
    height: 100%;
  }
</style>
