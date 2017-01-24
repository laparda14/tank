/*
 * 坦克类
*/

class Tank extends egret.DisplayObjectContainer {

    private cannon: Cannon;

    public constructor() {
        super();
        this.addChild(this.createTower());
        this.addChild(this.createBody());
        this.addChild(this.createBelt());
        let tyreX = -33;
        for(let i:number = 0; i < 4; i++) {
            this.addChild(this.createTyre(tyreX + i * 21 + 2, 30, 9));
        }
    }

    private createTower(): egret.Shape {
        let tower: egret.Shape = new egret.Shape();
        tower.graphics.beginFill(0xffffff);
        tower.graphics.drawCircle(0, 0, 15);
        tower.graphics.endFill();
        return tower;
    }

    private createTyre(x: number, y: number, radius: number): egret.Shape {
        let tyre: egret.Shape = new egret.Shape();
        tyre.graphics.beginFill(0xffffff);
        tyre.graphics.drawCircle(x, y, radius);
        tyre.graphics.endFill();

        return tyre;
    }

    private createBelt(): egret.Shape {
        let belt: egret.Shape = new egret.Shape();
        belt.graphics.lineStyle(2, 0xffffff, 1);
        belt.graphics.drawRoundRect(-45, 20, 90, 20, 20);
        belt.graphics.endFill();

        return belt;
    }

    private createBody(): egret.Shape {
        let body: egret.Shape = new egret.Shape();
        body.graphics.beginFill(0xffffff);
        body.graphics.drawArc(0, 30, 35, -Math.PI / 8, -Math.PI * 7 / 8, true);
        body.graphics.endFill();

        return body;
    }

    public equip(cannon: Cannon): void {
        this.addChild(cannon);
        this.cannon = cannon;
    }
}