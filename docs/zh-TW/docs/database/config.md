# 数据库配置

::: tip Testing Is Documentation
[tests/Database/ManagerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/ManagerTest.php)
:::
    
我们可以在 `option/database.php` 文件中定义数据库连接。

**Uses**

``` php
<?php

use PDO;
use Tests\Database\DatabaseTestCase as TestCase;
```

## 基本配置

数据库配置基本定义功能展示。

`数据库配置`

``` php
protected function createDatabaseManager(): Manager
{
    $container = new Container();
    $manager = new Manager($container);

    $this->assertInstanceof(IContainer::class, $manager->container());
    $this->assertInstanceof(Container::class, $manager->container());

    $option = new Option([
        'database' => [
            'default' => 'mysql',
            'connect' => [
                'mysql' => [
                    'driver'   => 'mysql',
                    'host'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['HOST'],
                    'port'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PORT'],
                    'name'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['NAME'],
                    'user'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['USER'],
                    'password' => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PASSWORD'],
                    'charset'  => 'utf8',
                    'options'  => [
                        PDO::ATTR_PERSISTENT        => false,
                        PDO::ATTR_CASE              => PDO::CASE_NATURAL,
                        PDO::ATTR_ERRMODE           => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
                        PDO::ATTR_STRINGIFY_FETCHES => false,
                        PDO::ATTR_EMULATE_PREPARES  => false,
                    ],
                    'separate'           => false,
                    'distributed'        => false,
                    'master'             => [],
                    'slave'              => [],
                ],
                'password_right' => [
                    'driver'   => 'mysql',
                    'password' => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PASSWORD'],
                ],
                'password_not_right' => [
                    'driver'   => 'mysql',
                    'password' => 'not right',
                ],
            ],
        ],
    ]);

    $container->singleton('option', $option);
    $eventDispatch = $this->createMock(IDispatch::class);
    $this->assertNull($eventDispatch->handle('event'));
    $container->singleton(IDispatch::class, $eventDispatch);

    $this->databaseConnects[] = $manager->connect();

    return $manager;
}
```

请使用这样的格式来定义连接，系统会自动帮你访问数据库。
系统底层实质上会使用 `\Leevel\Option\Option` 来管理配置信息。


``` php
public function testBaseUse(): void
{
    $manager = $this->createDatabaseManager();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    $this->assertSame(1,
        $manager
            ->table('guest_book')
            ->insert($data)
    );

    $result = $manager->table('guest_book', 'name,content')
        ->where('id', 1)
        ->findOne();

    $this->assertSame('tom', $result->name);
    $this->assertSame('I love movie.', $result->content);
}
```
    
## 数据库主从设置

QueryPHP 允许用户一个主数据库作为写入、更新以及删除,外加多个附属从数据库作为只读数据库来共同提供数据库服务。
多个数据库需要需要开启 `distributed`，而 `separate` 主要用于读写分离。
`master` 为主数据库，`slave` 为附属从数据库设置。


``` php
public function testParseDatabaseOptionDistributedIsTrue(): void
{
    $manager = $this->createDatabaseManager();

    $option = [
        'driver'   => 'mysql',
        'host'     => '127.0.0.1',
        'port'     => 3306,
        'name'     => 'test',
        'user'     => 'root',
        'password' => '123456',
        'charset'  => 'utf8',
        'options'  => [
            PDO::ATTR_PERSISTENT        => false,
            PDO::ATTR_CASE              => PDO::CASE_NATURAL,
            PDO::ATTR_ERRMODE           => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
            PDO::ATTR_STRINGIFY_FETCHES => false,
            PDO::ATTR_EMULATE_PREPARES  => false,
        ],
        'separate'           => false,
        'distributed'        => true,
        'master'             => [],
        'slave'              => ['host' => '127.0.0.1'],
    ];

    $optionNew = $this->invokeTestMethod($manager, 'normalizeDatabaseOption', [$option]);

    $data = <<<'eot'
        {
            "driver": "mysql",
            "separate": false,
            "distributed": true,
            "master": {
                "host": "127.0.0.1",
                "port": 3306,
                "name": "test",
                "user": "root",
                "password": "123456",
                "charset": "utf8",
                "options": {
                    "12": false,
                    "8": 0,
                    "3": 2,
                    "11": 0,
                    "17": false,
                    "20": false
                }
            },
            "slave": [
                {
                    "host": "127.0.0.1",
                    "port": 3306,
                    "name": "test",
                    "user": "root",
                    "password": "123456",
                    "charset": "utf8",
                    "options": {
                        "12": false,
                        "8": 0,
                        "3": 2,
                        "11": 0,
                        "17": false,
                        "20": false
                    }
                }
            ]
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson($optionNew)
    );
}
```
    
