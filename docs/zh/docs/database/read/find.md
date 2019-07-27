# 查询数据.get

## 函数原型

``` php
public function get($nNum = null, $bFlag = false);
```

## 用法如下：

```
# SELECT `test`.* FROM `test
Db::table('test')->

get();

# SELECT `test`.* FROM `test` LIMIT 0,5
Db::table('test')->

get(5);
```
