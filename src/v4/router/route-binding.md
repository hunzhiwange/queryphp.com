---
title: 路由绑定
type: v4
order: 25
---

QueryPHP 路由（包含 url 解析）核心为将解析后的 url 结果放入 $_GET 中，结果中包含了应用、控制器、方法和一些附加值。
~~~
Array
(
    [c] => index
    [a] => index
    [app] => home
)
~~~
> 分析：在没有绑定路由前，系统会根据分析得到的应用、控制器、方法去调用不同的模块代码，这是系统的默认规则，我们可以通过路由绑定拦截这些路由而不再走传统的规则。

# 路由绑定
路由绑定由 router 的 bind 方法提供支持，支持绑定到控制器和方法，可以在公共文件或者路由文件中定义，原型如下：
~~~
// router::bind(参数规则, 绑定处理器);
router::bind($sBindName, $mixBind);
~~~

# 绑定到方法
~~~
router::bind ( 'home://index/index', function () {
    echo 'Hello World!';
} );
~~~

访问地址
~~~
http://<service>/index.php/home/index/index
~~~

页面输出
~~~
Hello World!
~~~

# 绑定到控制器
~~~
router::bind ( 'home://index', ['index' => 'Hello Hello' ] );
~~~

访问地址
~~~
http://<service>/index.php/home/index/index
~~~

页面输出
~~~
Hello Hello
~~~

# 参数规则解析
QueryPHP 要求提供严谨格式，随意的规则系统将无法识别，以下为支持的参数规则。

|  项目  |  绑定说明  |
| --- | --- |
|  home://index  | 绑定控制器（应用 home，控制器 index）  |
|  home://index/index  | 绑定方法（应用 home，控制器 index，方法 index）  |
|  index  |  绑定控制器（应用 所有应用，控制器 index）  |
|  index/index  | 绑定方法（应用 所有应用，控制器 index，方法 index ） |

以下为错误的写法，例如：
~~~
home:?
home://index/index?arg=1
~~~
> 说明： QueryPHP 不会去分析规则是否正确，只是系统无法识别。

# 绑定处理器
QueryPHP 提供多种绑定处理器，详情见《**分层控制器/控制器绑定**》。







