/* global KeyManager Graphics Image MouseManager performance navigator */
class MyGame {
    constructor(width = 640, height = 480, scale = 2) {
        MyGame.WIDTH = width;
        MyGame.HEIGHT = height;
        MyGame.SCALE = scale;
        //global configurable keys, because I'm at a loss here.
        config.keyUp = "i";
        config.keyDown = "k";
        config.keyLeft = "j";
        config.keyRight = "l";
        config.actionKey = "x";
        config.itemKey = "z";
        config.keyMapper = null;
        //end global
        this.muted = false;
        this.imgs = [];
        this.maps = [];
        this.snds = [];
        this.camera = {x: 0, y: 0};
        this.colour = "#000000";
        navigator.sayswho= (function(){
            var N= navigator.appName, ua= navigator.userAgent, tem;
            var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
            M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
            return M;
        })();
        let browser = "f";
        if (navigator.sayswho[0] == "Firefox") {
	        browser="f";
        }
        else if (navigator.sayswho[0] == "Chrome") {
	        browser="c";
        }
        else if (navigator.sayswho[0] == "Safari") {
	        browser="s";
        }
        else  if (navigator.sayswho[0] == "Microsoft") {
	        browser="m";
        }
        this.keyManager = new KeyManager();
        this.mouseManager = new MouseManager(browser);
        this.g = new Graphics(width, height, scale);
        this.canvas = document.getElementById("canvas");
        this.state = 1;
        this.imgCount = 0;
        this.imgsToLoad = 0;
        this.lvlCount = 0;
        this.lvlsToLoad = 0;
        let previous = performance.now();
        let delta = 0;
        let timer = 0;
        this.gameLoop = (time) => {
            if (this.running) {
                if (!document.hasFocus()) {
                    requestAnimationFrame((this.gameLoop));
                    return;
                }
                delta = time - previous;
                timer += delta;
                previous = time;
                this.update(delta/1000);
                this.render();
                /*while (timer >= this.timePerTick) {
                    this.update(this.timePerTick / 1000);
                    timer -= this.timePerTick;
                    if (timer < this.timePerTick) {
                        this.render();
                    }
                }*/
            }
            requestAnimationFrame((this.gameLoop));
        };
    }
    start() {
        this.onInit();
        this.timePerTick = 1000 / 60;
        this.running = true;
        requestAnimationFrame((this.gameLoop));
    }
    /**
     * Override this to set your own world and other variables.
     */
    onInit() {
        this.setWorld(new SplashScreen(this));
    }
    update(_dt) {
        this.keyManager.preUpdate(config.keyUp);
        this.keyManager.preUpdate(config.keyDown);
        this.keyManager.preUpdate(config.keyLeft);
        this.keyManager.preUpdate(config.keyRight);
        this.keyManager.preUpdate(config.actionKey);
        this.keyManager.preUpdate(config.itemKey);
        this.keyManager.preUpdate("ArrowUp");
        this.keyManager.preUpdate("ArrowDown");
        this.keyManager.preUpdate("ArrowLeft");
        this.keyManager.preUpdate("ArrowRight");
        this.keyManager.preUpdate("Up");
        this.keyManager.preUpdate("Down");
        this.keyManager.preUpdate("Left");
        this.keyManager.preUpdate("Right");
        this.keyManager.preUpdate("Enter");
        this.keyManager.preUpdate("Escape");
        this.mouseManager.preUpdate();
        if (this.world) {
            if (this.requestKeyData("m", "pressed")) {
                if (this.muted) {
                    this.unmute();
                }
                else {
                    this.mute();
                }
            }
            this.world.update(_dt);
            this.world.cleanup();
        }
        this.keyManager.postUpdate(config.keyUp);
        this.keyManager.postUpdate(config.keyDown);
        this.keyManager.postUpdate(config.keyLeft);
        this.keyManager.postUpdate(config.keyRight);
        this.keyManager.postUpdate(config.actionKey);
        this.keyManager.postUpdate(config.itemKey);
        this.keyManager.postUpdate("ArrowUp");
        this.keyManager.postUpdate("ArrowDown");
        this.keyManager.postUpdate("ArrowLeft");
        this.keyManager.postUpdate("ArrowRight");
        this.keyManager.postUpdate("Up");
        this.keyManager.postUpdate("Down");
        this.keyManager.postUpdate("Left");
        this.keyManager.postUpdate("Right");
        this.keyManager.postUpdate("Enter");
        this.keyManager.postUpdate("Escape");
        this.mouseManager.postUpdate();
    }
    render() {
        this.g.clear();
        this.g.rectangle(0, 0, MyGame.WIDTH, MyGame.HEIGHT, this.colour);
        if (this.world) {
            this.world.render(this.g);
        }
    }
    /**
     * Adds an image to the game and stores it as an html Image element
     * @param _key  The name of the image to reference in game
     * @param _path The relative filepath of the image.
     */
    addImage(_key, _path) {
        this.imgs[_key] = new Image();
        this.imgs[_key].onload = () => this.imageLoaded();
        this.imgs[_key].src = _path;
        this.imgsToLoad++;
    }
    addSound(_key, _path) {
        this.snds[_key] = new Audio();
        this.snds[_key].src = _path;
    }
    /**
     * Adds a level to the game and stores as an xml request
     * @param _key
     * @param _path
     */
    addLevelXML(_key, _path) {
        this.maps[_key] = new XMLHttpRequest();
        this.maps[_key].onreadystatechange = () => this.levelLoaded(_key);
        this.maps[_key].open("GET", _path);
        this.maps[_key].responseType = "document";
        this.maps[_key].send();
        this.lvlsToLoad++;
    }
    addLevelJSON(_key, _path) {
        this.maps[_key] = new XMLHttpRequest();
        this.maps[_key].onreadystatechange = () => this.levelLoaded(_key);
        this.maps[_key].open("GET", _path);
        this.maps[_key].send();
        this.lvlsToLoad++;
    }
    /**
     * Override This: Loads in images and levels.
     */
    loadImages() {
        this.addImage("marcus", "./assets/marcus.png");
        this.addImage("knight", "./assets/knight.png");
        this.addImage("overworld", "./assets/overworld.png");
        this.addImage("cave", "./assets/cave.png");
        this.addImage("inner", "./assets/inner.png")
    }
    loadLevels() {
        this.addLevelJSON("start", "./assets/start.json");
    }
    imageLoaded() {
        this.imgCount += 1;
        if (this.imgCount >= this.imgsToLoad && !this.running) {
            this.loadLevels();
        }
    }
    levelLoaded(s) {
        if (this.maps[s].readyState === XMLHttpRequest.DONE) {
            if (this.maps[s].status === 200) {
                this.lvlCount += 1;
                if (this.lvlCount >= this.lvlsToLoad && !this.running) {
                    this.start();
                }
            }
            else {
            }
        }
    }
    setWorld(_w) {
        this.world = _w;
        _w.begin();
        this.g.camera = this.camera;
    }
    /* Saves game data to local storage, override to manage own data */
    static saveGame() {
        
    }
    /* loads game from local storage if availible */
    static loadGame() {
        
    }
    static reset() {
        
    }
    requestKeyData(key, mode = "held") {
        return this.keyManager[mode](key);
    }
    requestMouseData(mode = "held") {
        return this.mouseManager[mode]();
    }
    getCanvasMousePos() {
        let rect = this.canvas.getBoundingClientRect();
        let coords = this.mouseManager.getRawCoords();
        coords.x = (coords.x - rect.left)/MyGame.SCALE + this.camera.x;
        coords.y = (coords.y - rect.top)/MyGame.SCALE + this.camera.y;
        return coords;
    }
    getWindowMousePos() {
        return this.mouseManager.getRawCoords();
    }
    requestImage(name) {
        return this.imgs[name];
    }
    requestSound(name) {
        return this.snds[name];
    }
    requestMapData(name) {
        return this.maps[name];
    }
    mute() {
        for (let sound in this.snds) {
            this.snds[sound].volume = 0;
            this.snds[sound].pause();
            this.snds[sound].currentTime = 0;
        }
        this.muted = true;
    }
    unmute() {
        for (let sound in this.snds) {
            this.snds[sound].volume = 1;
        }
        if (this.snds["mus1"].paused && this.snds["mus1"].paused) {
            this.snds["mus1"].play();
        }
        this.muted = false;
    }
}
MyGame.WIDTH = 720;
MyGame.HEIGHT = 768;
MyGame.SCALE = 1;
MyGame.textLanguage = "English";
let config = {};
config.remapper = null; 
window.onload = () => {
    var myGame = new MyGame();
    myGame.imgCount = 0;
    myGame.loadImages();
};

