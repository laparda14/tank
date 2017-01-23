/*
 * 发射按钮类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FireBtn = (function (_super) {
    __extends(FireBtn, _super);
    function FireBtn(radius) {
        var _this = _super.call(this, radius) || this;
        var shape = new egret.Shape();
        shape.graphics.lineStyle(8, 0x000000, 0.5);
        shape.graphics.drawArc(0, 0, 30, 0, Math.PI * 2, false);
        shape.graphics.moveTo(-40, 0);
        shape.graphics.lineTo(40, 0);
        shape.graphics.moveTo(0, -40);
        shape.graphics.lineTo(0, 40);
        shape.graphics.endFill();
        _this.addChild(shape);
        return _this;
    }
    return FireBtn;
}(Button));
__reflect(FireBtn.prototype, "FireBtn");
//# sourceMappingURL=FireBtn.js.map