# List 循环

list 标签也是用于循环输出，解析后的本质为 foreach，同时 foreach 比较符合大家的习惯。

## code

``` html
{list $list $key $value}   
    {$key} - {$value}  
{/list}
```

模板编译后的结果：

``` php
<?php if (is_array($list)): foreach ($list as $key => $value): ?>
    <?php echo $key; ?> - <?php echo $value; ?>
<?php endforeach; endif; ?>
```

## code 省略键值

有时候我们不需要键值，这个时候我们在模板中写下如下的代码：
``` html
{list $list $value}   
    {$value}
{/list}
```

模板编译后的结果：

``` php
<?php if (is_array($list)): foreach ($list as $value): ?>
    <?php echo $value; ?>
<?php endforeach; endif; ?>
```

## node

``` html
<list for=list value=my_value key=my_key index=my_index>   
    {$my_index} {$my_key} {$my_value}
</list>
```

模板编译后的结果：

``` php
<?php $my_index = 1; ?>
<?php if (is_array($list)): foreach ($list as $my_key => $my_value): ?>
    <?php echo $my_index; ?> <?php echo $my_key; ?> <?php echo $my_value; ?>
<?php $my_index++; ?>
<?php endforeach; endif; ?>
```

## node 省略键值

有时候我们不需要键值，这个时候我们在模板中写下如下的代码：

``` html
<list for=list>   
    {$index} {$key} {$value}
</list>
```

模板编译后的结果：

``` php
<?php $index = 1; ?>
<?php if (is_array($list)): foreach ($list as $key => $value): ?>
    <?php echo $index; ?> <?php echo $key; ?> <?php echo $value; ?>
<?php $index++; ?>
<?php endforeach; endif; ?>
```
