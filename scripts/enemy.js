class Enemy {
    constructor(x, y, color) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.color = color ? color : `hsl( ${Math.random()*360}, 75%, 50%)`;

        // 左右どちらに進むかの情報
        this.LR = LeftOrRight.LEFT;
        this.isHittingToObstacle = false;

        this.rotate_angle = Math.PI / 2;
    }

    isAir(map, x, y) {
        return map.data(x, y).id == ObjectType.Air;
    }

    rotate() {
        this.angle += this.rotate_angle;
        this.rotate_angle *= -1;
    }

    isExsistObstacleInForward(map) {
        const velocityX = Math.round(Math.cos(this.angle));
        const velocityY = Math.round(Math.sin(this.angle));

        let locationX = this.x;
        let locationY = this.y;
        if (Math.abs(velocityX) > Math.abs(velocityY)) {
            locationX += velocityX;
        } else {
            locationY += velocityY;
        }

        return !this.isAir(map, locationX, locationY);
    }

    isTouchingToObstacle(map) {
        const rotatedAngle = this.angle + this.rotate_angle;
        const rotatedVelocityX = Math.round(Math.cos(rotatedAngle));
        const rotatedVelocityY = Math.round(Math.sin(rotatedAngle));

        let rotatedLocationX = this.x;
        let rotatedLocationY = this.y;
        if (Math.abs(rotatedVelocityX) > Math.abs(rotatedVelocityY)) {
            rotatedLocationX += rotatedVelocityX;
        } else {
            rotatedLocationY += rotatedVelocityY;
        }

        return !this.isAir(map, rotatedLocationX, rotatedLocationY);
    }

    angleBetweenTargetAndMe(target) {
        const xDifference = target.x - this.x;
        const yDifference = target.y - this.y;
        return Math.atan2(yDifference, xDifference);
    }

    distance(target) {
        const a = target.x - this.x;
        const b = target.y - this.y;
        return Math.sqrt(a ** 2 + b ** 2);
    }

    update(target, map) {
        //もしターゲットにたどり着いていたら移動処理を行わない
        if (this.distance(target) <= 0) {
            return;
        }

        //障害物に触れているならisHittingToObstacleをtrue
        //障害物に触れていたなら回転してisHittingtoObstacleをfalse
        //上二つに合致しない場合はターゲットの方向に回転
        if (this.isTouchingToObstacle(map)) {
            this.isHittingToObstacle = true;
            console.log("障害物に触れています");
        } else if (this.isHittingToObstacle) {
            this.isHittingToObstacle = false;
            this.rotate();
            console.log("障害物に触れていました");
        } else {
            //ターゲットの方向を向く
            this.angle = this.angleBetweenTargetAndMe(target);
            console.log("障害物に触れていません");
        }

        //ぶつかるなら方向を変える
        if (this.isExsistObstacleInForward(map)) {
            this.rotate();
        }

        this.vx = Math.round(Math.cos(this.angle));
        this.vy = Math.round(Math.sin(this.angle));

        //移動する
        if (Math.abs(this.vx) > 0) {
            this.x += this.vx;
        } else if (Math.abs(this.vy) > 0) {
            this.y += this.vy;
        }
    }

    render(context, gw, gh) {
        context.strokeStyle = this.color;
        context.lineWidth = 3;
        context.beginPath();
        context.arc(gw * (this.x + 0.5), gh * (this.y + 0.5), gw / 2 - 1.5, 0, 2 * Math.PI);
        context.stroke();

        context.fillStyle = this.color;
        context.beginPath();
        context.arc(gw * (this.x + this.vx + 0.5), gh * (this.y + this.vy + 0.5), gw / 3 - 1.5, 0, 2 * Math.PI);
        context.fill();
    }

}
