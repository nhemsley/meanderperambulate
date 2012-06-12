var experiments = {
  "wasd": {title: "WASD Layout Thing", disable: true},
  "pdfslideshow": {title: "PDF Slideshow with jQuery", static: true},
  "savannah": {title: "Raphael, vector images & events", static: true},
}

var query = app.helpers.url.query().split("&");

var experiment = query.length > 1 ? query[1] : null;
if (experiment) {
  $.getScript("/pages/experimental/" + experiment + ".js");
}
else
{
  var toShow = _(_(experiments).keys()).reject(function(key) {
                   return experiments[key].disable === true; });
                 
  _(toShow).each(function(key) {
    var experiment = experiments[key];
    app.dom().content().append("<div class='box rounded padded margin'><h2><a href='" + (experiment.static 
                                                ? ("./pages/experimental/" + key + ".html") 
                                                : ("/app?experimental&" + key))
                                              + "' >" + experiment.title + "</a></h2></div>");
  })
}
