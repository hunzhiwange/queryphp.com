# hasMany 一对多关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/HasManyTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/HasManyTest.php)
:::
    
一对多的关联是一种常用的关联，比如一篇文章与文章评论属于一对多的关系。

**一对多关联支持类型关联项**

|  关联项   | 说明  |    例子   |
|  ----  | ----  | ----  |
| \Leevel\Database\Ddd\Entity::HAS_MANY  | 一对多关联实体 |  \Tests\Database\Ddd\Entity\Relation\Comment::class  |
| \Leevel\Database\Ddd\Entity::SOURCE_KEY  | 关联查询源键字段 | id |
| \Leevel\Database\Ddd\Entity::TARGET_KEY  | 关联目标键字段 | post_id |
| \Leevel\Database\Ddd\Entity::RELATION_SCOPE  | 关联查询作用域 | comment |


**Uses**

``` php
<?php

use Leevel\Collection\Collection;
use Leevel\Database\Ddd\Relation\HasMany;
use Leevel\Database\Ddd\Select;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Comment;
use Tests\Database\Ddd\Entity\Relation\Post;
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

**Tests\Database\Ddd\Entity\Relation\Comment**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class Comment extends Entity
{
    use GetterSetter;

    public const TABLE = 'comment';

    public const ID = 'id';

    public const AUTO = 'id';

    public const STRUCT = [
        'id'        => [],
        'title'     => [],
        'post_id'   => [],
        'content'   => [],
        'create_at' => [],
    ];
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

    for ($i = 0; $i < 10; $i++) {
        $connect
            ->table('comment')
            ->insert([
                'title'   => 'niu'.($i + 1),
                'post_id' => 1,
                'content' => 'Comment data.'.($i + 1),
            ]);
    }

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

    $comment = $post->comment;

    $this->assertInstanceof(Collection::class, $comment);

    $n = 0;

    foreach ($comment as $k => $v) {
        $id = (int) ($n + 5);

        $this->assertInstanceOf(Comment::class, $v);
        $this->assertSame($n, $k);
        $this->assertSame($id, (int) $v->id);
        $this->assertSame($id, (int) $v['id']);
        $this->assertSame($id, (int) $v->getId());
        $this->assertSame('niu'.$id, $v['title']);
        $this->assertSame('niu'.$id, $v->title);
        $this->assertSame('niu'.$id, $v->getTitle());
        $this->assertSame('Comment data.'.$id, $v['content']);
        $this->assertSame('Comment data.'.$id, $v->content);
        $this->assertSame('Comment data.'.$id, $v->getContent());

        $n++;
    }

    $this->assertCount(6, $comment);
}
```
    
## eager 预加载关联

``` php
public function testEager(): void
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
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'foo bar',
                'user_id'   => 1,
                'summary'   => 'Say foo to the bar.',
                'delete_at' => 0,
            ]),
    );

    for ($i = 0; $i < 10; $i++) {
        $connect
            ->table('comment')
            ->insert([
                'title'   => 'niu'.($i + 1),
                'post_id' => 1,
                'content' => 'Comment data.'.($i + 1),
            ]);
    }

    for ($i = 0; $i < 10; $i++) {
        $connect
            ->table('comment')
            ->insert([
                'title'   => 'niu'.($i + 1),
                'post_id' => 2,
                'content' => 'Comment data.'.($i + 1),
            ]);
    }

    $posts = Post::eager(['comment'])->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(2, $posts);

    $min = 5;

    foreach ($posts as $k => $value) {
        $comments = $value->comment;

        $this->assertInstanceof(Collection::class, $comments);
        $this->assertSame(0 === $k ? 6 : 10, count($comments));

        foreach ($comments as $comment) {
            $this->assertInstanceof(Comment::class, $comment);
            $this->assertSame($min, $comment->id);
            $min++;
        }
    }
}
```
    
## eager 预加载关联支持查询条件过滤

``` php
public function testEagerWithCondition(): void
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
        2,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'foo bar',
                'user_id'   => 1,
                'summary'   => 'Say foo to the bar.',
                'delete_at' => 0,
            ]),
    );

    for ($i = 0; $i < 10; $i++) {
        $connect
            ->table('comment')
            ->insert([
                'title'   => 'niu'.($i + 1),
                'post_id' => 1,
                'content' => 'Comment data.'.($i + 1),
            ]);
    }

    for ($i = 0; $i < 10; $i++) {
        $connect
            ->table('comment')
            ->insert([
                'title'   => 'niu'.($i + 1),
                'post_id' => 2,
                'content' => 'Comment data.'.($i + 1),
            ]);
    }

    $posts = Post::eager(['comment' => function ($select) {
        $select->where('id', '>', 99999);
    }])->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(2, $posts);

    foreach ($posts as $k => $value) {
        $comments = $value->comment;
        $this->assertInstanceof(Collection::class, $comments);
        $this->assertCount(0, $comments);
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

    for ($i = 0; $i < 10; $i++) {
        $connect
            ->table('comment')
            ->insert([
                'title'   => 'niu'.($i + 1),
                'post_id' => 1,
                'content' => 'Comment data.'.($i + 1),
            ]);
    }

    $commentRelation = Post::make()->relation('comment');

    $this->assertInstanceof(HasMany::class, $commentRelation);
    $this->assertSame('id', $commentRelation->getSourceKey());
    $this->assertSame('post_id', $commentRelation->getTargetKey());
    $this->assertInstanceof(Post::class, $commentRelation->getSourceEntity());
    $this->assertInstanceof(Comment::class, $commentRelation->getTargetEntity());
    $this->assertInstanceof(Select::class, $commentRelation->getSelect());
}
```
    
## relation 关联模型数据不存在返回空集合

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
                'user_id'   => 1,
                'summary'   => 'Say hello to the world.',
                'delete_at' => 0,
            ]),
    );

    for ($i = 0; $i < 10; $i++) {
        $connect
            ->table('comment')
            ->insert([
                'title'   => 'niu'.($i + 1),
                'post_id' => 2,
                'content' => 'Comment data.'.($i + 1),
            ]);
    }

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

    $comment = $post->comment;

    $this->assertInstanceof(Collection::class, $comment);
    $this->assertCount(0, $comment);
}
```