!function (modules) {
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId])return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {exports: {}, id: moduleId, loaded: !1};
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0, module.exports
  }
  
  var installedModules = {};
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.p = "https://static.webull.com/fmweb/", __webpack_require__(0)
}([function (module, exports, __webpack_require__) {
  "use strict";
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj}
  }
  
  var _slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [], _n = !0, _d = !1, _e = void 0;
        try {
          for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !i || _arr.length !== i); _n = !0);
        } catch (err) {
          _d = !0, _e = err
        } finally {
          try {
            !_n && _i.return && _i.return()
          } finally {
            if (_d)throw _e
          }
        }
        return _arr
      }
      
      return function (arr, i) {
        if (Array.isArray(arr))return arr;
        if (Symbol.iterator in Object(arr))return sliceIterator(arr, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
      }
    }(), _jquery = __webpack_require__(17), _jquery2 = _interopRequireDefault(_jquery), _swiper = __webpack_require__(38),
    _swiper2 = _interopRequireDefault(_swiper);
  __webpack_require__(61), __webpack_require__(16);
  var _funutil = __webpack_require__(20), allHelpData = __webpack_require__(64), helpData = null;
  helpData = (0, _jquery2.default)(document.body).hasClass("en") ? allHelpData.en : allHelpData.zh, module.exports = !function () {
    function getCatalogData(helpData, catalogId) {
      for (var i = 0; i < helpData.length; ++i) {
        var dataInfo = helpData[i];
        if (dataInfo.catalogId === catalogId)return dataInfo
      }
    }
    
    function getTypeData(type) {
      return getCatalogData(helpData, Number(type))
    }
    
    function runIdData(id) {
      function getTagIndex() {
        for (var i = 0; i < catalogData.qaList.length; ++i)for (var qaData = catalogData.qaList[i], j = 0; j < qaData.list.length; ++j) {
          var itemInfo = qaData.list[j];
          if (itemInfo.id === helpId)return [i, j]
        }
      }
      
      var helpId = Number(id) || 1, catalogData = getCatalogData(helpData, Math.floor(helpId / 1e3));
      getQaCatalogList(catalogData);
      var _getTagIndex = getTagIndex(), _getTagIndex2 = _slicedToArray(_getTagIndex, 2),
        catalogIndex = _getTagIndex2[0], qaIndex = _getTagIndex2[1];
      activeJumpQaItem(catalogIndex, qaIndex)
    }
    
    function scrollTo(container, scrollElement) {
      container.animate({scrollTop: scrollElement.offset().top - container.offset().top - 45}, 500)
    }
    
    function appendQaDetail(qaTitle) {
      if (0 === qaTitle.next().find(".answer").length) {
        var answerid = qaTitle.next().data("answerid");
        qaTitle.next().append('<div class="answer">' + getQaDetail(answerid) + "</div>")
      }
      qaTitle.parent().toggleClass("active")
    }
    
    function activeJumpQaItem(catalogIndex, qaIndex) {
      function activeQaItem(qaIndex) {
        var qaItems = divQaList.find(".content > .tit").eq(qaIndex);
        appendQaDetail(qaItems), scrollTo((0, _jquery2.default)(document.body), qaItems.parent())
      }
      
      var navItems = (0, _jquery2.default)(".nav ul li");
      if (0 === navItems.length && 0 === catalogIndex) activeQaItem(qaIndex); else {
        var catalogItem = (0, _jquery2.default)(navItems[catalogIndex]);
        catalogItem.click(), activeQaItem(qaIndex)
      }
    }
    
    function getQaDetail(answerId) {
      var filterData = qaList.filter(function (data) {
        return data.id === answerId
      });
      if (filterData.length > 0) {
        var data = filterData[0];
        return (0, _funutil.isNotNull)(data.title_link) ? null : data.context.indexOf("<p>") === -1 ? "<p>" + data.context + "</p>" : data.context
      }
      return null
    }
    
    function putContent(dataInfo) {
      divQaList.children().remove(), qaList = dataInfo.list, qaList && qaList.forEach(function (info) {
        info.title_link ? divQaList.append('\n          <li class="link">\n            <div class="tit" link="' + info.title_link + '">' + info.title + "</div>\n          </li>\n        ") : divQaList.append('\n          <li class="content">\n            <div class="tit">' + info.title + '</div>\n            <div class="answer-wrap" data-answerid="' + info.id + '">\n              <!--<div class="answer">' + info.context + "</div>-->\n            </div>\n          </li>\n        ")
      })
    }
    
    function activeTagName(tagLi, index, dataInfo) {
      var $navList = (0, _jquery2.default)(".qa-list > .nav > ul");
      $navList.children().removeClass("active"), (0, _jquery2.default)(tagLi).addClass("active"), putContent(dataInfo[index])
    }
    
    function getQaCatalogList(dataInfo) {
      if ((0, _jquery2.default)(".qa-list .nav").remove(), dataInfo.qaList.length > 1) {
        (0, _jquery2.default)(".qa-list").prepend('<div class="nav swiper-container"><ul class="clearfix swiper-wrapper"></ul></div>');
        var $navList = (0, _jquery2.default)(".qa-list > .nav > ul");
        dataInfo.qaList.forEach(function (_ref) {
          var typeName = _ref.typeName;
          $navList.append('<li class="swiper-slide">' + typeName + "</li>")
        }), activeTagName($navList.children()[0], 0, dataInfo.qaList), $navList.children().each(function (i, tagLi) {
          tagLi.addEventListener("click", function () {
            return activeTagName(tagLi, i, dataInfo.qaList)
          })
        })
      } else putContent(dataInfo.qaList[0])
    }
    
    function runHelpDetail() {
      (0, _funutil.getQuery)("type") ? getQaCatalogList(getTypeData((0, _funutil.getQuery)("type"))) : (0, _funutil.getQuery)("id") ? runIdData((0, _funutil.getQuery)("id")) : getQaCatalogList(getTypeData(0))
    }
    
    var qaList = void 0, divQaContainer = (0, _jquery2.default)(".qa-list"),
      divQaList = divQaContainer.find(".cont > .list");
    divQaList.on("click", ".content > .tit", function (event) {
      appendQaDetail((0, _jquery2.default)(event.target))
    }), divQaList.on("click", ".link > .tit", function (event) {
      window.open((0, _jquery2.default)(event.target).attr("link"))
    }), runHelpDetail(), new _swiper2.default(".swiper-container", {slidesPerView: "auto", freeMode: !0})
  }()
}, , , , , , , , , , , , , , , , function (module, exports, __webpack_require__) {
  "use strict";
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj}
  }
  
  Object.defineProperty(exports, "__esModule", {value: !0});
  var _jquery = __webpack_require__(17), _jquery2 = _interopRequireDefault(_jquery), _funutil = __webpack_require__(20);
  exports.default = function () {
    var scriptTemplate = (0, _jquery2.default)("#data-script");
    scriptTemplate.length > 0 && (_jquery2.default.globalEval(scriptTemplate.html()), scriptTemplate.remove()), window.WebullH5 = window.WebullH5 || {}, function () {
      var HighThrottle = 50, headerActive = (0, _jquery2.default)(".header");
      if (headerActive.length > 0) {
        var isHeaderActiveShow = !1, scrollTop = (0, _jquery2.default)(window).scrollTop();
        scrollTop > HighThrottle && !isHeaderActiveShow && (isHeaderActiveShow = !0, headerActive.addClass("fixed")), (0, _jquery2.default)(window).on({
          scroll: function () {
            scrollTop = (0, _jquery2.default)(window).scrollTop(), scrollTop > HighThrottle && !isHeaderActiveShow && (isHeaderActiveShow = !0, headerActive.addClass("fixed")), scrollTop <= HighThrottle && isHeaderActiveShow && (isHeaderActiveShow = !1, headerActive.removeClass("fixed"))
          }
        })
      }
    }(), function () {
      function doAnimate(ele) {
        var element = (0, _jquery2.default)(ele) || ele;
        element.hasClass(".fm-animate") || element.find(".fm-animate").addClass("do-animate")
      }
      
      var windowHeight = (0, _jquery2.default)(window).height();
      (0, _jquery2.default)(window).on({
        scroll: function () {
          (0, _jquery2.default)("section").each(function (i, ele) {
            if ("true" !== ele.getAttribute("animated")) {
              var rect = ele.getBoundingClientRect(), topRate = (windowHeight - rect.top) / rect.height,
                bottomRate = rect.bottom / windowHeight;
              (bottomRate > .15 && bottomRate <= 1 || topRate > .15 && topRate <= 1) && (ele.setAttribute("animated", "true"), doAnimate(ele))
            }
          })
        }, load: function () {
          (0, _jquery2.default)("section").each(function (i, ele) {
            var rect = ele.getBoundingClientRect(), topRate = (windowHeight - rect.top) / rect.height,
              bottomRate = rect.bottom / windowHeight;
            (bottomRate > .15 && bottomRate <= 1 || topRate > .15 && topRate <= 1) && (ele.setAttribute("animated", "true"), setTimeout(function () {
              doAnimate(ele)
            }, 500))
          })
        }
      })
    }(), function () {
      (0, _jquery2.default)(".header .nav .nav-button").on("touchstart", function () {
        (0, _jquery2.default)(".nav .nav-menus").toggleClass("active"), (0, _jquery2.default)(".nav .nav-button").toggleClass("active"), (0, _jquery2.default)(".nav").toggleClass("active")
      }), (0, _jquery2.default)(".header .nav .nav-menus .lang .title").on("touchstart", function () {
        (0, _jquery2.default)(".nav .nav-menus .lang").toggleClass("spread")
      }), (0, _jquery2.default)(".header .nav .nav-menus .lang .rt-eng").on("touchstart", function (event) {
        event.stopPropagation()
      }), (0, _jquery2.default)(".header .nav").on("touchmove", function (event) {
        event.preventDefault()
      })
    }(), function () {
      var language = (0, _jquery2.default)(document.body).hasClass("en") ? "en" : "zh";
      //(0, _jquery2.default)(".footer .download > .btn").attr({href: (0, _funutil.generateDownloadUrl)(language)})
    }()
  }()
}, function (module, exports, __webpack_require__) {
  "use strict";
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj}
  }
  
  Object.defineProperty(exports, "__esModule", {value: !0});
  var _jquery = __webpack_require__(18), _jquery2 = _interopRequireDefault(_jquery);
  window.$ = _jquery2.default, window.jQuery = _jquery2.default, exports.default = _jquery2.default
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__(19)(2)
}, function (module, exports) {
  module.exports = jquery_d882153f
}, function (module, exports, __webpack_require__) {
  "use strict";
 /* function generateDownloadUrl(language) {
    return /iPhone/.test(window.navigator.userAgent) ? "" : "en" === language ? "https://play.google.com/store/apps/details?id=com.webull.trade&hl=zh_CN" : ""
  }*/
  
 // Object.defineProperty(exports, "__esModule", {value: !0}), exports.find = exports.getLocale = exports.getQuery = exports.getCookies = exports.isNotNull = exports.isNull = void 0, exports.generateDownloadUrl = generateDownloadUrl;
  var _setting = __webpack_require__(21), isNull = exports.isNull = function (value) {
    return null === value || void 0 === value || "string" == typeof value && "" === value.trim() || "number" == typeof value && isNaN(value)
  }, isNotNull = exports.isNotNull = function (value) {
    return !isNull(value)
  }, getCookies = exports.getCookies = function (key) {
    var reg = new RegExp("[,; ]" + key + "=([^\\s,;]*)"), match = document.cookie.match(reg);
    return match && decodeURIComponent(match[1])
  }, getQuery = exports.getQuery = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"), result = window.location.search.substr(1).match(reg);
    return isNotNull(result) ? decodeURIComponent(result[2]) : null
  };
  exports.getLocale = function () {
    var hl = getQuery(_setting.queryLanguageKey) || getCookies(_setting.languageKey) || "",
      languageSuffix = hl.split(/[-_]/)[0];
    return _setting.supportLanguage.indexOf(languageSuffix) === -1 && (languageSuffix = navigator.language.split(/[-_]/)[0], _setting.supportLanguage.indexOf(languageSuffix) === -1 && (languageSuffix = _setting.supportLanguage[0])), languageSuffix
  }, exports.find = function (array, callback) {
    var val = null;
    return isNull(array) ? val : (array.forEach(function (item) {
      if (callback(item))return val = item
    }), val)
  }
}, function (module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  var domainSettingTemp = void 0;
  domainSettingTemp = {QuoteApiDomain: "https://cn-quoteapi.webull.com/"};
  exports.domainSetting = domainSettingTemp, exports.supportLanguage = ["en", "zh"], exports.languageKey = "fm_hl", exports.queryLanguageKey = "hl", exports.isWebullApp = /webull(?!broker)/i.test(navigator.userAgent)
}, , , , , , , , , , , , , , , , , function (module, exports, __webpack_require__) {
  !function () {
    "use strict";
    function addLibraryPlugin(lib) {
      lib.fn.swiper = function (params) {
        var firstInstance;
        return lib(this).each(function () {
          var s = new Swiper(this, params);
          firstInstance || (firstInstance = s)
        }), firstInstance
      }
    }
    
    var $, Swiper = function (container, params) {
      function round(a) {
        return Math.floor(a)
      }
      
      function autoplay() {
        var autoplayDelay = s.params.autoplay, activeSlide = s.slides.eq(s.activeIndex);
        activeSlide.attr("data-swiper-autoplay") && (autoplayDelay = activeSlide.attr("data-swiper-autoplay") || s.params.autoplay), s.autoplayTimeoutId = setTimeout(function () {
          s.params.loop ? (s.fixLoop(), s._slideNext(), s.emit("onAutoplay", s)) : s.isEnd ? params.autoplayStopOnLast ? s.stopAutoplay() : (s._slideTo(0), s.emit("onAutoplay", s)) : (s._slideNext(), s.emit("onAutoplay", s))
        }, autoplayDelay)
      }
      
      function findElementInEvent(e, selector) {
        var el = $(e.target);
        if (!el.is(selector))if ("string" == typeof selector) el = el.parents(selector); else if (selector.nodeType) {
          var found;
          return el.parents().each(function (index, _el) {
            _el === selector && (found = selector)
          }), found ? selector : void 0
        }
        if (0 !== el.length)return el[0]
      }
      
      function initObserver(target, options) {
        options = options || {};
        var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver,
          observer = new ObserverFunc(function (mutations) {
            mutations.forEach(function (mutation) {
              s.onResize(!0), s.emit("onObserverUpdate", s, mutation)
            })
          });
        observer.observe(target, {
          attributes: "undefined" == typeof options.attributes || options.attributes,
          childList: "undefined" == typeof options.childList || options.childList,
          characterData: "undefined" == typeof options.characterData || options.characterData
        }), s.observers.push(observer)
      }
      
      function handleKeyboard(e) {
        e.originalEvent && (e = e.originalEvent);
        var kc = e.keyCode || e.charCode;
        if (!s.params.allowSwipeToNext && (s.isHorizontal() && 39 === kc || !s.isHorizontal() && 40 === kc))return !1;
        if (!s.params.allowSwipeToPrev && (s.isHorizontal() && 37 === kc || !s.isHorizontal() && 38 === kc))return !1;
        if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
          if (37 === kc || 39 === kc || 38 === kc || 40 === kc) {
            var inView = !1;
            if (s.container.parents("." + s.params.slideClass).length > 0 && 0 === s.container.parents("." + s.params.slideActiveClass).length)return;
            var windowScroll = {left: window.pageXOffset, top: window.pageYOffset}, windowWidth = window.innerWidth,
              windowHeight = window.innerHeight, swiperOffset = s.container.offset();
            s.rtl && (swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft);
            for (var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + s.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + s.height], [swiperOffset.left + s.width, swiperOffset.top + s.height]], i = 0; i < swiperCoord.length; i++) {
              var point = swiperCoord[i];
              point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight && (inView = !0)
            }
            if (!inView)return
          }
          s.isHorizontal() ? (37 !== kc && 39 !== kc || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === kc && !s.rtl || 37 === kc && s.rtl) && s.slideNext(), (37 === kc && !s.rtl || 39 === kc && s.rtl) && s.slidePrev()) : (38 !== kc && 40 !== kc || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === kc && s.slideNext(), 38 === kc && s.slidePrev()), s.emit("onKeyPress", s, kc)
        }
      }
      
      function isEventSupported() {
        var eventName = "onwheel", isSupported = eventName in document;
        if (!isSupported) {
          var element = document.createElement("div");
          element.setAttribute(eventName, "return;"), isSupported = "function" == typeof element[eventName]
        }
        return !isSupported && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (isSupported = document.implementation.hasFeature("Events.wheel", "3.0")), isSupported
      }
      
      function normalizeWheel(event) {
        var PIXEL_STEP = 10, LINE_HEIGHT = 40, PAGE_HEIGHT = 800, sX = 0, sY = 0, pX = 0, pY = 0;
        return "detail" in event && (sY = event.detail), "wheelDelta" in event && (sY = -event.wheelDelta / 120), "wheelDeltaY" in event && (sY = -event.wheelDeltaY / 120), "wheelDeltaX" in event && (sX = -event.wheelDeltaX / 120), "axis" in event && event.axis === event.HORIZONTAL_AXIS && (sX = sY, sY = 0), pX = sX * PIXEL_STEP, pY = sY * PIXEL_STEP, "deltaY" in event && (pY = event.deltaY), "deltaX" in event && (pX = event.deltaX), (pX || pY) && event.deltaMode && (1 === event.deltaMode ? (pX *= LINE_HEIGHT, pY *= LINE_HEIGHT) : (pX *= PAGE_HEIGHT, pY *= PAGE_HEIGHT)), pX && !sX && (sX = pX < 1 ? -1 : 1), pY && !sY && (sY = pY < 1 ? -1 : 1), {
          spinX: sX,
          spinY: sY,
          pixelX: pX,
          pixelY: pY
        }
      }
      
      function handleMousewheel(e) {
        e.originalEvent && (e = e.originalEvent);
        var delta = 0, rtlFactor = s.rtl ? -1 : 1, data = normalizeWheel(e);
        if (s.params.mousewheelForceToAxis)if (s.isHorizontal()) {
          if (!(Math.abs(data.pixelX) > Math.abs(data.pixelY)))return;
          delta = data.pixelX * rtlFactor
        } else {
          if (!(Math.abs(data.pixelY) > Math.abs(data.pixelX)))return;
          delta = data.pixelY
        } else delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
        if (0 !== delta) {
          if (s.params.mousewheelInvert && (delta = -delta), s.params.freeMode) {
            var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity,
              wasBeginning = s.isBeginning, wasEnd = s.isEnd;
            if (position >= s.minTranslate() && (position = s.minTranslate()), position <= s.maxTranslate() && (position = s.maxTranslate()), s.setWrapperTransition(0), s.setWrapperTranslate(position), s.updateProgress(), s.updateActiveIndex(), (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) && s.updateClasses(), s.params.freeModeSticky ? (clearTimeout(s.mousewheel.timeout), s.mousewheel.timeout = setTimeout(function () {
                s.slideReset()
              }, 300)) : s.params.lazyLoading && s.lazy && s.lazy.load(), s.emit("onScroll", s, e), s.params.autoplay && s.params.autoplayDisableOnInteraction && s.stopAutoplay(), 0 === position || position === s.maxTranslate())return
          } else {
            if ((new window.Date).getTime() - s.mousewheel.lastScrollTime > 60)if (delta < 0)if (s.isEnd && !s.params.loop || s.animating) {
              if (s.params.mousewheelReleaseOnEdges)return !0
            } else s.slideNext(), s.emit("onScroll", s, e); else if (s.isBeginning && !s.params.loop || s.animating) {
              if (s.params.mousewheelReleaseOnEdges)return !0
            } else s.slidePrev(), s.emit("onScroll", s, e);
            s.mousewheel.lastScrollTime = (new window.Date).getTime()
          }
          return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }
      }
      
      function setParallaxTransform(el, progress) {
        el = $(el);
        var p, pX, pY, rtlFactor = s.rtl ? -1 : 1;
        p = el.attr("data-swiper-parallax") || "0", pX = el.attr("data-swiper-parallax-x"), pY = el.attr("data-swiper-parallax-y"), pX || pY ? (pX = pX || "0", pY = pY || "0") : s.isHorizontal() ? (pX = p, pY = "0") : (pY = p, pX = "0"), pX = pX.indexOf("%") >= 0 ? parseInt(pX, 10) * progress * rtlFactor + "%" : pX * progress * rtlFactor + "px", pY = pY.indexOf("%") >= 0 ? parseInt(pY, 10) * progress + "%" : pY * progress + "px", el.transform("translate3d(" + pX + ", " + pY + ",0px)")
      }
      
      function normalizeEventName(eventName) {
        return 0 !== eventName.indexOf("on") && (eventName = eventName[0] !== eventName[0].toUpperCase() ? "on" + eventName[0].toUpperCase() + eventName.substring(1) : "on" + eventName), eventName
      }
      
      if (!(this instanceof Swiper))return new Swiper(container, params);
      var defaults = {
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        autoplay: !1,
        autoplayDisableOnInteraction: !0,
        autoplayStopOnLast: !1,
        iOSEdgeSwipeDetection: !1,
        iOSEdgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
        flip: {slideShadows: !0, limitRotation: !0},
        cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
        fade: {crossFade: !1},
        parallax: !1,
        zoom: !1,
        zoomMax: 3,
        zoomMin: 1,
        zoomToggle: !0,
        scrollbar: null,
        scrollbarHide: !0,
        scrollbarDraggable: !1,
        scrollbarSnapOnRelease: !1,
        keyboardControl: !1,
        mousewheelControl: !1,
        mousewheelReleaseOnEdges: !1,
        mousewheelInvert: !1,
        mousewheelForceToAxis: !1,
        mousewheelSensitivity: 1,
        mousewheelEventsTarged: "container",
        hashnav: !1,
        hashnavWatchState: !1,
        history: !1,
        replaceState: !1,
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        onlyExternal: !1,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        pagination: null,
        paginationElement: "span",
        paginationClickable: !1,
        paginationHide: !1,
        paginationBulletRender: null,
        paginationProgressRender: null,
        paginationFractionRender: null,
        paginationCustomRender: null,
        paginationType: "bullets",
        resistance: !0,
        resistanceRatio: .85,
        nextButton: null,
        prevButton: null,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        lazyLoading: !1,
        lazyLoadingInPrevNext: !1,
        lazyLoadingInPrevNextAmount: 1,
        lazyLoadingOnTransitionStart: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        control: void 0,
        controlInverse: !1,
        controlBy: "slide",
        normalizeSlideIndex: !0,
        allowSwipeToPrev: !0,
        allowSwipeToNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        buttonDisabledClass: "swiper-button-disabled",
        paginationCurrentClass: "swiper-pagination-current",
        paginationTotalClass: "swiper-pagination-total",
        paginationHiddenClass: "swiper-pagination-hidden",
        paginationProgressbarClass: "swiper-pagination-progressbar",
        paginationClickableClass: "swiper-pagination-clickable",
        paginationModifierClass: "swiper-pagination-",
        lazyLoadingClass: "swiper-lazy",
        lazyStatusLoadingClass: "swiper-lazy-loading",
        lazyStatusLoadedClass: "swiper-lazy-loaded",
        lazyPreloaderClass: "swiper-lazy-preloader",
        notificationClass: "swiper-notification",
        preloaderClass: "preloader",
        zoomContainerClass: "swiper-zoom-container",
        observer: !1,
        observeParents: !1,
        a11y: !1,
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        runCallbacksOnInit: !0
      }, initialVirtualTranslate = params && params.virtualTranslate;
      params = params || {};
      var originalParams = {};
      for (var param in params)if ("object" != typeof params[param] || null === params[param] || (params[param].nodeType || params[param] === window || params[param] === document || "undefined" != typeof Dom7 && params[param] instanceof Dom7 || "undefined" != typeof jQuery && params[param] instanceof jQuery)) originalParams[param] = params[param]; else {
        originalParams[param] = {};
        for (var deepParam in params[param])originalParams[param][deepParam] = params[param][deepParam]
      }
      for (var def in defaults)if ("undefined" == typeof params[def]) params[def] = defaults[def]; else if ("object" == typeof params[def])for (var deepDef in defaults[def])"undefined" == typeof params[def][deepDef] && (params[def][deepDef] = defaults[def][deepDef]);
      var s = this;
      if (s.params = params, s.originalParams = originalParams, s.classNames = [], "undefined" != typeof $ && "undefined" != typeof Dom7 && ($ = Dom7), ("undefined" != typeof $ || ($ = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (s.$ = $, s.currentBreakpoint = void 0, s.getActiveBreakpoint = function () {
          if (!s.params.breakpoints)return !1;
          var point, breakpoint = !1, points = [];
          for (point in s.params.breakpoints)s.params.breakpoints.hasOwnProperty(point) && points.push(point);
          points.sort(function (a, b) {
            return parseInt(a, 10) > parseInt(b, 10)
          });
          for (var i = 0; i < points.length; i++)point = points[i], point >= window.innerWidth && !breakpoint && (breakpoint = point);
          return breakpoint || "max"
        }, s.setBreakpoint = function () {
          var breakpoint = s.getActiveBreakpoint();
          if (breakpoint && s.currentBreakpoint !== breakpoint) {
            var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams,
              needsReLoop = s.params.loop && breakPointsParams.slidesPerView !== s.params.slidesPerView;
            for (var param in breakPointsParams)s.params[param] = breakPointsParams[param];
            s.currentBreakpoint = breakpoint, needsReLoop && s.destroyLoop && s.reLoop(!0)
          }
        }, s.params.breakpoints && s.setBreakpoint(), s.container = $(container), 0 !== s.container.length)) {
        if (s.container.length > 1) {
          var swipers = [];
          return s.container.each(function () {
            swipers.push(new Swiper(this, params))
          }), swipers
        }
        s.container[0].swiper = s, s.container.data("swiper", s), s.classNames.push(s.params.containerModifierClass + s.params.direction), s.params.freeMode && s.classNames.push(s.params.containerModifierClass + "free-mode"), s.support.flexbox || (s.classNames.push(s.params.containerModifierClass + "no-flexbox"), s.params.slidesPerColumn = 1), s.params.autoHeight && s.classNames.push(s.params.containerModifierClass + "autoheight"), (s.params.parallax || s.params.watchSlidesVisibility) && (s.params.watchSlidesProgress = !0), s.params.touchReleaseOnEdges && (s.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(s.params.effect) >= 0 && (s.support.transforms3d ? (s.params.watchSlidesProgress = !0, s.classNames.push(s.params.containerModifierClass + "3d")) : s.params.effect = "slide"), "slide" !== s.params.effect && s.classNames.push(s.params.containerModifierClass + s.params.effect), "cube" === s.params.effect && (s.params.resistanceRatio = 0, s.params.slidesPerView = 1, s.params.slidesPerColumn = 1, s.params.slidesPerGroup = 1, s.params.centeredSlides = !1, s.params.spaceBetween = 0, s.params.virtualTranslate = !0), "fade" !== s.params.effect && "flip" !== s.params.effect || (s.params.slidesPerView = 1, s.params.slidesPerColumn = 1, s.params.slidesPerGroup = 1, s.params.watchSlidesProgress = !0, s.params.spaceBetween = 0, "undefined" == typeof initialVirtualTranslate && (s.params.virtualTranslate = !0)), s.params.grabCursor && s.support.touch && (s.params.grabCursor = !1), s.wrapper = s.container.children("." + s.params.wrapperClass), s.params.pagination && (s.paginationContainer = $(s.params.pagination), s.params.uniqueNavElements && "string" == typeof s.params.pagination && s.paginationContainer.length > 1 && 1 === s.container.find(s.params.pagination).length && (s.paginationContainer = s.container.find(s.params.pagination)), "bullets" === s.params.paginationType && s.params.paginationClickable ? s.paginationContainer.addClass(s.params.paginationModifierClass + "clickable") : s.params.paginationClickable = !1, s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType)), (s.params.nextButton || s.params.prevButton) && (s.params.nextButton && (s.nextButton = $(s.params.nextButton), s.params.uniqueNavElements && "string" == typeof s.params.nextButton && s.nextButton.length > 1 && 1 === s.container.find(s.params.nextButton).length && (s.nextButton = s.container.find(s.params.nextButton))), s.params.prevButton && (s.prevButton = $(s.params.prevButton), s.params.uniqueNavElements && "string" == typeof s.params.prevButton && s.prevButton.length > 1 && 1 === s.container.find(s.params.prevButton).length && (s.prevButton = s.container.find(s.params.prevButton)))), s.isHorizontal = function () {
          return "horizontal" === s.params.direction
        }, s.rtl = s.isHorizontal() && ("rtl" === s.container[0].dir.toLowerCase() || "rtl" === s.container.css("direction")), s.rtl && s.classNames.push(s.params.containerModifierClass + "rtl"), s.rtl && (s.wrongRTL = "-webkit-box" === s.wrapper.css("display")), s.params.slidesPerColumn > 1 && s.classNames.push(s.params.containerModifierClass + "multirow"), s.device.android && s.classNames.push(s.params.containerModifierClass + "android"), s.container.addClass(s.classNames.join(" ")), s.translate = 0, s.progress = 0, s.velocity = 0, s.lockSwipeToNext = function () {
          s.params.allowSwipeToNext = !1, s.params.allowSwipeToPrev === !1 && s.params.grabCursor && s.unsetGrabCursor()
        }, s.lockSwipeToPrev = function () {
          s.params.allowSwipeToPrev = !1, s.params.allowSwipeToNext === !1 && s.params.grabCursor && s.unsetGrabCursor()
        }, s.lockSwipes = function () {
          s.params.allowSwipeToNext = s.params.allowSwipeToPrev = !1, s.params.grabCursor && s.unsetGrabCursor()
        }, s.unlockSwipeToNext = function () {
          s.params.allowSwipeToNext = !0, s.params.allowSwipeToPrev === !0 && s.params.grabCursor && s.setGrabCursor()
        }, s.unlockSwipeToPrev = function () {
          s.params.allowSwipeToPrev = !0, s.params.allowSwipeToNext === !0 && s.params.grabCursor && s.setGrabCursor()
        }, s.unlockSwipes = function () {
          s.params.allowSwipeToNext = s.params.allowSwipeToPrev = !0, s.params.grabCursor && s.setGrabCursor()
        }, s.setGrabCursor = function (moving) {
          s.container[0].style.cursor = "move", s.container[0].style.cursor = moving ? "-webkit-grabbing" : "-webkit-grab", s.container[0].style.cursor = moving ? "-moz-grabbin" : "-moz-grab", s.container[0].style.cursor = moving ? "grabbing" : "grab"
        }, s.unsetGrabCursor = function () {
          s.container[0].style.cursor = ""
        }, s.params.grabCursor && s.setGrabCursor(), s.imagesToLoad = [], s.imagesLoaded = 0, s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
          function onReady() {
            callback && callback()
          }
          
          var image;
          imgElement.complete && checkForComplete ? onReady() : src ? (image = new window.Image, image.onload = onReady, image.onerror = onReady, sizes && (image.sizes = sizes), srcset && (image.srcset = srcset), src && (image.src = src)) : onReady()
        }, s.preloadImages = function () {
          function _onReady() {
            "undefined" != typeof s && null !== s && s && (void 0 !== s.imagesLoaded && s.imagesLoaded++, s.imagesLoaded === s.imagesToLoad.length && (s.params.updateOnImagesReady && s.update(), s.emit("onImagesReady", s)))
          }
          
          s.imagesToLoad = s.container.find("img");
          for (var i = 0; i < s.imagesToLoad.length; i++)s.loadImage(s.imagesToLoad[i], s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute("src"), s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute("srcset"), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute("sizes"), !0, _onReady)
        }, s.autoplayTimeoutId = void 0, s.autoplaying = !1, s.autoplayPaused = !1, s.startAutoplay = function () {
          return "undefined" == typeof s.autoplayTimeoutId && (!!s.params.autoplay && (!s.autoplaying && (s.autoplaying = !0, s.emit("onAutoplayStart", s), void autoplay())))
        }, s.stopAutoplay = function (internal) {
          s.autoplayTimeoutId && (s.autoplayTimeoutId && clearTimeout(s.autoplayTimeoutId), s.autoplaying = !1, s.autoplayTimeoutId = void 0, s.emit("onAutoplayStop", s))
        }, s.pauseAutoplay = function (speed) {
          s.autoplayPaused || (s.autoplayTimeoutId && clearTimeout(s.autoplayTimeoutId), s.autoplayPaused = !0, 0 === speed ? (s.autoplayPaused = !1, autoplay()) : s.wrapper.transitionEnd(function () {
            s && (s.autoplayPaused = !1, s.autoplaying ? autoplay() : s.stopAutoplay())
          }))
        }, s.minTranslate = function () {
          return -s.snapGrid[0]
        }, s.maxTranslate = function () {
          return -s.snapGrid[s.snapGrid.length - 1]
        }, s.updateAutoHeight = function () {
          var i, activeSlides = [], newHeight = 0;
          if ("auto" !== s.params.slidesPerView && s.params.slidesPerView > 1)for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
            var index = s.activeIndex + i;
            if (index > s.slides.length)break;
            activeSlides.push(s.slides.eq(index)[0])
          } else activeSlides.push(s.slides.eq(s.activeIndex)[0]);
          for (i = 0; i < activeSlides.length; i++)if ("undefined" != typeof activeSlides[i]) {
            var height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight
          }
          newHeight && s.wrapper.css("height", newHeight + "px")
        }, s.updateContainerSize = function () {
          var width, height;
          width = "undefined" != typeof s.params.width ? s.params.width : s.container[0].clientWidth, height = "undefined" != typeof s.params.height ? s.params.height : s.container[0].clientHeight, 0 === width && s.isHorizontal() || 0 === height && !s.isHorizontal() || (width = width - parseInt(s.container.css("padding-left"), 10) - parseInt(s.container.css("padding-right"), 10), height = height - parseInt(s.container.css("padding-top"), 10) - parseInt(s.container.css("padding-bottom"), 10), s.width = width, s.height = height, s.size = s.isHorizontal() ? s.width : s.height)
        }, s.updateSlidesSize = function () {
          s.slides = s.wrapper.children("." + s.params.slideClass), s.snapGrid = [], s.slidesGrid = [], s.slidesSizesGrid = [];
          var i, spaceBetween = s.params.spaceBetween, slidePosition = -s.params.slidesOffsetBefore, prevSlideSize = 0,
            index = 0;
          if ("undefined" != typeof s.size) {
            "string" == typeof spaceBetween && spaceBetween.indexOf("%") >= 0 && (spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * s.size), s.virtualSize = -spaceBetween, s.rtl ? s.slides.css({
              marginLeft: "",
              marginTop: ""
            }) : s.slides.css({marginRight: "", marginBottom: ""});
            var slidesNumberEvenToRows;
            s.params.slidesPerColumn > 1 && (slidesNumberEvenToRows = Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn ? s.slides.length : Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn, "auto" !== s.params.slidesPerView && "row" === s.params.slidesPerColumnFill && (slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn)));
            var slideSize, slidesPerColumn = s.params.slidesPerColumn,
              slidesPerRow = slidesNumberEvenToRows / slidesPerColumn,
              numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
              slideSize = 0;
              var slide = s.slides.eq(i);
              if (s.params.slidesPerColumn > 1) {
                var newSlideOrderIndex, column, row;
                "column" === s.params.slidesPerColumnFill ? (column = Math.floor(i / slidesPerColumn), row = i - column * slidesPerColumn, (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) && ++row >= slidesPerColumn && (row = 0, column++), newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn, slide.css({
                  "-webkit-box-ordinal-group": newSlideOrderIndex,
                  "-moz-box-ordinal-group": newSlideOrderIndex,
                  "-ms-flex-order": newSlideOrderIndex,
                  "-webkit-order": newSlideOrderIndex,
                  order: newSlideOrderIndex
                })) : (row = Math.floor(i / slidesPerRow), column = i - row * slidesPerRow), slide.css("margin-" + (s.isHorizontal() ? "top" : "left"), 0 !== row && s.params.spaceBetween && s.params.spaceBetween + "px").attr("data-swiper-column", column).attr("data-swiper-row", row)
              }
              "none" !== slide.css("display") && ("auto" === s.params.slidesPerView ? (slideSize = s.isHorizontal() ? slide.outerWidth(!0) : slide.outerHeight(!0), s.params.roundLengths && (slideSize = round(slideSize))) : (slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView, s.params.roundLengths && (slideSize = round(slideSize)), s.isHorizontal() ? s.slides[i].style.width = slideSize + "px" : s.slides[i].style.height = slideSize + "px"), s.slides[i].swiperSlideSize = slideSize, s.slidesSizesGrid.push(slideSize), s.params.centeredSlides ? (slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween, 0 === prevSlideSize && 0 !== i && (slidePosition = slidePosition - s.size / 2 - spaceBetween), 0 === i && (slidePosition = slidePosition - s.size / 2 - spaceBetween), Math.abs(slidePosition) < .001 && (slidePosition = 0), index % s.params.slidesPerGroup === 0 && s.snapGrid.push(slidePosition), s.slidesGrid.push(slidePosition)) : (index % s.params.slidesPerGroup === 0 && s.snapGrid.push(slidePosition), s.slidesGrid.push(slidePosition), slidePosition = slidePosition + slideSize + spaceBetween), s.virtualSize += slideSize + spaceBetween, prevSlideSize = slideSize, index++)
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
            if (s.rtl && s.wrongRTL && ("slide" === s.params.effect || "coverflow" === s.params.effect) && s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + "px"}), s.support.flexbox && !s.params.setWrapperSize || (s.isHorizontal() ? s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + "px"}) : s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + "px"})), s.params.slidesPerColumn > 1 && (s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows, s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween, s.isHorizontal() ? s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + "px"}) : s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + "px"}), s.params.centeredSlides)) {
              for (newSlidesGrid = [], i = 0; i < s.snapGrid.length; i++)s.snapGrid[i] < s.virtualSize + s.snapGrid[0] && newSlidesGrid.push(s.snapGrid[i]);
              s.snapGrid = newSlidesGrid
            }
            if (!s.params.centeredSlides) {
              for (newSlidesGrid = [], i = 0; i < s.snapGrid.length; i++)s.snapGrid[i] <= s.virtualSize - s.size && newSlidesGrid.push(s.snapGrid[i]);
              s.snapGrid = newSlidesGrid, Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1 && s.snapGrid.push(s.virtualSize - s.size)
            }
            0 === s.snapGrid.length && (s.snapGrid = [0]), 0 !== s.params.spaceBetween && (s.isHorizontal() ? s.rtl ? s.slides.css({marginLeft: spaceBetween + "px"}) : s.slides.css({marginRight: spaceBetween + "px"}) : s.slides.css({marginBottom: spaceBetween + "px"})), s.params.watchSlidesProgress && s.updateSlidesOffset()
          }
        }, s.updateSlidesOffset = function () {
          for (var i = 0; i < s.slides.length; i++)s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop
        }, s.currentSlidesPerView = function () {
          var i, j, spv = 1;
          if (s.params.centeredSlides) {
            var breakLoop, size = s.slides[s.activeIndex].swiperSlideSize;
            for (i = s.activeIndex + 1; i < s.slides.length; i++)s.slides[i] && !breakLoop && (size += s.slides[i].swiperSlideSize, spv++, size > s.size && (breakLoop = !0));
            for (j = s.activeIndex - 1; j >= 0; j--)s.slides[j] && !breakLoop && (size += s.slides[j].swiperSlideSize, spv++, size > s.size && (breakLoop = !0))
          } else for (i = s.activeIndex + 1; i < s.slides.length; i++)s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size && spv++;
          return spv
        }, s.updateSlidesProgress = function (translate) {
          if ("undefined" == typeof translate && (translate = s.translate || 0), 0 !== s.slides.length) {
            "undefined" == typeof s.slides[0].swiperSlideOffset && s.updateSlidesOffset();
            var offsetCenter = -translate;
            s.rtl && (offsetCenter = translate), s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
              var slide = s.slides[i],
                slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
              if (s.params.watchSlidesVisibility) {
                var slideBefore = -(offsetCenter - slide.swiperSlideOffset),
                  slideAfter = slideBefore + s.slidesSizesGrid[i],
                  isVisible = slideBefore >= 0 && slideBefore < s.size || slideAfter > 0 && slideAfter <= s.size || slideBefore <= 0 && slideAfter >= s.size;
                isVisible && s.slides.eq(i).addClass(s.params.slideVisibleClass)
              }
              slide.progress = s.rtl ? -slideProgress : slideProgress
            }
          }
        }, s.updateProgress = function (translate) {
          "undefined" == typeof translate && (translate = s.translate || 0);
          var translatesDiff = s.maxTranslate() - s.minTranslate(), wasBeginning = s.isBeginning, wasEnd = s.isEnd;
          0 === translatesDiff ? (s.progress = 0, s.isBeginning = s.isEnd = !0) : (s.progress = (translate - s.minTranslate()) / translatesDiff, s.isBeginning = s.progress <= 0, s.isEnd = s.progress >= 1), s.isBeginning && !wasBeginning && s.emit("onReachBeginning", s), s.isEnd && !wasEnd && s.emit("onReachEnd", s), s.params.watchSlidesProgress && s.updateSlidesProgress(translate), s.emit("onProgress", s, s.progress)
        }, s.updateActiveIndex = function () {
          var newActiveIndex, i, snapIndex, translate = s.rtl ? s.translate : -s.translate;
          for (i = 0; i < s.slidesGrid.length; i++)"undefined" != typeof s.slidesGrid[i + 1] ? translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2 ? newActiveIndex = i : translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] && (newActiveIndex = i + 1) : translate >= s.slidesGrid[i] && (newActiveIndex = i);
          s.params.normalizeSlideIndex && (newActiveIndex < 0 || "undefined" == typeof newActiveIndex) && (newActiveIndex = 0), snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup), snapIndex >= s.snapGrid.length && (snapIndex = s.snapGrid.length - 1), newActiveIndex !== s.activeIndex && (s.snapIndex = snapIndex, s.previousIndex = s.activeIndex, s.activeIndex = newActiveIndex, s.updateClasses(), s.updateRealIndex())
        }, s.updateRealIndex = function () {
          s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr("data-swiper-slide-index") || s.activeIndex, 10)
        }, s.updateClasses = function () {
          s.slides.removeClass(s.params.slideActiveClass + " " + s.params.slideNextClass + " " + s.params.slidePrevClass + " " + s.params.slideDuplicateActiveClass + " " + s.params.slideDuplicateNextClass + " " + s.params.slideDuplicatePrevClass);
          var activeSlide = s.slides.eq(s.activeIndex);
          activeSlide.addClass(s.params.slideActiveClass), params.loop && (activeSlide.hasClass(s.params.slideDuplicateClass) ? s.wrapper.children("." + s.params.slideClass + ":not(." + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass) : s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass));
          var nextSlide = activeSlide.next("." + s.params.slideClass).addClass(s.params.slideNextClass);
          s.params.loop && 0 === nextSlide.length && (nextSlide = s.slides.eq(0), nextSlide.addClass(s.params.slideNextClass));
          var prevSlide = activeSlide.prev("." + s.params.slideClass).addClass(s.params.slidePrevClass);
          if (s.params.loop && 0 === prevSlide.length && (prevSlide = s.slides.eq(-1), prevSlide.addClass(s.params.slidePrevClass)), params.loop && (nextSlide.hasClass(s.params.slideDuplicateClass) ? s.wrapper.children("." + s.params.slideClass + ":not(." + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr("data-swiper-slide-index") + '"]').addClass(s.params.slideDuplicateNextClass) : s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr("data-swiper-slide-index") + '"]').addClass(s.params.slideDuplicateNextClass), prevSlide.hasClass(s.params.slideDuplicateClass) ? s.wrapper.children("." + s.params.slideClass + ":not(." + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr("data-swiper-slide-index") + '"]').addClass(s.params.slideDuplicatePrevClass) : s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr("data-swiper-slide-index") + '"]').addClass(s.params.slideDuplicatePrevClass)), s.paginationContainer && s.paginationContainer.length > 0) {
            var current,
              total = s.params.loop ? Math.ceil((s.slides.length - 2 * s.loopedSlides) / s.params.slidesPerGroup) : s.snapGrid.length;
            if (s.params.loop ? (current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup), current > s.slides.length - 1 - 2 * s.loopedSlides && (current -= s.slides.length - 2 * s.loopedSlides), current > total - 1 && (current -= total), current < 0 && "bullets" !== s.params.paginationType && (current = total + current)) : current = "undefined" != typeof s.snapIndex ? s.snapIndex : s.activeIndex || 0, "bullets" === s.params.paginationType && s.bullets && s.bullets.length > 0 && (s.bullets.removeClass(s.params.bulletActiveClass), s.paginationContainer.length > 1 ? s.bullets.each(function () {
                $(this).index() === current && $(this).addClass(s.params.bulletActiveClass)
              }) : s.bullets.eq(current).addClass(s.params.bulletActiveClass)), "fraction" === s.params.paginationType && (s.paginationContainer.find("." + s.params.paginationCurrentClass).text(current + 1), s.paginationContainer.find("." + s.params.paginationTotalClass).text(total)), "progress" === s.params.paginationType) {
              var scale = (current + 1) / total, scaleX = scale, scaleY = 1;
              s.isHorizontal() || (scaleY = scale, scaleX = 1), s.paginationContainer.find("." + s.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")").transition(s.params.speed)
            }
            "custom" === s.params.paginationType && s.params.paginationCustomRender && (s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total)), s.emit("onPaginationRendered", s, s.paginationContainer[0]))
          }
          s.params.loop || (s.params.prevButton && s.prevButton && s.prevButton.length > 0 && (s.isBeginning ? (s.prevButton.addClass(s.params.buttonDisabledClass), s.params.a11y && s.a11y && s.a11y.disable(s.prevButton)) : (s.prevButton.removeClass(s.params.buttonDisabledClass), s.params.a11y && s.a11y && s.a11y.enable(s.prevButton))), s.params.nextButton && s.nextButton && s.nextButton.length > 0 && (s.isEnd ? (s.nextButton.addClass(s.params.buttonDisabledClass), s.params.a11y && s.a11y && s.a11y.disable(s.nextButton)) : (s.nextButton.removeClass(s.params.buttonDisabledClass), s.params.a11y && s.a11y && s.a11y.enable(s.nextButton))))
        }, s.updatePagination = function () {
          if (s.params.pagination && s.paginationContainer && s.paginationContainer.length > 0) {
            var paginationHTML = "";
            if ("bullets" === s.params.paginationType) {
              for (var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - 2 * s.loopedSlides) / s.params.slidesPerGroup) : s.snapGrid.length, i = 0; i < numberOfBullets; i++)paginationHTML += s.params.paginationBulletRender ? s.params.paginationBulletRender(s, i, s.params.bulletClass) : "<" + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + ">";
              s.paginationContainer.html(paginationHTML), s.bullets = s.paginationContainer.find("." + s.params.bulletClass), s.params.paginationClickable && s.params.a11y && s.a11y && s.a11y.initPagination()
            }
            "fraction" === s.params.paginationType && (paginationHTML = s.params.paginationFractionRender ? s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass) : '<span class="' + s.params.paginationCurrentClass + '"></span> / <span class="' + s.params.paginationTotalClass + '"></span>', s.paginationContainer.html(paginationHTML)), "progress" === s.params.paginationType && (paginationHTML = s.params.paginationProgressRender ? s.params.paginationProgressRender(s, s.params.paginationProgressbarClass) : '<span class="' + s.params.paginationProgressbarClass + '"></span>', s.paginationContainer.html(paginationHTML)), "custom" !== s.params.paginationType && s.emit("onPaginationRendered", s, s.paginationContainer[0])
          }
        }, s.update = function (updateTranslate) {
          function forceSetTranslate() {
            s.rtl ? -s.translate : s.translate;
            newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate()), s.setWrapperTranslate(newTranslate), s.updateActiveIndex(), s.updateClasses()
          }
          
          if (s) {
            s.updateContainerSize(), s.updateSlidesSize(), s.updateProgress(), s.updatePagination(), s.updateClasses(), s.params.scrollbar && s.scrollbar && s.scrollbar.set();
            var newTranslate;
            if (updateTranslate) {
              var translated;
              s.controller && s.controller.spline && (s.controller.spline = void 0), s.params.freeMode ? (forceSetTranslate(), s.params.autoHeight && s.updateAutoHeight()) : (translated = ("auto" === s.params.slidesPerView || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides ? s.slideTo(s.slides.length - 1, 0, !1, !0) : s.slideTo(s.activeIndex, 0, !1, !0), translated || forceSetTranslate())
            } else s.params.autoHeight && s.updateAutoHeight()
          }
        }, s.onResize = function (forceUpdatePagination) {
          s.params.onBeforeResize && s.params.onBeforeResize(s), s.params.breakpoints && s.setBreakpoint();
          var allowSwipeToPrev = s.params.allowSwipeToPrev, allowSwipeToNext = s.params.allowSwipeToNext;
          s.params.allowSwipeToPrev = s.params.allowSwipeToNext = !0, s.updateContainerSize(), s.updateSlidesSize(), ("auto" === s.params.slidesPerView || s.params.freeMode || forceUpdatePagination) && s.updatePagination(), s.params.scrollbar && s.scrollbar && s.scrollbar.set(), s.controller && s.controller.spline && (s.controller.spline = void 0);
          var slideChangedBySlideTo = !1;
          if (s.params.freeMode) {
            var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
            s.setWrapperTranslate(newTranslate), s.updateActiveIndex(), s.updateClasses(), s.params.autoHeight && s.updateAutoHeight()
          } else s.updateClasses(), slideChangedBySlideTo = ("auto" === s.params.slidesPerView || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides ? s.slideTo(s.slides.length - 1, 0, !1, !0) : s.slideTo(s.activeIndex, 0, !1, !0);
          s.params.lazyLoading && !slideChangedBySlideTo && s.lazy && s.lazy.load(), s.params.allowSwipeToPrev = allowSwipeToPrev, s.params.allowSwipeToNext = allowSwipeToNext, s.params.onAfterResize && s.params.onAfterResize(s)
        }, s.touchEventsDesktop = {
          start: "mousedown",
          move: "mousemove",
          end: "mouseup"
        }, window.navigator.pointerEnabled ? s.touchEventsDesktop = {
          start: "pointerdown",
          move: "pointermove",
          end: "pointerup"
        } : window.navigator.msPointerEnabled && (s.touchEventsDesktop = {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
          }), s.touchEvents = {
          start: s.support.touch || !s.params.simulateTouch ? "touchstart" : s.touchEventsDesktop.start,
          move: s.support.touch || !s.params.simulateTouch ? "touchmove" : s.touchEventsDesktop.move,
          end: s.support.touch || !s.params.simulateTouch ? "touchend" : s.touchEventsDesktop.end
        }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === s.params.touchEventsTarget ? s.container : s.wrapper).addClass("swiper-wp8-" + s.params.direction), s.initEvents = function (detach) {
          var actionDom = detach ? "off" : "on", action = detach ? "removeEventListener" : "addEventListener",
            touchEventsTarget = "container" === s.params.touchEventsTarget ? s.container[0] : s.wrapper[0],
            target = s.support.touch ? touchEventsTarget : document, moveCapture = !!s.params.nested;
          if (s.browser.ie) touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, !1), target[action](s.touchEvents.move, s.onTouchMove, moveCapture), target[action](s.touchEvents.end, s.onTouchEnd, !1); else {
            if (s.support.touch) {
              var passiveListener = !("touchstart" !== s.touchEvents.start || !s.support.passiveListener || !s.params.passiveListeners) && {
                  passive: !0,
                  capture: !1
                };
              touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener), touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture), touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener)
            }
            (params.simulateTouch && !s.device.ios && !s.device.android || params.simulateTouch && !s.support.touch && s.device.ios) && (touchEventsTarget[action]("mousedown", s.onTouchStart, !1), document[action]("mousemove", s.onTouchMove, moveCapture), document[action]("mouseup", s.onTouchEnd, !1))
          }
          window[action]("resize", s.onResize), s.params.nextButton && s.nextButton && s.nextButton.length > 0 && (s.nextButton[actionDom]("click", s.onClickNext), s.params.a11y && s.a11y && s.nextButton[actionDom]("keydown", s.a11y.onEnterKey)), s.params.prevButton && s.prevButton && s.prevButton.length > 0 && (s.prevButton[actionDom]("click", s.onClickPrev), s.params.a11y && s.a11y && s.prevButton[actionDom]("keydown", s.a11y.onEnterKey)), s.params.pagination && s.params.paginationClickable && (s.paginationContainer[actionDom]("click", "." + s.params.bulletClass, s.onClickIndex), s.params.a11y && s.a11y && s.paginationContainer[actionDom]("keydown", "." + s.params.bulletClass, s.a11y.onEnterKey)), (s.params.preventClicks || s.params.preventClicksPropagation) && touchEventsTarget[action]("click", s.preventClicks, !0)
        }, s.attachEvents = function () {
          s.initEvents()
        }, s.detachEvents = function () {
          s.initEvents(!0)
        }, s.allowClick = !0, s.preventClicks = function (e) {
          s.allowClick || (s.params.preventClicks && e.preventDefault(), s.params.preventClicksPropagation && s.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
        }, s.onClickNext = function (e) {
          e.preventDefault(), s.isEnd && !s.params.loop || s.slideNext()
        }, s.onClickPrev = function (e) {
          e.preventDefault(), s.isBeginning && !s.params.loop || s.slidePrev()
        }, s.onClickIndex = function (e) {
          e.preventDefault();
          var index = $(this).index() * s.params.slidesPerGroup;
          s.params.loop && (index += s.loopedSlides), s.slideTo(index)
        }, s.updateClickedSlide = function (e) {
          var slide = findElementInEvent(e, "." + s.params.slideClass), slideFound = !1;
          if (slide)for (var i = 0; i < s.slides.length; i++)s.slides[i] === slide && (slideFound = !0);
          if (!slide || !slideFound)return s.clickedSlide = void 0, void(s.clickedIndex = void 0);
          if (s.clickedSlide = slide, s.clickedIndex = $(slide).index(), s.params.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex) {
            var realIndex, slideToIndex = s.clickedIndex,
              slidesPerView = "auto" === s.params.slidesPerView ? s.currentSlidesPerView() : s.params.slidesPerView;
            if (s.params.loop) {
              if (s.animating)return;
              realIndex = parseInt($(s.clickedSlide).attr("data-swiper-slide-index"), 10), s.params.centeredSlides ? slideToIndex < s.loopedSlides - slidesPerView / 2 || slideToIndex > s.slides.length - s.loopedSlides + slidesPerView / 2 ? (s.fixLoop(), slideToIndex = s.wrapper.children("." + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                s.slideTo(slideToIndex)
              }, 0)) : s.slideTo(slideToIndex) : slideToIndex > s.slides.length - slidesPerView ? (s.fixLoop(), slideToIndex = s.wrapper.children("." + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                s.slideTo(slideToIndex)
              }, 0)) : s.slideTo(slideToIndex)
            } else s.slideTo(slideToIndex)
          }
        };
        var isTouched, isMoved, allowTouchCallbacks, touchStartTime, isScrolling, currentTranslate, startTranslate,
          allowThresholdMove, clickTimeout, allowMomentumBounce,
          formElements = "input, select, textarea, button, video", lastClickTime = Date.now(), velocities = [];
        s.animating = !1, s.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
          if (e.originalEvent && (e = e.originalEvent), isTouchEvent = "touchstart" === e.type, isTouchEvent || !("which" in e) || 3 !== e.which) {
            if (s.params.noSwiping && findElementInEvent(e, "." + s.params.noSwipingClass))return void(s.allowClick = !0);
            if (!s.params.swipeHandler || findElementInEvent(e, s.params.swipeHandler)) {
              var startX = s.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                startY = s.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
              if (!(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold)) {
                if (isTouched = !0, isMoved = !1, allowTouchCallbacks = !0, isScrolling = void 0, startMoving = void 0, s.touches.startX = startX, s.touches.startY = startY, touchStartTime = Date.now(), s.allowClick = !0, s.updateContainerSize(), s.swipeDirection = void 0, s.params.threshold > 0 && (allowThresholdMove = !1), "touchstart" !== e.type) {
                  var preventDefault = !0;
                  $(e.target).is(formElements) && (preventDefault = !1), document.activeElement && $(document.activeElement).is(formElements) && document.activeElement.blur(), preventDefault && e.preventDefault()
                }
                s.emit("onTouchStart", s, e)
              }
            }
          }
        }, s.onTouchMove = function (e) {
          if (e.originalEvent && (e = e.originalEvent), !isTouchEvent || "mousemove" !== e.type) {
            if (e.preventedByNestedSwiper)return s.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(s.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
            if (s.params.onlyExternal)return s.allowClick = !1, void(isTouched && (s.touches.startX = s.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touches.startY = s.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, touchStartTime = Date.now()));
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop)if (s.isHorizontal()) {
              if (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate() || s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate())return
            } else if (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate() || s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate())return;
            if (isTouchEvent && document.activeElement && e.target === document.activeElement && $(e.target).is(formElements))return isMoved = !0, void(s.allowClick = !1);
            if (allowTouchCallbacks && s.emit("onTouchMove", s, e), !(e.targetTouches && e.targetTouches.length > 1)) {
              if (s.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof isScrolling) {
                var touchAngle;
                s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX ? isScrolling = !1 : (touchAngle = 180 * Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) / Math.PI, isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : 90 - touchAngle > s.params.touchAngle)
              }
              if (isScrolling && s.emit("onTouchMoveOpposite", s, e), "undefined" == typeof startMoving && (s.touches.currentX === s.touches.startX && s.touches.currentY === s.touches.startY || (startMoving = !0)), isTouched) {
                if (isScrolling)return void(isTouched = !1);
                if (startMoving) {
                  s.allowClick = !1, s.emit("onSliderMove", s, e), e.preventDefault(), s.params.touchMoveStopPropagation && !s.params.nested && e.stopPropagation(), isMoved || (params.loop && s.fixLoop(), startTranslate = s.getWrapperTranslate(), s.setWrapperTransition(0), s.animating && s.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), s.params.autoplay && s.autoplaying && (s.params.autoplayDisableOnInteraction ? s.stopAutoplay() : s.pauseAutoplay()), allowMomentumBounce = !1, !s.params.grabCursor || s.params.allowSwipeToNext !== !0 && s.params.allowSwipeToPrev !== !0 || s.setGrabCursor(!0)), isMoved = !0;
                  var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                  diff *= s.params.touchRatio, s.rtl && (diff = -diff), s.swipeDirection = diff > 0 ? "prev" : "next", currentTranslate = diff + startTranslate;
                  var disableParentSwiper = !0;
                  if (diff > 0 && currentTranslate > s.minTranslate() ? (disableParentSwiper = !1, s.params.resistance && (currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio))) : diff < 0 && currentTranslate < s.maxTranslate() && (disableParentSwiper = !1, s.params.resistance && (currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio))), disableParentSwiper && (e.preventedByNestedSwiper = !0), !s.params.allowSwipeToNext && "next" === s.swipeDirection && currentTranslate < startTranslate && (currentTranslate = startTranslate), !s.params.allowSwipeToPrev && "prev" === s.swipeDirection && currentTranslate > startTranslate && (currentTranslate = startTranslate), s.params.threshold > 0) {
                    if (!(Math.abs(diff) > s.params.threshold || allowThresholdMove))return void(currentTranslate = startTranslate);
                    if (!allowThresholdMove)return allowThresholdMove = !0, s.touches.startX = s.touches.currentX, s.touches.startY = s.touches.currentY, currentTranslate = startTranslate, void(s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY)
                  }
                  s.params.followFinger && ((s.params.freeMode || s.params.watchSlidesProgress) && s.updateActiveIndex(), s.params.freeMode && (0 === velocities.length && velocities.push({
                    position: s.touches[s.isHorizontal() ? "startX" : "startY"],
                    time: touchStartTime
                  }), velocities.push({
                    position: s.touches[s.isHorizontal() ? "currentX" : "currentY"],
                    time: (new window.Date).getTime()
                  })), s.updateProgress(currentTranslate), s.setWrapperTranslate(currentTranslate))
                }
              }
            }
          }
        }, s.onTouchEnd = function (e) {
          if (e.originalEvent && (e = e.originalEvent), allowTouchCallbacks && s.emit("onTouchEnd", s, e), allowTouchCallbacks = !1, isTouched) {
            s.params.grabCursor && isMoved && isTouched && (s.params.allowSwipeToNext === !0 || s.params.allowSwipeToPrev === !0) && s.setGrabCursor(!1);
            var touchEndTime = Date.now(), timeDiff = touchEndTime - touchStartTime;
            if (s.allowClick && (s.updateClickedSlide(e), s.emit("onTap", s, e), timeDiff < 300 && touchEndTime - lastClickTime > 300 && (clickTimeout && clearTimeout(clickTimeout), clickTimeout = setTimeout(function () {
                s && (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass) && s.paginationContainer.toggleClass(s.params.paginationHiddenClass), s.emit("onClick", s, e))
              }, 300)), timeDiff < 300 && touchEndTime - lastClickTime < 300 && (clickTimeout && clearTimeout(clickTimeout), s.emit("onDoubleTap", s, e))), lastClickTime = Date.now(), setTimeout(function () {
                s && (s.allowClick = !0)
              }, 0), !isTouched || !isMoved || !s.swipeDirection || 0 === s.touches.diff || currentTranslate === startTranslate)return void(isTouched = isMoved = !1);
            isTouched = isMoved = !1;
            var currentPos;
            if (currentPos = s.params.followFinger ? s.rtl ? s.translate : -s.translate : -currentTranslate, s.params.freeMode) {
              if (currentPos < -s.minTranslate())return void s.slideTo(s.activeIndex);
              if (currentPos > -s.maxTranslate())return void(s.slides.length < s.snapGrid.length ? s.slideTo(s.snapGrid.length - 1) : s.slideTo(s.slides.length - 1));
              if (s.params.freeModeMomentum) {
                if (velocities.length > 1) {
                  var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop(),
                    distance = lastMoveEvent.position - velocityEvent.position,
                    time = lastMoveEvent.time - velocityEvent.time;
                  s.velocity = distance / time, s.velocity = s.velocity / 2, Math.abs(s.velocity) < s.params.freeModeMinimumVelocity && (s.velocity = 0), (time > 150 || (new window.Date).getTime() - lastMoveEvent.time > 300) && (s.velocity = 0)
                } else s.velocity = 0;
                s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio, velocities.length = 0;
                var momentumDuration = 1e3 * s.params.freeModeMomentumRatio,
                  momentumDistance = s.velocity * momentumDuration, newPosition = s.translate + momentumDistance;
                s.rtl && (newPosition = -newPosition);
                var afterBouncePosition, doBounce = !1,
                  bounceAmount = 20 * Math.abs(s.velocity) * s.params.freeModeMomentumBounceRatio;
                if (newPosition < s.maxTranslate()) s.params.freeModeMomentumBounce ? (newPosition + s.maxTranslate() < -bounceAmount && (newPosition = s.maxTranslate() - bounceAmount), afterBouncePosition = s.maxTranslate(), doBounce = !0, allowMomentumBounce = !0) : newPosition = s.maxTranslate(); else if (newPosition > s.minTranslate()) s.params.freeModeMomentumBounce ? (newPosition - s.minTranslate() > bounceAmount && (newPosition = s.minTranslate() + bounceAmount), afterBouncePosition = s.minTranslate(), doBounce = !0, allowMomentumBounce = !0) : newPosition = s.minTranslate(); else if (s.params.freeModeSticky) {
                  var nextSlide, j = 0;
                  for (j = 0; j < s.snapGrid.length; j += 1)if (s.snapGrid[j] > -newPosition) {
                    nextSlide = j;
                    break
                  }
                  newPosition = Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || "next" === s.swipeDirection ? s.snapGrid[nextSlide] : s.snapGrid[nextSlide - 1], s.rtl || (newPosition = -newPosition)
                }
                if (0 !== s.velocity) momentumDuration = s.rtl ? Math.abs((-newPosition - s.translate) / s.velocity) : Math.abs((newPosition - s.translate) / s.velocity); else if (s.params.freeModeSticky)return void s.slideReset();
                s.params.freeModeMomentumBounce && doBounce ? (s.updateProgress(afterBouncePosition), s.setWrapperTransition(momentumDuration), s.setWrapperTranslate(newPosition), s.onTransitionStart(), s.animating = !0, s.wrapper.transitionEnd(function () {
                  s && allowMomentumBounce && (s.emit("onMomentumBounce", s), s.setWrapperTransition(s.params.speed), s.setWrapperTranslate(afterBouncePosition), s.wrapper.transitionEnd(function () {
                    s && s.onTransitionEnd()
                  }))
                })) : s.velocity ? (s.updateProgress(newPosition), s.setWrapperTransition(momentumDuration), s.setWrapperTranslate(newPosition), s.onTransitionStart(), s.animating || (s.animating = !0, s.wrapper.transitionEnd(function () {
                  s && s.onTransitionEnd()
                }))) : s.updateProgress(newPosition), s.updateActiveIndex()
              }
              return void((!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) && (s.updateProgress(), s.updateActiveIndex()))
            }
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup)"undefined" != typeof s.slidesGrid[i + s.params.slidesPerGroup] ? currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup] && (stopIndex = i, groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i]) : currentPos >= s.slidesGrid[i] && (stopIndex = i, groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2]);
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
            if (timeDiff > s.params.longSwipesMs) {
              if (!s.params.longSwipes)return void s.slideTo(s.activeIndex);
              "next" === s.swipeDirection && (ratio >= s.params.longSwipesRatio ? s.slideTo(stopIndex + s.params.slidesPerGroup) : s.slideTo(stopIndex)), "prev" === s.swipeDirection && (ratio > 1 - s.params.longSwipesRatio ? s.slideTo(stopIndex + s.params.slidesPerGroup) : s.slideTo(stopIndex))
            } else {
              if (!s.params.shortSwipes)return void s.slideTo(s.activeIndex);
              "next" === s.swipeDirection && s.slideTo(stopIndex + s.params.slidesPerGroup), "prev" === s.swipeDirection && s.slideTo(stopIndex)
            }
          }
        }, s._slideTo = function (slideIndex, speed) {
          return s.slideTo(slideIndex, speed, !0, !0)
        }, s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
          "undefined" == typeof runCallbacks && (runCallbacks = !0), "undefined" == typeof slideIndex && (slideIndex = 0), slideIndex < 0 && (slideIndex = 0), s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup), s.snapIndex >= s.snapGrid.length && (s.snapIndex = s.snapGrid.length - 1);
          var translate = -s.snapGrid[s.snapIndex];
          if (s.params.autoplay && s.autoplaying && (internal || !s.params.autoplayDisableOnInteraction ? s.pauseAutoplay(speed) : s.stopAutoplay()), s.updateProgress(translate), s.params.normalizeSlideIndex)for (var i = 0; i < s.slidesGrid.length; i++)-Math.floor(100 * translate) >= Math.floor(100 * s.slidesGrid[i]) && (slideIndex = i);
          return !(!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) && (!(!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate() && (s.activeIndex || 0) !== slideIndex) && ("undefined" == typeof speed && (speed = s.params.speed), s.previousIndex = s.activeIndex || 0, s.activeIndex = slideIndex, s.updateRealIndex(), s.rtl && -translate === s.translate || !s.rtl && translate === s.translate ? (s.params.autoHeight && s.updateAutoHeight(), s.updateClasses(), "slide" !== s.params.effect && s.setWrapperTranslate(translate), !1) : (s.updateClasses(), s.onTransitionStart(runCallbacks), 0 === speed || s.browser.lteIE9 ? (s.setWrapperTranslate(translate), s.setWrapperTransition(0), s.onTransitionEnd(runCallbacks)) : (s.setWrapperTranslate(translate), s.setWrapperTransition(speed), s.animating || (s.animating = !0, s.wrapper.transitionEnd(function () {
              s && s.onTransitionEnd(runCallbacks)
            }))), !0)))
        }, s.onTransitionStart = function (runCallbacks) {
          "undefined" == typeof runCallbacks && (runCallbacks = !0), s.params.autoHeight && s.updateAutoHeight(), s.lazy && s.lazy.onTransitionStart(), runCallbacks && (s.emit("onTransitionStart", s), s.activeIndex !== s.previousIndex && (s.emit("onSlideChangeStart", s), s.activeIndex > s.previousIndex ? s.emit("onSlideNextStart", s) : s.emit("onSlidePrevStart", s)))
        }, s.onTransitionEnd = function (runCallbacks) {
          s.animating = !1, s.setWrapperTransition(0), "undefined" == typeof runCallbacks && (runCallbacks = !0), s.lazy && s.lazy.onTransitionEnd(), runCallbacks && (s.emit("onTransitionEnd", s), s.activeIndex !== s.previousIndex && (s.emit("onSlideChangeEnd", s), s.activeIndex > s.previousIndex ? s.emit("onSlideNextEnd", s) : s.emit("onSlidePrevEnd", s))),
          s.params.history && s.history && s.history.setHistory(s.params.history, s.activeIndex), s.params.hashnav && s.hashnav && s.hashnav.setHash()
        }, s.slideNext = function (runCallbacks, speed, internal) {
          if (s.params.loop) {
            if (s.animating)return !1;
            s.fixLoop();
            s.container[0].clientLeft;
            return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal)
          }
          return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal)
        }, s._slideNext = function (speed) {
          return s.slideNext(!0, speed, !0)
        }, s.slidePrev = function (runCallbacks, speed, internal) {
          if (s.params.loop) {
            if (s.animating)return !1;
            s.fixLoop();
            s.container[0].clientLeft;
            return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal)
          }
          return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal)
        }, s._slidePrev = function (speed) {
          return s.slidePrev(!0, speed, !0)
        }, s.slideReset = function (runCallbacks, speed, internal) {
          return s.slideTo(s.activeIndex, speed, runCallbacks)
        }, s.disableTouchControl = function () {
          return s.params.onlyExternal = !0, !0
        }, s.enableTouchControl = function () {
          return s.params.onlyExternal = !1, !0
        }, s.setWrapperTransition = function (duration, byController) {
          s.wrapper.transition(duration), "slide" !== s.params.effect && s.effects[s.params.effect] && s.effects[s.params.effect].setTransition(duration), s.params.parallax && s.parallax && s.parallax.setTransition(duration), s.params.scrollbar && s.scrollbar && s.scrollbar.setTransition(duration), s.params.control && s.controller && s.controller.setTransition(duration, byController), s.emit("onSetTransition", s, duration)
        }, s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
          var x = 0, y = 0, z = 0;
          s.isHorizontal() ? x = s.rtl ? -translate : translate : y = translate, s.params.roundLengths && (x = round(x), y = round(y)), s.params.virtualTranslate || (s.support.transforms3d ? s.wrapper.transform("translate3d(" + x + "px, " + y + "px, " + z + "px)") : s.wrapper.transform("translate(" + x + "px, " + y + "px)")), s.translate = s.isHorizontal() ? x : y;
          var progress, translatesDiff = s.maxTranslate() - s.minTranslate();
          progress = 0 === translatesDiff ? 0 : (translate - s.minTranslate()) / translatesDiff, progress !== s.progress && s.updateProgress(translate), updateActiveIndex && s.updateActiveIndex(), "slide" !== s.params.effect && s.effects[s.params.effect] && s.effects[s.params.effect].setTranslate(s.translate), s.params.parallax && s.parallax && s.parallax.setTranslate(s.translate), s.params.scrollbar && s.scrollbar && s.scrollbar.setTranslate(s.translate), s.params.control && s.controller && s.controller.setTranslate(s.translate, byController), s.emit("onSetTranslate", s, s.translate)
        }, s.getTranslate = function (el, axis) {
          var matrix, curTransform, curStyle, transformMatrix;
          return "undefined" == typeof axis && (axis = "x"), s.params.virtualTranslate ? s.rtl ? -s.translate : s.translate : (curStyle = window.getComputedStyle(el, null), window.WebKitCSSMatrix ? (curTransform = curStyle.transform || curStyle.webkitTransform, curTransform.split(",").length > 6 && (curTransform = curTransform.split(", ").map(function (a) {
            return a.replace(",", ".")
          }).join(", ")), transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform)) : (transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), matrix = transformMatrix.toString().split(",")), "x" === axis && (curTransform = window.WebKitCSSMatrix ? transformMatrix.m41 : 16 === matrix.length ? parseFloat(matrix[12]) : parseFloat(matrix[4])), "y" === axis && (curTransform = window.WebKitCSSMatrix ? transformMatrix.m42 : 16 === matrix.length ? parseFloat(matrix[13]) : parseFloat(matrix[5])), s.rtl && curTransform && (curTransform = -curTransform), curTransform || 0)
        }, s.getWrapperTranslate = function (axis) {
          return "undefined" == typeof axis && (axis = s.isHorizontal() ? "x" : "y"), s.getTranslate(s.wrapper[0], axis)
        }, s.observers = [], s.initObservers = function () {
          if (s.params.observeParents)for (var containerParents = s.container.parents(), i = 0; i < containerParents.length; i++)initObserver(containerParents[i]);
          initObserver(s.container[0], {childList: !1}), initObserver(s.wrapper[0], {attributes: !1})
        }, s.disconnectObservers = function () {
          for (var i = 0; i < s.observers.length; i++)s.observers[i].disconnect();
          s.observers = []
        }, s.createLoop = function () {
          s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass).remove();
          var slides = s.wrapper.children("." + s.params.slideClass);
          "auto" !== s.params.slidesPerView || s.params.loopedSlides || (s.params.loopedSlides = slides.length), s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10), s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides, s.loopedSlides > slides.length && (s.loopedSlides = slides.length);
          var i, prependSlides = [], appendSlides = [];
          for (slides.each(function (index, el) {
            var slide = $(this);
            index < s.loopedSlides && appendSlides.push(el), index < slides.length && index >= slides.length - s.loopedSlides && prependSlides.push(el), slide.attr("data-swiper-slide-index", index)
          }), i = 0; i < appendSlides.length; i++)s.wrapper.append($(appendSlides[i].cloneNode(!0)).addClass(s.params.slideDuplicateClass));
          for (i = prependSlides.length - 1; i >= 0; i--)s.wrapper.prepend($(prependSlides[i].cloneNode(!0)).addClass(s.params.slideDuplicateClass))
        }, s.destroyLoop = function () {
          s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass).remove(), s.slides.removeAttr("data-swiper-slide-index")
        }, s.reLoop = function (updatePosition) {
          var oldIndex = s.activeIndex - s.loopedSlides;
          s.destroyLoop(), s.createLoop(), s.updateSlidesSize(), updatePosition && s.slideTo(oldIndex + s.loopedSlides, 0, !1)
        }, s.fixLoop = function () {
          var newIndex;
          s.activeIndex < s.loopedSlides ? (newIndex = s.slides.length - 3 * s.loopedSlides + s.activeIndex, newIndex += s.loopedSlides, s.slideTo(newIndex, 0, !1, !0)) : ("auto" === s.params.slidesPerView && s.activeIndex >= 2 * s.loopedSlides || s.activeIndex > s.slides.length - 2 * s.params.slidesPerView) && (newIndex = -s.slides.length + s.activeIndex + s.loopedSlides, newIndex += s.loopedSlides, s.slideTo(newIndex, 0, !1, !0))
        }, s.appendSlide = function (slides) {
          if (s.params.loop && s.destroyLoop(), "object" == typeof slides && slides.length)for (var i = 0; i < slides.length; i++)slides[i] && s.wrapper.append(slides[i]); else s.wrapper.append(slides);
          s.params.loop && s.createLoop(), s.params.observer && s.support.observer || s.update(!0)
        }, s.prependSlide = function (slides) {
          s.params.loop && s.destroyLoop();
          var newActiveIndex = s.activeIndex + 1;
          if ("object" == typeof slides && slides.length) {
            for (var i = 0; i < slides.length; i++)slides[i] && s.wrapper.prepend(slides[i]);
            newActiveIndex = s.activeIndex + slides.length
          } else s.wrapper.prepend(slides);
          s.params.loop && s.createLoop(), s.params.observer && s.support.observer || s.update(!0), s.slideTo(newActiveIndex, 0, !1)
        }, s.removeSlide = function (slidesIndexes) {
          s.params.loop && (s.destroyLoop(), s.slides = s.wrapper.children("." + s.params.slideClass));
          var indexToRemove, newActiveIndex = s.activeIndex;
          if ("object" == typeof slidesIndexes && slidesIndexes.length) {
            for (var i = 0; i < slidesIndexes.length; i++)indexToRemove = slidesIndexes[i], s.slides[indexToRemove] && s.slides.eq(indexToRemove).remove(), indexToRemove < newActiveIndex && newActiveIndex--;
            newActiveIndex = Math.max(newActiveIndex, 0)
          } else indexToRemove = slidesIndexes, s.slides[indexToRemove] && s.slides.eq(indexToRemove).remove(), indexToRemove < newActiveIndex && newActiveIndex--, newActiveIndex = Math.max(newActiveIndex, 0);
          s.params.loop && s.createLoop(), s.params.observer && s.support.observer || s.update(!0), s.params.loop ? s.slideTo(newActiveIndex + s.loopedSlides, 0, !1) : s.slideTo(newActiveIndex, 0, !1)
        }, s.removeAllSlides = function () {
          for (var slidesIndexes = [], i = 0; i < s.slides.length; i++)slidesIndexes.push(i);
          s.removeSlide(slidesIndexes)
        }, s.effects = {
          fade: {
            setTranslate: function () {
              for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides.eq(i), offset = slide[0].swiperSlideOffset, tx = -offset;
                s.params.virtualTranslate || (tx -= s.translate);
                var ty = 0;
                s.isHorizontal() || (ty = tx, tx = 0);
                var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
                slide.css({opacity: slideOpacity}).transform("translate3d(" + tx + "px, " + ty + "px, 0px)")
              }
            }, setTransition: function (duration) {
              if (s.slides.transition(duration), s.params.virtualTranslate && 0 !== duration) {
                var eventTriggered = !1;
                s.slides.transitionEnd(function () {
                  if (!eventTriggered && s) {
                    eventTriggered = !0, s.animating = !1;
                    for (var triggerEvents = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < triggerEvents.length; i++)s.wrapper.trigger(triggerEvents[i])
                  }
                })
              }
            }
          }, flip: {
            setTranslate: function () {
              for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides.eq(i), progress = slide[0].progress;
                s.params.flip.limitRotation && (progress = Math.max(Math.min(slide[0].progress, 1), -1));
                var offset = slide[0].swiperSlideOffset, rotate = -180 * progress, rotateY = rotate, rotateX = 0,
                  tx = -offset, ty = 0;
                if (s.isHorizontal() ? s.rtl && (rotateY = -rotateY) : (ty = tx, tx = 0, rotateX = -rotateY, rotateY = 0), slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length, s.params.flip.slideShadows) {
                  var shadowBefore = s.isHorizontal() ? slide.find(".swiper-slide-shadow-left") : slide.find(".swiper-slide-shadow-top"),
                    shadowAfter = s.isHorizontal() ? slide.find(".swiper-slide-shadow-right") : slide.find(".swiper-slide-shadow-bottom");
                  0 === shadowBefore.length && (shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "left" : "top") + '"></div>'), slide.append(shadowBefore)), 0 === shadowAfter.length && (shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "right" : "bottom") + '"></div>'), slide.append(shadowAfter)), shadowBefore.length && (shadowBefore[0].style.opacity = Math.max(-progress, 0)), shadowAfter.length && (shadowAfter[0].style.opacity = Math.max(progress, 0))
                }
                slide.transform("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)")
              }
            }, setTransition: function (duration) {
              if (s.slides.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration), s.params.virtualTranslate && 0 !== duration) {
                var eventTriggered = !1;
                s.slides.eq(s.activeIndex).transitionEnd(function () {
                  if (!eventTriggered && s && $(this).hasClass(s.params.slideActiveClass)) {
                    eventTriggered = !0, s.animating = !1;
                    for (var triggerEvents = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < triggerEvents.length; i++)s.wrapper.trigger(triggerEvents[i])
                  }
                })
              }
            }
          }, cube: {
            setTranslate: function () {
              var cubeShadow, wrapperRotate = 0;
              s.params.cube.shadow && (s.isHorizontal() ? (cubeShadow = s.wrapper.find(".swiper-cube-shadow"), 0 === cubeShadow.length && (cubeShadow = $('<div class="swiper-cube-shadow"></div>'), s.wrapper.append(cubeShadow)), cubeShadow.css({height: s.width + "px"})) : (cubeShadow = s.container.find(".swiper-cube-shadow"), 0 === cubeShadow.length && (cubeShadow = $('<div class="swiper-cube-shadow"></div>'), s.container.append(cubeShadow))));
              for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides.eq(i), slideAngle = 90 * i, round = Math.floor(slideAngle / 360);
                s.rtl && (slideAngle = -slideAngle, round = Math.floor(-slideAngle / 360));
                var progress = Math.max(Math.min(slide[0].progress, 1), -1), tx = 0, ty = 0, tz = 0;
                i % 4 === 0 ? (tx = 4 * -round * s.size, tz = 0) : (i - 1) % 4 === 0 ? (tx = 0, tz = 4 * -round * s.size) : (i - 2) % 4 === 0 ? (tx = s.size + 4 * round * s.size, tz = s.size) : (i - 3) % 4 === 0 && (tx = -s.size, tz = 3 * s.size + 4 * s.size * round), s.rtl && (tx = -tx), s.isHorizontal() || (ty = tx, tx = 0);
                var transform = "rotateX(" + (s.isHorizontal() ? 0 : -slideAngle) + "deg) rotateY(" + (s.isHorizontal() ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
                if (progress <= 1 && progress > -1 && (wrapperRotate = 90 * i + 90 * progress, s.rtl && (wrapperRotate = 90 * -i - 90 * progress)), slide.transform(transform), s.params.cube.slideShadows) {
                  var shadowBefore = s.isHorizontal() ? slide.find(".swiper-slide-shadow-left") : slide.find(".swiper-slide-shadow-top"),
                    shadowAfter = s.isHorizontal() ? slide.find(".swiper-slide-shadow-right") : slide.find(".swiper-slide-shadow-bottom");
                  0 === shadowBefore.length && (shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "left" : "top") + '"></div>'), slide.append(shadowBefore)), 0 === shadowAfter.length && (shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "right" : "bottom") + '"></div>'), slide.append(shadowAfter)), shadowBefore.length && (shadowBefore[0].style.opacity = Math.max(-progress, 0)), shadowAfter.length && (shadowAfter[0].style.opacity = Math.max(progress, 0))
                }
              }
              if (s.wrapper.css({
                  "-webkit-transform-origin": "50% 50% -" + s.size / 2 + "px",
                  "-moz-transform-origin": "50% 50% -" + s.size / 2 + "px",
                  "-ms-transform-origin": "50% 50% -" + s.size / 2 + "px",
                  "transform-origin": "50% 50% -" + s.size / 2 + "px"
                }), s.params.cube.shadow)if (s.isHorizontal()) cubeShadow.transform("translate3d(0px, " + (s.width / 2 + s.params.cube.shadowOffset) + "px, " + -s.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + s.params.cube.shadowScale + ")"); else {
                var shadowAngle = Math.abs(wrapperRotate) - 90 * Math.floor(Math.abs(wrapperRotate) / 90),
                  multiplier = 1.5 - (Math.sin(2 * shadowAngle * Math.PI / 360) / 2 + Math.cos(2 * shadowAngle * Math.PI / 360) / 2),
                  scale1 = s.params.cube.shadowScale, scale2 = s.params.cube.shadowScale / multiplier,
                  offset = s.params.cube.shadowOffset;
                cubeShadow.transform("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + (s.height / 2 + offset) + "px, " + -s.height / 2 / scale2 + "px) rotateX(-90deg)")
              }
              var zFactor = s.isSafari || s.isUiWebView ? -s.size / 2 : 0;
              s.wrapper.transform("translate3d(0px,0," + zFactor + "px) rotateX(" + (s.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (s.isHorizontal() ? -wrapperRotate : 0) + "deg)")
            }, setTransition: function (duration) {
              s.slides.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration), s.params.cube.shadow && !s.isHorizontal() && s.container.find(".swiper-cube-shadow").transition(duration)
            }
          }, coverflow: {
            setTranslate: function () {
              for (var transform = s.translate, center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2, rotate = s.isHorizontal() ? s.params.coverflow.rotate : -s.params.coverflow.rotate, translate = s.params.coverflow.depth, i = 0, length = s.slides.length; i < length; i++) {
                var slide = s.slides.eq(i), slideSize = s.slidesSizesGrid[i], slideOffset = slide[0].swiperSlideOffset,
                  offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier,
                  rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0,
                  rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier,
                  translateZ = -translate * Math.abs(offsetMultiplier),
                  translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * offsetMultiplier,
                  translateX = s.isHorizontal() ? s.params.coverflow.stretch * offsetMultiplier : 0;
                Math.abs(translateX) < .001 && (translateX = 0), Math.abs(translateY) < .001 && (translateY = 0), Math.abs(translateZ) < .001 && (translateZ = 0), Math.abs(rotateY) < .001 && (rotateY = 0), Math.abs(rotateX) < .001 && (rotateX = 0);
                var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
                if (slide.transform(slideTransform), slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1, s.params.coverflow.slideShadows) {
                  var shadowBefore = s.isHorizontal() ? slide.find(".swiper-slide-shadow-left") : slide.find(".swiper-slide-shadow-top"),
                    shadowAfter = s.isHorizontal() ? slide.find(".swiper-slide-shadow-right") : slide.find(".swiper-slide-shadow-bottom");
                  0 === shadowBefore.length && (shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "left" : "top") + '"></div>'), slide.append(shadowBefore)), 0 === shadowAfter.length && (shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "right" : "bottom") + '"></div>'), slide.append(shadowAfter)), shadowBefore.length && (shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0), shadowAfter.length && (shadowAfter[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0)
                }
              }
              if (s.browser.ie) {
                var ws = s.wrapper[0].style;
                ws.perspectiveOrigin = center + "px 50%"
              }
            }, setTransition: function (duration) {
              s.slides.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration)
            }
          }
        }, s.lazy = {
          initialImageLoaded: !1, loadImageInSlide: function (index, loadInDuplicate) {
            if ("undefined" != typeof index && ("undefined" == typeof loadInDuplicate && (loadInDuplicate = !0), 0 !== s.slides.length)) {
              var slide = s.slides.eq(index),
                img = slide.find("." + s.params.lazyLoadingClass + ":not(." + s.params.lazyStatusLoadedClass + "):not(." + s.params.lazyStatusLoadingClass + ")");
              !slide.hasClass(s.params.lazyLoadingClass) || slide.hasClass(s.params.lazyStatusLoadedClass) || slide.hasClass(s.params.lazyStatusLoadingClass) || (img = img.add(slide[0])), 0 !== img.length && img.each(function () {
                var _img = $(this);
                _img.addClass(s.params.lazyStatusLoadingClass);
                var background = _img.attr("data-background"), src = _img.attr("data-src"),
                  srcset = _img.attr("data-srcset"), sizes = _img.attr("data-sizes");
                s.loadImage(_img[0], src || background, srcset, sizes, !1, function () {
                  if ("undefined" != typeof s && null !== s && s) {
                    if (background ? (_img.css("background-image", 'url("' + background + '")'), _img.removeAttr("data-background")) : (srcset && (_img.attr("srcset", srcset), _img.removeAttr("data-srcset")), sizes && (_img.attr("sizes", sizes), _img.removeAttr("data-sizes")), src && (_img.attr("src", src), _img.removeAttr("data-src"))), _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass), slide.find("." + s.params.lazyPreloaderClass + ", ." + s.params.preloaderClass).remove(), s.params.loop && loadInDuplicate) {
                      var slideOriginalIndex = slide.attr("data-swiper-slide-index");
                      if (slide.hasClass(s.params.slideDuplicateClass)) {
                        var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ")");
                        s.lazy.loadImageInSlide(originalSlide.index(), !1)
                      } else {
                        var duplicatedSlide = s.wrapper.children("." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                        s.lazy.loadImageInSlide(duplicatedSlide.index(), !1)
                      }
                    }
                    s.emit("onLazyImageReady", s, slide[0], _img[0])
                  }
                }), s.emit("onLazyImageLoad", s, slide[0], _img[0])
              })
            }
          }, load: function () {
            var i, slidesPerView = s.params.slidesPerView;
            if ("auto" === slidesPerView && (slidesPerView = 0), s.lazy.initialImageLoaded || (s.lazy.initialImageLoaded = !0), s.params.watchSlidesVisibility) s.wrapper.children("." + s.params.slideVisibleClass).each(function () {
              s.lazy.loadImageInSlide($(this).index())
            }); else if (slidesPerView > 1)for (i = s.activeIndex; i < s.activeIndex + slidesPerView; i++)s.slides[i] && s.lazy.loadImageInSlide(i); else s.lazy.loadImageInSlide(s.activeIndex);
            if (s.params.lazyLoadingInPrevNext)if (slidesPerView > 1 || s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1) {
              var amount = s.params.lazyLoadingInPrevNextAmount, spv = slidesPerView,
                maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length),
                minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
              for (i = s.activeIndex + slidesPerView; i < maxIndex; i++)s.slides[i] && s.lazy.loadImageInSlide(i);
              for (i = minIndex; i < s.activeIndex; i++)s.slides[i] && s.lazy.loadImageInSlide(i)
            } else {
              var nextSlide = s.wrapper.children("." + s.params.slideNextClass);
              nextSlide.length > 0 && s.lazy.loadImageInSlide(nextSlide.index());
              var prevSlide = s.wrapper.children("." + s.params.slidePrevClass);
              prevSlide.length > 0 && s.lazy.loadImageInSlide(prevSlide.index())
            }
          }, onTransitionStart: function () {
            s.params.lazyLoading && (s.params.lazyLoadingOnTransitionStart || !s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded) && s.lazy.load()
          }, onTransitionEnd: function () {
            s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart && s.lazy.load()
          }
        }, s.scrollbar = {
          isTouched: !1, setDragPosition: function (e) {
            var sb = s.scrollbar,
              pointerPosition = s.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
              position = pointerPosition - sb.track.offset()[s.isHorizontal() ? "left" : "top"] - sb.dragSize / 2,
              positionMin = -s.minTranslate() * sb.moveDivider, positionMax = -s.maxTranslate() * sb.moveDivider;
            position < positionMin ? position = positionMin : position > positionMax && (position = positionMax), position = -position / sb.moveDivider, s.updateProgress(position), s.setWrapperTranslate(position, !0)
          }, dragStart: function (e) {
            var sb = s.scrollbar;
            sb.isTouched = !0, e.preventDefault(), e.stopPropagation(), sb.setDragPosition(e), clearTimeout(sb.dragTimeout), sb.track.transition(0), s.params.scrollbarHide && sb.track.css("opacity", 1), s.wrapper.transition(100), sb.drag.transition(100), s.emit("onScrollbarDragStart", s)
          }, dragMove: function (e) {
            var sb = s.scrollbar;
            sb.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, sb.setDragPosition(e), s.wrapper.transition(0), sb.track.transition(0), sb.drag.transition(0), s.emit("onScrollbarDragMove", s))
          }, dragEnd: function (e) {
            var sb = s.scrollbar;
            sb.isTouched && (sb.isTouched = !1, s.params.scrollbarHide && (clearTimeout(sb.dragTimeout), sb.dragTimeout = setTimeout(function () {
              sb.track.css("opacity", 0), sb.track.transition(400)
            }, 1e3)), s.emit("onScrollbarDragEnd", s), s.params.scrollbarSnapOnRelease && s.slideReset())
          }, draggableEvents: function () {
            return s.params.simulateTouch !== !1 || s.support.touch ? s.touchEvents : s.touchEventsDesktop
          }(), enableDraggable: function () {
            var sb = s.scrollbar, target = s.support.touch ? sb.track : document;
            $(sb.track).on(sb.draggableEvents.start, sb.dragStart), $(target).on(sb.draggableEvents.move, sb.dragMove), $(target).on(sb.draggableEvents.end, sb.dragEnd)
          }, disableDraggable: function () {
            var sb = s.scrollbar, target = s.support.touch ? sb.track : document;
            $(sb.track).off(sb.draggableEvents.start, sb.dragStart), $(target).off(sb.draggableEvents.move, sb.dragMove), $(target).off(sb.draggableEvents.end, sb.dragEnd)
          }, set: function () {
            if (s.params.scrollbar) {
              var sb = s.scrollbar;
              sb.track = $(s.params.scrollbar), s.params.uniqueNavElements && "string" == typeof s.params.scrollbar && sb.track.length > 1 && 1 === s.container.find(s.params.scrollbar).length && (sb.track = s.container.find(s.params.scrollbar)), sb.drag = sb.track.find(".swiper-scrollbar-drag"), 0 === sb.drag.length && (sb.drag = $('<div class="swiper-scrollbar-drag"></div>'), sb.track.append(sb.drag)), sb.drag[0].style.width = "", sb.drag[0].style.height = "", sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight, sb.divider = s.size / s.virtualSize, sb.moveDivider = sb.divider * (sb.trackSize / s.size), sb.dragSize = sb.trackSize * sb.divider, s.isHorizontal() ? sb.drag[0].style.width = sb.dragSize + "px" : sb.drag[0].style.height = sb.dragSize + "px", sb.divider >= 1 ? sb.track[0].style.display = "none" : sb.track[0].style.display = "", s.params.scrollbarHide && (sb.track[0].style.opacity = 0)
            }
          }, setTranslate: function () {
            if (s.params.scrollbar) {
              var newPos, sb = s.scrollbar, newSize = (s.translate || 0, sb.dragSize);
              newPos = (sb.trackSize - sb.dragSize) * s.progress, s.rtl && s.isHorizontal() ? (newPos = -newPos, newPos > 0 ? (newSize = sb.dragSize - newPos, newPos = 0) : -newPos + sb.dragSize > sb.trackSize && (newSize = sb.trackSize + newPos)) : newPos < 0 ? (newSize = sb.dragSize + newPos, newPos = 0) : newPos + sb.dragSize > sb.trackSize && (newSize = sb.trackSize - newPos), s.isHorizontal() ? (s.support.transforms3d ? sb.drag.transform("translate3d(" + newPos + "px, 0, 0)") : sb.drag.transform("translateX(" + newPos + "px)"), sb.drag[0].style.width = newSize + "px") : (s.support.transforms3d ? sb.drag.transform("translate3d(0px, " + newPos + "px, 0)") : sb.drag.transform("translateY(" + newPos + "px)"), sb.drag[0].style.height = newSize + "px"), s.params.scrollbarHide && (clearTimeout(sb.timeout), sb.track[0].style.opacity = 1, sb.timeout = setTimeout(function () {
                sb.track[0].style.opacity = 0, sb.track.transition(400)
              }, 1e3))
            }
          }, setTransition: function (duration) {
            s.params.scrollbar && s.scrollbar.drag.transition(duration)
          }
        }, s.controller = {
          LinearSpline: function (x, y) {
            var binarySearch = function () {
              var maxIndex, minIndex, guess;
              return function (array, val) {
                for (minIndex = -1, maxIndex = array.length; maxIndex - minIndex > 1;)array[guess = maxIndex + minIndex >> 1] <= val ? minIndex = guess : maxIndex = guess;
                return maxIndex
              }
            }();
            this.x = x, this.y = y, this.lastIndex = x.length - 1;
            var i1, i3;
            this.x.length;
            this.interpolate = function (x2) {
              return x2 ? (i3 = binarySearch(this.x, x2), i1 = i3 - 1, (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1]) : 0
            }
          }, getInterpolateFunction: function (c) {
            s.controller.spline || (s.controller.spline = s.params.loop ? new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) : new s.controller.LinearSpline(s.snapGrid, c.snapGrid))
          }, setTranslate: function (translate, byController) {
            function setControlledTranslate(c) {
              translate = c.rtl && "horizontal" === c.params.direction ? -s.translate : s.translate, "slide" === s.params.controlBy && (s.controller.getInterpolateFunction(c), controlledTranslate = -s.controller.spline.interpolate(-translate)), controlledTranslate && "container" !== s.params.controlBy || (multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate()), controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate()), s.params.controlInverse && (controlledTranslate = c.maxTranslate() - controlledTranslate), c.updateProgress(controlledTranslate), c.setWrapperTranslate(controlledTranslate, !1, s), c.updateActiveIndex()
            }
            
            var multiplier, controlledTranslate, controlled = s.params.control;
            if (Array.isArray(controlled))for (var i = 0; i < controlled.length; i++)controlled[i] !== byController && controlled[i] instanceof Swiper && setControlledTranslate(controlled[i]); else controlled instanceof Swiper && byController !== controlled && setControlledTranslate(controlled)
          }, setTransition: function (duration, byController) {
            function setControlledTransition(c) {
              c.setWrapperTransition(duration, s), 0 !== duration && (c.onTransitionStart(), c.wrapper.transitionEnd(function () {
                controlled && (c.params.loop && "slide" === s.params.controlBy && c.fixLoop(), c.onTransitionEnd())
              }))
            }
            
            var i, controlled = s.params.control;
            if (Array.isArray(controlled))for (i = 0; i < controlled.length; i++)controlled[i] !== byController && controlled[i] instanceof Swiper && setControlledTransition(controlled[i]); else controlled instanceof Swiper && byController !== controlled && setControlledTransition(controlled)
          }
        }, s.hashnav = {
          onHashCange: function (e, a) {
            var newHash = document.location.hash.replace("#", ""),
              activeSlideHash = s.slides.eq(s.activeIndex).attr("data-hash");
            newHash !== activeSlideHash && s.slideTo(s.wrapper.children("." + s.params.slideClass + '[data-hash="' + newHash + '"]').index())
          }, attachEvents: function (detach) {
            var action = detach ? "off" : "on";
            $(window)[action]("hashchange", s.hashnav.onHashCange)
          }, setHash: function () {
            if (s.hashnav.initialized && s.params.hashnav)if (s.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + s.slides.eq(s.activeIndex).attr("data-hash") || ""); else {
              var slide = s.slides.eq(s.activeIndex), hash = slide.attr("data-hash") || slide.attr("data-history");
              document.location.hash = hash || ""
            }
          }, init: function () {
            if (s.params.hashnav && !s.params.history) {
              s.hashnav.initialized = !0;
              var hash = document.location.hash.replace("#", "");
              if (hash)for (var speed = 0, i = 0, length = s.slides.length; i < length; i++) {
                var slide = s.slides.eq(i), slideHash = slide.attr("data-hash") || slide.attr("data-history");
                if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                  var index = slide.index();
                  s.slideTo(index, speed, s.params.runCallbacksOnInit, !0)
                }
              }
              s.params.hashnavWatchState && s.hashnav.attachEvents()
            }
          }, destroy: function () {
            s.params.hashnavWatchState && s.hashnav.attachEvents(!0)
          }
        }, s.history = {
          init: function () {
            if (s.params.history) {
              if (!window.history || !window.history.pushState)return s.params.history = !1, void(s.params.hashnav = !0);
              s.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit), s.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
            }
          }, setHistoryPopState: function () {
            s.history.paths = s.history.getPathValues(), s.history.scrollToSlide(s.params.speed, s.history.paths.value, !1)
          }, getPathValues: function () {
            var pathArray = window.location.pathname.slice(1).split("/"), total = pathArray.length,
              key = pathArray[total - 2], value = pathArray[total - 1];
            return {key: key, value: value}
          }, setHistory: function (key, index) {
            if (s.history.initialized && s.params.history) {
              var slide = s.slides.eq(index), value = this.slugify(slide.attr("data-history"));
              window.location.pathname.includes(key) || (value = key + "/" + value), s.params.replaceState ? window.history.replaceState(null, null, value) : window.history.pushState(null, null, value)
            }
          }, slugify: function (text) {
            return text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
          }, scrollToSlide: function (speed, value, runCallbacks) {
            if (value)for (var i = 0, length = s.slides.length; i < length; i++) {
              var slide = s.slides.eq(i), slideHistory = this.slugify(slide.attr("data-history"));
              if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                var index = slide.index();
                s.slideTo(index, speed, runCallbacks)
              }
            } else s.slideTo(0, speed, runCallbacks)
          }
        }, s.disableKeyboardControl = function () {
          s.params.keyboardControl = !1, $(document).off("keydown", handleKeyboard)
        }, s.enableKeyboardControl = function () {
          s.params.keyboardControl = !0, $(document).on("keydown", handleKeyboard)
        }, s.mousewheel = {
          event: !1,
          lastScrollTime: (new window.Date).getTime()
        }, s.params.mousewheelControl && (s.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : isEventSupported() ? "wheel" : "mousewheel"), s.disableMousewheelControl = function () {
          if (!s.mousewheel.event)return !1;
          var target = s.container;
          return "container" !== s.params.mousewheelEventsTarged && (target = $(s.params.mousewheelEventsTarged)), target.off(s.mousewheel.event, handleMousewheel), s.params.mousewheelControl = !1, !0
        }, s.enableMousewheelControl = function () {
          if (!s.mousewheel.event)return !1;
          var target = s.container;
          return "container" !== s.params.mousewheelEventsTarged && (target = $(s.params.mousewheelEventsTarged)), target.on(s.mousewheel.event, handleMousewheel), s.params.mousewheelControl = !0, !0
        }, s.parallax = {
          setTranslate: function () {
            s.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
              setParallaxTransform(this, s.progress)
            }), s.slides.each(function () {
              var slide = $(this);
              slide.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                setParallaxTransform(this, progress)
              })
            })
          }, setTransition: function (duration) {
            "undefined" == typeof duration && (duration = s.params.speed), s.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
              var el = $(this), parallaxDuration = parseInt(el.attr("data-swiper-parallax-duration"), 10) || duration;
              0 === duration && (parallaxDuration = 0), el.transition(parallaxDuration)
            })
          }
        }, s.zoom = {
          scale: 1,
          currentScale: 1,
          isScaling: !1,
          gesture: {
            slide: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            image: void 0,
            imageWrap: void 0,
            zoomMax: s.params.zoomMax
          },
          image: {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
          },
          velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0},
          getDistanceBetweenTouches: function (e) {
            if (e.targetTouches.length < 2)return 1;
            var x1 = e.targetTouches[0].pageX, y1 = e.targetTouches[0].pageY, x2 = e.targetTouches[1].pageX,
              y2 = e.targetTouches[1].pageY, distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            return distance
          },
          onGestureStart: function (e) {
            var z = s.zoom;
            if (!s.support.gestures) {
              if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)return;
              z.gesture.scaleStart = z.getDistanceBetweenTouches(e)
            }
            return z.gesture.slide && z.gesture.slide.length || (z.gesture.slide = $(this), 0 === z.gesture.slide.length && (z.gesture.slide = s.slides.eq(s.activeIndex)), z.gesture.image = z.gesture.slide.find("img, svg, canvas"), z.gesture.imageWrap = z.gesture.image.parent("." + s.params.zoomContainerClass), z.gesture.zoomMax = z.gesture.imageWrap.attr("data-swiper-zoom") || s.params.zoomMax, 0 !== z.gesture.imageWrap.length) ? (z.gesture.image.transition(0), void(z.isScaling = !0)) : void(z.gesture.image = void 0)
          },
          onGestureChange: function (e) {
            var z = s.zoom;
            if (!s.support.gestures) {
              if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)return;
              z.gesture.scaleMove = z.getDistanceBetweenTouches(e)
            }
            z.gesture.image && 0 !== z.gesture.image.length && (s.support.gestures ? z.scale = e.scale * z.currentScale : z.scale = z.gesture.scaleMove / z.gesture.scaleStart * z.currentScale, z.scale > z.gesture.zoomMax && (z.scale = z.gesture.zoomMax - 1 + Math.pow(z.scale - z.gesture.zoomMax + 1, .5)), z.scale < s.params.zoomMin && (z.scale = s.params.zoomMin + 1 - Math.pow(s.params.zoomMin - z.scale + 1, .5)), z.gesture.image.transform("translate3d(0,0,0) scale(" + z.scale + ")"));
          },
          onGestureEnd: function (e) {
            var z = s.zoom;
            !s.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || z.gesture.image && 0 !== z.gesture.image.length && (z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin), z.gesture.image.transition(s.params.speed).transform("translate3d(0,0,0) scale(" + z.scale + ")"), z.currentScale = z.scale, z.isScaling = !1, 1 === z.scale && (z.gesture.slide = void 0))
          },
          onTouchStart: function (s, e) {
            var z = s.zoom;
            z.gesture.image && 0 !== z.gesture.image.length && (z.image.isTouched || ("android" === s.device.os && e.preventDefault(), z.image.isTouched = !0, z.image.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, z.image.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
          },
          onTouchMove: function (e) {
            var z = s.zoom;
            if (z.gesture.image && 0 !== z.gesture.image.length && (s.allowClick = !1, z.image.isTouched && z.gesture.slide)) {
              z.image.isMoved || (z.image.width = z.gesture.image[0].offsetWidth, z.image.height = z.gesture.image[0].offsetHeight, z.image.startX = s.getTranslate(z.gesture.imageWrap[0], "x") || 0, z.image.startY = s.getTranslate(z.gesture.imageWrap[0], "y") || 0, z.gesture.slideWidth = z.gesture.slide[0].offsetWidth, z.gesture.slideHeight = z.gesture.slide[0].offsetHeight, z.gesture.imageWrap.transition(0), s.rtl && (z.image.startX = -z.image.startX), s.rtl && (z.image.startY = -z.image.startY));
              var scaledWidth = z.image.width * z.scale, scaledHeight = z.image.height * z.scale;
              if (!(scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight)) {
                if (z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0), z.image.maxX = -z.image.minX, z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0), z.image.maxY = -z.image.minY, z.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, z.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !z.image.isMoved && !z.isScaling) {
                  if (s.isHorizontal() && Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x || Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)return void(z.image.isTouched = !1);
                  if (!s.isHorizontal() && Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y || Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)return void(z.image.isTouched = !1)
                }
                e.preventDefault(), e.stopPropagation(), z.image.isMoved = !0, z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX, z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY, z.image.currentX < z.image.minX && (z.image.currentX = z.image.minX + 1 - Math.pow(z.image.minX - z.image.currentX + 1, .8)), z.image.currentX > z.image.maxX && (z.image.currentX = z.image.maxX - 1 + Math.pow(z.image.currentX - z.image.maxX + 1, .8)), z.image.currentY < z.image.minY && (z.image.currentY = z.image.minY + 1 - Math.pow(z.image.minY - z.image.currentY + 1, .8)), z.image.currentY > z.image.maxY && (z.image.currentY = z.image.maxY - 1 + Math.pow(z.image.currentY - z.image.maxY + 1, .8)), z.velocity.prevPositionX || (z.velocity.prevPositionX = z.image.touchesCurrent.x), z.velocity.prevPositionY || (z.velocity.prevPositionY = z.image.touchesCurrent.y), z.velocity.prevTime || (z.velocity.prevTime = Date.now()), z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2, z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2, Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2 && (z.velocity.x = 0), Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2 && (z.velocity.y = 0), z.velocity.prevPositionX = z.image.touchesCurrent.x, z.velocity.prevPositionY = z.image.touchesCurrent.y, z.velocity.prevTime = Date.now(), z.gesture.imageWrap.transform("translate3d(" + z.image.currentX + "px, " + z.image.currentY + "px,0)")
              }
            }
          },
          onTouchEnd: function (s, e) {
            var z = s.zoom;
            if (z.gesture.image && 0 !== z.gesture.image.length) {
              if (!z.image.isTouched || !z.image.isMoved)return z.image.isTouched = !1, void(z.image.isMoved = !1);
              z.image.isTouched = !1, z.image.isMoved = !1;
              var momentumDurationX = 300, momentumDurationY = 300,
                momentumDistanceX = z.velocity.x * momentumDurationX,
                newPositionX = z.image.currentX + momentumDistanceX,
                momentumDistanceY = z.velocity.y * momentumDurationY,
                newPositionY = z.image.currentY + momentumDistanceY;
              0 !== z.velocity.x && (momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x)), 0 !== z.velocity.y && (momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y));
              var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
              z.image.currentX = newPositionX, z.image.currentY = newPositionY;
              var scaledWidth = z.image.width * z.scale, scaledHeight = z.image.height * z.scale;
              z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0), z.image.maxX = -z.image.minX, z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0), z.image.maxY = -z.image.minY, z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX), z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY), z.gesture.imageWrap.transition(momentumDuration).transform("translate3d(" + z.image.currentX + "px, " + z.image.currentY + "px,0)")
            }
          },
          onTransitionEnd: function (s) {
            var z = s.zoom;
            z.gesture.slide && s.previousIndex !== s.activeIndex && (z.gesture.image.transform("translate3d(0,0,0) scale(1)"), z.gesture.imageWrap.transform("translate3d(0,0,0)"), z.gesture.slide = z.gesture.image = z.gesture.imageWrap = void 0, z.scale = z.currentScale = 1)
          },
          toggleZoom: function (s, e) {
            var z = s.zoom;
            if (z.gesture.slide || (z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex), z.gesture.image = z.gesture.slide.find("img, svg, canvas"), z.gesture.imageWrap = z.gesture.image.parent("." + s.params.zoomContainerClass)), z.gesture.image && 0 !== z.gesture.image.length) {
              var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight,
                scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth,
                slideHeight;
              "undefined" == typeof z.image.touchesStart.x && e ? (touchX = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, touchY = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (touchX = z.image.touchesStart.x, touchY = z.image.touchesStart.y), z.scale && 1 !== z.scale ? (z.scale = z.currentScale = 1, z.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), z.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), z.gesture.slide = void 0) : (z.scale = z.currentScale = z.gesture.imageWrap.attr("data-swiper-zoom") || s.params.zoomMax, e ? (slideWidth = z.gesture.slide[0].offsetWidth, slideHeight = z.gesture.slide[0].offsetHeight, offsetX = z.gesture.slide.offset().left, offsetY = z.gesture.slide.offset().top, diffX = offsetX + slideWidth / 2 - touchX, diffY = offsetY + slideHeight / 2 - touchY, imageWidth = z.gesture.image[0].offsetWidth, imageHeight = z.gesture.image[0].offsetHeight, scaledWidth = imageWidth * z.scale, scaledHeight = imageHeight * z.scale, translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0), translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0), translateMaxX = -translateMinX, translateMaxY = -translateMinY, translateX = diffX * z.scale, translateY = diffY * z.scale, translateX < translateMinX && (translateX = translateMinX), translateX > translateMaxX && (translateX = translateMaxX), translateY < translateMinY && (translateY = translateMinY), translateY > translateMaxY && (translateY = translateMaxY)) : (translateX = 0, translateY = 0), z.gesture.imageWrap.transition(300).transform("translate3d(" + translateX + "px, " + translateY + "px,0)"), z.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + z.scale + ")"))
            }
          },
          attachEvents: function (detach) {
            var action = detach ? "off" : "on";
            if (s.params.zoom) {
              var passiveListener = (s.slides, !("touchstart" !== s.touchEvents.start || !s.support.passiveListener || !s.params.passiveListeners) && {
                passive: !0,
                capture: !1
              });
              s.support.gestures ? (s.slides[action]("gesturestart", s.zoom.onGestureStart, passiveListener), s.slides[action]("gesturechange", s.zoom.onGestureChange, passiveListener), s.slides[action]("gestureend", s.zoom.onGestureEnd, passiveListener)) : "touchstart" === s.touchEvents.start && (s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener), s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener), s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener)), s[action]("touchStart", s.zoom.onTouchStart), s.slides.each(function (index, slide) {
                $(slide).find("." + s.params.zoomContainerClass).length > 0 && $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove)
              }), s[action]("touchEnd", s.zoom.onTouchEnd), s[action]("transitionEnd", s.zoom.onTransitionEnd), s.params.zoomToggle && s.on("doubleTap", s.zoom.toggleZoom)
            }
          },
          init: function () {
            s.zoom.attachEvents()
          },
          destroy: function () {
            s.zoom.attachEvents(!0)
          }
        }, s._plugins = [];
        for (var plugin in s.plugins) {
          var p = s.plugins[plugin](s, s.params[plugin]);
          p && s._plugins.push(p)
        }
        return s.callPlugins = function (eventName) {
          for (var i = 0; i < s._plugins.length; i++)eventName in s._plugins[i] && s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        }, s.emitterEventListeners = {}, s.emit = function (eventName) {
          s.params[eventName] && s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          var i;
          if (s.emitterEventListeners[eventName])for (i = 0; i < s.emitterEventListeners[eventName].length; i++)s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          s.callPlugins && s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        }, s.on = function (eventName, handler) {
          return eventName = normalizeEventName(eventName), s.emitterEventListeners[eventName] || (s.emitterEventListeners[eventName] = []), s.emitterEventListeners[eventName].push(handler), s
        }, s.off = function (eventName, handler) {
          var i;
          if (eventName = normalizeEventName(eventName), "undefined" == typeof handler)return s.emitterEventListeners[eventName] = [], s;
          if (s.emitterEventListeners[eventName] && 0 !== s.emitterEventListeners[eventName].length) {
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++)s.emitterEventListeners[eventName][i] === handler && s.emitterEventListeners[eventName].splice(i, 1);
            return s
          }
        }, s.once = function (eventName, handler) {
          eventName = normalizeEventName(eventName);
          var _handler = function () {
            handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), s.off(eventName, _handler)
          };
          return s.on(eventName, _handler), s
        }, s.a11y = {
          makeFocusable: function ($el) {
            return $el.attr("tabIndex", "0"), $el
          },
          addRole: function ($el, role) {
            return $el.attr("role", role), $el
          },
          addLabel: function ($el, label) {
            return $el.attr("aria-label", label), $el
          },
          disable: function ($el) {
            return $el.attr("aria-disabled", !0), $el
          },
          enable: function ($el) {
            return $el.attr("aria-disabled", !1), $el
          },
          onEnterKey: function (event) {
            13 === event.keyCode && ($(event.target).is(s.params.nextButton) ? (s.onClickNext(event), s.isEnd ? s.a11y.notify(s.params.lastSlideMessage) : s.a11y.notify(s.params.nextSlideMessage)) : $(event.target).is(s.params.prevButton) && (s.onClickPrev(event), s.isBeginning ? s.a11y.notify(s.params.firstSlideMessage) : s.a11y.notify(s.params.prevSlideMessage)), $(event.target).is("." + s.params.bulletClass) && $(event.target)[0].click())
          },
          liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
          notify: function (message) {
            var notification = s.a11y.liveRegion;
            0 !== notification.length && (notification.html(""), notification.html(message))
          },
          init: function () {
            s.params.nextButton && s.nextButton && s.nextButton.length > 0 && (s.a11y.makeFocusable(s.nextButton), s.a11y.addRole(s.nextButton, "button"), s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage)), s.params.prevButton && s.prevButton && s.prevButton.length > 0 && (s.a11y.makeFocusable(s.prevButton), s.a11y.addRole(s.prevButton, "button"), s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage)), $(s.container).append(s.a11y.liveRegion)
          },
          initPagination: function () {
            s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length && s.bullets.each(function () {
              var bullet = $(this);
              s.a11y.makeFocusable(bullet), s.a11y.addRole(bullet, "button"), s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1))
            })
          },
          destroy: function () {
            s.a11y.liveRegion && s.a11y.liveRegion.length > 0 && s.a11y.liveRegion.remove()
          }
        }, s.init = function () {
          s.params.loop && s.createLoop(), s.updateContainerSize(), s.updateSlidesSize(), s.updatePagination(), s.params.scrollbar && s.scrollbar && (s.scrollbar.set(), s.params.scrollbarDraggable && s.scrollbar.enableDraggable()), "slide" !== s.params.effect && s.effects[s.params.effect] && (s.params.loop || s.updateProgress(), s.effects[s.params.effect].setTranslate()), s.params.loop ? s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit) : (s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit), 0 === s.params.initialSlide && (s.parallax && s.params.parallax && s.parallax.setTranslate(), s.lazy && s.params.lazyLoading && (s.lazy.load(), s.lazy.initialImageLoaded = !0))), s.attachEvents(), s.params.observer && s.support.observer && s.initObservers(), s.params.preloadImages && !s.params.lazyLoading && s.preloadImages(), s.params.zoom && s.zoom && s.zoom.init(), s.params.autoplay && s.startAutoplay(), s.params.keyboardControl && s.enableKeyboardControl && s.enableKeyboardControl(), s.params.mousewheelControl && s.enableMousewheelControl && s.enableMousewheelControl(), s.params.hashnavReplaceState && (s.params.replaceState = s.params.hashnavReplaceState), s.params.history && s.history && s.history.init(), s.params.hashnav && s.hashnav && s.hashnav.init(), s.params.a11y && s.a11y && s.a11y.init(), s.emit("onInit", s)
        }, s.cleanupStyles = function () {
          s.container.removeClass(s.classNames.join(" ")).removeAttr("style"), s.wrapper.removeAttr("style"), s.slides && s.slides.length && s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), s.paginationContainer && s.paginationContainer.length && s.paginationContainer.removeClass(s.params.paginationHiddenClass), s.bullets && s.bullets.length && s.bullets.removeClass(s.params.bulletActiveClass), s.params.prevButton && $(s.params.prevButton).removeClass(s.params.buttonDisabledClass), s.params.nextButton && $(s.params.nextButton).removeClass(s.params.buttonDisabledClass), s.params.scrollbar && s.scrollbar && (s.scrollbar.track && s.scrollbar.track.length && s.scrollbar.track.removeAttr("style"), s.scrollbar.drag && s.scrollbar.drag.length && s.scrollbar.drag.removeAttr("style"))
        }, s.destroy = function (deleteInstance, cleanupStyles) {
          s.detachEvents(), s.stopAutoplay(), s.params.scrollbar && s.scrollbar && s.params.scrollbarDraggable && s.scrollbar.disableDraggable(), s.params.loop && s.destroyLoop(), cleanupStyles && s.cleanupStyles(), s.disconnectObservers(), s.params.zoom && s.zoom && s.zoom.destroy(), s.params.keyboardControl && s.disableKeyboardControl && s.disableKeyboardControl(), s.params.mousewheelControl && s.disableMousewheelControl && s.disableMousewheelControl(), s.params.a11y && s.a11y && s.a11y.destroy(), s.params.history && !s.params.replaceState && window.removeEventListener("popstate", s.history.setHistoryPopState), s.params.hashnav && s.hashnav && s.hashnav.destroy(), s.emit("onDestroy"), deleteInstance !== !1 && (s = null)
        }, s.init(), s
      }
    };
    Swiper.prototype = {
      isSafari: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0
      }(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
      isArray: function (arr) {
        return "[object Array]" === Object.prototype.toString.apply(arr)
      },
      browser: {
        ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
        lteIE9: function () {
          var div = document.createElement("div");
          return div.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === div.getElementsByTagName("i").length
        }()
      },
      device: function () {
        var ua = window.navigator.userAgent, android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
          ipad = ua.match(/(iPad).*OS\s([\d_]+)/), ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
          iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        return {ios: ipad || iphone || ipod, android: android}
      }(),
      support: {
        touch: window.Modernizr && Modernizr.touch === !0 || function () {
          return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
        }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
          var div = document.createElement("div").style;
          return "webkitPerspective" in div || "MozPerspective" in div || "OPerspective" in div || "MsPerspective" in div || "perspective" in div
        }(), flexbox: function () {
          for (var div = document.createElement("div").style, styles = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < styles.length; i++)if (styles[i] in div)return !0
        }(), observer: function () {
          return "MutationObserver" in window || "WebkitMutationObserver" in window
        }(), passiveListener: function () {
          var supportsPassive = !1;
          try {
            var opts = Object.defineProperty({}, "passive", {
              get: function () {
                supportsPassive = !0
              }
            });
            window.addEventListener("testPassiveListener", null, opts)
          } catch (e) {
          }
          return supportsPassive
        }(), gestures: function () {
          return "ongesturestart" in window
        }()
      },
      plugins: {}
    };
    for (var Dom7 = (function () {
      var Dom7 = function (arr) {
        var _this = this, i = 0;
        for (i = 0; i < arr.length; i++)_this[i] = arr[i];
        return _this.length = arr.length, this
      }, $ = function (selector, context) {
        var arr = [], i = 0;
        if (selector && !context && selector instanceof Dom7)return selector;
        if (selector)if ("string" == typeof selector) {
          var els, tempParent, html = selector.trim();
          if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
            var toCreate = "div";
            for (0 === html.indexOf("<li") && (toCreate = "ul"), 0 === html.indexOf("<tr") && (toCreate = "tbody"), 0 !== html.indexOf("<td") && 0 !== html.indexOf("<th") || (toCreate = "tr"), 0 === html.indexOf("<tbody") && (toCreate = "table"), 0 === html.indexOf("<option") && (toCreate = "select"), tempParent = document.createElement(toCreate), tempParent.innerHTML = selector, i = 0; i < tempParent.childNodes.length; i++)arr.push(tempParent.childNodes[i])
          } else for (els = context || "#" !== selector[0] || selector.match(/[ .<>:~]/) ? (context || document).querySelectorAll(selector) : [document.getElementById(selector.split("#")[1])], i = 0; i < els.length; i++)els[i] && arr.push(els[i])
        } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (selector.length > 0 && selector[0].nodeType)for (i = 0; i < selector.length; i++)arr.push(selector[i]);
        return new Dom7(arr)
      };
      return Dom7.prototype = {
        addClass: function (className) {
          if ("undefined" == typeof className)return this;
          for (var classes = className.split(" "), i = 0; i < classes.length; i++)for (var j = 0; j < this.length; j++)this[j].classList.add(classes[i]);
          return this
        }, removeClass: function (className) {
          for (var classes = className.split(" "), i = 0; i < classes.length; i++)for (var j = 0; j < this.length; j++)this[j].classList.remove(classes[i]);
          return this
        }, hasClass: function (className) {
          return !!this[0] && this[0].classList.contains(className)
        }, toggleClass: function (className) {
          for (var classes = className.split(" "), i = 0; i < classes.length; i++)for (var j = 0; j < this.length; j++)this[j].classList.toggle(classes[i]);
          return this
        }, attr: function (attrs, value) {
          if (1 === arguments.length && "string" == typeof attrs)return this[0] ? this[0].getAttribute(attrs) : void 0;
          for (var i = 0; i < this.length; i++)if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (var attrName in attrs)this[i][attrName] = attrs[attrName], this[i].setAttribute(attrName, attrs[attrName]);
          return this
        }, removeAttr: function (attr) {
          for (var i = 0; i < this.length; i++)this[i].removeAttribute(attr);
          return this
        }, data: function (key, value) {
          if ("undefined" != typeof value) {
            for (var i = 0; i < this.length; i++) {
              var el = this[i];
              el.dom7ElementDataStorage || (el.dom7ElementDataStorage = {}), el.dom7ElementDataStorage[key] = value
            }
            return this
          }
          if (this[0]) {
            var dataKey = this[0].getAttribute("data-" + key);
            return dataKey ? dataKey : this[0].dom7ElementDataStorage && key in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[key] : void 0
          }
        }, transform: function (transform) {
          for (var i = 0; i < this.length; i++) {
            var elStyle = this[i].style;
            elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform
          }
          return this
        }, transition: function (duration) {
          "string" != typeof duration && (duration += "ms");
          for (var i = 0; i < this.length; i++) {
            var elStyle = this[i].style;
            elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration
          }
          return this
        }, on: function (eventName, targetSelector, listener, capture) {
          function handleLiveEvent(e) {
            var target = e.target;
            if ($(target).is(targetSelector)) listener.call(target, e); else for (var parents = $(target).parents(), k = 0; k < parents.length; k++)$(parents[k]).is(targetSelector) && listener.call(parents[k], e)
          }
          
          var i, j, events = eventName.split(" ");
          for (i = 0; i < this.length; i++)if ("function" == typeof targetSelector || targetSelector === !1)for ("function" == typeof targetSelector && (listener = arguments[1], capture = arguments[2] || !1), j = 0; j < events.length; j++)this[i].addEventListener(events[j], listener, capture); else for (j = 0; j < events.length; j++)this[i].dom7LiveListeners || (this[i].dom7LiveListeners = []), this[i].dom7LiveListeners.push({
            listener: listener,
            liveListener: handleLiveEvent
          }), this[i].addEventListener(events[j], handleLiveEvent, capture);
          return this
        }, off: function (eventName, targetSelector, listener, capture) {
          for (var events = eventName.split(" "), i = 0; i < events.length; i++)for (var j = 0; j < this.length; j++)if ("function" == typeof targetSelector || targetSelector === !1) "function" == typeof targetSelector && (listener = arguments[1], capture = arguments[2] || !1), this[j].removeEventListener(events[i], listener, capture); else if (this[j].dom7LiveListeners)for (var k = 0; k < this[j].dom7LiveListeners.length; k++)this[j].dom7LiveListeners[k].listener === listener && this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
          return this
        }, once: function (eventName, targetSelector, listener, capture) {
          function proxy(e) {
            listener(e), dom.off(eventName, targetSelector, proxy, capture)
          }
          
          var dom = this;
          "function" == typeof targetSelector && (targetSelector = !1, listener = arguments[1], capture = arguments[2]), dom.on(eventName, targetSelector, proxy, capture)
        }, trigger: function (eventName, eventData) {
          for (var i = 0; i < this.length; i++) {
            var evt;
            try {
              evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: !0, cancelable: !0})
            } catch (e) {
              evt = document.createEvent("Event"), evt.initEvent(eventName, !0, !0), evt.detail = eventData
            }
            this[i].dispatchEvent(evt)
          }
          return this
        }, transitionEnd: function (callback) {
          function fireCallBack(e) {
            if (e.target === this)for (callback.call(this, e), i = 0; i < events.length; i++)dom.off(events[i], fireCallBack)
          }
          
          var i,
            events = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            dom = this;
          if (callback)for (i = 0; i < events.length; i++)dom.on(events[i], fireCallBack);
          return this
        }, width: function () {
          return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
        }, outerWidth: function (includeMargins) {
          return this.length > 0 ? includeMargins ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
        }, height: function () {
          return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
        }, outerHeight: function (includeMargins) {
          return this.length > 0 ? includeMargins ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
        }, offset: function () {
          if (this.length > 0) {
            var el = this[0], box = el.getBoundingClientRect(), body = document.body,
              clientTop = el.clientTop || body.clientTop || 0, clientLeft = el.clientLeft || body.clientLeft || 0,
              scrollTop = window.pageYOffset || el.scrollTop, scrollLeft = window.pageXOffset || el.scrollLeft;
            return {top: box.top + scrollTop - clientTop, left: box.left + scrollLeft - clientLeft}
          }
          return null
        }, css: function (props, value) {
          var i;
          if (1 === arguments.length) {
            if ("string" != typeof props) {
              for (i = 0; i < this.length; i++)for (var prop in props)this[i].style[prop] = props[prop];
              return this
            }
            if (this[0])return window.getComputedStyle(this[0], null).getPropertyValue(props)
          }
          if (2 === arguments.length && "string" == typeof props) {
            for (i = 0; i < this.length; i++)this[i].style[props] = value;
            return this
          }
          return this
        }, each: function (callback) {
          for (var i = 0; i < this.length; i++)callback.call(this[i], i, this[i]);
          return this
        }, html: function (html) {
          if ("undefined" == typeof html)return this[0] ? this[0].innerHTML : void 0;
          for (var i = 0; i < this.length; i++)this[i].innerHTML = html;
          return this
        }, text: function (text) {
          if ("undefined" == typeof text)return this[0] ? this[0].textContent.trim() : null;
          for (var i = 0; i < this.length; i++)this[i].textContent = text;
          return this
        }, is: function (selector) {
          if (!this[0])return !1;
          var compareWith, i;
          if ("string" == typeof selector) {
            var el = this[0];
            if (el === document)return selector === document;
            if (el === window)return selector === window;
            if (el.matches)return el.matches(selector);
            if (el.webkitMatchesSelector)return el.webkitMatchesSelector(selector);
            if (el.mozMatchesSelector)return el.mozMatchesSelector(selector);
            if (el.msMatchesSelector)return el.msMatchesSelector(selector);
            for (compareWith = $(selector), i = 0; i < compareWith.length; i++)if (compareWith[i] === this[0])return !0;
            return !1
          }
          if (selector === document)return this[0] === document;
          if (selector === window)return this[0] === window;
          if (selector.nodeType || selector instanceof Dom7) {
            for (compareWith = selector.nodeType ? [selector] : selector, i = 0; i < compareWith.length; i++)if (compareWith[i] === this[0])return !0;
            return !1
          }
          return !1
        }, index: function () {
          if (this[0]) {
            for (var child = this[0], i = 0; null !== (child = child.previousSibling);)1 === child.nodeType && i++;
            return i
          }
        }, eq: function (index) {
          if ("undefined" == typeof index)return this;
          var returnIndex, length = this.length;
          return index > length - 1 ? new Dom7([]) : index < 0 ? (returnIndex = length + index, new Dom7(returnIndex < 0 ? [] : [this[returnIndex]])) : new Dom7([this[index]])
        }, append: function (newChild) {
          var i, j;
          for (i = 0; i < this.length; i++)if ("string" == typeof newChild) {
            var tempDiv = document.createElement("div");
            for (tempDiv.innerHTML = newChild; tempDiv.firstChild;)this[i].appendChild(tempDiv.firstChild)
          } else if (newChild instanceof Dom7)for (j = 0; j < newChild.length; j++)this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
          return this
        }, prepend: function (newChild) {
          var i, j;
          for (i = 0; i < this.length; i++)if ("string" == typeof newChild) {
            var tempDiv = document.createElement("div");
            for (tempDiv.innerHTML = newChild, j = tempDiv.childNodes.length - 1; j >= 0; j--)this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0])
          } else if (newChild instanceof Dom7)for (j = 0; j < newChild.length; j++)this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
          return this
        }, insertBefore: function (selector) {
          for (var before = $(selector), i = 0; i < this.length; i++)if (1 === before.length) before[0].parentNode.insertBefore(this[i], before[0]); else if (before.length > 1)for (var j = 0; j < before.length; j++)before[j].parentNode.insertBefore(this[i].cloneNode(!0), before[j])
        }, insertAfter: function (selector) {
          for (var after = $(selector), i = 0; i < this.length; i++)if (1 === after.length) after[0].parentNode.insertBefore(this[i], after[0].nextSibling); else if (after.length > 1)for (var j = 0; j < after.length; j++)after[j].parentNode.insertBefore(this[i].cloneNode(!0), after[j].nextSibling)
        }, next: function (selector) {
          return new Dom7(this.length > 0 ? selector ? this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
        }, nextAll: function (selector) {
          var nextEls = [], el = this[0];
          if (!el)return new Dom7([]);
          for (; el.nextElementSibling;) {
            var next = el.nextElementSibling;
            selector ? $(next).is(selector) && nextEls.push(next) : nextEls.push(next), el = next
          }
          return new Dom7(nextEls)
        }, prev: function (selector) {
          return new Dom7(this.length > 0 ? selector ? this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
        }, prevAll: function (selector) {
          var prevEls = [], el = this[0];
          if (!el)return new Dom7([]);
          for (; el.previousElementSibling;) {
            var prev = el.previousElementSibling;
            selector ? $(prev).is(selector) && prevEls.push(prev) : prevEls.push(prev), el = prev
          }
          return new Dom7(prevEls)
        }, parent: function (selector) {
          for (var parents = [], i = 0; i < this.length; i++)selector ? $(this[i].parentNode).is(selector) && parents.push(this[i].parentNode) : parents.push(this[i].parentNode);
          return $($.unique(parents))
        }, parents: function (selector) {
          for (var parents = [], i = 0; i < this.length; i++)for (var parent = this[i].parentNode; parent;)selector ? $(parent).is(selector) && parents.push(parent) : parents.push(parent), parent = parent.parentNode;
          return $($.unique(parents))
        }, find: function (selector) {
          for (var foundElements = [], i = 0; i < this.length; i++)for (var found = this[i].querySelectorAll(selector), j = 0; j < found.length; j++)foundElements.push(found[j]);
          return new Dom7(foundElements)
        }, children: function (selector) {
          for (var children = [], i = 0; i < this.length; i++)for (var childNodes = this[i].childNodes, j = 0; j < childNodes.length; j++)selector ? 1 === childNodes[j].nodeType && $(childNodes[j]).is(selector) && children.push(childNodes[j]) : 1 === childNodes[j].nodeType && children.push(childNodes[j]);
          return new Dom7($.unique(children))
        }, remove: function () {
          for (var i = 0; i < this.length; i++)this[i].parentNode && this[i].parentNode.removeChild(this[i]);
          return this
        }, add: function () {
          var i, j, dom = this;
          for (i = 0; i < arguments.length; i++) {
            var toAdd = $(arguments[i]);
            for (j = 0; j < toAdd.length; j++)dom[dom.length] = toAdd[j], dom.length++
          }
          return dom
        }
      }, $.fn = Dom7.prototype, $.unique = function (arr) {
        for (var unique = [], i = 0; i < arr.length; i++)unique.indexOf(arr[i]) === -1 && unique.push(arr[i]);
        return unique
      }, $
    }()), swiperDomPlugins = ["jQuery", "Zepto", "Dom7"], i = 0; i < swiperDomPlugins.length; i++)window[swiperDomPlugins[i]] && addLibraryPlugin(window[swiperDomPlugins[i]]);
    var domLib;
    domLib = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, domLib && ("transitionEnd" in domLib.fn || (domLib.fn.transitionEnd = function (callback) {
      function fireCallBack(e) {
        if (e.target === this)for (callback.call(this, e), i = 0; i < events.length; i++)dom.off(events[i], fireCallBack)
      }
      
      var i, events = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
        dom = this;
      if (callback)for (i = 0; i < events.length; i++)dom.on(events[i], fireCallBack);
      return this
    }), "transform" in domLib.fn || (domLib.fn.transform = function (transform) {
      for (var i = 0; i < this.length; i++) {
        var elStyle = this[i].style;
        elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform
      }
      return this
    }), "transition" in domLib.fn || (domLib.fn.transition = function (duration) {
      "string" != typeof duration && (duration += "ms");
      for (var i = 0; i < this.length; i++) {
        var elStyle = this[i].style;
        elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration
      }
      return this
    }), "outerWidth" in domLib.fn || (domLib.fn.outerWidth = function (includeMargins) {
      return this.length > 0 ? includeMargins ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
    })), window.Swiper = Swiper
  }(), module.exports = window.Swiper
}, , , , , , , , , , , , , , , , , , , , , , , function (module, exports) {
}, , , function (module, exports, __webpack_require__) {
  "use strict";
  module.exports = {
    zh: [{
      catalogId: 0,
      catalogName: "开户相关",
      qaList: [{
        typeName: "",
        list: [{id: 1, title: "注册时的手机号可以更改吗？", context: "注册手机号为客户登陆账号，开户成功后是不能修改的，一个身份证只能开一个户，一个手机号也只能开一个户。"}, {
          id: 2,
          title: "身份证复印件可以开户吗？",
          context: "身份证复印件是不能开户的，临时身份证可以开户。建议客户可以去当地派出所办理临时身份证先使用。"
        }, {id: 3, title: "开户年龄限制", context: "开户需是年满18周岁，有完全行为能力的中华人民共和国公民。使用身份证进行开户！"}, {
          id: 4,
          title: "港澳台地区可以开户吗？",
          context: "中盈网目前不支持外国客户和港澳台客户开户。"
        },{
          id:5,
          title: "开户对银行有限制吗?",
          context: "对银行没有限制，客户注册时绑定出金银行卡，出金只能出到该卡。入金可使用开户人名下其他银行卡入金。"
        },{
          id:6,
          title: "可以用手机开户吗？",
          context: "中盈网支持手机开户，建议您使用手机浏览器打开注册页面。"
        },{
          id: 7,
          title: "注册后收不到验证码怎么办？",
          context: "情况一：被手机软件拦截，此情况您可以直接用注册手机号登录软件尝试登录。情况二：您当天收取中盈网短信验证码达到最高上限（上限十次），可更换手机或者第二天再注册。"
        }]
      }]
    }, {
      catalogId: 1,
      catalogName: "出入金相关",
      qaList: [{
        typeName: "",
        list: [{id: 1001, title: "客户的出入金时间？", context: "客户的的入金时间是工作日9:00--22:00，出金时间是工作时间9:00--21:30。"}, {
          id: 1002,
          title: "出入金有什么限制？",
          context: "出入金最低20美元，单笔最高6万美元，不限笔数。 单个账户入金上限50万美元（大客户可申请提高上限）。出金金额根据客户可提取自有资金提交。"
        }, {id: 1003, title: "手机软件支持出入金吗？", context: "手机软件出入金正在搭建中，暂时不能通过手机出入金。"}, {
          id: 1004,
          title: "U盾没有反应？支付失败是怎么回事？",
          context: "建议客户重新启动电脑，换USB接口，插入U盾，重新试一下。或者拨打银行电话，告知具体的错误代码获得帮助。"
        }, {
          id: 1005,
          title: "出入金到账时间？",
          context: "一般会在5分钟内处理完成，并发送短信通知您。具体出入金到账时间具体要以各个银行的实际处理速度为准！"
        },{
          id: 1006,
          title: "账户资金是美元，购买非美元品种汇率如何换算？",
          context: "中盈网是以相同且固定的汇率转换。避免汇率波动影响您的收益。"
        },{
          id: 1007,
          title: "出入金汇率",
          context: "中盈网入金和出金汇率是固定的，避免汇率波动影响您的收益。"
        }]
      }]
    }, {
      catalogId: 2,
      catalogName: "资金安全及资质",
      qaList: [{
        typeName: "",
        list: [{id: 2001, title: "交易资金是否安全？", context:"交易资金均存管于清算机构账户内，如美国花旗银行、渣打银行、美国富国银行等，同时受美国证券交易委员会（SEC）监管，SIPC(美国证券投资者保护公司)保护。如果清算公司破产无法返还客户财产，SIPC 有责任返还客户资产。"}, {
          id: 2002,
          title: "我的账户为什么不能像A股一样银转证，证转银？",
          context:"您所说的银转证或证转银（三方存管）是中国特色的资金管理方式。美国证券市场的监管非常的严格和完善，所有美国证券公司都是采取同样的资金管理方式，资金安全请您放心。"
        }, {id: 2003, title: "什么是互联网券商？", context: "互联网券商是通过自主研发的交易软件，对接境外大型券商，我们的软件有国家版权局颁发的专利证书，简单、安全、快捷、流畅，支持客户一个账户、一笔资金、一款软件即可交易股票、期货、外汇等主流交易品种，所有的客户订单直达交易所。"}]
      }]
    }, {
      catalogId: 3,
      catalogName: "隐私安全",
      qaList: [{
        typeName: "",
        list: [{
          id: 3001,
          title: "如何保护个人信息？",
          context: "为了保护您的个人信息，防范未经授权的访问和使用，我们将采取法律要求的安全措施，这些措施包括：电脑防护，加密文件以及安全办公楼。除非法律法规要求，否则我们不会将个人、非公开信息披露给第三方。例如，在其它原因下我们可能披露或报告这类信息：在有必要授权、完成、监管或执行您所要求或授权的交易的时候；维护及监管您的账户；向您提供账户确认、账单和记录；维持正确的档案记录；在我们相信根据相应的法律、法则或规章披露是必需的时候；与执法机关或监管或自监管组织合作；执行我们的客户协议及其它协议；满足我们的责任，或保护我们的权利及财产。"
        }, {id: 3002, title: "可能会收集的用户个人信息内容", context: "身份信息、住址信息和银行卡信息。"}]
      }]
    }, {
      catalogId: 4,
      catalogName: "账户安全",
      qaList: [{
        typeName: "",
        list: [{
          id: 4001,
          title: "我的账户和密码如何保证安全？",
          context: "中盈网采用多项世界领先的标准安全和加密技术，以确保用户资料、密码、交易资产数据在使用过程中不会造成数据泄漏。同时，使用专业的DDOS防御系统和入侵检测系统，实时发现攻击和入侵行为，保证用户数据安全。"
        }, {
          id: 4002,
          title: "我的账户密码泄露了怎么办？",
          context: "您可拨打24小时客服电话获得帮助，在核对您的身份后，我们会及时帮您重置密码。"
        },{
          id: 4003,
          title: "账户可以多点登录吗？",
          context: "为了保证您的账户安全，中盈网软件不支持多点登录。包括手机端和PC端。"
        },{
          id: 4004,
          title: "如何更改密码？",
          context: "账户入金激活后，方可修改密码。"
        }]
      }]
    }, {
      catalogId: 5,
      catalogName: "软件相关",
      qaList: [{
        typeName: "",
        list: [{
          id: 5001,
          title: "服务器例行维护时间",
          context: "因美国时间周一至周四上午8:30-8:40（北京时间：周一至周四20:30-20:40）是美国券商例行的服务器重启维护时间，再此期间您的交易可能会受到影响，如果您的订单出现《已接收》状态，请撤单后再重新下单。否则，你的其他委托及平仓操作都无法成功提交。"
        }, {
          id: 5002,
          title: "中盈网手机版本有止盈止损吗？",
          context: "手机端止盈止损正在搭建中，暂时不支持手机止盈止损。"
        }, {
          id: 5003,
          title: "止损或者止盈触发，为什么不是以止盈或者止损的价格成交?",
          context: "止盈止损的下单方式为市价单，撮合制交易规则以时间优先、价格优先的原则撮合成交。所以成交价格以实际成交为准，止盈止损价格只是触发的条件，并不能作为成交的依据。"
        }, {
          id: 5004,
          title: "止盈止损是当天有效还是长期有效?",
          context: "止盈止损是当天有效（6:00-5:00）。"},{
          id: 5005,
          title: "中盈网手机版对手机有什么要求吗？",
          context: "苹果端需要iOS 8.0及以上版本，安卓端需要安卓4.4及以上版本。"
        }, {
          id: 5006,
          title: "强平规则",
          context: "中盈网账户均是保证金账户，所有品种都是以保证金的方式交易，为了控制您的风险。当风险度＜0.75时您的持仓会被强平，直至风险度≥0.75。如果您同时持有股票、期货、伦敦金银货币对时，先平期货、再平伦敦金银货币对、最后平股票。"
        }, {
          id: 5007,
          title: "平仓键如何使用？",
          context: "客户如果持有多笔持仓，平仓是平掉当前选中的持仓，如果当前选中的持仓是多笔持仓，平仓键将选中的多笔持仓一次全平。如果您想逐笔平仓，可以选择对冲平仓的方式。持有多单可以下空单也就是卖出逐笔平仓。持有空单可以下多单也就是买入逐笔平仓。"
        }, {
          id: 5008,
          title: "中盈能否可以指价建仓？",
          context: "中盈网所有品种均为撮合成交，市场供需决定成交价格，所有订单均市价进场，不能指价建仓。"
        }]
      }]
    }, {
      catalogId: 6,
      catalogName: "股票",
      qaList: [{
        typeName: "",
        list: [{
          id: 6001,
          title: "最小交易单位",
          context: "A股最小交易单位1手（100股）；港股最小交易单位1手（价格不同股数不同）；美股最小交易单位1股。"
        },{
          id: 6002,
          title: "为什么A股、港美股只有部分股票？",
          context: "中盈网为您精选了沪深两市和港美股中优质的蓝筹股，大盘股，绩优股；这些股票流动性好，关注度高，适合价值投资，方便您的投资理财、全球资产配置。"
        },{
          id: 6003,
          title: "为什么股票也会有强平？",
          context: "中盈网为您开设的是保证金账户，一个账户一笔资金即可交易股票、期货、外汇、ETF基金等全品种，所以为了控制风险，当您的风险度＜0.75时，会触发强平。强平顺序为强平当时所开盘股票的所有持仓。例如港股开盘时间，当您的风险度＜0.75，您的港股持仓会被一次性全部强平。"
        },{
          id: 6004,
          title: "港美股的融资融券（2倍杠杆买涨买跌）",
          context: "融资交易是投资者以自己账户的资金作为质押，向券商借入更多资金用于证券买入，券商为您提供2倍的杠杆进行交易。例如购买10000美元的阿里巴巴股票，您只需要5000美元的保证金即可交易。融券交易是投资者以资金作为质押，向券商借入证券卖出，在随后的某个时间，买入相同数量和品种的证券归还券商，券商为您提供2倍的杠杆进行交易，例如卖出10000美元的阿里巴巴股票，您只需要5000美元的保证金即可交易。"
        }, {
          id: 6005,
          title: "港美股交易规则",
          context: "港美股与A股不同。没有涨跌幅限制，可以买涨买跌，而且支持当天买卖（T+0交易）。"
        }, {
          id: 6006,
          title: "A股交易时间",
          context: "北京时间上午9:30-11:30；下午13:00-15:00。"
        }, {
          id: 6007,
          title: "港股交易时间",
          context: "北京时间上午09:30-12:00；下午13:00-16:00。"
        }, {
          id: 6008,
          title: "美股交易时间",
          context: "夏令时21：30－次日4：00（北京时间）；冬令时22：30－次日5：00（北京时间）。"
        }]
      }]
    }, {
      catalogId: 7,
      catalogName: "期货",
      qaList: [{
        typeName: "",
        list: [{
          id: 7001,
          title: "什么是期货？",
          context: "期货通常指的是一份合约。由期货交易所统一制定，在将来某一特定时间和地点交割一定数量标的物的标准化合约。标的物可以是某种商品，如原油或者黄金白银，也可以是某个金融工具，如外汇或者股指等。"
        }, {id: 7002, title: "最小交易单位", context: "期货最小交易单位1手（1张合约）。"}, {
          id: 7003,
          title: "期货交易规则",
          context: "期货交易均在交易所内撮合成交，跟国内的A股交易是一样的。期货采用保证金交易的方式，只需要小部分资金就可以拥有期货合约，并且可以根据市场行情随时买卖（T+0），可以买涨也可以买跌。非常灵活。"
        }, {id: 7004, title: "期货最后交易日是哪天？", context: "不同期货品种不同合约最后交易日可能不同，在临近最后交易日时券商会提前通知平仓，请留意我们的软件通知。"}, {
          id: 7005,
          title: "为什么要在最后交易日前提前平仓？",
          context: "持仓至最后交易日会进入交割期，为了避免普通投资者无法履行交割义务，券商通常会在最后交易日前提醒客户提前平仓，超期将会强平以控制交割风险。请留意我们的软件通知，我们会提前通知您。"
        }, {id: 7006, title: "期货强平规则", context: "当风险度＜0.75开始逐手强平，直至维持风险度≥0.75。"}, {
          id: 7007,
          title: "期货合约到期了，但是盘面还是有这个期货的显示？",
          context: "合约最后交易日结束后会更换下一期合约。"
        },{
          id: 7008,
          title: "什么是主力合约？",
          context: "主力合约并不固定，是按照交易量来区分的。当月交易量最大的合约就是主力合约，主力合约成交量大，交易活跃。我们强烈建议您交易主力合约。"
        },{id: 7009, title: "同一份期货合约可以同时持有多空单锁仓吗？（锁仓）", context: "国际期货平仓方式是对冲平仓，多单平仓就是空单，空单平仓就是多单，与国内的期货规则不同！"}, {
          id: 70010,
          title: "期货交易时间",
          context: "黄金、原油、白银和外汇期货交易时间：<br>夏令时 6:00-5:00（北京时间）；<br>冬令时 7:00-6:00（北京时间）；<p>&nbsp;</p>恒生指数期货交易时间：<br>上午&nbsp;9:15-12:00（北京时间）<br>下午&nbsp;13:00-16:30（北京时间）<br>晚上&nbsp;17:15-23:45（T+1）。"
        }]
      }]
    }, {
      catalogId: 8,
      catalogName: "伦敦金银货币对",
      qaList: [{
        typeName: "",
        list: [{
          id: 8001,
          title: "最小交易单位",
          context: "外汇货币对、伦敦金银最小交易单位为0.1手（1手=100000元）。"
        }, {
          id: 8002,
          title: "交易机制",
          context: "中盈网的伦敦金银货币对交易都是通过全球最大的互联网券商的底层清算通道直接进入国际市场，撮合成交。无人为“点差”和“滑点”，更没有止盈止损限制。我们对接的券商每天处理着上百万笔交易，成交活跃。报价来自全球各主要银行间报价，精确至十分之一个基点。"
        }, {
          id: 8003,
          title: "交易时间",
          context: "全天24小时  （ 周一05:15到周六05:00）。"
        }]
      }]
    }],
    en: [{
      catalogId: 0,
      catalogName: "Account Opening Guide",
      qaList: [{
        typeName: "",
        list: [{
          id: 1,
          title: "What are the trading categories that a Webull trading account covers?",
          context: "Currently, it covers stocks and ETFs of United States, Hong Kong, United Kingdom, Germany and Singapore."
        }, {
          id: 2,
          title: "Is the account opening free? What are the requirements?",
          context: "Yes, it is free of charge. For the Chinese mainland users, photos of both front and back sides of the ID cards are needed; for users from other regions, photos of identity proof documents (passport, driver's license, ID card, etc.) and photos of address proof (driver's license, bills, etc.) are needed."
        }, {id: 3, title: "How to open a Webull trading account?", context: __webpack_require__(83)}, {
          id: 4,
          title: "What is the invitation code when opening an account?",
          context: "The invitation code is used to record the corresponding relationship between the inviting person and the invitee. Webull provides both sides with benefits in the form of commission discounts (The benefits are offered from time to time. Webull reserves the final interpretation right for the benefits offer)."
        }]
      }]
    }, {
      catalogId: 1,
      catalogName: "About Funding",
      qaList: [{
        typeName: "Deposit",
        list: [{
          id: 1001,
          title: "Which currencies are eligible for deposit?",
          context: "Currently, only the US dollar is eligible for deposit."
        }, {
          id: 1002,
          title: "Which bank cards are eligible and what are the requirements?",
          context: "<p>Bank debit cards through which international transfers can be made are eligible. The name of the bank card account must be the same as the name of the Webull trading account. Bank cards of others are not allowed for deposit.</p><p>For the Chinese mainland users, overseas bank cards (China Merchants Bank Hong Kong card, ICBC Asia Hong Kong card, etc.)are preferred. For mainland bank cards, those issued by China Construction Bank and Industrial and Commercial Bank of China are preferred.</p>"
        }, {
          id: 1003,
          title: "Are there any limits on the amount of deposit?",
          context: "The first deposit amount should be no less than 2,000 US dollars, with no maximum limit. There is no limit for non-first deposit. For special cases, please contact Webull customer service."
        }, {id: 1004, title: "Are there fees for deposit?", context: __webpack_require__(91)}, {
          id: 1005,
          title: "What is the deposit process? How long can the funds be transferred to the trading account?",
          context: "<p>Please refer to the Deposit Guide within the Webull APP. It includes three steps:</p><p>1. Purchase US dollars (if you already have US dollars, you can skip this step);</p><p>2. Complete wire transfer from a same-name bank account to the designated payee (refer to the information displayed within the APP);</p><p>3.Fill in the remittance amount and other information within the APP and notice Webull.</p><p>Following completion of the above three steps, generally funds can be transferred to your Webull trading account within one working day. The funds can be traded upon arrival to the account.</p>"
        }]
      }, {
        typeName: "Withdrawal",
        list: [{
          id: 1006,
          title: "Which currencies are eligible for withdrawal?",
          context: "Currently, only the US dollar is eligible for withdrawal."
        }, {
          id: 1007,
          title: "What are the requirements for the withdrawal bank? Are there any matters to be noted?",
          context: "The bank account holder for withdrawal must have the same name as the trading account. Please check in advance the withdrawable amount for the day, which can be affected by stock trading, settlement, delivery etc. In addition, it should be noted that during holidays and closed periods, banks do not handle the funds business, so please arrange the withdrawal time in advance."
        }, {
          id: 1008,
          title: "What is the withdrawal process? How long can the funds be transferred out of the trading account?",
          context: "Please refer to the Withdrawal Guide within the Webull APP. Fill out the withdrawal notice, and Webull staff will confirm with you the withdrawal amount before completing the follow-up withdrawal process. Within 1-3 working days, funds can be transferred from your trading account to a designated bank account."
        }, {
          id: 1009,
          title: "Are there fees for withdrawal?",
          context: "<p>In addition, if you need to transfer funds through intermediary bank, then the intermediary bank may charge a certain amount.</p>\n                          <p>For the Interactive Brokers account: the first deposit of each month is free. After that $10 will be charged by Interactive Brokers each time, Webull do not charge any fee.</p>\n                          <p>For Saxo Bank account: no charge from Saxo and Webull.</p>"
        }]
      }, {
        typeName: "Multi-currencies",
        list: [{
          id: 1011,
          title: "What is currency exchange?",
          context: "Currency exchange refers to the converting between the main currency of the trading account and other currencies at real time exchange rates. Once a deposit is made, it can be converted into different currencies to invest in different markets, such as the exchange of US dollars into Hong Kong dollars to trade Hong Kong stocks."
        }, {
          id: 1012,
          title: "What are the fees charged for currency exchange?",
          context: "The charge rate for currency exchange is 0.002%, with the minimum at $2, namely $2 for exchange amounts less than $ 100,000, and the charge rate is set at 0.002% when the amount is more than $ 100,000."
        }]
      }]
    }, {
      catalogId: 2,
      catalogName: "Commission Rates",
      qaList: [{
        typeName: "",
        list: [{
          id: 2001,
          title: "What are the commissions charged for US stocks?",
          context: __webpack_require__(92)
        }, {id: 2002, title: "What are other fees charged for US stocks?", context: __webpack_require__(93)}, {
          id: 2003,
          title: "What are other fees charged for Hong Kong stocks?",
          context: __webpack_require__(94)
        }]
      }]
    }, {
      catalogId: 3,
      catalogName: "Account Transfer Guide",
      qaList: [{
        typeName: "",
        list: [{
          id: 3001,
          title: "How to transfer from Bank of China International to Webull?",
          title_link: "https://activity.webull.com/transfer/zhongyin.html"
        }, {
          id: 3002,
          title: "How to transfer from Futu Securities to Webull?",
          title_link: "https://activity.webull.com/transfer/futu.html"
        }, {
          id: 3003,
          title: "How to transfer from Tiger Brokers to Webull?",
          title_link: "https://activity.webull.com/transfer/tiger.html"
        }, {
          id: 3004,
          title: "How to transfer from First Trade to Webull?",
          title_link: "https://activity.webull.com/transfer/firstrade.html"
        }]
      }]
    }, {
      catalogId: 4,
      catalogName: "US Stocks Trading",
      qaList: [{
        typeName: "Market Overview",
        list: [{
          id: 4001,
          title: "What are the major exchanges for US stocks?",
          context: "<p>The main stock exchanges are:</p><p>1. New York Stock Exchange (NYSE): the US stock exchange with the largest total market capitalization; the exchange has approximately 2800 listed companies, with the total market capitalization reaching 28 trillion (May 2017 data).</p><p>2. Nasdaq Stock Exchange (NASDAQ): the US stock exchange with the largest number of listed companies and the largest trading volume; a total of about 5400 companies are listed and traded here.</p><p>3. American Stock Exchange (AMEX): the third largest stock exchange in the United States; stocks of small and medium-sized market value companies are mainly traded here.</p><p>4. OTC Trading: compared with exchange transactions, OTC trading does not have a fixed place. Transactions are completed at the trading counters of the agencies and the trading rules are relatively flexible.</p><p>5. Pink Sheet Market (PK): a place of stocks trading for those who do not meet the conditions to be listed on exchanges. Most of the stocks are mandatorily de-listed because they do not meet the relevant requirements of exchange transactions or OTC transactions.</p><p>Webull currently does not support OTC and PK exchange stock trading.</p>"
        }, {
          id: 4002,
          title: "What are the major regulators for US stocks?",
          context: "<p>The main regulators are:</p><p>1. SEC (US Securities and Exchange Commission): established under the Securities Act of 1934, it is an independent quasi-judicial agency directly under the United States federal system. Responsible for the supervision and regulation of US securities, it is the highest institution of the US securities industry.</p><p>2. FINRA (US Financial Industry Authority): established in 2007, it is the largest independent non-governmental securities industry self-regulatory agency. It regulates 4400 brokerage firms, 163,000 branch offices and 630,000 registered securities representatives. The FINRA is also under the supervision of the SEC.</p><p>3. SIPC (Securities Investor Protection Corporation): a nonprofit company established by the US Congress to protect clients of a broker when the securities broker is in bankruptcy.</p>"
        }]
      }, {
        typeName: "Trading Hours",
        list: [{
          id: 4003,
          title: "What is the trading time of US stocks?",
          context: "<p>Regular trading hours:</p><p>US Eastern Time (EST) Monday to Friday 9:30 - 16:00; </p><p>corresponding to 22:30 - 5:00 the next day Beijing time for US winter time (November - March the following year); </p><p>and 21:30 - 4:00 the next day Beijing time for US Daylight Saving Time (March - November).</p>"
        }, {
          id: 4004,
          title: "Can I place an order at non-trading hours?",
          context: "Yes, the order will automatically wait for execution until the next trading day."
        }, {
          id: 4039,
          title: "What's extends hours trading?",
          context: "Extended hours trading includes both pre-market and after hours sessions each day the market is open. Extended hours trading allows investors to act quickly to news and events that occur when the regular market is closed."
        }, {
          id: 4005,
          title: "Does Webull support before- and after-hours trading?",
          context: "<p>Yes.</p><p>Time for before-hours trading is:</p><p>US Eastern Time (EST) Monday to Friday 4:00 - 09:30;</p><p>corresponding to 17:00 - 22:30 Beijing time for US winter time (November - March the following year)</p><p> and 16:00 - 21:30 Beijing time for US Daylight Saving Time (March - November).</p><p>Time for after-hours trading is:</p><p>US Eastern Time (EST) Monday to Friday 16:00 - 20:00;</p><p>corresponding to 5:00 - 9:00 the next day Beijing time for US winter time (November - March the following year);</p><p>and 4:00 - 8:00 the next day Beijing time for US Daylight Saving Time (March - November).</p>"
        }, {
          id: 4030,
          title: "What is the trading time of the Hong Kong stock market?",
          context: __webpack_require__(95)
        }, {id: 4031, title: "What is the pre-opening period?", context: __webpack_require__(96)}, {
          id: 4032,
          title: "What is the continuous trading session?",
          context: 'On each trading day, 9:30 am to 12:00 noon, and 1:00 to 4:00 pm is the continuous trading session of the securities market. In the continuous trading hours, the trading system will match orders one by one with the principle of price priority, and following the time sequence of the input of orders into the system. Orders input at an earlier time must be fully executed before orders at the same price but input at a later time are processed. During the continuous trading hours, the trading system only accepts the "Limit Order", "Enhanced Limit Order" and "Special Limit Order". You can choose to add "full or immediate cancellation" instructions so that if the order cannot be completed fully at one time, the order will be canceled entirely and will not be kept in the system. In addition, the order price input into the trading system (i) cannot deviate by 9 times or more and less than one-ninth or less from the nominal price (if any) and (ii) is subject to the quote rules (except those exempt). At the same time, the number of each order shall not exceed 3,000 lots.'
        }, {id: 4033, title: "What is the closing auction trading session?", context: __webpack_require__(97)}]
      }, {
        typeName: "Common terms",
        list: [{
          id: 4006,
          title: "Net assets",
          context: "It’s the sum of stock market value and balance funds. If you hold US stocks, Hong Kong stocks, US dollars, Hong Kong dollars, it will be displayed in US dollars with all the assets converted based on the exchange rate at the time. For example, the current stock market value is $ 10,000 and the balance funds are $ 20,000, then the net asset is $ 10,000 + $ 20,000 $ = $ 30,000. As the stock market value fluctuates with the latest quotes, so does the net asset, which is a normal phenomenon."
        }, {
          id: 4007,
          title: "Floating profit and loss (rate)",
          context: "Also known as positions profit and loss, or unrealized profit and loss; it refers to the potential profit and loss (rate) calculated based on the latest price and the initial cost of the stock. For example, for the position of 1000 shares of A shares, the cost price is $10, the current latest price is $12, then the floating profit and loss is 1000 * (12-10) = $2000, floating profit and loss rate is 2000 / (1000 * 10) = 20%"
        }, {
          id: 4044,
          title: "Realized P&L",
          context: "Realized P&L (Profit and Loss) refers to profit or loss on a completed trade.  This means a position which has been initiated and then closed.  It also includes any and all fees and commissions associated with the transaction. "
        }, {
          id: 4008,
          title: "Market value of positions",
          context: "It’s the sum of the current market value of the stock positions, with the long positions market value taking positive and short positions market value taking negative. For example, holding 100 shares of A stock (the latest price at $10) long positions, 100 shares of B stock (the latest price at $20) short positions, then the market value of the positions is: 100 * $10 - (100 * $20) = -$1000 "
        }, {
          id: 4009,
          title: "Balance of funds",
          context: "It’s the total cash amount of the account, including the funds obtained from short sale, with the financed funds deducted. For example, the user has $ 1,000 in cash at the beginning, then sells 100 shares of A stock at a price of $10 and buys 200 shares of B stock at $20, then the balance is: 1000 + 10 * 100-20 * 200 = -$2000."
        }, {
          id: 4010,
          title: "Unsettled interest",
          context: '<p>It’s a result of margin trading that has not yet cleared the interest; the clearing takes places once a month, usually after the end of the last trading day of each month. There are several sources of the unsettled interest: </p><p>1. Financing to buy stocks.</p><p>2. The account has only US dollars, but it has purchased Hong Kong stocks, then automatic financing of Hong Kong dollars in the corresponding amount takes place. </p><p>When the "multi-currency funds" shows negative for settled funds of a currency, it means that the financing has taken place and the interest is generated on a daily basis and will be settled on a monthly basis.</p>'
        }, {
          id: 4011,
          title: "Margin buying power",
          context: "The amount of money available to buy stocks calculated with the eligible leveraged ratio based on current funds and the holding positions. Note that because each stock has a different degree of risk, not every stock can be purchased in margin trading, and the leverage ratio for different stocks is different, with the current maximum leverage ratio at 4 times."
        }, {
          id: 4012,
          title: "Margin status",
          context: "It’s the relationship between the margin maintenance and the current net assets after financing. When the market value fluctuation of positions causes the net asset to fall below the maintenance margin, for the purpose of risk control, the clearing house will automatically close some of the positions randomly so that the net assets meet the requirements for maintaining the margin."
        }, {
          id: 4013,
          title: "Multi-currency funds",
          context: "Funds of different currencies and the market value of positions under the current account."
        }, {
          id: 4014,
          title: "Proportion of holding positions",
          context: "It’s the market value of holding positions of a stock / (market value of all stock positions + cash)."
        }, {
          id: 4040,
          title: "Initial Margin",
          context: "A risk control value of Interactive Brokers. It refers to the percentage of the purchase price of securities that an investor must pay for is called the initial margin. In the United States, the Fed's Regulation T allows investors to borrow up to 50 percent of the price of the securities to be purchased on margin. To buy securities on margin, the investor must first deposit enough cash or eligible securities with a broker to meet the initial margin requirement for that purchase."
        }, {
          id: 4041,
          title: "Maintenance Margin",
          context: "A risk control value of Interactive Brokers. Once an investor has started buying a stock on margin, the NYSE and FINRA require that a minimum amount of equity be maintained in the investor's margin account. These rules require investors to have at least 25% of the total market value of the securities they own in their margin account. This is called the maintenance margin. For market participants identified as <a href='/helpDetail?id=4042'>pattern day traders</a>, the maintenance margin requirement is a minimum of $25,000 (or 25% of the total market value of the securities, whichever is higher)."
        }, {
          id: 4045,
          title: "Excess Liquidity",
          context: "This value shows your margin cushion, before liquidation. Once this value becomes negative, forced liquidation will be performed."
        }, {
          id: 4046,
          title: "Special Memorandum Account",
          context: "On a real-time basis, we check the balance of a special account associated with your Margin securities account called the Special Memorandum Account (SMA). We calculate a running balance of your SMA throughout the trading day, then enforce Regulation T initial margin requirements at the end of the trading day. No cash withdrawal will be allowed that causes SMA to go negative on a real-time basis."
        }, {
          id: 4042,
          title: "Pattern Day Trader",
          context: "PDT for short, refers to someone who effects 4 or more Day Trades within a 5 business day period. A trader who executes 4 or more day trades in this time is deemed to be exhibiting a ‘pattern’ of day trading and is thereafter subject to the PDT restrictions."
        }, {
          id: 4043,
          title: "Available Margin",
          context: "A risk control value of Saxo Bank. It refers to the amount of collateral available for margin trading. When this value equals to 0, creation of new position is not allowed, at the meantime, forced liquidation may be caused."
        }]
      }, {
        typeName: "Trading Rules",
        list: [{
          id: 4015,
          title: "What is the minimum trading unit for US stocks?",
          context: "The minimum trading unit is 1 share, that is, one can only buy 1 share."
        }, {
          id: 4016,
          title: "Are there any fluctuation limits for US stocks?",
          context: "There are no single-day limits for gains and losses, so investors have to control the risk."
        }, {
          id: 4017,
          title: "Does US stocks have a circuit breaker mechanism?",
          context: "Yes, the US stock market implements a three-stage circuit breaker mechanism. Take the S & P 500 index as an example, when the index falls by 5%, it will temporarily stop trading for 15 minutes; when the index falls by 10%, it will stop trading for 1 hour; when the index plunges by 20%, the stock market will be closed for 1 day."
        }, {
          id: 4018,
          title: "What is the meaning of the stock split and reverse stock split of US stocks?",
          context: "<p>It's allowed to split and merge shares of listed companies for US stocks.</p><p>Split means the stock is divided with the number of shares increased and the stock price lowered, but the total value remains the same.</p><p>Reverse process of the split means merger of multi-shares into 1 share, in which case, total value of the stock held by shareholders remain the same, but the number of shares is reduced.</p>"
        }, {
          id: 4019,
          title: "What is the policy of dividend payout for US stocks?",
          context: "<p>The US stock market is a mature one that pays out quarterly dividends according to international practice. 50-70% of the annual profits made by listed companies are paid out in cash dividends. Investors involved in dividend payout need to follow track of 4 dates:</p><p>Declaration Date: on the date of the announcement, the board of directors announces the dividend scheme, and also announces the Ex-dividend date and payment date. </p> <p>Record Date: it's the date of registration of shareholders; the company will record the list of shareholders to pay dividends. If you hope to receive dividend, your name must be registered in the company's roster and you must buy the stock on or before the record date. </p><p>Ex-Dividend Date: on this day, opening price will be adjusted (dividend has been excluded from the stock price); Note: one must hold the stock before the ex-dividend date; buying the stock on this day gives you no entitlement to dividend. But dividend will be paid out for sales of the stock made on or after the date.</p><p>Payment Date: The date on which the dividend is paid to the shareholders.</p>"
        }, {
          id: 4034,
          title: "What are the order quotation rules and price spreads of the Hong Kong Stock Exchange?",
          context: __webpack_require__(98)
        }, {
          id: 4035,
          title: "As a trading unit for securities trading, what is the number of shares per one “lot”? Can “odd lot”, shares less than one lot, be traded at the exchange?",
          context: '"Lot" is a Hong Kong stock market term, that is, a trading unit. Unlike the Mainland market, where each trading unit is 100 shares, in Hong Kong, the trading units of each listed securities are determined by the issuers themselves. Securities less than a complete trading unit (i.e. a complete one lot) are called “odd lot” in the Hong Kong market. Although the Hong Kong Stock Exchange trading system does not offer auto-match trading for odd lots, the system has set a special trading unit market for their trading. Exchange participants can place orders on a designated page of the trading system for other exchange participants to match on their own. In general, due to less liquidity, share prices of odd lots will be slightly lower than those of the complete trading units of the same stock.'
        }, {
          id: 4036,
          title: "Can Hong Kong stocks be traded intraday (T + 0)? Is there a limit on times?",
          context: "Yes, Hong Kong stocks are eligible for T+0 transactions. Stocks bought on the day can be sold the same day; the stock shorted the day can be bought and closed the same day. There is no daily limit of times on T+0 transactions for Hong Kong stocks, and they do not take up the number of times for US stocks T+0 trading."
        }, {
          id: 4037,
          title: "Can Hong Kong stocks be eligible for margin trading? What are the conditions?",
          context: "Hong Kong stocks are eligible for margin trading, as long as the total assets of the account are more than 2,000 US dollars. In the case of margin trading Hong Kong stocks, the ratio of financing levers for each stock is different depending on their respective risk grades; the maximum is four times while the minimum may be margin trading not allowed. Most of Hong Kong stocks with good liquidity are eligible for margin trading, but the specific market conditions prevail."
        }]
      }, {
        typeName: "Order Type",
        list: [{
          id: 4020,
          title: "What are the order types that Webull offers?",
          context: "It offers market orders, limit orders, stop orders, and stop limit orders."
        }, {
          id: 4022,
          title: "What is a market order?",
          context: "It means execution at the current market price. It is mainly used in cases to ensure rapid execution, but does not guarantee the execution price, especially when the market is highly volatile, or for trading stocks that are not active. The execution price is often significantly deviated from the current price, so investors need to be wary of the risk."
        }, {
          id: 4023,
          title: "What is a limit order?",
          context: "Set the execution price in the order, only execute when reaching the specified or better prices. Limit orders are mainly used in cases to ensure the execution price, but cannot guarantee the execution time. Once the direction of the stock is determined, it would go at a very fast pace, but the volume and execution time is uncertain, in which case, use of limit orders may lead to missed opportunities in the market."
        }, {
          id: 4024,
          title: "What is a stop order?",
          context: "A stop price is set in the order. Once the stock price reaches the set stop price, it will be executed on the market order. It does not guarantee 100% order success, nor success of the execution. Lack of purchasing power, or lack of positions will lead to failure in triggering the orders. Triggered orders do not mean that they are executed. Stop orders are merely submitting limit orders automatically on behalf of investors when the system detects the trigger price has been reached. The triggered orders, like ordinary orders, will be automatically canceled after closing of the day if there is no match. When a real order is generated upon trigger of a stop order, the real order will have no actual association with the stop order; deleting the stop order will not have any impact on the real order."
        }, {
          id: 4025,
          title: "What is a stop limit order?",
          context: "A stop price and a limit price are set in the order. Once the stock price reaches the set stop price, the order will be placed as a limit order. The difference between a stop order and a stop limit order is that the stop order will guarantee that the order can be executed as soon as possible, but does not guarantee the price of the transaction; while the stop limit order will be placed in the form of limit orders to ensure that the transaction price is equal to or better than the customer’s set limit price, but it does not guarantee execution."
        }]
      }, {
        typeName: "T + 0 Trading",
        list: [{
          id: 4026,
          title: "What is T + 0 trading?",
          context: "<p>T+0 trading, also known as intraday trading, refers to investors buy and sell the position of a stock in the same trading day. For example, on one day, two batches of X shares are purchased, and then they are all sold out on the same day, which are counted as 2 times of trading within the day. Meanwhile, Y shares are bought and sold on the same day and this is counted as 1 time of trading.</p><p>The US Securities and Exchange Commission stipulates that when the net worth of the account is less than US $25,000, the account will only allow three times of intraday trading for five consecutive trading days. When the net assets of the account are more than US $ 25,000, the account can trade in unlimited times.</p>"
        }, {
          id: 4027,
          title: "Does Webull offer T+0 trading?",
          context: "<p>Yes.</p>\n                         <p>For Saxo Bank account: there is no limit.</p>\n                         <p>For the Interactive Brokers account: Investors need to pay attention to the eligible times of T+0 trading. Webull will give a prompt when the eligible time of T +0 transactions is 0, in which case, insisting on trading would violate the SEC's PDT (Pattern Day Trader) rule, and stock trading will be frozen for 90 days until deposit of the investor's account is made up to $ 25,000.</p>"
        }]
      }, {
        typeName: "Settlement and Delivery",
        list: [{
          id: 4028,
          title: "What is the delivery and settlement mechanism of US stocks?",
          context: "US stocks implement the T+3 delivery system, which means settlement and delivery won’t be completed until after the third business day of the transaction."
        }, {
          id: 4029,
          title: "Can the unsettled funds be used to buy stocks?",
          context: "Unsettled funds can be used to buy stocks but cannot be withdrawn."
        }, {
          id: 4038,
          title: "What is T + 2? Does the investor only pay for the securities purchased or receive the proceeds from the sale of securities on the day of T + 2?",
          context: 'A participant (i.e. a broker) who has matched or declared a transaction through the trading system of the Hong Kong Stock Exchange must prepare enough shares before 3:45 pm on the second settlement date after the trading day (T) to complete the securities settlement in the CCASS. The relevant financial settlement will be completed on the same day, which is generally referred to as "T+2".'
        }]
      }]
    }, {
      catalogId: 5,
      catalogName: "CFD",
      qaList: [{
        typeName: "",
        list: [{
          id: 5001,
          title: "What is CFD?",
          context: "Contract for Difference (CFD) is a financial derivative that refers to a transaction that does not involve the exchange of physical goods or securities and is settled in cash only by the difference between the settlement price and the contract price. The CFD applies to a variety of underlying assets, including stocks, indices, commodities, foreign exchange and others. It is a contract between the buyer and the seller, the contract has a contract price unchanged, when the contract expires, according to the prevailing market price and the agreed price difference between the contract price of buyers and sellers, if the market price is low At the contract price, the buyer shall pay the difference to the seller, and if the market price is higher than the contract price, the seller shall pay the difference to the buyer. Stocks, ETFs and indices of CFDs have no expiry date and no longer want to hold directly when they can be closed; there are expiry date CFDs include: futures, commodities, bonds."
        }, {
          id: 5002,
          title: "What are the advantages of the CFD?",
          context: "<p>Advantages of CFDs include:</p>\n                          <p>1. Margin Trading: This means that you can reduce capital costs, improve capital utilization, the same funds can get higher profits.</p>\n                          <p>2. Two-way trading: can be traded on both rising and falling markets, and if you think the price will fall, you can short (sell), if you think the price will rise, you can do more (buy).</p>\n                          <p>3. Risk hedging: use the CFD to hedge the existing physical portfolio.</p>"
        }, {
          id: 5003,
          title: "How to trade stock CFD?",
          context: "In the trading of stock CFDs, you do not buy or sell the underlying stock. We offer spreads contracts for thousands of global equities, and you can buy or sell a spread of a certain amount of units based on your own judgment on the price rise or fall. The price of the stock difference contract is the same as the corresponding stock, and the price is moved every point in the direction that is in your favor, and your earnings can double the number of units you buy or sell. If the price changes to a point that is unfavorable to you, you will suffer a loss. But please note that the amount of loss may exceed the amount of money you have invested."
        }, {
          id: 5004,
          title: "What’s the leverage ratio for stock CFDs?",
          context: "<p>Up to 10 times the different risk level of the stock difference contract corresponding to the leverage ratio is different. The risk level is divided into five levels, followed by different leverage multiple:</p>\n                          <table>\n                              <tr>\n                                  <td>Risk Level</td>\n                                  <td>1</td>\n                                  <td>2</td>\n                                  <td>3</td>\n                                  <td>4</td>\n                                  <td>5</td>\n                              </tr>\n                              <tr>\n                                  <td>Leverage</td>\n                                  <td>10</td>\n                                  <td>5</td>\n                                  <td>2.5</td>\n                                  <td>1.25</td>\n                                  <td>1</td>\n                              </tr>\n                          </table>"
        }, {
          id: 5005,
          title: "What are the costs of stock CFDs?",
          context: "<p>Consists of two parts: transaction commission and financing costs. </p>\n                          <p>For the commission portion, the fee is the same as the underlying stock, and the minimum commission is charged for the small transaction based on the nominal trading volume or the transaction amount. For the financing costs, if the overnight stock CFD position is held (ie, when the stock exchange closes ), Will be charged interest on financing, otherwise it will not be charged.</p>"
        }, {
          id: 5006,
          title: "How is the overnight interest on the stock CFD calculated?",
          context: "<p>It depends. If you open and close a CFD position within the same trading day, you are not subject to overnight financing. When you hold a Single Stock CFD position overnight (i.e. have an open CFD position at close of market on the Stock Exchange, your CFD position will consequently be subject to the following credit or debit:</p>\n                          <p>1.\tWhen you hold a long CFD position, you are subject to a debit calculated on the basis of the relevant Inter-Bank Offer Rate for the currency in which the underlying share is traded (e.g. LIBOR) plus a mark-up (times Actual Days/360 or Actual Days/365).</p>\n                          <p>2.\tWhen you hold a short CFD position, you receive a credit calculated on the basis of the relevant Inter-Bank Bid Rate for the currency in which the underlying share is traded (e.g. LIBID) minus a mark-down (times Actual Days/360 or Actual Days/365).</p>"
        }, {
          id: 5007,
          title: "Will the CFD be recalled when holding a CFD short position?",
          context: "When short selling a CFD, you will be subject to the rules for the Stock market in that particular market. When short selling CFDs, you may experience forced closure of a position if your CFDs get recalled. This may happen if the underlying Stock becomes hard to borrow due to corporate events such as take overs, dividends, rights offerings (and other merger and acquisition activities) or increased hedge fund selling of the Stock."
        }, {
          id: 5008,
          title: "Is the value of the CFD contract affected by the company's behavior?",
          context: "Although the customer with the CFD position does not have the underlying stock, the value of the position is still affected by the company's behavior. If you hold a long position, you will receive a dividend on the dividend date. After the stock has been ex-dividend, the dividends distributed are usually shown in the account. New investors who buy stocks from dividend payout no longer enjoy the next dividend distribution. In the case of other conditions unchanged, the price of the underlying stock and the price of the stock difference contract will appear on the ex-dividend date with the same amount of dividend, so the amount of dividends paid to make up for this decline. On the other hand, if you hold a short position in the stock CFD before the dividend payment date, you will need to pay the dividend on the dividend date and the amount of the dividend will be deducted from the account. Other company behavior (the issuance of stock dividends, stock splits, etc.) will also be automatically reflected in the cash adjustment through the account. In general, positions and prices are automatically adjusted to reflect corporate behavior."
        }]
      }]
    }, {
      catalogId: 6,
      catalogName: "Financing and Margin ",
      qaList: [{
        typeName: "",
        list: [{
          id: 6001,
          title: "What is a financing transaction?",
          context: "Also known as a leveraged transaction, it refers to an act where a client pledges his/her own assets (funds or stocks) to the broker, so as to borrow more money to buy stocks. Investors need to repay the principal and interest within the agreed time limit. The financing transaction also amplifies the risk while amplifying profits. For example, your principal is $ 1 million and $ 1 million borrowed from the broker, with the total of $ 2 million to buy stocks, you are doing a 2 times leveraged financing, in which case, when the stocks rise by 25%, the non-financing assets rise by 50%; when the stocks fall by 25%, the non-financing assets fall by 50%."
        }, {
          id: 6002,
          title: "What is margin trading?",
          context: "Also known as short selling, it refers to an act where an investor uses the funds or securities as collaterals to borrow securities from the broker and sell securities, at a later time, he/she will buy the same amount and type of securities and return them to the broker and pay the corresponding margin costs. For example, you bought 100 shares of Apple through margin trading with the broker and sold them at $ 120 per share, which gave you $ 12,000 in cash. When Apple shares fell to $ 110, you spent $ 110,000 buying 100 shares of Apple and returned them to the broker, while paying a $10 margin cost, then the total profit of this margin trading transaction is 12,000 - 11,000 - 10 = $ 990."
        }, {
          id: 6003,
          title: "Why financing and margin trading?",
          context: "Financing operations can improve the efficiency of asset use, bringing greater benefits with less money, but also undertaking a greater risk. Margin trading operation, however, provides a way to profits in a downward market, but it also brings more risk. Investors must be careful when using these margin trading instruments."
        }, {
          id: 6004,
          title: "What is the risk of margin trading?",
          context: 'Under margin trading, when the net assets of the account do not meet the margin requirements, there will be risk of forced liquidation without prior notice. The broker has the right to randomly select stock positions to close, so that the assets could meet the risk control requirements. "Account Details" in the Webull APP shows the real-time margin status. When the minimum margin requirements are close to 100% of the actual margin balance, there is a risk of forced liquidation.'
        }, {
          id: 6005,
          title: "How to start trading on margin?",
          context: "When the net assets of the account are higher than $2,000, the margin trading function is automatically activated. When your cash purchasing power is insufficient when buying stocks, it will automatically finance the purchase of the shares. Or there is a lack of positions when selling stocks, it will automatically initiate margin trading and then sell."
        }, {id: 6006, title: "How is the financing interest rate charged?", context: __webpack_require__(99)}]
      }]
    }, {
      catalogId: 7,
      catalogName: "Account Security",
      qaList: [{
        typeName: "",
        list: [{
          id: 7001,
          title: "Why do you want to collect my personal, family, company and other private information during account opening?",
          context: "According to the regulatory authorities, Webull must collect such information for verifying the applicant's true identity and judging whether the applicant is qualified for account opening pursuant to relevant terms."
        }, {
          id: 7002,
          title: "How does Webull protect my personal privacy?",
          context: "The acquisition, transmission and preservation of your personal information are all under encrypted algorithm processing, ensuring absolutely no leak to a third party."
        }, {
          id: 7003,
          title: "What are the supervision and protection of my Webull trading account?(IB)",
          context: "<p>Webull cooperates with Interactive Brokers and Saxo Bank. Interactive Brokers and Saxo Bank provide fund custody and transaction clearing services for Webull.</p>\n                          <p>The account opened by Interactive Brokers is regulated by SEC, FINRA; Investors are protected by SIPC and SIPC provides up to $ 500,000 compensation. </p>\n                          <p>The account opened at Saxo Bank is regulated and protected by the Danish Financial Supervisory Commission (Danish DFS) and the European Union</p>"
        }]
      }]
    }, {
      catalogId: 8,
      catalogName: "Product Features",
      qaList: [{
        typeName: "Self-select Portfolio",
        list: [{
          id: 8001,
          title: "What is a self-select watch list? What is a portfolio?",
          context: "<p>On the watch list are securities self-selected by users.</p><p>A portfolio is a collection of securities that the user is interested in, including a wealth of various categories including stocks, bonds, funds, foreign exchange, commodities, futures and financial derivatives.</p>"
        }, {
          id: 8002,
          title: "What is the role of creating a portfolio? Why create a portfolio?",
          context: "The portfolio can help the user to focus on multiple self-selected underlying assets at the same time. If the user has a simulated position, the portfolio will calculate the rate of return on investment."
        }, {
          id: 8003,
          title: "What is a portfolio of simulated positions?",
          context: "A portfolio of simulated positions means the user could input the price and quantity for purchase and sale of underlying assets, and Webull helps the user to calculate the rate of return on investment."
        }, {
          id: 8004,
          title: "What is the intraday profit and loss of a portfolio? How is it calculated?",
          context: "<p>The profit and loss of the portfolio is calculated on the basis of the current settlement price. The calculation is as follows:</p><p>Intraday profit and loss = position profit and loss + intraday buy profit and loss + intraday sell profit and loss</p>"
        }, {
          id: 8005,
          title: "What is the accumulated profit and loss of a portfolio? How is it calculated?",
          context: "Accumulated profit and loss, also known as the total profit and loss, is the total profit and loss status as of the current moment from the time of purchase of underlying assets in the portfolio."
        }, {
          id: 8006,
          title: "What is the total market value of the portfolio? How is it calculated?",
          context: "<p>Total market value of the portfolio is the sum of the market value of all the underlying assets calculated at a given moment.</p><p>The market value of the underlying assets= current price * holding position amount</p>"
        }, {
          id: 8009,
          title: "Why set the currency for a portfolio? Is it possible to modify after the setting?",
          context: "<p>There may be underlying assets from various markets in the portfolio. Market value of underlying assets in different markets is calculated in different currencies. So when creating a portfolio, it’s needed to set a settlement currency in order to calculate the profit and loss of the portfolio.</p><p>After the portfolio is created, you can reset currency by “Modifying the Current Currency” on the portfolio page.</p>"
        }, {
          id: 8010,
          title: 'What is the relationship between "settlement currency" and "default currency" in all portfolios?',
          context: '"Settlement currency" is a currency that is set to facilitate the calculation of profit and loss of all portfolios. In the calculation of portfolio profit and loss, the system will convert the "default currency" to "settlement currency" .'
        }]
      }, {
        typeName: "Markets",
        list: [{
          id: 8011,
          title: "How much data have Webull gained access worldwide?",
          context: "Up to now, cover 5 categories, 23 countries and regions, 106 exchanges and more than 100,000 investment subjects."
        }, {
          id: 8012,
          title: "What is the meaning of the English letter symbol in front of the underlying?",
          context: __webpack_require__(100)
        }, {
          id: 8013,
          title: "Can the sub-version on the top of the market page be modified? How?",
          context: 'Yes. Click "+" on the rightmost side to enter the configuration page. You can choose the regions or categories you are interested in.'
        }]
      }, {
        typeName: "Search",
        list: [{
          id: 8014,
          title: "What can users search for?",
          context: "Currently it supports search of various categories of underlying including stocks, indices, funds, foreign exchange, commodities etc."
        }, {
          id: 8015,
          title: "How can the user search for the underlying?",
          context: '<p>The user can search for the underlying by:</p><p>(1) Input the Chinese / English name, abbreviation, code, or phonetic abbreviation</p><p>Example: input "AAPL", and the result is: Apple (AAPL)</p><p>(2) Input the currency</p><p> Example: input "US dollar", and the results show all exchange rates between the US dollar and other currencies</p>'
        }]
      }]
    }]
  }
}, function (module, exports, __webpack_require__) {
  module.exports = "<p>1. 点击“立即免费开户”，注册微牛账号</p><img src=" + JSON.stringify(__webpack_require__(66)) + ' alt=""><p>2. 选择所在地区（以下示例对应“中国大陆”地区）</p><img src=' + JSON.stringify(__webpack_require__(67)) + ' alt=""><p>3. 上传身份证，识别身份证信息 </p><img src=' + JSON.stringify(__webpack_require__(68)) + ' alt=""><img src=' + JSON.stringify(__webpack_require__(69)) + ' alt=""><p>4. 填写个人信息</p><img src=' + JSON.stringify(__webpack_require__(70)) + ' alt=""><p>5. 填写投资经验</p><img src=' + JSON.stringify(__webpack_require__(71)) + ' alt=""><p>6. 阅读披露信息，签署协议</p><img src=' + JSON.stringify(__webpack_require__(72)) + ' alt="">'
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/5756c24214ef7599.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/ee180deb0d48d73f.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/fd87b595a94c65fb.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/cbfedd568f41f763.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/7314ad46ea94b3df.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/3de1381f35346a28.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/b3cac9d2f44279dc.jpg"
}, function (module, exports) {
  module.exports = "<p>微牛不收取任何费用。国际转账时，汇款行及中转银行一般会收取一定的服务费，具体以您的汇款银行规定为准。以下银行收费供参考：</p><table>    <tr>        <th>银行</th>        <th>国际汇款手续费</th>        <th>电报费</th>        <th>中转行费用</th>    </tr>    <tr>        <td>招商银行香港一卡通</td>        <td>20美元/笔</td>        <td>无</td>        <td>约26美元，以具体中转行规定为了准</td>    </tr>    <tr>        <td>建设银行</td>        <td>汇款金额的0.08%，最低20元人民币/笔，最高300元人民币/笔</td>        <td>80元人民币/笔</td>        <td>约15-35美元，以具体中转行规定为了准</td>    </tr>    <tr>        <td>工商银行</td>        <td>汇款金额的0.08%，最低40元人民币/笔，最高208元人民币/笔</td>        <td>100元人民币/笔</td>        <td>约15-35美元，以具体中转行规定为准</td>    </tr></table>"
}, function (module, exports) {
  module.exports = "<table>    <tr>        <th>类型</th>        <th>费用</th>        <th>收费方</th>    </tr>    <tr>        <td>交易佣金</td>        <td>$0.01/股，最低 $2.88/笔</td>        <td>微牛</td>    </tr>    <tr>        <td>交收费</td>        <td>$0.003/股</td>        <td>美国结算机构</td>    </tr>    <tr>        <td>证监会费（仅收取卖单）</td>        <td>$0.0000218 * 交易额（最低$0.01)</td>        <td>SEC</td>    </tr>    <tr>        <td>交易活动费（仅收取卖单）</td>        <td>$0.000119 * 卖出数量（最低$0.01,最高$5.95）</td>        <td>FINRA</td>    </tr></table><p>除交易佣金外，其他费用只是由微牛为各机构代收。</p>"
}, function (module, exports) {
  module.exports = "<table>    <tr>        <th>类型</th>        <th>费用</th>        <th>收费方</th>    </tr>    <tr>        <td>代收股息税</td>        <td>10% * 股息（派发时自动预扣）</td>        <td>美国税务局</td>    </tr>    <tr>        <td>美国预托证券（ADR）保管费</td>        <td>$0.01~$0.03/股</td>        <td>信托公司</td>    </tr>    <tr>        <td>资本利得税</td>        <td>与美国免税协约的国家（中国等）的公民填写W8ben表格则免收资本利得税</td>        <td>无</td>    </tr>    <tr>        <td>转仓费</td>        <td>ACATS方式转入转出微牛账户均不收费</td>        <td>无</td>    </tr></table>"
}, function (module, exports) {
  module.exports = "<table>    <tr>        <th>类型</th>        <th>费用</th>        <th>收费方</th>    </tr>    <tr>        <td>交易佣金</td>        <td>0.08% * 交易值，每笔最低45港元</td>        <td>微牛</td>    </tr>    <tr>        <td>交收费</td>        <td>0.002% * 交易值（最低2港币，最高100港币）</td>        <td>香港结算所</td>    </tr>    <tr>        <td>交易费</td>        <td>0.005% * 交易值+0.5港币</td>        <td>香港交易所</td>    </tr>    <tr>        <td>交易征费</td>        <td>0.0027% * 交易值</td>        <td>香港交易所</td>    </tr>    <tr>        <td>印花税</td>        <td>0.1% * 交易值（不足1港币元亦作1港币计算）</td>        <td>香港政府</td>    </tr></table><p>除交易佣金外，其他费用只是由微牛为各机构代收。</p>"
}, function (module, exports) {
  module.exports = '<p>周一至周五（法定假日除外），具体交易时段如下：</p><table>    <tr>        <th>交易时段</th>        <th>起止时间</th>        <th>时段细分</th>    </tr>    <tr>        <td>竞价时段</td>        <td>09:00 – 09:30</td>        <td>早盘竞价时段</td>    </tr>    <tr>        <td rowspan="3">持续交易时段</td>        <td>09:30 – 12:00</td>        <td>早市（持续交易）</td>    </tr>    <tr>        <td>12:00 – 13:00</td>        <td>午间休市</td>    </tr>    <tr>        <td>13:00 – 16:00</td>        <td>午市（持续交易）</td>    </tr>    <tr>        <td rowspan="2">竞价阶段</td>        <td>16:00 – 16:08</td>        <td>收市竞价时段</td>    </tr>    <tr>        <td>16:08 – 16:10</td>        <td>随机收市</td>    </tr></table><p>在圣诞前夕、新年前夕或农历新年前夕，将没有延续早市及午市交易。香港交易所每年编制一份休市日历，可于香港交易所网站“证券交易资料”栏目查阅。</p>'
}, function (module, exports) {
  module.exports = "<p>开市前时段用以厘定公平的开市价。在开市前时段，买卖盘积累一段时间后，会在预先设定的对盘时段中对盘。买卖盘会以买卖盘类别、价格及时间等优先次序（竞价盘享有优先的对盘次序），按“最终参考平衡价格”顺序对盘。交易系统只接受输入“竞价盘”及“竞价限价盘”。输入交易系统的买卖盘价格不可偏离上日收市价或按盘价（如有，并视情况而定）9倍或以上及少于九分之一或以下， 每个买卖盘不得超过3,000手股份。</p><table>    <tr>        <th>起止时间</th>        <th>时段细分</th>    </tr>    <tr>        <td>09:00 – 09:15</td>        <td>输入买卖盘时段</td>    </tr>    <tr>        <td>09:15 – 09:20</td>        <td>对盘前时段</td>    </tr>    <tr>        <td>09:20 – 09:28</td>        <td>对盘时段</td>    </tr>    <tr>        <td>09:28 – 09:30</td>        <td>暂停时段</td>    </tr></table><p>输入买卖盘时段中，只接受竞价盘及竞价限价盘输入；买卖盘将于交易系统中积累及不断更新，期间可修改或取消。对盘前时段内，则只接受竞价盘，已输入系统的买卖盘不得修改或取消。这可避免参考平衡价格出现重大变动，并可将参考平衡价格调整为公平的市场价格。对盘时段内，不得在交易系统内输入、更改及取消买卖盘。每一只证券的最终参考平衡价格会在此段时段内厘定。买卖盘会以买卖盘类别(以竞价盘为先)、价格及时间等优先次序按最终参考平衡价格顺序对盘。暂停时段内，经纪不能将其买卖盘传递至香港交易所的交易系统，直至早上9:30持续交易时段开始。</p>"
}, function (module, exports) {
  module.exports = "<p>收市竞价容许交易以收市价执行，是国际证券市场上常用的交易机制。在收市竞价交易时段内，有需要以收市价进行交易的市场参与者可在此时段输入买卖盘，这些买卖盘会互动从而令每只证券得出一个共识的收市价，并按此收市价执行。香港交易所引的入收市竞价交易时段旨在切合投资者的各种需求，便利他们以证券收市价执行交易，须知现时好些基金（例如指数追踪基金）均须按章以收市价进行投资。收市竞价交易时段长约8至10分钟，当中分为参考价定价时段、输入买卖盘时段、不可取消时段及随机收市时段，具体时间及运作如下：</p><table>    <tr>        <th>起止时间</th>        <th>时段细分</th>    </tr>    <tr>        <td>16:00 – 16:01</td>        <td>参考价定价时段</td>    </tr>    <tr>        <td>16:01 – 16:06</td>        <td>输入买卖盘时段</td>    </tr>    <tr>        <td>16:06 – 16:08</td>        <td>不可取消时段</td>    </tr>    <tr>        <td>16:08 – 16:10</td>        <td>随机收市时段</td>    </tr></table>";
}, function (module, exports) {
  module.exports = "<p>每个交易日首个输入交易系统的买盘或卖盘，是受一套开市报价规则所监管。按此规则，开市前时段内作出的开市报价不得偏离上日收市价(如有) 9倍或以上及少于九分之一或以下，每种股票的价位，视乎其股价而定。以下是股票的价位表。</p><table>    <tr>        <th>价格范围</th>        <th>价格最小变动单位</th>    </tr>    <tr>        <td>0.01 - 0.25</td>        <td>0.001</td>    </tr>    <tr>        <td>0.25 – 0.50</td>        <td>0.005</td>    </tr>    <tr>        <td>0.50 – 10.00</td>        <td>0.010</td>    </tr>    <tr>        <td>10.00 – 20.00</td>        <td>0.020</td>    </tr>    <tr>        <td>20.00 – 100.00</td>        <td>0.050</td>    </tr>    <tr>        <td>100.00 – 200.00</td>        <td>0.100</td>    </tr>    <tr>        <td>200.00 – 500.00</td>        <td>0.200</td>    </tr>    <tr>        <td>500.00 – 1,000.00</td>        <td>0.500</td>    </tr>    <tr>        <td>1,000.00 – 2,000.00</td>        <td>1.000</td>    </tr>    <tr>        <td>2,000.00 – 5,000.00</td>        <td>2.000</td>    </tr>    <tr>        <td>5,000.00 – 9995.00</td>        <td>5.000</td>    </tr></table>"
}, function (module, exports) {
  module.exports = '<p>    对于盛宝银行账户，不可融资交易股票，但可以融资交易股票差价合约，具体的融资利率与各币种的银行间拆借利率有关。如果在交易当日持仓和平仓差价合约，则不会有隔夜融资。如果客户持有隔夜个股差价合约头寸（即在证券交易所收市时持仓差价合约），则会收取融资利息：</p><br/><p>    如果持有差价合约多头头寸，则会进行借记，计算方法是基于相关股份交易使用的货币之相关银行同业拆放利率（例如，伦敦银行同业拆放利率LIBOR）加上加价3.5%（乘以实际天数/360天或实际天数/365天）。</p><p>    如果持有差价合约空头头寸，则会收到贷记，计算方法是基于相关股份交易使用的货币之相关银行同业拆借利率（例如，伦敦银行同业拆借利率LIBID）减去降价3.0%（乘以实际天数/360天或实际天数/365天）。贷记利率为负则需要支付利息，反之则会收到利息。</p><p>    银行同业拆借利率可以参考 <a href="http://www.global-rates.com/" target="_blank">Global Rates</a></p><br/><p>    对于盈透证券账户，可融资交易股票，具体的融资利率与各币种的银行间拆借利率有关。不同币种的融资利率不同，同一币种的融资利率也会不定期的波动。同样，只有持仓过夜才会收取融资利息。具体请参考 <a href="https://www.ibkr.com.cn/en/index.php?f=701" target="_blank">基准利率</a> 。以下利率数据采用2017年8月16日的基准利率（美元1.16%，港元0.066%）计算得出：</p><table style="text-align: center">    <tr>        <th>融资金额（美元）</th>        <th>融资利率</th>    </tr>    <tr>        <td>0-100,000</td>        <td style="text-align: center">3.61%</td>    </tr>    <tr>        <td>100,000.01-1,000,000</td>        <td style="text-align: center">3.11%</td>    </tr>    <tr>        <td>1,000,000.01-3,000,000</td>        <td style="text-align: center">2.61%</td>    </tr>    <tr>        <td>>3,000,000.00</td>        <td style="text-align: center">2.36%</td>    </tr></table><br/><table style="text-align: center">    <tr>        <th>融资金额（港元）</th>        <th>融资利率</th>    </tr>    <tr>        <td>0-780,000</td>        <td style="text-align: center">3.566%</td>    </tr>    <tr>        <td>780,000.01-7,800,000</td>        <td style="text-align: center">3.066%</td>    </tr>    <tr>        <td>7,800,000.01-780,000,000</td>        <td style="text-align: center">2.566%</td>    </tr>    <tr>        <td>>780,000,000.00</td>        <td style="text-align: center">2.566%</td>    </tr></table>'
}, function (module, exports) {
  module.exports = "<p>标的物前面的英文标识代表标的物所在的地区/市场。</p><table>    <tr>        <th>标识</th>        <th>市场</th>        <th>标识</th>        <th>市场</th>    </tr>    <tr>        <td>CN</td>        <td>中国</td>        <td>DK</td>        <td>丹麦</td>    </tr>    <tr>        <td>HK</td>        <td>香港</td>        <td>SE</td>        <td>瑞典</td>    </tr>    <tr>        <td>SG</td>        <td>新加坡</td>        <td>FI</td>        <td>芬兰</td>    </tr>    <tr>        <td>JP</td>        <td>日本</td>        <td>IS</td>        <td>冰岛</td>    </tr>    <tr>        <td>IN</td>        <td>印度</td>        <td>NO</td>        <td>挪威</td>    </tr>    <tr>        <td>US</td>        <td>美国</td>        <td>NL</td>        <td>荷兰</td>    </tr>    <tr>        <td>CA</td>        <td>加拿大</td>        <td>BE</td>        <td>比利时</td>    </tr>    <tr>        <td>UK</td>        <td>英国</td>        <td>PT</td>        <td>葡萄牙</td>    </tr>    <tr>        <td>DE</td>        <td>德国</td>        <td>FR</td>        <td>法国</td>    </tr></table>"
}, function (module, exports, __webpack_require__) {
  module.exports = '<p>1. Click "Free Account Opening Now" to register a Webull account</p><img src=' + JSON.stringify(__webpack_require__(84)) + ' alt=""><p>2. Select the region (the following example shows "mainland China")</p><img src=' + JSON.stringify(__webpack_require__(85)) + ' alt=""><p>3. Upload your ID card to identify your ID information</p><img src=' + JSON.stringify(__webpack_require__(86)) + ' alt=""><img src=' + JSON.stringify(__webpack_require__(87)) + ' alt=""><p>4. Fill in personal information</p><img src=' + JSON.stringify(__webpack_require__(88)) + ' alt=""><p>5. Fill out investment experience</p><img src=' + JSON.stringify(__webpack_require__(89)) + ' alt=""><p>6. Read the disclosure information and sign the agreement</p><img src=' + JSON.stringify(__webpack_require__(90)) + ' alt="">'
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/ff82960220de0432.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/44e55b353924ca6b.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/d670dd7b99988c50.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/19d28d992f315683.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/b3f78324ba8161ab.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/151db338dd5b6325.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "mobile/assets/images/aadfb440de4ded38.jpg"
}, function (module, exports) {
  module.exports = "<p>Webull does not charge any fees. For international transfers, the remitting bank and transfer bank generally charge a certain service fees, which are subject to specific rules of your remitting bank. The following bank charges are for your kind reference:</p><table>    <tr>        <th>Banks</th>        <th>International Remittance Fee</th>        <th>Telegraph Fee</th>        <th>Transfer Bank Fee</th>    </tr>    <tr>        <td>China Merchants Bank Hong Kong All-in-one card</td>        <td>USD 20/ transaction</td>        <td>N/A</td>        <td>About USD 26, subject to specific rules of the transfer bank</td>    </tr>    <tr>        <td>China Construction Bank</td>        <td>0.08% of the remittance amount, minimum 20 yuan / transaction, maximum 300 yuan / transaction</td>        <td>50 yuan / transaction</td>        <td>About USD 15-35, subject to specific rules of the transfer bank</td>    </tr>    <tr>        <td>Industrial and Commercial Bank of China</td>        <td>0.08% of the remittance amount, minimum 20 yuan / transaction, maximum 208 yuan / transaction</td>        <td>100 yuan / transaction</td>        <td>About USD 15-35, subject to specific rules of the transfer bank</td>    </tr></table>"
}, function (module, exports) {
  module.exports = "<table>    <tr>        <th>Type</th>        <th>Charge</th>        <th>Charge Recipients</th>    </tr>    <tr>        <td>Trading commission</td>        <td>$0.01/share, minimum$2.88/transaction</td>        <td>Webull</td>    </tr>    <tr>        <td>Settlement fee</td>        <td>$0.003/share</td>        <td>US settlement agencies</td>    </tr>    <tr>        <td>SEC fee(only charging selling orders)</td>        <td>$0.0000218 * trading amount（minimum $0.01)</td>        <td>SEC</td>    </tr>    <tr>        <td>transaction fee(only charging selling orders)</td>        <td>$0.000119 * selling quantity （minimum $0.01,maximum $5.95）</td>        <td>FINRA</td>    </tr></table><p>Except for the trading commission, other fees are collected only by Webull on behalf of respective agencies.</p>"
}, function (module, exports) {
  module.exports = "<table>    <tr>        <th>Type</th>        <th>Charge</th>        <th>Charge Recipients</th>    </tr>    <tr>        <td>Collection of dividend tax</td>        <td>10% * dividend(automatically withheld at distribution)</td>        <td>US IRS</td>    </tr>    <tr>        <td>ADR custody fee</td>        <td>$0.01~$0.03/share</td>        <td>Depository Trust Company（DTC）</td>    </tr>    <tr>        <td>Capital gains tax</td>        <td>Capital gains tax is exempted by filling the W8ben forms for citizens of countries (such as China) that have signed Tax Exemption Agreement with the United States</td>        <td>N/A</td>    </tr>    <tr>        <td>Position transfer fee</td>        <td>No fees charged for any transfer in and out of Webull accounts by means of ACATS</td>        <td>N/A</td>    </tr></table>"
}, function (module, exports) {
  module.exports = "<table>    <tr>        <th>Type</th>        <th>Charge</th>        <th>Charge Recipients</th>    </tr>    <tr>        <td>Trading commission</td>        <td>0.08% * trading amount, minimum HK$45 per transaction</td>        <td>Webull</td>    </tr>    <tr>        <td>Settlement fee</td>        <td>0.002% * trading amount (minimum: HK$2, maximum: HK$100)</td>        <td>Hong Kong Clearing House</td>    </tr>    <tr>        <td>Trading fee</td>        <td>0.005% * trading amount+HK$0.5</td>        <td>Hong Kong Exchange</td>    </tr>    <tr>        <td>Stamp Duty</td>        <td>0.1% * trading amount (round up to nearest Hong Kong dollar)</td>        <td>Hong Kong Government</td>    </tr></table><p>Except for the trading commission, other fees are collected only by Webull on behalf of respective agencies.</p>"
}, function (module, exports) {
  module.exports = '<p>Monday to Friday (except statutory holidays), the specific trading hours are as follows:</p><table>    <tr>        <th>Trading Sessions</th>        <th>Start and End Time</th>        <th>Session Breakdown</th>    </tr>    <tr>        <td>Auction Session</td>        <td>09:00 – 09:30</td>        <td>Pre-opening auction</td>    </tr>    <tr>        <td rowspan="3">Continuous Trading Session</td>        <td>09:30 – 12:00</td>        <td>Morning Session (Continuous trading)</td>    </tr>    <tr>        <td>12:00 – 13:00</td>        <td>Close at Noon</td>    </tr>    <tr>        <td>13:00 – 16:00</td>        <td>Afternoon Session (Continuous trading)</td>    </tr>    <tr>        <td rowspan="2">Auction Session</td>        <td>16:00 – 16:08</td>        <td>Closing Auction Session</td>    </tr>    <tr>        <td>16:08 – 16:10</td>        <td>Random Closing</td>    </tr></table><p>There is no Afternoon Session on the eves of Christmas, New Year and Lunar New Year. The Hong Kong Stock Exchange prepares a calendar for closed dates every year, which is available on the Hong Kong Stock Exchange\'s "Securities Trading Information" section.</p>'
}, function (module, exports) {
  module.exports = '<p>The pre-opening period is for determining a fair opening price. In the pre-opening period, after some time of order input accumulation, matching will take place with the pre-set matching session. Orders will be prioritized in terms of the type, price and time (at-auction orders enjoy priority in the matching sequence), and matched at the sequence of the “final indicative equilibrium price”. The trading system only accepts input of the "at-auction orders" and "at-auction limit orders ". The price of the order input cannot deviate by 9 times or more and less than one-ninth or less from the closing price or the nominal price(if any, and as the case may be) of the previous trading day, and each order shall not exceed 3,000 lots of shares.</p><table>    <tr>        <th>Start and End Time</th>        <th>Session Breakdown</th>    </tr>    <tr>        <td>09:00 – 09:15</td>        <td>the order input period</td>    </tr>    <tr>        <td>09:15 – 09:20</td>        <td>the pre-order matching period</td>    </tr>    <tr>        <td>09:20 – 09:28</td>        <td>the order matching period</td>    </tr>    <tr>        <td>09:28 – 09:30</td>        <td>the blocking period</td>    </tr></table><p>During the order input period, only input of at-auction orders and at-auction limit orders are accepted. Orders will be accumulated and constantly updated in the trading system, during which amendments or cancelations are allowed. For the pre-order matching period, only at-auction orders are accepted; orders already input into the system cannot be amended or canceled. This helps avoid significant changes in the indicative equilibrium price and adjusts it to a fair market price. During the order matching period, you may not input, amend or cancel orders in the trading system. The final indicative equilibrium price for each securities will be determined during this period. The orders will be matched based on the priority of the order type (at-auction orders are prioritized), the price and the time and at the sequence of the final indicative equilibrium price. During the blocking period, the broker cannot transfer orders to the Hong Kong Stock Exchange\'s trading system until 9:30 am when the continuous trading session begins.</p>'
}, function (module, exports) {
  module.exports = "<p>The closing auction allows transaction to be executed at the closing price and is a trading mechanism commonly used in the international securities market. During the closing auction period, market participants who need to trade at the closing price can input the order at this time, and these orders will interact so that all securities will reach a consensus on the closing price at which they are executed. The closing auction trading session adopted by the Hong Kong Stock Exchange is aimed at meeting the various needs of investors to facilitate the execution of their transactions at the closing prices of securities. It is understood that many funds (such as the Index Tracking Fund) are now subject to the closing price. The closing auction trading session lasts for about 8 to 10 minutes, which is divided into the reference price fixing period, the order input period, the no-cancellation period and the random closing period. The specific time and operation are as follows:</p><table>    <tr>        <th>Start and End Time</th>        <th>Session Breakdown</th>    </tr>    <tr>        <td>16:00 – 16:01</td>        <td>the reference price fixing period</td>    </tr>    <tr>        <td>16:01 – 16:06</td>        <td>the order input period</td>    </tr>    <tr>        <td>16:06 – 16:08</td>        <td>the no-cancellation period</td>    </tr>    <tr>        <td>16:08 – 16:10</td>        <td>the random closing period</td>    </tr></table>"
}, function (module, exports) {
  module.exports = "<p>The first buying or selling order input into the trading system on each trading day is regulated by a set of open quotation rules. According to the rules, the opening quotation made within the pre-opening period shall not deviate by 9 times or more and less than one-ninth or less from the closing price(if any) of the previous trading day. The price spread of each stock depends on its respective share price. The following is the stock price spread table.</p><table>    <tr>        <th>Price Range</th>        <th>Spread</th>    </tr>    <tr>        <td>0.01 - 0.25</td>        <td>0.001</td>    </tr>    <tr>        <td>0.25 – 0.50</td>        <td>0.005</td>    </tr>    <tr>        <td>0.50 – 10.00</td>        <td>0.010</td>    </tr>    <tr>        <td>10.00 – 20.00</td>        <td>0.020</td>    </tr>    <tr>        <td>20.00 – 100.00</td>        <td>0.050</td>    </tr>    <tr>        <td>100.00 – 200.00</td>        <td>0.100</td>    </tr>    <tr>        <td>200.00 – 500.00</td>        <td>0.200</td>    </tr>    <tr>        <td>500.00 – 1,000.00</td>        <td>0.500</td>    </tr>    <tr>        <td>1,000.00 – 2,000.00</td>        <td>1.000</td>    </tr>    <tr>        <td>2,000.00 – 5,000.00</td>        <td>2.000</td>    </tr>    <tr>        <td>5,000.00 – 9995.00</td>        <td>5.000</td>    </tr></table>"
}, function (module, exports) {
  module.exports = '<p>    For Saxo Bank account, as Single Stock CFDs at Saxo Bank are a margined product, you finance the traded value through an overnight credit/debit charge. If you open and close a CFD position within the same trading day, you are not subject to overnight financing. When you hold a Single Stock CFD position (or an ETF/ETC CFD position) overnight (i.e. have an open CFD position at close of market on the Stock Exchange, your CFD position will consequently be subject to the following credit or debit:</p><br/><p>    When you hold a long CFD position, you are subject to a debit calculated on the basis of the relevant Inter-Bank Offer Rate for the currency in which the underlying share is traded (e.g. LIBOR) plus a mark-up (times Actual Days/360 or Actual Days/365).</p><p>    When you hold a short CFD position, you receive a credit calculated on the basis of the relevant Inter-Bank Bid Rate for the currency in which the underlying share is traded (e.g. LIBID) minus a mark-down (times Actual Days/360 or Actual Days/365).</p><p>    The credit/debit is calculated on the total nominal value of the underlying Stock(s) at the time the CFD contract is established (whether long or short).</p><p>    Please note the following:</p><ul>    <li>        a) A floor apply to the relevant Inter-Bank Bid/Offer Rate, i.e. if the Inter-Bank Rate is negative it will be excluded from the financing calculation.    </li>    <li>        b) If the calculated financing rate on a short position (Inter-Bank Bid Rate – mark-down) is negative, the financing credit will become a financing charge.    </li></ul><p>    Inter-Bank Offer Rate：<a href="http://www.global-rates.com/" target="_blank">Global Rates</a></p><br/><p>    For Interactive Brokers account,Interest rates are different for different currencies, and financing interest rate of the same currency will also fluctuate at different times. The financing rate is related to BM (<a href="https://www.ibkr.com.cn/en/index.php?f=701" target="_blank">benchmark interest rate</a>).Following data is based on interest rate of 16th Aug(1.16% for USD, 0.066% for HKD):</p><table>    <tr>        <th>Financing Amounts (US Dollars)</th>        <th>Financing Rates</th>    </tr>    <tr>        <td>0-100,000</td>        <td style="text-align: center">3.61%</td>    </tr>    <tr>        <td>100,000.01-1,000,000</td>        <td style="text-align: center">3.11%</td>    </tr>    <tr>        <td>1,000,000.01-3,000,000</td>        <td style="text-align: center">2.61%</td>    </tr>    <tr>        <td>>3,000,000.00</td>        <td style="text-align: center">2.36%</td>    </tr></table><br/><table>    <tr>        <th>Financing Amounts (HK Dollars)</th>        <th>Financing Rates</th>    </tr>    <tr>        <td>0-780,000</td>        <td style="text-align: center">3.566%</td>    </tr>    <tr>        <td>780,000.01-7,800,000</td>        <td style="text-align: center">3.066%</td>    </tr>    <tr>        <td>7,800,000.01-780,000,000</td>        <td style="text-align: center">2.566%</td>    </tr>    <tr>        <td>>780,000,000.00</td>        <td style="text-align: center">2.566%</td>    </tr></table>'
}, function (module, exports) {
  module.exports = "<p>The English letter symbol in front of the underlying represents the area / market where the underlying is located.</p><table>    <tr>        <th>Symbol</th>        <th>Market</th>        <th>Symbol</th>        <th>Market</th>    </tr>    <tr>        <td>CN</td>        <td>China</td>        <td>DK</td>        <td>Denmark</td>    </tr>    <tr>        <td>HK</td>        <td>Hong Kong</td>        <td>SE</td>        <td>Sweden</td>    </tr>    <tr>        <td>SG</td>        <td>Singapore</td>        <td>FI</td>        <td>Finland</td>    </tr>    <tr>        <td>JP</td>        <td>Japan</td>        <td>IS</td>        <td>Iceland</td>    </tr>    <tr>        <td>IN</td>        <td>India</td>        <td>NO</td>        <td>Norway</td>    </tr>    <tr>        <td>US</td>        <td>United States</td>        <td>NL</td>        <td>Netherlands</td>    </tr>    <tr>        <td>CA</td>        <td>Canada</td>        <td>BE</td>        <td>Belgium</td>    </tr>    <tr>        <td>UK</td>        <td>United Kingdom</td>        <td>PT</td>        <td>Portugal</td>    </tr>    <tr>        <td>DE</td>        <td>Germany</td>        <td>FR</td>        <td>France</td>    </tr></table>"
}]);