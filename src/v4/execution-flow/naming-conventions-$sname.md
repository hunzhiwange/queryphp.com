---
title: 命名规范.$sName
type: v4
order: 12
---

## 变量命名

### 命名总则
QueryPHP 以`匈牙利命名法`为基本的命名规范，并有所简化以满足我们产品的设计。基本原则是：**变量名=属性+类型+对象描述**，容易记忆容易理解，并且保证名字的连贯性。

通常来说取一个变量的类型的前 `1` 位或者前 `3` 位为属性，其它类型：**量名=类型+对象描述**。

| 类型   |  命名规范  | 描述  |
| --- | --- | --- |
|  字符串  |  $sMyName，$strMyName  |  string  |
|  布尔值 |  $bIsYes，$booIsYes  |  boolean  |
|  数组  | $aMyArray ， $arrMyArray  |  array  |
|  对象实例  |  $oMyObject，$objMyObject  |  object  |
|  数字（浮点数、整型）  |  $nGoodsCount , $numGoodsCount  |   number |
|  浮点数  |  $fMyName ， $floMyName，$dMyName ， $douMyName   |  float，double  |
|  整型  |  $iGoodsCount , $intGoodsCount  |  integer   |
|  回调 |  $cGetName , $calGetName  | callback  |
| 资源句柄 |  $hMysqlConnect ， $hanMysqlConnect，$rMysqlConnect ， $resMysqlConnect  |  resource，handle  |
|  混合类型 |  $mArrayString , $mixArrayString  |  mixed  |

> 注意：按照我们命名习惯书写一个变量，如果这个变量的类型在中途变更，命名以`第一个为准`，防止重新创建变量。

``` php
$strName = 'Hello world';
$strName [] =  $strName; // 转换为数组，保持不变
```

### 常量 define
define 函数的第一个参数全部大写，且以 `_` 分割，例如：

``` php
define('HELLO_WORLD', 'foobar');
```

### 数组键值
数组的键值以 `_` 分割，不采用驼峰法

``` php
$arrData['first_name'] = 'Hello QueryPHP';
```

## 命名空间
QueryPHP 基于 `PSR-4` 自动加载规范，并且注意如下规范，命名空间使用前必须先注册：
* 目录统一建议使用小写（大写也支持）；
* 类文件统一以 .php 为后缀；
* 类的文件名均以命名空间定义，并且命名空间的路径和类库文件所在路径一致；
* 类名和类文件名保持一致，统一采用小写，以 _ 分隔；

``` php
/**
 * 注册框架命名空间
 */
Q::import ( 'Q', Q_PATH, [ 
        'ignore' => [ 
                'resource' 
        ] 
] );
```

## 方法或函数
QueryPHP 方法和函数均建议使用 **驼峰法** 来命名。
* 首字母小写；
* 多个单词间不使用间隔，除第一个单词外，其他单词首字母大写；

``` php
// 函数   
function myFunction (  )  {
    echo 'Hello world';
}   
  
// 类的方法   
class demo {   
  
    function demoHello( ) {   
        echo 'Hello world';
   }   
  
}
```

## 数据库
数据库几乎是所有应用的标准，命名也需要讲究一下。
### 数据库表名
* 表名均使用`小写字母`；
* 表名字`不加前缀`，开发起来更爽；
* 对于视图，使用 `_view` 结尾，普通表不用加任何前缀；
* 对于多个单词组成的表名，使用 `_` 间隔；

```
user   
user_info   
view_book_store
```

### 数据库字段
* 字段名均使用`小写字母`；
* 对于多个单词组成的字段名，使用 `_` 间隔；
* 外键使用`关联表名字 + 字段名`；

```
// 数据库表   
use  
area 
  
// use 字段   
id   
name
area_id

// area 字段
id
name
```

## 注释和其他
也许你注意到了，还有很多其它的比如注释的书写格式，这些东西大家可以看看源代码借鉴一下。