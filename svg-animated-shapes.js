
var commonStyle = {
  fill: 'none',
  'stroke-width': '6',
  stroke: '#0ca199',
}
var lastExecutedOrder = 0;
var waitDelay = 1000;
var canvas = document.getElementById('animate');
var drawAnimated = function(ele, data, attrs) {
  if(!attrs.duration) {
    attrs.duration = 2000
  }
  return SVG(ele)
  .path(data)
  .attr(attrs.style)
  .drawAnimated({
    duration: attrs.duration,
    easing: '=',
    delay: 0,
    strokeWidth: 6,
    callback: function() {
      lastExecutedOrder = attrs.order
    }
	});
}
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
  return d;       
}
function drawCircle(order, x, y, radius, delay) {
  if(order == parseInt(lastExecutedOrder) + 1)
    return drawAnimated(canvas, describeArc(x, y, radius, 0, 359) + 'z', {'style': commonStyle, 'duration': delay, order: order});
  else
    setTimeout(function() {
      drawCircle(order + "", x, y, radius, delay)
    }, waitDelay)
}
function drawDottedCircle(order, x, y, radius, delay) {
  if(order == parseInt(lastExecutedOrder) + 1)
    return drawAnimated(canvas, describeArc(x, y, radius, 0, 359) + 'z', {'style': commonStyle, 'duration': delay, order: order});
  else
    setTimeout(function() {
      drawDottedCircle(order + "", x, y, radius, delay)
    }, waitDelay)
}
function drawLine(order, x1, y1, x2, y2, delay) {
  if(order == parseInt(lastExecutedOrder) + 1)
    return drawAnimated(canvas, "M" + x1 + " " + y1 + "L" + x2 + " " + y2, {'style': commonStyle, 'duration': delay, order: order});
  else
    setTimeout(function() {
      drawLine(order + "", x1, y1, x2, y2, delay)
    }, waitDelay)
}
function drawDottedLine(order, x1, y1, x2, y2, delay) {
  if(order == parseInt(lastExecutedOrder) + 1)
    return drawAnimated(canvas, describeArc(x, y, radius, 0, 359) + 'z', {'style': commonStyle, 'duration': delay, 'order': order});
  else
    setTimeout(function() {
      drawDottedLine(order + "", x1, y1, x2, y2, delay)
    }, waitDelay)
}
function drawPath(order, path, style, delay) {
  if(order == parseInt(lastExecutedOrder) + 1)
    return drawAnimated(canvas, path, {'style': style, 'duration': delay, order: order});
  else
    setTimeout(function() {
      drawPath(order + "", path, style, delay)
    }, waitDelay)
}
