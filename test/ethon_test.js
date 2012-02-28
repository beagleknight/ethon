TestCase("TestEthon", {
  "test should be an object": function() {
    assertObject(ethon);
  },

  "test engine should be an object": function() {
    assertObject(ethon.engine);
  }
});
