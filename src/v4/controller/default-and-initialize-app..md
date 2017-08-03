---
title: 默认和初始化.APP
type: v4
order: 32
---

QueryPHP 项目将会允许多个 app 运行，系统有一个初始化 APP **“~_~”**,中文名字为 **笑脸初始化 APP**。这个 APP 是一个隐性的 APP，在项目中一般不用定义，当然也可以定义。

笑脸初始化 APP 的会进行简单的参数过滤，它的主要作用是基于当前 url 模式解析系统 url ，分析出应用、控制器和方法。
~~~
// 解析系统URL
self::$in = $this->checkIn_ ( url::run ()->in () );
~~~

根据应用、控制器和方法去执行不同的模块
~~~
Q::app()->app_name
Q::app()->controller_name
Q::app()->action_name
~~~

应用默认位于**<project>/app** 目录，每个应用可以定义自己的控制器、模型、配置以及视图文件。


