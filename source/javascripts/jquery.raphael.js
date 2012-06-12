jQuery.svg2raphael = function(doc, options) {

  options = options || {};
  var throwaway = $(doc);

  var root = throwaway.find("svg")[0],
    vb = root.getAttribute('viewBox'),
    svgDims = vb ? vb.split(' ') : 
      [0,0,root.getAttribute('width'),root.getAttribute('height')],
    dims,
    img;
  
  if (options.container) {
    img = Raphael(options.container);
    dims = [0, 0, $(options.container).width(), $(options.container).height()]
  } 
  else {
    
    dims = svgDims;
    img = Raphael(parseFloat(dims[0]),
                      parseFloat(dims[1]), 
                      parseFloat (dims[2]), 
                      parseFloat(dims[3]));
  }
  if (options.width)
    dims[2] = options.width;
  
  var paths = {}
  
  $(root).find('path').each(function(){ 
    var node = this, path = img.path($(this).attr('d')); 
    $(['stroke-linejoin','stroke','stroke-miterlimit','stroke-width','fill','stroke-linecap']).each(function(){ 
      if($(node).attr(this.toString())) 
        path.attr(this, $(node).attr(this.toString()));
      else
        path.attr(this, "none");
    }); 
    if($(node).attr('style')) { 
      var atts = $(node).attr('style').split(';'); 
        for(var i=0;i<atts.length;i++) { 
          var bits = atts[i].split(':'); 
            path.attr(bits[0],bits[1]); 
      } 
    }
    var parent = $(node).parent();
    if (parent.attr("transform")) {
      var transform = parent.attr("transform");
      var treg = /.*translate\((.*)\)/i //FIXME this is broken, it needs to test for end of parens
      var match = treg.exec(transform);
      if (match && match[1])
        translate = match[1].split(",");
    }
    
    path.translate(parseFloat(translate[0]), parseFloat(translate[1]));
    var scale = false;
    if (options.scale)
     scale = $.extend(scale, options.scale);
    if (options.container)
      scale = $.extend(scale, {width: $(options.container).width(), height: $(options.container).height()});
    
    if (scale) {
      path.scale(scale.width / svgDims[2], scale.height / svgDims[3], 0, 0);
    }
    paths[this.id] = path;
  });
  window.paths = paths;
  return [img, paths, dims];
}

jQuery.rsvg2raphael = function(url, canvas, callback) {
  $.ajax({url: url, 
          complete: function (doc) {
            var ret = jQuery.svg2raphael(doc.responseXML, canvas);
            callback(ret[0], ret[1], ret[2]);
          }, 
          error: function (a, b, c) {
            var y = 5;
            
          }});
}
