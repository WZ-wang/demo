<template>
  <div>
    <el-form ref="form" :model="newsData" label-width="80px" style="margin:20px">
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="newsData.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻作者" prop="author">
        <el-input v-model="newsData.author"></el-input>
      </el-form-item>
      <el-form-item label="新闻描述" prop="description">
        <el-input type="textarea" v-model="newsData.description"></el-input>
      </el-form-item>
      <el-form-item label="新闻类型" prop="pid">
        <el-select v-model="newsData.pid" placeholder="请选择类型">
          <el-option
            :label="item.article"
            :value="item._id"
            v-for="(item,index) in article"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻图片" prop="pic">
        <el-input v-if="false" v-model="newsData.pic" />
        <el-upload
          ref="upload"
          list-type="picture-card"
          class="avatar-uploader"
          :show-file-list="false"
          action="http://localhost:3003/api/news/add"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          :data="newsData"
        >
          <img v-if="newsData.pic" :src="newsData.pic" class="avatar" width="150" height="150" alt />
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
  </div>
</template>

<script>
import Editor from '../../components/editor'
export default {
  name: "addNews",
  data() {
    return {
      newsData: {
        title: "",
        author: "",
        description: "",
        content: "",
        pic: "",
        pid: ""
      },
      article: []
    };
  },
  mounted() {
    this.getArticle();
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
          console.log(this.newsData);
          vm.$refs.upload.submit();
          this.$router.push("/newsList");
        }
      });
    },
    //图片
    onSubmit() {
      console.log("submit!");
    },
    handleChange(file, fileList) {
      this.newsData.pic = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    },
    //富文本
    catchData(content){
      this.newsData.content = content
    }
  },
  components:{
    Editor
  }
};
</script>

<style>
</style>