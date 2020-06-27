# 事务工作单元

::: tip Testing Is Documentation
[tests/Database/Ddd/UnitOfWorkTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/UnitOfWorkTest.php)
:::
    
用事务工作单元更好地处理数据库相关工作。

**Uses**

``` php
<?php

use Exception;
use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\UnitOfWork;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\CompositeId;
use Tests\Database\Ddd\Entity\Guestbook;
use Tests\Database\Ddd\Entity\GuestbookRepository;
use Tests\Database\Ddd\Entity\Relation\Post;
use Throwable;
```

## 保存一个实体

``` php
public function testBaseUse(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]);

    $this->assertNull($post->id);

    $work->persist($post);

    $work->flush();

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);
}
```
    
::: tip
通过 persist 方法保存一个实体，并通过 flush 将实体持久化到数据库。
:::
    
## 保存多个实体

``` php
public function testPersist(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]);

    $this->assertNull($post->id);

    $post2 = new Post([
        'title'   => 'hello world',
        'user_id' => 2,
        'summary' => 'foo bar',
    ]);

    $this->assertNull($post2->id);

    $work->persist($post);
    $work->persist($post2);
    $work->on($post2, function () {
        $GLOBALS['unitofwork'][] = 1;
    });
    $work->on($post, function () {
        $GLOBALS['unitofwork'][] = 2;
    });

    $work->flush();

    $data = <<<'eot'
        [
            2,
            1
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['unitofwork']
        )
    );

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);

    $this->assertSame(2, $post2->id);
    $this->assertSame(2, $post2['id']);
    $this->assertSame(2, $post2->getId());
    $this->assertSame(2, $post2->userId);
    $this->assertSame('foo bar', $post2->summary);
}
```
    
::: tip
底层会开启一个事务，只有全部保存成功才会真正持久化到数据库。
:::
    
## 新增实体

``` php
public function testCreate(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]);

    $post2 = new Post([
        'title'   => 'hello world',
        'user_id' => 2,
        'summary' => 'foo bar',
    ]);

    $this->assertNull($post->id);
    $this->assertNull($post2->id);
    $this->assertFalse($work->created($post));
    $this->assertFalse($work->created($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $work->create($post);
    $work->create($post2);

    $this->assertTrue($work->created($post));
    $this->assertTrue($work->created($post2));
    $this->assertTrue($work->registered($post));
    $this->assertTrue($work->registered($post2));

    $work->on($post2, function () {
        $GLOBALS['unitofwork'][] = 1;
    });
    $work->on($post, function () {
        $GLOBALS['unitofwork'][] = 2;
    });

    $work->flush();

    $data = <<<'eot'
        [
            2,
            1
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['unitofwork']
        )
    );

    $this->assertFalse($work->created($post));
    $this->assertFalse($work->created($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);

    $this->assertSame(2, $post2->id);
    $this->assertSame(2, $post2['id']);
    $this->assertSame(2, $post2->getId());
    $this->assertSame(2, $post2->userId);
    $this->assertSame('foo bar', $post2->summary);
}
```
    
::: tip
底层执行的是 insert 语句，只有全部保存成功才会真正持久化到数据库。
:::
    
## 更新实体

