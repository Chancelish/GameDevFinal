/* global Entity */
class Warlock extends Entity {
    constructor(_x, _y, image) {
        
    }
    update(_dt) {
        if (!this.target) {
            this.target = this.world.findByName("Marcus");
            return;
        }
        let angleToTarget = Math.atan2(this.y - this.target.y, this.x - this.target.x) + Math.PI;
        if (this.timer >= 0) {
            this.timer--;
        }
        if (angleToTarget < Math.PI/4 || angleToTarget >= 7 * Math.PI/4) {
            this.image.play("w_right");
        }
        else if (angleToTarget < 3 * Math.PI/4) {
            this.image.play("w_down");
        }
        else if (angleToTarget < 5 * Math.PI/4) {
            this.image.play("w_left");
        }
        else {
            this.image.play("w_up");
        }
    }
}