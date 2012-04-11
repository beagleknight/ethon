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

  function beginDrawContext(options) {
    ctx.save();
    ctx.translate(options.x, options.y);

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

  function onDrawContext(options, callback) {
    this.beginDrawContext(options);
    callback();
    this.endDrawContext();
  }

  function drawLine(x1, y1, x2, y2, options) {
    if(options == undefined) options = {};
    options.x = x1;
    options.y = y1;
    options.width = Math.abs(x2 - x1);
    options.height = Math.abs(y2 - y1);
    this.onDrawContext(options, function() {
      ctx.beginPath();
      ctx.moveTo(0, 0);  
      ctx.lineTo(x2 - x1, y2 - y1);  
      ctx.stroke();
    });
  }

  function drawBox(x, y, width, height, options) {
    if(options == undefined) options = {};
    options.x = x;
    options.y = y;
    options.width = width;
    options.height = height;
    this.onDrawContext(options, function() {
      ctx.fillRect(0, 0, width, height);  
      if(debugMode) drawAxis.call(this, width, height);
    });
  }

  function drawCircle(x, y, radius, options) {
    if(options == undefined) options = {};
    options.x = x;
    options.y = y;
    this.onDrawContext(options, function() {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
      ctx.stroke();
      if(debugMode) drawAxis.call(this, radius * 2, radius * 2);
    });
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
    onDrawContext: onDrawContext,
    drawLine: drawLine,
    drawBox: drawBox,
    drawCircle: drawCircle 
  };
})();
