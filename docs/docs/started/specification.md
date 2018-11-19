# 开发规范

`QueryPHP` 遵循 `PSR-2` 命名规范和 `PSR-4` 自动加载规范。

## 文件和目录

PSR-4 基础目录使用小写，其它依次使用大驼峰法命名，例如。

```
/data/codes/queryphp/application/app/Domain/Entity/
/data/codes/queryphp/application/app/Domain/Entity/Test.php
```

其中 composer 配置

```
"autoload": {
    "psr-4": {
        "App\\" : "application/app",
        "Admin\\" : "application/admin",
        "Common\\" : "common"
    }
}
```

不存在类文件，请使用小写目录，其文件也一样:

```
/data/codes/queryphp/option/
/data/codes/queryphp/option/app.php
```

## 统一代码风格

为了屏蔽不同用户的不同代码风格习惯，QueryPHP 设置一个统一的代码格式化配置来规范团队的代码风格，这符合 `PSR-2` 规范并且可以通过 `StyleCI` 规范。

### 手工优化

在使用前您需要安装 [php-cs-fixer](http://cs.sensiolabs.org/)，这样子才能够进行下面的工作。

```
/data/codes/queryphp/.php_cs.dist # 应用
/data/codes/queryphp/vendor/hunzhiwange/framework/.php_cs.dist # 框架核心包
```

可以通过下面的方式来格式化代码风格:

```
$cd /data/codes/queryphp
$php-cs-fixer fix --config=.php_cs.dist
```

### 结合 `Git` Hooks 结合来格式化代码：

```
/data/codes/queryphp/build/pre-commit.sh
/data/codes/queryphp/vendor/hunzhiwange/framework/build/pre-commit.sh
```

应用脚本 `/data/codes/queryphp/build/pre-commit.sh`

::: warning
这里脚本也包含一段 JS 的脚本，这个用于格式化 QueryPHP 的通用前端后台的 JS 代码风格，跟 PHP 差不多。
:::

``` sh
#!/bin/bash
#
# check PHP code syntax error and standard with phpcs
# https://blog.csdn.net/xsgnzb/article/details/52222366?locationNum=4&fps=1
# https://blog.csdn.net/ljihe/article/details/80826071
# =================== how to use ====================
# ln -s pre-commit.sh ./../.git/hooks/pre-commit
# git commit -h
# git commit -n -m 'pass hook' #bypass pre-commit and commit-msg hooks
# ==================== end ==========================

PROJECT=$(git rev-parse --show-toplevel)
cd $PROJECT
SFILES=$(git diff --cached --name-only --diff-filter=ACMR HEAD | grep \\.php)

# Determine if a file list is passed
if [ "$#" -ne 0 ]
then
    exit 0
fi

echo "Checking PHP Lint..."

for FILE in $SFILES
do
    php -l -d display_errors=0 $FILE
    if [ $? != 0 ]
    then
        echo "Fix the php error before commit."
        exit 1
    fi
    FILES="$FILES $PROJECT/$FILE"
done

# format code style
if [ "$FILES" != "" ]
then
    echo "Running Code Sniffer..."

    isCheck=""

    for FILE in $SFILES
    do
        result=`~/.composer/vendor/bin/php-cs-fixer fix $FILE --config=.php_cs.dist`

        if [ "$result" != "" ]
        then
            echo $result
            isCheck=$result
            git add $FILE
        fi
    done

    if [ "$isCheck" != "" ]
    then
        echo "The file has been automatically formatted."
    fi
fi

# for js
jsfiles=$(git diff --cached --name-only --diff-filter=ACM "*.js" "*.jsx" "*.vue" "*.css" "*.less" | tr '\n' ' ')
[ -z "$jsfiles" ] && exit 0

# Prettify all staged .js files
echo "$jsfiles" | xargs ./frontend/node_modules/.bin/prettier --config frontend/.prettierrc.js --ignore-path frontend/.prettierignore --write

# Add back the modified/prettified files to staging
echo "$jsfiles" | xargs git add

git update-index -g

exit $?
```

核心包脚本 `/data/codes/queryphp/build/pre-commit.sh`

``` sh
#!/bin/bash
#
# check PHP code syntax error and standard with phpcs
# https://blog.csdn.net/xsgnzb/article/details/52222366?locationNum=4&fps=1
# https://blog.csdn.net/ljihe/article/details/80826071
# =================== how to use ====================
# ln -s pre-commit.sh ./../.git/hooks/pre-commit
# git commit -h
# git commit -n -m 'pass hook' #bypass pre-commit and commit-msg hooks
# ==================== end ==========================

PROJECT=$(git rev-parse --show-toplevel)
cd $PROJECT
SFILES=$(git diff --cached --name-only --diff-filter=ACMR HEAD | grep \\.php)

# Determine if a file list is passed
if [ "$#" -ne 0 ]
then
    exit 0
fi

echo "Checking PHP Lint..."

for FILE in $SFILES
do
    php -l -d display_errors=0 $FILE
    if [ $? != 0 ]
    then
        echo "Fix the php error before commit."
        exit 1
    fi
    FILES="$FILES $PROJECT/$FILE"
done

# format code style
if [ "$FILES" != "" ]
then
    echo "Running Code Sniffer..."

    isCheck=""

    for FILE in $SFILES
    do
        result=`~/.composer/vendor/bin/php-cs-fixer fix $FILE --config=.php_cs.dist`

        if [ "$result" != "" ]
        then
            echo $result
            isCheck=$result
            git add $FILE
        fi
    done

    if [ "$isCheck" != "" ]
    then
        echo "The file has been automatically formatted."
    fi
fi

git update-index -g

exit $?
```

### Git Commit

```
git commit -m 'pass hook'
```

上述脚本就会自动运行帮助你格式化代码,你也可以忽略脚本。

```
git commit -n -m 'pass hook'
```

这样子我们再也不需要浪费时间在无意义的代码风格的讨论上了。
