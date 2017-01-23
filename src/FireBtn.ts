/*
 * 发射按钮类
 */

class FireBtn extends Button {
    
    public constructor(radius: number) {
        super(radius);
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.lineStyle(8, 0x000000, 0.5);
        shape.graphics.drawArc(0, 0, 30, 0, Math.PI * 2, false);
        shape.graphics.moveTo(-40, 0);
        shape.graphics.lineTo(40, 0);
        shape.graphics.moveTo(0, -40);
        shape.graphics.lineTo(0, 40);
        shape.graphics.endFill();
        this.addChild(shape);
    }

}