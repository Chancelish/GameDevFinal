/* global World GridMask TiledImage Entity GameSprite Marcus Knight */
class PlayWorld extends World {
    constructor(game, lvl, _sx, _sy) {
        super(game);
        let zone = JSON.parse(game.maps[lvl].responseText);
        let wm = new GridMask(0, 0, zone.tilewidth, zone.width, zone.height);
        for (let i = 0; i < zone.layers[0].data.length; i++) {
            if (zone.layers[0].data[i]) {
                zone.layers[0].data[i] -= 1600;
            }
        }
        wm.loadFromArray(zone.layers[0].data);
        let tr = new TiledImage(this.requestImage("overworld"), zone.width, zone.height, zone.tilewidth);
        for (let i = 0; i < zone.layers[1].data.length; i++) {
            zone.layers[1].data[i] -= 1;
        }
        tr.loadFromArray(zone.layers[1].data);
        let walls  = new Entity(0, 0, tr, wm);
        walls.setType("wall");
        this.addEntity(walls);
        let fr = new TiledImage(this.requestImage("overworld"), zone.width, zone.height, zone.tilewidth);
        for (let i = 0; i < zone.layers[2].data.length; i++) {
            zone.layers[2].data[i] -= 1;
        }
        fr.loadFromArray(zone.layers[2].data);
        this.addEntity(new Entity(0, 0, fr));
        for (let i = 0; i < zone.layers[3].objects.length; i++) {
            if (zone.layers[3].objects[i].type === "knight") {
                this.addEntity(new Knight(zone.layers[3].objects[i].x, zone.layers[3].objects[i].y, new GameSprite(this.requestImage("knight"), 32, 32)));
            }
        }
        this.addEntity(new Marcus(_sx, _sy, new GameSprite(this.requestImage("marcus"), 32, 32)));
    }
}