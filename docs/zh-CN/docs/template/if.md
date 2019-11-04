# 流程控制

::: tip Testing Is Documentation
[tests/View/Compiler/CompilerIfTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerIfTest.php)
:::
    
条件表达式是最基本流程控制语句，这个在任何地方都是相当的实用。

## Code 语法流程控制

``` php
public function testBaseUse(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {if $id==1}
            我的值为1，我为if下的内容。
        {elseif $id==2}
            我的值为2，我为elseif下的内容。
        {else}
            我的值为{$id}，我不是谁的谁！
        {/if}
        eot;

    $compiled = <<<'eot'
        <?php if ($id==1): ?>
            我的值为1，我为if下的内容。
        <?php elseif ($id==2): ?>
            我的值为2，我为elseif下的内容。
        <?php else: ?>
            我的值为<?php echo $id; ?>，我不是谁的谁！
        <?php endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## Code 语法流程控制支持表达式

``` php
public function testCodeStyleSupportExpression(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {if $a->name == 1}
            a
        {/if}
        
        {if hello::run() == 1}
            b
        {/if}
        eot;

    $compiled = <<<'eot'
        <?php if ($a->name == 1): ?>
            a
        <?php endif; ?>
        
        <?php if (hello::run() == 1): ?>
            b
        <?php endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## Node 语法流程控制

条件支持的一些运算符替换语法如下：

|支持字符|替换字符|
|:-|:-|
|band|&|
|bxor|^|
|bor|&#x7C;|
|bnot|~|
|bleft|<<|
|bright|>>|
|and|&&|
|or|&#x7C;&#x7C;|
|not|!=|
|dot|->|
|nheq|!==|
|heq|===|
|neq|!=|
|eq|==|
|egt|>=|
|gt|>|
|elt|<=|
|lt|<|


``` php
public function testNodeStyle(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        <if condition="($id eq 1) OR ($id gt 100)">one
            <elseif condition="$id eq 2" />two?
            <else />other?
        </if>
        eot;

    $compiled = <<<'eot'
        <?php if (($id == 1) OR ($id > 100)): ?>one
            <?php elseif ($id == 2): ?>two?
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
        <if condition="$a.name == 1">
            one
        </if>
        
        <if condition="hello::run() == 1">
            two
        </if>
        eot;

    $compiled = <<<'eot'
        <?php if ($a->name == 1): ?>
            one
        <?php endif; ?>
        
        <?php if (hello::run() == 1): ?>
            two
        <?php endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## JS 语法流程控制

``` php
public function testJsStyle(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {% if length(users) > 0 %}
        a
        {% elseif foo.bar > 0 %}
        b
        {% else %}
        c
        {% /if %}
        eot;

    $compiled = <<<'eot'
        <?php if (length($users) > 0): ?>
        a
        <?php elseif ($foo->bar > 0): ?>
        b
        <?php else: ?>
        c
        <?php endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```