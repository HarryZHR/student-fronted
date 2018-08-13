<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text-left margin-bottom-20">
      工号：<span>{{ teacherNum }}</span>
    </div>
    <div class="text-left margin-bottom-20">
      姓名：<span>{{ teacherName }}</span>
    </div>
    <div class="text-left margin-bottom-20">
      性别：<span>{{ teacherGender }}</span>
    </div>
    <div class="text-left margin-bottom-20">
      生日：<span>{{ teacherBirthday }}</span>
    </div>
  </div>
</template>

<script>
  import Visit from '@/resources/axios'
  import {TeacherResource} from "../../resources";
  export default {
    name: "teacherDetail",
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
          },
          {
            name: '查看教师'
          }
        ],
        teacherNum: '',
        teacherGender: '',
        teacherName: '',
        teacherBirthday: ''
      }
    },
    methods: {
      async getTeacher(param = {}, id, callback) {
        try {
          await Visit.get(TeacherResource, param, id).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e)
          this.$message.error('获取教师信息失败！')
        }
      }
    },
    mounted() {
      let id = this.$route.params.id
      this.getTeacher({action: 'get_one'},id, res => {
        this.teacherGender = res.data.t.teacherGender;
        this.teacherName = res.data.t.teacherName;
        this.teacherNum = res.data.t.teacherNum;
        this.teacherBirthday = res.data.t.teacherBirthday
      })
    }
  }
</script>

<style scoped>

</style>
