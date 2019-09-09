class Vec2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vec2D(this.x, this.y);
    }

    set(vec) {
        this.x = vec.x;
        this.y = vec.y;

        return this;
    }

    add(vec) {
        return new Vec2D(this.x + vec.x, this.y + vec.y);
    }

    subtract(vec) {
        return new Vec2D(this.x - vec.x, this.y - vec.y);
    }

    multiply(n) {
        return new Vec2D(this.x * n, this.y * n);
    }

    normalize() {
        const m = this.magnitude();
        return new Vec2D(this.x / m, this.y / m);
    }

    magnitude() {
        return Math.hypot(this.x, this.y);
    }

    distance(vec) {
        return Math.hypot(this.x - vec.x, this.y - vec.y);
    }

    cross(vec) {
        return this.x * vec.y - this.y * vec.x;
    }

    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
}