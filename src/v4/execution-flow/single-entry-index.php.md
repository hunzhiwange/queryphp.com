---
title: 单一入口.index.php
type: v4
order: 14
---

QueryPHP 采用单一入口（ 可以存在多个入口，例如 api.php）来运行整个项目，应用程序的所有 http 请求都是通过公共的入口接收并转发到功能代码去的，基于此我们可以在入口文件完成项目定义的初始化工作。 

# 例子：
~~~
<?php

/**
 * 项目调试
 */
define ( 'Q_DEBUG', true );
define ( 'Q_DEVELOPMENT', 'develop' );

if (Q_DEVELOPMENT === 'develop')
    error_reporting ( E_ALL );
else
    error_reporting ( E_ERROR | E_PARSE | E_STRICT );

/**
 * 基础路径
 */
define ( 'PROJECT_PATH', dirname ( __DIR__ ) );

/**
 * 执行项目
 */
require_once PROJECT_PATH . '/lib/queryphp/src/bootstrap.php';
\Q\mvc\project::run ( [ 
        'project_path' => PROJECT_PATH 
] );
~~~

# 项目个性化定制
入口文件支持 10 余项自定义功能，这可以帮助开发者打造个性化应用。
* 定义项目路径
* 定义系统相关常量（开启调式等）
* 载入框架入口文件

> 提示：系统为大家已经推荐好了惯性配置，一般来说不用特别更改已经非常棒了。