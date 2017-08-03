---
title: 数据库信息获取.getTableNames.getTableColumns
type: v4
order: 163
---

# 函数原型
~~~
public function getTableNames($sDbName = null, $mixMaster = false)
public function getTableColumns($sTableName, $mixMaster = false)
~~~

# 获取表名字列表 getTableNames
~~~
/*
Array
(
    [0] => test
    [1] => test2
)
*/
print_r(database::getTableNames());
~~~

# 获取字段名字列表 getTableColumns
这里面包含主键，自增 ID 打包信息。
~~~
/*
Array
(
    [list] => Array
        (
            [id] => Array
                (
                    [name] => id
                    [type] => bigint(10)
                    [primary_key] => 1
                    [auto_increment] => 1
                    [default] => 
                )

            [name] => Array
                (
                    [name] => name
                    [type] => varchar(30)
                    [primary_key] => 1
                    [auto_increment] => 
                    [default] => 
                )

            [value] => Array
                (
                    [name] => value
                    [type] => varchar(50)
                    [primary_key] => 
                    [auto_increment] => 
                    [default] => 
                )

            [num] => Array
                (
                    [name] => num
                    [type] => int(10)
                    [primary_key] => 
                    [auto_increment] => 
                    [default] => 5
                )

        )

    [primary_key] => Array
        (
            [0] => id
            [1] => name
        )

    [auto_increment] => id
)
*/
print_r(database::getTableColumns('test'));
~~~