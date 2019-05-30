# 事务工作单元

用事务工作单元更好地处理数据库相关工作。

**引入相关类**

 * use Leevel\Database\Ddd\Entity;
 * use Leevel\Database\Ddd\IUnitOfWork;
 * use Leevel\Database\Ddd\UnitOfWork;
 * use Tests\Database\DatabaseTestCase as TestCase;
 * use Tests\Database\Ddd\Entity\CompositeId;
 * use Tests\Database\Ddd\Entity\Guestbook;
 * use Tests\Database\Ddd\Entity\GuestbookRepository;
 * use Tests\Database\Ddd\Entity\Relation\Post;
 * use Throwable;
## 保存一个实体


``` php
public function testBaseUse()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $post = new Post([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]);

    $this->assertNull($post->id);

    $work->persist($post);

    $work->flush();

    $this->assertSame('1', $post->id);
    $this->assertSame('1', $post['id']);
    $this->assertSame('1', $post->getterId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);
}
```
    
::: tip
通过 persist 方法保存一个实体，并通过 flush 将实体持久化到数据库。
:::
    
## 保存多个实体


``` php
public function testPersist()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

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

    $work->flush();

    $this->assertSame('1', $post->id);
    $this->assertSame('1', $post['id']);
    $this->assertSame('1', $post->getterId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);

    $this->assertSame('2', $post2->id);
    $this->assertSame('2', $post2['id']);
    $this->assertSame('2', $post2->getterId());
    $this->assertSame(2, $post2->userId);
    $this->assertSame('foo bar', $post2->summary);
}
```
    
::: tip
底层会开启一个事务，只有全部保存成功才会真正持久化到数据库。
:::
    
## 新增实体


``` php
public function testCreate()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

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

    $work->flush();

    $this->assertFalse($work->created($post));
    $this->assertFalse($work->created($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $this->assertSame('1', $post->id);
    $this->assertSame('1', $post['id']);
    $this->assertSame('1', $post->getterId());
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);

    $this->assertSame('2', $post2->id);
    $this->assertSame('2', $post2['id']);
    $this->assertSame('2', $post2->getterId());
    $this->assertSame(2, $post2->userId);
    $this->assertSame('foo bar', $post2->summary);
}
```
    
::: tip
底层执行的是 insert 语句，只有全部保存成功才会真正持久化到数据库。
:::
    
## 更新实体


``` php
public function testUpdate()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame('1', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]));

    $this->assertSame('2', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 2,
        'summary' => 'foo bar',
    ]));

    $post = Post::find(1);

    $post2 = Post::find(2);

    $this->assertInstanceof(Entity::class, $post);
    $this->assertInstanceof(Entity::class, $post2);
    $this->assertInstanceof(Post::class, $post);
    $this->assertInstanceof(Post::class, $post2);

    $this->assertSame('1', $post->id);
    $this->assertSame('1', $post['id']);
    $this->assertSame('1', $post->getterId());
    $this->assertSame('1', $post->userId);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame('hello world', $post->title);

    $this->assertSame('2', $post2->id);
    $this->assertSame('2', $post2['id']);
    $this->assertSame('2', $post2->getterId());
    $this->assertSame('2', $post2->userId);
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

    $work->flush();

    $this->assertFalse($work->updated($post));
    $this->assertFalse($work->updated($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $this->assertSame('1', $post->id);
    $this->assertSame('1', $post['id']);
    $this->assertSame('1', $post->getterId());
    $this->assertSame('1', $post->userId);
    $this->assertSame('new post title', $post->title);
    $this->assertSame('new post summary', $post->summary);

    $this->assertSame('2', $post2->id);
    $this->assertSame('2', $post2['id']);
    $this->assertSame('2', $post2->getterId());
    $this->assertSame('2', $post2->userId);
    $this->assertSame('new post2 title', $post2->title);
    $this->assertSame('new post2 summary', $post2->summary);
}
```
    
