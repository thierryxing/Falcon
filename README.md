# Falcon
> 基于Vue2和AdminLTE的移动客户端自动化平台（前端）

## 关于Falcon
从16年初开始到现在，我们的前端团队将Vue作为主框架已经有一年多的时间了，而作为前端工程师出身的我，知识体系还停留在远古的Prototype和jQuery上，说起来也是一件十分惭愧的事情。

于是我下定决心花一段时间由浅入深地学习一下这个目前非常流行的框架，同时恶补一下ES6的知识。

本人一直赞同并践行一个观点：

> 学习一项新技术的最佳途径就是动手写一个完整的项目。

因为在这个项目中你将遇到几乎所有的问题，那么解决这些问题的过程就是你不断提高，融会贯通的过程。

学习Vue也不例外，恰好最近正在计划为内部的自动化平台Jaguar提供iOS和Android的版本，以方便大家在移动端进行使用，那么用Native去写显然有些浪费资源，而做一个Hybrid的跨平台App应该是最经济的方式了，所以最终的计划是将Jaguar进行前后端分离，然后在前端使用Vue框架，并使其同时能够支持浏览器，iOS和Android平台。

为了和Jaguar（美洲豹）相对应，最终决定给项目取名叫Falcon，即：猎鹰，和Jaguar一样都是速度飞快的动物。

经过一段时间的规划和整理，可以预计出最终的版本大约包含40个左右的页面，30个左右的组件，这么算来也可以称之为一个不大不小的项目了。

最终的界面大概如下：
![Dashboard.png](http://upload-images.jianshu.io/upload_images/1639341-feeaad585cad9bba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Project.png](http://upload-images.jianshu.io/upload_images/1639341-00dfe3a7d6767857.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[Vue实战](http://www.jianshu.com/nb/13169691)将事无巨细的记录我在完成整个项目过程中对Vue的从浅到深理解，遇到的点点滴滴问题，希望可以帮助正在入门或打算尝试Vue框架的同学们。

## 如何运行
由于后端Jaguar服务目前暂时没有开源，所以无法提供一个真实的API。但是我已经将所有的API放置在了Mock服务上，可以通过JSON Server来访问，运行方法如下：

### 配置proxyTable
首先保证，config下的index.js中proxyTable的内容如下（注释部分）：

```
    proxyTable: { // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:9090',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
```

### 运行项目：

* 安装npm依赖的库

```
npm install
```

* 运行服务

```
npm run mockdev
```

* 在浏览器中访问：[http://localhost:8080/#/](http://localhost:8080/#/)

### 登录

登录页面的用户名（邮箱）和密码可以随意填写

## 项目结构

```
.
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── global
│   │   ├── Alert.vue
│   │   ├── ConfirmModal.vue
│   │   ├── ContentFooter.vue
│   │   ├── ContentHeader.vue
│   │   ├── LoadingOverlay.vue
│   │   ├── NavBar.vue
│   │   ├── Pagination.vue
│   │   ├── SideBar.vue
│   │   ├── SideBarItem.vue
│   │   ├── TableBox.vue
│   │   └── UserPanel.vue
│   └── projects
│       ├── Dependency.vue
│       ├── EnvForm.vue
│       ├── Form.vue
│       ├── Info.vue
│       └── SideBar.vue
├── constants
│   ├── api.js
│   └── enum.js
├── main.js
├── router
│   └── index.js
├── store
│   ├── actions.js
│   ├── index.js
│   ├── modules
│   │   ├── alert.js
│   │   ├── current-platform.js
│   │   ├── current-project.js
│   │   └── current-user.js
│   └── mutation-types.js
├── utils
│   ├── networking.js
│   └── storage.js
└── views
    ├── Dashboard.vue
    ├── Layout.vue
    ├── account
    │   └── Login.vue
    ├── guardian
    │   └── List.vue
    ├── job
    │   └── Index.vue
    └── projects
        ├── Edit.vue
        ├── Home.vue
        ├── Layout.vue
        ├── New.vue
        ├── builds
        │   ├── CheckDependency.vue
        │   ├── Detail.vue
        │   ├── List.vue
        │   └── PreBuildLib.vue
        ├── environments
        │   ├── List.vue
        │   ├── New.vue
        │   └── configs
        │       ├── Fastlane.vue
        │       ├── GitClone.vue
        │       ├── Info.vue
        │       └── List.vue
        └── services
            ├── Edit.vue
            └── List.vue

18 directories, 52 files
```

## 功能
目前项目还在不断的开发中，已经包含的功能如下：

- [x] 登录
- [x] 登出
- [x] 项目列表展示
- [x] 新增项目
- [x] 项目详情
- [x] 项目依赖第三方库列表
- [x] 项目下新增构建环境
- [x] 配置环境
- [x] 项目构建列表
- [x] 项目构建前配置
- [x] 第三方服务（Bugly，Fir）列表
- [x] 项目设置
- [x] 用户列表
- ...

## 链接

### 文章

* [Vue实战（一）Falcon计划](http://www.jianshu.com/p/52eac947cd96)
* [Vue实战（二）框架和环境](http://www.jianshu.com/p/a6e37818fd9a)
* [Vue实战（三）Mock服务JSON Server](http://www.jianshu.com/p/7094c477207d)
* [Vue实战（四）组件和路由](http://www.jianshu.com/p/153f847fa2aa)

### 三方工具

* [AdminLTE](https://github.com/almasaeed2010/AdminLTE)
* [JSON Server](https://github.com/typicode/json-server)
* [Vue Highlightjs](https://github.com/metachris/vue-highlightjs)

## License
MIT licensed.
