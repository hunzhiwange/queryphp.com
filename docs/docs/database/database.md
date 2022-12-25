# 数据库连接

::: tip Testing Is Documentation
[tests/Database/DatabaseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/DatabaseTest.php)
:::
    
**Uses**

``` php
<?php

use Exception;
use Generator;
use Leevel\Database\Database;
use Leevel\Database\IDatabase;
use Leevel\Database\Mysql;
use Leevel\Database\Select;
use Leevel\Filesystem\Helper;
use PDO;
use PDOException;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\MysqlNeedReconnectMock;
use Throwable;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnect();

    $database = $connect;

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    $this->assertSame(
        1,
        $database
            ->table('guest_book')
            ->insert($data),
    );

    $result = $database
        ->table('guest_book', 'name,content')
        ->where('id', 1)
        ->findOne();

    $this->assertSame('tom', $result->name);
    $this->assertSame('I love movie.', $result->content);
}
```
    
## query 查询数据记录

``` php
public function testQuery(): void
{
    $connect = $this->createDatabaseConnect();
    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert($data),
    );

    $insertData = $connect->query('select * from guest_book where id=?', [1]);
    $insertData = (array) $insertData[0];

    $this->assertSame(1, $insertData['id']);
    $this->assertSame('tom', $insertData['name']);
    $this->assertSame('I love movie.', $insertData['content']);
    $this->assertStringContainsString(date('Y-m'), $insertData['create_at']);
}
```
    
## query 查询数据记录支持缓存

`query` 是一个底层查询方法支持直接设置缓存，实际上其它的查询都会走这个 `query` 查询方法。

**query 原型**

``` php
# Leevel\Database\Database::query
/**
 * {@inheritDoc}
 */
public function query(string $sql, array $bindParams = [], bool|int $master = false, ?string $cacheName = null, ?int $cacheExpire = null, ?ICache $cache = null): mixed;
```


``` php
public function testQueryCache(): void
{
    $manager = $this->createDatabaseManager();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 5; $n++) {
        $manager
            ->table('guest_book')
            ->insert($data);
    }

    $cacheDir = dirname(__DIR__).'/databaseCacheManager';
    $cacheFile = $cacheDir.'/testcachekey.php';

    $result = $manager
        ->table('guest_book')
        ->query('SELECT * FROM guest_book');
    $this->assertFileDoesNotExist($cacheFile);
    $this->assertCount(6, $result);
    $this->assertSame(1, $result[0]->id);
    $this->assertSame('tom', $result[0]->name);
    $this->assertSame('I love movie.', $result[0]->content);

    $resultWithoutCache = $manager
        ->query('SELECT * FROM guest_book', [], false, 'testcachekey');
    // cached data
    $resultWithCache = $manager
        ->query('SELECT * FROM guest_book', [], false, 'testcachekey');

    $this->assertFileExists($cacheFile);
    $this->assertCount(6, $resultWithCache);
    $this->assertSame(1, $resultWithCache[0]->id);
    $this->assertSame('tom', $resultWithCache[0]->name);
    $this->assertSame('I love movie.', $resultWithCache[0]->content);
    $this->assertEquals($result, $resultWithCache);
    $this->assertFalse($result === $resultWithCache);
    $this->assertEquals($resultWithCache, $resultWithoutCache);
}
```
    
## execute 执行 SQL 语句

``` php
public function testExecute(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(1, $connect->execute('insert into guest_book (name, content) values (?, ?)', ['小鸭子', '喜欢游泳']));
    $insertData = $connect->query('select * from guest_book where id=?', [1]);
    $insertData = (array) $insertData[0];

    $this->assertSame(1, $insertData['id']);
    $this->assertSame('小鸭子', $insertData['name']);
    $this->assertSame('喜欢游泳', $insertData['content']);
    $this->assertStringContainsString(date('Y-m'), $insertData['create_at']);
}
```
    
## cursor 游标查询

`cursor` 游标查询可以节省内存。

**cursor 原型**

``` php
# Leevel\Database\Database::cursor
/**
 * {@inheritDoc}
 */
public function cursor(string $sql, array $bindParams = [], bool|int $master = false): Generator;
```


