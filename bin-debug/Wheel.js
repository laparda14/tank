/*
 * 控制轴组件
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(stage, panelRadius, rockerRadius, panelColor, panelOpacity, rockerColor, rockerOpacity) {
        var _this = _super.call(this) || this;
        // 仪表盘参数
        _this.panel = new egret.Shape();
        // 摇杆参数
        _this.rocker = new egret.Shape();
        _this.panelColor = panelColor;
        _this.panelOpacity = panelOpacity;
        _this.panelRadius = panelRadius;
        _this.rockerColor = rockerColor;
        _this.rockerOpacity = rockerOpacity;
        _this.rockerRadius = rockerRadius;
        _this.rocker.x = _this.rocker.y = _this.panel.x = _this.panel.y = 0;
        _this.addChild(_this.panel);
        _this.addChild(_this.rocker);
        _this.draw();
        _this.touchEnabled = true;
        _this.stage = stage;
        _this.evt = new egret.Event('wheel', true, true);
        _this.evt.data = {};
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.initOriPoint, _this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, _this.stopMove, _this);
        stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, _this.stopMove, _this);
        return _this;
    }
    Wheel.prototype.draw = function () {
        this.panel.graphics.beginFill(this.panelColor, this.panelOpacity);
        this.panel.graphics.drawCircle(0, 0, this.panelRadius);
        this.panel.graphics.endFill;
        this.rocker.graphics.beginFill(this.rockerColor, this.rockerOpacity);
        this.rocker.graphics.drawCircle(0, 0, this.rockerRadius);
        this.rocker.graphics.endFill;
    };
    Wheel.prototype.stopMove = function (e) {
        this.rocker.x = this.rocker.y = 0;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    };
    Wheel.prototype.initOriPoint = function (e) {
        this.offsetX = e.stageX - this.rocker.x;
        this.offsetY = e.stageY - this.rocker.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    };
    Wheel.prototype.onMove = function (e) {
        var moveX = e.stageX;
        var moveY = e.stageY;
        var distant = Math.sqrt(Math.pow(moveX - this.x, 2) + Math.pow(moveY - this.y, 2));
        var deg = Math.atan2(moveY - this.y, moveX - this.x);
        if (distant > this.panelRadius) {
            this.rocker.x = this.panelRadius * Math.cos(deg);
            this.rocker.y = this.panelRadius * Math.sin(deg);
        }
        else {
            this.rocker.x = moveX - this.offsetX;
            this.rocker.y = moveY - this.offsetY;
        }
        this.evt.data.deg = deg;
        this.dispatchEvent(this.evt);
    };
    return Wheel;
}(egret.DisplayObjectContainer));
__reflect(Wheel.prototype, "Wheel");
//# sourceMappingURL=Wheel.js.map