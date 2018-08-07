<template>
  <div>
    <el-form label-width="80px" :model="clazzForm">
      <el-form-item label="年级号：" align="left">
        <el-input v-model="clazzForm.grade" placeholder="请输入年级号" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="班级号：" align="left">
        <el-input v-model="clazzForm.clazzNum" placeholder="请输入班级号" class="width-300"></el-input>
      </el-form-item>
      <el-form-item label="班主任：" align="left">
        <el-select v-model="clazzForm.selectTeacherId" placeholder="班主任姓名" class="width-300">
          <el-option v-for="teacher in teachers" :key="teachers.id" :label="teacher.name" :value="teacher.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item align="left">
        <el-button type="primary" @click="addClazz">立即创建</el-button>
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
        }
      },
      methods :{
        addClazz () {
          let body = {
            "grade": this.clazzForm.grade,
            "clazzNum": this.clazzForm.clazzNum,
            'headTeacherId': this.clazzForm.selectTeacherId
          }
          let config = {
            params:{action: 'save_one'}
          }
          this.$axios.post(
            getClazz, body, config)
            .then(res => {
              alert(res.data.msg);
            })
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
