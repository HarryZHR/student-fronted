<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :key="item.name" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text-left margin-bottom-20">
      <el-button type="primary" @click="toAddTeacher">新建教师</el-button>
    </div>
    <div>
      <div class="text-left margin-bottom-20">
        <el-input v-model="teacherNumKey" class="width-200 margin-right-20" placeholder="工号" ></el-input>
        <el-input v-model="teacherNameKey" class="width-200 margin-right-20" placeholder="姓名" ></el-input>
        <el-button type="primary" plain @click="pageChange(1)">搜索</el-button>
      </div>
      <el-table :data="teachers" stripe style="width: 100%">
        <el-table-column align="center" prop="teacherNum" label="工号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="teacherName" label="姓名" width="180">
        </el-table-column>
        <el-table-column align="center" prop="teacherGenderValue" label="性别" width="180">
        </el-table-column>
        <el-table-column align="center" prop="teacherAge" label="年龄" width="180">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <router-link :to="`/teacher/${scope.row.teacherId}/view`" style="color: #33aaff;">查看</router-link>
            <router-link :to="`/teacher/${scope.row.teacherId}/edit`" style="color: #33aaff;">编辑</router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="block text-right padding-top-20">
      <el-pagination background layout="prev, pager, next" @current-change="pageChange" :total="total * 10" :current-page="currPage">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
  import Visit from '@/resources/axios'
  import {TeacherResource} from "../../resources";
  export default {
    data() {
      return {
        breadCrumbList: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '教师管理',
            link: '/teacher-manage'
          }
        ],
        teachers: [],
        total: '',
        currPage: 1,
        teacherNumKey: '',
        teacherNameKey: ''
      }
    },
    methods: {
      async getTeacher(param = {}, callback) {
        try {
          await Visit.get(TeacherResource, param ).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('获取教师列表失败！')
        }
      },
      toAddTeacher() {
        this.$router.push({
          path: '/teacher-add'
        })
      },
      pageChange(page) {
        let param = {
          action: 'get_page',
          pageNo: page,
          teacherNum: this.teacherNumKey,
          teacherName: this.teacherNameKey,
          pageType: null
        };
        this.currPage = page;
        this.getTeacher(param, res=> {
          this.teachers = res.data.t;
          this.total = res.data.totalPages
        })
      }
    },
    mounted() {
      this.getTeacher({action: 'get_page'}, res=> {
        this.teachers = res.data.t;
        this.total = res.data.totalPages
      })
    }
  }
</script>

<style scoped>

</style>
