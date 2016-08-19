$ ->
  CONSOLE_LOG_ON = true
  DEFAULT_OPTIONS = {
    selector:  '.masonry-item',
    width:  '.masonry-item'
  }

  trace = (str)->
    if CONSOLE_LOG_ON
      console.log str
    true

  # get masonry option (data-key on target or default options)
  getMasonryOption = ($target, key)->
    tval = $target.data key
    if tval
      val = tval
    else
      val = DEFAULT_OPTIONS[key]
    val

  # destroy masonry
  masonryDestroy = ($target)->
    if $target.hasClass "masonry-loader-on"
      $target.masonry 'destroy'
      $target.removeClass "masonry-loader-on"

  # masonry layout
  masonryRefresh = ($target)->
    $target.masonry 'layout'

  masonryLoaderInit = ()->
    $('.masonry-loader').each ()->
      $grid = $(@)
      # column width
      width = getMasonryOption $(@), "width"
      # item selector
      selector = getMasonryOption $(@), "selector"
      if typeof $grid.masonry == 'function'
        # masory params
        params = {columnWidth: width, itemSelector: selector}
        $grid.addClass "masonry-loader-on"
        $grid.masonry params
        if typeof $grid.imagesLoaded == 'function'
          $grid.imagesLoaded ()->
            masonryRefresh $grid
        else
          trace "looks like imagesLoaded is not included :("
      else
        trace "looks like masonry is not included :("

  # init
  masonryLoaderInit()
