---
title: 响应对象之视图
type: v4
order: 57
---

QueryPHP 允许你的响应载入一个视图文件，其中暴露的主方法 view 和 assign 来自原 Q\mvc\view 中。

# 函数原型
~~~
# 对应 Q\mvc\view->display
public function view($sFile = '', $in = []);

# 对应 Q\mvc\view->assign
public function assign($mixName, $mixValue = null);
~~~

# 使用方法
~~~
return \Q::response()
    ->view('hello')
    ->assign('name', 'world')
    ->header('yes', 'hello world');
~~~
