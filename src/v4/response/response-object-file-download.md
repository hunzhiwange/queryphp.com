---
title: 响应对象之文件下载
type: v4
order: 59
---

download 方法可以让浏览器强制用户下载文件。

# 函数原型
~~~
public function download($sFileName, $sDownName = '', array $arrHeader = []);
~~~

# 使用方法
~~~
return \Q::response()->download('robots.txt', '我是你哥');
~~~
