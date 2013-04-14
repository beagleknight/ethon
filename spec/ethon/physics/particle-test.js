/*global buster, require, describe, it, expect, before*/
buster.spec.expose();

require.config({
    baseUrl: "lib"
});

describe("Particle", function (run) {
    "use strict";

    require(["ethon/physics/vector"], function (Vector) {
        require(["ethon/physics/particle"], function (Particle) {
            run(function () {
                describe("attributes", function () {
                    before(function () {
                        this.particle = new Particle();
                    });

                    it("has a position represented as a vector", function () {
                        expect(this.particle.position).toHavePrototype(Vector.prototype);
                    });

                    it("has a velocity represented as a vector", function () {
                        expect(this.particle.velocity).toHavePrototype(Vector.prototype);
                    });

                    it("has an acceleration represented as a vector", function () {
                        expect(this.particle.acceleration).toHavePrototype(Vector.prototype);
                    });
                });
            });
        });
    });
});
