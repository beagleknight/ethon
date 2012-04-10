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
    fillStyle = options.fillStyle;
    strokeStyle = options.strokeStyle;
  }

  function getDefaultStyle()
  {
    return {
      fillStyle: fillStyle,
      strokeStyle: strokeStyle
    };
  }

  function setStyle(options)
  {
    if(options != undefined) {
      ctx.fillStyle = options.fillStyle;
      ctx.strokeStyle = options.strokeStyle;
    }
    else {
      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = strokeStyle;
    }
  }

  function drawBox(x, y, width, height, options) {
    setStyle(options);

    ctx.save();
    ctx.translate(x, y);

    if(options != undefined && options.rotate != undefined && options.rotate != 0) {
      ctx.translate(width / 2, height / 2);
      ctx.rotate(options.rotate * (Math.PI / 180))  
      ctx.translate(-width / 2, -height / 2);
    }

    ctx.fillRect(0, 0, width, height);  
    ctx.restore();
  }

  function drawCircle(x, y, radius, options) {
    ctx.beginPath();
    setStyle(options);
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.stroke();
  }

  return {
    init: init,
    clear: clear,
    setDefaultStyle: setDefaultStyle,
    getDefaultStyle: getDefaultStyle,
    drawBox: drawBox,
    drawCircle: drawCircle 
  };
})();
