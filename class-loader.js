const classes = [
    "line",
    "entity"
];

classes.forEach(c => {
    require(`class/${c}.js`);
});