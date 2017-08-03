---
title: 响应对象
type: v4
order: 53
---

QueryPHP 允许用户创建一个响应对象，对象来自 Q\request\response 的实例。

# 函数原型
~~~
\Q::response($mixData = '', $intCode = 200, array $arrHeader = [], $arrOption = []);
~~~

# 使用方法
~~~
return \Q::response('小鸭子爱吃草 NOT FOUND', 404);
~~~

# 添加响应头
~~~
return \Q::response('小鸭子爱吃草 NOT FOUND', 404, ['header1' => 'prower by queryphp'] )
    ->header('header2','world')
    ->header([
       'header3' => 'da',
       'header4' => 'ye'
    ]);
~~~

# 添加 cookie
cookie 方法实质上调用的 \Q::cookie 实现的，详情请参考 cookie 一节里面的讲解。
~~~
return \Q::response('小鸭子爱吃草 NOT FOUND', 404 )
   ->cookie('name','world');
~~~

# 更多链式方法支持
支持 option、data、code、contentType、charset、content、responseType。

# 返回数据
支持 getOption、getData、getCode、getContentType、getCharset、getContent、getResponseType。

