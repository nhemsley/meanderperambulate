$ = jQuery

$ ->
  path = $.fn.scrollPath "getPath"

  get_center = (el) ->
    [x, y] = [el.offset().left + (el.width()/2.5), el.offset().top + 300]
    {x: x, y: y}

  children = $("#wrapper>div.page")

  first = get_center($(children[0]))

  path.moveTo first.x, first.y, {name: "index"}

  papers = {}

  for child in children
    el = $ child
    center = get_center el
    path.lineTo center.x, center.y, {name: child.id}

    paper = Raphael(0, 0, 600, 600)
    paper.width = 600
    paper.height = 600
    papers[child.id] = paper
    #rect = paper.rect(0,0,600,600)
    #rect.attr("fill", "#f00")
  path.lineTo first.x, first.y

  clearPapers = =>
    for key, paper of papers
      paper.forEach (el) ->
        do el.stop
      #do paper.clear

  pageCircle = (paper, color, cb) ->
    circle = paper.circle(paper.width/2, paper.height/2, 30);
    circle.attr "stroke", color
    circle.attr "stroke-width", 2
    circle.attr "opacity", 0.1
    circle.animate
      r: 200
      "stroke-width": 5
      opacity: 0.2
    ,6000, null, ->
      do circle.remove
      do cb if cb

  pageCallbacks =
    index:
      in: ->
        do clearPapers
        pageCircle papers.index, "#f00"
        setTimeout ->
          pageCircle papers.index, "#f00"
        , 400
        setTimeout ->
          pageCircle papers.index, "#f00", pageCallbacks.index.in
        , 800
        #pageCircle papers.index, "#f00"
      out: ->
        console.log(scrollPath)
        console.log "out"
    about:
      in: ->
        do clearPapers
        pageCircle papers.about, "#ff0"

     out: ->
        $.fn.
        console.log "out"
    people:
      in: ->
        console.log "people in"
        do clearPapers
        pageCircle papers.people, "#f00"
        setTimeout ->
          pageCircle papers.people, "#f00"
        , 400
        setTimeout ->
          pageCircle papers.people, "#f00", pageCallbacks.people.in
        , 800
        people = $(".person")
      out: ->
        console.log(scrollPath)
        console.log "out"
    services:
      in: ->
        do clearPapers
        pageCircle papers.services, "#3f0"
        console.log "in"
      out: ->
        console.log(scrollPath)
        console.log "out"

  do pageCallbacks.index.in
  # We're done with the path, let's initate the plugin on our wrapper element
  scrollPath = $("#wrapper").scrollPath
    wrapAround: true
    #drawPath: true

  $("#menu a").click (e)->
    do clearPapers
    do e.preventDefault
    href = $(this).attr("href")
    target = href.replace "#", ''
    $.fn.scrollPath "scrollTo", target, 1000, null, ->
      do pageCallbacks[target].in if pageCallbacks[target]
