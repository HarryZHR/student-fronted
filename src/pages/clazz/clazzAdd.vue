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
        <el-cascader :options="clazzType" change-on-select v-model="clazzForm.grade" class="width-300"></el-cascader>
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
      <el-form-item v-if="addType === 'single'" label="班主任：" class="text-left margin-bottom-20">
        <el-input class="width-300" v-model="clazzForm.headTeacherName">
          <i class="el-icon-edit el-input__icon cursor-pointer" slot="suffix" @click="openDialog">
          </i>
        </el-input>
        <el-dialog title="选择班主任" :visible.sync="dialogTableVisible">
          <div align="center">
            教师工号：
            <el-input class="width-150" v-model="selectTeacherNum"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
            教师姓名：
            <el-input class="width-150" v-model="selectTeacherName"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="dialogPageChange(1)">搜索</el-button>
          </div>
          <el-table :data="teachers" align="center">
            <el-table-column property="teacherNum" label="工号" width="150" align="center"></el-table-column>
            <el-table-column property="teacherName" label="姓名" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button @click="selectTeacher(scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block text-right padding-top-20">
            <el-pagination background layout="prev, pager, next" @current-change="dialogPageChange" :total="teacherTotal * 10">
            </el-pagination>
          </div>
        </el-dialog>
      </el-form-item>
      <el-form-item align="left">
        <el-button :plain="true" type="primary" @click="clazzAdd('clazzForm')">立即创建</el-button>
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
          grade: [],
          startClazzNum: '',
          endClazzNum: '',
          headTeacherId: '',
          headTeacherName: ''
        },
        dialogTableVisible: false,
        teachers: [],
        teacherTotal:'',
        selectTeacherNum: '',
        selectTeacherName: '',
        clazzType: [
          {
            value: 'senior',
            label: '高中',
            children: [{
              value: 1,
              label: '一年级'
            }, {
              value: 2,
              label: '二年级'
            }, {
              value: 3,
              label: '三年级'
            }]
          }
        ],
        rules: {
          grade: [
            {required: true, message: '年级不能为空', trigger: 'blur'},
            {
             validator: (rule, value, callback) => {
               if (value.length < 2) {
                 return callback(new Error('年级不能为空'))
               } else {
                 callback();
               }
             }, trigger: 'blur'
            }
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
          console.log(e);
          this.$message.warning('出错，创建班级失败！')
        }
      },
      async getTeacher(param, callback) {
        try {
          await Visit.get(TeacherResource, param).then(function (res) {
            callback && callback(res)
          })
        } catch (e) {
          console.log(e);
          this.$message.warning('获取教师失败')
        }
      },
      clazzAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {action: 'save_list'};
            let body = {
              "type": this.clazzForm.grade[0],
              "grade": this.clazzForm.grade[1],
              "startClazzNum": this.clazzForm.startClazzNum,
              "endClazzNum": this.clazzForm.endClazzNum,
              'headTeacherId': this.clazzForm.headTeacherId
            };
            this.saveClazz(param, body, res => {
              if (res.data.t.colNum === 1) {
                this.$message.success('创建班级成功！');
                this.$router.push({
                  name: 'clazzManagePage'
                })
              } else if (res.data.t.colNum === 0) {
                this.$message.error('创建班级失败，班级已经存在！');
              } else if (res.data.t.colNum > 1) {
                this.$message.success('批量创建成功！新增' + res.data.t.colNum + '个班级');
                this.$router.push({
                  name: 'clazzManagePage'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      openDialog() {
        this.dialogTableVisible = true;
        this.getTeacher({action: 'get_page'}, res => {
          this.teachers = res.data.t;
          this.teacherTotal = res.data.totalPages
        })
      },
      dialogPageChange(page) {
        let param = {
          action: 'get_page',
          pageNo: page,
          teacherNum: this.selectTeacherNum,
          teacherName: this.selectTeacherName
        };
        this.getTeacher(param, res => {
          this.teachers = res.data.t;
          this.teacherTotal = res.data.totalPages
        })
      },
      selectTeacher(row) {
        console.log(row);
        this.clazzForm.headTeacherId = row.teacherId;
        this.clazzForm.headTeacherName = row.teacherName;
        this.dialogTableVisible = false
      }
    },
    mounted() {
      this.getTeacher({action: 'get_all'}, res => {
        this.teachers = res.data.t;
      });
      this.addType = this.$route.query.addType;
      this.rules.startClazzNum[0].message = this.addType === 'single' ? '班级号不能为空' : '至少输入开始班级号';
      this.breadCrumbList[2].name = this.addType === 'single' ? '新建班级' : '批量创建'
    },
    created() {
      window.aaa = this
    }
  }
</script>

<style scoped>

</style>
