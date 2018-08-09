<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in this.breadCrumbList" :to="{path: item.link}">{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="80px" :model="clazzForm" ref="clazzForm" :rules="rules">
      <el-form-item label="年级号：" align="left" prop="grade">
        <el-input v-model.number="clazzForm.grade" placeholder="请输入入学年份，如：2018" class="width-300"></el-input>
      </el-form-item>
      <el-form-item v-if="addType === 'single'" label="班级号：" align="left" prop="startClazzNum">
        <el-input v-model.number="clazzForm.startClazzNum" placeholder="请输入班级号" class="width-300"></el-input>
      </el-form-item>
      <el-form-item v-if="addType === 'multi'" label="班级号：" required class="width-405">
        <el-col :span="10">
          <el-form-item align="left" prop="startClazzNum">
            <el-input v-model.number="clazzForm.startClazzNum" placeholder="开始班级号"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="10">
          <el-form-item align="left" prop="endClazzNum">
            <el-input v-model.number="clazzForm.endClazzNum" placeholder="结束班级号"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item v-if="addType === 'single'" label="班主任：" align="left">
        <el-select v-model="clazzForm.selectTeacherId" placeholder="班主任姓名" class="width-300">
          <el-option v-for="teacher in teachers" :key="teachers.id" :label="teacher.name" :value="teacher.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item align="left">
        <el-button :plain="true" type="primary" @click="addClazz('clazzForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {TeacherResource, ClazzResource} from "../../resources";
  import Visit from '@/resources/axios';

  export default {
    data() {
      return {
        clazzForm: {
          grade: '',
          selectTeacherId: '',
          startClazzNum: '',
          endClazzNum: ''
        },
        teachers: [],
        rules: {
          grade: [
            {required: true, message: '年级不能为空', trigger: 'blur'},
            {type: 'number', message: '年级号必须为数字', trigger: 'blur'}
          ],
          startClazzNum: [
            {required: true, message: '', trigger: 'blur'},
            {type: 'number', message: '班级号必须为数字', trigger: 'blur'}
          ],
          endClazzNum: [
            {required: false, trigger: 'blur'},
            {type: 'number', message: '班级号必须为数字', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (this.clazzForm.startClazzNum >= value) {
                  return callback(new Error('结束班级号必须大于开始班级号'));
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ]
        },
        addType: '',
        // 面包屑
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
            name: '',
          }
        ]
      }
    },
    methods: {
      async saveClazz(param, body, callback) {
        try {
          await Visit.save(ClazzResource, param, body).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e)
          this.$message.warning('出错，创建班级失败！')
        }
      },
      async getTeacher(param, callback) {
        try {
          await Visit.get(TeacherResource, param).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e)
          this.$message.warning('获取教师失败')
        }
      },
      addClazz(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {action: 'save_list'}
            let body = {
              "grade": this.clazzForm.grade,
              "startClazzNum": this.clazzForm.startClazzNum,
              "endClazzNum": this.clazzForm.endClazzNum,
              'headTeacherId': this.clazzForm.selectTeacherId
            }
            this.saveClazz(param, body, res => {
              if (res.data.colNum === 1) {
                this.$message.success('创建班级成功！');
                this.$router.push({
                  name: 'clazzManagePage'
                })
              } else if (res.data.colNum === 0) {
                this.$message.error('创建班级失败，班级已经存在！');
              } else if (res.data.colNum > 1) {
                this.$message.success('批量创建成功！新增' + res.data.colNum + '个班级');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
    },
    mounted() {
      this.getTeacher({action: 'get_all'}, res => {
        this.teachers = res.data;
      })
      this.addType = this.$route.query.addType
      this.rules.startClazzNum[0].message = this.addType === 'single' ? '班级号不能为空' : '至少输入开始班级号'
      this.breadCrumbList[2].name = this.addType === 'single' ? '新建班级' : '批量创建'
    },
    created() {
      window.aaa = this
    }
  }
</script>

<style scoped>

</style>
