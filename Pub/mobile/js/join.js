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
    
    var _jquery = __webpack_require__(17), _jquery2 = _interopRequireDefault(_jquery),
      _swiper = __webpack_require__(38), _swiper2 = _interopRequireDefault(_swiper);
    __webpack_require__(162), __webpack_require__(35), __webpack_require__(16);
    var allJobData = __webpack_require__(181), baseI18nData = __webpack_require__(182), jobData = null, i18nData = null;
    (0, _jquery2.default)(document.body).hasClass("en") ? (jobData = allJobData.en, i18nData = baseI18nData.en) : (jobData = allJobData.zh, i18nData = baseI18nData.zh), module.exports = !function () {
      function createJobDetailDom(tagLi, jobDetailData) {
        var $content = (0, _jquery2.default)('<div class="job-description">\n      <div class="part-1">\n        <div class="tit">' + i18nData.join.duty + '</div>\n        <ul/>\n      </div>\n      <div class="part-2">\n        <div class="tit">' + i18nData.join.require + '</div>\n        <ul/>\n      </div>\n      <div class="hr-email">\n        <div>' + i18nData.join.just_wait_you + "</div>\n        <div>" + i18nData.join.resume + "</div>\n      </div>\n    </div>");
        tagLi.append($content), tagLi.addClass("active");
        var jobDutyNav = tagLi.find(".part-1 > ul"), jobRequireNav = tagLi.find(".part-2 > ul");
        jobDetailData.jobDuty.forEach(function (duty) {
          jobDutyNav.append("<li>" + duty + "</li>")
        }), jobDetailData.jobRequire.forEach(function (require) {
          jobRequireNav.append("<li>" + require + "</li>")
        })
      }
      
      function expandJobDetail(navLi, jobTypeData) {
        var isActive = navLi.hasClass("active");
        isActive || createJobDetailDom(navLi, jobTypeData.jobList[navLi.index()])
      }
      
      function createSubJobDom(jobTypeData) {
        jobSubNav.empty(), jobTypeData.jobList.forEach(function (jobDetailData, index) {
          var jobName = jobDetailData.jobName, _jobDetailData$jobCla = jobDetailData.jobClass,
            jobClass = void 0 === _jobDetailData$jobCla ? "" : _jobDetailData$jobCla;
          jobSubNav.append('<li class="' + jobClass + '"><div class="title">' + jobName + "</div></li>")
        }), addJobSubNavItemEvents()
      }
      
      function addJobSubNavItemEvents() {
        jobSubNav.find(".title").click(function () {
          event.stopPropagation();
          var jobItem = (0, _jquery2.default)(this).parent(), isActive = !jobItem.hasClass("active");
          jobItem.toggleClass("active"), isActive ? createJobDetailDom(jobItem, jobData[jobNav.find(".active").index()].jobList[jobItem.index()]) : jobItem.find(".job-description").remove()
        })
      }
      
      function scrollTo(container, scrollElement) {
        container.animate({scrollTop: scrollElement.offset().top - container.offset().top}, 500)
      }
      
      var jobList = (0, _jquery2.default)(".job-list"), jobNav = jobList.find(".nav"),
        jobSubNav = jobList.find(".sub-nav"), moreJobBtn = (0, _jquery2.default)(".more-btn");
      jobNav.click(function (event) {
        if ("LI" === event.target.tagName) {
          event.stopPropagation();
          var activeNav = jobNav.find(".active");
          activeNav[0] != event.target && (activeNav.removeClass("active"), (0, _jquery2.default)(event.target).addClass("active"), createSubJobDom(jobData[(0, _jquery2.default)(event.target).index()]))
        }
      }), function (jobData) {
        jobNav.empty(), jobData.forEach(function (jobTypeData, index) {
          var jobType = jobTypeData.jobType, typeClass = jobTypeData.typeClass;
          0 == index ? (jobNav.append('<li class="swiper-slide active ' + typeClass + '">' + jobType + "</li>"), createSubJobDom(jobTypeData)) : jobNav.append('<li class="swiper-slide ' + typeClass + '">' + jobTypeData.jobType + "</li>")
        })
      }(jobData), moreJobBtn.on({
        click: function () {
          scrollTo((0, _jquery2.default)(document.body), (0, _jquery2.default)("#job-content"))
        }
      }), function () {
        function scrollToJob(destSubNav) {
          scrollTo((0, _jquery2.default)(document.body), (0, _jquery2.default)(destSubNav))
        }
        
        function jumpToDest(element, destNav, destSubNav) {
          (0, _jquery2.default)(element).click(function () {
            jobNav.find(destNav).click(), expandJobDetail(jobSubNav.find(destSubNav), jobData[(0, _jquery2.default)(destNav).index()]), scrollToJob(jobSubNav.find(destSubNav))
          })
        }
        
        jumpToDest((0, _jquery2.default)(".job-overview > .test"), ".develop", ".test-server"), jumpToDest((0, _jquery2.default)(".job-overview > .java"), ".develop", ".java-server"), jumpToDest((0, _jquery2.default)(".job-overview > .android"), ".develop", ".android"), jumpToDest((0, _jquery2.default)(".job-overview > .ios"), ".develop", ".ios"), jumpToDest((0, _jquery2.default)(".job-overview > .operate"), ".operations", ".operations-specialist"), jumpToDest((0, _jquery2.default)(".job-overview > .ui"), ".design", ".ui-designer")
      }(), function () {
        new _swiper2.default(".swiper-common.swiper-container", {
          pagination: ".swiper-pagination",
          paginationClickable: !0
        });
        new _swiper2.default(".swiper-container.free-mode", {slidesPerView: "auto", freeMode: !0})
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
   /* function generateDownloadUrl(language) {
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
              !s.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || z.gesture.image && 0 !== z.gesture.image.length && (z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin), z.gesture.image.transition(s.params.speed).transform("translate3d(0,0,0) scale(" + z.scale + ")"), z.currentScale = z.scale, z.isScaling = !1, 1 === z.scale && (z.gesture.slide = void 0));
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
  }, 162: function (module, exports) {
  }, 181: function (module, exports) {
    "use strict";
    module.exports = {
      zh: [{
        jobType: "管理岗位",
        typeClass: "manager",
        jobList: [{
          jobName: "产品总监",
          jobDuty: ["负责证券用户的需求收集、分析，针对客户进行分群、价值诉求分析，规划用户的生命周期；", "负责产品设计，包括FRD、PRD编写，产品原型设计，参与证券行情及交易系统设计；", "协调公司内外部资源推广实施，并全程跟进产品的研发上线；", "参与产品运营推广，跟踪产品数据和收集客户反馈，优化产品；", "全面参与和管理产品的需求调研、研发、推广、数据分析和日常运营等整个产品生命周期的相关工作。"],
          jobRequire: ["本科及以上学历，硕士优先，有成熟的产品团队管理经验；", "3年以上金融产品设计相关工作经验，对金融市场系统，如股票、期货、外汇等之一或多者有设计或业务经验优先；", "对用户需求敏感，重视产品体验，对用户体验把握精准；", "具备较强的文档编写能力和用户交互设计能力；", "具备较强数据分析能力，具备独立产品设计、项目运作的经验和能力；", "从事过成功（移动）互联网产品设计或运营工作的优先。"]
        }, {
          jobName: "运营总监",
          jobClass: "operations-director",
          jobDuty: ["负责公司运营管理工作，包括对用户运营，证券内容运营，促进交易相关活动策划；", "能够独立负责产品的运营工作，并根据业务发展，制定相应产品运营的规划，实现业务诉求和结果；通过对客户需求、市场情况的洞悉，结合核心数据、行业数据等信息，挖掘产品优化改进策略；", "能够独立策划复杂产品的运营活动，整合相关资源，推动项目实施和开展，根据业务需要，制定清晰的阶段目标；", "熟悉金融行业，特别是海外金融市场的动态，发现潜在商业机会，做出商业判断，提出方案并达成结果。"],
          jobRequire: ["资深互联网金融行业工作经验者优先，特别是海外理财服务相关的领域和公司。有电商，直播，游戏运营管理经验者可作为加分项；", "最好具备资深的互联网公司运营经验，能独立完成业务规划和相关营销活动；对市场发展趋势有敏锐的洞察力和创新意识及良好的分析能力；", "沟通能力和独立工作能力强，能够在巨大的压力下保持冷静和判断力。执行力出色，结果导向。"]
        }, {
          jobName: "销售总监",
          jobDuty: ["负责公司海内外相关销售工作，制定销售计划和线下渠道的营销策略，方案并确保有效执行并达成团队业绩；", "开拓国内互联网金融行业销售业务渠道，提供海外证券投资服务，组织团队开发多种销售手段，完成销售计划和任务；", "通过对市场的观察，现有业务的分析，对客户资源进行定位，挖掘客户群体并定向制定有效销售计划和方案；", "负责公司销售团队搭建、培养销售队伍及销售部日常管理工作。"],
          jobRequire: ["资深金融从业工作经验者优先，具备全球投资的金融市场意识；", "诚实守信，时间管理能力和组织管理能力强，具有高度的团队合作精神和高度的工作热情；", "有强烈的创业意识和创新精神，愿与公司一同成长；", "有国内知名互联网证券销售管理经验或阿里中供销售团队管理经验可作为加分项；", "有丰富的金融产品销售渠道及人脉关系优先以及金融产品营销业绩突出者优先。"]
        }, {
          jobName: "UED设计经理",
          jobClass: "ued-director",
          jobDuty: ["负责公司产品（ Web/APP ）的整体视觉设计与用户体验；", "负责公司品牌及产品的总体VI视觉设计，建立统一的视觉设计方案；", "负责公司平面类宣传资料的视觉设计和统筹；", "与产品、市场及技术团队紧密配合，完成所有产品设计、开发与上线；", "负责设计师团队管理，提高团队设计水平。"],
          jobRequire: ["美术、设计或相关专业本科以上学历，有在大型互联网公司从事过应用类产品的主视觉设计、设计管理岗位。设计作品顺利发布并取得一定的市场认可；", "具有5年以上的互联网设计经验，同时在平面设计拥有较高水平，并具有移动互联网产品界面UI设计(包括界面、图标风格与统一规范等)经验；", "扎实的美术功底，设计理论知识丰富，对产品界面趋势有敏锐的洞察力和领悟力；", "较强的沟通能力与团队合作能力；", "具有创业激情与创新精神。"]
        }]
      }, {
        jobType: "技术岗位",
        typeClass: "develop",
        jobList: [{
          jobName: "技术专家",
          jobClass: "experts",
          jobDuty: ["根据公司战略和业务的目标，制定相应技术解决方案，参与核心代码编写；", "负责技术团队人才培养，技术攻坚，提升团队的技术实力；", "对系统性能、稳定性、可扩展性、安全性等指标负责，并具有高度技术前瞻性。"],
          jobRequire: ["本科及以上学历，计算机类相关专业，至少5年以上互联网从业背景，有知名成功项目经验者优先，有金融相关产品研发经验优先；", "精通一个或多个技术领域如互联网架构、移动APP、大数据等等，精通一门以上语言，精通设计模式等；", "具有高度的敏锐度和好奇心，结果优先，富有创业的激情与韧劲。"]
        }, {
          jobName: "Android开发工程师",
          jobClass: "android",
          jobDuty: ["负责 Android平台客户端的开发及优化；", "调研新技术，解决开发中的疑难问题；", "独立进行应用的设计和实现，与团队一起打造最好用的客户端产品。"],
          jobRequire: ["精通 Java，具备扎实的编程基本功和良好的编程习惯；", "熟练掌握 HTTP，SOCKET 和多线程编程，熟练使用 Json/XML，熟练使用 Sqlite 3，数据库，精通Android 的 UI 系统控件，熟练使用自定义控件；", "熟练使用版本控制工具（svn，git至少一种），有 github 等开源项目公开代码者优先；", "熟悉 Material Design优先；", "有股票、外汇等金融方面的客户端经验者优先；", "目标导向，具有较强的学习能力、良好的团队协作和沟通能力；", "三年以上相关工作经验，985、211等高等院校毕业者优先考虑。"]
        }, {
          jobName: "iOS开发工程师",
          jobClass: "ios",
          jobDuty: ["负责 iOS 平台客户端的开发及优化；", "调研新技术，解决开发中的疑难问题；", "独立进行应用的设计和实现，与团队一起打造最好用的客户端产品。"],
          jobRequire: ["精通 Objective-C 或 Swift语言；", "熟练掌握 HTTP，SOCKET 和多线程编程，熟练使用 Json/XML，熟练使用 Sqlite 数据库；", "在 App Store 上发布软件者优先考虑；", "熟练使用版本控制工具（svn，git至少一种），有 github 等开源项目公开代码者优先；", "有股票、外汇等金融产品客户端相关经验者优先；", "目标导向，具有较强的学习能力、良好的团队协作和沟通能力；", "三年以上相关工作经验，985、211等高等院校毕业者优先考虑。"]
        }, {
          jobName: "Java开发工程师",
          jobClass: "java-server",
          jobDuty: ["负责产品服务端的开发工作；", "深入理解业务需求，提供具体问题的解决方案；", "负责相关模块的开发和改进，保证系统性能和稳定性。"],
          jobRequire: ["计算机或相关专业本科以上学历；", "具备扎实Java知识体系，熟悉Spring等开发框架，掌握流行的开源技术；", "熟练掌握mysql、redis、memcache，有丰富的sql优化和表设计经验；", "掌握Linux使用、shell编写；", "熟悉 JVM，对 JVM 调优、性能优化有经验者优先；", "有大规模高并发在线系统或金融IT系统相关经验者优先；", "目标导向，具有较强的学习能力、良好的团队协作和沟通能力。"]
        }, {
          jobName: "算法/模型工程师",
          jobClass: "algorithm-data",
          jobDuty: ["证券数据策略算法、数据分析，找到数据价值；", "大数据平台搭建；"],
          jobRequire: ["计算机或相关专业本科以上学历；", "3年以上大数据经验，掌握Hadoop等流行的开源技术；", "踏实、乐观、主动，具备较好的沟通能力，有良好的团队合作精神；", "有证券行业优先，有量化经验优先。"]
        }, {
          jobName: "运维工程师",
          jobClass: "operation",
          jobDuty: ["负责产品的运维体系搭建，梳理建立运维规范化业务流程，建立相关运维制度；", "负责组织管理在线运行业务系统的监控、维护；", "完善运维监控体系和事件处理机制，确保业务的稳定运行；", "参与业务系统的设计与实施，主导系统架构的可运维性设计、容量规划，优化调整运维平台；", "负责运维团队的建设、管理和人才培养机制，配合公司绩效考核，做好有利技术保障。"],
          jobRequire: ["精通LINUX、MYSQL、分布式、网络等系统的维护和管理；", "熟练使用shell/python等某一种脚本语言；", "3年以上云平台（AWS、AliYun）架构设计（云存储、分布式计算、云应用）或应用开发经验；", "具备较强的沟通能力及团队合作精神，一定的协调组织能力；"]
        }, {
          jobName: "数据校验工程师",
          jobClass: "data-validation",
          jobDuty: ["负责数据校验，确保数据质量；", "负责数据系统的操作运维，进行数据补充、修正等工作；"],
          jobRequire: ["本科以上学历，2年以上工作经验，有良好的数据质量意识，对数据敏感；", "积极主动，能系统分析质量问题，提出改进意见；", "对证券业务熟悉优先，有一定的脚本编写能力优先；"]
        }, {
          jobName: "测试工程师",
          jobClass: "test-server",
          jobDuty: ["负责后台服务的功能测试、接口测试、性能测试和压力测试； ", "引进和开发各种工具来提高测试效率；", "构建服务端环境，将功能测试、接口测试和压力测试集成到CI环境。"],
          jobRequire: ["计算机或相关专业本科以上学历，或有相当水平的从业经历；", "两年以上后台服务开发或测试经验，熟悉软件测试流程和测试用例设计方法；", "有良好的编程能力（熟悉Java或C编程，并熟悉Ruby/Python/JavaScript/Shell等脚本编程中至少一种）；", "熟悉压力测试，熟练使用压测工具Jmeter、http_load等；", "熟悉Jenkins的配置和使用；", "熟练使用Linux或Unix系统及Git，开源工具爱好者。"]
        }]
      }, {
        jobType: "产品岗位",
        typeClass: "product",
        jobList: [{
          jobName: "产品经理",
          jobDuty: ["负责证券用户的需求收集、分析，针对客户进行分群、价值诉求分析，规划用户的生命周期；", "负责产品设计，包括FRD、PRD编写，产品原型设计，并全程跟进产品的研发上线‘", "参与证券行情及交易系统设计", "参与产品运营推广，跟踪产品数据和收集客户反馈，优化产品。"],
          jobRequire: ["本科及以上学历，硕士优先；", "对金融市场系统，如股票、期货、外汇等之一或多者有设计或业务经验优先；", "对用户需求敏感，重视产品体验，对用户体验把握精准；", "具备较强的文档编写能力和用户交互设计能力；", "具备较强数据分析能力，具备独立产品设计、项目运作的经验和能力；", "从事过成功（移动）互联网产品设计或运营工作的优先。"]
        }]
      }, {
        jobType: "设计岗位",
        typeClass: "design",
        jobList: [{
          jobName: "UI设计师",
          jobClass: "ui-designer",
          jobDuty: ["主要负责公司移动端及桌面端平台产品的美术创意、UI界面设计；", "把握客户端软件整体风格、视觉效果、用户操作体验策划及设计；", "配合产品经理进行软件界面优化，提高美观性和用户体验；", "跟踪和分析业界的可用性设计趋势。"],
          jobRequire: ["有良好的手绘能力和草图表现能力，良好的美术功底和设计表现力；", "了解时下流行操作系统的用户使用习惯，重视用户体验；", "了解iOS、Android、Windows、apple平台的界面设计规范；", "精通Photoshop、Illustrator等常用设计软件，具有巧妙的设计创意、良好的色彩运用能力，注重细节，对移动产品的整体风格、视觉流程、操作流程有细致到位的设计能力；", "良好的沟通协调能力以及团队合作精神，能按时、高质量地完成工作任务。"]
        }]
      }, {
        jobType: "市场岗位",
        typeClass: "market",
        jobList: [{
          jobName: "内容媒介",
          jobDuty: ["分析了解产品和用户，产出优质、有传播性的内容；", "参与制定公司的品牌策略，搜集和分析竞品相关信息；", "负责公司在社会化媒体上的内容运营和推广；", "完成品牌总监交代的其他工作，协助进行媒体对接。"],
          jobRequire: ["良好的互联网思维，了解互联网和新媒体内容的创作和传播；", "对互联网金融、证券行业有一定了解，金融和互联网背景优先；", "具有一定文字功底，能够高效的产出内容；", "大学本科学历，具有相关从业经验。"]
        }, {
          jobName: "财经编辑",
          jobDuty: ["配合公司产品、微信公众号等平台完成财经内容的整理采编、选题调研、稿件编辑等工作；", "关注证券财经资讯动向，分析金融市场趋势，完成每日盘面专业点评及定期总结，为投资者提供出具投资意见；", "对市场具有自己看法，针对根据市场动向及重大财经新闻事件剖析、撰写文章，传递给读者最权威、最具观点的财经信息；", "对财经内容进行活动策划；", "完成领导安排的其他任务。"],
          jobRequire: ["新闻学、传播学、金融学、经济管理等相关专业，本科以上学历；", "2年以上互联网编辑、财经新闻报道、财经专栏等相关工作经验，熟悉中国证券市场，有丰富的股票操作经验；", "有良好的沟通能力及团队协作能力，能够承受较强工作压力，善于内外沟通与团队合作，工作责任心强；", "对市场经济敏感，有媒体渠道资源优先；"]
        }, {
          jobName: "市场公关",
          jobDuty: ["负责公司媒体宣传、活动策划执行及品牌推广工作；", "制定和实施各类媒介（包括：报纸、网站、电视、杂志）的宣传计划并进行效果评估，建立完善的媒介管理机制；", "负责市场公关活动管理，公关活动策划及组织，媒体接待；", "负责公司公关宣传稿及各类软文的撰写及发布并审核宣传推广文案及宣传资料涉及的各项内容；", "建立有效的危机公关体系、机制与应急处理；", "开发媒体发布渠道，完善媒体部门对外交际、对内协调沟通的工作。"],
          jobRequire: ["全日制重点本科及以上学历，新闻传媒、公共关系等相关专业优先；", "拥有丰富的媒体资源，能够熟练撰写公关所需文件，出色的文笔功底和富有创意的市场推广思维；", "优秀的表达能力及沟通能力，有较强的应变能力；", "3年以上市场推广及品牌管理经验，有金融科技公司写作及媒体报道经验优先。"]
        }]
      }, {
        jobType: "运营岗位",
        typeClass: "operations",
        jobList: [{
          jobName: "运营专员/专家",
          jobClass: "operations-specialist",
          jobDuty: ["负责挖掘分析用户各种使用场景，结合产品特点制定相应运营方案并执行实施；", "负责日常运营数据的统计、监控、分析，利用有效的运营手段优化提升运营各项核心数据指标；", "负责付费运营，通过产品改进、运营工具梳理、活动策划等手段，提高开户/交易/订阅用户量及付费频次；", "负责产品日常运营工作，包括用户反馈收集与跟进、产品功能维护、内容更新、常规运营活动策划等；", "协助进行用户付费欲望的研究。"],
          jobRequire: ["3年或以上移动互联网运营经验；", "有较强的数据分析能力，善于从数据中发现隐性规律；", "有较强的沟通能力、协调能力，工作细认真负责，执行力强；", "有良好的创意能力、文案能力、审美能力；", "对证券外汇等有一定认知优先，金融工作背景优先。"]
        }, {
          jobName: "APP推广专员/专家",
          jobDuty: ["负责APP推广（境内外），熟悉各类推广渠道和推广手段，制定推广方案，提升流量转化；", "不断开发各类新市场渠道，制定投放计划并执行，完成相关指标；", "负责流量优化，对各渠道市场进行检测分析，并制定应对策略；", "对数据负责，有高度的数据敏锐感性；", "对用户获客量、留存率和活跃度负责。"],
          jobRequire: ["对手机客户端的活动和推广有比较深刻的认识，熟悉各种android/ios应用商店、大型应用、或渠道商，有国内市场资源的优先；", "有激情和有创造力对市场推广有浓厚兴趣，抗压力较好；", "对数据敏感，比较理性；", "英文读写、沟通能力优秀者优先；", "有互联网金融行业经历着优先，股民优先。"]
        }, {
          jobName: "证券分析专家",
          jobDuty: ["对美股、港股、期货、A股等市场有较为深度的了解；能通过各种方式，结合产品功能与市场行情进行投资综合分析，为投资者提供分析观点、分析依据与操作建议；", "能够针对市场机会、行情变化、产品功能与投资知识撰写行情分析与投资报告，帮助投资者及时的把握趋势、挖掘机会与策略操作；", "负责把握股票、证券市场趋势，研究分析大盘及个股行情、操作策略，结合市场交易行为，进行交易策略分析，给产品及运营人员提供行情指导，支持和协助运营团队完成任务；", "能利用视频、路演、自媒体等方式召集投资者，对投资者进行行情机会、个股建议、功能使用与战法分析等方面的指导讲解与综合培训。"],
          jobRequire: ["专科以上学历，专业不限，3年以上相关工作经验；", "至少2年以上投资或炒股经验，具有证券从业资格等；", "具有较好的证券分析与讲解经验，较全面的金融市场知识，并能学习与熟练掌握产品功能、投资知识与工具方法；", "具有较好的沟通与表达能力，较强的撰写与分析能力，例如趋势研判、热点把握、选股逻辑、操作思路与交易时机等相关研究分析能力；", "具备良好的研究与学习能力，勤勉乐于助人，形象气质良好，思维积极活跃，勇于担当，抗压力强，能自我突破，胸怀宽广，愿意主动承担高强度的工作与挑战；", "有一定股友资源者优先。"]
        }]
      }],
      en: [{
        jobType: "Management",
        typeClass: "manager",
        jobList: [{
          jobName: "Product Director",
          jobClass: "product-director",
          jobDuty: ["Collect and analyze the needs of securities users; conduct customer segmentation and value proposition analysis; manage user lifecycle", "Product design, including FRD and PRD development and product prototyping; participate in the design of quotation and trading system", "Coordinate internal and external resources to facilitate the research, development and launch of products and follow through the whole process", "Participate in product operation and promotion, track product data and collect user feedbacks for product optimization", "Fully participate in and manage the related work of the entire product life cycle including product demand survey, research and development, promotion, data analysis and daily operations, etc."],
          jobRequire: ["Bachelor's degree required, master's degree preferred; experienced in product team management", "3+ years of relevant experience in financial product design; design or business experience with financial market system (stocks, futures, forex, etc.) is preferred", "Sensitive to user needs and product experience; accurate grasp of user experience", "Excellent documentation and interaction design skills", "Outstanding data analysis skills; capable of independent product design and project operations", "Experience with design or operations of successful (mobile) Internet product is preferred"]
        }, {
          jobName: "Operations Director",
          jobClass: "operation-director",
          jobDuty: ["Responsible for the company operations and management, including user operation and securities operation; facilitate planning of trading-related activities", "Capable of independent product operation; develop operational planning of products based on the business development to achieve business targets; combine customer needs and market insights with core data and industry data to develop product optimization and improvement strategies", "Able to plan operational activities independently; integrate relevant resources to facilitate project implementation and development; develop clear stage goals based on business needs", "Familiar with the financial industry, especially the dynamic states of overseas financial markets; identify potential business opportunities, make business judgments, put forward the program and achieve results"],
          jobRequire: ["Experience in internet finance industry, especially in related fields and companies of overseas financial services is preferred. Operation and management experience in e-commerce, live streaming and games is a plus", "Experienced in Internet company operation; capable of independent business planning and the relevant marketing; insightful about market trends; excellent sense of innovation and analytical skills", "Outstanding communication and independent work skills; able to remain calm and discreet under great pressure; excellent execution; result-oriented"]
        }, {
          jobName: "Sales Director",
          jobClass: "sales-director",
          jobDuty: ["Responsible for sales at home and abroad; develop sales plans and marketing strategies for offline channels and ensure they are executed effectively to excel in group performance", "Develop domestic sales channels in Internet finance sector; provide investment services of overseas securities; lead the team to develop a variety of sales tools to accomplish sales plans and tasks", "Identify customer resources through market observation and analysis of the existing business; tap into the customer base and develop tailor-made sales plan", "Build and train the company sales team; oversee the day-to-day operation of Sales Department"],
          jobRequire: ["Experience in financial industry is preferred, knowledgeable in global investment and financial market", "Honest and trustworthy; excellence in time management and organization management; good team player; passionate about work", "Strong sense of entrepreneurship and innovation; willing to grow with the company", "Sales management experience in renowned domestic Internet securities company or Alibaba China Supplier is a plus", "Preference will be given to candidate who has access to rich sales channels of financial products and strong personal connections and outstanding performer in financial product marketing"]
        }, {
          jobName: "UED Design Manager",
          jobClass: "ued-director",
          jobDuty: ["Responsible for the overall visual design and user experience of company products (Web/APP)", "Responsible for the overall VI design of company brands and products; establish a cohesive visual design scheme", "Responsible for the graphic design and coordination of promotional materials", "Work closely with product, marketing and technical team to complete the design, development and launch of all products", "Manage the designer team; work to boost the design level of the team"],
          jobRequire: ["Bachelor's degree or higher in fine arts, design or related field; experienced in overall visual design and design management of application products in large Internet companies; has successfully released design works and achieved a certain degree of market recognition", "5+ years of experience in Internet design; excellent graphic design skills; experienced in UI design of mobile Internet product (including interface, icon style and cohesive scheme, etc.)", "Solid artistic skills, knowledge of design theories; insightful about the trends of product interface", "Strong communication skills and teamwork ability", "Passionate about entrepreneurship and innovation"]
        }]
      }, {
        jobType: "Develop",
        typeClass: "develop",
        jobList: [{
          jobName: "Android Engineer",
          jobClass: "android",
          jobDuty: ["Responsible for the development and optimization of Android client", "Investigate new technologies to solve the difficulties in development", "Capable of independent application design and implementation; work with the team to build the best client product"],
          jobRequire: ["Proficiency in Java, solid programming skills and good programming habits", "Proficiency in HTTP, SOCKET and multi-threaded programming; skilled at Json/XML and Sqlite 3 database; proficiency in Android UI controls and custom controls", "Proficiency in version control tools (svn or git is a must); preference will be given to candidate who hosts open source code on Github or other open source projects", "Familiarity with Material Design is preferred", "Experience with stocks, forex and other financial client is preferred", "Goal-oriented; strong learning ability; good teamwork and communication skills", "3+ years of relevant work experience, preference will be given to graduates from Project 985 and 211 universities"]
        }, {
          jobName: "iOS Engineer",
          jobClass: "ios",
          jobDuty: ["Responsible for the development and optimization of iOS client", "Investigate new technologies to solve the difficulties in development", "Capable of independent application design and implementation; work with the team to build the best client product"],
          jobRequire: ["Proficiency in Objective-C or Swift language", "Proficiency in HTTP, SOCKET and multi-threaded programming; skilled at Json/XML and Sqlite database", "Preference will be given to candidate who has published application on App Store", "Proficiency in version control tools (svn or git is a must); preference will be given to candidate who hosts open source code on Github or other open source projects", "Experience with stocks, forex and other financial client is preferred", "Goal-oriented; strong learning ability; good teamwork and communication skills", "3+ years of relevant work experience; preference will be given to graduates from Project 985 and 211 universities"]
        }, {
          jobName: "Java Engineer",
          jobClass: "java-server",
          jobDuty: ["Responsible for the development of product server", "In-depth understanding of business needs to provide specific solutions", "Responsible for the development and improvement of related modules to ensure system performance and stability"],
          jobRequire: ["Bachelor's degree or higher in computer or related field", "Solid Java knowledge; familiarity with Spring and other development frameworks; skilled at popular open source technology", "Proficiency in MySQL, Redis and Memcache; experienced in SQL optimization and table design", "Proficiency in Linux and shell scripting", "Familiarity with JVM; experience with JVM tuning and optimization is preferred", "Experience with large-scale highly concurrent online systems or financial IT systems is a plus", "Goal-oriented; strong learning ability; good teamwork and communication skills"]
        }, {
          jobName: "Algorithm/Model Engineer",
          jobClass: "algorithm-data",
          jobDuty: ["Algorithm strategy for securities data; data analysis; identify data value", "Build large data platform"],
          jobRequire: ["Bachelor's degree or higher in computer or related field", "3+ years of experience in big data; proficiency in Hadoop and other popular open source technology", "Steadfast, optimistic, proactive, good communication skills, good team player", "Experience in the securities industry and quantification is preferred"]
        }, {
          jobName: "Operation and Maintenance Engineer",
          jobClass: "operation",
          jobDuty: ["Build the product operation and maintenance system; develop standard operation and maintenance procedure", "Monitor and maintain the online business system", "Improve the operation and maintenance monitoring system and event-handling mechanism to ensure stable business operation", "Participate in the design and implementation of business systems; lead the operability design and capacity planning of the system architecture; optimization and tuning of the platform", "Build and train the operation and maintenance team; cooperate with the company performance appraisal system; provide technical support"],
          jobRequire: ["Proficiency in maintenance and management of LINUX, MySQL, distributed system and network system", "Proficiency in Shell/Python or other scripting languages", "3+ years of experience in architecture design (cloud storage, distributed computing and cloud applications) of cloud platform (AWS, AliYun) or application development", "Good communication skills and organizational capability; good team player"]
        }, {
          jobName: "Data Validation Engineer",
          jobClass: "data-validation",
          jobDuty: ["Validate data to ensure data quality", "Responsible for the operation and maintenance of the data system; data supplement and correction"],
          jobRequire: ["Bachelor's degree or higher; 2+ years working experience; awareness of data quality; sensitive to data", "Proactive; able to analyze quality problem systematically and come up with specific solutions", "Familiarity with the securities business and good scripting ability are preferred"]
        }, {
          jobName: "Test Engineer",
          jobClass: "test-server",
          jobDuty: ["Responsible for the functional testing, interface testing, performance testing and stress testing of background service", "Introduce and develop various tools to improve testing efficiency", "Build server environment; integrate functional testing, interface testing and stress testing into the CI environment"],
          jobRequire: ["Bachelor's degree or higher in computer or related field", "2+ years of experience in background service development or testing; familiarity with software testing process and test case design methods", "Good programming skills (familiar with Java or C programming, familiar with at least 1 scripting language among Ruby, Python, JavaScript, Shell and others)", "Familiarity with stress testing; skilled at Jmeter, http_load and other stress testing tools", "Familiarity with configuration and use of Jenkins", "Skilled at Linux/Unix systems and Git; open source tools lover"]
        }]
      }, {
        jobType: "Product",
        typeClass: "product",
        jobList: [{
          jobName: "Product Manager",
          jobDuty: ["Collect and analyze the needs of securities users; conduct customer segmentation and value proposition analysis; manage user lifecycle", "Responsible for product design, including FRD and PRD development and product prototyping; follow through the whole process of the research, development and launch of products ", "Participate in the design of quotation and trading system", "Participate in product operation and promotion; track product data and collect user feedback for product optimization"],
          jobRequire: ["Bachelor's degree required, master's degree preferred", "Design or business experience in the financial market system (stocks, futures, forex, etc.) is preferred", "Sensitive to user needs and product experience; accurate grasp of user experience", "Excellent documentation and interaction design skills", "Outstanding data analysis skills; capable of independent product design and project operations", "Experience with design or operations of successful (mobile) Internet product is preferred"]
        }]
      }, {
        jobType: "Design",
        typeClass: "design",
        jobList: [{
          jobName: "UI Designer",
          jobClass: "ui-designer",
          jobDuty: ["Responsible for the art creativity and UI interface design of the company's mobile and desktop client products", "Responsible for the overall style, visual effects and user experience planning and design of the client software", "Work with Product Manager on software interface optimization to improve its aesthetics and user experience", "Follow and analyze industrial trends of usability design"],
          jobRequire: ["Good hand drawing and sketching ability; solid art skills and design capability", "Knowledge of user habits of popular operating systems; attention to user experience", "Knowledge of interface design specifications of iOS, Android, Windows and apple platform", "Proficiency in Photoshop, Illustrator and other commonly used design software; outstanding design creativity and use of color; detail-oriented; able to design meticulously the overall style, visual process and operational process of mobile products", "Good communication and coordination skills; good team player; capable of delivering quality results on time"]
        }]
      }, {
        jobType: "Market",
        typeClass: "market",
        jobList: [{
          jobName: "Content Media",
          jobDuty: ["Analyze and understand products and users to deliver quality and spreadable content", "Participate in the development of the company's brand strategy; collect and analyze information of competing products", "Responsible for company's operation and promotion on social media", "Finish tasks assigned by Brand Director; assist the connections with media"],
          jobRequire: ["Good Internet thinking; familiarity with the creation and spreading of Internet and other new media content", "Knowledge of Internet finance and securities industry; financial and Internet experience is preferred", "Good writing skills; able to deliver quality content efficiently", "Bachelor's degree and relevant experience required"]
        }, {
          jobName: "Financial Editor",
          jobDuty: ["Collect information, select topics and conduct research to edit and develop the financial content for company products and WeChat official account", "Follow the securities and financial information trends; analyze financial market trends; prepare daily expert quotation review and regular summary; provide investors with investment advice", "Have your own idea about the market; write articles based on market trends and major financial news events analysis; deliver the most authoritative and insightful financial information", "Plan financial content activities", "Finish other tasks assigned by leaders"],
          jobRequire: ["Bachelor's degree or higher in journalism, communication, finance, economic management or other related fields", "2+ years of experience with Internet editing, financial news reports, financial columns or other relevant fields; familiarity with China's securities market; rich stock operation experience", "Good communication skills and teamwork ability; able to work under pressure; strong sense of responsibility", "Sensitive to the market economy; preference will be given to candidate who has media channel resources"]
        }, {
          jobName: "Marketing & PR Officer",
          jobDuty: ["Responsible for media publicity, campaign planning and execution and brand promotion", "Establish a media management mechanism, from strategies design (involving newspapers, websites, televisions and magazines), plan implementation to result appraisal", "Manage marketing and public relations; plan and organize events; liaise with media", "Prepare and release publicity content and advertorials; oversee all contents used for publicity and promotion", "Establish an efficient crisis management system and coping tactics", "Broaden and deepen media channels; enhance the external partnership and internal coordination of media department"],
          jobRequire: ["Bachelor's degree from a key university is required; major in news and media or public relations is preferred", "Rich media resources; able to deliver quality publicity contents efficiently; outstanding writing skills and creative marketing ideas", "Good communication skills and strong flexibility in face of uncertainties and changing circumstances", "3+ years of experience in marketing and brand management is required; experience in writing for financial or technology companies or media reports is preferred"]
        }]
      }, {
        jobType: "Operations",
        typeClass: "operations",
        jobList: [{
          jobName: "Operations Specialist",
          jobClass: "operation-specialist",
          jobDuty: ["Analyze user scenarios to align operations plans with product features and execute the plans", "Collect, monitor and analyze operations data to enhance operations KPI with efficient means", "Manage Pay-Per-Click operations to boost subscriptions/users/transactions/payments, with targeted efforts made in product quality, operations policies, and campaigns", "Responsible for daily product operations, including user feedback collection and follow-ups, product function maintenance, product updates and planning of regular operation activities", "Assist research in user consumption psychology"],
          jobRequire: ["3+ years of experience in mobile internet operations", "Strong data analysis ability to discover underlying patterns", "Excellent communication and coordination skills; diligence in work; excellent execution", "Creative in bringing out ideas and producing articles; fine aesthetic sense", "Knowledge in securities and foreign exchange or experience in financial sector is preferred"]
        }, {
          jobName: "App Promotion Specialist",
          jobDuty: ["Responsible for App promotion at home and abroad; produce plans to boost monetizing of traffic using various channels and approaches", "Broaden and deepen various marketing channels; develop and implement advertising plans to yield desired targets", "Responsible for traffic optimization; conduct comprehensive market research to develop targeted strategies", "Manage data with industry insights and data sensitivity", "Seek growing clients, subscriptions, and transactions"],
          jobRequire: ["Familiar with Android/iOS App Store, popular apps, and channels; insightful with promotions and campaigns targeting mobile clients; preference will be given to candidate with domestic market resources", "Creative and passionate in marketing and promotion; able to work under stress", "Proven data control capacity; rational", "English proficiency in reading and writing and good communication skills are preferred", "Experience in ITFIN or stock trading is preferred"]
        }, {
          jobName: "Securities Analyst",
          jobDuty: ["Insightful about U.S. stocks, HK stocks, futures and A-shares; conduct comprehensive investment analysis based on product functions and market quotations to provide investors with analytical perspectives and recommendations", "Prepare quotation analysis and investment reports, summarizing market opportunities, quotation changes, product functions and investment knowledge for investors to better understand the market trends, fully tap market potentials, seize the window and work out the strategy", "Watch closely stock and security markets and study market index, stock quotes, operations strategies and trading behaviors to analyze trading strategies; provide quotation guides to product and operations team; support and assist the operations team to deliver targets", "Attract investors through videos, road shows, and we-media; provide investors with guidance or training on market opportunities, recommendations about individual stocks, product usage and functions and trading strategies"],
          jobRequire: ["Associate degree in any subject; 3+ years of relevant work experience", "2+ years of experience in investing or stock trading; qualification certificate for securities industry required", "Excellent securities analyst and presenter; comprehensive knowledge about financial market; fast learning ability to grasp product functions, investment knowledge and tool-kit", "Good communication and writing skills to prepare researches and analysis on trend studying, hot spot issues, logics in stock selection, operation ideas and timing", "Quick learner and diligent researcher; helpful in life, aggressive in work; motivated and optimistic; able to work under pressure; willing to take challenges and ready to seek breakthroughs", "Preference will be given to candidate with resources in stock trading "]
        }]
      }]
    }
  }, 182: function (module, exports) {
    "use strict";
    module.exports = {
      zh: {
        body: {class: "zh"},
        head: {
          language: "zh",
          copyright: "中盈网",
          description: "中盈网专注于为全球个人投资者提供金融市场服务，服务涵盖数据、交易及辅助交易。公司致力于通过数据来发现、创造和分享价值，是一间基于数据的金融科技公司。",
          keywords: "中盈网,美港股投资,美港股开户交易,实时行情,福米官网,微牛,微牛APP,Webull,FinTech,金融科技,全球股票基金外汇及期货实时行情"
        },
        nav: {
          company: "中盈网",
          home: "首页",
          introduce: "产品介绍",
          about: "关于我们",
          help: "帮助",
          join: "加入我们",
          currentLanguage: "简体中文",
          chinese_simple: "简体中文",
          chinese_simple_href: "?hl=zh",
          english: "English",
          english_href: "?hl=en"
        },
        foot: {
          download: "中盈网下载",
          download_btn_m: "微牛客户端下载",
          tips: "中盈网网站上的任何内容均不可视为购买或出售证券、期货或其它投资产品的一种建议或招揽。任何信息及数据仅供投资者参考，所有历史数据均不可视为对未来走势的判断依据。投资者应仔细了解相关金融产品，明确其风险因素及自身的风险承受能力，或寻求专业的投资顾问的建议。投资有风险，入市须谨慎。",
          policy: "中盈服务协议",
          copyright: "中盈网 鲁ICP备17035173号",
          contact: "联系我们",
          follow: "关注我们",
          date: "周一到周五 0:00—24:00 ",
          date_split: ["周一到周五 0:00—24:00", ""]
        },
        home: {
          title: "中盈网：微牛-美港股开户交易 全球股票基金外汇及期货实时行情-中盈网官方网站",
          h1: "全球可靠的交易和数据服务商",
          h2: "更广视野 更多机会",
          item: "个",
          million: "万",
          kind: "种",
          mb: "兆",
          capital_flows: "实时资金流向",
          total_turnover: "累计成交额",
          data1_desc: "来自全球#userInvolvingAreas#个不同国家和地区的#users#万用户正在使用微牛服务",
          data2_desc: "微牛数据覆盖全球超过#dataInvolvingAreas#个国家和地区的股票、债券、基金、外汇、衍生品5大类别",
          data3_desc: "中美两大数据中心为用户提供超过100兆专线的可靠服务",
          feature: "安全、可靠、丰富的交易服务",
          feature1: "规范成熟的监管",
          feature1_desc: "受SEC（美国证券交易监督委员会）、FINRA（美国金融监管局）监管，投资人受SIPC（证券投资人保护公司）保护，最高可享3000万美元的赔付。",
          feature2: "稳定可靠的基础设施",
          feature2_desc: "合作伙伴美国盈透证券（Interactive Brokers 纳斯达克上市 IBKR）提供可靠的底层账户、交易、清算和资金托管服务。汤森路透提供全球实时数据服务；亚马逊云提供稳定可靠的交易及数据网络。",
          feature3: "丰富便捷的交易玩法",
          feature3_desc: "支持市价，限价，止损价，止损限价等订单类型，实现多种交易策略；支持T+0当日买入卖出；允许盘前盘后交易，扩展投资时段。",
          feature4: "极低交易成本",
          feature4_desc: "领先的金融科技带来极低交易成本，美股佣金低至0.01美元/股，最低2.88美元/笔；港股佣金低至0.08%，最低45港元/笔；融资利率最低至1.86%。",
          feature5: "低成本杠杆放大投资收益",
          feature5_desc: "3000美元便可享受最高4倍融资融券杠杆，以及无门槛自带杠杆ETF（如NUGT,JNUG）。",
          feature6: "全球市场 顶级标的",
          feature6_desc: "数万支股票覆盖北美、欧洲、亚洲各领域顶级优秀公司，数千支ETF追踪全球指数、主流行业、重要地区，抓住全球机会。",
          service: "全面、快速、深度的数据服务",
          service1: "多地区多品类海量数据",
          service1_desc: "数据覆盖90+国家/地区，106家交易所；囊括指数、股票、债券、基金、外汇、衍生品5大类别；包含25,000+股票、100,000基金、1000+外汇对，3000+期货合约，全球信息一网打尽。",
          service2: "毫秒级实时行情",
          service2_desc: "全球各大市场指数，美洲、欧洲、亚洲数万支股票，全球上千个外汇毫秒级的行情数据更新，时刻与市场保持同步。",
          service3: "化繁为简",
          service3_desc: "海量数据深度挖掘，财务统计，经营分析、行业对比、专业预测，帮您解读市场动向，化繁为简。",
          service4: "权威评级",
          service4_desc: "来自晨星全球数十万支基金评级，翔实的持仓报告，不同时间区间的涨幅及同类排名等数据，全面立体了解每支基金。",
          partner: "全球顶级合作伙伴",
          investors: "投资人",
          team: "核心团队",
          ceo: "王安全",
          cmo: "Anthony M. Denier",
          cco: "陆胜",
          cdo: "李伟波",
          ceo_desc: "创始人、CEO，在金融科技领域有丰富的工作经验。先后任职阿里巴巴、恒丰银行、小米，是阿里金融、恒丰银行网络金融资产交易部、小米金融的的核心创建者；2016年3月创建中盈网。",
          cmo_desc: "CMO、美国公司CEO，在华尔街工作17年，有丰富的金融业务及合规经验。先后任职瑞信、AIG、LXM Group等公司，2017年加入中盈网，出任中盈网首席金融市场官及美国公司CEO。",
          cco_desc: "CCO、美国公司COO，在华尔街工作超过20年，有丰富的合规及交易业务经验。先后任职富达、UBS、高盛、KCG等公司，2017年加入中盈网，出任中盈网首席合规官及美国公司COO。",
          cdo_desc: "CDO，在彭博总部工作15年，中信证券总部工作4年，有丰富的数据及交易业务经验。2016年加入中盈网，出任中盈网首席数据官。",
          global: "全球",
          am: "美洲",
          ea: "欧非",
          ap: "亚太",
          ex_toronto: "多伦多证券交易所",
          ex_toronto_v: "总市值：33021.74(亿美元)",
          ex_paris: "巴黎泛欧证券交易所",
          ex_paris_v: "总市值：23453.25(亿美元)",
          ex_bombay: "孟买证券交易所",
          ex_bombay_v: "总市值：20028.96(亿美元)",
          ex_indianational: "印度国家证券交易所",
          ex_indianational_v: "总市值：20052.57(亿美元)",
          ex_swiss: "瑞士交易所",
          ex_swiss_v: "总市值：18761.37(亿美元)",
          ex_amsterdam: "阿姆斯特丹泛欧证券交易所",
          ex_amsterdam_v: "总市值：15424.91(亿美元)",
          ex_australian: "澳大利亚证券交易所",
          ex_australian_v: "总市值：13460.35(亿美元)",
          ex_stockholm: "OMX斯德哥尔摩证券交易所",
          ex_stockholm_v: "总市值：10490.47(亿美元)",
          ex_taiwan: "台湾证券交易所",
          ex_taiwan_v: "总市值：9989.28(亿美元)",
          ex_bovespa: "巴西证券交易所",
          ex_bovespa_v: "总市值：9140.36(亿美元)",
          ex_mercados: "西班牙证券交易所",
          ex_mercados_v: "总市值：8251.26(亿美元)",
          ex_copenhagen: "OMX哥本哈根证券交易所",
          ex_copenhagen_v: "总市值：4385.9(亿美元)",
          ex_brussels: "泛欧布鲁塞尔证券交易所",
          ex_brussels_v: "总市值：4212.11(亿美元)",
          ex_mexicana: "墨西哥证券交易所",
          ex_mexicana_v: "总市值：4193.36(亿美元)",
          ex_helsinki: "OMX赫尔辛基证券交易所",
          ex_helsinki_v: "总市值：2733.9(亿美元)",
          ex_oslo: "奥斯陆证券交易所",
          ex_oslo_v: "总市值：2644.5(亿美元)",
          ex_frankfurt: "法兰克福证券交易所",
          ex_frankfurt_v: "总市值：2234.65(亿美元)",
          ex_telaviv: "特拉维夫证券交易所",
          ex_telaviv_v: "总市值：1719.31(亿美元)",
          ex_lisbon: "泛欧里斯本证券交易所",
          ex_lisbon_v: "总市值：686.82(亿美元)",
          ex_venture: "多伦多创业交易所",
          ex_venture_v: "总市值：373.3(亿美元)",
          ex_iceland: "OMX冰岛证券交易所",
          ex_iceland_v: "总市值：88.75(亿美元)",
          ex_canadian: "加拿大国家证券交易所",
          ex_canadian_v: "总市值：10.94(亿美元)",
          ex_cff: "中国金融期货交易所",
          ex_dlc: "大连商品交易所",
          ex_shf: "上海期货交易所",
          ex_zzc: "郑州商品交易所",
          ex_tyo: "东京证券交易所",
          ex_tyo_v: "总市值：55390.31(亿美元)",
          ex_shh: "上海证券交易所",
          ex_shh_v: "总市值：50778.6(亿美元)",
          ex_shz: "深圳证券交易所",
          ex_shz_v: "总市值：32600.56(亿美元)",
          ex_hkg: "香港交易所",
          ex_hkg_v: "总市值：60573.31(亿美元)",
          ex_lse: "伦敦证券交易所",
          ex_lse_v: "总市值：23104.62(亿美元)",
          ex_nyse: "纽约证券交易所",
          ex_nyse_v: "总市值：286898.58(亿美元)",
          ex_nsq: "纳斯达克证券交易所",
          ex_nsq_v: "总市值：99706.2(亿美元)",
          ex_ses: "新加坡证券交易所",
          ex_ses_v: "总市值：6521.87(亿美元)",
          ex_dbg: "德意志证券交易所",
          ex_dbg_v: "总市值：22584.1(亿美元)"
        },
        introduce: {
          title: "产品介绍：微牛-美港股开户交易 全球股票基金外汇及期货实时行情-中盈网官方网站",
          download_m: "微牛客户端下载",
          h1: "更广视野 · 更多机会",
          open: "极速开户",
          open1_desc: "随时随地,一张身份证一分钟极速开户",
          open2_desc: "美股，港股，ETF等交易品类一次开通",
          open3_desc: "登录密码，交易密码双重保护",
          open4_desc: "有疑问？在线客服恭候垂询",
          open1_t1: "1<span>分钟</span>",
          open1_t2: "极速开户",
          open2_t1: "1<span>个账户</span>",
          open2_t2: "多个品类",
          open3_t1: "双重保护",
          open3_t2: "登录交易密码",
          open4_t1: "在线客服",
          open4_t2: "随时恭候",
          flexible: "交易玩法灵活多样",
          flexible_tip: "做多做空/4倍杠杆/T+0交易/4种订单类型/2种有效期",
          flexible1: "可做多可做空，牛市熊市都能赚",
          flexible1_m: "可做多可做空<br/>牛市熊市都能赚",
          flexible1_desc: "卖出数量大于持仓数量时，自动融券，自动按天计息.按月结算；",
          flexible2: "最高享4倍融资杠杆",
          flexible2_m: "最高享4倍<br/>融资杠杆",
          flexible2_desc: "根据账户资产风险评估，实时计算可用；融资购买力，动态计算实际融资金额；",
          flexible3: "T+0交易轻松赚差价",
          flexible3_m: "T+0交易<br/>轻松赚差价",
          flexible3_desc: "5个工作日内，最多可享3次T+0交易，当账户净资产超过11万美元时，则无次数限制；",
          flexible4: "4种订单类型，两种有效期",
          flexible4_m: "4种订单类型<br/>两种有效期",
          flexible4_desc: "市价，限价，止损价，止损限价4种订单类型可供选择，实现多种交易策略；当日有效，永久有效两种有效期既可当日取消定单，也可将来取消；",
          cost: "极低交易成本",
          cost_desc1: "美股佣金低至0.01美元/股，最低2.88美元/笔；港股佣金低至0.08%，最低45港元/笔；下单自动估算佣金，费用一目了然。",
          cost_desc2: "融资利率低至1.86%起，借入10000美元，每天最低只需0.05美元利息（具体利率与您借入资金数量及隔夜利率有关）。<br/>累计未偿还利息按天自动计算。",
          cost1: "美股佣金",
          cost1_desc: "美金/股",
          cost2: "港股佣金",
          cost2_desc: "*交易额",
          cost3: "融资利率",
          cost3_desc: "起",
          rich: "丰富易读的资产概况",
          rich1: "保证金使用状态图形化展示，净资产不足自动预警，<br>降低被强制平仓的风险。",
          rich2: "多维度剖析当前资产状况：资产类别（现金、美股、港股等）<br>做多市值及做空市值等，全面掌握资产分布。",
          rich3: "持仓标的每日浮动盈亏走势图，<br>完整呈现历史数据，提供决策依据。",
          quotes: "全面实时的行情数据",
          quotes1: "免费提供90+国家/地区的5大品类，包含25,000+股票、100,000基金、1000+外汇对，3000+期货合约，市场板块自由定制关注数据。",
          quotes2: "标的价格走势，买卖档口，成交明细免费奉上，另有更高级别市场深度数据按需购买。",
          quotes3: "图形化的财务数据，经营分析，行业对标，化繁为简，通俗易懂。",
          quotes_catalog1: "大品类",
          quotes_catalog2: "国家/地区",
          quotes_catalog3: "交易所",
          quotes_catalog4: "外汇对",
          quotes_catalog5: "期货合约",
          quotes_catalog6: "股票",
          quotes_catalog7: "基金",
          tools: "丰富实用的辅助工具",
          tools1: "自选组合列表自由添加各品类标的，高效追踪关注标的的最新行情。",
          tools2: "模拟持仓录入交易明细，自动根据真实市场行情计算盈亏，模拟真实交易。",
          tools3: "详实的财经日历数据，准确及时获取新股上市，退市，停牌，财报发布，分红派息，除权等信息。",
          tools4: "丰富的个股K线走势技术指标：MA,EMA,BOLL,MACD,KDJ等14种。",
          search: "跨品类搜索及交叉导航体验",
          search1: "搜索提供股票，指数，基金，外汇，商品，衍生品等不同品类的统一搜索体验，在数十万标的中迅速找到期望标的。",
          search2: "指数页面自动关联股指期货及其对应成分股，实现品类联动。",
          search3: "基金详情展示最新股票等投资标的的持仓明细，轻松了解基金投资方向。"
        },
        about: {
          title: "关于我们：微牛-美港股开户交易 全球股票基金外汇及期货实时行情-中盈网官方网站",
          h1: "湖南福米信息科技有限责任公司是一家全球可靠的交易和数据服务商，服务涵盖信息、交易和辅助交易。",
          h2: " 旗下微牛（Webull）系列产品覆盖90多个国家/地区、5大品类、106个交易所、100000+个投资标的，",
          h2_m: " 旗下微牛（Webull）系列产品覆盖90多个国家/地区、5大品类、106个交易所、100000+个投资标的，",
          h3: " 全球多地部署有数据中心，为用户提供极速数据和交易服务，完整呈现市场细节。",
          h3_m: " 全球多地部署有数据中心，为用户提供极速数据和交易服务，完整呈现市场细节。",
          title1: "理念",
          title1_desc: "对市场心怀敬畏、感恩，投资者与市场和谐相处是福米对<br>金融市场生态的理解和愿景。任何人面对市场的时候都是渺小的，<br>不要意图操纵市场，否则将会被市场反噬，是为“微”。牛市者持续为善、<br>凶猛为恶，节奏最为重要；人与市场、虚拟和实体的自然、<br>妥善结合是为”牛“。中盈网始终以谦卑之势面对客户和市场，<br>恪守规则、保持初心。",
          title1_desc_m: "对市场心怀敬畏、感恩，投资者与市场和谐相处是福米对金融市场生态的理解和愿景。任何人面对市场的时候都是渺小的，不要意图操纵市场，否则将会被市场反噬，是为“微”。牛市者持续为善、凶猛为恶，节奏最为重要；人与市场、虚拟和实体的自然、妥善结合是为”牛“。中盈网始终以谦卑之势面对客户和市场，恪守规则、保持初心。",
          title2: "核心团队",
          title2_desc: "公司核心团队曾在阿里巴巴、小米、华为、瑞信、高盛、彭博<br>等国内外知名机构担任高管或核心岗位多年并取得优秀业绩，<br>拥有丰富的金融及互联网知识和经验，对市场有独到的<br>看法和理解。<br>",
          title2_desc_m: "公司核心团队曾在阿里巴巴、小米、华为、瑞信、高盛、彭博等国内外知名机构担任高管或核心岗位多年并取得优秀业绩，拥有丰富的金融及互联网知识和经验，对市场有独到的看法和理解。",
          title3: "发展历程",
          title4: "全球顶级合作伙伴",
          title5: "投资人",
          title6: "联系我们",
          ceo: "王安全",
          cmo: "Anthony M. Denier",
          cco: "陆胜",
          cdo: "李伟波",
          ceo_desc: "创始人、CEO，在金融科技领域有丰富的工作经验。先后任职阿里巴巴、恒丰银行、小米，是阿里金融、恒丰银行网络金融资产交易部、小米金融的的核心创建者；2016年3月创建中盈网。",
          cmo_desc: "CMO、美国公司CEO，在华尔街工作17年，有丰富的金融业务及合规经验。先后任职瑞信、AIG、LXM Group等公司，2017年加入中盈网，出任中盈网首席金融市场官及美国公司CEO。",
          cco_desc: "CCO、美国公司COO，在华尔街工作超过20年，有丰富的合规及交易业务经验。先后任职富达、UBS、高盛、KCG等公司，2017年加入中盈网，出任中盈网首席合规官及美国公司COO。",
          cdo_desc: "CDO，在彭博总部工作15年，中信证券总部工作4年，有丰富的数据及交易业务经验。2016年加入中盈网，出任中盈网首席数据官。",
          history1: "中盈网成立",
          history2: "美国及香港数据中心建成",
          history3: "行情产品发布",
          history4: "完成5000万天使轮融资",
          history5: "交易产品发布",
          history6: "荣登美国时代广场",
          history7: "完成A轮1亿人民币融资",
          ex_toronto: "多伦多证券交易所",
          ex_paris: "巴黎泛欧证券交易所",
          ex_bombay: "孟买证券交易所",
          ex_indianational: "印度国家证券交易所",
          ex_swiss: "瑞士交易所",
          ex_amsterdam: "阿姆斯特丹泛欧证券交易所",
          ex_australian: "澳大利亚证券交易所",
          ex_stockholm: "OMX斯德哥尔摩证券交易所",
          ex_taiwan: "台湾证券交易所",
          ex_bovespa: "巴西证券交易所",
          ex_mercados: "西班牙证券交易所",
          ex_copenhagen: "OMX哥本哈根证券交易所",
          ex_brussels: "泛欧布鲁塞尔证券交易所",
          ex_mexicana: "墨西哥证券交易所",
          ex_helsinki: "OMX赫尔辛基证券交易所",
          ex_oslo: "奥斯陆证券交易所",
          ex_frankfurt: "法兰克福证券交易所",
          ex_telaviv: "特拉维夫证券交易所",
          ex_lisbon: "泛欧里斯本证券交易所",
          ex_venture: "多伦多创业交易所",
          ex_iceland: "OMX冰岛证券交易所",
          ex_archipelago: "纽约群岛交易所",
          ex_canadian: "加拿大国家证券交易所",
          ex_cff: "中国金融期货交易所",
          ex_dlc: "大连商品交易所",
          ex_shf: "上海期货交易所",
          ex_zzc: "郑州商品交易所",
          ex_petroleum: "欧洲洲际交易所",
          ex_londonfinancials: "伦敦国际金融期货交易所",
          phone: "电话",
          email: "邮箱",
          business_phone: "合作：0731-85573929",
          customerservice_phone: "客服：400-801-9850",
          service_email: "客服：zhongyingwangzs@163.com",
          service_cooperation: "合作：business@webull.com",
          address: "地址",
          address_cn: "中国：长沙",
          address_us: "美国：纽约"
        },
        help: {
          title: "帮助：微牛-美港股开户交易 全球股票基金外汇及期货实时行情-中盈网官方网站",
          mobile_title: "帮助",
          mobile_detail_title: "帮助详情",
          guide: "开户指南",
          transfer: "转户指南",
          funding: "资金相关",
          commission: "佣金费率",
          us_trade: "美股交易",
          hk_trade: "港股交易",
          stock_trade: "股票交易",
          cfd: "差价合约",
          margin: "融资融券",
          security: "账户安全",
          features: "产品功能",
          catalog: "帮助分类",
          faq: "常见问题",
          faq_1: "如何开通微牛交易账户？",
          faq_2: "美股收费标准？",
          faq_3: "港股收费标准？",
          faq_4: "如何汇款入金？",
          faq_5: "微牛是如何保护我的个人隐私的？",
          faq_6: "我的微牛交易账户受到哪些监管和保护？",
          faq_7: "出金一般多长时间能到账？",
          help: "帮助",
          help_detail_m: "帮助首页"
        },
        join: {
          title: "加入我们：微牛-美港股开户交易 全球股票基金外汇及期货实时行情-中盈网官方网站",
          agree: "你认同吗？",
          txt1: "科技极大的提升了金融的用户体验<br/>数据智慧（AI）将成为金融的重要驱动力<br/>中国的人才、技术、资本已经具备了全球化的能力<br/>",
          txt2: "这就是我们看到和相信的，一个全球金融科技的故事和蓝图<br/>欢迎你的到来<br/>",
          txt3: "这就是我们看到和相信的，一个全球金融科技的故事和蓝图",
          hot: "热招职位",
          test_engineer: "测试工程师",
          java_senior: "Java开发工程师",
          android_senior: "Android开发工程师",
          ios_senior: "iOS开发工程师",
          operations_senior: "运营专员/专家",
          ui_senior: "UI设计师",
          more: "更多职位",
          way: "我们在路上",
          user: "全球用户正在使用<br/>福米服务",
          user_desc: "来自全球211个不同国家和地<br/>区643万用户正在使<br/>用福米服务",
          data: "亚洲最全的个人金融<br/>数据提供商",
          data_desc: "覆盖5大品类，90国家/地<br/>区，106家交易所，1,000+外<br/>汇对，25,000+股票",
          office: "全球第1和第2大<br/>经济体同步办公",
          office_desc: "中国长沙、美国纽约",
          talents: "顶级科技和金融<br/>人才的加盟",
          talents_desc: "阿里巴巴、小米、华为、<br/>瑞信、高盛等",
          vc: "一流VC投资",
          vc_desc: "小米、顺为、弘道、墨白",
          provide: "我们提供",
          opportunity: "与大牛一起的工作机会",
          salary: "有竞争力的薪酬",
          complete: "完善的六险一金福利",
          stock: "股票期权",
          paid_leave: "带薪年假",
          meal: "餐饮补贴",
          overtime: "加班福利",
          physical: "年度体检",
          training: "多样化的培养方案",
          casual: "轻松的工作环境",
          rich: "丰富的公司文化",
          need_you: "我们需要这样的你",
          wait_you: "",
          just_wait_you: "",
          resume: "",
          duty: "岗位职责",
          require: "任职要求"
        },
        policy: {
          title: "中盈服务协议",
          article_title: "中盈服务协议",
          article_direction: "欢迎使用湖南福米信息科技有限责任公司（下称“中盈网”）旗下微牛品牌提供的产品/服务（下称“微牛”）。请仔细阅读本服务协议，您在微牛的一切行为将被认为您接受以下服务协议：",
          subtit1: "1. 服务协议的确认和接受",
          txt1: "微牛的所有权归中盈网所有，用户（包括注册用户和非注册用户）必须完全同意所有服务条款，才能使用微牛。",
          subtit2: "2. 协议的完善和修改",
          txt2: "中盈网有权在后续服务中修改本协议，修改后的协议条款将在公司网站或微牛内予以公布，中盈网无需就协议修改事宜逐一通知用户。用户继续使用微牛，视为该用户接受修改后的协议条款，有关中盈网与用户之间的权利及义务的表述关系，以修改后的协议条款为准。",
          subtit3: "3. 接入及注册",
          txt3: "3.1 微牛通过互联网络为用户提供服务，同时，用户必须：<br>&nbsp;&nbsp;a) 自行配备上网所需设备， 包括且不限于手机、网络服务或其他必备上网装置等；<br>&nbsp;&nbsp;b) 自行负担接入互联网的相关费用，包括且不限于电话费用、网络费用等。<br>3.2 为了更好地体验微牛服务，建议用户注册微牛账号，用户注册时应同意：<br>&nbsp;&nbsp;a) 注册用户时，提供注册页面范围内的个人资料；<br>&nbsp;&nbsp;b) 不断更新注册资料，保证个人信息及时、详尽、准确；<br>&nbsp;&nbsp;c) 注册成功后，中盈网可能通过电子邮件或短信向用户推送财经、股市、微牛产品等方面的信息，用户同意接受此类信息，并不视上述信息为垃圾邮件或短信。",
          subtit4: "4. 微牛账号说明",
          txt4: "用户在微牛注册成功后即成为中盈网的合法注册用户，将得到一个包含用户名和密码等信息的微牛账号，此账号的所有权归中盈网所有，中盈网保留随时收回的权利。用户拥有使用权，并可根据自身需求修改账号信息。用户对账号安全负全部责任，并对以其用户名进行的所有活动和事件负全责；若发现任何非法使用用户账号或存在安全漏洞时，用户需立即通知中盈网，中盈网将尽可能保证用户信息安全和拥有做下一步处置的权利。<br>微牛账号仅限注册用户本人使用，注册用户不得以任何盈利或非盈利方式将其提供、转让或者出售给任何第三方使用，如果违反前述约定，中盈网有权自行决定将该注册账号进行禁用处理，且有权采取任何方式禁止擅自转让账号的行为，同时保留进一步通过法律途径追究相关人员法律责任的权利。",
          subtit5: "5. 产品使用条款",
          txt5: "5.1 用户使用微牛时需遵循相关法律和中盈网相关规范：<br>&nbsp;&nbsp;a) 传输资料时必须符合国际有关法规；<br>\t&nbsp;&nbsp;b) 使用行情服务时必须符合各交易所规则与要求；<br>&nbsp;&nbsp;c) 不能用作非法用途；<br>&nbsp;&nbsp;d) 不干扰或混乱微牛产品/服务。<br>5.2 用户同意保障和维护中盈网及其关联方及其他用户的正当权益，负责支付由用户使用超出服务范围引起的诉讼费用，违反服务条款的损害补偿费用等。<br>5.3 用户或中盈网可随时根据实际情况中断一项或多项服务，中盈网不需要对任何第三方进行特别说明。用户对微牛的服务不满，可以行使如下权利：<br>&nbsp;&nbsp;a) 停止使用微牛产品/服务；<br>&nbsp;&nbsp;b) 通告中盈网停止对该用户的服务提供。<br>结束用户服务后，用户使用微牛服务的权利马上中止；即时起，用户没有权利，中盈网也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。<br>5.4 微牛目前提供的行情、资讯等信息均为免费服务，但不保证以后可能对其提供的服务全部或部分收费，用户可根据自身需求选择继续/停止使用服务。",
          subtit6: "6. 隐私条款",
          txt6: "中盈网尊重用户个人隐私策，承诺对涉及个人身份以及隐私的信息严格保密，并保证不对外公开或向第三方提供用户的注册资料及用户在使用服务时存储在中盈网的非公开内容，但下列情况除外：<br>6.1 遵守有关法律、法规的规定，包括在国家有关机关查询时，提供用户的注册信息；<br>6.2 保持维护本公司的知识产权和其他重要权利；<br>6.3 因黑客行为或用户的保管疏忽导致账号、密码遭他人非法使用； <br>6.4 在紧急情况下竭力维护用户个人和社会大众的隐私安全；<br>根据本协议相关规定或者中盈网认为必要的其他情况下。",
          subtit7: "7. 知识产权",
          txt7: "支撑微牛的硬件、软件及内容（包括但不限于著作、图片、档案、资讯、资料、产品架构、产品设计）均由中盈网或其他权利人依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密与专有技术等。任何人不得擅自使用、修改、重制、公开播送、改作、散布、发行、公开发表、进行还原工程、解编或反向组译。若用户准备引用或转载前述软件、程序或产品内容，必须依法取得中盈网或其他权利人的事前书面同意。如若违反，则应负损害赔偿责任（包括但不限于诉讼费及律师费等）。",
          subtit8: "8. 免责声明",
          txt8: "8.1 微牛的行情、资讯信息由第三方数据服务商提供，中盈网及第三方数据服务商不能保证其准确性和可靠性，对于因信息延迟、错误或缺失导致的任何用户损失或损害，中盈网不承担任何法律责任。<br>8.2 微牛为用户提供信息服务，但对信息的准确性、完整性、及时性或用途的适用性不作担保。微牛提供的信息不构成任何投资建议，用户查看或依据这些内容进行的任何行为造成的风险和结果都自行承担责任，中盈网不承担任何法律责任。<br>\t8.3 用户因自己网络问题、设备问题，或因证券交易所、第三方服务商等任何原因，造成的行情信息延迟、停顿和中断，或导致用户在微牛中丢失信息、记录等，中盈网不承担任何法律责任。<br>8.4 由于不可抗力原因，致使的相关服务中断或用户损失，中盈网不承担任何法律责任。<br>8.5 因系统维护或升级而造成的正常服务中断，中盈网将尽可能事先进行通告，同时保留在不事先通知用户的情况下断或终止部分或全部网络服务的权利；对于服务中断或终止而造成的任何损失，中盈网不承担任何法律责任。<br>8.6 用户在使用微牛时，需选择安全的网络环境，并注意密码的保密，防止身份信息被他人仿冒。凡密码正确情况下所进行的一切行为，均视为本人的行为，用户须对行为的内容和后果负责，中盈网不承担任何法律责任。",
          subtit9: "9. 争议解决",
          txt9: "9.1 用户可依据《中华人民共和国产品质量法》、《中华人民共和国消费者权益保护法》等法律法规通过法律途径解决服务存续期内的争议和纠纷。<br>9.2 用户和中盈网发生任何争议，双方应尽量友好协商解决。协商不成立时，可向中盈网注册地所在地人民法院提起诉讼。",
          inscribe: "湖南福米信息科技有限责任公司",
          links_title: "其他第三方条款：",
          links_item1: '<a class="term-link" href="/dowjones">《道琼斯指数使用条款与条件》</a>'
        },
        dowjones: {
          title: "道指使用声明",
          article_title: "道琼斯指数使用条款与条件",
          article_direction: "访问和使用本网站由标普道琼斯指数有限责任公司及（或）其附属机构发布的指数（“指数”）相关的数据（包括但不限于，指数值，以下统称为“指数数据”），您即同意在法律上遵守下列使用条款与条件，包括2012年7月份之后做的所有修改。如果您不同意这些条款与条件的任何部分，您将无法访问并使用这些指数数据。",
          subtit1: "一般使用条款与条件",
          txt1: "本指数（包括但不限于，道琼斯股价平均指数、道琼斯全球指数、道琼斯全球顶尖指数、道琼斯伊斯兰市场指数、道琼斯可持续类指数和道琼斯瑞银大宗商品指数）归标普道琼斯指数有限责任公司、其附属机构或第三方许可方（统称为“标普道琼斯指数”）所有。访问和使用本指数数据，您即承认您的年龄不低于18岁，且同意在法律上遵守所有使用条款与条件。您可以打印并保存一份这些使用条款与条件，但是标普道琼斯指数可能会随时更改本使用条款。更改内容将会以文件形式呈现。在更改内容发布之后使用该指数数据，则表示您同意修改后的使用条款与条件。因此，您应经常阅读本使用条款与条件。如果您不同意遵守这些使用条款与条件，或不同意任何更改，您将无法继续使用本指数数据。",
          subtit2: "知识产权和使用限制",
          txt2: "本指数和指数数据受版权法和其他知识产权法保护。本指数数据仅限个人和非商业用途使用。事先未经标普道琼斯指数书面同意，不得修改、复制、重制、修改、转播、分发、销售、发布、广播、存储本指数数据（或部分数据）或根据其创作衍生作品。不得将本指数数据用于任何非法用途。<br>与本指数相关的所有商品名称、商标、服务标记（不论注册与否）（统称为“标记”）均归标普道琼斯指数及其许可方所有并受适用商标法的保护。未经标普道琼斯指数或其适应的许可方的明确书面许可，不得将本网站的任何内容理解为使用本网站上任何“标记”的许可或授权。<br>同样，未与标普道琼斯指数达成独立书面协议，不得使用与投资产品（如价格、回报及表现是基于或与本指数相关的衍生产品、结构化产品、投资基金、投资组织等）发行、交易、营销或推广相关的任何指数数据或“标记”。此外，标普道琼斯指数提供指数或指数数据，不代表任何投资建议、税务咨询、法律咨询或其他专业咨询建议，且道琼斯指数没有发起、推荐或认可购买或出售任何证券或投资。<br> 如果您违反这些条款与条件的任何一条，标普道琼斯指数有权立即终止您访问全部或部分指数数据，恕不另行通知。您使用指数数据权利受标普道琼斯指数全权酌情决定设定的限制约束。",
          subtit3: "担保和责任免责声明",
          txt3: "指数数据“按原状”提供。标普道琼斯指数、道琼斯有限公司（“道琼斯”）或其各自的附属机构、代理或许可方均不担保指数或指数数据的准确性、完整性、时效性、非侵权性、适销性、特定目的的合适性。虽然标普道琼斯指数尽合理努力遵守道琼斯伊斯兰市场指数成分选择指南，但标普道琼斯指数不能保证或担保这些指数或与之相关的数据会遵守伊斯兰教法或其他伊斯兰原则，标普道琼斯指数明确不做此类担保。标普道琼斯指数或其附属机构、代理或许可方概不负责您或其他任何人因直接使用指数数据所产生的任何损失或伤害，尽管本指数数据是完全或部分因标普道琼斯指数在采购、编译、解读、报告或传输指数或指数数据过程中由于疏忽或控制范围之外的意外所造成。任何情况下，标普道琼斯指数、道琼斯或其各自的附属机构、代理或许可方概不负责您或其他任何人依据指数所做的任何决策或行为。标普道琼斯指数、道琼斯或其各自的附属机构、代理或许可方概不对您或其他任何人的任何损害（包括但不限于相应而生、特殊、附带、间接或相似的损害）承担责任，即使在已获悉可能发生该类损害的情况下亦然。",
          subtit4: "附加条款",
          txt4: "标普道琼斯指数可能会随时中止或更改指数或指数数据或其对您的可用性，恕不另行通知。如果本“协议”的任何规定在适用法律下无效或不可执行，则剩余规定仍然充分有效。本“协议”、您的权利与义务以及本“协议”预期的所有行为均应受到纽约州法律的约束。本“协议”构成您与标普道琼斯指数达成的有关指数和指数数据的全部协议，并取代指数相关的任何其他口头或书面协议。双方同意设立在纽约 (NY) 的州和联邦法院应成为处理本“协议”产生的任何争议的专属法院，且双方特此承认此类法院的属人管辖权。当您浏览本网站，你可能会访问其他网站并受不同的条款约束。当您使用这些网站时，你可能会受这些网站上发布的具体条款的法律约束。如果这些使用条款和那些其他条款之间有冲突，你将受到其他条款的管辖。标普道琼斯指数未能坚持严格遵守本“协议”的任一条款不得视为其自动放弃以后也不遵守此条款或规定。某些数据油汤森路透提供，用于计算指数和指数数据。汤森路透概不负责内容的错误或延误以及依此数据所做的任何行为。<br>这些指数归标普道琼斯指数所有，由其分发并已授权使用。S&P®是标普金融服务有限责任公司（“标普”）的注册商标，而Dow Jones®是道琼斯商标控股有限责任公司（“道琼斯”）的注册商标。这些商标已由标普道琼斯指数有限责任公司许可使用并在特定目的下再授权。"
        }
      }, en: {
        body: {class: "en"},
        head: {
          language: "en",
          copyright: "Hunan Fumi Information Technology Co., Ltd.",
          description: "Fumi Information Technology Co., Ltd.('Fumi Technology'), a Fin-Tech company focusing on providing financial services for personal investors, supplies services of information, trading and assistance trading",
          keywords: "Fumi Technology,currency,commodities,funds,equities market & investing,Webull Trading-Realtime stocks trade,Webull,FinTech"
        },
        nav: {
          company: "FUMI TECHNOLOGY",
          home: "Home",
          introduce: "Product",
          about: "About",
          help: "Help",
          join: "Join",
          currentLanguage: "English",
          chinese_simple: "简体中文",
          chinese_simple_href: "?hl=zh",
          english: "English",
          english_href: "?hl=en"
        },
        foot: {
          download: "Download",
          download_btn_m: "Webull App",
          tips: "No content on Fumi Technology website shall be considered as a recommendation or solicitation for purchase or sale of securities, futures or other investment products. All information and data on the website is for reference only and no historical data shall be considered as the basis for judging future trend. Investors should carefully study the relevant financial products and the relevant risk factors and consider your risk appetite, or seek advice from professional investment advisers. Discreet investment is suggested for the risk of the stock market.",
          policy: "Terms of Webull Service",
          copyright: "FUMI TECHNOLOGY 鲁ICP备17035173号",
          contact: "Contact",
          follow: "Follow",
          date: "Mon. to Fri. 09:00-21:00 Sat. 09:00-15:00",
          date_split: ["Mon. to Fri. 09:00-21:00", "Sat. 09:00-15:00"]
        },
        home: {
          title: "FUMI TECHNOLOGY: Webull Trading-Realtime stocks trade,currency,commodities,funds,equities market & investing",
          h1: "Reliable Global Trading and Data Service Provider",
          h2: "Global Trading · Global Vision",
          item: "",
          million: "M",
          kind: "",
          mb: "Mb",
          capital_flows: "Real-time Capital Flows",
          total_turnover: "Cumulative turnover",
          data1_desc: "#users# million users from #userInvolvingAreas# different countries in the world are using Webull services",
          data2_desc: "Webull data covers stocks, bonds, funds, forex and derivatives of more than #dataInvolvingAreas# countries ",
          data3_desc: "Two data centers in China and US provide users with 100 Mb+ reliable dedicated service",
          feature: "Safe · Reliable · Rich Trading Services",
          feature1: "Mature regulation",
          feature1_desc: "Regulated by SEC (U.S. Securities and Exchange Commission) and FINRA (U.S. Financial Industry Regulatory Authority), investors are protected by SIPC (Securities Investor Protection Company) with up to 30 million USD compensation.",
          feature2: "Stable and reliable infrastructure",
          feature2_desc: "Partners: Interactive Brokers (NASDAQ: IBKR) provides reliable bottom-level accounts, transactions, clearing and custody services; Thomson Reuters provides global real-time data services; Amazon Web Services provides a stable and reliable transaction and data network;",
          feature3: "Rich and convenient trading methods",
          feature3_desc: "Support various order types including market order, limit order, stop order and stop-limit order to achieve a variety of trading strategies; support T+0 settlement; allow pre-market and after-hours trading to extend investment timeframe",
          feature4: "Extremely low trading costs",
          feature4_desc: "Leading financial technology enables extremely low trading costs: a commission from 0.01 USD per share and from 2.88 USD per trade for US stocks; a commission from 0.08% and from 45 HKD per trade for HK stocks; a minimum financing rate of 1.86%.",
          feature5: "Low gearing ratio amplifies investment income",
          feature5_desc: "At 3,000 USD, user can enjoy up to 4X leverage and leveraged ETFs (such as NUGT, JNUG) with no threshold.",
          feature6: "Global market, top-level objects",
          feature6_desc: "Tens of thousands of stocks covering top companies of various sectors in North America, Europe and Asia, thousands of ETFs tracking global indices, major industries and key sectors to seize global opportunities.",
          service: "Comprehensive · Fast · In-depth Data Services",
          service1: "Massive data covering various regions and categories",
          service1_desc: "Massive data coverage: 90+ countries/regions and 106 stock exchanges; indices, stocks, bonds, funds, forex and derivatives; including 25,000+ stocks, 100,000 funds, 1000+ currency pairs and 3000+ commodities. Global information at your hand.",
          service2: "Millisecond-level real-time quotes",
          service2_desc: "Millisecond-level real-time quotes covering indices of major markets worldwide, tens of thousands of stocks in America, Europe and Asia and thousands of currency pairs. Always keep pace with the market.",
          service3: "Make it simple",
          service3_desc: "Make it simple for you to understand market trends with massive data mining, financial statistics, business analysis, industry contrast and professional forecast.",
          service4: "Authoritative rating",
          service4_desc: "Provide comprehensive study of each fund with Morningstar Rating for hundreds of thousands of funds worldwide, informative COT report and ranking by category and growth of different time periods.",
          partner: "Top-level Global Partners",
          investors: "Investors",
          team: "Leadership Team",
          ceo: "Anquan Wang",
          cmo: "Anthony M. Denier",
          cco: "Sheng Lu",
          cdo: "Weibo Li",
          ceo_desc: "Founder & CEO, abundant work experience in financial technology. Used to work in Alibaba, Hengfeng Bank, and Xiaomi. Core builder of Alibaba Finance, Internet Financial Asset Exchange Department of Hengfeng Bank, and Xiaomi Finance; established Fumi Technology in March 2016.",
          cmo_desc: "CMO of Fumi Technology & CEO of Fumi US Branch. With 17 years of financial business and compliance experience on Wall Street, Anthony has served Credit Suisse, AIG and LXM Group and joined Fumi Technology in 2017.",
          cco_desc: "CCO of Fumi Technology & COO of Fumi US Branch. Having worked on Wall Street for over 20 years, Lu has rich experience in compliance and trading business and has served Fidelity, UBS, Goldman Sachs and KCG. Lu joined Fumi Technology in 2017 and serves as CCO of Fumi Technology and COO of Fumi US Branch. ",
          cdo_desc: "CDO. Having worked at headquarters of Bloomberg for 15 years and headquarters of CITIC Securities for 4 years, Li has rich experience in data and trading business. Li joined Fumi Technology in 2016 and serves as CDO of Fumi Technology.",
          global: "Global",
          am: "NA&SA",
          ea: "EU&AF",
          ap: "AS&OA",
          ex_toronto: "Toronto Stock Exchange",
          ex_toronto_v: "Market Capitalization：$ 3302.17 billion",
          ex_paris: "Euronext Paris Stock Exchange",
          ex_paris_v: "Market Capitalization：$ 2345.33 billion",
          ex_bombay: "Bombay Stock Exchange",
          ex_bombay_v: "Market Capitalization：$ 2002.90 billion",
          ex_indianational: "India National Stock Exchange",
          ex_indianational_v: "Market Capitalization：$ 2005.26 billion",
          ex_swiss: "Swiss Exchange",
          ex_swiss_v: "Market Capitalization：$ 1876.14 billion",
          ex_amsterdam: "Euronext Amsterdam Stock Exchange",
          ex_amsterdam_v: "Market Capitalization：$ 1542.49 billion",
          ex_australian: "Australian Securities Exchange",
          ex_australian_v: "Market Capitalization：$ 1346.04 billion",
          ex_stockholm: "OMX Stockholm Stock Exchange",
          ex_stockholm_v: "Market Capitalization：$ 1049.05 billion",
          ex_taiwan: "Taiwan Stock Exchange",
          ex_taiwan_v: "Market Capitalization：$ 998.93 billion",
          ex_bovespa: "BM&F Bovespa",
          ex_bovespa_v: "Market Capitalization：$ 914.04 billion",
          ex_mercados: "Bolsas y Mercados Espa?oles",
          ex_mercados_v: "Market Capitalization：$ 825.13 billion",
          ex_copenhagen: "OMX Copenhagen Stock Exchange",
          ex_copenhagen_v: "Market Capitalization：$ 438.59 billion",
          ex_brussels: "Euronext Brussels Stock Exchange",
          ex_brussels_v: "Market Capitalization：$ 421.21 billion",
          ex_mexicana: "Bolsa Mexicana de Valores",
          ex_mexicana_v: "Market Capitalization：$ 419.34 billion",
          ex_helsinki: "OMX Helsinki Stock Exchange",
          ex_helsinki_v: "Market Capitalization：$ 273.39 billion",
          ex_oslo: "Oslo Stock Exchange",
          ex_oslo_v: "Market Capitalization：$ 264.45 billion",
          ex_frankfurt: "Frankfurt Stock Exchange",
          ex_frankfurt_v: "Market Capitalization：$ 223.47 billion",
          ex_telaviv: "Tel Aviv Stock Exchange",
          ex_telaviv_v: "Market Capitalization：$ 171.93 billion",
          ex_lisbon: "Euronext Lisbon Stock Exchange",
          ex_lisbon_v: "Market Capitalization：$ 68.68 billion",
          ex_venture: "TSX Venture Exchange",
          ex_venture_v: "Market Capitalization：$ 37.33 billion",
          ex_iceland: "OMX Iceland Stock Exchange",
          ex_iceland_v: "Market Capitalization：$ 8.88 billion",
          ex_canadian: "Canadian National Stock Exchange",
          ex_canadian_v: "Market Capitalization：$ 1.09 billion",
          ex_cff: "China Financial Futures Exchange",
          ex_dlc: "Dalian Commodity Exchange",
          ex_shf: "Shanghai Futures Exchange",
          ex_zzc: "Zhengzhou Commodity Exchange",
          ex_tyo: "Tokyo Stock Exchange",
          ex_tyo_v: "Market Capitalization：$ 5539.03 billion",
          ex_shh: "Shanghai Stock Exchange",
          ex_shh_v: "Market Capitalization：$ 5077.86 billion",
          ex_shz: "Shenzhen Stock Exchang",
          ex_shz_v: "Market Capitalization：$ 3260.06 billion",
          ex_hkg: "HongKong Stock Exchange",
          ex_hkg_v: "Market Capitalization：$ 6057.33 billion",
          ex_lse: "London Stock Exchange",
          ex_lse_v: "Market Capitalization：$ 2310.46 billion",
          ex_nyse: "New York Stock Exchange",
          ex_nyse_v: "Market Capitalization：$ 28689.86 billion",
          ex_nsq: "NASDAQ Global Select Market",
          ex_nsq_v: "Market Capitalization：$ 9970.62 billion",
          ex_ses: "Singapore Exchange",
          ex_ses_v: "Market Capitalization：$ 652.19 billion",
          ex_dbg: "Deutsche Boerse - Xetra",
          ex_dbg_v: "Market Capitalization：$ 2258.41 billion"
        },
        introduce: {
          title: "Introduce : Webull Trading-Realtime stocks trade,currency,commodities,funds,equities market & investing",
          download_m: "Webull App",
          h1: "Global Trading · Global Vision",
          open: "Fast Account Setup",
          open1_desc: "Anytime and anywhere, create an account with your ID in 1 minute",
          open2_desc: "Start trading in US stocks, HK stocks and ETFs with 1 single operation",
          open3_desc: "Double protection with login and transaction passwords",
          open4_desc: "Any questions? Online customer support is at your service",
          open1_t1: "1 <span>Minute</span>",
          open1_t2: "Fast account setup",
          open2_t1: "1 <span>Account</span>",
          open2_t2: "Multi categories",
          open3_t1: "Double Protection",
          open3_t2: "Login/transaction passwords",
          open4_t1: "Online Customer",
          open4_t2: "Always welcome",
          flexible: "Flexible and Diverse Trading Methods",
          flexible_tip: "Going long or short/4 times leverage/T+0 settlement/4 order types/2 validity options",
          flexible1: "Going long or short, make money in both bull and bear markets",
          flexible1_m: "Going long or short, make money in both bull and bear markets",
          flexible1_desc: "Automated securities lending when the selling volume is larger than open interest; automated daily interest and monthly settlement;",
          flexible2: "Enjoy up to 4 times leverage",
          flexible2_m: "Enjoy up to 4 times leverage",
          flexible2_desc: "Real-time calculation of available margin buying power and dynamic calculation of the actual amount of financing based on account asset risk assessment;",
          flexible3: "Easily pocket the difference with T+0 settlement",
          flexible3_m: "Easily pocket the difference with T+0 settlement",
          flexible3_desc: "Enjoy up to 3 times of T+0 settlement within 5 working days; enjoy unlimited T+0 settlement when the net asset of your account exceeds 110,000 USD;",
          flexible4: "4 order types and 2 validity options",
          flexible4_m: "4 order types and 2 validity options",
          flexible4_desc: "Market order, limit order, stop order and stop-limit order at your choice to achieve a variety of trading strategies; options of day order and GTC order enables you to cancel the order on the same day or in the future;",
          cost: "Extremely Low Trading Costs",
          cost_desc1: "A commission from 0.01 USD per share and from 2.88 USD per trade for US stocks; a commission from 0.08% and from 45 HKD per trade for HK stocks; automated calculation of commission when placing orders.",
          cost_desc2: "The financing rate is from 1.86%, the minimum interest for 10,000 USD borrowed is only 0.05 USD per day (the specific interest rate is related to the amount of money you borrowed and the overnight rate). Accumulated outstanding interest is automatically calculated on a daily basis.",
          cost1: "US Stock Commission",
          cost1_desc: "USD per share",
          cost2: "HK Stock Commission",
          cost2_desc: "* Trading volume",
          cost3: "Financing Rate",
          cost3_desc: "&nbsp;",
          rich: "Rich and Legible Asset Overview",
          rich1: "Graphical display of margin use status and automatic early warning for <br>inadequate net assets to reduce the risk of forced liquidation.",
          rich2: "Multi-dimensional analysis of the current asset status including asset category (cash, US stocks, HK stocks, etc.), going long and going short, etc. to get a full grasp of asset distribution.",
          rich3: "Daily floating P/L chart with complete historical data to provide decision-making basis.",
          quotes: "Comprehensive Real-time Quotes",
          quotes1: "Free data covering 5 categories in 90+ countries/regions, including 25,000+ stocks, 100,000 funds, 1000+ currency pairs and 3000+ commodities; customize your own watchlist of market board",
          quotes2: "Free price trend, quotes and transaction details of objects and advanced in-depth market data available for purchase",
          quotes3: "Graphical financial data, business analysis and industry contrast make it easy for you",
          quotes_catalog1: "Investment Alternative",
          quotes_catalog2: "Countries and Regions",
          quotes_catalog3: "Stock Exchanges",
          quotes_catalog4: "Currencies",
          quotes_catalog5: "Commodities",
          quotes_catalog6: "Stocks",
          quotes_catalog7: "Funds",
          tools: "Rich Tools",
          tools1: "Customize your own watchlist of various object categories for an efficient tracking of the latest quotes",
          tools2: "Simulate transaction with automated calculation of profit and loss based on real market price and entry of simulated transaction details.",
          tools3: "Detailed financial calendar data provides an accurate and timely access to new listings, delisting, suspension, earnings release, dividends, ex-rights and other information.",
          tools4: "Stock-specific candlestick chart with 14 technical indicators such as MA, EMA, BOLL, MACD, KDJ, etc.",
          search: "Cross-category Search and Cross Navigation Experience",
          search1: "Cross-category search enables you to search for stocks, indices, funds, forex, commodities, and derivatives in the same search bar and quickly find the desired object among hundreds of thousands of objects.",
          search2: "The indices page automatically associates stock index futures with their corresponding constituent stocks",
          search3: "Fund details show the latest position details of stocks and other objects, make it easy for you to understand the trend of fund investment."
        },
        about: {
          title: "About : Webull Trading-Realtime stocks trade,currency,commodities,funds,equities market & investing",
          h1: "For people who wants better investment, Fumi technology is a reliable provider of global financial data and trading services.",
          h2: "Webull, the leading series of our product, cover the five major tradable assets from 106 exchanges,<br/>containing more than 100,000 investment objects from over 90 countries and regions.",
          h2_m: "Webull, the leading series of our product, cover the five major tradable assets from 106 exchanges,containing more than 100,000 investment objects from over 90 countries and regions.",
          h3: "As our data centers around the world, we facilitate our customers with tick-by-tick data and efficient trading services,<br/>representing you a panorama of financial market details.",
          h3_m: "As our data centers around the world, we facilitate our customers with tick-by-tick data and efficient trading services,representing you a panorama of financial market details.",
          title1: "Philosophy",
          title1_desc: "The understanding and vision over the financial ecosystem is to keep solemnity and gratitude in mind with investors. Webull means that anyone is insignificant to the market so never try to control it, hence it is better to keep a steady rise of bull market rather than a ferocious one, and keeping natural and harmonious combinations between investors and the market. We will always keep a humble profile before customers and the market, to toe the line, to keep simple.",
          title1_desc_m: "The understanding and vision over the financial ecosystem is to keep solemnity and gratitude in mind with investors. Webull means that anyone is insignificant to the market so never try to control it, hence it is better to keep a steady rise of bull market rather than a ferocious one, and keeping natural and harmonious combinations between investors and the market. We will always keep a humble profile before customers and the market, to toe the line, to keep simple.",
          title2: "Leadership Team",
          title2_desc: "The core team members of Fumi Technology, once senior executives or holding backbone positions in Alibaba, Xiaomi, Huawei, Bloomberg and domestically well-known financial institutions for years with excellent performance, have accumulated abundant financial and Internet knowledge and experience with original views and understanding of the market.",
          title2_desc_m: "The core team members of Fumi Technology, once senior executives or holding backbone positions in Alibaba, Xiaomi, Huawei, Bloomberg and domestically well-known financial institutions for years with excellent performance, have accumulated abundant financial and Internet knowledge and experience with original views and understanding of the market.",
          title3: "History",
          title4: "Partner",
          title5: "Investors",
          title6: "Contact",
          ceo: "Anquan Wang",
          cmo: "Anthony M. Denier",
          cco: "Sheng Lu",
          cdo: "Weibo Li",
          ceo_desc: "Founder & CEO, abundant work experience in financial technology. Used to work in Alibaba, Hengfeng Bank, and Xiaomi. Core builder of Alibaba Finance, Internet Financial Asset Exchange Department of Hengfeng Bank, and Xiaomi Finance; established Fumi Technology in March 2016.",
          cmo_desc: "CMO of Fumi Technology & CEO of Fumi US Branch. With 17 years of financial business and compliance experience on Wall Street, Anthony has served Credit Suisse, AIG and LXM Group and joined Fumi Technology in 2017.",
          cco_desc: "CCO of Fumi Technology & COO of Fumi US Branch. Having worked on Wall Street for over 20 years, Lu has rich experience in compliance and trading business and has served Fidelity, UBS, Goldman Sachs and KCG. Lu joined Fumi Technology in 2017 and serves as CCO of Fumi Technology and COO of Fumi US Branch. ",
          cdo_desc: "CDO. Having worked at headquarters of Bloomberg for 15 years and headquarters of CITIC Securities for 4 years, Li has rich experience in data and trading business. Li joined Fumi Technology in 2016 and serves as CDO of Fumi Technology.",
          history1: "Founding of Fumi Technology",
          history2: "Establishment of US and HK Data Centers ",
          history3: "Launched quotation service",
          history4: "Completed 50 million RMB angel round financing",
          history5: "Launched trading service",
          history6: "Won a place in Time Square",
          history7: "Completed 100 million RMB A round financing",
          ex_toronto: "Toronto Stock Exchange",
          ex_paris: "Euronext Paris Stock Exchange",
          ex_bombay: "Bombay Stock Exchange",
          ex_indianational: "India National Stock Exchange",
          ex_swiss: "Swiss Exchange",
          ex_amsterdam: "Euronext Amsterdam Stock Exchange",
          ex_australian: "Australian Securities Exchange",
          ex_stockholm: "OMX Stockholm Stock Exchange",
          ex_taiwan: "Taiwan Stock Exchange",
          ex_bovespa: "BM&F Bovespa",
          ex_mercados: "Bolsas y Mercados Españoles",
          ex_copenhagen: "OMX Copenhagen Stock Exchange",
          ex_brussels: "Euronext Brussels Stock Exchange",
          ex_mexicana: "Bolsa Mexicana de Valores",
          ex_helsinki: "OMX Helsinki Stock Exchange",
          ex_oslo: "Oslo Stock Exchange",
          ex_frankfurt: "Frankfurt Stock Exchange",
          ex_telaviv: "Tel Aviv Stock Exchange",
          ex_lisbon: "Euronext Lisbon Stock Exchange",
          ex_venture: "TSX Venture Exchange",
          ex_iceland: "OMX Iceland Stock Exchange",
          ex_archipelago: "NYSE Archipelago Exchange",
          ex_canadian: "Canadian National Stock Exchange",
          ex_cff: "China Financial Futures Exchange",
          ex_dlc: "Dalian Commodity Exchange",
          ex_shf: "Shanghai Futures Exchange",
          ex_zzc: "Zhengzhou Commodity Exchange",
          ex_petroleum: "ICE Futures Europe - Commodities",
          ex_londonfinancials: "ICE Futures Europe - Financials",
          phone: "Phone",
          email: "Email",
          business_phone: "+86-731-85573929",
          customerservice_phone: "",
          service_email: "zhongyingwangzs@163.com",
          service_cooperation: "business@webull.com",
          address: "Address",
          address_cn: "Changsha, China",
          address_us: "New York, United States"
        },
        help: {
          title: "Help : Webull Trading-Realtime stocks trade,currency,commodities,funds,equities market & investing",
          mobile_title: "Help",
          mobile_detail_title: "Help Detail",
          guide: "Account Opening Guide",
          transfer: "Account Transfer Guide",
          funding: "About Funding",
          commission: "Commission Rates",
          us_trade: "US Stocks Trading",
          hk_trade: "Hong Kong Stocks Trading",
          stock_trade: "Stocks Trading",
          cfd: "CFD",
          margin: "Financing and Margin",
          security: "Account Security",
          features: "Product Features",
          catalog: "Classification",
          faq: "FAQ",
          faq_1: "How to open a Webull trading account?",
          faq_2: "What are the commissions charged for US stocks?",
          faq_3: "What are the commissions charged for Hong Kong stocks?",
          faq_4: "How to deposit?",
          faq_5: "How does Webull protect my personal privacy?",
          faq_6: "What are the supervision and protection of my Webull trading account?",
          faq_7: "How long can the funds be transferred out of the trading account?",
          help: "Help",
          help_detail_m: "Help"
        },
        join: {
          title: "Join Us : Webull Trading-Realtime stocks trade,currency,commodities,funds,equities market & investing",
          agree: "Do you agree?",
          txt1: "Technology has greatly enhanced the user experience of financial industry<br/>AI will become an important driver of finance<br/>China already have the talent, technology and capital to go global<br/>",
          txt2: "This is what we see and believe, a story and blueprint of global financial technology<br/>Welcome to Fumi Technology<br/>",
          txt3: "This is what we see and believe, a story and blueprint of global financial technology",
          hot: "Career Opportunities",
          java_senior: "Java Server Engineer",
          android_senior: "Android Engineer",
          ios_senior: "iOS Engineer",
          test_engineer: "Test Engineer",
          operations_senior: "Operations Specialist",
          ui_senior: "UI Designer",
          more: "More jobs",
          way: "We are on the way",
          user: "Users around the world are using Fumi services",
          user_desc: "6.43 million users from 211 different countries and regions in the world are using Fumi services",
          data: "The most comprehensive financial data service provider in Asia",
          data_desc: "Covers 5 categories, 20 countries/regions, 106 stock exchanges, 1000+ currency pairs and 25,000+ stocks",
          office: "Operating in both the world's first and second largest economies",
          office_desc: "Changsha, China and New York, U.S.",
          talents: "Attracted top technology and financial talents",
          talents_desc: "Alibaba, Xiaomi, Huawei, Credit Suisse and Goldman Sachs, etc.",
          vc: "First-class VC investment",
          vc_desc: "Xiaomi, Shunwei, Hongdao, Mobai ",
          provide: "We Provide",
          opportunity: "Opportunities to work with experts",
          salary: "Competitive salary",
          complete: "Perfect insurance and welfare",
          stock: "Stock options",
          paid_leave: "Paid annual leave",
          meal: "Meal allowance",
          overtime: "Overtime allowance",
          physical: "Annual physical examination",
          training: "Diversified training programs",
          casual: "Casual work environment",
          rich: "Rich corporate culture",
          need_you: "We need talents like you",
          wait_you: "We are waiting for you. Send your CV to: hr@webull.com",
          just_wait_you: "We are waiting for you",
          resume: "Send your CV to: hr@webull.com",
          duty: "Responsibilities",
          require: "Requirements"
        },
        policy: {
          title: "TERMS OF SERVICE",
          article_title: "Terms of Webull Service",
          article_direction: "Products and services are provided by Webull application (“Webull”), the flagship product of Hunan Fumi Information Technology Co., Ltd. (“Fumi Technology”)",
          subtit1: "1. Confirmation and Acceptance of the Service Agreement",
          txt1: "To use Webull, users (including registered and non-registered users) acknowledge and agree that Webull is the exclusive property of Fumi Technology and are subject to terms and conditions set forth in this agreement.",
          subtit2: "2. Improvement and Modification of the Agreement",
          txt2: "Fumi Technology, in its sole discretion, may make modifications to this agreement at any time without notice, and will publish modified terms of the agreement on the company website or Webull. The user’s continuing use of Webull after any modifications will constitute his/her agreement to the modified terms and conditions of use. With regard to rights and obligations between users and Fumi Technology, the modified terms of the agreement shall prevail.",
          subtit3: "3. Data Access and Registration",
          txt3: "3.1 Webull provides services to users through the internet and at the same time, users shall be solely responsible for<br>&nbsp;&nbsp;a) preparing devices to connect the internet, including but not limited to mobile phones, network service and other indispensable devices for connecting the internet;<br>&nbsp;&nbsp;b) correlative expenses at their own costs to get access to the internet, including but not limited to phone charges and network costs.<br>3.2 For better user experience of Webull services, users are recommended to register for a Webull account and acknowledge and agree in registration to:<br>&nbsp;&nbsp;a) provide personal information within the scope of the registration page;<br>&nbsp;&nbsp;b) guarantee timely, comprehensive and accurate personal information while continually updating registration materials;<br>&nbsp;&nbsp;c) accept financial, stock market and Webull product information pushed through email or message by Fumi Technology after successful registration and not to regard these information as junk mail or message.",
          subtit4: "4. Description of Webull Account",
          txt4: "The user shall become legal registered user of Fumi Technology after successful registration in Webull and will obtain a Webull account containing user name and password, of which the proprietary right is owned by Fumi Technology who reserves its right to reclaim the account in its absolute discretion at any time. The user owns the right to use and modify the account information in accordance with any requirement. In any liability incurred by the user in the account security, activities and behaviors with the user name shall be borne by the user. The user shall promptly notify Fumi Technology of any illegal usage of the account or any security bug, and Fumi Technology will make all reasonable efforts to guarantee safety of user information and have right for further disposal.<br>The Webull account is for the registered user use only, who must agree that he/she will not provide, transfer or sell to any third party for use. In case of any breach thereof, Fumi Technology, in its sole discretion, can forbid the corresponding registered account, have right to take methods in any form to forbid the behavior of unauthorized transferring of the account and retain the right to further refer to the legal approach to investigate legal responsibilities of relevant persons.",
          subtit5: "5. Terms of Use",
          txt5: "5.1 Users shall agree to be legally bound by relevant laws and provisions set out by Fumi Technology while using Webull:<br>&nbsp;&nbsp;a) Users must be subject to relevant international laws and regulations while transmitting data;<br>&nbsp;&nbsp;b) Users must comply with regulations and requirements of all Exchanges while using their market data;<br>&nbsp;&nbsp;c) Users must not use Webull for illegal use;<br>&nbsp;&nbsp;d) Users must not interrupt or disrupt Webull products or services.<br>5.2 Users agree to guarantee and maintain legitimate rights and interests of Fumi Technology, its affiliates and the other users, and to pay for litigation costs incurred by using services beyond the service scope and damage indemnity fees arising from breach of terms of services.<br>5.3 Users or Fumi Technology shall be entitled to suspend one or multiple services at any time in accordance with practical situations and Fumi Technology do not need to provide specified explanation to any third party. If not satisfied with services provided by Webull, users can enoforce rights as follows:<br>&nbsp;&nbsp;a) Ceasing to use Webull products or services;<br>&nbsp;&nbsp;b) Notifying Fumi Technology to cease to provide services to this user;<br>The user’s right to use Webull services will be immediately terminated as soon as he/she ceases it and since then the user will not be authorized or Fumi Technology has no obligation to transmit any unprocessed information or unfinished services to the user or the third party.<br>5.4 All market data, news and other information provided by Webull are free of charge at present but it is not guaranteed that services provided would not be charged in whole or in part in the future. Users can choose to continue or cease to use services in accordance with their own requirements.",
          subtit6: "6. Confidentiality",
          txt6: "Fumi Technology respects individual privacy of the user and acknowledges to keep information concerning personal identity and privacy strictly confidential and guarantees not to make public or disclose to any third party the user’s registration materials and non-public content stored in Fumi Technology while using services provided thereby, except the following situations:<br>6.1 Subject to relevant laws and regulations, the user’s registration information shall be provided for censoring of relevant government agencies;<br>6.2 Priority is given to the safeguarding and maintenance of Intellectual Property Right and other important rights of Fumi Technology;<br>6.3 The user name and password is illegally used incurred by hacking or negligent keeping of the user;<br>6.4 Priority is given to the user and public privacy security in case of emergency;<br>6.5 Other situations Fumi Technology considers to be desirable or subject to relevant provisions in this agreement.",
          subtit7: "7. Intellectual Property Rights",
          txt7: "The intellectual property rights (IPR) including, without limitation, the trademark right, patent right, copyright, commercial secret and proprietary technology of supporting hardware and software and contents of Webull, including but not limited to works, pictures, archives, news, materials, product architectures and product designs, shall be legal and exclusive proprietary right of Fumi Technology or other obligees. Any person shall not use, modify, reproduce, broadcast and transmit in public, recompose, disseminate, distribute, publish, reverse engineer, decompile or disassemble without authorization. If the user is about to cite or reprint the above-mentioned software, procedures or product contents, he/she must obtain in advance written consent of Fumi Technology or other obligees. If violated, users shall be liable for damages including but not limited to court costs and attorneys’ fees, etc.",
          subtit8: "8. Disclaimer",
          txt8: "8.1 The Market Data and news information are provided by the third party data service provider. Fumi Technology and the third party data service provider do not guarantee the accuracy and reliability thereof. Fumi Technology shall not bear any legal liability to the user for any loss or damage arising from information delay in, error or omission of such Market Data.<br>8.2 Webull provides information services to the user but does not guarantee the accuracy, completeness, timeliness or applicability of usage. Information provided thereby does not constitute any investment advice. The user shall be solely responsible for any risk or consequence arising from behaviors based on reading these contents and Fumi Technology shall not bear any legal liability.<br>8.3 For malfunction of the user’s own network and devices, or for any delay in, suspension and interruption of the Market Data disseminated by securities Exchanges and the third party service provider or for any information loss and record in Webull thereby, Fumi Technology shall not bear any legal liability.<br>8.4 For relevant service interruption or loss to the user due to “force majeure”, Fumi Technology shall not bear any legal liability.<br>8.5 For normal service interruption caused by system maintenance and update, Fumi Technology will make all reasonable efforts to notify the user in advance and retain the right to suspend or terminate partial or whole network services without prior notice to the user; for any loss arising from service suspension or termination, Fumi Technology shall not bear any legal liability.<br>8.6 While using Webull, the user shall choose safe network environment and keep the password secret to prohibit counterfeit usage of identity information. For any action under correct password shall be regarded to be performed by the user him/herself, who shall take the full responsibility for all contents of actions and consequences, and Fumi Technology shall not bear any legal liability.",
          subtit9: "9. Dispute Resolution",
          txt9: '9.1 Any controversy or dispute arising within the service duration shall be referred to and finally resolved by legal ways in accordance with laws and regulations like <span style="font-style:italic;">Law of the People’s Republic of China on Product Quality</span> and <span style="font-style:italic;">Law of the People’s Republic of China on the Protection of Consumer Rights and Interests</span>, etc.<br>9.2 For any dispute between the user and Fumi Technology, both Parties shall settle the dispute through friendly negotiation. Otherwise, either Party could inniate a lawsuit through local People’s Court in the registration place of Fumi Technology.',
          inscribe: "Hunan Fumi Information Technology Co., Ltd.",
          links_title: "Third-Party Terms：",
          links_item1: '<a class="term-link" href="/dowjones">《TERMS AND CONDITIONS OF USE OF S&P DOW JONES INDICES》</a>'
        },
        dowjones: {
          title: "TERMS OF DJ INDEXES",
          article_title: "TERMS AND CONDITIONS OF USE OF S&P DOW JONES INDICES",
          article_direction: 'BY ACCESSING AND USING THE DATA RELATED TO THE INDICES (THE “INDICES”) PUBLISHED BY S&P DOW JONES INDICES LLC AND/OR ITS AFFILIATES (INCLUDING, WITHOUT LIMITATION, THE INDEX VALUES, HEREAFTER COLLECTIVELY, THE “INDEX DATA") ON THIS WEB SITE, YOU ARE AGREEING TO BE LEGALLY BOUND BY THESE TERMS AND CONDITIONS, INCLUDING ALL AMENDMENTS MADE AFTER JULY 2012. IF ANY OF THESE TERMS AND CONDITIONS ARE UNACCEPTABLE TO YOU, YOU MAY NOT ACCESS OR USE THE INDEX DATA.',
          subtit1: "GENERAL TERMS AND CONDITIONS OF USE",
          txt1: "The Indices (including, without limitation, the Dow Jones Averages, Dow Jones Global Indices, Dow Jones Titans Indices, Dow Jones Islamic Market Indices, Dow Jones Sustainability Indices and Dow Jones-UBS Commodity Indices) are proprietary to S&P Dow Jones Indices LLC, its affiliates and/or its licensors (collectively, “S&P Dow Jones Indices”). By accessing and using the Index Data, you are indicating that you are at least 18 years old, and you agree to be bound by all these Terms and Conditions of Use. You may print and keep a copy of these Terms and Conditions of Use, but S&P Dow Jones Indices may change any of these terms at any time. When the terms are changed, the changes will appear in this document. Your use of the Index Data after any changes have been posted will constitute your agreement to the modified Terms and Conditions of Use. Therefore, you should read these Terms and Conditions of Use from time to time. If you do not agree to be bound by these Terms and Conditions of Use or any changes thereto, you should not use the Index Data again.",
          subtit2: "PROPRIETARY RIGHTS AND LIMITATIONS ON USE",
          txt2: 'The Indices and Index Data are protected by copyright and other intellectual property laws. The Index Data may be used only for your personal, non-commercial purposes. You agree not to modify, copy, reproduce, retransmit, distribute, sell, publish, broadcast, create derivative works from or store the the Index Data (or any portion thereof), without the express prior consent of S&P Dow Jones Indices. You may not use the Index Data for any unlawful purpose.<br>All trade names, trademarks, service marks associated with the Indices (whether registered or unregistered) (the "Marks") are proprietary to S&P Dow Jones Indices and/or its licensors and are protected by applicable trademark laws. Nothing contained in this web site should be construed as granting any license or right to use any of the Marks displayed here without the express written permission of S&P Dow Jones Indices or its applicable licensors. Any unauthorized use of the Marks is strictly prohibited.<br>Also, you may not use any of the Index Data or the Marks in connection with the issuance, trading, marketing or promotion of investment products (e.g., derivatives, structured products, investment funds, investment portfolios, etc. where the price, return and/or performance of the investment product is based on or related to the Indices) without a separate written agreement with S&P Dow Jones Indices. Further, S&P Dow Jones Indices is not giving investment advice, tax advice, legal advice, or other professional advice by providing the Indices or Index Data, and S&P Dow Jones Indices does not sponsor, recommend or endorse the purchase or sale of any security or investment.<br>If you violate any of these terms and conditions, S&P Dow Jones Indices has the right to terminate your access to all or any portion of the Index Data immediately without notice. Your right to use the Index Data is subject to any limits established by S&P Dow Jones Indices in its sole discretion.',
          subtit3: "DISCLAIMER OF WARRANTIES AND LIABILITY",
          txt3: 'THE INDEX DATA ARE PROVIDED TO YOU "AS IS". NEITHER S&P DOW JONES INDICES, DOW JONES & COMPANY, INC. (“DOW JONES”) NOR ANY OF THEIR RESPECTIVE AFFILIATES, AGENTS OR LICENSORS WARRANTS THE ACCURACY, COMPLETENESS, CURRENTNESS, NONINFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OF THE INDICES OR INDEX DATA. ALTHOUGH S&P DOW JONES INDICES MAKES REASONABLE EFFORTS TO COMPLY WITH ITS GUIDELINES REGARDING THE SELECTION OF COMPONENTS IN THE DOW JONES ISLAMIC MARKET INDICES, S&P DOW JONES INDICES CANNOT GUARANTEE OR WARRANT THAT THOSE INDICES OR THE DATA RELATED THERETO WILL COMPLY WITH SHARIAH LAW OR OTHER ISLAMIC PRINCIPLES AND S&P DOW JONES INDICES EXPRESSLY DISCLAIMS ANY SUCH WARRANTY. NEITHER S&P DOW JONES INDICES NOR ANY OF ITS AFFILIATES, AGENTS OR LICENSORS SHALL BE LIABLE TO YOU OR ANYONE ELSE FOR ANY LOSS OR INJURY RESULTING DIRECTLY FROM USE OF THE INDICES OR INDEX DATA CAUSED IN WHOLE OR PART BY S&P DOW JONES INDICES’ NEGLIGENCE OR CONTINGENCIES BEYOND ITS CONTROL IN PROCURING, COMPILING, INTERPRETING, REPORTING OR DELIVERING THE INDICES OR INDEX DATA. IN NO EVENT WILL S&P DOW JONES INDICES, DOW JONES OR ANY OF THEIR RESPECTIVE AFFILIATES, AGENTS OR LICENSORS BE LIABLE TO YOU OR ANYONE ELSE FOR ANY DECISION MADE OR ACTION TAKEN BY YOU IN RELIANCE ON THE INDICES. NEITHER S&P DOW JONES INDICES, DOW JONES NOR ANY OF THEIR RESPECTIVE AFFILIATES, AGENTS OR LICENSORS SHALL BE LIABLE TO YOU OR ANYONE ELSE FOR ANY DAMAGES (INCLUDING, WITHOUT LIMITATION, CONSEQUENTIAL, SPECIAL, INCIDENTAL, INDIRECT, OR SIMILAR DAMAGES) EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
          subtit4: "ADDITIONAL TERMS",
          txt4: 'S&P Dow Jones Indices may discontinue or change the Indices and/or Index Data, or their availability to you, at any time without notice. If any provision in these Terms and Conditions of Use is invalid or unenforceable under applicable law, the remaining provisions will continue in full force and effect. These Terms and Conditions of Use, your rights and obligations, and all actions contemplated by this agreement shall be governed by the laws of the State of New York, as if these Terms are a contract wholly entered into and wholly performed within the State of New York. These Terms and Conditions of Use constitute the entire agreement between you and S&P Dow Jones Indices relating to the Indices and Index Data, and they supersede any and all other agreements, oral or in writing, with respect to the indices. The failure of S&P Dow Jones Indices to insist upon strict compliance with any term or provision shall not be construed as a waiver with regard to any subsequent failure to comply with such term or provision. Certain market data is provided by Thomson Reuters for use in calculating the Indices and Index Data. Thomson Reuters shall not be liable for any errors or delays in content, or for any actions taken in reliance thereon.<br>The Indices are proprietary to and distributed by S&P Dow Jones Indices and have been licensed for use. "S&P? is a registered trademark of Standard & Poor\'s Financial Services LLC ("S&P") and Dow Jones? is a registered trademark of Dow Jones Trademark Holdings LLC ("Dow Jones"). These trademarks have been licensed for use by S&P Dow Jones Indices LLC and sublicensed for certain purposes.'
        }
      }
    }
  }
});