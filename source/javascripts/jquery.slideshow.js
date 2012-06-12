$.fn.slideshow = function(images, options) {

  var _options = {iconWidth: 20, 
                  empty: false, 
                  background: "white", 
                  ns: "slideshow", 
                  width: false, 
                  height: false, 
                  border: "1px solid black",
                  path: false,
                  magnified: false,
                  pdfLink: false
                  };
                  
  jQuery.extend(_options, options);
  
  options = _options;
  
  var ns = function(name){
    return options.ns + "-" + name;
  }
  
  var id = function(name) {
    return "id='" + ns(name) + "'";
  }
  
  var imgCache = {};

  function loadImage (index, path){
    var current = imgCache[index] || $("<img src='" + path + images[index] + "' / >");
    var next = imgCache[index+1] || $("<img src='" + path + images[index+1] + "' / >");
    var prev = imgCache[index-1] || $("<img src='" + path + images[index-1] + "' / >");
    if (options.width)
      current.css("width", options.width);
    if (options.height)
      current.css("height", options.height);
    content().empty().append(current);
  }

  var outer = function() {
    var _outer = $("<div " + id("container") + " class='slideshow'></div>");
    _outer.css({textAlign: "center", border: options.border, margin: options.outerBorder});
    return _outer;
    }.memoize();
  
  function pdfLink(toolbar) {
    if (!options.pdfLink)
      return;
    
    pdf = $("<button " + id("pdf") + ">Download PDF</button>");
    pdf.button({text: false, icons: {primary: "ui-icon-arrow-1-se"}})
      .click(function() { window.location.href = options.pdfLink; });
    
    toolbar.append(pdf);
  }
    
  var toolbar = function() {
      var cont = jQuery("<div " + id("toolbarcont") + " class='slideshow'>" + 
        "<span " + id("toolbar") + " class='ui-widget-header ui-corner-all'>" + 
          "<button " + id("magnify") + ">Magnify</button>" + 
          "<button " + id("back") + ">Back</button>" + 
          "Page <input " + id("page") + " name = " + ns("page") + " / > of <span " + id("total-pages") + ">" + images.length + "</span>" +
          "<button " + id("forward") + ">Forward</button>" + 
        "</span>" + 
      "</div>");
      
      var toolbar = cont.find("#" + ns("toolbar"));
      
      pdfLink(toolbar);
            
      toolbar.css({padding: "10px 4px"});
      
      cont.children("input[type=image]").css({width: options.iconWidth, 
                           backgroundColor: options.background, marginRight: 4, marginLeft: 4});
      var height = cont.children("img").height();
      
      cont.css({textAlign: "center"});
      
      var magnify = cont.find("#" + ns("magnify")),
          back = cont.find("#" + ns("back")),
          forward = cont.find("#" + ns("forward")),
          page = cont.find("#" + ns("page"));
      
      page.css({width: "2em", textAlign: "center"});
      
      var idx = 0;
      var magnified = false;

      magnify.button({text: false, icons: {primary: "ui-icon-zoomin"}})
        .click(function(e) {
          imgCache = {};
          magnified = !magnified;
          loadImage(idx, magnified ? options.magnifiedPath : options.path);
          
          var opts = magnified ? {primary: "ui-icon-zoomout"} : {primary: "ui-icon-zoomin"};
          magnify.button("option", "icons", opts);
          
        });
        
      back.button({text: false, icons: {primary: "ui-icon-circle-arrow-w"}})
        .click(function(e) {
          if (idx > 0) {
            idx--;
            loadImage(idx, magnified ? options.magnifiedPath : options.path);
            page.val(idx + 1);
          }
        });
      
      forward.button({text: false, icons: {primary: "ui-icon-circle-arrow-e"}})
        .click(function(e) {
          if(idx < images.length - 1) {
            idx++;
            loadImage(idx, magnified ? options.magnifiedPath : options.path);
            page.val(idx + 1);
          }
        });
        
      page.change(function() {
        var pageNo = page.val();
        if (pageNo < 1 || pageNo > images.length) 
          return;
        
        idx = pageNo - 1;
        loadImage(idx, magnified ? options.magnifiedPath : options.path);
        
      })
            
      return cont;
  }.memoize();
  
  var magnify = toolbar().find("#" + ns("magnify")),
          back = toolbar().find("#" + ns("back")),
          forward = toolbar().find("#" + ns("forward")),
          page = toolbar().find("#" + ns("page"));
          
  var content = function() {
    var _content = $("<div " + id("content") + "></div>");
    _content.css({textAlign: "center"});
    return _content;
  }.memoize();
    
  return this.each(function(){

    var container = outer();
    container.append(toolbar());
    container.append(content());
    
    if (options.empty)
      this.empty();
      
    var index = function() {
      if (arguments.length > 0)
        $(this).attr("data-slideShowIndex", arguments[0]);
      
      return parseInt($(this).attr("data-slideShowIndex"));
        
    }

    index(0);
    loadImage(index(), options.path);
    $(this).append(container);

    page.val(index() + 1);
  });
}

Function.prototype.memoize = function() {
    var pad  = {};
    var self = this;
    var obj  = arguments.length > 0 ? arguments[i] : null;

    var memoizedFn = function() {
        // Copy the arguments object into an array: allows it to be used as
        // a cache key.
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }

        // Evaluate the memoized function if it hasn't been evaluated with
        // these arguments before.
        if (!(args in pad)) {
            pad[args] = self.apply(obj, arguments);
        }

        return pad[args];
    }

    memoizedFn.unmemoize = function() {
        return self;
    }

    return memoizedFn;
}

Function.prototype.unmemoize = function() {
    alert("Attempt to unmemoize an unmemoized function.");
    return null;
}

