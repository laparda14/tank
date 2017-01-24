/*
 * 坦克类
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tank = (function (_super) {
    __extends(Tank, _super);
    function Tank() {
        var _this = _super.call(this) || this;
        _this.addChild(_this.createTower());
        _this.addChild(_this.createBody());
        _this.addChild(_this.createBelt());
        var tyreX = -33;
        for (var i = 0; i < 4; i++) {
            _this.addChild(_this.createTyre(tyreX + i * 21 + 2, 30, 9));
        }
        return _this;
    }
    Tank.prototype.createTower = function () {
        var tower = new egret.Shape();
        tower.graphics.beginFill(0xffffff);
        tower.graphics.drawCircle(0, 0, 15);
        tower.graphics.endFill();
        return tower;
    };
    Tank.prototype.createTyre = function (x, y, radius) {
        var tyre = new egret.Shape();
        tyre.graphics.beginFill(0xffffff);
        tyre.graphics.drawCircle(x, y, radius);
        tyre.graphics.endFill();
        return tyre;
    };
    Tank.prototype.createBelt = function () {
        var belt = new egret.Shape();
        belt.graphics.lineStyle(2, 0xffffff, 1);
        belt.graphics.drawRoundRect(-45, 20, 90, 20, 20);
        belt.graphics.endFill();
        return belt;
    };
    Tank.prototype.createBody = function () {
        var body = new egret.Shape();
        body.graphics.beginFill(0xffffff);
        body.graphics.drawRoundRect(-40, 0, 80, 15, 5);
        body.graphics.endFill();
        return body;
    };
    return Tank;
}(egret.DisplayObjectContainer));
__reflect(Tank.prototype, "Tank");
//# sourceMappingURL=Tank.js.map