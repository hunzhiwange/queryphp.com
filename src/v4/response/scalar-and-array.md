---
title: 标量和数组以及其它基础数据
type: v4
order: 52
---

可以在页面直接数据。

# 数组
数组将会自动格式化为 json 数据。

``` php
<?php
namespace home\controller;

use Q\mvc\controller;

class index extends controller {

    /**
     * 默认方法
     */
    public function index() {
        return [ 
                'name' => '小鸭子',
                'value' => '爱吃草' 
        ];
    }
}
```

**返回结果**
~~~
{"name":"小鸭子","value":"爱吃草"}
~~~

# 标量数据
~~~
return '12345 上山打老虎';
~~~

**返回结果**
~~~
12345 上山打老虎
~~~

# 回调数据
~~~
# 无返回值
return function(){ };

# 有返回值
return function(){ return 123456; };
~~~

**返回结果**
~~~
# 无返回值
Closure Object ( [this] => ... )

# 有返回值
123456
~~~

# 其它类型

``` php
# 定义一个 class
class test{
}

# 创建一个实例
return new test();
```

**返回结果**

``` php
home\controller\test Object ( )
```

