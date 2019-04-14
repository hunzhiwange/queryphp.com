# For 循环

如果我们需要在模板中使用 for 循环，那么通过 for 标签可以很方便地输出。

## code


``` php
public function testBaseUse()
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {for $i=1;$i<10;$i++}
            QueryPHP - 代码版本for <br>
        {/for}
        eot;

    $compiled = <<<'eot'
        <?php for ($i=1;$i<10;$i++): ?>
            QueryPHP - 代码版本for <br>
        <?php endfor; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## node 简单版


``` php
public function testForNode()
{
    $parser = $this->createParser();

    $source = <<<'eot'
        <for start='1'>
            QueryPHP - node - for <br>
        </for>
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
public function testForNode2()
{
    $parser = $this->createParser();
    $source = <<<'eot'
        <for start='1' end='10' var='myValue' step='3'>
            QueryPHP for <br>
        </for>
        eot;

    $compiled = <<<'eot'
        <?php for ($myValue = 1; $myValue <= 10; $myValue += 3): ?>
            QueryPHP for <br>
        <?php endfor; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## JS 风格版: 例 1

最终生成一个 foreach 结果，简单的循环。

``` php
public function testForJsStyle()
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {% for item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% /for %}
        eot;

    $compiled = <<<'eot'
        <?php foreach ($navigation as $key => $item): ?>
            <li><a href="<?php echo $item->href; ?>"><?php echo $item->caption; ?></a></li>
        <?php endforeach; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## JS 风格版: 例 2

可以使用逗号分割建和值，逗号连接不能有空格。

``` php
public function testForJsStyle2()
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {% for mykey,item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% /for %}
        eot;

    $compiled = <<<'eot'
        <?php foreach ($navigation as $mykey => $item): ?>
            <li><a href="<?php echo $item->href; ?>"><?php echo $item->caption; ?></a></li>
        <?php endforeach; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## JS 风格版: 例 3

可以使用空格分割建和值。

``` php
public function testForJsStyle3()
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {% for mykey item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% /for %}
        eot;

    $compiled = <<<'eot'
        <?php foreach ($navigation as $mykey => $item): ?>
            <li><a href="<?php echo $item->href; ?>"><?php echo $item->caption; ?></a></li>
        <?php endforeach; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```