``` php
public function testUpdate(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 2,
                'summary'   => 'foo bar',
                'delete_at' => 0,
            ]));

    $post = Post::select()->findEntity(1);

    $post2 = Post::select()->findEntity(2);

    $this->assertInstanceof(Entity::class, $post);
    $this->assertInstanceof(Entity::class, $post2);
    $this->assertInstanceof(Post::class, $post);
    $this->assertInstanceof(Post::class, $post2);

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame('hello world', $post->title);

    $this->assertSame(2, $post2->id);
    $this->assertSame(2, $post2['id']);
    $this->assertSame(2, $post2->getId());
    $this->assertSame(2, $post2->userId);
    $this->assertSame('foo bar', $post2->summary);
    $this->assertSame('hello world', $post2->title);

    $this->assertFalse($work->updated($post));
    $this->assertFalse($work->updated($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $post->title = 'new post title';
    $post->summary = 'new post summary';

    $post2->title = 'new post2 title';
    $post2->summary = 'new post2 summary';

    $work->update($post);
    $work->update($post2);

    $this->assertTrue($work->updated($post));
    $this->assertTrue($work->updated($post2));
    $this->assertTrue($work->registered($post));
    $this->assertTrue($work->registered($post2));

    $work->on($post2, function () {
        $GLOBALS['unitofwork'][] = 1;
    });
    $work->on($post, function () {
        $GLOBALS['unitofwork'][] = 2;
    });

    $work->flush();

    $data = <<<'eot'
        [
            2,
            1
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['unitofwork']
        )
    );

    $this->assertFalse($work->updated($post));
    $this->assertFalse($work->updated($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('new post title', $post->title);
    $this->assertSame('new post summary', $post->summary);

    $this->assertSame(2, $post2->id);
    $this->assertSame(2, $post2['id']);
    $this->assertSame(2, $post2->getId());
    $this->assertSame(2, $post2->userId);
    $this->assertSame('new post2 title', $post2->title);
    $this->assertSame('new post2 summary', $post2->summary);
}
```
    
::: tip
底层执行的是 update 语句，只有全部保存成功才会真正持久化到数据库。
:::
    
## 删除实体

``` php
public function testDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 2,
                'summary'   => 'foo bar',
                'delete_at' => 0,
            ]));

    $post = Post::select()->findEntity(1);

    $post2 = Post::select()->findEntity(2);

    $this->assertInstanceof(Entity::class, $post);
    $this->assertInstanceof(Entity::class, $post2);
    $this->assertInstanceof(Post::class, $post);
    $this->assertInstanceof(Post::class, $post2);

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame('hello world', $post->title);

    $this->assertSame(2, $post2->id);
    $this->assertSame(2, $post2['id']);
    $this->assertSame(2, $post2->getId());
    $this->assertSame(2, $post2->userId);
    $this->assertSame('foo bar', $post2->summary);
    $this->assertSame('hello world', $post2->title);

    $this->assertFalse($work->deleted($post));
    $this->assertFalse($work->deleted($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $work->delete($post);
    $work->delete($post2);
    $work->on($post2, function () {
        $GLOBALS['unitofwork'][] = 1;
    });
    $work->on($post, function () {
        $GLOBALS['unitofwork'][] = 2;
    });

    $this->assertTrue($work->deleted($post));
    $this->assertTrue($work->deleted($post2));
    $this->assertTrue($work->registered($post));
    $this->assertTrue($work->registered($post2));

    $work->flush();

    $data = <<<'eot'
        [
            2,
            1
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['unitofwork']
        )
    );

    $this->assertFalse($work->deleted($post));
    $this->assertFalse($work->deleted($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $postAfter = Post::select()->findEntity(1);
    $post2After = Post::select()->findEntity(2);

    $this->assertNull($postAfter->id);
    $this->assertNull($postAfter['id']);
    $this->assertNull($postAfter->getId());
    $this->assertNull($postAfter->userId);
    $this->assertNull($postAfter->title);
    $this->assertNull($postAfter->summary);

    $this->assertNull($post2After->id);
    $this->assertNull($post2After['id']);
    $this->assertNull($post2After->getId());
    $this->assertNull($post2After->userId);
    $this->assertNull($post2After->title);
    $this->assertNull($post2After->summary);

    $postAfter = Post::withSoftDeleted()->findEntity(1);
    $post2After = Post::withSoftDeleted()->findEntity(2);

    $this->assertSame(1, $postAfter->id);
    $this->assertSame(1, $postAfter['id']);
    $this->assertSame(1, $postAfter->getId());
    $this->assertSame(1, $postAfter->userId);
    $this->assertSame('post summary', $postAfter->summary);
    $this->assertSame('hello world', $postAfter->title);

    $this->assertSame(2, $post2After->id);
    $this->assertSame(2, $post2After['id']);
    $this->assertSame(2, $post2After->getId());
    $this->assertSame(2, $post2After->userId);
    $this->assertSame('foo bar', $post2After->summary);
    $this->assertSame('hello world', $post2After->title);
}
```
    
