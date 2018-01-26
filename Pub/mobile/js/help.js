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
    __webpack_require__(41), __webpack_require__(16), module.exports = !0
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
  }, 41: function (module, exports) {
  }
});