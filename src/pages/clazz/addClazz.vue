<template>
  <div>
    <el-form label-width="80px" :model="clazzForm" ref="clazzForm" :rules="rules">
      <el-form-item label="年级号：" align="left" prop="grade">
        <el-input v-model="clazzForm.grade" placeholder="请输入年级号" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="班级号：" align="left" prop="clazzNum">
        <el-input v-model="clazzForm.clazzNum" placeholder="请输入班级号" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="班主任：" align="left">
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
            clazzNum: '',
            selectTeacherId: ''
          },
          teachers: [],
          rules: {
            grade: [
              { required: true, message: '年级不能为空', trigger: 'blur' }
            ],
            clazzNum: [
              { required: true, message: '班级号不能为空', trigger: 'blur' }
            ]
          }
        }
      },
      methods :{
        addClazz (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let body = {
                "grade": this.clazzForm.grade,
                "clazzNum": this.clazzForm.clazzNum,
                'headTeacherId': this.clazzForm.selectTeacherId
              }
              let config = {
                params:{action: 'save_one'}
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
                  }
                })
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        }
      },
      mounted () {
        this.$axios.get(getTeacher,{ params: {action: 'get_all'}})
          .then(res => {
            this.teachers = res.data;
        })
      }
    }
</script>

<style scoped>
  .width-300 {
    width: 300px;
  }
</style>
