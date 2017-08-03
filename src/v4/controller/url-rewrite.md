
---
title: url.重写
type: v4
order: 37
---

通常的 URL 里面含有 index.php，为了达到更好的 SEO 效果可能需要去掉URL里面的 index.php ，通过 URL 重写的方式可以达到这种效果，通常需要服务器支持。

测试环境为 Win7 ,使用的是 xampp-win32-5.6.21 集成环境，自带 Apache 服务器，安装目录为 D:\xampp\ 。

# 1）：Apache 服务器
配置 .htaccess 文件放到 index.php 的同级目录下

``` html
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
</IfModule>
```

修改 D:/xampp/apache/conf/httpd.conf 中，搜索 LoadModule rewrite_module modules/mod_rewrite.so

``` html
#LoadModule rewrite_module modules/mod_rewrite.so
```

去掉前面的 #

``` html
LoadModule rewrite_module modules/mod_rewrite.so
```

搜索 <Directory />

``` html
<Directory />
Options FollowSymLinks
AllowOverride None
</Directory>
```

AllowOverride None 改为 AllowOverride All

``` html
<Directory />
Options FollowSymLinks
AllowOverride All
</Directory>
```

# 2）：Nginx 服务器

### xampp 安装 Nginx
打开控制台，关闭 xampp 的 apache 服务, Nginx 也使用 80 端口，这里我们下载一个 nginx-v1.10.2 解压到 D:\xampp\nginx

为了启动 Nginx，我们需要允许 php 以 cgi 方式执行，为了不影响 Apache 的配置，复制 D:\xampp\php\php.ini 至 D:\xampp\php\php-nginx.ini，并修改配置如下：

``` html
enable_dl = On
cgi.force_redirect = 0
cgi.fix_pathinfo=1
fastcgi.impersonate = 1
cgi.rfc2616_headers = 1
```

CMD 运行 php-cgi

``` html
D:\xampp\php\php-cgi.exe -b 127.0.0.1:9000 -c D:\xampp\php\php-cli.ini 
```

> 注意：如果报错，请换一个端口将 9000 改为 9001 等然后再次运行。

CMD 运行 Nginx

``` html
切换到目录
D:\xampp\nginx>

执行
D:\xampp\nginx>nginx
```

注意：然后访问 localhost 可以看到 Nginx 是否已经运行。

停止 Nginx 可以运行

``` html
taskkill /F /IM nginx.exe > nul
taskkill /F /IM php-cgi.exe > nul
```

### path_info 支持
打开配置文件 D:/xampp/nginx/conf/nginx.conf 搜索 #location ~ \.php

``` html
# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
#
#location ~ \.php$ {
#    root           html;
#    fastcgi_pass   127.0.0.1:9000;
#    fastcgi_index  index.php;
#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
#    include        fastcgi_params;
#}
```

修改为

``` html
location ~ \.php {
    # path_info 支持
    set $path_info "";
    set $real_script_name $fastcgi_script_name;
    if ($fastcgi_script_name ~ "^(.+?\.php)(/.+)$") {
          set $real_script_name $1;
          set $path_info $2;
    }
    fastcgi_param SCRIPT_FILENAME $document_root$real_script_name;
    fastcgi_param SCRIPT_NAME $real_script_name;
    fastcgi_param PATH_INFO $path_info;

    # 网站根目录
    root           D:/newphp/queryphp/www;
    fastcgi_pass   127.0.0.1:9001;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include        fastcgi_params;
}
```

配置 rewrite 规则
搜索关键字 #access_log  

``` html
#access_log  logs/host.access.log  main;

location / {
    root   html;
    index  index.html index.htm;
}
```

修改为

``` html
# 重写url地址
if (!-e $request_filename){
    rewrite ^/(.*)$ /index.php/$1;
    #rewrite ^/subdir/(.*)$ /subdir/index.php/$1;
}

#access_log  logs/host.access.log  main;

location / {
    # 网站根目录
    root   D:/newphp/queryphp/www;
    index  index.html index.htm;
}
```

> 说明：以上基本能够解决大家遇到的问题，请多看几遍确保是否搞错，如果没有效果请百度看看其它解决办法。