::: tip
底层执行的是 delete 语句，只有全部保存成功才会真正持久化到数据库。
:::
    
## 刷新实体

``` php
public function testRefresh(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
    ], true);

    $this->assertSame(1, $post->getId());
    $this->assertSame('old', $post->getSummary());
    $this->assertSame('old', $post->getTitle());

    $work->persist($post);
    $work->refresh($post);

    $this->assertSame(1, $post->getId());
    $this->assertSame('post summary', $post->getSummary());
    $this->assertSame('hello world', $post->getTitle());
    $post->title = 'new title';

    $work->flush();

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Entity::class, $post);
    $this->assertInstanceof(Post::class, $post);

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame('new title', $post->title);
}
```
    
::: tip
底层执行的是 select 语句，这个操作会读取数据库最新信息并刷新实体的属性。
:::
    
## 手工启动事务 beginTransaction

``` php
public function testBeginTransaction(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $work->beginTransaction();

    $post = Post::select()->findEntity(1);
    $work->update($post);

    try {
        $post->title = 'new title';

        $work->flush();
        $work->commit();
    } catch (Throwable $e) {
        $work->close();
        $work->rollBack();
    }

    $this->assertSame(1, $post->getId());
    $this->assertSame('new title', $post->getTitle());
}
```
    
::: tip
通常来说事务工作单元会自动帮你处理事务，可以通过手工 beginTransaction，成功 commit 或者失败 rollBack，系统提供了 API 让你也手工开启事务处理。
:::
    
## 执行失败事务回滚 rollBack

``` php
public function testFlushButRollBack(): void
{
    $this->expectException(\Leevel\Database\ReplaceException::class);
    $this->expectExceptionMessage(
        'SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry \'1\' for key \'PRIMARY\''
    );

    $work = UnitOfWork::make();

    $post = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
        'user_id' => 0,
    ]);

    $post2 = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
        'user_id' => 0,
    ]);

    $work->create($post);
    $work->create($post2);

    $work->flush();
}
```
    
::: tip
底层会自动运行一个事务，如果执行失败自动回滚，不会更新数据库。
:::
    
## 事务包裹在闭包中 transaction

``` php
public function testTransaction(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $work->transaction(function ($w) {
        $post = Post::select()->findEntity(1);
        $w->update($post);

        $post->title = 'new title';
    });

    $newPost = Post::select()->findEntity(1);

    $this->assertSame(1, $newPost->getId());
    $this->assertSame('new title', $newPost->getTitle());
}
```
    
::: tip
可以将事务包裹在一个闭包中，如果执行失败自动回滚，不会更新数据库。
:::
    
## 事务包裹在闭包中失败回滚 transaction 

``` php
public function testTransactionAndRollBack(): void
{
    $this->expectException(\Leevel\Database\ReplaceException::class);
    $this->expectExceptionMessage(
        'SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry \'1\' for key \'PRIMARY\''
    );

    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $work->transaction(function ($w) {
        $post = new Post([
            'id'      => 1,
            'title'   => 'old',
            'summary' => 'old',
            'user_id' => 0,
        ]);

        $post2 = new Post([
            'id'      => 1,
            'title'   => 'old',
            'summary' => 'old',
            'user_id' => 0,
        ]);

        $w->create($post);
        $w->create($post2);
    });

    $this->assertSame(0, $connect->table('post')->findCount());
}
```
    
::: tip
可以将事务包裹在一个闭包中，执行失败自动回滚测试，不会更新数据库。
:::
    
## 设置根实体 setRootEntity

``` php
public function testSetRootEntity(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = Post::select()->findEntity(1);
    $work->setRootEntity($post, 'password_right');

    $work->update($post);

    $post->title = 'new title';

    $work->flush();

    $this->assertSame(1, $post->getId());
    $this->assertSame('new title', $post->getTitle());

    $newPost = Post::select()->findEntity(1);

    $this->assertSame(1, $newPost->getId());
    $this->assertSame('new title', $newPost->getTitle());

    $work->setRootEntity($post, null);
}
```
    
::: tip
系统默认读取基础的数据库配置来处理数据相关信息，设置跟实体可以更改事务处理的数据库连接。
:::
    
