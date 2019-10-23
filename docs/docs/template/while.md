# While 循环

::: tip 单元测试即文档
[基于原始文档 tests/View/Compiler/CompilerWhileTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerWhileTest.php)
:::
    
QueryPHP 支持 while 语法标签，通过这种方式可以很好地将 PHP 的 while 语法布局出来。

## code

``` php
public function testCode(): void
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

``` php
public function testNode(): void
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