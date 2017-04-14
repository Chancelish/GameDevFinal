/* global World PlayWorld config */
class MainMenu extends World {
    constructor(game, _p) {
        super(game);
        if (!config.remapper) {
            config.remapper = function() {
                let remapping = false;
                let target = null;
                let rmpr = {};
                rmpr.remap = function(_t) {
                    target = _t;
                    remapping = true;
                };
                window.addEventListener("keyup", function(event) {
                    if (remapping) {
                        if (event.key === "Left" || event.key === "ArrowLeft" || event.key === "Right" || event.key === "ArrowRight"  || event.key === "Up" || event.key === "ArrowUp"  || event.key === "Down" || event.key === "ArrowDown") {
                            remapping = false;
                            return;
                        }
                        else if (event.key === "Escape" || event.key === "Enter") {
                            remapping = false;
                            return;
                        }
                        config[target] = event.key;
                        remapping = false;
                    }
                });
                return rmpr;
            }();
        }
        let page;
        this.getPage = () => {
            return page;
        };
        this.gotoPage = (_page) => {
            if (_page === 0) {
                page = _page;
                this.choice = 0;
                this.choiceMax = 3;
            }
            if (_page === 1) {
                page = _page;
            }
            if (_page === 2) {
                page = _page;
                //highscores
            }
            if (_page === 3) {
                page = _page;
                //credits
            }
        };
        this.gotoPage(_p);
    }
    update(_dt) {
        if (this.requestInput("ArrowUp", "pressed") || this.requestInput("ArrowLeft", "pressed") || this.requestInput("Up", "pressed") || this.requestInput("Left", "pressed") || this.requestInput(config.keyUp, "pressed")  || this.requestInput(config.keyLeft, "pressed")) {
            this.choice--;
            if (this.choice < 0) {
                this.choice = this.choiceMax;
            }
        }
        if (this.requestInput("ArrowDown", "pressed") || this.requestInput("ArrowRight", "pressed") || this.requestInput("Down", "pressed") || this.requestInput("Right", "pressed") || this.requestInput(config.keyDown, "pressed")  || this.requestInput(config.keyRight, "pressed")) {
            this.choice++;
            if (this.choice > this.choiceMax) {
                this.choice = 0;
            }
        }
        let mPos = this.requestMousePosition(true);
        if (this.getPage() === 0) {
            if (this.requestInput("Enter", "pressed") || this.requestInput(config.actionKey, "pressed")) {
                if (this.choice === 0) {
                    this.getGame().setWorld(new PlayWorld(this.getGame(), "start", 320, 320));
                }
                else {
                    this.gotoPage(this.choice);
                }
            }
            for (let i = 0; i <= this.choiceMax; i++) {
                if (mPos.x >= 90 && mPos.x < 270 && mPos.y >= 220 + 40 * i && mPos.y < 260 + 40 * i) {
                    if (this.requestMouseInput("pressed")) {
                        if (i === 0) {
                            this.getGame().setWorld(new PlayWorld(this.getGame(), "start", 320, 320));
                        }
                        else {
                            this.gotoPage(i);
                        }
                    }
                }
            }
        }
        else if (this.getPage() === 1) {
            if (this.requestInput("Escape", "pressed")) {
                this.gotoPage(0);
            }
            for (let i = 0; i <= 3; i++) {
                if (mPos.x >= 85 && mPos.x < 285 && mPos.y >= 170 + 40 * i && mPos.y < 210 + 40 * i) {
                    if (this.requestMouseInput("pressed")) {
                        if (i === 0) {
                            config.remapper.remap("keyUp");
                        }
                        else if (i === 1) {
                            config.remapper.remap("keyLeft");
                        }
                        else if (i === 2) {
                            config.remapper.remap("keyRight");
                        }
                        else if (i === 3) {
                            config.remapper.remap("keyDown");
                        }
                    }
                }
            }
        }
    }
    render(_g) {
        let mPos = this.requestMousePosition(true);
        if (this.getPage() === 0) {
            for (let i = 0; i <= this.choiceMax; i++) {
                if (mPos.x >= 90 && mPos.x < 270 && mPos.y >= 220 + 40 * i && mPos.y < 260 + 40 * i) {
                    _g.rectangle(90, 220 + 40 * i, 180, 40, "#8D8AA4", "fill");
                }
            }
            let tsLeft = 90;
            let tsTop = 220;
            _g.rectangle(tsLeft, tsTop + 40 * this.choice, 180, 40, "#EDDA74", "stroke", 10);
            _g.text("Play", tsLeft + 10, tsTop + 30, "#FFFFFF", "Verdana", 24);
            _g.text("Controls", tsLeft + 10, tsTop + 70, "#FFFFFF", "Verdana", 24);
            _g.text("High Scores", tsLeft + 10, tsTop + 110, "#FFFFFF", "Verdana", 24);
            _g.text("Credits", tsLeft + 10, tsTop + 150, "#FFFFFF", "Verdana", 24);
            _g.text("Arrows or "+config.keyUp+config.keyLeft+config.keyDown+config.keyRight+" to move, enter or "+config.actionKey+" to select", 40, 420, "#FFFFFF", "Verdana", 16);
        }
        if (this.getPage() === 1) {
            for (let i = 0; i <= 3; i++) {
                if (mPos.x >= 85 && mPos.x < 285 && mPos.y >= 170 + 40 * i && mPos.y < 210 + 40 * i) {
                    _g.rectangle(85, 170 + 40 * i, 200, 40, "#8D8AA4", "fill");
                }
            }
            for (let i = 0; i <= 3; i++) {
                _g.rectangle(85, 170 + 40 * i, 200, 40, "#8DA3B4", "stroke", 5);
            }
            for (let i = 0; i <= 1; i++) {
                if (mPos.x >= 295 && mPos.x < 495 && mPos.y >= 170 + 40 * i && mPos.y < 210 + 40 * i) {
                    _g.rectangle(295, 170 + 40 * i, 200, 40, "#8D8AA4", "fill");
                }
            }
            for (let i = 0; i <= 1; i++) {
                _g.rectangle(295, 170 + 40 * i, 200, 40, "#8DA3B4", "stroke", 5);
            }
            _g.text("Move Up: [" + config.keyUp + "]", 90, 200, "#FFFFFF", "Verdana", 24);
            _g.text("Move Left: [" + config.keyLeft + "]", 90, 240, "#FFFFFF", "Verdana", 24);
            _g.text("Move Right: [" + config.keyRight + "]", 90, 280, "#FFFFFF", "Verdana", 24);
            _g.text("Move Down: [" + config.keyDown + "]", 90, 320, "#FFFFFF", "Verdana", 24);
            _g.text("Action Key: [" + config.actionKey + "]", 300, 200, "#FFFFFF", "Verdana", 24);
            _g.text("Item Key: [" + config.itemKey + "]", 300, 240, "#FFFFFF", "Verdana", 24);
            _g.text("To change a control, click a control, then press the desired key.", 40, 420, "#FFFFFF", "Verdana", 16);
            _g.text("Arrows, Enter, and Escape are special and cannot be remapped.", 40, 445, "#FFFFFF", "Verdana", 16);
            _g.text("Press Escape to go back.", 40, 470, "#FFFFFF", "Verdana", 16);
        }
    }
}