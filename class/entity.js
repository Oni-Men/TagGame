class Entity {
    constructor(x, y, color){
        this.color = color;
        this.pos = new Vec2D(x, y);
        this.vel = new Vec2D(0, 0);
        this.tpos = null;

        this.p = null;
        this.path = []; //List of Vec2D
    }

    get x() {
        return this.pos.x;
    }

    get y() {
        return this.pos.y;
    }

    set x(v) {
        this.pos.x = v;
    }

    set y(v) {
        this.pos.y = v;
    }
    
    get vx() {
        return this.vel.x;
    }

    get vy() {
        return this.vel.y;
    }

    set vx(v) {
        this.vel.x = v;
    }

    set vy(v) {
        this.vel.y = v;
    }

    get tx() {
        if (this.tpos == null) return null;
        return this.tpos.x;
    }

    get ty() {
        if (this.tpos == null) return null;
        return this.tpos.y;
    }

    set tx(v) {
        if (this.tpos != null) {
            this.tx = v;
        }
    }

    set ty(v) {
        if (this.tpos != null) {
            this.ty = v;
        }
    }

    update() {
        if (this.p === null) {
            this.p = this.path.shift();
        }

        if (this.p === undefined) {
            this.p = null;
            return;
        }

        if (this.pos.distance(this.p) <= this.vel.magnitude()) {
            this.pos.set(this.p);
            this.p = null;
        } else {
            this.vel = this.p.subtract(this.pos).normalize().multiply(2);
            this.pos.set(this.pos.add(this.vel));
        }
    }

    render(h) {
        h.begin().moveTo(this.x, this.y);
        if (this.path) {
            h.center()
            .lineOption({
                cap: 'round',
                dashOffset: 0,
                join: 'miter',
                width: 1.5,
                dash: [5, 15]
            });
            if (this.path.length != 0) {
                for (let i = 0; i < this.path.length; i++) {
                    h.lineTo(this.path[i].x, this.path[i].y);
                }
            } else if(this.p != null) {
                h.lineTo(this.p.x, this.p.y);
            }
            h.stroke('#666');
        }

        h.center().circle(5, this.x, this.y).fill(this.color);
    }

    target(tx, ty, lines) {
        this.tpos = new Vec2D(tx, ty);

        this.p = null;

        this.findPath(this.pos, this.tpos, lines.slice(), []);
    }

    updateLine(lines) {
        if (this.tpos) {
            this.p = null;
            this.findPath(this.pos, this.tpos, lines.slice(), []);
        }
    }

    /**
     * 川上式
     * 再帰的にルートを探るパスファインダー
     * 
     * @param {Vec2D} sp 始点の座標
     * @param {Vec2D} tp 目標地点の座標
     * @param {Line[]} lines 線分の配列
     * @param {Vec2d[]} path 登録したパスの配列
     */
    findPath(sp, tp, lines, path) {
        //始点から目標地点までを結ぶ線分
        const s = new Line(sp.x, sp.y, tp.x, tp.y);

        const intersects = [];
        lines.forEach(l => {
            const res = this.isIntersect(s, l);
            if (res != null) {
                intersects.push({
                    line: l,
                    pos: res
                });
            }
        });

        //交差する線分がなかったらおしまい
        if (intersects.length == 0) {
            path.push(tp);
            this.path = path;
            return;
        }

        //交点の遠い順に並び替え
        intersects.sort((a, b) => {
            const distA = sp.distance(a.pos);
            const distB = sp.distance(b.pos);
            return distA - distB;
        });
        
        //最も交点の遠い線分
        const nearest = intersects.shift().line;

        for (let i = 0; i < lines.length; i++) {
            if(lines[i].id == nearest.id) {
                lines.splice(i, 1);
                break;
            }
        }
        
        //交点の近い線分の始点と目標地点の距離
        const d1 = nearest.s.distance(tp);

        //交点の近い線分の終点と目標地点の距離
        const d2 = nearest.e.distance(tp);

        let nextStartPoint = null;

        //近い方を次の始点にする
        if (d1 < d2) {
            nextStartPoint = nearest.s;
        } else {
            nextStartPoint = nearest.e;
        }

        this.findPath(sp, nextStartPoint, lines, path);

        path.push(nextStartPoint);

        this.findPath(nextStartPoint, tp, lines, path);
    }

    //拝借 from http://marupeke296.com/COL_2D_No10_SegmentAndSegment.html
    isIntersect(s1, s2) {
        const d = s2.s.subtract(s1.s);

        const v1 = s1.v;
        const v2 = s2.v;

        const crsV1V2 = v1.cross(v2);

        if (crsV1V2 == 0) {
            return null;
        }

        const crsDV1 = d.cross(v1);
        const crsDV2 = d.cross(v2);

        const t1 = crsDV2 / crsV1V2;
        const t2 = crsDV1 / crsV1V2;

        if(t1 < 0 || t1 > 1 || t2 < 0 || t2 > 1) {
            return null;
        }

        return s1.s.add(v1.multiply(t1));
    }
}