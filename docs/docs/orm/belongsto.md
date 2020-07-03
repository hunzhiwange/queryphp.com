# belongsTo 从属关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/BelongsToTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/BelongsToTest.php)
:::
    
从属关联也是一对一的关联的一种，比如一篇文章属于某个用户发表。

**从属关联支持类型关联项**

|  关联项   | 说明  |    例子   |
|  ----  | ----  | ----  |
| \Leevel\Database\Ddd\Entity::BELONGS_TO  | 从属关联实体 |  \Tests\Database\Ddd\Entity\Relation\User::class  |
| \Leevel\Database\Ddd\Entity::SOURCE_KEY  | 关联查询源键字段 | user_id |
| \Leevel\Database\Ddd\Entity::TARGET_KEY  | 关联目标键字段 | id |
| \Leevel\Database\Ddd\Entity::RELATION_SCOPE  | 关联查询作用域 | foo |


**Uses**

``` php
<?php

use Leevel\Collection\Collection;
use Leevel\Database\Ddd\Relation\BelongsTo;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Database\Ddd\Select;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\User;
```

## 基本使用方法

**fixture 定义**

**Tests\Database\Ddd\Entity\Relation\Post**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;
use Leevel\Database\Ddd\Relation\Relation;

class Post extends Entity
{
    use GetterSetter;

    const TABLE = 'post';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
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

    const DELETE_AT = 'delete_at';

    protected function relationScopeComment(Relation $relation): void
    {
        $relation->where('id', '>', 4);
    }
}
```

**Tests\Database\Ddd\Entity\Relation\User**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;
use Leevel\Database\Ddd\Relation\ManyMany;

class User extends Entity
{
    use GetterSetter;

    const TABLE = 'user';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'        => [],
        'name'      => [],
        'create_at' => [],
        'role'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_soft_deleted'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_middle_with_soft_deleted'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'withSoftDeleted',
        ],
        'role_middle_only_soft_deleted'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'onlySoftDeleted',
        ],
        'role_relation_scope_not_found'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'notFound',
        ],
        'role_relation_scope_found_but_private'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'foundButPrivate',
        ],
        'role_not_defined_middle_entity'      => [
            self::MANY_MANY         => Role::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_not_defined_source_key'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_not_defined_target_key'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_not_defined_middle_source_key'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_not_defined_middle_target_key'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
        ],
        'role_middle_field'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'middleField',
        ],
    ];

    protected function relationScopeWithSoftDeleted(ManyMany $relation): void
    {
        $relation->middleWithSoftDeleted();
    }

    protected function relationScopeOnlySoftDeleted(ManyMany $relation): void
    {
        $relation->middleOnlySoftDeleted();
    }

    protected function relationScopeMiddleField(ManyMany $relation): void
    {
        $relation->middleField(['create_at', 'middle_id' => 'id']);
    }

    private function relationScopeFoundButPrivate(ManyMany $relation): void
    {
    }
}
```


``` php
public function testBaseUse(): void
{
    $post = Post::select()->where('id', 1)->findOne();

    $this->assertInstanceof(Post::class, $post);
    $this->assertNull($post->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'Say hello to the world.',
                'delete_at' => 0,
            ]),
    );

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]),
    );

    $post = Post::select()->where('id', 1)->findOne();

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(1, $post->user_id);
    $this->assertSame(1, $post->userId);
    $this->assertSame(1, $post['user_id']);
    $this->assertSame(1, $post->getUserId());
    $this->assertSame('hello world', $post->title);
    $this->assertSame('hello world', $post['title']);
    $this->assertSame('hello world', $post->getTitle());
    $this->assertSame('Say hello to the world.', $post->summary);
    $this->assertSame('Say hello to the world.', $post['summary']);
    $this->assertSame('Say hello to the world.', $post->getSummary());

    $user = $post->user;

    $this->assertInstanceof(User::class, $user);
    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());
}
```
    
## eager 预加载关联

``` php
public function testEager(): void
{
    $posts = Post::select()->limit(5)->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(0, $posts);

    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i <= 5; $i++) {
        $this->assertSame(
            $i + 1,
            $connect
                ->table('post')
                ->insert([
                    'title'     => 'hello world',
                    'user_id'   => 1,
                    'summary'   => 'Say hello to the world.',
                    'delete_at' => 0,
                ]),
        );
    }

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]),
    );

    $posts = Post::eager(['user'])
        ->limit(5)
        ->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(5, $posts);

    foreach ($posts as $value) {
        $user = $value->user;

        $this->assertInstanceof(User::class, $user);
        $this->assertSame(1, $user->id);
        $this->assertSame('niu', $user->name);
    }
}
```
    
## eager 预加载关联支持查询条件过滤

``` php
public function testEagerWithCondition(): void
{
    $posts = Post::select()->limit(5)->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(0, $posts);

    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i <= 5; $i++) {
        $this->assertSame(
            $i + 1,
            $connect
                ->table('post')
                ->insert([
                    'title'     => 'hello world',
                    'user_id'   => 1,
                    'summary'   => 'Say hello to the world.',
                    'delete_at' => 0,
                ]),
        );
    }

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]),
    );

    $posts = Post::eager(['user' => function (Relation $select) {
        $select->where('id', '>', 99999);
    }])
        ->limit(5)
        ->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(5, $posts);

    foreach ($posts as $value) {
        $user = $value->user;
        $this->assertInstanceof(User::class, $user);
        $this->assertNotSame(1, $user->id);
        $this->assertNotSame('niu', $user->name);
        $this->assertNull($user->id);
        $this->assertNull($user->name);
    }
}
```
    
## relation 读取关联

``` php
public function testRelationAsMethod(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'Say hello to the world.',
                'delete_at' => 0,
            ]),
    );

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]),
    );

    $userRelation = Post::make()->relation('user');

    $this->assertInstanceof(BelongsTo::class, $userRelation);
    $this->assertSame('user_id', $userRelation->getSourceKey());
    $this->assertSame('id', $userRelation->getTargetKey());
    $this->assertInstanceof(Post::class, $userRelation->getSourceEntity());
    $this->assertInstanceof(User::class, $userRelation->getTargetEntity());
    $this->assertInstanceof(Select::class, $userRelation->getSelect());
}
```
    
## relation 关联模型数据不存在返回空实体

``` php
public function testRelationDataWasNotFound(): void
{
    $post = Post::select()->where('id', 1)->findOne();

    $this->assertInstanceof(Post::class, $post);
    $this->assertNull($post->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 99999,
                'summary'   => 'Say hello to the world.',
                'delete_at' => 0,
            ]),
    );

    $post = Post::select()->where('id', 1)->findOne();

    $this->assertSame(1, $post->id);
    $this->assertSame(1, $post['id']);
    $this->assertSame(1, $post->getId());
    $this->assertSame(99999, $post->user_id);
    $this->assertSame(99999, $post->userId);
    $this->assertSame(99999, $post['user_id']);
    $this->assertSame(99999, $post->getUserId());
    $this->assertSame('hello world', $post->title);
    $this->assertSame('hello world', $post['title']);
    $this->assertSame('hello world', $post->getTitle());
    $this->assertSame('Say hello to the world.', $post->summary);
    $this->assertSame('Say hello to the world.', $post['summary']);
    $this->assertSame('Say hello to the world.', $post->getSummary());

    $user = $post->user;

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);
    $this->assertNull($user['id']);
    $this->assertNull($user->getId());
    $this->assertNull($user->name);
    $this->assertNull($user['name']);
    $this->assertNull($user->getName());
}
```