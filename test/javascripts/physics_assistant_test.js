var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var physicsAssistant = require("ethon/physics_assistant"),
        renderAssistant  = require("ethon/render_assistant"),
        result = window.document.getElementById("result"),
        quad_1_1 = { x: 10, y: 10, w: 100, h: 100 },
        quad_1_2 = { x: 50, y: 50, w: 100, h: 100 },
        quad_2_1 = { x: 400, y: 10, w: 100, h: 100 },
        quad_2_2 = { x: 550, y: 50, w: 100, h: 100 },
        quads_test_1,
        quads_test_2,
        circle_1_1 = { x: 100, y: 300, r: 20 },
        circle_1_2 = { x: 110, y: 300, r: 20 },
        circle_2_1 = { x: 500, y: 300, r: 20 },
        circle_2_2 = { x: 560, y: 300, r: 20 },
        circle_test_1,
        circle_test_2,
        quad_3_1 = { x: 50, y: 450, w: 100, h: 100 },
        circle_3_1 = { x: 150, y: 450, r: 10 },
        quad_3_2 = { x: 500, y: 450, w: 100, h: 100 },
        circle_3_2 = { x: 650, y: 550, r: 10 },
        circle_quad_test_1,
        circle_quad_test_2;

    quads_test_1 = physicsAssistant.quadsCollision(quad_1_1, quad_1_2);
    quads_test_2 = physicsAssistant.quadsCollision(quad_2_1, quad_2_2);
    circle_test_1 = physicsAssistant.circlesCollision(circle_1_1, circle_1_2);
    circle_test_2 = physicsAssistant.circlesCollision(circle_2_1, circle_2_2);
    circle_quad_test_1 = physicsAssistant.circleQuadCollision(circle_3_1, quad_3_1);
    circle_quad_test_2 = physicsAssistant.circleQuadCollision(circle_3_2, quad_3_2);

    renderAssistant.setCanvas(result, 800, 600);

    // Collision
    renderAssistant.drawQuad(quad_1_1.x, quad_1_1.y, quad_1_1.w, quad_1_1.h);
    renderAssistant.drawQuad(quad_1_2.x, quad_1_2.y, quad_1_2.w, quad_1_2.h);
    if (quads_test_1) {
        renderAssistant.drawText(200, 50, "Collision!");
    } else {
        renderAssistant.drawText(200, 50, "No Collision!");
    }
    // No collision
    renderAssistant.drawQuad(quad_2_1.x, quad_2_1.y, quad_2_1.w, quad_2_1.h);
    renderAssistant.drawQuad(quad_2_2.x, quad_2_2.y, quad_2_2.w, quad_2_2.h);
    if (quads_test_2) {
        renderAssistant.drawText(700, 50, "Collision!");
    } else {
        renderAssistant.drawText(700, 50, "No Collision!");
    }

    // Collision
    renderAssistant.drawCircle(circle_1_1.x, circle_1_1.y, circle_1_1.r);
    renderAssistant.drawCircle(circle_1_2.x, circle_1_2.y, circle_1_2.r);
    if (circle_test_1) {
        renderAssistant.drawText(200, 300, "Collision!");
    } else {
        renderAssistant.drawText(200, 300, "No Collision!");
    }
    // Collision
    renderAssistant.drawCircle(circle_2_1.x, circle_2_1.y, circle_2_1.r);
    renderAssistant.drawCircle(circle_2_2.x, circle_2_2.y, circle_2_2.r);
    if (circle_test_2) {
        renderAssistant.drawText(700, 300, "Collision!");
    } else {
        renderAssistant.drawText(700, 300, "No Collision!");
    }

    // Collision
    renderAssistant.drawCircle(circle_3_1.x, circle_3_1.y, circle_3_1.r);
    renderAssistant.drawQuad(quad_3_1.x, quad_3_1.y, quad_3_1.w, quad_3_1.h);
    if (circle_quad_test_1) {
        renderAssistant.drawText(200, 500, "Collision!");
    } else {
        renderAssistant.drawText(200, 500, "No Collision!");
    }
    // No Collision
    renderAssistant.drawCircle(circle_3_2.x, circle_3_2.y, circle_3_2.r);
    renderAssistant.drawQuad(quad_3_2.x, quad_3_2.y, quad_3_2.w, quad_3_2.h);
    if (circle_quad_test_2) {
        renderAssistant.drawText(700, 500, "Collision!");
    } else {
        renderAssistant.drawText(700, 500, "No Collision!");
    }
});
