---
title: 事件处理和监听器.event.listener
type: v4
order: 74
---

QueryPHP 为用户提供了一个事件处理用于业务的后续响应。

# 创建一个事件 after_test
~~~
<?php
namespace home\event;

use Q\event\event;

class after_test extends event {

    /**
     * 注册监听器
     * 
     * @return void
     */
    public function register() {
    }
}
~~~
说明：定义一个事件非常的简单，提供一个 register 方法，这个方法用于注册监听器，以便于实现我们的业务。

# 创建事件监听器 after_test_message
~~~
<?php
namespace home\listener;

use Q\event\listener;
use home\event\after_test;

class after_test_message extends listener {
    
    /**
     * 响应事件
     *
     * @param home\event\after_test $objEvent            
     * @return void
     */
    public function run(after_test $objEvent) {
    }
}
~~~

# 创建事件监听器 after_test_message2
~~~
<?php
namespace home\listener;

use Q\event\listener;
use home\event\after_test;

class after_test_message2 extends listener {
    
    /**
     * 响应事件
     *
     * @param home\event\after_test $objEvent            
     * @return void
     */
    public function run(after_test $objEvent) {
    }
}
~~~

# 控制器触发事件 after_test
~~~
<?php

namespace home\controller;

use Q\mvc\controller;
use home\event\after_test;

class index extends controller {
    
    /**
     * 默认方法
     */
    public function index() {
        // 获取信息
        $arrResult = [ 
                'name' => '小鸭子',
                'value' => '爱吃草' 
        ];
        
        // 响应事件
        return \Q::event ( new after_test ( $arrResult, 11, 22 ) );
        
        $this->display ();
    }
}
~~~

# 修改事件 after_test，绑定事件监听器
~~~
<?php
namespace home\event;

use Q\event\event;
use home\listener\after_test_message;
use home\listener\after_test_message2;

class after_test extends event {

    public function __construct($mixArgs1, $mixArgs2, $mixArgs3){
        $this->mixArgs1 = $mixArgs1;
        $this->mixArgs2 = $mixArgs2;
        $this->mixArgs3 = $mixArgs3;
    }
    
    /**
     * 注册监听器
     * 
     * @return void
     */
    public function register() {
        $this->listener(new after_test_message($this));
        $this->listener(new after_test_message2($this));
    }
}
~~~

# 修改事件监听器 after_test_message，添加响应
~~~
<?php
namespace home\listener;

use Q\event\listener;
use home\event\after_test;

class after_test_message extends listener {
    
    /**
     * 响应事件
     *
     * @param home\event\after_test $objEvent            
     * @return void
     */
    public function run(after_test $objEvent) {
        $arrArgs = $objEvent->mixArgs1;
        
        echo $arrArgs['name'].$arrArgs['value'].'<br/>';
        echo '监听器 after_test_message 触发成功<br/>';
    }
}
~~~
访问得到如下结果：
~~~
小鸭子爱吃草
监听器 after_test_message 触发成功
~~~

# 修改事件监听器 after_test_message2，添加响应
~~~
<?php
namespace home\listener;

use Q\event\listener;
use home\event\after_test;

class after_test_message2 extends listener {
    
    /**
     * 响应事件
     *
     * @param home\event\after_test $objEvent            
     * @return void
     */
    public function run(after_test $objEvent) {
        echo '监听器 after_test_message2 执行成功';
    }
}
~~~
访问得到如下结果：
~~~
小鸭子爱吃草
监听器 after_test_message 触发成功
监听器 after_test_message2 执行成功
~~~

# 抛出监听器异常中断监听器后续执行
建议使用系统系统的监听器 **Q\event\listener_exception** 异常，以便于后续通过 try catch 捕捉错误。
~~~
<?php
namespace home\listener;

use Q\event\listener;
use home\event\after_test;
use Q\event\listener_exception;

class after_test_message extends listener {
    
    /**
     * 响应事件
     *
     * @param home\event\after_test $objEvent            
     * @return void
     */
    public function run(after_test $objEvent) {
        echo '监听器  after_test_message 触发失败<br/>';
        \Q::throwException('监听器触发失败', listener_exception::class);
    }
}
~~~
说明：系统将抛出一个异常信息，用户可以通过 try catch 捕捉错误。

# 修改控制器拦截异常
~~~
<?php
namespace home\controller;

use Q\mvc\controller;
use home\event\after_test;
use Q\event\listener_exception;

class index extends controller {
    
    /**
     * 默认方法
     */
    public function index() {
        // 获取信息
        $arrResult = [ 
                'name' => '小鸭子',
                'value' => '爱吃草' 
        ];
        
        try {
            // 响应事件
            return \Q::event ( new after_test ( $arrResult, 11, 22 ) );
        } catch (listener_exception $oE) {
            return "【".$oE->getMessage()."】";
        }
    }
}
~~~

响应内容如下：
~~~
监听器  after_test_message 触发失败【监听器触发失败】
~~~

# 通过 return 中断监听器后续执行
我们也可以在监听器提供返回值，这样子后面的监听器也不会继续执行。
~~~
<?php
namespace home\listener;

use Q\event\listener;
use home\event\after_test;
use Q\event\listener_exception;

class after_test_message extends listener {
    
    /**
     * 响应事件
     *
     * @param home\event\after_test $objEvent            
     * @return void
     */
    public function run(after_test $objEvent) {
        return \Q::response('监听器1执行成功');
    }
}
~~~

响应内容如下：
~~~
监听器1执行成功
~~~
