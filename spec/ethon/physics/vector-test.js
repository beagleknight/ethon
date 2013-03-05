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
                    var vec = new Vector();
                    expect(vec.x).toBe(0);
                    expect(vec.y).toBe(0);
                });

                it("initialize coordinates to given arguments", function () {
                    var vec = new Vector(3, 4);
                    
                    expect(vec.x).toBe(3);
                    expect(vec.y).toBe(4);
                });
            });

            describe("invert", function () {
                it("flips all the components of the vector", function () {
                    var vec = new Vector(3, 4);
                    vec.invert();
                    expect(vec.x).toBe(-3);
                    expect(vec.y).toBe(-4);
                });
            });

            describe("magnitude", function () {
                it("returns vector's magnitude", function () {
                    var vec = new Vector(3, 4);
                    expect(vec.magnitude()).toBe(5);
                });
            });

            describe("squareMagnitude", function () {
                it("returns vector's squared magnitude", function () {
                    var vec = new Vector(3, 4);
                    expect(vec.squaredMagnitude()).toBe(25);
                });
            });

            describe("normalize", function () {
                it("convert vector to its corresponding unit lenghth vector", function () {
                    var vec = new Vector(3, 4);
                    vec.normalize();
                    expect(vec.x).toBe(0.6);
                    expect(vec.y).toBe(0.8);
                });

                it("doesn't touch a 0 length vector", function () {
                    var vec = new Vector();
                    vec.normalize();
                    expect(vec.x).toBe(0);
                    expect(vec.y).toBe(0);
                });
            });

            describe("multScalar", function () {
                it("returns a new vector result of multiply vector by the scalar", function () {
                    var vec = new Vector(3, 4),
                        resultVec = vec.multScalar(2);
                    expect(resultVec.x).toBe(6);
                    expect(resultVec.y).toBe(8);
                });
            });

            describe("add", function () {
                it("returns a new vector result of adding vectors", function () {
                    var vec1 = new Vector(3, 4),
                        vec2 = new Vector(1, 5),
                        resultVec = vec1.add(vec2);
                    
                    expect(resultVec.x).toBe(4);
                    expect(resultVec.y).toBe(9);
                });
            });

            describe("sub", function () {
                it("returns a new vector result of substracting vectors", function () {
                    var vec1 = new Vector(3, 4),
                        vec2 = new Vector(1, 5),
                        resultVec = vec1.sub(vec2);
                    
                    expect(resultVec.x).toBe(2);
                    expect(resultVec.y).toBe(-1);
                });
            });

            describe("addScaledVector", function () {
                it("perfomrs a double operation scaling given vector and adding it", function () {
                    var vec1 = new Vector(3, 4),
                        vec2 = new Vector(1, 5),
                        resultVec = vec1.addScaledVector(vec2, 2);
                    
                    expect(resultVec.x).toBe(5);
                    expect(resultVec.y).toBe(14);
                });
            });
        });
    });
});
