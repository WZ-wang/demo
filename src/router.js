import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import NotFount from './views/404.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import FoundList from './views/FoundList.vue'
import userList from './views/user/userList.vue'
import addComment from './views/comment/addComment.vue'
import commentList from './views/comment/commentList.vue'
import feelList from './views/feel/feelList.vue'
import focus from './views/focus/focus.vue'
import msgList from './views/member/msgList.vue'
import addNews from './views/news/addNews.vue'
import newsList from './views/news/newsList.vue'
import reportList from './views/report/reportList.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: "/index"
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [{
          path: '',
          component: Home
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },
        {
          path: '/foundlist',
          name: 'foundlist',
          component: FoundList
        },
        {
          path: '/userlist',
          name: 'userlist',
          component: userList
        },
        {
          path: '/addcomment',
          name: 'addcomment',
          component: addComment
        },
        {
          path: '/commentlist',
          name: 'commentlist',
          component: commentList
        },
        {
          path: '/feelList',
          name: 'feellist',
          component: feelList
        },
        {
          path: '/focus',
          name: 'focus',
          component: focus
        },
        {
          path: '/msglist',
          name: 'msglist',
          component: msgList
        },
        {
          path: '/addnews',
          name: 'addnews',
          component: addNews
        },
        {
          path: '/newslist',
          name: 'newslist',
          component: newsList
        },
        {
          path: '/reportlist',
          name: 'reportlist',
          component: reportList
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/*',
      name: '/404',
      component: NotFount
    },
  ]
})

// 添加路由守卫
//router.beforeEach((to,from,next) => {
//  const isLogin = localStorage.eleToken ? true : false;
// if(to.path == "/login" || to.path=="/register"){
//   next();
// }else{
//    isLogin ? next() : next("/login");
//  }
// })

export default router;