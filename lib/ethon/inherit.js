var define = define || undefined;

define(function (require) {
    "use strict";

    function F() {}

    return function (fn, superFn) {
        F.prototype = superFn.prototype;
        fn.prototype = new F();
        fn.prototype.constructor = fn;
    };
});
