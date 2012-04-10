ethon.render_manager = (function() {
  var canvas, ctx;
  var fillStyle, strokeStyle, lineWidth;
  var debugMode;

  function init(canvas) {
    if(!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("init must receive a CanvasElement");
    }

    debugMode = false;

    canvas = canvas;
    canvas.width = 500;
    canvas.height= 500;
    ctx = canvas.getContext("2d");

    fillStyle = "#ffffff";
    strokeStyle = "#000000";
    lineWidth = 1;
  }

  function clear() {
    ctx.clearRect(0, 0, 500, 500);
  }

  function setDefaultStyle(options)
  {
    if(options.fillStyle != undefined)    fillStyle   = options.fillStyle;
    if(options.strokeStyle != undefined)  strokeStyle = options.strokeStyle;
    if(options.lineWidth != undefined)    lineWidth   = options.lineWidth;
  }

  function getDefaultStyle()
  {
    return {
      fillStyle: fillStyle,
      strokeStyle: strokeStyle,
      lineWidth: lineWidth
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

    if(options.lineWidth != undefined)
      ctx.lineWidth = options.lineWidth;
    else
      ctx.lineWidth = lineWidth;
  }

  function endDrawContext() {
    ctx.restore();
  }

  function drawLine(x1, y1, x2, y2, options) {
    if(options == undefined) options = {};
    options.width = Math.abs(x2 - x1);
    options.height = Math.abs(y2 - y1);

    this.beginDrawContext(x1, y1, options);
    ctx.beginPath();
    ctx.moveTo(0, 0);  
    ctx.lineTo(x2 - x1, y2 - y1);  
    ctx.stroke();
    this.endDrawContext();
  }

  function drawBox(x, y, width, height, options) {
    if(options == undefined) options = {};
    options.width = width;
    options.height = height;

    this.beginDrawContext(x, y, options);
    ctx.fillRect(0, 0, width, height);  
    if(debugMode) drawAxis.call(this, width, height);
    this.endDrawContext();
  }

  function drawCircle(x, y, radius, options) {
    if(options == undefined) options = {};
    this.beginDrawContext(x, y, options);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
    ctx.stroke();
    if(debugMode) drawAxis.call(this, radius * 2, radius * 2);
    this.endDrawContext();
  }

  function drawAxis(width, height) {
    this.drawLine(0, 0, width + 10, 0, { strokeStyle: "#ff0000", lineWidth: 2 });
    this.drawLine(0, 0, 0, height + 10, { strokeStyle: "#00ff00", lineWidth: 2 });
  }

  return {
    init: init,
    clear: clear,
    setDefaultStyle: setDefaultStyle,
    getDefaultStyle: getDefaultStyle,
    beginDrawContext: beginDrawContext,
    endDrawContext: endDrawContext,
    drawLine: drawLine,
    drawBox: drawBox,
    drawCircle: drawCircle 
  };
})();
