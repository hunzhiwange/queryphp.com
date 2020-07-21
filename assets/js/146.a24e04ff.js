(window.webpackJsonp=window.webpackJsonp||[]).push([[146],{470:function(t,a,s){"use strict";s.r(a);var e=s(25),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"summary"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#summary"}},[t._v("#")]),t._v(" Summary")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Testing Is Documentation")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/tests/View/SummaryDoc.php",target:"_blank",rel:"noopener noreferrer"}},[t._v("tests/View/SummaryDoc.php"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("QueryPHP 内置三种方式的模板引擎，一种是类似于 Smart 模板的 Code 语法，一种是 HTML 标签式的 Node 语法，例外还有一种类 Javascript 的语法与 Twig 比较相似。")]),t._v(" "),s("ul",[s("li",[t._v("code 语法，侧重简单实用")]),t._v(" "),s("li",[t._v("Node 语法，严谨务实")]),t._v(" "),s("li",[t._v("JS 语法，现代潮流")])]),t._v(" "),s("p",[t._v("例外，三种语法随心嵌套，随意使用，QueryPHP 模板引擎底层分析器和编译器非常健壮，完美运行 8 年。")]),t._v(" "),s("p",[t._v("QueryPHP 模板引擎技术来自于 Jecat,一款无与伦比的技术大餐，有幸在 2010 接触到这个框架，通过这个框架学到了很多。")]),t._v(" "),s("h2",{attrs:{id:"code-语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#code-语法"}},[t._v("#")]),t._v(" Code 语法")]),t._v(" "),s("p",[t._v("侧重简单实用。")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[t._v("{$name}\n\n{if $name == 'You'}\n    欢迎进入 QueryPHP 开发者世界！\n{/if}\n")])])]),s("h2",{attrs:{id:"node-语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-语法"}},[t._v("#")]),t._v(" Node 语法")]),t._v(" "),s("p",[t._v("严谨务实。")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("condition")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("$name eq 'You'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    欢迎进入 QueryPHP 开发者世界！\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h2",{attrs:{id:"现代化类-js-语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#现代化类-js-语法"}},[t._v("#")]),t._v(" 现代化类 JS 语法")]),t._v(" "),s("p",[t._v("现代潮流。")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[t._v("{{ i + 1 }}\n")])])]),s("h2",{attrs:{id:"拒绝交叉"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#拒绝交叉"}},[t._v("#")]),t._v(" 拒绝交叉")]),t._v(" "),s("p",[t._v("下面这种写法就是错误的，模板引擎将无法正确解析。")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[t._v("<$name>\n\n{if condition=\"$name eq 'You'\"}\n    欢迎进入 QueryPHP 开发者世界！\n{/if}\n")])])]),s("h2",{attrs:{id:"php-方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#php-方式"}},[t._v("#")]),t._v(" PHP 方式")]),t._v(" "),s("p",[t._v("如果你不习惯使用使用内置的模板引擎，你也可以完全使用 PHP 自生来写。")]),t._v(" "),s("div",{staticClass:"language-php extra-class"},[s("pre",{pre:!0,attrs:{class:"language-php"}},[s("code",[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$name")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token single-quoted-string string"}},[t._v("'You'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("\n    欢迎进入 QueryPHP 开发者世界！\n"),s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("endif")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("\n")])])]),s("h2",{attrs:{id:"扩展支持"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#扩展支持"}},[t._v("#")]),t._v(" 扩展支持")]),t._v(" "),s("p",[t._v("为了减少学习成本，系统还支持 PHP 自身作为 UI 模板。")])])}),[],!1,null,null,null);a.default=r.exports}}]);