::: tip
底层执行的是 update 语句，只有全部保存成功才会真正持久化到数据库。
:::
    
## 删除实体


``` php
public function testDelete()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame('1', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]));

    $this->assertSame('2', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 2,
        'summary' => 'foo bar',
    ]));

    $post = Post::find(1);

    $post2 = Post::find(2);

    $this->assertInstanceof(Entity::class, $post);
    $this->assertInstanceof(Entity::class, $post2);
    $this->assertInstanceof(Post::class, $post);
    $this->assertInstanceof(Post::class, $post2);

    $this->assertSame('1', $post->id);
    $this->assertSame('1', $post['id']);
    $this->assertSame('1', $post->getterId());
    $this->assertSame('1', $post->userId);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame('hello world', $post->title);

    $this->assertSame('2', $post2->id);
    $this->assertSame('2', $post2['id']);
    $this->assertSame('2', $post2->getterId());
    $this->assertSame('2', $post2->userId);
    $this->assertSame('foo bar', $post2->summary);
    $this->assertSame('hello world', $post2->title);

    $this->assertFalse($work->deleted($post));
    $this->assertFalse($work->deleted($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $work->delete($post);
    $work->delete($post2);

    $this->assertTrue($work->deleted($post));
    $this->assertTrue($work->deleted($post2));
    $this->assertTrue($work->registered($post));
    $this->assertTrue($work->registered($post2));

    $work->flush();

    $this->assertFalse($work->deleted($post));
    $this->assertFalse($work->deleted($post2));
    $this->assertFalse($work->registered($post));
    $this->assertFalse($work->registered($post2));

    $postAfter = Post::find(1);

    $post2After = Post::find(2);

    $this->assertNull($postAfter->id);
    $this->assertNull($postAfter['id']);
    $this->assertNull($postAfter->getterId());
    $this->assertNull($postAfter->userId);
    $this->assertNull($postAfter->title);
    $this->assertNull($postAfter->summary);

    $this->assertNull($post2After->id);
    $this->assertNull($post2After['id']);
    $this->assertNull($post2After->getterId());
    $this->assertNull($post2After->userId);
    $this->assertNull($post2After->title);
    $this->assertNull($post2After->summary);
}
```
    
::: tip
底层执行的是 delete 语句，只有全部保存成功才会真正持久化到数据库。
:::
    
## 刷新实体


``` php
public function testRefresh()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame('1', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]));

    $post = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
    ], true);

    $this->assertSame(1, $post->getterId());
    $this->assertSame('old', $post->getterSummary());
    $this->assertSame('old', $post->getterTitle());

    $work->persist($post);
    $work->refresh($post);

    $this->assertSame('1', $post->getterId());
    $this->assertSame('post summary', $post->getterSummary());
    $this->assertSame('hello world', $post->getterTitle());

    $work->flush();

    $post = Post::find(1);

    $this->assertInstanceof(Entity::class, $post);
    $this->assertInstanceof(Post::class, $post);

    $this->assertSame('1', $post->id);
    $this->assertSame('1', $post['id']);
    $this->assertSame('1', $post->getterId());
    $this->assertSame('1', $post->userId);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame('hello world', $post->title);
}
```
    
::: tip
底层执行的是 select 语句，这个操作会读取数据库最新信息并刷新实体的属性。
:::
    
## 手工启动事务 beginTransaction


``` php
public function testBeginTransaction()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame('1', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]));

    $work->beginTransaction();

    $post = Post::find(1);
    $work->update($post);

    try {
        $post->title = 'new title';

        $work->flush();
        $work->commit();
    } catch (Throwable $e) {
        $work->close();
        $work->rollBack();
    }

    $this->assertSame('1', $post->getterId());
    $this->assertSame('new title', $post->getterTitle());
}
```
    
