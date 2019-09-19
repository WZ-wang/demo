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
            <i class="fa fa-margin fa-server"></i>
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
        {
          icon: "el-icon-user",
          name: "用户管理",
          path: "user",
          children: [{ path: "userList", name: "用户列表" }]
        },
        {
          icon: "el-icon-chat-line-round",
          name: "党员互动",
          path: "member",
          children: [{ path: "msgList", name: "帖子列表" }]
        },
        {
          icon: "el-icon-postcard",
          name: "轮播图",
          path: "focus",
          children: [{ path: "focus", name: "轮播图列表" }]
        },
        {
          icon: "el-icon-chat-dot-square",
          name: "民主评议",
          path: "comment",
          children: [
            { path: "commentList", name: "评议列表" },
            { path: "addComment", name: "发起评议" }
          ]
        },
        {
          icon: "fa-money",
          name: "心得总结",
          path: "feel",
          children: [{ path: "feelList", name: "总结列表" }]
        },
        {
          icon: "el-icon-tickets",
          name: "思想汇报",
          path: "fund",
          children: [{ path: "reportList", name: "汇报列表" }]
        },
        {
          icon: "fa-asterisk",
          name: "新闻管理",
          path: "news",
          children: [
            { path: "newsList", name: "新闻列表" },
            { path: "addNews", name: "添加新闻" }
          ]
        }
      ]
    };
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
