---
title: C变量输出.$sName
type: v4
order: 82
---

# 最简单一个普通变量
~~~
// 赋值
$this->assign ( 'sName', '欢迎使用 QueryPHP !' );

// 模板
{$sName}
~~~
 模板编译后的结果：
~~~
<?php echo $sName; ?>
~~~
> 注意：模板标签的“{”和“$”之间不能有任何的空格，否则标签无效。

# 输出一个数组
~~~
// 赋值
$arrValue = array (
	'name' => 'QueryPHP',
	'description' => 'It is not a dream!' 
); 

// 模板
我的梦想是写好”{$arrValue['name']}“，我相信”{$arrValue['description']}“。 
~~~
 模板编译后的结果就是：
~~~
我的梦想是写好”<?php echo $arrValue['name']; ?>“，我相信”<?php echo $arrValue['description']; ?>“。
~~~

# 输出一个对象
我们编写这样子一个简单对象，然后再赋值：
~~~
// 赋值
class demo {
    public $_sName = 'QueryPHP';
    public $_sDescription = 'It is not a dream!';
}

$oDemo = new demo ();
$this->assign ( 'oDemo', $oDemo );

// 模板
我的梦想是写好”{$oDemo:_sName}“，我相信”{$oDemo:_sDescription}“。  
~~~

 模板编译后的结果：
~~~
我的梦想是写好”<?php echo $oDemo->_sName; ?>“，我相信”<?php echo $oDemo->_sDescription; ?>“。
~~~

无限级支持
~~~
我的梦想是写好”{$oDemo:_sName:child:child:child}“，我相信”{$oDemo:_sDescription}“。  
~~~

 模板编译后的结果：
~~~
我的梦想是写好”<?php echo $oDemo->_sName->child->child->child; ?>“，我相信”<?php echo $oDemo->_sDescription; ?>“。
~~~

# 对象数组点语法支持
为了方便模板定义，数组和对象还可以支持点语法，例如，上面的模板中：
~~~
我的梦想是写好”{$oDemo._sName}“，我相信”{$oDemo._sDescription}“。
~~~

 模板编译后的结果：
~~~
我的梦想是写好”<?php echo is_array( $oDemo ) ? $oDemo['_sName'] : $oDemo->_sName; ?>“，我相信”<?php echo is_array( $oDemo ) ? $oDemo['_sDescription'] : $oDemo->_sDescription; ?>“。
~~~
注意:因为点语法默认是自动判断对象和数组，这个兼容性比较好。我们可以通过配置 **theme_var_identify** 参数来决定点语法的输出效果：
~~~
obj = 对象方式
array = 数组方式
~~~

支持无限级数组和无限级对象属性
~~~
我的梦想是写好”{$oDemo._sName.one.two.three.four}“，我相信”{$oDemo._sDescription.one.two.three.four}“。
~~~

 模板编译后的结果：
~~~
我的梦想是写好”<?php echo is_array( $oDemo ) ? $oDemo['_sName']['one']['two']['three']['four'] : $oDemo->_sName->one->two->three->four; ?>“，我相信”<?php echo is_array( $oDemo ) ? $oDemo['_sDescription']['one']['two']['three']['four'] : $oDemo->_sDescription->one->two->three->four; ?>“。
~~~

> 注意：推荐使用“:”格式来输出对象，“[]”格式来输出数组，这种效率比较高。
     