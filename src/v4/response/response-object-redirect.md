---
title: 响应对象之重定向
type: v4
order: 58
---

QueryPHP 重定向响应实际上是利用 \Q::redirect 方法来实现。

# 函数原型
~~~
public function redirect($sUrl, $in = []);
~~~

# 使用方法
~~~
return \Q::response()->redirect('hello/world');
~~~

# 使用参数
~~~
return \Q::response()->redirect('hello/world',[ 'params' => ['id' => 5] ]);
~~~

