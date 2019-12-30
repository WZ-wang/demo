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
import curriculumstable from './views/comment/commentList.vue'
import Coursesadd from './views/comment/Coursesadd.vue'
import feelList from './views/feel/feelList.vue'
import focus from './views/focus/focus.vue'
import exiftoolgui from './views/focus/exiftoolgui.vue'
import testset from './views/focus/testset.vue'
import msgList from './views/member/msgList.vue'
import addmsp from './views/member/addmsp.vue'
import addNews from './views/news/addNews.vue'
import newsList from './views/news/newsList.vue'
import addUser from "./views/user/addUser.vue"
import suggest from "./views/feel/suggest.vue"
import title from "./views/focus/title.vue"

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
          path: '/addUser',
          name: 'addUser',
          component: addUser
        },
        {
          path: '/addcomment',
          name: 'addcomment',
          component: addComment
        },
        {
          path: '/curriculumstable',
          name: 'curriculumstable',
          component: curriculumstable
        },
        {
          path: '/Coursesadd',
          name: 'Coursesadd',
          component: Coursesadd
        },
        {
          path: '/feelList',
          name: 'feellist',
          component: feelList
        },
        {
          path: '/suggest',
          name: 'suggest',
          component: suggest
        },
        {
          path: '/focus',
          name: 'focus',
          component: focus
        },
        {
          path: '/exiftoolgui',
          name: 'exiftoolgui',
          component: exiftoolgui
        },
        {
          path: '/testset',
          name: 'testset',
          component: testset
        },
        {
          path: '/title',
          name: 'title',
          component: title
        },
        {
          path: '/msglist',
          name: 'msglist',
          component: msgList
        },
        {
          path: '/addmsp',
          name: 'addmsp',
          component: addmsp
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