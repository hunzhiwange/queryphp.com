# 代码热重启进程

::: tip 单元测试即文档
[基于原始文档 tests/Protocol/Process/HotOverloadTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Protocol/Process/HotOverloadTest.php)
:::
    
监听某些目录，当代码发生变化，重启服务方便开发调试。

**引入相关类**

 * use Leevel\Option\Option;
 * use Leevel\Protocol\IServer;

## 测试代码热重启


``` php
public function testHotOverload(): void
{
    $option = new Option([
        'protocol' => [
            'hotoverload_delay_count'   => 1,
            'hotoverload_time_interval' => 50,
            'hotoverload_watch'         => [
                __DIR__,
                __DIR__.'/Fixtures/HotOverloadDemo.php',
            ],
        ],
    ]);

    $hotOverload = new HotOverloadDemo($option, $this);
    /** @var \Leevel\Protocol\IServer $server */
    $server = $this->createMock(IServer::class);
    $hotOverload->handle($server);

    $this->assertSame(1, 1);
}
```