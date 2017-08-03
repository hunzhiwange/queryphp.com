---
title: 标签嵌套无限层级
type: v4
order: 100
---

模板引擎支持标签的多层嵌套功能，可以对标签库的标签指定可以嵌套。模板引擎的所有标签都可以相互嵌套，并且 **code** 标签和 **node** 标签之间没有一点障碍。

我们在模板中写下如下的代码：
~~~
<lists name="list" id="vo">     
	<list for="$vo['sub']">   
	    {if $key == '123'}
	        {$key}-{$value}<br><br>
	    {else}
	        <span>what?</span>
	    {/if}
	</list>      
</lists>
~~~

模板编译后的结果：
~~~
<?php if( is_array ( $list ) ) : $index = 0; $arrList = $list; if( count( $arrList ) == 0 ) : echo  ""; else : foreach ( $arrList as $key => $vo ) : ++$index; $mod = ( $index % 2) ?>     
	<?php $index = 1; ?><?php if( is_array( $$vo['sub'] ) ) : foreach( $$vo['sub'] as $key => $value) : ?>   
	    <?php if ( $key == '123' )  : ?>
	        <?php echo $key; ?>-<?php echo $value; ?><br><br>
	    <?php else: ?>
	        <span>what?</span>
	    <?php endif; ?>
	<?php $index++; ?><?php endforeach; endif; ?>      
<?php endforeach; endif; else: echo ""; endif; ?>
~~~

> 注意：自由地书写代码是我们共同的愿景。