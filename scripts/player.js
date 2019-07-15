class Player {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.velocity = 1;

        this.top = 0;
        this.bot = 0;
        this.left = 0;
        this.right = 0;

        this.move = 0;

        this._LAST_UPDATE = performance.now();
    }

    calc_move() {
        let n = 0;
        n = this.right ? 4 : n;
        n = this.left ? 2 : n;
        n = this.bot ? 3 : n;
        n = this.top ? 1 : n;
        this.move = n;
    }

    get_id(map, direct) {
        let x = this.x;
        let y = this.y;

        switch (direct) {
            case 1:
                y -= this.velocity;
                break;
            case 3:
                y += this.velocity;
                break;
            case 2:
                x -= this.velocity;
                break;
            case 4:
                x += this.velocity;
                break;
        }
        return map.data(Math.floor(x), Math.floor(y)).id;
    }

    update(map) {
        const NOW = performance.now();
        if (NOW - this._LAST_UPDATE < 100) {
            return;
        }
        this._LAST_UPDATE = NOW;

        this.calc_move();

        switch (this.move) {
            case 0: //STOP
                break;
            case 1: //TOP
                if (this.y > 0 && this.get_id(map, 1) == 0) {
                    this.y -= this.velocity;
                }
                break;
            case 2: //LEFT
                if (this.x > 0 && this.get_id(map, 2) == 0) {
                    this.x -= this.velocity;
                }
                break;
            case 3: //BOTTOM
                if (this.y < map.Y_SIZE - 1 && this.get_id(map, 3) == 0) {
                    this.y += this.velocity;
                }
                break;
            case 4: //RIGHT
                if (this.x < map.X_SIZE - 1 && this.get_id(map, 4) == 0) {
                    this.x += this.velocity;
                }
                break;
            default:
                break;
        }
    }

    render(context, gw, gh) {
        context.fillStyle = "red";
        context.beginPath();
        context.arc(gw * (this.x + 0.5), gh * (this.y + 0.5), gw / 2, 0, 2 * Math.PI);
        context.fill();
    }
}
