class Line {
    constructor(sx, sy, ex, ey) {
        this._sx = sx;
        this._sy = sy;
        this._ex = ex;
        this._ey = ey;
    }

    get sx() {
        return this._sx;
    }

    get sy() {
        return this._sy;
    }

    get ex() {
        return this._ex;
    }

    get ey() {
        return this._ey;
    }

    set sx(v) {
        this._sx = v;
    }

    set sy(v) {
        this._sy = v;
    }

    set ex(v) {
        this._ex = v;
    }

    set ey(v) {
        this._ey = v;
    }

    render(h) {
        h.lineOption({
            width: 2.5,
            cap: 'round'
        }).begin().moveTo(this.sx, this.sy).lineTo(this.ex, this.ey).stroke('#666');
    }
}