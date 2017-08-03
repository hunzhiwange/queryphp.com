---
title: 数据库构造器.table
type: v4
order: 129
---

## 函数原型
``` php
public function table($mixTable, $mixCols = '*');
```

## 指定数据表
``` sql
# SELECT `posts`.* FROM `posts`
database::table('posts')->getAll();

# SELECT `posts`.* FROM `mydb`.`posts`
database::table('mydb.posts')->getAll();

# SELECT `p`.* FROM `mydb`.`posts`  `p`
database::table(['p' => 'mydb.posts'])->getAll();
```

## 指定字段
``` sql
# SELECT `posts`.`title`,`posts`.`body` FROM `posts` 
database::table('posts','title,body')->getAll();

# SELECT `posts`.`title` AS `t`,`posts`.`name`,`posts`.`remark`,`posts`.`value`  FROM `mydb`.`posts`
database::table('mydb.posts',['t'=> 'title','name','remark,value'])->getAll();
```