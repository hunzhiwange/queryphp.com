---
title: 响应对象之自定义响应
type: v4
order: 61
---

register 可以用来注册一个自定义的响应方法。

# 函数原型
~~~
public function register($strResponseName, $calResponse);
~~~

# 使用方法
~~~
# 注册自定义响应
\Q::response ()->register ( 'test', function () {
    return func_get_args ();
} );

# 使用方法
return \Q::response()->test('123456',789,'小子');

# 响应
["123456",789,"小子"]
~~~

# 返回一个响应对象
~~~
# 注册自定义响应
\Q::response ()->register ( 'test', function () {
    return \Q::response ()->jsonp('helloworld', func_get_args ());
} );

# 使用方法
return \Q::response()->test('123456',789,'小子');

# 响应
helloworld(["123456",789,"小子"]);
~~~