``` php
public function testCursor(): void
{
    $manager = $this->createDatabaseManager();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 5; $n++) {
        $manager
            ->table('guest_book')
            ->insert($data);
    }

    $result = $manager->cursor('SELECT * FROM guest_book');
    $this->assertInstanceof(Generator::class, $result);
    $n = 1;
    foreach ($result as $v) {
        $this->assertSame($n, $v->id);
        $this->assertSame('tom', $v->name);
        $this->assertSame('I love movie.', $v->content);
        $n++;
    }
}
```
    
## select 原生 SQL 查询数据

``` php
public function testSelect(): void
{
    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert($data),
    );

    $insertData = $connect->select('select * from guest_book where id = ?', [1]);
    $insertData = (array) $insertData[0];

    $this->assertSame(1, $insertData['id']);
    $this->assertSame('tom', $insertData['name']);
    $this->assertSame('I love movie.', $insertData['content']);
    $this->assertStringContainsString(date('Y-m'), $insertData['create_at']);
}
```
    
## select 原生 SQL 查询数据支持参数绑定

``` php
public function testSelectWithBind(): void
{
    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert($data),
    );

    $insertData = $connect->select('select * from guest_book where id = :id', ['id' => 1]);
    $insertData = (array) $insertData[0];

    $this->assertSame(1, $insertData['id']);
    $this->assertSame('tom', $insertData['name']);
    $this->assertSame('I love movie.', $insertData['content']);
    $this->assertStringContainsString(date('Y-m'), $insertData['create_at']);
}
```
    
## insert 插入数据 insert (支持原生 SQL)

``` php
public function testInsert(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(1, $connect->insert('insert into guest_book (name, content) values (?, ?)', ['tom', 'I love movie.']));

    $insertData = $connect->select('select * from guest_book where id = :id', ['id' => 1]);
    $insertData = (array) $insertData[0];

    $this->assertSame(1, $insertData['id']);
    $this->assertSame('tom', $insertData['name']);
    $this->assertSame('I love movie.', $insertData['content']);
    $this->assertStringContainsString(date('Y-m'), $insertData['create_at']);
}
```
    
## update 更新数据 update (支持原生 SQL)

``` php
public function testUpdate(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(1, $connect->insert('insert into guest_book (name, content) values (?, ?)', ['tom', 'I love movie.']));

    $insertData = $connect->select('select * from guest_book where id = :id', ['id' => 1]);
    $insertData = (array) $insertData[0];

    $this->assertSame(1, $insertData['id']);
    $this->assertSame('tom', $insertData['name']);
    $this->assertSame('I love movie.', $insertData['content']);
    $this->assertStringContainsString(date('Y-m'), $insertData['create_at']);

    $this->assertSame(1, $connect->update('update guest_book set name = "小牛" where id = ?', [1]));

    $insertData = $connect->select('select * from guest_book where id = :id', ['id' => 1]);
    $insertData = (array) $insertData[0];

    $this->assertSame(1, $insertData['id']);
    $this->assertSame('小牛', $insertData['name']);
    $this->assertSame('I love movie.', $insertData['content']);
    $this->assertStringContainsString(date('Y-m'), $insertData['create_at']);
}
```
    
## delete 删除数据 delete (支持原生 SQL)

``` php
public function testDelete(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(1, $connect->insert('insert into guest_book (name, content) values (?, ?)', ['tom', 'I love movie.']));

    $insertData = $connect->select('select * from guest_book where id = :id', ['id' => 1]);
    $insertData = (array) $insertData[0];

    $this->assertSame(1, $insertData['id']);
    $this->assertSame('tom', $insertData['name']);
    $this->assertSame('I love movie.', $insertData['content']);
    $this->assertStringContainsString(date('Y-m'), $insertData['create_at']);

    $this->assertSame(1, $connect->delete('delete from guest_book where id = ?', [1]));
    $this->assertSame(0, $connect->table('guest_book')->findCount());
}
```
    
## transaction 执行数据库事务

``` php
public function testTransaction(): void
{
    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 1; $n++) {
        $connect
            ->table('guest_book')
            ->insert($data);
    }

    $this->assertSame(2, $connect->table('guest_book')->findCount());

    $connect->transaction(function ($connect) {
        $connect
            ->table('guest_book')
            ->where('id', 1)
            ->delete();

        $this->assertSame(1, $connect->table('guest_book')->findCount());

        $connect
            ->table('guest_book')
            ->where('id', 2)
            ->delete();

        $this->assertSame(0, $connect->table('guest_book')->findCount());
    });

    $this->assertSame(0, $connect->table('guest_book')->findCount());
}
```
    
