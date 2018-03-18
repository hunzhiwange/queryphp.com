---
title: 配置信息
type: v4
order: 10000002
---

## 介绍

QueryPHP 提供了灵活的全局配置功能，框架将配置存在文件中，并且会自动生成配置缓存文件，无需重复解析的开销。

配置文件分为公共配置文件和项目配置文件，项目配置文件会覆盖公共配置文件。

<p class="tip">每个选项都有说明，你可随时查看这些文件并熟悉都有哪些配置选项可供你使用。</p>

### 公共配置

公共配置文件位于公共配置目录, 地址为 `common\ui\option`

### 项目配置
项目配置文件位于项目配置目录，例如 `home` 应用的配置目录 `application\home\ui\option`

### 配置缓存

系统以应用为一个小的单元并为各自生成一个配置缓存文件 `~@~\option\home.php`，
缓存配置后可以减少开销，开发模式情况下会实时生成配置缓存以保证开发便捷性。

## 环境配置

对于应用程序运行的环境来说，不同的环境有不同的配置通常是很有用的。 

在新安装好的 QueryPHP 应用程序中，其根目录会包含一个 .env.example 文件,复制一份并其重名为 .env 文件是一个非常好的开始。

环境变量中有两个非常重要的参数,一个为当前的开发环境，一个为是否开启调式。

```
// 项目运行环境 production : 生产环境 testing : 测试环境 development : 开发环境
environment = development

// 调试模式，开发阶段启用，生产环境禁用
debug = true
```

### 读取环境变量

当应用程序收到请求时，.env 文件中列出的所有变量将被加载到 PHP 的超级全局变量 `$_ENV` 中。你可以使用 `env` 函数检索这些变量的值。

```
'environment' => env('environment', 'development')
'debug' => env('debug', false)
```
<p class="tip">第一个参数即为环境变量，第二个为默认值，未设置环境变量的读取值。</p>

### 当前环境

应用程序当前所处环境是通过 .env 文件中的 environment 变量确定的。

``` php
// 当前环境和是否为开发模式
project()->environment();
project()->development();

// app 是 project 别名
app()->environment();
app()->development();
```

<p class="tip">非开发模式情况下，路由、配置、语言包等会生成缓存，修改了文件需要清除缓存才能够生效。</p>

### 当前调试模式

应用程序当前所处环境是通过 .env 文件中的 debug 变量确定的。

``` php
// 是否开启调试模式
project()->debug();

// app 是 project 别名
app()->debug();
```

## 读取缓存

你可以轻松地在应用程序的任何位置使用全局 option 函数来访问配置值,支持 `namespace\` 和 `.` 子配置的语法特性。

``` php
use Queryyetsimple\Option;

// 默认命名空间为 app
Option::get('app\environment');
Option::get('environment');

// 多级访问
Option::get('swoole\server.host');

// 函数访问
option('swoole\server.host');
```

QueryPHP 提供的配置功能非常强大，更多功能请访问测试用例查看详情,位于框架的 Option 测试组件。

```
composer install
vendor/bin/phpunit Tests/Option/OptionTest.php
```
