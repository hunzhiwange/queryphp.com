---
title: 数据库事务
type: v4
order: 124
---

# transaction 执行事务
QueryPHP 允许在 transaction 执行一段连贯操作，本函数提供了一个回调方法，回调方法中抛出异常事务会自动回滚。
~~~
database::transaction ( function () {
    database::update ( 'update q_test set name=? where id =?', [ 
   		 '小鸭子',
   		 5 
    ] );
    database::delete ( 'delete from q_test where id =?', [ 
    	5 
    ] );
} );
~~~

# 手动操作事务
QueryPHP 允许手动开始一个事务的回滚和提交操作。
~~~
# 开始事务
database::beginTransaction( );

# 提交事务
database::commit( );

# 事务回滚
database::rollBack( );

# 检测是否处于事务中
database::inTransaction( );
~~~