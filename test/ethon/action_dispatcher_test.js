define(['jquery', 'ethon/input_assistant', 'ethon/action_dispatcher'], function ($, InputAssistant, ActionDispatcher) {
    var canvas, inputAssistant, actionDispatcher;

    beforeEach(function () {
        canvas = document.createElement('canvas');
        $('body').append(canvas);
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
        });
    });
});
