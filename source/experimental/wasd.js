$.wasd = function(div, options) {
  div = $(div);
  // absolutely position
  var left = div.offset().left,
      top = div.offset().right,
      width = div.width(),
      height = div.height();
  div.css({position: "absolute", left: left, top: top, width: width, height: height});

  // this is needed to handle keydown
  div.attr("tabindex", 0);
  
  if (options.class) {
    div.addClass(options.class);
  }
  
  var state;
  var stateHandlers = {
    // begin a wasd state, so start recording mousemoves
    begin: function(container) {
      var pos = false;
      container.mousemove(function(e) {
        if (state) {
          if (!pos) {
            pos = {x: e.clientX, y: e.clientY};
          }
          delta = {x: e.clientX - pos.x, y: e.clientY - pos.y};
          pos = {x: e.clientX, y: e.clientY};
          var css = false;
          console.log(delta);
          switch(state)
          {
            case "move":
              css = {top: parseInt(container.offset().top) + delta.y,
                    left: parseInt(container.offset().left) + delta.x}
              break;
            case "top":
              css = {top: parseInt(container.offset().top) + delta.y,
                    height: container.height() - delta.y};
              break;
            case "bottom":
              css = {height: container.height() + delta.y};
              break;
            case "left":
              css = {left: parseInt(container.offset().left) + delta.x,
                    width: container.width() - delta.x };
              break;
            case "right":
              css = {width: container.width() + delta.x};
              break;
            default:
            
          }
          
          if (css)
          {
            container.trigger("change");
            container.css(css);
          }
          
        }
      });
    },
    end: function(container)
    {
      container.unbind("mousemove");
      pos = false;
    }
  }  
  
  div.mousedown(function(e) {
    state = "move";
    stateHandlers.begin(div);
  });
  
  div.mouseup(function(e) {
    stateHandlers.end(div);
  });
  
  div.keydown(function(e){
    var key = String.fromCharCode(e.keyCode).toLowerCase();
    switch(key)
    {
      case "m":
        state = "move";
        break;
      case "w":
        state = "top";
        break;
      case "a":
        state = "left";
        break;
      case "s":
        state = "bottom";
        break;
      case "d":
        state = "right";
        break;
      default:
        //console.log(key, e.keyCode);
    }
    
    if (state) {
      stateHandlers.begin(div);
    }
  });
  
  div.keyup(function(e) {
    var key = String.fromCharCode(e.keyCode).toLowerCase();
    if (state) state = false;
    stateHandlers.end(div);
  });
  
}

var inner = "I call this wasd layout. Hover over the rounded box, and press w, a, s or d then move your mouse to change the dimensions of the box." +
          "<ul><li> w for top</li>" + 
          "<li>a for left</li>" +
          "<li>... you get the point</li></ul>"+
          "<br /><br />It doesnt work at the moment...";

var content = $.zen("div#wasd.box.rounded.padded.margin");
app.dom().content().append(content);
content.append(inner);

$.wasd(content, {class: "box"});

var css = $.zen("div#thecss");

content.append(css);

content.bind("change", function(e)
{
  css.empty();
  css.append(content.attr("style"));
});


