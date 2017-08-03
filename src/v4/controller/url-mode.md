---
title: url.模式
type: v4
order: 34
---

QueryPHP 支持 2 种 url 访问模式，包括普通模式、PATHINFO 模式。

# 1）：普通模式 ：设置 url_model 为 default
采用传统的URL参数模式
~~~
http://<service>?app=home&c=blog&a=show&id=1
~~~

# 2）：pathinfo 模式 ：设置 url_model 为 pathinfo
默认情况使用 pathinfo 模式，pathinfo 能够提供灵活和友好URL支持。
~~~
http://<service>/home/blog/show/id/1/
~~~
> 注意：其中参数之间的分割符号由 url_pathinfo_depr 参数设置，默认为”/”，例如我们设置 url_pathinfo_depr“-”的话，就可以使用下面的URL访问。
~~~
http://<service>/home-blog-show-id-1/
~~~
> 注意：不要使用 ”:” 和”&”符号进行分割，该符号有特殊用途，例外我们勀通过 $_GET 和 $_REQUEST 获取对的值。