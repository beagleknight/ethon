ethon.render_manager = (function() {
  var canvas, ctx;
  var fillStyle, strokeStyle;

  function init(canvas) {
    if(!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("init must receive a CanvasElement");
    }
    canvas = canvas;
    canvas.width = 500;
    canvas.height= 500;
    ctx = canvas.getContext("2d");

    fillStyle = "#ffffff";
    strokeStyle = "#000000";
  }

  function clear() {
    ctx.clearRect(0, 0, 500, 500);
  }

  function setDefaultStyle(options)
  {
    if(options.fillStyle != undefined)    fillStyle = options.fillStyle;
    if(options.strokeStyle != undefined)  strokeStyle = options.strokeStyle;
  }

  function getDefaultStyle()
  {
    return {
      fillStyle: fillStyle,
      strokeStyle: strokeStyle
    };
  }

  function beginDrawContext(x, y, options) {
    ctx.save();
    ctx.translate(x, y);

    if(options.rotate != undefined && options.rotate != 0) {
      ctx.translate(options.width / 2, options.height / 2);
      ctx.rotate(options.rotate * (Math.PI / 180))  
      ctx.translate(-options.width / 2, -options.height / 2);
    }

    if(options.fillStyle != undefined)    
      ctx.fillStyle = options.fillStyle;
    else
      ctx.fillStyle = fillStyle;

    if(options.strokeStyle != undefined) 
      ctx.strokeStyle = options.strokeStyle;
    else
      ctx.strokeStyle = strokeStyle;
  }

  function endDrawContext() {
    ctx.restore();
  }

  function drawBox(x, y, width, height, options) {
    if(options == undefined) options = {};
    options.width = width;
    options.height = height;

    this.beginDrawContext(x, y, options);
    ctx.fillRect(0, 0, width, height);  
    this.endDrawContext();
  }

  function drawCircle(x, y, radius, options) {
    if(options == undefined) options = {};
    this.beginDrawContext(x, y, options);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
    ctx.stroke();
    this.endDrawContext();
  }

  return {
    init: init,
    clear: clear,
    setDefaultStyle: setDefaultStyle,
    getDefaultStyle: getDefaultStyle,
    beginDrawContext: beginDrawContext,
    endDrawContext: endDrawContext,
    drawBox: drawBox,
    drawCircle: drawCircle 
  };
})();
