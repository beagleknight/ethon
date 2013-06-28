define(['ethon/event_emitter'], function (EventEmitter) {
    var eventEmitter;

    beforeEach(function () {
        eventEmitter = new EventEmitter();
    });

    describe("EventEmitter", function () {
        describe("#on", function () {
            it("should register a callback given an event identified as a string", function () {
                eventEmitter.on("an event", function () {});
                expect(eventEmitter.listeners['an event'].length).toBe(1);
            });
        });

        describe("#emit", function () {
            it("should call a callback function if registered for this event", function () {
                var testValue = '';

                eventEmitter.on("an event", function () {
                    testValue = 'This function has been called';
                });

                eventEmitter.emit("an event");

                expect(testValue).toBe('This function has been called');
            });

            it("should pass arbitrary number of parameters to callback function", function () {
                var testValue = '';

                eventEmitter.on("an event", function (a, b) {
                    testValue = 'This function has been called with ' + a + " and " + b;
                });

                eventEmitter.emit("an event", "david", "manfred");

                expect(testValue).toBe('This function has been called with david and manfred');
            });

            it("should not call other objects listeners", function () {
                var testValue = '',
                    otherEventEmitter = new EventEmitter();

                otherEventEmitter.on("an event", function () {
                    testValue = 'This function has been called';
                });

                eventEmitter.on("an event", function () { });
                eventEmitter.emit("an event");

                expect(testValue).not.toBe('This function has been called');
            });
        });

        describe("#broadcast", function () {
            it("should call all callbacks registered for this event", function () {
                var testValue = 0,
                    otherEventEmitter = new EventEmitter();

                otherEventEmitter.on("an event", function () {
                    testValue += 1;
                });

                eventEmitter.on("an event", function () {
                    testValue += 1;
                });

                eventEmitter.broadcast("an event");
                expect(testValue).toBe(2);
            });

            it("should pass arbitrary number of parameters to callback function", function () {
                var testValue = 0,
                    otherEventEmitter = new EventEmitter();

                otherEventEmitter.on("an event", function (n) {
                    testValue += n;
                });

                eventEmitter.on("an event", function (n) {
                    testValue += n;
                });

                eventEmitter.broadcast("an event", 4);
                expect(testValue).toBe(8);
            });
        });
    });
});
