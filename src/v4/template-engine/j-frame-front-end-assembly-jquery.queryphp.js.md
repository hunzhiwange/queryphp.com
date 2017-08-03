---
title: J框架前端组件.jquery.queryphp.js
type: v4
order: 110
---

QueryPHP 提供了一个 **jquery.queryphp.js** 插件用来增强框架在前端表现，这个插件只封装了基本的功能，没有任何多余的功能。

# 1）：初始化 jquery.queryphp.js 插件
插件位于框架中的 **{项目地址}/lib/queryphp/resource/js/jquery.queryphp.js**，复制一份 **{项目地址}/www/public/js/jquery.queryphp.js**，然后在项目中引入，同时也要引入 jquery 框架。
~~~
{# 引入 JS 组件}
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<script src="{$APP:url_public}/js/jquery.queryphp.js?_=1.0"></script>

{# 初始化组件，必须}
<script type="text/javascript">
var $Q;
$(function(){
	$Q=$.fn.queryphp({
		app_name:"{$APP:app_name}",
		controller_name:"{$APP:controller_name}",
		action_name:"{$APP:action_name}",
		enter:"{$APP:url_app|basename}",
		root:"{$APP:url_root}",
		i18n:"{$APP:appi18n_name}"
	});
});
</script>
~~~

模板编译后的结果：
~~~
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<script src="<?php echo $APP->url_public; ?>/js/jquery.queryphp.js?_=1.0"></script>

<script type="text/javascript">
var $Q;
$(function(){
    $Q=$.fn.queryphp({
        app_name:"<?php echo $APP->app_name; ?>",
        controller_name:"<?php echo $APP->controller_name; ?>",
        action_name:"<?php echo $APP->action_name; ?>",
        enter:"<?php echo basename ( $APP->url_app ); ?>",
        root:"<?php echo $APP->url_root; ?>",
        i18n:"<?php echo $APP->appi18n_name; ?>"
    });
});
</script>
~~~

运行后的结果：
~~~
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<script src="/public/js/jquery.queryphp.js?_=1.0"></script>

<script type="text/javascript">
var $Q;
$(function(){
    $Q=$.fn.queryphp({
        app_name:"home",
        controller_name:"index",
        action_name:"i18n",
        enter:"index.php",
        root:"",
        i18n:"en-us"
    });
});
</script>
~~~

# 2）：生成框架 url 地址
系统可以通过 Q::url 来生成 url 地址，同时 javascript 也提供了一个生成 url 地址的功能。
~~~
<script type="text/javascript">
$(function(){
 	console.log($Q.url('blog/list',{category_id:11, user_id:31}));
 	console.log($.fn.queryphp('url','blog/get_detail?id=45',{is_ajax:1,category_id:45}));
});
</script>
~~~

输出结果：
~~~
index.php?c=blog&a=list&category_id=11&user_id=31
index.php?c=blog&a=get_detail&id=45&is_ajax=1&category_id=45
~~~

# 3）：格式化文本信息
php 可以通过 sprintf 格式化消息，同时 javascript 也提供了一个格式化消息的功能。
~~~
<script type="text/javascript">
$(function(){
	console.log($Q.sprintf("老夫喜欢敲 <%s>, 复制粘贴 <%s> 就是干!",'代码','拿起来'));
	console.log($.fn.queryphp("sprintf","老夫喜欢敲 <%s>, 复制粘贴 <%s> 就是干!",'代码','拿起来'));
});
</script>
~~~

输出结果：
~~~
老夫喜欢敲 <代码>, 复制粘贴 <拿起来> 就是干!
老夫喜欢敲 <代码>, 复制粘贴 <拿起来> 就是干!
~~~

# 4）：格式化语言包信息
php 可以通过 Q::i18n 格式化语言包，同时 javascript 也提供了一个格式化语言包的功能。
~~~
<script type="text/javascript">
$(function(){
  console.log($Q.i18n("欢迎使用 %s ，Query Yet Simple！",'QeePHP'));
  console.log($Q.i18n("老夫喜欢敲 <%s>, 为软件产品提供 <%s> 国际化语言解决方案!",'代码','Javascript'));

  $Q.i18nPackage('en-us',
  {
      "老夫喜欢敲 <%s>, 为软件产品提供 <%s> 国际化语言解决方案!" : "Old lady likes to knock <%s>, software products for the <%s> international language solutions!",
      "欢迎使用 %s ，Query Yet Simple！" : "Welcome to use %s ，Query Yet Simple！"
  });

  console.log($Q.i18n("欢迎使用 %s ，Query Yet Simple！",'QeePHP'));
  console.log($Q.i18n("老夫喜欢敲 <%s>, 为软件产品提供 <%s> 国际化语言解决方案!",'代码','Javascript'));
});
</script>
~~~

输出结果：
~~~
欢迎使用 QeePHP ，Query Yet Simple！
老夫喜欢敲 <代码>, 为软件产品提供 <Javascript> 国际化语言解决方案!
Welcome to use QeePHP ，Query Yet Simple！
Old lady likes to knock <代码>, software products for the <Javascript> international language solutions!
~~~

> 提示：语言包我们建议不使用 $.fn.queryphp('i18n') 这样的方式，主要是为了方便使用 Poedit 软件自动扫描 i18n 语言包标记。例外就是，系统会将 po 对应的 js 语言包缓存到 **{项目地址}/www/public/js/i18n/en-us/default.js** 中，内容如下：
~~~
/* I18n Cache */
;$(function(){
    $.fn.queryphp('i18nPackage','en-us',{"我是一个只狗":"I am a dog"});
});
~~~

# 5）：javascript 模板引擎
系统为 javascript 提供一个模板引擎，以便于开发高效的前后端分离应用《模板引擎语法/J模板引擎 intro》这一章。