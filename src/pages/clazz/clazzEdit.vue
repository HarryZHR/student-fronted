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
        <i class="el-icon-edit el-input__icon cursor-pointer" slot="suffix" @click="openDialog">
        </i>
      </el-input>
      <el-dialog title="选择班主任" :visible.sync="dialogTableVisible">
        <div align="center">
          教师工号：
          <el-input class="width-150"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
          教师姓名：
          <el-input class="width-150"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary">搜索</el-button>
        </div>
        <el-table :data="teachers" align="center">
          <el-table-column property="teacherNum" label="工号" width="150" align="center"></el-table-column>
          <el-table-column property="name" label="姓名" width="200" align="center"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button>选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block text-right padding-top-20">
          <el-pagination background layout="prev, pager, next" @current-change="dialogPageChange" :total="teacherTotal * 10">
          </el-pagination>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import Visit from '@/resources/axios'
  import {TeacherResource} from "../../resources";
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
        teachers:[
          {
            "teacherNum": '001',
            "name": '李四'
          },
          {
            "teacherNum": '002',
            "name": '王五'
          }
        ],
        teacherTotal: 10
      }
    },
    methods: {
      dialogPageChange() {

      },
      openDialog() {
        this.dialogTableVisible = true
        Visit.get(TeacherResource, {action:'get_all'})
      }
    }
  }
</script>

<style scoped>
  .el-table td, .el-table th {
    padding: 5px 0;
  }
</style>
