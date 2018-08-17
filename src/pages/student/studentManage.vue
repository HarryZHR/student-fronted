<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :key="item.name" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text-left margin-bottom-20">
      <el-button type="primary" @click="toAddStudent">新建学生</el-button>
      <!--<el-button type="primary" @click="importStudent">批量导入</el-button>-->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div>
      <div class="text-left margin-bottom-20">
        <el-input class="width-200 margin-right-20" v-model="inputStudentNum" placeholder="学号"></el-input>
        <el-input class="width-200 margin-right-20" v-model="inputStudentName" placeholder="姓名"></el-input>
        <el-input class="width-200 margin-right-20" v-model="inputClazzName" placeholder="班级"></el-input>
        <el-button type="primary" plain @click="pageChange(1)">搜索</el-button>
      </div>
      <el-table :data="students" stripe style="width: 100%">
        <el-table-column align="center" prop="studentNum" label="学号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="studentName" label="姓名" width="180">
        </el-table-column>
        <el-table-column align="center" prop="studentGenderValue" label="性别">
        </el-table-column>
        <el-table-column align="center" prop="studentAge" label="年龄">
        </el-table-column>
        <el-table-column align="center" prop="clazzName" label="班级">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <router-link :to="`/clazz/${scope.row.studentId}/view`" style="color: #33aaff;">查看</router-link>
            <router-link :to="`/clazz/${scope.row.studentId}/edit`" style="color: #33aaff;">编辑</router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="block text-right padding-top-20">
        <el-pagination background layout="prev, pager, next" @current-change="pageChange" :total="total * 10"
                       :current-page="currPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Visit from '@/resources/axios'
  import {StudentResource} from "../../resources";

  export default {
    name: "studentManage",
    data() {
      return {
        breadCrumbList: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '学生管理',
            link: '/student-manage'
          }
        ],
        students: [],
        total: '',
        currPage: 1,
        inputStudentNum: '',
        inputStudentName: '',
        inputClazzName: ''
      }
    },
    methods: {
      async getStudent(param, callback) {
        try {
          Visit.get(StudentResource, param).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.error('获取学生信息失败！')
        }
      },
      toAddStudent() {
        this.$router.push({
          name: 'studentAddPage'
        })
      },
      importStudent() {

      },
      pageChange() {

      }
    },
    mounted() {
      this.getStudent({action: 'get_list'}, res => {
        this.students = res.data.t;
        this.total = res.data.totalPages;
      })
    }
  }
</script>

<style scoped>

</style>
