---
title: url.生成
type: v4
order: 35
---

为了配合所使用的 URL 模式，我们需要能够动态的根据当前的 URL 设置生成对应的 URL 地址，为此，QueryPHP 内置提供了 Q::url 方法，用于 URL 的动态生成，可以确保项目在移植过程中不受环境的影响。

Q::url 方法的定义规则如下（方括号内参数根据实际应用决定）：
~~~
Q::url（'[应用://]控制器/方法?参数1=值1',额外参数,扩展参数）;
~~~

如果不定义应用和控制器的话 就表示当前应用和控制器名称，下面是一些简单的例子：
~~~
# /index.php/myapp/hello/world/id/5/name/yes.html
\Q::url( 'myapp://hello/world' ,['id'=>5,'name'=>'yes']);

# /index.php/myapp/index/test.html
echo \Q::url( 'myapp://test');
~~~

# 自定义 url
系统支持路由设置，像路由这种可以我们通过自定义 url 来生成地址。
~~~
# /hello-world.html
\Q::url('/hello-world');

# /new-5-tom.html
 \Q::url('/new-{id}-{name}', ['id' => 5, 'name' => 'tom']);
~~~

# 强制使用普通 url 模式
在有些业务场景，无论系统设置什么样的 url 模式都生成普通的 url 地址。
~~~
# /index.php?app=home&c=hello&a=world

\Q::url ( 'hello/world', [ ], [ 
    'normal' => true 
] );
~~~

# 是否包含后缀
系统默认开启后缀，如果存在则会在尾部加入，默认后缀为 url_html_suffix
~~~
'url_html_suffix' => '.html'
~~~
我们可以通过 suffix 参数来关闭后缀，或者自定义后缀。
~~~
# /index.php/hello/world
echo \Q::url ( 'hello/world', [ ], [ 
    'suffix' => false 
] );

# /index.php/hello/world.jsp
echo \Q::url ( 'hello/world', [ ], [ 
    'suffix' => '.jsp' 
] );
~~~

# 泛域名支持
如果你的系统有着复杂二级域名，那么可以通过这样子实现。
~~~
'url_router_domain_top' => 'queryphp.cn'
'url_make_subdomain_on' => true
~~~

例子：
~~~
# http://www.queryphp.cn/index.php/hello/world.html
\Q::url ( 'hello/world' );

# http://vip.queryphp.cn/index.php/hello/world.html
\Q::url ( 'hello/world', [ ], [ 
    'subdomain' => 'vip' 
] );

# http://defu.vip.queryphp.cn/index.php/hello/world.html
\Q::url ( 'hello/world', [ ], [ 
    'subdomain' => 'defu.vip' 
] );

# http://queryphp.cn/index.php/hello/world.html
\Q::url ( 'hello/world', [ ], [
    'subdomain' => '*'
] );
~~~

> 说明：大家可以综合运用本文的提到的功能以满足你的项目需求。