## 更改数据库连接 setConnect

``` php
public function testSetConnectNotFoundWillThrowException(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('Connection hello option is not an array.');

    $work = UnitOfWork::make();
    $this->assertInstanceof(UnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = Post::select()->findEntity(1);
    $work->setConnect('hello');
    $work->update($post);
    $post->title = 'new title';

    try {
        $work->flush();
    } catch (Exception $e) {
        $work->setConnect(null);

        throw $e;
    }
}
```
    
::: tip
如果没有存在的连接，则会报错。
:::
    
## 保持实体支持缓存

``` php
public function testPersistStageManagedEntityDoNothing(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
        'user_id' => 0,
    ]);

    $work->persist($post, 'create');
    $work->persist($post, 'create');

    $work->flush();

    $this->assertSame(1, $connect->table('post')->findCount());
}
```
    
::: tip
保存两个一样的实体，第二个实体并不会被添加。
:::
    
## 重新保存已删除的实体实体

``` php
public function testPersistStageRemovedEntity(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = Post::select()->findEntity(1);

    $this->assertSame(1, $post->getId());
    $this->assertSame('hello world', $post->getTitle());
    $this->assertSame('post summary', $post->getSummary());

    $work->delete($post);

    $work->persist($post);

    $work->flush();

    $this->assertSame(1, $connect->table('post')->findCount());
}
```
    
::: tip
这样被删除的实体并不会被删除。
:::
    
## 注册更新的实体不能重新被创建

``` php
public function testCreateButAlreadyInUpdates(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Updated entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for create.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'foo']);

    $work->update($post);

    $work->create($post);
}
```
    
## 注册删除的实体不能重新被创建

``` php
public function testCreateButAlreadyInDeletes(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Deleted entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for create.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5]);

    $work->delete($post);

    $work->create($post);
}
```
    
## 注册替换的实体不能重新被创建

``` php
public function testCreateButAlreadyInReplaces(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Replaced entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for create.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5]);

    $work->replace($post);

    $work->create($post);
}
```
    
## 不能多次创建同一个实体

``` php
public function testCreateManyTimes(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for twice.'
    );

    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post(['title' => 'foo']);

    $work->create($post);
    $work->create($post);
}
```
    
## 已经删除的实体不能够被更新

``` php
public function testUpdateButAlreadyInDeletes(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Deleted entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for update.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'new']);

    $work->delete($post);

    $work->update($post);
}
```
    
## 已经创建的实体不能够被更新

``` php
public function testUpdateButAlreadyInCreates(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Created entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for update.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'new']);

    $work->create($post);

    $work->update($post);
}
```
    
## 已经替换的实体不能够被更新

``` php
public function testUpdateButAlreadyInReplaces(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Replaced entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for update.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'new']);

    $work->replace($post);

    $work->update($post);
}
```
    
## update 不能多次更新同一个实体

``` php
public function testUpdateManyTimes(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be updated for twice.'
    );

    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post(['id' => 1, 'title' => 'foo']);

    $work->update($post);
    $work->update($post);
}
```
    
## delete.create 已创建的实体可以被删除

``` php
public function testDeleteCreated(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post(['title' => 'foo', 'id' => 5]);

    $work->create($post);
    $work->delete($post);

    $work->flush();

    $this->assertSame(0, $connect->table('post')->findCount());
}
```
    
## delete.update 删除已更新的实体

``` php
public function testDeleteUpdated(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = Post::select()->findEntity(1);

    $work->update($post);
    $work->delete($post);

    $post->title = 'new';

    $work->flush();

    $postNew = Post::select()->findEntity(1);

    $this->assertSame(1, $connect->table('post')->findCount());
    $this->assertSame(0, $connect->table('post')->where('delete_at', 0)->findCount());
    $this->assertNull($postNew->id);
    $this->assertNull($postNew->title);
}
```
    
## delete.replace 删除已替换的实体

