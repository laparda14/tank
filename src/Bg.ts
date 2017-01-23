/*
 * 背景类，远近景
*/

class Bg extends egret.DisplayObjectContainer {
    private tiles: egret.Shape[] = [];
    private stageWidth: number;
    private stageHeight: number;
    public constructor(stage: egret.Stage) {
        super();
        this.stageWidth = stage.$stageWidth;
        this.stageHeight = stage.$stageHeight;
        for(let i:number = 0; i < 3; i++) {
            let tile = this.createTile();
            tile.x = i * this.stageWidth;
            tile.y = 0;
            this.tiles.push(tile);
            this.addChild(tile);
        }
    }

    private createTile(): egret.Shape {
        let tile: egret.Shape = new egret.Shape();
        let spacing: number = this.stageWidth / 20;
        tile.graphics.lineStyle(1, 0x5a5757, 1);
        for(let i: number = 0; i < 20; i++) {
            let distant = spacing * i;
            // 横线
            tile.graphics.moveTo(distant, 0);
            tile.graphics.lineTo(distant, this.stageWidth);
            if(distant < this.stageHeight) {
                tile.graphics.moveTo(0, distant);
                tile.graphics.lineTo(this.stageWidth, distant);
            }
        }
        tile.graphics.endFill();
        return tile;
    }
}