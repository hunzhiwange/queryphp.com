---
title: 路由
type: v4
order: 21
---

# 普通 url
QueryPHP 支持普通的 url 链接和 pathinfo 模式的 url，像这样：
~~~
http://<service>/index.php?app=group&c=topic&a=show&id=1&orderby=user
http://<service>/index.php/group/topic/show/id/1/orderby/user
~~~

上面两种 url 解析后的 GET 变量结果如下:
~~~
Array
(
    [app] => home
    [c] => topic
    [a] => show
    [id] => 1
    [orderby] => user
)
~~~

> 注意：上述 url 地址非常长，这对于很多应用来说不是非常合适，所以我们将通过路由来简化。

# 注册路由
为了达到这样子的效果，我们在 <project>/com/option/default.php 中开启路由。
~~~
 'url_start_router' => true 
~~~
在路由配置文件中 <project>/com/option/router.php 注册路由：
~~~
<?php

use Q\router\router;
router::import ( 'topic-{id}-{orderby}', 'home://topic/show' );
~~~
访问如下 url 地址：
~~~
http://<service>/index.php/topic-1-user
~~~
得到同样的 GET 变量结果值：
~~~
Array
(
    [app] => home
    [c] => topic
    [a] => show
    [id] => 1
    [orderby] => user
)
~~~

> 注意：利用路由可以大幅度精简 url，这样可以给用户以简洁之美。

# 共存机制
当我们开启路由后，系统会优先匹配路由，如果匹配失败则进行普通的 pathinfo 解析。

