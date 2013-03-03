/*global buster, require, describe, it, expect*/
buster.spec.expose();

require.config({
    baseUrl: "lib"
});

describe("Vector", function (run) {
    "use strict";

    require(["ethon/physics/vector"], function (Vector) {
        run(function () {
            describe("constructor", function () {
                it("initialize coordinates to origin", function () {
                    var newVec = new Vector();
                    expect(newVec.x).toBe(0);
                    expect(newVec.y).toBe(0);
                });

                it("initialize coordinates to given arguments", function () {
                    var newVec = new Vector(3, 4);
                    expect(newVec.x).toBe(3);
                    expect(newVec.y).toBe(4);
                });
            });

            describe("invert", function () {
                it("flips all the components of the vector", function () {
                    var newVec = new Vector(3, 4);
                    newVec.invert();
                    expect(newVec.x).toBe(-3);
                    expect(newVec.y).toBe(-4);
                });
            });

            describe("magnitude", function () {
                it("returns vector's magnitude", function () {
                    var newVec = new Vector(3, 4);
                    expect(newVec.magnitude()).toBe(5);
                });
            });

            describe("squareMagnitude", function () {
                it("returns vector's squared magnitude", function () {
                    var newVec = new Vector(3, 4);
                    expect(newVec.squaredMagnitude()).toBe(25);
                });
            });
        });
    });
});
