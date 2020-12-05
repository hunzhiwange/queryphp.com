# Foreach 循环

::: tip Testing Is Documentation
[tests/View/Compiler/CompilerForeachTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerForeachTest.php)
:::
    
foreach 标签也是用于循环输出，解析后的本质为 foreach。

## node

``` php
public function testNode(): void
{
    $parser = $this->createParser();
    $source = <<<'eot'
        {% foreach for=list value=my_value key=my_key index=my_index %}
            {{ $my_index }} {{ $my_key }} {{ $my_value }}
        {% :foreach %}
        eot;

    $compiled = <<<'eot'
        <?php $my_index = 1; ?>
        <?php if (is_array($list)): foreach ($list as $my_key => $my_value): ?>
            <?php echo $my_index; ?> <?php echo $my_key; ?> <?php echo $my_value; ?>
        <?php $my_index++; ?>
        <?php endforeach; endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## node 省略键值

有时候我们不需要键值，这个时候我们在模板中写下如下的代码：

``` php
public function testNodeSimple(): void
{
    $parser = $this->createParser();
    $source = <<<'eot'
        {% foreach for=list %}
            {{ $index }} {{ $key }} {{ $value }}
        {% :foreach %}
        eot;

    $compiled = <<<'eot'
        <?php $index = 1; ?>
        <?php if (is_array($list)): foreach ($list as $key => $value): ?>
            <?php echo $index; ?> <?php echo $key; ?> <?php echo $value; ?>
        <?php $index++; ?>
        <?php endforeach; endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```