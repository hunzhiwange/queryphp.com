---
title: 响应对象之.json.jsonp
type: v4
order: 55
---

QueryPHP 的 json 方法会自动将 Content-Type 响应头信息设置为 application/json，并将数组转换为 JSON 字符串。

# 函数原型
~~~
public function json($arrData = null, $intOptions = JSON_UNESCAPED_UNICODE, $strCharset = 'utf-8');
~~~

# 使用方法
~~~
return \Q::response()->json([ 
        'name' => '小鸭子',
        'value' => '爱吃草' 
]);
~~~

**响应结果**
~~~
{"name":"小鸭子","value":"爱吃草"}
~~~

# 创建 jsonp
~~~
return \Q::response()->json([ 
        'name' => '小鸭子',
        'value' => '爱吃草' 
])
->jsonCallback('helloworld');

# 等价的 jsonp
return \Q::response()->jsonp('helloworld',[ 
        'name' => '小鸭子',
        'value' => '爱吃草' 
]);
~~~

**响应结果**
~~~
helloworld({"name":"小鸭子","value":"爱吃草"});
~~~

