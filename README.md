# 一个简易音乐播放器
## 简介
根据饥人谷的公开课制作的简易音乐播放器</br>
* index.html中是饥人谷原有代码
* test是测试封装后的代码

## 使用方法
```html
<!--创建音乐播放器容器-->
<div class="musicbox"></div> 
```
```javascript
// 定义歌曲列表
// 可以异步获取，如果异步获取初始化应放在回调中
let musicList = [{
        "src": "mp3/天后.mp3", // 歌曲地址
        "title": "天后", // 歌曲名
        "author": "陈势安" // 歌手
    }, {
        "src": "mp3/浮夸.mp3",
        "title": "浮夸",
        "author": "陈奕迅"
    }];
// 初始化
let musicbox = document.querySelector('.musicbox');
let player = new Player(musicbox, musicList);
```
##API
```javascript
player.start(); //开始播放，并更改按钮样式
player.pause(); //停止播放，并更改按钮样式
player.loadMusic(songObj); //播放某一首音乐，songObj是musicList的一个对象
player.loadNextMusic();//播放下一首
player.loadLastMusic();//播放上一首
```

## Demo
![](http://jscode.me/uploads/default/original/2X/e/e7811a56143f6d0be5ffe9b8b5d489e1a6aa2524.png)

**[效果预览](http://js.jirengu.com/dudi)**

## 参考资料
- [MDN-HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)
- [MDN-Media_events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events)
- [饥人谷音乐播放器](https://github.com/jirengu/music)

## 主题下载
[mini-player.psd](http://jscode.me/uploads/default/original/2X/8/89a444e2bf485fd8ea0b0aaa7af07ce9c5aefb57.psd) (861.2 KB)
