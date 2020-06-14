# 实体事件

::: tip Testing Is Documentation
[tests/Database/Ddd/EntityEventTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/EntityEventTest.php)
:::
    
实体在新增和更新时，预植了事件监听器，可以定义一些事件。


**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Leevel\Di\Container;
use Leevel\Event\Dispatch;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\DemoEventEntity;
```

## 事件基本使用方法

``` php
public function testBaseUse(): void
{
    $dispatch = new Dispatch(new Container());
    $this->assertNull(Entity::eventDispatch());
    Entity::withEventDispatch($dispatch);
    $this->assertInstanceof(Dispatch::class, Entity::eventDispatch());

    $test = new DemoEventEntity(['name' => 'foo']);
    DemoEventEntity::event(Entity::BEFORE_CREATE_EVENT, function () {
        $_SERVER['ENTITY.BEFORE_CREATE_EVENT'] = 'BEFORE_CREATE_EVENT';
    });
    DemoEventEntity::event(Entity::AFTER_CREATE_EVENT, function () {
        $_SERVER['ENTITY.AFTER_CREATE_EVENT'] = 'AFTER_CREATE_EVENT';
    });

    $this->assertFalse(isset($_SERVER['ENTITY.BEFORE_CREATE_EVENT']));
    $this->assertFalse(isset($_SERVER['ENTITY.AFTER_CREATE_EVENT']));

    $test->create()->flush();

    $this->assertTrue(isset($_SERVER['ENTITY.BEFORE_CREATE_EVENT']));
    $this->assertTrue(isset($_SERVER['ENTITY.AFTER_CREATE_EVENT']));
    $this->assertSame('BEFORE_CREATE_EVENT', $_SERVER['ENTITY.BEFORE_CREATE_EVENT']);
    $this->assertSame('AFTER_CREATE_EVENT', $_SERVER['ENTITY.AFTER_CREATE_EVENT']);

    unset($_SERVER['ENTITY.BEFORE_CREATE_EVENT'], $_SERVER['ENTITY.AFTER_CREATE_EVENT']);
}
```
    
## 实体支持的事件

``` php
# Tests\Database\Ddd\EntityEventTest::getSupportedEvent
public function getSupportedEvent()
{
    return [
        [Entity::BEFORE_SAVE_EVENT],
        [Entity::AFTER_SAVE_EVENT],
        [Entity::BEFORE_CREATE_EVENT],
        [Entity::AFTER_CREATE_EVENT],
        [Entity::BEFORE_UPDATE_EVENT],
        [Entity::AFTER_UPDATE_EVENT],
        [Entity::BEFORE_DELETE_EVENT],
        [Entity::AFTER_DELETE_EVENT],
        [Entity::BEFORE_SOFT_DELETE_EVENT],
        [Entity::AFTER_SOFT_DELETE_EVENT],
        [Entity::BEFORE_SOFT_RESTORE_EVENT],
        [Entity::AFTER_SOFT_RESTORE_EVENT],
    ];
}
```


``` php
public function testSupportEvent($event): void
{
    $dispatch = new Dispatch(new Container());
    $this->assertNull(Entity::eventDispatch());
    Entity::withEventDispatch($dispatch);
    $this->assertInstanceof(Dispatch::class, Entity::eventDispatch());

    $supportEvent = DemoEventEntity::supportEvent();
    $this->assertTrue(in_array($event, $supportEvent, true));
}
```
    
## 不受支持的事件

``` php
public function testEventWasNotSupport(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('Event `not_support` do not support.');

    $dispatch = new Dispatch(new Container());
    $this->assertNull(Entity::eventDispatch());
    Entity::withEventDispatch($dispatch);
    $this->assertInstanceof(Dispatch::class, Entity::eventDispatch());
    DemoEventEntity::event('not_support', function () {
    });
}
```