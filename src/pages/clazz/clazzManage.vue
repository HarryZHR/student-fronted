<template>
  <div>
    <div class="text-left margin-bottom-20 padding-left-20">
      <el-button type="primary" @click="toAddClazz('single')">新建班级</el-button>
      <el-button type="primary" @click="toAddClazz('multi')">批量创建</el-button>
    </div>
    <div class="padding-left-20">
      <div class="text-left margin-bottom-20">
        <el-select v-model="selectGrade" placeholder="年级" class="margin-right-20">
          <el-option v-for="item in grades" :label="item" :value="item">
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
        <el-table-column align="center" prop="grade" label="年级" width="180">
        </el-table-column>
        <el-table-column align="center" prop="startClazzNum" label="班级号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="headTeacherName" label="班主任">
        </el-table-column>
        <el-table-column align="center" prop="studentNum" label="学生数">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="block text-right padding-top-20">
        <el-pagination background layout="prev, pager, next" @current-change="pageChange" :total="total * 10">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
    import { getClazz } from '../../resources/index'
    export default {
      data() {
        return {
          currentPage: 0,
          clazzList: [
          ],
          total: '',
          currPage: '',
          selectGrade: '',
          grades: [],
          selectClazzNum: '',
          clazzNums: [],
          inputHeadTeacher: ''
        }
      },
      methods: {
        // 改变页码或者搜索时调用，搜索时之间传参数为:1
        pageChange (page){
          this.$axios.get(getClazz,{params: {
              action: 'get_all_page',
              pageNo: page,
              grade: this.selectGrade,
              clazzNum: this.selectClazzNum,
              headTeacherName: this.inputHeadTeacher
            }
          }).then(res => {
            this.clazzList = res.data.pageList
            this.total = res.data.total
            this.currPage = res.data.pageNum
          })
        },
        toAddClazz (flag){
          if (flag === 'single') {
            this.$router.push({
              name: 'addClazz',
              query: {
                addType: 'single'
              }
            })
          } else if (flag === 'multi') {
            this.$router.push({
              name: 'addClazz',
              query: {
                addType: 'multi'
              }
            })
          }
        },
        handleClick(row) {
          console.log(row);
        }
      },
      mounted () {
        // 页面加载获取所有班级
        this.$axios.get(getClazz,{params: {
            action: 'get_all_page'
          }
        }).then(res => {
          this.clazzList = res.data.pageList
          this.total = res.data.total
          this.currPage = res.data.pageNum
        })
        // 获取所有班级号以及年级号
        this.$axios.get(getClazz,{params: {
            action: 'get_clazz_info'
          }
        }).then(res => {
          this.grades = res.data.grades
          this.clazzNums = res.data.clazzNums
          this.grades.splice(0, 0, '')
          this.clazzNums.splice(0, 0, '')
        })
      },
      created () {
        window.aaa = this
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
