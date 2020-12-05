(window.webpackJsonp=window.webpackJsonp||[]).push([[363],{645:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" 概述")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Testing Is Documentation")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/tests/Router/SummaryDoc.php",target:"_blank",rel:"noopener noreferrer"}},[t._v("tests/Router/SummaryDoc.php"),a("OutboundLink")],1)])]),t._v(" "),a("p",[t._v("对于一个框架来说路由是一件非常重要的事情，可以说是框架的核心之一。路由的使用便捷和理解复杂度以及性能对整个框架来说至关重要。")]),t._v(" "),a("h2",{attrs:{id:"路由解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#路由解析"}},[t._v("#")]),t._v(" 路由解析")]),t._v(" "),a("p",[t._v("QueryPHP 有一个非常独特的地方就是路由设计与其它框架有点出入，我们不需要像 Laravel 5、Thinkphp 5 等框架一样定义路由。")]),t._v(" "),a("h3",{attrs:{id:"laravel-5"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#laravel-5"}},[t._v("#")]),t._v(" Laravel 5")]),t._v(" "),a("div",{staticClass:"language-php extra-class"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[t._v("Route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("middleware")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'first'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'second'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("group")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    Route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    Route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'user/profile'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"thinkphp-5"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#thinkphp-5"}},[t._v("#")]),t._v(" ThinkPHP 5")]),t._v(" "),a("div",{staticClass:"language-php extra-class"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[t._v("Route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("group")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'blog'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    Route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rule")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("':id'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'blog/read'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    Route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rule")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("':name'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'blog/read'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ext")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'html'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("pattern")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'id'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'\\d+'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'name'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'\\w+'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"fastroute"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fastroute"}},[t._v("#")]),t._v(" FastRoute")]),t._v(" "),a("div",{staticClass:"language-php extra-class"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$r")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addRoute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'GET'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'/user/{id:\\d+}'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'handler'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$r")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addRoute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'GET'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'/user/{name}'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'handler'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$r")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addRoute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'GET'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'/user/{name:.+}'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'handler'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("其中 FastRoute 中提供一个路由 10 条路由合并匹配算法非常地高效，QueryPHP 已经吸收。 "),a("a",{attrs:{href:"http://nikic.github.io/2014/02/18/Fast-request-routing-using-regular-expressions.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("合并路由匹配算法"),a("OutboundLink")],1)])]),t._v(" "),a("h3",{attrs:{id:"php-8-注解路由"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#php-8-注解路由"}},[t._v("#")]),t._v(" PHP 8 注解路由")]),t._v(" "),a("p",[t._v("QueryPHP 开始采用 PHP 8 属性来定义注解路由，可以很轻松地实现比较复杂的路由访问。")]),t._v(" "),a("p",[t._v("QueryPHP 框架提供 "),a("code",[t._v("MVC 自动路由")]),t._v(" 并能够智能解析 Restful 请求和基于 PHP 8 属性的注解路由。\n所以我们不需要定义一个 router.php 来注册我们的路由，并且能够优化并缓存起来加速解析。")]),t._v(" "),a("h2",{attrs:{id:"路由匹配过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#路由匹配过程"}},[t._v("#")]),t._v(" 路由匹配过程")]),t._v(" "),a("p",[t._v("QueryPHP 会优先进行"),a("code",[t._v("MVC 自动路由")]),t._v("匹配，也包含 "),a("code",[t._v("Restful")]),t._v(" 路由匹配,如果匹配失败就会进行注解路由匹配阶段，如果还是\n匹配失败则会抛出一个路由无法找到的异常。")]),t._v(" "),a("h2",{attrs:{id:"自动-mvc-路由"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动-mvc-路由"}},[t._v("#")]),t._v(" 自动 MVC 路由")]),t._v(" "),a("p",[t._v("很多时候我们不是特别关心它是 GET、POST 还是 Put，我们就想简单输入一个地址就可以访问到我们的控制器。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("路径")]),t._v(" "),a("th",[t._v("匹配控制器")]),t._v(" "),a("th",[t._v("备注")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("/")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Home::index()")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("/controller/action")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Controller::action()")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("/:blog/controller/action")]),t._v(" "),a("td",[t._v("Blog\\App\\Controller\\Controller::action()")]),t._v(" "),a("td",[a("code",[t._v(":")]),t._v(" 表示应用")])]),t._v(" "),a("tr",[a("td",[t._v("/dir1/dir2/dir3/controller/action")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Dir1\\Dir2\\Dir3\\Controller::action()")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("/he_llo-wor/Bar/foo/xYY-ac/controller_xx-yy/action-xxx_Yzs")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\HeLloWor\\Bar\\Foo\\XYYAc\\ControllerXxYy::actionXxxYzs()")]),t._v(" "),a("td")])])]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("p",[t._v("如果方法单独成为一个类，则对应的请求入口为 "),a("code",[t._v("handle")]),t._v("，我们推荐为每一个方法定义一个类，避免与其它方法冲突，而且路由匹配性能最佳。\n框架底层会优先匹配方法单独成类，匹配失败则匹配控制器类对应方法操作，如果还是匹配失败进入注解路由匹配阶段。")])]),t._v(" "),a("p",[t._v("例如访问地址 "),a("code",[t._v("http://queryphp.cn/api/test")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-php extra-class"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token php language-php"}},[a("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("declare")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("strict_types"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n* This file is part of the forcodepoem package.\n*\n* The PHP Application Created By Code Poem. <Query Yet Simple>\n* (c) 2018-2099 http://forcodepoem.com All rights reserved.\n*\n* For the full copyright and license information, please view the LICENSE\n* file that was distributed with this source code.\n*/")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token package"}},[t._v("App"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("App"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Controller"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Api")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n* api tests.\n*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Test")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n    * 默认方法.\n    */")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("array")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'hello'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'world'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("上面这种就是一个简单粗暴的路由，简单有效，大多数时候可以满足我们系统开发的需求。")])]),t._v(" "),a("h2",{attrs:{id:"自动-restful-路由"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动-restful-路由"}},[t._v("#")]),t._v(" 自动 restful 路由")]),t._v(" "),a("p",[t._v("Restful 已经是一种开发主流，前后端分离的场景我们通常会定义 Restful 路由来向前端提供接口服务。")]),t._v(" "),a("p",[t._v("我们访问同一个 URL 的时候,根据不同的"),a("code",[t._v("请求类型")]),t._v("访问不同的后台。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("路径")]),t._v(" "),a("th",[t._v("请求类型")]),t._v(" "),a("th",[t._v("匹配控制器")]),t._v(" "),a("th",[t._v("备注")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("/car")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Car::index()")]),t._v(" "),a("td",[t._v("没有参数则请求列表")])]),t._v(" "),a("tr",[a("td",[t._v("/car/5")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Car::show()")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("/car/5")]),t._v(" "),a("td",[t._v("POST")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Car::store()")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("/car/5")]),t._v(" "),a("td",[t._v("DELETE")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Car::destroy()")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("/car/5")]),t._v(" "),a("td",[t._v("PUT")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Car::update()")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("/car/5/otherGet")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Car::otherGet()")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("/car/5/otherPost")]),t._v(" "),a("td",[t._v("POST")]),t._v(" "),a("td",[t._v("App\\App\\Controller\\Car::otherPost()")]),t._v(" "),a("td")])])]),t._v(" "),a("p",[t._v("路由系统会分析 pathInfo，系统会首先尝试正则匹配 Restful 风格，否则执行传统 "),a("code",[t._v("MVC")]),t._v(" 匹配。")]),t._v(" "),a("p",[t._v("Restful 风格路由如果匹配成功，如果这个时候没有方法，系统根据请求类型自动补全方法完成 Restful 请求.")]),t._v(" "),a("p",[t._v("我们可以通过 Request 中的 attributes 来访问参数中的 Restful 资源 ID。")]),t._v(" "),a("div",{staticClass:"language-php extra-class"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("int"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \\"),a("span",{pre:!0,attrs:{class:"token package"}},[t._v("Leevel")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'request'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("attributes")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\\"),a("span",{pre:!0,attrs:{class:"token package"}},[t._v("Leevel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Router"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("IRouter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("RESTFUL_ID")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"php-8-注解路由-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#php-8-注解路由-2"}},[t._v("#")]),t._v(" PHP 8 注解路由")]),t._v(" "),a("p",[t._v("上面是一种预热，我们的框架路由设计是这样，优先进行 "),a("code",[t._v("pathInfo")]),t._v(" 解析，如果解析失败将进入注解路由高级解析阶段。")]),t._v(" "),a("h3",{attrs:{id:"基础"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("路径")]),t._v(" "),a("th",[t._v("匹配控制器")]),t._v(" "),a("th",[t._v("备注")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("http://127.0.0.1:9527/api/v1/demo/liu")]),t._v(" "),a("td",[t._v("路由")]),t._v(" "),a("td",[t._v("注解路由")])])])]),t._v(" "),a("p",[t._v("访问 "),a("code",[t._v("http://127.0.0.1:9527/api/v1/demo/liu")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Hi you, you name is liu in version 1\n")])])]),a("p",[t._v("QueryPHP 采用 PHP 8 属性来定义注解路由，需要定义 "),a("code",[t._v("Route")]),t._v(" 注解路由。。")]),t._v(" "),a("div",{staticClass:"language-php extra-class"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shell-comment comment"}},[t._v("#[Route(")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token double-quoted-string string"}},[t._v('"/api/v1/demo/{name:[A-Za-z]+}/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    attributes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token double-quoted-string string"}},[t._v('"args1"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token double-quoted-string string"}},[t._v('"hello"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token double-quoted-string string"}},[t._v('"args2"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token double-quoted-string string"}},[t._v('"world"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("demo1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" string\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sprintf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'Hi you, you name is %s in version 1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("VS Laravel:")]),t._v(" "),a("div",{staticClass:"language-php extra-class"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[t._v("Route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"单条路由"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#单条路由"}},[t._v("#")]),t._v(" 单条路由")]),t._v(" "),a("p",[t._v("系统支持一些自定义属性，可以扩展看路由的功能。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('attributes: ["args1" => "hello", "args2" => "world"],\nbind: "\\\\App\\\\App\\\\Controller\\\\Petstore\\\\Pet@withBind",\ndomain: "{subdomain:[A-Za-z]+}-vip.{domain}",\nmiddlewares: "api",\nport: "9527",\nscheme: "https",\n')])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("ul",[a("li",[t._v("bind 未设置自动绑定当前注释的控制器和方法")]),t._v(" "),a("li",[t._v("bind 未设置 "),a("code",[t._v("@")]),t._v(" 则绑定到类的 "),a("code",[t._v("handle")]),t._v(" 方法，"),a("code",[t._v("@")]),t._v(" 可以自定义绑定方法")])])]),t._v(" "),a("p",[t._v("路由地址 path 和域名支持正则参数")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/api/v1/petLeevelForApi/{petId:[A-Za-z]+}/\n{subdomain:[A-Za-z]+}-vip.{domain}\n")])])]),a("h2",{attrs:{id:"结束语"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结束语"}},[t._v("#")]),t._v(" 结束语")]),t._v(" "),a("p",[t._v("路由基本介绍完了，主要由两种风格的路由构成。")])])}),[],!1,null,null,null);s.default=e.exports}}]);