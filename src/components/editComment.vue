<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="描述">
          <el-input v-model="data.description"></el-input>
        </el-form-item>
        <el-input v-model="data._id" type="hidden"></el-input>
        <el-form-item label="内容">
          <Editor :catchData="catchData"></Editor>
        </el-form-item>
        <el-form-item style="margin-top:30px">
          <el-button type="primary" @click="submitForm('form')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Editor from './editor'
export default {
 
  data() {
    return {
      editData: {
        description: "",
        content: "",
        id: ""
      },
    };
  },
  props: {
    data: Object,
    dialog: Object
  },
  provide:{
    content:'jdlldsa'
  },
  methods: {
    submitForm(from) {
      this.$refs[from].validate(valid => {
        if (valid) {
          this.editData = this.data;
          this.editData.id = this.data._id;
          this.$axios
            .post("http://localhost:3003/api/talk/update", this.editData)
            .then(res => {
              if (res) {
                this.dialog.show = false;
              }
            });
        }
      });
    },
    catchData(content){
      this.data.content = content
    }
  },
  components:{
    Editor
  }
};
</script>

