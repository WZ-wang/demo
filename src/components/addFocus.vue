<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
          <el-input v-if="form.id" type="hidden" v-model="form.id"></el-input>
        <el-form-item label="新闻图片" prop="pic">
         <el-input v-if="false" v-model="form.pic" />
        <el-upload
          ref="upload"
          list-type="picture-card"
          class="avatar-uploader"
          :show-file-list="false"
          action="http://localhost:3003/api/focus/add"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          :data="form"
        >
          <img v-if="form.pic" :src="form.pic" class="avatar" width="150" height="150" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
            <!-- <img width="150" height="150"  :src="form.pic" alt /> -->
          <!-- <el-input type="file" v-model="data.pic"></el-input> -->
        </el-form-item>
        <el-form-item style="margin-top:30px">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { constants } from 'crypto';
export default {
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    //添加轮播图
    submitForm(from) {
      const vm = this
      this.$refs[from].validate(valid => {
        if (valid) {
          console.log(this.form)
          vm.$refs.upload.submit()
          this.dialog.show = false;
          this.$router.push('/focus')
        }
      });
    },

    //上传图片
   onSubmit() {
      console.log('submit!')
    },
    handleChange(file, fileList) {
      this.form.pic = URL.createObjectURL(file.raw)
    },

    beforeUpload(file) {
      return true
    }
  }
};
</script>
