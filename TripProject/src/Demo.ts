/**
 * Created by maliquan on 16/7/1.
 */
class Demo extends egret.Sprite{
    public constructor(){
        super();
        this.width = 640;
        this.height = 960;
        this.touchChildren = false;
        this.touchEnabled = true;
    }

    private spList:egret.Sprite[] = [];
    private mouseX_old:number = 0;
    private picWidth:number = 300;
    private picHeight:number = 400;
    private isMove:boolean = false;
    private sp_center_x:number = 0;
    private sp_center_y:number = 0;

    public init():void{
        this.sp_center_x = this.width * 0.5-this.picWidth*0.5+50;
        this.sp_center_y = this.height * 0.5-this.picHeight*0.5;
        this.initSp();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
    }

    private beginHandler(e:egret.TouchEvent):void{
        this.mouseX_old = e.localX;
    }

    private endHandler(e:egret.TouchEvent):void{
        if(!this.isMove){
            var that = this;
            this.isMove = true;
            var len:number = this.spList.length;
            var isLeft = e.localX - this.mouseX_old < 0;
            isLeft ? this.spList.push(this.spList.shift()) : this.spList.unshift(this.spList.pop());

            for(var i:number=0; i<len; i++){
                var vo:moveVo = new moveVo(i, this.picWidth);
                var pic:egret.Sprite = this.spList[i];
                this.addChildAt(pic, vo.childIdx);
                egret.Tween.get(pic).to({x:that.sp_center_x+vo.x,scaleX:vo.scale, scaleY:vo.scale}, 200);
            }
            if(!isLeft){
                //修正层级
                this.addChildAt(this.spList[0], 0);
            }
            egret.Tween.get(this).to({},200).call(function(){
                that.isMove = false;
            },this)
        }
    }

    private initSp():void{
        var colors: number[] = [0xf1f34b, 0x4a4aef, 0xef4ade, 0x4aef5a, 0xef4a4a];
        for (var i: number = 0; i < 5; i++) {
            var spr: egret.Sprite = new egret.Sprite();
            spr.graphics.beginFill(colors[i]);
            spr.graphics.drawRect(0, 0, this.picWidth, this.picHeight);
            spr.graphics.endFill();
            spr.anchorOffsetX = this.picWidth*0.5;
            spr.anchorOffsetY = this.picHeight*0.5;
            this.spList.push(spr)

            var lab:egret.TextField = new egret.TextField();
            lab.text = i + "";
            spr.addChild(lab);

            var vo:moveVo = new moveVo(i, this.picWidth);
            spr.x = this.sp_center_x  + vo.x;
            spr.y = this.sp_center_y;
            spr.scaleX = spr.scaleY = vo.scale;
            this.addChildAt(spr, vo.childIdx);
        }
    }

    private dispose():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
    }
}

class moveVo{
    public x:number = 0;
    public scale:number = 1;
    public childIdx:number = 0;

    public constructor(i:number, w:number){
        var idx:number = i-2;
        var idx_abs:number = Math.abs(idx);
        this.x = w * 0.3 * idx;
        this.scale = 1 - idx_abs * 0.2;
        this.childIdx = 2 - idx_abs;
    }
}
