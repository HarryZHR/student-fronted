<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :key="item.name" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text-left margin-bottom-20">
      <el-button type="primary" @click="toAddClazz('single')">新建班级</el-button>
      <el-button type="primary" @click="toAddClazz('multi')">批量创建</el-button>
    </div>
    <div>
      <div class="text-left margin-bottom-20">
        <el-select v-model="selectGrade" placeholder="年级" class="margin-right-20">
          <el-option v-for="item in grades" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="selectClazzNum" placeholder="班级号" class="margin-right-20">
          <el-option v-for="item in clazzNums" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-input class="width-200 margin-right-20" v-model="inputHeadTeacher" placeholder="班主任"></el-input>
        <el-button type="primary" plain @click="pageChange(1)">搜索</el-button>
      </div>
      <el-table :data="clazzList" stripe style="width: 100%">
        <el-table-column align="center" prop="type" label="年级" width="180">
        </el-table-column>
        <el-table-column align="center" prop="startClazzNum" label="班级号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="headTeacherName" label="班主任">
        </el-table-column>
        <el-table-column align="center" prop="studentNum" label="学生数">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <router-link :to="`/clazz/${scope.row.clazzId}/view`" style="color: #33aaff;">查看</router-link>
            <router-link :to="`/clazz/${scope.row.clazzId}/edit`" style="color: #33aaff;">编辑</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block text-right padding-top-20">
      <el-pagination background layout="prev, pager, next" @current-change="pageChange" :total="total * 10" :current-page="currPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {ClazzResource} from '../../resources/index'
  import Clazz from '@/resources/axios'

  export default {
    data() {
      return {
        clazzList: [],
        total: '',
        currPage: 1,
        selectGrade: '',
        selectGradeNum: '',
        grades: [],
        selectClazzNum: '',
        clazzNums: [],
        inputHeadTeacher: '',
        // 面包屑
        breadCrumbList: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '班级管理',
            link: '/clazz-manage'
          }
        ]
      }
    },
    methods: {
      async getClazz (param = {}, callback) {
        try {
          await Clazz.get(ClazzResource, param).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('获取班级信息失败！')
        }
      },
      // 改变页码或者搜索时调用，搜索时直接传参数为:1
      pageChange(page) {
        let param = {
          action: 'get_all_page',
          pageNo: page,
          grade: this.selectGradeNum,
          clazzNum: this.selectClazzNum,
          headTeacherName: this.inputHeadTeacher
        };
        this.currPage = page;
        this.getClazz(param, res => {
          this.clazzList = res.data.t;
          this.total = res.data.totalPages;
        })
      },
      toAddClazz(flag) {
        if (flag === 'single') {
          this.$router.push({
            name: 'addClazzPage',
            query: {
              addType: 'single'
            }
          })
        } else if (flag === 'multi') {
          this.$router.push({
            name: 'addClazzPage',
            query: {
              addType: 'multi'
            }
          })
        }
      },
      getGrade(grade) {
        switch (grade) {
          case '一年级':
            return 1;
          case '二年级':
            return 2;
          case '三年级':
            return 3;
        }
      }
    },
    mounted() {
      // 页面加载获取所有班级
      this.getClazz({action: 'get_all_page'}, res => {
        this.clazzList = res.data.t;
        this.total = res.data.totalPages;
      });
      // 获取所有班级号以及年级号
      this.getClazz({action: 'get_clazz_info'}, res => {
        this.grades = res.data.t.grades;
        this.clazzNums = res.data.t.clazzNums;
        // 前面空出一个空的
        this.grades.splice(0, 0, '');
        this.clazzNums.splice(0, 0, '')
      })
    },
    watch: {
      selectGrade: function (val) {
        this.selectGradeNum = this.getGrade(val);
      }
    },
    created() {
      window.aaa = this
    }
  }
</script>

<style scoped>

</style>
