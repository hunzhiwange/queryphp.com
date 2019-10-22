# 查询语言.aggregate

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/AggregateTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/AggregateTest.php)
:::
    
数据库聚合查询功能。

**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## 记录数量 count

计算记录数量。

`函数原型`


``` php
public function findCount(string $field = '*', string $alias = 'row_count', bool $flag = false);
```


::: tip
可使用 `findCount()` 或者 `count()->find()` 来统计记录行。
:::


``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT COUNT(*) AS row_count FROM `test` LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->count()
                ->findOne(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT COUNT(`test`.`id`) AS row_count FROM `test` LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->count('id')
                ->findOne(true),
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT COUNT(`test`.`id`) AS count1 FROM `test` LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->count('id', 'count1')
                ->findOne(true),
            2
        )
    );

    $sql = <<<'eot'
        [
            "SELECT COUNT(`test`.`id`*50) AS count1 FROM `test` LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->count('{[id]*50}', 'count1')
                ->findOne(true),
            3
        )
    );
}
```
    

## 平均值 avg

计算平均值。

``` php
public function testAvg(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT AVG(`test`.`id`) AS avg_value FROM `test` LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->avg('id')
                ->findOne(true)
        )
    );
}
```
    

## 最大值 max

计算最大值。

``` php
public function testMax(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT MAX(`test`.`num`) AS max_value FROM `test` LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->max('num')
                ->findOne(true)
        )
    );
}
```
    

## 最小值 min

计算最小值。

``` php
public function testMin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT MIN(`test`.`num`) AS min_value FROM `test` LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->min('num')
                ->findOne(true)
        )
    );
}
```
    

## 合计 sum

计算合计。

``` php
public function testSum(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT SUM(`test`.`num`) AS sum_value FROM `test` LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->sum('num')
                ->findOne(true)
        )
    );
}
```