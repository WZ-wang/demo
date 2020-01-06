<template>
  <div>
    <!-- 选择类型 -->
    <div style="margin:20px">
      <el-button type="danger" style="margin:0 20px" @click="delectAll()">批量删除</el-button>
      <el-input style="width:155px" v-model="sName" placeholder="请输入姓名"></el-input>
      <el-select style="margin:0 20px;width:155px" v-model="className" placeholder="请选择班级">
        <el-option
          v-for="(item,index) in classData"
          :key="index"
          :label="item.sname"
          :value="item.sname"
        ></el-option>
      </el-select>
      <el-select
        v-if="userInfo.dentity == '超级管理员'"
        v-model="xyName"
        style="width:155px"
        placeholder="请选择学院"
      >
        <el-option
          v-for="(item,index) in xyData"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-select
        v-if="userInfo.dentity == '超级管理员'"
        style="margin-left:20px;width:155px"
        v-model="schoolName"
        placeholder="请选择学校"
      >
        <el-option
          v-for="(item,index) in schoolData"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-button type="primary" style="margin-left:20px" @click="find()">查询</el-button>
    </div>
    <!-- 用户列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="80"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="60"></el-table-column>
      <el-table-column prop="account" label="学号" align="center" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="140"></el-table-column>
      <el-table-column prop="dentity" label="身份" align="center" width="100"></el-table-column>
      <el-table-column prop="clazzs" label="班级" align="center" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="contact" label="联系方式" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="pfession" label="学院" align="center" width="100"></el-table-column>
      <el-table-column prop="school" label="学校" align="center" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <span style="color:#999999" v-if="scope.row.status==0">未启用</span>
          <span style="color:#00FF00" v-else-if="scope.row.status==1">已启用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            v-if="paginations.total > 0"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
            :current-page.sync="paginations.page_index"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 修改框 -->
    <el-dialog title="用户信息" :visible.sync="isShow">
      <el-form :model="editData" label-width="80px" style="margin:20px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="editData.sex" label="男">男</el-radio>
          <el-radio v-model="editData.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="学号" prop="account">
          <el-input v-model="editData.account"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editData.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="身份" prop="dentity">
        <el-radio v-if="userInfo.dentity == '老师' || userInfo.dentity == '超级管理员' " v-model="editData.dentity" label="学生">学生</el-radio>
        <el-radio v-if="userInfo.dentity == '超级管理员' " v-model="editData.dentity" label="老师">老师</el-radio>
        </el-form-item>-->
        <el-form-item label="学校" prop="school">
          <el-select v-model="editData.school" placeholder="请选择学校">
            <el-option
              v-for="(item,index) in schoolData"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院" prop="pfession">
          <el-select v-model="editData.pfession" placeholder="请选择学院">
            <el-option
              v-for="(item,index) in xyData"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 学生 -->
        <el-form-item label="班级" v-if="editData.dentity == '学生'" prop="clazz">
          <el-select v-model="editData.clazzs" placeholder="请选择班级">
            <el-option
              v-for="(item,index) in classData"
              :key="index"
              :label="item.sname"
              :value="item.sid"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 老师 -->
        <el-form-item label="班级" v-if="editData.dentity == '老师'" prop="clazzs">
          <el-checkbox-group v-model="classList">
            <el-checkbox
              v-for="(item,index) in classData"
              :label="item.sid"
              :key="index"
            >{{item.sname}}</el-checkbox>
          </el-checkbox-group>
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
export default {
  name: "userList",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      classList: [],
      sName: "",
      className: "",
      xyName: "",
      schoolName: "",
      isShow: false,
      editData: {},
      schoolData: [],
      classData: [],
      xyData: [],
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
        this.classData.filter(item => {
          return item.sid == id;
        });
        this.classData.push(obj);
      });
    } else {
      this.$axios.get("/api/user/clazz").then(res => {
        this.classData = res.data;
      });
    }
    this.getData();
    this.getClass();
  },
  methods: {
    //获取列表
    getData() {
      let userListInfo = new FormData();
      userListInfo.append("page", this.paginations.page_index);
      userListInfo.append("rows", this.paginations.page_size);
      userListInfo.append("dentity", this.userInfo.dentity);
      if (this.userInfo.dentity == "老师") {
        userListInfo.append("sids", this.userInfo.clazzids);
      }
      if (this.className) {
        userListInfo.append("name", this.className);
      }
      if (this.xyName) {
        userListInfo.append("xueyuan", this.xyName);
      }
      if (this.schoolName) {
        userListInfo.append("school", this.schoolName);
      }
      if (this.sName || this.userInfo.dentity == "超级管理员") {
        userListInfo.append("keyword", this.sName);
      }
      this.$axios
        .post("/api/user/list", userListInfo)
        //  `/api/user/list?page=${this.paginations.page_index}&rows=${this.paginations.page_size}&keyword=${this.sName}&name=${this.className}&xueyuan=${this.xyName}&school=${this.schoolName}`
        .then(res => {
          console.log(res);
          this.paginations.total = res.data.total;
          this.tableData = res.data.rows;
        });
    },
    // 获取学校和学院
    getClass() {
      // this.$axios.get("/api/user/clazz").then(res => {
      //   this.classData = res.data;
      // });
      this.$axios.get("/api/user/college").then(res => {
        this.xyData = res.data;
      });
      this.$axios.get("/api/user/school").then(res => {
        this.schoolData = res.data;
      });
    },
    //选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑
    handleEdit(index, item) {
      // console.log(item);
      this.editData = item;
      if (this.editData.dentity == "老师") {
        this.classList = this.editData.clazzids.split(",");
        let s = this.classData.filter(item => {
          return this.editData.clazzids.split(",").every((id, index) => {
            return item.sid != id;
          });
        });
        this.editData.clazzids.split(",").forEach((id, index) => {
          let obj = {};
          obj.sid = id;
          obj.sname = this.editData.clazzs.split(",")[index];
          s.unshift(obj);
        });
        this.classData = s
      }
      this.isShow = true;
    },
    //确定编辑
    edit() {
      // console.log(this.editData);
      let userInfo = new FormData();
      userInfo.append("name", this.editData.name);
      userInfo.append("sex", this.editData.sex);
      userInfo.append("account", this.editData.account);
      userInfo.append("phone", this.editData.phone);
      userInfo.append("dentity", this.editData.dentity);
      userInfo.append("contact", this.editData.contact);
      // userInfo.append("clazz", this.editData.clazz);
      userInfo.append("pfession", this.editData.pfession);
      userInfo.append("school", this.editData.school);
      // userInfo.append("status", 1);
      if (this.editData.dentity == "学生") {
        console.log(this.editData.clazzs);
        userInfo.append("clazzids", this.editData.clazzs);
      } else {
        let cid = "";
        this.classList.forEach(item => {
          cid += item + ",";
        });
        cid = cid.substring(0, cid.length - 1);
        console.log("cid" + cid);
        userInfo.append("clazzids", cid);
      }
      // userInfo.append("id", this.editData.id);
      this.$axios.post("/api/user/updateuser", userInfo).then(res => {
        console.log(res);
        this.isShow = false;
        this.getData();
      });
    },
    //删除
    handleDelete(index, item) {
      console.log(item);
      let userInfo = new FormData();
      userInfo.append("phone", item.phone);
      userInfo.append("clazzids", item.clazzids);
      this.$axios.post("/api/user/del", userInfo).then(res => {
        if (res.data.code == "OK") {
          this.$message({
            type: "success",
            message: "删除成功"
          }),
            this.getData();
        } else {
          this.$message({
            type: "warning",
            message: "删除失败"
          });
        }
      });
    },
    //分页
    handleSizeChange(val) {
      this.paginations.page_size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.paginations.page_index = val;
      this.getData();
    },
    //批量删除
    delectAll() {
      console.log(this.multipleSelection);
      let somePhone = "";
      let someClassId = "";
      this.multipleSelection.forEach(item => {
        somePhone += item.phone + ",";
        someClassId += item.clazzids + ",";
      });
      somePhone = somePhone.substring(0, somePhone.length - 1);
      someClassId = someClassId.substring(0, someClassId.length - 1);
      let userInfo = new FormData();
      userInfo.append("phone", somePhone);
      userInfo.append("clazzids", someClassId);
      this.$axios.post("/api/user/del", userInfo).then(res => {
        if (res.data.code == "OK") {
          this.$message({
            type: "success",
            message: "删除成功"
          }),
            this.getData();
        } else {
          this.$message({
            type: "warning",
            message: "删除失败"
          });
        }
      });
    },
    //查询
    find() {
      this.getData();
    }
  },
  components: {}
};
</script>
<style scoped>
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>