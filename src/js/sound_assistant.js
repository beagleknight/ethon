(function () {
    "use strict";

    var resourceAssistant = require("./resource_assistant"),
        enabled           = false,
        muted             = false,
        backgroundMusic   = null,
        soundEffectsPool  = {};

    function setBackgroundMusic(music) {
        if (music) {
            backgroundMusic = resourceAssistant.getSound(music);
            backgroundMusic.volume = 0.5;
            backgroundMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }
    }

    function playBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.firstTime = true;
            if (!muted && enabled) {
                backgroundMusic.play();
            }
        }
    }

    function stopBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }

    function toggleBackgroundMusic() {
        if (backgroundMusic && backgroundMusic.firstTime) {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
            } else {
                backgroundMusic.pause();
            }
        }
    }

    function playSoundEffect(soundEffect) {
        var poolData, pool, current;

        if (soundEffect && !muted && enabled) {
            if (soundEffectsPool[soundEffect]) {
                poolData = soundEffectsPool[soundEffect];
                current = poolData.current;
                pool = poolData.pool;

                if (pool[current].currentTime === 0 || pool[current].ended) {
                    pool[current].play();
                }

                poolData.current = (poolData.current + 1) % pool.length;
            } else {
                resourceAssistant.getSound(soundEffect).play();
            }
        }
    }

    function setEnabled (e) {
        enabled = e;
        if (enabled) {
            $('.audio-controls').show();
            $('.audio-controls').on('click', function () {
                toggleMute();
            });
        }
    }

    function toggleMute () {
        muted = !muted;
        $('.audio-controls .mute').toggle();
        $('.audio-controls .button').toggle();
        toggleBackgroundMusic();
    }

    function setMuted (_muted) {
        muted = _muted;
        if (muted) {
            $('.audio-controls .mute').show();
            $('.audio-controls .button').hide();
        }
    }

    function loadSoundEffectsPool (soundEffects, poolSize) {
        var id, soundEffect, sound, pool, i;

        for (id in soundEffects) {
            if (soundEffects.hasOwnProperty(id) && soundEffects[id].sound) {
                soundEffect = soundEffects[id].sound;
                sound = resourceAssistant.getSound(soundEffect);
                pool = [sound];

                for (i = 0; i < poolSize - 1; i += 1) {
                    pool.push(sound.cloneNode());
                }

                soundEffectsPool[soundEffect] = {
                    current: 0,
                    pool: pool
                };
            }
        }
    }

    module.exports = {
        setBackgroundMusic: setBackgroundMusic,
        playBackgroundMusic: playBackgroundMusic,
        stopBackgroundMusic: stopBackgroundMusic,
        toggleBackgroundMusic: toggleBackgroundMusic,
        loadSoundEffectsPool: loadSoundEffectsPool,
        playSoundEffect: playSoundEffect,
        setEnabled: setEnabled, 
        toggleMute: toggleMute,
        setMuted: setMuted
    };
}());
