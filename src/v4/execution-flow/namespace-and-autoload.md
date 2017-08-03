---
title: 命名空间与自动载入.Namespace.Autoload
type: v4
order: 16
---

QueryPHP V 4.0 采用命名空间的方式来有效组织项目的代码，系统在运行过程中会自动注册部分命名空间，通过自动注册的命名空间与 autoload 结合起来从而实现高效的文件自动加载。

# 系统注册命名空间组
为了满足项目开发需求, QueryPHP 在项目运行过程中会注册多个系统惯性命名空间，命名空间遵循 **PSR-4** 自动加载规范。

### 1）：框架自身注册
系统为框架自身所在路径注册了一个命名空间，我们在应用中通过如下 Q 顶层命名空间访问到我们的类。
~~~
/**
 * 注册框架命名空间
 */
Q::import ( 'Q', Q_PATH, [ 
        'ignore' => [ 
                'resource' 
        ] 
] );
~~~

**例子：**

继承框架提供的基类控制器 **controller**，实际对应的路径为 **<project>/lib/queryphp/src/mvc/controller.php**
~~~
class index extend \Q\mvc\controller { }
~~~

### 2）：项目公共文件注册
系统为项目公共组件所在路径注册了一个命名空间，我们在应用中通过如下 com 顶层命名空间访问到我们的类。
~~~
// 注册公共组件命名空间
Q::import ( 'com', $this->com_path, [ 
      'ignore' => [ 
            'i18n',
            'option',
            'theme' 
       ]
 ] );
~~~

**例子：**

继承公共组件提供的基类模型 **base**，实际对应的路径为 **<project>/com/model/base.php**
~~~
class user extend \com\model\base { }
~~~

### 3）：项目应用文件注册
系统为应用所在路径注册了一个命名空间，我们在应用中通过如下 app_name 顶层命名空间访问到我们的类。
~~~
// 注册命名空间
Q::import ( $this->app_name, $this->app_path . '/' . $this->app_name, [ 
       [ 
              'i18n',
              'option',
              'theme' 
      ] 
] );
~~~

**例子：**

继承 home 提供的基类控制器 **base**，实际对应的路径为 **<project>/app/home/controller/base.php**
~~~
class blog extend \home\controller\base { }
~~~

# 手动注册命名空间组
系统通过 Q::import 来导入一个目录（包括子目录）所有命名空间，从而实现自动载入自主载入。
~~~
// 注册命名空间
Q::import ( 'test', PROJECT_PATH . '/test', [ 
       [ 
              'not'
      ] 
] );
~~~
> 提示：我们注册一个 **项目** 下面的 **test** 命名空间组，这个时候我们可以自由地导入 **test** 里面的类了。

**例子：**

继承 test 提供的一个 excel 文档处理类 **phpexcel**，实际对应的路径为 **<project>/test/phpexcel/excel.php**
~~~
$objExcel = new \test\phpexcel\excel();
~~~

# 手动注册单个命名空间
Q::import 也是通过 Q::addNamespace 来导入命名空间的，我们这里也可以通过这个方法注册命名空间。
~~~
// 添加命名空间
Q::addNamespace ( 'hello\world', PROJECT_PATH . '/hello/world');
~~~

> 提示：Q::addNamespace 的第二个参数可以传入一个数组，同一个命名空间可以支持多个路径。

**例子：**

继承 hello\world 提供的一个 word 文档处理类 **phpword**，实际对应的路径为 **<project>/hello/world/phpword.php**
~~~
$objWord = new \hello\world\phpword();
~~~

# 总结
命名空间规范是整个框架基础，理解好这里有助于掌握整个框架。