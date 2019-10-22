# List 循环

::: tip 单元测试即文档
[基于原始文档 tests/View/Compiler/CompilerListTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerListTest.php)
:::
    
list 标签也是用于循环输出，解析后的本质为 foreach，同时 foreach 比较符合大家的习惯。


## code


``` php
public function testCode(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {list $list $key $value}
            {$key} - {$value}
        {/list}
        eot;

    $compiled = <<<'eot'
        <?php if (is_array($list)): foreach($list as $key => $value): ?>
            <?php echo $key; ?> - <?php echo $value; ?>
        <?php endforeach; endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## code 省略键值

有时候我们不需要键值，这个时候我们在模板中写下如下的代码：

``` php
public function testCodeFull(): void
{
    $parser = $this->createParser();
    $source = <<<'eot'
        {list $list $value}
            {$value}
        {/list}
        eot;

    $compiled = <<<'eot'
        <?php if (is_array($list)): foreach($list as $value): ?>
            <?php echo $value; ?>
        <?php endforeach; endif; ?>
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
        <list for=list value=my_value key=my_key index=my_index>
            {$my_index} {$my_key} {$my_value}
        </list>
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
public function testNodeFull(): void
{
    $parser = $this->createParser();
    $source = <<<'eot'
        <list for=list>
            {$index} {$key} {$value}
        </list>
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