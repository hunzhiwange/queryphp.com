all: update deploy

deploy:
	rm -rf public db.json
	node install.js
	hexo generate
	hexo deploy