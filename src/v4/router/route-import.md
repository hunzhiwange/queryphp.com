---
title: 路由导入
type: v4
order: 22
---

QueryPHP 支持单个导入、批量导入和定义路由文件支持路由规则。

# 路由导入
路由由 Q\router\router 中的 import 方法进行注册，通常我们在 <project>/com/option/router.php 中进行注册路由。

``` php
// 原型 router::import($strRouter, $strUrl, $in = []);
router::import('路由', '请求地址', '扩展参数');
```

例子：

``` php
router::import ( 'hello-{what}', 'home://topic/index' );
```

访问地址：
~~~
http://<service>/index.php/hello-world
http://<service>/index.php/home/topic/index/what/world
~~~

上面两个地址等效，GET 结果如下：
~~~
Array
(
    [app] => home
    [c] => topic
    [a] => index
    [what] => world
)
~~~

> 说明：路由本质实质上利用正则匹配 pathinfo，解析所得到的结果，见下表。

|  项目  |  说明  |
| --- | --- |
|  pathinfo  |   /hello-world  |
|  正则  |  /^\/hello-(\S+)/  |

# 参数分析
### 路由

|  项目   |  备注  | 正则 |
| --- | --- | --- |
|  /  |  首页  |  /  |
| hello  |  普通路由  |  /hello/  |
| goods-{hello}  |  带有参数  | /goods-(\S+)/  |
| goods-{hello}-{world}/{show}-{detail}  |  多个参数,规则复杂的路由 |  goods-(\S+)-(\S+)/(\S+)-(\S+)   |

### 请求地址
基本结构如下：
~~~
home://hello/world?args1=1&arg2=2
~~~
支持例子解析：

|  项目   |  备注  | 
| --- | --- | 
|  home://blog/index?id=1&name=xiao  |  应用（home） 控制器（blog） 方法（index） 参数[id=1, name=xiao]  |
|  blog/index  |  应用（默认应用） 控制器（blog） 方法（index）   |
|  blog  |  应用（默认应用） 控制器（blog） 方法（默认方法）   |

### 扩展参数
系统将通过扩展参数支持更多功能，见下面：

|  项目   |  备注  | 
| --- | --- | 
|  domain  |  支持导入域名，详情见后面  |
|  params  |  url 附加参数 ['args1' => 'hello', 'args2' => 'world' ]   |
|  where  |  参数正则，['hello' => '[0-9]+', 'world' => '[A-Za-z]+']，参数默认解析正则为 \S+   |
|  prepend  |  插入顺序，一个路由可以多个请求地址，prepend 插入前面优先解析   |
|  strict  |  使用启用严格匹配，正则结尾会加入 $ 标志   |
|  prefix  |  定义前缀，分组路由指定前缀会通过这个参数传入数据 |

# 严格匹配模式
QueryPHP 可以通过“扩展参数”中的 strict 来支持严格，也可以通过配置设置全局参数。
~~~
'url_router_strict' => true
~~~
> 说明：扩展参数中的 strict 优先，可以通过这个配置修改全局严格设置。