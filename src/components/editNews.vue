<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <el-form ref="form" :model="editData" label-width="80px" style="margin:20px">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="editData.title"></el-input>
        </el-form-item>
        <el-form-item label="新闻作者" prop="author">
          <el-input v-model="editData.author"></el-input>
        </el-form-item>
        <el-form-item label="新闻描述" prop="description">
          <el-input type="textarea" v-model="editData.description"></el-input>
        </el-form-item>
        <el-input type="hidden" v-model="editData.id"></el-input>
        <el-form-item label="新闻类型" prop="pid">
          <el-select v-model="editData.pid" placeholder="请选择类型">
            <el-option
              :label="item.article"
              :value="item._id"
              v-for="(item,index) in article"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新闻图片" prop="pic">
          <el-input v-if="false" v-model="editData.pic" />
          <el-upload
            ref="upload"
            list-type="picture-card"
            class="avatar-uploader"
            :show-file-list="false"
            action="http://localhost:3003/api/news/update"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            :data="editData"
          >
            <img
              v-if="editData.pic"
              :src="editData.pic"
              class="avatar"
              width="150"
              height="150"
              alt
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <Editor :catchData="catchData"></Editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Editor from "./editor"
export default {
  name: "addNews",
  data() {
    return {
      article: []
    };
  },
  props: {
    dialog: Object,
    editData:Object
  },
  provide:{
    content:'jdlldsa'
  },
  mounted() {
    this.getArticle();
  },
  components:{
    Editor
  },
  methods: {
    //获取类型
    getArticle() {
      this.$axios.get("http://localhost:3003/api/article/list").then(res => {
        this.article = res.data;
      });
    },
    //提交
    submitForm(from) {
      const vm = this;
      this.$refs[from].validate(valid => {
        if (valid) {
          console.log(this.editData);
          vm.$refs.upload.submit();
          this.dialog.show=false
          this.$emit('update')
        }
      });
    },
    //富文本
    catchData(content){
      this.newsData.content = content
    },
    //图片
    onSubmit() {
      console.log("submit!");
    },
    handleChange(file, fileList) {
      this.editData.pic = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    }
  }
};
</script>

<style>
</style>