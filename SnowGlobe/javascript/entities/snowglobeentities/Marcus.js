/* global Entity config */
class Marcus extends Entity {
    constructor(_x, _y, image) {
        super(_x, _y, image);
        image.add("w_down", [0, 1, 0, 2]);
        image.add("w_right", [3, 4, 3, 5]);
        image.add("w_up", [6, 7, 6, 8]);
        image.add("w_left", [9, 10 , 9, 11]);
        image.add("a_down", [12, 13, 14, 0]);
        image.add("a_left", [15, 16, 17, 3]);
        image.add("a_up", [18, 19, 20, 6]);
        image.add("a_right", [21, 22, 23, 9]);
        image.add("s_down", [0]);
        image.add("s_right", [3]);
        image.add("s_up", [6]);
        image.add("s_left", [9]);
        this.setHitBox(26, 26, 3, 4);
        this.setType("player");
        this.name = "Marcus";
        this.facing = "down";
        this.standardSpeed = 90;
    }
    update(_dt) {
        this.image.update(_dt);
        let moving = false;
        this.setSpeed(0);
        if (this.world.requestInput(config.keyUp) || this.world.requestInput("ArrowUp") || this.world.requestInput("Up")) {
            this.setYSpeed(-this.standardSpeed);
            this.facing = "up";
            if (this.world.requestInput(config.keyLeft) || this.world.requestInput("ArrowLeft") || this.world.requestInput("Left")) {
                this.setDirection(-2.3356194);
            }
            else if (this.world.requestInput(config.keyRight) || this.world.requestInput("ArrowRight") || this.world.requestInput("Right")) {
                this.setDirection(-0.785398);
            }
            moving = true;
        }
        else if (this.world.requestInput(config.keyDown) || this.world.requestInput("ArrowDown") || this.world.requestInput("Down")) {
            this.setYSpeed(this.standardSpeed);
            this.facing = "down";
            if (this.world.requestInput(config.keyLeft) || this.world.requestInput("ArrowLeft") || this.world.requestInput("Left")) {
                this.setDirection(-3.92699);
            }
            else if (this.world.requestInput(config.keyRight) || this.world.requestInput("ArrowRight") || this.world.requestInput("Right")) {
                this.setDirection(-5.49799);
            }
            moving = true;
        }
        else if (this.world.requestInput(config.keyLeft) || this.world.requestInput("ArrowLeft") || this.world.requestInput("Left")) {
            this.setXSpeed(-this.standardSpeed);
            this.facing = "left";
            moving = true;
        }
        else if (this.world.requestInput(config.keyRight) || this.world.requestInput("ArrowRight") || this.world.requestInput("Right")) {
            this.setXSpeed(this.standardSpeed);
            this.facing = "right";
            moving = true;
        }
        if (moving) {
            this.image.play("w_" + this.facing, 10, true);
            this.moveBy(this.getXSpeed() * _dt, this.getYSpeed() * _dt, "wall");
        }
        else {
            this.image.play("s_" + this.facing, 0);
        }
    }
    /*render(_g) {
        this.image.stretched(_g, this.x, this.y, 2, 2);
    }*/
}