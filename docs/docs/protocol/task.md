# 投递任务

::: tip Testing Is Documentation
[tests/Protocol/TaskTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Protocol/TaskTest.php)
:::
    
任务投递是对 Swoole 官方的简单封装。

**Uses**

 * use Leevel\Protocol\Task;
 * use Swoole\Process;
 * use Swoole\Server;
 * use Throwable;

## 投递异步任务

投递单个异步任务。

``` php
public function testTask(): void
{
    $process = new Process(function (Process $worker) {
        try {
            $swooleServer = new Server('127.0.0.1', 10000);
            $swooleServer->set([
                'worker_num'      => 1,
                'task_worker_num' => 1,
            ]);
            $swooleServer->on('Start', function (Server $server) use ($worker) {
            });
            $swooleServer->on('Receive', function ($req, $rep) {
            });
            $swooleServer->on('Task', function (Server $serv, $task_id, $from_id, $data) {
            });
            $task = new Task($swooleServer);
            $task->task('taskWillNotRun');
        } catch (Throwable $exception) {
            $worker->write('Exception Thrown: '.$exception->getMessage());
        }
        $worker->exit();
    });
    $process->start();
    $output = $process->read();
    Process::wait(true);

    $this->assertSame('Exception Thrown: Swoole\\Server::task(): server is not running', $output);
}
```
    
## 并发执行任务并进行协程调度

支持多个任务并发执行，底层进行协程调度。

``` php
public function testTaskCo(): void
{
    $process = new Process(function (Process $worker) {
        try {
            $swooleServer = new Server('127.0.0.1', 10000);
            $swooleServer->set([
                'worker_num'      => 1,
                'task_worker_num' => 1,
            ]);
            $swooleServer->on('Start', function (Server $server) use ($worker) {
            });
            $swooleServer->on('Receive', function ($req, $rep) {
            });
            $swooleServer->on('Task', function (Server $serv, $task_id, $from_id, $data) {
            });
            $task = new Task($swooleServer);
            $task->taskCo(['taskWillNotRun']);
        } catch (Throwable $exception) {
            $worker->write('Exception Thrown: '.$exception->getMessage());
        }
        $worker->exit();
    });
    $process->start();
    $output = $process->read();
    Process::wait(true);

    $this->assertSame('Exception Thrown: Swoole\\Server::taskCo(): server is not running', $output);
}
```