!function (modules) {
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId])return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {exports: {}, id: moduleId, loaded: !1};
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0, module.exports
  }
  
  var installedModules = {};
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.p = "https://static.webull.com/fmweb/", __webpack_require__(0)
}({
  0: function (module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj}
    }
    
    __webpack_require__(22), __webpack_require__(16), __webpack_require__(35);
    var _swiper = __webpack_require__(38), _swiper2 = _interopRequireDefault(_swiper);
    module.exports = !function () {
      !function () {
        new _swiper2.default(".swiper-container", {pagination: ".swiper-pagination", paginationClickable: !0})
      }()
    }()
  }, 16: function (module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj}
    }
    
    Object.defineProperty(exports, "__esModule", {value: !0});
    var _jquery = __webpack_require__(17), _jquery2 = _interopRequireDefault(_jquery),
      _funutil = __webpack_require__(20);
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
  }, 17: function (module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj}
    }
    
    Object.defineProperty(exports, "__esModule", {value: !0});
    var _jquery = __webpack_require__(18), _jquery2 = _interopRequireDefault(_jquery);
    window.$ = _jquery2.default, window.jQuery = _jquery2.default, exports.default = _jquery2.default
  }, 18: function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__(19)(2)
  }, 19: function (module, exports) {
    module.exports = jquery_d882153f
  }, 20: function (module, exports, __webpack_require__) {
    "use strict";
    /*function generateDownloadUrl(language) {
      return /iPhone/.test(window.navigator.userAgent) ? "" : "en" === language ? "https://play.google.com/store/apps/details?id=com.webull.trade&hl=zh_CN" : ""
    }*/
    
    //Object.defineProperty(exports, "__esModule", {value: !0}), exports.find = exports.getLocale = exports.getQuery = exports.getCookies = exports.isNotNull = exports.isNull = void 0, exports.generateDownloadUrl = generateDownloadUrl;
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
  }, 21: function (module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: !0});
    var domainSettingTemp = void 0;
    domainSettingTemp = {QuoteApiDomain: "https://cn-quoteapi.webull.com/"};
    exports.domainSetting = domainSettingTemp, exports.supportLanguage = ["en", "zh"], exports.languageKey = "fm_hl", exports.queryLanguageKey = "hl", exports.isWebullApp = /webull(?!broker)/i.test(navigator.userAgent)
  }, 22: function (module, exports) {
  }, 35: function (module, exports) {
  }, 38: function (module, exports, __webpack_require__) {
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
            var i, spaceBetween = s.params.spaceBetween, slidePosition = -s.params.slidesOffsetBefore,
              prevSlideSize = 0, index = 0;
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
            s.animating = !1, s.setWrapperTransition(0), "undefined" == typeof runCallbacks && (runCallbacks = !0), s.lazy && s.lazy.onTransitionEnd(), runCallbacks && (s.emit("onTransitionEnd", s), s.activeIndex !== s.previousIndex && (s.emit("onSlideChangeEnd", s), s.activeIndex > s.previousIndex ? s.emit("onSlideNextEnd", s) : s.emit("onSlidePrevEnd", s))), s.params.history && s.history && s.history.setHistory(s.params.history, s.activeIndex), s.params.hashnav && s.hashnav && s.hashnav.setHash()
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
                  var slide = s.slides.eq(i), slideSize = s.slidesSizesGrid[i],
                    slideOffset = slide[0].swiperSlideOffset,
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
              z.gesture.image && 0 !== z.gesture.image.length && (s.support.gestures ? z.scale = e.scale * z.currentScale : z.scale = z.gesture.scaleMove / z.gesture.scaleStart * z.currentScale, z.scale > z.gesture.zoomMax && (z.scale = z.gesture.zoomMax - 1 + Math.pow(z.scale - z.gesture.zoomMax + 1, .5)), z.scale < s.params.zoomMin && (z.scale = s.params.zoomMin + 1 - Math.pow(s.params.zoomMin - z.scale + 1, .5)), z.gesture.image.transform("translate3d(0,0,0) scale(" + z.scale + ")"))
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
        
        var i,
          events = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
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
  }
});