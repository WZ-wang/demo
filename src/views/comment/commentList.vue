<template>
  <div>
    <!-- 选择类型查询 -->
    <div style="margin:20px">
      <el-select
        @change="getNew"
        style="margin:0 20px;width:155px"
        v-model="select.organ"
        placeholder="专业类别"
      >
        <el-option v-for="(item,index) in organ" :key="index" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select
        @change="getNew"
        v-model="select.wheel"
        style="margin-right: 20px;width:155px"
        placeholder="所属专业"
      >
        <el-option v-for="(item,index) in wheel" :key="index" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-input style="width:155px" v-model="select.name" placeholder="课程名称"></el-input>
      <el-input style="margin:0 20px;width:155px" v-model="select.item" placeholder="所属机构"></el-input>
      <el-input style="width:155px" v-model="select.iduce" placeholder="负责人"></el-input>
      <el-button type="primary" style="margin-left:20px" @click="find()">查询</el-button>
    </div>
    <!-- 课程列表 -->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="index" align="center" width="55"></el-table-column>
      <el-table-column prop="name" label="课程名称" show-overflow-tooltip align="center" width="200"></el-table-column>
      <el-table-column prop="organ" label="所属专业类" align="center" width="120"></el-table-column>
      <el-table-column prop="wheel" label="对应专业" align="center" width="120"></el-table-column>
      <el-table-column prop="item" label="所属机构" align="center" show-overflow-tooltip width="200"></el-table-column>
      <el-table-column prop="iduce" label="项目负责人" align="center" width="120"></el-table-column>
      <el-table-column prop="uploadtime" label="上传时间" align="center" width="180"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改框 -->
    <el-dialog title="课程信息" :visible.sync="isShow">
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
        <el-form-item label="文件上传" prop="name">
          <el-upload
            action="/api/user/cupload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :data="da"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { stringify } from 'querystring';
export default {
  name: "userList",
  data() {
    return {
      tableData: [],
      isShow: false,
      programData: {},
      organ: [],
      pInfo: {},
      wheel: [],
      fileList: [],
      select: {
        organ: "",
        wheel: "",
        iduce: "",
        item: "",
        name: ""
      },
      da: { phone: "" }
    };
  },
  created() {
    this.pInfo = this.$store.state.user;
    this.da.phone = this.pInfo.phone;
    // console.log(this.da.phone);
    this.getOrgan();
    this.getData();
  },
  methods: {
    //获取列表
    getData() {
      let pInfo = new FormData();
      pInfo.append("phone", this.pInfo.phone);
      pInfo.append("dentity", this.pInfo.dentity);
      // let pInfo = {phone:this.pInfo.phone,dentity:this.pInfo.dentity}
      
      this.$axios.post("/api/user/clist", pInfo).then(res => {
        // console.log(res)
        if (res.data.code == "ERR") {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        } else {
          this.tableData = res.data;
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
    //双联动查询
    getNew() {
      let doubInfo = new FormData();
      doubInfo.append("phone", this.pInfo.phone);
      doubInfo.append("dentity", this.pInfo.dentity);
      if (this.select.organ) {
        doubInfo.append("organ", this.select.organ);
      }
      if(this.select.wheel){
        doubInfo.append("wheel", this.select.wheel);
      }
      this.$axios.post("/api/user/erclist", doubInfo).then(res => {
        
        if (res.data.code == "ERR") {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }else{
          this.tableData = res.data;
        }
      });
    },
        //查询
    find() {
      let threeInfo = new FormData();
      threeInfo.append("phone", this.pInfo.phone);
      threeInfo.append("dentity", this.pInfo.dentity);
      if (this.select.iduce) {
        threeInfo.append("iduce", this.select.iduce);
      }
      if(this.select.item){
        threeInfo.append("item", this.select.item);
      }
      if(this.select.name){
        threeInfo.append("item", this.select.name);
      }
      this.$axios.post("/api/user/sanclist", threeInfo).then(res => {
        if (res.data.code == "ERR") {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }else{
          this.tableData = res.data;
        }
      });
    },
    //编辑
    handleEdit(index, item) {
      // console.log(item);
      this.programData = item;
      this.isShow = true;
    },
    //确定编辑
    edit() {
      let programInfo = new FormData();
      programInfo.append("name", this.programData.name);
      programInfo.append("brief", this.programData.brief);
      programInfo.append("organ", this.programData.organ);
      programInfo.append("wheel", this.programData.wheel);
      programInfo.append("item", this.programData.item);
      programInfo.append("iduce", this.programData.iduce);
      programInfo.append("phone", this.da.phone);
      this.$axios.post("/api/user/cmgement", programInfo).then(res => {
        // console.log(res);
        if (res.data.code == "OK") {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.isShow = false;
          this.getData();
        } else {
          this.$message({
            type: "error",
            message: "编辑失败"
          });
        }
      });
    },
    //删除
    handleDelete(index, item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let delInfo = new FormData();
          delInfo.append("phone", item.phone);
          this.$axios.post("/api/user/delclist", delInfo).then(res => {
            if (res.data.code == "OK") {
              this.$message({
                type: "success",
                message: "删除成功"
              }),
                this.getData();
            } else {
              this.$message({
                type: "error",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 视频
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
    },
    //pdf
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    }
  },
  components: {}
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