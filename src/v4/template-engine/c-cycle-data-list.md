---
title: C循环数据.list
type: v4
order: 90
---

list 标签也是用于循环输出，解析后的本质为 foreach，同时 foreach 比较符合大家的习惯。

# 1：完整无法如下
~~~
{list $arrList $key $value}   
    {$key} - {$value}  
{/list}
~~~

模板编译后的结果：
~~~
<?php if (is_array ( $arrList )) : foreach( $arrList as $key => $value ): ?>   
    <?php echo $key; ?> - <?php echo $value; ?>  
<?php endforeach; endif; ?>
~~~

# 2：省略键值
有时候我们不需要键值，这个时候我们在模板中写下如下的代码：
~~~
{list $arrList $value}   
    {$value}
{/list}
~~~

模板编译后的结果：
~~~
<?php if (is_array ( $arrList ) ) : foreach( $arrList as $value ): ?>   
    <?php echo $value; ?>
<?php endforeach; endif; ?>
~~~