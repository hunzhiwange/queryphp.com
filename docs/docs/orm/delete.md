# 删除实体

::: tip Testing Is Documentation
[tests/Database/Ddd/Delete/DeleteTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Delete/DeleteTest.php)
:::
    
将实体从数据库中删除。


**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\CompositeId;
use Tests\Database\Ddd\Entity\DemoEntity;
use Tests\Database\Ddd\Entity\EntityWithoutPrimaryKey;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\PostContent;
use Tests\Database\Ddd\Entity\SoftDeleteNotFoundDeleteAtField;
```

## delete 删除一个实体

**完整例子**

``` php
$entity = new DemoEntity(['id' => 5]);
$entity->delete()->flush();
```

调用 `delete` 方法并没有立刻真正持久化到数据库，这一个步骤计算好了待删除的数据。

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class DemoEntity extends Entity
{
    use GetterSetter;

    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    public const STRUCT = [
        'id' => [
            self::READONLY => true,
        ],
        'name' => [],
    ];
}
```


``` php
public function testBaseUse(): void
{
    $entity = new DemoEntity(['id' => 5, 'name' => 'foo']);

    $this->assertInstanceof(Entity::class, $entity);
    $this->assertSame('foo', $entity->name);
    $this->assertSame(['id', 'name'], $entity->changed());
    $this->assertNull($entity->flushData());

    $entity->delete();

    $data = <<<'eot'
        [
            {
                "id": 5
            }
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    $entity->flush();
}
```
    
::: tip
通过 delete 方法删除一个实体，并通过 flush 将实体持久化到数据库。
:::
    
## softDelete 软删除一个实体

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;
use Leevel\Database\Ddd\Relation\Relation;

class Post extends Entity
{
    use GetterSetter;

    public const TABLE = 'post';

    public const ID = 'id';

    public const AUTO = 'id';

    public const STRUCT = [
        'id' => [
            self::READONLY           => true,
        ],
        'title'     => [],
        'user_id'   => [],
        'summary'   => [],
        'create_at' => [],
        'delete_at' => [
            self::CREATE_FILL => 0,
        ],
        'user'      => [
            self::BELONGS_TO     => User::class,
            self::SOURCE_KEY     => 'user_id',
            self::TARGET_KEY     => 'id',
        ],
        'comment' => [
            self::HAS_MANY          => Comment::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'post_id',
            self::RELATION_SCOPE    => 'comment',
        ],
        'post_content' => [
            self::HAS_ONE     => PostContent::class,
            self::SOURCE_KEY  => 'id',
            self::TARGET_KEY  => 'post_id',
        ],
        'user_not_defined_source_key'      => [
            self::BELONGS_TO     => User::class,
            self::TARGET_KEY     => 'id',
        ],
        'user_not_defined_target_key'      => [
            self::BELONGS_TO     => User::class,
            self::SOURCE_KEY     => 'id',
        ],
        'comment_not_defined_source_key' => [
            self::HAS_MANY          => Comment::class,
            self::TARGET_KEY        => 'post_id',
            self::RELATION_SCOPE    => 'comment',
        ],
        'comment_not_defined_target_key' => [
            self::HAS_MANY          => Comment::class,
            self::SOURCE_KEY        => 'id',
            self::RELATION_SCOPE    => 'comment',
        ],
        'post_content_not_defined_source_key' => [
            self::HAS_ONE     => PostContent::class,
            self::TARGET_KEY  => 'post_id',
        ],
        'post_content_not_defined_target_key' => [
            self::HAS_ONE     => PostContent::class,
            self::SOURCE_KEY  => 'id',
        ],
    ];

    public const DELETE_AT = 'delete_at';

