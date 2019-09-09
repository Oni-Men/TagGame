const h = Hude.mount("#view");

const autosize = () => {
    h.$c.width = window.innerWidth;
    h.$c.height = window.innerHeight;
};

window.addEventListener('load', autosize);
window.addEventListener('resize', autosize);

const lines = []; //    List of Line Objects
let line = null; 

const entities = [];
const player = new Entity(0, 0, '#666');

h.onMouseDonw((x, y) => {
    line = new Line(x, y, x, y);
});

h.onMouseUp((x, y) => {
    lines.push(line);
    line = null;
});

h.onMouseMove((x, y) => {
    if (line != null) {
        line.ex = x;
        line.ey = y;
    }
});

(function() {

    h.clearWith('#fff');

    if (line != null) {
        line.render(h, '#0003');
        h.circle(10, line.sx, line.sy).fill('#0003');
        h.circle(10, line.ex, line.ey).fill('#0003');
    }

    lines.forEach(l => {
        l.render(h, '#000F');
    });

    player.render(h);

    requestAnimationFrame(arguments.callee);
})();
