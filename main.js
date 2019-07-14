const X_SIZE = 24;
const Y_SIZE = 24;

const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;
const context = canvas.getContext("2d");

const obstacles = [
    {
        x: 1,
        y: 1,
        data: Map.default_data()
    }, {
        x: 5,
        y: 8,
        data: Map.default_data()
    }
];

const map = new Map(X_SIZE, Y_SIZE, obstacles);

const player = new Player();

const enemies = [];
for (let i = 0; i < 1; i++) {
    enemies.push(new Enemy(X_SIZE / 2, Y_SIZE / 2));
}


const loop = () => {

    player.update(map);
    for (enemy of enemies) {
        enemy.update(player, map);
    }

    render();

    requestAnimationFrame(loop);
};


const render = () => {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const gridWidth = canvas.width / X_SIZE;
    const gridHeight = canvas.height / Y_SIZE;

    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            if (map.data(x, y)) {
                context.fillStyle = map.data(x, y).color;
                context.fillRect(gridWidth * x, gridHeight * y, gridWidth, gridHeight);
            }
        }
    }

    for (enemy of enemies) {
        enemy.render(context, gridWidth, gridHeight);
    }

    player.render(context, gridWidth, gridHeight);
};

window.onkeydown = e => {
    switch (e.keyCode) {
        case 38:
            player.move = 1;
            break;
        case 40:
            player.move = 3;
            break;
        case 37:
            player.move = 2;
            break;
        case 39:
            player.move = 4;
            break;
        default:
            break;

    }
};

window.onkeyup = e => {
    switch (e.keyCode) {
        case 38:
        case 40:
        case 37:
        case 39:
            player.move = 0;
            break;
        default:
            break;

    }
};

requestAnimationFrame(loop);
document.body.appendChild(canvas);
