# 查询聚合查询.aggregate

## 记录数量 count

``` php
# 函数原型
public function getCount($strField = '*', $sAlias = 'row_count', $bFlag = false);

# SELECT COUNT(*) AS row_count FROM `test` LIMIT 1
# int
Db::table('test')->

getCount()

# SELECT COUNT(*) AS row_count FROM `test` LIMIT 1
# int
Db::table('test')->

count()->

get()->

row_count;

# SELECT COUNT(*) AS row_count2 FROM `test` LIMIT 1
# int
Db::table('test')->

getCount('*', 'row_count2')
```

## 平均值 avg

``` php
# 函数原型
public function getAvg($strField, $sAlias = 'avg_value', $bFlag = false);

# SELECT AVG(`test`.`num`) AS avg_value FROM `test` LIMIT 1
# int
Db::table('test')->

getAvg('num');

# SELECT AVG(`test`.`id`) AS avg_value FROM `test` LIMIT 1
# int
Db::table('test')->

avg('id')->

get()->

avg_value;

# SELECT AVG(`test`.`num`) AS avg_value2 FROM `test` LIMIT 1
# int
Db::table('test')->

getAvg('num', 'avg_value2');
```

## 最大值 max

``` php
# 函数原型
public function getMax($strField, $sAlias = 'max_value', $bFlag = false);

# SELECT MAX(`test`.`num`) AS max_value FROM `test` LIMIT 1
# int
Db::table('test')->

getMax('num');

# SELECT MAX(`test`.`id`) AS max_value FROM `test` LIMIT 1
# int
Db::table('test')->

max('id')->

get()->

max_value;

# SELECT MAX(`test`.`num`) AS max_value2 FROM `test` LIMIT 1
# int
Db::table('test')->

getMax('num', 'max_value2');
```

## 最小值 min

``` php
# 函数原型
public function getMin($strField, $sAlias = 'min_value', $bFlag = false);

# SELECT MIN(`test`.`num`) AS min_value FROM `test` LIMIT 1
# int
Db::table('test')->

getMin('num');

# SELECT MIN(`test`.`num`) AS min_value FROM `test` LIMIT 1
# int
Db::table('test')->

min('num')->

get()->

min_value;

# SELECT MIN(`test`.`num`) AS min_value2 FROM `test` LIMIT 1
# int
Db::table('test')->

getMin('num', 'min_value2');
```

## 合计 sum

``` php
# 函数原型
public function getSum($strField, $sAlias = 'sum_value', $bFlag = false);

# SELECT SUM(`test`.`num`) AS sum_value FROM `test` LIMIT 1
# int
Db::table('test')->

getSum('num');

# SELECT SUM(`test`.`num`) AS sum_value FROM `test` LIMIT 1
# int
Db::table('test')->

sum('id')->

get()->

sum_value;

# SELECT SUM(`test`.`num`) AS sum_value2 FROM `test` LIMIT 1
# int
Db::table('test')->

getSum('num', 'sum_value2');
```
