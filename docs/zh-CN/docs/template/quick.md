# 快捷标签

::: tip Testing Is Documentation
[tests/View/Compiler/CompilerQuickTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerQuickTest.php)
:::
    
为了使得模板定义更加简洁，系统还支持一些常用的变量输出快捷标签。

## # 注释标签

模板中的注释仅供模板制作人员查看，最终不会显示出来。

``` php
public function testBaseUse(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {# 我是一个注释 #}
        
        {#
            我是两行注释
          Thank U!
        #}
        eot;

    $compiled = <<<'eot'
         
        
         
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## ~ 原样 PHP 标签

``` php
public function testOriginalPhp(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {~$value = 'Make QueryPHP greater !'}
        {$value}
        eot;

    $compiled = <<<'eot'
        <?php $value = 'Make QueryPHP greater !'; ?>
        <?php echo $value; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    
## : echo 快捷方式

``` php
public function testEcho(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {:'Hello QueryPHP!'}
        eot;

    $compiled = <<<'eot'
        <?php echo 'Hello QueryPHP!'; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```