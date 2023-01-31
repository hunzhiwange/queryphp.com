(window.webpackJsonp=window.webpackJsonp||[]).push([[154],{477:function(t,a,s){"use strict";s.r(a);var e=s(25),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"流程控制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#流程控制"}},[t._v("#")]),t._v(" 流程控制")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Testing Is Documentation")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerIfTest.php",target:"_blank",rel:"noopener noreferrer"}},[t._v("tests/View/Compiler/CompilerIfTest.php"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("条件表达式是最基本流程控制语句，这个在任何地方都是相当的实用。")]),t._v(" "),s("h2",{attrs:{id:"node-语法流程控制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-语法流程控制"}},[t._v("#")]),t._v(" Node 语法流程控制")]),t._v(" "),s("div",{staticClass:"language-php extra-class"},[s("pre",{pre:!0,attrs:{class:"language-php"}},[s("code",[t._v('public function testNodeStyle(): void\n{\n    $parser = $this->createParser();\n\n    $source = <<<\'eot\'\n        {% if cond="(1 == $id) OR ($id > 100)" %}one\n            {% elseif cond="2 == $id" %}two?\n            {% else %}other?\n        {% :if %}\n        eot;\n\n    $compiled = <<'),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("'eot'")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("OR")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$id")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("one")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("elseif")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("two?")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("other?")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("endif")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("eot;")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("$this-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("assertSame($compiled, $parser->doCompile($source, null, true));\n}\n")])])]),s("h2",{attrs:{id:"cond-可省略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cond-可省略"}},[t._v("#")]),t._v(" cond 可省略")]),t._v(" "),s("p",[t._v("默认第一个条件会自动解析为 cond。")]),t._v(" "),s("div",{staticClass:"language-php extra-class"},[s("pre",{pre:!0,attrs:{class:"language-php"}},[s("code",[t._v('public function testNodeSimple(): void\n{\n    $parser = $this->createParser();\n\n    $source = <<<\'eot\'\n        {% if "(1 == $id) OR ($id > 100)" %}one\n            {% elseif "2 == $id" %}two?\n            {% else %}other?\n        {% :if %}\n        eot;\n\n    $compiled = <<'),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("'eot'")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("OR")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$id")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("one")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("elseif")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("two?")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("other?")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("endif")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("eot;")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("$this-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("assertSame($compiled, $parser->doCompile($source, null, true));\n}\n")])])]),s("h2",{attrs:{id:"node-语法流程控制支持表达式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-语法流程控制支持表达式"}},[t._v("#")]),t._v(" Node 语法流程控制支持表达式")]),t._v(" "),s("div",{staticClass:"language-php extra-class"},[s("pre",{pre:!0,attrs:{class:"language-php"}},[s("code",[t._v('public function testNodeStyleSupportExpression(): void\n{\n    $parser = $this->createParser();\n\n    $source = <<<\'eot\'\n        {% if cond="1 == $a->name" %}\n            one\n        {% :if %}\n        \n        {% if cond="1 == hello::run()" %}\n            two\n        {% :if %}\n        eot;\n\n    $compiled = <<'),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("'eot'")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$a")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])])]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("one")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("endif")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])])]),t._v("\n        \n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" hello"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("run")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])])]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("two")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token php language-php"}},[s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("endif")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("?>")])])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("eot;")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("$this-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("assertSame($compiled, $parser->doCompile($source, null, true));\n}\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);