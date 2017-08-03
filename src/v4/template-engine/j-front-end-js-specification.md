---
title: J前端.JS.规范
type: v4
order: 112
---

# 1)：变量命名

### 命名总则
QueryPHP 以匈牙利命名法为基本的命名规范，并有所简化以满足我们产品的设计。基本原则是：**变量名=属性+类型+对象描述**，容易记忆容易理解，并且保证名字的连贯性。

通常来说取一个变量的类型的前 **1** 位或者前 **3** 位为属性，其它类型：**量名=类型+对象描述**。

| 类型   |  命名规范  | 描述  |
| --- | --- | --- |
|  字符串  |  sMyName，strMyName  |  string  |
|  布尔值 |  bIsYes，booIsYes  |  boolean  |
|  数组  | aMyArray ， arrMyArray  |  array  |
|  对象实例  |  oMyObject，objMyObject  |  object  |
|  数字（浮点数、整型）  |  nGoodsCount , numGoodsCount  |   number |
|  浮点数  |  fMyName ， floMyName，dMyName ， douMyName   |  float，double  |
|  整型  |  iGoodsCount , intGoodsCount  |  integer   |
|  正则 |  rEmail, regEmail  | Regular Expression  |
|  混合类型 |  mArrayString , mixArrayString  |  mixed  |
|  其它类型和函数 |  getName, otherTest , helloWorld  |  其它类型，去掉属性 |

> 注意：按照我们命名习惯书写一个变量，如果这个变量的类型在中途变更，命名以第一个为准，防止重新创建变量。
~~~
var strName = 'Hello world';
strName = []; // 转换为数组，保持不变
~~~

# 2)：匈牙利命名示例
~~~
// 数组
var arrName = [ '牛', '熊猫', '青蛙' , '春天' ]; 

// 对象
var objBtn = window.document.getElementById( 'btn' ); 

// 函数
function getName( ) { }

// 整型
var intAge= 25;  

// 字符串
var strHello = "world";
~~~