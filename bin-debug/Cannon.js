/*
 * 大炮类
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cannon = (function (_super) {
    __extends(Cannon, _super);
    function Cannon() {
        var _this = _super.call(this) || this;
        _this.addChild(_this.createBody());
        return _this;
    }
    Cannon.prototype.createBody = function () {
        var body = new egret.Shape();
        body.graphics.beginFill(0xffffff);
        body.graphics.drawRect(18, -4, 50, 8);
        body.graphics.drawRect(70, -6, 6, 12);
        body.graphics.endFill();
        return body;
    };
    return Cannon;
}(egret.DisplayObjectContainer));
__reflect(Cannon.prototype, "Cannon");
//# sourceMappingURL=Cannon.js.map