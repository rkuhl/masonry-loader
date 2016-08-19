(function() {
  $(function() {
    var CONSOLE_LOG_ON, DEFAULT_OPTIONS, getMasonryOption, masonryDestroy, masonryLoaderInit, masonryRefresh, trace;
    CONSOLE_LOG_ON = true;
    DEFAULT_OPTIONS = {
      selector: '.masonry-item',
      width: '.masonry-item'
    };
    trace = function(str) {
      if (CONSOLE_LOG_ON) {
        console.log(str);
      }
      return true;
    };
    getMasonryOption = function($target, key) {
      var tval, val;
      tval = $target.data(key);
      if (tval) {
        val = tval;
      } else {
        val = DEFAULT_OPTIONS[key];
      }
      return val;
    };
    masonryDestroy = function($target) {
      if ($target.hasClass("masonry-loader-on")) {
        $target.masonry('destroy');
        return $target.removeClass("masonry-loader-on");
      }
    };
    masonryRefresh = function($target) {
      return $target.masonry('layout');
    };
    masonryLoaderInit = function() {
      return $('.masonry-loader').each(function() {
        var $grid, params, selector, width;
        $grid = $(this);
        width = getMasonryOption($(this), "width");
        selector = getMasonryOption($(this), "selector");
        if (typeof $grid.masonry === 'function') {
          params = {
            columnWidth: width,
            itemSelector: selector
          };
          $grid.addClass("masonry-loader-on");
          $grid.masonry(params);
          if (typeof $grid.imagesLoaded === 'function') {
            return $grid.imagesLoaded(function() {
              return masonryRefresh($grid);
            });
          } else {
            return trace("looks like imagesLoaded is not included :(");
          }
        } else {
          return trace("looks like masonry is not included :(");
        }
      });
    };
    return masonryLoaderInit();
  });

}).call(this);
