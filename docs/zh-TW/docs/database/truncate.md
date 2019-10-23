# 清空数据.truncate

## 函数原型

清空成功后，本方法无返回。

``` php
public function truncate($bFlag = false);
```

## 用法如下

``` php
# TRUNCATE TABLE `test`
Db::table('test')->

truncate();
```
