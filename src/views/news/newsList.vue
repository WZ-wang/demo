<template>
  <div>
    <!-- 添加类型 -->
    <el-dialog title="添加类型" :visible.sync="isShow">
      <el-form ref="form" :model="articleData" label-width="80px">
        <el-form-item label="新闻类型">
          <el-input v-model="articleData.article"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:30px">
          <el-button type="primary" @click="addInfo('form')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 选择类型 -->
    <div style="margin:20px">
      <el-select v-model="pid" placeholder="请选择类型">
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.article"
          :value="item._id"
        ></el-option>
      </el-select>
      <el-button type="primary" style="margin-left:20px" @click="select()">查询</el-button>
      <el-button type="primary" @click="isShow=true">新增</el-button>
    </div>
    <!-- 主内容 -->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" align="center" width="100"></el-table-column>
      <el-table-column prop="_id" label="ID" align="center" width="240"></el-table-column>
      <el-table-column prop="title" align="center" label="标题" width="240"></el-table-column>
      <el-table-column prop="date" align="center" label="发布时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="article" align="center" label="新闻类别" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <editNews :dialog="dialog" :editData='editData' @update="getData()"></editNews>
    <!-- 分页 -->
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
import editNews from "../../components/editNews"
import { format } from "silly-datetime";
export default {
  name: "newsList",
  data() {
    return {
      tableData: [],
      changeData:[],
      data: {},
      options: [],
      isShow: false,
      articleData: {},
      pid: "",
      dialog:{
        title:"编辑",
        show:false
      },
      editData:{},
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        layout: "total,  prev, pager, next, jumper" // 翻页属性
      },
      
    };
  },
  mounted() {
    this.getData();
    this.getArticle();
  },
  methods: {
    //获取新闻列表
    getData() {
      this.$axios
        .get(
          `http://localhost:3003/api/news/list/${this.paginations.page_index}`
        )
        .then(res => {
          this.data = res.data;
          this.setPaginations();
        });
    },
    // 获取类型
    getArticle() {
      this.$axios.get("http://localhost:3003/api/article/list").then(res => {
        this.options = res.data;
      });
    },
    //设置分页
    handleCurrentChange(page) {
      this.getData();
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.data.total;
      this.paginations.page_index = parseInt(this.data.page);
      this.paginations.page_size = this.data.limit;
      // 设置默认分页数据
      this.tableData = this.data.docs;
      //处理时间格式
      this.tableData.forEach(item => {
        item.date = format(item.date, "YYYY-MM-DD HH:mm");
      });
      this.changeData = this.tableData
    },
    //选择类型
    select() {
      this.tableData = this.changeData
      if (this.pid) {
        this.tableData = this.tableData.filter(item => item.pid == this.pid);
      } else {
        this.$message({
          message: "请选择类型",
          type: "warning"
        });
      }
    },
    //添加类型
    addInfo(from) {
      this.$refs[from].validate(valid => {
        if (valid) {
          this.$axios
            .post("http://localhost:3003/api/article/add", this.articleData)
            .then(res => {
              if (res) {
                this.isShow = false;
                this.getArticle();
              }
            });
        }
      });
    },
    //编辑
    handleEdit(index,item){
      // console.log(item)
      let id = item._id
      this.editData = item
      this.editData.id = id 
      this.dialog = {title:'编辑',show:true}
      
    },
    // 删除
    handleDelete(index,item){
      let id = item._id
      this.$axios.get(`http://localhost:3003/api/news/delete?id=${id}`).then(res=>{
        if(res){
          this.$message({
            type:'success',
            message:"删除成功"
          }),
          this.getData()
        }
      })
    }
  },
  components:{
    editNews
  }
};
</script>

<style>
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>