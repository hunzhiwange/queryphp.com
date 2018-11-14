# 查询语言.table

## 函数原型

``` php
public function table($mixTable, $mixCols = '*');
```

## 指定数据表

``` php
# SELECT `posts`.* FROM `posts`
Db::table('posts')->

getAll();

# SELECT `posts`.* FROM `mydb`.`posts`
Db::table('mydb.posts')->

getAll();

# SELECT `p`.* FROM `mydb`.`posts` `p`
Db::table(['p' => 'mydb.posts'])->

getAll();
```

## 指定字段

``` php
# SELECT `posts`.`title`,`posts`.`body` FROM `posts` 
Db::table('posts','title,body')->getAll();

# SELECT `posts`.`title` AS `t`,`posts`.`name`,`posts`.`remark`,`posts`.`value`  FROM `mydb`.`posts`
Db::table(
    'mydb.posts',
    ['t'=> 'title','name','remark,value']
)->

getAll();
```
