<template>
  <div>
    <el-form label-width="80px" :model="clazzForm" ref="clazzForm" :rules="rules">
      <el-form-item label="年级号：" align="left" prop="grade">
        <el-input v-model.number="clazzForm.grade" placeholder="请输入入学年份，如：2018" class="width-300"></el-input>
      </el-form-item>
      <el-form-item v-if="addType === 'single'" label="班级号：" align="left" prop="startClazzNum">
        <el-input v-model.number="clazzForm.startClazzNum" placeholder="请输入班级号" class="width-300"></el-input>
      </el-form-item>
      <el-form-item v-if="addType === 'multi'" label="班级号：" required class="width-400">
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
    import {getTeacher, getClazz} from "../../resources";
    export default {
      data() {
        return {
          clazzForm: {
            grade: '',
            selectTeacherId: '',
            startClazzNum: '',
            endClazzNum:''
          },
          teachers: [],
          rules: {
            grade: [
              { required: true, message: '年级不能为空', trigger: 'blur' },
              { type: 'number', message: '年级号必须为数字', trigger: 'blur'}
            ],
            startClazzNum: [
              { required: true, message:  '', trigger: 'blur'},
              { type: 'number', message: '班级号必须为数字', trigger: 'blur'}
            ],
            endClazzNum: [
              { required: false, trigger: 'blur'},
              { type: 'number', message: '班级号必须为数字', trigger: 'blur'},
              { validator:  (rule, value, callback) => {
                  if (this.clazzForm.startClazzNum >= value) {
                    return callback(new Error('结束班级号必须大于开始班级号'));
                  } else {
                    callback();
                  }
                }, trigger: 'blur'}
            ]
          },
          addType: ''
        }
      },
      methods: {
        addClazz (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let body = {
                "grade": this.clazzForm.grade,
                "startClazzNum": this.clazzForm.startClazzNum,
                "endClazzNum": this.clazzForm.endClazzNum,
                'headTeacherId': this.clazzForm.selectTeacherId
              }
              let config = {
                params:{action: 'save_list'}
              }
              this.$axios.post(getClazz, body, config)
                .then(res => {
                  if (res.data.colNum === 1) {
                    this.$message({
                      message: '创建班级成功！',
                      type: 'success'
                    });
                  } else if (res.data.colNum === 0) {
                    this.$message.error('创建班级失败，班级已经存在！');
                  } else if (res.data.colNum > 1) {
                    this.$message({
                      message: '批量创建成功！新增'+ res.data.colNum +'个班级',
                      type: 'success'
                    });
                  }
                })
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        },
      },
      mounted () {
        this.$axios.get(getTeacher,{ params: {action: 'get_all'}})
          .then(res => {
            this.teachers = res.data;
        })
        this.addType = this.$route.query.addType
        this.rules.startClazzNum[0].message = this.addType === 'single' ? '班级号不能为空' : '至少输入开始班级号'
      },
      created () {
        window.aaa = this
      }
    }
</script>

<style scoped>
  .width-300 {
    width: 300px;
  }
  .width-130{
    width: 130px;
  }
  .width-400{
    width: 405px;
  }
</style>
