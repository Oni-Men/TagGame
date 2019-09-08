const libs = [
    "hude",
    "math"
];

libs.forEach(l => {
    require(`lib/${l}.js`);
});