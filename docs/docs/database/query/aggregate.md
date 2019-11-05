# Query lang.aggregate

::: tip Testing Is Documentation
[tests/Database/Query/AggregateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/AggregateTest.php)
:::
    
数据库聚合查询功能。

**Uses**

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
            "SELECT COUNT(*) AS row_count FROM `test_query` LIMIT 1",
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
                ->table('test_query')
                ->count()
                ->findOne(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT COUNT(`test_query`.`id`) AS row_count FROM `test_query` LIMIT 1",
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
                ->table('test_query')
                ->count('id')
                ->findOne(true),
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT COUNT(`test_query`.`id`) AS count1 FROM `test_query` LIMIT 1",
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
                ->table('test_query')
                ->count('id', 'count1')
                ->findOne(true),
            2
        )
    );

    $sql = <<<'eot'
        [
            "SELECT COUNT(`test_query`.`id`*50) AS count1 FROM `test_query` LIMIT 1",
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
                ->table('test_query')
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
            "SELECT AVG(`test_query`.`id`) AS avg_value FROM `test_query` LIMIT 1",
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
                ->table('test_query')
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
            "SELECT MAX(`test_query`.`num`) AS max_value FROM `test_query` LIMIT 1",
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
                ->table('test_query')
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
            "SELECT MIN(`test_query`.`num`) AS min_value FROM `test_query` LIMIT 1",
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
                ->table('test_query')
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
            "SELECT SUM(`test_query`.`num`) AS sum_value FROM `test_query` LIMIT 1",
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
                ->table('test_query')
                ->sum('num')
                ->findOne(true)
        )
    );
}
```