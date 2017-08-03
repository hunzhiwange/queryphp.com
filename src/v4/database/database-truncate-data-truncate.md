---
title: 数据库清空数据.truncate
type: v4
order: 161
---

# 函数原型
清空成功后，本方法无返回。
~~~
public function truncate($bFlag = false)
~~~

# 用法如下：
~~~
# TRUNCATE TABLE `test`
var_dump(
    database::table('test')->truncate()
);
~~~