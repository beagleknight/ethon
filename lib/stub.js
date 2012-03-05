function stubFn(returnValue) {
  var fn = function() {
    fn.called = true;
    fn.args = arguments;
    return returnValue;
  };

  fn.called = false;
  return fn;
}
