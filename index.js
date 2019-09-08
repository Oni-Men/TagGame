require = (v) => {
    const script = document.createElement('script');
    script.src = v;
    document.body.appendChild(script);
};

/*
    LOAD LIBRARY WE NEED
*/
require('lib/hude.js');

/*
    LOAD CLASS WE NEED
*/

require('class/line.js');
require('class/entity.js');

/*
    LOAD MAIN SCRIPT
*/
require('main.js');