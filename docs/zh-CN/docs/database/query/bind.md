# 查询语言.bind

## 函数原型

``` php
public function bind($mixName, $mixValue, $intType = PDO::PARAM_STR);
```

## 参数绑定 :id

### 基本使用

#### 例1：

``` php
/*
array (
  0 => 'SELECT `test`.* FROM `test` WHERE `test`.`id` = :id',
  1 => 
  array (
    'id' => 
    array (
      0 => 1,
      1 => 2,
    ),
  ),
  2 => false,
  3 => NULL,
  4 => NULL,
  5 => 
  array (
  ),
)
 */
Db::table('test')->

bind('id', 1)->

where('id', '=', '[:id]')->

getAll()
```

#### 例2：

``` php
/*
array (
  0 => 'SELECT `test`.* FROM `test` WHERE `test`.`id` = :id',
  1 => 
  array (
    'id' => 
    array (
      0 => 1,
      1 => 1,
    ),
  ),
  2 => false,
  3 => NULL,
  4 => NULL,
  5 => 
  array (
  ),
)
 */
Db::table('test')->

bind('id', 1, PDO::PARAM_INT)->

where('id', '=', '[:id]')->

getAll()
```

#### 例3：

``` php
/*
array (
  0 => 'SELECT `test`.* FROM `test` WHERE `test`.`id` = :id',
  1 => 
  array (
    'id' => 
    array (
      0 => 1,
      1 => 1,
    ),
  ),
  2 => false,
  3 => NULL,
  4 => NULL,
  5 => 
  array (
  ),
)
 */
Db::table('test')->

bind('id', [1, PDO::PARAM_INT])->

where('id', '=', '[:id]')->

getAll()
```

### 数组支持

``` php
/*
array (
  0 => 'SELECT `test`.* FROM `test` WHERE `test`.`id` = :id AND `test`.`hello` LIKE :name',
  1 => 
  array (
    'id' => 
    array (
      0 => 1,
      1 => 1,
    ),
    'name' => 
    array (
      0 => '小鸭子',
      1 => 2,
    ),
  ),
  2 => false,
  3 => NULL,
  4 => NULL,
  5 => 
  array (
  ),
)
*/
Db::table('test')->

bind(['id' => [1, \PDO::PARAM_INT], 'name'=>'小鸭子'])->

where('id', '=', '[:id]')->

where('hello', 'like', '[:name]')->

getAll();
```

## 参数绑定 ?

``` php
/*
array (
  0 => 'SELECT `test`.* FROM `test` WHERE `test`.`id` = ? AND `test`.`hello` LIKE ?',
  1 => 
  array (
    0 => 
    array (
      0 => 5,
      1 => 1,
    ),
    1 => 
    array (
      0 => '小鸭子',
      1 => 2,
    ),
  ),
  2 => false,
  3 => NULL,
  4 => NULL,
  5 => 
  array (
  ),
)
*/
Db::table('test')->

bind([[5, PDO::PARAM_INT], '小鸭子'])->

where('id', '=', '[?]')->

where('hello', 'like', '[?]')->

getAll();
```
