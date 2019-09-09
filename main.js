const h = Hude.mount("#view");

const autosize = () => {
    h.$c.width = window.innerWidth;
    h.$c.height = window.innerHeight;
};

window.addEventListener('load', autosize);
window.addEventListener('resize', autosize);

const lines = [
    new Line(0, -100, 150, -150),
    new Line(50, -300, 250, -250)
]; //    List of Line Objects
let line = null; 

const entities = [];
const player = new Entity(0, 0, '#666');

h.onMouseDonw((x, y) => {
    if (line == null) {
        line = new Line(x, y, x, y);
    }
}, MouseButton.LEFT);

h.onMouseUp((x, y) => {
    if (line != null && line.length > 10) {
        lines.push(line);
    } else {
        player.target(x, y, lines);
    } 
    line = null;
}, MouseButton.LEFT);

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
        l.render(h);
    });


    player.update();
    player.render(h);

    requestAnimationFrame(arguments.callee);
})();
