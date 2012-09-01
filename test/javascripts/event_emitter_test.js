var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var eventEmitter = require("event_emitter"),
        extend       = require("extend"),
        result = window.document.getElementById("result"),
        Dog = function () {
        },
        dog,
        Cat = function () {
        },
        cat;

    extend(eventEmitter, Dog.prototype);

    Dog.prototype.bark = function () {
        result.innerHTML += "Dog is barking! on " + new Date() + "<br />";
        this.trigger("bark", new Date());
    };

    extend(eventEmitter, Cat.prototype);

    Cat.prototype.on("bark", function (timestamp) {
        result.innerHTML += "Cat is running away on " + timestamp + "<br /><br />";
    });

    dog = new Dog();
    cat = new Cat();

    window.setInterval(function () {
        dog.bark();
    }, 1000);
});
