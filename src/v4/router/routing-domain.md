---
title: 路由域名
type: v4
order: 26
---

QueryPHP 支持域名路由，包含纯域名和域名加规则，存在域名加规则则继续匹配这个域名下面的规则，启用域名。
~~~
  'url_domain_on' => true
  'url_domain_top' => 'queryphp.cn'
~~~

# 泛域名支持
我们允许支持泛域名，也就是域名中支持变量，跟路由变量差不多。
~~~
router::domain ( '{domain}', 'home://index/index' );
~~~

访问
~~~
http://hello.queryphp.cn
~~~

解析后的 GET 值
~~~
Array
(
    [domain] => hello
    [app] => home
    [c] => index
    [a] => index
)
~~~

三级泛域名
~~~
router::domain ( '{subdomain}.{domain}', 'home://index/index' );
~~~

访问地址
~~~
http://vip.hello.queryphp.cn
~~~

解析后的 GET 值
~~~
Array
(
    [subdomain] => vip
    [domain] => hello
    [app] => home
    [c] => index
    [a] => index
)
~~~

# 泛域名全局参数正则
跟路由参数正则一致，域名参数也支持设置全局路由。
~~~
router::regexDomain(['domain' => '[a-z]+']);
~~~

也可以在域名路由附加规则中指定项目：
~~~
router::domain ( '{domain}', 'home://index/index', [ 
        'domain_where' => [ 
                'domain' => '[a-z]+' 
        ] 
] );
~~~

# 指定域名或 IP
除了泛域名支持外，QueryPHP 还可以指定域名来绑定模块。
~~~
router::domain ( 'hello', 'home://index/index' );
// 下面这个和上面规则等效
router::domain ( 'hello.queryphp.cn', 'home://index/index' );
~~~
上面两条规则等效，访问地址
~~~
http://:hello.queryphp.cn
~~~

解析后的 GET 值
~~~
Array
(
    [app] => home
    [c] => index
    [a] => index
)
~~~

指定 IP
~~~
router::domain ( '127.0.0.1', 'home://index/index' );
~~~

访问地址
~~~
http://:127.0.0.1
~~~

解析后的 GET 值
~~~
Array
(
    [c] => index
    [a] => index
    [app] => home
)
~~~

# 域名加规则
QueryPHP 可以同时支持域名和规则，可以通过 domain 方法导入，也可以由普通路由导入中 domain 参数添加，即表示域名加规则，例子：
~~~
router::import ( 'hello-{what}', 'home://topic/index',  [
    'domain' => 'hello'
]);
~~~

访问地址
~~~
http://hello.queryphp.cn
http://queryphp.cn
~~~

系统将无法匹配，进入 pathinfo 默认解析，解析后的 GET 值
~~~
Array
(
    [c] => index
    [a] => index
    [app] => home
)
~~~

访问地址，同时满足和域名和规则，匹配成功
~~~
http://hello.queryphp.cn/hello-world
~~~

系统匹配成功，解析后的 GET 值
~~~
Array
(
    [app] => home
    [c] => topic
    [a] => index
    [what] => world
)
~~~

# domain 方法导入域名加规则
我们可以通过域名方法导入域名规则，非常方便。
~~~
router::domain ( 'hello', function () {
   router::import('hello-{what}', 'home://topic/index');
} );
~~~
说明：绑定的效果同上。

分组注册域名路由：
~~~
router::group ( [ 
        'prefix' => 'myprefix-' 
], function () {
    router::domain ( 'hello', function () {
        router::import ( 'hello-{what}', 'home://topic/index' );
    } );
} );

// 或者
router::domain ( 'hello', function () {
    router::group ( [ 
            'prefix' => 'myprefix-' 
    ], function () {
        router::import ( 'hello-{what}', 'home://topic/index' );
    } );
} );
~~~

访问地址，则系统匹配成功
~~~
http://hello.queryphp.cn/myprefix-hello-world
~~~

解析后的 GET 值
~~~
Array
(
    [app] => home
    [c] => topic
    [a] => index
    [what] => world
)
~~~

# 配置文件导入
我们也可以通过配置文件导入域名路由。
~~~
return [
    '~domains~' => [
       ['hello', 'home://index/index'],
       ['hello.queryphp.cn', 'home://index/index' ]
    ],
];
~~~