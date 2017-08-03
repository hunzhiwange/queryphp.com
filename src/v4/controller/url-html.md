---
title: url.伪静态
type: v4
order: 36
---

系统支持伪静态URL设置，可以通过设置 url_html_suffix 参数随意在 url 的最后增加你想要的静态后缀，而不会影响当前操作的正常执行。

例子如下：
~~~
'url_html_suffix' => '.html'
~~~

访问地址，效果一致：
~~~
http://<service>/index.php/home/blog/show/id/1
http://<service>/index.php/home/blog/show/id/1.html
~~~

> 注意：配置需要包含后缀中的“.”，相对而言后者更具有静态页面的URL特征。