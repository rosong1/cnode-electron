import * as React from 'react';
import Home from '@renderer/containers/Home'
import TopicDetail from '@renderer/containers/TopicDetail'
const routes = [
    {
      path: "/",
      name: "首页",
      component: Home,
      exact: true,
      routes:[
        {
          path: "/home/all",
          name: "全部",
          component: Home,
          exact: true,
        },
        {
          path: "/home/essence",
          name: "精华",
          component: () => <h2>精华</h2>,
          exact: true,
        },
        {
          path: "/home/share",
          name: "分享",
          component: () => <h2>分享</h2>,
          exact: true,
        },
        {
          path: "/home/questions",
          name: "问答",
          component: () => <h2>问答</h2>,
          exact: true,
        },
        {
          path: "/home/recruitment",
          name: "招聘",
          component: () => <h2>招聘</h2>,
          exact: true,
        },
        {
          path: "/home/clientTest",
          name: "客户端测试",
          component: () => <h2>客户端测试</h2>,
          exact: true,
        },
      ]
    },
    {
      path: "/newone",
      name: "新手入门",
      component: () => <h2>新手入门</h2>,
      exact: true,
    },
    {
      path: "/apidocs",
      name: "API",
      component: () => <h2>API</h2>,
      exact: true,
    },
    {
      path: "/about",
      name: "关于",
      component: () => <h2>关于</h2>,
      exact: true,
    },
    {
      path: "/sign",
      name: "登录与注册",
      component: () => <h2>登录与注册</h2>,
      exact: true,
      routes: [
        {
          path: "/sign/signup",
          name: "登录",
          component: () => <h2>登录</h2>,
          exact: true,
        },
        {
          path: "/sign/signin",
          name: "注册",
          component: () => <h2>注册</h2>,
          exact: true,
        },
      ]
    },
    {
      path: "/topic/:topicId",
      component: TopicDetail,
      exact: true,
    },
  ];
  
  export default routes