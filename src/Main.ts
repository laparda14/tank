
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
    private world:Box2D.Dynamics.b2World;
    private debug:Box2D.Dynamics.b2DebugDraw;
    private factor:number = 30;
    private createGameScene():void {
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
        this.detectOrientation();

        let bg: Bg = new Bg(this.stage);
        this.addChild(bg);

        var sWidth:number = this.stage.stageWidth;
        var sHeight:number = this.stage.stageHeight;

        var gravity:Box2D.Common.Math.b2Vec2 = new Box2D.Common.Math.b2Vec2(0,10);
        this.world = new Box2D.Dynamics.b2World(gravity,true);
        this.createDebug();
        
        new Ground(0,sHeight - 10,sWidth,100, this.factor, this.world);

        var self = this;
        var tank: Tank = new Tank(this.factor, this.world, sHeight);
        
        this.addChild(tank);

		egret.Ticker.getInstance().register(function (dt) {
			if (dt < 10) {
				return;
			}
			if (dt > 1000) {
				return;
			}
            this.world.Step(dt / 1000, 10, 10);
            this.world.DrawDebugData();
            tank.updatePos();
		}, this);

        // 摇杆
        let wheel: Wheel = new Wheel(this.stage, 80, 40, 0x000000, 0.5, 0x999999, 0.5);
        wheel.x = 150;
        wheel.y = 500;
        this.addChild(wheel);
        this.addEventListener('wheel', function(e) {
            console.log(e);
        }, this);

        // 发射按钮
        let fireBtn: FireBtn = new FireBtn(80);
        fireBtn.x = 950;
        fireBtn.y = 500;
        this.addChild(fireBtn);

        function fire() :void {
            tank.fire();
        }
        fireBtn.addEventListener(egret.TouchEvent.TOUCH_END, fire, this);
    }
    
    private createDebug(){
        var s:egret.Sprite = new egret.Sprite();
        this.addChild(s);
        this.debug = new Box2D.Dynamics.b2DebugDraw();
        this.debug.SetSprite(s);
        this.debug.SetDrawScale(this.factor);
        this.debug.SetLineThickness(1);
        this.debug.SetAlpha(0.8);
        this.debug.SetFillAlpha(0.5);
        this.debug.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit);
        this.world.SetDebugDraw(this.debug);
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


