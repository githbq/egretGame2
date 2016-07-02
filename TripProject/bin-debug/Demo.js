/**
 * Created by maliquan on 16/7/1.
 */
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo() {
        _super.call(this);
        this.spList = [];
        this.mouseX_old = 0;
        this.picWidth = 300;
        this.picHeight = 400;
        this.isMove = false;
        this.sp_center_x = 0;
        this.sp_center_y = 0;
        this.width = 640;
        this.height = 960;
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    var d = __define,c=Demo,p=c.prototype;
    p.init = function () {
        this.sp_center_x = this.width * 0.5 - this.picWidth * 0.5 + 50;
        this.sp_center_y = this.height * 0.5 - this.picHeight * 0.5;
        this.initSp();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
    };
    p.beginHandler = function (e) {
        this.mouseX_old = e.localX;
    };
    p.endHandler = function (e) {
        if (!this.isMove) {
            var that = this;
            this.isMove = true;
            var len = this.spList.length;
            var isLeft = e.localX - this.mouseX_old < 0;
            isLeft ? this.spList.push(this.spList.shift()) : this.spList.unshift(this.spList.pop());
            for (var i = 0; i < len; i++) {
                var vo = new moveVo(i, this.picWidth);
                var pic = this.spList[i];
                this.addChildAt(pic, vo.childIdx);
                egret.Tween.get(pic).to({ x: that.sp_center_x + vo.x, scaleX: vo.scale, scaleY: vo.scale }, 200);
            }
            if (!isLeft) {
                //修正层级
                this.addChildAt(this.spList[0], 0);
            }
            egret.Tween.get(this).to({}, 200).call(function () {
                that.isMove = false;
            }, this);
        }
    };
    p.initSp = function () {
        var colors = [0xf1f34b, 0x4a4aef, 0xef4ade, 0x4aef5a, 0xef4a4a];
        for (var i = 0; i < 5; i++) {
            var spr = new egret.Sprite();
            spr.graphics.beginFill(colors[i]);
            spr.graphics.drawRect(0, 0, this.picWidth, this.picHeight);
            spr.graphics.endFill();
            spr.anchorOffsetX = this.picWidth * 0.5;
            spr.anchorOffsetY = this.picHeight * 0.5;
            this.spList.push(spr);
            var lab = new egret.TextField();
            lab.text = i + "";
            spr.addChild(lab);
            var vo = new moveVo(i, this.picWidth);
            spr.x = this.sp_center_x + vo.x;
            spr.y = this.sp_center_y;
            spr.scaleX = spr.scaleY = vo.scale;
            this.addChildAt(spr, vo.childIdx);
        }
    };
    p.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
    };
    return Demo;
}(egret.Sprite));
egret.registerClass(Demo,'Demo');
var moveVo = (function () {
    function moveVo(i, w) {
        this.x = 0;
        this.scale = 1;
        this.childIdx = 0;
        var idx = i - 2;
        var idx_abs = Math.abs(idx);
        this.x = w * 0.3 * idx;
        this.scale = 1 - idx_abs * 0.2;
        this.childIdx = 2 - idx_abs;
    }
    var d = __define,c=moveVo,p=c.prototype;
    return moveVo;
}());
egret.registerClass(moveVo,'moveVo');
