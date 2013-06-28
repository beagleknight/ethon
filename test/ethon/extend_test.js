define(['ethon/extend'], function (extend) {
    describe("extend function", function () {
        it("should copy properties from one object to another", function () {
            var objectA = {
                test: 'copy me'
            };

            var objectB = {
            };

            extend(objectB, objectA);

            expect(objectB.test).toBe('copy me');
        });

        it("should override properties", function () {
            var objectA = {
                test: 'override'
            };

            var objectB = {
                test: 'my test'
            };

            extend(objectB, objectA);

            expect(objectB.test).toBe('override');
        });
    });
});
