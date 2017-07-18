/**
 * audio面向对象的改写方式
 * Created by nick on 2017/7/18.
 */

function Player(ct, musicList) {
    // 当前的位置
    this.ct = ct;
    this.music = new Audio();
    this.music.autoplay = true;
    this.musicIndex = 0;
    this.shouldUpdate = true;
    this.musicList = musicList;
    this.init();
    this.bind();
    this.start();
}

Player.prototype = {
    init: function () {
        //填充内容
        this.ct.innerHTML = `<div class="music">
        <div class="control">
            <span class="back"><i class="fa fa-step-backward"></i></span>
            <span class="play"><i class="fa fa-pause"></i></span>
            <span class="forward"><i class="fa fa-step-forward"></i></span>
        </div>
        <div class="info">
            <div class="title">My song</div>
            <div class="author">ruoyu</div>
        </div>
    </div>
    <div class="progress">
        <div class="bar">
            <div class="progress-total"></div>
            <div class="progress-now"></div>
        </div>

        <div class="time">0:00</div>
    </div>`;

        // 获取DOM节点
        this.backBtn = this.ct.querySelector('.back');
        this.backBtn = this.ct.querySelector('.back');
        this.playBtn = this.ct.querySelector('.play');
        this.forwardBtn = this.ct.querySelector('.forward');
        this.titleNode = this.ct.querySelector('.title');
        this.authorNode = this.ct.querySelector('.author');
        this.timeNode = this.ct.querySelector('.time');
        this.progressBarNode = this.ct.querySelector('.progress .bar');
        this.progressNowNode = this.ct.querySelector('.progress-now');
        this.playBtnIcon = this.playBtn.querySelector('.fa');

        this.loadMusic(musicList[0]);
    },
    // 绑定事件
    bind: function () {
        let that = this;
        this.playBtn.onclick = function () {
            if (that.playBtnIcon.classList.contains('fa-play')) {
                that.start();
            } else {
                that.pause();
            }
        };

        this.progressBarNode.onclick = function (e) {
            let percent = e.offsetX / parseInt(getComputedStyle(this).width);
            that.music.currentTime = percent * that.music.duration;
            that.progressNowNode.style.width = percent * 100 + "%";
        };

        this.music.onplaying = function () {
            that.timer = setInterval(function () {
                that.updateProgress();
            }, 1000);
        };
        this.music.onpause = function () {
            clearInterval(that.timer)
        };
        this.music.addEventListener('ended', function () {
            clearInterval(that.timer)
        });

        this.forwardBtn.onclick = function () {
            that.loadNextMusic();
        };
        this.backBtn.onclick = function () {
            that.loadLastMusic();
        };
        this.music.onended = function () {
            that.loadNextMusic();
        };

    },
    start: function () {
        this.music.play();
        this.playBtnIcon.classList.add('fa-pause');
        this.playBtnIcon.classList.remove('fa-play')
    },
    pause:function(){
        this.music.pause();
        this.playBtnIcon.classList.add('fa-play');
        this.playBtnIcon.classList.remove('fa-pause');
    },
    loadMusic: function (songObj) {
        this.music.src = songObj.src;
        this.titleNode.innerText = songObj.title;
        this.authorNode.innerText = songObj.author;
    },
    loadNextMusic: function () {
        this.musicIndex++;
        this.musicIndex = this.musicIndex % this.musicList.length;
        this.loadMusic(this.musicList[this.musicIndex]);
    },
    loadLastMusic: function () {
        this.musicIndex--;
        this.musicIndex = ( this.musicIndex + this.musicList.length) % this.musicList.length;
        this.loadMusic(this.musicList[this.musicIndex]);
    },
    updateProgress: function (per) {
        let percent = per || (this.music.currentTime / this.music.duration) * 100 + '%';
        this.progressNowNode.style.width = percent;
        let minutes = parseInt(this.music.currentTime / 60);
        let seconds = parseInt(this.music.currentTime % 60) + '';
        seconds = seconds.length === 2 ? seconds : '0' + seconds;
        this.timeNode.innerText = minutes + ':' + seconds;
    }
};
