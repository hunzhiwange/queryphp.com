# 介绍

::: tip The PHP Framework For Code Poem As Free As Wind
始于二零一零，十年磨一剑
:::

QueryPHP 是一款现代化的高性能 PHP 渐进式框架, 以提供稳定可靠的高品质企业级框架为历史使命。**<span style="color:#e82e7d;">USE LEEVEL DO BETTER</span>**

## 特性

- 生产就绪 (Production-ready)
- [简单高性能路由](https://www.queryphp.com/docs/router/)
- [富于表现力的模板引擎](https://www.queryphp.com/docs/template/)
- [基于领域驱动设计的强大 ORM](https://www.queryphp.com/docs/database/)
- 高质量代码及高覆盖率[单元测试](https://github.com/hunzhiwange/framework/tree/master/tests)

## 它是如何工作的？

QueryPHP 是一个渐进式 PHP 常驻框架，我们强调的是一个渐进式，它既可以运行在 PHP-FPM 场景，同时还支持在 Go RoadRunner 服务中运行。

### 运行在 PHP-FPM 场景或者 PHP 内置 webserver

事实上，QueryPHP 也是一个普通的 PHP 框架，目前最低版本要求 PHP 8.1.0，我们对环境并没有特别的要求。

 * PHP ^8.1.0
 * ext-mbstring [字符处理](https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Support/Str.php)
 * ext-openssl [加密组件](https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Encryption/Encryption.php)

我们系统依赖的组件可以通过 [composer.json](https://github.com/hunzhiwange/queryphp/blob/master/composer.json) 找到，我们提供了大量开箱即用的功能。

```
~ $ php leevel server
# => Now visite http://127.0.0.1:9527/
```

- Home http://127.0.0.1:9527/
- MVC router http://127.0.0.1:9527/api/test
- MVC restful router http://127.0.0.1:9527/restful/123
- MVC restful router with method http://127.0.0.1:9527/restful/123/show
- Annotation api router http://127.0.0.1:9527/api/v1/demo/liu
- Annotation web router http://127.0.0.1:9527/web/v2/demo
- php leevel link:static http://127.0.0.1:9527/static/css/page.css
- php leevel link:attachments http://127.0.0.1:9527/attachments/.gitignore
- php leevel link:apis http://127.0.0.1:9527/apis/
- php leevel link:debugbar http://127.0.0.1:9527/debugbar/debugbar.cs

上面就是运行在 PHP 内置 WebServer 中，也可以用 Nginx 搭建站点。

### Go RoadRunner 支持

RoadRunner 是一个开源的高性能 PHP 应用服务器、负载均衡器和流程管理器。它支持作为一个服务运行，能够在每个项目的基础上扩展其功能。

### 安装 RoadRunner

你可以下载二进制文件.

```
cd /data/server
wget https://github.com/spiral/roadrunner/releases/download/v2.12.1/roadrunner-2.12.1-darwin-amd64.zip
unzip roadrunner-2.12.1-darwin-amd64.zip
cd /data/codes/queryphp
```

### RoadRunner 服务

安装依赖包

- composer require spiral/roadrunner ^2.12.1
- composer require spiral/dumper ^2.14.1.
- composer require symfony/psr-http-message-bridge ^2.0
- composer require nyholm/psr7 ^1.5

```
/data/server/roadrunner-2.12.1-darwin-amd64/rr serve
/data/server/roadrunner-2.12.1-darwin-amd64/rr http:reset
```

RoadRunner 和 php-fpm 保持一致

```
root@vagrant-ubuntu-10-0-2-5:/data/codes/queryphp# /data/server/roadrunner-2.12.1-darwin-amd64/rr serve
2022-12-10T16:43:30.226+0800	DEBUG	rpc         	plugin was started	{"address": "tcp://127.0.0.1:6001", "list of the plugins with RPC methods:": ["app", "informer", "resetter"]}
[INFO] RoadRunner server started; version: 2.12.1, buildtime: 2022-12-01T12:41:50+0000
2022-12-10T16:43:30.524+0800	DEBUG	server      	worker is allocated	{"pid": 9522, "internal_event_name": "EventWorkerConstruct"}
2022-12-10T16:43:30.524+0800	DEBUG	server      	worker is allocated	{"pid": 9525, "internal_event_name": "EventWorkerConstruct"}
2022-12-10T16:43:30.524+0800	DEBUG	server      	worker is allocated	{"pid": 9523, "internal_event_name": "EventWorkerConstruct"}
2022-12-10T16:43:30.524+0800	DEBUG	server      	worker is allocated	{"pid": 9529, "internal_event_name": "EventWorkerConstruct"}
2022-12-10T16:43:30.524+0800	DEBUG	server      	worker is allocated	{"pid": 9528, "internal_event_name": "EventWorkerConstruct"}
2022-12-10T16:43:30.524+0800	DEBUG	server      	worker is allocated	{"pid": 9526, "internal_event_name": "EventWorkerConstruct"}
2022-12-10T16:43:30.524+0800	DEBUG	server      	worker is allocated	{"pid": 9527, "internal_event_name": "EventWorkerConstruct"}
2022-12-10T16:43:30.524+0800	DEBUG	server      	worker is allocated	{"pid": 9524, "internal_event_name": "EventWorkerConstruct"}
2022-12-10T16:43:30.525+0800	DEBUG	http        	http server was started	{"address": "0.0.0.0:9527"}
2022-12-10T16:44:08.664+0800	INFO	http        	http log	{"status": 200, "method": "GET", "URI": "/", "remote_address": "127.0.0.1:56516", "read_bytes": 0, "write_bytes": 18441, "start": "2022-12-10T16:44:08.644+0800", "elapsed": "19.623241ms"}
```

## Todo

QueryPHP 仍然处于开发中，这里有一些目前还不支持、但已经在计划中的特性：

- 完善开发文档
- 更多边界单元测试

我们欢迎你为 QueryPHP 的开发作出贡献。
