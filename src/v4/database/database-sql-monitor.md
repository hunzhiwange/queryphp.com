---
title: 数据库.SQL.监视器
type: v4
order: 162
---

为了方便大家更好地调试 SQL,开发过程中可以注册一个 SQL 监视器。
~~~
// 注册 SQL 监视器
database::registerListen(function($objConnect){
    echo $objConnect->getLastSql();
});

// 查询 SQL
database::table('test')->where('id','[?]')->bind(['大爷'])->getAll();
~~~

