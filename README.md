# Welcome to Jekyll!
#
# This config file is meant for settings that affect your whole blog, values
# which you are expected to set up once and rarely need to edit after that.
# For technical reasons, this file is *NOT* reloaded automatically when you use
# 'jekyll serve'. If you change this file, please restart the server process.

# Site settings
title: Love&Peace
brief-intro: code encode
baseurl: "" # the subpath of your site, e.g. /blog
url: "https://ltd0924.github.io" # the base hostname & protocol for your site

permalink: /:year/:month/:day/:title/

# other links
twitter_username: #gaohaoyang126
facebook_username: #gaohaoyang.water
github_username:  ltd0924
email: ltd0924@sina.com
weibo_username:
zhihu_username:
linkedIn_username:
dribbble_username:

description_footer: 来自Aphrodite的个人专栏！

# comments
# two ways to comment, only choose one, and use your own short name
# 两种评论插件，选一个就好了，使用自己的 short_name
duoshuo_shortname: #hygblog
disqus_shortname: #gaohaoyang

# statistic analysis 统计代码
# 百度统计 id，将统计代码替换为自己的百度统计id，即
# hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxx";
# xxxxx字符串

markdown: kramdown

kramdown:
  input: GFM
  syntax_highlighter: rouge

# port
# port: 1234

# url
category_dir: category/
tag_dir: tag/

# excerpt
excerpt_separator: "\n\n\n\n"

# paginate
plugins: [jekyll-paginate]
paginate: 6
port: 4001
theme: jekyll-theme-minimal
