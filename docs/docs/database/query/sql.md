# 查询语言.sql

## 函数原型

本功能特别适合用于调试 SQL，大家可以这样子用。

``` php
public function sql($bFlag = true);
```

## 用法如下

``` php
/*
Array
(
    [0] => SELECT `test`.* FROM `test` ORDER BY `test`.`create_at` DESC LIMIT 1 
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
Db::table('test')->

sql(true)->

latest()->

getOne();

/*
Array
(
    [0] => delete from test where id = ?
    [1] => Array
        (
            [0] => 22
        )
)
*/
Db::sql(true)->

delete('delete from test where id = ?', [22]);

// 等效
Db::delete('delete from test where id = ?', [22], true);
```

# 例外 getOne 等也支持快捷

``` php
/*
Array
(
    [0] => SELECT `test`.* FROM `test` ORDER BY `test`.`create_at` DESC LIMIT 1 
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
Db::table('test')->

latest()->

getOne(true);

/*
public function select($strData, $arrBind = [], $bFlag = false);
public function insert($mixData, $arrBind = [], $booReplace = false, $bFlag = false);
public function insertAll($arrData, $arrBind = [], $booReplace = false, $bFlag = false);
public function update($mixData, $arrBind = [], $bFlag = false);
public function updateColumn($strColumn, $mixValue, $arrBind = [], $bFlag = false);
public function updateIncrease($strColumn, $intStep = 1, $arrBind = [], $bFlag = false);
public function updateDecrease($strColumn, $intStep = 1, $arrBind = [], $bFlag = false);
public function delete($mixData = null, $arrBind = [], $bFlag = false);
public function truncate($bFlag = false);
public function statement($strData, $arrBind = [], $bFlag = false);
public function getOne($bFlag = false);
public function getAll($bFlag = false);
public function get($nNum = null, $bFlag = false);
public function value($strField, $bFlag = false);
public function lists($mixFieldValue, $strFieldKey = null, $bFlag = false);
public function getCount($strField = '*', $sAlias = 'row_count', $bFlag = false);
public function getAvg($strField, $sAlias = 'avg_value', $bFlag = false);
public function getMax($strField, $sAlias = 'max_value', $bFlag = false);
public function getMin($strField, $sAlias = 'min_value', $bFlag = false);
public function getSum($strField, $sAlias = 'sum_value', $bFlag = false);
*/
```