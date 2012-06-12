var AppMethods = {
  init: function(setup){
    if (setup) this.setup();
  },
  showLinks: function() {
      var nav = this.dom().nav();
      _.each(loot.linkage, function(link) { nav.append('<span><a href="'+link[0]+'">'+link[1]+'</a></span>'); });
      nav.children().first().addClass("first");
  },
  isDynamic: function() {
    return this.helpers.url.file() == "/app";
  },
  helpers: {
    url: {
      file: function() {
        return window.location.pathname;
      },
      hash: function() {
        return window.location.hash;
      },
      query: function() {
        return window.location.search.substr(1);
      },
      dynamicPage: function() {
        return window.location.hash.substr(1);
      }
    },
    titleForPage: function(page)
    {
      var title = _(loot.linkage).detect(function(link) {
        return link[0] == page;});
      return title ? title[1] : "Unknown";
      
    }
  },
  dom: function() {
    return {
      title: function () {return $("title");},
      content: function () {return $("#content"); },
      nav: function() {return $("#nav"); }
    }
  },
  setup: function () {
    this.showTitle();
    this.showLinks();
    if (this.isDynamic())
      this.load();
    //this.monkey();
  },
  load: function() {
    var pages = loot.pages.load();
    var page = _(this.helpers.url.query().split("&")).first();
    
    var script = document.createElement("script");
    script.type="text/javascript";
    script.src = "/pages/" + page + ".js";
    $("head").append(script);
  },
  staticMethods: {
    showTitle: function() {
      var title = this.helpers.titleForPage(app.helpers.url.file());
      // This fails in IE for some reason
      try { this.dom().title().text(title); } catch(e) {}
    }
  },
  dynamicMethods: {
    showTitle: function() {
      var title = this.helpers.titleForPage(this.helpers.url.file() + "?" + this.helpers.url.query());
      // This fails in IE for some reason
      try { this.dom().title().text(title); } catch(e) {}
    }
  }
}

var methodsTree = AppMethods.isDynamic() ? AppMethods.dynamicMethods : AppMethods.staticMethods;

var App = Class.extend(AppMethods);
App = App.extend(methodsTree);
var app = new App();

var loot = {
  linkage: [["/index.html", "Home"], ["/blog.html", "Blog"], ["/resume.html", "Resume"], /*["/app#interests", "Interests"], */ ["/projects.html", "Cool Tech"]/*, ["/experimental.html", "Experimental"]*/],
  tutes: {
    "roh": {title: "Resume on Heroku",  desc: "Blah Blah"}
  },
  pages: {
    thie: { n: "Tutorial Heroku Image Experiment" },
    aboutme: { n: "About Me"},
    resume: { n: "Resume" },
    load: function(key)
    {
      var pruned = {};
      var ldFuns = _(this).
                    each(function (value, key){ if (key != "load") pruned[key] = value});
      return ldFuns;
    }
  }
};

