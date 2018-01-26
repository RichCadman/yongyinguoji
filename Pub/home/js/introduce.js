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
    
    var _jquery = __webpack_require__(30), _jquery2 = _interopRequireDefault(_jquery);
    __webpack_require__(157), __webpack_require__(29), __webpack_require__(197), module.exports = !function () {
      (0, _jquery2.default)("#introduce-video").vide({
        mp4: __webpack_require__(198),
        webm: __webpack_require__(199),
        ogv: __webpack_require__(200),
        jpg: __webpack_require__(159)
      }, {position: "50% 30%", posterType: "detect", resizing: !1})
    }()
  }, 29: function (module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj}
    }
    
    Object.defineProperty(exports, "__esModule", {value: !0});
    var _jquery = __webpack_require__(30), _jquery2 = _interopRequireDefault(_jquery),
      _setting = __webpack_require__(33);
    exports.default = function () {
      var scriptTemplate = (0, _jquery2.default)("#data-script");
      scriptTemplate.length > 0 && (_jquery2.default.globalEval(scriptTemplate.html()), scriptTemplate.remove()), window.WebullH5 = window.WebullH5 || {}, _setting.isWebullApp ? /policy|dowjones/.test(window.location.pathname) && ((0, _jquery2.default)(document.body).attr("style", "padding-top:0; min-width: inherit"), (0, _jquery2.default)(".header").hide(), (0, _jquery2.default)(".footer").hide()) : (!function () {
        var headerActive = (0, _jquery2.default)(".header.fixed.active");
        if (headerActive.length > 0) {
          var isHeaderActiveShow = !1, scrollTop = (0, _jquery2.default)(window).scrollTop();
          scrollTop > 150 && !isHeaderActiveShow && (isHeaderActiveShow = !0, headerActive.show()), (0, _jquery2.default)(window).on({
            scroll: function () {
              scrollTop = (0, _jquery2.default)(window).scrollTop(), scrollTop > 150 && !isHeaderActiveShow && (isHeaderActiveShow = !0, headerActive.stop(), headerActive.slideDown(500)), scrollTop <= 150 && isHeaderActiveShow && (isHeaderActiveShow = !1, headerActive.stop(), headerActive.slideUp(200))
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
                var rect = ele.getBoundingClientRect(),
                  topRate = (windowHeight - rect.top) / rect.height,
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
      }(), (0, _jquery2.default)(".nav-menus > .lang").on({
        mouseenter: function () {
          (0, _jquery2.default)(".rt-eng").stop(), (0, _jquery2.default)(".rt-eng").slideDown(200)
        }, mouseleave: function () {
          (0, _jquery2.default)(".rt-eng").stop(), (0, _jquery2.default)(".rt-eng").slideUp(200)
        }
      }), (0, _jquery2.default)(".rt-eng").find("a").on({
        mouseenter: function (event) {
          (0, _jquery2.default)(event.target).addClass("active").siblings().removeClass("active")
        }
      }))
    }()
  }, 30: function (module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj}
    }
    
    Object.defineProperty(exports, "__esModule", {value: !0});
    var _jquery = __webpack_require__(31), _jquery2 = _interopRequireDefault(_jquery);
    window.$ = _jquery2.default, window.jQuery = _jquery2.default, exports.default = _jquery2.default
  }, 31: function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__(32)(2)
  }, 32: function (module, exports) {
    module.exports = jquery_d882153f
  }, 33: function (module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: !0});
    var domainSettingTemp = void 0;
    domainSettingTemp = {QuoteApiDomain: "https://cn-quoteapi.webull.com/"};
    exports.domainSetting = domainSettingTemp, exports.supportLanguage = ["en", "zh"], exports.languageKey = "fm_hl", exports.queryLanguageKey = "hl", exports.isWebullApp = /webull(?!broker)/i.test(navigator.userAgent)
  }, 157: function (module, exports) {
  }, 159: function (module, exports, __webpack_require__) {
    module.exports = "images/ff48305dad1321a2.jpg"
  }, 197: function (module, exports) {
    "use strict";
    !function ($, window, document, navigator) {
      function Vide(element, path, options) {
        this.element = $(element), this._defaults = defaults, this._name = pluginName, this.settings = $.extend({}, defaults, options), this.path = path, this.init()
      }
      
      var pluginName = "vide", defaults = {
        volume: 1,
        playbackRate: 1,
        muted: !0,
        loop: !0,
        preload: "auto",
        autoplay: !0,
        position: "50% 100%",
        posterType: "detect"
      }, iOS = /iPad|iPhone|iPod/i.test(navigator.userAgent), android = /Android/i.test(navigator.userAgent);
      $[pluginName] = {lookup: []};
      var parseOptions = function (str) {
        var clearedStr, arr, obj = {};
        clearedStr = str.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), arr = clearedStr.split(",");
        var i, len, val;
        for (i = 0, len = arr.length; i < len; i++)arr[i] = arr[i].split(":"), val = arr[i][1], val || (val = void 0), ("string" == typeof val || val instanceof String) && (val = "true" === val || "false" !== val && val), ("string" == typeof val || val instanceof String) && (val = isNaN(val) ? val : +val), obj[arr[i][0]] = val;
        return obj
      }, parsePosition = function (str) {
        str = "" + str;
        for (var arg, args = str.split(/\s+/), x = "50%", y = "50%", i = 0, len = args.length; i < len; i++)arg = args[i], "left" === arg ? x = "0%" : "right" === arg ? x = "100%" : "top" === arg ? y = "0%" : "bottom" === arg ? y = "100%" : "center" === arg ? 0 === i ? x = "50%" : y = "50%" : 0 === i ? x = arg : y = arg;
        return {x: x, y: y}
      }, findPoster = function (path, callback) {
        var onLoad = function () {
          callback(this.src)
        };
        $("<img src='" + path.jpg + "'>").load(onLoad)
      };
      Vide.prototype.init = function () {
        var that = this;
        this.wrapper = $("<div>");
        var position = parsePosition(this.settings.position);
        this.wrapper.css({
          position: "absolute",
          "z-index": 0,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          overflow: "hidden",
          "-webkit-background-size": "cover",
          "-moz-background-size": "cover",
          "-o-background-size": "cover",
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": position.x + " " + position.y
        }), "detect" === this.settings.posterType ? findPoster(this.path, function (url) {
          that.wrapper.css("background-image", "url(" + url + ")")
        }) : this.wrapper.css("background-image", "url(" + this.path + "." + this.settings.posterType + ")"), "static" === this.element.css("position") && this.element.css("position", "relative"), this.element.prepend(this.wrapper), iOS || android || (this.video = $("<video><source src='" + this.path.ogv + "' type='video/ogg'><source src='" + this.path.webm + "' type='video/webm'><source src='" + this.path.mp4 + "' type='video/mp4'></video>"), this.video.css("visibility", "hidden"), this.video.prop({
          autoplay: this.settings.autoplay,
          loop: this.settings.loop,
          volume: this.settings.volume,
          muted: this.settings.muted,
          playbackRate: this.settings.playbackRate,
          preload: this.settings.preload
        }), this.wrapper.append(this.video), this.video.css({
          margin: "auto",
          position: "absolute",
          "z-index": 0,
          top: position.y,
          left: position.x,
          "-webkit-transform": "translate(-" + position.x + ", -" + position.y + ")",
          "-ms-transform": "translate(-" + position.x + ", -" + position.y + ")",
          transform: "translate(-" + position.x + ", -" + position.y + ")"
        }), this.video.bind("loadedmetadata." + pluginName, function () {
          that.video.css("visibility", "visible"), that.resize()
        }), $(this.element).bind("resize." + pluginName, function () {
          that.resize()
        }))
      }, Vide.prototype.getVideoObject = function () {
        return this.video ? this.video[0] : null
      }, Vide.prototype.resize = function () {
        if (this.video) {
          var videoHeight = this.video[0].videoHeight, videoWidth = this.video[0].videoWidth,
            wrapperHeight = this.wrapper.height(), wrapperWidth = this.wrapper.width();
          wrapperWidth / videoWidth > wrapperHeight / videoHeight ? this.video.css({
            width: wrapperWidth + 2,
            height: "auto"
          }) : this.video.css({width: "auto", height: wrapperHeight + 2})
        }
      }, Vide.prototype.destroy = function () {
        this.element.unbind(pluginName), this.video && this.video.unbind(pluginName), delete $[pluginName].lookup[this.index], this.element.removeData(pluginName), this.wrapper.remove()
      }, $.fn[pluginName] = function (path, options) {
        var instance;
        return this.each(function () {
          instance = $.data(this, pluginName), instance && instance.destroy(), instance = new Vide(this, path, options), instance.index = $[pluginName].lookup.push(instance) - 1, $.data(this, pluginName, instance)
        }), this
      }, $(document).ready(function () {
        $(window).bind("resize." + pluginName, function () {
          for (var instance, len = $[pluginName].lookup.length, i = 0; i < len; i++)instance = $[pluginName].lookup[i], instance && instance.resize()
        }), $(document).find("[data-" + pluginName + "-bg]").each(function (i, element) {
          var $element = $(element), options = $element.data(pluginName + "-options"),
            path = $element.data(pluginName + "-bg");
          options = options ? parseOptions(options) : {}, $element[pluginName](path, options)
        })
      })
    }(window.jQuery, window, document, navigator)
  }, 198: function (module, exports, __webpack_require__) {
    module.exports = "video/2.mp4"
  }, 199: function (module, exports, __webpack_require__) {
    module.exports = "video/2.webm"
  }, 200: function (module, exports, __webpack_require__) {
    module.exports = "video/2.ogv"
  }
});