---
title: 响应对象之文件响应
type: v4
order: 60
---

file 可以用来直接在用户的浏览器中显示文件。

# 函数原型
~~~
public function file($sFileName, array $arrHeader = []);
~~~

# 使用方法
~~~
return \Q::response()->file('robots.txt');
~~~
