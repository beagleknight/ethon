define(['jquery', 'ethon/input_assistant', 'ethon/action_dispatcher'], function ($, InputAssistant, ActionDispatcher) {
    var canvas, canvasRect, inputAssistant, actionDispatcher;

    beforeEach(function () {
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
                var testValue = '';

                actionDispatcher.registerKeyboardAction("KEY_A", function () {
                    testValue = 'A key pressed';
                });

                var eventData = new jQuery.Event();
                eventData.keyCode = 65; // A key
                eventData.type = "keydown";
                $('body').trigger(eventData);

                expect(testValue).toBe('A key pressed');
            });

            it("accepts a second callback method in response to keyup event", function () {
                var testValue = '';

                actionDispatcher.registerKeyboardAction("KEY_A", function () {}, function () {
                    testValue = 'A key released';
                });

                var eventData = new jQuery.Event();
                eventData.keyCode = 65; // A key
                eventData.type = "keyup";
                $('body').trigger(eventData);

                expect(testValue).toBe('A key released');
            });
        });

        describe("#registerMouseMotionAction", function () {
            it("should register a callback method in response to mouse motion inside a quad", function () {
                var testValue = '';

                actionDispatcher.registerMouseMotionAction({ x: 0, y: 0, w: 400, h: 400 }, function () {
                    testValue = 'Mouse motion inside canvas';
                });

                var eventData = new jQuery.Event();
                eventData.clientX = 200 + canvasRect.left;
                eventData.clientY = 300 + canvasRect.top;
                eventData.type = "mousemove";
                $(canvas).trigger(eventData);

                expect(testValue).toBe('Mouse motion inside canvas');
            });
        });

        describe("#registerMouseClickAction", function () {
        });

        describe("#registerMouseReleaseAction", function () {
        });
    });
});
