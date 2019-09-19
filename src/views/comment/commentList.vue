
<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column align="center" type="index" width="120"></el-table-column>
      <el-table-column prop="description" label="描述" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:skyblue">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="staus" label="状态" align="center" width="220">
        <template slot-scope="scope">
          <span style="color:#999999" v-if="scope.row.staus==0">未开启</span>
          <span style="color:#00FF00" v-else-if="scope.row.staus==1">进行中</span>
          <span style="color:#FF0000" v-else>已结束</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间" align="center" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" fixed="right" width="200">
        <template slot-scope="scope" v-if="scope.row.staus!=2">
          <el-button
            size="mini"
            style="backgroundColor:skyblue;color:#fff"
            @click="edit(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.staus==0"
            @click="start(scope.$index, scope.row)"
          >开启</el-button>
          <el-button size="mini" type="danger" v-else @click="start(scope.$index, scope.row)">结束</el-button>
        </template>
      </el-table-column>
    </el-table>
    <editComment :data="editData" :dialog="dialog" @catch="catchData"></editComment>
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            background
            v-if="paginations.total > 0"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
            :current-page.sync="paginations.page_index"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import editComment from "../../components/editComment";
import { format } from "silly-datetime";
export default {
  name: "commentList",
  data() {
    return {
      data: {},
      tableData: [],
      editData: {},
      dialog: {
        title: "",
        show: false
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        layout: "total,  prev, pager, next, jumper" // 翻页属性
      }
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //获取列表数据
    getdata() {
      this.$axios
        .get(
          `http://localhost:3003/api/talk/list/${this.paginations.page_index}`
        )
        .then(res => {
          this.data = res.data;
          this.setPaginations();
        });
    },
    //开始结束
    start(index, item) {
      let id = item._id;
      this.$axios
        .get(`http://localhost:3003/api/talk/changeStaus?id=${id}`)
        .then(res => {
          this.getdata();
        });
    },
    //修改
    edit(index, item) {
      this.editData = item;
      this.dialog = {
        title: "修改",
        show: true
      };
    },
    //分页

    handleCurrentChange(page) {
      this.getdata();
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.data.total;
      this.paginations.page_index = parseInt(this.data.page);
      this.paginations.page_size = this.data.limit;
      // 设置默认分页数据
      this.tableData = this.data.docs;
      this.tableData.forEach(item => {
        item.date = format(item.date, "YYYY-MM-DD HH:mm");
      });
    },
    catchData(content){
      console.log(content)
    }
  },
  components: {
    editComment
  }
};
</script>

<style>
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>