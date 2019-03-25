# PHP 标签

PHP 代码可以和标签在模板文件中混合使用，可以在模板文件里面书写任意的 PHP 语句代码 ，包括下面两种方式。

## 基本使用


``` php
public function testBaseUse()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<php>echo 'Hello,world!';</php>
eot;

    $compiled = <<<'eot'
<?php echo 'Hello,world!'; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## 原始 PHP


``` php
public function testPhpSelf()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<?php echo 'Hello,world!'; ?>
eot;

    $compiled = <<<'eot'
<?php echo 'Hello,world!'; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
::: tip
不过这种方式来使用 PHP 脚本，这是我们大力推荐的写法，用最原始的 PHP 开发项目是我们共同的追求。
:::
    
## PHP 内部不能使用标签

PHP 标签或者 PHP 代码里面就不能再使用标签（包括 code 标签和 node 标签），因此下面的几种方式都是无效的：

``` php
public function testErrorExample()
{
    $parser = $this->createParser();

    // 错误的写法
    $source = <<<'eot'
<php>
    {if $hello == ''}
    Yet !
    {/if}
</php>
eot;

    $compiled = <<<'eot'
<?php 
    <?php if ($hello == ''): ?>
    Yet !
    <?php endif; ?>
 ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
::: tip
程序运行结果是抛出致命错误，这种写法是错误的。
:::