(window.webpackJsonp=window.webpackJsonp||[]).push([[151],{378:function(t,n,e){"use strict";e.r(n);var s=e(2),a=Object(s.a)({},(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"directory"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#directory"}},[t._v("#")]),t._v(" Directory")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Testing Is Documentation")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/tests/Docs/Started/DirectoryDoc.php",target:"_blank",rel:"noopener noreferrer"}},[t._v("tests/Docs/Started/DirectoryDoc.php"),e("OutboundLink")],1)])]),t._v(" "),e("p",[t._v("QueryPHP 遵循 "),e("strong",[t._v("“约定优于配置”")]),t._v(" 的原则，主张通过领域驱动设计来构建更可靠的软件。")]),t._v(" "),e("h2",{attrs:{id:"基本结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基本结构"}},[t._v("#")]),t._v(" 基本结构")]),t._v(" "),e("p",[t._v("下面是整个应用基本目录结构，系统结构可以自由定义。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v(".\n├── apis Swagger API 目录\n├── application\n│   ├── admin （后台应用）通用后台 API 接口\n│   ├── app （默认应用）\n│   │   ├── App 应用层（Application）\n│   │   ├── Domain 领域模型层（Domain Model）\n│   │   │   └── Entity 实体 (Entity)\n│   │   │   └── Event 事件（Event）\n│   │   │   └── Listener 监听器（Listener）\n│   │   ├── Infra 基础设施层（Infrastructure）\n│   │   │   └── Provider 服务提供者 (Provider)\n│   │   │   └── Repository 仓储 (Repository)\n│   │   ├── ui 用户界面 User Interface（表现层 Presentation）\n│-- build 一些脚本\n│-- common 公共组件 (结构类 application/app)\n│-- database 数据库迁移\n│   ├── migrations 数据库迁移\n│   ├── seeds 填充数据\n│-- frontend 基于 Vue2+IView 前端通用权限管理系统\n│-- i18n 语言包\n│   ├── zh-CN 中文\n│   ├── zh-TW 台湾繁体\n│   ├── en-US 美国英语\n│-- option 配置目录\n│-- public 静态资源目录，比如图片、CSS\n│-- runtime 运行缓存目录\n│-- storage 文件上传目录\n│-- tests 单元测试目录\n│-- themes 视图文件目录\n│-- vendor Composer 第三方库目录\n│-- www Web 入口目录\n│-- ...\n│-- .env 环境变量\n│-- .env.phpunit 单元测试环境变量\n│-- .php_cs.dist 统一团队风格配置\n│-- .travis.yml Travis 持续集成配置\n│-- composer.json Composer 配置\n│-- leevel 命令行工具集 php leevel\n│-- package.json 前端包\n│-- phinx.php 数据库迁移配置\n│-- phpunit.xml.dist PHPUnit 配置\n│-- phpunit.xml.dist PHPUnit 生成 HTML 覆盖率配置，需要安装 xdebug\n└── ...\n")])])]),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),e("p",[t._v("请留意目录名的大写。")])]),t._v(" "),e("div",{staticClass:"custom-block danger"},[e("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),e("p",[t._v("在 Mac 或者 Linux 环境下面，注意需要设置 "),e("code",[t._v("runtime")]),t._v("、"),e("code",[t._v("bootstrap")]),t._v(" 和 "),e("code",[t._v("storage")]),t._v(" 目录权限为 0777。\n当然实际上我们在 Mac 开发环境直接给某个目录授权给用户。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("drwxr-xr-x  62 dyhb  staff   1.9K 11 19 11:14 codes\n")])])])]),t._v(" "),e("h2",{attrs:{id:"多应用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#多应用"}},[t._v("#")]),t._v(" 多应用")]),t._v(" "),e("p",[t._v("QueryPHP 设计了一个很简单的规则来访问多应用，只需要加 "),e("code",[t._v(":")]),t._v(" 即可，该目录会自动识别为应用，例如:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("http://127.0.0.1:9527/ 默认应用首页\nhttp://127.0.0.1:9527/:admin/ Admin 应用首页\nhttp://127.0.0.1:9527/api/show 默认应用 API 控制器 show 方法\nhttp://127.0.0.1:9527/:admin/api/show Admin 应用 API 控制器 show 方法\n")])])])])}),[],!1,null,null,null);n.default=a.exports}}]);