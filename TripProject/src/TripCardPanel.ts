class TripCardPanel extends egret.Sprite {
    public static TRIP_CARD: string = "TRIP_CARD";

    public constructor() {
        super();

    }
    private stageW: number;
    private stageH: number;
    private card_Sprite: egret.Sprite;
    private xz_peoplePic: egret.Bitmap;

    private send_Sprite: egret.Sprite;
    private follow_Sprite: egret.Sprite;
    private sendFont: egret.TextField;
    private followFont: egret.TextField;
    private btnBG: egret.Bitmap;

    private content_Sprite: egret.Sprite;
    private cardInfo: egret.Bitmap;
    private cardSend: egret.Bitmap;
    private cardBG: egret.Bitmap;
    private xz_csPic: egret.Bitmap;
    private cardChuo: egret.Bitmap;
    private lineShap: egret.Shape;

    private xz_csFont: egret.Bitmap;
    private xz_youPiao: egret.Bitmap;

    private text_Sprite: egret.Sprite;
    private textName: egret.TextField;
    private textContent: egret.TextField;


    //开启监听
    public start() {
        this.init();
        this.send_Sprite.touchEnabled = true;
        this.send_Sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.follow_Sprite.touchEnabled = true;
        this.follow_Sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchFollowTab, this);
        this.xz_csPic.touchEnabled = true;
        this.xz_csPic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchContentTab, this);
    }
    //初始化
    private init() {
        if (this.card_Sprite) { return; }
        this.stageW = this.width;
        this.stageH = this.height;
        //daoju_Sprite
        this.card_Sprite = new egret.Sprite();
        this.card_Sprite.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.card_Sprite.graphics.endFill();
        this.addChild(this.card_Sprite);

        //加入纯黑色透明背景
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.85);
        shp.graphics.drawRect(0, 0, this.stageW, this.stageH);
        shp.graphics.endFill();
        shp.width = this.stageW;
        shp.height = this.stageH;
        this.card_Sprite.addChild(shp);


        //专注内容部分
        this.content_Sprite = new egret.Sprite();
        this.content_Sprite.graphics.drawRect(0, 0, this.stageW * 0.98, this.stageH * 0.4);
        this.content_Sprite.x = (this.stageW - this.content_Sprite.width) * 0.5;
        this.content_Sprite.y = (this.stageH - this.content_Sprite.height) * 0.5;
        this.content_Sprite.graphics.endFill();
        this.addChild(this.content_Sprite);

        this.xz_csPic = new egret.Bitmap(RES.getRes('mojie_cs_1_jpg'));
        this.xz_csPic.width = this.content_Sprite.width;
        this.xz_csPic.height = this.content_Sprite.height;
        this.content_Sprite.addChild(this.xz_csPic);

        this.cardBG = new egret.Bitmap(RES.getRes('card_bg_png'));
        this.cardBG.width = this.content_Sprite.width;
        this.cardBG.height = this.content_Sprite.height;

        this.xz_csFont = new egret.Bitmap(RES.getRes('mojie_des_3_png'));
        this.xz_csFont.width = this.content_Sprite.width;
        this.xz_csFont.height = this.content_Sprite.height;

        this.xz_csFont.anchorOffsetX = this.xz_csFont.width * 0.5;
        this.xz_csFont.anchorOffsetY = this.xz_csFont.height * 0.5;
        this.xz_csFont.x = this.xz_csFont.width *0.5 * 0.5 + 20;
        this.xz_csFont.y = this.xz_csFont.height * 0.6 * 0.5 + 20;
        this.xz_csFont.scaleX = 0.5;
        this.xz_csFont.scaleY = 0.6;

        this.lineShap = new egret.Shape();
        this.lineShap.graphics.lineStyle(2, 0xffffff);
        this.lineShap.graphics.moveTo(this.content_Sprite.width * 0.5, this.content_Sprite.height - 5);
        this.lineShap.graphics.lineTo(this.content_Sprite.width * 0.5, this.content_Sprite.height * 0.4);
        this.lineShap.graphics.endFill();


        this.xz_youPiao = new egret.Bitmap(RES.getRes('mojie_youpiao_png'));
        this.xz_youPiao.width = this.content_Sprite.width;
        this.xz_youPiao.height = this.content_Sprite.height;
        this.xz_youPiao.anchorOffsetX = this.xz_youPiao.width * 0.5;
        this.xz_youPiao.anchorOffsetY = this.xz_youPiao.height * 0.5;
        this.xz_youPiao.x = this.content_Sprite.width - this.xz_youPiao.width * 0.3 * 0.5 - 20;
        this.xz_youPiao.y = this.xz_youPiao.height * 0.3 * 0.5 + 20;
        this.xz_youPiao.scaleX = this.xz_youPiao.scaleY = 0.3;

        this.cardChuo = new egret.Bitmap(RES.getRes('card_chuo_png'));
        this.cardChuo.width = this.content_Sprite.width;
        this.cardChuo.height = this.content_Sprite.height;
        this.cardChuo.anchorOffsetX = this.cardChuo.width * 0.5;
        this.cardChuo.anchorOffsetY = this.cardChuo.height * 0.5;
        this.cardChuo.x = this.xz_youPiao.x - this.cardChuo.width * 0.4 * 0.5;
        this.cardChuo.y = this.xz_youPiao.height * 0.3;
        this.cardChuo.scaleX =  0.4;
        this.cardChuo.scaleY = 0.25;


        //此处为文字内容
        this.text_Sprite = new egret.Sprite();
        this.text_Sprite.graphics.drawRect(0, 0, this.content_Sprite.width * 0.5, this.content_Sprite.height * 0.5);
        this.text_Sprite.x = this.content_Sprite.width * 0.5;
        this.text_Sprite.y = this.content_Sprite.height * 0.5;
        this.text_Sprite.graphics.endFill();

        var _txtHeight = 40;
        var _width = this.text_Sprite.width * 0.95;

        var textFrom = new egret.TextField;
        textFrom.width = 70;
        textFrom.height =_txtHeight;
        textFrom.size = 20;
        textFrom.x = 10;
        textFrom.y = 10;
        textFrom.text = "FROM";
        textFrom.textColor = 0xffffff;
        textFrom.textAlign = egret.HorizontalAlign.LEFT;
        textFrom.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.text_Sprite.addChild(textFrom);

        this.textName = new egret.TextField;
        this.textName.size = 20;
        this.textName.type = egret.TextFieldType.INPUT;
        this.textName.width = _width -80;
        this.textName.height = _txtHeight;
        this.textName.x = 70;
        this.textName.y = 10;
        this.textName.textColor = 0xffffff;
        this.textName.textAlign = egret.HorizontalAlign.LEFT;
        this.textName.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.text_Sprite.addChild(this.textName);

        var shapFirst = new egret.Shape();
        shapFirst.graphics.lineStyle(2, 0xffffff);
        shapFirst.graphics.moveTo(10, _txtHeight + this.textName.y);
        shapFirst.graphics.lineTo(_width, _txtHeight + this.textName.y);
        shapFirst.graphics.endFill();
        this.text_Sprite.addChild(shapFirst);


        var textTo = new egret.TextField;
        textTo.width =40;
        textTo.height = _txtHeight;
        textTo.size = 20;
        textTo.x = 10;
        textTo.y = _txtHeight + this.textName.y + 2;
        textTo.text = "TO";
        textTo.textColor = 0xffffff;
        textTo.textAlign = egret.HorizontalAlign.LEFT;
        textTo.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.text_Sprite.addChild(textTo);

        this.textContent = new egret.TextField;
        this.textContent.size = 20;
        this.textContent.type = egret.TextFieldType.INPUT;
        this.textContent.width = _width-50;
        this.textContent.height = _txtHeight;
        this.textContent.x = 40;
        this.textContent.y = _txtHeight + this.textName.y + 2;
        this.textContent.textColor = 0xffffff;
        this.textContent.textAlign = egret.HorizontalAlign.LEFT;
        this.textContent.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.text_Sprite.addChild(this.textContent);

        var shapSecond = new egret.Shape();
        shapSecond.graphics.lineStyle(2, 0xffffff);
        shapSecond.graphics.moveTo(10, _txtHeight + this.textContent.y);
        shapSecond.graphics.lineTo(_width, _txtHeight + this.textContent.y);
        shapSecond.graphics.endFill();
        this.text_Sprite.addChild(shapSecond);


        var _date = new Date();
        var textDate = new egret.TextField;
        textDate.width = _width * 0.95;
        textDate.height = _txtHeight;
        textDate.size = 20;
        textDate.x = 10;
        textDate.y = _txtHeight + this.textContent.y + 2;
        textDate.text = _date.toLocaleDateString();
        textDate.textColor = 0xffffff;
        textDate.textAlign = egret.HorizontalAlign.RIGHT;
        textDate.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.text_Sprite.addChild(textDate);

        var shapThird = new egret.Shape();
        shapThird.graphics.lineStyle(2, 0xffffff);
        shapThird.graphics.moveTo(10, _txtHeight + textDate.y);
        shapThird.graphics.lineTo(_width, _txtHeight + textDate.y);
        shapThird.graphics.endFill();
        this.text_Sprite.addChild(shapThird); 

        //初始化图片后的内容
        this.initBG();
 
    }

    private onTouchTab(e: egret.TouchEvent) {
         console.log('送好友明信片');
        //ViewManager.getInstance().order(TripCardPanel.TRIP_CARD, this);
    }
    private onTouchFollowTab(e: egret.TouchEvent) {
        //此处为关注

    }
    private onTouchContentTab(e: egret.TouchEvent) {

        //移除监听
        this.xz_csPic.touchEnabled = false;
        if (this.xz_csPic.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.xz_csPic.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);

        //加入背面
        this.content_Sprite.removeChild(this.xz_csPic);
        this.card_Sprite.removeChild(this.cardInfo);
        this.card_Sprite.addChild(this.cardSend);


        this.content_Sprite.addChild(this.cardBG);
        this.content_Sprite.addChild(this.xz_csFont);
        this.content_Sprite.addChild(this.lineShap);
        this.content_Sprite.addChild(this.xz_youPiao);
        this.content_Sprite.addChild(this.cardChuo);
        this.content_Sprite.addChild(this.text_Sprite);

        this.addChild(this.follow_Sprite);
        this.addChild(this.send_Sprite);

    }

    private initBG() {
        this.xz_peoplePic = new egret.Bitmap(RES.getRes('mojie_people_png'));
        this.xz_peoplePic.anchorOffsetX = this.xz_peoplePic.width * 0.5;
        this.xz_peoplePic.anchorOffsetY = this.xz_peoplePic.height * 0.5;
        this.xz_peoplePic.scaleX = this.xz_peoplePic.scaleY = 0.6;
        this.card_Sprite.addChild(this.xz_peoplePic);
        this.xz_peoplePic.x = this.card_Sprite.width - this.xz_peoplePic.width * 0.6;
        this.xz_peoplePic.y = this.xz_peoplePic.height * 0.6 * 0.5;


        this.cardInfo = new egret.Bitmap(RES.getRes('card_info_png'));
        this.cardInfo.anchorOffsetX = this.cardInfo.width * 0.5;
        this.cardInfo.anchorOffsetY = this.cardInfo.height * 0.5;
        this.cardInfo.scaleX = this.cardInfo.scaleY = 1;
        this.card_Sprite.addChild(this.cardInfo);
        this.cardInfo.x = this.xz_peoplePic.x - this.cardInfo.width;
        this.cardInfo.y = this.xz_peoplePic.y;

        this.cardSend = new egret.Bitmap(RES.getRes('card_send_png'));
        this.cardSend.anchorOffsetX = this.cardSend.width * 0.5;
        this.cardSend.anchorOffsetY = this.cardSend.height * 0.5;
        this.cardSend.scaleX = this.cardSend.scaleY = 1;
        this.cardSend.x = this.xz_peoplePic.x - this.cardSend.width;
        this.cardSend.y = this.xz_peoplePic.y;

        this.follow_Sprite = new egret.Sprite();
        this.follow_Sprite.graphics.drawRect(0, 0, this.stageW * 0.5, 70);
        this.follow_Sprite.x = (this.stageW - this.follow_Sprite.width) * 0.5;
        this.follow_Sprite.y = this.stageH - 140;
        this.follow_Sprite.graphics.endFill();

        this.btnBG = new egret.Bitmap(RES.getRes('card_btn_png'));
        this.btnBG.width = this.follow_Sprite.width;
        this.btnBG.height = this.follow_Sprite.height;
        var rect: egret.Rectangle = new egret.Rectangle(40, 40, this.btnBG.width - 80, this.btnBG.height - 80);
        this.btnBG.scale9Grid = rect;
        this.follow_Sprite.addChild(this.btnBG);

        this.followFont = new egret.TextField();
        this.followFont.text = '关注我们';
        this.followFont.textColor = 0x3fa1ce;
        this.followFont.textAlign = egret.HorizontalAlign.CENTER;
        this.followFont.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.follow_Sprite.addChild(this.followFont);
        this.followFont.x = (this.follow_Sprite.width - this.followFont.width) * 0.5;
        this.followFont.y = (this.follow_Sprite.height - this.followFont.height) * 0.5;

        this.send_Sprite = new egret.Sprite();
        this.send_Sprite.graphics.drawRect(0, 0, this.stageW * 0.5, 70);
        this.send_Sprite.x = (this.stageW - this.send_Sprite.width) * 0.5;
        this.send_Sprite.y = this.stageH - 220;
        this.send_Sprite.graphics.endFill();


        this.btnBG = new egret.Bitmap(RES.getRes('card_btn_png'));
        this.btnBG.width = this.send_Sprite.width;
        this.btnBG.height = this.send_Sprite.height;
        var rect: egret.Rectangle = new egret.Rectangle(40, 40, this.btnBG.width - 80, this.btnBG.height - 80);
        this.btnBG.scale9Grid = rect;
        this.send_Sprite.addChild(this.btnBG);

        this.sendFont = new egret.TextField();
        this.sendFont.text = '送好友明信片';
        this.sendFont.textColor = 0x3fa1ce;
        this.sendFont.textAlign = egret.HorizontalAlign.CENTER;
        this.sendFont.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.send_Sprite.addChild(this.sendFont);
        this.sendFont.x = (this.send_Sprite.width - this.sendFont.width) * 0.5;
        this.sendFont.y = (this.send_Sprite.height - this.sendFont.height) * 0.5;



    }

    //结束界面，释放监听
    public end() {
        this.send_Sprite.touchEnabled = false;
        if (this.send_Sprite.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.send_Sprite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.follow_Sprite.touchEnabled = false;
        if (this.follow_Sprite.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.follow_Sprite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);

    }

}