class Player {
    constructor() {
        this.x = 4;
        this.y = 7;

        this.velocity = 1;

        this.top = 0;
        this.bot = 0;
        this.left = 0;
        this.right = 0;

        this.direction = Direction.NONE;
    }

    calc_move() {
        let n = Direction.NONE;
        n = this.right ? Direction.RIGHT : n;
        n = this.left ? Direction.LEFT : n;
        n = this.bot ? Direction.BOTTOM : n;
        n = this.top ? Direction.TOP : n;
        this.direction = n;
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
        this.calc_move();

        switch (this.direction) {
            case Direction.NONE:
                break;
            case Direction.TOP:
                if (this.y > 0 && this.get_id(map, 1) == 0) {
                    this.y -= this.velocity;
                }
                break;
            case Direction.LEFT:
                if (this.x > 0 && this.get_id(map, 2) == 0) {
                    this.x -= this.velocity;
                }
                break;
            case Direction.BOTTOM:
                if (this.y < map.Y_SIZE - 1 && this.get_id(map, 3) == 0) {
                    this.y += this.velocity;
                }
                break;
            case Direction.RIGHT:
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
