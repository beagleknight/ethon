(function () {
    module.exports = {
        proxy: require('./proxy'),
        inherit: require('./inherit'),
        extend: require('./extend'),
        resourceAssistant: require('./resource_assistant'),
        pluginsAssistant: require('./plugins_assistant'),
        physicsAssistant: require('./physics_assistant'),
        soundAssistant: require('./sound_assistant'),
        Game: require('./game'),
        ParticleSystem: require('./particle_system'),
        Soul: require('./soul'),
        Sprite: require('./sprite'),
        QuadBody: require('./quad_body'),
        EventEmitter: require('./event_emitter')
    };
}());
