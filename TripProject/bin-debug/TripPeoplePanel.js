var TripPeoplePanel = (function (_super) {
    __extends(TripPeoplePanel, _super);
    function TripPeoplePanel() {
        _super.call(this);
    }
    var d = __define,c=TripPeoplePanel,p=c.prototype;
    //开启监听
    p.start = function () {
        this.init();
        this.bagBtn.touchEnabled = true;
        this.bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.daoju1.touchEnabled = true;
        this.daoju1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju2.touchEnabled = true;
        this.daoju2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju3.touchEnabled = true;
        this.daoju3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju4.touchEnabled = true;
        this.daoju4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju5.touchEnabled = true;
        this.daoju5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        this.daoju6.touchEnabled = true;
        this.daoju6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.bagBtn) {
            egret.Tween.resumeTweens(this.bagBtn);
        }
    };
    //初始化
    p.init = function () {
        if (this.xz_Sprite) {
            return;
        }
        this.stageW = this.width;
        this.stageH = this.height;
        this.xz_Sprite = new egret.Sprite();
        //this.xz_mojieSprite.graphics.beginFill(0xffffff);
        //容器宽高为屏幕的60%
        this.xz_Sprite.graphics.drawRect(0, 0, this.stageW * 0.8, this.stageH * 0.8);
        this.xz_Sprite.graphics.endFill();
        //X居中显示
        this.xz_Sprite.x = (this.stageW - this.xz_Sprite.width) * 0.5;
        //Y居中显示
        this.xz_Sprite.y = (this.stageH - this.xz_Sprite.height) * 0.5;
        this.addChild(this.xz_Sprite);
        this.showCard = new egret.Bitmap(RES.getRes('select_card_png'));
        // var rect:egret.Rectangle = new egret.Rectangle(50,100,this.xz_mojieSprite.width-100,this.xz_mojieSprite.height-100);
        // this.selectGo.scale9Grid =rect;
        this.showCard.width = this.xz_Sprite.width;
        this.showCard.height = this.xz_Sprite.height;
        this.xz_Sprite.addChild(this.showCard);
        this.xz_peoplePic = new egret.Bitmap(RES.getRes('mojie_people_png'));
        this.xz_peoplePic.x = (this.xz_Sprite.width - this.xz_peoplePic.width) * 0.5 + this.xz_peoplePic.width * 0.5;
        this.xz_peoplePic.y = this.xz_Sprite.height * 0.5 + 100;
        this.xz_peoplePic.anchorOffsetX = this.xz_peoplePic.width * 0.5;
        this.xz_peoplePic.anchorOffsetY = this.xz_peoplePic.height * 0.5;
        this.xz_peoplePic.scaleX = this.xz_peoplePic.scaleY = 0.9;
        this.xz_Sprite.addChild(this.xz_peoplePic);
        this.bagBtn = new egret.Bitmap(RES.getRes('mojie_bag_png'));
        //若调整了锚点，居中时需要加上锚点的距离
        this.bagBtn.x = (this.xz_Sprite.width - this.bagBtn.width) * 0.5 + this.bagBtn.width * 0.5;
        this.bagBtn.y = 30 + this.bagBtn.height * 0.5;
        this.bagBtn.anchorOffsetX = this.bagBtn.width * 0.5;
        this.bagBtn.anchorOffsetY = this.bagBtn.height * 0.5;
        this.bagBtn.scaleX = this.bagBtn.scaleY = 0.5;
        egret.Tween.get(this.bagBtn, { loop: true }).to({ rotation: 360 }, 10800);
        this.xz_Sprite.addChild(this.bagBtn);
        this.xz_des = new egret.Bitmap(RES.getRes('select_des_png'));
        this.xz_des.x = (this.xz_Sprite.width - this.xz_des.width) * 0.5 + this.xz_des.width * 0.5;
        this.xz_des.y = this.xz_peoplePic.y + this.xz_peoplePic.height * 0.1 + this.xz_des.height * 0.5;
        this.xz_des.anchorOffsetX = this.xz_des.width * 0.5;
        this.xz_des.anchorOffsetY = this.xz_des.height * 0.5;
        this.xz_des.scaleX = 0.8;
        this.xz_Sprite.addChild(this.xz_des);
        this.xz_think = new egret.Bitmap(RES.getRes('select_think_png'));
        this.xz_think.x = this.xz_Sprite.width * 0.5;
        this.xz_think.y = this.xz_Sprite.height * 0.16;
        this.xz_Sprite.addChild(this.xz_think);
        //         this.xz_think_lable = new egret.TextField(); 
        //  this.xz_think_lable.text = "点击背包~\n世界等着你去发现~"; 
        //  this.xz_think_lable.x= this.xz_think.x+50;
        //  this.xz_think_lable.y= this.xz_think.y+50;
        //   this.xz_think_lable.size=16;
        //   this.xz_think_lable.textColor = 0xff0000;
        //  this.xz_Sprite.addChild(this.xz_think_lable);
        //创建弹出层部分内容
        this.showBag();
    };
    p.showBag = function () {
        //以下为弹出层部分内容 
        this.daoju_Sprite = new egret.Sprite();
        this.daoju_Sprite.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.daoju_Sprite.graphics.endFill();
        //加入纯黑色透明背景
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.8);
        shp.graphics.drawRect(0, 0, this.stageW, this.stageH);
        shp.graphics.endFill();
        shp.width = this.stageW;
        shp.height = this.stageH;
        this.daoju_Sprite.addChild(shp);
        this.daojuCenter = new egret.Bitmap(RES.getRes('mojie_bag_png'));
        //若调整了锚点，居中时需要加上锚点的距离
        this.daojuCenter.x = (this.daoju_Sprite.width - this.daojuCenter.width) * 0.5 + this.daojuCenter.width * 0.5;
        //居中的，向上提200个点
        this.daojuCenter.y = (this.daoju_Sprite.height - this.daojuCenter.height) * 0.5;
        this.daojuCenter.anchorOffsetX = this.daojuCenter.width * 0.5;
        this.daojuCenter.anchorOffsetY = this.daojuCenter.height * 0.5;
        this.daojuCenter.scaleX = this.daojuCenter.scaleY = 0.7;
        this.daoju_Sprite.addChild(this.daojuCenter);
        egret.Tween.get(this.daojuCenter, { loop: true }).to({ rotation: 360 }, 10800);
        var distance = 100;
        this.daoju1 = new egret.Bitmap(RES.getRes('mojie_s1_png'));
        this.daoju1.x = this.daojuCenter.x;
        this.daoju1.y = this.daojuCenter.y - distance;
        this.daoju1.anchorOffsetX = this.daoju1.anchorOffsetY = this.daoju1.width * 0.5;
        this.daoju1.scaleX = this.daoju1.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju1);
        this.daoju1.touchEnabled = true;
        this.daoju1.name = this.getRandomNum();
        this.daoju2 = new egret.Bitmap(RES.getRes('mojie_s2_png'));
        this.daoju2.x = this.daojuCenter.x;
        this.daoju2.y = this.daojuCenter.y + distance;
        this.daoju2.anchorOffsetX = this.daoju2.anchorOffsetY = this.daoju2.width * 0.5;
        this.daoju2.scaleX = this.daoju2.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju2);
        this.daoju2.name = this.getRandomNum();
        this.daoju3 = new egret.Bitmap(RES.getRes('mojie_s3_png'));
        this.daoju3.x = this.daojuCenter.x - 100;
        this.daoju3.y = this.daojuCenter.y - 50;
        this.daoju3.anchorOffsetX = this.daoju3.anchorOffsetY = this.daoju3.width * 0.5;
        this.daoju3.scaleX = this.daoju3.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju3);
        this.daoju3.name = this.getRandomNum();
        this.daoju4 = new egret.Bitmap(RES.getRes('mojie_s4_png'));
        this.daoju4.x = this.daojuCenter.x - 100;
        this.daoju4.y = this.daojuCenter.y + 50;
        this.daoju4.anchorOffsetX = this.daoju4.anchorOffsetY = this.daoju4.width * 0.5;
        this.daoju4.scaleX = this.daoju4.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju4);
        this.daoju4.name = this.getRandomNum();
        this.daoju5 = new egret.Bitmap(RES.getRes('mojie_s5_png'));
        this.daoju5.x = this.daojuCenter.x + 100;
        this.daoju5.y = this.daojuCenter.y - 50;
        this.daoju5.anchorOffsetX = this.daoju5.anchorOffsetY = this.daoju5.width * 0.5;
        this.daoju5.scaleX = this.daoju5.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju5);
        this.daoju5.name = this.getRandomNum();
        this.daoju6 = new egret.Bitmap(RES.getRes('mojie_s6_png'));
        this.daoju6.x = this.daojuCenter.x + 100;
        this.daoju6.y = this.daojuCenter.y + 50;
        this.daoju6.anchorOffsetX = this.daoju6.anchorOffsetY = this.daoju6.width * 0.5;
        this.daoju6.scaleX = this.daoju6.scaleY = 0.8;
        this.daoju_Sprite.addChild(this.daoju6);
        this.daoju6.name = this.getRandomNum();
    };
    p.onTouchTab = function (e) {
        //停掉动画
        egret.Tween.pauseTweens(this.bagBtn);
        //取消事件监听
        this.bagBtn.touchEnabled = false;
        if (this.bagBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.bagBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.addChild(this.daoju_Sprite);
    };
    p.onDaojuTouch = function (e) {
        console.log(e.target.name);
        //修改全局变量，点到1或2或3道具，加载城市图片  xz_country_1
        //将容器remove掉，加载第二个页面
        this.removeChild(this.daoju_Sprite);
        ViewManager.getInstance().order(TripPeoplePanel.TRIP_PEOPLE, this);
    };
    //结束界面，释放监听
    p.end = function () {
        //将六个道具的事件监听取消
        this.daoju1.touchEnabled = false;
        this.daoju2.touchEnabled = false;
        this.daoju3.touchEnabled = false;
        this.daoju4.touchEnabled = false;
        this.daoju5.touchEnabled = false;
        this.daoju6.touchEnabled = false;
        if (this.daoju1.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju2.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju3.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju4.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju5.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
        if (this.daoju6.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.daoju6.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaojuTouch, this);
    };
    p.getRandomNum = function () {
        var _num = Math.random() * 10;
        if (_num <= 3) {
            return "1";
        }
        else if (_num <= 6) {
            return "2";
        }
        else if (_num <= 9) {
            return "3";
        }
        else {
            return "1";
        }
    };
    TripPeoplePanel.TRIP_PEOPLE = "TRIP_PEOPLE";
    return TripPeoplePanel;
}(egret.Sprite));
egret.registerClass(TripPeoplePanel,'TripPeoplePanel');
