define(['jquery', 'ethon/input_assistant', 'ethon/action_dispatcher'], function ($, InputAssistant, ActionDispatcher) {
    var testValue,
        canvas,
        canvasRect,
        inputAssistant,
        actionDispatcher;

    beforeEach(function () {
        testValue = '';
        canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        $('body').append(canvas);
        canvasRect = canvas.getBoundingClientRect();
        inputAssistant = new InputAssistant(canvas);
        actionDispatcher = new ActionDispatcher(inputAssistant);
    });

    describe("ActionDispatcher", function () {
        describe("#registerKeyboardAction", function () {
            it("should register a callback method in response to keydown event", function () {
                actionDispatcher.registerKeyboardAction("KEY_A", function () {
                    testValue = 'A key pressed';
                });

                triggerEvent('body', {
                    keyCode: 65, // A key
                    type: "keydown",
                });

                expect(testValue).toBe('A key pressed');
            });

            it("accepts a second callback method in response to keyup event", function () {
                actionDispatcher.registerKeyboardAction("KEY_A", function () {}, function () {
                    testValue = 'A key released';
                });

                triggerEvent('body', {
                    keyCode: 65, // A key
                    type: "keyup",
                });

                expect(testValue).toBe('A key released');
            });
        });

        describe("#registerMouseMotionAction", function () {
            it("should register a callback method in response to mouse motion inside a quad", function () {
                actionDispatcher.registerMouseMotionAction({ x: 0, y: 0, w: 400, h: 400 }, function () {
                    testValue = 'Mouse motion inside canvas';
                });

                triggerEvent(canvas, {
                    clientX: 200,
                    clientY: 300,
                    type: "mousemove",
                });

                expect(testValue).toBe('Mouse motion inside canvas');
            });
        });

        describe("#registerMouseClickAction", function () {
            it("should register a callback method in response to mouse click inside a quad", function () {
                actionDispatcher.registerMouseClickAction("MOUSE_LEFT", { x: 0, y: 0, w: 400, h: 400 }, function () {
                    testValue = 'Mouse click inside canvas';
                });

                triggerEvent(canvas, {
                    clientX: 200,
                    clientY: 300,
                    type: "mousedown",
                    button: 0 // Left button
                });

                expect(testValue).toBe('Mouse click inside canvas');
            });
        });

        describe("#registerMouseReleaseAction", function () {
        });
    });

    afterEach(function () {
        $(canvas).remove();
    });

    function triggerEvent(element, options) {
        var eventData = new jQuery.Event();
        eventData.clientX = options.clientX + canvasRect.left;
        eventData.clientY = options.clientY + canvasRect.top;
        eventData.type = options.type;
        eventData.button = options.button;
        eventData.keyCode = options.keyCode;
        $(element).trigger(eventData);
    }
});
