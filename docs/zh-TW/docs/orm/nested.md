# nested 嵌套预加载关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/NestedTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/NestedTest.php)
:::
    
预加载关联可以减少查询，并且支持嵌套，通过 `.` 分隔嵌套关联。


**Uses**

``` php
<?php

use Leevel\Collection\Collection;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\Role;
use Tests\Database\Ddd\Entity\Relation\User;
use Tests\Database\Ddd\Entity\Relation\UserRole;
```

## 基本使用方法

**fixture 定义**

**Tests\Database\Ddd\Entity\Relation\Post**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Relation\Relation;

class Post extends Entity
{
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

    private array $data = [];

    private static ?string $connect = null;

    public function setter(string $prop, $value): self
    {
        $this->data[$this->realProp($prop)] = $value;

        return $this;
    }

    public function getter(string $prop)
    {
        return $this->data[$this->realProp($prop)] ?? null;
    }

    public static function withConnect(?string $connect = null): void
    {
        static::$connect = $connect;
    }

    public static function connect(): ?string
    {
        return static::$connect;
    }

    protected function relationScopeComment(Relation $relation): void
    {
        $relation->where('id', '>', 4);
    }
}
```

**Tests\Database\Ddd\Entity\Relation\UserRole**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;

class UserRole extends Entity
{
    const TABLE = 'user_role';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'        => [],
        'user_id'   => [],
        'role_id'   => [],
        'create_at' => [],
    ];

    private array $data = [];

    private static ?string $connect = null;

    public function setter(string $prop, $value): self
    {
        $this->data[$this->realProp($prop)] = $value;

        return $this;
    }

    public function getter(string $prop)
    {
        return $this->data[$this->realProp($prop)] ?? null;
    }

    public static function withConnect(?string $connect = null): void
    {
        static::$connect = $connect;
    }

    public static function connect(): ?string
    {
        return static::$connect;
    }
}
```

**Tests\Database\Ddd\Entity\Relation\Role**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;

class Role extends Entity
{
    const TABLE = 'role';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'        => [],
        'name'      => [],
        'create_at' => [],
    ];

    private array $data = [];

    private static ?string $connect = null;

    public function setter(string $prop, $value): self
    {
        $this->data[$this->realProp($prop)] = $value;

        return $this;
    }

    public function getter(string $prop)
    {
        return $this->data[$this->realProp($prop)] ?? null;
    }

    public static function withConnect(?string $connect = null): void
    {
        static::$connect = $connect;
    }

    public static function connect(): ?string
    {
        return static::$connect;
    }
}
```


``` php
public function testBase(): void
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
                ]));
    }

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]));

    $this->assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ]));

    $this->assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ]));

    $this->assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ]));

    $this->assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ]));

    $this->assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ]));

    $posts = Post::eager(['user.role'])
        ->limit(5)
        ->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(5, $posts);

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

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);

    $user1 = $role[0];

    $this->assertInstanceof(Role::class, $user1);
    $this->assertSame(1, $user1->id);
    $this->assertSame(1, $user1['id']);
    $this->assertSame(1, $user1->getId());
    $this->assertSame('管理员', $user1->name);
    $this->assertSame('管理员', $user1['name']);
    $this->assertSame('管理员', $user1->getName());

    $user2 = $role[1];
    $this->assertInstanceof(Role::class, $user2);
    $this->assertSame(3, $user2->id);
    $this->assertSame(3, $user2['id']);
    $this->assertSame(3, $user2->getId());
    $this->assertSame('会员', $user2->name);
    $this->assertSame('会员', $user2['name']);
    $this->assertSame('会员', $user2->getName());

    $this->assertCount(2, $role);
    $this->assertSame(1, $role[0]['id']);
    $this->assertSame('管理员', $role[0]['name']);
    $this->assertSame(3, $role[1]['id']);
    $this->assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(3, $middle->roleId);
}
```