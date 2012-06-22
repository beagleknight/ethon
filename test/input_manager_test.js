buster.spec.expose();

describe("input_manager", function() {
  var canvas, ctx;

  beforeEach(function() {
    canvas = document.createElement('canvas');
  });

  describe("init", function() {
    it("should receive a HTMLCanvasElement", function() {
      expect(function() {
        ethon.input_manager.init("wrong");
      }).toThrow("TypeError");
    });

    it("should attach a key down event listener to body", function() {
      this.stub(document.body, 'addEventListener');
      ethon.input_manager.init(canvas);
      expect(document.body.addEventListener.args[0][0]).toEqual('keydown');
    });

    it("should attach a key up event listener to body", function() {
      this.stub(document.body, 'addEventListener');
      ethon.input_manager.init(canvas);
      expect(document.body.addEventListener.args[1][0]).toEqual('keyup');
    });

    it("should attach a mouse down event listener to canvas", function() {
      this.stub(canvas, 'addEventListener');
      ethon.input_manager.init(canvas);
      expect(canvas.addEventListener.args[0][0]).toEqual('mousedown');
    });
  });
  
  //TODO: use jasmine-ui or something to test this features
  //describe("iskeydown", function() {
  //  it("should return true if key given is pressed", function() {
  //    expect(ethon.input_manager.iskeydown(ethon.input_manager.KEY_A)).toBeTruthy();
  //    expect(ethon.input_manager.iskeydown(ethon.input_manager.KEY_B)).toBeFalsy();
  //  });
  //});

  //describe("iskeyup", function() {
  //  it("should return true if key given is pressed", function() {
  //    expect(ethon.input_manager.iskeyup(ethon.input_manager.KEY_A)).toBeFalsy();
  //    expect(ethon.input_manager.iskeyup(ethon.input_manager.KEY_B)).toBeTruthy();
  //  });
  //});
});
