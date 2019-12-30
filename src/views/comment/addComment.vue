
<template>
  <div>
    <el-form ref="form" :model="pData" label-width="80px" style="margin:20px">
      <!-- <el-form-item label="描述">
        <el-input v-model="pData.description"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <Editor :catchData="catchData"></Editor>
      </el-form-item> -->
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        action="/api/upd/upload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button type="primary" @click="$router.go(-1)">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "../../components/editor";
export default {
  name: "addComment",
  data() {
    return {
      pData: {
        // description: "",
        // content: ""
      }
    };
  },
  methods: {
    submitForm(from) {
      const vm = this;
      this.$refs[from].validate(valid => {
        if (valid) {
          vm.$refs.upload.submit();
        }
      });
    },
    catchData(content) {
      // this.pData.content = content;
    }
  },
  components: {
    Editor
  }
};
</script>

<style>
</style>