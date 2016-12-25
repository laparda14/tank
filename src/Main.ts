//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
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

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            console.log(RES.getRes('link_png'));
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
	private webSocket:egret.WebSocket;
    private sound:egret.Sound;
    private socket;
    private createGameScene():void {
        var bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill( 0x336699 );
        bg.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight ); 
        bg.graphics.endFill();
        super.addChild( bg ); 
        var tx:egret.TextField = new egret.TextField();
        tx.text = "I'm Jack, I will use Egret create a fantasy mobile game!"; 
        tx.size = 32; 
        tx.x = 20; 
        tx.y = 20; 
        tx.width = this.stage.stageWidth - 40;
        this.addChild( tx );
        tx.touchEnabled = true; 
        tx.addEventListener( egret.TouchEvent.TOUCH_TAP, this.touchHandler, this );

        this.webSocket = new egret.WebSocket();        
		this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
		this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
		this.webSocket.connect("echo.websocket.org", 80);
        this.socket = io.connect('http://localhost:3000/');
        this.socket.on('news', function (data) {
            self.trace(data);
        });
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.sendMessage("message content");
        }, this);
		

		// 刚体
		var factor:number = 10;

		//创建world
		var world:p2.World = new p2.World();
		world.sleepMode = p2.World.BODY_SLEEPING;

		//创建plane
		var planeShape:p2.Plane = new p2.Plane();
		var planeBody:p2.Body = new p2.Body();
		planeBody.addShape(planeShape);
		planeBody.displays = [];
		world.addBody(planeBody);

		egret.Ticker.getInstance().register(function (dt) {
			if (dt < 10) {
				return;
			}
			if (dt > 1000) {
				return;
			}
			world.step(dt / 1000);
            tx.text = "I'm Jack, I will use Egret create a fantasy mobile game!" + Math.floor(1000 / dt); 
			var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
			var l = world.bodies.length;
			for (var i:number = 0; i < l; i++) {
				var boxBody:p2.Body = world.bodies[i];
				var box:egret.DisplayObject = boxBody.displays[0];
				if (box) {
					box.x = boxBody.position[0] * factor;
					box.y = stageHeight - boxBody.position[1] * factor;
					box.rotation = 360 - boxBody.angle * 180 / Math.PI;
					if (boxBody.sleepState == p2.Body.SLEEPING) {
						box.alpha = 0.5;
					}
					else {
						box.alpha = 1;
					}
				}
			}
		}, this);

		//鼠标点击添加刚体
		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouch, this);
		var self = this;

		function onTouch(e:egret.TouchEvent):void {
			var positionX:number = Math.floor(e.stageX / factor);
			var positionY:number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);
			addOneBox(positionX,positionY);
		}
		function addOneBox(positionX,positionY) {
			if (Math.random() > 0.5) {
				//添加方形刚体
				var boxShape:p2.Shape = new p2.Box({width: 6, height: 3});
				var boxBody:p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1});
				boxBody.addShape(boxShape);
				world.addBody(boxBody);

				var display:egret.DisplayObject = self.createBitmapByName("cannon_png");
				display.width = (<p2.Box>boxShape).width * factor;
				display.height = (<p2.Box>boxShape).height * factor;
			}
			else {
				//添加圆形刚体
				var boxShape:p2.Shape = new p2.Circle({ radius: 1 });
				var boxBody:p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY]});
				boxBody.addShape(boxShape);
				world.addBody(boxBody);

				var display:egret.DisplayObject = self.createBitmapByName("pea-bullet_png");
				display.width = (<p2.Circle>boxShape).radius * 2 * factor;
				display.height = (<p2.Circle>boxShape).radius * 2 * factor;
			}

			display.anchorOffsetX = display.width / 2
			display.anchorOffsetY = display.height / 2;
			boxBody.displays = [display];
			self.addChild(display);
		}
		for(var i=0;i<8;i++){
			addOneBox(2*i+2,2*i+5);
		}

		var bitmapText:egret.BitmapText = new egret.BitmapText();

		bitmapText.text = "Click!"

		bitmapText.anchorOffsetX = bitmapText.width / 2;
		bitmapText.anchorOffsetY = bitmapText.height / 2;
		bitmapText.x = this.stage.stageWidth / 2;
		bitmapText.y = this.stage.stageHeight / 2;
		this.addChild(bitmapText);
		bitmapText.touchEnabled = true;
		bitmapText.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent)=>{
		this.removeChild(bitmapText);
		},this);


        // 粒子效果
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.btn1 = new egret.TextField();
        this.btn1.text = "换效果";
        this.addChild(this.btn1);

        this.btn1.x = 180;
        this.btn1.width = 100;
        this.btn1.height = 50;
        this.btn1.y = 150;
        this.btn1.touchEnabled = true;
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEffect, this);

        this.btn2 = new egret.TextField();
        this.btn2.text = "换纹理";
        this.addChild(this.btn2);

        this.btn2.x = 180;
        this.btn2.y = 250;
        this.btn2.width = 100;
        this.btn2.height = 50;
        this.btn2.touchEnabled = true;
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeTexture, this);

        this.changeEffect();

        // 音频
        this.sound = RES.getRes("fire_mp3");
        // var bgMusic:egret.Sound = RES.getRes("bg_mp3");
        // bgMusic.play(0, -1);
    }
    private sendMessage(msg:string):void {
        console.log("send message: " + msg);
        this.socket.emit("message", {date: Date.now()});
    }

    private trace(msg):void {
        console.log(Date.now() - msg.date);
    }
    private onClick(event):void {
        this.sound.play(0, 1);
        if(event.target == this.btn1 || event.target == this.btn2) {
            return;
        }
        this.system.emitterX = event.stageX;
        this.system.emitterY = event.stageY;
    }
    private configList:Array<string> = ["test", "fireworks","fire","sun","jellyfish"];
    private configIndex:number = -1;
    private textureList:Array<string> = ["test", "blood","star","energy","magic"];
    private textureIndex:number = 0;
    private system:particle.ParticleSystem;
    private btn1:egret.TextField;
    private btn2:egret.TextField;
    private changeEffect():void {
        this.configIndex++;
        if (this.configIndex >= this.configList.length) {
            this.configIndex = 0;
        }
        var s = this.configList[this.configIndex];
        var textureS = this.textureList[this.textureIndex];
        var texture = RES.getRes(textureS + "_png");
        var config = RES.getRes(s + "_json");

        if (this.system) {
            this.system.stop();
            this.removeChild(this.system);
        }

        this.system = new particle.GravityParticleSystem(texture, config);
        this.addChild(this.system);
        this.system.start();
    }

    private changeTexture():void {
        this.textureIndex++;
        if (this.textureIndex >= this.textureList.length) {
            this.textureIndex = 0;
        }
        var s = this.textureList[this.textureIndex];
        var texture = RES.getRes(s + "_png");
        this.system.changeTexture(texture);
    }
    private onSocketOpen():void {    
		var cmd = "Hello Egret WebSocket";    
		console.log("连接成功，发送数据：" + cmd);    
		this.webSocket.writeUTF(cmd);
	}
	private onReceiveMessage(e:egret.Event):void {    
		var msg = this.webSocket.readUTF();    
		console.log("收到数据：" + msg);
	}
    private touchHandler( evt:egret.TouchEvent ):void{
        var tx:egret.TextField = evt.currentTarget;
        tx.textColor = 0x00ff00; 
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        let self:any = this;

        let parser = new egret.HtmlTextParser();
        let textflowArr:Array<Array<egret.ITextElement>> = [];
        for (let i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        let textfield = self.textfield;
        let count = -1;
        let change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            let tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


