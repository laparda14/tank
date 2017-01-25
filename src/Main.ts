
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

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
        this.detectOrientation();

        let bg: Bg = new Bg(this.stage);
        this.addChild(bg);

        let wheel: Wheel = new Wheel(this.stage, 80, 40, 0x000000, 0.5, 0x999999, 0.5);
        wheel.x = 150;
        wheel.y = 500;
        this.addChild(wheel);
        this.addEventListener('wheel', function(e) {
            console.log(e);
        }, this);

        let fireBtn: FireBtn = new FireBtn(80);
        fireBtn.x = 950;
        fireBtn.y = 500;
        this.addChild(fireBtn);

        let tank: Tank = new Tank();
        tank.x = 400;
        tank.y = 300;
        let cannon: Cannon = new Cannon();
        tank.equip(cannon);
        this.addChild(tank);


        // 刚体
		var factor:number = 15;

		//创建world
		var world:p2.World = new p2.World();
		world.sleepMode = p2.World.BODY_SLEEPING;

		//创建plane
		var planeShape:p2.Plane = new p2.Plane();
		var planeBody:p2.Body = new p2.Body({
            position: [0, this.stage.stageWidth / 6 / factor]
        });
		planeBody.addShape(planeShape);
        let ground: egret.Sprite = createGround(this.stage.stageWidth);
        this.addChild(ground);
		planeBody.displays = [ground];
		world.addBody(planeBody);

        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        var debugDraw = new p2DebugDraw(world);
        debugDraw.setSprite(sprite);

		egret.Ticker.getInstance().register(function (dt) {
			if (dt < 10) {
				return;
			}
			if (dt > 1000) {
				return;
			}
			world.step(dt / 1000);
            debugDraw.drawDebug();
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
			var vertices:number[][] = 
            [
                [0, 15/factor],
                [-50/factor, -40/factor],
                [50/factor, -40/factor]
            ];

            var triangleShape: p2.Convex = new p2.Convex({vertices:vertices});
            var boxBody:p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1});
            boxBody.addShape(triangleShape);
            world.addBody(boxBody);

            var display:egret.DisplayObject = new Tank();
            display.width = (<p2.Box>triangleShape).width * factor;
            display.height = (<p2.Box>triangleShape).height * factor;

			boxBody.displays = [display];
			self.addChild(display);
		}

        function createGround(stageWidth): egret.Sprite {
            var result: egret.Sprite = new egret.Sprite();
            result.graphics.beginFill(0x2d78f4);
            result.graphics.drawRect(0,0,stageWidth,40);
            result.graphics.endFill();
            return result;
        }  

    }
    
    // 判断是否是横屏
    private detectOrientation():void {
        if(window.orientation === 0) {
            console.log('show orientation tip');
        }
        this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, function() {
            if(window.orientation !== 90) {
                console.log('show orientation tip');
            } else {
                console.log('hide orientation tip');
            }
        }, this);
    }
}


