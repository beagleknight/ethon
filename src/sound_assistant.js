define(function (require) {
    "use strict";

    var $                 = require("jquery"),
        resourceAssistant = require("ethon/resource_assistant"),
        enabled           = false,
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
        if (backgroundMusic && !muted && enabled) {
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
        if (!muted && enabled) {
            resourceAssistant.getSound(soundEffect).play();
        }
    }

    function setEnabled (e) {
        enabled = e;
        if (enabled) {
            $('.audio-controls').show();
            $('.audio-controls').on('click', function () {
                toggleMute();
                $('.audio-controls .mute').toggle();
                if (muted) {
                    stopBackgroundMusic();
                } else {
                    playBackgroundMusic();
                }
            });
        }
    }

    function toggleMute () {
        muted = !muted;
    }

    return {
        setBackgroundMusic: setBackgroundMusic,
        playBackgroundMusic: playBackgroundMusic,
        stopBackgroundMusic: stopBackgroundMusic,
        playSoundEffect: playSoundEffect,
        setEnabled: setEnabled, 
        toggleMute: toggleMute
    };
});
