---
title: 响应对象之.xml
type: v4
order: 56
---

xml 可以用来响应一个 xml 数据。

# 函数原型
~~~
public function xml($arrData = null, $strCharset = 'utf-8');
~~~

# 使用方法
~~~
return \Q::response()->xml([
    'name' => '小鸭子',
    'value' => '爱吃草'
]);
~~~

# 返回一个响应对象
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
<name><![CDATA[小鸭子]]></name>
<value><![CDATA[爱吃草]]></value>
</root>
```
