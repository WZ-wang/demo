<template>
  <div>
    <!-- 选择类型 -->
    <div style="margin:20px">
      <el-button type="danger" style="margin:0 20px" @click="delectAll()">批量删除</el-button>
      <el-input style="width:155px" v-model="sName" placeholder="请输入姓名"></el-input>
      <el-select style="margin:0 20px;width:155px" v-model="className" placeholder="请选择班级">
        <!-- <el-option
          label="请选择班级"
          value="请选择班级"
        ></el-option>-->
        <el-option
          v-for="(item,index) in classData"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-select v-model="xyName" style="width:155px" placeholder="请选择学院">
        <!-- <el-option
          label="请选择学院"
          value="请选择学院"
        ></el-option>-->
        <el-option
          v-for="(item,index) in xyData"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-select style="margin-left:20px;width:155px" v-model="schoolName" placeholder="请选择学校">
        <!-- <el-option
          label="请选择学校"
          value="请选择学校"
        ></el-option>-->
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
      <el-table-column prop="clazz" label="班级" align="center" width="100"></el-table-column>
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
        <el-form-item label="班级" prop="clazz">
          <el-select v-model="editData.clazz" placeholder="请选择班级">
            <el-option
              v-for="(item,index) in classData"
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
      sName: "",
      className: "",
      xyName: "",
      schoolName: "",
      isShow: false,
      editData: {},
      schoolData: [],
      classData: [],
      xyData: []
    };
  },
  created() {
    this.getData();
    this.getClass();
  },
  methods: {
    //获取列表
    getData() {
      this.$axios
        .get(
          `/api/user/list?page=${this.paginations.page_index}&rows=${this.paginations.page_size}&keyword=${this.sName}&name=${this.className}&xueyuan=${this.xyName}&school=${this.schoolName}`
        )
        .then(res => {
          this.paginations.total = res.data.total;
          this.tableData = res.data.rows;
        });
    },
    // 获取班级和学院
    getClass() {
      this.$axios.get("/api/user/clazz").then(res => {
        this.classData = res.data;
      });
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
      console.log(item);
      this.editData = item;
      this.isShow = true;
    },
    //确定编辑
    edit() {
      let userInfo = new FormData();
      userInfo.append("name", this.editData.name);
      userInfo.append("sex", this.editData.sex);
      userInfo.append("account", this.editData.account);
      userInfo.append("phone", this.editData.phone);
      userInfo.append("dentity", this.editData.dentity);
      userInfo.append("contact", this.editData.contact);
      userInfo.append("clazz", this.editData.clazz);
      userInfo.append("pfession", this.editData.pfession);
      userInfo.append("school", this.editData.school);
      userInfo.append("id", this.editData.id);
      this.$axios.post("/api/user/updateuser", userInfo).then(res => {
        this.isShow = false;
        this.getData();
      });
    },
    //删除
    handleDelete(index, item) {
      console.log(item.id);
      this.$axios.get(`/api/user/dtiaodel/${item.id}`).then(res => {
        if (res) {
          this.$message({
            type: "success",
            message: "删除成功"
          }),
            this.getData();
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
      let someId = "";
      this.multipleSelection.forEach(item => {
        someId += item.id + ",";
      });
      someId = someId.substring(0, someId.length - 1);
      this.$axios.get(`/api/user/del?ids=${someId}`).then(res => {
        if (res) {
          this.$message({
            type: "success",
            message: "删除成功"
          }),
            this.getData();
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