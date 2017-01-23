/*
 * 按钮类
 */

class Button extends egret.DisplayObjectContainer {
    
    // 广播按下事件
    private touchEvent: egret.Event;
    private evt: egret.Event;
    private bg: egret.Shape;
    private radius: number;

    public constructor(radius: number) {
        super();
        this.radius = radius;
        this.bg = new egret.Shape();
        this.bg.graphics.beginFill(0x000000, 1);
        this.bg.$setAlpha(0.1);
        this.bg.graphics.drawCircle(0, 0, this.radius);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchStop, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchStop, this);
    }

    private onTouch():void {
        this.bg.$setAlpha(0.3);
    }

    private onTouchStop():void {
        this.bg.$setAlpha(0.2);
    }
}