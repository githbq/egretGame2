var TripIndexPanel = (function (_super) {
    __extends(TripIndexPanel, _super);
    function TripIndexPanel() {
        _super.call(this);
    }
    var d = __define,c=TripIndexPanel,p=c.prototype;
    //开启监听
    p.start = function () {
        this.init();
        this.indexSound = RES.getRes("music_mp3");
        //this.soundChannel=  this.indexSound.play(0,-1);
        this.indexGo.touchEnabled = true;
        this.indexGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
    };
    //初始化
    p.init = function () {
        if (this.bg) {
            return;
        }
        var _stageW = this.width;
        var _stageH = this.height;
        this.isPlay = true;
        this.bg = new egret.Bitmap(RES.getRes('index_bg_jpg'));
        this.bg.width = _stageW;
        this.bg.height = _stageH;
        this.addChild(this.bg);
        this.indexGo = new egret.Bitmap(RES.getRes('index_go_png'));
        this.indexGo.x = (_stageW - this.indexGo.width) * 0.5;
        this.indexGo.y = (_stageH - this.indexGo.height) * 0.5 - 30;
        this.addChild(this.indexGo);
        this.indexEarth = new egret.Bitmap(RES.getRes('index_earth_png'));
        this.indexEarth.x = 50;
        this.indexEarth.y = _stageH;
        this.indexEarth.anchorOffsetX = this.indexEarth.width * 0.5;
        this.indexEarth.anchorOffsetY = this.indexEarth.height * 0.5;
        this.addChild(this.indexEarth);
        egret.Tween.get(this.indexEarth, { loop: true }).to({ rotation: 360 }, 10800);
        this.indexLogo = new egret.Bitmap(RES.getRes('index_logo_png'));
        this.indexLogo.x = (_stageW - this.indexLogo.width) * 0.5;
        this.indexLogo.y = _stageH - (this.indexLogo.height * 1.5);
        this.addChild(this.indexLogo);
        // this.indexFont = new egret.Bitmap(RES.getRes('index_font_png'));
        // this.indexFont.x = (_stageW - this.indexFont.width) * 0.5;
        // this.indexFont.y = this.indexFont.height;
        // this.addChild(this.indexFont);
        this.indexMusic = new egret.Bitmap(RES.getRes('index_music_png'));
        this.indexMusic.x = _stageW - this.indexMusic.width - 30;
        this.indexMusic.y = 20;
        this.addChild(this.indexMusic);
        var tw = egret.Tween.get(this.indexMusic, { loop: true });
        tw.to({ scaleX: 1.2, scaleY: 1.2 }, 500).wait(100).to({ scaleX: 1, scaleY: 1 }, 500).wait(100);
        this.indexMusic.touchEnabled = true;
        this.indexMusic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMusic, this);
    };
    p.onTouchMusic = function (e) {
        if (this.isPlay) {
            egret.Tween.pauseTweens(this.indexMusic);
        }
        else {
            egret.Tween.resumeTweens(this.indexMusic);
            this.indexSound.play(0, -1);
        }
        this.isPlay = !this.isPlay;
    };
    p.onTouchTab = function (e) {
        ViewManager.getInstance().order(TripIndexPanel.TRIP_INDEX, this);
    };
    //结束界面，释放监听
    p.end = function () {
        this.indexGo.touchEnabled = false;
        if (this.indexGo.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.indexGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
    };
    TripIndexPanel.TRIP_INDEX = "TRIP_INDEX";
    return TripIndexPanel;
}(egret.Sprite));
egret.registerClass(TripIndexPanel,'TripIndexPanel');
