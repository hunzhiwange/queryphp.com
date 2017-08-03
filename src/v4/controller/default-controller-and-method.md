---
title: 默认控制器和方法
type: v4
order: 33
---

如果使用没有带任何控制器和方法的参数，系统就会寻找默认模块和默认操作，通过系统配置来设置。
~~~
http://<service>/index.php
~~~

默认配置如下：
~~~
'default_controller' => 'index', // 默认控制器
'default_action' => 'index', // 默认方法
~~~

以下效果等同
~~~
http://<service>/index.php
http://<service>/index.php?c=index
http://<service>/index.php?c=index&a=index
~~~