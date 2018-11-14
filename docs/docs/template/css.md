# CSS 标签

QueryPHP 支持提供两个简单标签来简化 javascript 和 css 标签输入。

我们在模板中写下如下的代码：

``` html
{script}
var hello = 'world';
{/script}

{style}
.red {
    color: red;
}
{/stle}
```

模板编译后的结果：

``` php
<script type="text/javascript">
var hello = 'world';
</script>

<style type="text/css">
.red {
    color: red;
}
{/stle}
```
