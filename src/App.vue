<template>
  <div id="app">
    <el-container class="back-color-grey">
      <el-header width="100%" class="padding-0">
        <top class="top-box-shadow"></top>
      </el-header>
      <el-container>
        <el-aside width="12%" class="margin-left-20 back-color-white left-box-shadow min-height">
          <left-nav></left-nav>
        </el-aside>
        <el-main>
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  body{
    margin: 0;
  }
  a{
    text-decoration: none;
  }
  .back-color-grey {
    background-color: #f2f2f3;
  }
  .margin-left-20 {
    margin-left: 20px;
  }
  .back-color-white {
    background-color: #fff;
  }
  .padding-0 {
    padding: 0;
  }
  .left-box-shadow {
    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.10);
  }
  .top-box-shadow {
    box-shadow: 0 2px 1px 0 rgba(0,0,0,0.10);
  }
  .min-height {
    min-height: 698px;
  }
</style>
