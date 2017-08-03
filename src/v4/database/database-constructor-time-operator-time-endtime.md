---
title: 数据库构造器时间运算符.time.endTime
type: v4
order: 126
---

# 函数原型
~~~
public function time($strInTimeCondition = null);
public function endTime();
~~~
time 开启一个时间状态，支持 date、month、day 和 year，而 endTime 为结束一个时间状态。

# 字段 （表达式） 值
~~~
/*
Array
(
    [0] => SELECT `test`.* FROM `test` WHERE `test`.`create_date` = '2017-09-12' AND `test`.`create_datetime` = '2017-09-12 14:13:37' AND `test`.`create_time` > '14:13:37' AND `test`.`create_timestamp` = '2017-09-12 14:13:37' AND `test`.`create_year` = '2017' AND `test`.`create_int` = 1505218417 AND `test`.`create_date` = '2017-05-01' AND `test`.`create_datetime` = '2017-05-01 00:00:00' AND `test`.`create_time` = '00:00:00' AND `test`.`create_timestamp` = '2017-05-01 00:00:00' AND `test`.`create_year` = '2017' AND `test`.`create_int` = 1493589600 AND `test`.`create_date` = '2017-04-11' AND `test`.`create_datetime` = '2017-04-11 00:00:00' AND `test`.`create_time` = '00:00:00' AND `test`.`create_timestamp` = '2017-04-11 00:00:00' AND `test`.`create_year` = '2017' AND `test`.`create_int` = 1491861600 AND `test`.`create_date` = '2019-01-01' AND `test`.`create_datetime` = '2019-01-01 00:00:00' AND `test`.`create_time` = '00:00:00' AND `test`.`create_timestamp` = '2019-01-01 00:00:00' AND `test`.`create_year` = '2019' AND `test`.`create_int` = 1546297200 
    [1] => Array
        (
        )

    [2] => 
    [3] => 5
    [4] => 
    [5] => Array
        (
        )
)
*/
print_r(
  database::table('test')
    ->time('date')
        ->where('create_date','+5 month')
        ->where('create_datetime','+5 month')
        ->where('create_time','>','+5 month')
        ->where('create_timestamp','=','+5 month')
        ->where('create_year','+5 month')
        ->where('create_int','+5 month')
    ->endTime()// date 条件结束，可以不用设置 endTime,如果后面紧接着time
    ->time('month')
        ->where('create_date',5)
        ->where('create_datetime',5)
        ->where('create_time',5)
        ->where('create_timestamp',5)
        ->where('create_year',5)
        ->where('create_int',5)
    ->endTime()// month 条件结束，可以不用设置 endTime,如果后面紧接着time
    ->time('day')
        ->where('create_date',11)
        ->where('create_datetime',11)
        ->where('create_time',11)
        ->where('create_timestamp',11)
        ->where('create_year',11)
        ->where('create_int',11)
    ->endTime()// day 条件结束，可以不用设置 endTime,如果后面紧接着time
    ->time('year')
        ->where('create_date',2019)
        ->where('create_datetime',2019)
        ->where('create_time',2019)
        ->where('create_timestamp',2019)
        ->where('create_year',2019)
        ->where('create_int',2019)
    ->endTime()// year 条件结束，可以不用设置 endTime,如果后面紧接着time
    ->getAll(true)
);
~~~

# whereDate、whereMonth、whereDay、whereYear 语法
~~~
Array
(
    [0] => SELECT `test`.* FROM `test` WHERE `test`.`create_date` = '2017-09-12' AND `test`.`create_datetime` = '2017-09-12 14:30:23' AND `test`.`create_year` = '2017' AND `test`.`create_int` = 1493589600 AND `test`.`create_datetime` = '2017-04-11 00:00:00' AND `test`.`create_timestamp` = '2017-04-11 00:00:00' AND `test`.`create_timestamp` = '2019-01-01 00:00:00' AND `test`.`create_year` = '2019' 
    [1] => Array
        (
        )

    [2] => 
    [3] => 5
    [4] => 
    [5] => Array
        (
        )
)
print_r(
    database::table('test')
        ->whereDate('create_date','+5 month')
        ->whereDate('create_datetime','+5 month')
        ->whereMonth('create_year',5)
        ->whereMonth('create_int',5)
        ->whereDay('create_datetime',11)
        ->whereDay('create_timestamp',11)
        ->whereYear('create_timestamp',2019)
        ->whereYear('create_year',2019)
        ->getAll(true)
);
~~~

# havingDate、havingMonth、havingDay、havingYear 语法
~~~
Array
(
    [0] => SELECT `test`.* FROM `test` GROUP BY `test`.`create_date` HAVING `test`.`create_date` = '2017-09-12' 
    [1] => Array
        (
        )

    [2] => 
    [3] => 5
    [4] => 
    [5] => Array
        (
        )
)
print_r(
    database::table('test')
        ->groupBy('create_date')
        ->havingDate('create_date','+5 month')
        ->getAll(true)
);
~~~