::: tip
通常来说事务工作单元会自动帮你处理事务，可以通过手工 beginTransaction，成功 commit 或者失败 rollBack，系统提供了 API 让你也手工开启事务处理。
:::
    
## 执行失败事务回滚 rollBack


``` php
public function testFlushButRollBack()
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
    ]);

    $post2 = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
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
public function testTransaction()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame('1', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]));

    $work->transaction(function ($w) {
        $post = Post::find(1);
        $w->update($post);

        $post->title = 'new title';
    });

    $newPost = Post::find(1);

    $this->assertSame('1', $newPost->getterId());
    $this->assertSame('new title', $newPost->getterTitle());
}
```
    
::: tip
可以将事务包裹在一个闭包中，如果执行失败自动回滚，不会更新数据库。
:::
    
## 事务包裹在闭包中失败回滚 transaction 


``` php
public function testTransactionAndRollBack()
{
    $this->expectException(\Leevel\Database\ReplaceException::class);
    $this->expectExceptionMessage(
        'SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry \'1\' for key \'PRIMARY\''
    );

    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $work->transaction(function ($w) {
        $post = new Post([
            'id'      => 1,
            'title'   => 'old',
            'summary' => 'old',
        ]);

        $post2 = new Post([
            'id'      => 1,
            'title'   => 'old',
            'summary' => 'old',
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
public function testSetRootEntity()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame('1', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]));

    $post = Post::find(1);

    $work->setRootEntity($post);

    $work->update($post);

    $post->title = 'new title';

    $work->flush();

    $this->assertSame('1', $post->getterId());
    $this->assertSame('new title', $post->getterTitle());

    $newPost = Post::find(1);

    $this->assertSame('1', $newPost->getterId());
    $this->assertSame('new title', $newPost->getterTitle());
}
```
    
::: tip
系统默认读取基础的数据库配置来处理数据相关信息，设置跟实体可以更改事务处理的数据库连接。
:::
    
## 更改数据库连接 setConnect


``` php
public function testSetConnectNotFoundWillUseDefault()
{
    $work = UnitOfWork::make();

    $this->assertInstanceof(UnitOfWork::class, $work);
    $this->assertInstanceof(IUnitOfWork::class, $work);

    $connect = $this->createDatabaseConnect();

    $this->assertSame('1', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]));

    $post = Post::find(1);

    $work->setConnect('hello');

    $work->update($post);

    $post->title = 'new title';

    $work->flush();

    $this->assertSame('1', $post->getterId());
    $this->assertSame('new title', $post->getterTitle());

    $newPost = Post::find(1);

    $this->assertSame('1', $newPost->getterId());
    $this->assertSame('new title', $newPost->getterTitle());
}
```
    
::: tip
如果没有存在的连接，则会使用默认的连接。
:::
    
## 无实体执行 flush 什么都不做


``` php
public function testFlushButNotFoundAny()
{
    $work = UnitOfWork::make(new Post());

    $this->assertNull($work->flush());
}
```
    
::: tip
实际上什么也不会发生。
:::
    
## 实体实体支持缓存


``` php
public function testPersistStageManagedEntityDoNothing()
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $post = new Post([
        'id'      => 1,
        'title'   => 'old',
        'summary' => 'old',
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
public function testPersistStageRemovedEntity()
{
    $work = UnitOfWork::make();

    $connect = $this->createDatabaseConnect();

    $this->assertSame('1', $connect->
    table('post')->
    insert([
        'title'   => 'hello world',
        'user_id' => 1,
        'summary' => 'post summary',
    ]));

    $post = Post::find(1);

    $this->assertSame('1', $post->getterId());
    $this->assertSame('hello world', $post->getterTitle());
    $this->assertSame('post summary', $post->getterSummary());

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
public function testCreateButAlreadyInUpdates()
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
public function testCreateButAlreadyInDeletes()
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
public function testCreateButAlreadyInReplaces()
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
public function testCreateManyTimes()
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