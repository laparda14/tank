/*
 * 按钮类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(radius) {
        var _this = _super.call(this) || this;
        _this.radius = radius;
        _this.bg = new egret.Shape();
        _this.bg.graphics.beginFill(0x000000, 1);
        _this.bg.$setAlpha(0.1);
        _this.bg.graphics.drawCircle(0, 0, _this.radius);
        _this.bg.graphics.endFill();
        _this.addChild(_this.bg);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchStop, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.onTouchStop, _this);
        return _this;
    }
    Button.prototype.onTouch = function () {
        this.bg.$setAlpha(0.3);
    };
    Button.prototype.onTouchStop = function () {
        this.bg.$setAlpha(0.2);
    };
    return Button;
}(egret.DisplayObjectContainer));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map