(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{447:function(t,n,a){"use strict";a.r(n);var e=a(12),s=Object(e.a)({},function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"查询语言-union"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查询语言-union","aria-hidden":"true"}},[t._v("#")]),t._v(" 查询语言.union")]),t._v(" "),a("h2",{attrs:{id:"函数原型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数原型","aria-hidden":"true"}},[t._v("#")]),t._v(" 函数原型")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("public function union($mixSelect = [], $sType = 'UNION');\n")])])]),a("blockquote",[a("p",[t._v("说明：参数支持字符串、子查询器以及它们构成的一维数组。")])]),t._v(" "),a("h2",{attrs:{id:"用法如下"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用法如下","aria-hidden":"true"}},[t._v("#")]),t._v(" 用法如下")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/*\nSELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test` \n UNION SELECT `yyyyy`.`yid` AS `id`,`yyyyy`.`name` AS `value`  FROM `yyyyy`  WHERE `yyyyy`.`first_name` = '222' \n UNION SELECT id,value FROM test2\n UNION SELECT `yyyyy`.`yid` AS `id`,`yyyyy`.`name` AS `value`  FROM `yyyyy`  WHERE `yyyyy`.`first_name` = '222' \n*/\n$union1 = Db::table('yyyyy', 'yid as id,name as value')->where('first_name', '=', '222');\n$union2 = 'SELECT id,value FROM test2';\n\nDb::table('test', 'tid as id,tname as value')->\n\nunion($union1)->\n\nunion($union2)->\n\nunion($union1)->\n\ngetAll();\n")])])]),a("p",[t._v("等价数组写法")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Db::table('test', 'tid as id,tname as value')->\n\nunion([$union1, $union2, $union1])->\n\ngetAll();\n")])])]),a("h2",{attrs:{id:"也支持-unionall"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#也支持-unionall","aria-hidden":"true"}},[t._v("#")]),t._v(" 也支持 unionAll")]),t._v(" "),a("p",[t._v("去掉前面两个参数，后面的全部都是条件参数。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/*\nSELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test` \n UNION ALL SELECT id,value FROM test2\n*/\n\n$union1 = 'SELECT id,value FROM test2';\n\nDb::table('test', 'tid as id,tname as value')->\n\nunionAll($union1)->\n\ngetAll();\n")])])])])},[],!1,null,null,null);n.default=s.exports}}]);