<template>
    <div class="topBar clearfix">
      <div class="float-left">
        <a>aaa</a>
      </div>
      <div class="float-right">
        <i class="el-icon-service"></i>
        <span class="user">{{ user }}</span>
        <a class="font-size-12">退出登陆</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "top",
      data() {
          return{
            user: 'admin'
          }
      }
    }
</script>

<style scoped>

  .float-left {
    float: left;
  }
  .float-right {
    float: right;
  }
  .topBar {
    display: block;
    padding: 0 40px;
    height: 60px;
    line-height:60px;
    color: #778899;
  }
  .font-size-12{
    font-size: 12px;
  }
</style>
