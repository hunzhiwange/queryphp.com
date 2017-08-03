---
title: 数据库执行原生.sql.语句
type: v4
order: 123
---

配置好数据库连接以后，你可以使用 database 来执行查询。  QueryPHP 提供了 select 、 update 、 insert 、 delete 和 statement 的查询方法。

# 查询数据
从数据库获取列表数据，用于页面渲染。
~~~
$arrData = database::query('select * from q_test where id=?',[44]);
var_dump($arrData);
~~~

# 执行 sql
执行一般的 sql，不返回记录数据。
~~~
$intLastID = database::execute('insert into q_test (name, value) values (?, ?)',['小鸭子','喜欢游泳']);
var_dump($intLastID);
~~~

# 查询数据 select
使用 select 方法进行数据库的原生查询，只能运行 select 开头的。
~~~
<?php
namespace home\controller;

use Q\mvc\controller;
use Q\database\database;

class index extends controller {
    
    /**
     * 默认方法
     */
    public function index() {
    	  $arrData = database::select('select * from test where id = ?', [4] );
          print_r($arrData);
    }
}
~~~

注意：第二个为参数绑定，系统采用 Pdo 默认提供的参数过滤，可以防止 SQL 攻击。

# 命名绑定 bind
除了使用 ? 来表示参数绑定外，你也可以使用命名绑定：
~~~
$arrData = database::select('select * from q_test where id = :id', ['id' => 4]) );
print_r($arrData);
~~~

# 写入数据 insert
使用 insert 方法进行数据库的原生写入，只能运行 insert 开头的。。
~~~
$intLastID = database::insert('insert into q_test (name, value) values (?, ?)', ['小鸭子', '喜欢游泳']);
var_dump($intLastID);
~~~

# 更新数据 update
使用 update 方法进行数据库的原生更新，只能运行 update 开头的。。
~~~
$intNumRow = database::update('update q_test set name = "2342342342" where id = ?', [3]);
var_dump($intNumRow);
~~~

# 删除数据 delete
使用 delete 方法进行数据库的原生删除，只能运行 delete 开头的。。
~~~
$intNumRow = database::delete('delete from q_test where id = ?', [3]);
var_dump($intNumRow);
~~~

# 其它声明执行 stagement
有些数据库没有返回值， 可以使用 statement 方法，只能运行无返回值的。
~~~
database::statement('drop table q_test');
~~~