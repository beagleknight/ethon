(function () {
    "use strict";

    var CircleBody = require("./circle_body"),
        QuadBody   = require("./quad_body");

    /**
     * Checks for a collision between two quads
     *
     * @method quadsCollision
     * @param {Object} quad_1 Quad-like object 
     * @param {Object} quad_2 Quad-like object 
     */
    function quadsCollision(quad_1, quad_2) {
        var x1_1, y1_1, x1_2, y1_2,
            x2_1, y2_1, x2_2, y2_2;

        // alias width and height
        if (!quad_1.w) {
            quad_1.w = quad_1.width;
            quad_1.h = quad_1.height;
        }
        if (!quad_2.w) {
            quad_2.w = quad_2.width;
            quad_2.h = quad_2.height;
        }

        x1_1 = quad_1.x;
        y1_1 = quad_1.y;
        x2_1 = quad_1.x + quad_1.w;
        y2_1 = quad_1.y + quad_1.h;
        x1_2 = quad_2.x;
        y1_2 = quad_2.y;
        x2_2 = quad_2.x + quad_2.w;
        y2_2 = quad_2.y + quad_2.h;

        return (x1_1 < x2_2) && (x2_1 > x1_2) && (y1_1 < y2_2) && (y2_1 > y1_2);
    }

    /**
     * Checks for a collision between two circles, using
     * center distance compared to the radius sum.
     *
     * @method circlesCollision
     * @param {Object} circle_1 Circle-like object
     * @param {Object} circle_2 Circle-like object
     */
    function circlesCollision(circle_1, circle_2) {
        var dist;

        dist = Math.sqrt(Math.pow(circle_1.x - circle_2.x, 2) +
                Math.pow(circle_1.y - circle_2.y, 2));

        return dist < (circle_1.r + circle_2.r);
    }

    /**
     * Checks for a collision between a circle and a quad
     * Source: http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
     *
     * @method circleQuadCollision
     * @param {Object} circle Circle-like object
     * @param {Object} quad Quad-like object
     */
    function circleQuadCollision(circle, quad) {
        var dist, cornerDist;
        // Set quad x and y to the center
        quad.x = quad.x + quad.w / 2;
        quad.y = quad.y - quad.h / 2;

        // Compute distances
        dist = {
            x: Math.abs(circle.x - quad.x),
            y: Math.abs(circle.y - quad.y)
        };
        cornerDist = Math.pow(dist.x - quad.w / 2, 2) + Math.pow(dist.y - quad.h / 2, 2);

        // Restore quad x and y to the top left corner
        quad.x = quad.x - quad.w / 2;
        quad.y = quad.y + quad.h / 2;

        if ((dist.x > (quad.w / 2 + circle.r)) || (dist.y > (quad.h / 2 + circle.r))) {
            return false;
        }
        if ((dist.x <= (quad.w / 2)) || (dist.y <= (quad.h / 2))) {
            return true;
        }

        return (cornerDist <= (Math.pow(circle.r, 2)));
    }

    /**
     * Checks for a collision between two souls based on their body
     *
     * @method soulsCollision
     * @param {Object} soul1
     * @param {Object} soul2
     */
    function soulsCollision(soul1, soul2) {
        if (soul1 === undefined || soul2 === undefined) {
            return false;
        }
        var body1 = soul1.getBody(),
            body2 = soul2.getBody(),
            result = false;

        // If any body is null return false because the collision
        // is impossible.
        if (body1 === null || body2 === null) {
            return false;
        }

        // Set temporary position for bodies
        body1.x += soul1.getPosition().x;
        body1.y += soul1.getPosition().y;
        body2.x += soul2.getPosition().x;
        body2.y += soul2.getPosition().y;

        // alias width and height
        if (!body1.w) {
            body1.w = body1.width;
            body1.h = body1.height;
        }
        if (!body2.w) {
            body2.w = body2.width;
            body2.h = body2.height;
        }

        if (body1 instanceof CircleBody) {
            if (body2 instanceof CircleBody) {
                result = circlesCollision(body1, body2);
            } else if (body2 instanceof QuadBody) {
                result = circleQuadCollision(body1, body2);
            } else {
                throw "TypeError";
            }
        } else if (body1 instanceof QuadBody) {
            if (body2 instanceof CircleBody) {
                result = circleQuadCollision(body2, body1);
            } else if (body2 instanceof QuadBody) {
                result = quadsCollision(body1, body2);
            } else {
                throw "TypeError";
            }
        }

        // Restore body position
        body1.x -= soul1.getPosition().x;
        body1.y -= soul1.getPosition().y;
        body2.x -= soul2.getPosition().x;
        body2.y -= soul2.getPosition().y;

        return result;
    }

    module.exports = {
        quadsCollision: quadsCollision,
        circlesCollision: circlesCollision,
        circleQuadCollision: circleQuadCollision,
        soulsCollision: soulsCollision
    };
}());
