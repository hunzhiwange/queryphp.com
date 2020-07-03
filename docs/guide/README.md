# 介绍

::: tip The PHP Framework For Code Poem As Free As Wind
始于二零一零，十年磨一剑
:::

QueryPHP 是一款现代化的高性能 PHP 渐进式协程框架, 我们还是主要面向传统 PHP-FPM 场景，以工程师用户体验为历史使命，让每一个 PHP 应用都有一个好框架。

百分之百单元测试覆盖直面 Bug，致力于创造高品质产品 Level Level Leevel，依托 Swoole 开启未来更多可能，此刻未来逐步渐进。我们的愿景是 USE <span style="color:#f80378">LEEVEL</span> WITH <span style="color:#008ee6">SWOOLE</span> DO <span style="color:#02d629">BETTER</span>，让您的业务撑起更多的用户服务。

::: tip 四年重构，只为更好的自己
QueryPHP 基于一款成立于 2010 年的 PHP 框架 [DoYouHaoBaby](https://github.com/hunzhiwange/dyhb.blog-x/tree/master/Upload/DoYouHaoBaby) 开发，最新版本 DoYouHaoBaby 更名为 [QeePHP](https://github.com/hunzhiwange/windsforce/tree/master/upload/System/include/QeePHP)，继承了上一代产品的优秀之处，彻底革新并进行了长达 3 年重构。

在这个基础上，我们引入了 Laravel、Symfony 等框架现代化先进特性，站在巨人的肩膀上保持创新。
:::

## 它是如何工作的？

QueryPHP 是一个渐进式 PHP 常驻框架，我们强调的是一个渐进式，它既可以运行在 PHP-FPM 场景，也可以在 Swoole 服务中运行，同时还支持在 Go RoadRunner 服务中运行。

### 运行在 PHP-FPM 场景或者 PHP 内置 webserver

事实上，QueryPHP 也是一个普通的 PHP 框架，目前最低版本要求 PHP 7.4.0，我们对环境并没有特别的要求。

 * PHP ^7.4.0
 * ext-mbstring [字符处理](https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Support/Str.php)
 * ext-openssl [加密组件](https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Encryption/Encryption.php)

我们系统依赖的组件可以通过 [composer.json](https://github.com/hunzhiwange/queryphp/blob/master/composer.json) 找到，我们提供了大量开箱即用的功能。

```
~ $ php leevel server
# => Now visite http://127.0.0.1:9527/
```

上面就是运行在 PHP 内置 WebServer 中，也可以用 Nginx 搭建站点。

### 运行在 Swoole 环境中

Swooke 可以使 PHP 开发人员可以编写高性能的异步并发 TCP、UDP、Unix Socket、HTTP，WebSocket 服务。QueryPHP 已全面支持 Swoole 协程，可以编写出性能很高的 API 服务。

```
php leevel http:server # php leevel http:server -d
php leevel http:reload
php leevel http:stop
php leevel http:status
```

和 PHP-FPM 差不多

QueryPHP 支持热重载，开发起来很方便。

```
root@vagrant-ubuntu-10-0-2-5:/data/codes/queryphp# php leevel http:server
_____________                           _______________
 ______/     \__  _____  ____  ______  / /_  _________
  ____/ __   / / / / _ \/ __`\/ / __ \/ __ \/ __ \___
   __/ / /  / /_/ /  __/ /  \  / /_/ / / / / /_/ /__
     \_\ \_/\____/\___/_/   / / .___/_/ /_/ .___/
        \_\                /_/_/         /_/

                     HTTP SERVER

+-----------------------+---------------------------------+
| Item                  | Value                           |
+-----------------------+---------------------------------+
| host                  | 0.0.0.0                         |
| port                  | 9527                            |
| process_name          | leevel.http                     |
| pid_path              | @path/runtime/protocol/http.pid |
| worker_num            | 8                               |
| daemonize             | 0                               |
| enable_static_handler | 1                               |
| document_root         | @path/www                       |
| task_worker_num       | 4                               |
+-----------------------+---------------------------------+
```

 * Home http://127.0.0.1:9527/
 * MVC router http://127.0.0.1:9527/api/test
 * MVC restful router http://127.0.0.1:9527/restful/123
 * MVC restful router with method http://127.0.0.1:9527/restful/123/show
 * Annotation router http://127.0.0.1:9527/api/v1/petLeevelForApi/helloworld
 * Annotation router with bind http://127.0.0.1:9527/api/v2/withBind/foobar
 * php leevel link:public http://127.0.0.1:9527/public/css/page.css
 * php leevel link:storage http://127.0.0.1:9527/storage/logo.png
 * php leevel link:apis http://127.0.0.1:9527/apis/
 * php leevel link:debugbar http://127.0.0.1:9527/debugbar/debugbar.css

### Go RoadRunner 支持

RoadRunner 是一个开源的高性能 PHP 应用服务器、负载均衡器和流程管理器。它支持作为一个服务运行，能够在每个项目的基础上扩展其功能。

### 安装 RoadRunner

你可以下载二进制文件.

```
cd /data/server
wget https://github.com/spiral/roadrunner/releases/download/v1.3.5/roadrunner-1.3.5-darwin-amd64.zip
unzip roadrunner-1.3.5-darwin-amd64.zip
cd /data/codes/queryphp
```

### RoadRunner 服务

```
/data/server/roadrunner-1.3.5-darwin-amd64/rr serve -d -v # -d = debug
/data/server/roadrunner-1.3.5-darwin-amd64/rr http:reset
/data/server/roadrunner-1.3.5-darwin-amd64/rr http:workers -i
```

RoadRunner 和 php-fpm 保持一致

```
root@vagrant-ubuntu-10-0-2-5:/data/codes/queryphp# /data/server/roadrunner-1.3.5-darwin-amd64/rr serve -d -v
DEBU[0000] [static]: disabled
DEBU[0000] [rpc]: started
DEBU[0000] [http]: started
INFO[0060] 127.0.0.1 {23.1ms} 200 GET http://127.0.0.1:9527/api/test
```

 * Home http://127.0.0.1:9527/
 * MVC router http://127.0.0.1:9527/api/test
 * MVC restful router http://127.0.0.1:9527/restful/123
 * MVC restful router with method http://127.0.0.1:9527/restful/123/show
 * Annotation router http://127.0.0.1:9527/api/v1/petLeevelForApi/helloworld
 * Annotation router with bind http://127.0.0.1:9527/api/v2/withBind/foobar
 * php leevel link:public http://127.0.0.1:9527/public/css/page.css
 * php leevel link:storage http://127.0.0.1:9527/storage/logo.png
 * php leevel link:apis http://127.0.0.1:9527/apis/
 * php leevel link:debugbar http://127.0.0.1:9527/debugbar/debugbar.css

## 特性

- 生产就绪 (Production-ready)
- 框架理念 (值得托付的使命感，让每一个 PHP 应用都有一个好框架。)
- 组件系统 (框架底层由独立的高内聚低耦合组件构成，可以轻松无侵入接入现有系统。)
- 路由系统 (框架提供 MVC 自动路由并能够智能解析 Restful 请求和基于 OpenApi 3.0 规范的 swagger-php 注解路由，文档路由一步搞定。)
- 整体解决方案 (框架提供了从缓存、Session、IOC 容器、模板引擎、Ddd ORM 等大量开箱即用的功能，提供了基于 Symfony Console 命令行工具集。)
- 高品质 (百分之百单元测试覆盖直面 Bug，致力于创造高品质产品 Level Level Leevel。)
- 业务协程化 (基于 Swoole 4 开发，我们的愿景是少量代码或者无修改，让你的业务撑起更多的用户服务。)
- 百分之百单元测试覆盖（超过 3500 例测试用例保证系统可靠性和可持续维护。）
- PHP 7 严格模式 （每一个 PHP 脚本都是 strict_types=1，严格模式可以避免很多弱类型带来潜在 BUG。）
- PHP 7 类型提示 (尽可能为每一个方法提供确定的参数类型和返回值类型，以及类属性的类型支持。）
- 依赖注入（完整实现，关键 MVC、命令行脚本、事件监听器全部接入 IOC 容器。）
- 领域驱动设计（支持 UnitOfWork 事务工作单元、Repository 仓储、Specification 查询规约，Entity Getter Setter领域实体等。）
- 避免闭门造车 (QueryPHP 一直从 Laravel、Symfony 等框架吸收一些优秀的设计，同时我们自身也进行了大量的创新设计。)
- 更多的特性期待你的发现...

## Todo

QueryPHP 仍然处于开发中，这里有一些目前还不支持、但已经在计划中的特性：

- 完善 Swoole
- 完善开发文档
- 更多边界单元测试

我们欢迎你为 QueryPHP 的开发作出贡献。