``` php
public function testDeleteReplaced(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = Post::select()->findEntity(1);

    $work->replace($post);
    $work->delete($post);

    $post->title = 'new';

    $work->flush();

    $postNew = Post::select()->findEntity(1);

    $this->assertSame(1, $connect->table('post')->findCount());
    $this->assertSame(0, $connect->table('post')->where('delete_at', 0)->findCount());
    $this->assertNull($postNew->id);
    $this->assertNull($postNew->title);
}
```
    
## repository 取得实体仓储

``` php
public function testRepository(): void
{
    $work = UnitOfWork::make();

    $repository = $work->repository(Guestbook::class);

    $this->assertInstanceof(GuestbookRepository::class, $repository);
}
```
    
## repository 取得实体仓储支持实体实例

``` php
public function testRepository2(): void
{
    $work = UnitOfWork::make();

    $repository = $work->repository(new Guestbook());

    $this->assertInstanceof(GuestbookRepository::class, $repository);
}
```
    
## remove 移除未被管理的实体不做任何处理直接返回

``` php
public function testRemoveStageNewDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->remove($post = new Post());

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## remove 移除未被管理的实体到前置区域不做任何处理直接返回

``` php
public function testRemoveBeforeStageNewDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->removeBefore($post = new Post());

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## remove 移除未被管理的实体到后置区域不做任何处理直接返回

``` php
public function testRemoveAfterBeforeStageNewDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->removeAfter($post = new Post());

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除未被管理的实体不做任何处理直接返回

``` php
public function testForceRemoveStageNewDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->forceRemove($post = new Post());

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除未被管理的实体到前置区域不做任何处理直接返回

``` php
public function testForceRemoveBeforeStageNewDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->forceRemoveBefore($post = new Post());

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除未被管理的实体到后置区域不做任何处理直接返回

``` php
public function testForceRemoveAfterStageNewDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->forceRemoveAfter($post = new Post());

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## remove 移除已删除的实体不做任何处理直接返回

``` php
public function testRemoveStageRemovedDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->delete($post = new Post(['id' => 5]));
    $work->remove($post);

    $this->assertSame(UnitOfWork::STATE_REMOVED, $work->getEntityState($post));
}
```
    
## remove 移除已删除的实体到前置区域不做任何处理直接返回

``` php
public function testRemoveBeforeStageRemovedDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->delete($post = new Post(['id' => 5]));
    $work->removeBefore($post);

    $this->assertSame(UnitOfWork::STATE_REMOVED, $work->getEntityState($post));
}
```
    
## remove 移除已删除的实体到后置区域不做任何处理直接返回

