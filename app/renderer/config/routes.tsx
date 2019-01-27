import * as React from 'react';
import Home from '@renderer/containers/Home'
import Essence from '@renderer/containers/Home/Essence'
import Share from '@renderer/containers/Home/Share'
import Ask from '@renderer/containers/Home/Ask'
import Job from '@renderer/containers/Home/Job'
import Dev from '@renderer/containers/Home/Dev'
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
          component: Essence,
          exact: true,
        },
        {
          path: "/home/share",
          name: "分享",
          component: Share,
          exact: true,
        },
        {
          path: "/home/questions",
          name: "问答",
          component: Ask,
          exact: true,
        },
        {
          path: "/home/recruitment",
          name: "招聘",
          component: Job,
          exact: true,
        },
        {
          path: "/home/clientTest",
          name: "客户端测试",
          component: Dev,
          exact: true,
        },
      ]
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