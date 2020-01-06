<template>
  <div>
    <el-form ref="form" :rules="rules" :model="userData" label-width="80px" style="margin:20px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userData.name" style="width: 400px;" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="userData.sex" label="男">男</el-radio>
        <el-radio v-model="userData.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="学号" prop="account">
        <el-input v-model="userData.account" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="userData.phone" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="dentity">
        <el-radio v-if="userInfo.dentity == '老师' || userInfo.dentity == '超级管理员' " v-model="userData.dentity" label="学生">学生</el-radio>
        <el-radio v-if="userInfo.dentity == '超级管理员' " v-model="userData.dentity" label="老师">老师</el-radio>
      </el-form-item>
      <el-form-item label="邮箱" prop="contact">
        <el-input v-model="userData.contact" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="school">
        <el-select v-model="userData.school" placeholder="请选择学校">
          <el-option
            v-for="(item,index) in schoolData"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院" prop="pfession">
        <el-select v-model="userData.pfession" placeholder="请选择学院">
          <el-option
            v-for="(item,index) in xyData"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 身份是老师 -->
      <el-form-item label="班级" v-if="userInfo.dentity == '老师' || userData.dentity == '学生'" prop="clazz">
        <el-select v-model="userData.clazz" placeholder="请选择班级">
          <el-option
            v-for="(item,index) in classData"
            :key="index"
            :label="item.sname"
            :value="item.sid"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 身份是超级管理员 -->
      <el-form-item label="班级" v-if="userInfo.dentity == '超级管理员'&& userData.dentity == '老师'" prop="clazz">
        <el-checkbox-group v-model="classList">
          <el-checkbox
            v-for="(item,index) in classData"
            :label="item.sid"
            :key="index"
          >{{item.sname}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button type="primary" style="margin-left:25px" @click="isShow=true">批量导入</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="批量导入" :visible.sync="isShow">
      <p style="margin:20px">请下载下面的模板，在进行批量导入,</p>
      <el-link href="/api/upd/download" style="margin:15px">
        <el-button size="mini" type="primary">模板下载</el-button>
      </el-link>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <!-- <el-button type="primary" @click="edit()">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var checkscode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入学号"));
      } else if (!this.isSCode(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的学号!"));
      } else {
        callback();
      }
    };
    var checkname = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入姓名"));
      } else if (!this.isName(value)) {
        callback(new Error("存在非法字符"));
      } else {
        callback();
      }
    };
    return {
      userData: {
        name: "",
        sex: "",
        account: "",
        phone: "",
        dentity: "",
        contact: "",
        clazz: "",
        pfession: "",
        school: ""
      },
      classList: [],
      isShow: false,
      schoolData: [],
      classData: [],
      xyData: [],
      tableData: [],
      tableHeader: [],
      plData: [],
      rules: {
        name: [{ required: true, validator: checkname, trigger: "blur" }],
        contact: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        account: [{ required: true, validator: checkscode, trigger: "blur" }]
      },
      userInfo: {}
    };
  },
  created() {
    this.userInfo = this.$store.state.user;
    if (this.userInfo.dentity == "老师") {
      this.userInfo.clazzids.split(",").forEach((id, index) => {
        let obj = {};
        obj.sid = id;
        obj.sname = this.userInfo.clazzs.split(",")[index];
        this.classData.push(obj);
      });
    }else if(this.userInfo.dentity == "超级管理员"){
       this.$axios.get("/api/user/clazz").then(res => {
        this.classData = res.data;
      });
    }
    this.getClass();
  },
  components: { UploadExcelComponent },
  methods: {
    submitForm(from) {
      this.$refs[from].validate(valid => {
        if (valid) {
          let userInfo = new FormData();
          userInfo.append("name", this.userData.name);
          userInfo.append("sex", this.userData.sex);
          userInfo.append("account", this.userData.account);
          userInfo.append("phone", this.userData.phone);
          userInfo.append("dentity", this.userData.dentity);
          userInfo.append("contact", this.userData.contact);
          if (this.classList.length > 0) {
            let className = "";
            this.classList.forEach(item => {
              className += item + ",";
            });
            userInfo.append(
              "clazzids",
              className.substring(0, className.length - 1)
            );
          } else {
            userInfo.append("clazz", this.userData.clazz);
          }
          userInfo.append("pfession", this.userData.pfession);
          userInfo.append("school", this.userData.school);
         if(this.userData.dentity == "学生"){
            this.$axios.post("/api/user/add", userInfo).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.userData = {
                name: "",
                sex: "",
                account: "",
                phone: "",
                dentity: "",
                contact: "",
                clazz: "",
                pfession: "",
                school: ""
              };
              this.classList = []
            }
          });
         }else{
            this.$axios.post("/api/user/addteacher", userInfo).then(res => {
            console.log("teacher++++",res)
            if (res) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.userData = {
                name: "",
                sex: "",
                account: "",
                phone: "",
                dentity: "",
                contact: "",
                clazz: "",
                pfession: "",
                school: ""
              };
              this.classList = []
            }else{
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          });
         }
        }
      });
    },
    // 获取班级和学院
    getClass() {
      // this.$axios.get("/api/user/clazz").then(res => {
      //   console.log(res)
      //   this.classData = res.data;
      // });
      this.$axios.get("/api/user/college").then(res => {
        this.xyData = res.data;
      });
      this.$axios.get("/api/user/school").then(res => {
        this.schoolData = res.data;
      });
    },
    //验证手机号格式
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    isName(val) {
      if (!/[@#\$%?\^&\\\*]+/g.test(val)) {
        return true;
      } else {
        return false;
      }
    },

    isSCode(val) {
      if (/\d{11}$/.test(val) && val.length === 11) {
        return true;
      } else {
        return false;
      }
    },
    // 文件读取前执行
    beforeUpload(file) {
      // 取文件大小，限制文件大小超过1mb
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "上传的Excel文件不能大于1mb.",
        type: "warning"
      });
      return false;
    },
    // 文件读取后执行
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
      this.tableData.forEach(item => {
        let obj = {};
        this.tableHeader.forEach((head, index) => {
          let name = "a" + index;
          obj[name] = item[head];
        });
        this.plData.push(obj);
      });
      let str = "";
      this.plData.forEach(item=>{
        str += item.a0 + ","+item.a1 + ","+item.a2 + ","+item.a3 + ","+item.a4 + ","+item.a5 + ","+item.a6 + ","+item.a7 +"*"
      })
      console.log(str.substring(0,str.length-1))
      // console.log(this.tableData)
      // console.log(this.plData)
      // let plData = new FormData();
      // plData.append("name", 1);
      // this.$axios.post("/api/user/batchadd", this.plData).then(res => {
      //   console.log(res);
      // });
    }
  }
};
</script>