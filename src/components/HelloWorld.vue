<template>
  <div class="hello">
    <div>
      <table>
        <tr>
          <td>学号</td>
          <td>姓名</td>
          <td>性别</td>
          <td>年龄</td>
        </tr>
        <tr>
          <td>学号</td>
          <td>姓名</td>
          <td>性别</td>
          <td>年龄</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  }, 
  mounted () {
    this.$axios.get('/api/v1/student',{action: 'get_all'}).then(res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
