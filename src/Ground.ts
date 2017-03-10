/*
 * 地面类
*/

class Ground extends egret.DisplayObjectContainer {

   public constructor(posX:number,posY:number,w:number,h:number,factor:number, world){
       super();
        var bodyDef:Box2D.Dynamics.b2BodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.position = new Box2D.Common.Math.b2Vec2(posX/factor,posY/factor);
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        var body:Box2D.Dynamics.b2Body = world.CreateBody(bodyDef);

        var vertices:Box2D.Common.Math.b2Vec2[] = [
            new Box2D.Common.Math.b2Vec2(0,0),
            new Box2D.Common.Math.b2Vec2(150/factor,-10/factor),
            new Box2D.Common.Math.b2Vec2(250/factor,1/factor),
            new Box2D.Common.Math.b2Vec2(350/factor,-20/factor),
            new Box2D.Common.Math.b2Vec2(450/factor,-11/factor),
            new Box2D.Common.Math.b2Vec2(650/factor,0/factor),
            new Box2D.Common.Math.b2Vec2(750/factor,-11/factor),
            new Box2D.Common.Math.b2Vec2(850/factor,0/factor),
            new Box2D.Common.Math.b2Vec2(950/factor,-11/factor),
            new Box2D.Common.Math.b2Vec2(1350/factor,0/factor),
        ];
        for (var i = 1; i<vertices.length; i++)
        {
            var v1:Box2D.Common.Math.b2Vec2 = vertices[i-1];
            var v2:Box2D.Common.Math.b2Vec2 = vertices[i];
            var edge:Box2D.Collision.Shapes.b2PolygonShape = new Box2D.Collision.Shapes.b2PolygonShape();
            edge.SetAsEdge(v1,v2);
            var fixtureDef:Box2D.Dynamics.b2FixtureDef = new Box2D.Dynamics.b2FixtureDef();
            fixtureDef.shape = edge;
            body.CreateFixture(fixtureDef);
        }
    }

}