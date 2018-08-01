<template>
  <div>
    <div class="text-left margin-bottom-20 padding-left-20">
      <el-button type="primary">新建班级</el-button>
    </div>
    <div class="padding-left-20">
      <div class="text-left margin-bottom-20">
        <el-select v-model="selectGrade" placeholder="年级" class="margin-right-20">
          <el-option
            v-for="item in grades"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="selectClazzNum" placeholder="班级号" class="margin-right-20">
          <el-option
            v-for="item in clazzNums"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input class="width-200 margin-right-20" v-model="inputHeadTeacher" placeholder="班主任"></el-input>
        <el-button type="primary" plain>搜索</el-button>
      </div>
      <el-table
        :data="clazzList"
        stripe
        style="width: 100%">
        <el-table-column
          align="center"
          prop="grade"
          label="年级"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="clazzNum"
          label="班级号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="headTeacher"
          label="班主任">
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="文/理">
        </el-table-column>
        <el-table-column
          align="center"
          prop="studentNum"
          label="学生数">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="block text-right padding-top-20">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
    import { getClazz } from '../resources/index'
    export default {
      data() {
        return {
          clazzList: [
            {
              grade: '',
              clazzNum: '',
              headTeacherName: '',
              type: '',
              studentNum: ''
            }
          ],
          selectGrade: '',
          grades: {},
          selectClazzNum: '',
          clazzNums: {},
          inputHeadTeacher: ''
        }
      },
      mounted () {
        this.$axios.get(getClazz,{params: {action: 'get_all_page'}}).then(res => {
          this.clazzList = res.data
        })
      }
    }
</script>

<style scoped>
  .width-200 {
    width: 200px;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .margin-bottom-20 {
    margin-bottom: 20px;
  }
  .margin-right-20 {
    margin-right: 20px;
  }
  .padding-left-20 {
    padding-left: 20px;
  }
  .padding-top-20 {
    padding-top: 20px;
  }
</style>
