class MouseManager {
    constructor(_bsr) {
        let broswer = _bsr;
        let unfilteredX = 0;
        let unfilteredY = 0;
        let mouse = false;
        let mouseT = false;
        let mouseL = false;
        window.addEventListener("mousedown", function(event) {
            mouse = true;
        });
        window.addEventListener("mouseup", function(event) {
            mouse = false;
        });
        window.addEventListener("mousemove", function(event) {
            unfilteredX = event.clientX;
            unfilteredY = event.clientY;
        })
        this.pressed = () => {
            return (mouseT && !mouseL);
        };
        this.released = () => {
            return (mouseL && !mouseT);
        };
        this.held = () => {
            return mouseT;
        };
        this.getRawCoords = () => {
            return {
                x: unfilteredX,
                y: unfilteredY
            };
        };
        this.preUpdate = () => {
            mouseT = mouse;
        };
        this.postUpdate = () => {
            mouseL = mouse;
        };
    }
}