# 关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/RelationTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/RelationTest.php)
:::
    
将相关实体连接起来，可以更加方便地操作数据。

**关联支持类型**

|  关联类型   | 说明  |
|  ----  | ----  |
| belongsTo  | 从属关联 |
| hasOne  | 一对一关联 |
| hasMany  | 一对多关联 |
| manyMany  | 多对多关联 |


**Uses**

``` php
<?php

use Exception;
use Leevel\Database\Ddd\Relation\HasOne;
use Leevel\Database\Ddd\Relation\Relation;
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