## transaction 执行数据库事务回滚例子

``` php
public function testTransactionRollback(): void
{
    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 1; $n++) {
        $connect
            ->table('guest_book')
            ->insert($data);
    }

    $this->assertSame(2, $connect->table('guest_book')->findCount());

    $this->assertFalse($connect->inTransaction());

    try {
        $connect->transaction(function ($connect) {
            $connect->table('guest_book')->where('id', 1)->delete();

            $this->assertSame(1, $connect->table('guest_book')->findCount());

            $this->assertTrue($connect->inTransaction());

            throw new Exception('Will rollback');
            $connect->table('guest_book')->where('id', 2)->delete();
        });
    } catch (Throwable $e) {
        $this->assertSame('Will rollback', $e->getMessage());
    }

    $this->assertFalse($connect->inTransaction());

    $this->assertSame(2, $connect->table('guest_book')->findCount());
}
```
    
## beginTransaction.commit 启动事务和用于非自动提交状态下面的查询提交

``` php
public function testTransactionByCustom(): void
{
    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 1; $n++) {
        $connect
            ->table('guest_book')
            ->insert($data);
    }

    $this->assertSame(2, $connect->table('guest_book')->findCount());

    $connect->beginTransaction();

    $connect->table('guest_book')->where('id', 1)->delete();

    $this->assertSame(1, $connect->table('guest_book')->findCount());

    $connect->table('guest_book')->where('id', 2)->delete();

    $this->assertSame(0, $connect->table('guest_book')->findCount());

    $connect->commit();

    $this->assertSame(0, $connect->table('guest_book')->findCount());
}
```
    
## beginTransaction.rollBack 启动事务和事务回滚

``` php
public function testTransactionRollbackByCustom(): void
{
    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 1; $n++) {
        $connect
            ->table('guest_book')
            ->insert($data);
    }

    $this->assertSame(2, $connect->table('guest_book')->findCount());

    $this->assertFalse($connect->inTransaction());

    try {
        $connect->beginTransaction();

        $connect
            ->table('guest_book')
            ->where('id', 1)
            ->delete();

        $this->assertSame(1, $connect->table('guest_book')->findCount());

        $this->assertTrue($connect->inTransaction());

        throw new Exception('Will rollback');
        $connect->table('guest_book')->where('id', 2)->delete();

        $connect->commit();
    } catch (Throwable $e) {
        $this->assertSame('Will rollback', $e->getMessage());

        $connect->rollBack();
    }

    $this->assertFalse($connect->inTransaction());

    $this->assertSame(2, $connect->table('guest_book')->findCount());
}
```
    
## procedure 查询存储过程数据记录

``` php
public function testCallProcedure(): void
{
    $this->markTestSkipped('Skip procedure.');

    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 1; $n++) {
        $connect
            ->table('guest_book')
            ->insert($data);
    }

    $result = $connect->procedure('CALL test_procedure(0)');

    $data = <<<'eot'
        [
            [
                {
                    "name": "tom"
                },
                {
                    "name": "tom"
                }
            ],
            [
                {
                    "content": "I love movie."
                }
            ]
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $result
        )
    );
}
```
    
## procedure 查询存储过程数据记录支持参数绑定

``` php
public function testCallProcedure2(): void
{
    $this->markTestSkipped('Skip procedure.');

    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 1; $n++) {
        $connect
            ->table('guest_book')
            ->insert($data);
    }

    $result = $connect->procedure('CALL test_procedure2(0,:name)', [
        'name' => [null, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 200],
    ]);

    $data = <<<'eot'
        [
            [
                {
                    "content": "I love movie."
                }
            ],
            [
                {
                    "_name": "tom"
                }
            ]
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $result
        )
    );
}
```
    
## 查询存储过程数据支持原生方法

``` php
public function testCallProcedure3(): void
{
    $this->markTestSkipped('Skip procedure.');

    $connect = $this->createDatabaseConnect();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 1; $n++) {
        $connect
            ->table('guest_book')
            ->insert($data);
    }

    $pdoStatement = $connect->pdo(true)->prepare('CALL test_procedure2(0,:name)');
    $outName = null;
    $pdoStatement->bindParam(':name', $outName, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 200);
    $pdoStatement->execute();

    $result = [];
    while ($pdoStatement->columnCount()) {
        $result[] = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
        $pdoStatement->nextRowset();
    }

    $data = <<<'eot'
        [
            [
                {
                    "content": "I love movie."
                }
            ],
            [
                {
                    "_name": "tom"
                }
            ]
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $result
        )
    );
}
```
    
