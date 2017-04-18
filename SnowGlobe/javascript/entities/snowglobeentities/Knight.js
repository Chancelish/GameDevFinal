/* global Entity */
class Knight extends Entity {
    constructor(_x, _y, image) {
        super(_x, _y, image);
        image.add("w_down", [0, 1, 0, 2]);
        image.add("w_right", [3, 4, 3, 5]);
        image.add("w_up", [6, 7, 6, 8]);
        image.add("w_left", [9, 10 , 9, 11]);
        this.setHitBox(26, 26, 3, 4);
        this.setType("knight");
        this.standardSpeed = 64;
        this.timer = 0.5;
    }
    update(_dt) {
        if (!this.alive) {
            
        }
        this.image.update(_dt);
        this.timer -= _dt;
        if (this.timer <= 0) {
            this.timer += 0.5;
            this.findPath();
        }
        this.moveBy(this.getXSpeed()*_dt, this.getYSpeed()*_dt, "wall");
    }
    findPath(endX, endY) {
        let xP = this.world.getCamera().x;
        let yP = this.world.getCamera().y;
        let checker = new Entity(xP, yP);
        let pathFound = false;
        let path = [];
        this.world.addEntity(checker);
        let nodes = [];
        let startNode = null;
        let targetNode = null;
        checker.setHitBox(32, 32);
        for (let iy = 0; iy < 15; iy ++) {
            nodes[iy] = [];
            for (let ix = 0; ix < 20; ix++) {
                nodes[iy][ix] = {};
                nodes[iy][ix].x = ix;
                nodes[iy][ix].y = iy;
                if (checker.collideTypes("wall", xP + 32* ix, yP + 32 * iy)) {
                    nodes[iy][ix].passable = false;
                }
                else {
                    nodes[iy][ix].passable = true;
                }
                nodes[iy][ix].visited = false;
                nodes[iy][ix].parent = null;
                if (checker.collideTypes("player", xP + 32* ix, yP + 32 * iy)) {
                    targetNode = nodes[iy][ix];
                }
                else if (checker.collideEntity(this, xP + 32* ix, yP + 32 * iy)){
                    startNode = nodes[iy][ix];
                }
            }
        }
        let queue = [];
        queue.push(startNode);
        
        checker.destroy();
        if (pathFound) {
            this.setYSpeed(this.standardSpeed * (path[path.length-2].y - path[path.length-1].y));
            this.setXSpeed(this.standardSpeed * (path[path.length-2].x - path[path.length-1].x));
        }
        else {
            this.setSpeed(this.standardSpeed);
            this.setDirection(Math.floor(Math.random()*4)*Math.PI/2);
        }
        if (this.getDirection() < Math.PI/4 || this.getDirection() >= 7 * Math.PI/4) {
            this.image.play("w_right", 10, true);
        }
        else if (this.getDirection() < 3 * Math.PI/4) {
            this.image.play("w_down", 10, true);
        }
        else if (this.getDirection() < 5 * Math.PI/4) {
            this.image.play("w_left", 10, true);
        }
        else {
            this.image.play("w_up", 10, true);
        }
    }
}