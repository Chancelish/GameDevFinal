/* global World MainMenu */
class SplashScreen extends World {
    constructor(game) {
        super(game);
        this.timer = 1;
    }
    update(_dt) {
        this.timer -= _dt;
        if (this.timer <= 0) {
            this.getGame().setWorld(new MainMenu(this.getGame(), 0));
        }
    }
}