    protected function relationScopeComment(Relation $relation): void
    {
        $relation->where('id', '>', 4);
    }
}
```


``` php
public function testSoftDelete(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    $this->assertFalse($post->softDeleted());
    $post->softDelete()->flush();
    $this->assertTrue($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);
}
```
    
## softDestroy 根据主键 ID 软删除实体

``` php
public function testSoftDestroy(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    $this->assertFalse($post->softDeleted());
    $this->assertSame(1, Post::softDestroy([1]));
    $this->assertFalse($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);
}
```
    
## destroy 根据主键 ID 删除实体

``` php
public function testDestroy(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    Post::destroy([1]);

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);
}
```
    
## forceDestroy 根据主键 ID 强制删除实体

``` php
public function testForceDestroy(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    Post::forceDestroy([1]);

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);
}
```
    
## softRestore 恢复软删除的实体

``` php
public function testSoftRestore(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    $this->assertFalse($post->softDeleted());
    $post->softDelete()->flush();
    $this->assertTrue($post->softDeleted());

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $newPost = Post::withSoftDeleted()->findEntity(1);
    $this->assertTrue($newPost->softDeleted());
    $newPost->softRestore()->flush();
    $this->assertFalse($newPost->softDeleted());

    $restorePost1 = Post::select()->findEntity(1);
    $this->assertSame(0, $restorePost1->delete_at);

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(0, $post1->delete_at);
}
```
    
## delete 删除实体

``` php
public function testDelete(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    $this->assertFalse($post->softDeleted());
    $post->delete()->flush();
    $sql = 'SQL: [104] UPDATE `post` SET `post`.`delete_at` = :pdonamedparameter_delete_at WHERE `post`.`id` = :post_id LIMIT 1 | Params:  2 | Key: Name: [28] :pdonamedparameter_delete_at | paramno=0 | name=[28] ":pdonamedparameter_delete_at" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 (UPDATE `post` SET `post`.`delete_at` = %d WHERE `post`.`id` = 1 LIMIT 1)';
    $time = time();
    $this->assertTrue(in_array(Post::select()->getLastSql(), [
        \sql_pdo_param_compatible(sprintf($sql, $time)),
        \sql_pdo_param_compatible(sprintf($sql, $time - 1)),
        \sql_pdo_param_compatible(sprintf($sql, $time + 1)),
    ], true));
    $this->assertTrue($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);
}
```
    
## delete.condition 删除实体配合设置扩展查询条件

``` php
public function testDeleteWithCondition(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    $this->assertFalse($post->softDeleted());
    $post->condition(['user_id' => 99999])->delete()->flush();
    $sql = 'SQL: [141] UPDATE `post` SET `post`.`delete_at` = :pdonamedparameter_delete_at WHERE `post`.`user_id` = :post_user_id AND `post`.`id` = :post_id LIMIT 1 | Params:  3 | Key: Name: [28] :pdonamedparameter_delete_at | paramno=0 | name=[28] ":pdonamedparameter_delete_at" | is_param=1 | param_type=1 | Key: Name: [13] :post_user_id | paramno=1 | name=[13] ":post_user_id" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=2 | name=[8] ":post_id" | is_param=1 | param_type=1 (UPDATE `post` SET `post`.`delete_at` = %d WHERE `post`.`user_id` = 99999 AND `post`.`id` = 1 LIMIT 1)';
    $time = time();
    $this->assertTrue(in_array(Post::select()->getLastSql(), [
        \sql_pdo_param_compatible(sprintf($sql, $time)),
        \sql_pdo_param_compatible(sprintf($sql, $time - 1)),
        \sql_pdo_param_compatible(sprintf($sql, $time + 1)),
    ], true));
    $this->assertTrue($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(0, $post1->delete_at);

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(0, $post1->delete_at);
}
```
    
## delete 复合主键删除实体

``` php
public function testDeleteForCompositeId(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('composite_id')
            ->insert([
                'id1'  => 1,
                'id2'  => 2,
                'name' => 'hello liu',
            ])
    );

    $entity = CompositeId::select()->where(['id1' => 1, 'id2' => 2])->findOne();

    $this->assertInstanceof(CompositeId::class, $entity);
    $this->assertSame(1, $entity->id1);
    $this->assertSame(2, $entity->id2);
    $this->assertSame('hello liu', $entity->name);

    $entity->delete()->flush();

    $entity = CompositeId::select()->where(['id1' => 1, 'id2' => 2])->findOne();

    $this->assertInstanceof(CompositeId::class, $entity);
    $this->assertNull($entity->id1);
    $this->assertNull($entity->id2);
    $this->assertNull($entity->name);
}
```
    
## forceDelete 强制删除实体

``` php
public function testForceDelete(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    $this->assertFalse($post->softDeleted());
    $post->forceDelete()->flush();
    $this->assertSame(\sql_pdo_param_compatible('SQL: [55] DELETE FROM `post` WHERE `post`.`id` = :post_id LIMIT 1 | Params:  1 | Key: Name: [8] :post_id | paramno=0 | name=[8] ":post_id" | is_param=1 | param_type=1 (DELETE FROM `post` WHERE `post`.`id` = 1 LIMIT 1)'), Post::select()->getLastSql());
    $this->assertFalse($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);
}
```
    
## forceDelete.condition 强制删除实体配合设置扩展查询条件

``` php
public function testForceDeleteWithCondition(): void
{
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
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    $this->assertSame(1, $post->userId);
    $this->assertSame('hello world', $post->title);
    $this->assertSame('post summary', $post->summary);
    $this->assertSame(0, $post->delete_at);

    $this->assertFalse($post->softDeleted());
    $post->condition(['user_id' => 99999])->forceDelete()->flush();
    $this->assertSame(\sql_pdo_param_compatible('SQL: [92] DELETE FROM `post` WHERE `post`.`user_id` = :post_user_id AND `post`.`id` = :post_id LIMIT 1 | Params:  2 | Key: Name: [13] :post_user_id | paramno=0 | name=[13] ":post_user_id" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 (DELETE FROM `post` WHERE `post`.`user_id` = 99999 AND `post`.`id` = 1 LIMIT 1)'), Post::select()->getLastSql());
    $this->assertFalse($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(0, $post1->delete_at);

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    $this->assertSame(1, $post2->userId);
    $this->assertSame('hello world', $post2->title);
    $this->assertSame('post summary', $post2->summary);
    $this->assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->userId);
    $this->assertSame('hello world', $post1->title);
    $this->assertSame('post summary', $post1->summary);
    $this->assertSame(0, $post1->delete_at);
}
```