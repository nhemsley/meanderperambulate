  $(document).ready(function(){
      var images = $("#interest-container>.interest>img");
      
      // create our clicky and return it
      var clicky = $('<div id="clicky"></div>'); 

      App.dom.content().prepend(clicky);

     clicky.css({left: -clicky.offset().left});
     clicky.css({width: $("body").width()});
      
      _(images).each(function(img)
      {
        var hover = $("<span class='hover'></span>");
        hover.css({})
        
        var img = $("<img src='" + img.src + "' height='50'></img>");
        var margin = 2, padding= 5;
        img.css({margin: margin, padding: padding});
        hover.append(img);
        clicky.append(hover);
        img.hover(function(e) {
          hover.addClass("hover-hover");
          hover.css({margin: 0});
        }, 
        function(e) {
            hover.removeClass("hover-hover");
            hover.removeAttr("style");
        });
        
        img.click(function(e) {
          var clicked = e.target;
          var container = $("#interest-container");
          var images = $("#interest-container>.interest>img");
          var moveToTop = _(images).detect(function(img){return img.src == clicked.src;});
          if (moveToTop) moveToTop = $(moveToTop).parent();
          var currentTop = container.children().first();
          
          if (false) {
          var hover = $("#hover");
          hover.animate({top: currentTop.offset().top,
                        left: currentTop.offset().left,
                        // not sure why I need to add 30 here, prob margin or something from above
                        width: moveToTop.width()+30,
                        height: moveToTop.height()+30,
                        opacity: "hide"}, 1000);
          }
          
          if (moveToTop[0] == currentTop[0]) {
            var marginLeft = currentTop.css("marginLeft");
            currentTop.animate({marginLeft: 100}, 'fast', function()
            {
              currentTop.animate({marginLeft: marginLeft}, 'fast', function(){ currentTop.removeAttr("style"); });
            });
          }
          else{
            var spacerDiv = $("<div class='spacer'></div>");
            container.prepend(spacerDiv);
            moveToTop.css({position: "absolute", 
                            top: moveToTop.offset().top, 
                            width: moveToTop.width()})
                     .animate({top: currentTop.offset().top}, "slow", function(){
                        $(this).removeAttr("style");
                        $(this).prependTo(container);
                        spacerDiv.remove();
                      });
            spacerDiv.animate({height: spacerDiv.outerHeight() + moveToTop.outerHeight()}, "slow");
          }
        });
      });
      
    });
