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
    __webpack_require__(34), __webpack_require__(29), module.exports = !0
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
  }, 34: function (module, exports) {
  }
});