## 查询存储过程数据支持缓存

`procedure` 是一个底层查询方法支持直接设置缓存。

**procedure 原型**

``` php
# Leevel\Database\Database::procedure
/**
 * {@inheritDoc}
 */
public function procedure(string $sql, array $bindParams = [], bool|int $master = false, ?string $cacheName = null, ?int $cacheExpire = null, ?ICache $cache = null): array;
```


``` php
public function testCacheProcedure(): void
{
    $this->markTestSkipped('Skip procedure.');

    $manager = $this->createDatabaseManager();

    $data = ['name' => 'tom', 'content' => 'I love movie.'];

    for ($n = 0; $n <= 1; $n++) {
        $manager
            ->table('guest_book')
            ->insert($data);
    }

    $cacheDir = dirname(__DIR__).'/databaseCacheManager';
    $cacheFile = $cacheDir.'/testcachekey.php';

    $result = $manager
        ->procedure('CALL test_procedure(0)');
    $this->assertFileDoesNotExist($cacheFile);
    $data = <<<'eot'
        [
            [
                {
                    "name": "tom"
                },
                {
                    "name": "tom"
                }
            ],
            [
                {
                    "content": "I love movie."
                }
            ]
        ]
        eot;
    $this->assertSame(
        $data,
        $this->varJson(
            $result
        )
    );

    $resultWithoutCache = $manager
        ->procedure('CALL test_procedure(0)', [], false, 'testcachekey');
    $this->assertFileExists($cacheFile);
    // cached data
    $resultWithCache = $manager
        ->procedure('CALL test_procedure(0)', [], false, 'testcachekey');
    $this->assertFileExists($cacheFile);
    $this->assertSame(
        $data,
        $this->varJson(
            $resultWithCache
        )
    );
    $this->assertEquals($result, $resultWithCache);
    $this->assertFalse($result === $resultWithCache);
    $this->assertEquals($resultWithCache, $resultWithoutCache);
}
```
    
## pdo 返回 PDO 查询连接

``` php
public function testPdo(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertNull($connect->pdo(IDatabase::MASTER));
    $this->assertInstanceof(PDO::class, $connect->pdo(true));
    $this->assertInstanceof(PDO::class, $connect->pdo(IDatabase::MASTER));
    $this->assertNull($connect->pdo(5));

    $connect->close();
}
```
    
## setSavepoints 设置是否启用部分事务回滚保存点

``` php
public function testBeginTransactionWithCreateSavepoint(): void
{
    $connect = $this->createDatabaseConnect();

    $connect->setSavepoints(true);
    $connect->beginTransaction();
    $connect
        ->table('guest_book')
        ->insert(['name' => 'tom']); // `tom` will not rollBack

    $connect->beginTransaction();
    $this->assertSame('SAVEPOINT trans2', $connect->getLastSql());

    $connect
        ->table('guest_book')
        ->insert(['name' => 'jerry']);

    $connect->rollBack();
    $this->assertSame('ROLLBACK TO SAVEPOINT trans2', $connect->getLastSql());
    $connect->commit();

    $book = $connect
        ->table('guest_book')
        ->where('id', 1)
        ->findOne();

    $this->assertSame(1, $connect->table('guest_book')->findCount());
    $this->assertSame('tom', $book->name);
}
```
    
## setSavepoints 设置是否启用部分事务提交保存点

``` php
public function testCommitWithReleaseSavepoint(): void
{
    $connect = $this->createDatabaseConnect();
    $connect->setSavepoints(true);
    $connect->beginTransaction();

    $connect
        ->table('guest_book')
        ->insert(['name' => 'tom']);

    $connect->beginTransaction();
    $this->assertSame('SAVEPOINT trans2', $connect->getLastSql());

    $connect
        ->table('guest_book')
        ->insert(['name' => 'jerry']);

    $connect->commit();
    $this->assertSame('RELEASE SAVEPOINT trans2', $connect->getLastSql());
    $connect->commit();

    $book = $connect
        ->table('guest_book')
        ->where('id', 1)
        ->findOne();
    $book2 = $connect
        ->table('guest_book')
        ->where('id', 2)
        ->findOne();

    $this->assertSame(2, $connect->table('guest_book')->findCount());
    $this->assertSame('tom', $book->name);
    $this->assertSame('jerry', $book2->name);
}
```
    
