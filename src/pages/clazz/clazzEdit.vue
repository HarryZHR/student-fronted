<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text-left margin-bottom-20">
      班级名：<span>{{ clazzName }}</span>
    </div>
    <div class="text-left margin-bottom-20">
      班主任：
      <el-input class="width-200" v-model="headTeacherName">
        <i class="el-icon-edit el-input__icon cursor-pointer" slot="suffix" @click="dialogTableVisible = true">
        </i>
      </el-input>
      <el-dialog title="选择班主任" :visible.sync="dialogTableVisible">
        <div>
          班主任姓名：
          <el-input class="width-200"></el-input>
        </div>
        <el-table :data="teachers">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  export default {
    name: "clazzEdit",
    data() {
      return{
        breadCrumbList: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '班级管理',
            link: '/clazz-manage'
          },
          {
            name: '编辑班级',
          }
        ],
        clazzName: '高三(8)班',
        headTeacherName:'李四',
        dialogTableVisible: false,
        teachers:[]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
