(function() {
  $(function() {
    var CONSOLE_LOG_ON, DEFAULT_OPTIONS, getMasonryOption, masonryDestroy, masonryLoaderInit, masonryRefresh, trace;
    CONSOLE_LOG_ON = true;
    DEFAULT_OPTIONS = {
      selector: '.masonry-item'
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
      if ($target.hasClass("js-masonry")) {
        $target.masonry('destroy');
        return $target.removeClass("js-masonry");
      }
    };
    masonryRefresh = function($target) {
      var $list, params, selector;
      trace("masonry refresh");
      masonryDestroy($target);
      selector = getMasonryOption($(this), "selector");
      params = {
        columnWidth: selector,
        itemSelector: selector
      };
      $list = $target.find(params.itemSelector);
      if ($list.length) {
        $target.addClass("js-masonry");
        return $target.masonry(params);
      }
    };
    masonryLoaderInit = function() {
      return $('.masonry-loader').each(function() {
        return masonryRefresh($(this));
      });
    };
    return masonryLoaderInit();
  });

}).call(this);
