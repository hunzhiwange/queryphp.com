---
title: 方法器分层
type: v4
order: 40
---

QueryPHP 框架可以不用定义控制器，而是定义 方法器，基于此建立 controller.action 体系将肥大的控制器解放出来。

# 1）：默认定位
home 应用编写一个 blog 控制器的**方法器** show，方法器的路径为 **<project>/app/home/controller/blog/show.php**
~~~
<?php

namespace home\controller\blog;

use Q\mvc\action;

class show extends action {
    
    /**
     * 执行入口
     */
    public function run($that, $in = []) {
        $arrView = [
            'title' => '我的日志',
            'content' => '我怎么可能写出来，哈哈，我放在心里的。'
        ];
        
        $this->assign($arrView);
        $this->display();
    }
    
}
~~~

定义模板文件，实际路径为 **<project>/app/home/theme/default/blog_show.html**
~~~
<h1>{$title}</h1>
<p>{$content}</p>
~~~

访问该控制器 url 地址：
~~~
http://<service>/?c=blog&a=show
~~~

输出结果：
~~~
我的日志

我怎么可能写出来，哈哈，我放在心里的。
~~~
> 说明：这里没有定义 blog 控制器，也可以定义 blog 控制器，如果 blog 控制器不存在 show 方法，系统会自动定位 action。
~~~
<?php

namespace home\controller;

use Q\mvc\controller;

class blog extends controller {
}
~~~

# 2）：注册方法
修改路由文件 router.php，改为如下：
~~~
// 注册路由
router::bind ( 'blog/list', '你好，世界！');
~~~

访问该控制器 url 地址：
~~~
http://<service>/?c=blog&a=list
~~~

~~~
输出结果：
~~~
你好，世界！
~~~
> 注意：注册方式支持的类型请参考控制器注册部分，支持的注册类型为那几种。