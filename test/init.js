/*jshint unused:false*/

Object.keys = Object.keys || function (o) {  
    var result = [];  
    for(var name in o) {  
        if (o.hasOwnProperty(name)) {
            result.push(name);  
        }
    }  
    return result;  
};

var files = Object.keys(window.__karma__.files);
var tests = [];
var i, l;

for (i = 0, l = files.length; i < l; i += 1) {
    if (/_test\.js$/.test(files[i])) {
        tests.push(files[i]);
    }
}

function triggerEvent(element, options, offset) {
    var eventData = new jQuery.Event();
    eventData.clientX = options.clientX + offset.left;
    eventData.clientY = options.clientY + offset.top;
    eventData.type = options.type;
    eventData.button = options.button;
    eventData.keyCode = options.keyCode;
    eventData.originalEvent = options.originalEvent;
    $(element).trigger(eventData);
}

requirejs.config({
    //Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
      ethon: ".",
      jquery: "../bower_components/jquery/jquery"
    },

    shim: {

    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
