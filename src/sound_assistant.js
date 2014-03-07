define(function (require) {
    "use strict";

    var resourceAssistant = require("ethon/resource_assistant"),
        muted             = false,
        backgroundMusic   = null;

    function setBackgroundMusic(music) {
        backgroundMusic = resourceAssistant.getSound(music);
        backgroundMusic.volume = 0.5;
        backgroundMusic.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    }

    function playBackgroundMusic() {
        if (backgroundMusic && !muted) {
            backgroundMusic.play();
        }
    }

    function stopBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }

    function playSoundEffect(soundEffect) {
        if (!muted) {
            resourceAssistant.getSound(soundEffect).play();
        }
    }

    function setMuted (m) {
        muted = m;
    }

    return {
        setBackgroundMusic: setBackgroundMusic,
        playBackgroundMusic: playBackgroundMusic,
        stopBackgroundMusic: stopBackgroundMusic,
        playSoundEffect: playSoundEffect,
        setMuted: setMuted
    };
});
