# 介绍

::: tip The PHP Framework For Code Poem As Free As Wind
始于二零一零，八年磨一剑
:::

QueryPHP 是一款现代化的高性能 PHP 渐进式协程框架, 我们还是主要面向传统 PHP-FPM 开发者，以工程师用户体验为历史使命，让每一个 PHP 应用都有一个好框架。

百分之百单元测试覆盖直面 Bug，基于 Zephir 实现框架核心常驻，依托 Swoole 协程提升业务性能，此刻未来逐步渐进。我们的愿景是 USE <span style="color:#f80378">LEEVEL</span> WITH <span style="color:#008ee6">SWOOLE</span> DO <span style="color:#02d629">BETTER</span>，让您的业务撑起更多的用户服务。

::: tip 两年重构，只为更好的自己
QueryPHP 基于一款成立于 2010 年的 PHP 框架 [DoYouHaoBaby](https://raw.githubusercontent.com/hunzhiwange/framework/master/doyouhaobaby-googlecode.jpg/) 开发，继承了上一代产品的优秀之处，彻底革新并进行了长达 2 年重构.

在这个基础上，我们引入了 Laravel、Symfony 等框架现代化先进特性，站在巨人的肩膀上保持创新。
:::

## 它是如何工作的？

QueryPHP 是一个渐进式 PHP 常驻框架，我们强调的是一个渐进式，它既可以运行在 PHP-FPM 场景，也可以将框架核心编译成 C 扩展，同时还支持在 Swoole 服务中运行。

### 运行在 PHP-FPM 场景或者 PHP 内置 webserver

事实上，QueryPHP 也是一个普通的 PHP 框架，目前最低版本要求 PHP 7.3.2，我们对环境并没有特别的要求。

 * PHP ^7.3.2
 * ext-mbstring [字符处理](https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Support/Str.php)
 * ext-openssl [加密组件](https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Encryption/Encryption.php)

我们系统依赖的组件可以通过 [composer.json](https://github.com/hunzhiwange/queryphp/blob/master/composer.json) 找到，我们提供了大量开箱即用的功能。

```
~ $ php leevel server
# => Now visite http://127.0.0.1:9527/
```

上面就是运行在 PHP 内置 WebServer 中，也可以用 Nginx 搭建站点。

### 框架编译成 C 扩展

我们为了更好的性能，为整个 QueryPHP 的核心开发了一套可选的 C 扩展，它不是必须要安装的。

Leevel 是一个开源 PHP C 扩展开发框架，采用 zephir 编写，是为了解决使用框架带来性能下降的经典矛盾，Leevel 是为了解决 QueryPHP 性能而开发，可以与同版本的 QueryPHP 混合使用，将接管 composer 中的 PHP 版本功能。

它是如何做到接管 composer 中的底层核心的呢。

我们访问一个类, composer 根据 psr4 规则去搜索到我们文件而载入，如下的脚本会被载入。

[Leevel/Di/Container.php](https://github.com/hunzhiwange/framework/blob/master/src/Leevel/Di/Container.php)

```
<?php

use Leevel\Di\Container;

...
$container = new Container();
$container->instance('foo', 'bar');
var_dump($container->make('foo')); // bar
...
```

如果我们存在一个扩展就提供了这样一个类并随着 PHP 常驻，是不是性能不错，实际上是可以，QueryPHP 选择了 zephir 来实现。

[leevel/di/container.zep](https://github.com/hunzhiwange/leevel/blob/master/leevel/di/container.zep)


实际上会被编译成 C，被最终被编译成 PHP 扩展。

[leevel/di/container.zep.c](https://github.com/hunzhiwange/leevel/blob/master/ext/leevel/di/container.zep.c)

这样子,不需要修改代码直接提升性能。

#### Windows 系统

暂未提供 dll.

#### Linux 操作系统

下载源代码.

```
git clone git@github.com:hunzhiwange/leevel.git
cd ext
```

编译扩展.

```
$/path/to/phpize
$./configure --with-php-config=/path/to/php-config
$make && make install
```

将扩展添加到你的 php.ini, 使用 php -m 查看扩展是否被安装.

```
extension = leevel.so
```

### 运行在 Swoole 环境中

swoole 的问世对于 PHP 后端来说是一种福音，swoole 4.1 已经开始支持原始 pdo,redis 协程，支持 swoole 势在必行。已经做了一些基础工作，对于第一个版本我们要完善单元测试，所以下一个版本主要支持 swoole。

```
php leevel swoole:http
```

::: warning
Swoole 部分在第一个版本被撤下来了，后面回归。
:::

## 特性

- 框架理念 (值得托付的使命感，让每一个 PHP 应用都有一个好框架。)
- 组件系统 ([框架底层由独立的高内聚低耦合组件构成，可以轻松无侵入接入现有系统。](https://packagist.org/packages/leevel/))
- 路由系统 ([框架提供 MVC 自动路由并能够智能解析 Restful 请求和基于 OpenApi 3.0 规范的 swagger-php 注解路由，文档路由一步搞定。](https://www.v2ex.com/t/492979#reply3))
- 整体解决方案 (框架提供了从缓存、Session、IOC 容器、模板引擎、Ddd ORM 等大量开箱即用的功能，提供了基于 Symfony Console 命令行工具集。)
- 框架常驻 ([Leevel 可选扩展接管底层核心](https://github.com/hunzhiwange/leevel))
- 业务常驻 (基于 Swoole 4 开发，我们的愿景是少量代码或者无修改，让你的业务撑起更多的用户服务。)
- 百分之百单元测试覆盖（[单元测试一直是国产 PHP 开源项目的痛](https://github.com/hunzhiwange/framework/tree/master/tests)）
- 拜师国外现代化框架 ([从 Laravel、Symfony 吸收大量特性，也包含其它的框架.](https://github.com/hunzhiwange/framework/blob/master/LICENSE))
- PHP 7 严格模式 （每一个 PHP 脚本都是 strict_types = 1）
- PHP 7 类型提示 (尽可能为每一个方法提供确定的参数类型和返回值类型）
- 依赖注入 （完整实现，关键 mvc、命令行脚本、事件监听器全部接入 IOC）
- 领域驱动设计 （在妖怪的 QeePHP 基础上保持创新，提供了 UnitOfWork[事务工作单元]、Repository[仓储]、Specification[查询规约]，Entity getter setter[领域实体或叫模型] ）
- more...

## Todo

QueryPHP 仍然处于开发中，这里有一些目前还不支持、但已经在计划中的特性：

- 基于 Vue + IView 通用权限系统
- 完善 Swoole
- 开发文档

我们欢迎你为 QueryPHP 的开发作出贡献。

## 为什么不是...?

### Laravel

Laravel 是一个非常优秀的框架，拥有非常庞大的社区，实际上 QueryPHP 大量吸收了 Laravel 的一些优秀特性。一直以来 Laravel 性能确实为人诟病，QueryPHP 开发了一个 Leevel 来解决这一部分问题，用 Laravel 没错，QueryPHP 只是其中一个选择。

### Symfony

Symfony 实际上是 PHP 社区事实标准，QueryPHP 底层大量使用 Symfony 的基础组件例如 console、finder 等，Symfony 可以与 QueryPHP 更好地结合。

### ThinkPHP

ThinkPHP 是我最佩服的一个国产 PHP 框架，10 多年来还在持续不断的革新，国内很少有生命力这么久的框架。我在 2010 年就通读了 ThinkPHP 2.0 代码，在后面工作中主要也是使用 ThinkPHP 3 系列，有苦也有乐。加油！

### Phalcon & Yaf

Phalcon 与 Yaf 世界上最快的 PHP 框架，Yaf 很轻，Phalcon 很重，它们都是世界级的框架。

QueryPHP 选择一部分由 PHP 编写，一部分编译成扩选扩展 Leevel。

Leevel 位于 Yaf 和 Phalcon 轻重之间，是一种可选的方案。
