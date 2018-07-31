<template>
  <div id="app">
    <el-container>
      <el-header>
        <top></top>
      </el-header>
      <el-container>
        <el-aside width="200px" style="border: 1px solid">
          <left-nav></left-nav>
        </el-aside>
        <el-main>
          <home></home>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Top from "./components/top";
  import LeftNav from "./components/leftNav";
  import Home from "./pages/home";
  export default {
    name: 'App',
    components: {Home, LeftNav, Top},
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
</style>
