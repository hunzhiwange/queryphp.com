(window.webpackJsonp=window.webpackJsonp||[]).push([[590],{820:function(a,t,s){"use strict";s.r(t);var e=s(25),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"開發規範"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#開發規範"}},[a._v("#")]),a._v(" 開發規範")]),a._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[a._v("Testing Is Documentation")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/tests/Docs/Started/SpecificationDoc.php",target:"_blank",rel:"noopener noreferrer"}},[a._v("tests/Docs/Started/SpecificationDoc.php"),s("OutboundLink")],1)])]),a._v(" "),s("p",[s("code",[a._v("QueryPHP")]),a._v(" 遵循 "),s("code",[a._v("PSR-2")]),a._v(" 命名规范和 "),s("code",[a._v("PSR-4")]),a._v(" 自动加载规范。")]),a._v(" "),s("h2",{attrs:{id:"文件和目录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件和目录"}},[a._v("#")]),a._v(" 文件和目录")]),a._v(" "),s("p",[a._v("PSR-4 基础目录使用小写，其它依次使用大驼峰法命名，例如。")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("/data/codes/queryphp/application/app/Domain/Entity/\n/data/codes/queryphp/application/app/Domain/Entity/Test.php\n")])])]),s("p",[a._v("其中 composer 配置")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('"autoload": {\n    "psr-4": {\n        "App\\\\" : "application/app",\n        "Admin\\\\" : "application/admin",\n        "Common\\\\" : "common"\n    }\n}\n')])])]),s("p",[a._v("不存在类文件，请使用小写目录，其文件也一样:")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("/data/codes/queryphp/option/\n/data/codes/queryphp/option/app.php\n")])])]),s("h2",{attrs:{id:"统一代码风格"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#统一代码风格"}},[a._v("#")]),a._v(" 统一代码风格")]),a._v(" "),s("p",[a._v("为了屏蔽不同用户的不同代码风格习惯，QueryPHP 设置一个统一的代码格式化配置来规范团队的代码风格，这符合 "),s("code",[a._v("PSR-2")]),a._v(" 规范并且可以通过 "),s("code",[a._v("StyleCI")]),a._v(" 规范。")]),a._v(" "),s("h3",{attrs:{id:"手工优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#手工优化"}},[a._v("#")]),a._v(" 手工优化")]),a._v(" "),s("p",[a._v("在使用前您需要安装 "),s("a",{attrs:{href:"http://cs.sensiolabs.org/",target:"_blank",rel:"noopener noreferrer"}},[a._v("php-cs-fixer"),s("OutboundLink")],1),a._v("，这样子才能够进行下面的工作。")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("/data/codes/queryphp/.php_cs.dist # 应用\n/data/codes/queryphp/vendor/hunzhiwange/framework/.php_cs.dist # 框架核心包\n")])])]),s("p",[a._v("可以通过下面的方式来格式化代码风格:")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$cd")]),a._v(" /data/codes/queryphp\n"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$php")]),a._v(" build/php-cs-fixer fix --config"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(".php_cs.dist\n")])])]),s("h3",{attrs:{id:"结合-git-hooks-来格式化代码："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#结合-git-hooks-来格式化代码："}},[a._v("#")]),a._v(" 结合 "),s("code",[a._v("Git")]),a._v(" Hooks 来格式化代码：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("/data/codes/queryphp/build/pre-commit.sh\n/data/codes/queryphp/vendor/hunzhiwange/framework/build/pre-commit.sh\n")])])]),s("p",[a._v("应用 QueryPHP 脚本 "),s("code",[a._v("/data/codes/queryphp/build/pre-commit.sh")]),a._v("\n核心包 framework 脚本 "),s("code",[a._v("/data/codes/queryphp/build/pre-commit.sh")])]),a._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[a._v("WARNING")]),a._v(" "),s("p",[a._v("应用脚本也包含一段 JS 的脚本，这个用于格式化 QueryPHP 的通用前端后台的 JS 代码风格，跟 PHP 差不多。")])]),a._v(" "),s("h3",{attrs:{id:"git-commit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git-commit"}},[a._v("#")]),a._v(" Git Commit")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" commit -m "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'pass hook'")]),a._v("\n")])])]),s("p",[a._v("上述脚本就会自动运行帮助你格式化代码,你也可以忽略脚本。")]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" commit -n -m "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'pass hook'")]),a._v("\n")])])]),s("p",[a._v("这样子我们再也不需要浪费时间在无意义的代码风格的讨论上了。")])])}),[],!1,null,null,null);t.default=r.exports}}]);