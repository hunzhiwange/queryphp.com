(window.webpackJsonp=window.webpackJsonp||[]).push([[232],{552:function(e,t,r){"use strict";r.r(t);var a=r(25),_=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"介绍"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[e._v("#")]),e._v(" 介绍")]),e._v(" "),r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"custom-block-title"},[e._v("The PHP Framework For Code Poem As Free As Wind")]),e._v(" "),r("p",[e._v("始于二零一零，十年磨一剑")])]),e._v(" "),r("p",[e._v("QueryPHP 是一款现代化的高性能 PHP 渐进式框架, 以提供稳定可靠的高品质企业级框架为历史使命。"),r("strong",[r("span",{staticStyle:{color:"#e82e7d"}},[e._v("USE LEEVEL DO BETTER")])])]),e._v(" "),r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"custom-block-title"},[e._v("四年重构，只为更好的自己")]),e._v(" "),r("p",[e._v("QueryPHP 基于一款成立于 2010 年的 PHP 框架 "),r("a",{attrs:{href:"https://github.com/hunzhiwange/dyhb.blog-x/tree/master/Upload/DoYouHaoBaby",target:"_blank",rel:"noopener noreferrer"}},[e._v("DoYouHaoBaby"),r("OutboundLink")],1),e._v(" 开发，最新版本 DoYouHaoBaby 更名为 "),r("a",{attrs:{href:"https://github.com/hunzhiwange/windsforce/tree/master/upload/System/include/QeePHP",target:"_blank",rel:"noopener noreferrer"}},[e._v("QeePHP"),r("OutboundLink")],1),e._v("，继承了上一代产品的优秀之处，彻底革新并进行了长达 4 年重构。")]),e._v(" "),r("p",[e._v("在这个基础上，我们引入了 Laravel、Symfony 等框架现代化先进特性，站在巨人的肩膀上保持创新。")])]),e._v(" "),r("h2",{attrs:{id:"它是如何工作的？"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#它是如何工作的？"}},[e._v("#")]),e._v(" 它是如何工作的？")]),e._v(" "),r("p",[e._v("QueryPHP 是一个渐进式 PHP 常驻框架，我们强调的是一个渐进式，它既可以运行在 PHP-FPM 场景，也可以在 Swoole 服务中运行，同时还支持在 Go RoadRunner 服务中运行。")]),e._v(" "),r("h3",{attrs:{id:"运行在-php-fpm-场景或者-php-内置-webserver"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#运行在-php-fpm-场景或者-php-内置-webserver"}},[e._v("#")]),e._v(" 运行在 PHP-FPM 场景或者 PHP 内置 webserver")]),e._v(" "),r("p",[e._v("事实上，QueryPHP 也是一个普通的 PHP 框架，目前最低版本要求 PHP 8.0.0，我们对环境并没有特别的要求。")]),e._v(" "),r("ul",[r("li",[e._v("PHP ^8.0.0")]),e._v(" "),r("li",[e._v("ext-mbstring "),r("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Support/Str.php",target:"_blank",rel:"noopener noreferrer"}},[e._v("字符处理"),r("OutboundLink")],1)]),e._v(" "),r("li",[e._v("ext-openssl "),r("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Encryption/Encryption.php",target:"_blank",rel:"noopener noreferrer"}},[e._v("加密组件"),r("OutboundLink")],1)])]),e._v(" "),r("p",[e._v("我们系统依赖的组件可以通过 "),r("a",{attrs:{href:"https://github.com/hunzhiwange/queryphp/blob/master/composer.json",target:"_blank",rel:"noopener noreferrer"}},[e._v("composer.json"),r("OutboundLink")],1),e._v(" 找到，我们提供了大量开箱即用的功能。")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("~ $ php leevel server\n# => Now visite http://127.0.0.1:9527/\n")])])]),r("p",[e._v("上面就是运行在 PHP 内置 WebServer 中，也可以用 Nginx 搭建站点。")]),e._v(" "),r("h3",{attrs:{id:"运行在-swoole-环境中"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#运行在-swoole-环境中"}},[e._v("#")]),e._v(" 运行在 Swoole 环境中")]),e._v(" "),r("p",[e._v("Swooke 可以使 PHP 开发人员可以编写高性能的异步并发 TCP、UDP、Unix Socket、HTTP，WebSocket 服务。QueryPHP 已全面支持 Swoole 协程，可以编写出性能很高的 API 服务。")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("php leevel http:server # php leevel http:server -d\nphp leevel http:reload\nphp leevel http:stop\nphp leevel http:status\n")])])]),r("p",[e._v("和 PHP-FPM 差不多")]),e._v(" "),r("p",[e._v("QueryPHP 支持热重载，开发起来很方便。")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("root@vagrant-ubuntu-10-0-2-5:/data/codes/queryphp# php leevel http:server\n_____________                           _______________\n ______/     \\__  _____  ____  ______  / /_  _________\n  ____/ __   / / / / _ \\/ __`\\/ / __ \\/ __ \\/ __ \\___\n   __/ / /  / /_/ /  __/ /  \\  / /_/ / / / / /_/ /__\n     \\_\\ \\_/\\____/\\___/_/   / / .___/_/ /_/ .___/\n        \\_\\                /_/_/         /_/\n\n                     HTTP SERVER\n\n+-----------------------+---------------------------------+\n| Item                  | Value                           |\n+-----------------------+---------------------------------+\n| host                  | 0.0.0.0                         |\n| port                  | 9527                            |\n| process_name          | leevel.http                     |\n| pid_path              | @path/runtime/protocol/http.pid |\n| worker_num            | 8                               |\n| daemonize             | 0                               |\n| enable_static_handler | 1                               |\n| document_root         | @path/www                       |\n| task_worker_num       | 4                               |\n+-----------------------+---------------------------------+\n")])])]),r("ul",[r("li",[e._v("Home http://127.0.0.1:9527/")]),e._v(" "),r("li",[e._v("MVC router http://127.0.0.1:9527/api/test")]),e._v(" "),r("li",[e._v("MVC restful router http://127.0.0.1:9527/restful/123")]),e._v(" "),r("li",[e._v("MVC restful router with method http://127.0.0.1:9527/restful/123/show")]),e._v(" "),r("li",[e._v("Annotation api router http://127.0.0.1:9527/api/v1/demo/liu")]),e._v(" "),r("li",[e._v("Annotation web router http://127.0.0.1:9527/web/v2/demo")]),e._v(" "),r("li",[e._v("php leevel link:public http://127.0.0.1:9527/public/css/page.css")]),e._v(" "),r("li",[e._v("php leevel link:storage http://127.0.0.1:9527/storage/logo.png")]),e._v(" "),r("li",[e._v("php leevel link:apis http://127.0.0.1:9527/apis/")]),e._v(" "),r("li",[e._v("php leevel link:debugbar http://127.0.0.1:9527/debugbar/debugbar.css")])]),e._v(" "),r("h3",{attrs:{id:"go-roadrunner-支持"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#go-roadrunner-支持"}},[e._v("#")]),e._v(" Go RoadRunner 支持")]),e._v(" "),r("p",[e._v("RoadRunner 是一个开源的高性能 PHP 应用服务器、负载均衡器和流程管理器。它支持作为一个服务运行，能够在每个项目的基础上扩展其功能。")]),e._v(" "),r("h3",{attrs:{id:"安装-roadrunner"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#安装-roadrunner"}},[e._v("#")]),e._v(" 安装 RoadRunner")]),e._v(" "),r("p",[e._v("你可以下载二进制文件.")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("cd /data/server\nwget https://github.com/spiral/roadrunner/releases/download/v1.3.5/roadrunner-1.3.5-darwin-amd64.zip\nunzip roadrunner-1.3.5-darwin-amd64.zip\ncd /data/codes/queryphp\n")])])]),r("h3",{attrs:{id:"roadrunner-服务"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#roadrunner-服务"}},[e._v("#")]),e._v(" RoadRunner 服务")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("/data/server/roadrunner-1.3.5-darwin-amd64/rr serve -d -v # -d = debug\n/data/server/roadrunner-1.3.5-darwin-amd64/rr http:reset\n/data/server/roadrunner-1.3.5-darwin-amd64/rr http:workers -i\n")])])]),r("p",[e._v("RoadRunner 和 php-fpm 保持一致")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("root@vagrant-ubuntu-10-0-2-5:/data/codes/queryphp# /data/server/roadrunner-1.3.5-darwin-amd64/rr serve -d -v\nDEBU[0000] [static]: disabled\nDEBU[0000] [rpc]: started\nDEBU[0000] [http]: started\nINFO[0060] 127.0.0.1 {23.1ms} 200 GET http://127.0.0.1:9527/api/test\n")])])]),r("ul",[r("li",[e._v("Home http://127.0.0.1:9527/")]),e._v(" "),r("li",[e._v("MVC router http://127.0.0.1:9527/api/test")]),e._v(" "),r("li",[e._v("MVC restful router http://127.0.0.1:9527/restful/123")]),e._v(" "),r("li",[e._v("MVC restful router with method http://127.0.0.1:9527/restful/123/show")]),e._v(" "),r("li",[e._v("Annotation router http://127.0.0.1:9527/api/v1/petLeevelForApi/helloworld")]),e._v(" "),r("li",[e._v("Annotation router with bind http://127.0.0.1:9527/api/v2/withBind/foobar")]),e._v(" "),r("li",[e._v("php leevel link:public http://127.0.0.1:9527/public/css/page.css")]),e._v(" "),r("li",[e._v("php leevel link:storage http://127.0.0.1:9527/storage/logo.png")]),e._v(" "),r("li",[e._v("php leevel link:apis http://127.0.0.1:9527/apis/")]),e._v(" "),r("li",[e._v("php leevel link:debugbar http://127.0.0.1:9527/debugbar/debugbar.css")])]),e._v(" "),r("h2",{attrs:{id:"特性"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#特性"}},[e._v("#")]),e._v(" 特性")]),e._v(" "),r("ul",[r("li",[e._v("生产就绪 (Production-ready)")]),e._v(" "),r("li",[e._v("框架理念 (值得托付的使命感，让每一个 PHP 应用都有一个好框架。)")]),e._v(" "),r("li",[e._v("组件系统 (框架底层由独立的高内聚低耦合组件构成，可以轻松无侵入接入现有系统。)")]),e._v(" "),r("li",[e._v("路由系统 (框架提供 MVC 自动路由并能够智能解析 Restful 请求和基于 OpenApi 3.0 规范的 swagger-php 注解路由，文档路由一步搞定。)")]),e._v(" "),r("li",[e._v("整体解决方案 (框架提供了从缓存、Session、IOC 容器、模板引擎、Ddd ORM 等大量开箱即用的功能，提供了基于 Symfony Console 命令行工具集。)")]),e._v(" "),r("li",[e._v("高品质 (百分之百单元测试覆盖直面 Bug，致力于创造高品质产品 Level Level Leevel。)")]),e._v(" "),r("li",[e._v("业务协程化 (基于 Swoole 4 开发，我们的愿景是少量代码或者无修改，让你的业务撑起更多的用户服务。)")]),e._v(" "),r("li",[e._v("百分之百单元测试覆盖（超过 3500 例测试用例保证系统可靠性和可持续维护。）")]),e._v(" "),r("li",[e._v("PHP 7 严格模式 （每一个 PHP 脚本都是 strict_types=1，严格模式可以避免很多弱类型带来潜在 BUG。）")]),e._v(" "),r("li",[e._v("PHP 7 类型提示 (尽可能为每一个方法提供确定的参数类型和返回值类型，以及类属性的类型支持。）")]),e._v(" "),r("li",[e._v("依赖注入（完整实现，关键 MVC、命令行脚本、事件监听器全部接入 IOC 容器。）")]),e._v(" "),r("li",[e._v("领域驱动设计（支持 UnitOfWork 事务工作单元、Repository 仓储、Specification 查询规约，Entity Getter Setter领域实体等。）")]),e._v(" "),r("li",[e._v("避免闭门造车 (QueryPHP 一直从 Laravel、Symfony 等框架吸收一些优秀的设计，同时我们自身也进行了大量的创新设计。)")]),e._v(" "),r("li",[e._v("更多的特性期待你的发现...")])]),e._v(" "),r("h2",{attrs:{id:"todo"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#todo"}},[e._v("#")]),e._v(" Todo")]),e._v(" "),r("p",[e._v("QueryPHP 仍然处于开发中，这里有一些目前还不支持、但已经在计划中的特性：")]),e._v(" "),r("ul",[r("li",[e._v("完善 Swoole")]),e._v(" "),r("li",[e._v("完善开发文档")]),e._v(" "),r("li",[e._v("更多边界单元测试")])]),e._v(" "),r("p",[e._v("我们欢迎你为 QueryPHP 的开发作出贡献。")])])}),[],!1,null,null,null);t.default=_.exports}}]);