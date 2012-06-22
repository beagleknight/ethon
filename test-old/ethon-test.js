buster.spec.expose();

describe("ethon", function() {
  describe("engine", function() {
    it("should be defined", function() {
      expect(ethon.engine).toBeDefined();
    });
  });

  describe("render_manager", function() {
    it("should be defined", function() {
      expect(ethon.render_manager).toBeDefined();
    });
  });

  describe("input_manager", function() {
    it("should be defined", function() {
      expect(ethon.input_manager).toBeDefined();
    });
  });
});
