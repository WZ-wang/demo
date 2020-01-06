<template>
  <div class="addProgram">
    <el-form ref="form" :model="programData" label-width="80px" style="margin:20px">
      <h1>基本信息</h1>
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="programData.name" style="width: 400px;" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程摘要" prop="brief">
        <el-input
          :autosize="{ minRows: 4, maxRows: 5}"
          type="textarea"
          style="width: 400px;"
          maxlength="200"
          show-word-limit
          v-model="programData.brief"
        ></el-input>
      </el-form-item>
      <el-form-item label="专业类别" prop="organ">
        <el-select v-model="programData.organ" placeholder="请选择专业">
          <el-option
            v-for="(item,index) in organ"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对应专业" prop="wheel">
        <el-select v-model="programData.wheel" placeholder="请选择专业">
          <el-option
            v-for="(item,index) in wheel"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属机构" prop="item">
        <el-input v-model="programData.item" style="width: 400px;" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="介绍视频" prop="iduce">
        <el-upload
          ref="upload"
          action="/api/user/intvideo"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :data="da"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <span>视频格式：mp4</span>
      </el-form-item>
      <el-form-item label="课程介绍" prop="dload">
        <el-upload
          class="upload-demo"
          action="/api/user/dload"
          :on-change="handleChange"
          :file-list="fileList"
          :data="da"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过5M</div>
        </el-upload>
      </el-form-item>
      <div class="line"></div>
      <h1>课程上传</h1>
      <!-- <el-form-item label="文件上传" prop="name">
        <el-upload
          action="/api/user/cupload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :data="da"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <span>单个文件上传不超过1500M</span>
      </el-form-item> -->
      <el-form-item label="下载说明" prop="ement">
        <el-upload
          class="upload-demo"
          action="/api/user/ement"
          :on-change="handleChange"
          :file-list="fileList"
          :data="da"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过5M</div>
        </el-upload>
      </el-form-item>
      <div class="line"></div>
      <h1>实验操作</h1>
      <el-form-item label="实验准备" prop="oation">
        <el-upload
          class="upload-demo"
          action="/api/user/oation"
          :on-change="handleChange"
          :file-list="fileList"
          :data="da"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过5M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="操作流程" prop="ictions">
        <el-upload
          class="upload-demo"
          action="/api/user/ictions"
          :on-change="handleChange"
          :file-list="fileList"
          :data="da"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过5M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="操作视频" prop="makevideo">
        <el-upload
          action="/api/user/makevideo"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :data="da"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <span>视频格式：mp4</span>
      </el-form-item>
      <el-form-item label="视频简述" prop="maketext">
        <el-input
          :autosize="{ minRows: 4, maxRows: 5}"
          type="textarea"
          style="width: 400px;"
          maxlength="200"
          show-word-limit
          v-model="programData.maketext"
        ></el-input>
      </el-form-item>
      <el-form-item label="使用说明" prop="llzdsg">
        <el-upload
          class="upload-demo"
          action="/api/user/llzdsg"
          :on-change="handleChange"
          :file-list="fileList"
          :data="da"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过5M</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确认添加</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="cupload" :model="cuploadData" label-width="80px" style="margin:20px">
      <h1>附件课程上传-----------------</h1>
      <el-form-item label="文件名称" prop="cuploadName">
        <el-input v-model="programData.cuploadName" style="width: 400px;" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文件上传">
        <el-upload
          ref="wjupload"
          action="/api/user/cupload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :data="cuploadData"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <span>单个文件上传不超过1500M</span>
      </el-form-item>
      <el-form-item>
        <p>如果有多个文件，可配上相应的文字描述，再次上传</p>
        <el-button type="primary" @click="submitcupload('cupload')">上传课程文件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "../../components/editor";
export default {
  data() {
    return {
      programData: {
        name: "",
        brief: "",
        organ: "",
        wheel: "",
        item: "",
        iduce: "",
        dload: "",
        ement: "",
        oation: "",
        ictions: "",
        llzdsg: "",
        iduce: "",
        maketext: "",
        makevideo: ""
      },
      cuploadData: {
        cuploadName: "",
        phone:""
      },
      pData: {
        content: ""
      },
      da: { phone: "" },
      fileList: [],
      organ: [],
      wheel: []
    };
  },
  created() {
    this.getOrgan();
    this.da.phone = this.$store.state.user.phone;
    this.programData.iduce = this.$store.state.user.name;
  },
  methods: {
    submitForm(from) {
      const vm = this;
      // vm.$refs.upload.submit();
      this.$refs[from].validate(valid => {
        if (valid) {
          let programInfo = new FormData();
          programInfo.append("name", this.programData.name);
          programInfo.append("brief", this.programData.brief);
          programInfo.append("organ", this.programData.organ);
          programInfo.append("wheel", this.programData.wheel);
          programInfo.append("item", this.programData.item);
          programInfo.append("iduce", this.programData.iduce);
          programInfo.append("maketext", this.programData.maketext);
          programInfo.append("phone", this.da.phone);
          this.$axios.post("/api/user/cmgement", programInfo).then(res => {
            if (res.data.code == "OK") {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.programData = {
                name: "",
                brief: "",
                organ: "",
                wheel: "",
                item: "",
                iduce: "",
                dload: "",
                ement: "",
                oation: "",
                ictions: "",
                llzdsg: "",
                iduce: "",
                maketext: "",
                makevideo: ""
              };
            } else {
              this.$message({
                type: "error",
                message: "添加失败"
              });
            }
          });
        }
      });
    },
    // 附件课程上传
    submitcupload(from) {
      const vm = this;
      this.$refs[from].validate(valid => {
        if (valid) {
          vm.$refs.wjupload.submit();
        }
      });
    },
    // 获取所属专业
    getOrgan() {
      this.$axios.post("/api/user/organ").then(res => {
        this.organ = res.data;
      });
      this.$axios.post("/api/user/wheel").then(res => {
        this.wheel = res.data;
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
    },
    //富文本
    catchData(content) {
      this.pData.content = content;
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    }
  },
  components: {
    Editor
  },
  mounted() {}
};
</script>

<style  scoped>
.addProgram {
  padding-left: 30px;
}
h1 {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin-top: 30px;
  margin-bottom: 20px;
}
.line {
  width: 100%;
  height: 2px;
  background-color: #eee;
  margin: 0 auto;
}
</style>