## numRows 返回影响记录

``` php
public function testNumRows(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(0, $connect->numRows());

    $connect
        ->table('guest_book')
        ->insert(['name' => 'jerry', 'content' => '']);

    $this->assertSame(1, $connect->numRows());

    $connect
        ->table('guest_book')
        ->where('id', 1)
        ->update(['name' => 'jerry']);

    $this->assertSame(0, $connect->numRows());

    $connect
        ->table('guest_book')
        ->where('id', 1)
        ->update(['name' => 'tom']);

    $this->assertSame(1, $connect->numRows());
}
```
    
## 数据库主从

数据库配置项 `distributed` 表示主从，如果从数据库均连接失败，则还是会走主库。


``` php
public function testReadConnectDistributed(): void
{
    $connect = $this->createDatabaseConnectMock([
        'driver'             => 'mysql',
        'separate'           => false,
        'distributed'        => true,
        'master'             => [
            'host'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['HOST'],
            'port'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PORT'],
            'name'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['NAME'],
            'user'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['USER'],
            'password' => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PASSWORD'],
            'charset'  => 'utf8',
            'options'  => [
                PDO::ATTR_PERSISTENT        => false,
                PDO::ATTR_CASE              => PDO::CASE_NATURAL,
                PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
                PDO::ATTR_STRINGIFY_FETCHES => false,
                PDO::ATTR_EMULATE_PREPARES  => false,
                PDO::ATTR_TIMEOUT           => 30,
            ],
        ],
        'slave' => [
            [
                'host'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['HOST'],
                'port'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PORT'],
                'name'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['NAME'],
                'user'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['USER'],
                'password' => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PASSWORD'],
                'charset'  => 'utf8',
                'options'  => [
                    PDO::ATTR_PERSISTENT        => false,
                    PDO::ATTR_CASE              => PDO::CASE_NATURAL,
                    PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
                    PDO::ATTR_STRINGIFY_FETCHES => false,
                    PDO::ATTR_EMULATE_PREPARES  => false,
                    PDO::ATTR_TIMEOUT           => 30,
                ],
            ],
            [
                'host'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['HOST'],
                'port'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PORT'],
                'name'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['NAME'],
                'user'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['USER'],
                'password' => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PASSWORD'],
                'charset'  => 'utf8',
                'options'  => [
                    PDO::ATTR_PERSISTENT        => false,
                    PDO::ATTR_CASE              => PDO::CASE_NATURAL,
                    PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
                    PDO::ATTR_STRINGIFY_FETCHES => false,
                    PDO::ATTR_EMULATE_PREPARES  => false,
                    PDO::ATTR_TIMEOUT           => 30,
                ],
            ],
        ],
    ]);

    $this->assertInstanceof(PDO::class, $connect->pdo());

    $connect->close();
}
```
    
## 数据库读写分离

数据库配置项 `separate` 表示读写分离，如果从数据库均连接失败，则读数据还是会走主库。


