class Enemy {
    constructor(x, y, color) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.color = color ? color : `hsl(${Math.random()*360}, 50%, 50%)`;

        this._LAST_UPDATE = performance.now();
        this.flag = true;
    }


    update(target, map) {
        const NOW = performance.now();
        if (NOW - this._LAST_UPDATE < 200) {
            return;
        }
        this._LAST_UPDATE = NOW;

        const xdiff = target.x - this.x;
        const ydiff = target.y - this.y;

        let angle = Math.atan2(ydiff, xdiff);

        let velX = Math.sign(Math.cos(angle));
        let velY = Math.sign(Math.sin(angle));

        let isXAir = map.data(this.x + velX, this.y).id == 0;
        let isYAir = map.data(this.x, this.y + velY).id == 0;

        if (!isXAir && !isYAir) {
            angle += this.flag ? Math.PI / 2 : -Math.PI / 2;
            velX = Math.sign(Math.cos(angle));
            velY = Math.sign(Math.sin(angle));
        }

        isXAir = map.data(this.x + velX, this.y).id == 0;
        isYAir = map.data(this.x, this.y + velY).id == 0;

        if (this.flag && isXAir) {
            this.x += velX;
        } else if (isYAir) {
            this.y += velY;
        }
        this.flag = !this.flag;
    }

    render(context, gw, gh) {
        context.strokeStyle = this.color;
        context.lineWidth = 3;
        context.beginPath();
        context.arc(gw * (this.x + 0.5), gh * (this.y + 0.5), gw / 2 - 1.5, 0, 2 * Math.PI);
        context.stroke();
    }

}
