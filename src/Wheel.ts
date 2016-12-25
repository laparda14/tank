/*
 * 控制轴组件
 */

class Wheel extends egret.DisplayObjectContainer {
    public x: number;
    public y: number;

    private panel: egret.Shape = new egret.Shape();
    private panelColor: number;
    private panelOpacity: number;
    private panelRadius: number;

    private rocker: egret.Shape = new egret.Shape();
    private rockerColor: number;
    private rockerOpacity: number;
    private rockerRadius: number;

    private initX: number;
    private initY: number;

    public stage: egret.Stage;

    public constructor(stage, panelRadius, rockerRadius, panelColor, panelOpacity, rockerColor, rockerOpacity) {
        super();

        this.panelColor = panelColor;
        this.panelOpacity = panelOpacity;
        this.panelRadius = panelRadius;

        this.rocker.x = this.rocker.y = this.panel.x = this.panel.y = 0;

        this.rockerColor = rockerColor;
        this.rockerOpacity = rockerOpacity;
        this.rockerRadius = rockerRadius;

        this.addChild(this.panel);
        this.addChild(this.rocker);
        let point:egret.Shape = new egret.Shape();
        point.graphics.beginFill(0x000000, 1);
        point.graphics.drawCircle(0, 0, 1);
        point.graphics.endFill;
        this.addChild(point);

        this.draw();
        this.touchEnabled = true;

        this.stage = stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.initOriPoint, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.stopMove, this);
    }
    

    private draw() {
        this.panel.graphics.beginFill(this.panelColor, this.panelOpacity)
        this.panel.graphics.drawCircle(0, 0, this.panelRadius);
        this.panel.graphics.endFill;
        this.rocker.graphics.beginFill(this.rockerColor, this.rockerOpacity);
        this.rocker.graphics.drawCircle(0, 0, this.rockerRadius);
        this.rocker.graphics.endFill;
    }

    private stopMove(e: egret.TouchEvent):void {
        this.rocker.x = this.rocker.y = 0;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    }

    private offsetX: number;
    private offsetY: number;
    private initOriPoint(e: egret.TouchEvent):void {
        this.initX = e.stageX;
        this.initY = e.stageY;
        this.offsetX = e.stageX - this.rocker.x;
        this.offsetY = e.stageY - this.rocker.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    }

    private onMove(e: egret.TouchEvent):void {
        let moveX:number = e.stageX;
        let moveY:number = e.stageY;
        let distant:number = Math.sqrt(Math.pow(moveX - this.x, 2) + Math.pow(moveY - this.y, 2));
        console.log('distant', distant);
        if(distant > this.panelRadius) {
            let reg:number = Math.atan2(moveY - this.y, moveX - this.x);
            this.rocker.x = this.panelRadius * Math.cos(reg);
            this.rocker.y = this.panelRadius * Math.sin(reg);
        } else {
            this.rocker.x = e.stageX - this.offsetX;
            this.rocker.y = e.stageY - this.offsetY;
        }
    }
}