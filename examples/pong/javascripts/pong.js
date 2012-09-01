var ethon = ethon || {},
    pong = pong || {},
    window = window || {};

(function (exports) {
    "use strict";

    var Game = ethon.Game,
        Map = ethon.Map,
        GUI = ethon.GUI,
        Paddle = pong.Paddle,
        Ball = pong.Ball,
        proxy = ethon.proxy,
        actionDispatcher = ethon.actionDispatcher,
        result = exports.document.getElementById("game"),
        map,
        gui,
        playerScore,
        iaScore,
        playerPaddle,
        iaPaddle,
        ball,
        game;

    // Pong map: black quad with a grey net
    map = new Map();
    map.addLayer(function (renderAssistant) {
        renderAssistant.drawQuad(0, 0, 800, 600);
    });
    map.addLayer(function (renderAssistant) {
        var i = 0;

        for (i = 0; i < 20; i += 1) {
            renderAssistant.drawQuad(390, 5 + i * 30, 10, 20, "#cccccc");
        }
    });

    // Pong gui: two labels with player's score
    gui = new GUI();

    playerScore = new GUI.Label("player_score", 170, 100, "0", { fillStyle: "#ffffff", font: "100px Courier New" });
    playerScore.on("player_scored", proxy(playerScore, function (score) {
        this.message = this.message.replace(/(\d*)$/, score);
    }));
    iaScore = new GUI.Label("ia_score", 570, 100, "0", { fillStyle: "#ffffff", font: "100px Courier New" });
    iaScore.on("ia_scored", proxy(iaScore, function (score) {
        this.message = this.message.replace(/(\d*)$/, score);
    }));

    gui.addElement(playerScore);
    gui.addElement(iaScore);

    // Pong paddles: two quads on each field side
    // The left quad is the player and the right quad is the ia
    playerPaddle = new Paddle("player_paddle", 20, 225);
    iaPaddle = new Paddle("ia_paddle", 780, 225);

    // Pong actions: use actionDispatcher to handle them
    actionDispatcher.registerKeyboardAction("KEY_UP_ARROW",
            proxy(playerPaddle, playerPaddle.move_up), proxy(playerPaddle, playerPaddle.stop));
    actionDispatcher.registerKeyboardAction("KEY_DOWN_ARROW",
            proxy(playerPaddle, playerPaddle.move_down), proxy(playerPaddle, playerPaddle.stop));

    // Pong ball
    ball = new Ball(400, 300);

    // Init Game and start 
    game = new Game(result, 800, 600);
    game.setMap(map);
    game.setGUI(gui);
    game.addSoul(playerPaddle);
    game.addSoul(iaPaddle);
    game.addSoul(ball);
    game.start();
}(window));
