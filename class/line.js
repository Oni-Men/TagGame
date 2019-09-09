class Line {
    constructor(sx, sy, ex, ey) {
        this._s = new Vec2D(sx, sy);
        this._e = new Vec2D(ex, ey);

        this.id = Date.now().toString() +'@' + Array.prototype.join.call(arguments, '+');
    }

    get sx() {
        return this._s.x;
    }

    get sy() {
        return this._s.y;
    }

    get ex() {
        return this._e.x;
    }

    get ey() {
        return this._e.y;
    }

    set sx(v) {
        this._s.x = v;
    }

    set sy(v) {
        this._s.y = v;
    }

    set ex(v) {
        this._e.x = v;
    }

    set ey(v) {
        this._e.y = v;
    }

    get s() {
        return this._s;
    }
    
    get e() {
        return this._e;
    }
    
    get v() {
        return this._e.subtract(this._s);
    }
    
    get length() {
        return this.v.magnitude();
    }
    
    equals(other) {
        return this.id == other.id;
    }

    render(h) {
        h.center().lineOption({
            width: 2.5,
            cap: 'round',
            dash: []
        }).begin().moveTo(this.sx, this.sy).lineTo(this.ex, this.ey).stroke('#666');
    }
}