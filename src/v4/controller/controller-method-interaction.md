---
title: 控制器方法交互
type: v4
order: 41
---

当控制器继承至 **Q\mvc\controller** ，方法继承至 **Q\mvc\action** ，那么这个时候控制器和方法之间就形成了交互契约。

# 1）：准备代码
创建一个商品控制器 goods ,位于 **<project>/app/home/controller/goods.php**
~~~
<?php

namespace home\controller;

use Q\mvc\controller;

class goods extends controller {
    public function a() {
        echo 'a.';
    }
    public function b() {
        echo 'b.';
        $this->action ( 'a' );
    }
    public function c() {
        echo 'c.';
        $this->action ( 'detail' );
    }
}
~~~

创建一个商品详情方法器 **detail** ,位于 **<project>/app/home/controller/goods/detail.php**
~~~
<?php

namespace home\controller\goods;

use Q\mvc\action;

class detail extends action {

    /**
     * 执行入口
     */
    public function run($that = null, $in = []) {
        echo '商品详情';
        
        // 访问父级 a 方法
        $this->controller()->a();
    }

}
~~~

# 2）：访问测试
根据不同的访问地址输入不同的信息，来观察它们之间的交互契约。

### 1：访问 **Q\mvc\action** 方法
~~~
http://<service>/?c=goods&a=detail
~~~

输出结果：
~~~
商品详情a.
~~~

### 2：访问 **Q\mvc\controller** 方法，调用同级方法
~~~
http://<service>/?c=goods&a=b
~~~

输出结果：
~~~
b.a.
~~~

### 3：访问 **Q\mvc\action** 方法，调用 **Q\mvc\action** 子方法
~~~
http://<service>/?c=goods&a=c
~~~

输出结果：
~~~
c.商品详情a.
~~~