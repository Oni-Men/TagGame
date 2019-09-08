class Entity {
    constructor(x, y, color){
        this.color = color;
        this.pos = {
            x, y
        };
        this.vel = {
            x: 0, y: 0
        };
        this.acc = {
            x: 0, y: 0
        };
    }

    get x() {
        return this.pos.x;
    }

    get y() {
        return this.pos.y;
    }

    render(h){
        h.circle(10, this.x, this.y).fill(this.color);
    }
}