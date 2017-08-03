---
title: 批量导入
type: v4
order: 23
---

QueryPHP 支持批量将路由规则导入系统中，方法还是 import ，只是第一个参数为一个数组。
# 路由导入
方法如下，我们还是在路由文件 router.php 进行注册，结构如下：
~~~
router::import ( [ 
	 ['路由', '请求地址', '扩展参数']
], '请求地址', '扩展参数' );
~~~

例子：
~~~
router::import ( [ 
        [ 
                'new',
                'home://new/index' 
        ],
        [ 
                'topic-{id}',
                'group://topic/view' 
        ] 
] );
~~~

也可以使用数组注册一条路由：
~~~
router::import ( [ 
        'new',
        'home://new/index' 
] );
~~~

# 配置文件
我们也可以在配置文件中返回定义，如下，内层参数优先：
~~~
return [ 
        [ 
                'url-{args}',
                'home://info/other' 
        ],
        [ 
                'url-{page}-{args}',
                'home://thank/you' 
        ] 
];
~~~

# 扩展配置文件
为了方便地扩展配置文件进行分类管理，路由配置文件支持扩展，一个配置文件被定义了路由配置文件将不能作为系统配置文件。
~~~
'url_router_extend' => 'router1,router2'
~~~

