// 侧边导航栏

<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <!-- <i class="fa fa-margin fa-server"></i> -->
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin '+item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        // {
        //   name: "用户管理",
        //   path: "user",
        //   children: [{ path: "userList", name: "用户列表" },{ path: "addUser", name: "添加用户" }]
        // },
        // {
        //   name: "角色管理",
        //   path: "member",
        //   children: [{ path: "msgList", name: "角色列表" },{ path: "addmsp", name: "添加角色" }]
        // },
        // {
        //   name: "考试管理",
        //   path: "focus",
        //   children: [{ path: "testset", name: "考卷设置" },{ path: "exiftoolgui", name: "信息查看" },{ path: "title", name: "题目设置" },{ path: "focus", name: "考试设置" }]
        // },
        // {
        //   name: "课程管理",
        //   path: "comment",
        //   children: [
        //     { path: "curriculmstable", name: "课程列表" },
        //     { path: "Coursesadd", name: "课程添加" },
        //     { path: "addComment", name: "课程上传" }
        //   ]
        // },
        // {
        //   name: "沟通管理",
        //   path: "feel",
        //   children: [{ path: "feelList", name: "发布主题" },{ path: "suggest", name: "沟通反馈" }]
        // },
        
        
        // {
        //   name: "新闻管理",
        //   path: "news",
        //   children: [
        //     { path: "newsList", name: "新闻列表" },
        //     { path: "addNews", name: "添加新闻" }
        //   ]
        // }
      ]
    };
  },
  created(){
    this.$axios.get("/api/func/funcs").then(res=>{
      function r(list){
        return list.filter(item=>{
        delete item.id
        delete item.pid
        if( Object.prototype.toString.call(item.children) === "[object Array]"){
          r(item.children)
          return true
        }else{
          delete item.children
        }
      })
      }
      this.items = r(this.pidData(res.data))
    })
  },
  methods:{
     pidData(data){
        function getNewData(pid){
            return data.filter(item=>{
                if(item.pid===pid){
                    let children = getNewData(item.id)
                    item.children = children.length?children : null;
                    return true
                }
            })
        }
        return getNewData(0)
    }
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
