# 查询语言.aggregate

## 记录数量 count

``` php
# 函数原型
# public function count($strField = '*', $sAlias = 'row_count');

# SELECT COUNT(`test`.*) AS row_count FROM `test` LIMIT 1
Db::table('test')->

count()->

getOne();

# SELECT COUNT(`test`.`id`) AS row_count FROM `test` LIMIT 1
Db::table('test')->

count('id')->

getOne();

# SELECT COUNT(`test`.`id`) AS count1 FROM `test` LIMIT 1
Db::table('test')->

count('id', 'count1')->

getOne();

# SELECT COUNT(`test`.`id`*50) AS count1 FROM `test` LIMIT 1
Db::table('test')->

count('{[id]*50}', 'count1')->

getOne();
```

## 平均值 avg

``` php
# 函数原型
public function avg($strField, $sAlias = 'avg_value');

# SELECT AVG(`test`.`id`) AS avg_value FROM `test`
Db::table('test')->

avg('id')->

getOne();
    
# SELECT AVG(`test`.`num1`*`test`.`num2`) AS avg_value FROM `test` 
Db::table('test')->

avg('{[num1]*[num2]}')->

getOne();
```

## 最大值 max

``` php
# 函数原型
# public function max($strField, $sAlias = 'max_value');

# SELECT MAX(`test`.`num`) AS max_value FROM `test`
Db::table('test')->

max('num')->

getOne();
```

## 最小值 min

``` php
# 函数原型
# public function min($strField, $sAlias = 'min_value');

# SELECT MIN(`test`.`num`) AS min_value FROM `test`
Db::table('test')->

min('num')->

getOne();
```

## 合计 sum

``` php
# 函数原型
# public function sum($strField, $sAlias = 'sum_value');

# SELECT SUM(`test`.`num`) AS sum_value FROM `test`
Db::table('test')->

sum('num')->

getOne();
```
