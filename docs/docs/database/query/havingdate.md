# Query lang.havingDate

::: tip Testing Is Documentation
[tests/Database/Query/HavingTimeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/HavingTimeTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## havingDate 时间查询

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $value = strtotime('+5 month');
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTimeRange(
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('create_date')
                ->havingDate('create_date', '+5 month')
                ->findOne(true)
        ),
        sprintf($sql, $value),
        sprintf($sql, $value2),
        sprintf($sql, $value3)
    );
}
```
    
## havingDay 时间查询

``` php
public function testHavingDay(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $date = getdate();
    $value = mktime(0, 0, 0, $date['mon'], 5, $date['year']);
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTimeRange(
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('create_date')
                ->havingDay('create_date', 5)
                ->findOne(true)
        ),
        sprintf($sql, $value),
        sprintf($sql, $value2),
        sprintf($sql, $value3)
    );
}
```
    
## havingMonth 时间查询

``` php
public function testHavingMonth(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $date = getdate();
    $value = mktime(0, 0, 0, 5, 1, $date['year']);
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTimeRange(
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('create_date')
                ->havingMonth('create_date', 5)
                ->findOne(true)
        ),
        sprintf($sql, $value),
        sprintf($sql, $value2),
        sprintf($sql, $value3)
    );
}
```
    
## havingYear 时间查询

``` php
public function testHavingYear(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $value = mktime(0, 0, 0, 1, 1, 2018);
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTimeRange(
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('create_date')
                ->havingYear('create_date', 2018)
                ->findOne(true)
        ),
        sprintf($sql, $value),
        sprintf($sql, $value2),
        sprintf($sql, $value3)
    );
}
```
    
## time().having.endTime 时间查询，等价于 havingDate

``` php
public function testTime(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $value = strtotime('+5 month');
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTrue(
        in_array(
            $this->varJson(
                $connect
                    ->table('test_query')
                    ->groupBy('create_date')
                    ->time()
                    ->having('create_date', '+5 month')
                    ->endTime()
                    ->findOne(true)
            ),
            [
                sprintf($sql, $value),
                sprintf($sql, $value2),
                sprintf($sql, $value3),
            ],
            true
        )
    );
}
```
    
## time(date).having.endTime 时间查询，等价于 havingDate

``` php
public function testTimeDateIsDefault(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $value = strtotime('+5 month');
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTrue(
        in_array(
            $this->varJson(
                $connect
                    ->table('test_query')
                    ->groupBy('create_date')
                    ->time('date')
                    ->having('create_date', '+5 month')
                    ->endTime()
                    ->findOne(true)
            ),
            [
                sprintf($sql, $value),
                sprintf($sql, $value2),
                sprintf($sql, $value3),
            ],
            true
        )
    );
}
```
    
## time(day).having.endTime 时间查询，等价于 havingDay

``` php
public function testTimeDay(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $date = getdate();
    $value = mktime(0, 0, 0, $date['mon'], 5, $date['year']);
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTimeRange(
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('create_date')
                ->time('day')
                ->having('create_date', 5)
                ->endTime()
                ->findOne(true)
        ),
        sprintf($sql, $value),
        sprintf($sql, $value2),
        sprintf($sql, $value3)
    );
}
```
    
## time(month).having.endTime 时间查询，等价于 havingMonth

``` php
public function testTimeMonth(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $date = getdate();
    $value = mktime(0, 0, 0, 5, 1, $date['year']);
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTimeRange(
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('create_date')
                ->time('month')
                ->having('create_date', 5)
                ->endTime()
                ->findOne(true)
        ),
        sprintf($sql, $value),
        sprintf($sql, $value2),
        sprintf($sql, $value3)
    );
}
```
    
## time(year).having.endTime 时间查询，等价于 havingYear

``` php
public function testTimeYear(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`create_date` HAVING `test_query`.`create_date` = :test_query_create_date LIMIT 1",
            {
                "test_query_create_date": [
                    %d
                ]
            },
            false
        ]
        eot;

    $value = mktime(0, 0, 0, 1, 1, 2018);
    $value2 = $value + 1;
    $value3 = $value + 2;

    $this->assertTimeRange(
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('create_date')
                ->time('year')
                ->having('create_date', 2018)
                ->endTime()
                ->findOne(true)
        ),
        sprintf($sql, $value),
        sprintf($sql, $value2),
        sprintf($sql, $value3)
    );
}
```