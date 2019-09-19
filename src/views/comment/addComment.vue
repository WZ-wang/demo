
<template>
  <div>
    <el-form ref="form" :model="talkData" label-width="80px" style="margin:20px">
      <el-form-item label="描述">
        <el-input v-model="talkData.description"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <Editor :catchData="catchData"></Editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button type="primary" @click="$router.go(-1)">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "../../components/editor"
export default {
  name: "addComment",
  data() {
    return {
      talkData: {
        description: "",
        content: ""
      },
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios
            .post("http://localhost:3003/api/talk/add", this.talkData)
            .then(res => {
              if (res) {
                this.$router.push("/commentlist");
              } else {
                this.$message({
                  message: "添加失败",
                  type: "error"
                });
              }
            });
        }
      });
    },
    catchData(content){
      this.talkData.content = content
    }
  },
  components:{
    Editor
  }
};
</script>

<style>
</style>