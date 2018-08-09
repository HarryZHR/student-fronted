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
      班主任：<span>{{ headTeacherName }}</span>
    </div>
    <el-table :data="students" stripe style="width: 100%">
      <el-table-column align="center" prop="studentNum" label="学生学号" width="180">
      </el-table-column>
      <el-table-column align="center" prop="studentName" label="学生学号" width="180">
      </el-table-column>
      <el-table-column align="center" prop="birthday" label="出生年月">
      </el-table-column>
      <el-table-column align="center" prop="gender" label="性别">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="`/clazz/${scope.row.studentId}/view`" style="color: #33aaff;">查看</router-link>
          <router-link :to="`/clazz/${scope.row.studentId}/edit`" style="color: #33aaff;">编辑</router-link>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <div class="block text-right padding-top-20">
        <el-pagination background layout="prev, pager, next" @current-change="pageChange" :total="total * 10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "clazzDetail",
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
            name: '查看班级',
          }
        ],
        students:[
          {
            "studentId":1,
            "studentNum": 1,
            "studentName":'学生一',
            "birthday": '1994-03',
            "gender": '男'
          },
          {
            "studentId":2,
            "studentNum": 2,
            "studentName":'学生二',
            "birthday": '1994-03',
            "gender": '男'
          },
          {
            "studentId":3,
            "studentNum": 3,
            "studentName":'学生三',
            "birthday": '1994-03',
            "gender": '男'
          },
          {
            "studentId":4,
            "studentNum": 4,
            "studentName":'学生四',
            "birthday": '1994-03',
            "gender": '男'
          },
        ],
        clazzName: '高三(8)班',
        headTeacherName: '李四',
        total: 10
      }

    },
    methods: {
      pageChange() {

      }
    }
  }
</script>

<style scoped>

</style>
