define(['ethon/inherit'], function (inherit) {
    describe("inherit function", function () {
        it("should apply inheritance", function () {
            var testValue = '';

            var A = function () {
            };

            var B = function () {
            };

            A.prototype.bark = function () {
                testValue = 'It works!';
            };
            
            inherit(B, A);

            var testObject = new B();
            testObject.bark();

            expect(testValue).toBe('It works!');
        });
    });
});
