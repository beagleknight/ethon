var define = define || undefined;

define(function (require) {
    "use strict";

    var CircleBody = require("ethon/circle_body"),
        QuadBody   = require("ethon/quad_body");

    /**
     * quadsCollision
     *
     * Checks for a collision between two quads
     */
    function quadsCollision(quad_1, quad_2) {
        var x1_1, y1_1, x1_2, y1_2,
            x2_1, y2_1, x2_2, y2_2;

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
     * circlesCollision
     *
     * Checks for a collision between two circles, using
     * center distance compared to the radius sum.
     */
    function circlesCollision(circle_1, circle_2) {
        var dist;

        dist = Math.sqrt(Math.pow(circle_1.x - circle_2.x, 2) +
                Math.pow(circle_1.y - circle_2.y, 2));

        return dist < (circle_1.r + circle_2.r);
    }

    /**
     * circleQuadCollision
     *
     * Checks for a collision between a circle and a quad
     * Source: http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
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
     * soulsCollision
     *
     * Checks for a collision between two souls based on their body
     */
    function soulsCollision(soul1, soul2) {
        var body1 = soul1.getBody(),
            body2 = soul2.getBody(),
            result = false;

        // If any body is null return false because the collision
        // is impossible.
        if (body1 === null || body2 === null) {
            return false;
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
        return result;
    }

    return {
        quadsCollision: quadsCollision,
        circlesCollision: circlesCollision,
        circleQuadCollision: circleQuadCollision,
        soulsCollision: soulsCollision
    };
});
