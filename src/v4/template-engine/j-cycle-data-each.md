---
title: J循环数据.each
type: v4
order: 106
---

each 标签也是用于循环输出，解析后的本质为 for，同时 for 比较符合大家的习惯。

# 1：完整无法如下
~~~
{{each for="list" index="i" value="vo"}} 
    <li><h1>{{title}}</h1>索引 {{i + 1}} ：{{vo}}</li>
{{/each}}
~~~

模板编译后的结果：
~~~
';
$.each( list, function( i, vo ) {
    out += ' 
    <li><h1>' + (title) + '</h1>索引 ' + (i + 1) + ' ：' + (vo) + '</li>
';
});
out += '
~~~

# 2：省略键值
有时候我们不需要键值，这个时候我们在模板中写下如下的代码：
~~~
{{each for="list"}} 
    <li><h1>{{title}}</h1>索引 {{index + 1}} ：{{value}}</li>
{{/each}}
~~~

模板编译后的结果：
~~~
';
$.each( list, function( index, value ) {
    out += ' 
    <li><h1>' + (title) + '</h1>索引 ' + (index + 1) + ' ：' + (value) + '</li>
';
});
out += '
~~~