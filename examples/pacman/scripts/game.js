var document = document || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    paths: {
        ethon: "../../../lib/ethon/"
    }
});

define(function (require) {
    "use strict";

    var Game             = require("ethon/game"),
        Map              = require("ethon/map"),
        GUI              = require("ethon/gui"),
        Soul             = require("ethon/soul"),
        proxy            = require("ethon/proxy"),
        actionDispatcher = require("ethon/action_dispatcher"),
        Pacman           = require("pacman"),
        result = document.getElementById("game"),
        map,
        gui,
        pacman,
        game;

    // Pacman map: black quad with the laberinth
    map = new Map();
    map.addLayer(function (renderAssistant) {
        renderAssistant.drawQuad(0, 0, 800, 600);
    });

    // Pacman gui: shows game score, high score and player lives
    gui = new GUI();

    // Pacman player: well..is pacman!
    pacman = new Pacman(10, 10);

    // Pacman actions: use actionDispatcher to handle them
    actionDispatcher.registerKeyboardAction("KEY_UP_ARROW",
            proxy(pacman, pacman.moveUp),
            proxy(pacman, pacman.stop));
    actionDispatcher.registerKeyboardAction("KEY_DOWN_ARROW",
            proxy(pacman, pacman.moveDown),
            proxy(pacman, pacman.stop));
    actionDispatcher.registerKeyboardAction("KEY_RIGHT_ARROW",
            proxy(pacman, pacman.moveRight),
            proxy(pacman, pacman.stop));
    actionDispatcher.registerKeyboardAction("KEY_LEFT_ARROW",
            proxy(pacman, pacman.moveLeft),
            proxy(pacman, pacman.stop));

    // Init Game and start 
    game = new Game(result, 800, 600);
    game.setMap(map);
    game.setGUI(gui);
    game.addSoul(pacman);
    game.start();
});
