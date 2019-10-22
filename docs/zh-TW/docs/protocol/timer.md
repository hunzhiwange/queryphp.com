# 毫秒定时器

::: tip 单元测试即文档
[基于原始文档 tests/Protocol/TimerTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Protocol/TimerTest.php)
:::
    
毫秒定时器是对 Swoole 官方的简单封装。

**引入相关类**

 * use Exception;
 * use Leevel\Log\ILog;
 * use Leevel\Protocol\Timer;

## 执行任务

执行任务过程中不抛出异常则为一次通过，有异常支持重试。

``` php
public function testTimer(): void
{
    /** @var \Leevel\Log\ILog $log */
    $log = $this->createMock(ILog::class);
    $timer = new Timer($log);
    $errorCount = 0;
    $taskLog = __DIR__.'/task.log';

    $timer->work(function () use (&$errorCount, $taskLog): void {
        $errorCount++;
        file_put_contents($taskLog, '.count '.$errorCount, FILE_APPEND);

        if (1 === $errorCount) {
            defer(function () use ($taskLog) {
                $this->assertSame('.count 1', file_get_contents($taskLog));
                unlink($taskLog);
            });
        }
    }, 10, 5);

    $this->assertSame(1, 1);
}
```
    

## 执行任务失败重试

执行任务过程中抛出异常则为失败，失败会支持重试，到达次数后将丢弃。

``` php
public function testTimerError(): void
{
    /** @var \Leevel\Log\ILog $log */
    $log = $this->createMock(ILog::class);
    $timer = new Timer($log);
    $errorCount = 0;
    $taskLog = __DIR__.'/taskError.log';

    $timer->work(function () use (&$errorCount, $taskLog): void {
        $errorCount++;
        file_put_contents($taskLog, '.count '.$errorCount, FILE_APPEND);

        if (5 === $errorCount) {
            defer(function () use ($taskLog) {
                $this->assertSame('.count 1.count 2.count 3.count 4.count 5', file_get_contents($taskLog));
                unlink($taskLog);
            });
        }

        throw new Exception('Failed test');
    }, 10, 5);

    $this->assertSame(1, 1);
}
```