# 流程控制

::: tip Testing Is Documentation
[tests/View/Compiler/CompilerIfTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerIfTest.php)
:::
    
条件表达式是最基本流程控制语句，这个在任何地方都是相当的实用。

## Node 语法流程控制

``` php
public function testNodeStyle(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {% if cond="(1 == $id) OR ($id > 100)" %}one
            {% elseif cond="2 == $id" %}two?
            {% else %}other?
        {% :if %}
        eot;

    $compiled = <<<'eot'
        <?php if ((1 == $id) OR ($id > 100)): ?>one
            <?php elseif (2 == $id): ?>two?
            <?php else: ?>other?
        <?php endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## cond 可省略

默认第一个条件会自动解析为 cond。

``` php
public function testNodeSimple(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {% if "(1 == $id) OR ($id > 100)" %}one
            {% elseif "2 == $id" %}two?
            {% else %}other?
        {% :if %}
        eot;

    $compiled = <<<'eot'
        <?php if ((1 == $id) OR ($id > 100)): ?>one
            <?php elseif (2 == $id): ?>two?
            <?php else: ?>other?
        <?php endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## Node 语法流程控制支持表达式

``` php
public function testNodeStyleSupportExpression(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {% if cond="1 == $a->name" %}
            one
        {% :if %}
        
        {% if cond="1 == hello::run()" %}
            two
        {% :if %}
        eot;

    $compiled = <<<'eot'
        <?php if (1 == $a->name): ?>
            one
        <?php endif; ?>
        
        <?php if (1 == hello::run()): ?>
            two
        <?php endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```