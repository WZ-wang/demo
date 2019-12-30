<template>
  <div class="box">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width:265px">
      <el-tab-pane label="手机号密码" name="first">手机号密码</el-tab-pane>
      <el-tab-pane label="验证码登录" name="second">验证码登录</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
.box{
    width: 300px;
    height:300px;
    border-radius: 5px;
    border: 2px solid red
}
</style>