## 附属从数据库支持二维数组

从数据库支持多个，支持二维数组

``` php
public function testParseDatabaseOptionDistributedIsTrueWithTwoDimensionalArray(): void
{
    $manager = $this->createDatabaseManager();

    $option = [
        'driver'   => 'mysql',
        'host'     => '127.0.0.1',
        'port'     => 3306,
        'name'     => 'test',
        'user'     => 'root',
        'password' => '123456',
        'charset'  => 'utf8',
        'options'  => [
            PDO::ATTR_PERSISTENT        => false,
            PDO::ATTR_CASE              => PDO::CASE_NATURAL,
            PDO::ATTR_ERRMODE           => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
            PDO::ATTR_STRINGIFY_FETCHES => false,
            PDO::ATTR_EMULATE_PREPARES  => false,
        ],
        'separate'           => false,
        'distributed'        => true,
        'master'             => [],
        'slave'              => [
            ['host' => '127.0.0.1'],
            ['password' => '123456'],
        ],
    ];

    $optionNew = $this->invokeTestMethod($manager, 'normalizeDatabaseOption', [$option]);

    $data = <<<'eot'
        {
            "driver": "mysql",
            "separate": false,
            "distributed": true,
            "master": {
                "host": "127.0.0.1",
                "port": 3306,
                "name": "test",
                "user": "root",
                "password": "123456",
                "charset": "utf8",
                "options": {
                    "12": false,
                    "8": 0,
                    "3": 2,
                    "11": 0,
                    "17": false,
                    "20": false
                }
            },
            "slave": [
                {
                    "host": "127.0.0.1",
                    "port": 3306,
                    "name": "test",
                    "user": "root",
                    "password": "123456",
                    "charset": "utf8",
                    "options": {
                        "12": false,
                        "8": 0,
                        "3": 2,
                        "11": 0,
                        "17": false,
                        "20": false
                    }
                },
                {
                    "password": "123456",
                    "host": "127.0.0.1",
                    "port": 3306,
                    "name": "test",
                    "user": "root",
                    "charset": "utf8",
                    "options": {
                        "12": false,
                        "8": 0,
                        "3": 2,
                        "11": 0,
                        "17": false,
                        "20": false
                    }
                }
            ]
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson($optionNew)
    );
}
```
    
## 数据库设置只支持数组

数据库主从连接只支持数组。

``` php
public function testParseDatabaseOptionMasterAndSlaveMustBeAnArray(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Database option `slave` must be an array.'
    );

    $manager = $this->createDatabaseManager();

    $option = [
        'driver'   => 'mysql',
        'host'     => '127.0.0.1',
        'port'     => 3306,
        'name'     => 'test',
        'user'     => 'root',
        'password' => '123456',
        'charset'  => 'utf8',
        'options'  => [
            PDO::ATTR_PERSISTENT        => false,
            PDO::ATTR_CASE              => PDO::CASE_NATURAL,
            PDO::ATTR_ERRMODE           => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
            PDO::ATTR_STRINGIFY_FETCHES => false,
            PDO::ATTR_EMULATE_PREPARES  => false,
        ],
        'separate'           => false,
        'distributed'        => true,
        'master'             => [],
        'slave'              => 'notarray',
    ];

    $this->invokeTestMethod($manager, 'normalizeDatabaseOption', [$option]);
}
```