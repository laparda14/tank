/*
 * 坦克类
*/

class Tank extends egret.DisplayObjectContainer {

    private cannon: Cannon;
    public tankBd: Box2D.Dynamics.b2Body;
    private factor: number;
    public constructor(factor: number, world: Box2D.Dynamics.b2World, sHeight: number) {
        super();
        this.factor = factor;
        this.tankBd= this.createBox(Math.random() * 100 + 350,sHeight - 150, factor, world);

        // this.addChild(this.createTower());
        // this.addChild(this.createBody());
        // this.addChild(this.createBelt());
        // let tyreX = -33;

        // // 定位原点
        // let point: egret.Shape = new egret.Shape();
        // point.graphics.beginFill(0xff0b0b);
        // point.graphics.drawCircle(0, 0, 1);
        // point.graphics.endFill();
        // this.addChild(point);


        // for(let i:number = 0; i < 4; i++) {
        //     this.addChild(this.createTyre(tyreX + i * 21 + 2, 30, 9));
        // }

        // tank.width = tankBd.get * factor;
        // tank.height = tankBd.height * factor;
        // this.x = this.tankBd.GetPosition().x * factor;
        // this.y = this.tankBd.GetPosition().y * factor;
        // this.rotation = this.tankBd.GetAngle() * 180 / Math.PI;
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
        // this.addChild(cannon);
        // this.cannon = cannon;
    }

    public fire() :void {
        this.cannon.fire();
    }

    public aim(): void{
        
    }

    public updatePos(): void {
        this.x = this.tankBd.GetPosition().x * this.factor;
        this.y = this.tankBd.GetPosition().y * this.factor;
        this.rotation = this.tankBd.GetAngle() * 180 / Math.PI;
    }

    private createBox(posX:number,posY:number,factor:number, world): Box2D.Dynamics.b2Body{
        var bodyDef:Box2D.Dynamics.b2BodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.position = new Box2D.Common.Math.b2Vec2(posX/factor,posY/factor);
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        var body:Box2D.Dynamics.b2Body = world.CreateBody(bodyDef);

        var poly:Box2D.Collision.Shapes.b2PolygonShape;
        var vertices:Box2D.Common.Math.b2Vec2[] = [
            new Box2D.Common.Math.b2Vec2(0, -15/factor),
            new Box2D.Common.Math.b2Vec2(50/factor, 40/factor),
            new Box2D.Common.Math.b2Vec2(-50/factor, 40/factor)
        ];
        poly = Box2D.Collision.Shapes.b2PolygonShape.AsArray(vertices, 3);
        var fixtureDef:Box2D.Dynamics.b2FixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.density = 3;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = poly;

        body.CreateFixture(fixtureDef);
        return body;
    }
}