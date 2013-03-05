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

            describe("normalize", function () {
                it("convert vector to its corresponding unit lenghth vector", function () {
                    var newVec = new Vector(3, 4);
                    newVec.normalize();
                    expect(newVec.x).toBe(0.6);
                    expect(newVec.y).toBe(0.8);
                });

                it("doesn't touch a 0 length vector", function () {
                    var newVec = new Vector();
                    newVec.normalize();
                    expect(newVec.x).toBe(0);
                    expect(newVec.y).toBe(0);
                });
            });

            describe("multScalar", function () {
                it("returns a new vector result of multiply vector by the scalar", function () {
                    var newVec = new Vector(3, 4),
                        resultVec = newVec.multScalar(2);
                    expect(resultVec.x).toBe(6);
                    expect(resultVec.y).toBe(8);
                });
            });
        });
    });
});
