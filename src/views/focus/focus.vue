
<template>
  <div>
    <!-- 列表 -->
    <el-table
      @selection-change="handleSelectionChange"
      ref="multipleTable"
      :data="focusData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" align="center" width="100"></el-table-column>
      <el-table-column align="center" type="index" width="100"></el-table-column>
      <el-table-column prop="pic" label="缩略图" align="center" width="170">
        <template slot-scope="scope">
          <img :src="scope.row.pic" width="66px" alt />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="顺序" align="center" width="120">
        <template slot-scope="scope">
          <span style="color:skyblue">{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="staus" label="状态" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.staus==0"
            @click="start(scope.$index, scope.row)"
          >启用</el-button>
          <el-button size="mini" type="danger" v-else @click="start(scope.$index, scope.row)">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" fixed="right" width="170">
        <template slot-scope="scope" v-if="scope.row.staus!=2">
          <el-button
            size="mini"
            style="backgroundColor:skyblue;color:#fff"
            @click="edit(scope.$index, scope.row)"
          >修改</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- //添加和批量删除 -->
    <div class="add">
      <el-button size="medium" style="backgroundColor:skyblue;color:#fff" @click="add">添加</el-button>
      <el-button size="medium" style="backgroundColor:#eee;color:#333" @click="removeMore()">批量删除</el-button>
    </div>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            background
            v-if="pageData.total > 0"
            :page-size="pageData.limit"
            :layout="pageData.layout"
            :total="pageData.total"
            :current-page.sync="pageData.page"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <addFocus v-if="express" :dialog="dialog" :form="editDate"></addFocus>
    <editFocus v-else :dialog="dialog" :form="editDate" @update='getData()'></editFocus>
  </div>
</template>

<script>
import addFocus from "../../components/addFocus";
import editFocus from "../../components/editFocus";
export default {
  name: "focusList",
  data() {
    return {
      express:false,
      choiceData: [],
      pageData: {
        page: 1,
        total: 0,
        limit: 5,
        layout: "total,  prev, pager, next, jumper" // 翻页属性
      },
      focusData: [],
      dialog: {
        title: "",
        show: false,
        option: ""
      },
      editDate: {
        title: "",
        sort: "",
        pic: "",
        // id: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get(`http://localhost:3003/api/focus/list/${this.pageData.page}`)
        .then(res => {
          this.pageData = res.data;
          this.pageData.page = parseInt(this.pageData.page);
          this.focusData = res.data.docs;
        });
    },
    // 添加
    add() {
      this.express = true
      this.dialog = {
        title: "添加",
        show: true,
        option: "add"
      };
      this.editDate = {
        title: '',
        sort: '',
        pic: '',
        // id: ''
      };
    },
    //修改
    edit(index, item) {
      this.dialog = {
        title: "修改",
        show: true,
        option: "edit"
      };
      this.editDate = {
        title: item.title,
        sort: item.sort,
        pic: item.pic,
        id: item._id
      };
    },
    //删除
    remove(index, item) {
      let oneid = item._id;
      this.removeMore(oneid);
    },
    handleCurrentChange(page) {
      this.pageData.page = page;
      this.getData();
    },
    //批量处理,val是每一列的数据
    handleSelectionChange(val) {
      this.choiceData = val;
    },
    removeMore(oneid) {
      let id = "";
      if (oneid) {
        id = "id=" + oneid;
      } else {
        this.choiceData.forEach(item => {
          id = id + "id=" + item._id + "&";
          id = id.substring(0, id.length - 1);
        });
      }
      this.$axios
        .get(`http://localhost:3003/api/focus/delete/?${id}`)
        .then(res => {
          if (res) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getData();
          }
        });
    },
    // 改变状态
    start(index, item) {
      let id = item._id;
      this.$axios
        .get(`http://localhost:3003/api/focus/changeStaus?id=${id}`)
        .then(res => {
          this.getData();
        });
    }
  },
  components: {
    addFocus,
    editFocus
  }
};
</script>

<style>
</style>