``` php
public function testReadConnectDistributedButAllInvalidAndAlsoIsSeparate(): void
{
    $connect = $this->createDatabaseConnectMock([
        'driver'             => 'mysql',
        'separate'           => true,
        'distributed'        => true,
        'master'             => [
            'host'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['HOST'],
            'port'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PORT'],
            'name'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['NAME'],
            'user'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['USER'],
            'password' => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PASSWORD'],
            'charset'  => 'utf8',
            'options'  => [
                PDO::ATTR_PERSISTENT        => false,
                PDO::ATTR_CASE              => PDO::CASE_NATURAL,
                PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
                PDO::ATTR_STRINGIFY_FETCHES => false,
                PDO::ATTR_EMULATE_PREPARES  => false,
                PDO::ATTR_TIMEOUT           => 30,
            ],
        ],
        'slave' => [
            [
                'host'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['HOST'],
                'port'     => '5555', // not invalid
                'name'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['NAME'],
                'user'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['USER'],
                'password' => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PASSWORD'],
                'charset'  => 'utf8',
                'options'  => [
                    PDO::ATTR_PERSISTENT        => false,
                    PDO::ATTR_CASE              => PDO::CASE_NATURAL,
                    PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
                    PDO::ATTR_STRINGIFY_FETCHES => false,
                    PDO::ATTR_EMULATE_PREPARES  => false,
                    PDO::ATTR_TIMEOUT           => 30,
                ],
            ],
            [
                'host'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['HOST'],
                'port'     => '6666', // not invalid
                'name'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['NAME'],
                'user'     => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['USER'],
                'password' => $GLOBALS['LEEVEL_ENV']['DATABASE']['MYSQL']['PASSWORD'],
                'charset'  => 'utf8',
                'options'  => [
                    PDO::ATTR_PERSISTENT        => false,
                    PDO::ATTR_CASE              => PDO::CASE_NATURAL,
                    PDO::ATTR_ORACLE_NULLS      => PDO::NULL_NATURAL,
                    PDO::ATTR_STRINGIFY_FETCHES => false,
                    PDO::ATTR_EMULATE_PREPARES  => false,
                    PDO::ATTR_TIMEOUT           => 30,
                ],
            ],
        ],
    ]);

    $this->assertInstanceof(PDO::class, $connect->pdo());
    $this->assertInstanceof(PDO::class, $connect->pdo());

    $connect->close();
}
```
    
## databaseSelect 返回查询对象

``` php
public function testDatabaseSelectIsNotInit(): void
{
    $connect = $this->createDatabaseConnect();
    $this->assertInstanceof(Select::class, $connect->databaseSelect());
}
```
    
## getTableNames 取得数据库表名列表

``` php
public function testGetTableNames(): void
{
    $connect = $this->createDatabaseConnect();
    $result = $connect->getTableNames('test');
    $this->assertTrue(in_array('guest_book', $result, true));
}
```
    
## getTableColumns 取得数据库表字段信息

``` php
public function testGetTableColumns(): void
{
    $connect = $this->createDatabaseConnect();
    $result = $connect->getTableColumns('guest_book');

    $sql = <<<'eot'
        {
            "list": {
                "id": {
                    "field": "id",
                    "type": "bigint(20)",
                    "collation": null,
                    "null": false,
                    "key": "PRI",
                    "default": null,
                    "extra": "auto_increment",
                    "comment": "ID",
                    "primary_key": true,
                    "type_name": "bigint",
                    "type_length": "20",
                    "auto_increment": true
                },
                "name": {
                    "field": "name",
                    "type": "varchar(64)",
                    "collation": "utf8_general_ci",
                    "null": false,
                    "key": "",
                    "default": "",
                    "extra": "",
                    "comment": "名字",
                    "primary_key": false,
                    "type_name": "varchar",
                    "type_length": "64",
                    "auto_increment": false
                },
                "content": {
                    "field": "content",
                    "type": "longtext",
                    "collation": "utf8_general_ci",
                    "null": false,
                    "key": "",
                    "default": null,
                    "extra": "",
                    "comment": "评论内容",
                    "primary_key": false,
                    "type_name": "longtext",
                    "type_length": null,
                    "auto_increment": false
                },
                "create_at": {
                    "field": "create_at",
                    "type": "datetime",
                    "collation": null,
                    "null": false,
                    "key": "",
                    "default": "CURRENT_TIMESTAMP",
                    "extra": "",
                    "comment": "创建时间",
                    "primary_key": false,
                    "type_name": "datetime",
                    "type_length": null,
                    "auto_increment": false
                }
            },
            "primary_key": [
                "id"
            ],
            "auto_increment": "id",
            "table_collation": "utf8_general_ci",
            "table_comment": "留言板"
        }
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $result
        )
    );
}
```
    
## getRawSql 游标查询

`getRawSql` 返回原生查询真实 SQL，以便于更加直观。

**getRawSql 原型**

``` php
# Leevel\Database\Database::getRawSql
/**
 * {@inheritDoc}
 */
public static function getRawSql(string $sql, array $bindParams): string;
```


``` php
public function testGetRawSql(): void
{
    $sql = Database::getRawSql('SELECT * FROM guest_book WHERE id = :id', [
        ':id' => [1],
    ]);
    $this->assertSame($sql, 'SELECT * FROM guest_book WHERE id = 1');
}
```