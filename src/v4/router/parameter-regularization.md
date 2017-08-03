---
title: 参数正则
type: v4
order: 24
---

QueryPHP 在路由匹配中使用了“{}”来定义了变量，变量其实是一个正则匹配分组。在没有特殊定义的情况下系统默认为：
~~~
/**
 * 默认替换参数[字符串]
 *
 * @var string
 */
const DEFAULT_REGEX = '\S+';
~~~

# 定义全局模式
如果你想让路由参数总是使用正则表达式解析，可以使用 regex 方法，你可以在项目引导文件或者在全局路由文件中定义：

|  项目  |  地址   |  备注   |
| --- | --- | --- |
|  全局路由文件  |  <project>/com/option/router.php  |  路由地址  |
|  项目引导文件  |  <project>/com/bootstrap.php  |  可以在这里面定义一些公共代码  |

例如，见下面的例子：
~~~
// 用法1
router::regex ( 'id', '[0-9]+' );

// 用法2
router::regex ( [ 
        'name',
        '[a-z]+' 
] );

// 用法3
router::regex ( [ 
        'id' => '[0-9]+',
        'name' => '[a-z]+' 
] );
~~~

# 覆盖全局路由
即使设置全局路由参数正则，还可使通过 路由导入“ **扩展参数**”中的 where 参数来定义自己参数。
~~~
// 用法1
router::import ( 'new-{id}', 'home://new/index', [ 
        'where' => [ 
                'id',
                '[0-9]+' 
        ] 
] );

// 用法2
router::import ( 'new-{id}-{name}', 'home://new/index', [ 
        'where' => [ 
                'id' => '[0-9]+',
                'name' => '[a-z]+' 
        ] 
] );
~~~