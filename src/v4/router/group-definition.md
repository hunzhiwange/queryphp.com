---
title: 分组定义
type: v4
order: 25
---

通过路由分组可以快速为具有共同属性的路由建立规则，例如：
~~~~~~
// 原型 router::group(array $in, $mixRouter);
router::group('公共属性', '路由或者闭包');
~~~

# 支持参数
公共属性包含以下多种情况，下面将一一说明。

## 路由域名
分组路由中可以指定域名，这样每一个路由都具备了域名匹配功能，域名中支持参数。
~~~
router::group ( [ 
        'domain' => '{domain}.queryphp.com' 
], [ 
        [ 
                'new-{id}-{name}',
                'home://new/index' 
        ],
        [ 
                'hello-{goods}',
                'home://goods/index' 
        ] 
] );
~~~

## 路由前缀
如果你需要为一个数组中的所有路由加上前缀，可以在路由中指定前缀 prefix。
~~~
router::group ( [ 
        'prefix' => 'admin-' 
], [ 
        [ 
                'new-{id}-{name}',
                'home://new/index' 
        ],
        [ 
                'hello-{goods}',
                'home://goods/index' 
        ] 
] );
~~~

访问地址
~~~
http://<service>/admin-hello-123456
~~~

解析后的 GET 值如下：
~~~
Array
(
    [app] => home
    [c] => goods
    [a] => index
    [goods] => 123456
)
~~~

## 附加参数
系统在匹配路由的时候，可以为匹配的结果附加上结果，解析变量的可以覆盖此值。
~~~
router::group ( [ 
        'params' => [ 
                'args1' => '小',
                'args2' => '大' 
        ] 
], [ 
        [ 
                'new-{id}-{name}',
                'home://new/index' 
        ],
        [ 
                'hello-{goods}',
                'home://goods/index' 
        ] 
] );
~~~

访问地址 
~~~
http://<service>/hello-123456
~~~

解析后的 GET 值如下
~~~
Array
(
    [app] => home
    [c] => goods
    [a] => index
    [args1] => 小
    [args2] => 大
    [goods] => 123456
)
~~~

## 参数正则
我们可以在分组中统一指定参数正则，路由内部的参数具有优先级。
~~~
router::group ( [ 
        'where' => [ 
                'id' => '[0-9]+',
                'name' => '[a-z]+' 
        ] 
], [ 
        [ 
                'new-{id}-{name}',
                'home://new/index' 
        ],
        [ 
                'hello-{goods}',
                'home://goods/index' 
        ] 
] );
~~~

## 插入顺序
插入将在遇到相同路由的时候，具有优先匹配的权利。
~~~
router::group ( [ 
        'prepend' => true 
], [ 
        [ 
                'new-{id}-{name}',
                'home://new/index' 
        ],
        [ 
                'hello-{goods}',
                'home://goods/index' 
        ] 
] );
~~~

## 严格模式
严格模式让 url 匹配精准一些，请根据项目具体分析。
~~~
router::group ( [ 
        'prepend' => true 
], [ 
        [ 
                'new-{id}-{name}',
                'home://new/index' 
        ],
        [ 
                'hello-{goods}',
                'home://goods/index' 
        ] 
] );
~~~

# 闭包注册
我们可以在分组路由中采用闭包注册路由，公共属性将会传入规则中。
~~~
router::group ( [ 
        'prefix' => 'myprefix-' 
], function () {
    router::import ( 'new-{id}-{name}', 'home://new/index' );
    router::import ( 'hello-{goods}', 'home://goods/index' );
} );
~~~
嵌套支持
~~~
router::group ( [ 
        'prefix' => 'myprefix-' 
], function () {
    router::group ( [ 
            'params' => [ 
                    'args1' => '你',
                    'args2' => '好' 
            ] 
    ], function () {
        router::import ( 'new-{id}-{name}', 'home://new/index' );
        router::import ( 'hello-{goods}', 'home://goods/index' );
    } );
} );
~~~