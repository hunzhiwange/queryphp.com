# hasOne 一对一关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/HasOneTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/HasOneTest.php)
:::
    
一对一的关联是一种常用的关联，比如一篇文章与文章内容属于一对一的关系。

**一对一关联支持类型关联项**

|  关联项   | 说明  |    例子   |
|  ----  | ----  | ----  |
| \Leevel\Database\Ddd\Entity::HAS_ONE  | 一对一关联实体 |  \Tests\Database\Ddd\Entity\Relation\PostContent::class  |
| \Leevel\Database\Ddd\Entity::SOURCE_KEY  | 关联查询源键字段 | id |
| \Leevel\Database\Ddd\Entity::TARGET_KEY  | 关联目标键字段 | post_id |
| \Leevel\Database\Ddd\Entity::RELATION_SCOPE  | 关联查询作用域 | foo |


**Uses**

``` php
<?php

use Leevel\Collection\Collection;
use Leevel\Database\Ddd\Relation\HasOne;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Database\Ddd\Select;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\PostContent;
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

**Tests\Database\Ddd\Entity\Relation\PostContent**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class PostContent extends Entity
{
    use GetterSetter;

    const TABLE = 'post_content';

    const ID = null;

    const AUTO = null;

    const STRUCT = [
        'post_id' => [
            self::READONLY => true,
        ],
        'content' => [],
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
            ]));

    $this->assertSame(
        1,
        $connect
            ->table('post_content')
            ->insert([
                'post_id' => 1,
                'content' => 'I am content with big data.',
            ]));

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

    $postContent = $post->postContent;

    $this->assertInstanceof(PostContent::class, $postContent);
    $this->assertSame(1, $postContent->post_id);
    $this->assertSame(1, $postContent->postId);
    $this->assertSame(1, $postContent['post_id']);
    $this->assertSame(1, $postContent['postId']);
    $this->assertSame(1, $postContent->getPostId());
    $this->assertSame('I am content with big data.', $postContent->content);
    $this->assertSame('I am content with big data.', $postContent['content']);
    $this->assertSame('I am content with big data.', $postContent->getContent());
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

        $this->assertSame(
            1,
            $connect
                ->table('post_content')
                ->insert([
                    'post_id' => $i + 1,
                    'content' => 'I am content with big data.',
                ]));
    }

    $posts = Post::eager(['post_content'])->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(6, $posts);

    foreach ($posts as $value) {
        $postContent = $value->postContent;

        $this->assertInstanceof(PostContent::class, $postContent);
        $this->assertSame($value->id, $postContent->postId);
        $this->assertSame('I am content with big data.', $postContent->content);
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

        $this->assertSame(
            1,
            $connect
                ->table('post_content')
                ->insert([
                    'post_id' => $i + 1,
                    'content' => 'I am content with big data.',
                ]));
    }

    $posts = Post::eager(['post_content' => function (Relation $select) {
        $select->where('post_id', '>', 99999);
    }])->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    $this->assertCount(6, $posts);

    foreach ($posts as $value) {
        $postContent = $value->postContent;
        $this->assertInstanceof(PostContent::class, $postContent);
        $this->assertNotSame($value->id, $postContent->postId);
        $this->assertNotSame('I am content with big data.', $postContent->content);
        $this->assertNull($postContent->postId);
        $this->assertNull($postContent->content);
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
            ]));

    $this->assertSame(
        1,
        $connect
            ->table('post_content')
            ->insert([
                'post_id' => 1,
                'content' => 'I am content with big data.',
            ]));

    $postContentRelation = Post::make()->relation('postContent');

    $this->assertInstanceof(HasOne::class, $postContentRelation);
    $this->assertSame('id', $postContentRelation->getSourceKey());
    $this->assertSame('post_id', $postContentRelation->getTargetKey());
    $this->assertInstanceof(Post::class, $postContentRelation->getSourceEntity());
    $this->assertInstanceof(PostContent::class, $postContentRelation->getTargetEntity());
    $this->assertInstanceof(Select::class, $postContentRelation->getSelect());
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
                'user_id'   => 1,
                'summary'   => 'Say hello to the world.',
                'delete_at' => 0,
            ]));

    $this->assertSame(
        1,
        $connect
            ->table('post_content')
            ->insert([
                'post_id' => 5,
                'content' => 'I am content with big data.',
            ]));

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

    $postContent = $post->postContent;

    $this->assertInstanceof(PostContent::class, $postContent);
    $this->assertNull($postContent->post_id);
    $this->assertNull($postContent->postId);
    $this->assertNull($postContent['post_id']);
    $this->assertNull($postContent['postId']);
    $this->assertNull($postContent->getPostId());
    $this->assertNull($postContent->content);
    $this->assertNull($postContent['content']);
    $this->assertNull($postContent->getContent());
}
```