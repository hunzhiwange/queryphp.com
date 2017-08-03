---
title: 数据库配置
type: v4
order: 122
---

# 一、数据库配置文件
我们可以在 <project>/com/option 目录中 default.php 或则 db.php 定义数据库连接。

# 二、数据库默认配置文件定义
~~~
// 数据库默认连接参数
'db_type' => 'mysql', // 数据库类型
'db_host' => 'localhost', // 数据库地址
'db_user' => 'root', // 数据库用户名
'db_password' => '', // 数据库密码
'db_prefix' => '', // 数据库表前缀
'db_char' => 'utf8', // 数据库编码
'db_name' => '', // 数据库名字
'db_schema' => '', // 数据库SCHEMA
'db_port' => 3306, // 端口
'db_dsn' => '', // [优先解析]数据 dsn 解析 mysql://username:password@localhost:3306/dbname
'db_params' => [ ], // 数据库连接参数
'db_persistent' => FALSE, // 数据库是否支持长连接
'db_distributed' => FALSE, // 是否采用分布式
'db_rw_separate' => FALSE, // 数据库读写是否分离[注意：主从式有效]
'db_master' => [], // 主服务器
'db_slave' => [], // 副服务器

// 数据库缓存
'db_cache' => FALSE, // 数据库查询是否缓存
'db_meta_cached' => TRUE, // 数据库元是否缓存
~~~

# 三、数据库读写分离
QueryPHP 允许用户把一个主数据库作为写入、更新以及删除，例外的附属服务区作为只读数据库。
通过下面这个例子，我们来学习如何配置数据库读写连接的分离：
~~~
'db_type' => 'mysql', // 数据库类型
'db_host' => 'localhost', // 数据库地址
'db_user' => 'root', // 数据库用户名
'db_password' => '', // 数据库密码
'db_prefix' => 'q_', // 数据库表前缀
'db_char' => 'utf8', // 数据库编码
'db_name' => 'demo', // 数据库名字
'db_port' => 3306, // 端口
'db_master' => [ ],
'db_slave' => [ 
    [ 
        'db_host' => '192.168.1.2' ,
        'db_port' => 3306
    ],
    [ 
        'db_host' => '192.168.1.3' ,
        'db_port' => 3307
    ] 
],
'db_distributed' => true, // 是否采用分布式
'db_rw_separate' => true // 数据库读写是否分离[注意：主从式有效]
~~~
说明，db_master 为主服务，db_slave 为附属服务器，其它选项为公共选项公用，如果不同则可以自行在服务器中添加覆盖。

# 四、使用多数据库连接
你可以在配置文件预先定义好连接，例如：
~~~
'my_db' = [
	'db_type' => 'mysql', // 数据库类型
    'db_host' => 'localhost', // 数据库地址
    'db_user' => 'root', // 数据库用户名
    'db_password' => '', // 数据库密码
    'db_prefix' => 'q_', // 数据库表前缀
    'db_char' => 'utf8', // 数据库编码
    'db_name' => 'demo', // 数据库名字
    'db_port' => 3306, // 端口
    'db_master' => [ ],
]
~~~
使用参数名字直接连接
~~~
$arrObj = database::connect( 'my_db' )->select( 'select * from q_test where id = ?', 1);
~~~

访问原始的 Pdo 实例：
~~~
$objPdo = database::connect()->getPdo( );
~~~
