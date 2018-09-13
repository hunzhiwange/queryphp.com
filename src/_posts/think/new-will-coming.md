title: QueryPHP V4.0 is comming !
date: 2017-08-05 09:15:06
---

See it.

``` php
<?php

declare(strict_types=1);

namespace Common\Domain\Entity;

use Leevel\Database\Ddd\Entity;

class Dream extends Entity
{
    const TABLE = 'test';
    const ID = 'id';
    const AUTO = 'id';
    const STRUCT = [
        'id' => [
            'name' => 'id',
        ],
        'name' => [
            'name'     => 'name',
            'readonly' => true,
        ],
    ];

    protected $id;
    protected $name;

    /**
     * The old dream of changing the world.
     *
     * @with  QueryPHP
     */
    public function changeTheWorld(): string
    {
        // Starts from this moment.
        return sprintf('Hi %s, remember your old dream?', $this->name);
    }
}
```