``` php
public function testRemoveAfterStageRemovedDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->delete($post = new Post(['id' => 5]));
    $work->removeAfter($post);

    $this->assertSame(UnitOfWork::STATE_REMOVED, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除已删除的实体不做任何处理直接返回

``` php
public function testForceRemoveStageRemovedDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->delete($post = new Post(['id' => 5]));
    $work->forceRemove($post);

    $this->assertSame(UnitOfWork::STATE_REMOVED, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除已删除的实体到前置区域不做任何处理直接返回

``` php
public function testForceRemoveBeforeStageRemovedDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->delete($post = new Post(['id' => 5]));
    $work->forceRemoveBefore($post);

    $this->assertSame(UnitOfWork::STATE_REMOVED, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除已删除的实体到后置区域不做任何处理直接返回

``` php
public function testForceRemoveAfterStageRemovedDoNothing(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $work->delete($post = new Post(['id' => 5]));
    $work->forceRemoveAfter($post);

    $this->assertSame(UnitOfWork::STATE_REMOVED, $work->getEntityState($post));
}
```
    
## remove 移除已经被管理的新增实体将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testRemoveStageManagedWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post);

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->remove($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## remove 移除已经被管理的新增实体到前置区域将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testRemoveBeforeStageManagedWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post);

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->removeBefore($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## remove 移除已经被管理的新增实体到后置区域将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testRemoveAfterStageManagedWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post);

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->removeAfter($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除已经被管理的新增实体将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testForceRemoveStageManagedWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post);

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->forceRemove($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->flush();

    $sql = null;
    $this->assertSame(
        $sql,
        $post->select()->getLastSql(),
    );
}
```
    
## forceRemove 强制移除已经被管理的新增实体到前置区域将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testForceRemoveBeforeStageManagedWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post);

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->forceRemoveBefore($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->flush();

    $sql = null;
    $this->assertSame(
        $sql,
        $post->select()->getLastSql(),
    );
}
```
    
## forceRemove 强制移除已经被管理的新增实体到后置区域将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testForceRemoveAfterStageManagedWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post);

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->forceRemoveAfter($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->flush();

    $sql = null;
    $this->assertSame(
        $sql,
        $post->select()->getLastSql(),
    );
}
```
    
## remove 移除已经被管理的替换实体将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testRemoveStageManagedReplaceWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post, 'replace');

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->remove($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## remove 移除已经被管理的替换实体到前置区域将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testRemoveBeforeStageManagedReplaceWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post, 'replace');

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->removeBefore($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## remove 移除已经被管理的替换实体到后置区域将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testRemoveAfterStageManagedReplaceWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post, 'replace');

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->removeAfter($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除已经被管理的替换实体将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testForceRemoveStageManagedReplaceWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post, 'replace');

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->forceRemove($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除已经被管理的替换实体到前置区域将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testForceRemoveBeforeStageManagedReplaceWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post, 'replace');

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->forceRemoveBefore($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## forceRemove 强制移除已经被管理的替换实体到后置区域将会清理已管理状态，但是不做删除然后直接返回

``` php
public function testForceRemoveAfterStageManagedReplaceWillDelete(): void
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);

    $post = new Post();

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));

    $work->persist($post, 'replace');

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));

    $work->forceRemoveAfter($post);

    $this->assertSame(UnitOfWork::STATE_NEW, $work->getEntityState($post));
}
```
    
## persist 保持实体自动识别为更新状态

``` php
public function testPersistAsSaveUpdate(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
    ]);

    $work->persist($post);

    $work->flush();

    $this->assertSame(0, $connect->table('post')->findCount());
}
```
    
## persist 保持实体为更新状态

``` php
public function testPersistAsUpdate(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
    ]);

    $work->persist($post, 'update');

    $work->flush();

    $this->assertSame(0, $connect->table('post')->findCount());
}
```
    
## persist 保持实体为替换状态

``` php
public function testPersistAsReplace(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
        'user_id' => 1,
    ]);

    $work->persist($post, 'replace');

    $work->flush();

    $updatedPost = Post::select()->findEntity(1);

    $this->assertSame(1, $updatedPost->id);
    $this->assertSame('old', $updatedPost->title);
    $this->assertSame(1, $updatedPost->userId);
    $this->assertSame('old', $updatedPost->summary);
}
```
    
## persist 已经持久化并且脱离管理的实体状态不能被再次保持

``` php
public function testPersistStageDetachedEntity(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Detached entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be persist.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'new']);

    $work->persist($post);

    $work->flush($post);

    $work->persist($post);
}
```
    
## remove 已经持久化并且脱离管理的实体状态不能被再次移除

``` php
public function testRemoveStageDetachedEntity(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Detached entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be remove.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'new']);

    $work->persist($post);

    $work->flush($post);

    $work->remove($post);
}
```
    
## on 保持的实体回调

``` php
public function testOnCallbacks(): void
{
    $work = UnitOfWork::make();

    $post = new Post([
        'title'   => 'new',
        'user_id' => 0,
    ]);
    $guestBook = new Guestbook(['name' => '']);

    $work->persist($post);
    $work->persist($guestBook);

    $work->on($post, function ($p) use ($guestBook) {
        $guestBook->content = 'guest_book content was post id is '.$p->id;
    });

    $work->flush($post);

    $newGuestbook = Guestbook::select()->findEntity(1);

    $this->assertSame('guest_book content was post id is 1', $newGuestbook->content);

    $work->clear();
}
```
    
## on 替换的实体回调

``` php
public function testOnCallbacksForReplace(): void
{
    $work = UnitOfWork::make();

    $post = new Post([
        'title'   => 'new',
        'user_id' => 0,
    ]);
    $guestBook = new Guestbook(['name' => '']);

    $work->replace($post);
    $work->replace($guestBook);

    $work->on($post, function ($p) use ($guestBook) {
        $guestBook->content = 'guest_book content was post id is '.$p->id;
    });

    $work->flush($post);

    $newGuestbook = Guestbook::select()->findEntity(1);

    $this->assertSame('guest_book content was post id is 1', $newGuestbook->content);

    $work->clear();
}
```
    
## on 更新的实体回调

``` php
public function testOnCallbacksForUpdate(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert([
                'name'      => '',
                'content'   => 'hello world',
            ]));

    $post = new Post(['id' => 1, 'title' => 'new'], true);
    $guestBook = new Guestbook(['id' => 1], true);

    $work->update($post);
    $work->update($guestBook);

    $work->on($post, function ($p) use ($guestBook) {
        $guestBook->content = 'guest_book content was post id is '.$p->id;
    });

    $post->title = 'new new';

    $work->flush($post);

    $newGuestbook = Guestbook::select()->findEntity(1);

    $this->assertSame('guest_book content was post id is 1', $newGuestbook->content);

    $work->clear();
}
```
    
## on 删除的实体回调

``` php
public function testOnCallbacksForDelete(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = Post::select()->findEntity(1);
    $work->persist($post)->remove($post);

    $work->on($post, function ($p) {
        // post has already removed,do nothing
    });

    $work->flush($post);

    $newPost = Post::select()->findEntity(1);
    $this->assertSame(1, $newPost->id);
    $work->clear();
}
```
    
## replace 注册替换实体

``` php
public function testReplace(): void
{
    $work = UnitOfWork::make();

    $post = new Post([
        'id'      => 1,
        'title'   => 'new',
        'user_id' => 0,
    ]);
    $post2 = new Post([
        'id'      => 2,
        'title'   => 'new2',
        'user_id' => 2,
    ]);

    $this->assertFalse($work->replaced($post));
    $this->assertFalse($work->replaced($post2));
    $work->replace($post);
    $work->replace($post2);
    $this->assertTrue($work->replaced($post));
    $this->assertTrue($work->replaced($post2));
    $work->on($post2, function () {
        $GLOBALS['unitofwork'][] = 1;
    });
    $work->on($post, function () {
        $GLOBALS['unitofwork'][] = 2;
    });

    $work->flush();

    $data = <<<'eot'
        [
            2,
            1
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['unitofwork']
        )
    );

    $this->assertFalse($work->replaced($post));
    $this->assertFalse($work->replaced($post2));

    $createPost = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $createPost);
    $this->assertSame(1, $createPost->id);
    $this->assertSame('new', $createPost->title);

    $createPost = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $createPost);
    $this->assertSame(2, $createPost->id);
    $this->assertSame('new2', $createPost->title);
}
```
    
## replace 注册替换实体到前置区域

``` php
public function testReplaceBefore(): void
{
    $work = UnitOfWork::make();

    $post = new Post([
        'id'      => 1,
        'title'   => 'new',
        'user_id' => 0,
    ]);
    $post2 = new Post([
        'id'      => 2,
        'title'   => 'new2',
        'user_id' => 2,
    ]);

    $this->assertFalse($work->replaced($post));
    $this->assertFalse($work->replaced($post2));
    $work->replace($post);
    $work->replaceBefore($post2);
    $this->assertTrue($work->replaced($post));
    $this->assertTrue($work->replaced($post2));
    $work->on($post2, function () {
        $GLOBALS['unitofwork'][] = 1;
    });
    $work->on($post, function () {
        $GLOBALS['unitofwork'][] = 2;
    });

    $work->flush();

    $data = <<<'eot'
        [
            1,
            2
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['unitofwork']
        )
    );

    $this->assertFalse($work->replaced($post));
    $this->assertFalse($work->replaced($post2));

    $createPost = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $createPost);
    $this->assertSame(1, $createPost->id);
    $this->assertSame('new', $createPost->title);

    $createPost = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $createPost);
    $this->assertSame(2, $createPost->id);
    $this->assertSame('new2', $createPost->title);
}
```
    
## replace 注册替换实体到后置区域

``` php
public function testReplaceAfter(): void
{
    $work = UnitOfWork::make();

    $post = new Post([
        'id'      => 1,
        'title'   => 'new',
        'user_id' => 0,
    ]);
    $post2 = new Post([
        'id'      => 2,
        'title'   => 'new2',
        'user_id' => 2,
    ]);

    $this->assertFalse($work->replaced($post));
    $this->assertFalse($work->replaced($post2));
    $work->replaceAfter($post);
    $work->replace($post2);
    $this->assertTrue($work->replaced($post));
    $this->assertTrue($work->replaced($post2));
    $work->on($post2, function () {
        $GLOBALS['unitofwork'][] = 1;
    });
    $work->on($post, function () {
        $GLOBALS['unitofwork'][] = 2;
    });

    $work->flush();

    $data = <<<'eot'
        [
            1,
            2
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['unitofwork']
        )
    );

    $this->assertFalse($work->replaced($post));
    $this->assertFalse($work->replaced($post2));

    $createPost = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $createPost);
    $this->assertSame(1, $createPost->id);
    $this->assertSame('new', $createPost->title);

    $createPost = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $createPost);
    $this->assertSame(2, $createPost->id);
    $this->assertSame('new2', $createPost->title);
}
```
    
## replace 注册替换实体更新例子

``` php
public function testReplaceAsUpdate(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = new Post([
        'id'      => 1,
        'title'   => 'new',
        'summary' => 'new',
        'user_id' => 1,
    ]);

    $work->replace($post);

    $work->flush();

    $updatedPost = Post::select()->findEntity(1);

    $this->assertSame(1, $updatedPost->id);
    $this->assertSame('new', $updatedPost->title);
    $this->assertSame(1, $updatedPost->userId);
    $this->assertSame('new', $updatedPost->summary);
}
```
    
## 已创建的实体不能够被替换

``` php
public function testReplaceButAlreadyInCreates(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Created entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for replace.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'new']);

    $work->create($post);

    $work->replace($post);
}
```
    
## 已更新的实体不能够被替换

``` php
public function testReplaceButAlreadyInUpdates(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Updated entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for replace.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'new']);

    $work->update($post);

    $work->replace($post);
}
```
    
## 同一个实体不能被替换多次

``` php
public function testReplaceManyTimes(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be replaced for twice.'
    );

    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post(['title' => 'foo']);

    $work->replace($post);
    $work->replace($post);
}
```
    
## 已删除的实体不能够被替换

``` php
public function testReplaceButAlreadyInDeletes(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Deleted entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be added for replace.'
    );

    $work = UnitOfWork::make();

    $post = new Post(['id' => 5, 'title' => 'new']);

    $work->delete($post);

    $work->replace($post);
}
```
    
## 同一个实体不能够被删除多次

``` php
public function testDeleteManyTimes(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` cannot be deleted for twice.'
    );

    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post(['id' => 1, 'title' => 'foo']);

    $work->delete($post);
    $work->delete($post);
}
```
    
## registerManaged 注册实体为管理状态

``` php
public function testRegisterManaged(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post(['id' => 1, 'title' => 'foo']);

    $this->assertSame(UnitOfWork::STATE_DETACHED, $work->getEntityState($post));

    $work->registerManaged($post);

    $this->assertSame(UnitOfWork::STATE_MANAGED, $work->getEntityState($post));
}
```
    
## 不能多次创建同一个实体

``` php
public function testPersistAsCompositeIdReplace2(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $compositeId = new CompositeId([
        'id1'      => 1,
        'id2'      => 2,
        'name'     => 'old',
    ]);

    $work->persist($compositeId);

    $work->flush();

    $this->assertSame(1, $connect->table('composite_id')->findCount());
}
```
    
## persist 保持实体为替换支持复合主键

``` php
public function testPersistAsCompositeIdReplace(): void
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $compositeId = new CompositeId([
        'id1'      => 1,
        'id2'      => 2,
        'name'     => 'old',
    ]);

    $work->persist($compositeId, 'replace');

    $work->flush();

    $this->assertSame(1, $connect->table('composite_id')->findCount());
}
```