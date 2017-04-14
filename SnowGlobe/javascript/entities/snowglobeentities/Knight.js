/* global Entity */
class Knight extends Entity {
    constructor(_x, _y, image) {
        super(_x, _y, image);
        image.add("w_down", [0, 1, 0, 2]);
        image.add("w_right", [3, 4, 3, 5]);
        image.add("w_up", [6, 7, 6, 8]);
        image.add("w_left", [9, 10 , 9, 11]);
        this.setHitBox(26, 26, 3, 4);
        this.setType("player");
        this.facing = "down";
        this.standardSpeed = 60;
    }
    update(_dt) {
        
    }
    findPath(endX, endY) {
        
    }
}