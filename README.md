# 前言

这是一个用vue做的一个仿饿了么pc端的一个项目，做这个东西主要是当初学vue的时候，并没有什么成熟的项目来学习，在慕课网上找了几个项目视频也只是对vue有了一些了解，跟着做下来总觉得少了点东西.后来偶尔在github上看到了一个vue移动端的作品，感觉还不错，看了看代码后就有了自己实现一下pc端的想法。

这个项目主要实现了用户登录，ip定位，ip测距，商家列表，商家详情，商家搜索，购物车及下单，订单查看，评价查看，地址管理等功能，页面基本与饿了么pc端一致。页面大约有7个，页面虽然不多，但该有的基本都有了，勉强达到了自己心里的及格线吧。

这个项目大约有做了四五个月，主要是利用工作的业余时间，一天下来能敲两三个小时已经够多了，再加上一些事情也是拖延了很长时间，所以阉割了一些的功能比如我的收藏，红包等等，因为这些基本上都是一些业务上的逻辑，其他的就是一些重复性的工作了。

这个项目最初只是想用Vue做出一点东西，但是越往后做的越多，反而大多精力放到了后端的方面。根据直觉后端占的时间估计有70%，反而前端这一部分成次要的了。这也跟后台重构了一次，学了下新技术有关系。

最后这个项目由本人独立完成，纯属学习目的，基本没有参照别人的代码，看看即可。如果对您有帮助，请点一下‘Star’，感激不尽♪(･ω･)ﾉ。

## 技术栈

vue-cli3.0 + vue2 + vue-router + vuex + element.ui + es6/7 + scss + axios + graphQL + webpack

## 关于后台

本项目的接口均由对应的后台提供。
[后台项目传送地址](https://github.com/xiangzhisuoxin/elm-node)

## 效果演示

[点击查看作品](http://www.xzsxin.cn) (请用pc端浏览哦)

## 项目运行

```
npm install (或者yarn install)
npm run serve
```

## 总结

不知为何当时脑袋一热有了个这个想法做这个。这个作品（包括后端）花费了我较长的时间，中间也遇到了很多困难，尤其是在应用graphQL这一块上，看着官方晦涩的文档，踩过版本不对的坑，由于国内对这一块的资料并不多，所以还要看一些英文的文档和解释，但最后还是用上了这个热门的技术（其实还有一个问题没有完美解决）。从另一方面想，这也是一种好处，因为这样你想用什么技术就用什么技术，工作中可没这种自由啊。

做这个作品的时候也曾想过要放弃，觉得这个即使做出来也没有什么意义。但我最后还是坚持下来了，回来看自己也是收获了很多，比如自己再也不是对后端一无所知的小白了，具体表现就是跟后端撕逼时更有底气了。再比如前端后端运维自己一人干了还是很爽的，体验了一下全栈的感觉。再比如考验了自己的学习能力，很多东西都是从无到有，以后再接触新的技术再上手也很熟练等等，再比如或许以后这种不求收益，一心学习技术的激情的项目很少，也是一段珍贵的经历吧。。。