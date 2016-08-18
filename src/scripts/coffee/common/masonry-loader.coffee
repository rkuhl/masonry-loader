$ ->
  CONSOLE_LOG_ON = true
  DEFAULT_OPTIONS = {
    selector:  '.masonry-item'
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


  masonryDestroy = ($target)->
    if $target.hasClass "js-masonry"
      $target.masonry('destroy')
      $target.removeClass "js-masonry"

  masonryRefresh = ($target)->
    trace "masonry refresh"
    # destroy masonry #
    masonryDestroy $target
    # item selector
    selector = getMasonryOption $(@), "selector"
    params = {columnWidth: selector, itemSelector: selector}
    $list = $target.find params.itemSelector
    if $list.length
      $target.addClass "js-masonry"
      $target.masonry(params)

  masonryLoaderInit = ()->
    $('.masonry-loader').each ()->
      masonryRefresh $(@)
  # init
  masonryLoaderInit()
