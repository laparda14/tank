/*
 * 背景类，远近景
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bg = (function (_super) {
    __extends(Bg, _super);
    function Bg(stage) {
        var _this = _super.call(this) || this;
        _this.tiles = [];
        _this.stageWidth = stage.$stageWidth;
        _this.stageHeight = stage.$stageHeight;
        for (var i = 0; i < 3; i++) {
            var tile = _this.createTile();
            tile.x = i * _this.stageWidth;
            tile.y = 0;
            _this.tiles.push(tile);
            _this.addChild(tile);
        }
        return _this;
    }
    Bg.prototype.createTile = function () {
        var tile = new egret.Shape();
        var spacing = this.stageWidth / 20;
        tile.graphics.lineStyle(1, 0x5a5757, 1);
        for (var i = 0; i < 20; i++) {
            var distant = spacing * i;
            // 横线
            tile.graphics.moveTo(distant, 0);
            tile.graphics.lineTo(distant, this.stageWidth);
            if (distant < this.stageHeight) {
                tile.graphics.moveTo(0, distant);
                tile.graphics.lineTo(this.stageWidth, distant);
            }
        }
        tile.graphics.endFill();
        return tile;
    };
    return Bg;
}(egret.DisplayObjectContainer));
__reflect(Bg.prototype, "Bg");
//# sourceMappingURL=Bg.js.map