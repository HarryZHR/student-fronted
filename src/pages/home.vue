<template>
  <div>
    <el-container>
      <el-header>
        <top></top>
      </el-header>
      <el-container>
        <el-aside width="200px" style="border: 1px solid">
          <left-nav></left-nav>
        </el-aside>
        <el-main>
          <!--<clazz-manage></clazz-manage>-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Top from "@/components/top";
  import LeftNav from "@/components/leftNav";
  import ClazzManage from "@/pages/clazzManage";
  export default {
    components: {ClazzManage, LeftNav, Top},
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
