# For 循环

如果我们需要在模板中使用 for 循环，那么通过 for 标签可以很方便地输出。

## code

我们在模板中写下如下的代码：

``` html
{for $i=1;$i<10;$i++}
    QueryPHP - 代码版本for <br>
{/for}
```

模板编译后的结果：

``` php
<?php for ($i=1;$i<10;$i++): ?>
    QueryPHP - 代码版本for <br>
<?php endfor; ?>
```

## node 简单版

我们在模板中写下如下的代码：

``` html
<for start='1'>
    QueryPHP - node - for <br>   
</for>
```

模板编译后的结果：

``` php
<?php for ($var = 1; $var <= 0; $var += 1): ?>
    QueryPHP - node - for <br>
<?php endfor; ?>
```

## node 完整版

我们在模板中写下如下的代码：

``` html
<for start='1' end='10' var='myValue' step='3'>   
    QueryPHP for <br>   
</for>
```

模板编译后的结果：

``` php
<?php for ($myValue = 1; $myValue <= 10; $myValue += 3): ?>
    QueryPHP for <br>
<?php endfor; ?>
```

## JS 风格版

最终生成一个 foreach 结果，简单的循环。

### 例 1：

HTML

```
{% for item in navigation %}
    <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
{% /for %}
```

模板编译后的结果：

``` php
<?php foreach ($navigation as $key => $item): ?>
    <li><a href="<?php echo $item->href; ?>"><?php echo $item->caption; ?></a></li>
<?php endforeach; ?>
```

> 注意：“{%” 与内容之间可以有空格,也可以没有，结果一样。

### 例 2：

可以使用逗号分割建和值，逗号连接不能有空格。

HTML

```
{% for mykey,item in navigation %}
    <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
{% /for %}
```

模板编译后的结果：

``` php
<?php foreach ($navigation as $mykey => $item): ?>
    <li><a href="<?php echo $item->href; ?>"><?php echo $item->caption; ?></a></li>
<?php endforeach; ?>
```

### 例 3：

可以使用空格分割建和值。

HTML

```
{% for mykey item in navigation %}
    <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
{% /for %}
```

模板编译后的结果：

``` php
<?php foreach ($navigation as $mykey => $item): ?>
    <li><a href="<?php echo $item->href; ?>"><?php echo $item->caption; ?></a></li>
<?php endforeach; ?>
```
