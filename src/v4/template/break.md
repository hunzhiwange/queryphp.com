---
title: break
type: v4
order: 50000010
---

break 和 continue 是各种循环中非常重要的两个流程标记语言，框架当然也会支持它们。

## break 标签

我们在模板中写下如下的代码：

``` html
<list for=arrList>   
   <if condition="$value eq 'H'">   
       <break/>   
   </if>   
   {$value}   
</list>
```

模板编译后的结果：

``` php
<?php $index = 1; ?><?php if( is_array( $arrList ) ) : foreach( $arrList as $key => $value) : ?>   
   <?php if( $value=='H' ) : ?>   
       <?php break; ?>   
   <?php endif; ?>   
   <?php echo $value; ?>   
<?php $index++; ?><?php endforeach; endif; ?>
```

## continue 标签

我们在模板中写下如下的代码：

``` html
<list for=arrList>   
   <if condition="$value eq 'H'">   
       <continue/>   
   </if>   
   {$value}   
</list>
```

模板编译后的结果：

``` php
<?php $index = 1; ?><?php if( is_array( $arrList ) ) : foreach( $arrList as $key => $value) : ?>   
   <?php if( $value=='H' ) : ?>   
       <?php continue; ?>   
   <?php endif; ?>   
   <?php echo $value; ?>   
<?php $index++; ?><?php endforeach; endif; ?>
```