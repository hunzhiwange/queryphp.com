# While 循环

QueryPHP 支持 while 语法标签，通过这种方式可以很好地将 PHP 的 while 语法布局出来。



## code

我们在模板中写下如下的代码和模板编译后的结果。

``` php
public function testCode()
{
    $parser = $this->createParser();

    $source = <<<'eot'
{~$i = 10}
{while $i>0}
    {$i}Hello QueryPHP !<br>
    {~$i--}
{/while}
eot;

    $compiled = <<<'eot'
<?php $i = 10; ?>
<?php while ($i>0): ?>
    <?php echo $i; ?>Hello QueryPHP !<br>
    <?php $i--; ?>
<?php endwhile; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```


## node

我们在模板中写下如下的代码和模板编译后的结果。

``` php
public function testNode()
{
    $parser = $this->createParser();

    $source = <<<'eot'
{~$i = 10}
<while condition="$i gt 0">
    {$i}Hello QueryPHP !<br>
    {~$i--}
</while>
eot;

    $compiled = <<<'eot'
<?php $i = 10; ?>
<?php while($i > 0): ?>
    <?php echo $i; ?>Hello QueryPHP !<br>
    <?php $i--; ?>
<?php endwhile; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
