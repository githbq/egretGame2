//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        /**
         * 创建游戏场景
         * Create a game scene
         */
        this.sprcon = new egret.Sprite();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    p.createGameScene = function () {
        //=========此处为正式代码============
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var viewManager = ViewManager.getInstance();
        this.addChild(viewManager);
        viewManager.width = stageW;
        viewManager.height = stageH;
        viewManager.start();
        //===========此处为正式代码=========== 
        //=========此处为轮播代码段============
        // //设计父容器
        // var stageW: number = this.stage.stageWidth;
        // var stageH: number = this.stage.stageHeight;
        // this.addChild(this.sprcon);
        // this.sprcon.x = 0;
        // this.sprcon.y = 0;
        // this.sprcon.width = stageW;
        // this.sprcon.height = stageH;
        // //每一个图片的颜色设置
        // //黄 蓝 紫 绿 红 
        // var colors: number[] = [0xfb75e0,0xf1f34b, 0x4a4aef, 0xef4ade, 0x4aef5a, 0xef4a4a];
        // // 所有容器的数组对象
        // var arrSprites: egret.Sprite[] = [];
        // //图片宽度
        // var picWidth = 300;
        // //图片高度
        // var picHeight = 400;
        // //中心点 无锚点
        // var centerWidth = (stageW - picWidth) * 0.5;
        // //中心点 无锚点
        // var centerHeight = (stageH - picHeight) * 0.5;
        // //计算描点X
        // var miaodianX = picWidth * 0.5;
        // //计算锚点Y
        // var miaodianY = picHeight * 0.5;
        // //因Y轴相同，则提出变量 
        // var pointY = centerHeight + miaodianY;
        // var jsonPic = [  //  包含了5张图片里面所有的样式
        //     {   //  1
        //         width: 200,
        //         x: centerWidth + miaodianX - 600,
        //         y: pointY,
        //         opacity: 20,
        //         z: 1,
        //         scale: 0.3
        //     },
        //     {   //  1
        //         width: 400,
        //         x: centerWidth + miaodianX - 400,
        //         y: pointY,
        //         opacity: 20,
        //         z: 1,
        //         scale: 0.5
        //     },
        //     {  // 2
        //         width: 600,
        //         x: centerWidth + miaodianX - 200,
        //         y: pointY,
        //         opacity: 80,
        //         z: 2,
        //         scale: 0.8
        //     }
        //     ,
        //     {   // 3
        //         width: 800,
        //         x: centerWidth + miaodianX,
        //         y: pointY,
        //         opacity: 100,
        //         z: 3,
        //         scale: 1
        //     },
        //     {  // 4
        //         width: 600,
        //         x: centerWidth + miaodianX + 200,
        //         y: pointY,
        //         opacity: 80,
        //         z: 2,
        //         scale: 0.8
        //     },
        //     {   //5
        //         width: 400,
        //         x: centerWidth + miaodianX + 400,
        //         y: pointY,
        //         opacity: 20,
        //         z: 1,
        //         scale: 0.5
        //     }
        // ];
        // for (var i: number = 0; i < jsonPic.length; i++) {
        //     var spr: egret.Sprite = new egret.Sprite();
        //     spr.graphics.beginFill(colors[i]);
        //     spr.graphics.drawRect(0, 0, picWidth, picHeight);
        //     spr.graphics.endFill();
        //     spr.anchorOffsetX = miaodianX;
        //     spr.anchorOffsetY = miaodianY;
        //     // console.log(jsonPic[i].x);
        //     spr.x = jsonPic[i].x; //i*20;
        //     spr.y = jsonPic[i].y; //i*20;
        //     spr.scaleX = spr.scaleY = jsonPic[i].scale;
        //     this.sprcon.addChild(spr);
        //     this.sprcon.setChildIndex(spr, jsonPic[i].z);
        //     arrSprites.push(spr);
        //     spr.touchEnabled = false;
        // spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        // spr.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, this);
        // }
        // var currentSprite:egret.Sprite;
        // console.log( Math.floor(jsonPic.length/2));
        // var currentSprite = arrSprites[Math.floor(jsonPic.length/2)];
        // changeMove(currentSprite);
        // //增加圆形的触摸监听
        // currentSprite.touchEnabled = true;
        // currentSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        // currentSprite.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, this);
        // //要拖的对象
        // var touchObject: egret.Sprite;
        // var offsetX: number;
        // var oldX: number;
        // //var offsetY:number;
        // function startMove(e: egret.TouchEvent): void {
        //     //把手指按到的对象记录下来
        //     touchObject = e.currentTarget;
        //     oldX = touchObject.x;
        //     //计算手指和要拖动的对象的距离
        //     offsetX = e.stageX - touchObject.x;
        //     //把触摸的对象放在显示列表的顶层
        //     //this.addChild(touchObject);
        //     //手指在屏幕上移动，会触发 onMove 方法
        //     this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        // }
        // function stopMove(e: egret.TouchEvent) {
        //     // console.log(`x位移：${touchObject.x-oldX}` );
        //     var _isDirection= touchObject.x - oldX;
        //     //重绘所有对象 
        //     if (_isDirection < 0) {
        //         //往右开
        //         console.log('往左滑');
        //         jsonPic.unshift(jsonPic.pop())
        //     } else {
        //         //往左开
        //         jsonPic.push(jsonPic.shift());
        //         console.log('往右滑');
        //     }
        //     // 交换完毕 json 之后，就要 循环执行一次
        //     for (let i = 0; i < jsonPic.length; i++) {
        //         egret.Tween.get(arrSprites[i]).to({
        //             // width:jsonPic[i].width,
        //             x: jsonPic[i].x,
        //             y: jsonPic[i].y,
        //             scaleX: jsonPic[i].scale,
        //             scaleY: jsonPic[i].scale,
        //         }, 300);
        //         //arrSprites[i].name= jsonPic[i].name;
        //         //this.sprcon.setChildIndex(arrSprites[i], jsonPic[i].z);
        //         //this.sprcon.swapChildrenAt(i,jsonPic[i].z);
        //         //this.sprcon.swapChildren(arrSprites[i],arrSprites[jsonPic[i].z]);
        //         if (_isDirection < 0) {
        //             //往左滑不行
        //            // this.sprcon.setChildIndex(arrSprites[i], jsonPic[i].z);
        //              //this.sprcon.setChildIndex(arrSprites[jsonPic.length-i-1], jsonPic[jsonPic.length-i-1].z); 
        //               this.sprcon.setChildIndex(arrSprites[jsonPic.length-i-1], jsonPic[jsonPic.length-i-1].z);
        //         }else{
        //             //OK
        //             this.sprcon.setChildIndex(arrSprites[i], jsonPic[i].z);
        //         }
        //         if (jsonPic[i].z==3){
        //              currentSprite = arrSprites[i];
        //         }
        //     }
        //      //设置最上面的图形为最顶
        //     this.sprcon.setChildIndex(currentSprite,20);
        //     changeMove(currentSprite);
        //     //手指离开屏幕，移除手指移动的监听
        //     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        // }
        // function onMove(e: egret.TouchEvent): void {
        //     //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
        //     touchObject.x = e.stageX - offsetX;
        // }
        // function changeMove(_currentSprite:egret.Sprite){
        //       for (let i = 0; i < jsonPic.length; i++) { 
        //           arrSprites[i].touchEnabled=false;
        //       }
        //     _currentSprite.touchEnabled=true;
        // }
        // //=========此处为轮播代码段============
    };
    p.onChange = function () {
        console.log("onChange");
    };
    p.onComplete = function (param1, param2) {
        console.log("onComplete");
        console.log(param1);
        console.log(param2);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
