---
title: 数据库存储过程.procedure
type: v4
order: 152
---

# 创建一个存储过程
~~~
DELIMITER $$
DROP PROCEDURE IF EXISTS `test_pro`$$
CREATE PROCEDURE `test_pro`(IN p_in INT)
    BEGIN
    SELECT * FROM `test` WHERE id>p_in;
    SELECT NAME,VALUE FROM `test` WHERE id>p_in+1;
    END$$
DELIMITER ;
~~~
对于这个，存储过程返回两个结果。

# 执行查询
~~~
/*
Array
(
    [0] => Array
        (
            [0] => stdClass Object
                (
                    [id] => 2
                    [name] => 32
                    [value] => 2323
                    [num] => 3
                    [create_date] => 2017-04-12
                    [create_datetime] => 2017-04-12 20:45:10
                    [create_time] => 00:23:23
                    [create_timestamp] => 2017-04-27 20:45:16
                    [create_year] => 2022
                    [create_int] => 1133333333
                )

            [1] => stdClass Object
                (
                    [id] => 3
                    [name] => 2332
                    [value] => 2323
                    [num] => 5
                    [create_date] => 0000-00-00
                    [create_datetime] => 
                    [create_time] => 
                    [create_timestamp] => 
                    [create_year] => 
                    [create_int] => 
                )

        )

    [1] => Array
        (
            [0] => stdClass Object
                (
                    [name] => 2332
                    [value] => 2323
                )

        )
)
*/
print_r(
   database::query('CALL test_pro (1)')
   //database::select('CALL test_pro (1)') # 等价
   //database::select('CALL test_pro (?)', [1]) # 等价
);
~~~