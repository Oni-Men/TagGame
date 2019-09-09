const modules = [
    "lib/hude.js",
    "class/line.js",
    "class/entity.js",
    "main.js"
];

const require = (p) => {
    const script = document.createElement('script');
    script.src = p;
    document.body.appendChild(script);

    return script;
};

(function() {
    function loop(i) {
        const s = require(modules[i]);
        if (i + 1 < modules.length) {
            s.addEventListener('load', () => {
                loop(i + 1);
            });
        }
    }
    loop(0);
})();