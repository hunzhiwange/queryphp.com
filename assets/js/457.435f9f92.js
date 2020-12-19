(window.webpackJsonp=window.webpackJsonp||[]).push([[457],{733:function(e,r,t){"use strict";t.r(r);var a=t(25),_=Object(a.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[e._v("#")]),e._v(" 介绍")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("The PHP Framework For Code Poem As Free As Wind")]),e._v(" "),t("p",[e._v("始于二零一零，十年磨一剑")])]),e._v(" "),t("p",[e._v("QueryPHP 是一款现代化的高性能 PHP 渐进式框架, 以提供稳定可靠的高品质企业级框架为历史使命。"),t("strong",[t("span",{staticStyle:{color:"#e82e7d"}},[e._v("USE LEEVEL DO BETTER")])])]),e._v(" "),t("h2",{attrs:{id:"特性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#特性"}},[e._v("#")]),e._v(" 特性")]),e._v(" "),t("ul",[t("li",[e._v("生产就绪 (Production-ready)")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://www.queryphp.com/docs/router/",target:"_blank",rel:"noopener noreferrer"}},[e._v("简单高性能路由"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://www.queryphp.com/docs/template/",target:"_blank",rel:"noopener noreferrer"}},[e._v("富于表现力的模板引擎"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://www.queryphp.com/docs/database/",target:"_blank",rel:"noopener noreferrer"}},[e._v("基于领域驱动设计的强大 ORM"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("高质量代码及高覆盖率"),t("a",{attrs:{href:"https://github.com/hunzhiwange/framework/tree/master/tests",target:"_blank",rel:"noopener noreferrer"}},[e._v("单元测试"),t("OutboundLink")],1)])]),e._v(" "),t("h2",{attrs:{id:"它是如何工作的？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#它是如何工作的？"}},[e._v("#")]),e._v(" 它是如何工作的？")]),e._v(" "),t("p",[e._v("QueryPHP 是一个渐进式 PHP 常驻框架，我们强调的是一个渐进式，它既可以运行在 PHP-FPM 场景，也可以在 Swoole 服务中运行，同时还支持在 Go RoadRunner 服务中运行。")]),e._v(" "),t("h3",{attrs:{id:"运行在-php-fpm-场景或者-php-内置-webserver"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#运行在-php-fpm-场景或者-php-内置-webserver"}},[e._v("#")]),e._v(" 运行在 PHP-FPM 场景或者 PHP 内置 webserver")]),e._v(" "),t("p",[e._v("事实上，QueryPHP 也是一个普通的 PHP 框架，目前最低版本要求 PHP 8.0.0，我们对环境并没有特别的要求。")]),e._v(" "),t("ul",[t("li",[e._v("PHP ^8.0.0")]),e._v(" "),t("li",[e._v("ext-mbstring "),t("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Support/Str.php",target:"_blank",rel:"noopener noreferrer"}},[e._v("字符处理"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("ext-openssl "),t("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Encryption/Encryption.php",target:"_blank",rel:"noopener noreferrer"}},[e._v("加密组件"),t("OutboundLink")],1)])]),e._v(" "),t("p",[e._v("我们系统依赖的组件可以通过 "),t("a",{attrs:{href:"https://github.com/hunzhiwange/queryphp/blob/master/composer.json",target:"_blank",rel:"noopener noreferrer"}},[e._v("composer.json"),t("OutboundLink")],1),e._v(" 找到，我们提供了大量开箱即用的功能。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("~ $ php leevel server\n# => Now visite http://127.0.0.1:9527/\n")])])]),t("ul",[t("li",[e._v("Home http://127.0.0.1:9527/")]),e._v(" "),t("li",[e._v("MVC router http://127.0.0.1:9527/api/test")]),e._v(" "),t("li",[e._v("MVC restful router http://127.0.0.1:9527/restful/123")]),e._v(" "),t("li",[e._v("MVC restful router with method http://127.0.0.1:9527/restful/123/show")]),e._v(" "),t("li",[e._v("Annotation api router http://127.0.0.1:9527/api/v1/demo/liu")]),e._v(" "),t("li",[e._v("Annotation web router http://127.0.0.1:9527/web/v2/demo")]),e._v(" "),t("li",[e._v("php leevel link:public http://127.0.0.1:9527/public/css/page.css")]),e._v(" "),t("li",[e._v("php leevel link:storage http://127.0.0.1:9527/storage/logo.png")]),e._v(" "),t("li",[e._v("php leevel link:apis http://127.0.0.1:9527/apis/")]),e._v(" "),t("li",[e._v("php leevel link:debugbar http://127.0.0.1:9527/debugbar/debugbar.cs")])]),e._v(" "),t("p",[e._v("上面就是运行在 PHP 内置 WebServer 中，也可以用 Nginx 搭建站点。")]),e._v(" "),t("h3",{attrs:{id:"运行在-swoole-环境中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#运行在-swoole-环境中"}},[e._v("#")]),e._v(" 运行在 Swoole 环境中")]),e._v(" "),t("p",[e._v("Swooke 可以使 PHP 开发人员可以编写高性能的异步并发 TCP、UDP、Unix Socket、HTTP，WebSocket 服务。QueryPHP 已全面支持 Swoole 协程，可以编写出性能很高的 API 服务。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("php leevel http:server # php leevel http:server -d\nphp leevel http:reload\nphp leevel http:stop\nphp leevel http:status\n")])])]),t("p",[e._v("和 PHP-FPM 差不多")]),e._v(" "),t("p",[e._v("QueryPHP 支持热重载，开发起来很方便。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("root@vagrant-ubuntu-10-0-2-5:/data/codes/queryphp# php leevel http:server\n_____________                           _______________\n ______/     \\__  _____  ____  ______  / /_  _________\n  ____/ __   / / / / _ \\/ __`\\/ / __ \\/ __ \\/ __ \\___\n   __/ / /  / /_/ /  __/ /  \\  / /_/ / / / / /_/ /__\n     \\_\\ \\_/\\____/\\___/_/   / / .___/_/ /_/ .___/\n        \\_\\                /_/_/         /_/\n\n                     HTTP SERVER\n\n+-----------------------+---------------------------------+\n| Item                  | Value                           |\n+-----------------------+---------------------------------+\n| host                  | 0.0.0.0                         |\n| port                  | 9527                            |\n| process_name          | leevel.http                     |\n| pid_path              | @path/runtime/protocol/http.pid |\n| worker_num            | 8                               |\n| daemonize             | 0                               |\n| enable_static_handler | 1                               |\n| document_root         | @path/www                       |\n| task_worker_num       | 4                               |\n+-----------------------+---------------------------------+\n")])])]),t("h3",{attrs:{id:"go-roadrunner-支持"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#go-roadrunner-支持"}},[e._v("#")]),e._v(" Go RoadRunner 支持")]),e._v(" "),t("p",[e._v("RoadRunner 是一个开源的高性能 PHP 应用服务器、负载均衡器和流程管理器。它支持作为一个服务运行，能够在每个项目的基础上扩展其功能。")]),e._v(" "),t("h3",{attrs:{id:"安装-roadrunner"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装-roadrunner"}},[e._v("#")]),e._v(" 安装 RoadRunner")]),e._v(" "),t("p",[e._v("你可以下载二进制文件.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cd /data/server\nwget https://github.com/spiral/roadrunner/releases/download/v1.3.5/roadrunner-1.3.5-darwin-amd64.zip\nunzip roadrunner-1.3.5-darwin-amd64.zip\ncd /data/codes/queryphp\n")])])]),t("h3",{attrs:{id:"roadrunner-服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#roadrunner-服务"}},[e._v("#")]),e._v(" RoadRunner 服务")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/data/server/roadrunner-1.3.5-darwin-amd64/rr serve -d -v # -d = debug\n/data/server/roadrunner-1.3.5-darwin-amd64/rr http:reset\n/data/server/roadrunner-1.3.5-darwin-amd64/rr http:workers -i\n")])])]),t("p",[e._v("RoadRunner 和 php-fpm 保持一致")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("root@vagrant-ubuntu-10-0-2-5:/data/codes/queryphp# /data/server/roadrunner-1.3.5-darwin-amd64/rr serve -d -v\nDEBU[0000] [static]: disabled\nDEBU[0000] [rpc]: started\nDEBU[0000] [http]: started\nINFO[0060] 127.0.0.1 {23.1ms} 200 GET http://127.0.0.1:9527/api/test\n")])])]),t("h2",{attrs:{id:"todo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#todo"}},[e._v("#")]),e._v(" Todo")]),e._v(" "),t("p",[e._v("QueryPHP 仍然处于开发中，这里有一些目前还不支持、但已经在计划中的特性：")]),e._v(" "),t("ul",[t("li",[e._v("完善 Swoole")]),e._v(" "),t("li",[e._v("完善开发文档")]),e._v(" "),t("li",[e._v("更多边界单元测试")])]),e._v(" "),t("p",[e._v("我们欢迎你为 QueryPHP 的开发作出贡献。")])])}),[],!1,null,null,null);r.default=_.exports}}]);