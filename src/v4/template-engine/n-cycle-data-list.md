---
title: N循环数据.list
type: v4
order: 92
---

list 标签也是用于循环输出，解析后的本质为 foreach，同时 foreach 比较符合大家的习惯。

# 1：完整无法如下
~~~
<list for=arrList value=my_value key=my_key index=my_index>   
    {$my_index} {$my_key} {$my_value}
</list>
~~~

模板编译后的结果：
~~~
<?php $my_index=1; ?><?php if( is_array( $arrList ) ) : foreach( $arrList as $my_key => $my_value) : ?>   
    <?php echo $my_index; ?> <?php echo $my_key; ?> <?php echo $my_value; ?>
<?php $my_index++; ?><?php endforeach; endif; ?>
~~~

# 2：省略键值
有时候我们不需要键值，这个时候我们在模板中写下如下的代码：
~~~
<list for=arrList>   
    {$index} {$key} {$value}
</list>
~~~

模板编译后的结果：
~~~
<?php $index = 1; ?><?php if( is_array( $arrList ) ) : foreach( $arrList as $key => $value) : ?>   
    <?php echo $index; ?> <?php echo $key; ?> <?php echo $value; ?>
<?php $index++; ?><?php endforeach; endif; ?>
~~~