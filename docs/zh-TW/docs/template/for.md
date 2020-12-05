# For 循环

::: tip Testing Is Documentation
[tests/View/Compiler/CompilerForTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerForTest.php)
:::
    
如果我们需要在模板中使用 for 循环，那么通过 for 标签可以很方便地输出。

## node 简单版

``` php
public function testForNode(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {% for start='1' %}
            QueryPHP - node - for <br>
        {% :for %}
        eot;

    $compiled = <<<'eot'
        <?php for ($var = 1; $var <= 0; $var += 1): ?>
            QueryPHP - node - for <br>
        <?php endfor; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## node 完整版

``` php
public function testForNode2(): void
{
    $parser = $this->createParser();
    $source = <<<'eot'
        {%for start='1' end='10' var='myValue' step='3' %}
            QueryPHP for <br>
        {% :for %}
        eot;

    $compiled = <<<'eot'
        <?php for ($myValue = 1; $myValue <= 10; $myValue += 3): ?>
            QueryPHP for <br>
        <?php endfor; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```