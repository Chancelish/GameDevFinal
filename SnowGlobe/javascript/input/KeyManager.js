class KeyManager {
    constructor() {
        let keys = [];
        let keysT = [];
        let keysL = [];
        let lastKeyPressed = null;
        window.addEventListener("keydown", keyDown, true);
        window.addEventListener("keyup", keyRelease);
        window.addEventListener("keypress", function (event) {
            event.preventDefault();
            event.stopPropagation();
        }, true);
        function keyDown(event) {
            keys[event.key] = true;
            event.preventDefault();
            event.stopPropagation();
        }
        function keyRelease(event) {
            keys[event.key] = false;
            lastKeyPressed = event.key;
        }
        this.preUpdate = (key) => {
            keysT[key] = keys[key];
        };
        this.postUpdate = (key) => {
            keysL[key] = keys[key];
        };
        this.pressed = (key) => {
            return (keysT[key] && !keysL[key]);
        };
        this.released = (key) => {
            return (keysL[key] && !keysT[key]);
        };
        this.held = (key) => {
            return keys[key];
        };
        this.lastKey = () => {
            return lastKeyPressed;
        };
    }
}