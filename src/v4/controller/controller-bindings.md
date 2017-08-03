---
title: 控制器绑定
type: v4
order: 39
---

QueryPHP 控制器定义设计得非常灵活，可以有多种情况，下面一个个为大家讲解一下。

# 1）：继承至 Q\mvc\controller
home 应用编写一个 hello 控制器，控制器的路径为 **<project>/app/home/controller/hello.php**
~~~
<?php

namespace home\controller;

use Q\mvc\controller;

class hello extends controller {
    
    /**
     * 默认方法
     */
    public function index() {
        $this->assign('strSay', 'hello world');
        $this->display();
    }
}
~~~

定义模板文件，实际路径为 **<project>/app/home/theme/default/hello_index.html**
~~~
我想对世界说
{$strSay}
~~~

访问该控制器 url 地址：
~~~
http://<service>/?c=hello
~~~

输出结果：
~~~
我想对世界说 hello world
~~~

# 2）：不继承任何控制器
为实现上面相同的功能，我们这里不继承任何控制器，手动去调用视图，输出结果见上面。
~~~
<?php

namespace home\controller;

use Q\mvc\view;

class hello {
    
    /**
     * 默认方法
     */
    public function index() {
        $objView = view::run ();
        $objView->assign ( 'strSay', 'hello world' );
        $objView->display ();
    }
}
~~~

# 3）：注册控制器为回调
控制器可以为一个回调，这种情况需要预先注册，新建一个路由配置文件，位置为 **<project>/app/home/option/router.php**。

### 1：匿名函数支持
~~~
<?php

// 匿名函数回调
router::bind ( 'hello', function( ){ 
    $this->assign ( 'strSay', '匿名函数' );
    $this->display ();
} );
~~~
输出结果：
~~~
我想对世界说 匿名函数
~~~

### 2：静态类回调支持
修改路由文件 router.php，改为如下：
~~~
<?php

class helloworld {
    
    /**
     * 返回 say
     *
     * @return string
     */
    public static function getSay($that) {
        $that->assign ( 'strSay', '静态回调' );
        $that->display ();
    }
}

// 注册路由
router::bind ( 'hello', [ 
        'helloworld',
        'getSay' 
] );
~~~
输出结果：
~~~
我想对世界说 静态回调
~~~

### 3：对象实例回调支持
修改路由文件 router.php，改为如下：
~~~
<?php

class helloworld {
    
    /**
     * 返回 say
     *
     * @return string
     */
    public function getSay($that) {
        $that->assign ( 'strSay', '实例回调' );
        $that->display ();
    }
}

// 注册路由
router::bind ( 'hello', [ 
        new helloworld (),
        'getSay' 
] );
~~~
输出结果：
~~~
我想对世界说 实例回调
~~~

# 4）：注册继承至 Q\mvc\action
修改路由文件 router.php，改为如下：
~~~
<?php

use Q\mvc\action;

class helloworld extends action{
    
    /**
     * 返回 say
     *
     * @return string
     */
    public function run($that, $in = []) {
         $that->assign ( 'strSay', '继承至 Q\base\action' );
         $that->display ();
    }
}

// 注册路由
router::bind ( 'hello', new helloworld() );
~~~
输出结果：
~~~
我想对世界说 继承至 Q\mvc\action
~~~

# 5）：注册继承至 Q\mvc\controller
修改路由文件 router.php，改为如下：
~~~
<?php

use Q\mvc\controller;

class helloworld extends controller{
    
    /**
     * 返回 say
     *
     * @return string
     */
    public function index() {
         $this->assign ( 'strSay', '继承至 Q\base\controller' );
         $this->display ();
    }
}

// 注册路由
router::bind ( 'hello', new helloworld() );
~~~
输出结果：
~~~
我想对世界说 继承至 Q\mvc\controller
~~~

# 6）：注册对象实例
修改路由文件 router.php，改为如下：
~~~
<?php

class helloworld{
    
    /**
     * 返回 say
     *
     * @return string
     */
    public function index($that, $in) {
         $that->assign ( 'strSay', '注册对象实例' );
         $that->display ();
    }
}

// 注册路由
router::bind ( 'hello', new helloworld() );
~~~
输出结果：
~~~
我想对世界说 注册对象实例
~~~

# 7）：注册普通数据类型
普通数据类型将会被直接输出，修改路由文件 router.php，改为如下：
~~~
<?php

// 基本数据类型 string,integer,float,boolean,numeric,null
$booHello = true;

// 注册路由
router::bind ( 'hello', $booHello );
~~~
输出结果：
~~~
1
~~~

# 8）：注册数组类型
如果控制器为数组，那么键值则为方法，修改路由文件 router.php，改为如下：

### 1：回调支持
回调包括上面的匿名函数、静态回调和对象实例回调，这里只测试一种。
~~~
<?php

$calHello = function( ){ 
    $this->assign ( 'strSay', '数组匿名函数' );
    $this->display ();
};

// 注册路由
router::bind ( 'hello',  ['index' => $calHello]);
~~~
输出结果：
~~~
我想对世界说 匿名函数
~~~

### 2：数组支持
如果为数组直接返回 json，这里只测试一种。
~~~
<?php

$arrHello = ['name' => '我的世界', 'description' => '我乐我生活，你享你世界'];

// 注册路由
router::bind ( 'hello',  ['index' => $arrHello]);
~~~
输出结果：
~~~
{"name":"我的世界","description":"我乐我生活，你享你世界"}
~~~

### 3：其它类型支持
数组的值可以还支持普通数据类型，**Q\base\action** 等，重复上面的注册支持类型，只是值如果为数组则输出 json。
~~~
<?php

$strHello = 'Ye,good';

// 注册路由
router::bind ( 'hello',  ['index' => $strHello]);
~~~
输出结果：
~~~
Ye,good
~~~