<template>
  <div id="app">
    <el-container class="back-color-grey">
      <el-header width="100%" class="padding-0">
        <top class="top-box-shadow back-color-white height-60 "></top>
      </el-header>
      <el-container class="padding-top-20">
        <el-aside width="12%" class="margin-left-20 back-color-white left-box-shadow min-height">
          <left-nav></left-nav>
        </el-aside>
        <el-main class="padding-0 padding-left-20">
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

  body {
    margin: 0;
  }

  a {
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
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.10);
  }

  .top-box-shadow {
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.10);
  }

  .min-height {
    min-height: 698px;
  }

  .padding-top-20 {
    padding-top: 20px;
  }

  .padding-left-20 {
    padding-left: 20px;
  }

  .back-color-white {
    background-color: #fff;
  }

  .height-60 {
    height: 60px;
  }

  .width-200 {
    width: 200px;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .margin-bottom-20 {
    margin-bottom: 20px;
  }

  .margin-right-20 {
    margin-right: 20px;
  }

  .width-405 {
    width: 405px;
  }

  .width-300 {
    width: 300px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .width-150 {
    width: 150px;
  }
</style>
