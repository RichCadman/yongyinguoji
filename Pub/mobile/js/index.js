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
    
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")
    }
    
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
        return arr2
      }
      return Array.from(arr)
    }
    
    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
        }
      }
      
      return function (Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
      }
    }(), _jquery = __webpack_require__(17), _jquery2 = _interopRequireDefault(_jquery);
    __webpack_require__(101), __webpack_require__(102), __webpack_require__(35), __webpack_require__(103), __webpack_require__(16);
    var _setting = __webpack_require__(21), _funutil = __webpack_require__(20), _echarts = __webpack_require__(128),
      _echarts2 = _interopRequireDefault(_echarts), _swiper = __webpack_require__(38),
      _swiper2 = _interopRequireDefault(_swiper), timeZoneDataList = __webpack_require__(129);
    module.exports = !function () {
      function initExchangeChart() {
        exchangeData && exchangeData.length > 0 && exchangeData.forEach(function (itemData) {
          if (null != itemData) {
            var exchangeName = itemData.exchangeName, utcOffset = itemData.utcOffset, dst = itemData.dst,
              minuteCapital = itemData.minuteCapital, showCode = itemData.showCode,
              jChartDiv = (0, _jquery2.default)(".chart").filter('[data-exchange="' + exchangeName + '"]');
            if (0 != jChartDiv.length) {
              var myChart = _echarts2.default.init(jChartDiv[0]), maxCount = jChartDiv.data("maxcount"), option = {
                grid: {left: "0", right: "0", bottom: "0", top: "85"},
                xAxis: {
                  type: "category", show: !1, data: fillData(minuteCapital.map(function (item) {
                    return formatUTCDate(utcOffset, dst, item.tradeTime)
                  }), maxCount)
                },
                yAxis: {type: "category", show: !1},
                series: {
                  name: showCode,
                  type: "line",
                  data: minuteCapital.map(function (item) {
                    return Number(item.totalCapital.toFixed(2))
                  }),
                  showSymbol: !1,
                  animationEasing: "linear",
                  animationDuration: 1e3,
                  lineStyle: {normal: {color: "rgb(151, 154, 174)", width: 1}},
                  areaStyle: {
                    normal: {
                      color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(200, 200, 200, 1)"
                      }, {offset: 1, color: "rgba(255, 255, 255, 1)"}])
                    }
                  },
                  markPoint: {
                    data: [{
                      symbol: "circle",
                      symbolSize: 10,
                      label: {normal: {show: !1}},
                      itemStyle: {
                        normal: {
                          color: "rgb(151, 154, 174)",
                          borderColor: "rgb(224, 224, 224)",
                          borderWidth: 2
                        }
                      },
                      coord: [minuteCapital.length - 1, minuteCapital[minuteCapital.length - 1].totalCapital]
                    }]
                  }
                }
              };
              myChart.setOption(option), exchangeChart[exchangeName] = myChart
            }
          }
        })
      }
      
      var scriptTemplate = (0, _jquery2.default)("#data-script");
      scriptTemplate.length > 0 && (_jquery2.default.globalEval(scriptTemplate.html()), scriptTemplate.remove()), window.WebullH5 = window.WebullH5 || {}, (0, _jquery2.default)(".counter").counterUp();
      var startTime = Date.now(), endTime = void 0, exchangeChart = {}, language = (0, _funutil.getLocale)(),
        exchangeData = window.WebullH5.exchangeData || [],
        exchangeStatusData = window.WebullH5.exchangeStatusData || [], tickerData = window.WebullH5.tickerData || [],
        tickerIdList = tickerData.map(function (item) {
          return item.tickerId
        }), strDateRegexp = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\.(\d+)\+(\d+)/, timeZoneData = {},
        formatDate = function (utcDate) {
          return [parseNum(utcDate.getUTCMonth() + 1), parseNum(utcDate.getUTCDate())].join("/") + " " + [parseNum(utcDate.getUTCHours()), parseNum(utcDate.getUTCMinutes()), parseNum(utcDate.getUTCSeconds())].join(":")
        }, parseNum = function (number) {
          return number > 9 ? number : "0" + number
        }, formatTimeByTimeZone = function (timeZoneName, timeZoneCode, utcDate) {
          var offsetDataArr = timeZoneName && timeZoneData[timeZoneName.toLowerCase()];
          if (null == offsetDataArr || 0 == offsetDataArr.length)return formatDate(utcDate);
          var offsetData = (0, _funutil.find)(offsetDataArr, function (item) {
              return timeZoneCode in item
            }) || offsetDataArr[0];
          if (null == offsetData)return formatDate(utcDate);
          timeZoneCode = timeZoneCode || Object.keys(offsetData)[0];
          var offsetMinutes = offsetData[timeZoneCode];
          return utcDate.setUTCMinutes(utcDate.getUTCMinutes() + offsetMinutes), formatDate(utcDate)
        }, parseUTCDate = function (dateStr) {
          var arr = dateStr.match(strDateRegexp);
          return Date.UTC(arr[1], arr[2] - 1, arr[3], arr[4], arr[5], arr[6])
        }, formatUTCDate = function (utcOffset, dst, date) {
          var utcDate = void 0;
          try {
            utcDate = new Date(Date.parse(date) || parseUTCDate(date))
          } catch (e) {
            utcDate = new Date(parseUTCDate(date))
          }
          return formatTimeByTimeZone(utcOffset, dst, utcDate)
        }, formatNumber = function (number) {
          return "en" === language ? formatNumberEn(number) : formatNumberZh(number)
        }, formatNumberZh = function (number) {
          return Math.abs(number) > 1e11 ? [(Number(number) / 1e11).toFixed(2), "千亿"] : Math.abs(number) > 1e8 ? [(Number(number) / 1e8).toFixed(2), "亿"] : Math.abs(number) > 1e7 ? [(Number(number) / 1e7).toFixed(2), "千万"] : Math.abs(number) > 1e4 ? [(Number(number) / 1e4).toFixed(2), "万"] : [number, ""]
        }, formatNumberEn = function (number) {
          return Math.abs(number) > 1e9 ? [(Number(number) / 1e9).toFixed(2), "billion"] : Math.abs(number) > 1e6 ? [(Number(number) / 1e6).toFixed(2), "million"] : Math.abs(number) > 1e3 ? [(Number(number) / 1e3).toFixed(2), "thousand"] : void 0
        }, fillData = function (data, recordCount) {
          var newData = [].concat(_toConsumableArray(data));
          if (newData.length < recordCount)for (var i = 0; i <= recordCount - newData.length; i++)newData.push(0);
          return newData
        };
      timeZoneData = function () {
        var data = {};
        return timeZoneDataList.forEach(function (timeZoneData) {
          var match = timeZoneData.split("|"), timeZoneName = match[0], codeArr = match[1].split(/\s/),
            offsetArr = match[2].split(/\s/);
          if (codeArr.length != offsetArr.length)throw new Error("TimeZone Code Not Match Offset");
          var len = codeArr.length;
          data[timeZoneName.toLowerCase()] = [];
          for (var i = 0; i < len; i++) {
            var codeData = {};
            codeData[codeArr[i]] = 60 * Number(offsetArr[i]), data[timeZoneName.toLowerCase()].push(codeData)
          }
        }), data
      }();
      var isCapitalShown = !1, exchangeTimerCallback = function (exchangeDataList) {
        exchangeDataList.forEach(function (itemData) {
          if (null != itemData) {
            var exchangeName = itemData.exchangeName, totalTurnover = itemData.totalTurnover,
              lastTradeTime = itemData.lastTradeTime, utcOffset = itemData.utcOffset, dst = itemData.dst,
              minuteCapital = itemData.minuteCapital;
            if (0 !== minuteCapital.length) {
              var jChartDiv = (0, _jquery2.default)(".chart").filter('[data-exchange="' + exchangeName + '"]'),
                jLi = jChartDiv.parents("li"), jTotalEm = jLi.find(".total-capital"),
                jDateTimeSpan = jLi.find(".date-time"), lastTradeTimeFmt = formatUTCDate(utcOffset, dst, lastTradeTime),
                totalTurnoverFmt = formatNumber(totalTurnover).join(" ");
              if (jTotalEm.html(totalTurnoverFmt), jDateTimeSpan.html(lastTradeTimeFmt), isCapitalShown) {
                var myChart = exchangeChart[exchangeName];
                if (null == myChart)return;
                var option = myChart.getOption(), yData = option.series[0].data, xData = option.xAxis[0].data,
                  pointData = option.series[0].markPoint.data[0], lastEmptyIndex = xData.indexOf(0);
                lastEmptyIndex > -1 && minuteCapital.forEach(function (item, index) {
                  xData[lastEmptyIndex + index] = formatUTCDate(utcOffset, dst, item.tradeTime), yData.push(item.totalCapital), pointData.coord = [yData.length - 1, item.totalCapital]
                }), option.xAxis[0].data = xData, option.series[0].data = yData, option.series[0].markPoint.data[0] = pointData, myChart.setOption(option)
              } else exchangeData.forEach(function (itemDataLocale) {
                exchangeName === itemDataLocale.exchangeName && (itemDataLocale.minuteCapital = itemDataLocale.minuteCapital.concat(minuteCapital))
              })
            }
          }
        })
      }, startExchangeTimer = function startExchangeTimer() {
        endTime = Date.now(), _jquery2.default.ajax({
          url: _setting.domainSetting.QuoteApiDomain + "api/wlas/capitalflow/exchange?startTime=" + startTime + "&endTime=" + endTime,
          dataType: "json",
          success: exchangeTimerCallback
        }), startTime = endTime, setTimeout(startExchangeTimer, 6e4)
      }, indexDataTimeCallback = function (tickerDataList) {
        tickerDataList.forEach(function (itemData) {
          var dataCardDiv = (0, _jquery2.default)(".data-card").filter('[data-tickerid="' + itemData.tickerId + '"]'),
            numDiv = dataCardDiv.find(".num"), rateDiv = dataCardDiv.find(".rate"), price = itemData.price,
            change = itemData.change, changeRatio = 100 * Number(itemData.changeRatio), isNegative = Number(change) < 0;
          numDiv.html(price), rateDiv.html((isNegative ? "" : "+") + change + " " + ((isNegative ? "" : "+") + changeRatio.toFixed(2)) + "%"), numDiv.removeClass("up down"), rateDiv.removeClass("up down"), numDiv.addClass(isNegative ? "down" : "up"), rateDiv.addClass(isNegative ? "down" : "up")
        })
      }, startIndexDataTimer = function startIndexDataTimer() {
        _jquery2.default.ajax({
          url: _setting.domainSetting.QuoteApiDomain + "api/quote/tickerRealTimes?tickerIds=" + encodeURIComponent(tickerIdList.join(",")),
          dataType: "json",
          success: indexDataTimeCallback
        }), setTimeout(startIndexDataTimer, 3e4)
      };
      setTimeout(startExchangeTimer, 6e4), setTimeout(startIndexDataTimer, 3e4), function () {
        var worldMap = (0, _jquery2.default)(".world-map"), mapNavItem = worldMap.find(".map-nav .item");
        mapNavItem.on({
          click: function (event) {
            var jTarget = (0, _jquery2.default)(event.target), mapType = jTarget.attr("map-type");
            jTarget.hasClass("active") || (jTarget.addClass("active").siblings().removeClass("active"), (0, _jquery2.default)(".map").attr("class", "map " + mapType), (0, _jquery2.default)(".map-content." + mapType).css("display", "block").addClass("active").siblings(".map-content").css("display", "none").removeClass("active"))
          }
        })
      }(), function () {
        var worldMap = (0, _jquery2.default)(".world-map"), allExchangePoint = worldMap.find(".point,.point-main"),
          allExchangeLine = worldMap.find("polyline");
        exchangeStatusData.forEach(function (exchangeStatus) {
          _jquery2.default.each(allExchangePoint, function (index, pointItem) {
            (0, _jquery2.default)(pointItem).data("exchangeid") === exchangeStatus.exchangeId && "T" === exchangeStatus.status && (0, _jquery2.default)(pointItem).addClass("active")
          }), _jquery2.default.each(allExchangeLine, function (index, lineItem) {
            (0, _jquery2.default)(lineItem).data("exchangeid") === exchangeStatus.exchangeId && "T" === exchangeStatus.status && (0, _jquery2.default)(lineItem).addClass("active")
          })
        })
      }(), initExchangeChart();
      var ExchangeAnimateRunner = function () {
        function ExchangeAnimateRunner() {
          _classCallCheck(this, ExchangeAnimateRunner)
        }
        
        return _createClass(ExchangeAnimateRunner, [{
          key: "start", value: function (mapType) {
            this.mapType = mapType, (0, _jquery2.default)(".data-list").css({display: "none"});
            var dataList = (0, _jquery2.default)(".data-list." + mapType);
            dataList.css({display: "block"});
            var cardList = dataList.find(".data-card");
            if (!(cardList.length <= 4)) {
              for (var i = 0; i < 3; ++i)(0, _jquery2.default)(cardList[i]).clone().appendTo(dataList);
              var cardListLen = cardList.length, scrollIndex = 0;
              this.intervalId = setInterval(function () {
                dataList.css({
                  transform: "translate(" + -12.5 * (scrollIndex + 1) + "rem, 0)",
                  transition: "transform 0.5s"
                }), ++scrollIndex >= cardListLen && (scrollIndex = 0, setTimeout(function () {
                  dataList.css({transform: "translate(0px, 0px)", transition: "0s"})
                }, 500))
              }, 2e3)
            }
          }
        }, {
          key: "stop", value: function () {
            var _this = this;
            clearInterval(this.intervalId);
            var prevDataCards = (0, _jquery2.default)(".data-list." + this.mapType + " .data-card");
            prevDataCards.slice(prevDataCards.length - 3).remove(), setTimeout(function () {
              (0, _jquery2.default)(".data-list." + _this.mapType).css({transform: "translate(0, 0)"})
            }, 0)
          }
        }]), ExchangeAnimateRunner
      }();
      !function () {
        var mapType = (0, _jquery2.default)(".world-map .map-nav .item.active").attr("map-type"),
          animateRunner = new ExchangeAnimateRunner;
        animateRunner.start(mapType), (0, _jquery2.default)(".world-map .map-nav .item").click(function () {
          var currentMapType = (0, _jquery2.default)(".world-map .map-nav .item.active").attr("map-type");
          mapType !== currentMapType && (animateRunner.stop(), animateRunner = new ExchangeAnimateRunner, animateRunner.start(currentMapType), mapType = currentMapType)
        })
      }(), function () {
        (0, _jquery2.default)(".global-exchange,.world-map").find(".chart,.data-card").on({
          click: function (event) {
            var tickerId = (0, _jquery2.default)(event.currentTarget).data("tickerid");
            null != tickerId && "" != tickerId && window.open("https://m.webull.com/ticker?id=" + tickerId + "&hl=" + language)
          }
        })
      }(), function () {
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
          s.container[0].swiper = s, s.container.data("swiper", s), s.classNames.push(s.params.containerModifierClass + s.params.direction), s.params.freeMode && s.classNames.push(s.params.containerModifierClass + "free-mode"), s.support.flexbox || (s.classNames.push(s.params.containerModifierClass + "no-flexbox"), s.params.slidesPerColumn = 1), s.params.autoHeight && s.classNames.push(s.params.containerModifierClass + "autoheight"), (s.params.parallax || s.params.watchSlidesVisibility) && (s.params.watchSlidesProgress = !0), s.params.touchReleaseOnEdges && (s.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(s.params.effect) >= 0 && (s.support.transforms3d ? (s.params.watchSlidesProgress = !0, s.classNames.push(s.params.containerModifierClass + "3d")) : s.params.effect = "slide"), "slide" !== s.params.effect && s.classNames.push(s.params.containerModifierClass + s.params.effect), "cube" === s.params.effect && (s.params.resistanceRatio = 0, s.params.slidesPerView = 1, s.params.slidesPerColumn = 1, s.params.slidesPerGroup = 1, s.params.centeredSlides = !1, s.params.spaceBetween = 0, s.params.virtualTranslate = !0), "fade" !== s.params.effect && "flip" !== s.params.effect || (s.params.slidesPerView = 1, s.params.slidesPerColumn = 1,
            s.params.slidesPerGroup = 1, s.params.watchSlidesProgress = !0, s.params.spaceBetween = 0, "undefined" == typeof initialVirtualTranslate && (s.params.virtualTranslate = !0)), s.params.grabCursor && s.support.touch && (s.params.grabCursor = !1), s.wrapper = s.container.children("." + s.params.wrapperClass), s.params.pagination && (s.paginationContainer = $(s.params.pagination), s.params.uniqueNavElements && "string" == typeof s.params.pagination && s.paginationContainer.length > 1 && 1 === s.container.find(s.params.pagination).length && (s.paginationContainer = s.container.find(s.params.pagination)), "bullets" === s.params.paginationType && s.params.paginationClickable ? s.paginationContainer.addClass(s.params.paginationModifierClass + "clickable") : s.params.paginationClickable = !1, s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType)), (s.params.nextButton || s.params.prevButton) && (s.params.nextButton && (s.nextButton = $(s.params.nextButton), s.params.uniqueNavElements && "string" == typeof s.params.nextButton && s.nextButton.length > 1 && 1 === s.container.find(s.params.nextButton).length && (s.nextButton = s.container.find(s.params.nextButton))), s.params.prevButton && (s.prevButton = $(s.params.prevButton), s.params.uniqueNavElements && "string" == typeof s.params.prevButton && s.prevButton.length > 1 && 1 === s.container.find(s.params.prevButton).length && (s.prevButton = s.container.find(s.params.prevButton)))), s.isHorizontal = function () {
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
              if (s.allowClick && (s.updateClickedSlide(e),
                  s.emit("onTap", s, e), timeDiff < 300 && touchEndTime - lastClickTime > 300 && (clickTimeout && clearTimeout(clickTimeout), clickTimeout = setTimeout(function () {
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
  }, 101: function (module, exports) {
    "use strict";
    !function () {
      function Waypoint(options) {
        if (!options)throw new Error("No options passed to Waypoint constructor");
        if (!options.element)throw new Error("No element option passed to Waypoint constructor");
        if (!options.handler)throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + keyCounter, this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options), this.element = this.options.element, this.adapter = new Waypoint.Adapter(this.element), this.callback = options.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = Waypoint.Group.findOrCreate({
          name: this.options.group,
          axis: this.axis
        }), this.context = Waypoint.Context.findOrCreateByElement(this.options.context), Waypoint.offsetAliases[this.options.offset] && (this.options.offset = Waypoint.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), allWaypoints[this.key] = this, keyCounter += 1
      }
      
      var keyCounter = 0, allWaypoints = {};
      Waypoint.prototype.queueTrigger = function (direction) {
        this.group.queueTrigger(this, direction)
      }, Waypoint.prototype.trigger = function (args) {
        this.enabled && this.callback && this.callback.apply(this, args)
      }, Waypoint.prototype.destroy = function () {
        this.context.remove(this), this.group.remove(this), delete allWaypoints[this.key]
      }, Waypoint.prototype.disable = function () {
        return this.enabled = !1, this
      }, Waypoint.prototype.enable = function () {
        return this.context.refresh(), this.enabled = !0, this
      }, Waypoint.prototype.next = function () {
        return this.group.next(this)
      }, Waypoint.prototype.previous = function () {
        return this.group.previous(this)
      }, Waypoint.invokeAll = function (method) {
        var allWaypointsArray = [];
        for (var waypointKey in allWaypoints)allWaypointsArray.push(allWaypoints[waypointKey]);
        for (var i = 0, end = allWaypointsArray.length; i < end; i++)allWaypointsArray[i][method]()
      }, Waypoint.destroyAll = function () {
        Waypoint.invokeAll("destroy")
      }, Waypoint.disableAll = function () {
        Waypoint.invokeAll("disable")
      }, Waypoint.enableAll = function () {
        Waypoint.Context.refreshAll();
        for (var waypointKey in allWaypoints)allWaypoints[waypointKey].enabled = !0;
        return this
      }, Waypoint.refreshAll = function () {
        Waypoint.Context.refreshAll()
      }, Waypoint.viewportHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight
      }, Waypoint.viewportWidth = function () {
        return document.documentElement.clientWidth
      }, Waypoint.adapters = [], Waypoint.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
      }, Waypoint.offsetAliases = {
        "bottom-in-view": function () {
          return this.context.innerHeight() - this.adapter.outerHeight()
        }, "right-in-view": function () {
          return this.context.innerWidth() - this.adapter.outerWidth()
        }
      }, window.Waypoint = Waypoint
    }(), function () {
      function requestAnimationFrameShim(callback) {
        window.setTimeout(callback, 1e3 / 60)
      }
      
      function Context(element) {
        this.element = element, this.Adapter = Waypoint.Adapter, this.adapter = new this.Adapter(element), this.key = "waypoint-context-" + keyCounter, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop()
        }, this.waypoints = {
          vertical: {},
          horizontal: {}
        }, element.waypointContextKey = this.key, contexts[element.waypointContextKey] = this, keyCounter += 1, Waypoint.windowContext || (Waypoint.windowContext = !0, Waypoint.windowContext = new Context(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
      }
      
      var keyCounter = 0, contexts = {}, Waypoint = window.Waypoint, oldWindowLoad = window.onload;
      Context.prototype.add = function (waypoint) {
        var axis = waypoint.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[axis][waypoint.key] = waypoint, this.refresh()
      }, Context.prototype.checkEmpty = function () {
        var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical),
          isWindow = this.element == this.element.window;
        horizontalEmpty && verticalEmpty && !isWindow && (this.adapter.off(".waypoints"), delete contexts[this.key])
      }, Context.prototype.createThrottledResizeHandler = function () {
        function resizeHandler() {
          self.handleResize(), self.didResize = !1
        }
        
        var self = this;
        this.adapter.on("resize.waypoints", function () {
          self.didResize || (self.didResize = !0, Waypoint.requestAnimationFrame(resizeHandler))
        })
      }, Context.prototype.createThrottledScrollHandler = function () {
        function scrollHandler() {
          self.handleScroll(), self.didScroll = !1
        }
        
        var self = this;
        this.adapter.on("scroll.waypoints", function () {
          self.didScroll && !Waypoint.isTouch || (self.didScroll = !0, Waypoint.requestAnimationFrame(scrollHandler))
        })
      }, Context.prototype.handleResize = function () {
        Waypoint.Context.refreshAll()
      }, Context.prototype.handleScroll = function () {
        var triggeredGroups = {}, axes = {
          horizontal: {
            newScroll: this.adapter.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left"
          },
          vertical: {newScroll: this.adapter.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up"}
        };
        for (var axisKey in axes) {
          var axis = axes[axisKey], isForward = axis.newScroll > axis.oldScroll,
            direction = isForward ? axis.forward : axis.backward;
          for (var waypointKey in this.waypoints[axisKey]) {
            var waypoint = this.waypoints[axisKey][waypointKey];
            if (null !== waypoint.triggerPoint) {
              var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint,
                nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint,
                crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint,
                crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint;
              (crossedForward || crossedBackward) && (waypoint.queueTrigger(direction), triggeredGroups[waypoint.group.id] = waypoint.group)
            }
          }
        }
        for (var groupKey in triggeredGroups)triggeredGroups[groupKey].flushTriggers();
        this.oldScroll = {x: axes.horizontal.newScroll, y: axes.vertical.newScroll}
      }, Context.prototype.innerHeight = function () {
        return this.element == this.element.window ? Waypoint.viewportHeight() : this.adapter.innerHeight()
      }, Context.prototype.remove = function (waypoint) {
        delete this.waypoints[waypoint.axis][waypoint.key], this.checkEmpty()
      }, Context.prototype.innerWidth = function () {
        return this.element == this.element.window ? Waypoint.viewportWidth() : this.adapter.innerWidth()
      }, Context.prototype.destroy = function () {
        var allWaypoints = [];
        for (var axis in this.waypoints)for (var waypointKey in this.waypoints[axis])allWaypoints.push(this.waypoints[axis][waypointKey]);
        for (var i = 0, end = allWaypoints.length; i < end; i++)allWaypoints[i].destroy()
      }, Context.prototype.refresh = function () {
        var axes, isWindow = this.element == this.element.window,
          contextOffset = isWindow ? void 0 : this.adapter.offset(), triggeredGroups = {};
        this.handleScroll(), axes = {
          horizontal: {
            contextOffset: isWindow ? 0 : contextOffset.left,
            contextScroll: isWindow ? 0 : this.oldScroll.x,
            contextDimension: this.innerWidth(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left"
          },
          vertical: {
            contextOffset: isWindow ? 0 : contextOffset.top,
            contextScroll: isWindow ? 0 : this.oldScroll.y,
            contextDimension: this.innerHeight(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top"
          }
        };
        for (var axisKey in axes) {
          var axis = axes[axisKey];
          for (var waypointKey in this.waypoints[axisKey]) {
            var contextModifier, wasBeforeScroll, nowAfterScroll, triggeredBackward, triggeredForward,
              waypoint = this.waypoints[axisKey][waypointKey], adjustment = waypoint.options.offset,
              oldTriggerPoint = waypoint.triggerPoint, elementOffset = 0, freshWaypoint = null == oldTriggerPoint;
            waypoint.element !== waypoint.element.window && (elementOffset = waypoint.adapter.offset()[axis.offsetProp]), "function" == typeof adjustment ? adjustment = adjustment.apply(waypoint) : "string" == typeof adjustment && (adjustment = parseFloat(adjustment), waypoint.options.offset.indexOf("%") > -1 && (adjustment = Math.ceil(axis.contextDimension * adjustment / 100))), contextModifier = axis.contextScroll - axis.contextOffset, waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment), wasBeforeScroll = oldTriggerPoint < axis.oldScroll, nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll, triggeredBackward = wasBeforeScroll && nowAfterScroll, triggeredForward = !wasBeforeScroll && !nowAfterScroll, !freshWaypoint && triggeredBackward ? (waypoint.queueTrigger(axis.backward), triggeredGroups[waypoint.group.id] = waypoint.group) : !freshWaypoint && triggeredForward ? (waypoint.queueTrigger(axis.forward), triggeredGroups[waypoint.group.id] = waypoint.group) : freshWaypoint && axis.oldScroll >= waypoint.triggerPoint && (waypoint.queueTrigger(axis.forward), triggeredGroups[waypoint.group.id] = waypoint.group)
          }
        }
        return Waypoint.requestAnimationFrame(function () {
          for (var groupKey in triggeredGroups)triggeredGroups[groupKey].flushTriggers()
        }), this
      }, Context.findOrCreateByElement = function (element) {
        return Context.findByElement(element) || new Context(element)
      }, Context.refreshAll = function () {
        for (var contextId in contexts)contexts[contextId].refresh()
      }, Context.findByElement = function (element) {
        return contexts[element.waypointContextKey]
      }, window.onload = function () {
        oldWindowLoad && oldWindowLoad(), Context.refreshAll()
      }, Waypoint.requestAnimationFrame = function (callback) {
        var requestFn = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || requestAnimationFrameShim;
        requestFn.call(window, callback)
      }, Waypoint.Context = Context
    }(), function () {
      function byTriggerPoint(a, b) {
        return a.triggerPoint - b.triggerPoint
      }
      
      function byReverseTriggerPoint(a, b) {
        return b.triggerPoint - a.triggerPoint
      }
      
      function Group(options) {
        this.name = options.name, this.axis = options.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), groups[this.axis][this.name] = this
      }
      
      var groups = {vertical: {}, horizontal: {}}, Waypoint = window.Waypoint;
      Group.prototype.add = function (waypoint) {
        this.waypoints.push(waypoint)
      }, Group.prototype.clearTriggerQueues = function () {
        this.triggerQueues = {up: [], down: [], left: [], right: []}
      }, Group.prototype.flushTriggers = function () {
        for (var direction in this.triggerQueues) {
          var waypoints = this.triggerQueues[direction], reverse = "up" === direction || "left" === direction;
          waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);
          for (var i = 0, end = waypoints.length; i < end; i += 1) {
            var waypoint = waypoints[i];
            (waypoint.options.continuous || i === waypoints.length - 1) && waypoint.trigger([direction])
          }
        }
        this.clearTriggerQueues()
      }, Group.prototype.next = function (waypoint) {
        this.waypoints.sort(byTriggerPoint);
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints), isLast = index === this.waypoints.length - 1;
        return isLast ? null : this.waypoints[index + 1]
      }, Group.prototype.previous = function (waypoint) {
        this.waypoints.sort(byTriggerPoint);
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
        return index ? this.waypoints[index - 1] : null
      }, Group.prototype.queueTrigger = function (waypoint, direction) {
        this.triggerQueues[direction].push(waypoint)
      }, Group.prototype.remove = function (waypoint) {
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
        index > -1 && this.waypoints.splice(index, 1)
      }, Group.prototype.first = function () {
        return this.waypoints[0]
      }, Group.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1]
      }, Group.findOrCreate = function (options) {
        return groups[options.axis][options.name] || new Group(options)
      }, Waypoint.Group = Group
    }(), function () {
      function JQueryAdapter(element) {
        this.$element = $(element)
      }
      
      var $ = window.jQuery, Waypoint = window.Waypoint;
      $.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (i, method) {
        JQueryAdapter.prototype[method] = function () {
          var args = Array.prototype.slice.call(arguments);
          return this.$element[method].apply(this.$element, args)
        }
      }), $.each(["extend", "inArray", "isEmptyObject"], function (i, method) {
        JQueryAdapter[method] = $[method]
      }), Waypoint.adapters.push({name: "jquery", Adapter: JQueryAdapter}), Waypoint.Adapter = JQueryAdapter
    }(), function () {
      function createExtension(framework) {
        return function () {
          var waypoints = [], overrides = arguments[0];
          return framework.isFunction(arguments[0]) && (overrides = framework.extend({}, arguments[1]), overrides.handler = arguments[0]), this.each(function () {
            var options = framework.extend({}, overrides, {element: this});
            "string" == typeof options.context && (options.context = framework(this).closest(options.context)[0]), waypoints.push(new Waypoint(options))
          }), waypoints
        }
      }
      
      var Waypoint = window.Waypoint;
      window.jQuery && (window.jQuery.fn.waypoint = createExtension(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = createExtension(window.Zepto))
    }()
  }, 102: function (module, exports) {
    "use strict";
    !function ($) {
      $.fn.counterUp = function (options) {
        var s, settings = $.extend({
          time: 400,
          delay: 10,
          offset: 100,
          beginAt: 0,
          formatter: !1,
          context: "window",
          callback: function () {
          }
        }, options);
        return this.each(function () {
          var $this = $(this), counter = {
            time: $(this).data("counterup-time") || settings.time,
            delay: $(this).data("counterup-delay") || settings.delay,
            offset: $(this).data("counterup-offset") || settings.offset,
            beginAt: $(this).data("counterup-beginat") || settings.beginAt,
            context: $(this).data("counterup-context") || settings.context
          }, counterUpper = function () {
            var nums = [], divisions = counter.time / counter.delay,
              num = $this.attr("data-num") ? $this.attr("data-num") : $this.text(), isComma = /[0-9]+,[0-9]+/.test(num);
            num = num.replace(/,/g, "");
            var decimalPlaces = (num.split(".")[1] || []).length;
            counter.beginAt > num && (counter.beginAt = num);
            var isTime = /[0-9]+:[0-9]+:[0-9]+/.test(num);
            if (isTime) {
              var times = num.split(":"), m = 1;
              for (s = 0; times.length > 0;)s += m * parseInt(times.pop(), 10), m *= 60
            }
            for (var i = divisions; i >= counter.beginAt / num * divisions; i--) {
              var newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
              if (isTime) {
                newNum = parseInt(s / divisions * i);
                var hours = parseInt(newNum / 3600) % 24, minutes = parseInt(newNum / 60) % 60,
                  seconds = parseInt(newNum % 60, 10);
                newNum = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
              }
              if (isComma)for (; /(\d+)(\d{3})/.test(newNum.toString());)newNum = newNum.toString().replace(/(\d+)(\d{3})/, "$1,$2");
              settings.formatter && (newNum = settings.formatter.call(this, newNum)), nums.unshift(newNum)
            }
            $this.data("counterup-nums", nums), $this.text(counter.beginAt);
            var f = function () {
              return $this.data("counterup-nums") ? ($this.html($this.data("counterup-nums").shift()), void($this.data("counterup-nums").length ? setTimeout($this.data("counterup-func"), counter.delay) : ($this.data("counterup-nums", null), $this.data("counterup-func", null), settings.callback.call(this)))) : void settings.callback.call(this)
            };
            $this.data("counterup-func", f), setTimeout($this.data("counterup-func"), counter.delay)
          };
          $this.waypoint(function (direction) {
            counterUpper(), this.destroy()
          }, {offset: counter.offset + "%", context: counter.context})
        })
      }
    }(jQuery)
  }, 103: function (module, exports) {
  }, 128: function (module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    (function (global) {
      "use strict";
      var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
      };
      !function (root, factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
      }(void 0, function () {
        var require, define;
        !function () {
          function normalize(id, baseId) {
            if (!baseId)return id;
            if (0 === id.indexOf(".")) {
              var basePath = baseId.split("/"), namePath = id.split("/"), baseLen = basePath.length - 1,
                nameLen = namePath.length, cutBaseTerms = 0, cutNameTerms = 0;
              pathLoop:for (var i = 0; i < nameLen; i++)switch (namePath[i]) {
                case"..":
                  if (!(cutBaseTerms < baseLen))break pathLoop;
                  cutBaseTerms++, cutNameTerms++;
                  break;
                case".":
                  cutNameTerms++;
                  break;
                default:
                  break pathLoop
              }
              return basePath.length = baseLen - cutBaseTerms, namePath = namePath.slice(cutNameTerms), basePath.concat(namePath).join("/")
            }
            return id
          }
          
          function createRequire(baseId) {
            function localRequire(id, callback) {
              if ("string" == typeof id) {
                var exports = cacheMods[id];
                return exports || (exports = getModExports(normalize(id, baseId)), cacheMods[id] = exports), exports
              }
              id instanceof Array && (callback = callback || function () {
                }, callback.apply(this, getModsExports(id, callback, baseId)))
            }
            
            var cacheMods = {};
            return localRequire
          }
          
          function getModsExports(ids, factory, baseId) {
            for (var es = [], mod = mods[baseId], i = 0, l = Math.min(ids.length, factory.length); i < l; i++) {
              var arg, id = normalize(ids[i], baseId);
              switch (id) {
                case"require":
                  arg = mod && mod.require || require;
                  break;
                case"exports":
                  arg = mod.exports;
                  break;
                case"module":
                  arg = mod;
                  break;
                default:
                  arg = getModExports(id)
              }
              es.push(arg)
            }
            return es
          }
          
          function getModExports(id) {
            var mod = mods[id];
            if (!mod)throw new Error("No " + id);
            if (!mod.defined) {
              var factory = mod.factory,
                factoryReturn = factory.apply(this, getModsExports(mod.deps || [], factory, id));
              "undefined" != typeof factoryReturn && (mod.exports = factoryReturn), mod.defined = 1
            }
            return mod.exports
          }
          
          var mods = {};
          define = function (id, deps, factory) {
            mods[id] = {id: id, deps: deps, factory: factory, defined: 0, exports: {}, require: createRequire(id)}
          }, require = createRequire("")
        }(), define("echarts/chart/bar", ["require", "zrender/core/util", "../coord/cartesian/Grid", "./bar/BarSeries", "./bar/BarView", "../layout/barGrid", "../echarts", "../component/gridSimple"], function (require) {
          var zrUtil = require("zrender/core/util");
          require("../coord/cartesian/Grid"), require("./bar/BarSeries"), require("./bar/BarView");
          var barLayoutGrid = require("../layout/barGrid"), echarts = require("../echarts");
          echarts.registerLayout(zrUtil.curry(barLayoutGrid, "bar")), echarts.registerVisual(function (ecModel) {
            ecModel.eachSeriesByType("bar", function (seriesModel) {
              var data = seriesModel.getData();
              data.setVisual("legendSymbol", "roundRect")
            })
          }), require("../component/gridSimple")
        }), define("echarts/chart/line", ["require", "zrender/core/util", "../echarts", "./line/LineSeries", "./line/LineView", "../visual/symbol", "../layout/points", "../processor/dataSample", "../component/gridSimple"], function (require) {
          var zrUtil = require("zrender/core/util"), echarts = require("../echarts"), PRIORITY = echarts.PRIORITY;
          require("./line/LineSeries"), require("./line/LineView"), echarts.registerVisual(zrUtil.curry(require("../visual/symbol"), "line", "circle", "line")), echarts.registerLayout(zrUtil.curry(require("../layout/points"), "line")), echarts.registerProcessor(PRIORITY.PROCESSOR.STATISTIC, zrUtil.curry(require("../processor/dataSample"), "line")), require("../component/gridSimple")
        }), define("echarts/chart/pie", ["require", "zrender/core/util", "../echarts", "./pie/PieSeries", "./pie/PieView", "../action/createDataSelectAction", "../visual/dataColor", "./pie/pieLayout", "../processor/dataFilter"], function (require) {
          var zrUtil = require("zrender/core/util"), echarts = require("../echarts");
          require("./pie/PieSeries"), require("./pie/PieView"), require("../action/createDataSelectAction")("pie", [{
            type: "pieToggleSelect",
            event: "pieselectchanged",
            method: "toggleSelected"
          }, {type: "pieSelect", event: "pieselected", method: "select"}, {
            type: "pieUnSelect",
            event: "pieunselected",
            method: "unSelect"
          }]), echarts.registerVisual(zrUtil.curry(require("../visual/dataColor"), "pie")), echarts.registerLayout(zrUtil.curry(require("./pie/pieLayout"), "pie")), echarts.registerProcessor(zrUtil.curry(require("../processor/dataFilter"), "pie"))
        }), define("echarts/component/gridSimple", ["require", "../util/graphic", "zrender/core/util", "../echarts", "../coord/cartesian/Grid", "./axis"], function (require) {
          var graphic = require("../util/graphic"), zrUtil = require("zrender/core/util"),
            echarts = require("../echarts");
          require("../coord/cartesian/Grid"), require("./axis"), echarts.extendComponentView({
            type: "grid",
            render: function (gridModel, ecModel) {
              this.group.removeAll(), gridModel.get("show") && this.group.add(new graphic.Rect({
                shape: gridModel.coordinateSystem.getRect(),
                style: zrUtil.defaults({fill: gridModel.get("backgroundColor")}, gridModel.getItemStyle()),
                silent: !0,
                z2: -1
              }))
            }
          }), echarts.registerPreprocessor(function (option) {
            option.xAxis && option.yAxis && !option.grid && (option.grid = {})
          })
        }), define("echarts/echarts", ["require", "zrender/core/env", "./model/Global", "./ExtensionAPI", "./CoordinateSystem", "./model/OptionManager", "./model/Component", "./model/Series", "./view/Component", "./view/Chart", "./util/graphic", "./util/model", "./util/throttle", "zrender", "zrender/core/util", "zrender/tool/color", "zrender/mixin/Eventful", "zrender/core/timsort", "./visual/seriesColor", "./preprocessor/backwardCompat", "./loading/default", "./data/List", "./model/Model", "./coord/Axis", "./util/number", "./util/format", "zrender/core/matrix", "zrender/core/vector", "./helper"], function (require) {
          function createRegisterEventWithLowercaseName(method) {
            return function (eventName, handler, context) {
              eventName = eventName && eventName.toLowerCase(), Eventful.prototype[method].call(this, eventName, handler, context)
            }
          }
          
          function MessageCenter() {
            Eventful.call(this)
          }
          
          function ECharts(dom, theme, opts) {
            function prioritySortFunc(a, b) {
              return a.prio - b.prio
            }
            
            opts = opts || {}, "string" == typeof theme && (theme = themeStorage[theme]), this.id, this.group, this._dom = dom;
            var zr = this._zr = zrender.init(dom, {
              renderer: opts.renderer || "canvas",
              devicePixelRatio: opts.devicePixelRatio,
              width: opts.width,
              height: opts.height
            });
            this._throttledZrFlush = throttle.throttle(zrUtil.bind(zr.flush, zr), 17), this._theme = zrUtil.clone(theme), this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new CoordinateSystemManager, this._api = createExtensionAPI(this), Eventful.call(this), this._messageCenter = new MessageCenter, this._initEvents(), this.resize = zrUtil.bind(this.resize, this), this._pendingActions = [], timsort(visualFuncs, prioritySortFunc), timsort(dataProcessorFuncs, prioritySortFunc), zr.animation.on("frame", this._onframe, this), zrUtil.setAsPrimitive(this)
          }
          
          function doConvertPixel(methodName, finder, value) {
            var result, ecModel = this._model, coordSysList = this._coordSysMgr.getCoordinateSystems();
            finder = modelUtil.parseFinder(ecModel, finder);
            for (var i = 0; i < coordSysList.length; i++) {
              var coordSys = coordSysList[i];
              if (coordSys[methodName] && null != (result = coordSys[methodName](ecModel, finder, value)))return result
            }
          }
          
          function updateDirectly(ecIns, method, payload, mainType, subType) {
            function callView(view) {
              view && view.__alive && view[method] && view[method](view.__model, ecModel, ecIns._api, payload)
            }
            
            var ecModel = ecIns._model;
            if (!mainType)return void each(ecIns._componentsViews.concat(ecIns._chartsViews), callView);
            var query = {};
            query[mainType + "Id"] = payload[mainType + "Id"], query[mainType + "Index"] = payload[mainType + "Index"], query[mainType + "Name"] = payload[mainType + "Name"];
            var condition = {mainType: mainType, query: query};
            subType && (condition.subType = subType), ecModel && ecModel.eachComponent(condition, function (model, index) {
              callView(ecIns["series" === mainType ? "_chartsMap" : "_componentsMap"][model.__viewId])
            }, ecIns)
          }
          
          function doDispatchAction(payload, silent) {
            var payloadType = payload.type, escapeConnect = payload.escapeConnect, actionWrap = actions[payloadType],
              actionInfo = actionWrap.actionInfo, cptType = (actionInfo.update || "update").split(":"),
              updateMethod = cptType.pop();
            cptType = null != cptType[0] && parseClassType(cptType[0]), this[IN_MAIN_PROCESS] = !0;
            var payloads = [payload], batched = !1;
            payload.batch && (batched = !0, payloads = zrUtil.map(payload.batch, function (item) {
              return item = zrUtil.defaults(zrUtil.extend({}, item), payload), item.batch = null, item
            }));
            var eventObj, eventObjBatch = [], isHighDown = "highlight" === payloadType || "downplay" === payloadType;
            each(payloads, function (batchItem) {
              eventObj = actionWrap.action(batchItem, this._model, this._api), eventObj = eventObj || zrUtil.extend({}, batchItem), eventObj.type = actionInfo.event || eventObj.type, eventObjBatch.push(eventObj), isHighDown ? updateDirectly(this, updateMethod, batchItem, "series") : cptType && updateDirectly(this, updateMethod, batchItem, cptType.main, cptType.sub)
            }, this), "none" === updateMethod || isHighDown || cptType || (this[OPTION_UPDATED] ? (updateMethods.prepareAndUpdate.call(this, payload), this[OPTION_UPDATED] = !1) : updateMethods[updateMethod].call(this, payload)), eventObj = batched ? {
              type: actionInfo.event || payloadType,
              escapeConnect: escapeConnect,
              batch: eventObjBatch
            } : eventObjBatch[0], this[IN_MAIN_PROCESS] = !1, !silent && this._messageCenter.trigger(eventObj.type, eventObj)
          }
          
          function flushPendingActions(silent) {
            for (var pendingActions = this._pendingActions; pendingActions.length;) {
              var payload = pendingActions.shift();
              doDispatchAction.call(this, payload, silent)
            }
          }
          
          function triggerUpdatedEvent(silent) {
            !silent && this.trigger("updated")
          }
          
          function invokeUpdateMethod(methodName, ecModel, payload) {
            var api = this._api;
            each(this._componentsViews, function (component) {
              var componentModel = component.__model;
              component[methodName](componentModel, ecModel, api, payload), updateZ(componentModel, component)
            }, this), ecModel.eachSeries(function (seriesModel, idx) {
              var chart = this._chartsMap[seriesModel.__viewId];
              chart[methodName](seriesModel, ecModel, api, payload), updateZ(seriesModel, chart), updateProgressiveAndBlend(seriesModel, chart)
            }, this), updateHoverLayerStatus(this._zr, ecModel), each(postUpdateFuncs, function (func) {
              func(ecModel, api)
            })
          }
          
          function prepareView(type, ecModel) {
            for (var isComponent = "component" === type, viewList = isComponent ? this._componentsViews : this._chartsViews, viewMap = isComponent ? this._componentsMap : this._chartsMap, zr = this._zr, i = 0; i < viewList.length; i++)viewList[i].__alive = !1;
            ecModel[isComponent ? "eachComponent" : "eachSeries"](function (componentType, model) {
              if (isComponent) {
                if ("series" === componentType)return
              } else model = componentType;
              var viewId = model.id + "_" + model.type, view = viewMap[viewId];
              if (!view) {
                var classType = parseClassType(model.type),
                  Clazz = isComponent ? ComponentView.getClass(classType.main, classType.sub) : ChartView.getClass(classType.sub);
                if (!Clazz)return;
                view = new Clazz, view.init(ecModel, this._api), viewMap[viewId] = view, viewList.push(view), zr.add(view.group)
              }
              model.__viewId = view.__id = viewId, view.__alive = !0, view.__model = model, view.group.__ecComponentInfo = {
                mainType: model.mainType,
                index: model.componentIndex
              }
            }, this);
            for (var i = 0; i < viewList.length;) {
              var view = viewList[i];
              view.__alive ? i++ : (zr.remove(view.group), view.dispose(ecModel, this._api), viewList.splice(i, 1), delete viewMap[view.__id],
                view.__id = view.group.__ecComponentInfo = null)
            }
          }
          
          function processData(ecModel, api) {
            each(dataProcessorFuncs, function (process) {
              process.func(ecModel, api)
            })
          }
          
          function stackSeriesData(ecModel) {
            var stackedDataMap = {};
            ecModel.eachSeries(function (series) {
              var stack = series.get("stack"), data = series.getData();
              if (stack && "list" === data.type) {
                var previousStack = stackedDataMap[stack];
                previousStack && (data.stackedOn = previousStack), stackedDataMap[stack] = data
              }
            })
          }
          
          function doLayout(ecModel, payload) {
            var api = this._api;
            each(visualFuncs, function (visual) {
              visual.isLayout && visual.func(ecModel, api, payload)
            })
          }
          
          function doVisualEncoding(ecModel, payload, excludesLayout) {
            var api = this._api;
            ecModel.clearColorPalette(), ecModel.eachSeries(function (seriesModel) {
              seriesModel.clearColorPalette()
            }), each(visualFuncs, function (visual) {
              (!excludesLayout || !visual.isLayout) && visual.func(ecModel, api, payload)
            })
          }
          
          function doRender(ecModel, payload) {
            var api = this._api;
            each(this._componentsViews, function (componentView) {
              var componentModel = componentView.__model;
              componentView.render(componentModel, ecModel, api, payload), updateZ(componentModel, componentView)
            }, this), each(this._chartsViews, function (chart) {
              chart.__alive = !1
            }, this), ecModel.eachSeries(function (seriesModel, idx) {
              var chartView = this._chartsMap[seriesModel.__viewId];
              chartView.__alive = !0, chartView.render(seriesModel, ecModel, api, payload), chartView.group.silent = !!seriesModel.get("silent"), updateZ(seriesModel, chartView), updateProgressiveAndBlend(seriesModel, chartView)
            }, this), updateHoverLayerStatus(this._zr, ecModel), each(this._chartsViews, function (chart) {
              chart.__alive || chart.remove(ecModel, api)
            }, this)
          }
          
          function updateHoverLayerStatus(zr, ecModel) {
            var storage = zr.storage, elCount = 0;
            storage.traverse(function (el) {
              el.isGroup || elCount++
            }), elCount > ecModel.get("hoverLayerThreshold") && !env.node && storage.traverse(function (el) {
              el.isGroup || (el.useHoverLayer = !0)
            })
          }
          
          function updateProgressiveAndBlend(seriesModel, chartView) {
            var elCount = 0;
            chartView.group.traverse(function (el) {
              "group" === el.type || el.ignore || elCount++
            });
            var frameDrawNum = +seriesModel.get("progressive"),
              needProgressive = elCount > seriesModel.get("progressiveThreshold") && frameDrawNum && !env.node;
            needProgressive && chartView.group.traverse(function (el) {
              el.isGroup || (el.progressive = needProgressive ? Math.floor(elCount++ / frameDrawNum) : -1, needProgressive && el.stopAnimation(!0))
            });
            var blendMode = seriesModel.get("blendMode") || null;
            !env.canvasSupported && blendMode && "source-over" !== blendMode, chartView.group.traverse(function (el) {
              el.isGroup || el.setStyle("blend", blendMode)
            })
          }
          
          function updateZ(model, view) {
            var z = model.get("z"), zlevel = model.get("zlevel");
            view.group.traverse(function (el) {
              "group" !== el.type && (null != z && (el.z = z), null != zlevel && (el.zlevel = zlevel))
            })
          }
          
          function createExtensionAPI(ecInstance) {
            var coordSysMgr = ecInstance._coordSysMgr;
            return zrUtil.extend(new ExtensionAPI(ecInstance), {
              getCoordinateSystems: zrUtil.bind(coordSysMgr.getCoordinateSystems, coordSysMgr),
              getComponentByElement: function (el) {
                for (; el;) {
                  var modelInfo = el.__ecComponentInfo;
                  if (null != modelInfo)return ecInstance._model.getComponent(modelInfo.mainType, modelInfo.index);
                  el = el.parent
                }
              }
            })
          }
          
          function enableConnect(chart) {
            function updateConnectedChartsStatus(charts, status) {
              for (var i = 0; i < charts.length; i++) {
                var otherChart = charts[i];
                otherChart[STATUS_KEY] = status
              }
            }
            
            var STATUS_PENDING = 0, STATUS_UPDATING = 1, STATUS_UPDATED = 2, STATUS_KEY = "__connectUpdateStatus";
            zrUtil.each(eventActionMap, function (actionType, eventType) {
              chart._messageCenter.on(eventType, function (event) {
                if (connectedGroups[chart.group] && chart[STATUS_KEY] !== STATUS_PENDING) {
                  if (event && event.escapeConnect)return;
                  var action = chart.makeActionFromEvent(event), otherCharts = [];
                  zrUtil.each(instances, function (otherChart) {
                    otherChart !== chart && otherChart.group === chart.group && otherCharts.push(otherChart)
                  }), updateConnectedChartsStatus(otherCharts, STATUS_PENDING), each(otherCharts, function (otherChart) {
                    otherChart[STATUS_KEY] !== STATUS_UPDATING && otherChart.dispatchAction(action)
                  }), updateConnectedChartsStatus(otherCharts, STATUS_UPDATED)
                }
              })
            })
          }
          
          var env = require("zrender/core/env"), GlobalModel = require("./model/Global"),
            ExtensionAPI = require("./ExtensionAPI"), CoordinateSystemManager = require("./CoordinateSystem"),
            OptionManager = require("./model/OptionManager"), ComponentModel = require("./model/Component"),
            SeriesModel = require("./model/Series"), ComponentView = require("./view/Component"),
            ChartView = require("./view/Chart"), graphic = require("./util/graphic"),
            modelUtil = require("./util/model"), throttle = require("./util/throttle"), zrender = require("zrender"),
            zrUtil = require("zrender/core/util"), colorTool = require("zrender/tool/color"),
            Eventful = require("zrender/mixin/Eventful"), timsort = require("zrender/core/timsort"), each = zrUtil.each,
            parseClassType = ComponentModel.parseClassType, PRIORITY_PROCESSOR_FILTER = 1e3,
            PRIORITY_PROCESSOR_STATISTIC = 5e3, PRIORITY_VISUAL_LAYOUT = 1e3, PRIORITY_VISUAL_GLOBAL = 2e3,
            PRIORITY_VISUAL_CHART = 3e3, PRIORITY_VISUAL_COMPONENT = 4e3, PRIORITY_VISUAL_BRUSH = 5e3,
            IN_MAIN_PROCESS = "__flagInMainProcess", HAS_GRADIENT_OR_PATTERN_BG = "__hasGradientOrPatternBg",
            OPTION_UPDATED = "__optionUpdated", ACTION_REG = /^[a-zA-Z0-9_]+$/;
          MessageCenter.prototype.on = createRegisterEventWithLowercaseName("on"), MessageCenter.prototype.off = createRegisterEventWithLowercaseName("off"), MessageCenter.prototype.one = createRegisterEventWithLowercaseName("one"), zrUtil.mixin(MessageCenter, Eventful);
          var echartsProto = ECharts.prototype;
          echartsProto._onframe = function () {
            if (this[OPTION_UPDATED]) {
              var silent = this[OPTION_UPDATED].silent;
              this[IN_MAIN_PROCESS] = !0, updateMethods.prepareAndUpdate.call(this), this[IN_MAIN_PROCESS] = !1, this[OPTION_UPDATED] = !1, flushPendingActions.call(this, silent), triggerUpdatedEvent.call(this, silent)
            }
          }, echartsProto.getDom = function () {
            return this._dom
          }, echartsProto.getZr = function () {
            return this._zr
          }, echartsProto.setOption = function (option, notMerge, lazyUpdate) {
            zrUtil.assert(!this[IN_MAIN_PROCESS], "`setOption` should not be called during main process.");
            var silent;
            if (zrUtil.isObject(notMerge) && (lazyUpdate = notMerge.lazyUpdate, silent = notMerge.silent, notMerge = notMerge.notMerge), this[IN_MAIN_PROCESS] = !0, !this._model || notMerge) {
              var optionManager = new OptionManager(this._api), theme = this._theme,
                ecModel = this._model = new GlobalModel(null, null, theme, optionManager);
              ecModel.init(null, null, theme, optionManager)
            }
            this.__lastOnlyGraphic = !(!option || !option.graphic), zrUtil.each(option, function (o, mainType) {
              "graphic" !== mainType && (this.__lastOnlyGraphic = !1)
            }, this), this._model.setOption(option, optionPreprocessorFuncs, this.__lastOnlyGraphic), lazyUpdate ? (this[OPTION_UPDATED] = {silent: silent}, this[IN_MAIN_PROCESS] = !1) : (updateMethods.prepareAndUpdate.call(this), this._zr.flush(), this[OPTION_UPDATED] = !1, this[IN_MAIN_PROCESS] = !1, flushPendingActions.call(this, silent), triggerUpdatedEvent.call(this, silent))
          }, echartsProto.setTheme = function () {
          }, echartsProto.getModel = function () {
            return this._model
          }, echartsProto.getOption = function () {
            return this._model && this._model.getOption()
          }, echartsProto.getWidth = function () {
            return this._zr.getWidth()
          }, echartsProto.getHeight = function () {
            return this._zr.getHeight()
          }, echartsProto.getDevicePixelRatio = function () {
            return this._zr.painter.dpr || window.devicePixelRatio || 1
          }, echartsProto.getRenderedCanvas = function (opts) {
            if (env.canvasSupported) {
              opts = opts || {}, opts.pixelRatio = opts.pixelRatio || 1, opts.backgroundColor = opts.backgroundColor || this._model.get("backgroundColor");
              var zr = this._zr, list = zr.storage.getDisplayList();
              return zrUtil.each(list, function (el) {
                el.stopAnimation(!0)
              }), zr.painter.getRenderedCanvas(opts)
            }
          }, echartsProto.getDataURL = function (opts) {
            opts = opts || {};
            var excludeComponents = opts.excludeComponents, ecModel = this._model, excludesComponentViews = [],
              self = this;
            each(excludeComponents, function (componentType) {
              ecModel.eachComponent({mainType: componentType}, function (component) {
                var view = self._componentsMap[component.__viewId];
                view.group.ignore || (excludesComponentViews.push(view), view.group.ignore = !0)
              })
            });
            var url = this.getRenderedCanvas(opts).toDataURL("image/" + (opts && opts.type || "png"));
            return each(excludesComponentViews, function (view) {
              view.group.ignore = !1
            }), url
          }, echartsProto.getConnectedDataURL = function (opts) {
            if (env.canvasSupported) {
              var groupId = this.group, mathMin = Math.min, mathMax = Math.max, MAX_NUMBER = 1 / 0;
              if (connectedGroups[groupId]) {
                var left = MAX_NUMBER, top = MAX_NUMBER, right = -MAX_NUMBER, bottom = -MAX_NUMBER, canvasList = [],
                  dpr = opts && opts.pixelRatio || 1;
                zrUtil.each(instances, function (chart, id) {
                  if (chart.group === groupId) {
                    var canvas = chart.getRenderedCanvas(zrUtil.clone(opts)),
                      boundingRect = chart.getDom().getBoundingClientRect();
                    left = mathMin(boundingRect.left, left), top = mathMin(boundingRect.top, top), right = mathMax(boundingRect.right, right), bottom = mathMax(boundingRect.bottom, bottom), canvasList.push({
                      dom: canvas,
                      left: boundingRect.left,
                      top: boundingRect.top
                    })
                  }
                }), left *= dpr, top *= dpr, right *= dpr, bottom *= dpr;
                var width = right - left, height = bottom - top, targetCanvas = zrUtil.createCanvas();
                targetCanvas.width = width, targetCanvas.height = height;
                var zr = zrender.init(targetCanvas);
                return each(canvasList, function (item) {
                  var img = new graphic.Image({
                    style: {
                      x: item.left * dpr - left,
                      y: item.top * dpr - top,
                      image: item.dom
                    }
                  });
                  zr.add(img)
                }), zr.refreshImmediately(), targetCanvas.toDataURL("image/" + (opts && opts.type || "png"))
              }
              return this.getDataURL(opts)
            }
          }, echartsProto.convertToPixel = zrUtil.curry(doConvertPixel, "convertToPixel"), echartsProto.convertFromPixel = zrUtil.curry(doConvertPixel, "convertFromPixel"), echartsProto.containPixel = function (finder, value) {
            var result, ecModel = this._model;
            return finder = modelUtil.parseFinder(ecModel, finder), zrUtil.each(finder, function (models, key) {
              key.indexOf("Models") >= 0 && zrUtil.each(models, function (model) {
                var coordSys = model.coordinateSystem;
                if (coordSys && coordSys.containPoint) result |= !!coordSys.containPoint(value); else if ("seriesModels" === key) {
                  var view = this._chartsMap[model.__viewId];
                  view && view.containPoint && (result |= view.containPoint(value, model))
                }
              }, this)
            }, this), !!result
          }, echartsProto.getVisual = function (finder, visualType) {
            var ecModel = this._model;
            finder = modelUtil.parseFinder(ecModel, finder, {defaultMainType: "series"});
            var seriesModel = finder.seriesModel, data = seriesModel.getData(),
              dataIndexInside = finder.hasOwnProperty("dataIndexInside") ? finder.dataIndexInside : finder.hasOwnProperty("dataIndex") ? data.indexOfRawIndex(finder.dataIndex) : null;
            return null != dataIndexInside ? data.getItemVisual(dataIndexInside, visualType) : data.getVisual(visualType)
          }, echartsProto.getViewOfComponentModel = function (componentModel) {
            return this._componentsMap[componentModel.__viewId]
          }, echartsProto.getViewOfSeriesModel = function (seriesModel) {
            return this._chartsMap[seriesModel.__viewId]
          };
          var updateMethods = {
            update: function (payload) {
              var ecModel = this._model, api = this._api, coordSysMgr = this._coordSysMgr, zr = this._zr;
              if (ecModel) {
                ecModel.restoreData(), coordSysMgr.create(this._model, this._api), processData.call(this, ecModel, api), stackSeriesData.call(this, ecModel), coordSysMgr.update(ecModel, api), doVisualEncoding.call(this, ecModel, payload), doRender.call(this, ecModel, payload);
                var backgroundColor = ecModel.get("backgroundColor") || "transparent", painter = zr.painter;
                if (painter.isSingleCanvas && painter.isSingleCanvas()) zr.configLayer(0, {clearColor: backgroundColor}); else {
                  if (!env.canvasSupported) {
                    var colorArr = colorTool.parse(backgroundColor);
                    backgroundColor = colorTool.stringify(colorArr, "rgb"), 0 === colorArr[3] && (backgroundColor = "transparent")
                  }
                  backgroundColor.colorStops || backgroundColor.image ? (zr.configLayer(0, {clearColor: backgroundColor}), this[HAS_GRADIENT_OR_PATTERN_BG] = !0, this._dom.style.background = "transparent") : (this[HAS_GRADIENT_OR_PATTERN_BG] && zr.configLayer(0, {clearColor: null}), this[HAS_GRADIENT_OR_PATTERN_BG] = !1, this._dom.style.background = backgroundColor)
                }
                each(postUpdateFuncs, function (func) {
                  func(ecModel, api)
                })
              }
            }, updateView: function (payload) {
              var ecModel = this._model;
              ecModel && (ecModel.eachSeries(function (seriesModel) {
                seriesModel.getData().clearAllVisual()
              }), doVisualEncoding.call(this, ecModel, payload), invokeUpdateMethod.call(this, "updateView", ecModel, payload))
            }, updateVisual: function (payload) {
              var ecModel = this._model;
              ecModel && (ecModel.eachSeries(function (seriesModel) {
                seriesModel.getData().clearAllVisual()
              }), doVisualEncoding.call(this, ecModel, payload, !0), invokeUpdateMethod.call(this, "updateVisual", ecModel, payload))
            }, updateLayout: function (payload) {
              var ecModel = this._model;
              ecModel && (doLayout.call(this, ecModel, payload), invokeUpdateMethod.call(this, "updateLayout", ecModel, payload))
            }, prepareAndUpdate: function (payload) {
              var ecModel = this._model;
              prepareView.call(this, "component", ecModel), prepareView.call(this, "chart", ecModel), this.__lastOnlyGraphic ? (each(this._componentsViews, function (componentView) {
                var componentModel = componentView.__model;
                componentModel && "graphic" === componentModel.mainType && (componentView.render(componentModel, ecModel, this._api, payload), updateZ(componentModel, componentView))
              }, this), this.__lastOnlyGraphic = !1) : updateMethods.update.call(this, payload)
            }
          };
          echartsProto.resize = function (opts) {
            zrUtil.assert(!this[IN_MAIN_PROCESS], "`resize` should not be called during main process."), this[IN_MAIN_PROCESS] = !0, this._zr.resize(opts);
            var optionChanged = this._model && this._model.resetOption("media"),
              updateMethod = optionChanged ? "prepareAndUpdate" : "update";
            updateMethods[updateMethod].call(this), this._loadingFX && this._loadingFX.resize(), this[IN_MAIN_PROCESS] = !1;
            var silent = opts && opts.silent;
            flushPendingActions.call(this, silent), triggerUpdatedEvent.call(this, silent)
          }, echartsProto.showLoading = function (name, cfg) {
            if (zrUtil.isObject(name) && (cfg = name, name = ""), name = name || "default", this.hideLoading(), loadingEffects[name]) {
              var el = loadingEffects[name](this._api, cfg), zr = this._zr;
              this._loadingFX = el, zr.add(el)
            }
          }, echartsProto.hideLoading = function () {
            this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null
          }, echartsProto.makeActionFromEvent = function (eventObj) {
            var payload = zrUtil.extend({}, eventObj);
            return payload.type = eventActionMap[eventObj.type], payload
          }, echartsProto.dispatchAction = function (payload, opt) {
            if (zrUtil.isObject(opt) || (opt = {silent: !!opt}), actions[payload.type]) {
              if (this[IN_MAIN_PROCESS])return void this._pendingActions.push(payload);
              doDispatchAction.call(this, payload, opt.silent), opt.flush ? this._zr.flush(!0) : opt.flush !== !1 && env.browser.weChat && this._throttledZrFlush(), flushPendingActions.call(this, opt.silent), triggerUpdatedEvent.call(this, opt.silent)
            }
          }, echartsProto.on = createRegisterEventWithLowercaseName("on"), echartsProto.off = createRegisterEventWithLowercaseName("off"), echartsProto.one = createRegisterEventWithLowercaseName("one");
          var MOUSE_EVENT_NAMES = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
          echartsProto._initEvents = function () {
            each(MOUSE_EVENT_NAMES, function (eveName) {
              this._zr.on(eveName, function (e) {
                var params, ecModel = this.getModel(), el = e.target;
                if ("globalout" === eveName) params = {}; else if (el && null != el.dataIndex) {
                  var dataModel = el.dataModel || ecModel.getSeriesByIndex(el.seriesIndex);
                  params = dataModel && dataModel.getDataParams(el.dataIndex, el.dataType) || {}
                } else el && el.eventData && (params = zrUtil.extend({}, el.eventData));
                params && (params.event = e, params.type = eveName, this.trigger(eveName, params))
              }, this)
            }, this), each(eventActionMap, function (actionType, eventType) {
              this._messageCenter.on(eventType, function (event) {
                this.trigger(eventType, event)
              }, this)
            }, this)
          }, echartsProto.isDisposed = function () {
            return this._disposed
          }, echartsProto.clear = function () {
            this.setOption({series: []}, !0)
          }, echartsProto.dispose = function () {
            if (!this._disposed) {
              this._disposed = !0;
              var api = this._api, ecModel = this._model;
              each(this._componentsViews, function (component) {
                component.dispose(ecModel, api)
              }), each(this._chartsViews, function (chart) {
                chart.dispose(ecModel, api)
              }), this._zr.dispose(), delete instances[this.id]
            }
          }, zrUtil.mixin(ECharts, Eventful);
          var actions = {}, eventActionMap = {}, dataProcessorFuncs = [], optionPreprocessorFuncs = [],
            postUpdateFuncs = [], visualFuncs = [], themeStorage = {}, loadingEffects = {}, instances = {},
            connectedGroups = {}, idBase = new Date - 0, groupIdBase = new Date - 0,
            DOM_ATTRIBUTE_KEY = "_echarts_instance_", echarts = {version: "3.5.4", dependencies: {zrender: "3.4.4"}};
          return echarts.init = function (dom, theme, opts) {
            if (zrender.version.replace(".", "") - 0 < echarts.dependencies.zrender.replace(".", "") - 0)throw new Error("ZRender " + zrender.version + " is too old for ECharts " + echarts.version + ". Current version need ZRender " + echarts.dependencies.zrender + "+");
            if (!dom)throw new Error("Initialize failed: invalid dom.");
            zrUtil.isDom(dom) && "CANVAS" !== dom.nodeName.toUpperCase() && (!dom.clientWidth && (!opts || null == opts.width) || !dom.clientHeight && (!opts || null == opts.height));
            var chart = new ECharts(dom, theme, opts);
            return chart.id = "ec_" + idBase++, instances[chart.id] = chart, dom.setAttribute && dom.setAttribute(DOM_ATTRIBUTE_KEY, chart.id), enableConnect(chart), chart
          }, echarts.connect = function (groupId) {
            if (zrUtil.isArray(groupId)) {
              var charts = groupId;
              groupId = null, zrUtil.each(charts, function (chart) {
                null != chart.group && (groupId = chart.group)
              }), groupId = groupId || "g_" + groupIdBase++, zrUtil.each(charts, function (chart) {
                chart.group = groupId
              })
            }
            return connectedGroups[groupId] = !0, groupId
          }, echarts.disConnect = function (groupId) {
            connectedGroups[groupId] = !1
          }, echarts.disconnect = echarts.disConnect, echarts.dispose = function (chart) {
            zrUtil.isDom(chart) ? chart = echarts.getInstanceByDom(chart) : "string" == typeof chart && (chart = instances[chart]), chart instanceof ECharts && !chart.isDisposed() && chart.dispose()
          }, echarts.getInstanceByDom = function (dom) {
            var key = dom.getAttribute(DOM_ATTRIBUTE_KEY);
            return instances[key]
          }, echarts.getInstanceById = function (key) {
            return instances[key]
          }, echarts.registerTheme = function (name, theme) {
            themeStorage[name] = theme
          }, echarts.registerPreprocessor = function (preprocessorFunc) {
            optionPreprocessorFuncs.push(preprocessorFunc)
          }, echarts.registerProcessor = function (priority, processorFunc) {
            if ("function" == typeof priority && (processorFunc = priority, priority = PRIORITY_PROCESSOR_FILTER), isNaN(priority))throw new Error("Unkown processor priority");
            dataProcessorFuncs.push({prio: priority, func: processorFunc})
          }, echarts.registerPostUpdate = function (postUpdateFunc) {
            postUpdateFuncs.push(postUpdateFunc)
          }, echarts.registerAction = function (actionInfo, eventName, action) {
            "function" == typeof eventName && (action = eventName, eventName = "");
            var actionType = zrUtil.isObject(actionInfo) ? actionInfo.type : [actionInfo, actionInfo = {event: eventName}][0];
            actionInfo.event = (actionInfo.event || actionType).toLowerCase(), eventName = actionInfo.event, zrUtil.assert(ACTION_REG.test(actionType) && ACTION_REG.test(eventName)), actions[actionType] || (actions[actionType] = {
              action: action,
              actionInfo: actionInfo
            }), eventActionMap[eventName] = actionType
          }, echarts.registerCoordinateSystem = function (type, CoordinateSystem) {
            CoordinateSystemManager.register(type, CoordinateSystem)
          }, echarts.registerLayout = function (priority, layoutFunc) {
            if ("function" == typeof priority && (layoutFunc = priority, priority = PRIORITY_VISUAL_LAYOUT), isNaN(priority))throw new Error("Unkown layout priority");
            visualFuncs.push({prio: priority, func: layoutFunc, isLayout: !0})
          }, echarts.registerVisual = function (priority, visualFunc) {
            if ("function" == typeof priority && (visualFunc = priority, priority = PRIORITY_VISUAL_CHART), isNaN(priority))throw new Error("Unkown visual priority");
            visualFuncs.push({prio: priority, func: visualFunc})
          }, echarts.registerLoading = function (name, loadingFx) {
            loadingEffects[name] = loadingFx
          }, echarts.extendComponentModel = function (opts) {
            return ComponentModel.extend(opts)
          }, echarts.extendComponentView = function (opts) {
            return ComponentView.extend(opts)
          }, echarts.extendSeriesModel = function (opts) {
            return SeriesModel.extend(opts)
          }, echarts.extendChartView = function (opts) {
            return ChartView.extend(opts)
          }, echarts.setCanvasCreator = function (creator) {
            zrUtil.createCanvas = creator
          }, echarts.registerVisual(PRIORITY_VISUAL_GLOBAL, require("./visual/seriesColor")), echarts.registerPreprocessor(require("./preprocessor/backwardCompat")), echarts.registerLoading("default", require("./loading/default")), echarts.registerAction({
            type: "highlight",
            event: "highlight",
            update: "highlight"
          }, zrUtil.noop), echarts.registerAction({
            type: "downplay",
            event: "downplay",
            update: "downplay"
          }, zrUtil.noop), echarts.zrender = zrender, echarts.List = require("./data/List"), echarts.Model = require("./model/Model"), echarts.Axis = require("./coord/Axis"), echarts.graphic = require("./util/graphic"), echarts.number = require("./util/number"), echarts.format = require("./util/format"), echarts.throttle = throttle.throttle, echarts.matrix = require("zrender/core/matrix"), echarts.vector = require("zrender/core/vector"), echarts.color = require("zrender/tool/color"), echarts.util = {}, each(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge"], function (name) {
            echarts.util[name] = zrUtil[name]
          }), echarts.helper = require("./helper"), echarts.PRIORITY = {
            PROCESSOR: {
              FILTER: PRIORITY_PROCESSOR_FILTER,
              STATISTIC: PRIORITY_PROCESSOR_STATISTIC
            },
            VISUAL: {
              LAYOUT: PRIORITY_VISUAL_LAYOUT,
              GLOBAL: PRIORITY_VISUAL_GLOBAL,
              CHART: PRIORITY_VISUAL_CHART,
              COMPONENT: PRIORITY_VISUAL_COMPONENT,
              BRUSH: PRIORITY_VISUAL_BRUSH
            }
          }, echarts
        }), define("echarts/component/title", ["require", "../echarts", "../util/graphic", "../util/layout"], function (require) {
          var echarts = require("../echarts"), graphic = require("../util/graphic"), layout = require("../util/layout");
          echarts.extendComponentModel({
            type: "title",
            layoutMode: {type: "box", ignoreSize: !0},
            defaultOption: {
              zlevel: 0,
              z: 6,
              show: !0,
              text: "",
              target: "blank",
              subtext: "",
              subtarget: "blank",
              left: 0,
              top: 0,
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: "#ccc",
              borderWidth: 0,
              padding: 5,
              itemGap: 10,
              textStyle: {fontSize: 18, fontWeight: "bolder", color: "#333"},
              subtextStyle: {color: "#aaa"}
            }
          }), echarts.extendComponentView({
            type: "title", render: function (titleModel, ecModel, api) {
              if (this.group.removeAll(), titleModel.get("show")) {
                var group = this.group, textStyleModel = titleModel.getModel("textStyle"),
                  subtextStyleModel = titleModel.getModel("subtextStyle"), textAlign = titleModel.get("textAlign"),
                  textBaseline = titleModel.get("textBaseline"), textEl = new graphic.Text({
                    style: {
                      text: titleModel.get("text"),
                      textFont: textStyleModel.getFont(),
                      fill: textStyleModel.getTextColor()
                    }, z2: 10
                  }), textRect = textEl.getBoundingRect(), subText = titleModel.get("subtext"),
                  subTextEl = new graphic.Text({
                    style: {
                      text: subText,
                      textFont: subtextStyleModel.getFont(),
                      fill: subtextStyleModel.getTextColor(),
                      y: textRect.height + titleModel.get("itemGap"),
                      textBaseline: "top"
                    }, z2: 10
                  }), link = titleModel.get("link"), sublink = titleModel.get("sublink");
                textEl.silent = !link, subTextEl.silent = !sublink, link && textEl.on("click", function () {
                  window.open(link, "_" + titleModel.get("target"))
                }), sublink && subTextEl.on("click", function () {
                  window.open(sublink, "_" + titleModel.get("subtarget"))
                }), group.add(textEl), subText && group.add(subTextEl);
                var groupRect = group.getBoundingRect(), layoutOption = titleModel.getBoxLayoutParams();
                layoutOption.width = groupRect.width, layoutOption.height = groupRect.height;
                var layoutRect = layout.getLayoutRect(layoutOption, {
                  width: api.getWidth(),
                  height: api.getHeight()
                }, titleModel.get("padding"));
                textAlign || (textAlign = titleModel.get("left") || titleModel.get("right"), "middle" === textAlign && (textAlign = "center"), "right" === textAlign ? layoutRect.x += layoutRect.width : "center" === textAlign && (layoutRect.x += layoutRect.width / 2)), textBaseline || (textBaseline = titleModel.get("top") || titleModel.get("bottom"), "center" === textBaseline && (textBaseline = "middle"), "bottom" === textBaseline ? layoutRect.y += layoutRect.height : "middle" === textBaseline && (layoutRect.y += layoutRect.height / 2), textBaseline = textBaseline || "top"), group.attr("position", [layoutRect.x, layoutRect.y]);
                var alignStyle = {textAlign: textAlign, textVerticalAlign: textBaseline};
                textEl.setStyle(alignStyle), subTextEl.setStyle(alignStyle), groupRect = group.getBoundingRect();
                var padding = layoutRect.margin, style = titleModel.getItemStyle(["color", "opacity"]);
                style.fill = titleModel.get("backgroundColor");
                var rect = new graphic.Rect({
                  shape: {
                    x: groupRect.x - padding[3],
                    y: groupRect.y - padding[0],
                    width: groupRect.width + padding[1] + padding[3],
                    height: groupRect.height + padding[0] + padding[2]
                  }, style: style, silent: !0
                });
                graphic.subPixelOptimizeRect(rect), group.add(rect)
              }
            }
          })
        }), define("echarts/component/legend", ["require", "./legend/LegendModel", "./legend/legendAction", "./legend/LegendView", "../echarts", "./legend/legendFilter"], function (require) {
          require("./legend/LegendModel"), require("./legend/legendAction"), require("./legend/LegendView");
          var echarts = require("../echarts");
          echarts.registerProcessor(require("./legend/legendFilter"))
        }), define("echarts/component/tooltip", ["require", "./axisPointer", "./tooltip/TooltipModel", "./tooltip/TooltipView", "../echarts"], function (require) {
          require("./axisPointer"), require("./tooltip/TooltipModel"), require("./tooltip/TooltipView"), require("../echarts").registerAction({
            type: "showTip",
            event: "showTip",
            update: "tooltip:manuallyShowTip"
          }, function () {
          }), require("../echarts").registerAction({
            type: "hideTip",
            event: "hideTip",
            update: "tooltip:manuallyHideTip"
          }, function () {
          })
        }), define("zrender/vml/vml", ["require", "./graphic", "../zrender", "./Painter"], function (require) {
          require("./graphic"), require("../zrender").registerPainter("vml", require("./Painter"))
        }), define("echarts/component/markLine", ["require", "./marker/MarkLineModel", "./marker/MarkLineView", "../echarts"], function (require) {
          require("./marker/MarkLineModel"), require("./marker/MarkLineView"), require("../echarts").registerPreprocessor(function (opt) {
            opt.markLine = opt.markLine || {}
          })
        }), define("echarts/component/markPoint", ["require", "./marker/MarkPointModel", "./marker/MarkPointView", "../echarts"], function (require) {
          require("./marker/MarkPointModel"), require("./marker/MarkPointView"), require("../echarts").registerPreprocessor(function (opt) {
            opt.markPoint = opt.markPoint || {}
          })
        }), define("echarts/scale/Time", ["require", "zrender/core/util", "../util/number", "../util/format", "./helper", "./Interval"], function (require) {
          var zrUtil = require("zrender/core/util"), numberUtil = require("../util/number"),
            formatUtil = require("../util/format"), scaleHelper = require("./helper"),
            IntervalScale = require("./Interval"), intervalScaleProto = IntervalScale.prototype, mathCeil = Math.ceil,
            mathFloor = Math.floor, ONE_SECOND = 1e3, ONE_MINUTE = 60 * ONE_SECOND, ONE_HOUR = 60 * ONE_MINUTE,
            ONE_DAY = 24 * ONE_HOUR, bisect = function (a, x, lo, hi) {
              for (; lo < hi;) {
                var mid = lo + hi >>> 1;
                a[mid][2] < x ? lo = mid + 1 : hi = mid
              }
              return lo
            }, TimeScale = IntervalScale.extend({
              type: "time", getLabel: function (val) {
                var stepLvl = this._stepLvl, date = new Date(val);
                return formatUtil.formatTime(stepLvl[0], date, this.getSetting("useUTC"))
              }, niceExtent: function (approxTickNum, fixMin, fixMax) {
                var extent = this._extent;
                if (extent[0] === extent[1] && (extent[0] -= ONE_DAY, extent[1] += ONE_DAY), extent[1] === -(1 / 0) && extent[0] === 1 / 0) {
                  var d = new Date;
                  extent[1] = new Date(d.getFullYear(), d.getMonth(), d.getDate()), extent[0] = extent[1] - ONE_DAY
                }
                this.niceTicks(approxTickNum);
                var interval = this._interval;
                fixMin || (extent[0] = numberUtil.round(mathFloor(extent[0] / interval) * interval)), fixMax || (extent[1] = numberUtil.round(mathCeil(extent[1] / interval) * interval))
              }, niceTicks: function (approxTickNum) {
                var timezoneOffset = this.getSetting("useUTC") ? 0 : 60 * numberUtil.getTimezoneOffset() * 1e3;
                approxTickNum = approxTickNum || 10;
                var extent = this._extent, span = extent[1] - extent[0], approxInterval = span / approxTickNum,
                  scaleLevelsLen = scaleLevels.length, idx = bisect(scaleLevels, approxInterval, 0, scaleLevelsLen),
                  level = scaleLevels[Math.min(idx, scaleLevelsLen - 1)], interval = level[2];
                if ("year" === level[0]) {
                  var yearSpan = span / interval, yearStep = numberUtil.nice(yearSpan / approxTickNum, !0);
                  interval *= yearStep
                }
                var niceExtent = [Math.round(mathCeil((extent[0] - timezoneOffset) / interval) * interval + timezoneOffset), Math.round(mathFloor((extent[1] - timezoneOffset) / interval) * interval + timezoneOffset)];
                scaleHelper.fixExtent(niceExtent, extent), this._stepLvl = level, this._interval = interval, this._niceExtent = niceExtent
              }, parse: function (val) {
                return +numberUtil.parseDate(val)
              }
            });
          zrUtil.each(["contain", "normalize"], function (methodName) {
            TimeScale.prototype[methodName] = function (val) {
              return intervalScaleProto[methodName].call(this, this.parse(val))
            }
          });
          var scaleLevels = [["hh:mm:ss", 1, ONE_SECOND], ["hh:mm:ss", 5, 5 * ONE_SECOND], ["hh:mm:ss", 10, 10 * ONE_SECOND], ["hh:mm:ss", 15, 15 * ONE_SECOND], ["hh:mm:ss", 30, 30 * ONE_SECOND], ["hh:mm\nMM-dd", 1, ONE_MINUTE], ["hh:mm\nMM-dd", 5, 5 * ONE_MINUTE], ["hh:mm\nMM-dd", 10, 10 * ONE_MINUTE], ["hh:mm\nMM-dd", 15, 15 * ONE_MINUTE], ["hh:mm\nMM-dd", 30, 30 * ONE_MINUTE], ["hh:mm\nMM-dd", 1, ONE_HOUR], ["hh:mm\nMM-dd", 2, 2 * ONE_HOUR], ["hh:mm\nMM-dd", 6, 6 * ONE_HOUR], ["hh:mm\nMM-dd", 12, 12 * ONE_HOUR], ["MM-dd\nyyyy", 1, ONE_DAY], ["week", 7, 7 * ONE_DAY], ["month", 1, 31 * ONE_DAY], ["quarter", 3, 380 * ONE_DAY / 4], ["half-year", 6, 380 * ONE_DAY / 2], ["year", 1, 380 * ONE_DAY]];
          return TimeScale.create = function (model) {
            return new TimeScale({useUTC: model.ecModel.get("useUTC")})
          }, TimeScale
        }), define("echarts/scale/Log", ["require", "zrender/core/util", "./Scale", "../util/number", "./Interval"], function (require) {
          function fixRoundingError(val, originalVal) {
            return roundingErrorFix(val, getPrecisionSafe(originalVal))
          }
          
          var zrUtil = require("zrender/core/util"), Scale = require("./Scale"), numberUtil = require("../util/number"),
            IntervalScale = require("./Interval"), scaleProto = Scale.prototype,
            intervalScaleProto = IntervalScale.prototype, getPrecisionSafe = numberUtil.getPrecisionSafe,
            roundingErrorFix = numberUtil.round, mathFloor = Math.floor, mathCeil = Math.ceil, mathPow = Math.pow,
            mathLog = Math.log, LogScale = Scale.extend({
              type: "log", base: 10, $constructor: function () {
                Scale.apply(this, arguments), this._originalScale = new IntervalScale
              }, getTicks: function () {
                var originalScale = this._originalScale, extent = this._extent,
                  originalExtent = originalScale.getExtent();
                return zrUtil.map(intervalScaleProto.getTicks.call(this), function (val) {
                  var powVal = numberUtil.round(mathPow(this.base, val));
                  return powVal = val === extent[0] && originalScale.__fixMin ? fixRoundingError(powVal, originalExtent[0]) : powVal, powVal = val === extent[1] && originalScale.__fixMax ? fixRoundingError(powVal, originalExtent[1]) : powVal
                }, this)
              }, getLabel: intervalScaleProto.getLabel, scale: function (val) {
                return val = scaleProto.scale.call(this, val), mathPow(this.base, val)
              }, setExtent: function (start, end) {
                var base = this.base;
                start = mathLog(start) / mathLog(base), end = mathLog(end) / mathLog(base), intervalScaleProto.setExtent.call(this, start, end)
              }, getExtent: function () {
                var base = this.base, extent = scaleProto.getExtent.call(this);
                extent[0] = mathPow(base, extent[0]), extent[1] = mathPow(base, extent[1]);
                var originalScale = this._originalScale, originalExtent = originalScale.getExtent();
                return originalScale.__fixMin && (extent[0] = fixRoundingError(extent[0], originalExtent[0])), originalScale.__fixMax && (extent[1] = fixRoundingError(extent[1], originalExtent[1])), extent
              }, unionExtent: function (extent) {
                this._originalScale.unionExtent(extent);
                var base = this.base;
                extent[0] = mathLog(extent[0]) / mathLog(base), extent[1] = mathLog(extent[1]) / mathLog(base), scaleProto.unionExtent.call(this, extent)
              }, unionExtentFromData: function (data, dim) {
                this.unionExtent(data.getDataExtent(dim, !0, function (val) {
                  return val > 0
                }))
              }, niceTicks: function (approxTickNum) {
                approxTickNum = approxTickNum || 10;
                var extent = this._extent, span = extent[1] - extent[0];
                if (!(span === 1 / 0 || span <= 0)) {
                  var interval = numberUtil.quantity(span), err = approxTickNum / span * interval;
                  for (err <= .5 && (interval *= 10); !isNaN(interval) && Math.abs(interval) < 1 && Math.abs(interval) > 0;)interval *= 10;
                  var niceExtent = [numberUtil.round(mathCeil(extent[0] / interval) * interval), numberUtil.round(mathFloor(extent[1] / interval) * interval)];
                  this._interval = interval, this._niceExtent = niceExtent
                }
              }, niceExtent: function (splitNumber, fixMin, fixMax) {
                intervalScaleProto.niceExtent.call(this, splitNumber, fixMin, fixMax);
                var originalScale = this._originalScale;
                originalScale.__fixMin = fixMin, originalScale.__fixMax = fixMax
              }
            });
          return zrUtil.each(["contain", "normalize"], function (methodName) {
            LogScale.prototype[methodName] = function (val) {
              return val = mathLog(val) / mathLog(this.base), scaleProto[methodName].call(this, val)
            }
          }), LogScale.create = function () {
            return new LogScale
          }, LogScale
        }), define("zrender/core/util", ["require"], function (require) {
          function clone(source) {
            if (null == source || "object" != ("undefined" == typeof source ? "undefined" : _typeof(source)))return source;
            var result = source, typeStr = objToString.call(source);
            if ("[object Array]" === typeStr) {
              result = [];
              for (var i = 0, len = source.length; i < len; i++)result[i] = clone(source[i]);
            } else if (TYPED_ARRAY[typeStr]) result = source.constructor.from(source); else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
              result = {};
              for (var key in source)source.hasOwnProperty(key) && (result[key] = clone(source[key]))
            }
            return result
          }
          
          function merge(target, source, overwrite) {
            if (!isObject(source) || !isObject(target))return overwrite ? clone(source) : target;
            for (var key in source)if (source.hasOwnProperty(key)) {
              var targetProp = target[key], sourceProp = source[key];
              !isObject(sourceProp) || !isObject(targetProp) || isArray(sourceProp) || isArray(targetProp) || isDom(sourceProp) || isDom(targetProp) || isBuiltInObject(sourceProp) || isBuiltInObject(targetProp) || isPrimitive(sourceProp) || isPrimitive(targetProp) ? !overwrite && key in target || (target[key] = clone(source[key], !0)) : merge(targetProp, sourceProp, overwrite)
            }
            return target
          }
          
          function mergeAll(targetAndSources, overwrite) {
            for (var result = targetAndSources[0], i = 1, len = targetAndSources.length; i < len; i++)result = merge(result, targetAndSources[i], overwrite);
            return result
          }
          
          function extend(target, source) {
            for (var key in source)source.hasOwnProperty(key) && (target[key] = source[key]);
            return target
          }
          
          function defaults(target, source, overlay) {
            for (var key in source)source.hasOwnProperty(key) && (overlay ? null != source[key] : null == target[key]) && (target[key] = source[key]);
            return target
          }
          
          function createCanvas() {
            return document.createElement("canvas")
          }
          
          function getContext() {
            return _ctx || (_ctx = util.createCanvas().getContext("2d")), _ctx
          }
          
          function indexOf(array, value) {
            if (array) {
              if (array.indexOf)return array.indexOf(value);
              for (var i = 0, len = array.length; i < len; i++)if (array[i] === value)return i
            }
            return -1
          }
          
          function inherits(clazz, baseClazz) {
            function F() {
            }
            
            var clazzPrototype = clazz.prototype;
            F.prototype = baseClazz.prototype, clazz.prototype = new F;
            for (var prop in clazzPrototype)clazz.prototype[prop] = clazzPrototype[prop];
            clazz.prototype.constructor = clazz, clazz.superClass = baseClazz
          }
          
          function mixin(target, source, overlay) {
            target = "prototype" in target ? target.prototype : target, source = "prototype" in source ? source.prototype : source, defaults(target, source, overlay)
          }
          
          function isArrayLike(data) {
            if (data)return "string" != typeof data && "number" == typeof data.length
          }
          
          function each(obj, cb, context) {
            if (obj && cb)if (obj.forEach && obj.forEach === nativeForEach) obj.forEach(cb, context); else if (obj.length === +obj.length)for (var i = 0, len = obj.length; i < len; i++)cb.call(context, obj[i], i, obj); else for (var key in obj)obj.hasOwnProperty(key) && cb.call(context, obj[key], key, obj)
          }
          
          function map(obj, cb, context) {
            if (obj && cb) {
              if (obj.map && obj.map === nativeMap)return obj.map(cb, context);
              for (var result = [], i = 0, len = obj.length; i < len; i++)result.push(cb.call(context, obj[i], i, obj));
              return result
            }
          }
          
          function reduce(obj, cb, memo, context) {
            if (obj && cb) {
              if (obj.reduce && obj.reduce === nativeReduce)return obj.reduce(cb, memo, context);
              for (var i = 0, len = obj.length; i < len; i++)memo = cb.call(context, memo, obj[i], i, obj);
              return memo
            }
          }
          
          function filter(obj, cb, context) {
            if (obj && cb) {
              if (obj.filter && obj.filter === nativeFilter)return obj.filter(cb, context);
              for (var result = [], i = 0, len = obj.length; i < len; i++)cb.call(context, obj[i], i, obj) && result.push(obj[i]);
              return result
            }
          }
          
          function find(obj, cb, context) {
            if (obj && cb)for (var i = 0, len = obj.length; i < len; i++)if (cb.call(context, obj[i], i, obj))return obj[i]
          }
          
          function bind(func, context) {
            var args = nativeSlice.call(arguments, 2);
            return function () {
              return func.apply(context, args.concat(nativeSlice.call(arguments)))
            }
          }
          
          function curry(func) {
            var args = nativeSlice.call(arguments, 1);
            return function () {
              return func.apply(this, args.concat(nativeSlice.call(arguments)))
            }
          }
          
          function isArray(value) {
            return "[object Array]" === objToString.call(value)
          }
          
          function isFunction(value) {
            return "function" == typeof value
          }
          
          function isString(value) {
            return "[object String]" === objToString.call(value)
          }
          
          function isObject(value) {
            var type = "undefined" == typeof value ? "undefined" : _typeof(value);
            return "function" === type || !!value && "object" == type
          }
          
          function isBuiltInObject(value) {
            return !!BUILTIN_OBJECT[objToString.call(value)]
          }
          
          function isDom(value) {
            return "object" === ("undefined" == typeof value ? "undefined" : _typeof(value)) && "number" == typeof value.nodeType && "object" === _typeof(value.ownerDocument)
          }
          
          function eqNaN(value) {
            return value !== value
          }
          
          function retrieve(values) {
            for (var i = 0, len = arguments.length; i < len; i++)if (null != arguments[i])return arguments[i]
          }
          
          function slice() {
            return Function.call.apply(nativeSlice, arguments)
          }
          
          function assert(condition, message) {
            if (!condition)throw new Error(message)
          }
          
          function setAsPrimitive(obj) {
            obj[primitiveKey] = !0
          }
          
          function isPrimitive(obj) {
            return obj[primitiveKey]
          }
          
          function HashMap(obj) {
            obj && extend(this, obj)
          }
          
          function createHashMap() {
            return new HashMap
          }
          
          var _ctx, BUILTIN_OBJECT = {
              "[object Function]": 1,
              "[object RegExp]": 1,
              "[object Date]": 1,
              "[object Error]": 1,
              "[object CanvasGradient]": 1,
              "[object CanvasPattern]": 1,
              "[object Image]": 1,
              "[object Canvas]": 1
            }, TYPED_ARRAY = {
              "[object Int8Array]": 1,
              "[object Uint8Array]": 1,
              "[object Uint8ClampedArray]": 1,
              "[object Int16Array]": 1,
              "[object Uint16Array]": 1,
              "[object Int32Array]": 1,
              "[object Uint32Array]": 1,
              "[object Float32Array]": 1,
              "[object Float64Array]": 1
            }, objToString = Object.prototype.toString, arrayProto = Array.prototype, nativeForEach = arrayProto.forEach,
            nativeFilter = arrayProto.filter, nativeSlice = arrayProto.slice, nativeMap = arrayProto.map,
            nativeReduce = arrayProto.reduce, primitiveKey = "__ec_primitive__", HASH_MAP_PREFIX = "_ec_",
            HASH_MAP_PREFIX_LENGTH = 4;
          HashMap.prototype = {
            constructor: HashMap, get: function (key) {
              return this[HASH_MAP_PREFIX + key]
            }, set: function (key, value) {
              return this[HASH_MAP_PREFIX + key] = value, value
            }, each: function (cb, context) {
              void 0 !== context && (cb = bind(cb, context));
              for (var prefixedKey in this)this.hasOwnProperty(prefixedKey) && cb(this[prefixedKey], prefixedKey.slice(HASH_MAP_PREFIX_LENGTH))
            }, removeKey: function (key) {
              delete this[key]
            }
          };
          var util = {
            inherits: inherits,
            mixin: mixin,
            clone: clone,
            merge: merge,
            mergeAll: mergeAll,
            extend: extend,
            defaults: defaults,
            getContext: getContext,
            createCanvas: createCanvas,
            indexOf: indexOf,
            slice: slice,
            find: find,
            isArrayLike: isArrayLike,
            each: each,
            map: map,
            reduce: reduce,
            filter: filter,
            bind: bind,
            curry: curry,
            isArray: isArray,
            isString: isString,
            isObject: isObject,
            isFunction: isFunction,
            isBuiltInObject: isBuiltInObject,
            isDom: isDom,
            eqNaN: eqNaN,
            retrieve: retrieve,
            assert: assert,
            setAsPrimitive: setAsPrimitive,
            createHashMap: createHashMap,
            noop: function () {
            }
          };
          return util
        }), define("echarts/chart/bar/BarSeries", ["require", "./BaseBarSeries"], function (require) {
          return require("./BaseBarSeries").extend({
            type: "series.bar",
            dependencies: ["grid", "polar"],
            brushSelector: "rect"
          })
        }), define("echarts/chart/bar/BarView", ["require", "zrender/core/util", "../../util/graphic", "./helper", "../../model/Model", "./barItemStyle", "../../echarts"], function (require) {
          function createRect(data, dataIndex, itemModel, layout, isHorizontal, animationModel, isUpdate) {
            var rect = new graphic.Rect({shape: zrUtil.extend({}, layout)});
            if (animationModel) {
              var rectShape = rect.shape, animateProperty = isHorizontal ? "height" : "width", animateTarget = {};
              rectShape[animateProperty] = 0, animateTarget[animateProperty] = layout[animateProperty], graphic[isUpdate ? "updateProps" : "initProps"](rect, {shape: animateTarget}, animationModel, dataIndex)
            }
            return rect
          }
          
          function removeRect(dataIndex, animationModel, el) {
            el.style.text = "", graphic.updateProps(el, {shape: {width: 0}}, animationModel, dataIndex, function () {
              el.parent && el.parent.remove(el)
            })
          }
          
          function getRectItemLayout(data, dataIndex, itemModel) {
            var layout = data.getItemLayout(dataIndex), fixedLineWidth = getLineWidth(itemModel, layout),
              signX = layout.width > 0 ? 1 : -1, signY = layout.height > 0 ? 1 : -1;
            return {
              x: layout.x + signX * fixedLineWidth / 2,
              y: layout.y + signY * fixedLineWidth / 2,
              width: layout.width - signX * fixedLineWidth,
              height: layout.height - signY * fixedLineWidth
            }
          }
          
          function updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontal) {
            var color = data.getItemVisual(dataIndex, "color"), opacity = data.getItemVisual(dataIndex, "opacity"),
              itemStyleModel = itemModel.getModel("itemStyle.normal"),
              hoverStyle = itemModel.getModel("itemStyle.emphasis").getBarItemStyle();
            el.setShape("r", itemStyleModel.get("barBorderRadius") || 0), el.useStyle(zrUtil.defaults({
              fill: color,
              opacity: opacity
            }, itemStyleModel.getBarItemStyle()));
            var labelPositionOutside = isHorizontal ? layout.height > 0 ? "bottom" : "top" : layout.width > 0 ? "left" : "right";
            helper.setLabel(el.style, hoverStyle, itemModel, color, seriesModel, dataIndex, labelPositionOutside), graphic.setHoverStyle(el, hoverStyle)
          }
          
          function getLineWidth(itemModel, rawLayout) {
            var lineWidth = itemModel.get(BAR_BORDER_WIDTH_QUERY) || 0;
            return Math.min(lineWidth, Math.abs(rawLayout.width), Math.abs(rawLayout.height))
          }
          
          var zrUtil = require("zrender/core/util"), graphic = require("../../util/graphic"),
            helper = require("./helper"), BAR_BORDER_WIDTH_QUERY = ["itemStyle", "normal", "barBorderWidth"];
          zrUtil.extend(require("../../model/Model").prototype, require("./barItemStyle"));
          var BarView = require("../../echarts").extendChartView({
            type: "bar",
            render: function (seriesModel, ecModel, api) {
              var coordinateSystemType = seriesModel.get("coordinateSystem");
              return "cartesian2d" === coordinateSystemType && this._renderOnCartesian(seriesModel, ecModel, api), this.group
            },
            dispose: zrUtil.noop,
            _renderOnCartesian: function (seriesModel, ecModel, api) {
              var group = this.group, data = seriesModel.getData(), oldData = this._data,
                cartesian = seriesModel.coordinateSystem, baseAxis = cartesian.getBaseAxis(),
                isHorizontal = baseAxis.isHorizontal(),
                animationModel = seriesModel.isAnimationEnabled() ? seriesModel : null;
              data.diff(oldData).add(function (dataIndex) {
                if (data.hasValue(dataIndex)) {
                  var itemModel = data.getItemModel(dataIndex), layout = getRectItemLayout(data, dataIndex, itemModel),
                    el = createRect(data, dataIndex, itemModel, layout, isHorizontal, animationModel);
                  data.setItemGraphicEl(dataIndex, el), group.add(el), updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontal)
                }
              }).update(function (newIndex, oldIndex) {
                var el = oldData.getItemGraphicEl(oldIndex);
                if (!data.hasValue(newIndex))return void group.remove(el);
                var itemModel = data.getItemModel(newIndex), layout = getRectItemLayout(data, newIndex, itemModel);
                el ? graphic.updateProps(el, {shape: layout}, animationModel, newIndex) : el = createRect(data, newIndex, itemModel, layout, isHorizontal, animationModel, !0), data.setItemGraphicEl(newIndex, el), group.add(el), updateStyle(el, data, newIndex, itemModel, layout, seriesModel, isHorizontal)
              }).remove(function (dataIndex) {
                var el = oldData.getItemGraphicEl(dataIndex);
                el && removeRect(dataIndex, animationModel, el)
              }).execute(), this._data = data
            },
            remove: function (ecModel, api) {
              var group = this.group, data = this._data;
              ecModel.get("animation") ? data && data.eachItemGraphicEl(function (el) {
                  removeRect(el.dataIndex, ecModel, el)
                }) : group.removeAll()
            }
          });
          return BarView
        }), define("echarts/coord/cartesian/Grid", ["require", "exports", "../../util/layout", "../../coord/axisHelper", "zrender/core/util", "./Cartesian2D", "./Axis2D", "./GridModel", "../../CoordinateSystem"], function (require, factory) {
          function isAxisUsedInTheGrid(axisModel, gridModel, ecModel) {
            return axisModel.getCoordSysModel() === gridModel
          }
          
          function getLabelUnionRect(axis) {
            var rect, axisModel = axis.model, labels = axisModel.getFormattedLabels(),
              textStyleModel = axisModel.getModel("axisLabel.textStyle"), step = 1, labelCount = labels.length;
            labelCount > 40 && (step = Math.ceil(labelCount / 40));
            for (var i = 0; i < labelCount; i += step)if (!axis.isLabelIgnored(i)) {
              var singleRect = textStyleModel.getTextRect(labels[i]);
              rect ? rect.union(singleRect) : rect = singleRect
            }
            return rect
          }
          
          function Grid(gridModel, ecModel, api) {
            this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(gridModel, ecModel, api), this.model = gridModel
          }
          
          function updateAxisTransfrom(axis, coordBase) {
            var axisExtent = axis.getExtent(), axisExtentSum = axisExtent[0] + axisExtent[1];
            axis.toGlobalCoord = "x" === axis.dim ? function (coord) {
              return coord + coordBase
            } : function (coord) {
              return axisExtentSum - coord + coordBase
            }, axis.toLocalCoord = "x" === axis.dim ? function (coord) {
              return coord - coordBase
            } : function (coord) {
              return axisExtentSum - coord + coordBase
            }
          }
          
          function findAxesModels(seriesModel, ecModel) {
            return zrUtil.map(axesTypes, function (axisType) {
              var axisModel = seriesModel.getReferringComponents(axisType)[0];
              if (!axisModel)throw new Error(axisType + ' "' + zrUtil.retrieve(seriesModel.get(axisType + "Index"), seriesModel.get(axisType + "Id"), 0) + '" not found');
              return axisModel
            })
          }
          
          function isCartesian2D(seriesModel) {
            return "cartesian2d" === seriesModel.get("coordinateSystem")
          }
          
          var layout = require("../../util/layout"), axisHelper = require("../../coord/axisHelper"),
            zrUtil = require("zrender/core/util"), Cartesian2D = require("./Cartesian2D"), Axis2D = require("./Axis2D"),
            each = zrUtil.each, ifAxisCrossZero = axisHelper.ifAxisCrossZero,
            niceScaleExtent = axisHelper.niceScaleExtent;
          require("./GridModel");
          var gridProto = Grid.prototype;
          gridProto.type = "grid", gridProto.axisPointerEnabled = !0, gridProto.getRect = function () {
            return this._rect
          }, gridProto.update = function (ecModel, api) {
            function ifAxisCanNotOnZero(otherAxisDim) {
              var axes = axesMap[otherAxisDim];
              for (var idx in axes)if (axes.hasOwnProperty(idx)) {
                var axis = axes[idx];
                if (axis && ("category" === axis.type || !ifAxisCrossZero(axis)))return !0
              }
              return !1
            }
            
            var axesMap = this._axesMap;
            this._updateScale(ecModel, this.model), each(axesMap.x, function (xAxis) {
              niceScaleExtent(xAxis.scale, xAxis.model)
            }), each(axesMap.y, function (yAxis) {
              niceScaleExtent(yAxis.scale, yAxis.model)
            }), each(axesMap.x, function (xAxis) {
              ifAxisCanNotOnZero("y") && (xAxis.onZero = !1)
            }), each(axesMap.y, function (yAxis) {
              ifAxisCanNotOnZero("x") && (yAxis.onZero = !1)
            }), this.resize(this.model, api)
          }, gridProto.resize = function (gridModel, api) {
            function adjustAxes() {
              each(axesList, function (axis) {
                var isHorizontal = axis.isHorizontal(),
                  extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height], idx = axis.inverse ? 1 : 0;
                axis.setExtent(extent[idx], extent[1 - idx]), updateAxisTransfrom(axis, isHorizontal ? gridRect.x : gridRect.y)
              })
            }
            
            var gridRect = layout.getLayoutRect(gridModel.getBoxLayoutParams(), {
              width: api.getWidth(),
              height: api.getHeight()
            });
            this._rect = gridRect;
            var axesList = this._axesList;
            adjustAxes(), gridModel.get("containLabel") && (each(axesList, function (axis) {
              if (!axis.model.get("axisLabel.inside")) {
                var labelUnionRect = getLabelUnionRect(axis);
                if (labelUnionRect) {
                  var dim = axis.isHorizontal() ? "height" : "width", margin = axis.model.get("axisLabel.margin");
                  gridRect[dim] -= labelUnionRect[dim] + margin, "top" === axis.position ? gridRect.y += labelUnionRect.height + margin : "left" === axis.position && (gridRect.x += labelUnionRect.width + margin)
                }
              }
            }), adjustAxes())
          }, gridProto.getAxis = function (axisType, axisIndex) {
            var axesMapOnDim = this._axesMap[axisType];
            if (null != axesMapOnDim) {
              if (null == axisIndex)for (var name in axesMapOnDim)if (axesMapOnDim.hasOwnProperty(name))return axesMapOnDim[name];
              return axesMapOnDim[axisIndex]
            }
          }, gridProto.getAxes = function () {
            return this._axesList.slice()
          }, gridProto.getCartesian = function (xAxisIndex, yAxisIndex) {
            if (null != xAxisIndex && null != yAxisIndex) {
              var key = "x" + xAxisIndex + "y" + yAxisIndex;
              return this._coordsMap[key]
            }
            zrUtil.isObject(xAxisIndex) && (yAxisIndex = xAxisIndex.yAxisIndex, xAxisIndex = xAxisIndex.xAxisIndex);
            for (var i = 0, coordList = this._coordsList; i < coordList.length; i++)if (coordList[i].getAxis("x").index === xAxisIndex || coordList[i].getAxis("y").index === yAxisIndex)return coordList[i]
          }, gridProto.getCartesians = function () {
            return this._coordsList.slice()
          }, gridProto.convertToPixel = function (ecModel, finder, value) {
            var target = this._findConvertTarget(ecModel, finder);
            return target.cartesian ? target.cartesian.dataToPoint(value) : target.axis ? target.axis.toGlobalCoord(target.axis.dataToCoord(value)) : null
          }, gridProto.convertFromPixel = function (ecModel, finder, value) {
            var target = this._findConvertTarget(ecModel, finder);
            return target.cartesian ? target.cartesian.pointToData(value) : target.axis ? target.axis.coordToData(target.axis.toLocalCoord(value)) : null
          }, gridProto._findConvertTarget = function (ecModel, finder) {
            var cartesian, axis, seriesModel = finder.seriesModel,
              xAxisModel = finder.xAxisModel || seriesModel && seriesModel.getReferringComponents("xAxis")[0],
              yAxisModel = finder.yAxisModel || seriesModel && seriesModel.getReferringComponents("yAxis")[0],
              gridModel = finder.gridModel, coordsList = this._coordsList;
            if (seriesModel) cartesian = seriesModel.coordinateSystem, zrUtil.indexOf(coordsList, cartesian) < 0 && (cartesian = null); else if (xAxisModel && yAxisModel) cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex); else if (xAxisModel) axis = this.getAxis("x", xAxisModel.componentIndex); else if (yAxisModel) axis = this.getAxis("y", yAxisModel.componentIndex); else if (gridModel) {
              var grid = gridModel.coordinateSystem;
              grid === this && (cartesian = this._coordsList[0])
            }
            return {cartesian: cartesian, axis: axis}
          }, gridProto.containPoint = function (point) {
            var coord = this._coordsList[0];
            if (coord)return coord.containPoint(point)
          }, gridProto._initCartesian = function (gridModel, ecModel, api) {
            function createAxisCreator(axisType) {
              return function (axisModel, idx) {
                if (isAxisUsedInTheGrid(axisModel, gridModel, ecModel)) {
                  var axisPosition = axisModel.get("position");
                  "x" === axisType ? "top" !== axisPosition && "bottom" !== axisPosition && (axisPosition = "bottom", axisPositionUsed[axisPosition] && (axisPosition = "top" === axisPosition ? "bottom" : "top")) : "left" !== axisPosition && "right" !== axisPosition && (axisPosition = "left", axisPositionUsed[axisPosition] && (axisPosition = "left" === axisPosition ? "right" : "left")), axisPositionUsed[axisPosition] = !0;
                  var axis = new Axis2D(axisType, axisHelper.createScaleByModel(axisModel), [0, 0], axisModel.get("type"), axisPosition),
                    isCategory = "category" === axis.type;
                  axis.onBand = isCategory && axisModel.get("boundaryGap"), axis.inverse = axisModel.get("inverse"), axis.onZero = axisModel.get("axisLine.onZero"), axisModel.axis = axis, axis.model = axisModel, axis.grid = this, axis.index = idx, this._axesList.push(axis), axesMap[axisType][idx] = axis, axesCount[axisType]++
                }
              }
            }
            
            var axisPositionUsed = {left: !1, right: !1, top: !1, bottom: !1}, axesMap = {x: {}, y: {}},
              axesCount = {x: 0, y: 0};
            return ecModel.eachComponent("xAxis", createAxisCreator("x"), this), ecModel.eachComponent("yAxis", createAxisCreator("y"), this), axesCount.x && axesCount.y ? (this._axesMap = axesMap, void each(axesMap.x, function (xAxis, xAxisIndex) {
              each(axesMap.y, function (yAxis, yAxisIndex) {
                var key = "x" + xAxisIndex + "y" + yAxisIndex, cartesian = new Cartesian2D(key);
                cartesian.grid = this, cartesian.model = gridModel, this._coordsMap[key] = cartesian, this._coordsList.push(cartesian), cartesian.addAxis(xAxis), cartesian.addAxis(yAxis)
              }, this)
            }, this)) : (this._axesMap = {}, void(this._axesList = []))
          }, gridProto._updateScale = function (ecModel, gridModel) {
            function unionExtent(data, axis, seriesModel) {
              each(seriesModel.coordDimToDataDim(axis.dim), function (dim) {
                axis.scale.unionExtentFromData(data, dim)
              })
            }
            
            zrUtil.each(this._axesList, function (axis) {
              axis.scale.setExtent(1 / 0, -(1 / 0))
            }), ecModel.eachSeries(function (seriesModel) {
              if (isCartesian2D(seriesModel)) {
                var axesModels = findAxesModels(seriesModel, ecModel), xAxisModel = axesModels[0],
                  yAxisModel = axesModels[1];
                if (!isAxisUsedInTheGrid(xAxisModel, gridModel, ecModel) || !isAxisUsedInTheGrid(yAxisModel, gridModel, ecModel))return;
                var cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex),
                  data = seriesModel.getData(), xAxis = cartesian.getAxis("x"), yAxis = cartesian.getAxis("y");
                "list" === data.type && (unionExtent(data, xAxis, seriesModel), unionExtent(data, yAxis, seriesModel))
              }
            }, this)
          }, gridProto.getTooltipAxes = function (dim) {
            var baseAxes = [], otherAxes = [];
            return each(this.getCartesians(), function (cartesian) {
              var baseAxis = null != dim && "auto" !== dim ? cartesian.getAxis(dim) : cartesian.getBaseAxis(),
                otherAxis = cartesian.getOtherAxis(baseAxis);
              zrUtil.indexOf(baseAxes, baseAxis) < 0 && baseAxes.push(baseAxis), zrUtil.indexOf(otherAxes, otherAxis) < 0 && otherAxes.push(otherAxis)
            }), {baseAxes: baseAxes, otherAxes: otherAxes}
          };
          var axesTypes = ["xAxis", "yAxis"];
          return Grid.create = function (ecModel, api) {
            var grids = [];
            return ecModel.eachComponent("grid", function (gridModel, idx) {
              var grid = new Grid(gridModel, ecModel, api);
              grid.name = "grid_" + idx, grid.resize(gridModel, api), gridModel.coordinateSystem = grid, grids.push(grid)
            }), ecModel.eachSeries(function (seriesModel) {
              if (isCartesian2D(seriesModel)) {
                var axesModels = findAxesModels(seriesModel, ecModel), xAxisModel = axesModels[0],
                  yAxisModel = axesModels[1], gridModel = xAxisModel.getCoordSysModel();
                if (!gridModel)throw new Error('Grid "' + zrUtil.retrieve(xAxisModel.get("gridIndex"), xAxisModel.get("gridId"), 0) + '" not found');
                if (xAxisModel.getCoordSysModel() !== yAxisModel.getCoordSysModel())throw new Error("xAxis and yAxis must use the same grid");
                var grid = gridModel.coordinateSystem;
                seriesModel.coordinateSystem = grid.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex)
              }
            }), grids
          }, Grid.dimensions = Grid.prototype.dimensions = Cartesian2D.prototype.dimensions, require("../../CoordinateSystem").register("cartesian2d", Grid), Grid
        }), define("echarts/layout/barGrid", ["require", "zrender/core/util", "../util/number"], function (require) {
          function getSeriesStackId(seriesModel) {
            return seriesModel.get("stack") || "__ec_stack_" + seriesModel.seriesIndex
          }
          
          function getAxisKey(axis) {
            return axis.dim + axis.index
          }
          
          function calBarWidthAndOffset(barSeries, api) {
            var columnsMap = {};
            zrUtil.each(barSeries, function (seriesModel, idx) {
              var data = seriesModel.getData(), cartesian = seriesModel.coordinateSystem,
                baseAxis = cartesian.getBaseAxis(), axisExtent = baseAxis.getExtent(),
                bandWidth = "category" === baseAxis.type ? baseAxis.getBandWidth() : Math.abs(axisExtent[1] - axisExtent[0]) / data.count(),
                columnsOnAxis = columnsMap[getAxisKey(baseAxis)] || {
                    bandWidth: bandWidth,
                    remainedWidth: bandWidth,
                    autoWidthCount: 0,
                    categoryGap: "20%",
                    gap: "30%",
                    stacks: {}
                  }, stacks = columnsOnAxis.stacks;
              columnsMap[getAxisKey(baseAxis)] = columnsOnAxis;
              var stackId = getSeriesStackId(seriesModel);
              stacks[stackId] || columnsOnAxis.autoWidthCount++, stacks[stackId] = stacks[stackId] || {
                  width: 0,
                  maxWidth: 0
                };
              var barWidth = parsePercent(seriesModel.get("barWidth"), bandWidth),
                barMaxWidth = parsePercent(seriesModel.get("barMaxWidth"), bandWidth),
                barGap = seriesModel.get("barGap"), barCategoryGap = seriesModel.get("barCategoryGap");
              barWidth && !stacks[stackId].width && (barWidth = Math.min(columnsOnAxis.remainedWidth, barWidth), stacks[stackId].width = barWidth, columnsOnAxis.remainedWidth -= barWidth), barMaxWidth && (stacks[stackId].maxWidth = barMaxWidth), null != barGap && (columnsOnAxis.gap = barGap), null != barCategoryGap && (columnsOnAxis.categoryGap = barCategoryGap)
            });
            var result = {};
            return zrUtil.each(columnsMap, function (columnsOnAxis, coordSysName) {
              result[coordSysName] = {};
              var stacks = columnsOnAxis.stacks, bandWidth = columnsOnAxis.bandWidth,
                categoryGap = parsePercent(columnsOnAxis.categoryGap, bandWidth),
                barGapPercent = parsePercent(columnsOnAxis.gap, 1), remainedWidth = columnsOnAxis.remainedWidth,
                autoWidthCount = columnsOnAxis.autoWidthCount,
                autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
              autoWidth = Math.max(autoWidth, 0), zrUtil.each(stacks, function (column, stack) {
                var maxWidth = column.maxWidth;
                maxWidth && maxWidth < autoWidth && (maxWidth = Math.min(maxWidth, remainedWidth), column.width && (maxWidth = Math.min(maxWidth, column.width)), remainedWidth -= maxWidth, column.width = maxWidth, autoWidthCount--)
              }), autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent), autoWidth = Math.max(autoWidth, 0);
              var lastColumn, widthSum = 0;
              zrUtil.each(stacks, function (column, idx) {
                column.width || (column.width = autoWidth), lastColumn = column, widthSum += column.width * (1 + barGapPercent)
              }), lastColumn && (widthSum -= lastColumn.width * barGapPercent);
              var offset = -widthSum / 2;
              zrUtil.each(stacks, function (column, stackId) {
                result[coordSysName][stackId] = result[coordSysName][stackId] || {
                    offset: offset,
                    width: column.width
                  }, offset += column.width * (1 + barGapPercent)
              })
            }), result
          }
          
          function barLayoutGrid(seriesType, ecModel, api) {
            var barWidthAndOffset = calBarWidthAndOffset(zrUtil.filter(ecModel.getSeriesByType(seriesType), function (seriesModel) {
              return !ecModel.isSeriesFiltered(seriesModel) && seriesModel.coordinateSystem && "cartesian2d" === seriesModel.coordinateSystem.type
            })), lastStackCoords = {}, lastStackCoordsOrigin = {};
            ecModel.eachSeriesByType(seriesType, function (seriesModel) {
              var data = seriesModel.getData(), cartesian = seriesModel.coordinateSystem,
                baseAxis = cartesian.getBaseAxis(), stackId = getSeriesStackId(seriesModel),
                columnLayoutInfo = barWidthAndOffset[getAxisKey(baseAxis)][stackId],
                columnOffset = columnLayoutInfo.offset, columnWidth = columnLayoutInfo.width,
                valueAxis = cartesian.getOtherAxis(baseAxis), barMinHeight = seriesModel.get("barMinHeight") || 0,
                valueAxisStart = baseAxis.onZero ? valueAxis.toGlobalCoord(valueAxis.dataToCoord(0)) : valueAxis.getGlobalExtent()[0],
                coords = cartesian.dataToPoints(data, !0);
              lastStackCoords[stackId] = lastStackCoords[stackId] || [], lastStackCoordsOrigin[stackId] = lastStackCoordsOrigin[stackId] || [], data.setLayout({
                offset: columnOffset,
                size: columnWidth
              }), data.each(valueAxis.dim, function (value, idx) {
                if (!isNaN(value)) {
                  lastStackCoords[stackId][idx] || (lastStackCoords[stackId][idx] = {
                    p: valueAxisStart,
                    n: valueAxisStart
                  }, lastStackCoordsOrigin[stackId][idx] = {p: valueAxisStart, n: valueAxisStart});
                  var x, y, width, height, sign = value >= 0 ? "p" : "n", coord = coords[idx],
                    lastCoord = lastStackCoords[stackId][idx][sign],
                    lastCoordOrigin = lastStackCoordsOrigin[stackId][idx][sign];
                  valueAxis.isHorizontal() ? (x = lastCoord, y = coord[1] + columnOffset, width = coord[0] - lastCoordOrigin, height = columnWidth, lastStackCoordsOrigin[stackId][idx][sign] += width, Math.abs(width) < barMinHeight && (width = (width < 0 ? -1 : 1) * barMinHeight), lastStackCoords[stackId][idx][sign] += width) : (x = coord[0] + columnOffset, y = lastCoord, width = columnWidth, height = coord[1] - lastCoordOrigin, lastStackCoordsOrigin[stackId][idx][sign] += height, Math.abs(height) < barMinHeight && (height = (height <= 0 ? -1 : 1) * barMinHeight), lastStackCoords[stackId][idx][sign] += height), data.setItemLayout(idx, {
                    x: x,
                    y: y,
                    width: width,
                    height: height
                  })
                }
              }, !0)
            }, this)
          }
          
          var zrUtil = require("zrender/core/util"), numberUtil = require("../util/number"),
            parsePercent = numberUtil.parsePercent;
          return barLayoutGrid
        }), define("echarts/chart/line/LineSeries", ["require", "../helper/createListFromArray", "../../model/Series"], function (require) {
          var createListFromArray = require("../helper/createListFromArray"),
            SeriesModel = require("../../model/Series");
          return SeriesModel.extend({
            type: "series.line",
            dependencies: ["grid", "polar"],
            getInitialData: function (option, ecModel) {
              var coordSys = option.coordinateSystem;
              if ("polar" !== coordSys && "cartesian2d" !== coordSys)throw new Error("Line not support coordinateSystem besides cartesian and polar");
              return createListFromArray(option.data, this, ecModel)
            },
            defaultOption: {
              zlevel: 0,
              z: 2,
              coordinateSystem: "cartesian2d",
              legendHoverLink: !0,
              hoverAnimation: !0,
              clipOverflow: !0,
              label: {normal: {position: "top"}},
              lineStyle: {normal: {width: 2, type: "solid"}},
              step: !1,
              smooth: !1,
              smoothMonotone: null,
              symbol: "emptyCircle",
              symbolSize: 4,
              symbolRotate: null,
              showSymbol: !0,
              showAllSymbol: !1,
              connectNulls: !1,
              sampling: "none",
              animationEasing: "linear",
              progressive: 0,
              hoverLayerThreshold: 1 / 0
            }
          })
        }), define("echarts/chart/line/LineView", ["require", "zrender/core/util", "../helper/SymbolDraw", "../helper/Symbol", "./lineAnimationDiff", "../../util/graphic", "../../util/model", "./poly", "../../view/Chart"], function (require) {
          function isPointsSame(points1, points2) {
            if (points1.length === points2.length) {
              for (var i = 0; i < points1.length; i++) {
                var p1 = points1[i], p2 = points2[i];
                if (p1[0] !== p2[0] || p1[1] !== p2[1])return
              }
              return !0
            }
          }
          
          function getSmooth(smooth) {
            return "number" == typeof smooth ? smooth : smooth ? .3 : 0
          }
          
          function getAxisExtentWithGap(axis) {
            var extent = axis.getGlobalExtent();
            if (axis.onBand) {
              var halfBandWidth = axis.getBandWidth() / 2 - 1, dir = extent[1] > extent[0] ? 1 : -1;
              extent[0] += dir * halfBandWidth, extent[1] -= dir * halfBandWidth
            }
            return extent
          }
          
          function sign(val) {
            return val >= 0 ? 1 : -1
          }
          
          function getStackedOnPoints(coordSys, data) {
            var baseAxis = coordSys.getBaseAxis(), valueAxis = coordSys.getOtherAxis(baseAxis),
              valueStart = baseAxis.onZero ? 0 : valueAxis.scale.getExtent()[0], valueDim = valueAxis.dim,
              baseDataOffset = "x" === valueDim || "radius" === valueDim ? 1 : 0;
            return data.mapArray([valueDim], function (val, idx) {
              for (var stackedOnSameSign, stackedOn = data.stackedOn; stackedOn && sign(stackedOn.get(valueDim, idx)) === sign(val);) {
                stackedOnSameSign = stackedOn;
                break
              }
              var stackedData = [];
              return stackedData[baseDataOffset] = data.get(baseAxis.dim, idx), stackedData[1 - baseDataOffset] = stackedOnSameSign ? stackedOnSameSign.get(valueDim, idx, !0) : valueStart, coordSys.dataToPoint(stackedData)
            }, !0)
          }
          
          function createGridClipShape(cartesian, hasAnimation, seriesModel) {
            var xExtent = getAxisExtentWithGap(cartesian.getAxis("x")),
              yExtent = getAxisExtentWithGap(cartesian.getAxis("y")),
              isHorizontal = cartesian.getBaseAxis().isHorizontal(), x = Math.min(xExtent[0], xExtent[1]),
              y = Math.min(yExtent[0], yExtent[1]), width = Math.max(xExtent[0], xExtent[1]) - x,
              height = Math.max(yExtent[0], yExtent[1]) - y, lineWidth = seriesModel.get("lineStyle.normal.width") || 2,
              expandSize = seriesModel.get("clipOverflow") ? lineWidth / 2 : Math.max(width, height);
            isHorizontal ? (y -= expandSize, height += 2 * expandSize) : (x -= expandSize, width += 2 * expandSize);
            var clipPath = new graphic.Rect({shape: {x: x, y: y, width: width, height: height}});
            return hasAnimation && (clipPath.shape[isHorizontal ? "width" : "height"] = 0, graphic.initProps(clipPath, {
              shape: {
                width: width,
                height: height
              }
            }, seriesModel)), clipPath
          }
          
          function createPolarClipShape(polar, hasAnimation, seriesModel) {
            var angleAxis = polar.getAngleAxis(), radiusAxis = polar.getRadiusAxis(),
              radiusExtent = radiusAxis.getExtent(), angleExtent = angleAxis.getExtent(), RADIAN = Math.PI / 180,
              clipPath = new graphic.Sector({
                shape: {
                  cx: polar.cx,
                  cy: polar.cy,
                  r0: radiusExtent[0],
                  r: radiusExtent[1],
                  startAngle: -angleExtent[0] * RADIAN,
                  endAngle: -angleExtent[1] * RADIAN,
                  clockwise: angleAxis.inverse
                }
              });
            return hasAnimation && (clipPath.shape.endAngle = -angleExtent[0] * RADIAN, graphic.initProps(clipPath, {shape: {endAngle: -angleExtent[1] * RADIAN}}, seriesModel)), clipPath
          }
          
          function createClipShape(coordSys, hasAnimation, seriesModel) {
            return "polar" === coordSys.type ? createPolarClipShape(coordSys, hasAnimation, seriesModel) : createGridClipShape(coordSys, hasAnimation, seriesModel)
          }
          
          function turnPointsIntoStep(points, coordSys, stepTurnAt) {
            for (var baseAxis = coordSys.getBaseAxis(), baseIndex = "x" === baseAxis.dim || "radius" === baseAxis.dim ? 0 : 1, stepPoints = [], i = 0; i < points.length - 1; i++) {
              var nextPt = points[i + 1], pt = points[i];
              stepPoints.push(pt);
              var stepPt = [];
              switch (stepTurnAt) {
                case"end":
                  stepPt[baseIndex] = nextPt[baseIndex], stepPt[1 - baseIndex] = pt[1 - baseIndex], stepPoints.push(stepPt);
                  break;
                case"middle":
                  var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2, stepPt2 = [];
                  stepPt[baseIndex] = stepPt2[baseIndex] = middle, stepPt[1 - baseIndex] = pt[1 - baseIndex], stepPt2[1 - baseIndex] = nextPt[1 - baseIndex], stepPoints.push(stepPt), stepPoints.push(stepPt2);
                  break;
                default:
                  stepPt[baseIndex] = pt[baseIndex], stepPt[1 - baseIndex] = nextPt[1 - baseIndex], stepPoints.push(stepPt)
              }
            }
            return points[i] && stepPoints.push(points[i]), stepPoints
          }
          
          function getVisualGradient(data, coordSys) {
            var visualMetaList = data.getVisual("visualMeta");
            if (visualMetaList && visualMetaList.length && data.count()) {
              for (var visualMeta, i = visualMetaList.length - 1; i >= 0; i--)if (visualMetaList[i].dimension < 2) {
                visualMeta = visualMetaList[i];
                break
              }
              if (visualMeta && "cartesian2d" === coordSys.type) {
                var dimension = visualMeta.dimension, dimName = data.dimensions[dimension],
                  axis = coordSys.getAxis(dimName), colorStops = zrUtil.map(visualMeta.stops, function (stop) {
                    return {coord: axis.toGlobalCoord(axis.dataToCoord(stop.value)), color: stop.color}
                  }), stopLen = colorStops.length, outerColors = visualMeta.outerColors.slice();
                stopLen && colorStops[0].coord > colorStops[stopLen - 1].coord && (colorStops.reverse(), outerColors.reverse());
                var tinyExtent = 10, minCoord = colorStops[0].coord - tinyExtent,
                  maxCoord = colorStops[stopLen - 1].coord + tinyExtent, coordSpan = maxCoord - minCoord;
                if (coordSpan < .001)return "transparent";
                zrUtil.each(colorStops, function (stop) {
                  stop.offset = (stop.coord - minCoord) / coordSpan
                }), colorStops.push({
                  offset: stopLen ? colorStops[stopLen - 1].offset : .5,
                  color: outerColors[1] || "transparent"
                }), colorStops.unshift({
                  offset: stopLen ? colorStops[0].offset : .5,
                  color: outerColors[0] || "transparent"
                });
                var gradient = new graphic.LinearGradient(0, 0, 0, 0, colorStops, !0);
                return gradient[dimName] = minCoord, gradient[dimName + "2"] = maxCoord, gradient
              }
            }
          }
          
          var zrUtil = require("zrender/core/util"), SymbolDraw = require("../helper/SymbolDraw"),
            _Symbol = require("../helper/Symbol"), lineAnimationDiff = require("./lineAnimationDiff"),
            graphic = require("../../util/graphic"), modelUtil = require("../../util/model"),
            polyHelper = require("./poly"), ChartView = require("../../view/Chart");
          return ChartView.extend({
            type: "line", init: function () {
              var lineGroup = new graphic.Group, symbolDraw = new SymbolDraw;
              this.group.add(symbolDraw.group), this._symbolDraw = symbolDraw, this._lineGroup = lineGroup
            }, render: function (seriesModel, ecModel, api) {
              var coordSys = seriesModel.coordinateSystem, group = this.group, data = seriesModel.getData(),
                lineStyleModel = seriesModel.getModel("lineStyle.normal"),
                areaStyleModel = seriesModel.getModel("areaStyle.normal"),
                points = data.mapArray(data.getItemLayout, !0), isCoordSysPolar = "polar" === coordSys.type,
                prevCoordSys = this._coordSys, symbolDraw = this._symbolDraw, polyline = this._polyline,
                polygon = this._polygon, lineGroup = this._lineGroup, hasAnimation = seriesModel.get("animation"),
                isAreaChart = !areaStyleModel.isEmpty(), stackedOnPoints = getStackedOnPoints(coordSys, data),
                showSymbol = seriesModel.get("showSymbol"),
                isSymbolIgnore = showSymbol && !isCoordSysPolar && !seriesModel.get("showAllSymbol") && this._getSymbolIgnoreFunc(data, coordSys),
                oldData = this._data;
              oldData && oldData.eachItemGraphicEl(function (el, idx) {
                el.__temp && (group.remove(el), oldData.setItemGraphicEl(idx, null))
              }), showSymbol || symbolDraw.remove(), group.add(lineGroup);
              var step = !isCoordSysPolar && seriesModel.get("step");
              polyline && prevCoordSys.type === coordSys.type && step === this._step ? (isAreaChart && !polygon ? polygon = this._newPolygon(points, stackedOnPoints, coordSys, hasAnimation) : polygon && !isAreaChart && (lineGroup.remove(polygon), polygon = this._polygon = null), lineGroup.setClipPath(createClipShape(coordSys, !1, seriesModel)), showSymbol && symbolDraw.updateData(data, isSymbolIgnore), data.eachItemGraphicEl(function (el) {
                el.stopAnimation(!0)
              }), isPointsSame(this._stackedOnPoints, stackedOnPoints) && isPointsSame(this._points, points) || (hasAnimation ? this._updateAnimation(data, stackedOnPoints, coordSys, api, step) : (step && (points = turnPointsIntoStep(points, coordSys, step), stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step)), polyline.setShape({points: points}), polygon && polygon.setShape({
                points: points,
                stackedOnPoints: stackedOnPoints
              })))) : (showSymbol && symbolDraw.updateData(data, isSymbolIgnore), step && (points = turnPointsIntoStep(points, coordSys, step), stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step)), polyline = this._newPolyline(points, coordSys, hasAnimation), isAreaChart && (polygon = this._newPolygon(points, stackedOnPoints, coordSys, hasAnimation)), lineGroup.setClipPath(createClipShape(coordSys, !0, seriesModel)));
              var visualColor = getVisualGradient(data, coordSys) || data.getVisual("color");
              polyline.useStyle(zrUtil.defaults(lineStyleModel.getLineStyle(), {
                fill: "none",
                stroke: visualColor,
                lineJoin: "bevel"
              }));
              var smooth = seriesModel.get("smooth");
              if (smooth = getSmooth(seriesModel.get("smooth")), polyline.setShape({
                  smooth: smooth,
                  smoothMonotone: seriesModel.get("smoothMonotone"),
                  connectNulls: seriesModel.get("connectNulls")
                }), polygon) {
                var stackedOn = data.stackedOn, stackedOnSmooth = 0;
                if (polygon.useStyle(zrUtil.defaults(areaStyleModel.getAreaStyle(), {
                    fill: visualColor,
                    opacity: .7,
                    lineJoin: "bevel"
                  })), stackedOn) {
                  var stackedOnSeries = stackedOn.hostModel;
                  stackedOnSmooth = getSmooth(stackedOnSeries.get("smooth"))
                }
                polygon.setShape({
                  smooth: smooth,
                  stackedOnSmooth: stackedOnSmooth,
                  smoothMonotone: seriesModel.get("smoothMonotone"),
                  connectNulls: seriesModel.get("connectNulls")
                })
              }
              this._data = data, this._coordSys = coordSys, this._stackedOnPoints = stackedOnPoints, this._points = points, this._step = step
            }, dispose: function () {
            }, highlight: function (seriesModel, ecModel, api, payload) {
              var data = seriesModel.getData(), dataIndex = modelUtil.queryDataIndex(data, payload);
              if (!(dataIndex instanceof Array) && null != dataIndex && dataIndex >= 0) {
                var symbol = data.getItemGraphicEl(dataIndex);
                if (!symbol) {
                  var pt = data.getItemLayout(dataIndex);
                  if (!pt)return;
                  symbol = new _Symbol(data, dataIndex), symbol.position = pt, symbol.setZ(seriesModel.get("zlevel"), seriesModel.get("z")), symbol.ignore = isNaN(pt[0]) || isNaN(pt[1]), symbol.__temp = !0, data.setItemGraphicEl(dataIndex, symbol), symbol.stopSymbolAnimation(!0), this.group.add(symbol)
                }
                symbol.highlight()
              } else ChartView.prototype.highlight.call(this, seriesModel, ecModel, api, payload)
            }, downplay: function (seriesModel, ecModel, api, payload) {
              var data = seriesModel.getData(), dataIndex = modelUtil.queryDataIndex(data, payload);
              if (null != dataIndex && dataIndex >= 0) {
                var symbol = data.getItemGraphicEl(dataIndex);
                symbol && (symbol.__temp ? (data.setItemGraphicEl(dataIndex, null), this.group.remove(symbol)) : symbol.downplay())
              } else ChartView.prototype.downplay.call(this, seriesModel, ecModel, api, payload)
            }, _newPolyline: function (points) {
              var polyline = this._polyline;
              return polyline && this._lineGroup.remove(polyline), polyline = new polyHelper.Polyline({
                shape: {points: points},
                silent: !0,
                z2: 10
              }), this._lineGroup.add(polyline), this._polyline = polyline, polyline
            }, _newPolygon: function (points, stackedOnPoints) {
              var polygon = this._polygon;
              return polygon && this._lineGroup.remove(polygon), polygon = new polyHelper.Polygon({
                shape: {
                  points: points,
                  stackedOnPoints: stackedOnPoints
                }, silent: !0
              }), this._lineGroup.add(polygon), this._polygon = polygon, polygon
            }, _getSymbolIgnoreFunc: function (data, coordSys) {
              var categoryAxis = coordSys.getAxesByScale("ordinal")[0];
              if (categoryAxis && categoryAxis.isLabelIgnored)return zrUtil.bind(categoryAxis.isLabelIgnored, categoryAxis)
            }, _updateAnimation: function (data, stackedOnPoints, coordSys, api, step) {
              var polyline = this._polyline, polygon = this._polygon, seriesModel = data.hostModel,
                diff = lineAnimationDiff(this._data, data, this._stackedOnPoints, stackedOnPoints, this._coordSys, coordSys),
                current = diff.current, stackedOnCurrent = diff.stackedOnCurrent, next = diff.next,
                stackedOnNext = diff.stackedOnNext;
              step && (current = turnPointsIntoStep(diff.current, coordSys, step), stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step), next = turnPointsIntoStep(diff.next, coordSys, step), stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step)), polyline.shape.__points = diff.current, polyline.shape.points = current, graphic.updateProps(polyline, {shape: {points: next}}, seriesModel), polygon && (polygon.setShape({
                points: current,
                stackedOnPoints: stackedOnCurrent
              }), graphic.updateProps(polygon, {shape: {points: next, stackedOnPoints: stackedOnNext}}, seriesModel));
              for (var updatedDataInfo = [], diffStatus = diff.status, i = 0; i < diffStatus.length; i++) {
                var cmd = diffStatus[i].cmd;
                if ("=" === cmd) {
                  var el = data.getItemGraphicEl(diffStatus[i].idx1);
                  el && updatedDataInfo.push({el: el, ptIdx: i})
                }
              }
              polyline.animators && polyline.animators.length && polyline.animators[0].during(function () {
                for (var i = 0; i < updatedDataInfo.length; i++) {
                  var el = updatedDataInfo[i].el;
                  el.attr("position", polyline.shape.__points[updatedDataInfo[i].ptIdx])
                }
              })
            }, remove: function (ecModel) {
              var group = this.group, oldData = this._data;
              this._lineGroup.removeAll(), this._symbolDraw.remove(!0), oldData && oldData.eachItemGraphicEl(function (el, idx) {
                el.__temp && (group.remove(el), oldData.setItemGraphicEl(idx, null))
              }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null
            }
          })
        }), define("echarts/visual/symbol", ["require"], function (require) {
          return function (seriesType, defaultSymbolType, legendSymbol, ecModel, api) {
            ecModel.eachRawSeriesByType(seriesType, function (seriesModel) {
              var data = seriesModel.getData(), symbolType = seriesModel.get("symbol") || defaultSymbolType,
                symbolSize = seriesModel.get("symbolSize");
              data.setVisual({
                legendSymbol: legendSymbol || symbolType,
                symbol: symbolType,
                symbolSize: symbolSize
              }), ecModel.isSeriesFiltered(seriesModel) || ("function" == typeof symbolSize && data.each(function (idx) {
                var rawValue = seriesModel.getRawValue(idx), params = seriesModel.getDataParams(idx);
                data.setItemVisual(idx, "symbolSize", symbolSize(rawValue, params))
              }), data.each(function (idx) {
                var itemModel = data.getItemModel(idx), itemSymbolType = itemModel.getShallow("symbol", !0),
                  itemSymbolSize = itemModel.getShallow("symbolSize", !0);
                null != itemSymbolType && data.setItemVisual(idx, "symbol", itemSymbolType), null != itemSymbolSize && data.setItemVisual(idx, "symbolSize", itemSymbolSize)
              }))
            })
          }
        }), define("echarts/chart/pie/PieSeries", ["require", "../../data/List", "zrender/core/util", "../../util/model", "../../data/helper/completeDimensions", "../../component/helper/selectableMixin", "../../echarts"], function (require) {
          var List = require("../../data/List"), zrUtil = require("zrender/core/util"),
            modelUtil = require("../../util/model"),
            completeDimensions = require("../../data/helper/completeDimensions"),
            dataSelectableMixin = require("../../component/helper/selectableMixin"),
            PieSeries = require("../../echarts").extendSeriesModel({
              type: "series.pie",
              init: function (option) {
                PieSeries.superApply(this, "init", arguments), this.legendDataProvider = function () {
                  return this.getRawData()
                }, this.updateSelectedMap(option.data), this._defaultLabelLine(option)
              },
              mergeOption: function (newOption) {
                PieSeries.superCall(this, "mergeOption", newOption), this.updateSelectedMap(this.option.data)
              },
              getInitialData: function (option, ecModel) {
                var dimensions = completeDimensions(["value"], option.data), list = new List(dimensions, this);
                return list.initData(option.data), list
              },
              getDataParams: function (dataIndex) {
                var data = this.getData(), params = PieSeries.superCall(this, "getDataParams", dataIndex),
                  sum = data.getSum("value");
                return params.percent = sum ? +(data.get("value", dataIndex) / sum * 100).toFixed(2) : 0, params.$vars.push("percent"), params
              },
              _defaultLabelLine: function (option) {
                modelUtil.defaultEmphasis(option.labelLine, ["show"]);
                var labelLineNormalOpt = option.labelLine.normal, labelLineEmphasisOpt = option.labelLine.emphasis;
                labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.normal.show, labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.label.emphasis.show
              },
              defaultOption: {
                zlevel: 0,
                z: 2,
                legendHoverLink: !0,
                hoverAnimation: !0,
                center: ["50%", "50%"],
                radius: [0, "75%"],
                clockwise: !0,
                startAngle: 90,
                minAngle: 0,
                selectedOffset: 10,
                avoidLabelOverlap: !0,
                stillShowZeroSum: !0,
                label: {normal: {rotate: !1, show: !0, position: "outer"}, emphasis: {}},
                labelLine: {
                  normal: {
                    show: !0,
                    length: 15,
                    length2: 15,
                    smooth: !1,
                    lineStyle: {width: 1, type: "solid"}
                  }
                },
                itemStyle: {normal: {borderWidth: 1}, emphasis: {}},
                animationType: "expansion",
                animationEasing: "cubicOut",
                data: []
              }
            });
          return zrUtil.mixin(PieSeries, dataSelectableMixin), PieSeries
        }), define("echarts/layout/points", ["require"], function (require) {
          return function (seriesType, ecModel) {
            ecModel.eachSeriesByType(seriesType, function (seriesModel) {
              var data = seriesModel.getData(), coordSys = seriesModel.coordinateSystem;
              if (coordSys) {
                var dims = coordSys.dimensions;
                1 === dims.length ? data.each(dims[0], function (x, idx) {
                  data.setItemLayout(idx, isNaN(x) ? [NaN, NaN] : coordSys.dataToPoint(x))
                }) : 2 === dims.length && data.each(dims, function (x, y, idx) {
                    data.setItemLayout(idx, isNaN(x) || isNaN(y) ? [NaN, NaN] : coordSys.dataToPoint([x, y]))
                  }, !0)
              }
            })
          }
        }), define("echarts/processor/dataSample", [], function () {
          var samplers = {
            average: function (frame) {
              for (var sum = 0, count = 0, i = 0; i < frame.length; i++)isNaN(frame[i]) || (sum += frame[i], count++);
              return 0 === count ? NaN : sum / count
            }, sum: function sum(frame) {
              for (var sum = 0, i = 0; i < frame.length; i++)sum += frame[i] || 0;
              return sum
            }, max: function max(frame) {
              for (var max = -(1 / 0), i = 0; i < frame.length; i++)frame[i] > max && (max = frame[i]);
              return max
            }, min: function min(frame) {
              for (var min = 1 / 0, i = 0; i < frame.length; i++)frame[i] < min && (min = frame[i]);
              return min
            }, nearest: function (frame) {
              return frame[0]
            }
          }, indexSampler = function (frame, value) {
            return Math.round(frame.length / 2)
          };
          return function (seriesType, ecModel, api) {
            ecModel.eachSeriesByType(seriesType, function (seriesModel) {
              var data = seriesModel.getData(), sampling = seriesModel.get("sampling"),
                coordSys = seriesModel.coordinateSystem;
              if ("cartesian2d" === coordSys.type && sampling) {
                var baseAxis = coordSys.getBaseAxis(), valueAxis = coordSys.getOtherAxis(baseAxis),
                  extent = baseAxis.getExtent(), size = extent[1] - extent[0], rate = Math.round(data.count() / size);
                if (rate > 1) {
                  var sampler;
                  "string" == typeof sampling ? sampler = samplers[sampling] : "function" == typeof sampling && (sampler = sampling), sampler && (data = data.downSample(valueAxis.dim, 1 / rate, sampler, indexSampler), seriesModel.setData(data))
                }
              }
            }, this)
          }
        }), define("echarts/chart/pie/PieView", ["require", "../../util/graphic", "zrender/core/util", "../../view/Chart"], function (require) {
          function updateDataSelected(uid, seriesModel, hasAnimation, api) {
            var data = seriesModel.getData(), dataIndex = this.dataIndex, name = data.getName(dataIndex),
              selectedOffset = seriesModel.get("selectedOffset");
            api.dispatchAction({
              type: "pieToggleSelect",
              from: uid,
              name: name,
              seriesId: seriesModel.id
            }), data.each(function (idx) {
              toggleItemSelected(data.getItemGraphicEl(idx), data.getItemLayout(idx), seriesModel.isSelected(data.getName(idx)), selectedOffset, hasAnimation)
            })
          }
          
          function toggleItemSelected(el, layout, isSelected, selectedOffset, hasAnimation) {
            var midAngle = (layout.startAngle + layout.endAngle) / 2, dx = Math.cos(midAngle), dy = Math.sin(midAngle),
              offset = isSelected ? selectedOffset : 0, position = [dx * offset, dy * offset];
            hasAnimation ? el.animate().when(200, {position: position}).start("bounceOut") : el.attr("position", position)
          }
          
          function PiePiece(data, idx) {
            function onEmphasis() {
              polyline.ignore = polyline.hoverIgnore, text.ignore = text.hoverIgnore
            }
            
            function onNormal() {
              polyline.ignore = polyline.normalIgnore, text.ignore = text.normalIgnore
            }
            
            graphic.Group.call(this);
            var sector = new graphic.Sector({z2: 2}), polyline = new graphic.Polyline, text = new graphic.Text;
            this.add(sector), this.add(polyline), this.add(text), this.updateData(data, idx, !0), this.on("emphasis", onEmphasis).on("normal", onNormal).on("mouseover", onEmphasis).on("mouseout", onNormal)
          }
          
          function getLabelStyle(data, idx, state, labelModel, labelPosition) {
            var textStyleModel = labelModel.getModel("textStyle"),
              isLabelInside = "inside" === labelPosition || "inner" === labelPosition;
            return {
              fill: textStyleModel.getTextColor() || (isLabelInside ? "#fff" : data.getItemVisual(idx, "color")),
              opacity: data.getItemVisual(idx, "opacity"),
              textFont: textStyleModel.getFont(),
              text: zrUtil.retrieve(data.hostModel.getFormattedLabel(idx, state), data.getName(idx))
            }
          }
          
          var graphic = require("../../util/graphic"), zrUtil = require("zrender/core/util"),
            piePieceProto = PiePiece.prototype;
          piePieceProto.updateData = function (data, idx, firstCreate) {
            function onEmphasis() {
              sector.stopAnimation(!0), sector.animateTo({shape: {r: layout.r + 10}}, 300, "elasticOut")
            }
            
            function onNormal() {
              sector.stopAnimation(!0), sector.animateTo({shape: {r: layout.r}}, 300, "elasticOut")
            }
            
            var sector = this.childAt(0), seriesModel = data.hostModel, itemModel = data.getItemModel(idx),
              layout = data.getItemLayout(idx), sectorShape = zrUtil.extend({}, layout);
            if (sectorShape.label = null, firstCreate) {
              sector.setShape(sectorShape);
              var animationType = seriesModel.getShallow("animationType");
              "scale" === animationType ? (sector.shape.r = layout.r0, graphic.initProps(sector, {shape: {r: layout.r}}, seriesModel, idx)) : (sector.shape.endAngle = layout.startAngle, graphic.updateProps(sector, {shape: {endAngle: layout.endAngle}}, seriesModel, idx))
            } else graphic.updateProps(sector, {shape: sectorShape}, seriesModel, idx);
            var itemStyleModel = itemModel.getModel("itemStyle"), visualColor = data.getItemVisual(idx, "color");
            sector.useStyle(zrUtil.defaults({
              lineJoin: "bevel",
              fill: visualColor
            }, itemStyleModel.getModel("normal").getItemStyle())), sector.hoverStyle = itemStyleModel.getModel("emphasis").getItemStyle(), toggleItemSelected(this, data.getItemLayout(idx), itemModel.get("selected"), seriesModel.get("selectedOffset"), seriesModel.get("animation")), sector.off("mouseover").off("mouseout").off("emphasis").off("normal"), itemModel.get("hoverAnimation") && seriesModel.isAnimationEnabled() && sector.on("mouseover", onEmphasis).on("mouseout", onNormal).on("emphasis", onEmphasis).on("normal", onNormal), this._updateLabel(data, idx), graphic.setHoverStyle(this)
          }, piePieceProto._updateLabel = function (data, idx) {
            var labelLine = this.childAt(1), labelText = this.childAt(2), seriesModel = data.hostModel,
              itemModel = data.getItemModel(idx), layout = data.getItemLayout(idx), labelLayout = layout.label,
              visualColor = data.getItemVisual(idx, "color");
            graphic.updateProps(labelLine, {shape: {points: labelLayout.linePoints || [[labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y]]}}, seriesModel, idx), graphic.updateProps(labelText, {
              style: {
                x: labelLayout.x,
                y: labelLayout.y
              }
            }, seriesModel, idx), labelText.attr({
              style: {
                textVerticalAlign: labelLayout.verticalAlign,
                textAlign: labelLayout.textAlign,
                textFont: labelLayout.font
              }, rotation: labelLayout.rotation, origin: [labelLayout.x, labelLayout.y], z2: 10
            });
            var labelModel = itemModel.getModel("label.normal"), labelHoverModel = itemModel.getModel("label.emphasis"),
              labelLineModel = itemModel.getModel("labelLine.normal"),
              labelLineHoverModel = itemModel.getModel("labelLine.emphasis"),
              labelPosition = labelModel.get("position") || labelHoverModel.get("position");
            labelText.setStyle(getLabelStyle(data, idx, "normal", labelModel, labelPosition)), labelText.ignore = labelText.normalIgnore = !labelModel.get("show"), labelText.hoverIgnore = !labelHoverModel.get("show"), labelLine.ignore = labelLine.normalIgnore = !labelLineModel.get("show"), labelLine.hoverIgnore = !labelLineHoverModel.get("show"), labelLine.setStyle({
              stroke: visualColor,
              opacity: data.getItemVisual(idx, "opacity")
            }), labelLine.setStyle(labelLineModel.getModel("lineStyle").getLineStyle()), labelText.hoverStyle = getLabelStyle(data, idx, "emphasis", labelHoverModel, labelPosition), labelLine.hoverStyle = labelLineHoverModel.getModel("lineStyle").getLineStyle();
            var smooth = labelLineModel.get("smooth");
            smooth && smooth === !0 && (smooth = .4), labelLine.setShape({smooth: smooth})
          }, zrUtil.inherits(PiePiece, graphic.Group);
          var Pie = require("../../view/Chart").extend({
            type: "pie", init: function () {
              var sectorGroup = new graphic.Group;
              this._sectorGroup = sectorGroup
            }, render: function (seriesModel, ecModel, api, payload) {
              if (!payload || payload.from !== this.uid) {
                var data = seriesModel.getData(), oldData = this._data, group = this.group,
                  hasAnimation = ecModel.get("animation"), isFirstRender = !oldData,
                  animationType = seriesModel.get("animationType"),
                  onSectorClick = zrUtil.curry(updateDataSelected, this.uid, seriesModel, hasAnimation, api),
                  selectedMode = seriesModel.get("selectedMode");
                if (data.diff(oldData).add(function (idx) {
                    var piePiece = new PiePiece(data, idx);
                    isFirstRender && "scale" !== animationType && piePiece.eachChild(function (child) {
                      child.stopAnimation(!0)
                    }), selectedMode && piePiece.on("click", onSectorClick), data.setItemGraphicEl(idx, piePiece), group.add(piePiece)
                  }).update(function (newIdx, oldIdx) {
                    var piePiece = oldData.getItemGraphicEl(oldIdx);
                    piePiece.updateData(data, newIdx), piePiece.off("click"), selectedMode && piePiece.on("click", onSectorClick), group.add(piePiece), data.setItemGraphicEl(newIdx, piePiece)
                  }).remove(function (idx) {
                    var piePiece = oldData.getItemGraphicEl(idx);
                    group.remove(piePiece)
                  }).execute(), hasAnimation && isFirstRender && data.count() > 0 && "scale" !== animationType) {
                  var shape = data.getItemLayout(0), r = Math.max(api.getWidth(), api.getHeight()) / 2,
                    removeClipPath = zrUtil.bind(group.removeClipPath, group);
                  group.setClipPath(this._createClipPath(shape.cx, shape.cy, r, shape.startAngle, shape.clockwise, removeClipPath, seriesModel))
                }
                this._data = data
              }
            }, dispose: function () {
            }, _createClipPath: function (cx, cy, r, startAngle, clockwise, cb, seriesModel) {
              var clipPath = new graphic.Sector({
                shape: {
                  cx: cx,
                  cy: cy,
                  r0: 0,
                  r: r,
                  startAngle: startAngle,
                  endAngle: startAngle,
                  clockwise: clockwise
                }
              });
              return graphic.initProps(clipPath, {shape: {endAngle: startAngle + (clockwise ? 1 : -1) * Math.PI * 2}}, seriesModel, cb), clipPath
            }, containPoint: function (point, seriesModel) {
              var data = seriesModel.getData(), itemLayout = data.getItemLayout(0);
              if (itemLayout) {
                var dx = point[0] - itemLayout.cx, dy = point[1] - itemLayout.cy, radius = Math.sqrt(dx * dx + dy * dy);
                return radius <= itemLayout.r && radius >= itemLayout.r0
              }
            }
          });
          return Pie
        }), define("echarts/action/createDataSelectAction", ["require", "../echarts", "zrender/core/util"], function (require) {
          var echarts = require("../echarts"), zrUtil = require("zrender/core/util");
          return function (seriesType, actionInfos) {
            zrUtil.each(actionInfos, function (actionInfo) {
              actionInfo.update = "updateView", echarts.registerAction(actionInfo, function (payload, ecModel) {
                var selected = {};
                return ecModel.eachComponent({
                  mainType: "series",
                  subType: seriesType,
                  query: payload
                }, function (seriesModel) {
                  seriesModel[actionInfo.method] && seriesModel[actionInfo.method](payload.name);
                  var data = seriesModel.getData();
                  data.each(function (idx) {
                    var name = data.getName(idx);
                    selected[name] = seriesModel.isSelected(name) || !1
                  })
                }), {name: payload.name, selected: selected}
              })
            })
          }
        }), define("echarts/visual/dataColor", ["require"], function (require) {
          return function (seriesType, ecModel) {
            var paletteScope = {};
            ecModel.eachRawSeriesByType(seriesType, function (seriesModel) {
              var dataAll = seriesModel.getRawData(), idxMap = {};
              if (!ecModel.isSeriesFiltered(seriesModel)) {
                var data = seriesModel.getData();
                data.each(function (idx) {
                  var rawIdx = data.getRawIndex(idx);
                  idxMap[rawIdx] = idx
                }), dataAll.each(function (rawIdx) {
                  var filteredIdx = idxMap[rawIdx],
                    singleDataColor = null != filteredIdx && data.getItemVisual(filteredIdx, "color", !0);
                  if (singleDataColor) dataAll.setItemVisual(rawIdx, "color", singleDataColor); else {
                    var itemModel = dataAll.getItemModel(rawIdx),
                      color = itemModel.get("itemStyle.normal.color") || seriesModel.getColorFromPalette(dataAll.getName(rawIdx), paletteScope);
                    dataAll.setItemVisual(rawIdx, "color", color), null != filteredIdx && data.setItemVisual(filteredIdx, "color", color)
                  }
                })
              }
            })
          }
        }), define("echarts/chart/pie/pieLayout", ["require", "../../util/number", "./labelLayout", "zrender/core/util"], function (require) {
          var numberUtil = require("../../util/number"), parsePercent = numberUtil.parsePercent,
            labelLayout = require("./labelLayout"), zrUtil = require("zrender/core/util"), PI2 = 2 * Math.PI,
            RADIAN = Math.PI / 180;
          return function (seriesType, ecModel, api, payload) {
            ecModel.eachSeriesByType(seriesType, function (seriesModel) {
              var center = seriesModel.get("center"), radius = seriesModel.get("radius");
              zrUtil.isArray(radius) || (radius = [0, radius]), zrUtil.isArray(center) || (center = [center, center]);
              var width = api.getWidth(), height = api.getHeight(), size = Math.min(width, height),
                cx = parsePercent(center[0], width), cy = parsePercent(center[1], height),
                r0 = parsePercent(radius[0], size / 2), r = parsePercent(radius[1], size / 2),
                data = seriesModel.getData(), startAngle = -seriesModel.get("startAngle") * RADIAN,
                minAngle = seriesModel.get("minAngle") * RADIAN, sum = data.getSum("value"),
                unitRadian = Math.PI / (sum || data.count()) * 2, clockwise = seriesModel.get("clockwise"),
                roseType = seriesModel.get("roseType"), stillShowZeroSum = seriesModel.get("stillShowZeroSum"),
                extent = data.getDataExtent("value");
              extent[0] = 0;
              var restAngle = PI2, valueSumLargerThanMinAngle = 0, currentAngle = startAngle, dir = clockwise ? 1 : -1;
              if (data.each("value", function (value, idx) {
                  var angle;
                  if (isNaN(value))return void data.setItemLayout(idx, {
                    angle: NaN,
                    startAngle: NaN,
                    endAngle: NaN,
                    clockwise: clockwise,
                    cx: cx,
                    cy: cy,
                    r0: r0,
                    r: roseType ? NaN : r
                  });
                  angle = "area" !== roseType ? 0 === sum && stillShowZeroSum ? unitRadian : value * unitRadian : PI2 / (data.count() || 1), angle < minAngle ? (angle = minAngle, restAngle -= minAngle) : valueSumLargerThanMinAngle += value;
                  var endAngle = currentAngle + dir * angle;
                  data.setItemLayout(idx, {
                    angle: angle,
                    startAngle: currentAngle,
                    endAngle: endAngle,
                    clockwise: clockwise,
                    cx: cx,
                    cy: cy,
                    r0: r0,
                    r: roseType ? numberUtil.linearMap(value, extent, [r0, r]) : r
                  }), currentAngle = endAngle
                }, !0), restAngle < PI2)if (restAngle <= .001) {
                var angle = PI2 / data.count();
                data.each(function (idx) {
                  var layout = data.getItemLayout(idx);
                  layout.startAngle = startAngle + dir * idx * angle, layout.endAngle = startAngle + dir * (idx + 1) * angle
                })
              } else unitRadian = restAngle / valueSumLargerThanMinAngle, currentAngle = startAngle, data.each("value", function (value, idx) {
                var layout = data.getItemLayout(idx), angle = layout.angle === minAngle ? minAngle : value * unitRadian;
                layout.startAngle = currentAngle, layout.endAngle = currentAngle + dir * angle, currentAngle += dir * angle
              });
              labelLayout(seriesModel, r, width, height)
            })
          }
        }), define("echarts/component/axis", ["require", "../coord/cartesian/AxisModel", "./axis/CartesianAxisView"], function (require) {
          require("../coord/cartesian/AxisModel"), require("./axis/CartesianAxisView")
        }), define("echarts/util/graphic", ["require", "zrender/core/util", "zrender/tool/path", "zrender/graphic/Path", "zrender/tool/color", "zrender/core/matrix", "zrender/core/vector", "zrender/mixin/Transformable", "zrender/core/BoundingRect", "zrender/container/Group", "zrender/graphic/Image", "zrender/graphic/Text", "zrender/graphic/shape/Circle", "zrender/graphic/shape/Sector", "zrender/graphic/shape/Ring", "zrender/graphic/shape/Polygon", "zrender/graphic/shape/Polyline", "zrender/graphic/shape/Rect", "zrender/graphic/shape/Line", "zrender/graphic/shape/BezierCurve", "zrender/graphic/shape/Arc", "zrender/graphic/CompoundPath", "zrender/graphic/LinearGradient", "zrender/graphic/RadialGradient"], function (require) {
          function hasFillOrStroke(fillOrStroke) {
            return null != fillOrStroke && "none" != fillOrStroke
          }
          
          function liftColor(color) {
            return "string" == typeof color ? colorTool.lift(color, -.1) : color
          }
          
          function cacheElementStl(el) {
            if (el.__hoverStlDirty) {
              var stroke = el.style.stroke, fill = el.style.fill, hoverStyle = el.__hoverStl;
              hoverStyle.fill = hoverStyle.fill || (hasFillOrStroke(fill) ? liftColor(fill) : null), hoverStyle.stroke = hoverStyle.stroke || (hasFillOrStroke(stroke) ? liftColor(stroke) : null);
              var normalStyle = {};
              for (var name in hoverStyle)hoverStyle.hasOwnProperty(name) && (normalStyle[name] = el.style[name]);
              el.__normalStl = normalStyle, el.__hoverStlDirty = !1
            }
          }
          
          function doSingleEnterHover(el) {
            el.__isHover || (cacheElementStl(el), el.useHoverLayer ? el.__zr && el.__zr.addHover(el, el.__hoverStl) : (el.setStyle(el.__hoverStl), el.z2 += 1), el.__isHover = !0)
          }
          
          function doSingleLeaveHover(el) {
            if (el.__isHover) {
              var normalStl = el.__normalStl;
              el.useHoverLayer ? el.__zr && el.__zr.removeHover(el) : (normalStl && el.setStyle(normalStl), el.z2 -= 1), el.__isHover = !1
            }
          }
          
          function doEnterHover(el) {
            "group" === el.type ? el.traverse(function (child) {
              "group" !== child.type && doSingleEnterHover(child)
            }) : doSingleEnterHover(el)
          }
          
          function doLeaveHover(el) {
            "group" === el.type ? el.traverse(function (child) {
              "group" !== child.type && doSingleLeaveHover(child)
            }) : doSingleLeaveHover(el)
          }
          
          function setElementHoverStl(el, hoverStl) {
            el.__hoverStl = el.hoverStyle || hoverStl || {}, el.__hoverStlDirty = !0, el.__isHover && cacheElementStl(el)
          }
          
          function onElementMouseOver(e) {
            this.__hoverSilentOnTouch && e.zrByTouch || !this.__isEmphasis && doEnterHover(this)
          }
          
          function onElementMouseOut(e) {
            this.__hoverSilentOnTouch && e.zrByTouch || !this.__isEmphasis && doLeaveHover(this)
          }
          
          function enterEmphasis() {
            this.__isEmphasis = !0, doEnterHover(this)
          }
          
          function leaveEmphasis() {
            this.__isEmphasis = !1, doLeaveHover(this)
          }
          
          function animateOrSetProps(isUpdate, el, props, animatableModel, dataIndex, cb) {
            "function" == typeof dataIndex && (cb = dataIndex, dataIndex = null);
            var animationEnabled = animatableModel && animatableModel.isAnimationEnabled();
            if (animationEnabled) {
              var postfix = isUpdate ? "Update" : "",
                duration = animatableModel.getShallow("animationDuration" + postfix),
                animationEasing = animatableModel.getShallow("animationEasing" + postfix),
                animationDelay = animatableModel.getShallow("animationDelay" + postfix);
              "function" == typeof animationDelay && (animationDelay = animationDelay(dataIndex, animatableModel.getAnimationDelayParams ? animatableModel.getAnimationDelayParams(el, dataIndex) : null)), "function" == typeof duration && (duration = duration(dataIndex)), duration > 0 ? el.animateTo(props, duration, animationDelay || 0, animationEasing, cb) : (el.stopAnimation(), el.attr(props), cb && cb())
            } else el.stopAnimation(), el.attr(props), cb && cb()
          }
          
          var zrUtil = require("zrender/core/util"), pathTool = require("zrender/tool/path"), round = Math.round,
            Path = require("zrender/graphic/Path"), colorTool = require("zrender/tool/color"),
            matrix = require("zrender/core/matrix"), vector = require("zrender/core/vector"),
            Transformable = require("zrender/mixin/Transformable"), BoundingRect = require("zrender/core/BoundingRect"),
            graphic = {};
          return graphic.Group = require("zrender/container/Group"), graphic.Image = require("zrender/graphic/Image"), graphic.Text = require("zrender/graphic/Text"), graphic.Circle = require("zrender/graphic/shape/Circle"), graphic.Sector = require("zrender/graphic/shape/Sector"), graphic.Ring = require("zrender/graphic/shape/Ring"), graphic.Polygon = require("zrender/graphic/shape/Polygon"), graphic.Polyline = require("zrender/graphic/shape/Polyline"), graphic.Rect = require("zrender/graphic/shape/Rect"), graphic.Line = require("zrender/graphic/shape/Line"), graphic.BezierCurve = require("zrender/graphic/shape/BezierCurve"), graphic.Arc = require("zrender/graphic/shape/Arc"), graphic.CompoundPath = require("zrender/graphic/CompoundPath"), graphic.LinearGradient = require("zrender/graphic/LinearGradient"), graphic.RadialGradient = require("zrender/graphic/RadialGradient"), graphic.BoundingRect = BoundingRect, graphic.extendShape = function (opts) {
            return Path.extend(opts)
          }, graphic.extendPath = function (pathData, opts) {
            return pathTool.extendFromString(pathData, opts)
          }, graphic.makePath = function (pathData, opts, rect, layout) {
            var path = pathTool.createFromString(pathData, opts), boundingRect = path.getBoundingRect();
            if (rect) {
              var aspect = boundingRect.width / boundingRect.height;
              if ("center" === layout) {
                var height, width = rect.height * aspect;
                width <= rect.width ? height = rect.height : (width = rect.width, height = width / aspect);
                var cx = rect.x + rect.width / 2, cy = rect.y + rect.height / 2;
                rect.x = cx - width / 2, rect.y = cy - height / 2, rect.width = width, rect.height = height
              }
              graphic.resizePath(path, rect)
            }
            return path
          }, graphic.mergePath = pathTool.mergePath, graphic.resizePath = function (path, rect) {
            if (path.applyTransform) {
              var pathRect = path.getBoundingRect(), m = pathRect.calculateTransform(rect);
              path.applyTransform(m)
            }
          }, graphic.subPixelOptimizeLine = function (param) {
            var subPixelOptimize = graphic.subPixelOptimize, shape = param.shape, lineWidth = param.style.lineWidth;
            return round(2 * shape.x1) === round(2 * shape.x2) && (shape.x1 = shape.x2 = subPixelOptimize(shape.x1, lineWidth, !0)), round(2 * shape.y1) === round(2 * shape.y2) && (shape.y1 = shape.y2 = subPixelOptimize(shape.y1, lineWidth, !0)), param
          }, graphic.subPixelOptimizeRect = function (param) {
            var subPixelOptimize = graphic.subPixelOptimize, shape = param.shape, lineWidth = param.style.lineWidth,
              originX = shape.x, originY = shape.y, originWidth = shape.width, originHeight = shape.height;
            return shape.x = subPixelOptimize(shape.x, lineWidth, !0), shape.y = subPixelOptimize(shape.y, lineWidth, !0), shape.width = Math.max(subPixelOptimize(originX + originWidth, lineWidth, !1) - shape.x, 0 === originWidth ? 0 : 1), shape.height = Math.max(subPixelOptimize(originY + originHeight, lineWidth, !1) - shape.y, 0 === originHeight ? 0 : 1), param
          }, graphic.subPixelOptimize = function (position, lineWidth, positiveOrNegative) {
            var doubledPosition = round(2 * position);
            return (doubledPosition + round(lineWidth)) % 2 === 0 ? doubledPosition / 2 : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2
          }, graphic.setHoverStyle = function (el, hoverStyle, opt) {
            el.__hoverSilentOnTouch = opt && opt.hoverSilentOnTouch, "group" === el.type ? el.traverse(function (child) {
              "group" !== child.type && setElementHoverStl(child, hoverStyle)
            }) : setElementHoverStl(el, hoverStyle), el.on("mouseover", onElementMouseOver).on("mouseout", onElementMouseOut), el.on("emphasis", enterEmphasis).on("normal", leaveEmphasis)
          }, graphic.setText = function (textStyle, labelModel, color) {
            var labelPosition = labelModel.getShallow("position") || "inside",
              labelOffset = labelModel.getShallow("offset"),
              labelColor = labelPosition.indexOf("inside") >= 0 ? "white" : color,
              textStyleModel = labelModel.getModel("textStyle");
            zrUtil.extend(textStyle, {
              textDistance: labelModel.getShallow("distance") || 5,
              textFont: textStyleModel.getFont(),
              textPosition: labelPosition,
              textOffset: labelOffset,
              textFill: textStyleModel.getTextColor() || labelColor
            })
          }, graphic.updateProps = function (el, props, animatableModel, dataIndex, cb) {
            animateOrSetProps(!0, el, props, animatableModel, dataIndex, cb)
          }, graphic.initProps = function (el, props, animatableModel, dataIndex, cb) {
            animateOrSetProps(!1, el, props, animatableModel, dataIndex, cb)
          }, graphic.getTransform = function (target, ancestor) {
            for (var mat = matrix.identity([]); target && target !== ancestor;)matrix.mul(mat, target.getLocalTransform(), mat), target = target.parent;
            return mat
          }, graphic.applyTransform = function (target, transform, invert) {
            return transform && !zrUtil.isArrayLike(transform) && (transform = Transformable.getLocalTransform(transform)), invert && (transform = matrix.invert([], transform)), vector.applyTransform([], target, transform)
          }, graphic.transformDirection = function (direction, transform, invert) {
            var hBase = 0 === transform[4] || 0 === transform[5] || 0 === transform[0] ? 1 : Math.abs(2 * transform[4] / transform[0]),
              vBase = 0 === transform[4] || 0 === transform[5] || 0 === transform[2] ? 1 : Math.abs(2 * transform[4] / transform[2]),
              vertex = ["left" === direction ? -hBase : "right" === direction ? hBase : 0, "top" === direction ? -vBase : "bottom" === direction ? vBase : 0];
            return vertex = graphic.applyTransform(vertex, transform, invert), Math.abs(vertex[0]) > Math.abs(vertex[1]) ? vertex[0] > 0 ? "right" : "left" : vertex[1] > 0 ? "bottom" : "top"
          }, graphic.groupTransition = function (g1, g2, animatableModel, cb) {
            function getElMap(g) {
              var elMap = {};
              return g.traverse(function (el) {
                !el.isGroup && el.anid && (elMap[el.anid] = el)
              }), elMap
            }
            
            function getAnimatableProps(el) {
              var obj = {position: vector.clone(el.position), rotation: el.rotation};
              return el.shape && (obj.shape = zrUtil.extend({}, el.shape)), obj
            }
            
            if (g1 && g2) {
              var elMap1 = getElMap(g1);
              g2.traverse(function (el) {
                if (!el.isGroup && el.anid) {
                  var oldEl = elMap1[el.anid];
                  if (oldEl) {
                    var newProp = getAnimatableProps(el);
                    el.attr(getAnimatableProps(oldEl)), graphic.updateProps(el, newProp, animatableModel, el.dataIndex)
                  }
                }
              })
            }
          }, graphic
        }), define("echarts/processor/dataFilter", [], function () {
          return function (seriesType, ecModel) {
            var legendModels = ecModel.findComponents({mainType: "legend"});
            legendModels && legendModels.length && ecModel.eachSeriesByType(seriesType, function (series) {
              var data = series.getData();
              data.filterSelf(function (idx) {
                for (var name = data.getName(idx), i = 0; i < legendModels.length; i++)if (!legendModels[i].isSelected(name))return !1;
                return !0
              }, this)
            }, this)
          }
        }), define("zrender/core/env", [], function () {
          function detect(ua) {
            var os = {}, browser = {}, firefox = ua.match(/Firefox\/([\d.]+)/),
              ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/.+?rv:(([\d.]+))/),
              edge = ua.match(/Edge\/([\d.]+)/), weChat = /micromessenger/i.test(ua);
            return firefox && (browser.firefox = !0, browser.version = firefox[1]), ie && (browser.ie = !0, browser.version = ie[1]), edge && (browser.edge = !0, browser.version = edge[1]), weChat && (browser.weChat = !0), {
              browser: browser,
              os: os,
              node: !1,
              canvasSupported: !!document.createElement("canvas").getContext,
              touchEventsSupported: "ontouchstart" in window && !browser.ie && !browser.edge,
              pointerEventsSupported: "onpointerdown" in window && (browser.edge || browser.ie && browser.version >= 11)
            }
          }
          
          var env = {};
          return env = "undefined" == typeof navigator ? {
            browser: {},
            os: {},
            node: !0,
            canvasSupported: !0
          } : detect(navigator.userAgent)
        }), define("echarts/model/Global", ["require", "zrender/core/util", "../util/model", "./Model", "./Component", "./globalDefault", "./mixin/colorPalette"], function (require) {
          function mergeTheme(option, theme) {
            zrUtil.each(theme, function (themeItem, name) {
              ComponentModel.hasClass(name) || ("object" === ("undefined" == typeof themeItem ? "undefined" : _typeof(themeItem)) ? option[name] = option[name] ? zrUtil.merge(option[name], themeItem, !1) : zrUtil.clone(themeItem) : null == option[name] && (option[name] = themeItem))
            })
          }
          
          function initBase(baseOption) {
            baseOption = baseOption, this.option = {}, this.option[OPTION_INNER_KEY] = 1, this._componentsMap = {series: []}, this._seriesIndices = null, mergeTheme(baseOption, this._theme.option), zrUtil.merge(baseOption, globalDefault, !1), this.mergeOption(baseOption)
          }
          
          function getComponentsByTypes(componentsMap, types) {
            zrUtil.isArray(types) || (types = types ? [types] : []);
            var ret = {};
            return each(types, function (type) {
              ret[type] = (componentsMap[type] || []).slice()
            }), ret
          }
          
          function determineSubType(mainType, newCptOption, existComponent) {
            var subType = newCptOption.type ? newCptOption.type : existComponent ? existComponent.subType : ComponentModel.determineSubType(mainType, newCptOption);
            return subType
          }
          
          function createSeriesIndices(seriesModels) {
            return map(seriesModels, function (series) {
                return series.componentIndex
              }) || []
          }
          
          function filterBySubType(components, condition) {
            return condition.hasOwnProperty("subType") ? filter(components, function (cpt) {
              return cpt.subType === condition.subType
            }) : components
          }
          
          function assertSeriesInitialized(ecModel) {
            if (!ecModel._seriesIndices)throw new Error("Series has not been initialized yet.")
          }
          
          var zrUtil = require("zrender/core/util"), modelUtil = require("../util/model"), Model = require("./Model"),
            each = zrUtil.each, filter = zrUtil.filter, map = zrUtil.map, isArray = zrUtil.isArray,
            indexOf = zrUtil.indexOf, isObject = zrUtil.isObject, ComponentModel = require("./Component"),
            globalDefault = require("./globalDefault"), OPTION_INNER_KEY = "\0_ec_inner", GlobalModel = Model.extend({
              constructor: GlobalModel,
              init: function (option, parentModel, theme, optionManager) {
                theme = theme || {}, this.option = null, this._theme = new Model(theme), this._optionManager = optionManager
              },
              setOption: function (option, optionPreprocessorFuncs, onlyGraphic) {
                zrUtil.assert(!(OPTION_INNER_KEY in option), "please use chart.getOption()"), this._optionManager.setOption(option, optionPreprocessorFuncs), this.resetOption(null, onlyGraphic)
              },
              resetOption: function (type, onlyGraphic) {
                var optionChanged = !1, optionManager = this._optionManager;
                if (!type || "recreate" === type) {
                  var baseOption = optionManager.mountOption("recreate" === type);
                  this.option && "recreate" !== type ? (!onlyGraphic && this.restoreData(), this.mergeOption(baseOption)) : initBase.call(this, baseOption), optionChanged = !0
                }
                if ("timeline" !== type && "media" !== type || this.restoreData(), !type || "recreate" === type || "timeline" === type) {
                  var timelineOption = optionManager.getTimelineOption(this);
                  timelineOption && (this.mergeOption(timelineOption), optionChanged = !0)
                }
                if (!type || "recreate" === type || "media" === type) {
                  var mediaOptions = optionManager.getMediaOption(this, this._api);
                  mediaOptions.length && each(mediaOptions, function (mediaOption) {
                    this.mergeOption(mediaOption, optionChanged = !0)
                  }, this)
                }
                return optionChanged
              },
              mergeOption: function (newOption) {
                function visitComponent(mainType, dependencies) {
                  var newCptOptionList = modelUtil.normalizeToArray(newOption[mainType]),
                    mapResult = modelUtil.mappingToExists(componentsMap[mainType], newCptOptionList);
                  modelUtil.makeIdAndName(mapResult), each(mapResult, function (item, index) {
                    var opt = item.option;
                    isObject(opt) && (item.keyInfo.mainType = mainType, item.keyInfo.subType = determineSubType(mainType, opt, item.exist))
                  });
                  var dependentModels = getComponentsByTypes(componentsMap, dependencies);
                  option[mainType] = [], componentsMap[mainType] = [], each(mapResult, function (resultItem, index) {
                    var componentModel = resultItem.exist, newCptOption = resultItem.option;
                    if (zrUtil.assert(isObject(newCptOption) || componentModel, "Empty component definition"), newCptOption) {
                      var ComponentModelClass = ComponentModel.getClass(mainType, resultItem.keyInfo.subType, !0);
                      if (componentModel && componentModel instanceof ComponentModelClass) componentModel.name = resultItem.keyInfo.name, componentModel.mergeOption(newCptOption, this), componentModel.optionUpdated(newCptOption, !1); else {
                        var extraOpt = zrUtil.extend({
                          dependentModels: dependentModels,
                          componentIndex: index
                        }, resultItem.keyInfo);
                        componentModel = new ComponentModelClass(newCptOption, this, this, extraOpt), zrUtil.extend(componentModel, extraOpt), componentModel.init(newCptOption, this, this, extraOpt), componentModel.optionUpdated(null, !0)
                      }
                    } else componentModel.mergeOption({}, this), componentModel.optionUpdated({}, !1);
                    componentsMap[mainType][index] = componentModel, option[mainType][index] = componentModel.option
                  }, this), "series" === mainType && (this._seriesIndices = createSeriesIndices(componentsMap.series))
                }
                
                var option = this.option, componentsMap = this._componentsMap, newCptTypes = [];
                each(newOption, function (componentOption, mainType) {
                  null != componentOption && (ComponentModel.hasClass(mainType) ? newCptTypes.push(mainType) : option[mainType] = null == option[mainType] ? zrUtil.clone(componentOption) : zrUtil.merge(option[mainType], componentOption, !0))
                }), ComponentModel.topologicalTravel(newCptTypes, ComponentModel.getAllClassMainTypes(), visitComponent, this), this._seriesIndices = this._seriesIndices || []
              },
              getOption: function () {
                var option = zrUtil.clone(this.option);
                return each(option, function (opts, mainType) {
                  if (ComponentModel.hasClass(mainType)) {
                    for (var opts = modelUtil.normalizeToArray(opts), i = opts.length - 1; i >= 0; i--)modelUtil.isIdInner(opts[i]) && opts.splice(i, 1);
                    option[mainType] = opts
                  }
                }), delete option[OPTION_INNER_KEY], option
              },
              getTheme: function () {
                return this._theme
              },
              getComponent: function (mainType, idx) {
                var list = this._componentsMap[mainType];
                if (list)return list[idx || 0]
              },
              queryComponents: function (condition) {
                var mainType = condition.mainType;
                if (!mainType)return [];
                var index = condition.index, id = condition.id, name = condition.name,
                  cpts = this._componentsMap[mainType];
                if (!cpts || !cpts.length)return [];
                var result;
                if (null != index) isArray(index) || (index = [index]), result = filter(map(index, function (idx) {
                  return cpts[idx]
                }), function (val) {
                  return !!val
                }); else if (null != id) {
                  var isIdArray = isArray(id);
                  result = filter(cpts, function (cpt) {
                    return isIdArray && indexOf(id, cpt.id) >= 0 || !isIdArray && cpt.id === id
                  })
                } else if (null != name) {
                  var isNameArray = isArray(name);
                  result = filter(cpts, function (cpt) {
                    return isNameArray && indexOf(name, cpt.name) >= 0 || !isNameArray && cpt.name === name
                  })
                } else result = cpts.slice();
                return filterBySubType(result, condition)
              },
              findComponents: function (condition) {
                function getQueryCond(q) {
                  var indexAttr = mainType + "Index", idAttr = mainType + "Id", nameAttr = mainType + "Name";
                  return !q || null == q[indexAttr] && null == q[idAttr] && null == q[nameAttr] ? null : {
                    mainType: mainType,
                    index: q[indexAttr],
                    id: q[idAttr],
                    name: q[nameAttr]
                  }
                }
                
                function doFilter(res) {
                  return condition.filter ? filter(res, condition.filter) : res
                }
                
                var query = condition.query, mainType = condition.mainType, queryCond = getQueryCond(query),
                  result = queryCond ? this.queryComponents(queryCond) : this._componentsMap[mainType];
                return doFilter(filterBySubType(result, condition))
              },
              eachComponent: function (mainType, cb, context) {
                var componentsMap = this._componentsMap;
                if ("function" == typeof mainType) context = cb, cb = mainType, each(componentsMap, function (components, componentType) {
                  each(components, function (component, index) {
                    cb.call(context, componentType, component, index)
                  })
                }); else if (zrUtil.isString(mainType)) each(componentsMap[mainType], cb, context); else if (isObject(mainType)) {
                  var queryResult = this.findComponents(mainType);
                  each(queryResult, cb, context)
                }
              },
              getSeriesByName: function (name) {
                var series = this._componentsMap.series;
                return filter(series, function (oneSeries) {
                  return oneSeries.name === name
                })
              },
              getSeriesByIndex: function (seriesIndex) {
                return this._componentsMap.series[seriesIndex]
              },
              getSeriesByType: function (subType) {
                var series = this._componentsMap.series;
                return filter(series, function (oneSeries) {
                  return oneSeries.subType === subType
                })
              },
              getSeries: function () {
                return this._componentsMap.series.slice()
              },
              eachSeries: function (cb, context) {
                assertSeriesInitialized(this), each(this._seriesIndices, function (rawSeriesIndex) {
                  var series = this._componentsMap.series[rawSeriesIndex];
                  cb.call(context, series, rawSeriesIndex)
                }, this)
              },
              eachRawSeries: function (cb, context) {
                each(this._componentsMap.series, cb, context)
              },
              eachSeriesByType: function (subType, cb, context) {
                assertSeriesInitialized(this), each(this._seriesIndices, function (rawSeriesIndex) {
                  var series = this._componentsMap.series[rawSeriesIndex];
                  series.subType === subType && cb.call(context, series, rawSeriesIndex)
                }, this)
              },
              eachRawSeriesByType: function (subType, cb, context) {
                return each(this.getSeriesByType(subType), cb, context)
              },
              isSeriesFiltered: function (seriesModel) {
                return assertSeriesInitialized(this), zrUtil.indexOf(this._seriesIndices, seriesModel.componentIndex) < 0
              },
              filterSeries: function (cb, context) {
                assertSeriesInitialized(this);
                var filteredSeries = filter(this._componentsMap.series, cb, context);
                this._seriesIndices = createSeriesIndices(filteredSeries)
              },
              restoreData: function () {
                var componentsMap = this._componentsMap;
                this._seriesIndices = createSeriesIndices(componentsMap.series);
                var componentTypes = [];
                each(componentsMap, function (components, componentType) {
                  componentTypes.push(componentType)
                }), ComponentModel.topologicalTravel(componentTypes, ComponentModel.getAllClassMainTypes(), function (componentType, dependencies) {
                  each(componentsMap[componentType], function (component) {
                    component.restoreData()
                  })
                })
              }
            });
          return zrUtil.mixin(GlobalModel, require("./mixin/colorPalette")), GlobalModel
        }), define("echarts/ExtensionAPI", ["require", "zrender/core/util"], function (require) {
          function ExtensionAPI(chartInstance) {
            zrUtil.each(echartsAPIList, function (name) {
              this[name] = zrUtil.bind(chartInstance[name], chartInstance)
            }, this)
          }
          
          var zrUtil = require("zrender/core/util"),
            echartsAPIList = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"];
          return ExtensionAPI
        }), define("echarts/CoordinateSystem", ["require", "zrender/core/util"], function (require) {
          function CoordinateSystemManager() {
            this._coordinateSystems = []
          }
          
          var zrUtil = require("zrender/core/util"), coordinateSystemCreators = {};
          return CoordinateSystemManager.prototype = {
            constructor: CoordinateSystemManager,
            create: function (ecModel, api) {
              var coordinateSystems = [];
              zrUtil.each(coordinateSystemCreators, function (creater, type) {
                var list = creater.create(ecModel, api);
                coordinateSystems = coordinateSystems.concat(list || [])
              }), this._coordinateSystems = coordinateSystems
            },
            update: function (ecModel, api) {
              zrUtil.each(this._coordinateSystems, function (coordSys) {
                coordSys.update && coordSys.update(ecModel, api)
              })
            },
            getCoordinateSystems: function () {
              return this._coordinateSystems.slice()
            }
          }, CoordinateSystemManager.register = function (type, coordinateSystemCreator) {
            coordinateSystemCreators[type] = coordinateSystemCreator
          }, CoordinateSystemManager.get = function (type) {
            return coordinateSystemCreators[type]
          }, CoordinateSystemManager
        }), define("echarts/model/Component", ["require", "./Model", "zrender/core/util", "../util/component", "../util/clazz", "../util/layout", "./mixin/boxLayout"], function (require) {
          function getDependencies(componentType) {
            var deps = [];
            return zrUtil.each(ComponentModel.getClassesByMainType(componentType), function (Clazz) {
              arrayPush.apply(deps, Clazz.prototype.dependencies || [])
            }), zrUtil.map(deps, function (type) {
              return clazzUtil.parseClassType(type).main
            })
          }
          
          var Model = require("./Model"), zrUtil = require("zrender/core/util"), arrayPush = Array.prototype.push,
            componentUtil = require("../util/component"), clazzUtil = require("../util/clazz"),
            layout = require("../util/layout"), ComponentModel = Model.extend({
              type: "component",
              id: "",
              name: "",
              mainType: "",
              subType: "",
              componentIndex: 0,
              defaultOption: null,
              ecModel: null,
              dependentModels: [],
              uid: null,
              layoutMode: null,
              $constructor: function (option, parentModel, ecModel, extraOpt) {
                Model.call(this, option, parentModel, ecModel, extraOpt), this.uid = componentUtil.getUID("componentModel")
              },
              init: function (option, parentModel, ecModel, extraOpt) {
                this.mergeDefaultAndTheme(option, ecModel)
              },
              mergeDefaultAndTheme: function (option, ecModel) {
                var layoutMode = this.layoutMode, inputPositionParams = layoutMode ? layout.getLayoutParams(option) : {},
                  themeModel = ecModel.getTheme();
                zrUtil.merge(option, themeModel.get(this.mainType)), zrUtil.merge(option, this.getDefaultOption()), layoutMode && layout.mergeLayoutParam(option, inputPositionParams, layoutMode)
              },
              mergeOption: function (option, extraOpt) {
                zrUtil.merge(this.option, option, !0);
                var layoutMode = this.layoutMode;
                layoutMode && layout.mergeLayoutParam(this.option, option, layoutMode)
              },
              optionUpdated: function (newCptOption, isInit) {
              },
              getDefaultOption: function () {
                if (!clazzUtil.hasOwn(this, "__defaultOption")) {
                  for (var optList = [], Class = this.constructor; Class;) {
                    var opt = Class.prototype.defaultOption;
                    opt && optList.push(opt), Class = Class.superClass
                  }
                  for (var defaultOption = {}, i = optList.length - 1; i >= 0; i--)defaultOption = zrUtil.merge(defaultOption, optList[i], !0);
                  clazzUtil.set(this, "__defaultOption", defaultOption)
                }
                return clazzUtil.get(this, "__defaultOption")
              },
              getReferringComponents: function (mainType) {
                return this.ecModel.queryComponents({
                  mainType: mainType,
                  index: this.get(mainType + "Index", !0),
                  id: this.get(mainType + "Id", !0)
                })
              }
            });
          return clazzUtil.enableClassManagement(ComponentModel, {registerWhenExtend: !0}), componentUtil.enableSubTypeDefaulter(ComponentModel), componentUtil.enableTopologicalTravel(ComponentModel, getDependencies), zrUtil.mixin(ComponentModel, require("./mixin/boxLayout")), ComponentModel
        }), define("echarts/model/OptionManager", ["require", "zrender/core/util", "../util/model", "./Component"], function (require) {
          function OptionManager(api) {
            this._api = api, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption
          }
          
          function parseRawOption(rawOption, optionPreprocessorFuncs, isNew) {
            var mediaDefault, baseOption, timelineOptions = [], mediaList = [], timelineOpt = rawOption.timeline;
            if (rawOption.baseOption && (baseOption = rawOption.baseOption), (timelineOpt || rawOption.options) && (baseOption = baseOption || {}, timelineOptions = (rawOption.options || []).slice()), rawOption.media) {
              baseOption = baseOption || {};
              var media = rawOption.media;
              each(media, function (singleMedia) {
                singleMedia && singleMedia.option && (singleMedia.query ? mediaList.push(singleMedia) : mediaDefault || (mediaDefault = singleMedia))
              })
            }
            return baseOption || (baseOption = rawOption), baseOption.timeline || (baseOption.timeline = timelineOpt), each([baseOption].concat(timelineOptions).concat(zrUtil.map(mediaList, function (media) {
              return media.option
            })), function (option) {
              each(optionPreprocessorFuncs, function (preProcess) {
                preProcess(option, isNew)
              })
            }), {
              baseOption: baseOption,
              timelineOptions: timelineOptions,
              mediaDefault: mediaDefault,
              mediaList: mediaList
            }
          }
          
          function applyMediaQuery(query, ecWidth, ecHeight) {
            var realMap = {width: ecWidth, height: ecHeight, aspectratio: ecWidth / ecHeight}, applicatable = !0;
            return zrUtil.each(query, function (value, attr) {
              var matched = attr.match(QUERY_REG);
              if (matched && matched[1] && matched[2]) {
                var operator = matched[1], realAttr = matched[2].toLowerCase();
                compare(realMap[realAttr], value, operator) || (applicatable = !1)
              }
            }), applicatable
          }
          
          function compare(real, expect, operator) {
            return "min" === operator ? real >= expect : "max" === operator ? real <= expect : real === expect
          }
          
          function indicesEquals(indices1, indices2) {
            return indices1.join(",") === indices2.join(",")
          }
          
          function mergeOption(oldOption, newOption) {
            newOption = newOption || {}, each(newOption, function (newCptOpt, mainType) {
              if (null != newCptOpt) {
                var oldCptOpt = oldOption[mainType];
                if (ComponentModel.hasClass(mainType)) {
                  newCptOpt = modelUtil.normalizeToArray(newCptOpt), oldCptOpt = modelUtil.normalizeToArray(oldCptOpt);
                  var mapResult = modelUtil.mappingToExists(oldCptOpt, newCptOpt);
                  oldOption[mainType] = map(mapResult, function (item) {
                    return item.option && item.exist ? merge(item.exist, item.option, !0) : item.exist || item.option
                  })
                } else oldOption[mainType] = merge(oldCptOpt, newCptOpt, !0)
              }
            })
          }
          
          var zrUtil = require("zrender/core/util"), modelUtil = require("../util/model"),
            ComponentModel = require("./Component"), each = zrUtil.each, clone = zrUtil.clone, map = zrUtil.map,
            merge = zrUtil.merge, QUERY_REG = /^(min|max)?(.+)$/;
          return OptionManager.prototype = {
            constructor: OptionManager,
            setOption: function (rawOption, optionPreprocessorFuncs) {
              rawOption = clone(rawOption, !0);
              var oldOptionBackup = this._optionBackup,
                newParsedOption = parseRawOption.call(this, rawOption, optionPreprocessorFuncs, !oldOptionBackup);
              this._newBaseOption = newParsedOption.baseOption, oldOptionBackup ? (mergeOption(oldOptionBackup.baseOption, newParsedOption.baseOption), newParsedOption.timelineOptions.length && (oldOptionBackup.timelineOptions = newParsedOption.timelineOptions), newParsedOption.mediaList.length && (oldOptionBackup.mediaList = newParsedOption.mediaList), newParsedOption.mediaDefault && (oldOptionBackup.mediaDefault = newParsedOption.mediaDefault)) : this._optionBackup = newParsedOption
            },
            mountOption: function (isRecreate) {
              var optionBackup = this._optionBackup;
              return this._timelineOptions = map(optionBackup.timelineOptions, clone), this._mediaList = map(optionBackup.mediaList, clone), this._mediaDefault = clone(optionBackup.mediaDefault), this._currentMediaIndices = [], clone(isRecreate ? optionBackup.baseOption : this._newBaseOption)
            },
            getTimelineOption: function (ecModel) {
              var option, timelineOptions = this._timelineOptions;
              if (timelineOptions.length) {
                var timelineModel = ecModel.getComponent("timeline");
                timelineModel && (option = clone(timelineOptions[timelineModel.getCurrentIndex()], !0))
              }
              return option
            },
            getMediaOption: function (ecModel) {
              var ecWidth = this._api.getWidth(), ecHeight = this._api.getHeight(), mediaList = this._mediaList,
                mediaDefault = this._mediaDefault, indices = [], result = [];
              if (!mediaList.length && !mediaDefault)return result;
              for (var i = 0, len = mediaList.length; i < len; i++)applyMediaQuery(mediaList[i].query, ecWidth, ecHeight) && indices.push(i);
              return !indices.length && mediaDefault && (indices = [-1]), indices.length && !indicesEquals(indices, this._currentMediaIndices) && (result = map(indices, function (index) {
                return clone(index === -1 ? mediaDefault.option : mediaList[index].option)
              })), this._currentMediaIndices = indices, result
            }
          }, OptionManager
        }), define("echarts/model/Series", ["require", "zrender/core/util", "../util/format", "../util/clazz", "../util/model", "./Component", "./mixin/colorPalette", "zrender/core/env", "../util/layout"], function (require) {
          var zrUtil = require("zrender/core/util"), formatUtil = require("../util/format"),
            classUtil = require("../util/clazz"), modelUtil = require("../util/model"),
            ComponentModel = require("./Component"), colorPaletteMixin = require("./mixin/colorPalette"),
            env = require("zrender/core/env"), layout = require("../util/layout"), set = classUtil.set,
            get = classUtil.get, encodeHTML = formatUtil.encodeHTML, addCommas = formatUtil.addCommas,
            SeriesModel = ComponentModel.extend({
              type: "series.__base__",
              seriesIndex: 0,
              coordinateSystem: null,
              defaultOption: null,
              legendDataProvider: null,
              visualColorAccessPath: "itemStyle.normal.color",
              layoutMode: null,
              init: function (option, parentModel, ecModel, extraOpt) {
                this.seriesIndex = this.componentIndex, this.mergeDefaultAndTheme(option, ecModel);
                var data = this.getInitialData(option, ecModel);
                zrUtil.assert(data, "getInitialData returned invalid data."), set(this, "dataBeforeProcessed", data), this.restoreData()
              },
              mergeDefaultAndTheme: function (option, ecModel) {
                var layoutMode = this.layoutMode,
                  inputPositionParams = layoutMode ? layout.getLayoutParams(option) : {};
                zrUtil.merge(option, ecModel.getTheme().get(this.subType)), zrUtil.merge(option, this.getDefaultOption()), modelUtil.defaultEmphasis(option.label, modelUtil.LABEL_OPTIONS), this.fillDataTextStyle(option.data), layoutMode && layout.mergeLayoutParam(option, inputPositionParams, layoutMode)
              },
              mergeOption: function (newSeriesOption, ecModel) {
                newSeriesOption = zrUtil.merge(this.option, newSeriesOption, !0), this.fillDataTextStyle(newSeriesOption.data);
                var layoutMode = this.layoutMode;
                layoutMode && layout.mergeLayoutParam(this.option, newSeriesOption, layoutMode);
                var data = this.getInitialData(newSeriesOption, ecModel);
                data && (set(this, "data", data), set(this, "dataBeforeProcessed", data.cloneShallow()))
              },
              fillDataTextStyle: function (data) {
                if (data)for (var i = 0; i < data.length; i++)data[i] && data[i].label && modelUtil.defaultEmphasis(data[i].label, modelUtil.LABEL_OPTIONS)
              },
              getInitialData: function () {
              },
              getData: function (dataType) {
                var data = get(this, "data");
                return null == dataType ? data : data.getLinkedData(dataType)
              },
              setData: function (data) {
                set(this, "data", data)
              },
              getRawData: function () {
                return get(this, "dataBeforeProcessed")
              },
              coordDimToDataDim: function (coordDim) {
                return [coordDim]
              },
              dataDimToCoordDim: function (dataDim) {
                return dataDim
              },
              getBaseAxis: function () {
                var coordSys = this.coordinateSystem;
                return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis()
              },
              formatTooltip: function (dataIndex, multipleSeries, dataType) {
                function formatArrayValue(value) {
                  var result = [];
                  return zrUtil.each(value, function (val, idx) {
                    var valStr, dimInfo = data.getDimensionInfo(idx), dimType = dimInfo && dimInfo.type;
                    valStr = "ordinal" === dimType ? val + "" : "time" === dimType ? multipleSeries ? "" : formatUtil.formatTime("yyyy/MM/dd hh:mm:ss", val) : addCommas(val), valStr && result.push(valStr)
                  }), result.join(", ")
                }
                
                var data = get(this, "data"), value = this.getRawValue(dataIndex),
                  formattedValue = encodeHTML(zrUtil.isArray(value) ? formatArrayValue(value) : addCommas(value)),
                  name = data.getName(dataIndex), color = data.getItemVisual(dataIndex, "color");
                zrUtil.isObject(color) && color.colorStops && (color = (color.colorStops[0] || {}).color), color = color || "transparent";
                var colorEl = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + encodeHTML(color) + '"></span>',
                  seriesName = this.name;
                return "\0-" === seriesName && (seriesName = ""), multipleSeries ? colorEl + encodeHTML(this.name) + " : " + formattedValue : (seriesName && encodeHTML(seriesName) + "<br />") + colorEl + (name ? encodeHTML(name) + " : " + formattedValue : formattedValue)
              },
              isAnimationEnabled: function () {
                if (env.node)return !1;
                var animationEnabled = this.getShallow("animation");
                return animationEnabled && this.getData().count() > this.getShallow("animationThreshold") && (animationEnabled = !1), animationEnabled
              },
              restoreData: function () {
                set(this, "data", get(this, "dataBeforeProcessed").cloneShallow())
              },
              getColorFromPalette: function (name, scope) {
                var ecModel = this.ecModel, color = colorPaletteMixin.getColorFromPalette.call(this, name, scope);
                return color || (color = ecModel.getColorFromPalette(name, scope)), color
              },
              getAxisTooltipData: null,
              getTooltipPosition: null
            });
          return zrUtil.mixin(SeriesModel, modelUtil.dataFormatMixin), zrUtil.mixin(SeriesModel, colorPaletteMixin), SeriesModel
        }), define("echarts/view/Component", ["require", "zrender/container/Group", "../util/component", "../util/clazz"], function (require) {
          var Group = require("zrender/container/Group"), componentUtil = require("../util/component"),
            clazzUtil = require("../util/clazz"), Component = function () {
              this.group = new Group, this.uid = componentUtil.getUID("viewComponent")
            };
          Component.prototype = {
            constructor: Component, init: function (ecModel, api) {
            }, render: function (componentModel, ecModel, api, payload) {
            }, dispose: function () {
            }
          };
          var componentProto = Component.prototype;
          return componentProto.updateView = componentProto.updateLayout = componentProto.updateVisual = function (seriesModel, ecModel, api, payload) {
          }, clazzUtil.enableClassExtend(Component), clazzUtil.enableClassManagement(Component, {registerWhenExtend: !0}), Component
        }), define("echarts/view/Chart", ["require", "zrender/container/Group", "../util/component", "../util/clazz", "../util/model", "zrender/core/util"], function (require) {
          function Chart() {
            this.group = new Group, this.uid = componentUtil.getUID("viewChart")
          }
          
          function elSetState(el, state) {
            if (el && (el.trigger(state), "group" === el.type))for (var i = 0; i < el.childCount(); i++)elSetState(el.childAt(i), state)
          }
          
          function toggleHighlight(data, payload, state) {
            var dataIndex = modelUtil.queryDataIndex(data, payload);
            null != dataIndex ? zrUtil.each(modelUtil.normalizeToArray(dataIndex), function (dataIdx) {
              elSetState(data.getItemGraphicEl(dataIdx), state)
            }) : data.eachItemGraphicEl(function (el) {
              elSetState(el, state)
            })
          }
          
          var Group = require("zrender/container/Group"), componentUtil = require("../util/component"),
            clazzUtil = require("../util/clazz"), modelUtil = require("../util/model"),
            zrUtil = require("zrender/core/util");
          Chart.prototype = {
            type: "chart", init: function (ecModel, api) {
            }, render: function (seriesModel, ecModel, api, payload) {
            }, highlight: function (seriesModel, ecModel, api, payload) {
              toggleHighlight(seriesModel.getData(), payload, "emphasis")
            }, downplay: function (seriesModel, ecModel, api, payload) {
              toggleHighlight(seriesModel.getData(), payload, "normal")
            }, remove: function (ecModel, api) {
              this.group.removeAll()
            }, dispose: function () {
            }
          };
          var chartProto = Chart.prototype;
          return chartProto.updateView = chartProto.updateLayout = chartProto.updateVisual = function (seriesModel, ecModel, api, payload) {
            this.render(seriesModel, ecModel, api, payload)
          }, clazzUtil.enableClassExtend(Chart, ["dispose"]), clazzUtil.enableClassManagement(Chart, {registerWhenExtend: !0}), Chart
        }), define("echarts/util/model", ["require", "./format", "./number", "../model/Model", "zrender/core/util"], function (require) {
          function has(obj, prop) {
            return obj && obj.hasOwnProperty(prop)
          }
          
          var formatUtil = require("./format"), nubmerUtil = require("./number"), Model = require("../model/Model"),
            zrUtil = require("zrender/core/util"), each = zrUtil.each, isObject = zrUtil.isObject, modelUtil = {};
          return modelUtil.normalizeToArray = function (value) {
            return value instanceof Array ? value : null == value ? [] : [value]
          }, modelUtil.defaultEmphasis = function (opt, subOpts) {
            if (opt) {
              var emphasisOpt = opt.emphasis = opt.emphasis || {}, normalOpt = opt.normal = opt.normal || {};
              each(subOpts, function (subOptName) {
                var val = zrUtil.retrieve(emphasisOpt[subOptName], normalOpt[subOptName]);
                null != val && (emphasisOpt[subOptName] = val)
              })
            }
          }, modelUtil.LABEL_OPTIONS = ["position", "offset", "show", "textStyle", "distance", "formatter"], modelUtil.getDataItemValue = function (dataItem) {
            return dataItem && (null == dataItem.value ? dataItem : dataItem.value)
          }, modelUtil.isDataItemOption = function (dataItem) {
            return isObject(dataItem) && !(dataItem instanceof Array)
          }, modelUtil.converDataValue = function (value, dimInfo) {
            var dimType = dimInfo && dimInfo.type;
            return "ordinal" === dimType ? value : ("time" === dimType && "number" != typeof value && null != value && "-" !== value && (value = +nubmerUtil.parseDate(value)), null == value || "" === value ? NaN : +value)
          }, modelUtil.createDataFormatModel = function (data, opt) {
            var model = new Model;
            return zrUtil.mixin(model, modelUtil.dataFormatMixin), model.seriesIndex = opt.seriesIndex, model.name = opt.name || "", model.mainType = opt.mainType, model.subType = opt.subType, model.getData = function () {
              return data
            }, model
          }, modelUtil.dataFormatMixin = {
            getDataParams: function (dataIndex, dataType) {
              var data = this.getData(dataType), rawValue = this.getRawValue(dataIndex, dataType),
                rawDataIndex = data.getRawIndex(dataIndex), name = data.getName(dataIndex, !0),
                itemOpt = data.getRawDataItem(dataIndex);
              return {
                componentType: this.mainType,
                componentSubType: this.subType,
                seriesType: "series" === this.mainType ? this.subType : null,
                seriesIndex: this.seriesIndex,
                seriesId: this.id,
                seriesName: this.name,
                name: name,
                dataIndex: rawDataIndex,
                data: itemOpt,
                dataType: dataType,
                value: rawValue,
                color: data.getItemVisual(dataIndex, "color"),
                $vars: ["seriesName", "name", "value"]
              }
            }, getFormattedLabel: function (dataIndex, status, dataType, dimIndex) {
              status = status || "normal";
              var data = this.getData(dataType), itemModel = data.getItemModel(dataIndex),
                params = this.getDataParams(dataIndex, dataType);
              null != dimIndex && params.value instanceof Array && (params.value = params.value[dimIndex]);
              var formatter = itemModel.get(["label", status, "formatter"]);
              return "function" == typeof formatter ? (params.status = status, formatter(params)) : "string" == typeof formatter ? formatUtil.formatTpl(formatter, params) : void 0
            }, getRawValue: function (idx, dataType) {
              var data = this.getData(dataType), dataItem = data.getRawDataItem(idx);
              if (null != dataItem)return !isObject(dataItem) || dataItem instanceof Array ? dataItem : dataItem.value
            }, formatTooltip: zrUtil.noop
          }, modelUtil.mappingToExists = function (exists, newCptOptions) {
            newCptOptions = (newCptOptions || []).slice();
            var result = zrUtil.map(exists || [], function (obj, index) {
              return {exist: obj}
            });
            return each(newCptOptions, function (cptOption, index) {
              if (isObject(cptOption)) {
                for (var i = 0; i < result.length; i++)if (!result[i].option && null != cptOption.id && result[i].exist.id === cptOption.id + "")return result[i].option = cptOption, void(newCptOptions[index] = null);
                for (var i = 0; i < result.length; i++) {
                  var exist = result[i].exist;
                  if (!(result[i].option || null != exist.id && null != cptOption.id || null == cptOption.name || modelUtil.isIdInner(cptOption) || modelUtil.isIdInner(exist) || exist.name !== cptOption.name + ""))return result[i].option = cptOption, void(newCptOptions[index] = null)
                }
              }
            }), each(newCptOptions, function (cptOption, index) {
              if (isObject(cptOption)) {
                for (var i = 0; i < result.length; i++) {
                  var exist = result[i].exist;
                  if (!result[i].option && !modelUtil.isIdInner(exist) && null == cptOption.id) {
                    result[i].option = cptOption;
                    break
                  }
                }
                i >= result.length && result.push({option: cptOption})
              }
            }), result
          }, modelUtil.makeIdAndName = function (mapResult) {
            var idMap = {};
            each(mapResult, function (item, index) {
              var existCpt = item.exist;
              existCpt && (idMap[existCpt.id] = item)
            }), each(mapResult, function (item, index) {
              var opt = item.option;
              zrUtil.assert(!opt || null == opt.id || !idMap[opt.id] || idMap[opt.id] === item, "id duplicates: " + (opt && opt.id)), opt && null != opt.id && (idMap[opt.id] = item), !item.keyInfo && (item.keyInfo = {})
            }), each(mapResult, function (item, index) {
              var existCpt = item.exist, opt = item.option, keyInfo = item.keyInfo;
              if (isObject(opt)) {
                if (keyInfo.name = null != opt.name ? opt.name + "" : existCpt ? existCpt.name : "\0-", existCpt) keyInfo.id = existCpt.id; else if (null != opt.id) keyInfo.id = opt.id + ""; else {
                  var idNum = 0;
                  do keyInfo.id = "\0" + keyInfo.name + "\0" + idNum++; while (idMap[keyInfo.id])
                }
                idMap[keyInfo.id] = item
              }
            })
          }, modelUtil.isIdInner = function (cptOption) {
            return isObject(cptOption) && cptOption.id && 0 === (cptOption.id + "").indexOf("\0_ec_\0")
          }, modelUtil.compressBatches = function (batchA, batchB) {
            function makeMap(sourceBatch, map, otherMap) {
              for (var i = 0, len = sourceBatch.length; i < len; i++)for (var seriesId = sourceBatch[i].seriesId, dataIndices = modelUtil.normalizeToArray(sourceBatch[i].dataIndex), otherDataIndices = otherMap && otherMap[seriesId], j = 0, lenj = dataIndices.length; j < lenj; j++) {
                var dataIndex = dataIndices[j];
                otherDataIndices && otherDataIndices[dataIndex] ? otherDataIndices[dataIndex] = null : (map[seriesId] || (map[seriesId] = {}))[dataIndex] = 1
              }
            }
            
            function mapToArray(map, isData) {
              var result = [];
              for (var i in map)if (map.hasOwnProperty(i) && null != map[i])if (isData) result.push(+i); else {
                var dataIndices = mapToArray(map[i], !0);
                dataIndices.length && result.push({
                  seriesId: i, dataIndex: dataIndices
                })
              }
              return result
            }
            
            var mapA = {}, mapB = {};
            return makeMap(batchA || [], mapA), makeMap(batchB || [], mapB, mapA), [mapToArray(mapA), mapToArray(mapB)]
          }, modelUtil.queryDataIndex = function (data, payload) {
            return null != payload.dataIndexInside ? payload.dataIndexInside : null != payload.dataIndex ? zrUtil.isArray(payload.dataIndex) ? zrUtil.map(payload.dataIndex, function (value) {
              return data.indexOfRawIndex(value)
            }) : data.indexOfRawIndex(payload.dataIndex) : null != payload.name ? zrUtil.isArray(payload.name) ? zrUtil.map(payload.name, function (value) {
              return data.indexOfName(value)
            }) : data.indexOfName(payload.name) : void 0
          }, modelUtil.makeGetter = function () {
            var index = 0;
            return function () {
              var key = "\0__ec_prop_getter_" + index++;
              return function (hostObj) {
                return hostObj[key] || (hostObj[key] = {})
              }
            }
          }(), modelUtil.parseFinder = function (ecModel, finder, opt) {
            if (zrUtil.isString(finder)) {
              var obj = {};
              obj[finder + "Index"] = 0, finder = obj
            }
            var defaultMainType = opt && opt.defaultMainType;
            !defaultMainType || has(finder, defaultMainType + "Index") || has(finder, defaultMainType + "Id") || has(finder, defaultMainType + "Name") || (finder[defaultMainType + "Index"] = 0);
            var result = {};
            return each(finder, function (value, key) {
              var value = finder[key];
              if ("dataIndex" === key || "dataIndexInside" === key)return void(result[key] = value);
              var parsedKey = key.match(/^(\w+)(Index|Id|Name)$/) || [], mainType = parsedKey[1],
                queryType = (parsedKey[2] || "").toLowerCase();
              if (!(!mainType || !queryType || null == value || "index" === queryType && "none" === value || opt && opt.includeMainTypes && zrUtil.indexOf(opt.includeMainTypes, mainType) < 0)) {
                var queryParam = {mainType: mainType};
                "index" === queryType && "all" === value || (queryParam[queryType] = value);
                var models = ecModel.queryComponents(queryParam);
                result[mainType + "Models"] = models, result[mainType + "Model"] = models[0]
              }
            }), result
          }, modelUtil
        }), define("echarts/util/throttle", [], function () {
          var lib = {}, ORIGIN_METHOD = "\0__throttleOriginMethod", RATE = "\0__throttleRate",
            THROTTLE_TYPE = "\0__throttleType";
          return lib.throttle = function (fn, delay, debounce) {
            function exec() {
              lastExec = (new Date).getTime(), timer = null, fn.apply(scope, args || [])
            }
            
            var currCall, diff, scope, args, debounceNextCall, lastCall = 0, lastExec = 0, timer = null;
            delay = delay || 0;
            var cb = function () {
              currCall = (new Date).getTime(), scope = this, args = arguments;
              var thisDelay = debounceNextCall || delay, thisDebounce = debounceNextCall || debounce;
              debounceNextCall = null, diff = currCall - (thisDebounce ? lastCall : lastExec) - thisDelay, clearTimeout(timer), thisDebounce ? timer = setTimeout(exec, thisDelay) : diff >= 0 ? exec() : timer = setTimeout(exec, -diff), lastCall = currCall
            };
            return cb.clear = function () {
              timer && (clearTimeout(timer), timer = null)
            }, cb.debounceNextCall = function (debounceDelay) {
              debounceNextCall = debounceDelay
            }, cb
          }, lib.createOrUpdate = function (obj, fnAttr, rate, throttleType) {
            var fn = obj[fnAttr];
            if (fn) {
              var originFn = fn[ORIGIN_METHOD] || fn, lastThrottleType = fn[THROTTLE_TYPE], lastRate = fn[RATE];
              if (lastRate !== rate || lastThrottleType !== throttleType) {
                if (null == rate || !throttleType)return obj[fnAttr] = originFn;
                fn = obj[fnAttr] = lib.throttle(originFn, rate, "debounce" === throttleType), fn[ORIGIN_METHOD] = originFn, fn[THROTTLE_TYPE] = throttleType, fn[RATE] = rate
              }
              return fn
            }
          }, lib.clear = function (obj, fnAttr) {
            var fn = obj[fnAttr];
            fn && fn[ORIGIN_METHOD] && (obj[fnAttr] = fn[ORIGIN_METHOD])
          }, lib
        }), define("zrender/zrender", ["require", "./core/guid", "./core/env", "./core/util", "./Handler", "./Storage", "./animation/Animation", "./dom/HandlerProxy", "./Painter"], function (require) {
          function delInstance(id) {
            delete instances[id]
          }
          
          var guid = require("./core/guid"), env = require("./core/env"), zrUtil = require("./core/util"),
            Handler = require("./Handler"), Storage = require("./Storage"),
            Animation = require("./animation/Animation"), HandlerProxy = require("./dom/HandlerProxy"),
            useVML = !env.canvasSupported, painterCtors = {canvas: require("./Painter")}, instances = {}, zrender = {};
          zrender.version = "3.4.4", zrender.init = function (dom, opts) {
            var zr = new ZRender(guid(), dom, opts);
            return instances[zr.id] = zr, zr
          }, zrender.dispose = function (zr) {
            if (zr) zr.dispose(); else {
              for (var key in instances)instances.hasOwnProperty(key) && instances[key].dispose();
              instances = {}
            }
            return zrender
          }, zrender.getInstance = function (id) {
            return instances[id]
          }, zrender.registerPainter = function (name, Ctor) {
            painterCtors[name] = Ctor
          };
          var ZRender = function (id, dom, opts) {
            opts = opts || {}, this.dom = dom, this.id = id;
            var self = this, storage = new Storage, rendererType = opts.renderer;
            if (useVML) {
              if (!painterCtors.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");
              rendererType = "vml"
            } else rendererType && painterCtors[rendererType] || (rendererType = "canvas");
            var painter = new painterCtors[rendererType](dom, storage, opts);
            this.storage = storage, this.painter = painter;
            var handerProxy = env.node ? null : new HandlerProxy(painter.getViewportRoot());
            this.handler = new Handler(storage, painter, handerProxy, painter.root), this.animation = new Animation({stage: {update: zrUtil.bind(this.flush, this)}}), this.animation.start(), this._needsRefresh;
            var oldDelFromStorage = storage.delFromStorage, oldAddToStorage = storage.addToStorage;
            storage.delFromStorage = function (el) {
              oldDelFromStorage.call(storage, el), el && el.removeSelfFromZr(self)
            }, storage.addToStorage = function (el) {
              oldAddToStorage.call(storage, el), el.addSelfToZr(self)
            }
          };
          return ZRender.prototype = {
            constructor: ZRender, getId: function () {
              return this.id
            }, add: function (el) {
              this.storage.addRoot(el), this._needsRefresh = !0
            }, remove: function (el) {
              this.storage.delRoot(el), this._needsRefresh = !0
            }, configLayer: function (zLevel, config) {
              this.painter.configLayer(zLevel, config), this._needsRefresh = !0
            }, refreshImmediately: function () {
              this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1
            }, refresh: function () {
              this._needsRefresh = !0
            }, flush: function () {
              this._needsRefresh && this.refreshImmediately(), this._needsRefreshHover && this.refreshHoverImmediately()
            }, addHover: function (el, style) {
              this.painter.addHover && (this.painter.addHover(el, style), this.refreshHover())
            }, removeHover: function (el) {
              this.painter.removeHover && (this.painter.removeHover(el), this.refreshHover())
            }, clearHover: function () {
              this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
            }, refreshHover: function () {
              this._needsRefreshHover = !0
            }, refreshHoverImmediately: function () {
              this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
            }, resize: function (opts) {
              opts = opts || {}, this.painter.resize(opts.width, opts.height), this.handler.resize()
            }, clearAnimation: function () {
              this.animation.clear()
            }, getWidth: function () {
              return this.painter.getWidth()
            }, getHeight: function () {
              return this.painter.getHeight()
            }, pathToImage: function (e, dpr) {
              return this.painter.pathToImage(e, dpr)
            }, setCursorStyle: function (cursorStyle) {
              this.handler.setCursorStyle(cursorStyle)
            }, findHover: function (x, y) {
              return this.handler.findHover(x, y)
            }, on: function (eventName, eventHandler, context) {
              this.handler.on(eventName, eventHandler, context)
            }, off: function (eventName, eventHandler) {
              this.handler.off(eventName, eventHandler)
            }, trigger: function (eventName, event) {
              this.handler.trigger(eventName, event)
            }, clear: function () {
              this.storage.delRoot(), this.painter.clear()
            }, dispose: function () {
              this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, delInstance(this.id)
            }
          }, zrender
        }), define("zrender/tool/color", ["require", "../core/LRU"], function (require) {
          function clampCssByte(i) {
            return i = Math.round(i), i < 0 ? 0 : i > 255 ? 255 : i
          }
          
          function clampCssAngle(i) {
            return i = Math.round(i), i < 0 ? 0 : i > 360 ? 360 : i
          }
          
          function clampCssFloat(f) {
            return f < 0 ? 0 : f > 1 ? 1 : f
          }
          
          function parseCssInt(str) {
            return clampCssByte(str.length && "%" === str.charAt(str.length - 1) ? parseFloat(str) / 100 * 255 : parseInt(str, 10))
          }
          
          function parseCssFloat(str) {
            return clampCssFloat(str.length && "%" === str.charAt(str.length - 1) ? parseFloat(str) / 100 : parseFloat(str))
          }
          
          function cssHueToRgb(m1, m2, h) {
            return h < 0 ? h += 1 : h > 1 && (h -= 1), 6 * h < 1 ? m1 + (m2 - m1) * h * 6 : 2 * h < 1 ? m2 : 3 * h < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1
          }
          
          function lerp(a, b, p) {
            return a + (b - a) * p
          }
          
          function setRgba(out, r, g, b, a) {
            return out[0] = r, out[1] = g, out[2] = b, out[3] = a, out
          }
          
          function copyRgba(out, a) {
            return out[0] = a[0], out[1] = a[1], out[2] = a[2], out[3] = a[3], out
          }
          
          function putToCache(colorStr, rgbaArr) {
            lastRemovedArr && copyRgba(lastRemovedArr, rgbaArr), lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || rgbaArr.slice())
          }
          
          function parse(colorStr, rgbaArr) {
            if (colorStr) {
              rgbaArr = rgbaArr || [];
              var cached = colorCache.get(colorStr);
              if (cached)return copyRgba(rgbaArr, cached);
              colorStr += "";
              var str = colorStr.replace(/ /g, "").toLowerCase();
              if (str in kCSSColorTable)return copyRgba(rgbaArr, kCSSColorTable[str]), putToCache(colorStr, rgbaArr), rgbaArr;
              if ("#" !== str.charAt(0)) {
                var op = str.indexOf("("), ep = str.indexOf(")");
                if (op !== -1 && ep + 1 === str.length) {
                  var fname = str.substr(0, op), params = str.substr(op + 1, ep - (op + 1)).split(","), alpha = 1;
                  switch (fname) {
                    case"rgba":
                      if (4 !== params.length)return void setRgba(rgbaArr, 0, 0, 0, 1);
                      alpha = parseCssFloat(params.pop());
                    case"rgb":
                      return 3 !== params.length ? void setRgba(rgbaArr, 0, 0, 0, 1) : (setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), alpha), putToCache(colorStr, rgbaArr), rgbaArr);
                    case"hsla":
                      return 4 !== params.length ? void setRgba(rgbaArr, 0, 0, 0, 1) : (params[3] = parseCssFloat(params[3]), hsla2rgba(params, rgbaArr), putToCache(colorStr, rgbaArr), rgbaArr);
                    case"hsl":
                      return 3 !== params.length ? void setRgba(rgbaArr, 0, 0, 0, 1) : (hsla2rgba(params, rgbaArr), putToCache(colorStr, rgbaArr), rgbaArr);
                    default:
                      return
                  }
                }
                setRgba(rgbaArr, 0, 0, 0, 1)
              } else {
                if (4 === str.length) {
                  var iv = parseInt(str.substr(1), 16);
                  return iv >= 0 && iv <= 4095 ? (setRgba(rgbaArr, (3840 & iv) >> 4 | (3840 & iv) >> 8, 240 & iv | (240 & iv) >> 4, 15 & iv | (15 & iv) << 4, 1), putToCache(colorStr, rgbaArr), rgbaArr) : void setRgba(rgbaArr, 0, 0, 0, 1)
                }
                if (7 === str.length) {
                  var iv = parseInt(str.substr(1), 16);
                  return iv >= 0 && iv <= 16777215 ? (setRgba(rgbaArr, (16711680 & iv) >> 16, (65280 & iv) >> 8, 255 & iv, 1), putToCache(colorStr, rgbaArr), rgbaArr) : void setRgba(rgbaArr, 0, 0, 0, 1)
                }
              }
            }
          }
          
          function hsla2rgba(hsla, rgba) {
            var h = (parseFloat(hsla[0]) % 360 + 360) % 360 / 360, s = parseCssFloat(hsla[1]),
              l = parseCssFloat(hsla[2]), m2 = l <= .5 ? l * (s + 1) : l + s - l * s, m1 = 2 * l - m2;
            return rgba = rgba || [], setRgba(rgba, clampCssByte(255 * cssHueToRgb(m1, m2, h + 1 / 3)), clampCssByte(255 * cssHueToRgb(m1, m2, h)), clampCssByte(255 * cssHueToRgb(m1, m2, h - 1 / 3)), 1), 4 === hsla.length && (rgba[3] = hsla[3]), rgba
          }
          
          function rgba2hsla(rgba) {
            if (rgba) {
              var H, S, R = rgba[0] / 255, G = rgba[1] / 255, B = rgba[2] / 255, vMin = Math.min(R, G, B),
                vMax = Math.max(R, G, B), delta = vMax - vMin, L = (vMax + vMin) / 2;
              if (0 === delta) H = 0, S = 0; else {
                S = L < .5 ? delta / (vMax + vMin) : delta / (2 - vMax - vMin);
                var deltaR = ((vMax - R) / 6 + delta / 2) / delta, deltaG = ((vMax - G) / 6 + delta / 2) / delta,
                  deltaB = ((vMax - B) / 6 + delta / 2) / delta;
                R === vMax ? H = deltaB - deltaG : G === vMax ? H = 1 / 3 + deltaR - deltaB : B === vMax && (H = 2 / 3 + deltaG - deltaR), H < 0 && (H += 1), H > 1 && (H -= 1)
              }
              var hsla = [360 * H, S, L];
              return null != rgba[3] && hsla.push(rgba[3]), hsla
            }
          }
          
          function lift(color, level) {
            var colorArr = parse(color);
            if (colorArr) {
              for (var i = 0; i < 3; i++)level < 0 ? colorArr[i] = colorArr[i] * (1 - level) | 0 : colorArr[i] = (255 - colorArr[i]) * level + colorArr[i] | 0;
              return stringify(colorArr, 4 === colorArr.length ? "rgba" : "rgb")
            }
          }
          
          function toHex(color, level) {
            var colorArr = parse(color);
            if (colorArr)return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + +colorArr[2]).toString(16).slice(1)
          }
          
          function fastMapToColor(normalizedValue, colors, out) {
            if (colors && colors.length && normalizedValue >= 0 && normalizedValue <= 1) {
              out = out || [];
              var value = normalizedValue * (colors.length - 1), leftIndex = Math.floor(value),
                rightIndex = Math.ceil(value), leftColor = colors[leftIndex], rightColor = colors[rightIndex],
                dv = value - leftIndex;
              return out[0] = clampCssByte(lerp(leftColor[0], rightColor[0], dv)), out[1] = clampCssByte(lerp(leftColor[1], rightColor[1], dv)), out[2] = clampCssByte(lerp(leftColor[2], rightColor[2], dv)), out[3] = clampCssFloat(lerp(leftColor[3], rightColor[3], dv)), out
            }
          }
          
          function mapToColor(normalizedValue, colors, fullOutput) {
            if (colors && colors.length && normalizedValue >= 0 && normalizedValue <= 1) {
              var value = normalizedValue * (colors.length - 1), leftIndex = Math.floor(value),
                rightIndex = Math.ceil(value), leftColor = parse(colors[leftIndex]),
                rightColor = parse(colors[rightIndex]), dv = value - leftIndex,
                color = stringify([clampCssByte(lerp(leftColor[0], rightColor[0], dv)), clampCssByte(lerp(leftColor[1], rightColor[1], dv)), clampCssByte(lerp(leftColor[2], rightColor[2], dv)), clampCssFloat(lerp(leftColor[3], rightColor[3], dv))], "rgba");
              return fullOutput ? {color: color, leftIndex: leftIndex, rightIndex: rightIndex, value: value} : color
            }
          }
          
          function modifyHSL(color, h, s, l) {
            if (color = parse(color))return color = rgba2hsla(color), null != h && (color[0] = clampCssAngle(h)), null != s && (color[1] = parseCssFloat(s)), null != l && (color[2] = parseCssFloat(l)), stringify(hsla2rgba(color), "rgba")
          }
          
          function modifyAlpha(color, alpha) {
            if (color = parse(color), color && null != alpha)return color[3] = clampCssFloat(alpha), stringify(color, "rgba")
          }
          
          function stringify(arrColor, type) {
            if (arrColor && arrColor.length) {
              var colorStr = arrColor[0] + "," + arrColor[1] + "," + arrColor[2];
              return "rgba" !== type && "hsva" !== type && "hsla" !== type || (colorStr += "," + arrColor[3]), type + "(" + colorStr + ")"
            }
          }
          
          var LRU = require("../core/LRU"), kCSSColorTable = {
            transparent: [0, 0, 0, 0],
            aliceblue: [240, 248, 255, 1],
            antiquewhite: [250, 235, 215, 1],
            aqua: [0, 255, 255, 1],
            aquamarine: [127, 255, 212, 1],
            azure: [240, 255, 255, 1],
            beige: [245, 245, 220, 1],
            bisque: [255, 228, 196, 1],
            black: [0, 0, 0, 1],
            blanchedalmond: [255, 235, 205, 1],
            blue: [0, 0, 255, 1],
            blueviolet: [138, 43, 226, 1],
            brown: [165, 42, 42, 1],
            burlywood: [222, 184, 135, 1],
            cadetblue: [95, 158, 160, 1],
            chartreuse: [127, 255, 0, 1],
            chocolate: [210, 105, 30, 1],
            coral: [255, 127, 80, 1],
            cornflowerblue: [100, 149, 237, 1],
            cornsilk: [255, 248, 220, 1],
            crimson: [220, 20, 60, 1],
            cyan: [0, 255, 255, 1],
            darkblue: [0, 0, 139, 1],
            darkcyan: [0, 139, 139, 1],
            darkgoldenrod: [184, 134, 11, 1],
            darkgray: [169, 169, 169, 1],
            darkgreen: [0, 100, 0, 1],
            darkgrey: [169, 169, 169, 1],
            darkkhaki: [189, 183, 107, 1],
            darkmagenta: [139, 0, 139, 1],
            darkolivegreen: [85, 107, 47, 1],
            darkorange: [255, 140, 0, 1],
            darkorchid: [153, 50, 204, 1],
            darkred: [139, 0, 0, 1],
            darksalmon: [233, 150, 122, 1],
            darkseagreen: [143, 188, 143, 1],
            darkslateblue: [72, 61, 139, 1],
            darkslategray: [47, 79, 79, 1],
            darkslategrey: [47, 79, 79, 1],
            darkturquoise: [0, 206, 209, 1],
            darkviolet: [148, 0, 211, 1],
            deeppink: [255, 20, 147, 1],
            deepskyblue: [0, 191, 255, 1],
            dimgray: [105, 105, 105, 1],
            dimgrey: [105, 105, 105, 1],
            dodgerblue: [30, 144, 255, 1],
            firebrick: [178, 34, 34, 1],
            floralwhite: [255, 250, 240, 1],
            forestgreen: [34, 139, 34, 1],
            fuchsia: [255, 0, 255, 1],
            gainsboro: [220, 220, 220, 1],
            ghostwhite: [248, 248, 255, 1],
            gold: [255, 215, 0, 1],
            goldenrod: [218, 165, 32, 1],
            gray: [128, 128, 128, 1],
            green: [0, 128, 0, 1],
            greenyellow: [173, 255, 47, 1],
            grey: [128, 128, 128, 1],
            honeydew: [240, 255, 240, 1],
            hotpink: [255, 105, 180, 1],
            indianred: [205, 92, 92, 1],
            indigo: [75, 0, 130, 1],
            ivory: [255, 255, 240, 1],
            khaki: [240, 230, 140, 1],
            lavender: [230, 230, 250, 1],
            lavenderblush: [255, 240, 245, 1],
            lawngreen: [124, 252, 0, 1],
            lemonchiffon: [255, 250, 205, 1],
            lightblue: [173, 216, 230, 1],
            lightcoral: [240, 128, 128, 1],
            lightcyan: [224, 255, 255, 1],
            lightgoldenrodyellow: [250, 250, 210, 1],
            lightgray: [211, 211, 211, 1],
            lightgreen: [144, 238, 144, 1],
            lightgrey: [211, 211, 211, 1],
            lightpink: [255, 182, 193, 1],
            lightsalmon: [255, 160, 122, 1],
            lightseagreen: [32, 178, 170, 1],
            lightskyblue: [135, 206, 250, 1],
            lightslategray: [119, 136, 153, 1],
            lightslategrey: [119, 136, 153, 1],
            lightsteelblue: [176, 196, 222, 1],
            lightyellow: [255, 255, 224, 1],
            lime: [0, 255, 0, 1],
            limegreen: [50, 205, 50, 1],
            linen: [250, 240, 230, 1],
            magenta: [255, 0, 255, 1],
            maroon: [128, 0, 0, 1],
            mediumaquamarine: [102, 205, 170, 1],
            mediumblue: [0, 0, 205, 1],
            mediumorchid: [186, 85, 211, 1],
            mediumpurple: [147, 112, 219, 1],
            mediumseagreen: [60, 179, 113, 1],
            mediumslateblue: [123, 104, 238, 1],
            mediumspringgreen: [0, 250, 154, 1],
            mediumturquoise: [72, 209, 204, 1],
            mediumvioletred: [199, 21, 133, 1],
            midnightblue: [25, 25, 112, 1],
            mintcream: [245, 255, 250, 1],
            mistyrose: [255, 228, 225, 1],
            moccasin: [255, 228, 181, 1],
            navajowhite: [255, 222, 173, 1],
            navy: [0, 0, 128, 1],
            oldlace: [253, 245, 230, 1],
            olive: [128, 128, 0, 1],
            olivedrab: [107, 142, 35, 1],
            orange: [255, 165, 0, 1],
            orangered: [255, 69, 0, 1],
            orchid: [218, 112, 214, 1],
            palegoldenrod: [238, 232, 170, 1],
            palegreen: [152, 251, 152, 1],
            paleturquoise: [175, 238, 238, 1],
            palevioletred: [219, 112, 147, 1],
            papayawhip: [255, 239, 213, 1],
            peachpuff: [255, 218, 185, 1],
            peru: [205, 133, 63, 1],
            pink: [255, 192, 203, 1],
            plum: [221, 160, 221, 1],
            powderblue: [176, 224, 230, 1],
            purple: [128, 0, 128, 1],
            red: [255, 0, 0, 1],
            rosybrown: [188, 143, 143, 1],
            royalblue: [65, 105, 225, 1],
            saddlebrown: [139, 69, 19, 1],
            salmon: [250, 128, 114, 1],
            sandybrown: [244, 164, 96, 1],
            seagreen: [46, 139, 87, 1],
            seashell: [255, 245, 238, 1],
            sienna: [160, 82, 45, 1],
            silver: [192, 192, 192, 1],
            skyblue: [135, 206, 235, 1],
            slateblue: [106, 90, 205, 1],
            slategray: [112, 128, 144, 1],
            slategrey: [112, 128, 144, 1],
            snow: [255, 250, 250, 1],
            springgreen: [0, 255, 127, 1],
            steelblue: [70, 130, 180, 1],
            tan: [210, 180, 140, 1],
            teal: [0, 128, 128, 1],
            thistle: [216, 191, 216, 1],
            tomato: [255, 99, 71, 1],
            turquoise: [64, 224, 208, 1],
            violet: [238, 130, 238, 1],
            wheat: [245, 222, 179, 1],
            white: [255, 255, 255, 1],
            whitesmoke: [245, 245, 245, 1],
            yellow: [255, 255, 0, 1],
            yellowgreen: [154, 205, 50, 1]
          }, colorCache = new LRU(20), lastRemovedArr = null;
          return {
            parse: parse,
            lift: lift,
            toHex: toHex,
            fastMapToColor: fastMapToColor,
            mapToColor: mapToColor,
            modifyHSL: modifyHSL,
            modifyAlpha: modifyAlpha,
            stringify: stringify
          }
        }), define("zrender/core/timsort", [], function () {
          function minRunLength(n) {
            for (var r = 0; n >= DEFAULT_MIN_MERGE;)r |= 1 & n, n >>= 1;
            return n + r
          }
          
          function makeAscendingRun(array, lo, hi, compare) {
            var runHi = lo + 1;
            if (runHi === hi)return 1;
            if (compare(array[runHi++], array[lo]) < 0) {
              for (; runHi < hi && compare(array[runHi], array[runHi - 1]) < 0;)runHi++;
              reverseRun(array, lo, runHi)
            } else for (; runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0;)runHi++;
            return runHi - lo
          }
          
          function reverseRun(array, lo, hi) {
            for (hi--; lo < hi;) {
              var t = array[lo];
              array[lo++] = array[hi], array[hi--] = t
            }
          }
          
          function binaryInsertionSort(array, lo, hi, start, compare) {
            for (start === lo && start++; start < hi; start++) {
              for (var mid, pivot = array[start], left = lo, right = start; left < right;)mid = left + right >>> 1, compare(pivot, array[mid]) < 0 ? right = mid : left = mid + 1;
              var n = start - left;
              switch (n) {
                case 3:
                  array[left + 3] = array[left + 2];
                case 2:
                  array[left + 2] = array[left + 1];
                case 1:
                  array[left + 1] = array[left];
                  break;
                default:
                  for (; n > 0;)array[left + n] = array[left + n - 1], n--
              }
              array[left] = pivot
            }
          }
          
          function gallopLeft(value, array, start, length, hint, compare) {
            var lastOffset = 0, maxOffset = 0, offset = 1;
            if (compare(value, array[start + hint]) > 0) {
              for (maxOffset = length - hint; offset < maxOffset && compare(value, array[start + hint + offset]) > 0;)lastOffset = offset, offset = (offset << 1) + 1, offset <= 0 && (offset = maxOffset);
              offset > maxOffset && (offset = maxOffset), lastOffset += hint, offset += hint
            } else {
              for (maxOffset = hint + 1; offset < maxOffset && compare(value, array[start + hint - offset]) <= 0;)lastOffset = offset, offset = (offset << 1) + 1, offset <= 0 && (offset = maxOffset);
              offset > maxOffset && (offset = maxOffset);
              var tmp = lastOffset;
              lastOffset = hint - offset, offset = hint - tmp
            }
            for (lastOffset++; lastOffset < offset;) {
              var m = lastOffset + (offset - lastOffset >>> 1);
              compare(value, array[start + m]) > 0 ? lastOffset = m + 1 : offset = m
            }
            return offset
          }
          
          function gallopRight(value, array, start, length, hint, compare) {
            var lastOffset = 0, maxOffset = 0, offset = 1;
            if (compare(value, array[start + hint]) < 0) {
              for (maxOffset = hint + 1; offset < maxOffset && compare(value, array[start + hint - offset]) < 0;)lastOffset = offset, offset = (offset << 1) + 1, offset <= 0 && (offset = maxOffset);
              offset > maxOffset && (offset = maxOffset);
              var tmp = lastOffset;
              lastOffset = hint - offset, offset = hint - tmp
            } else {
              for (maxOffset = length - hint; offset < maxOffset && compare(value, array[start + hint + offset]) >= 0;)lastOffset = offset, offset = (offset << 1) + 1, offset <= 0 && (offset = maxOffset);
              offset > maxOffset && (offset = maxOffset), lastOffset += hint, offset += hint
            }
            for (lastOffset++; lastOffset < offset;) {
              var m = lastOffset + (offset - lastOffset >>> 1);
              compare(value, array[start + m]) < 0 ? offset = m : lastOffset = m + 1
            }
            return offset
          }
          
          function TimSort(array, compare) {
            function pushRun(_runStart, _runLength) {
              runStart[stackSize] = _runStart, runLength[stackSize] = _runLength, stackSize += 1
            }
            
            function mergeRuns() {
              for (; stackSize > 1;) {
                var n = stackSize - 2;
                if (n >= 1 && runLength[n - 1] <= runLength[n] + runLength[n + 1] || n >= 2 && runLength[n - 2] <= runLength[n] + runLength[n - 1]) runLength[n - 1] < runLength[n + 1] && n--; else if (runLength[n] > runLength[n + 1])break;
                mergeAt(n)
              }
            }
            
            function forceMergeRuns() {
              for (; stackSize > 1;) {
                var n = stackSize - 2;
                n > 0 && runLength[n - 1] < runLength[n + 1] && n--, mergeAt(n)
              }
            }
            
            function mergeAt(i) {
              var start1 = runStart[i], length1 = runLength[i], start2 = runStart[i + 1], length2 = runLength[i + 1];
              runLength[i] = length1 + length2, i === stackSize - 3 && (runStart[i + 1] = runStart[i + 2], runLength[i + 1] = runLength[i + 2]), stackSize--;
              var k = gallopRight(array[start2], array, start1, length1, 0, compare);
              start1 += k, length1 -= k, 0 !== length1 && (length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare), 0 !== length2 && (length1 <= length2 ? mergeLow(start1, length1, start2, length2) : mergeHigh(start1, length1, start2, length2)))
            }
            
            function mergeLow(start1, length1, start2, length2) {
              var i = 0;
              for (i = 0; i < length1; i++)tmp[i] = array[start1 + i];
              var cursor1 = 0, cursor2 = start2, dest = start1;
              if (array[dest++] = array[cursor2++], 0 !== --length2) {
                if (1 === length1) {
                  for (i = 0; i < length2; i++)array[dest + i] = array[cursor2 + i];
                  return void(array[dest + length2] = tmp[cursor1])
                }
                for (var count1, count2, exit, _minGallop = minGallop; ;) {
                  count1 = 0, count2 = 0, exit = !1;
                  do if (compare(array[cursor2], tmp[cursor1]) < 0) {
                    if (array[dest++] = array[cursor2++], count2++, count1 = 0, 0 === --length2) {
                      exit = !0;
                      break
                    }
                  } else if (array[dest++] = tmp[cursor1++], count1++, count2 = 0, 1 === --length1) {
                    exit = !0;
                    break
                  } while ((count1 | count2) < _minGallop);
                  if (exit)break;
                  do {
                    if (count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare), 0 !== count1) {
                      for (i = 0; i < count1; i++)array[dest + i] = tmp[cursor1 + i];
                      if (dest += count1, cursor1 += count1, length1 -= count1, length1 <= 1) {
                        exit = !0;
                        break
                      }
                    }
                    if (array[dest++] = array[cursor2++], 0 === --length2) {
                      exit = !0;
                      break
                    }
                    if (count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare), 0 !== count2) {
                      for (i = 0; i < count2; i++)array[dest + i] = array[cursor2 + i];
                      if (dest += count2, cursor2 += count2, length2 -= count2, 0 === length2) {
                        exit = !0;
                        break
                      }
                    }
                    if (array[dest++] = tmp[cursor1++], 1 === --length1) {
                      exit = !0;
                      break
                    }
                    _minGallop--
                  } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
                  if (exit)break;
                  _minGallop < 0 && (_minGallop = 0), _minGallop += 2
                }
                if (minGallop = _minGallop, minGallop < 1 && (minGallop = 1), 1 === length1) {
                  for (i = 0; i < length2; i++)array[dest + i] = array[cursor2 + i];
                  array[dest + length2] = tmp[cursor1]
                } else {
                  if (0 === length1)throw new Error;
                  for (i = 0; i < length1; i++)array[dest + i] = tmp[cursor1 + i]
                }
              } else for (i = 0; i < length1; i++)array[dest + i] = tmp[cursor1 + i]
            }
            
            function mergeHigh(start1, length1, start2, length2) {
              var i = 0;
              for (i = 0; i < length2; i++)tmp[i] = array[start2 + i];
              var cursor1 = start1 + length1 - 1, cursor2 = length2 - 1, dest = start2 + length2 - 1, customCursor = 0,
                customDest = 0;
              if (array[dest--] = array[cursor1--], 0 !== --length1) {
                if (1 === length2) {
                  for (dest -= length1, cursor1 -= length1, customDest = dest + 1, customCursor = cursor1 + 1, i = length1 - 1; i >= 0; i--)array[customDest + i] = array[customCursor + i];
                  return void(array[dest] = tmp[cursor2])
                }
                for (var _minGallop = minGallop; ;) {
                  var count1 = 0, count2 = 0, exit = !1;
                  do if (compare(tmp[cursor2], array[cursor1]) < 0) {
                    if (array[dest--] = array[cursor1--], count1++, count2 = 0, 0 === --length1) {
                      exit = !0;
                      break
                    }
                  } else if (array[dest--] = tmp[cursor2--], count2++, count1 = 0, 1 === --length2) {
                    exit = !0;
                    break
                  } while ((count1 | count2) < _minGallop);
                  if (exit)break;
                  do {
                    if (count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare), 0 !== count1) {
                      for (dest -= count1, cursor1 -= count1, length1 -= count1, customDest = dest + 1, customCursor = cursor1 + 1, i = count1 - 1; i >= 0; i--)array[customDest + i] = array[customCursor + i];
                      if (0 === length1) {
                        exit = !0;
                        break
                      }
                    }
                    if (array[dest--] = tmp[cursor2--], 1 === --length2) {
                      exit = !0;
                      break
                    }
                    if (count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare), 0 !== count2) {
                      for (dest -= count2, cursor2 -= count2, length2 -= count2, customDest = dest + 1, customCursor = cursor2 + 1, i = 0; i < count2; i++)array[customDest + i] = tmp[customCursor + i];
                      if (length2 <= 1) {
                        exit = !0;
                        break
                      }
                    }
                    if (array[dest--] = array[cursor1--], 0 === --length1) {
                      exit = !0;
                      break
                    }
                    _minGallop--
                  } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
                  if (exit)break;
                  _minGallop < 0 && (_minGallop = 0), _minGallop += 2
                }
                if (minGallop = _minGallop, minGallop < 1 && (minGallop = 1), 1 === length2) {
                  for (dest -= length1, cursor1 -= length1, customDest = dest + 1, customCursor = cursor1 + 1, i = length1 - 1; i >= 0; i--)array[customDest + i] = array[customCursor + i];
                  array[dest] = tmp[cursor2]
                } else {
                  if (0 === length2)throw new Error;
                  for (customCursor = dest - (length2 - 1), i = 0; i < length2; i++)array[customCursor + i] = tmp[i]
                }
              } else for (customCursor = dest - (length2 - 1), i = 0; i < length2; i++)array[customCursor + i] = tmp[i]
            }
            
            var runStart, runLength, minGallop = DEFAULT_MIN_GALLOPING, length = 0,
              tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH, stackLength = 0, stackSize = 0;
            length = array.length, length < 2 * DEFAULT_TMP_STORAGE_LENGTH && (tmpStorageLength = length >>> 1);
            var tmp = [];
            stackLength = length < 120 ? 5 : length < 1542 ? 10 : length < 119151 ? 19 : 40, runStart = [], runLength = [], this.mergeRuns = mergeRuns, this.forceMergeRuns = forceMergeRuns, this.pushRun = pushRun
          }
          
          function sort(array, compare, lo, hi) {
            lo || (lo = 0), hi || (hi = array.length);
            var remaining = hi - lo;
            if (!(remaining < 2)) {
              var runLength = 0;
              if (remaining < DEFAULT_MIN_MERGE)return runLength = makeAscendingRun(array, lo, hi, compare), void binaryInsertionSort(array, lo, hi, lo + runLength, compare);
              var ts = new TimSort(array, compare), minRun = minRunLength(remaining);
              do {
                if (runLength = makeAscendingRun(array, lo, hi, compare), runLength < minRun) {
                  var force = remaining;
                  force > minRun && (force = minRun), binaryInsertionSort(array, lo, lo + force, lo + runLength, compare), runLength = force
                }
                ts.pushRun(lo, runLength), ts.mergeRuns(), remaining -= runLength, lo += runLength
              } while (0 !== remaining);
              ts.forceMergeRuns()
            }
          }
          
          var DEFAULT_MIN_MERGE = 32, DEFAULT_MIN_GALLOPING = 7, DEFAULT_TMP_STORAGE_LENGTH = 256;
          return sort
        }), define("zrender/mixin/Eventful", ["require"], function (require) {
          var arrySlice = Array.prototype.slice, Eventful = function () {
            this._$handlers = {}
          };
          return Eventful.prototype = {
            constructor: Eventful, one: function (event, handler, context) {
              var _h = this._$handlers;
              if (!handler || !event)return this;
              _h[event] || (_h[event] = []);
              for (var i = 0; i < _h[event].length; i++)if (_h[event][i].h === handler)return this;
              return _h[event].push({h: handler, one: !0, ctx: context || this}), this
            }, on: function (event, handler, context) {
              var _h = this._$handlers;
              if (!handler || !event)return this;
              _h[event] || (_h[event] = []);
              for (var i = 0; i < _h[event].length; i++)if (_h[event][i].h === handler)return this;
              return _h[event].push({h: handler, one: !1, ctx: context || this}), this
            }, isSilent: function (event) {
              var _h = this._$handlers;
              return _h[event] && _h[event].length
            }, off: function (event, handler) {
              var _h = this._$handlers;
              if (!event)return this._$handlers = {}, this;
              if (handler) {
                if (_h[event]) {
                  for (var newList = [], i = 0, l = _h[event].length; i < l; i++)_h[event][i].h != handler && newList.push(_h[event][i]);
                  _h[event] = newList
                }
                _h[event] && 0 === _h[event].length && delete _h[event]
              } else delete _h[event];
              return this
            }, trigger: function (type) {
              if (this._$handlers[type]) {
                var args = arguments, argLen = args.length;
                argLen > 3 && (args = arrySlice.call(args, 1));
                for (var _h = this._$handlers[type], len = _h.length, i = 0; i < len;) {
                  switch (argLen) {
                    case 1:
                      _h[i].h.call(_h[i].ctx);
                      break;
                    case 2:
                      _h[i].h.call(_h[i].ctx, args[1]);
                      break;
                    case 3:
                      _h[i].h.call(_h[i].ctx, args[1], args[2]);
                      break;
                    default:
                      _h[i].h.apply(_h[i].ctx, args)
                  }
                  _h[i].one ? (_h.splice(i, 1), len--) : i++
                }
              }
              return this
            }, triggerWithContext: function (type) {
              if (this._$handlers[type]) {
                var args = arguments, argLen = args.length;
                argLen > 4 && (args = arrySlice.call(args, 1, args.length - 1));
                for (var ctx = args[args.length - 1], _h = this._$handlers[type], len = _h.length, i = 0; i < len;) {
                  switch (argLen) {
                    case 1:
                      _h[i].h.call(ctx);
                      break;
                    case 2:
                      _h[i].h.call(ctx, args[1]);
                      break;
                    case 3:
                      _h[i].h.call(ctx, args[1], args[2]);
                      break;
                    default:
                      _h[i].h.apply(ctx, args)
                  }
                  _h[i].one ? (_h.splice(i, 1), len--) : i++
                }
              }
              return this
            }
          }, Eventful
        }), define("echarts/visual/seriesColor", ["require", "zrender/graphic/Gradient"], function (require) {
          var Gradient = require("zrender/graphic/Gradient");
          return function (ecModel) {
            function encodeColor(seriesModel) {
              var colorAccessPath = (seriesModel.visualColorAccessPath || "itemStyle.normal.color").split("."),
                data = seriesModel.getData(),
                color = seriesModel.get(colorAccessPath) || seriesModel.getColorFromPalette(seriesModel.get("name"));
              data.setVisual("color", color), ecModel.isSeriesFiltered(seriesModel) || ("function" != typeof color || color instanceof Gradient || data.each(function (idx) {
                data.setItemVisual(idx, "color", color(seriesModel.getDataParams(idx)))
              }), data.each(function (idx) {
                var itemModel = data.getItemModel(idx), color = itemModel.get(colorAccessPath, !0);
                null != color && data.setItemVisual(idx, "color", color)
              }))
            }
            
            ecModel.eachRawSeries(encodeColor)
          }
        }), define("echarts/preprocessor/backwardCompat", ["require", "zrender/core/util", "./helper/compatStyle"], function (require) {
          function get(opt, path) {
            path = path.split(",");
            for (var obj = opt, i = 0; i < path.length && (obj = obj && obj[path[i]], null != obj); i++);
            return obj
          }
          
          function set(opt, path, val, overwrite) {
            path = path.split(",");
            for (var key, obj = opt, i = 0; i < path.length - 1; i++)key = path[i], null == obj[key] && (obj[key] = {}), obj = obj[key];
            (overwrite || null == obj[path[i]]) && (obj[path[i]] = val)
          }
          
          function compatLayoutProperties(option) {
            each(LAYOUT_PROPERTIES, function (prop) {
              prop[0] in option && !(prop[1] in option) && (option[prop[1]] = option[prop[0]])
            })
          }
          
          var zrUtil = require("zrender/core/util"), compatStyle = require("./helper/compatStyle"),
            LAYOUT_PROPERTIES = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]],
            COMPATITABLE_COMPONENTS = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
            COMPATITABLE_SERIES = ["bar", "boxplot", "candlestick", "chord", "effectScatter", "funnel", "gauge", "lines", "graph", "heatmap", "line", "map", "parallel", "pie", "radar", "sankey", "scatter", "treemap"],
            each = zrUtil.each;
          return function (option) {
            each(option.series, function (seriesOpt) {
              if (zrUtil.isObject(seriesOpt)) {
                var seriesType = seriesOpt.type;
                if (compatStyle(seriesOpt), "pie" !== seriesType && "gauge" !== seriesType || null != seriesOpt.clockWise && (seriesOpt.clockwise = seriesOpt.clockWise), "gauge" === seriesType) {
                  var pointerColor = get(seriesOpt, "pointer.color");
                  null != pointerColor && set(seriesOpt, "itemStyle.normal.color", pointerColor)
                }
                for (var i = 0; i < COMPATITABLE_SERIES.length; i++)if (COMPATITABLE_SERIES[i] === seriesOpt.type) {
                  compatLayoutProperties(seriesOpt);
                  break
                }
              }
            }), option.dataRange && (option.visualMap = option.dataRange), each(COMPATITABLE_COMPONENTS, function (componentName) {
              var options = option[componentName];
              options && (zrUtil.isArray(options) || (options = [options]), each(options, function (option) {
                compatLayoutProperties(option)
              }))
            })
          }
        }), define("echarts/loading/default", ["require", "../util/graphic", "zrender/core/util"], function (require) {
          var graphic = require("../util/graphic"), zrUtil = require("zrender/core/util"), PI = Math.PI;
          return function (api, opts) {
            opts = opts || {}, zrUtil.defaults(opts, {
              text: "loading",
              color: "#c23531",
              textColor: "#000",
              maskColor: "rgba(255, 255, 255, 0.8)",
              zlevel: 0
            });
            var mask = new graphic.Rect({style: {fill: opts.maskColor}, zlevel: opts.zlevel, z: 1e4}),
              arc = new graphic.Arc({
                shape: {startAngle: -PI / 2, endAngle: -PI / 2 + .1, r: 10},
                style: {stroke: opts.color, lineCap: "round", lineWidth: 5},
                zlevel: opts.zlevel,
                z: 10001
              }), labelRect = new graphic.Rect({
                style: {
                  fill: "none",
                  text: opts.text,
                  textPosition: "right",
                  textDistance: 10,
                  textFill: opts.textColor
                }, zlevel: opts.zlevel, z: 10001
              });
            arc.animateShape(!0).when(1e3, {endAngle: 3 * PI / 2}).start("circularInOut"), arc.animateShape(!0).when(1e3, {startAngle: 3 * PI / 2}).delay(300).start("circularInOut");
            var group = new graphic.Group;
            return group.add(arc), group.add(labelRect), group.add(mask), group.resize = function () {
              var cx = api.getWidth() / 2, cy = api.getHeight() / 2;
              arc.setShape({cx: cx, cy: cy});
              var r = arc.shape.r;
              labelRect.setShape({x: cx - r, y: cy - r, width: 2 * r, height: 2 * r}), mask.setShape({
                x: 0,
                y: 0,
                width: api.getWidth(),
                height: api.getHeight()
              })
            }, group.resize(), group
          }
        }), define("echarts/model/Model", ["require", "zrender/core/util", "../util/clazz", "zrender/core/env", "./mixin/lineStyle", "./mixin/areaStyle", "./mixin/textStyle", "./mixin/itemStyle"], function (require) {
          function Model(option, parentModel, ecModel) {
            this.parentModel = parentModel, this.ecModel = ecModel, this.option = option
          }
          
          function doGet(obj, pathArr, parentModel) {
            for (var i = 0; i < pathArr.length && (!pathArr[i] || (obj = obj && "object" === ("undefined" == typeof obj ? "undefined" : _typeof(obj)) ? obj[pathArr[i]] : null, null != obj)); i++);
            return null == obj && parentModel && (obj = parentModel.get(pathArr)), obj
          }
          
          function getParent(model, path) {
            var getParentMethod = clazzUtil.get(model, "getParent");
            return getParentMethod ? getParentMethod.call(model, path) : model.parentModel
          }
          
          var zrUtil = require("zrender/core/util"), clazzUtil = require("../util/clazz"),
            env = require("zrender/core/env");
          Model.prototype = {
            constructor: Model, init: null, mergeOption: function (option) {
              zrUtil.merge(this.option, option, !0)
            }, get: function (path, ignoreParent) {
              return null == path ? this.option : doGet(this.option, this.parsePath(path), !ignoreParent && getParent(this, path));
            }, getShallow: function (key, ignoreParent) {
              var option = this.option, val = null == option ? option : option[key],
                parentModel = !ignoreParent && getParent(this, key);
              return null == val && parentModel && (val = parentModel.getShallow(key)), val
            }, getModel: function (path, parentModel) {
              var thisParentModel, obj = null == path ? this.option : doGet(this.option, path = this.parsePath(path));
              return parentModel = parentModel || (thisParentModel = getParent(this, path)) && thisParentModel.getModel(path), new Model(obj, parentModel, this.ecModel)
            }, isEmpty: function () {
              return null == this.option
            }, restoreData: function () {
            }, clone: function () {
              var Ctor = this.constructor;
              return new Ctor(zrUtil.clone(this.option))
            }, setReadOnly: function (properties) {
              clazzUtil.setReadOnly(this, properties)
            }, parsePath: function (path) {
              return "string" == typeof path && (path = path.split(".")), path
            }, customizeGetParent: function (getParentMethod) {
              clazzUtil.set(this, "getParent", getParentMethod)
            }, isAnimationEnabled: function () {
              if (!env.node) {
                if (null != this.option.animation)return !!this.option.animation;
                if (this.parentModel)return this.parentModel.isAnimationEnabled()
              }
            }
          }, clazzUtil.enableClassExtend(Model);
          var mixin = zrUtil.mixin;
          return mixin(Model, require("./mixin/lineStyle")), mixin(Model, require("./mixin/areaStyle")), mixin(Model, require("./mixin/textStyle")), mixin(Model, require("./mixin/itemStyle")), Model
        }), define("echarts/coord/Axis", ["require", "../util/number", "zrender/core/util"], function (require) {
          function fixExtentWithBands(extent, nTick) {
            var size = extent[1] - extent[0], len = nTick, margin = size / len / 2;
            extent[0] += margin, extent[1] -= margin
          }
          
          var numberUtil = require("../util/number"), linearMap = numberUtil.linearMap,
            zrUtil = require("zrender/core/util"), normalizedExtent = [0, 1], Axis = function (dim, scale, extent) {
              this.dim = dim, this.scale = scale, this._extent = extent || [0, 0], this.inverse = !1, this.onBand = !1
            };
          return Axis.prototype = {
            constructor: Axis, contain: function (coord) {
              var extent = this._extent, min = Math.min(extent[0], extent[1]), max = Math.max(extent[0], extent[1]);
              return coord >= min && coord <= max
            }, containData: function (data) {
              return this.contain(this.dataToCoord(data))
            }, getExtent: function () {
              var ret = this._extent.slice();
              return ret
            }, getPixelPrecision: function (dataExtent) {
              return numberUtil.getPixelPrecision(dataExtent || this.scale.getExtent(), this._extent)
            }, setExtent: function (start, end) {
              var extent = this._extent;
              extent[0] = start, extent[1] = end
            }, dataToCoord: function (data, clamp) {
              var extent = this._extent, scale = this.scale;
              return data = scale.normalize(data), this.onBand && "ordinal" === scale.type && (extent = extent.slice(), fixExtentWithBands(extent, scale.count())), linearMap(data, normalizedExtent, extent, clamp)
            }, coordToData: function (coord, clamp) {
              var extent = this._extent, scale = this.scale;
              this.onBand && "ordinal" === scale.type && (extent = extent.slice(), fixExtentWithBands(extent, scale.count()));
              var t = linearMap(coord, extent, normalizedExtent, clamp);
              return this.scale.scale(t)
            }, pointToData: function (point, clamp) {
            }, getTicksCoords: function (alignWithLabel) {
              if (this.onBand && !alignWithLabel) {
                for (var bands = this.getBands(), coords = [], i = 0; i < bands.length; i++)coords.push(bands[i][0]);
                return bands[i - 1] && coords.push(bands[i - 1][1]), coords
              }
              return zrUtil.map(this.scale.getTicks(), this.dataToCoord, this)
            }, getLabelsCoords: function () {
              return zrUtil.map(this.scale.getTicks(), this.dataToCoord, this)
            }, getBands: function () {
              for (var extent = this.getExtent(), bands = [], len = this.scale.count(), start = extent[0], end = extent[1], span = end - start, i = 0; i < len; i++)bands.push([span * i / len + start, span * (i + 1) / len + start]);
              return bands
            }, getBandWidth: function () {
              var axisExtent = this._extent, dataExtent = this.scale.getExtent(),
                len = dataExtent[1] - dataExtent[0] + (this.onBand ? 1 : 0);
              0 === len && (len = 1);
              var size = Math.abs(axisExtent[1] - axisExtent[0]);
              return Math.abs(size) / len
            }
          }, Axis
        }), define("echarts/util/number", ["require"], function (require) {
          function _trim(str) {
            return str.replace(/^\s+/, "").replace(/\s+$/, "")
          }
          
          function quantityExponent(val) {
            return Math.floor(Math.log(val) / Math.LN10)
          }
          
          var number = {}, RADIAN_EPSILON = 1e-4;
          number.linearMap = function (val, domain, range, clamp) {
            var subDomain = domain[1] - domain[0], subRange = range[1] - range[0];
            if (0 === subDomain)return 0 === subRange ? range[0] : (range[0] + range[1]) / 2;
            if (clamp)if (subDomain > 0) {
              if (val <= domain[0])return range[0];
              if (val >= domain[1])return range[1]
            } else {
              if (val >= domain[0])return range[0];
              if (val <= domain[1])return range[1]
            } else {
              if (val === domain[0])return range[0];
              if (val === domain[1])return range[1]
            }
            return (val - domain[0]) / subDomain * subRange + range[0]
          }, number.parsePercent = function (percent, all) {
            switch (percent) {
              case"center":
              case"middle":
                percent = "50%";
                break;
              case"left":
              case"top":
                percent = "0%";
                break;
              case"right":
              case"bottom":
                percent = "100%"
            }
            return "string" == typeof percent ? _trim(percent).match(/%$/) ? parseFloat(percent) / 100 * all : parseFloat(percent) : null == percent ? NaN : +percent
          }, number.round = function (x, precision, returnStr) {
            return null == precision && (precision = 10), precision = Math.min(Math.max(0, precision), 20), x = (+x).toFixed(precision), returnStr ? x : +x
          }, number.asc = function (arr) {
            return arr.sort(function (a, b) {
              return a - b
            }), arr
          }, number.getPrecision = function (val) {
            if (val = +val, isNaN(val))return 0;
            for (var e = 1, count = 0; Math.round(val * e) / e !== val;)e *= 10, count++;
            return count
          }, number.getPrecisionSafe = function (val) {
            var str = val.toString(), eIndex = str.indexOf("e");
            if (eIndex > 0) {
              var precision = +str.slice(eIndex + 1);
              return precision < 0 ? -precision : 0
            }
            var dotIndex = str.indexOf(".");
            return dotIndex < 0 ? 0 : str.length - 1 - dotIndex
          }, number.getPixelPrecision = function (dataExtent, pixelExtent) {
            var log = Math.log, LN10 = Math.LN10, dataQuantity = Math.floor(log(dataExtent[1] - dataExtent[0]) / LN10),
              sizeQuantity = Math.round(log(Math.abs(pixelExtent[1] - pixelExtent[0])) / LN10),
              precision = Math.min(Math.max(-dataQuantity + sizeQuantity, 0), 20);
            return isFinite(precision) ? precision : 20
          }, number.MAX_SAFE_INTEGER = 9007199254740991, number.remRadian = function (radian) {
            var pi2 = 2 * Math.PI;
            return (radian % pi2 + pi2) % pi2
          }, number.isRadianAroundZero = function (val) {
            return val > -RADIAN_EPSILON && val < RADIAN_EPSILON
          };
          var TIME_REG = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
          return number.getTimezoneOffset = function () {
            return (new Date).getTimezoneOffset()
          }, number.parseDate = function (value) {
            if (value instanceof Date)return value;
            if ("string" == typeof value) {
              var match = TIME_REG.exec(value);
              if (!match)return new Date(NaN);
              var timezoneOffset = number.getTimezoneOffset(),
                timeOffset = match[8] ? "Z" === match[8].toUpperCase() ? timezoneOffset : 60 * +match[8].slice(0, 3) + timezoneOffset : 0;
              return new Date(+match[1], +(match[2] || 1) - 1, +match[3] || 1, +match[4] || 0, +(match[5] || 0) - timeOffset, +match[6] || 0, +match[7] || 0)
            }
            return null == value ? new Date(NaN) : new Date(Math.round(value))
          }, number.quantity = function (val) {
            return Math.pow(10, quantityExponent(val))
          }, number.nice = function (val, round) {
            var nf, exponent = quantityExponent(val), exp10 = Math.pow(10, exponent), f = val / exp10;
            return nf = round ? f < 1.5 ? 1 : f < 2.5 ? 2 : f < 4 ? 3 : f < 7 ? 5 : 10 : f < 1 ? 1 : f < 2 ? 2 : f < 3 ? 3 : f < 5 ? 5 : 10, val = nf * exp10, exponent >= -20 ? +val.toFixed(exponent < 0 ? -exponent : 0) : val
          }, number.reformIntervals = function (list) {
            function littleThan(a, b, lg) {
              return a.interval[lg] < b.interval[lg] || a.interval[lg] === b.interval[lg] && (a.close[lg] - b.close[lg] === (lg ? -1 : 1) || !lg && littleThan(a, b, 1))
            }
            
            list.sort(function (a, b) {
              return littleThan(a, b, 0) ? -1 : 1
            });
            for (var curr = -(1 / 0), currClose = 1, i = 0; i < list.length;) {
              for (var interval = list[i].interval, close = list[i].close, lg = 0; lg < 2; lg++)interval[lg] <= curr && (interval[lg] = curr, close[lg] = lg ? 1 : 1 - currClose), curr = interval[lg], currClose = close[lg];
              interval[0] === interval[1] && close[0] * close[1] !== 1 ? list.splice(i, 1) : i++
            }
            return list
          }, number.isNumeric = function (v) {
            return v - parseFloat(v) >= 0
          }, number
        }), define("echarts/util/format", ["require", "zrender/core/util", "./number", "zrender/contain/text"], function (require) {
          var zrUtil = require("zrender/core/util"), numberUtil = require("./number"),
            textContain = require("zrender/contain/text"), formatUtil = {};
          formatUtil.addCommas = function (x) {
            return isNaN(x) ? "-" : (x = (x + "").split("."), x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (x.length > 1 ? "." + x[1] : ""))
          }, formatUtil.toCamelCase = function (str, upperCaseFirst) {
            return str = (str || "").toLowerCase().replace(/-(.)/g, function (match, group1) {
              return group1.toUpperCase()
            }), upperCaseFirst && str && (str = str.charAt(0).toUpperCase() + str.slice(1)), str
          }, formatUtil.normalizeCssArray = function (val) {
            var len = val.length;
            return "number" == typeof val ? [val, val, val, val] : 2 === len ? [val[0], val[1], val[0], val[1]] : 3 === len ? [val[0], val[1], val[2], val[1]] : val
          };
          var encodeHTML = formatUtil.encodeHTML = function (source) {
            return String(source).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
          }, TPL_VAR_ALIAS = ["a", "b", "c", "d", "e", "f", "g"], wrapVar = function (varName, seriesIdx) {
            return "{" + varName + (null == seriesIdx ? "" : seriesIdx) + "}"
          };
          formatUtil.formatTpl = function (tpl, paramsList, encode) {
            zrUtil.isArray(paramsList) || (paramsList = [paramsList]);
            var seriesLen = paramsList.length;
            if (!seriesLen)return "";
            for (var $vars = paramsList[0].$vars || [], i = 0; i < $vars.length; i++) {
              var alias = TPL_VAR_ALIAS[i], val = wrapVar(alias, 0);
              tpl = tpl.replace(wrapVar(alias), encode ? encodeHTML(val) : val)
            }
            for (var seriesIdx = 0; seriesIdx < seriesLen; seriesIdx++)for (var k = 0; k < $vars.length; k++) {
              var val = paramsList[seriesIdx][$vars[k]];
              tpl = tpl.replace(wrapVar(TPL_VAR_ALIAS[k], seriesIdx), encode ? encodeHTML(val) : val)
            }
            return tpl
          }, formatUtil.formatTplSimple = function (tpl, param, encode) {
            return zrUtil.each(param, function (value, key) {
              tpl = tpl.replace("{" + key + "}", encode ? encodeHTML(value) : value)
            }), tpl
          };
          var s2d = function (str) {
            return str < 10 ? "0" + str : str
          };
          return formatUtil.formatTime = function (tpl, value, isUTC) {
            "week" !== tpl && "month" !== tpl && "quarter" !== tpl && "half-year" !== tpl && "year" !== tpl || (tpl = "MM-dd\nyyyy");
            var date = numberUtil.parseDate(value), utc = isUTC ? "UTC" : "", y = date["get" + utc + "FullYear"](),
              M = date["get" + utc + "Month"]() + 1, d = date["get" + utc + "Date"](),
              h = date["get" + utc + "Hours"](), m = date["get" + utc + "Minutes"](),
              s = date["get" + utc + "Seconds"]();
            return tpl = tpl.replace("MM", s2d(M)).toLowerCase().replace("yyyy", y).replace("yy", y % 100).replace("dd", s2d(d)).replace("d", d).replace("hh", s2d(h)).replace("h", h).replace("mm", s2d(m)).replace("m", m).replace("ss", s2d(s)).replace("s", s)
          }, formatUtil.capitalFirst = function (str) {
            return str ? str.charAt(0).toUpperCase() + str.substr(1) : str
          }, formatUtil.truncateText = textContain.truncateText, formatUtil
        }), define("echarts/data/List", ["require", "../model/Model", "./DataDiffer", "zrender/core/util", "../util/model"], function (require) {
          function normalizeDimensions(dimensions) {
            return zrUtil.isArray(dimensions) || (dimensions = [dimensions]), dimensions
          }
          
          function cloneListForMapAndSample(original, excludeDimensions) {
            var allDimensions = original.dimensions,
              list = new List(zrUtil.map(allDimensions, original.getDimensionInfo, original), original.hostModel);
            transferProperties(list, original);
            for (var storage = list._storage = {}, originalStorage = original._storage, i = 0; i < allDimensions.length; i++) {
              var dim = allDimensions[i], dimStore = originalStorage[dim];
              zrUtil.indexOf(excludeDimensions, dim) >= 0 ? storage[dim] = new dimStore.constructor(originalStorage[dim].length) : storage[dim] = originalStorage[dim]
            }
            return list
          }
          
          var UNDEFINED = "undefined", globalObj = "undefined" == typeof window ? global : window,
            Float64Array = _typeof(globalObj.Float64Array) === UNDEFINED ? Array : globalObj.Float64Array,
            Int32Array = _typeof(globalObj.Int32Array) === UNDEFINED ? Array : globalObj.Int32Array,
            dataCtors = {float: Float64Array, int: Int32Array, ordinal: Array, number: Array, time: Array},
            Model = require("../model/Model"), DataDiffer = require("./DataDiffer"),
            zrUtil = require("zrender/core/util"), modelUtil = require("../util/model"), isObject = zrUtil.isObject,
            TRANSFERABLE_PROPERTIES = ["stackedOn", "hasItemOption", "_nameList", "_idList", "_rawData"],
            transferProperties = function (a, b) {
              zrUtil.each(TRANSFERABLE_PROPERTIES.concat(b.__wrappedMethods || []), function (propName) {
                b.hasOwnProperty(propName) && (a[propName] = b[propName])
              }), a.__wrappedMethods = b.__wrappedMethods
            }, List = function (dimensions, hostModel) {
              dimensions = dimensions || ["x", "y"];
              for (var dimensionInfos = {}, dimensionNames = [], i = 0; i < dimensions.length; i++) {
                var dimensionName, dimensionInfo = {};
                "string" == typeof dimensions[i] ? (dimensionName = dimensions[i], dimensionInfo = {
                  name: dimensionName,
                  stackable: !1,
                  type: "number"
                }) : (dimensionInfo = dimensions[i], dimensionName = dimensionInfo.name, dimensionInfo.type = dimensionInfo.type || "number"), dimensionNames.push(dimensionName), dimensionInfos[dimensionName] = dimensionInfo
              }
              this.dimensions = dimensionNames, this._dimensionInfos = dimensionInfos, this.hostModel = hostModel, this.dataType, this.indices = [], this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this.stackedOn = null, this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._rawData, this._extent
            }, listProto = List.prototype;
          listProto.type = "list", listProto.hasItemOption = !0, listProto.getDimension = function (dim) {
            return isNaN(dim) || (dim = this.dimensions[dim] || dim), dim
          }, listProto.getDimensionInfo = function (dim) {
            return zrUtil.clone(this._dimensionInfos[this.getDimension(dim)])
          }, listProto.initData = function (data, nameList, dimValueGetter) {
            if (data = data || [], !zrUtil.isArray(data))throw new Error("Invalid data.");
            this._rawData = data;
            var storage = this._storage = {}, indices = this.indices = [], dimensions = this.dimensions,
              size = data.length, dimensionInfoMap = this._dimensionInfos, idList = [], nameRepeatCount = {};
            nameList = nameList || [];
            for (var i = 0; i < dimensions.length; i++) {
              var dimInfo = dimensionInfoMap[dimensions[i]], DataCtor = dataCtors[dimInfo.type];
              storage[dimensions[i]] = new DataCtor(size)
            }
            var self = this;
            dimValueGetter || (self.hasItemOption = !1), dimValueGetter = dimValueGetter || function (dataItem, dimName, dataIndex, dimIndex) {
                var value = modelUtil.getDataItemValue(dataItem);
                return modelUtil.isDataItemOption(dataItem) && (self.hasItemOption = !0), modelUtil.converDataValue(value instanceof Array ? value[dimIndex] : value, dimensionInfoMap[dimName])
              };
            for (var idx = 0; idx < data.length; idx++) {
              for (var dataItem = data[idx], k = 0; k < dimensions.length; k++) {
                var dim = dimensions[k], dimStorage = storage[dim];
                dimStorage[idx] = dimValueGetter(dataItem, dim, idx, k)
              }
              indices.push(idx)
            }
            for (var i = 0; i < data.length; i++) {
              nameList[i] || data[i] && null != data[i].name && (nameList[i] = data[i].name);
              var name = nameList[i] || "", id = data[i] && data[i].id;
              !id && name && (nameRepeatCount[name] = nameRepeatCount[name] || 0, id = name, nameRepeatCount[name] > 0 && (id += "__ec__" + nameRepeatCount[name]), nameRepeatCount[name]++), id && (idList[i] = id)
            }
            this._nameList = nameList, this._idList = idList
          }, listProto.count = function () {
            return this.indices.length
          }, listProto.get = function (dim, idx, stack) {
            var storage = this._storage, dataIndex = this.indices[idx];
            if (null == dataIndex)return NaN;
            var value = storage[dim] && storage[dim][dataIndex];
            if (stack) {
              var dimensionInfo = this._dimensionInfos[dim];
              if (dimensionInfo && dimensionInfo.stackable)for (var stackedOn = this.stackedOn; stackedOn;) {
                var stackedValue = stackedOn.get(dim, idx);
                (value >= 0 && stackedValue > 0 || value <= 0 && stackedValue < 0) && (value += stackedValue), stackedOn = stackedOn.stackedOn
              }
            }
            return value
          }, listProto.getValues = function (dimensions, idx, stack) {
            var values = [];
            zrUtil.isArray(dimensions) || (stack = idx, idx = dimensions, dimensions = this.dimensions);
            for (var i = 0, len = dimensions.length; i < len; i++)values.push(this.get(dimensions[i], idx, stack));
            return values
          }, listProto.hasValue = function (idx) {
            for (var dimensions = this.dimensions, dimensionInfos = this._dimensionInfos, i = 0, len = dimensions.length; i < len; i++)if ("ordinal" !== dimensionInfos[dimensions[i]].type && isNaN(this.get(dimensions[i], idx)))return !1;
            return !0
          }, listProto.getDataExtent = function (dim, stack, filter) {
            dim = this.getDimension(dim);
            var dimData = this._storage[dim], dimInfo = this.getDimensionInfo(dim);
            stack = dimInfo && dimInfo.stackable && stack;
            var value, dimExtent = (this._extent || (this._extent = {}))[dim + !!stack];
            if (dimExtent)return dimExtent;
            if (dimData) {
              for (var min = 1 / 0, max = -(1 / 0), i = 0, len = this.count(); i < len; i++)value = this.get(dim, i, stack), filter && !filter(value, dim, i) || (value < min && (min = value), value > max && (max = value));
              return this._extent[dim + !!stack] = [min, max]
            }
            return [1 / 0, -(1 / 0)]
          }, listProto.getSum = function (dim, stack) {
            var dimData = this._storage[dim], sum = 0;
            if (dimData)for (var i = 0, len = this.count(); i < len; i++) {
              var value = this.get(dim, i, stack);
              isNaN(value) || (sum += value)
            }
            return sum
          }, listProto.indexOf = function (dim, value) {
            var storage = this._storage, dimData = storage[dim], indices = this.indices;
            if (dimData)for (var i = 0, len = indices.length; i < len; i++) {
              var rawIndex = indices[i];
              if (dimData[rawIndex] === value)return i
            }
            return -1
          }, listProto.indexOfName = function (name) {
            for (var indices = this.indices, nameList = this._nameList, i = 0, len = indices.length; i < len; i++) {
              var rawIndex = indices[i];
              if (nameList[rawIndex] === name)return i
            }
            return -1
          }, listProto.indexOfRawIndex = function (rawIndex) {
            var indices = this.indices, rawDataIndex = indices[rawIndex];
            if (null != rawDataIndex && rawDataIndex === rawIndex)return rawIndex;
            for (var left = 0, right = indices.length - 1; left <= right;) {
              var mid = (left + right) / 2 | 0;
              if (indices[mid] < rawIndex) left = mid + 1; else {
                if (!(indices[mid] > rawIndex))return mid;
                right = mid - 1
              }
            }
            return -1
          }, listProto.indicesOfNearest = function (dim, value, stack, maxDistance) {
            var storage = this._storage, dimData = storage[dim], nearestIndices = [];
            if (!dimData)return nearestIndices;
            null == maxDistance && (maxDistance = 1 / 0);
            for (var minDist = Number.MAX_VALUE, minDiff = -1, i = 0, len = this.count(); i < len; i++) {
              var diff = value - this.get(dim, i, stack), dist = Math.abs(diff);
              diff <= maxDistance && dist <= minDist && ((dist < minDist || diff >= 0 && minDiff < 0) && (minDist = dist, minDiff = diff, nearestIndices.length = 0), nearestIndices.push(i))
            }
            return nearestIndices
          }, listProto.getRawIndex = function (idx) {
            var rawIdx = this.indices[idx];
            return null == rawIdx ? -1 : rawIdx
          }, listProto.getRawDataItem = function (idx) {
            return this._rawData[this.getRawIndex(idx)]
          }, listProto.getName = function (idx) {
            return this._nameList[this.indices[idx]] || ""
          }, listProto.getId = function (idx) {
            return this._idList[this.indices[idx]] || this.getRawIndex(idx) + ""
          }, listProto.each = function (dims, cb, stack, context) {
            "function" == typeof dims && (context = stack, stack = cb, cb = dims, dims = []), dims = zrUtil.map(normalizeDimensions(dims), this.getDimension, this);
            var value = [], dimSize = dims.length, indices = this.indices;
            context = context || this;
            for (var i = 0; i < indices.length; i++)switch (dimSize) {
              case 0:
                cb.call(context, i);
                break;
              case 1:
                cb.call(context, this.get(dims[0], i, stack), i);
                break;
              case 2:
                cb.call(context, this.get(dims[0], i, stack), this.get(dims[1], i, stack), i);
                break;
              default:
                for (var k = 0; k < dimSize; k++)value[k] = this.get(dims[k], i, stack);
                value[k] = i, cb.apply(context, value)
            }
          }, listProto.filterSelf = function (dimensions, cb, stack, context) {
            "function" == typeof dimensions && (context = stack, stack = cb, cb = dimensions, dimensions = []), dimensions = zrUtil.map(normalizeDimensions(dimensions), this.getDimension, this);
            var newIndices = [], value = [], dimSize = dimensions.length, indices = this.indices;
            context = context || this;
            for (var i = 0; i < indices.length; i++) {
              var keep;
              if (1 === dimSize) keep = cb.call(context, this.get(dimensions[0], i, stack), i); else {
                for (var k = 0; k < dimSize; k++)value[k] = this.get(dimensions[k], i, stack);
                value[k] = i, keep = cb.apply(context, value)
              }
              keep && newIndices.push(indices[i])
            }
            return this.indices = newIndices, this._extent = {}, this
          }, listProto.mapArray = function (dimensions, cb, stack, context) {
            "function" == typeof dimensions && (context = stack, stack = cb, cb = dimensions, dimensions = []);
            var result = [];
            return this.each(dimensions, function () {
              result.push(cb && cb.apply(this, arguments))
            }, stack, context), result
          }, listProto.map = function (dimensions, cb, stack, context) {
            dimensions = zrUtil.map(normalizeDimensions(dimensions), this.getDimension, this);
            var list = cloneListForMapAndSample(this, dimensions), indices = list.indices = this.indices,
              storage = list._storage, tmpRetValue = [];
            return this.each(dimensions, function () {
              var idx = arguments[arguments.length - 1], retValue = cb && cb.apply(this, arguments);
              if (null != retValue) {
                "number" == typeof retValue && (tmpRetValue[0] = retValue, retValue = tmpRetValue);
                for (var i = 0; i < retValue.length; i++) {
                  var dim = dimensions[i], dimStore = storage[dim], rawIdx = indices[idx];
                  dimStore && (dimStore[rawIdx] = retValue[i])
                }
              }
            }, stack, context), list
          }, listProto.downSample = function (dimension, rate, sampleValue, sampleIndex) {
            for (var list = cloneListForMapAndSample(this, [dimension]), storage = this._storage, targetStorage = list._storage, originalIndices = this.indices, indices = list.indices = [], frameValues = [], frameIndices = [], frameSize = Math.floor(1 / rate), dimStore = targetStorage[dimension], len = this.count(), i = 0; i < storage[dimension].length; i++)targetStorage[dimension][i] = storage[dimension][i];
            for (var i = 0; i < len; i += frameSize) {
              frameSize > len - i && (frameSize = len - i, frameValues.length = frameSize);
              for (var k = 0; k < frameSize; k++) {
                var idx = originalIndices[i + k];
                frameValues[k] = dimStore[idx], frameIndices[k] = idx
              }
              var value = sampleValue(frameValues), idx = frameIndices[sampleIndex(frameValues, value) || 0];
              dimStore[idx] = value, indices.push(idx)
            }
            return list
          }, listProto.getItemModel = function (idx) {
            var hostModel = this.hostModel;
            return idx = this.indices[idx], new Model(this._rawData[idx], hostModel, hostModel && hostModel.ecModel)
          }, listProto.diff = function (otherList) {
            var val, idList = this._idList, otherIdList = otherList && otherList._idList, prefix = "e\0\0";
            return new DataDiffer(otherList ? otherList.indices : [], this.indices, function (idx) {
              return null != (val = otherIdList[idx]) ? val : prefix + idx
            }, function (idx) {
              return null != (val = idList[idx]) ? val : prefix + idx
            })
          }, listProto.getVisual = function (key) {
            var visual = this._visual;
            return visual && visual[key]
          }, listProto.setVisual = function (key, val) {
            if (isObject(key))for (var name in key)key.hasOwnProperty(name) && this.setVisual(name, key[name]); else this._visual = this._visual || {}, this._visual[key] = val
          }, listProto.setLayout = function (key, val) {
            if (isObject(key))for (var name in key)key.hasOwnProperty(name) && this.setLayout(name, key[name]); else this._layout[key] = val
          }, listProto.getLayout = function (key) {
            return this._layout[key]
          }, listProto.getItemLayout = function (idx) {
            return this._itemLayouts[idx]
          }, listProto.setItemLayout = function (idx, layout, merge) {
            this._itemLayouts[idx] = merge ? zrUtil.extend(this._itemLayouts[idx] || {}, layout) : layout
          }, listProto.clearItemLayouts = function () {
            this._itemLayouts.length = 0
          }, listProto.getItemVisual = function (idx, key, ignoreParent) {
            var itemVisual = this._itemVisuals[idx], val = itemVisual && itemVisual[key];
            return null != val || ignoreParent ? val : this.getVisual(key)
          }, listProto.setItemVisual = function (idx, key, value) {
            var itemVisual = this._itemVisuals[idx] || {};
            if (this._itemVisuals[idx] = itemVisual, isObject(key))for (var name in key)key.hasOwnProperty(name) && (itemVisual[name] = key[name]); else itemVisual[key] = value
          }, listProto.clearAllVisual = function () {
            this._visual = {}, this._itemVisuals = []
          };
          var setItemDataAndSeriesIndex = function (child) {
            child.seriesIndex = this.seriesIndex, child.dataIndex = this.dataIndex, child.dataType = this.dataType
          };
          return listProto.setItemGraphicEl = function (idx, el) {
            var hostModel = this.hostModel;
            el && (el.dataIndex = idx, el.dataType = this.dataType, el.seriesIndex = hostModel && hostModel.seriesIndex, "group" === el.type && el.traverse(setItemDataAndSeriesIndex, el)), this._graphicEls[idx] = el
          }, listProto.getItemGraphicEl = function (idx) {
            return this._graphicEls[idx]
          }, listProto.eachItemGraphicEl = function (cb, context) {
            zrUtil.each(this._graphicEls, function (el, idx) {
              el && cb && cb.call(context, el, idx)
            })
          }, listProto.cloneShallow = function () {
            var dimensionInfoList = zrUtil.map(this.dimensions, this.getDimensionInfo, this),
              list = new List(dimensionInfoList, this.hostModel);
            return list._storage = this._storage, transferProperties(list, this), list.indices = this.indices.slice(), this._extent && (list._extent = zrUtil.extend({}, this._extent)), list
          }, listProto.wrapMethod = function (methodName, injectFunction) {
            var originalMethod = this[methodName];
            "function" == typeof originalMethod && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(methodName), this[methodName] = function () {
              var res = originalMethod.apply(this, arguments);
              return injectFunction.apply(this, [res].concat(zrUtil.slice(arguments)))
            })
          }, listProto.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], listProto.CHANGABLE_METHODS = ["filterSelf"], List
        }), define("zrender/core/matrix", [], function () {
          var ArrayCtor = "undefined" == typeof Float32Array ? Array : Float32Array, matrix = {
            create: function () {
              var out = new ArrayCtor(6);
              return matrix.identity(out), out
            }, identity: function (out) {
              return out[0] = 1, out[1] = 0, out[2] = 0, out[3] = 1, out[4] = 0, out[5] = 0, out
            }, copy: function (out, m) {
              return out[0] = m[0], out[1] = m[1], out[2] = m[2], out[3] = m[3], out[4] = m[4], out[5] = m[5], out
            }, mul: function (out, m1, m2) {
              var out0 = m1[0] * m2[0] + m1[2] * m2[1], out1 = m1[1] * m2[0] + m1[3] * m2[1],
                out2 = m1[0] * m2[2] + m1[2] * m2[3], out3 = m1[1] * m2[2] + m1[3] * m2[3],
                out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4], out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
              return out[0] = out0, out[1] = out1, out[2] = out2, out[3] = out3, out[4] = out4, out[5] = out5, out
            }, translate: function (out, a, v) {
              return out[0] = a[0], out[1] = a[1], out[2] = a[2], out[3] = a[3], out[4] = a[4] + v[0], out[5] = a[5] + v[1], out
            }, rotate: function (out, a, rad) {
              var aa = a[0], ac = a[2], atx = a[4], ab = a[1], ad = a[3], aty = a[5], st = Math.sin(rad),
                ct = Math.cos(rad);
              return out[0] = aa * ct + ab * st, out[1] = -aa * st + ab * ct, out[2] = ac * ct + ad * st, out[3] = -ac * st + ct * ad, out[4] = ct * atx + st * aty, out[5] = ct * aty - st * atx, out
            }, scale: function (out, a, v) {
              var vx = v[0], vy = v[1];
              return out[0] = a[0] * vx, out[1] = a[1] * vy, out[2] = a[2] * vx, out[3] = a[3] * vy, out[4] = a[4] * vx, out[5] = a[5] * vy, out
            }, invert: function (out, a) {
              var aa = a[0], ac = a[2], atx = a[4], ab = a[1], ad = a[3], aty = a[5], det = aa * ad - ab * ac;
              return det ? (det = 1 / det, out[0] = ad * det, out[1] = -ab * det, out[2] = -ac * det, out[3] = aa * det, out[4] = (ac * aty - ad * atx) * det, out[5] = (ab * atx - aa * aty) * det, out) : null
            }
          };
          return matrix
        }), define("echarts/helper", ["require", "./chart/helper/createListFromArray", "./util/symbol", "./coord/axisHelper", "./coord/axisModelCommonMixin", "./model/Model", "zrender/core/util", "./data/helper/completeDimensions"], function (require) {
          var createListFromArray = require("./chart/helper/createListFromArray"),
            symbolUtil = require("./util/symbol"), axisHelper = require("./coord/axisHelper"),
            axisModelCommonMixin = require("./coord/axisModelCommonMixin"), Model = require("./model/Model"),
            util = require("zrender/core/util");
          return {
            createList: function (seriesModel) {
              var data = seriesModel.get("data");
              return createListFromArray(data, seriesModel, seriesModel.ecModel)
            },
            completeDimensions: require("./data/helper/completeDimensions"),
            createSymbol: symbolUtil.createSymbol,
            createScale: function (dataExtent, option) {
              var axisModel = option;
              option instanceof Model || (axisModel = new Model(option), util.mixin(axisModel, axisModelCommonMixin));
              var scale = axisHelper.createScaleByModel(axisModel);
              return scale.setExtent(dataExtent[0], dataExtent[1]), axisHelper.niceScaleExtent(scale, axisModel), scale
            },
            mixinAxisModelCommonMethods: function (Model) {
              util.mixin(Model, axisModelCommonMixin)
            }
          }
        }), define("zrender/core/vector", [], function () {
          var ArrayCtor = "undefined" == typeof Float32Array ? Array : Float32Array, vector = {
            create: function (x, y) {
              var out = new ArrayCtor(2);
              return null == x && (x = 0), null == y && (y = 0), out[0] = x, out[1] = y, out
            }, copy: function (out, v) {
              return out[0] = v[0], out[1] = v[1], out
            }, clone: function (v) {
              var out = new ArrayCtor(2);
              return out[0] = v[0], out[1] = v[1], out
            }, set: function (out, a, b) {
              return out[0] = a, out[1] = b, out
            }, add: function (out, v1, v2) {
              return out[0] = v1[0] + v2[0], out[1] = v1[1] + v2[1], out
            }, scaleAndAdd: function (out, v1, v2, a) {
              return out[0] = v1[0] + v2[0] * a, out[1] = v1[1] + v2[1] * a, out
            }, sub: function (out, v1, v2) {
              return out[0] = v1[0] - v2[0], out[1] = v1[1] - v2[1], out
            }, len: function (v) {
              return Math.sqrt(this.lenSquare(v))
            }, lenSquare: function (v) {
              return v[0] * v[0] + v[1] * v[1]
            }, mul: function (out, v1, v2) {
              return out[0] = v1[0] * v2[0], out[1] = v1[1] * v2[1], out
            }, div: function (out, v1, v2) {
              return out[0] = v1[0] / v2[0], out[1] = v1[1] / v2[1], out
            }, dot: function (v1, v2) {
              return v1[0] * v2[0] + v1[1] * v2[1]
            }, scale: function (out, v, s) {
              return out[0] = v[0] * s, out[1] = v[1] * s, out
            }, normalize: function (out, v) {
              var d = vector.len(v);
              return 0 === d ? (out[0] = 0, out[1] = 0) : (out[0] = v[0] / d, out[1] = v[1] / d), out
            }, distance: function (v1, v2) {
              return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]))
            }, distanceSquare: function (v1, v2) {
              return (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1])
            }, negate: function (out, v) {
              return out[0] = -v[0], out[1] = -v[1], out
            }, lerp: function (out, v1, v2, t) {
              return out[0] = v1[0] + t * (v2[0] - v1[0]), out[1] = v1[1] + t * (v2[1] - v1[1]), out
            }, applyTransform: function (out, v, m) {
              var x = v[0], y = v[1];
              return out[0] = m[0] * x + m[2] * y + m[4], out[1] = m[1] * x + m[3] * y + m[5], out
            }, min: function (out, v1, v2) {
              return out[0] = Math.min(v1[0], v2[0]), out[1] = Math.min(v1[1], v2[1]), out
            }, max: function (out, v1, v2) {
              return out[0] = Math.max(v1[0], v2[0]), out[1] = Math.max(v1[1], v2[1]), out
            }
          };
          return vector.length = vector.len, vector.lengthSquare = vector.lenSquare, vector.dist = vector.distance, vector.distSquare = vector.distanceSquare, vector
        }), define("echarts/util/layout", ["require", "zrender/core/util", "zrender/core/BoundingRect", "./number", "./format"], function (require) {
          function boxLayout(orient, group, gap, maxWidth, maxHeight) {
            var x = 0, y = 0;
            null == maxWidth && (maxWidth = 1 / 0), null == maxHeight && (maxHeight = 1 / 0);
            var currentLineMaxSize = 0;
            group.eachChild(function (child, idx) {
              var nextX, nextY, position = child.position, rect = child.getBoundingRect(),
                nextChild = group.childAt(idx + 1), nextChildRect = nextChild && nextChild.getBoundingRect();
              if ("horizontal" === orient) {
                var moveX = rect.width + (nextChildRect ? -nextChildRect.x + rect.x : 0);
                nextX = x + moveX, nextX > maxWidth || child.newline ? (x = 0, nextX = moveX, y += currentLineMaxSize + gap, currentLineMaxSize = rect.height) : currentLineMaxSize = Math.max(currentLineMaxSize, rect.height)
              } else {
                var moveY = rect.height + (nextChildRect ? -nextChildRect.y + rect.y : 0);
                nextY = y + moveY, nextY > maxHeight || child.newline ? (x += currentLineMaxSize + gap, y = 0, nextY = moveY, currentLineMaxSize = rect.width) : currentLineMaxSize = Math.max(currentLineMaxSize, rect.width)
              }
              child.newline || (position[0] = x, position[1] = y, "horizontal" === orient ? x = nextX + gap : y = nextY + gap)
            })
          }
          
          var zrUtil = require("zrender/core/util"), BoundingRect = require("zrender/core/BoundingRect"),
            numberUtil = require("./number"), formatUtil = require("./format"), parsePercent = numberUtil.parsePercent,
            each = zrUtil.each, layout = {},
            LOCATION_PARAMS = layout.LOCATION_PARAMS = ["left", "right", "top", "bottom", "width", "height"],
            HV_NAMES = layout.HV_NAMES = [["width", "left", "right"], ["height", "top", "bottom"]];
          return layout.box = boxLayout, layout.vbox = zrUtil.curry(boxLayout, "vertical"), layout.hbox = zrUtil.curry(boxLayout, "horizontal"), layout.getAvailableSize = function (positionInfo, containerRect, margin) {
            var containerWidth = containerRect.width, containerHeight = containerRect.height,
              x = parsePercent(positionInfo.x, containerWidth), y = parsePercent(positionInfo.y, containerHeight),
              x2 = parsePercent(positionInfo.x2, containerWidth), y2 = parsePercent(positionInfo.y2, containerHeight);
            return (isNaN(x) || isNaN(parseFloat(positionInfo.x))) && (x = 0), (isNaN(x2) || isNaN(parseFloat(positionInfo.x2))) && (x2 = containerWidth), (isNaN(y) || isNaN(parseFloat(positionInfo.y))) && (y = 0), (isNaN(y2) || isNaN(parseFloat(positionInfo.y2))) && (y2 = containerHeight), margin = formatUtil.normalizeCssArray(margin || 0), {
              width: Math.max(x2 - x - margin[1] - margin[3], 0),
              height: Math.max(y2 - y - margin[0] - margin[2], 0)
            }
          }, layout.getLayoutRect = function (positionInfo, containerRect, margin) {
            margin = formatUtil.normalizeCssArray(margin || 0);
            var containerWidth = containerRect.width, containerHeight = containerRect.height,
              left = parsePercent(positionInfo.left, containerWidth),
              top = parsePercent(positionInfo.top, containerHeight),
              right = parsePercent(positionInfo.right, containerWidth),
              bottom = parsePercent(positionInfo.bottom, containerHeight),
              width = parsePercent(positionInfo.width, containerWidth),
              height = parsePercent(positionInfo.height, containerHeight), verticalMargin = margin[2] + margin[0],
              horizontalMargin = margin[1] + margin[3], aspect = positionInfo.aspect;
            switch (isNaN(width) && (width = containerWidth - right - horizontalMargin - left), isNaN(height) && (height = containerHeight - bottom - verticalMargin - top), isNaN(width) && isNaN(height) && (aspect > containerWidth / containerHeight ? width = .8 * containerWidth : height = .8 * containerHeight), null != aspect && (isNaN(width) && (width = aspect * height), isNaN(height) && (height = width / aspect)), isNaN(left) && (left = containerWidth - right - width - horizontalMargin), isNaN(top) && (top = containerHeight - bottom - height - verticalMargin), positionInfo.left || positionInfo.right) {
              case"center":
                left = containerWidth / 2 - width / 2 - margin[3];
                break;
              case"right":
                left = containerWidth - width - horizontalMargin
            }
            switch (positionInfo.top || positionInfo.bottom) {
              case"middle":
              case"center":
                top = containerHeight / 2 - height / 2 - margin[0];
                break;
              case"bottom":
                top = containerHeight - height - verticalMargin
            }
            left = left || 0, top = top || 0, isNaN(width) && (width = containerWidth - left - (right || 0)),
            isNaN(height) && (height = containerHeight - top - (bottom || 0));
            var rect = new BoundingRect(left + margin[3], top + margin[0], width, height);
            return rect.margin = margin, rect
          }, layout.positionElement = function (el, positionInfo, containerRect, margin, opt) {
            var h = !opt || !opt.hv || opt.hv[0], v = !opt || !opt.hv || opt.hv[1],
              boundingMode = opt && opt.boundingMode || "all";
            if (h || v) {
              var rect;
              if ("raw" === boundingMode) rect = "group" === el.type ? new BoundingRect(0, 0, +positionInfo.width || 0, +positionInfo.height || 0) : el.getBoundingRect(); else if (rect = el.getBoundingRect(), el.needLocalTransform()) {
                var transform = el.getLocalTransform();
                rect = rect.clone(), rect.applyTransform(transform)
              }
              positionInfo = layout.getLayoutRect(zrUtil.defaults({
                width: rect.width,
                height: rect.height
              }, positionInfo), containerRect, margin);
              var elPos = el.position, dx = h ? positionInfo.x - rect.x : 0, dy = v ? positionInfo.y - rect.y : 0;
              el.attr("position", "raw" === boundingMode ? [dx, dy] : [elPos[0] + dx, elPos[1] + dy])
            }
          }, layout.sizeCalculable = function (option, hvIdx) {
            return null != option[HV_NAMES[hvIdx][0]] || null != option[HV_NAMES[hvIdx][1]] && null != option[HV_NAMES[hvIdx][2]]
          }, layout.mergeLayoutParam = function (targetOption, newOption, opt) {
            function merge(names, hvIdx) {
              var newParams = {}, newValueCount = 0, merged = {}, mergedValueCount = 0, enoughParamNumber = 2;
              if (each(names, function (name) {
                  merged[name] = targetOption[name]
                }), each(names, function (name) {
                  hasProp(newOption, name) && (newParams[name] = merged[name] = newOption[name]), hasValue(newParams, name) && newValueCount++, hasValue(merged, name) && mergedValueCount++
                }), ignoreSize[hvIdx])return hasValue(newOption, names[1]) ? merged[names[2]] = null : hasValue(newOption, names[2]) && (merged[names[1]] = null), merged;
              if (mergedValueCount !== enoughParamNumber && newValueCount) {
                if (newValueCount >= enoughParamNumber)return newParams;
                for (var i = 0; i < names.length; i++) {
                  var name = names[i];
                  if (!hasProp(newParams, name) && hasProp(targetOption, name)) {
                    newParams[name] = targetOption[name];
                    break
                  }
                }
                return newParams
              }
              return merged
            }
            
            function hasProp(obj, name) {
              return obj.hasOwnProperty(name)
            }
            
            function hasValue(obj, name) {
              return null != obj[name] && "auto" !== obj[name]
            }
            
            function copy(names, target, source) {
              each(names, function (name) {
                target[name] = source[name]
              })
            }
            
            !zrUtil.isObject(opt) && (opt = {});
            var ignoreSize = opt.ignoreSize;
            !zrUtil.isArray(ignoreSize) && (ignoreSize = [ignoreSize, ignoreSize]);
            var hResult = merge(HV_NAMES[0], 0), vResult = merge(HV_NAMES[1], 1);
            copy(HV_NAMES[0], targetOption, hResult), copy(HV_NAMES[1], targetOption, vResult)
          }, layout.getLayoutParams = function (source) {
            return layout.copyLayoutParams({}, source)
          }, layout.copyLayoutParams = function (target, source) {
            return source && target && each(LOCATION_PARAMS, function (name) {
              source.hasOwnProperty(name) && (target[name] = source[name])
            }), target
          }, layout
        }), define("echarts/component/legend/LegendModel", ["require", "zrender/core/util", "../../model/Model", "../../echarts"], function (require) {
          var zrUtil = require("zrender/core/util"), Model = require("../../model/Model"),
            LegendModel = require("../../echarts").extendComponentModel({
              type: "legend",
              dependencies: ["series"],
              layoutMode: {type: "box", ignoreSize: !0},
              init: function (option, parentModel, ecModel) {
                this.mergeDefaultAndTheme(option, ecModel), option.selected = option.selected || {}
              },
              mergeOption: function (option) {
                LegendModel.superCall(this, "mergeOption", option)
              },
              optionUpdated: function () {
                this._updateData(this.ecModel);
                var legendData = this._data;
                if (legendData[0] && "single" === this.get("selectedMode")) {
                  for (var hasSelected = !1, i = 0; i < legendData.length; i++) {
                    var name = legendData[i].get("name");
                    if (this.isSelected(name)) {
                      this.select(name), hasSelected = !0;
                      break
                    }
                  }
                  !hasSelected && this.select(legendData[0].get("name"))
                }
              },
              _updateData: function (ecModel) {
                var legendData = zrUtil.map(this.get("data") || [], function (dataItem) {
                  return "string" != typeof dataItem && "number" != typeof dataItem || (dataItem = {name: dataItem}), new Model(dataItem, this, this.ecModel)
                }, this);
                this._data = legendData;
                var availableNames = zrUtil.map(ecModel.getSeries(), function (series) {
                  return series.name
                });
                ecModel.eachSeries(function (seriesModel) {
                  if (seriesModel.legendDataProvider) {
                    var data = seriesModel.legendDataProvider();
                    availableNames = availableNames.concat(data.mapArray(data.getName))
                  }
                }), this._availableNames = availableNames
              },
              getData: function () {
                return this._data
              },
              select: function (name) {
                var selected = this.option.selected, selectedMode = this.get("selectedMode");
                if ("single" === selectedMode) {
                  var data = this._data;
                  zrUtil.each(data, function (dataItem) {
                    selected[dataItem.get("name")] = !1
                  })
                }
                selected[name] = !0
              },
              unSelect: function (name) {
                "single" !== this.get("selectedMode") && (this.option.selected[name] = !1)
              },
              toggleSelected: function (name) {
                var selected = this.option.selected;
                selected.hasOwnProperty(name) || (selected[name] = !0), this[selected[name] ? "unSelect" : "select"](name)
              },
              isSelected: function (name) {
                var selected = this.option.selected;
                return !(selected.hasOwnProperty(name) && !selected[name]) && zrUtil.indexOf(this._availableNames, name) >= 0
              },
              defaultOption: {
                zlevel: 0,
                z: 4,
                show: !0,
                orient: "horizontal",
                left: "center",
                top: "top",
                align: "auto",
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "#ccc",
                borderWidth: 0,
                padding: 5,
                itemGap: 10,
                itemWidth: 25,
                itemHeight: 14,
                inactiveColor: "#ccc",
                textStyle: {color: "#333"},
                selectedMode: !0,
                tooltip: {show: !1}
              }
            });
          return LegendModel
        }), define("echarts/component/legend/legendAction", ["require", "../../echarts", "zrender/core/util"], function (require) {
          function legendSelectActionHandler(methodName, payload, ecModel) {
            var isSelected, selectedMap = {}, isToggleSelect = "toggleSelected" === methodName;
            return ecModel.eachComponent("legend", function (legendModel) {
              isToggleSelect && null != isSelected ? legendModel[isSelected ? "select" : "unSelect"](payload.name) : (legendModel[methodName](payload.name), isSelected = legendModel.isSelected(payload.name));
              var legendData = legendModel.getData();
              zrUtil.each(legendData, function (model) {
                var name = model.get("name");
                if ("\n" !== name && "" !== name) {
                  var isItemSelected = legendModel.isSelected(name);
                  name in selectedMap ? selectedMap[name] = selectedMap[name] && isItemSelected : selectedMap[name] = isItemSelected
                }
              })
            }), {name: payload.name, selected: selectedMap}
          }
          
          var echarts = require("../../echarts"), zrUtil = require("zrender/core/util");
          echarts.registerAction("legendToggleSelect", "legendselectchanged", zrUtil.curry(legendSelectActionHandler, "toggleSelected")), echarts.registerAction("legendSelect", "legendselected", zrUtil.curry(legendSelectActionHandler, "select")), echarts.registerAction("legendUnSelect", "legendunselected", zrUtil.curry(legendSelectActionHandler, "unSelect"))
        }), define("echarts/component/legend/LegendView", ["require", "zrender/core/util", "../../util/symbol", "../../util/graphic", "../helper/listComponent", "../../echarts"], function (require) {
          function dispatchSelectAction(name, api) {
            api.dispatchAction({type: "legendToggleSelect", name: name})
          }
          
          function dispatchHighlightAction(seriesModel, dataName, api) {
            var el = api.getZr().storage.getDisplayList()[0];
            el && el.useHoverLayer || seriesModel.get("legendHoverLink") && api.dispatchAction({
              type: "highlight",
              seriesName: seriesModel.name,
              name: dataName
            })
          }
          
          function dispatchDownplayAction(seriesModel, dataName, api) {
            var el = api.getZr().storage.getDisplayList()[0];
            el && el.useHoverLayer || seriesModel.get("legendHoverLink") && api.dispatchAction({
              type: "downplay",
              seriesName: seriesModel.name,
              name: dataName
            })
          }
          
          var zrUtil = require("zrender/core/util"), symbolCreator = require("../../util/symbol"),
            graphic = require("../../util/graphic"), listComponentHelper = require("../helper/listComponent"),
            curry = zrUtil.curry;
          return require("../../echarts").extendComponentView({
            type: "legend",
            init: function () {
              this._symbolTypeStore = {}
            },
            render: function (legendModel, ecModel, api) {
              var group = this.group;
              if (group.removeAll(), legendModel.get("show")) {
                var selectMode = legendModel.get("selectedMode"), itemAlign = legendModel.get("align");
                "auto" === itemAlign && (itemAlign = "right" === legendModel.get("left") && "vertical" === legendModel.get("orient") ? "right" : "left");
                var legendDrawedMap = {};
                zrUtil.each(legendModel.getData(), function (itemModel) {
                  var name = itemModel.get("name");
                  if ("" === name || "\n" === name)return void group.add(new graphic.Group({newline: !0}));
                  var seriesModel = ecModel.getSeriesByName(name)[0];
                  if (!legendDrawedMap[name]) {
                    if (seriesModel) {
                      var data = seriesModel.getData(), color = data.getVisual("color");
                      "function" == typeof color && (color = color(seriesModel.getDataParams(0)));
                      var legendSymbolType = data.getVisual("legendSymbol") || "roundRect",
                        symbolType = data.getVisual("symbol"),
                        itemGroup = this._createItem(name, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, selectMode);
                      itemGroup.on("click", curry(dispatchSelectAction, name, api)).on("mouseover", curry(dispatchHighlightAction, seriesModel, null, api)).on("mouseout", curry(dispatchDownplayAction, seriesModel, null, api)), legendDrawedMap[name] = !0
                    } else ecModel.eachRawSeries(function (seriesModel) {
                      if (!legendDrawedMap[name] && seriesModel.legendDataProvider) {
                        var data = seriesModel.legendDataProvider(), idx = data.indexOfName(name);
                        if (idx < 0)return;
                        var color = data.getItemVisual(idx, "color"), legendSymbolType = "roundRect",
                          itemGroup = this._createItem(name, itemModel, legendModel, legendSymbolType, null, itemAlign, color, selectMode);
                        itemGroup.on("click", curry(dispatchSelectAction, name, api)).on("mouseover", curry(dispatchHighlightAction, seriesModel, name, api)).on("mouseout", curry(dispatchDownplayAction, seriesModel, name, api)), legendDrawedMap[name] = !0
                      }
                    }, this);
                    !legendDrawedMap[name]
                  }
                }, this), listComponentHelper.layout(group, legendModel, api), listComponentHelper.addBackground(group, legendModel)
              }
            },
            _createItem: function (name, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, selectMode) {
              var itemWidth = legendModel.get("itemWidth"), itemHeight = legendModel.get("itemHeight"),
                inactiveColor = legendModel.get("inactiveColor"), isSelected = legendModel.isSelected(name),
                itemGroup = new graphic.Group, textStyleModel = itemModel.getModel("textStyle"),
                itemIcon = itemModel.get("icon"), tooltipModel = itemModel.getModel("tooltip"),
                legendGlobalTooltipModel = tooltipModel.parentModel;
              if (legendSymbolType = itemIcon || legendSymbolType, itemGroup.add(symbolCreator.createSymbol(legendSymbolType, 0, 0, itemWidth, itemHeight, isSelected ? color : inactiveColor)), !itemIcon && symbolType && (symbolType !== legendSymbolType || "none" == symbolType)) {
                var size = .8 * itemHeight;
                "none" === symbolType && (symbolType = "circle"), itemGroup.add(symbolCreator.createSymbol(symbolType, (itemWidth - size) / 2, (itemHeight - size) / 2, size, size, isSelected ? color : inactiveColor))
              }
              var textX = "left" === itemAlign ? itemWidth + 5 : -5, textAlign = itemAlign,
                formatter = legendModel.get("formatter"), content = name;
              "string" == typeof formatter && formatter ? content = formatter.replace("{name}", null != name ? name : "") : "function" == typeof formatter && (content = formatter(name));
              var text = new graphic.Text({
                style: {
                  text: content,
                  x: textX,
                  y: itemHeight / 2,
                  fill: isSelected ? textStyleModel.getTextColor() : inactiveColor,
                  textFont: textStyleModel.getFont(),
                  textAlign: textAlign,
                  textVerticalAlign: "middle"
                }
              });
              itemGroup.add(text);
              var hitRect = new graphic.Rect({
                shape: itemGroup.getBoundingRect(),
                invisible: !0,
                tooltip: tooltipModel.get("show") ? zrUtil.extend({
                  content: name,
                  formatter: legendGlobalTooltipModel.get("formatter", !0) || function () {
                    return name
                  },
                  formatterParams: {
                    componentType: "legend",
                    legendIndex: legendModel.componentIndex,
                    name: name,
                    $vars: ["name"]
                  }
                }, tooltipModel.option) : null
              });
              return itemGroup.add(hitRect), itemGroup.eachChild(function (child) {
                child.silent = !0
              }), hitRect.silent = !selectMode, this.group.add(itemGroup), graphic.setHoverStyle(itemGroup), itemGroup
            }
          })
        }), define("echarts/component/axisPointer", ["require", "../echarts", "./axisPointer/modelHelper", "./axisPointer/axisTrigger", "zrender/core/util", "./axisPointer/AxisPointerModel", "./axisPointer/AxisPointerView", "./axisPointer/CartesianAxisPointer"], function (require) {
          var echarts = require("../echarts"), axisPointerModelHelper = require("./axisPointer/modelHelper"),
            axisTrigger = require("./axisPointer/axisTrigger"), zrUtil = require("zrender/core/util");
          require("./axisPointer/AxisPointerModel"), require("./axisPointer/AxisPointerView"), require("./axisPointer/CartesianAxisPointer"), echarts.registerPreprocessor(function (option) {
            if (option) {
              (!option.axisPointer || 0 === option.axisPointer.length) && (option.axisPointer = {});
              var link = option.axisPointer.link;
              link && !zrUtil.isArray(link) && (option.axisPointer.link = [link])
            }
          }), echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, function (ecModel, api) {
            ecModel.getComponent("axisPointer").coordSysAxesInfo = axisPointerModelHelper.collect(ecModel, api)
          }), echarts.registerAction({
            type: "updateAxisPointer",
            event: "updateAxisPointer",
            update: ":updateAxisPointer"
          }, function (payload, ecModel, api) {
            var outputFinder = axisTrigger(ecModel.getComponent("axisPointer").coordSysAxesInfo, payload.currTrigger, [payload.x, payload.y], payload, payload.dispatchAction || zrUtil.bind(api.dispatchAction, api), ecModel, api, payload.tooltipOption, payload.highDownKey);
            return outputFinder
          })
        }), define("echarts/component/legend/legendFilter", [], function () {
          return function (ecModel) {
            var legendModels = ecModel.findComponents({mainType: "legend"});
            legendModels && legendModels.length && ecModel.filterSeries(function (series) {
              for (var i = 0; i < legendModels.length; i++)if (!legendModels[i].isSelected(series.name))return !1;
              return !0
            })
          }
        }), define("echarts/component/tooltip/TooltipModel", ["require", "../../echarts"], function (require) {
          require("../../echarts").extendComponentModel({
            type: "tooltip",
            dependencies: ["axisPointer"],
            defaultOption: {
              zlevel: 0,
              z: 8,
              show: !0,
              showContent: !0,
              trigger: "item",
              triggerOn: "mousemove|click",
              alwaysShowContent: !1,
              displayMode: "single",
              confine: !1,
              showDelay: 0,
              hideDelay: 100,
              transitionDuration: .4,
              enterable: !1,
              backgroundColor: "rgba(50,50,50,0.7)",
              borderColor: "#333",
              borderRadius: 4,
              borderWidth: 0,
              padding: 5,
              extraCssText: "",
              axisPointer: {
                type: "line",
                axis: "auto",
                animation: "auto",
                animationDurationUpdate: 200,
                animationEasingUpdate: "exponentialOut",
                crossStyle: {color: "#999", width: 1, type: "dashed", textStyle: {}}
              },
              textStyle: {color: "#fff", fontSize: 14}
            }
          })
        }), define("echarts/component/tooltip/TooltipView", ["require", "./TooltipContent", "zrender/core/util", "../../util/format", "../../util/number", "../../util/graphic", "../axisPointer/findPointFromSeries", "../../util/layout", "zrender/core/env", "../../model/Model", "../axisPointer/globalListener", "../../coord/axisHelper", "../axisPointer/viewHelper", "../../echarts"], function (require) {
          function buildTooltipModel(modelCascade) {
            for (var resultModel = modelCascade.pop(); modelCascade.length;) {
              var tooltipOpt = modelCascade.pop();
              tooltipOpt && (tooltipOpt instanceof Model && (tooltipOpt = tooltipOpt.get("tooltip", !0)), "string" == typeof tooltipOpt && (tooltipOpt = {formatter: tooltipOpt}), resultModel = new Model(tooltipOpt, resultModel, resultModel.ecModel))
            }
            return resultModel
          }
          
          function makeDispatchAction(payload, api) {
            return payload.dispatchAction || zrUtil.bind(api.dispatchAction, api)
          }
          
          function refixTooltipPosition(x, y, el, viewWidth, viewHeight, gapH, gapV) {
            var width = el.clientWidth, height = el.clientHeight;
            return null != gapH && (x + width + gapH > viewWidth ? x -= width + gapH : x += gapH), null != gapV && (y + height + gapV > viewHeight ? y -= height + gapV : y += gapV), [x, y]
          }
          
          function confineTooltipPosition(x, y, el, viewWidth, viewHeight) {
            var width = el.clientWidth, height = el.clientHeight;
            return x = Math.min(x + width, viewWidth) - width, y = Math.min(y + height, viewHeight) - height, x = Math.max(x, 0), y = Math.max(y, 0), [x, y]
          }
          
          function calcTooltipPosition(position, rect, contentSize) {
            var domWidth = contentSize[0], domHeight = contentSize[1], gap = 5, x = 0, y = 0, rectWidth = rect.width,
              rectHeight = rect.height;
            switch (position) {
              case"inside":
                x = rect.x + rectWidth / 2 - domWidth / 2, y = rect.y + rectHeight / 2 - domHeight / 2;
                break;
              case"top":
                x = rect.x + rectWidth / 2 - domWidth / 2, y = rect.y - domHeight - gap;
                break;
              case"bottom":
                x = rect.x + rectWidth / 2 - domWidth / 2, y = rect.y + rectHeight + gap;
                break;
              case"left":
                x = rect.x - domWidth - gap, y = rect.y + rectHeight / 2 - domHeight / 2;
                break;
              case"right":
                x = rect.x + rectWidth + gap, y = rect.y + rectHeight / 2 - domHeight / 2
            }
            return [x, y]
          }
          
          function isCenterAlign(align) {
            return "center" === align || "middle" === align
          }
          
          var TooltipContent = require("./TooltipContent"), zrUtil = require("zrender/core/util"),
            formatUtil = require("../../util/format"), numberUtil = require("../../util/number"),
            graphic = require("../../util/graphic"),
            findPointFromSeries = require("../axisPointer/findPointFromSeries"),
            layoutUtil = require("../../util/layout"), env = require("zrender/core/env"),
            Model = require("../../model/Model"), globalListener = require("../axisPointer/globalListener"),
            axisHelper = require("../../coord/axisHelper"),
            axisPointerViewHelper = require("../axisPointer/viewHelper"), bind = zrUtil.bind, each = zrUtil.each,
            parsePercent = numberUtil.parsePercent,
            proxyRect = new graphic.Rect({shape: {x: -1, y: -1, width: 2, height: 2}});
          require("../../echarts").extendComponentView({
            type: "tooltip", init: function (ecModel, api) {
              if (!env.node) {
                var tooltipContent = new TooltipContent(api.getDom(), api);
                this._tooltipContent = tooltipContent
              }
            }, render: function (tooltipModel, ecModel, api) {
              if (!env.node) {
                this.group.removeAll(), this._tooltipModel = tooltipModel, this._ecModel = ecModel, this._api = api, this._lastDataByCoordSys = null, this._alwaysShowContent = tooltipModel.get("alwaysShowContent");
                var tooltipContent = this._tooltipContent;
                tooltipContent.update(), tooltipContent.setEnterable(tooltipModel.get("enterable")), this._initGlobalListener(), this._keepShow()
              }
            }, _initGlobalListener: function () {
              var tooltipModel = this._tooltipModel, triggerOn = tooltipModel.get("triggerOn");
              globalListener.register("itemTooltip", this._api, bind(function (currTrigger, e, dispatchAction) {
                "none" !== triggerOn && (triggerOn.indexOf(currTrigger) >= 0 ? this._tryShow(e, dispatchAction) : "leave" === currTrigger && this._hide(dispatchAction))
              }, this))
            }, _keepShow: function () {
              var tooltipModel = this._tooltipModel, ecModel = this._ecModel, api = this._api;
              if (null != this._lastX && null != this._lastY && "none" !== tooltipModel.get("triggerOn")) {
                var self = this;
                clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function () {
                  self.manuallyShowTip(tooltipModel, ecModel, api, {x: self._lastX, y: self._lastY})
                })
              }
            }, manuallyShowTip: function (tooltipModel, ecModel, api, payload) {
              if (payload.from !== this.uid && !env.node) {
                var dispatchAction = makeDispatchAction(payload, api);
                this._ticket = "";
                var dataByCoordSys = payload.dataByCoordSys;
                if (payload.tooltip && null != payload.x && null != payload.y) {
                  var el = proxyRect;
                  el.position = [payload.x, payload.y], el.update(), el.tooltip = payload.tooltip, this._tryShow({
                    offsetX: payload.x,
                    offsetY: payload.y,
                    target: el
                  }, dispatchAction)
                } else if (dataByCoordSys) this._tryShow({
                  offsetX: payload.x,
                  offsetY: payload.y,
                  position: payload.position,
                  event: {},
                  dataByCoordSys: payload.dataByCoordSys,
                  tooltipOption: payload.tooltipOption
                }, dispatchAction); else if (null != payload.seriesIndex) {
                  if (this._manuallyAxisShowTip(tooltipModel, ecModel, api, payload))return;
                  var pointInfo = findPointFromSeries(payload, ecModel), cx = pointInfo.point[0],
                    cy = pointInfo.point[1];
                  null != cx && null != cy && this._tryShow({
                    offsetX: cx,
                    offsetY: cy,
                    position: payload.position,
                    target: pointInfo.el,
                    event: {}
                  }, dispatchAction)
                } else null != payload.x && null != payload.y && (api.dispatchAction({
                  type: "updateAxisPointer",
                  x: payload.x,
                  y: payload.y
                }), this._tryShow({
                  offsetX: payload.x,
                  offsetY: payload.y,
                  position: payload.position,
                  target: api.getZr().findHover(payload.x, payload.y).target,
                  event: {}
                }, dispatchAction))
              }
            }, manuallyHideTip: function (tooltipModel, ecModel, api, payload) {
              var tooltipContent = this._tooltipContent;
              this._alwaysShowContent || tooltipContent.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = null, payload.from !== this.uid && this._hide(makeDispatchAction(payload, api))
            }, _manuallyAxisShowTip: function (tooltipModel, ecModel, api, payload) {
              var seriesIndex = payload.seriesIndex, dataIndex = payload.dataIndex,
                coordSysAxesInfo = ecModel.getComponent("axisPointer").coordSysAxesInfo;
              if (null != seriesIndex && null != dataIndex && null != coordSysAxesInfo) {
                var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
                if (seriesModel) {
                  var data = seriesModel.getData(),
                    tooltipModel = buildTooltipModel([data.getItemModel(dataIndex), seriesModel, (seriesModel.coordinateSystem || {}).model, tooltipModel]);
                  if ("axis" === tooltipModel.get("trigger"))return api.dispatchAction({
                    type: "updateAxisPointer",
                    seriesIndex: seriesIndex,
                    dataIndex: dataIndex
                  }), !0
                }
              }
            }, _tryShow: function (e, dispatchAction) {
              var el = e.target, tooltipModel = this._tooltipModel;
              if (tooltipModel) {
                this._lastX = e.offsetX, this._lastY = e.offsetY;
                var dataByCoordSys = e.dataByCoordSys;
                dataByCoordSys && dataByCoordSys.length ? this._showAxisTooltip(dataByCoordSys, e) : el && null != el.dataIndex ? (this._lastDataByCoordSys = null, this._showSeriesItemTooltip(e, el, dispatchAction)) : el && el.tooltip ? (this._lastDataByCoordSys = null, this._showComponentItemTooltip(e, el, dispatchAction)) : (this._lastDataByCoordSys = null, this._hide(dispatchAction))
              }
            }, _showOrMove: function (tooltipModel, cb) {
              var delay = tooltipModel.get("showDelay");
              cb = zrUtil.bind(cb, this), clearTimeout(this._showTimout), delay > 0 ? this._showTimout = setTimeout(cb, delay) : cb()
            }, _showAxisTooltip: function (dataByCoordSys, e) {
              var ecModel = this._ecModel, globalTooltipModel = this._tooltipModel, point = [e.offsetX, e.offsetY],
                singleDefaultHTML = [], singleParamsList = [],
                singleTooltipModel = buildTooltipModel([e.tooltipOption, globalTooltipModel]);
              each(dataByCoordSys, function (itemCoordSys) {
                each(itemCoordSys.dataByAxis, function (item) {
                  var axisModel = ecModel.getComponent(item.axisDim + "Axis", item.axisIndex), axisValue = item.value,
                    seriesDefaultHTML = [];
                  if (axisModel && null != axisValue) {
                    var valueLabel = axisPointerViewHelper.getValueLabel(axisValue, axisModel.axis, ecModel, item.seriesDataIndices, item.valueLabelOpt);
                    zrUtil.each(item.seriesDataIndices, function (idxItem) {
                      var series = ecModel.getSeriesByIndex(idxItem.seriesIndex), dataIndex = idxItem.dataIndexInside,
                        dataParams = series && series.getDataParams(dataIndex);
                      dataParams.axisDim = item.axisDim, dataParams.axisIndex = item.axisIndex, dataParams.axisType = item.axisType, dataParams.axisId = item.axisId, dataParams.axisValue = axisHelper.getAxisRawValue(axisModel.axis, axisValue), dataParams.axisValueLabel = valueLabel, dataParams && (singleParamsList.push(dataParams), seriesDefaultHTML.push(series.formatTooltip(dataIndex, !0)))
                    });
                    var firstLine = valueLabel;
                    singleDefaultHTML.push((firstLine ? formatUtil.encodeHTML(firstLine) + "<br />" : "") + seriesDefaultHTML.join("<br />"))
                  }
                })
              }, this), singleDefaultHTML.reverse(), singleDefaultHTML = singleDefaultHTML.join("<br /><br />");
              var positionExpr = e.position;
              this._showOrMove(singleTooltipModel, function () {
                this._updateContentNotChangedOnAxis(dataByCoordSys) ? this._updatePosition(singleTooltipModel, positionExpr, point[0], point[1], this._tooltipContent, singleParamsList) : this._showTooltipContent(singleTooltipModel, singleDefaultHTML, singleParamsList, Math.random(), point[0], point[1], positionExpr)
              })
            }, _showSeriesItemTooltip: function (e, el, dispatchAction) {
              var ecModel = this._ecModel, seriesIndex = el.seriesIndex,
                seriesModel = ecModel.getSeriesByIndex(seriesIndex), dataModel = el.dataModel || seriesModel,
                dataIndex = el.dataIndex, dataType = el.dataType, data = dataModel.getData(),
                tooltipModel = buildTooltipModel([data.getItemModel(dataIndex), dataModel, seriesModel && (seriesModel.coordinateSystem || {}).model, this._tooltipModel]),
                tooltipTrigger = tooltipModel.get("trigger");
              if (null == tooltipTrigger || "item" === tooltipTrigger) {
                var params = dataModel.getDataParams(dataIndex, dataType),
                  defaultHtml = dataModel.formatTooltip(dataIndex, !1, dataType),
                  asyncTicket = "item_" + dataModel.name + "_" + dataIndex;
                this._showOrMove(tooltipModel, function () {
                  this._showTooltipContent(tooltipModel, defaultHtml, params, asyncTicket, e.offsetX, e.offsetY, e.position, e.target)
                }), dispatchAction({
                  type: "showTip",
                  dataIndexInside: dataIndex,
                  dataIndex: data.getRawIndex(dataIndex),
                  seriesIndex: seriesIndex,
                  from: this.uid
                })
              }
            }, _showComponentItemTooltip: function (e, el, dispatchAction) {
              var tooltipOpt = el.tooltip;
              if ("string" == typeof tooltipOpt) {
                var content = tooltipOpt;
                tooltipOpt = {content: content, formatter: content}
              }
              var subTooltipModel = new Model(tooltipOpt, this._tooltipModel, this._ecModel),
                defaultHtml = subTooltipModel.get("content"), asyncTicket = Math.random();
              this._showOrMove(subTooltipModel, function () {
                this._showTooltipContent(subTooltipModel, defaultHtml, subTooltipModel.get("formatterParams") || {}, asyncTicket, e.offsetX, e.offsetY, e.position, el)
              }), dispatchAction({type: "showTip", from: this.uid})
            }, _showTooltipContent: function (tooltipModel, defaultHtml, params, asyncTicket, x, y, positionExpr, el) {
              if (this._ticket = "", tooltipModel.get("showContent") && tooltipModel.get("show")) {
                var tooltipContent = this._tooltipContent, formatter = tooltipModel.get("formatter");
                positionExpr = positionExpr || tooltipModel.get("position");
                var html = defaultHtml;
                if (formatter && "string" == typeof formatter) html = formatUtil.formatTpl(formatter, params, !0); else if ("function" == typeof formatter) {
                  var callback = bind(function (cbTicket, html) {
                    cbTicket === this._ticket && (tooltipContent.setContent(html), this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el))
                  }, this);
                  this._ticket = asyncTicket, html = formatter(params, asyncTicket, callback)
                }
                tooltipContent.setContent(html), tooltipContent.show(tooltipModel), this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el)
              }
            }, _updatePosition: function (tooltipModel, positionExpr, x, y, content, params, el) {
              var viewWidth = this._api.getWidth(), viewHeight = this._api.getHeight();
              positionExpr = positionExpr || tooltipModel.get("position");
              var contentSize = content.getSize(), align = tooltipModel.get("align"),
                vAlign = tooltipModel.get("verticalAlign"), rect = el && el.getBoundingRect().clone();
              if (el && rect.applyTransform(el.transform), "function" == typeof positionExpr && (positionExpr = positionExpr([x, y], params, content.el, rect, {
                  viewSize: [viewWidth, viewHeight],
                  contentSize: contentSize.slice()
                })), zrUtil.isArray(positionExpr)) x = parsePercent(positionExpr[0], viewWidth), y = parsePercent(positionExpr[1], viewHeight); else if (zrUtil.isObject(positionExpr)) {
                positionExpr.width = contentSize[0], positionExpr.height = contentSize[1];
                var layoutRect = layoutUtil.getLayoutRect(positionExpr, {width: viewWidth, height: viewHeight});
                x = layoutRect.x, y = layoutRect.y, align = null, vAlign = null
              } else if ("string" == typeof positionExpr && el) {
                var pos = calcTooltipPosition(positionExpr, rect, contentSize);
                x = pos[0], y = pos[1]
              } else {
                var pos = refixTooltipPosition(x, y, content.el, viewWidth, viewHeight, align ? null : 20, vAlign ? null : 20);
                x = pos[0], y = pos[1]
              }
              if (align && (x -= isCenterAlign(align) ? contentSize[0] / 2 : "right" === align ? contentSize[0] : 0), vAlign && (y -= isCenterAlign(vAlign) ? contentSize[1] / 2 : "bottom" === vAlign ? contentSize[1] : 0), tooltipModel.get("confine")) {
                var pos = confineTooltipPosition(x, y, content.el, viewWidth, viewHeight);
                x = pos[0], y = pos[1]
              }
              content.moveTo(x, y)
            }, _updateContentNotChangedOnAxis: function (dataByCoordSys) {
              var lastCoordSys = this._lastDataByCoordSys,
                contentNotChanged = !!lastCoordSys && lastCoordSys.length === dataByCoordSys.length;
              return each(lastCoordSys, function (lastItemCoordSys, indexCoordSys) {
                var lastDataByAxis = lastItemCoordSys.dataByAxis || {},
                  thisItemCoordSys = dataByCoordSys[indexCoordSys] || {},
                  thisDataByAxis = thisItemCoordSys.dataByAxis || [];
                contentNotChanged &= lastDataByAxis.length === thisDataByAxis.length, each(lastDataByAxis, function (lastItem, indexAxis) {
                  var thisItem = thisDataByAxis[indexAxis] || {}, lastIndices = lastItem.seriesDataIndices || [],
                    newIndices = thisItem.seriesDataIndices || [];
                  contentNotChanged &= lastItem.value === thisItem.value && lastItem.axisType === thisItem.axisType && lastItem.axisId === thisItem.axisId && lastIndices.length === newIndices.length, each(lastIndices, function (lastIdxItem, j) {
                    var newIdxItem = newIndices[j];
                    contentNotChanged &= lastIdxItem.seriesIndex === newIdxItem.seriesIndex && lastIdxItem.dataIndex === newIdxItem.dataIndex
                  })
                })
              }), this._lastDataByCoordSys = dataByCoordSys, !!contentNotChanged
            }, _hide: function (dispatchAction) {
              this._lastDataByCoordSys = null, dispatchAction({type: "hideTip", from: this.uid})
            }, dispose: function (ecModel, api) {
              env.node || (this._tooltipContent.hide(), globalListener.unregister("itemTooltip", api))
            }
          })
        }), define("zrender/vml/graphic", ["require", "../core/env", "../core/vector", "../core/BoundingRect", "../core/PathProxy", "../tool/color", "../contain/text", "../graphic/mixin/RectText", "../graphic/Displayable", "../graphic/Image", "../graphic/Text", "../graphic/Path", "../graphic/Gradient", "./core"], function (require) {
          if (!require("../core/env").canvasSupported) {
            var vec2 = require("../core/vector"), BoundingRect = require("../core/BoundingRect"),
              CMD = require("../core/PathProxy").CMD, colorTool = require("../tool/color"),
              textContain = require("../contain/text"), RectText = require("../graphic/mixin/RectText"),
              Displayable = require("../graphic/Displayable"), ZImage = require("../graphic/Image"),
              Text = require("../graphic/Text"), Path = require("../graphic/Path"),
              PathProxy = require("../core/PathProxy"), Gradient = require("../graphic/Gradient"),
              vmlCore = require("./core"), round = Math.round, sqrt = Math.sqrt, abs = Math.abs, cos = Math.cos,
              sin = Math.sin, mathMax = Math.max, applyTransform = vec2.applyTransform, comma = ",",
              imageTransformPrefix = "progid:DXImageTransform.Microsoft", Z = 21600, Z2 = Z / 2, ZLEVEL_BASE = 1e5,
              Z_BASE = 1e3, initRootElStyle = function (el) {
                el.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;", el.coordsize = Z + "," + Z, el.coordorigin = "0,0"
              }, encodeHtmlAttribute = function (s) {
                return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
              }, rgb2Str = function (r, g, b) {
                return "rgb(" + [r, g, b].join(",") + ")"
              }, append = function (parent, child) {
                child && parent && child.parentNode !== parent && parent.appendChild(child)
              }, remove = function (parent, child) {
                child && parent && child.parentNode === parent && parent.removeChild(child)
              }, getZIndex = function (zlevel, z, z2) {
                return (parseFloat(zlevel) || 0) * ZLEVEL_BASE + (parseFloat(z) || 0) * Z_BASE + z2
              }, parsePercent = function (value, maxValue) {
                return "string" == typeof value ? value.lastIndexOf("%") >= 0 ? parseFloat(value) / 100 * maxValue : parseFloat(value) : value
              }, setColorAndOpacity = function (el, color, opacity) {
                var colorArr = colorTool.parse(color);
                opacity = +opacity, isNaN(opacity) && (opacity = 1), colorArr && (el.color = rgb2Str(colorArr[0], colorArr[1], colorArr[2]), el.opacity = opacity * colorArr[3])
              }, getColorAndAlpha = function (color) {
                var colorArr = colorTool.parse(color);
                return [rgb2Str(colorArr[0], colorArr[1], colorArr[2]), colorArr[3]]
              }, updateFillNode = function (el, style, zrEl) {
                var fill = style.fill;
                if (null != fill)if (fill instanceof Gradient) {
                  var gradientType, angle = 0, focus = [0, 0], shift = 0, expansion = 1, rect = zrEl.getBoundingRect(),
                    rectWidth = rect.width, rectHeight = rect.height;
                  if ("linear" === fill.type) {
                    gradientType = "gradient";
                    var transform = zrEl.transform, p0 = [fill.x * rectWidth, fill.y * rectHeight],
                      p1 = [fill.x2 * rectWidth, fill.y2 * rectHeight];
                    transform && (applyTransform(p0, p0, transform), applyTransform(p1, p1, transform));
                    var dx = p1[0] - p0[0], dy = p1[1] - p0[1];
                    angle = 180 * Math.atan2(dx, dy) / Math.PI, angle < 0 && (angle += 360), angle < 1e-6 && (angle = 0)
                  } else {
                    gradientType = "gradientradial";
                    var p0 = [fill.x * rectWidth, fill.y * rectHeight], transform = zrEl.transform, scale = zrEl.scale,
                      width = rectWidth, height = rectHeight;
                    focus = [(p0[0] - rect.x) / width, (p0[1] - rect.y) / height], transform && applyTransform(p0, p0, transform), width /= scale[0] * Z, height /= scale[1] * Z;
                    var dimension = mathMax(width, height);
                    shift = 0 / dimension, expansion = 2 * fill.r / dimension - shift
                  }
                  var stops = fill.colorStops.slice();
                  stops.sort(function (cs1, cs2) {
                    return cs1.offset - cs2.offset
                  });
                  for (var length = stops.length, colorAndAlphaList = [], colors = [], i = 0; i < length; i++) {
                    var stop = stops[i], colorAndAlpha = getColorAndAlpha(stop.color);
                    colors.push(stop.offset * expansion + shift + " " + colorAndAlpha[0]), 0 !== i && i !== length - 1 || colorAndAlphaList.push(colorAndAlpha)
                  }
                  if (length >= 2) {
                    var color1 = colorAndAlphaList[0][0], color2 = colorAndAlphaList[1][0],
                      opacity1 = colorAndAlphaList[0][1] * style.opacity,
                      opacity2 = colorAndAlphaList[1][1] * style.opacity;
                    el.type = gradientType, el.method = "none", el.focus = "100%", el.angle = angle, el.color = color1, el.color2 = color2, el.colors = colors.join(","), el.opacity = opacity2, el.opacity2 = opacity1
                  }
                  "radial" === gradientType && (el.focusposition = focus.join(","))
                } else setColorAndOpacity(el, fill, style.opacity)
              }, updateStrokeNode = function (el, style) {
                null != style.lineDash && (el.dashstyle = style.lineDash.join(" ")), null == style.stroke || style.stroke instanceof Gradient || setColorAndOpacity(el, style.stroke, style.opacity)
              }, updateFillAndStroke = function (vmlEl, type, style, zrEl) {
                var isFill = "fill" == type, el = vmlEl.getElementsByTagName(type)[0];
                null != style[type] && "none" !== style[type] && (isFill || !isFill && style.lineWidth) ? (vmlEl[isFill ? "filled" : "stroked"] = "true", style[type] instanceof Gradient && remove(vmlEl, el), el || (el = vmlCore.createNode(type)), isFill ? updateFillNode(el, style, zrEl) : updateStrokeNode(el, style), append(vmlEl, el)) : (vmlEl[isFill ? "filled" : "stroked"] = "false", remove(vmlEl, el))
              }, points = [[], [], []], pathDataToString = function (data, m) {
                var nPoint, cmdStr, cmd, i, xi, yi, M = CMD.M, C = CMD.C, L = CMD.L, A = CMD.A, Q = CMD.Q, str = [];
                for (i = 0; i < data.length;) {
                  switch (cmd = data[i++], cmdStr = "", nPoint = 0, cmd) {
                    case M:
                      cmdStr = " m ", nPoint = 1, xi = data[i++], yi = data[i++], points[0][0] = xi, points[0][1] = yi;
                      break;
                    case L:
                      cmdStr = " l ", nPoint = 1, xi = data[i++], yi = data[i++], points[0][0] = xi, points[0][1] = yi;
                      break;
                    case Q:
                    case C:
                      cmdStr = " c ", nPoint = 3;
                      var x3, y3, x1 = data[i++], y1 = data[i++], x2 = data[i++], y2 = data[i++];
                      cmd === Q ? (x3 = x2, y3 = y2, x2 = (x2 + 2 * x1) / 3, y2 = (y2 + 2 * y1) / 3, x1 = (xi + 2 * x1) / 3, y1 = (yi + 2 * y1) / 3) : (x3 = data[i++], y3 = data[i++]), points[0][0] = x1, points[0][1] = y1, points[1][0] = x2, points[1][1] = y2, points[2][0] = x3, points[2][1] = y3, xi = x3, yi = y3;
                      break;
                    case A:
                      var x = 0, y = 0, sx = 1, sy = 1, angle = 0;
                      m && (x = m[4], y = m[5], sx = sqrt(m[0] * m[0] + m[1] * m[1]), sy = sqrt(m[2] * m[2] + m[3] * m[3]), angle = Math.atan2(-m[1] / sy, m[0] / sx));
                      var cx = data[i++], cy = data[i++], rx = data[i++], ry = data[i++], startAngle = data[i++] + angle,
                        endAngle = data[i++] + startAngle + angle;
                      i++;
                      var clockwise = data[i++], x0 = cx + cos(startAngle) * rx, y0 = cy + sin(startAngle) * ry,
                        x1 = cx + cos(endAngle) * rx, y1 = cy + sin(endAngle) * ry, type = clockwise ? " wa " : " at ";
                      Math.abs(x0 - x1) < 1e-4 && (Math.abs(endAngle - startAngle) > .01 ? clockwise && (x0 += 270 / Z) : Math.abs(y0 - cy) < 1e-4 ? clockwise && x0 < cx || !clockwise && x0 > cx ? y1 -= 270 / Z : y1 += 270 / Z : clockwise && y0 < cy || !clockwise && y0 > cy ? x1 += 270 / Z : x1 -= 270 / Z), str.push(type, round(((cx - rx) * sx + x) * Z - Z2), comma, round(((cy - ry) * sy + y) * Z - Z2), comma, round(((cx + rx) * sx + x) * Z - Z2), comma, round(((cy + ry) * sy + y) * Z - Z2), comma, round((x0 * sx + x) * Z - Z2), comma, round((y0 * sy + y) * Z - Z2), comma, round((x1 * sx + x) * Z - Z2), comma, round((y1 * sy + y) * Z - Z2)), xi = x1, yi = y1;
                      break;
                    case CMD.R:
                      var p0 = points[0], p1 = points[1];
                      p0[0] = data[i++], p0[1] = data[i++], p1[0] = p0[0] + data[i++], p1[1] = p0[1] + data[i++], m && (applyTransform(p0, p0, m), applyTransform(p1, p1, m)), p0[0] = round(p0[0] * Z - Z2), p1[0] = round(p1[0] * Z - Z2), p0[1] = round(p0[1] * Z - Z2), p1[1] = round(p1[1] * Z - Z2), str.push(" m ", p0[0], comma, p0[1], " l ", p1[0], comma, p0[1], " l ", p1[0], comma, p1[1], " l ", p0[0], comma, p1[1]);
                      break;
                    case CMD.Z:
                      str.push(" x ")
                  }
                  if (nPoint > 0) {
                    str.push(cmdStr);
                    for (var k = 0; k < nPoint; k++) {
                      var p = points[k];
                      m && applyTransform(p, p, m), str.push(round(p[0] * Z - Z2), comma, round(p[1] * Z - Z2), k < nPoint - 1 ? comma : "")
                    }
                  }
                }
                return str.join("")
              };
            Path.prototype.brushVML = function (vmlRoot) {
              var style = this.style, vmlEl = this._vmlEl;
              vmlEl || (vmlEl = vmlCore.createNode("shape"), initRootElStyle(vmlEl), this._vmlEl = vmlEl), updateFillAndStroke(vmlEl, "fill", style, this), updateFillAndStroke(vmlEl, "stroke", style, this);
              var m = this.transform, needTransform = null != m, strokeEl = vmlEl.getElementsByTagName("stroke")[0];
              if (strokeEl) {
                var lineWidth = style.lineWidth;
                if (needTransform && !style.strokeNoScale) {
                  var det = m[0] * m[3] - m[1] * m[2];
                  lineWidth *= sqrt(abs(det))
                }
                strokeEl.weight = lineWidth + "px"
              }
              var path = this.path || (this.path = new PathProxy);
              this.__dirtyPath && (path.beginPath(), this.buildPath(path, this.shape), path.toStatic(), this.__dirtyPath = !1), vmlEl.path = pathDataToString(path.data, this.transform), vmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2), append(vmlRoot, vmlEl), null != style.text ? this.drawRectText(vmlRoot, this.getBoundingRect()) : this.removeRectText(vmlRoot)
            }, Path.prototype.onRemove = function (vmlRoot) {
              remove(vmlRoot, this._vmlEl), this.removeRectText(vmlRoot)
            }, Path.prototype.onAdd = function (vmlRoot) {
              append(vmlRoot, this._vmlEl), this.appendRectText(vmlRoot)
            };
            var isImage = function (img) {
              return "object" === ("undefined" == typeof img ? "undefined" : _typeof(img)) && img.tagName && "IMG" === img.tagName.toUpperCase()
            };
            ZImage.prototype.brushVML = function (vmlRoot) {
              var ow, oh, style = this.style, image = style.image;
              if (isImage(image)) {
                var src = image.src;
                if (src === this._imageSrc) ow = this._imageWidth, oh = this._imageHeight; else {
                  var imageRuntimeStyle = image.runtimeStyle, oldRuntimeWidth = imageRuntimeStyle.width,
                    oldRuntimeHeight = imageRuntimeStyle.height;
                  imageRuntimeStyle.width = "auto", imageRuntimeStyle.height = "auto", ow = image.width, oh = image.height, imageRuntimeStyle.width = oldRuntimeWidth, imageRuntimeStyle.height = oldRuntimeHeight, this._imageSrc = src, this._imageWidth = ow, this._imageHeight = oh
                }
                image = src
              } else image === this._imageSrc && (ow = this._imageWidth, oh = this._imageHeight);
              if (image) {
                var x = style.x || 0, y = style.y || 0, dw = style.width, dh = style.height, sw = style.sWidth,
                  sh = style.sHeight, sx = style.sx || 0, sy = style.sy || 0, hasCrop = sw && sh, vmlEl = this._vmlEl;
                vmlEl || (vmlEl = vmlCore.doc.createElement("div"), initRootElStyle(vmlEl), this._vmlEl = vmlEl);
                var m, vmlElStyle = vmlEl.style, hasRotation = !1, scaleX = 1, scaleY = 1;
                if (this.transform && (m = this.transform, scaleX = sqrt(m[0] * m[0] + m[1] * m[1]), scaleY = sqrt(m[2] * m[2] + m[3] * m[3]), hasRotation = m[1] || m[2]), hasRotation) {
                  var p0 = [x, y], p1 = [x + dw, y], p2 = [x, y + dh], p3 = [x + dw, y + dh];
                  applyTransform(p0, p0, m), applyTransform(p1, p1, m), applyTransform(p2, p2, m), applyTransform(p3, p3, m);
                  var maxX = mathMax(p0[0], p1[0], p2[0], p3[0]), maxY = mathMax(p0[1], p1[1], p2[1], p3[1]),
                    transformFilter = [];
                  transformFilter.push("M11=", m[0] / scaleX, comma, "M12=", m[2] / scaleY, comma, "M21=", m[1] / scaleX, comma, "M22=", m[3] / scaleY, comma, "Dx=", round(x * scaleX + m[4]), comma, "Dy=", round(y * scaleY + m[5])), vmlElStyle.padding = "0 " + round(maxX) + "px " + round(maxY) + "px 0", vmlElStyle.filter = imageTransformPrefix + ".Matrix(" + transformFilter.join("") + ", SizingMethod=clip)"
                } else m && (x = x * scaleX + m[4], y = y * scaleY + m[5]), vmlElStyle.filter = "", vmlElStyle.left = round(x) + "px", vmlElStyle.top = round(y) + "px";
                var imageEl = this._imageEl, cropEl = this._cropEl;
                imageEl || (imageEl = vmlCore.doc.createElement("div"), this._imageEl = imageEl);
                var imageELStyle = imageEl.style;
                if (hasCrop) {
                  if (ow && oh) imageELStyle.width = round(scaleX * ow * dw / sw) + "px", imageELStyle.height = round(scaleY * oh * dh / sh) + "px"; else {
                    var tmpImage = new Image, self = this;
                    tmpImage.onload = function () {
                      tmpImage.onload = null, ow = tmpImage.width, oh = tmpImage.height, imageELStyle.width = round(scaleX * ow * dw / sw) + "px", imageELStyle.height = round(scaleY * oh * dh / sh) + "px", self._imageWidth = ow, self._imageHeight = oh, self._imageSrc = image
                    }, tmpImage.src = image
                  }
                  cropEl || (cropEl = vmlCore.doc.createElement("div"), cropEl.style.overflow = "hidden", this._cropEl = cropEl);
                  var cropElStyle = cropEl.style;
                  cropElStyle.width = round((dw + sx * dw / sw) * scaleX), cropElStyle.height = round((dh + sy * dh / sh) * scaleY), cropElStyle.filter = imageTransformPrefix + ".Matrix(Dx=" + -sx * dw / sw * scaleX + ",Dy=" + -sy * dh / sh * scaleY + ")", cropEl.parentNode || vmlEl.appendChild(cropEl), imageEl.parentNode != cropEl && cropEl.appendChild(imageEl)
                } else imageELStyle.width = round(scaleX * dw) + "px", imageELStyle.height = round(scaleY * dh) + "px", vmlEl.appendChild(imageEl), cropEl && cropEl.parentNode && (vmlEl.removeChild(cropEl), this._cropEl = null);
                var filterStr = "", alpha = style.opacity;
                alpha < 1 && (filterStr += ".Alpha(opacity=" + round(100 * alpha) + ") "), filterStr += imageTransformPrefix + ".AlphaImageLoader(src=" + image + ", SizingMethod=scale)", imageELStyle.filter = filterStr, vmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2), append(vmlRoot, vmlEl), null != style.text && this.drawRectText(vmlRoot, this.getBoundingRect())
              }
            }, ZImage.prototype.onRemove = function (vmlRoot) {
              remove(vmlRoot, this._vmlEl), this._vmlEl = null, this._cropEl = null, this._imageEl = null, this.removeRectText(vmlRoot)
            }, ZImage.prototype.onAdd = function (vmlRoot) {
              append(vmlRoot, this._vmlEl), this.appendRectText(vmlRoot)
            };
            var textMeasureEl, DEFAULT_STYLE_NORMAL = "normal", fontStyleCache = {}, fontStyleCacheCount = 0,
              MAX_FONT_CACHE_SIZE = 100, fontEl = document.createElement("div"), getFontStyle = function (fontString) {
                var fontStyle = fontStyleCache[fontString];
                if (!fontStyle) {
                  fontStyleCacheCount > MAX_FONT_CACHE_SIZE && (fontStyleCacheCount = 0, fontStyleCache = {});
                  var fontFamily, style = fontEl.style;
                  try {
                    style.font = fontString, fontFamily = style.fontFamily.split(",")[0]
                  } catch (e) {
                  }
                  fontStyle = {
                    style: style.fontStyle || DEFAULT_STYLE_NORMAL,
                    variant: style.fontVariant || DEFAULT_STYLE_NORMAL,
                    weight: style.fontWeight || DEFAULT_STYLE_NORMAL,
                    size: 0 | parseFloat(style.fontSize || 12),
                    family: fontFamily || "Microsoft YaHei"
                  }, fontStyleCache[fontString] = fontStyle, fontStyleCacheCount++
                }
                return fontStyle
              };
            textContain.measureText = function (text, textFont) {
              var doc = vmlCore.doc;
              textMeasureEl || (textMeasureEl = doc.createElement("div"), textMeasureEl.style.cssText = "position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;", vmlCore.doc.body.appendChild(textMeasureEl));
              try {
                textMeasureEl.style.font = textFont
              } catch (ex) {
              }
              return textMeasureEl.innerHTML = "", textMeasureEl.appendChild(doc.createTextNode(text)), {width: textMeasureEl.offsetWidth}
            };
            for (var tmpRect = new BoundingRect, drawRectText = function (vmlRoot, rect, textRect, fromTextEl) {
              var style = this.style, text = style.text;
              if (null != text && (text += ""), text) {
                var x, y, align = style.textAlign, fontStyle = getFontStyle(style.textFont),
                  font = fontStyle.style + " " + fontStyle.variant + " " + fontStyle.weight + " " + fontStyle.size + 'px "' + fontStyle.family + '"',
                  baseline = style.textBaseline, verticalAlign = style.textVerticalAlign;
                textRect = textRect || textContain.getBoundingRect(text, font, align, baseline);
                var m = this.transform;
                if (m && !fromTextEl && (tmpRect.copy(rect), tmpRect.applyTransform(m), rect = tmpRect), fromTextEl) x = rect.x, y = rect.y; else {
                  var textPosition = style.textPosition, distance = style.textDistance;
                  if (textPosition instanceof Array) x = rect.x + parsePercent(textPosition[0], rect.width), y = rect.y + parsePercent(textPosition[1], rect.height), align = align || "left", baseline = baseline || "top"; else {
                    var res = textContain.adjustTextPositionOnRect(textPosition, rect, textRect, distance);
                    x = res.x, y = res.y, align = align || res.textAlign, baseline = baseline || res.textBaseline
                  }
                }
                if (verticalAlign) {
                  switch (verticalAlign) {
                    case"middle":
                      y -= textRect.height / 2;
                      break;
                    case"bottom":
                      y -= textRect.height
                  }
                  baseline = "top"
                }
                var fontSize = fontStyle.size;
                switch (baseline) {
                  case"hanging":
                  case"top":
                    y += fontSize / 1.75;
                    break;
                  case"middle":
                    break;
                  default:
                    y -= fontSize / 2.25
                }
                switch (align) {
                  case"left":
                    break;
                  case"center":
                    x -= textRect.width / 2;
                    break;
                  case"right":
                    x -= textRect.width
                }
                var pathEl, textPathEl, skewEl, createNode = vmlCore.createNode, textVmlEl = this._textVmlEl;
                textVmlEl ? (skewEl = textVmlEl.firstChild, pathEl = skewEl.nextSibling, textPathEl = pathEl.nextSibling) : (textVmlEl = createNode("line"), pathEl = createNode("path"), textPathEl = createNode("textpath"), skewEl = createNode("skew"), textPathEl.style["v-text-align"] = "left", initRootElStyle(textVmlEl), pathEl.textpathok = !0, textPathEl.on = !0, textVmlEl.from = "0 0", textVmlEl.to = "1000 0.05", append(textVmlEl, skewEl), append(textVmlEl, pathEl), append(textVmlEl, textPathEl), this._textVmlEl = textVmlEl);
                var coords = [x, y], textVmlElStyle = textVmlEl.style;
                m && fromTextEl ? (applyTransform(coords, coords, m), skewEl.on = !0, skewEl.matrix = m[0].toFixed(3) + comma + m[2].toFixed(3) + comma + m[1].toFixed(3) + comma + m[3].toFixed(3) + ",0,0", skewEl.offset = (round(coords[0]) || 0) + "," + (round(coords[1]) || 0), skewEl.origin = "0 0", textVmlElStyle.left = "0px", textVmlElStyle.top = "0px") : (skewEl.on = !1, textVmlElStyle.left = round(x) + "px", textVmlElStyle.top = round(y) + "px"), textPathEl.string = encodeHtmlAttribute(text);
                try {
                  textPathEl.style.font = font
                } catch (e) {
                }
                updateFillAndStroke(textVmlEl, "fill", {
                  fill: fromTextEl ? style.fill : style.textFill,
                  opacity: style.opacity
                }, this), updateFillAndStroke(textVmlEl, "stroke", {
                  stroke: fromTextEl ? style.stroke : style.textStroke,
                  opacity: style.opacity,
                  lineDash: style.lineDash
                }, this), textVmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2), append(vmlRoot, textVmlEl)
              }
            }, removeRectText = function (vmlRoot) {
              remove(vmlRoot, this._textVmlEl), this._textVmlEl = null
            }, appendRectText = function (vmlRoot) {
              append(vmlRoot, this._textVmlEl)
            }, list = [RectText, Displayable, ZImage, Path, Text], i = 0; i < list.length; i++) {
              var proto = list[i].prototype;
              proto.drawRectText = drawRectText, proto.removeRectText = removeRectText, proto.appendRectText = appendRectText
            }
            Text.prototype.brushVML = function (vmlRoot) {
              var style = this.style;
              null != style.text ? this.drawRectText(vmlRoot, {
                x: style.x || 0,
                y: style.y || 0,
                width: 0,
                height: 0
              }, this.getBoundingRect(), !0) : this.removeRectText(vmlRoot)
            }, Text.prototype.onRemove = function (vmlRoot) {
              this.removeRectText(vmlRoot)
            }, Text.prototype.onAdd = function (vmlRoot) {
              this.appendRectText(vmlRoot)
            }
          }
        }), define("zrender/vml/Painter", ["require", "../core/log", "./core"], function (require) {
          function parseInt10(val) {
            return parseInt(val, 10)
          }
          
          function VMLPainter(root, storage) {
            vmlCore.initVML(), this.root = root, this.storage = storage;
            var vmlViewport = document.createElement("div"), vmlRoot = document.createElement("div");
            vmlViewport.style.cssText = "display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;", vmlRoot.style.cssText = "position:absolute;left:0;top:0;", root.appendChild(vmlViewport), this._vmlRoot = vmlRoot, this._vmlViewport = vmlViewport, this.resize();
            var oldDelFromStorage = storage.delFromStorage, oldAddToStorage = storage.addToStorage;
            storage.delFromStorage = function (el) {
              oldDelFromStorage.call(storage, el), el && el.onRemove && el.onRemove(vmlRoot)
            }, storage.addToStorage = function (el) {
              el.onAdd && el.onAdd(vmlRoot), oldAddToStorage.call(storage, el)
            }, this._firstPaint = !0
          }
          
          function createMethodNotSupport(method) {
            return function () {
              zrLog('In IE8.0 VML mode painter not support method "' + method + '"')
            }
          }
          
          var zrLog = require("../core/log"), vmlCore = require("./core");
          VMLPainter.prototype = {
            constructor: VMLPainter, getViewportRoot: function () {
              return this._vmlViewport
            }, refresh: function () {
              var list = this.storage.getDisplayList(!0, !0);
              this._paintList(list)
            }, _paintList: function (list) {
              for (var vmlRoot = this._vmlRoot, i = 0; i < list.length; i++) {
                var el = list[i];
                el.invisible || el.ignore ? (el.__alreadyNotVisible || el.onRemove(vmlRoot), el.__alreadyNotVisible = !0) : (el.__alreadyNotVisible && el.onAdd(vmlRoot), el.__alreadyNotVisible = !1, el.__dirty && (el.beforeBrush && el.beforeBrush(), (el.brushVML || el.brush).call(el, vmlRoot), el.afterBrush && el.afterBrush())), el.__dirty = !1
              }
              this._firstPaint && (this._vmlViewport.appendChild(vmlRoot), this._firstPaint = !1)
            }, resize: function (width, height) {
              var width = null == width ? this._getWidth() : width,
                height = null == height ? this._getHeight() : height;
              if (this._width != width || this._height != height) {
                this._width = width, this._height = height;
                var vmlViewportStyle = this._vmlViewport.style;
                vmlViewportStyle.width = width + "px", vmlViewportStyle.height = height + "px"
              }
            }, dispose: function () {
              this.root.innerHTML = "", this._vmlRoot = this._vmlViewport = this.storage = null
            }, getWidth: function () {
              return this._width
            }, getHeight: function () {
              return this._height
            }, clear: function () {
              this._vmlViewport && this.root.removeChild(this._vmlViewport)
            }, _getWidth: function () {
              var root = this.root, stl = root.currentStyle;
              return (root.clientWidth || parseInt10(stl.width)) - parseInt10(stl.paddingLeft) - parseInt10(stl.paddingRight) | 0
            }, _getHeight: function () {
              var root = this.root, stl = root.currentStyle;
              return (root.clientHeight || parseInt10(stl.height)) - parseInt10(stl.paddingTop) - parseInt10(stl.paddingBottom) | 0
            }
          };
          for (var notSupportedMethods = ["getLayer", "insertLayer", "eachLayer", "eachBuiltinLayer", "eachOtherLayer", "getLayers", "modLayer", "delLayer", "clearLayer", "toDataURL", "pathToImage"], i = 0; i < notSupportedMethods.length; i++) {
            var name = notSupportedMethods[i];
            VMLPainter.prototype[name] = createMethodNotSupport(name)
          }
          return VMLPainter
        }), define("echarts/component/marker/MarkPointModel", ["require", "./MarkerModel"], function (require) {
          return require("./MarkerModel").extend({
            type: "markPoint",
            defaultOption: {
              zlevel: 0,
              z: 5,
              symbol: "pin",
              symbolSize: 50,
              tooltip: {trigger: "item"},
              label: {normal: {show: !0, position: "inside"}, emphasis: {show: !0}},
              itemStyle: {normal: {borderWidth: 2}}
            }
          })
        }), define("echarts/component/marker/MarkLineModel", ["require", "./MarkerModel"], function (require) {
          return require("./MarkerModel").extend({
            type: "markLine",
            defaultOption: {
              zlevel: 0,
              z: 5,
              symbol: ["circle", "arrow"],
              symbolSize: [8, 16],
              precision: 2,
              tooltip: {trigger: "item"},
              label: {normal: {show: !0, position: "end"}, emphasis: {show: !0}},
              lineStyle: {normal: {type: "dashed"}, emphasis: {width: 3}},
              animationEasing: "linear"
            }
          })
        }), define("echarts/component/marker/MarkLineView", ["require", "zrender/core/util", "../../data/List", "../../util/number", "./markerHelper", "../../chart/helper/LineDraw", "./MarkerView"], function (require) {
          function isInifinity(val) {
            return !isNaN(val) && !isFinite(val)
          }
          
          function ifMarkLineHasOnlyDim(dimIndex, fromCoord, toCoord, coordSys) {
            var otherDimIndex = 1 - dimIndex, dimName = coordSys.dimensions[dimIndex];
            return isInifinity(fromCoord[otherDimIndex]) && isInifinity(toCoord[otherDimIndex]) && fromCoord[dimIndex] === toCoord[dimIndex] && coordSys.getAxis(dimName).containData(fromCoord[dimIndex])
          }
          
          function markLineFilter(coordSys, item) {
            if ("cartesian2d" === coordSys.type) {
              var fromCoord = item[0].coord, toCoord = item[1].coord;
              if (fromCoord && toCoord && (ifMarkLineHasOnlyDim(1, fromCoord, toCoord, coordSys) || ifMarkLineHasOnlyDim(0, fromCoord, toCoord, coordSys)))return !0
            }
            return markerHelper.dataFilter(coordSys, item[0]) && markerHelper.dataFilter(coordSys, item[1])
          }
          
          function updateSingleMarkerEndLayout(data, idx, isFrom, seriesModel, api) {
            var point, coordSys = seriesModel.coordinateSystem, itemModel = data.getItemModel(idx),
              xPx = numberUtil.parsePercent(itemModel.get("x"), api.getWidth()),
              yPx = numberUtil.parsePercent(itemModel.get("y"), api.getHeight());
            if (isNaN(xPx) || isNaN(yPx)) {
              if (seriesModel.getMarkerPosition) point = seriesModel.getMarkerPosition(data.getValues(data.dimensions, idx)); else {
                var dims = coordSys.dimensions, x = data.get(dims[0], idx), y = data.get(dims[1], idx);
                point = coordSys.dataToPoint([x, y])
              }
              if ("cartesian2d" === coordSys.type) {
                var xAxis = coordSys.getAxis("x"), yAxis = coordSys.getAxis("y"), dims = coordSys.dimensions;
                isInifinity(data.get(dims[0], idx)) ? point[0] = xAxis.toGlobalCoord(xAxis.getExtent()[isFrom ? 0 : 1]) : isInifinity(data.get(dims[1], idx)) && (point[1] = yAxis.toGlobalCoord(yAxis.getExtent()[isFrom ? 0 : 1]))
              }
              isNaN(xPx) || (point[0] = xPx), isNaN(yPx) || (point[1] = yPx)
            } else point = [xPx, yPx];
            data.setItemLayout(idx, point)
          }
          
          function createList(coordSys, seriesModel, mlModel) {
            var coordDimsInfos;
            coordDimsInfos = coordSys ? zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
              var info = seriesModel.getData().getDimensionInfo(seriesModel.coordDimToDataDim(coordDim)[0]) || {};
              return info.name = coordDim, info
            }) : [{name: "value", type: "float"}];
            var fromData = new List(coordDimsInfos, mlModel), toData = new List(coordDimsInfos, mlModel),
              lineData = new List([], mlModel),
              optData = zrUtil.map(mlModel.get("data"), zrUtil.curry(markLineTransform, seriesModel, coordSys, mlModel));
            coordSys && (optData = zrUtil.filter(optData, zrUtil.curry(markLineFilter, coordSys)));
            var dimValueGetter = coordSys ? markerHelper.dimValueGetter : function (item) {
              return item.value
            };
            return fromData.initData(zrUtil.map(optData, function (item) {
              return item[0]
            }), null, dimValueGetter), toData.initData(zrUtil.map(optData, function (item) {
              return item[1]
            }), null, dimValueGetter), lineData.initData(zrUtil.map(optData, function (item) {
              return item[2]
            })), lineData.hasItemOption = !0, {from: fromData, to: toData, line: lineData}
          }
          
          var zrUtil = require("zrender/core/util"), List = require("../../data/List"),
            numberUtil = require("../../util/number"), markerHelper = require("./markerHelper"),
            LineDraw = require("../../chart/helper/LineDraw"),
            markLineTransform = function (seriesModel, coordSys, mlModel, item) {
              var data = seriesModel.getData(), mlType = item.type;
              if (!zrUtil.isArray(item) && ("min" === mlType || "max" === mlType || "average" === mlType || null != item.xAxis || null != item.yAxis)) {
                var valueAxis, valueDataDim, value;
                if (null != item.yAxis || null != item.xAxis) valueDataDim = null != item.yAxis ? "y" : "x", valueAxis = coordSys.getAxis(valueDataDim), value = zrUtil.retrieve(item.yAxis, item.xAxis); else {
                  var axisInfo = markerHelper.getAxisInfo(item, data, coordSys, seriesModel);
                  valueDataDim = axisInfo.valueDataDim, valueAxis = axisInfo.valueAxis, value = markerHelper.numCalculate(data, valueDataDim, mlType)
                }
                var valueIndex = "x" === valueDataDim ? 0 : 1, baseIndex = 1 - valueIndex, mlFrom = zrUtil.clone(item),
                  mlTo = {};
                mlFrom.type = null, mlFrom.coord = [], mlTo.coord = [], mlFrom.coord[baseIndex] = -(1 / 0), mlTo.coord[baseIndex] = 1 / 0;
                var precision = mlModel.get("precision");
                precision >= 0 && "number" == typeof value && (value = +value.toFixed(precision)), mlFrom.coord[valueIndex] = mlTo.coord[valueIndex] = value, item = [mlFrom, mlTo, {
                  type: mlType,
                  valueIndex: item.valueIndex,
                  value: value
                }]
              }
              return item = [markerHelper.dataTransform(seriesModel, item[0]), markerHelper.dataTransform(seriesModel, item[1]), zrUtil.extend({}, item[2])], item[2].type = item[2].type || "", zrUtil.merge(item[2], item[0]), zrUtil.merge(item[2], item[1]), item
            };
          require("./MarkerView").extend({
            type: "markLine", updateLayout: function (markLineModel, ecModel, api) {
              ecModel.eachSeries(function (seriesModel) {
                var mlModel = seriesModel.markLineModel;
                if (mlModel) {
                  var mlData = mlModel.getData(), fromData = mlModel.__from, toData = mlModel.__to;
                  fromData.each(function (idx) {
                    updateSingleMarkerEndLayout(fromData, idx, !0, seriesModel, api), updateSingleMarkerEndLayout(toData, idx, !1, seriesModel, api)
                  }), mlData.each(function (idx) {
                    mlData.setItemLayout(idx, [fromData.getItemLayout(idx), toData.getItemLayout(idx)])
                  }), this.markerGroupMap[seriesModel.name].updateLayout()
                }
              }, this)
            }, renderSeries: function (seriesModel, mlModel, ecModel, api) {
              function updateDataVisualAndLayout(data, idx, isFrom) {
                var itemModel = data.getItemModel(idx);
                updateSingleMarkerEndLayout(data, idx, isFrom, seriesModel, api), data.setItemVisual(idx, {
                  symbolSize: itemModel.get("symbolSize") || symbolSize[isFrom ? 0 : 1],
                  symbol: itemModel.get("symbol", !0) || symbolType[isFrom ? 0 : 1],
                  color: itemModel.get("itemStyle.normal.color") || seriesData.getVisual("color")
                })
              }
              
              var coordSys = seriesModel.coordinateSystem, seriesName = seriesModel.name,
                seriesData = seriesModel.getData(), lineDrawMap = this.markerGroupMap,
                lineDraw = lineDrawMap[seriesName];
              lineDraw || (lineDraw = lineDrawMap[seriesName] = new LineDraw), this.group.add(lineDraw.group);
              var mlData = createList(coordSys, seriesModel, mlModel), fromData = mlData.from, toData = mlData.to,
                lineData = mlData.line;
              mlModel.__from = fromData, mlModel.__to = toData, mlModel.setData(lineData);
              var symbolType = mlModel.get("symbol"), symbolSize = mlModel.get("symbolSize");
              zrUtil.isArray(symbolType) || (symbolType = [symbolType, symbolType]), "number" == typeof symbolSize && (symbolSize = [symbolSize, symbolSize]), mlData.from.each(function (idx) {
                updateDataVisualAndLayout(fromData, idx, !0), updateDataVisualAndLayout(toData, idx, !1)
              }), lineData.each(function (idx) {
                var lineColor = lineData.getItemModel(idx).get("lineStyle.normal.color");
                lineData.setItemVisual(idx, {color: lineColor || fromData.getItemVisual(idx, "color")}), lineData.setItemLayout(idx, [fromData.getItemLayout(idx), toData.getItemLayout(idx)]), lineData.setItemVisual(idx, {
                  fromSymbolSize: fromData.getItemVisual(idx, "symbolSize"),
                  fromSymbol: fromData.getItemVisual(idx, "symbol"),
                  toSymbolSize: toData.getItemVisual(idx, "symbolSize"),
                  toSymbol: toData.getItemVisual(idx, "symbol")
                })
              }), lineDraw.updateData(lineData), mlData.line.eachItemGraphicEl(function (el, idx) {
                el.traverse(function (child) {
                  child.dataModel = mlModel
                })
              }), lineDraw.__keep = !0, lineDraw.group.silent = mlModel.get("silent") || seriesModel.get("silent")
            }
          })
        }), define("echarts/scale/helper", ["require", "../util/number"], function (require) {
          function clamp(niceTickExtent, idx, extent) {
            niceTickExtent[idx] = Math.max(Math.min(niceTickExtent[idx], extent[1]), extent[0])
          }
          
          var numberUtil = require("../util/number"), roundNumber = numberUtil.round, helper = {};
          return helper.intervalScaleNiceTicks = function (extent, splitNumber) {
            var result = {}, span = extent[1] - extent[0],
              interval = result.interval = numberUtil.nice(span / splitNumber, !0),
              precision = result.intervalPrecision = numberUtil.getPrecisionSafe(interval) + 2,
              niceTickExtent = result.niceTickExtent = [roundNumber(Math.ceil(extent[0] / interval) * interval, precision), roundNumber(Math.floor(extent[1] / interval) * interval, precision)];
            return helper.fixExtent(niceTickExtent, extent), result
          }, helper.fixExtent = function (niceTickExtent, extent) {
            !isFinite(niceTickExtent[0]) && (niceTickExtent[0] = extent[0]), !isFinite(niceTickExtent[1]) && (niceTickExtent[1] = extent[1]), clamp(niceTickExtent, 0, extent), clamp(niceTickExtent, 1, extent), niceTickExtent[0] > niceTickExtent[1] && (niceTickExtent[0] = niceTickExtent[1])
          }, helper.intervalScaleGetTicks = function (interval, extent, niceTickExtent, intervalPrecision) {
            var ticks = [];
            if (!interval)return ticks;
            var safeLimit = 1e4;
            extent[0] < niceTickExtent[0] && ticks.push(extent[0]);
            for (var tick = niceTickExtent[0]; tick <= niceTickExtent[1] && (ticks.push(tick), tick = roundNumber(tick + interval, intervalPrecision), tick !== ticks[ticks.length - 1]);)if (ticks.length > safeLimit)return [];
            return extent[1] > (ticks.length ? ticks[ticks.length - 1] : niceTickExtent[1]) && ticks.push(extent[1]), ticks
          }, helper
        }), define("echarts/component/marker/MarkPointView", ["require", "../../chart/helper/SymbolDraw", "zrender/core/util", "../../util/number", "../../data/List", "./markerHelper", "./MarkerView"], function (require) {
          function updateMarkerLayout(mpData, seriesModel, api) {
            var coordSys = seriesModel.coordinateSystem;
            mpData.each(function (idx) {
              var point, itemModel = mpData.getItemModel(idx),
                xPx = numberUtil.parsePercent(itemModel.get("x"), api.getWidth()),
                yPx = numberUtil.parsePercent(itemModel.get("y"), api.getHeight());
              if (isNaN(xPx) || isNaN(yPx)) {
                if (seriesModel.getMarkerPosition) point = seriesModel.getMarkerPosition(mpData.getValues(mpData.dimensions, idx)); else if (coordSys) {
                  var x = mpData.get(coordSys.dimensions[0], idx), y = mpData.get(coordSys.dimensions[1], idx);
                  point = coordSys.dataToPoint([x, y])
                }
              } else point = [xPx, yPx];
              isNaN(xPx) || (point[0] = xPx), isNaN(yPx) || (point[1] = yPx), mpData.setItemLayout(idx, point)
            })
          }
          
          function createList(coordSys, seriesModel, mpModel) {
            var coordDimsInfos;
            coordDimsInfos = coordSys ? zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
              var info = seriesModel.getData().getDimensionInfo(seriesModel.coordDimToDataDim(coordDim)[0]) || {};
              return info.name = coordDim, info
            }) : [{name: "value", type: "float"}];
            var mpData = new List(coordDimsInfos, mpModel),
              dataOpt = zrUtil.map(mpModel.get("data"), zrUtil.curry(markerHelper.dataTransform, seriesModel));
            return coordSys && (dataOpt = zrUtil.filter(dataOpt, zrUtil.curry(markerHelper.dataFilter, coordSys))), mpData.initData(dataOpt, null, coordSys ? markerHelper.dimValueGetter : function (item) {
              return item.value
            }), mpData
          }
          
          var SymbolDraw = require("../../chart/helper/SymbolDraw"), zrUtil = require("zrender/core/util"),
            numberUtil = require("../../util/number"), List = require("../../data/List"),
            markerHelper = require("./markerHelper");
          require("./MarkerView").extend({
            type: "markPoint", updateLayout: function (markPointModel, ecModel, api) {
              ecModel.eachSeries(function (seriesModel) {
                var mpModel = seriesModel.markPointModel;
                mpModel && (updateMarkerLayout(mpModel.getData(), seriesModel, api), this.markerGroupMap[seriesModel.name].updateLayout(mpModel))
              }, this)
            }, renderSeries: function (seriesModel, mpModel, ecModel, api) {
              var coordSys = seriesModel.coordinateSystem, seriesName = seriesModel.name,
                seriesData = seriesModel.getData(), symbolDrawMap = this.markerGroupMap,
                symbolDraw = symbolDrawMap[seriesName];
              symbolDraw || (symbolDraw = symbolDrawMap[seriesName] = new SymbolDraw);
              var mpData = createList(coordSys, seriesModel, mpModel);
              mpModel.setData(mpData), updateMarkerLayout(mpModel.getData(), seriesModel, api), mpData.each(function (idx) {
                var itemModel = mpData.getItemModel(idx), symbolSize = itemModel.getShallow("symbolSize");
                "function" == typeof symbolSize && (symbolSize = symbolSize(mpModel.getRawValue(idx), mpModel.getDataParams(idx))), mpData.setItemVisual(idx, {
                  symbolSize: symbolSize,
                  color: itemModel.get("itemStyle.normal.color") || seriesData.getVisual("color"),
                  symbol: itemModel.getShallow("symbol")
                })
              }), symbolDraw.updateData(mpData), this.group.add(symbolDraw.group), mpData.eachItemGraphicEl(function (el) {
                el.traverse(function (child) {
                  child.dataModel = mpModel
                })
              }), symbolDraw.__keep = !0, symbolDraw.group.silent = mpModel.get("silent") || seriesModel.get("silent")
            }
          })
        }), define("echarts/scale/Interval", ["require", "../util/number", "../util/format", "./Scale", "./helper"], function (require) {
          var numberUtil = require("../util/number"), formatUtil = require("../util/format"),
            Scale = require("./Scale"), helper = require("./helper"), roundNumber = numberUtil.round,
            IntervalScale = Scale.extend({
              type: "interval",
              _interval: 0,
              _intervalPrecision: 2,
              setExtent: function (start, end) {
                var thisExtent = this._extent;
                isNaN(start) || (thisExtent[0] = parseFloat(start)), isNaN(end) || (thisExtent[1] = parseFloat(end))
              },
              unionExtent: function (other) {
                var extent = this._extent;
                other[0] < extent[0] && (extent[0] = other[0]), other[1] > extent[1] && (extent[1] = other[1]), IntervalScale.prototype.setExtent.call(this, extent[0], extent[1])
              },
              getInterval: function () {
                return this._interval || this.niceTicks(), this._interval
              },
              setInterval: function (interval) {
                this._interval = interval, this._niceExtent = this._extent.slice()
              },
              getTicks: function () {
                return this._interval || this.niceTicks(), helper.intervalScaleGetTicks(this._interval, this._extent, this._niceExtent, this._intervalPrecision)
              },
              getTicksLabels: function () {
                for (var labels = [], ticks = this.getTicks(), i = 0; i < ticks.length; i++)labels.push(this.getLabel(ticks[i]));
                return labels
              },
              getLabel: function (data, opt) {
                if (null == data)return "";
                var precision = opt && opt.precision;
                return null == precision ? precision = numberUtil.getPrecisionSafe(data) || 0 : "auto" === precision && (precision = this._intervalPrecision), data = roundNumber(data, precision, !0), formatUtil.addCommas(data)
              },
              niceTicks: function (splitNumber) {
                splitNumber = splitNumber || 5;
                var extent = this._extent, span = extent[1] - extent[0];
                if (isFinite(span)) {
                  span < 0 && (span = -span, extent.reverse());
                  var result = helper.intervalScaleNiceTicks(extent, splitNumber);
                  this._intervalPrecision = result.intervalPrecision, this._interval = result.interval, this._niceExtent = result.niceTickExtent
                }
              },
              niceExtent: function (splitNumber, fixMin, fixMax) {
                var extent = this._extent;
                if (extent[0] === extent[1])if (0 !== extent[0]) {
                  var expandSize = extent[0];
                  fixMax ? extent[0] -= expandSize / 2 : (extent[1] += expandSize / 2, extent[0] -= expandSize / 2)
                } else extent[1] = 1;
                var span = extent[1] - extent[0];
                isFinite(span) || (extent[0] = 0, extent[1] = 1), this.niceTicks(splitNumber);
                var interval = this._interval;
                fixMin || (extent[0] = roundNumber(Math.floor(extent[0] / interval) * interval)), fixMax || (extent[1] = roundNumber(Math.ceil(extent[1] / interval) * interval))
              }
            });
          return IntervalScale.create = function () {
            return new IntervalScale
          }, IntervalScale
        }), define("echarts/coord/axisHelper", ["require", "../scale/Ordinal", "../scale/Interval", "../scale/Time", "../scale/Log", "../scale/Scale", "../util/number", "zrender/core/util", "zrender/contain/text"], function (require) {
          var OrdinalScale = require("../scale/Ordinal"), IntervalScale = require("../scale/Interval");
          require("../scale/Time"), require("../scale/Log");
          var Scale = require("../scale/Scale"), numberUtil = require("../util/number"),
            zrUtil = require("zrender/core/util"), textContain = require("zrender/contain/text"), axisHelper = {};
          return axisHelper.getScaleExtent = function (scale, model) {
            var axisDataLen, boundaryGap, span, scaleType = scale.type, min = model.getMin(), max = model.getMax(),
              fixMin = null != min, fixMax = null != max, originalExtent = scale.getExtent();
            return "ordinal" === scaleType ? axisDataLen = (model.get("data") || []).length : (boundaryGap = model.get("boundaryGap"), zrUtil.isArray(boundaryGap) || (boundaryGap = [boundaryGap || 0, boundaryGap || 0]), "boolean" == typeof boundaryGap[0] && (boundaryGap = [0, 0]), boundaryGap[0] = numberUtil.parsePercent(boundaryGap[0], 1), boundaryGap[1] = numberUtil.parsePercent(boundaryGap[1], 1), span = originalExtent[1] - originalExtent[0] || Math.abs(originalExtent[0])), null == min && (min = "ordinal" === scaleType ? axisDataLen ? 0 : NaN : originalExtent[0] - boundaryGap[0] * span), null == max && (max = "ordinal" === scaleType ? axisDataLen ? axisDataLen - 1 : NaN : originalExtent[1] + boundaryGap[1] * span), "dataMin" === min && (min = originalExtent[0]), "dataMax" === max && (max = originalExtent[1]), (null == min || !isFinite(min)) && (min = NaN), (null == max || !isFinite(max)) && (max = NaN), scale.setBlank(zrUtil.eqNaN(min) || zrUtil.eqNaN(max)), model.getNeedCrossZero() && (min > 0 && max > 0 && !fixMin && (min = 0), min < 0 && max < 0 && !fixMax && (max = 0)), [min, max]
          }, axisHelper.niceScaleExtent = function (scale, model) {
            var extent = axisHelper.getScaleExtent(scale, model), fixMin = null != model.getMin(),
              fixMax = null != model.getMax(), splitNumber = model.get("splitNumber");
            "log" === scale.type && (scale.base = model.get("logBase")), scale.setExtent(extent[0], extent[1]), scale.niceExtent(splitNumber, fixMin, fixMax);
            var minInterval = model.get("minInterval");
            if (isFinite(minInterval) && !fixMin && !fixMax && "interval" === scale.type) {
              var interval = scale.getInterval(), intervalScale = Math.max(Math.abs(interval), minInterval) / interval;
              extent = scale.getExtent();
              var origin = (extent[1] + extent[0]) / 2;
              scale.setExtent(intervalScale * (extent[0] - origin) + origin, intervalScale * (extent[1] - origin) + origin), scale.niceExtent(splitNumber)
            }
            var interval = model.get("interval");
            null != interval && scale.setInterval && scale.setInterval(interval)
          }, axisHelper.createScaleByModel = function (model, axisType) {
            if (axisType = axisType || model.get("type"))switch (axisType) {
              case"category":
                return new OrdinalScale(model.getCategories(), [1 / 0, -(1 / 0)]);
              case"value":
                return new IntervalScale;
              default:
                return (Scale.getClass(axisType) || IntervalScale).create(model)
            }
          }, axisHelper.ifAxisCrossZero = function (axis) {
            var dataExtent = axis.scale.getExtent(), min = dataExtent[0], max = dataExtent[1];
            return !(min > 0 && max > 0 || min < 0 && max < 0)
          }, axisHelper.getAxisLabelInterval = function (tickCoords, labels, font, isAxisHorizontal) {
            var textSpaceTakenRect, autoLabelInterval = 0, accumulatedLabelInterval = 0, step = 1;
            labels.length > 40 && (step = Math.floor(labels.length / 40));
            for (var i = 0; i < tickCoords.length; i += step) {
              var tickCoord = tickCoords[i], rect = textContain.getBoundingRect(labels[i], font, "center", "top");
              rect[isAxisHorizontal ? "x" : "y"] += tickCoord, rect[isAxisHorizontal ? "width" : "height"] *= 1.3, textSpaceTakenRect ? textSpaceTakenRect.intersect(rect) ? (accumulatedLabelInterval++, autoLabelInterval = Math.max(autoLabelInterval, accumulatedLabelInterval)) : (textSpaceTakenRect.union(rect), accumulatedLabelInterval = 0) : textSpaceTakenRect = rect.clone()
            }
            return 0 === autoLabelInterval && step > 1 ? step : (autoLabelInterval + 1) * step - 1
          }, axisHelper.getFormattedLabels = function (axis, labelFormatter) {
            var scale = axis.scale, labels = scale.getTicksLabels(), ticks = scale.getTicks();
            return "string" == typeof labelFormatter ? (labelFormatter = function (tpl) {
              return function (val) {
                return tpl.replace("{value}", null != val ? val : "")
              }
            }(labelFormatter), zrUtil.map(labels, labelFormatter)) : "function" == typeof labelFormatter ? zrUtil.map(ticks, function (tick, idx) {
              return labelFormatter(axisHelper.getAxisRawValue(axis, tick), idx)
            }, this) : labels
          }, axisHelper.getAxisRawValue = function (axis, value) {
            return "category" === axis.type ? axis.scale.getLabel(value) : value
          }, axisHelper
        }), define("echarts/coord/cartesian/Cartesian2D", ["require", "zrender/core/util", "./Cartesian"], function (require) {
          function Cartesian2D(name) {
            Cartesian.call(this, name)
          }
          
          var zrUtil = require("zrender/core/util"), Cartesian = require("./Cartesian");
          return Cartesian2D.prototype = {
            constructor: Cartesian2D,
            type: "cartesian2d",
            dimensions: ["x", "y"],
            getBaseAxis: function () {
              return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
            },
            containPoint: function (point) {
              var axisX = this.getAxis("x"), axisY = this.getAxis("y");
              return axisX.contain(axisX.toLocalCoord(point[0])) && axisY.contain(axisY.toLocalCoord(point[1]))
            },
            containData: function (data) {
              return this.getAxis("x").containData(data[0]) && this.getAxis("y").containData(data[1])
            },
            dataToPoints: function (data, stack) {
              return data.mapArray(["x", "y"], function (x, y) {
                return this.dataToPoint([x, y])
              }, stack, this)
            },
            dataToPoint: function (data, clamp) {
              var xAxis = this.getAxis("x"), yAxis = this.getAxis("y");
              return [xAxis.toGlobalCoord(xAxis.dataToCoord(data[0], clamp)), yAxis.toGlobalCoord(yAxis.dataToCoord(data[1], clamp))]
            },
            pointToData: function (point, clamp) {
              var xAxis = this.getAxis("x"), yAxis = this.getAxis("y");
              return [xAxis.coordToData(xAxis.toLocalCoord(point[0]), clamp), yAxis.coordToData(yAxis.toLocalCoord(point[1]), clamp)]
            },
            getOtherAxis: function (axis) {
              return this.getAxis("x" === axis.dim ? "y" : "x")
            }
          }, zrUtil.inherits(Cartesian2D, Cartesian), Cartesian2D
        }), define("echarts/scale/Scale", ["require", "../util/clazz"], function (require) {
          function Scale(setting) {
            this._setting = setting || {}, this._extent = [1 / 0, -(1 / 0)], this._interval = 0, this.init && this.init.apply(this, arguments)
          }
          
          var clazzUtil = require("../util/clazz"), scaleProto = Scale.prototype;
          return scaleProto.parse = function (val) {
            return val
          }, scaleProto.getSetting = function (name) {
            return this._setting[name]
          }, scaleProto.contain = function (val) {
            var extent = this._extent;
            return val >= extent[0] && val <= extent[1]
          }, scaleProto.normalize = function (val) {
            var extent = this._extent;
            return extent[1] === extent[0] ? .5 : (val - extent[0]) / (extent[1] - extent[0])
          }, scaleProto.scale = function (val) {
            var extent = this._extent;
            return val * (extent[1] - extent[0]) + extent[0]
          }, scaleProto.unionExtent = function (other) {
            var extent = this._extent;
            other[0] < extent[0] && (extent[0] = other[0]), other[1] > extent[1] && (extent[1] = other[1])
          }, scaleProto.unionExtentFromData = function (data, dim) {
            this.unionExtent(data.getDataExtent(dim, !0))
          }, scaleProto.getExtent = function () {
            return this._extent.slice()
          }, scaleProto.setExtent = function (start, end) {
            var thisExtent = this._extent;
            isNaN(start) || (thisExtent[0] = start), isNaN(end) || (thisExtent[1] = end)
          }, scaleProto.getTicksLabels = function () {
            for (var labels = [], ticks = this.getTicks(), i = 0; i < ticks.length; i++)labels.push(this.getLabel(ticks[i]));
            return labels
          }, scaleProto.isBlank = function () {
            return this._isBlank
          }, scaleProto.setBlank = function (isBlank) {
            this._isBlank = isBlank
          }, clazzUtil.enableClassExtend(Scale), clazzUtil.enableClassManagement(Scale, {registerWhenExtend: !0}), Scale
        }), define("echarts/coord/cartesian/Axis2D", ["require", "zrender/core/util", "../Axis", "./axisLabelInterval"], function (require) {
          var zrUtil = require("zrender/core/util"), Axis = require("../Axis"),
            axisLabelInterval = require("./axisLabelInterval"),
            Axis2D = function (dim, scale, coordExtent, axisType, position) {
              Axis.call(this, dim, scale, coordExtent), this.type = axisType || "value", this.position = position || "bottom"
            };
          return Axis2D.prototype = {
            constructor: Axis2D, index: 0, onZero: !1, model: null, isHorizontal: function () {
              var position = this.position;
              return "top" === position || "bottom" === position
            }, getGlobalExtent: function (asc) {
              var ret = this.getExtent();
              return ret[0] = this.toGlobalCoord(ret[0]), ret[1] = this.toGlobalCoord(ret[1]), asc && ret[0] > ret[1] && ret.reverse(), ret
            }, getOtherAxis: function () {
              this.grid.getOtherAxis()
            }, getLabelInterval: function () {
              var labelInterval = this._labelInterval;
              return labelInterval || (labelInterval = this._labelInterval = axisLabelInterval(this)), labelInterval
            }, isLabelIgnored: function (idx) {
              if ("category" === this.type) {
                var labelInterval = this.getLabelInterval();
                return "function" == typeof labelInterval && !labelInterval(idx, this.scale.getLabel(idx)) || idx % (labelInterval + 1)
              }
            }, pointToData: function (point, clamp) {
              return this.coordToData(this.toLocalCoord(point["x" === this.dim ? 0 : 1]), clamp)
            }, toLocalCoord: null, toGlobalCoord: null
          }, zrUtil.inherits(Axis2D, Axis), Axis2D
        }), define("echarts/coord/cartesian/GridModel", ["require", "./AxisModel", "../../model/Component"], function (require) {
          require("./AxisModel");
          var ComponentModel = require("../../model/Component");
          return ComponentModel.extend({
            type: "grid",
            dependencies: ["xAxis", "yAxis"],
            layoutMode: "box",
            coordinateSystem: null,
            defaultOption: {
              show: !1,
              zlevel: 0,
              z: 0,
              left: "10%",
              top: 60,
              right: "10%",
              bottom: 60,
              containLabel: !1,
              backgroundColor: "rgba(0,0,0,0)",
              borderWidth: 1,
              borderColor: "#ccc"
            }
          })
        }), define("zrender/tool/path", ["require", "../graphic/Path", "../core/PathProxy", "./transformPath"], function (require) {
          function processArc(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg, cmd, path) {
            var psi = psiDeg * (PI / 180), xp = mathCos(psi) * (x1 - x2) / 2 + mathSin(psi) * (y1 - y2) / 2,
              yp = -1 * mathSin(psi) * (x1 - x2) / 2 + mathCos(psi) * (y1 - y2) / 2,
              lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
            lambda > 1 && (rx *= mathSqrt(lambda), ry *= mathSqrt(lambda));
            var f = (fa === fs ? -1 : 1) * mathSqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp))) || 0,
              cxp = f * rx * yp / ry, cyp = f * -ry * xp / rx,
              cx = (x1 + x2) / 2 + mathCos(psi) * cxp - mathSin(psi) * cyp,
              cy = (y1 + y2) / 2 + mathSin(psi) * cxp + mathCos(psi) * cyp,
              theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]), u = [(xp - cxp) / rx, (yp - cyp) / ry],
              v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry], dTheta = vAngle(u, v);
            vRatio(u, v) <= -1 && (dTheta = PI), vRatio(u, v) >= 1 && (dTheta = 0), 0 === fs && dTheta > 0 && (dTheta -= 2 * PI), 1 === fs && dTheta < 0 && (dTheta += 2 * PI), path.addData(cmd, cx, cy, rx, ry, theta, dTheta, psi, fs)
          }
          
          function createPathProxyFromString(data) {
            if (!data)return [];
            var n, cs = data.replace(/-/g, " -").replace(/  /g, " ").replace(/ /g, ",").replace(/,,/g, ",");
            for (n = 0; n < cc.length; n++)cs = cs.replace(new RegExp(cc[n], "g"), "|" + cc[n]);
            var prevCmd, arr = cs.split("|"), cpx = 0, cpy = 0, path = new PathProxy, CMD = PathProxy.CMD;
            for (n = 1; n < arr.length; n++) {
              var cmd, str = arr[n], c = str.charAt(0), off = 0, p = str.slice(1).replace(/e,-/g, "e-").split(",");
              p.length > 0 && "" === p[0] && p.shift();
              for (var i = 0; i < p.length; i++)p[i] = parseFloat(p[i]);
              for (; off < p.length && !isNaN(p[off]) && !isNaN(p[0]);) {
                var ctlPtx, ctlPty, rx, ry, psi, fa, fs, x1 = cpx, y1 = cpy;
                switch (c) {
                  case"l":
                    cpx += p[off++], cpy += p[off++], cmd = CMD.L, path.addData(cmd, cpx, cpy);
                    break;
                  case"L":
                    cpx = p[off++], cpy = p[off++], cmd = CMD.L, path.addData(cmd, cpx, cpy);
                    break;
                  case"m":
                    cpx += p[off++], cpy += p[off++], cmd = CMD.M, path.addData(cmd, cpx, cpy), c = "l";
                    break;
                  case"M":
                    cpx = p[off++], cpy = p[off++], cmd = CMD.M, path.addData(cmd, cpx, cpy), c = "L";
                    break;
                  case"h":
                    cpx += p[off++], cmd = CMD.L, path.addData(cmd, cpx, cpy);
                    break;
                  case"H":
                    cpx = p[off++], cmd = CMD.L, path.addData(cmd, cpx, cpy);
                    break;
                  case"v":
                    cpy += p[off++], cmd = CMD.L, path.addData(cmd, cpx, cpy);
                    break;
                  case"V":
                    cpy = p[off++], cmd = CMD.L, path.addData(cmd, cpx, cpy);
                    break;
                  case"C":
                    cmd = CMD.C, path.addData(cmd, p[off++], p[off++], p[off++], p[off++], p[off++], p[off++]), cpx = p[off - 2], cpy = p[off - 1];
                    break;
                  case"c":
                    cmd = CMD.C, path.addData(cmd, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy), cpx += p[off - 2], cpy += p[off - 1];
                    break;
                  case"S":
                    ctlPtx = cpx, ctlPty = cpy;
                    var len = path.len(), pathData = path.data;
                    prevCmd === CMD.C && (ctlPtx += cpx - pathData[len - 4], ctlPty += cpy - pathData[len - 3]), cmd = CMD.C, x1 = p[off++], y1 = p[off++], cpx = p[off++], cpy = p[off++], path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
                    break;
                  case"s":
                    ctlPtx = cpx, ctlPty = cpy;
                    var len = path.len(), pathData = path.data;
                    prevCmd === CMD.C && (ctlPtx += cpx - pathData[len - 4], ctlPty += cpy - pathData[len - 3]), cmd = CMD.C, x1 = cpx + p[off++], y1 = cpy + p[off++], cpx += p[off++], cpy += p[off++], path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
                    break;
                  case"Q":
                    x1 = p[off++], y1 = p[off++], cpx = p[off++], cpy = p[off++], cmd = CMD.Q, path.addData(cmd, x1, y1, cpx, cpy);
                    break;
                  case"q":
                    x1 = p[off++] + cpx, y1 = p[off++] + cpy, cpx += p[off++], cpy += p[off++], cmd = CMD.Q, path.addData(cmd, x1, y1, cpx, cpy);
                    break;
                  case"T":
                    ctlPtx = cpx, ctlPty = cpy;
                    var len = path.len(), pathData = path.data;
                    prevCmd === CMD.Q && (ctlPtx += cpx - pathData[len - 4], ctlPty += cpy - pathData[len - 3]), cpx = p[off++], cpy = p[off++], cmd = CMD.Q, path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
                    break;
                  case"t":
                    ctlPtx = cpx, ctlPty = cpy;
                    var len = path.len(), pathData = path.data;
                    prevCmd === CMD.Q && (ctlPtx += cpx - pathData[len - 4], ctlPty += cpy - pathData[len - 3]), cpx += p[off++], cpy += p[off++], cmd = CMD.Q, path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
                    break;
                  case"A":
                    rx = p[off++], ry = p[off++], psi = p[off++], fa = p[off++], fs = p[off++], x1 = cpx, y1 = cpy, cpx = p[off++], cpy = p[off++], cmd = CMD.A, processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path);
                    break;
                  case"a":
                    rx = p[off++], ry = p[off++], psi = p[off++], fa = p[off++], fs = p[off++], x1 = cpx, y1 = cpy, cpx += p[off++], cpy += p[off++], cmd = CMD.A, processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path)
                }
              }
              "z" !== c && "Z" !== c || (cmd = CMD.Z, path.addData(cmd)), prevCmd = cmd
            }
            return path.toStatic(), path
          }
          
          function createPathOptions(str, opts) {
            var pathProxy = createPathProxyFromString(str);
            return opts = opts || {}, opts.buildPath = function (path) {
              if (path.setData) {
                path.setData(pathProxy.data);
                var ctx = path.getContext();
                ctx && path.rebuildPath(ctx)
              } else {
                var ctx = path;
                pathProxy.rebuildPath(ctx)
              }
            }, opts.applyTransform = function (m) {
              transformPath(pathProxy, m), this.dirty(!0)
            }, opts
          }
          
          var Path = require("../graphic/Path"), PathProxy = require("../core/PathProxy"),
            transformPath = require("./transformPath"),
            cc = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"],
            mathSqrt = Math.sqrt, mathSin = Math.sin, mathCos = Math.cos, PI = Math.PI, vMag = function (v) {
              return Math.sqrt(v[0] * v[0] + v[1] * v[1])
            }, vRatio = function (u, v) {
              return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v))
            }, vAngle = function (u, v) {
              return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v))
            };
          return {
            createFromString: function (str, opts) {
              return new Path(createPathOptions(str, opts))
            }, extendFromString: function (str, opts) {
              return Path.extend(createPathOptions(str, opts))
            }, mergePath: function (pathEls, opts) {
              for (var pathList = [], len = pathEls.length, i = 0; i < len; i++) {
                var pathEl = pathEls[i];
                pathEl.path || pathEl.createPathProxy(), pathEl.__dirtyPath && pathEl.buildPath(pathEl.path, pathEl.shape, !0), pathList.push(pathEl.path)
              }
              var pathBundle = new Path(opts);
              return pathBundle.createPathProxy(), pathBundle.buildPath = function (path) {
                path.appendPath(pathList);
                var ctx = path.getContext();
                ctx && path.rebuildPath(ctx)
              }, pathBundle
            }
          }
        }), define("zrender/graphic/Path", ["require", "./Displayable", "../core/util", "../core/PathProxy", "../contain/path", "./Pattern"], function (require) {
          function Path(opts) {
            Displayable.call(this, opts), this.path = null
          }
          
          var Displayable = require("./Displayable"), zrUtil = require("../core/util"),
            PathProxy = require("../core/PathProxy"), pathContain = require("../contain/path"),
            Pattern = require("./Pattern"), getCanvasPattern = Pattern.prototype.getCanvasPattern, abs = Math.abs,
            pathProxyForDraw = new PathProxy(!0);
          return Path.prototype = {
            constructor: Path,
            type: "path",
            __dirtyPath: !0,
            strokeContainThreshold: 5,
            brush: function (ctx, prevEl) {
              var style = this.style, path = this.path || pathProxyForDraw, hasStroke = style.hasStroke(),
                hasFill = style.hasFill(), fill = style.fill, stroke = style.stroke,
                hasFillGradient = hasFill && !!fill.colorStops, hasStrokeGradient = hasStroke && !!stroke.colorStops,
                hasFillPattern = hasFill && !!fill.image, hasStrokePattern = hasStroke && !!stroke.image;
              if (style.bind(ctx, this, prevEl), this.setTransform(ctx), this.__dirty) {
                var rect;
                hasFillGradient && (rect = rect || this.getBoundingRect(), this._fillGradient = style.getGradient(ctx, fill, rect)), hasStrokeGradient && (rect = rect || this.getBoundingRect(), this._strokeGradient = style.getGradient(ctx, stroke, rect))
              }
              hasFillGradient ? ctx.fillStyle = this._fillGradient : hasFillPattern && (ctx.fillStyle = getCanvasPattern.call(fill, ctx)), hasStrokeGradient ? ctx.strokeStyle = this._strokeGradient : hasStrokePattern && (ctx.strokeStyle = getCanvasPattern.call(stroke, ctx));
              var lineDash = style.lineDash, lineDashOffset = style.lineDashOffset, ctxLineDash = !!ctx.setLineDash,
                scale = this.getGlobalScale();
              path.setScale(scale[0], scale[1]), this.__dirtyPath || lineDash && !ctxLineDash && hasStroke ? (path.beginPath(ctx), lineDash && !ctxLineDash && (path.setLineDash(lineDash), path.setLineDashOffset(lineDashOffset)), this.buildPath(path, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (ctx.beginPath(), this.path.rebuildPath(ctx)), hasFill && path.fill(ctx), lineDash && ctxLineDash && (ctx.setLineDash(lineDash), ctx.lineDashOffset = lineDashOffset), hasStroke && path.stroke(ctx), lineDash && ctxLineDash && ctx.setLineDash([]), this.restoreTransform(ctx), null != style.text && this.drawRectText(ctx, this.getBoundingRect())
            },
            buildPath: function (ctx, shapeCfg, inBundle) {
            },
            createPathProxy: function () {
              this.path = new PathProxy
            },
            getBoundingRect: function () {
              var rect = this._rect, style = this.style, needsUpdateRect = !rect;
              if (needsUpdateRect) {
                var path = this.path;
                path || (path = this.path = new PathProxy), this.__dirtyPath && (path.beginPath(), this.buildPath(path, this.shape, !1)), rect = path.getBoundingRect()
              }
              if (this._rect = rect, style.hasStroke()) {
                var rectWithStroke = this._rectWithStroke || (this._rectWithStroke = rect.clone());
                if (this.__dirty || needsUpdateRect) {
                  rectWithStroke.copy(rect);
                  var w = style.lineWidth, lineScale = style.strokeNoScale ? this.getLineScale() : 1;
                  style.hasFill() || (w = Math.max(w, this.strokeContainThreshold || 4)), lineScale > 1e-10 && (rectWithStroke.width += w / lineScale, rectWithStroke.height += w / lineScale, rectWithStroke.x -= w / lineScale / 2, rectWithStroke.y -= w / lineScale / 2)
                }
                return rectWithStroke
              }
              return rect
            },
            contain: function (x, y) {
              var localPos = this.transformCoordToLocal(x, y), rect = this.getBoundingRect(), style = this.style;
              if (x = localPos[0], y = localPos[1], rect.contain(x, y)) {
                var pathData = this.path.data;
                if (style.hasStroke()) {
                  var lineWidth = style.lineWidth, lineScale = style.strokeNoScale ? this.getLineScale() : 1;
                  if (lineScale > 1e-10 && (style.hasFill() || (lineWidth = Math.max(lineWidth, this.strokeContainThreshold)), pathContain.containStroke(pathData, lineWidth / lineScale, x, y)))return !0
                }
                if (style.hasFill())return pathContain.contain(pathData, x, y)
              }
              return !1
            },
            dirty: function (dirtyPath) {
              null == dirtyPath && (dirtyPath = !0), dirtyPath && (this.__dirtyPath = dirtyPath, this._rect = null), this.__dirty = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
            },
            animateShape: function (loop) {
              return this.animate("shape", loop)
            },
            attrKV: function (key, value) {
              "shape" === key ? (this.setShape(value), this.__dirtyPath = !0, this._rect = null) : Displayable.prototype.attrKV.call(this, key, value)
            },
            setShape: function (key, value) {
              var shape = this.shape;
              if (shape) {
                if (zrUtil.isObject(key))for (var name in key)key.hasOwnProperty(name) && (shape[name] = key[name]); else shape[key] = value;
                this.dirty(!0)
              }
              return this
            },
            getLineScale: function () {
              var m = this.transform;
              return m && abs(m[0] - 1) > 1e-10 && abs(m[3] - 1) > 1e-10 ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1])) : 1
            }
          }, Path.extend = function (defaults) {
            var Sub = function (opts) {
              Path.call(this, opts), defaults.style && this.style.extendFrom(defaults.style, !1);
              var defaultShape = defaults.shape;
              if (defaultShape) {
                this.shape = this.shape || {};
                var thisShape = this.shape;
                for (var name in defaultShape)!thisShape.hasOwnProperty(name) && defaultShape.hasOwnProperty(name) && (thisShape[name] = defaultShape[name])
              }
              defaults.init && defaults.init.call(this, opts)
            };
            zrUtil.inherits(Sub, Path);
            for (var name in defaults)"style" !== name && "shape" !== name && (Sub.prototype[name] = defaults[name]);
            return Sub
          }, zrUtil.inherits(Path, Displayable), Path
        }), define("zrender/mixin/Transformable", ["require", "../core/matrix", "../core/vector"], function (require) {
          function isNotAroundZero(val) {
            return val > EPSILON || val < -EPSILON
          }
          
          var matrix = require("../core/matrix"), vector = require("../core/vector"), mIdentity = matrix.identity,
            EPSILON = 5e-5, Transformable = function (opts) {
              opts = opts || {}, opts.position || (this.position = [0, 0]), null == opts.rotation && (this.rotation = 0), opts.scale || (this.scale = [1, 1]), this.origin = this.origin || null
            }, transformableProto = Transformable.prototype;
          transformableProto.transform = null, transformableProto.needLocalTransform = function () {
            return isNotAroundZero(this.rotation) || isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1]) || isNotAroundZero(this.scale[0] - 1) || isNotAroundZero(this.scale[1] - 1)
          }, transformableProto.updateTransform = function () {
            var parent = this.parent, parentHasTransform = parent && parent.transform,
              needLocalTransform = this.needLocalTransform(), m = this.transform;
            return needLocalTransform || parentHasTransform ? (m = m || matrix.create(), needLocalTransform ? this.getLocalTransform(m) : mIdentity(m), parentHasTransform && (needLocalTransform ? matrix.mul(m, parent.transform, m) : matrix.copy(m, parent.transform)), this.transform = m, this.invTransform = this.invTransform || matrix.create(), void matrix.invert(this.invTransform, m)) : void(m && mIdentity(m))
          }, transformableProto.getLocalTransform = function (m) {
            return Transformable.getLocalTransform(this, m)
          }, transformableProto.setTransform = function (ctx) {
            var m = this.transform, dpr = ctx.dpr || 1;
            m ? ctx.setTransform(dpr * m[0], dpr * m[1], dpr * m[2], dpr * m[3], dpr * m[4], dpr * m[5]) : ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          }, transformableProto.restoreTransform = function (ctx) {
            var dpr = ctx.dpr || 1;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          };
          var tmpTransform = [];
          return transformableProto.decomposeTransform = function () {
            if (this.transform) {
              var parent = this.parent, m = this.transform;
              parent && parent.transform && (matrix.mul(tmpTransform, parent.invTransform, m), m = tmpTransform);
              var sx = m[0] * m[0] + m[1] * m[1], sy = m[2] * m[2] + m[3] * m[3], position = this.position,
                scale = this.scale;
              isNotAroundZero(sx - 1) && (sx = Math.sqrt(sx)), isNotAroundZero(sy - 1) && (sy = Math.sqrt(sy)), m[0] < 0 && (sx = -sx), m[3] < 0 && (sy = -sy), position[0] = m[4], position[1] = m[5], scale[0] = sx, scale[1] = sy, this.rotation = Math.atan2(-m[1] / sy, m[0] / sx)
            }
          }, transformableProto.getGlobalScale = function () {
            var m = this.transform;
            if (!m)return [1, 1];
            var sx = Math.sqrt(m[0] * m[0] + m[1] * m[1]), sy = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
            return m[0] < 0 && (sx = -sx), m[3] < 0 && (sy = -sy), [sx, sy]
          }, transformableProto.transformCoordToLocal = function (x, y) {
            var v2 = [x, y], invTransform = this.invTransform;
            return invTransform && vector.applyTransform(v2, v2, invTransform), v2
          }, transformableProto.transformCoordToGlobal = function (x, y) {
            var v2 = [x, y], transform = this.transform;
            return transform && vector.applyTransform(v2, v2, transform), v2
          }, Transformable.getLocalTransform = function (target, m) {
            m = m || [], mIdentity(m);
            var origin = target.origin, scale = target.scale || [1, 1], rotation = target.rotation || 0,
              position = target.position || [0, 0];
            return origin && (m[4] -= origin[0], m[5] -= origin[1]), matrix.scale(m, m, scale), rotation && matrix.rotate(m, m, rotation), origin && (m[4] += origin[0], m[5] += origin[1]), m[4] += position[0], m[5] += position[1], m
          }, Transformable
        }), define("zrender/core/BoundingRect", ["require", "./vector", "./matrix"], function (require) {
          function BoundingRect(x, y, width, height) {
            width < 0 && (x += width, width = -width), height < 0 && (y += height, height = -height), this.x = x, this.y = y, this.width = width, this.height = height
          }
          
          var vec2 = require("./vector"), matrix = require("./matrix"), v2ApplyTransform = vec2.applyTransform,
            mathMin = Math.min, mathMax = Math.max;
          return BoundingRect.prototype = {
            constructor: BoundingRect, union: function (other) {
              var x = mathMin(other.x, this.x), y = mathMin(other.y, this.y);
              this.width = mathMax(other.x + other.width, this.x + this.width) - x, this.height = mathMax(other.y + other.height, this.y + this.height) - y, this.x = x, this.y = y
            }, applyTransform: function () {
              var lt = [], rb = [], lb = [], rt = [];
              return function (m) {
                if (m) {
                  lt[0] = lb[0] = this.x, lt[1] = rt[1] = this.y, rb[0] = rt[0] = this.x + this.width, rb[1] = lb[1] = this.y + this.height, v2ApplyTransform(lt, lt, m), v2ApplyTransform(rb, rb, m), v2ApplyTransform(lb, lb, m), v2ApplyTransform(rt, rt, m), this.x = mathMin(lt[0], rb[0], lb[0], rt[0]), this.y = mathMin(lt[1], rb[1], lb[1], rt[1]);
                  var maxX = mathMax(lt[0], rb[0], lb[0], rt[0]), maxY = mathMax(lt[1], rb[1], lb[1], rt[1]);
                  this.width = maxX - this.x, this.height = maxY - this.y
                }
              }
            }(), calculateTransform: function (b) {
              var a = this, sx = b.width / a.width, sy = b.height / a.height, m = matrix.create();
              return matrix.translate(m, m, [-a.x, -a.y]), matrix.scale(m, m, [sx, sy]), matrix.translate(m, m, [b.x, b.y]), m
            }, intersect: function (b) {
              if (!b)return !1;
              b instanceof BoundingRect || (b = BoundingRect.create(b));
              var a = this, ax0 = a.x, ax1 = a.x + a.width, ay0 = a.y, ay1 = a.y + a.height, bx0 = b.x,
                bx1 = b.x + b.width, by0 = b.y, by1 = b.y + b.height;
              return !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0)
            }, contain: function (x, y) {
              var rect = this;
              return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height
            }, clone: function () {
              return new BoundingRect(this.x, this.y, this.width, this.height)
            }, copy: function (other) {
              this.x = other.x, this.y = other.y, this.width = other.width, this.height = other.height
            }, plain: function () {
              return {x: this.x, y: this.y, width: this.width, height: this.height}
            }
          }, BoundingRect.create = function (rect) {
            return new BoundingRect(rect.x, rect.y, rect.width, rect.height)
          }, BoundingRect
        }), define("zrender/container/Group", ["require", "../core/util", "../Element", "../core/BoundingRect"], function (require) {
          var zrUtil = require("../core/util"), Element = require("../Element"),
            BoundingRect = require("../core/BoundingRect"), Group = function (opts) {
              opts = opts || {}, Element.call(this, opts);
              for (var key in opts)opts.hasOwnProperty(key) && (this[key] = opts[key]);
              this._children = [], this.__storage = null, this.__dirty = !0
            };
          return Group.prototype = {
            constructor: Group, isGroup: !0, type: "group", silent: !1, children: function () {
              return this._children.slice()
            }, childAt: function (idx) {
              return this._children[idx]
            }, childOfName: function (name) {
              for (var children = this._children, i = 0; i < children.length; i++)if (children[i].name === name)return children[i]
            }, childCount: function () {
              return this._children.length
            }, add: function (child) {
              return child && child !== this && child.parent !== this && (this._children.push(child), this._doAdd(child)), this
            }, addBefore: function (child, nextSibling) {
              if (child && child !== this && child.parent !== this && nextSibling && nextSibling.parent === this) {
                var children = this._children, idx = children.indexOf(nextSibling);
                idx >= 0 && (children.splice(idx, 0, child), this._doAdd(child))
              }
              return this
            }, _doAdd: function (child) {
              child.parent && child.parent.remove(child), child.parent = this;
              var storage = this.__storage, zr = this.__zr;
              storage && storage !== child.__storage && (storage.addToStorage(child), child instanceof Group && child.addChildrenToStorage(storage)), zr && zr.refresh()
            }, remove: function (child) {
              var zr = this.__zr, storage = this.__storage, children = this._children,
                idx = zrUtil.indexOf(children, child);
              return idx < 0 ? this : (children.splice(idx, 1), child.parent = null, storage && (storage.delFromStorage(child), child instanceof Group && child.delChildrenFromStorage(storage)), zr && zr.refresh(), this)
            }, removeAll: function () {
              var child, i, children = this._children, storage = this.__storage;
              for (i = 0; i < children.length; i++)child = children[i], storage && (storage.delFromStorage(child), child instanceof Group && child.delChildrenFromStorage(storage)), child.parent = null;
              return children.length = 0, this
            }, eachChild: function (cb, context) {
              for (var children = this._children, i = 0; i < children.length; i++) {
                var child = children[i];
                cb.call(context, child, i)
              }
              return this
            }, traverse: function (cb, context) {
              for (var i = 0; i < this._children.length; i++) {
                var child = this._children[i];
                cb.call(context, child), "group" === child.type && child.traverse(cb, context)
              }
              return this
            }, addChildrenToStorage: function (storage) {
              for (var i = 0; i < this._children.length; i++) {
                var child = this._children[i];
                storage.addToStorage(child), child instanceof Group && child.addChildrenToStorage(storage)
              }
            }, delChildrenFromStorage: function (storage) {
              for (var i = 0; i < this._children.length; i++) {
                var child = this._children[i];
                storage.delFromStorage(child), child instanceof Group && child.delChildrenFromStorage(storage)
              }
            }, dirty: function () {
              return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
            }, getBoundingRect: function (includeChildren) {
              for (var rect = null, tmpRect = new BoundingRect(0, 0, 0, 0), children = includeChildren || this._children, tmpMat = [], i = 0; i < children.length; i++) {
                var child = children[i];
                if (!child.ignore && !child.invisible) {
                  var childRect = child.getBoundingRect(), transform = child.getLocalTransform(tmpMat);
                  transform ? (tmpRect.copy(childRect), tmpRect.applyTransform(transform), rect = rect || tmpRect.clone(), rect.union(tmpRect)) : (rect = rect || childRect.clone(), rect.union(childRect))
                }
              }
              return rect || tmpRect
            }
          }, zrUtil.inherits(Group, Element), Group
        }), define("zrender/graphic/Image", ["require", "./Displayable", "../core/BoundingRect", "../core/util", "../core/LRU"], function (require) {
          function ZImage(opts) {
            Displayable.call(this, opts)
          }
          
          var Displayable = require("./Displayable"), BoundingRect = require("../core/BoundingRect"),
            zrUtil = require("../core/util"), LRU = require("../core/LRU"), globalImageCache = new LRU(50);
          return ZImage.prototype = {
            constructor: ZImage, type: "image", brush: function (ctx, prevEl) {
              var image, style = this.style, src = style.image;
              if (style.bind(ctx, this, prevEl), image = "string" == typeof src ? this._image : src, !image && src) {
                var cachedImgObj = globalImageCache.get(src);
                if (!cachedImgObj)return image = new Image, image.onload = function () {
                  image.onload = null;
                  for (var i = 0; i < cachedImgObj.pending.length; i++)cachedImgObj.pending[i].dirty()
                }, cachedImgObj = {
                  image: image,
                  pending: [this]
                }, image.src = src, globalImageCache.put(src, cachedImgObj), void(this._image = image);
                if (image = cachedImgObj.image, this._image = image, !image.width || !image.height)return void cachedImgObj.pending.push(this)
              }
              if (image) {
                var x = style.x || 0, y = style.y || 0;
                if (!image.width || !image.height)return;
                var width = style.width, height = style.height, aspect = image.width / image.height;
                if (null == width && null != height ? width = height * aspect : null == height && null != width ? height = width / aspect : null == width && null == height && (width = image.width, height = image.height), this.setTransform(ctx), style.sWidth && style.sHeight) {
                  var sx = style.sx || 0, sy = style.sy || 0;
                  ctx.drawImage(image, sx, sy, style.sWidth, style.sHeight, x, y, width, height)
                } else if (style.sx && style.sy) {
                  var sx = style.sx, sy = style.sy, sWidth = width - sx, sHeight = height - sy;
                  ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height)
                } else ctx.drawImage(image, x, y, width, height);
                this.restoreTransform(ctx), null != style.text && this.drawRectText(ctx, this.getBoundingRect())
              }
            }, getBoundingRect: function () {
              var style = this.style;
              return this._rect || (this._rect = new BoundingRect(style.x || 0, style.y || 0, style.width || 0, style.height || 0)), this._rect
            }
          }, zrUtil.inherits(ZImage, Displayable), ZImage
        }), define("zrender/graphic/Text", ["require", "./Displayable", "../core/util", "../contain/text"], function (require) {
          var Displayable = require("./Displayable"), zrUtil = require("../core/util"),
            textContain = require("../contain/text"), Text = function (opts) {
              Displayable.call(this, opts)
            };
          return Text.prototype = {
            constructor: Text, type: "text", brush: function (ctx, prevEl) {
              var style = this.style, x = style.x || 0, y = style.y || 0, text = style.text;
              if (null != text && (text += ""), style.bind(ctx, this, prevEl), text) {
                this.setTransform(ctx);
                var textBaseline, textAlign = style.textAlign, font = style.textFont || style.font;
                if (style.textVerticalAlign) {
                  var rect = textContain.getBoundingRect(text, font, style.textAlign, "top");
                  switch (textBaseline = "middle", style.textVerticalAlign) {
                    case"middle":
                      y -= rect.height / 2 - rect.lineHeight / 2;
                      break;
                    case"bottom":
                      y -= rect.height - rect.lineHeight / 2;
                      break;
                    default:
                      y += rect.lineHeight / 2
                  }
                } else textBaseline = style.textBaseline;
                ctx.font = font || "12px sans-serif", ctx.textAlign = textAlign || "left", ctx.textAlign !== textAlign && (ctx.textAlign = "left"), ctx.textBaseline = textBaseline || "alphabetic", ctx.textBaseline !== textBaseline && (ctx.textBaseline = "alphabetic");
                for (var lineHeight = textContain.measureText("国", ctx.font).width, textLines = text.split("\n"), i = 0; i < textLines.length; i++)style.hasStroke() && ctx.strokeText(textLines[i], x, y), style.hasFill() && ctx.fillText(textLines[i], x, y), y += lineHeight;
                this.restoreTransform(ctx)
              }
            }, getBoundingRect: function () {
              var style = this.style;
              if (!this._rect) {
                var textVerticalAlign = style.textVerticalAlign,
                  rect = textContain.getBoundingRect(style.text + "", style.textFont || style.font, style.textAlign, textVerticalAlign ? "top" : style.textBaseline);
                switch (textVerticalAlign) {
                  case"middle":
                    rect.y -= rect.height / 2;
                    break;
                  case"bottom":
                    rect.y -= rect.height
                }
                if (rect.x += style.x || 0, rect.y += style.y || 0, style.hasStroke()) {
                  var w = style.lineWidth;
                  rect.x -= w / 2, rect.y -= w / 2, rect.width += w, rect.height += w
                }
                this._rect = rect
              }
              return this._rect
            }
          }, zrUtil.inherits(Text, Displayable), Text
        }), define("zrender/graphic/shape/Circle", ["require", "../Path"], function (require) {
          return require("../Path").extend({
            type: "circle",
            shape: {cx: 0, cy: 0, r: 0},
            buildPath: function (ctx, shape, inBundle) {
              inBundle && ctx.moveTo(shape.cx + shape.r, shape.cy), ctx.arc(shape.cx, shape.cy, shape.r, 0, 2 * Math.PI, !0)
            }
          })
        }), define("zrender/graphic/shape/Sector", ["require", "../../core/env", "../Path"], function (require) {
          var env = require("../../core/env"), Path = require("../Path"),
            shadowTemp = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]];
          return Path.extend({
            type: "sector",
            shape: {cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
            brush: env.browser.ie && env.browser.version >= 11 ? function () {
              var modified, clipPaths = this.__clipPaths, style = this.style;
              if (clipPaths)for (var i = 0; i < clipPaths.length; i++) {
                var shape = clipPaths[i] && clipPaths[i].shape;
                if (shape && shape.startAngle === shape.endAngle) {
                  for (var j = 0; j < shadowTemp.length; j++)shadowTemp[j][2] = style[shadowTemp[j][0]], style[shadowTemp[j][0]] = shadowTemp[j][1];
                  modified = !0;
                  break
                }
              }
              if (Path.prototype.brush.apply(this, arguments), modified)for (var j = 0; j < shadowTemp.length; j++)style[shadowTemp[j][0]] = shadowTemp[j][2]
            } : Path.prototype.brush,
            buildPath: function (ctx, shape) {
              var x = shape.cx, y = shape.cy, r0 = Math.max(shape.r0 || 0, 0), r = Math.max(shape.r, 0),
                startAngle = shape.startAngle, endAngle = shape.endAngle, clockwise = shape.clockwise,
                unitX = Math.cos(startAngle), unitY = Math.sin(startAngle);
              ctx.moveTo(unitX * r0 + x, unitY * r0 + y), ctx.lineTo(unitX * r + x, unitY * r + y), ctx.arc(x, y, r, startAngle, endAngle, !clockwise), ctx.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y), 0 !== r0 && ctx.arc(x, y, r0, endAngle, startAngle, clockwise), ctx.closePath()
            }
          })
        }), define("zrender/graphic/shape/Ring", ["require", "../Path"], function (require) {
          return require("../Path").extend({
            type: "ring",
            shape: {cx: 0, cy: 0, r: 0, r0: 0},
            buildPath: function (ctx, shape) {
              var x = shape.cx, y = shape.cy, PI2 = 2 * Math.PI;
              ctx.moveTo(x + shape.r, y), ctx.arc(x, y, shape.r, 0, PI2, !1), ctx.moveTo(x + shape.r0, y), ctx.arc(x, y, shape.r0, 0, PI2, !0)
            }
          })
        }), define("zrender/graphic/shape/Polygon", ["require", "../helper/poly", "../Path"], function (require) {
          var polyHelper = require("../helper/poly");
          return require("../Path").extend({
            type: "polygon",
            shape: {points: null, smooth: !1, smoothConstraint: null},
            buildPath: function (ctx, shape) {
              polyHelper.buildPath(ctx, shape, !0)
            }
          })
        }), define("zrender/graphic/shape/Polyline", ["require", "../helper/poly", "../Path"], function (require) {
          var polyHelper = require("../helper/poly");
          return require("../Path").extend({
            type: "polyline",
            shape: {points: null, smooth: !1, smoothConstraint: null},
            style: {stroke: "#000", fill: null},
            buildPath: function (ctx, shape) {
              polyHelper.buildPath(ctx, shape, !1)
            }
          })
        }), define("zrender/graphic/shape/Rect", ["require", "../helper/roundRect", "../Path"], function (require) {
          var roundRectHelper = require("../helper/roundRect");
          return require("../Path").extend({
            type: "rect", shape: {r: 0, x: 0, y: 0, width: 0, height: 0}, buildPath: function (ctx, shape) {
              var x = shape.x, y = shape.y, width = shape.width, height = shape.height;
              shape.r ? roundRectHelper.buildPath(ctx, shape) : ctx.rect(x, y, width, height), ctx.closePath()
            }
          })
        }), define("zrender/graphic/shape/Line", ["require", "../Path"], function (require) {
          return require("../Path").extend({
            type: "line",
            shape: {x1: 0, y1: 0, x2: 0, y2: 0, percent: 1},
            style: {stroke: "#000", fill: null},
            buildPath: function (ctx, shape) {
              var x1 = shape.x1, y1 = shape.y1, x2 = shape.x2, y2 = shape.y2, percent = shape.percent;
              0 !== percent && (ctx.moveTo(x1, y1), percent < 1 && (x2 = x1 * (1 - percent) + x2 * percent, y2 = y1 * (1 - percent) + y2 * percent), ctx.lineTo(x2, y2))
            },
            pointAt: function (p) {
              var shape = this.shape;
              return [shape.x1 * (1 - p) + shape.x2 * p, shape.y1 * (1 - p) + shape.y2 * p]
            }
          })
        }), define("zrender/graphic/shape/BezierCurve", ["require", "../../core/curve", "../../core/vector", "../Path"], function (require) {
          function someVectorAt(shape, t, isTangent) {
            var cpx2 = shape.cpx2, cpy2 = shape.cpy2;
            return null === cpx2 || null === cpy2 ? [(isTangent ? cubicDerivativeAt : cubicAt)(shape.x1, shape.cpx1, shape.cpx2, shape.x2, t), (isTangent ? cubicDerivativeAt : cubicAt)(shape.y1, shape.cpy1, shape.cpy2, shape.y2, t)] : [(isTangent ? quadraticDerivativeAt : quadraticAt)(shape.x1, shape.cpx1, shape.x2, t), (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.y1, shape.cpy1, shape.y2, t)]
          }
          
          var curveTool = require("../../core/curve"), vec2 = require("../../core/vector"),
            quadraticSubdivide = curveTool.quadraticSubdivide, cubicSubdivide = curveTool.cubicSubdivide,
            quadraticAt = curveTool.quadraticAt, cubicAt = curveTool.cubicAt,
            quadraticDerivativeAt = curveTool.quadraticDerivativeAt, cubicDerivativeAt = curveTool.cubicDerivativeAt,
            out = [];
          return require("../Path").extend({
            type: "bezier-curve",
            shape: {x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1},
            style: {stroke: "#000", fill: null},
            buildPath: function (ctx, shape) {
              var x1 = shape.x1, y1 = shape.y1, x2 = shape.x2, y2 = shape.y2, cpx1 = shape.cpx1, cpy1 = shape.cpy1,
                cpx2 = shape.cpx2, cpy2 = shape.cpy2, percent = shape.percent;
              0 !== percent && (ctx.moveTo(x1, y1), null == cpx2 || null == cpy2 ? (percent < 1 && (quadraticSubdivide(x1, cpx1, x2, percent, out), cpx1 = out[1], x2 = out[2], quadraticSubdivide(y1, cpy1, y2, percent, out), cpy1 = out[1], y2 = out[2]), ctx.quadraticCurveTo(cpx1, cpy1, x2, y2)) : (percent < 1 && (cubicSubdivide(x1, cpx1, cpx2, x2, percent, out), cpx1 = out[1], cpx2 = out[2], x2 = out[3], cubicSubdivide(y1, cpy1, cpy2, y2, percent, out), cpy1 = out[1], cpy2 = out[2], y2 = out[3]), ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2)))
            },
            pointAt: function (t) {
              return someVectorAt(this.shape, t, !1)
            },
            tangentAt: function (t) {
              var p = someVectorAt(this.shape, t, !0);
              return vec2.normalize(p, p)
            }
          })
        }), define("zrender/graphic/shape/Arc", ["require", "../Path"], function (require) {
          return require("../Path").extend({
            type: "arc",
            shape: {cx: 0, cy: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
            style: {stroke: "#000", fill: null},
            buildPath: function (ctx, shape) {
              var x = shape.cx, y = shape.cy, r = Math.max(shape.r, 0), startAngle = shape.startAngle,
                endAngle = shape.endAngle, clockwise = shape.clockwise, unitX = Math.cos(startAngle),
                unitY = Math.sin(startAngle);
              ctx.moveTo(unitX * r + x, unitY * r + y), ctx.arc(x, y, r, startAngle, endAngle, !clockwise)
            }
          })
        }), define("zrender/graphic/CompoundPath", ["require", "./Path"], function (require) {
          var Path = require("./Path");
          return Path.extend({
            type: "compound", shape: {paths: null}, _updatePathDirty: function () {
              for (var dirtyPath = this.__dirtyPath, paths = this.shape.paths, i = 0; i < paths.length; i++)dirtyPath = dirtyPath || paths[i].__dirtyPath;
              this.__dirtyPath = dirtyPath, this.__dirty = this.__dirty || dirtyPath
            }, beforeBrush: function () {
              this._updatePathDirty();
              for (var paths = this.shape.paths || [], scale = this.getGlobalScale(), i = 0; i < paths.length; i++)paths[i].path || paths[i].createPathProxy(), paths[i].path.setScale(scale[0], scale[1])
            }, buildPath: function (ctx, shape) {
              for (var paths = shape.paths || [], i = 0; i < paths.length; i++)paths[i].buildPath(ctx, paths[i].shape, !0)
            }, afterBrush: function () {
              for (var paths = this.shape.paths, i = 0; i < paths.length; i++)paths[i].__dirtyPath = !1
            }, getBoundingRect: function () {
              return this._updatePathDirty(), Path.prototype.getBoundingRect.call(this)
            }
          })
        }), define("zrender/graphic/LinearGradient", ["require", "../core/util", "./Gradient"], function (require) {
          var zrUtil = require("../core/util"), Gradient = require("./Gradient"),
            LinearGradient = function (x, y, x2, y2, colorStops, globalCoord) {
              this.x = null == x ? 0 : x, this.y = null == y ? 0 : y, this.x2 = null == x2 ? 1 : x2, this.y2 = null == y2 ? 0 : y2, this.type = "linear", this.global = globalCoord || !1, Gradient.call(this, colorStops)
            };
          return LinearGradient.prototype = {constructor: LinearGradient}, zrUtil.inherits(LinearGradient, Gradient), LinearGradient
        }), define("zrender/graphic/RadialGradient", ["require", "../core/util", "./Gradient"], function (require) {
          var zrUtil = require("../core/util"), Gradient = require("./Gradient"),
            RadialGradient = function (x, y, r, colorStops, globalCoord) {
              this.x = null == x ? .5 : x, this.y = null == y ? .5 : y, this.r = null == r ? .5 : r, this.type = "radial", this.global = globalCoord || !1, Gradient.call(this, colorStops)
            };
          return RadialGradient.prototype = {constructor: RadialGradient}, zrUtil.inherits(RadialGradient, Gradient), RadialGradient
        }), define("echarts/model/globalDefault", [], function () {
          var platform = "";
          return "undefined" != typeof navigator && (platform = navigator.platform || ""), {
            color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
            textStyle: {
              fontFamily: platform.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: "normal"
            },
            blendMode: null,
            animation: "auto",
            animationDuration: 1e3,
            animationDurationUpdate: 300,
            animationEasing: "exponentialOut",
            animationEasingUpdate: "cubicOut",
            animationThreshold: 2e3,
            progressiveThreshold: 3e3,
            progressive: 400,
            hoverLayerThreshold: 3e3,
            useUTC: !1
          }
        }), define("echarts/model/mixin/colorPalette", ["require", "../../util/clazz"], function (require) {
          var classUtil = require("../../util/clazz"), set = classUtil.set, get = classUtil.get;
          return {
            clearColorPalette: function () {
              set(this, "colorIdx", 0), set(this, "colorNameMap", {})
            }, getColorFromPalette: function (name, scope) {
              scope = scope || this;
              var colorIdx = get(scope, "colorIdx") || 0,
                colorNameMap = get(scope, "colorNameMap") || set(scope, "colorNameMap", {});
              if (colorNameMap[name])return colorNameMap[name];
              var colorPalette = this.get("color", !0) || [];
              if (colorPalette.length) {
                var color = colorPalette[colorIdx];
                return name && (colorNameMap[name] = color), set(scope, "colorIdx", (colorIdx + 1) % colorPalette.length), color
              }
            }
          }
        }), define("zrender/contain/text", ["require", "../core/util", "../core/BoundingRect"], function (require) {
          function getTextWidth(text, textFont) {
            var key = text + ":" + textFont;
            if (textWidthCache[key])return textWidthCache[key];
            for (var textLines = (text + "").split("\n"), width = 0, i = 0, l = textLines.length; i < l; i++)width = Math.max(textContain.measureText(textLines[i], textFont).width, width);
            return textWidthCacheCounter > TEXT_CACHE_MAX && (textWidthCacheCounter = 0, textWidthCache = {}), textWidthCacheCounter++, textWidthCache[key] = width, width
          }
          
          function getTextRect(text, textFont, textAlign, textBaseline) {
            var textLineLen = ((text || "") + "").split("\n").length, width = getTextWidth(text, textFont),
              lineHeight = getTextWidth("国", textFont), height = textLineLen * lineHeight,
              rect = new BoundingRect(0, 0, width, height);
            switch (rect.lineHeight = lineHeight, textBaseline) {
              case"bottom":
              case"alphabetic":
                rect.y -= lineHeight;
                break;
              case"middle":
                rect.y -= lineHeight / 2
            }
            switch (textAlign) {
              case"end":
              case"right":
                rect.x -= rect.width;
                break;
              case"center":
                rect.x -= rect.width / 2
            }
            return rect
          }
          
          function adjustTextPositionOnRect(textPosition, rect, textRect, distance) {
            var x = rect.x, y = rect.y, height = rect.height, width = rect.width, textHeight = textRect.height,
              lineHeight = textRect.lineHeight, halfHeight = height / 2 - textHeight / 2 + lineHeight,
              textAlign = "left";
            switch (textPosition) {
              case"left":
                x -= distance, y += halfHeight, textAlign = "right";
                break;
              case"right":
                x += distance + width, y += halfHeight, textAlign = "left";
                break;
              case"top":
                x += width / 2, y -= distance + textHeight - lineHeight, textAlign = "center";
                break;
              case"bottom":
                x += width / 2, y += height + distance + lineHeight, textAlign = "center";
                break;
              case"inside":
                x += width / 2, y += halfHeight, textAlign = "center";
                break;
              case"insideLeft":
                x += distance, y += halfHeight, textAlign = "left";
                break;
              case"insideRight":
                x += width - distance, y += halfHeight, textAlign = "right";
                break;
              case"insideTop":
                x += width / 2, y += distance + lineHeight, textAlign = "center";
                break;
              case"insideBottom":
                x += width / 2, y += height - textHeight - distance + lineHeight, textAlign = "center";
                break;
              case"insideTopLeft":
                x += distance, y += distance + lineHeight, textAlign = "left";
                break;
              case"insideTopRight":
                x += width - distance, y += distance + lineHeight, textAlign = "right";
                break;
              case"insideBottomLeft":
                x += distance, y += height - textHeight - distance + lineHeight;
                break;
              case"insideBottomRight":
                x += width - distance, y += height - textHeight - distance + lineHeight, textAlign = "right"
            }
            return {x: x, y: y, textAlign: textAlign, textBaseline: "alphabetic"}
          }
          
          function truncateText(text, containerWidth, textFont, ellipsis, options) {
            if (!containerWidth)return "";
            options = options || {}, ellipsis = retrieve(ellipsis, "...");
            for (var maxIterations = retrieve(options.maxIterations, 2), minChar = retrieve(options.minChar, 0), cnCharWidth = getTextWidth("国", textFont), ascCharWidth = getTextWidth("a", textFont), placeholder = retrieve(options.placeholder, ""), contentWidth = containerWidth = Math.max(0, containerWidth - 1), i = 0; i < minChar && contentWidth >= ascCharWidth; i++)contentWidth -= ascCharWidth;
            var ellipsisWidth = getTextWidth(ellipsis);
            ellipsisWidth > contentWidth && (ellipsis = "", ellipsisWidth = 0), contentWidth = containerWidth - ellipsisWidth;
            for (var textLines = (text + "").split("\n"), i = 0, len = textLines.length; i < len; i++) {
              var textLine = textLines[i], lineWidth = getTextWidth(textLine, textFont);
              if (!(lineWidth <= containerWidth)) {
                for (var j = 0; ; j++) {
                  if (lineWidth <= contentWidth || j >= maxIterations) {
                    textLine += ellipsis;
                    break
                  }
                  var subLength = 0 === j ? estimateLength(textLine, contentWidth, ascCharWidth, cnCharWidth) : lineWidth > 0 ? Math.floor(textLine.length * contentWidth / lineWidth) : 0;
                  textLine = textLine.substr(0, subLength), lineWidth = getTextWidth(textLine, textFont)
                }
                "" === textLine && (textLine = placeholder), textLines[i] = textLine
              }
            }
            return textLines.join("\n")
          }
          
          function estimateLength(text, contentWidth, ascCharWidth, cnCharWidth) {
            for (var width = 0, i = 0, len = text.length; i < len && width < contentWidth; i++) {
              var charCode = text.charCodeAt(i);
              width += 0 <= charCode && charCode <= 127 ? ascCharWidth : cnCharWidth
            }
            return i
          }
          
          var textWidthCache = {}, textWidthCacheCounter = 0, TEXT_CACHE_MAX = 5e3, util = require("../core/util"),
            BoundingRect = require("../core/BoundingRect"), retrieve = util.retrieve, textContain = {
              getWidth: getTextWidth,
              getBoundingRect: getTextRect,
              adjustTextPositionOnRect: adjustTextPositionOnRect,
              truncateText: truncateText,
              measureText: function (text, textFont) {
                var ctx = util.getContext();
                return ctx.font = textFont || "12px sans-serif", ctx.measureText(text)
              }
            };
          return textContain
        }),define("echarts/util/clazz", ["require", "zrender/core/util"], function (require) {
          function checkClassType(componentType) {
            zrUtil.assert(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(componentType), 'componentType "' + componentType + '" illegal')
          }
          
          function superCall(context, methodName) {
            var args = zrUtil.slice(arguments, 2);
            return this.superClass.prototype[methodName].apply(context, args)
          }
          
          function superApply(context, methodName, args) {
            return this.superClass.prototype[methodName].apply(context, args)
          }
          
          var zrUtil = require("zrender/core/util"), clazz = {}, TYPE_DELIMITER = ".",
            IS_CONTAINER = "___EC__COMPONENT__CONTAINER___", MEMBER_PRIFIX = "\0ec_\0";
          clazz.set = function (host, name, value) {
            return host[MEMBER_PRIFIX + name] = value
          }, clazz.get = function (host, name) {
            return host[MEMBER_PRIFIX + name]
          }, clazz.hasOwn = function (host, name) {
            return host.hasOwnProperty(MEMBER_PRIFIX + name)
          };
          var parseClassType = clazz.parseClassType = function (componentType) {
            var ret = {main: "", sub: ""};
            return componentType && (componentType = componentType.split(TYPE_DELIMITER), ret.main = componentType[0] || "", ret.sub = componentType[1] || ""), ret
          };
          return clazz.enableClassExtend = function (RootClass, mandatoryMethods) {
            RootClass.$constructor = RootClass, RootClass.extend = function (proto) {
              zrUtil.each(mandatoryMethods, function (method) {
                !proto[method]
              });
              var superClass = this, ExtendedClass = function () {
                proto.$constructor ? proto.$constructor.apply(this, arguments) : superClass.apply(this, arguments)
              };
              return zrUtil.extend(ExtendedClass.prototype, proto), ExtendedClass.extend = this.extend, ExtendedClass.superCall = superCall, ExtendedClass.superApply = superApply, zrUtil.inherits(ExtendedClass, this), ExtendedClass.superClass = superClass, ExtendedClass
            }
          }, clazz.enableClassManagement = function (entity, options) {
            function makeContainer(componentType) {
              var container = storage[componentType.main];
              return container && container[IS_CONTAINER] || (container = storage[componentType.main] = {}, container[IS_CONTAINER] = !0), container
            }
            
            options = options || {};
            var storage = {};
            if (entity.registerClass = function (Clazz, componentType) {
                if (componentType)if (checkClassType(componentType), componentType = parseClassType(componentType), componentType.sub) {
                  if (componentType.sub !== IS_CONTAINER) {
                    var container = makeContainer(componentType);
                    container[componentType.sub] = Clazz
                  }
                } else storage[componentType.main], storage[componentType.main] = Clazz;
                return Clazz
              }, entity.getClass = function (componentMainType, subType, throwWhenNotFound) {
                var Clazz = storage[componentMainType];
                if (Clazz && Clazz[IS_CONTAINER] && (Clazz = subType ? Clazz[subType] : null), throwWhenNotFound && !Clazz)throw new Error(subType ? "Component " + componentMainType + "." + (subType || "") + " not exists. Load it first." : componentMainType + ".type should be specified.");
                return Clazz
              }, entity.getClassesByMainType = function (componentType) {
                componentType = parseClassType(componentType);
                var result = [], obj = storage[componentType.main];
                return obj && obj[IS_CONTAINER] ? zrUtil.each(obj, function (o, type) {
                  type !== IS_CONTAINER && result.push(o)
                }) : result.push(obj), result
              }, entity.hasClass = function (componentType) {
                return componentType = parseClassType(componentType), !!storage[componentType.main]
              }, entity.getAllClassMainTypes = function () {
                var types = [];
                return zrUtil.each(storage, function (obj, type) {
                  types.push(type)
                }), types
              }, entity.hasSubTypes = function (componentType) {
                componentType = parseClassType(componentType);
                var obj = storage[componentType.main];
                return obj && obj[IS_CONTAINER]
              }, entity.parseClassType = parseClassType, options.registerWhenExtend) {
              var originalExtend = entity.extend;
              originalExtend && (entity.extend = function (proto) {
                var ExtendedClass = originalExtend.call(this, proto);
                return entity.registerClass(ExtendedClass, proto.type)
              })
            }
            return entity
          }, clazz.setReadOnly = function (obj, properties) {
          }, clazz
        }),define("echarts/model/mixin/lineStyle", ["require", "./makeStyleMapper"], function (require) {
          var _getLineStyle = require("./makeStyleMapper")([["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]);
          return {
            getLineStyle: function (excludes) {
              var style = _getLineStyle.call(this, excludes), lineDash = this.getLineDash(style.lineWidth);
              return lineDash && (style.lineDash = lineDash), style
            }, getLineDash: function (lineWidth) {
              null == lineWidth && (lineWidth = 1);
              var lineType = this.get("type"), dotSize = Math.max(lineWidth, 2), dashSize = 4 * lineWidth;
              return "solid" === lineType || null == lineType ? null : "dashed" === lineType ? [dashSize, dashSize] : [dotSize, dotSize]
            }
          }
        }),define("echarts/model/mixin/areaStyle", ["require", "./makeStyleMapper"], function (require) {
          return {getAreaStyle: require("./makeStyleMapper")([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]])}
        }),define("echarts/model/mixin/textStyle", ["require", "zrender/contain/text"], function (require) {
          function getShallow(model, path) {
            return model && model.getShallow(path)
          }
          
          var textContain = require("zrender/contain/text");
          return {
            getTextColor: function () {
              var ecModel = this.ecModel;
              return this.getShallow("color") || ecModel && ecModel.get("textStyle.color")
            }, getFont: function () {
              var ecModel = this.ecModel, gTextStyleModel = ecModel && ecModel.getModel("textStyle");
              return [this.getShallow("fontStyle") || getShallow(gTextStyleModel, "fontStyle"), this.getShallow("fontWeight") || getShallow(gTextStyleModel, "fontWeight"), (this.getShallow("fontSize") || getShallow(gTextStyleModel, "fontSize") || 12) + "px", this.getShallow("fontFamily") || getShallow(gTextStyleModel, "fontFamily") || "sans-serif"].join(" ")
            }, getTextRect: function (text) {
              return textContain.getBoundingRect(text, this.getFont(), this.getShallow("align"), this.getShallow("baseline"))
            }, truncateText: function (text, containerWidth, ellipsis, options) {
              return textContain.truncateText(text, containerWidth, this.getFont(), ellipsis, options)
            }
          }
        }),define("echarts/model/mixin/itemStyle", ["require", "./makeStyleMapper"], function (require) {
          var _getItemStyle = require("./makeStyleMapper")([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["textPosition"], ["textAlign"]]);
          return {
            getItemStyle: function (excludes, includes) {
              var style = _getItemStyle.call(this, excludes, includes), lineDash = this.getBorderLineDash();
              return lineDash && (style.lineDash = lineDash), style
            }, getBorderLineDash: function () {
              var lineType = this.get("borderType");
              return "solid" === lineType || null == lineType ? null : "dashed" === lineType ? [5, 5] : [1, 1]
            }
          }
        }),define("echarts/component/axisPointer/modelHelper", ["require", "zrender/core/util", "../../model/Model"], function (require) {
          function collectAxesInfo(result, ecModel, api) {
            var globalTooltipModel = ecModel.getComponent("tooltip"),
              globalAxisPointerModel = ecModel.getComponent("axisPointer"),
              linksOption = globalAxisPointerModel.get("link", !0) || [], linkGroups = [];
            each(api.getCoordinateSystems(), function (coordSys) {
              function saveTooltipAxisInfo(fromTooltip, triggerTooltip, axis) {
                var axisPointerModel = axis.model.getModel("axisPointer", globalAxisPointerModel),
                  axisPointerShow = axisPointerModel.get("show");
                if (axisPointerShow && ("auto" !== axisPointerShow || fromTooltip || isHandleTrigger(axisPointerModel))) {
                  null == triggerTooltip && (triggerTooltip = axisPointerModel.get("triggerTooltip")), axisPointerModel = fromTooltip ? makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) : axisPointerModel;
                  var snap = axisPointerModel.get("snap"), key = makeKey(axis.model),
                    involveSeries = triggerTooltip || snap || "category" === axis.type,
                    axisInfo = result.axesInfo[key] = {
                      key: key,
                      axis: axis,
                      coordSys: coordSys,
                      axisPointerModel: axisPointerModel,
                      triggerTooltip: triggerTooltip,
                      involveSeries: involveSeries,
                      snap: snap,
                      useHandle: isHandleTrigger(axisPointerModel),
                      seriesModels: []
                    };
                  axesInfoInCoordSys[key] = axisInfo, result.seriesInvolved |= involveSeries;
                  var groupIndex = getLinkGroupIndex(linksOption, axis);
                  if (null != groupIndex) {
                    var linkGroup = linkGroups[groupIndex] || (linkGroups[groupIndex] = {axesInfo: {}});
                    linkGroup.axesInfo[key] = axisInfo, linkGroup.mapper = linksOption[groupIndex].mapper, axisInfo.linkGroup = linkGroup
                  }
                }
              }
              
              if (coordSys.axisPointerEnabled) {
                var coordSysKey = makeKey(coordSys.model),
                  axesInfoInCoordSys = result.coordSysAxesInfo[coordSysKey] = {};
                result.coordSysMap[coordSysKey] = coordSys;
                var coordSysModel = coordSys.model,
                  baseTooltipModel = coordSysModel.getModel("tooltip", globalTooltipModel);
                if (each(coordSys.getAxes(), curry(saveTooltipAxisInfo, !1, null)), coordSys.getTooltipAxes && globalTooltipModel && baseTooltipModel.get("show")) {
                  var triggerAxis = "axis" === baseTooltipModel.get("trigger"),
                    cross = "cross" === baseTooltipModel.get("axisPointer.type"),
                    tooltipAxes = coordSys.getTooltipAxes(baseTooltipModel.get("axisPointer.axis"));
                  (triggerAxis || cross) && each(tooltipAxes.baseAxes, curry(saveTooltipAxisInfo, !cross || "cross", triggerAxis)), cross && each(tooltipAxes.otherAxes, curry(saveTooltipAxisInfo, "cross", !1))
                }
              }
            })
          }
          
          function makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) {
            var tooltipAxisPointerModel = baseTooltipModel.getModel("axisPointer"), volatileOption = {};
            each(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], function (field) {
              volatileOption[field] = zrUtil.clone(tooltipAxisPointerModel.get(field))
            }), volatileOption.snap = "category" !== axis.type && !!triggerTooltip, "cross" === tooltipAxisPointerModel.get("type") && (volatileOption.type = "line");
            var labelOption = volatileOption.label || (volatileOption.label = {});
            if (null == labelOption.show && (labelOption.show = !1), "cross" === fromTooltip && (labelOption.show = !0, !triggerTooltip)) {
              var crossStyle = volatileOption.lineStyle = tooltipAxisPointerModel.get("crossStyle");
              crossStyle && zrUtil.defaults(labelOption.textStyle || (labelOption.textStyle = {}), crossStyle.textStyle)
            }
            return axis.model.getModel("axisPointer", new Model(volatileOption, globalAxisPointerModel, ecModel))
          }
          
          function collectSeriesInfo(result, ecModel) {
            ecModel.eachSeries(function (seriesModel) {
              var coordSys = seriesModel.coordinateSystem,
                seriesTooltipTrigger = seriesModel.get("tooltip.trigger", !0);
              coordSys && "none" !== seriesTooltipTrigger && seriesTooltipTrigger !== !1 && "item" !== seriesTooltipTrigger && seriesModel.get("axisPointer.show", !0) !== !1 && each(result.coordSysAxesInfo[makeKey(coordSys.model)], function (axisInfo) {
                var axis = axisInfo.axis;
                coordSys.getAxis(axis.dim) === axis && (axisInfo.seriesModels.push(seriesModel), null == axisInfo.seriesDataCount && (axisInfo.seriesDataCount = 0), axisInfo.seriesDataCount += seriesModel.getData().count())
              })
            }, this)
          }
          
          function getLinkGroupIndex(linksOption, axis) {
            for (var axisModel = axis.model, dim = axis.dim, i = 0; i < linksOption.length; i++) {
              var linkOption = linksOption[i] || {};
              if (checkPropInLink(linkOption[dim + "AxisId"], axisModel.id) || checkPropInLink(linkOption[dim + "AxisIndex"], axisModel.componentIndex) || checkPropInLink(linkOption[dim + "AxisName"], axisModel.name))return i
            }
          }
          
          function checkPropInLink(linkPropValue, axisPropValue) {
            return "all" === linkPropValue || zrUtil.isArray(linkPropValue) && zrUtil.indexOf(linkPropValue, axisPropValue) >= 0 || linkPropValue === axisPropValue
          }
          
          function isHandleTrigger(axisPointerModel) {
            return !!axisPointerModel.get("handle.show")
          }
          
          var zrUtil = require("zrender/core/util"), Model = require("../../model/Model"), each = zrUtil.each,
            curry = zrUtil.curry, helper = {};
          helper.collect = function (ecModel, api) {
            var result = {axesInfo: {}, seriesInvolved: !1, coordSysAxesInfo: {}, coordSysMap: {}};
            return collectAxesInfo(result, ecModel, api), result.seriesInvolved && collectSeriesInfo(result, ecModel), result
          }, helper.fixValue = function (axisModel) {
            var axisInfo = helper.getAxisInfo(axisModel);
            if (axisInfo) {
              var axisPointerModel = axisInfo.axisPointerModel, scale = axisInfo.axis.scale,
                option = axisPointerModel.option, status = axisPointerModel.get("status"),
                value = axisPointerModel.get("value");
              null != value && (value = scale.parse(value));
              var useHandle = isHandleTrigger(axisPointerModel);
              null == status && (option.status = useHandle ? "show" : "hide");
              var extent = scale.getExtent().slice();
              extent[0] > extent[1] && extent.reverse(), (null == value || value > extent[1]) && (value = extent[1]), value < extent[0] && (value = extent[0]), option.value = value, useHandle && (option.status = axisInfo.axis.scale.isBlank() ? "hide" : "show")
            }
          }, helper.getAxisInfo = function (axisModel) {
            var coordSysAxesInfo = (axisModel.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
            return coordSysAxesInfo && coordSysAxesInfo.axesInfo[makeKey(axisModel)]
          }, helper.getAxisPointerModel = function (axisModel) {
            var axisInfo = helper.getAxisInfo(axisModel);
            return axisInfo && axisInfo.axisPointerModel
          };
          var makeKey = helper.makeKey = function (model) {
            return model.type + "||" + model.id
          };
          return helper
        }),define("echarts/component/axisPointer/axisTrigger", ["require", "zrender/core/util", "../../util/model", "./modelHelper", "./findPointFromSeries"], function (require) {
          function axisTrigger(coordSysAxesInfo, currTrigger, point, finder, dispatchAction, ecModel, api, tooltipOption, highDownKey) {
            finder = finder || {}, point && null != point[0] && null != point[1] || (point = findPointFromSeries({
              seriesIndex: finder.seriesIndex,
              dataIndex: finder.dataIndex
            }, ecModel).point);
            var axesInfo = coordSysAxesInfo.axesInfo, shouldHide = "leave" === currTrigger || illegalPoint(point),
              outputFinder = {}, showValueMap = {}, dataByCoordSys = {list: [], map: {}}, highlightBatch = [],
              updaters = {
                showPointer: curry(showPointer, showValueMap),
                showTooltip: curry(showTooltip, dataByCoordSys),
                highlight: curry(highlight, highlightBatch)
              };
            each(coordSysAxesInfo.coordSysMap, function (coordSys, coordSysKey) {
              var coordSysContainsPoint = coordSys.containPoint(point);
              each(coordSysAxesInfo.coordSysAxesInfo[coordSysKey], function (axisInfo, key) {
                var axis = axisInfo.axis;
                shouldHide || !coordSysContainsPoint || notTargetAxis(finder, axis) || processOnAxis(axisInfo, axis.pointToData(point), updaters, !1, outputFinder)
              })
            });
            var linkTriggers = {};
            return each(axesInfo, function (tarAxisInfo, tarKey) {
              var linkGroup = tarAxisInfo.linkGroup;
              linkGroup && !showValueMap[tarKey] && each(linkGroup.axesInfo, function (srcAxisInfo, srcKey) {
                var srcValItem = showValueMap[srcKey];
                if (srcAxisInfo !== tarAxisInfo && srcValItem) {
                  var val = srcValItem.value;
                  linkGroup.mapper && (val = tarAxisInfo.axis.scale.parse(linkGroup.mapper(val, makeMapperParam(srcAxisInfo), makeMapperParam(tarAxisInfo)))), linkTriggers[tarAxisInfo.key] = val
                }
              })
            }), each(linkTriggers, function (val, tarKey) {
              processOnAxis(axesInfo[tarKey], val, updaters, !0, outputFinder)
            }), updateModelActually(showValueMap, axesInfo), dispatchTooltipActually(dataByCoordSys, point, tooltipOption, dispatchAction), dispatchHighDownActually(highlightBatch, dispatchAction, api, highDownKey), outputFinder
          }
          
          function processOnAxis(axisInfo, newValue, updaters, dontSnap, outputFinder) {
            var axis = axisInfo.axis;
            if (!axis.scale.isBlank() && axis.containData(newValue)) {
              if (!axisInfo.involveSeries)return void updaters.showPointer(axisInfo, newValue);
              var payloadInfo = buildPayloadsBySeries(newValue, axisInfo), payloadBatch = payloadInfo.payloadBatch,
                snapToValue = payloadInfo.snapToValue;
              payloadBatch[0] && null == outputFinder.seriesIndex && zrUtil.extend(outputFinder, payloadBatch[0]), !dontSnap && axisInfo.snap && axis.containData(snapToValue) && null != snapToValue && (newValue = snapToValue), updaters.highlight("highlight", payloadBatch), updaters.showPointer(axisInfo, newValue, payloadBatch), updaters.showTooltip(axisInfo, payloadInfo, snapToValue)
            }
          }
          
          function buildPayloadsBySeries(value, axisInfo) {
            var axis = axisInfo.axis, dim = axis.dim, snapToValue = value, payloadBatch = [],
              minDist = Number.MAX_VALUE, minDiff = -1;
            return each(axisInfo.seriesModels, function (series, idx) {
              var seriesNestestValue, dataIndices, dataDim = series.coordDimToDataDim(dim);
              if (series.getAxisTooltipData) {
                var result = series.getAxisTooltipData(dataDim, value, axis);
                dataIndices = result.dataIndices, seriesNestestValue = result.nestestValue
              } else {
                if (dataIndices = series.getData().indicesOfNearest(dataDim[0], value, !1, "category" === axis.type ? .5 : null), !dataIndices.length)return;
                seriesNestestValue = series.getData().get(dataDim[0], dataIndices[0])
              }
              if (null != seriesNestestValue && isFinite(seriesNestestValue)) {
                var diff = value - seriesNestestValue, dist = Math.abs(diff);
                dist <= minDist && ((dist < minDist || diff >= 0 && minDiff < 0) && (minDist = dist, minDiff = diff, snapToValue = seriesNestestValue, payloadBatch.length = 0), each(dataIndices, function (dataIndex) {
                  payloadBatch.push({
                    seriesIndex: series.seriesIndex,
                    dataIndexInside: dataIndex,
                    dataIndex: series.getData().getRawIndex(dataIndex)
                  })
                }))
              }
            }), {payloadBatch: payloadBatch, snapToValue: snapToValue}
          }
          
          function showPointer(showValueMap, axisInfo, value, payloadBatch) {
            showValueMap[axisInfo.key] = {value: value, payloadBatch: payloadBatch}
          }
          
          function showTooltip(dataByCoordSys, axisInfo, payloadInfo, value) {
            var payloadBatch = payloadInfo.payloadBatch, axis = axisInfo.axis, axisModel = axis.model,
              axisPointerModel = axisInfo.axisPointerModel;
            if (axisInfo.triggerTooltip && payloadBatch.length) {
              var coordSysModel = axisInfo.coordSys.model, coordSysKey = modelHelper.makeKey(coordSysModel),
                coordSysItem = dataByCoordSys.map[coordSysKey];
              coordSysItem || (coordSysItem = dataByCoordSys.map[coordSysKey] = {
                coordSysId: coordSysModel.id,
                coordSysIndex: coordSysModel.componentIndex,
                coordSysType: coordSysModel.type,
                coordSysMainType: coordSysModel.mainType,
                dataByAxis: []
              }, dataByCoordSys.list.push(coordSysItem)), coordSysItem.dataByAxis.push({
                axisDim: axis.dim,
                axisIndex: axisModel.componentIndex,
                axisType: axisModel.type,
                axisId: axisModel.id,
                value: value,
                valueLabelOpt: {
                  precision: axisPointerModel.get("label.precision"),
                  formatter: axisPointerModel.get("label.formatter")
                },
                seriesDataIndices: payloadBatch.slice()
              })
            }
          }
          
          function highlight(highlightBatch, actionType, batch) {
            highlightBatch.push.apply(highlightBatch, batch)
          }
          
          function updateModelActually(showValueMap, axesInfo) {
            each(axesInfo, function (axisInfo, key) {
              var option = axisInfo.axisPointerModel.option, valItem = showValueMap[key];
              valItem ? (!axisInfo.useHandle && (option.status = "show"), option.value = valItem.value, option.seriesDataIndices = (valItem.payloadBatch || []).slice()) : !axisInfo.useHandle && (option.status = "hide")
            })
          }
          
          function dispatchTooltipActually(dataByCoordSys, point, tooltipOption, dispatchAction) {
            if (illegalPoint(point) || !dataByCoordSys.list.length)return void dispatchAction({type: "hideTip"});
            var sampleItem = ((dataByCoordSys.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
            dispatchAction({
              type: "showTip",
              escapeConnect: !0,
              x: point[0],
              y: point[1],
              tooltipOption: tooltipOption,
              dataIndexInside: sampleItem.dataIndexInside,
              dataIndex: sampleItem.dataIndex,
              seriesIndex: sampleItem.seriesIndex,
              dataByCoordSys: dataByCoordSys.list
            })
          }
          
          function dispatchHighDownActually(highlightBatch, dispatchAction, api, highDownKey) {
            var zr = api.getZr();
            highDownKey = "lastHighlights" + (highDownKey || "");
            var lastHighlights = get(zr)[highDownKey] || {}, newHighlights = get(zr)[highDownKey] = {};
            zrUtil.each(highlightBatch, function (batchItem) {
              var key = batchItem.seriesIndex + " | " + batchItem.dataIndex;
              newHighlights[key] = batchItem
            });
            var toHighlight = [], toDownplay = [];
            zrUtil.each(lastHighlights, function (batchItem, key) {
              !newHighlights[key] && toDownplay.push(batchItem)
            }), zrUtil.each(newHighlights, function (batchItem, key) {
              !lastHighlights[key] && toHighlight.push(batchItem)
            }), toDownplay.length && api.dispatchAction({
              type: "downplay",
              escapeConnect: !0,
              batch: toDownplay
            }), toHighlight.length && api.dispatchAction({type: "highlight", escapeConnect: !0, batch: toHighlight})
          }
          
          function notTargetAxis(finder, axis) {
            var isTarget = 1;
            return each(finder, function (value, propName) {
              isTarget &= !/^.+(AxisId|AxisName|AxisIndex)$/.test(propName)
            }), !isTarget && each([["AxisId", "id"], ["AxisIndex", "componentIndex"], ["AxisName", "name"]], function (prop) {
              var vals = modelUtil.normalizeToArray(finder[axis.dim + prop[0]]);
              isTarget |= zrUtil.indexOf(vals, axis.model[prop[1]]) >= 0
            }), !isTarget
          }
          
          function makeMapperParam(axisInfo) {
            var axisModel = axisInfo.axis.model, item = {}, dim = item.axisDim = axisInfo.axis.dim;
            return item.axisIndex = item[dim + "AxisIndex"] = axisModel.componentIndex, item.axisName = item[dim + "AxisName"] = axisModel.name, item.axisId = item[dim + "AxisId"] = axisModel.id, item
          }
          
          function illegalPoint(point) {
            return null == point[0] || isNaN(point[0]) || null == point[1] || isNaN(point[1])
          }
          
          var zrUtil = require("zrender/core/util"), modelUtil = require("../../util/model"),
            modelHelper = require("./modelHelper"), findPointFromSeries = require("./findPointFromSeries"),
            each = zrUtil.each, curry = zrUtil.curry, get = modelUtil.makeGetter();
          return axisTrigger
        }),define("echarts/component/axisPointer/AxisPointerModel", ["require", "../../echarts"], function (require) {
          var echarts = require("../../echarts"), AxisPointerModel = echarts.extendComponentModel({
            type: "axisPointer",
            coordSysAxesInfo: null,
            defaultOption: {
              show: "auto",
              triggerOn: null,
              zlevel: 0,
              z: 50,
              type: "line",
              snap: !1,
              triggerTooltip: !0,
              value: null,
              status: null,
              link: [],
              animation: null,
              animationDurationUpdate: 200,
              lineStyle: {color: "#aaa", width: 1, type: "solid"},
              shadowStyle: {color: "rgba(150,150,150,0.3)"},
              label: {
                show: !0,
                formatter: null,
                precision: "auto",
                margin: 3,
                textStyle: {color: "#fff"},
                padding: [5, 7, 5, 7],
                backgroundColor: "auto",
                borderColor: null,
                borderWidth: 0,
                shadowBlur: 3,
                shadowColor: "#aaa"
              },
              handle: {
                show: !1,
                icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
                size: 45,
                margin: 50,
                color: "#333",
                shadowBlur: 3,
                shadowColor: "#aaa",
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                throttle: 40
              }
            }
          });
          return AxisPointerModel
        }),define("echarts/component/axisPointer/CartesianAxisPointer", ["require", "../../util/graphic", "./BaseAxisPointer", "./viewHelper", "../axis/cartesianAxisHelper", "../axis/AxisView"], function (require) {
          function getCartesian(grid, axis) {
            var opt = {};
            return opt[axis.dim + "AxisIndex"] = axis.index, grid.getCartesian(opt)
          }
          
          function getAxisDimIndex(axis) {
            return "x" === axis.dim ? 0 : 1
          }
          
          var graphic = require("../../util/graphic"), BaseAxisPointer = require("./BaseAxisPointer"),
            viewHelper = require("./viewHelper"), cartesianAxisHelper = require("../axis/cartesianAxisHelper"),
            AxisView = require("../axis/AxisView"), CartesianAxisPointer = BaseAxisPointer.extend({
              makeElOption: function (elOption, value, axisModel, axisPointerModel, api) {
                var axis = axisModel.axis, grid = axis.grid, axisPointerType = axisPointerModel.get("type"),
                  otherExtent = getCartesian(grid, axis).getOtherAxis(axis).getGlobalExtent(),
                  pixelValue = axis.toGlobalCoord(axis.dataToCoord(value, !0));
                if (axisPointerType && "none" !== axisPointerType) {
                  var elStyle = viewHelper.buildElStyle(axisPointerModel),
                    pointerOption = pointerShapeBuilder[axisPointerType](axis, pixelValue, otherExtent, elStyle);
                  pointerOption.style = elStyle, elOption.graphicKey = pointerOption.type, elOption.pointer = pointerOption
                }
                var layoutInfo = cartesianAxisHelper.layout(grid.model, axisModel);
                viewHelper.buildCartesianSingleLabelElOption(value, elOption, layoutInfo, axisModel, axisPointerModel, api)
              }, getHandleTransform: function (value, axisModel, axisPointerModel) {
                var layoutInfo = cartesianAxisHelper.layout(axisModel.axis.grid.model, axisModel, {labelInside: !1});
                return layoutInfo.labelMargin = axisPointerModel.get("handle.margin"), {
                  position: viewHelper.getTransformedPosition(axisModel.axis, value, layoutInfo),
                  rotation: layoutInfo.rotation + (layoutInfo.labelDirection < 0 ? Math.PI : 0)
                }
              }, updateHandleTransform: function (transform, delta, axisModel, axisPointerModel) {
                var axis = axisModel.axis, grid = axis.grid, axisExtent = axis.getGlobalExtent(!0),
                  otherExtent = getCartesian(grid, axis).getOtherAxis(axis).getGlobalExtent(),
                  dimIndex = "x" === axis.dim ? 0 : 1, currPosition = transform.position;
                currPosition[dimIndex] += delta[dimIndex], currPosition[dimIndex] = Math.min(axisExtent[1], currPosition[dimIndex]), currPosition[dimIndex] = Math.max(axisExtent[0], currPosition[dimIndex]);
                var cursorOtherValue = (otherExtent[1] + otherExtent[0]) / 2,
                  cursorPoint = [cursorOtherValue, cursorOtherValue];
                cursorPoint[dimIndex] = currPosition[dimIndex];
                var tooltipOptions = [{verticalAlign: "middle"}, {align: "center"}];
                return {
                  position: currPosition,
                  rotation: transform.rotation,
                  cursorPoint: cursorPoint,
                  tooltipOption: tooltipOptions[dimIndex]
                }
              }
            }), pointerShapeBuilder = {
              line: function (axis, pixelValue, otherExtent, elStyle) {
                var targetShape = viewHelper.makeLineShape([pixelValue, otherExtent[0]], [pixelValue, otherExtent[1]], getAxisDimIndex(axis));
                return graphic.subPixelOptimizeLine({shape: targetShape, style: elStyle}), {
                  type: "Line",
                  shape: targetShape
                }
              }, shadow: function (axis, pixelValue, otherExtent, elStyle) {
                var bandWidth = axis.getBandWidth(), span = otherExtent[1] - otherExtent[0];
                return {
                  type: "Rect",
                  shape: viewHelper.makeRectShape([pixelValue - bandWidth / 2, otherExtent[0]], [bandWidth, span], getAxisDimIndex(axis))
                }
              }
            };
          return AxisView.registerAxisPointerClass("CartesianAxisPointer", CartesianAxisPointer), CartesianAxisPointer
        }),define("echarts/component/axisPointer/AxisPointerView", ["require", "./globalListener", "../../echarts"], function (require) {
          var globalListener = require("./globalListener"),
            AxisPonterView = require("../../echarts").extendComponentView({
              type: "axisPointer",
              render: function (globalAxisPointerModel, ecModel, api) {
                var globalTooltipModel = ecModel.getComponent("tooltip"),
                  triggerOn = globalAxisPointerModel.get("triggerOn") || globalTooltipModel && globalTooltipModel.get("triggerOn") || "mousemove|click";
                globalListener.register("axisPointer", api, function (currTrigger, e, dispatchAction) {
                  "none" !== triggerOn && ("leave" === currTrigger || triggerOn.indexOf(currTrigger) >= 0) && dispatchAction({
                    type: "updateAxisPointer",
                    currTrigger: currTrigger,
                    x: e && e.offsetX,
                    y: e && e.offsetY
                  })
                })
              },
              remove: function (ecModel, api) {
                globalListener.disopse(api.getZr(), "axisPointer"), AxisPonterView.superApply(this._model, "remove", arguments)
              },
              dispose: function (ecModel, api) {
                globalListener.unregister("axisPointer", api), AxisPonterView.superApply(this._model, "dispose", arguments)
              }
            })
        }),define("zrender/core/PathProxy", ["require", "./curve", "./vector", "./bbox", "./BoundingRect", "../config"], function (require) {
          var curve = require("./curve"), vec2 = require("./vector"), bbox = require("./bbox"),
            BoundingRect = require("./BoundingRect"), dpr = require("../config").devicePixelRatio,
            CMD = {M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7}, min = [], max = [], min2 = [], max2 = [],
            mathMin = Math.min, mathMax = Math.max, mathCos = Math.cos, mathSin = Math.sin, mathSqrt = Math.sqrt,
            mathAbs = Math.abs, hasTypedArray = "undefined" != typeof Float32Array, PathProxy = function (notSaveData) {
              this._saveData = !notSaveData, this._saveData && (this.data = []), this._ctx = null
            };
          return PathProxy.prototype = {
            constructor: PathProxy,
            _xi: 0,
            _yi: 0,
            _x0: 0,
            _y0: 0,
            _ux: 0,
            _uy: 0,
            _len: 0,
            _lineDash: null,
            _dashOffset: 0,
            _dashIdx: 0,
            _dashSum: 0,
            setScale: function (sx, sy) {
              this._ux = mathAbs(1 / dpr / sx) || 0, this._uy = mathAbs(1 / dpr / sy) || 0
            },
            getContext: function () {
              return this._ctx
            },
            beginPath: function (ctx) {
              return this._ctx = ctx, ctx && ctx.beginPath(), ctx && (this.dpr = ctx.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
            },
            moveTo: function (x, y) {
              return this.addData(CMD.M, x, y), this._ctx && this._ctx.moveTo(x, y), this._x0 = x, this._y0 = y, this._xi = x, this._yi = y, this
            },
            lineTo: function (x, y) {
              var exceedUnit = mathAbs(x - this._xi) > this._ux || mathAbs(y - this._yi) > this._uy || this._len < 5;
              return this.addData(CMD.L, x, y), this._ctx && exceedUnit && (this._needsDash() ? this._dashedLineTo(x, y) : this._ctx.lineTo(x, y)), exceedUnit && (this._xi = x, this._yi = y), this
            },
            bezierCurveTo: function (x1, y1, x2, y2, x3, y3) {
              return this.addData(CMD.C, x1, y1, x2, y2, x3, y3), this._ctx && (this._needsDash() ? this._dashedBezierTo(x1, y1, x2, y2, x3, y3) : this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3)), this._xi = x3, this._yi = y3, this
            },
            quadraticCurveTo: function (x1, y1, x2, y2) {
              return this.addData(CMD.Q, x1, y1, x2, y2), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(x1, y1, x2, y2) : this._ctx.quadraticCurveTo(x1, y1, x2, y2)), this._xi = x2, this._yi = y2, this
            },
            arc: function (cx, cy, r, startAngle, endAngle, anticlockwise) {
              return this.addData(CMD.A, cx, cy, r, r, startAngle, endAngle - startAngle, 0, anticlockwise ? 0 : 1), this._ctx && this._ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise), this._xi = mathCos(endAngle) * r + cx, this._yi = mathSin(endAngle) * r + cx, this
            },
            arcTo: function (x1, y1, x2, y2, radius) {
              return this._ctx && this._ctx.arcTo(x1, y1, x2, y2, radius), this
            },
            rect: function (x, y, w, h) {
              return this._ctx && this._ctx.rect(x, y, w, h), this.addData(CMD.R, x, y, w, h), this
            },
            closePath: function () {
              this.addData(CMD.Z);
              var ctx = this._ctx, x0 = this._x0, y0 = this._y0;
              return ctx && (this._needsDash() && this._dashedLineTo(x0, y0), ctx.closePath()), this._xi = x0, this._yi = y0, this
            },
            fill: function (ctx) {
              ctx && ctx.fill(), this.toStatic()
            },
            stroke: function (ctx) {
              ctx && ctx.stroke(), this.toStatic()
            },
            setLineDash: function (lineDash) {
              if (lineDash instanceof Array) {
                this._lineDash = lineDash, this._dashIdx = 0;
                for (var lineDashSum = 0, i = 0; i < lineDash.length; i++)lineDashSum += lineDash[i];
                this._dashSum = lineDashSum
              }
              return this
            },
            setLineDashOffset: function (offset) {
              return this._dashOffset = offset, this
            },
            len: function () {
              return this._len
            },
            setData: function (data) {
              var len = data.length;
              this.data && this.data.length == len || !hasTypedArray || (this.data = new Float32Array(len));
              for (var i = 0; i < len; i++)this.data[i] = data[i];
              this._len = len
            },
            appendPath: function (path) {
              path instanceof Array || (path = [path]);
              for (var len = path.length, appendSize = 0, offset = this._len, i = 0; i < len; i++)appendSize += path[i].len();
              hasTypedArray && this.data instanceof Float32Array && (this.data = new Float32Array(offset + appendSize));
              for (var i = 0; i < len; i++)for (var appendPathData = path[i].data, k = 0; k < appendPathData.length; k++)this.data[offset++] = appendPathData[k];
              this._len = offset
            },
            addData: function (cmd) {
              if (this._saveData) {
                var data = this.data;
                this._len + arguments.length > data.length && (this._expandData(), data = this.data);
                for (var i = 0; i < arguments.length; i++)data[this._len++] = arguments[i];
                this._prevCmd = cmd
              }
            },
            _expandData: function () {
              if (!(this.data instanceof Array)) {
                for (var newData = [], i = 0; i < this._len; i++)newData[i] = this.data[i];
                this.data = newData
              }
            },
            _needsDash: function () {
              return this._lineDash
            },
            _dashedLineTo: function (x1, y1) {
              var dash, idx, dashSum = this._dashSum, offset = this._dashOffset, lineDash = this._lineDash,
                ctx = this._ctx, x0 = this._xi, y0 = this._yi, dx = x1 - x0, dy = y1 - y0,
                dist = mathSqrt(dx * dx + dy * dy), x = x0, y = y0, nDash = lineDash.length;
              for (dx /= dist, dy /= dist, offset < 0 && (offset = dashSum + offset), offset %= dashSum, x -= offset * dx, y -= offset * dy; dx > 0 && x <= x1 || dx < 0 && x >= x1 || 0 == dx && (dy > 0 && y <= y1 || dy < 0 && y >= y1);)idx = this._dashIdx, dash = lineDash[idx], x += dx * dash, y += dy * dash, this._dashIdx = (idx + 1) % nDash, dx > 0 && x < x0 || dx < 0 && x > x0 || dy > 0 && y < y0 || dy < 0 && y > y0 || ctx[idx % 2 ? "moveTo" : "lineTo"](dx >= 0 ? mathMin(x, x1) : mathMax(x, x1), dy >= 0 ? mathMin(y, y1) : mathMax(y, y1));
              dx = x - x1, dy = y - y1, this._dashOffset = -mathSqrt(dx * dx + dy * dy)
            },
            _dashedBezierTo: function (x1, y1, x2, y2, x3, y3) {
              var t, dx, dy, x, y, dashSum = this._dashSum, offset = this._dashOffset, lineDash = this._lineDash,
                ctx = this._ctx, x0 = this._xi, y0 = this._yi, cubicAt = curve.cubicAt, bezierLen = 0,
                idx = this._dashIdx, nDash = lineDash.length, tmpLen = 0;
              for (offset < 0 && (offset = dashSum + offset), offset %= dashSum, t = 0; t < 1; t += .1)dx = cubicAt(x0, x1, x2, x3, t + .1) - cubicAt(x0, x1, x2, x3, t), dy = cubicAt(y0, y1, y2, y3, t + .1) - cubicAt(y0, y1, y2, y3, t), bezierLen += mathSqrt(dx * dx + dy * dy);
              for (; idx < nDash && (tmpLen += lineDash[idx], !(tmpLen > offset)); idx++);
              for (t = (tmpLen - offset) / bezierLen; t <= 1;)x = cubicAt(x0, x1, x2, x3, t), y = cubicAt(y0, y1, y2, y3, t), idx % 2 ? ctx.moveTo(x, y) : ctx.lineTo(x, y), t += lineDash[idx] / bezierLen, idx = (idx + 1) % nDash;
              idx % 2 !== 0 && ctx.lineTo(x3, y3), dx = x3 - x, dy = y3 - y, this._dashOffset = -mathSqrt(dx * dx + dy * dy)
            },
            _dashedQuadraticTo: function (x1, y1, x2, y2) {
              var x3 = x2, y3 = y2;
              x2 = (x2 + 2 * x1) / 3, y2 = (y2 + 2 * y1) / 3, x1 = (this._xi + 2 * x1) / 3, y1 = (this._yi + 2 * y1) / 3, this._dashedBezierTo(x1, y1, x2, y2, x3, y3)
            },
            toStatic: function () {
              var data = this.data;
              data instanceof Array && (data.length = this._len, hasTypedArray && (this.data = new Float32Array(data)))
            },
            getBoundingRect: function () {
              min[0] = min[1] = min2[0] = min2[1] = Number.MAX_VALUE, max[0] = max[1] = max2[0] = max2[1] = -Number.MAX_VALUE;
              for (var data = this.data, xi = 0, yi = 0, x0 = 0, y0 = 0, i = 0; i < data.length;) {
                var cmd = data[i++];
                switch (1 == i && (xi = data[i], yi = data[i + 1], x0 = xi, y0 = yi), cmd) {
                  case CMD.M:
                    x0 = data[i++], y0 = data[i++], xi = x0, yi = y0, min2[0] = x0, min2[1] = y0, max2[0] = x0, max2[1] = y0;
                    break;
                  case CMD.L:
                    bbox.fromLine(xi, yi, data[i], data[i + 1], min2, max2), xi = data[i++], yi = data[i++];
                    break;
                  case CMD.C:
                    bbox.fromCubic(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], min2, max2), xi = data[i++], yi = data[i++];
                    break;
                  case CMD.Q:
                    bbox.fromQuadratic(xi, yi, data[i++], data[i++], data[i], data[i + 1], min2, max2), xi = data[i++], yi = data[i++];
                    break;
                  case CMD.A:
                    var cx = data[i++], cy = data[i++], rx = data[i++], ry = data[i++], startAngle = data[i++],
                      endAngle = data[i++] + startAngle, anticlockwise = (data[i++], 1 - data[i++]);
                    1 == i && (x0 = mathCos(startAngle) * rx + cx, y0 = mathSin(startAngle) * ry + cy), bbox.fromArc(cx, cy, rx, ry, startAngle, endAngle, anticlockwise, min2, max2), xi = mathCos(endAngle) * rx + cx, yi = mathSin(endAngle) * ry + cy;
                    break;
                  case CMD.R:
                    x0 = xi = data[i++], y0 = yi = data[i++];
                    var width = data[i++], height = data[i++];
                    bbox.fromLine(x0, y0, x0 + width, y0 + height, min2, max2);
                    break;
                  case CMD.Z:
                    xi = x0, yi = y0
                }
                vec2.min(min, min, min2), vec2.max(max, max, max2)
              }
              return 0 === i && (min[0] = min[1] = max[0] = max[1] = 0), new BoundingRect(min[0], min[1], max[0] - min[0], max[1] - min[1])
            },
            rebuildPath: function (ctx) {
              for (var x0, y0, xi, yi, x, y, d = this.data, ux = this._ux, uy = this._uy, len = this._len, i = 0; i < len;) {
                var cmd = d[i++];
                switch (1 == i && (xi = d[i], yi = d[i + 1], x0 = xi, y0 = yi), cmd) {
                  case CMD.M:
                    x0 = xi = d[i++], y0 = yi = d[i++], ctx.moveTo(xi, yi);
                    break;
                  case CMD.L:
                    x = d[i++], y = d[i++], (mathAbs(x - xi) > ux || mathAbs(y - yi) > uy || i === len - 1) && (ctx.lineTo(x, y), xi = x, yi = y);
                    break;
                  case CMD.C:
                    ctx.bezierCurveTo(d[i++], d[i++], d[i++], d[i++], d[i++], d[i++]), xi = d[i - 2], yi = d[i - 1];
                    break;
                  case CMD.Q:
                    ctx.quadraticCurveTo(d[i++], d[i++], d[i++], d[i++]), xi = d[i - 2], yi = d[i - 1];
                    break;
                  case CMD.A:
                    var cx = d[i++], cy = d[i++], rx = d[i++], ry = d[i++], theta = d[i++], dTheta = d[i++],
                      psi = d[i++], fs = d[i++], r = rx > ry ? rx : ry, scaleX = rx > ry ? 1 : rx / ry,
                      scaleY = rx > ry ? ry / rx : 1, isEllipse = Math.abs(rx - ry) > .001, endAngle = theta + dTheta;
                    isEllipse ? (ctx.translate(cx, cy), ctx.rotate(psi), ctx.scale(scaleX, scaleY), ctx.arc(0, 0, r, theta, endAngle, 1 - fs), ctx.scale(1 / scaleX, 1 / scaleY), ctx.rotate(-psi), ctx.translate(-cx, -cy)) : ctx.arc(cx, cy, r, theta, endAngle, 1 - fs), 1 == i && (x0 = mathCos(theta) * rx + cx, y0 = mathSin(theta) * ry + cy), xi = mathCos(endAngle) * rx + cx, yi = mathSin(endAngle) * ry + cy;
                    break;
                  case CMD.R:
                    x0 = xi = d[i], y0 = yi = d[i + 1], ctx.rect(d[i++], d[i++], d[i++], d[i++]);
                    break;
                  case CMD.Z:
                    ctx.closePath(), xi = x0, yi = y0
                }
              }
            }
          }, PathProxy.CMD = CMD, PathProxy
        }),define("zrender/graphic/mixin/RectText", ["require", "../../contain/text", "../../core/BoundingRect"], function (require) {
          function parsePercent(value, maxValue) {
            return "string" == typeof value ? value.lastIndexOf("%") >= 0 ? parseFloat(value) / 100 * maxValue : parseFloat(value) : value
          }
          
          var textContain = require("../../contain/text"), BoundingRect = require("../../core/BoundingRect"),
            tmpRect = new BoundingRect, RectText = function () {
            };
          return RectText.prototype = {
            constructor: RectText, drawRectText: function (ctx, rect, textRect) {
              var style = this.style, text = style.text;
              if (null != text && (text += ""), text) {
                ctx.save();
                var x, y, textPosition = style.textPosition, textOffset = style.textOffset,
                  distance = style.textDistance, align = style.textAlign, font = style.textFont || style.font,
                  baseline = style.textBaseline, verticalAlign = style.textVerticalAlign;
                textRect = textRect || textContain.getBoundingRect(text, font, align, baseline);
                var transform = this.transform;
                if (style.textTransform ? this.setTransform(ctx) : transform && (tmpRect.copy(rect), tmpRect.applyTransform(transform), rect = tmpRect), textPosition instanceof Array) {
                  if (x = rect.x + parsePercent(textPosition[0], rect.width), y = rect.y + parsePercent(textPosition[1], rect.height), align = align || "left", baseline = baseline || "top", verticalAlign) {
                    switch (verticalAlign) {
                      case"middle":
                        y -= textRect.height / 2 - textRect.lineHeight / 2;
                        break;
                      case"bottom":
                        y -= textRect.height - textRect.lineHeight / 2;
                        break;
                      default:
                        y += textRect.lineHeight / 2
                    }
                    baseline = "middle"
                  }
                } else {
                  var res = textContain.adjustTextPositionOnRect(textPosition, rect, textRect, distance);
                  x = res.x, y = res.y, align = align || res.textAlign, baseline = baseline || res.textBaseline
                }
                textOffset && (x += textOffset[0], y += textOffset[1]), ctx.textAlign = align || "left", ctx.textBaseline = baseline || "alphabetic";
                var textFill = style.textFill, textStroke = style.textStroke;
                textFill && (ctx.fillStyle = textFill), textStroke && (ctx.strokeStyle = textStroke), ctx.font = font || "12px sans-serif", ctx.shadowBlur = style.textShadowBlur, ctx.shadowColor = style.textShadowColor || "transparent", ctx.shadowOffsetX = style.textShadowOffsetX, ctx.shadowOffsetY = style.textShadowOffsetY;
                var textLines = text.split("\n");
                style.textRotation && (transform && ctx.translate(transform[4], transform[5]), ctx.rotate(style.textRotation), transform && ctx.translate(-transform[4], -transform[5]));
                for (var i = 0; i < textLines.length; i++)textStroke && ctx.strokeText(textLines[i], x, y), textFill && ctx.fillText(textLines[i], x, y), y += textRect.lineHeight;
                ctx.restore()
              }
            }
          }, RectText
        }),define("zrender/graphic/Gradient", ["require"], function (require) {
          var Gradient = function (colorStops) {
            this.colorStops = colorStops || []
          };
          return Gradient.prototype = {
            constructor: Gradient, addColorStop: function (offset, color) {
              this.colorStops.push({offset: offset, color: color})
            }
          }, Gradient
        }),define("zrender/graphic/Displayable", ["require", "../core/util", "./Style", "../Element", "./mixin/RectText"], function (require) {
          function Displayable(opts) {
            opts = opts || {}, Element.call(this, opts);
            for (var name in opts)opts.hasOwnProperty(name) && "style" !== name && (this[name] = opts[name]);
            this.style = new Style(opts.style), this._rect = null, this.__clipPaths = []
          }
          
          var zrUtil = require("../core/util"), Style = require("./Style"), Element = require("../Element"),
            RectText = require("./mixin/RectText");
          return Displayable.prototype = {
            constructor: Displayable,
            type: "displayable",
            __dirty: !0,
            invisible: !1,
            z: 0,
            z2: 0,
            zlevel: 0,
            draggable: !1,
            dragging: !1,
            silent: !1,
            culling: !1,
            cursor: "pointer",
            rectHover: !1,
            progressive: -1,
            beforeBrush: function (ctx) {
            },
            afterBrush: function (ctx) {
            },
            brush: function (ctx, prevEl) {
            },
            getBoundingRect: function () {
            },
            contain: function (x, y) {
              return this.rectContain(x, y)
            },
            traverse: function (cb, context) {
              cb.call(context, this)
            },
            rectContain: function (x, y) {
              var coord = this.transformCoordToLocal(x, y), rect = this.getBoundingRect();
              return rect.contain(coord[0], coord[1])
            },
            dirty: function () {
              this.__dirty = !0, this._rect = null, this.__zr && this.__zr.refresh()
            },
            animateStyle: function (loop) {
              return this.animate("style", loop)
            },
            attrKV: function (key, value) {
              "style" !== key ? Element.prototype.attrKV.call(this, key, value) : this.style.set(value)
            },
            setStyle: function (key, value) {
              return this.style.set(key, value), this.dirty(!1), this
            },
            useStyle: function (obj) {
              return this.style = new Style(obj), this.dirty(!1), this
            }
          }, zrUtil.inherits(Displayable, Element), zrUtil.mixin(Displayable, RectText), Displayable
        }),define("echarts/component/marker/MarkerModel", ["require", "../../util/model", "zrender/core/util", "zrender/core/env", "../../util/format", "../../echarts"], function (require) {
          function fillLabel(opt) {
            modelUtil.defaultEmphasis(opt.label, modelUtil.LABEL_OPTIONS)
          }
          
          var modelUtil = require("../../util/model"), zrUtil = require("zrender/core/util"),
            env = require("zrender/core/env"), formatUtil = require("../../util/format"),
            addCommas = formatUtil.addCommas, encodeHTML = formatUtil.encodeHTML,
            MarkerModel = require("../../echarts").extendComponentModel({
              type: "marker",
              dependencies: ["series", "grid", "polar", "geo"],
              init: function (option, parentModel, ecModel, extraOpt) {
                if ("marker" === this.type)throw new Error("Marker component is abstract component. Use markLine, markPoint, markArea instead.");
                this.mergeDefaultAndTheme(option, ecModel), this.mergeOption(option, ecModel, extraOpt.createdBySelf, !0)
              },
              isAnimationEnabled: function () {
                if (env.node)return !1;
                var hostSeries = this.__hostSeries;
                return this.getShallow("animation") && hostSeries && hostSeries.isAnimationEnabled()
              },
              mergeOption: function (newOpt, ecModel, createdBySelf, isInit) {
                var MarkerModel = this.constructor, modelPropName = this.mainType + "Model";
                createdBySelf || ecModel.eachSeries(function (seriesModel) {
                  var markerOpt = seriesModel.get(this.mainType), markerModel = seriesModel[modelPropName];
                  return markerOpt && markerOpt.data ? (markerModel ? markerModel.mergeOption(markerOpt, ecModel, !0) : (isInit && fillLabel(markerOpt), zrUtil.each(markerOpt.data, function (item) {
                    item instanceof Array ? (fillLabel(item[0]), fillLabel(item[1])) : fillLabel(item)
                  }), markerModel = new MarkerModel(markerOpt, this, ecModel), zrUtil.extend(markerModel, {
                    mainType: this.mainType,
                    seriesIndex: seriesModel.seriesIndex,
                    name: seriesModel.name,
                    createdBySelf: !0
                  }), markerModel.__hostSeries = seriesModel), void(seriesModel[modelPropName] = markerModel)) : void(seriesModel[modelPropName] = null)
                }, this)
              },
              formatTooltip: function (dataIndex) {
                var data = this.getData(), value = this.getRawValue(dataIndex),
                  formattedValue = zrUtil.isArray(value) ? zrUtil.map(value, addCommas).join(", ") : addCommas(value),
                  name = data.getName(dataIndex), html = encodeHTML(this.name);
                return (null != value || name) && (html += "<br />"), name && (html += encodeHTML(name), null != value && (html += " : ")), null != value && (html += encodeHTML(formattedValue)), html
              },
              getData: function () {
                return this._data
              },
              setData: function (data) {
                this._data = data
              }
            });
          return zrUtil.mixin(MarkerModel, modelUtil.dataFormatMixin), MarkerModel
        }),define("zrender/vml/core", ["require", "exports", "module", "../core/env"], function (require, exports, module) {
          if (!require("../core/env").canvasSupported) {
            var createNode, urn = "urn:schemas-microsoft-com:vml", win = window, doc = win.document, vmlInited = !1;
            try {
              !doc.namespaces.zrvml && doc.namespaces.add("zrvml", urn), createNode = function (tagName) {
                return doc.createElement("<zrvml:" + tagName + ' class="zrvml">')
              }
            } catch (e) {
              createNode = function (tagName) {
                return doc.createElement("<" + tagName + ' xmlns="' + urn + '" class="zrvml">')
              }
            }
            var initVML = function () {
              if (!vmlInited) {
                vmlInited = !0;
                var styleSheets = doc.styleSheets;
                styleSheets.length < 31 ? doc.createStyleSheet().addRule(".zrvml", "behavior:url(#default#VML)") : styleSheets[0].addRule(".zrvml", "behavior:url(#default#VML)")
              }
            };
            module.exports = {doc: doc, initVML: initVML, createNode: createNode}
          }
        }),define("zrender/graphic/Pattern", ["require"], function (require) {
          var Pattern = function (image, repeat) {
            this.image = image, this.repeat = repeat, this.type = "pattern"
          };
          return Pattern.prototype.getCanvasPattern = function (ctx) {
            return ctx.createPattern(this.image, this.repeat || "repeat")
          }, Pattern
        }),define("zrender/contain/path", ["require", "../core/PathProxy", "./line", "./cubic", "./quadratic", "./arc", "./util", "../core/curve", "./windingLine"], function (require) {
          function isAroundEqual(a, b) {
            return Math.abs(a - b) < EPSILON
          }
          
          function swapExtrema() {
            var tmp = extrema[0];
            extrema[0] = extrema[1], extrema[1] = tmp
          }
          
          function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
            if (y > y0 && y > y1 && y > y2 && y > y3 || y < y0 && y < y1 && y < y2 && y < y3)return 0;
            var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);
            if (0 === nRoots)return 0;
            for (var y0_, y1_, w = 0, nExtrema = -1, i = 0; i < nRoots; i++) {
              var t = roots[i], unit = 0 === t || 1 === t ? .5 : 1, x_ = curve.cubicAt(x0, x1, x2, x3, t);
              x_ < x || (nExtrema < 0 && (nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema), extrema[1] < extrema[0] && nExtrema > 1 && swapExtrema(), y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]), nExtrema > 1 && (y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]))), w += 2 == nExtrema ? t < extrema[0] ? y0_ < y0 ? unit : -unit : t < extrema[1] ? y1_ < y0_ ? unit : -unit : y3 < y1_ ? unit : -unit : t < extrema[0] ? y0_ < y0 ? unit : -unit : y3 < y0_ ? unit : -unit)
            }
            return w
          }
          
          function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
            if (y > y0 && y > y1 && y > y2 || y < y0 && y < y1 && y < y2)return 0;
            var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);
            if (0 === nRoots)return 0;
            var t = curve.quadraticExtremum(y0, y1, y2);
            if (t >= 0 && t <= 1) {
              for (var w = 0, y_ = curve.quadraticAt(y0, y1, y2, t), i = 0; i < nRoots; i++) {
                var unit = 0 === roots[i] || 1 === roots[i] ? .5 : 1, x_ = curve.quadraticAt(x0, x1, x2, roots[i]);
                x_ < x || (w += roots[i] < t ? y_ < y0 ? unit : -unit : y2 < y_ ? unit : -unit)
              }
              return w
            }
            var unit = 0 === roots[0] || 1 === roots[0] ? .5 : 1, x_ = curve.quadraticAt(x0, x1, x2, roots[0]);
            return x_ < x ? 0 : y2 < y0 ? unit : -unit
          }
          
          function windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
            if (y -= cy, y > r || y < -r)return 0;
            var tmp = Math.sqrt(r * r - y * y);
            roots[0] = -tmp, roots[1] = tmp;
            var diff = Math.abs(startAngle - endAngle);
            if (diff < 1e-4)return 0;
            if (diff % PI2 < 1e-4) {
              startAngle = 0, endAngle = PI2;
              var dir = anticlockwise ? 1 : -1;
              return x >= roots[0] + cx && x <= roots[1] + cx ? dir : 0
            }
            if (anticlockwise) {
              var tmp = startAngle;
              startAngle = normalizeRadian(endAngle), endAngle = normalizeRadian(tmp)
            } else startAngle = normalizeRadian(startAngle), endAngle = normalizeRadian(endAngle);
            startAngle > endAngle && (endAngle += PI2);
            for (var w = 0, i = 0; i < 2; i++) {
              var x_ = roots[i];
              if (x_ + cx > x) {
                var angle = Math.atan2(y, x_), dir = anticlockwise ? 1 : -1;
                angle < 0 && (angle = PI2 + angle), (angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle) && (angle > Math.PI / 2 && angle < 1.5 * Math.PI && (dir = -dir), w += dir)
              }
            }
            return w
          }
          
          function containPath(data, lineWidth, isStroke, x, y) {
            for (var w = 0, xi = 0, yi = 0, x0 = 0, y0 = 0, i = 0; i < data.length;) {
              var cmd = data[i++];
              switch (cmd === CMD.M && i > 1 && (isStroke || (w += windingLine(xi, yi, x0, y0, x, y))), 1 == i && (xi = data[i], yi = data[i + 1], x0 = xi, y0 = yi), cmd) {
                case CMD.M:
                  x0 = data[i++], y0 = data[i++], xi = x0, yi = y0;
                  break;
                case CMD.L:
                  if (isStroke) {
                    if (containStroke(xi, yi, data[i], data[i + 1], lineWidth, x, y))return !0
                  } else w += windingLine(xi, yi, data[i], data[i + 1], x, y) || 0;
                  xi = data[i++], yi = data[i++];
                  break;
                case CMD.C:
                  if (isStroke) {
                    if (cubic.containStroke(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y))return !0
                  } else w += windingCubic(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
                  xi = data[i++], yi = data[i++];
                  break;
                case CMD.Q:
                  if (isStroke) {
                    if (quadratic.containStroke(xi, yi, data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y))return !0
                  } else w += windingQuadratic(xi, yi, data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
                  xi = data[i++], yi = data[i++];
                  break;
                case CMD.A:
                  var cx = data[i++], cy = data[i++], rx = data[i++], ry = data[i++], theta = data[i++],
                    dTheta = data[i++], anticlockwise = (data[i++], 1 - data[i++]), x1 = Math.cos(theta) * rx + cx,
                    y1 = Math.sin(theta) * ry + cy;
                  i > 1 ? w += windingLine(xi, yi, x1, y1, x, y) : (x0 = x1, y0 = y1);
                  var _x = (x - cx) * ry / rx + cx;
                  if (isStroke) {
                    if (arc.containStroke(cx, cy, ry, theta, theta + dTheta, anticlockwise, lineWidth, _x, y))return !0
                  } else w += windingArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y);
                  xi = Math.cos(theta + dTheta) * rx + cx, yi = Math.sin(theta + dTheta) * ry + cy;
                  break;
                case CMD.R:
                  x0 = xi = data[i++], y0 = yi = data[i++];
                  var width = data[i++], height = data[i++], x1 = x0 + width, y1 = y0 + height;
                  if (isStroke) {
                    if (containStroke(x0, y0, x1, y0, lineWidth, x, y) || containStroke(x1, y0, x1, y1, lineWidth, x, y) || containStroke(x1, y1, x0, y1, lineWidth, x, y) || containStroke(x0, y1, x0, y0, lineWidth, x, y))return !0
                  } else w += windingLine(x1, y0, x1, y1, x, y), w += windingLine(x0, y1, x0, y0, x, y);
                  break;
                case CMD.Z:
                  if (isStroke) {
                    if (containStroke(xi, yi, x0, y0, lineWidth, x, y))return !0
                  } else w += windingLine(xi, yi, x0, y0, x, y);
                  xi = x0, yi = y0
              }
            }
            return isStroke || isAroundEqual(yi, y0) || (w += windingLine(xi, yi, x0, y0, x, y) || 0), 0 !== w
          }
          
          var CMD = require("../core/PathProxy").CMD, line = require("./line"), cubic = require("./cubic"),
            quadratic = require("./quadratic"), arc = require("./arc"),
            normalizeRadian = require("./util").normalizeRadian, curve = require("../core/curve"),
            windingLine = require("./windingLine"), containStroke = line.containStroke, PI2 = 2 * Math.PI,
            EPSILON = 1e-4, roots = [-1, -1, -1], extrema = [-1, -1];
          return {
            contain: function (pathData, x, y) {
              return containPath(pathData, 0, !1, x, y)
            }, containStroke: function (pathData, lineWidth, x, y) {
              return containPath(pathData, lineWidth, !0, x, y)
            }
          }
        }),define("echarts/scale/Ordinal", ["require", "zrender/core/util", "./Scale"], function (require) {
          var zrUtil = require("zrender/core/util"), Scale = require("./Scale"), scaleProto = Scale.prototype,
            OrdinalScale = Scale.extend({
              type: "ordinal", init: function (data, extent) {
                this._data = data, this._extent = extent || [0, data.length - 1]
              }, parse: function (val) {
                return "string" == typeof val ? zrUtil.indexOf(this._data, val) : Math.round(val)
              }, contain: function (rank) {
                return rank = this.parse(rank), scaleProto.contain.call(this, rank) && null != this._data[rank]
              }, normalize: function (val) {
                return scaleProto.normalize.call(this, this.parse(val))
              }, scale: function (val) {
                return Math.round(scaleProto.scale.call(this, val))
              }, getTicks: function () {
                for (var ticks = [], extent = this._extent, rank = extent[0]; rank <= extent[1];)ticks.push(rank), rank++;
                return ticks
              }, getLabel: function (n) {
                return this._data[n]
              }, count: function () {
                return this._extent[1] - this._extent[0] + 1
              }, unionExtentFromData: function (data, dim) {
                this.unionExtent(data.getDataExtent(dim, !1))
              }, niceTicks: zrUtil.noop, niceExtent: zrUtil.noop
            });
          return OrdinalScale.create = function () {
            return new OrdinalScale
          }, OrdinalScale
        }),define("zrender/tool/transformPath", ["require", "../core/PathProxy", "../core/vector"], function (require) {
          function transformPath(path, m) {
            var cmd, nPoint, i, j, k, p, data = path.data, M = CMD.M, C = CMD.C, L = CMD.L, R = CMD.R, A = CMD.A,
              Q = CMD.Q;
            for (i = 0, j = 0; i < data.length;) {
              switch (cmd = data[i++], j = i, nPoint = 0, cmd) {
                case M:
                  nPoint = 1;
                  break;
                case L:
                  nPoint = 1;
                  break;
                case C:
                  nPoint = 3;
                  break;
                case Q:
                  nPoint = 2;
                  break;
                case A:
                  var x = m[4], y = m[5], sx = mathSqrt(m[0] * m[0] + m[1] * m[1]),
                    sy = mathSqrt(m[2] * m[2] + m[3] * m[3]), angle = mathAtan2(-m[1] / sy, m[0] / sx);
                  data[i] *= sx, data[i++] += x, data[i] *= sy, data[i++] += y, data[i++] *= sx, data[i++] *= sy, data[i++] += angle, data[i++] += angle, i += 2, j = i;
                  break;
                case R:
                  p[0] = data[i++], p[1] = data[i++], v2ApplyTransform(p, p, m), data[j++] = p[0], data[j++] = p[1], p[0] += data[i++], p[1] += data[i++], v2ApplyTransform(p, p, m), data[j++] = p[0], data[j++] = p[1]
              }
              for (k = 0; k < nPoint; k++) {
                var p = points[k];
                p[0] = data[i++], p[1] = data[i++], v2ApplyTransform(p, p, m), data[j++] = p[0], data[j++] = p[1]
              }
            }
          }
          
          var CMD = require("../core/PathProxy").CMD, vec2 = require("../core/vector"),
            v2ApplyTransform = vec2.applyTransform, points = [[], [], []], mathSqrt = Math.sqrt, mathAtan2 = Math.atan2;
          return transformPath
        }),define("echarts/model/mixin/makeStyleMapper", ["require", "zrender/core/util"], function (require) {
          var zrUtil = require("zrender/core/util");
          return function (properties) {
            for (var i = 0; i < properties.length; i++)properties[i][1] || (properties[i][1] = properties[i][0]);
            return function (excludes, includes) {
              for (var style = {}, i = 0; i < properties.length; i++) {
                var propName = properties[i][1];
                if (!(excludes && zrUtil.indexOf(excludes, propName) >= 0 || includes && zrUtil.indexOf(includes, propName) < 0)) {
                  var val = this.getShallow(propName);
                  null != val && (style[properties[i][0]] = val)
                }
              }
              return style
            }
          }
        }),define("zrender/core/curve", ["require", "./vector"], function (require) {
          function isAroundZero(val) {
            return val > -EPSILON && val < EPSILON
          }
          
          function isNotAroundZero(val) {
            return val > EPSILON || val < -EPSILON
          }
          
          function cubicAt(p0, p1, p2, p3, t) {
            var onet = 1 - t;
            return onet * onet * (onet * p0 + 3 * t * p1) + t * t * (t * p3 + 3 * onet * p2)
          }
          
          function cubicDerivativeAt(p0, p1, p2, p3, t) {
            var onet = 1 - t;
            return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet + (p3 - p2) * t * t)
          }
          
          function cubicRootAt(p0, p1, p2, p3, val, roots) {
            var a = p3 + 3 * (p1 - p2) - p0, b = 3 * (p2 - 2 * p1 + p0), c = 3 * (p1 - p0), d = p0 - val,
              A = b * b - 3 * a * c, B = b * c - 9 * a * d, C = c * c - 3 * b * d, n = 0;
            if (isAroundZero(A) && isAroundZero(B))if (isAroundZero(b)) roots[0] = 0; else {
              var t1 = -c / b;
              t1 >= 0 && t1 <= 1 && (roots[n++] = t1)
            } else {
              var disc = B * B - 4 * A * C;
              if (isAroundZero(disc)) {
                var K = B / A, t1 = -b / a + K, t2 = -K / 2;
                t1 >= 0 && t1 <= 1 && (roots[n++] = t1), t2 >= 0 && t2 <= 1 && (roots[n++] = t2)
              } else if (disc > 0) {
                var discSqrt = mathSqrt(disc), Y1 = A * b + 1.5 * a * (-B + discSqrt),
                  Y2 = A * b + 1.5 * a * (-B - discSqrt);
                Y1 = Y1 < 0 ? -mathPow(-Y1, ONE_THIRD) : mathPow(Y1, ONE_THIRD), Y2 = Y2 < 0 ? -mathPow(-Y2, ONE_THIRD) : mathPow(Y2, ONE_THIRD);
                var t1 = (-b - (Y1 + Y2)) / (3 * a);
                t1 >= 0 && t1 <= 1 && (roots[n++] = t1)
              } else {
                var T = (2 * A * b - 3 * a * B) / (2 * mathSqrt(A * A * A)), theta = Math.acos(T) / 3,
                  ASqrt = mathSqrt(A), tmp = Math.cos(theta), t1 = (-b - 2 * ASqrt * tmp) / (3 * a),
                  t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a),
                  t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
                t1 >= 0 && t1 <= 1 && (roots[n++] = t1), t2 >= 0 && t2 <= 1 && (roots[n++] = t2), t3 >= 0 && t3 <= 1 && (roots[n++] = t3)
              }
            }
            return n
          }
          
          function cubicExtrema(p0, p1, p2, p3, extrema) {
            var b = 6 * p2 - 12 * p1 + 6 * p0, a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2, c = 3 * p1 - 3 * p0, n = 0;
            if (isAroundZero(a)) {
              if (isNotAroundZero(b)) {
                var t1 = -c / b;
                t1 >= 0 && t1 <= 1 && (extrema[n++] = t1)
              }
            } else {
              var disc = b * b - 4 * a * c;
              if (isAroundZero(disc)) extrema[0] = -b / (2 * a); else if (disc > 0) {
                var discSqrt = mathSqrt(disc), t1 = (-b + discSqrt) / (2 * a), t2 = (-b - discSqrt) / (2 * a);
                t1 >= 0 && t1 <= 1 && (extrema[n++] = t1), t2 >= 0 && t2 <= 1 && (extrema[n++] = t2)
              }
            }
            return n
          }
          
          function cubicSubdivide(p0, p1, p2, p3, t, out) {
            var p01 = (p1 - p0) * t + p0, p12 = (p2 - p1) * t + p1, p23 = (p3 - p2) * t + p2,
              p012 = (p12 - p01) * t + p01, p123 = (p23 - p12) * t + p12, p0123 = (p123 - p012) * t + p012;
            out[0] = p0, out[1] = p01, out[2] = p012, out[3] = p0123, out[4] = p0123, out[5] = p123, out[6] = p23, out[7] = p3
          }
          
          function cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out) {
            var t, prev, next, d1, d2, interval = .005, d = 1 / 0;
            _v0[0] = x, _v0[1] = y;
            for (var _t = 0; _t < 1; _t += .05)_v1[0] = cubicAt(x0, x1, x2, x3, _t), _v1[1] = cubicAt(y0, y1, y2, y3, _t), d1 = v2DistSquare(_v0, _v1), d1 < d && (t = _t, d = d1);
            d = 1 / 0;
            for (var i = 0; i < 32 && !(interval < EPSILON_NUMERIC); i++)prev = t - interval, next = t + interval, _v1[0] = cubicAt(x0, x1, x2, x3, prev), _v1[1] = cubicAt(y0, y1, y2, y3, prev), d1 = v2DistSquare(_v1, _v0), prev >= 0 && d1 < d ? (t = prev, d = d1) : (_v2[0] = cubicAt(x0, x1, x2, x3, next), _v2[1] = cubicAt(y0, y1, y2, y3, next), d2 = v2DistSquare(_v2, _v0), next <= 1 && d2 < d ? (t = next, d = d2) : interval *= .5);
            return out && (out[0] = cubicAt(x0, x1, x2, x3, t), out[1] = cubicAt(y0, y1, y2, y3, t)), mathSqrt(d)
          }
          
          function quadraticAt(p0, p1, p2, t) {
            var onet = 1 - t;
            return onet * (onet * p0 + 2 * t * p1) + t * t * p2
          }
          
          function quadraticDerivativeAt(p0, p1, p2, t) {
            return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1))
          }
          
          function quadraticRootAt(p0, p1, p2, val, roots) {
            var a = p0 - 2 * p1 + p2, b = 2 * (p1 - p0), c = p0 - val, n = 0;
            if (isAroundZero(a)) {
              if (isNotAroundZero(b)) {
                var t1 = -c / b;
                t1 >= 0 && t1 <= 1 && (roots[n++] = t1)
              }
            } else {
              var disc = b * b - 4 * a * c;
              if (isAroundZero(disc)) {
                var t1 = -b / (2 * a);
                t1 >= 0 && t1 <= 1 && (roots[n++] = t1)
              } else if (disc > 0) {
                var discSqrt = mathSqrt(disc), t1 = (-b + discSqrt) / (2 * a), t2 = (-b - discSqrt) / (2 * a);
                t1 >= 0 && t1 <= 1 && (roots[n++] = t1), t2 >= 0 && t2 <= 1 && (roots[n++] = t2)
              }
            }
            return n
          }
          
          function quadraticExtremum(p0, p1, p2) {
            var divider = p0 + p2 - 2 * p1;
            return 0 === divider ? .5 : (p0 - p1) / divider
          }
          
          function quadraticSubdivide(p0, p1, p2, t, out) {
            var p01 = (p1 - p0) * t + p0, p12 = (p2 - p1) * t + p1, p012 = (p12 - p01) * t + p01;
            out[0] = p0, out[1] = p01, out[2] = p012, out[3] = p012, out[4] = p12, out[5] = p2
          }
          
          function quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out) {
            var t, interval = .005, d = 1 / 0;
            _v0[0] = x, _v0[1] = y;
            for (var _t = 0; _t < 1; _t += .05) {
              _v1[0] = quadraticAt(x0, x1, x2, _t), _v1[1] = quadraticAt(y0, y1, y2, _t);
              var d1 = v2DistSquare(_v0, _v1);
              d1 < d && (t = _t, d = d1)
            }
            d = 1 / 0;
            for (var i = 0; i < 32 && !(interval < EPSILON_NUMERIC); i++) {
              var prev = t - interval, next = t + interval;
              _v1[0] = quadraticAt(x0, x1, x2, prev), _v1[1] = quadraticAt(y0, y1, y2, prev);
              var d1 = v2DistSquare(_v1, _v0);
              if (prev >= 0 && d1 < d) t = prev, d = d1; else {
                _v2[0] = quadraticAt(x0, x1, x2, next), _v2[1] = quadraticAt(y0, y1, y2, next);
                var d2 = v2DistSquare(_v2, _v0);
                next <= 1 && d2 < d ? (t = next, d = d2) : interval *= .5
              }
            }
            return out && (out[0] = quadraticAt(x0, x1, x2, t), out[1] = quadraticAt(y0, y1, y2, t)), mathSqrt(d)
          }
          
          var vec2 = require("./vector"), v2Create = vec2.create, v2DistSquare = vec2.distSquare, mathPow = Math.pow,
            mathSqrt = Math.sqrt, EPSILON = 1e-8, EPSILON_NUMERIC = 1e-4, THREE_SQRT = mathSqrt(3), ONE_THIRD = 1 / 3,
            _v0 = v2Create(), _v1 = v2Create(), _v2 = v2Create();
          return {
            cubicAt: cubicAt,
            cubicDerivativeAt: cubicDerivativeAt,
            cubicRootAt: cubicRootAt,
            cubicExtrema: cubicExtrema,
            cubicSubdivide: cubicSubdivide,
            cubicProjectPoint: cubicProjectPoint,
            quadraticAt: quadraticAt,
            quadraticDerivativeAt: quadraticDerivativeAt,
            quadraticRootAt: quadraticRootAt,
            quadraticExtremum: quadraticExtremum,
            quadraticSubdivide: quadraticSubdivide,
            quadraticProjectPoint: quadraticProjectPoint
          }
        }),define("zrender/config", [], function () {
          var dpr = 1;
          "undefined" != typeof window && (dpr = Math.max(window.devicePixelRatio || 1, 1));
          var config = {debugMode: 0, devicePixelRatio: dpr};
          return config
        }),define("zrender/Element", ["require", "./core/guid", "./mixin/Eventful", "./mixin/Transformable", "./mixin/Animatable", "./core/util"], function (require) {
          var guid = require("./core/guid"), Eventful = require("./mixin/Eventful"),
            Transformable = require("./mixin/Transformable"), Animatable = require("./mixin/Animatable"),
            zrUtil = require("./core/util"), Element = function (opts) {
              Transformable.call(this, opts), Eventful.call(this, opts), Animatable.call(this, opts), this.id = opts.id || guid()
            };
          return Element.prototype = {
            type: "element",
            name: "",
            __zr: null,
            ignore: !1,
            clipPath: null,
            drift: function (dx, dy) {
              switch (this.draggable) {
                case"horizontal":
                  dy = 0;
                  break;
                case"vertical":
                  dx = 0
              }
              var m = this.transform;
              m || (m = this.transform = [1, 0, 0, 1, 0, 0]), m[4] += dx, m[5] += dy, this.decomposeTransform(), this.dirty(!1)
            },
            beforeUpdate: function () {
            },
            afterUpdate: function () {
            },
            update: function () {
              this.updateTransform()
            },
            traverse: function (cb, context) {
            },
            attrKV: function (key, value) {
              if ("position" === key || "scale" === key || "origin" === key) {
                if (value) {
                  var target = this[key];
                  target || (target = this[key] = []), target[0] = value[0], target[1] = value[1]
                }
              } else this[key] = value
            },
            hide: function () {
              this.ignore = !0, this.__zr && this.__zr.refresh()
            },
            show: function () {
              this.ignore = !1, this.__zr && this.__zr.refresh()
            },
            attr: function (key, value) {
              if ("string" == typeof key) this.attrKV(key, value); else if (zrUtil.isObject(key))for (var name in key)key.hasOwnProperty(name) && this.attrKV(name, key[name]);
              return this.dirty(!1), this
            },
            setClipPath: function (clipPath) {
              var zr = this.__zr;
              zr && clipPath.addSelfToZr(zr), this.clipPath && this.clipPath !== clipPath && this.removeClipPath(), this.clipPath = clipPath, clipPath.__zr = zr, clipPath.__clipTarget = this, this.dirty(!1)
            },
            removeClipPath: function () {
              var clipPath = this.clipPath;
              clipPath && (clipPath.__zr && clipPath.removeSelfFromZr(clipPath.__zr), clipPath.__zr = null, clipPath.__clipTarget = null, this.clipPath = null, this.dirty(!1))
            },
            addSelfToZr: function (zr) {
              this.__zr = zr;
              var animators = this.animators;
              if (animators)for (var i = 0; i < animators.length; i++)zr.animation.addAnimator(animators[i]);
              this.clipPath && this.clipPath.addSelfToZr(zr)
            },
            removeSelfFromZr: function (zr) {
              this.__zr = null;
              var animators = this.animators;
              if (animators)for (var i = 0; i < animators.length; i++)zr.animation.removeAnimator(animators[i]);
              this.clipPath && this.clipPath.removeSelfFromZr(zr)
            }
          }, zrUtil.mixin(Element, Animatable), zrUtil.mixin(Element, Transformable), zrUtil.mixin(Element, Eventful), Element
        }),define("zrender/graphic/Style", ["require"], function (require) {
          function createLinearGradient(ctx, obj, rect) {
            var x = null == obj.x ? 0 : obj.x, x2 = null == obj.x2 ? 1 : obj.x2, y = null == obj.y ? 0 : obj.y,
              y2 = null == obj.y2 ? 0 : obj.y2;
            obj.global || (x = x * rect.width + rect.x, x2 = x2 * rect.width + rect.x, y = y * rect.height + rect.y, y2 = y2 * rect.height + rect.y);
            var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);
            return canvasGradient
          }
          
          function createRadialGradient(ctx, obj, rect) {
            var width = rect.width, height = rect.height, min = Math.min(width, height), x = null == obj.x ? .5 : obj.x,
              y = null == obj.y ? .5 : obj.y, r = null == obj.r ? .5 : obj.r;
            obj.global || (x = x * width + rect.x, y = y * height + rect.y, r *= min);
            var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
            return canvasGradient
          }
          
          var STYLE_COMMON_PROPS = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]],
            Style = function (opts) {
              this.extendFrom(opts)
            };
          Style.prototype = {
            constructor: Style,
            fill: "#000000",
            stroke: null,
            opacity: 1,
            lineDash: null,
            lineDashOffset: 0,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            lineWidth: 1,
            strokeNoScale: !1,
            text: null,
            textFill: "#000",
            textStroke: null,
            textPosition: "inside",
            textOffset: null,
            textBaseline: null,
            textAlign: null,
            textVerticalAlign: null,
            textDistance: 5,
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
            textTransform: !1,
            textRotation: 0,
            blend: null,
            bind: function (ctx, el, prevEl) {
              for (var style = this, prevStyle = prevEl && prevEl.style, firstDraw = !prevStyle, i = 0; i < STYLE_COMMON_PROPS.length; i++) {
                var prop = STYLE_COMMON_PROPS[i], styleName = prop[0];
                (firstDraw || style[styleName] !== prevStyle[styleName]) && (ctx[styleName] = style[styleName] || prop[1])
              }
              if ((firstDraw || style.fill !== prevStyle.fill) && (ctx.fillStyle = style.fill), (firstDraw || style.stroke !== prevStyle.stroke) && (ctx.strokeStyle = style.stroke), (firstDraw || style.opacity !== prevStyle.opacity) && (ctx.globalAlpha = null == style.opacity ? 1 : style.opacity), (firstDraw || style.blend !== prevStyle.blend) && (ctx.globalCompositeOperation = style.blend || "source-over"), this.hasStroke()) {
                var lineWidth = style.lineWidth;
                ctx.lineWidth = lineWidth / (this.strokeNoScale && el && el.getLineScale ? el.getLineScale() : 1)
              }
            },
            hasFill: function () {
              var fill = this.fill;
              return null != fill && "none" !== fill
            },
            hasStroke: function () {
              var stroke = this.stroke;
              return null != stroke && "none" !== stroke && this.lineWidth > 0
            },
            extendFrom: function (otherStyle, overwrite) {
              if (otherStyle) {
                var target = this;
                for (var name in otherStyle)!otherStyle.hasOwnProperty(name) || !overwrite && target.hasOwnProperty(name) || (target[name] = otherStyle[name])
              }
            },
            set: function (obj, value) {
              "string" == typeof obj ? this[obj] = value : this.extendFrom(obj, !0)
            },
            clone: function () {
              var newStyle = new this.constructor;
              return newStyle.extendFrom(this, !0), newStyle
            },
            getGradient: function (ctx, obj, rect) {
              for (var method = "radial" === obj.type ? createRadialGradient : createLinearGradient, canvasGradient = method(ctx, obj, rect), colorStops = obj.colorStops, i = 0; i < colorStops.length; i++)canvasGradient.addColorStop(colorStops[i].offset, colorStops[i].color);
              return canvasGradient
            }
          };
          for (var styleProto = Style.prototype, i = 0; i < STYLE_COMMON_PROPS.length; i++) {
            var prop = STYLE_COMMON_PROPS[i];
            prop[0] in styleProto || (styleProto[prop[0]] = prop[1])
          }
          return Style.getGradient = styleProto.getGradient, Style
        }),define("zrender/core/bbox", ["require", "./vector", "./curve"], function (require) {
          var vec2 = require("./vector"), curve = require("./curve"), bbox = {}, mathMin = Math.min, mathMax = Math.max,
            mathSin = Math.sin, mathCos = Math.cos, start = vec2.create(), end = vec2.create(),
            extremity = vec2.create(), PI2 = 2 * Math.PI;
          bbox.fromPoints = function (points, min, max) {
            if (0 !== points.length) {
              var i, p = points[0], left = p[0], right = p[0], top = p[1], bottom = p[1];
              for (i = 1; i < points.length; i++)p = points[i], left = mathMin(left, p[0]), right = mathMax(right, p[0]), top = mathMin(top, p[1]), bottom = mathMax(bottom, p[1]);
              min[0] = left, min[1] = top, max[0] = right, max[1] = bottom
            }
          }, bbox.fromLine = function (x0, y0, x1, y1, min, max) {
            min[0] = mathMin(x0, x1), min[1] = mathMin(y0, y1), max[0] = mathMax(x0, x1), max[1] = mathMax(y0, y1)
          };
          var xDim = [], yDim = [];
          return bbox.fromCubic = function (x0, y0, x1, y1, x2, y2, x3, y3, min, max) {
            var i, cubicExtrema = curve.cubicExtrema, cubicAt = curve.cubicAt, n = cubicExtrema(x0, x1, x2, x3, xDim);
            for (min[0] = 1 / 0, min[1] = 1 / 0, max[0] = -(1 / 0), max[1] = -(1 / 0), i = 0; i < n; i++) {
              var x = cubicAt(x0, x1, x2, x3, xDim[i]);
              min[0] = mathMin(x, min[0]), max[0] = mathMax(x, max[0])
            }
            for (n = cubicExtrema(y0, y1, y2, y3, yDim), i = 0; i < n; i++) {
              var y = cubicAt(y0, y1, y2, y3, yDim[i]);
              min[1] = mathMin(y, min[1]), max[1] = mathMax(y, max[1])
            }
            min[0] = mathMin(x0, min[0]), max[0] = mathMax(x0, max[0]), min[0] = mathMin(x3, min[0]), max[0] = mathMax(x3, max[0]), min[1] = mathMin(y0, min[1]), max[1] = mathMax(y0, max[1]), min[1] = mathMin(y3, min[1]), max[1] = mathMax(y3, max[1])
          }, bbox.fromQuadratic = function (x0, y0, x1, y1, x2, y2, min, max) {
            var quadraticExtremum = curve.quadraticExtremum, quadraticAt = curve.quadraticAt,
              tx = mathMax(mathMin(quadraticExtremum(x0, x1, x2), 1), 0),
              ty = mathMax(mathMin(quadraticExtremum(y0, y1, y2), 1), 0), x = quadraticAt(x0, x1, x2, tx),
              y = quadraticAt(y0, y1, y2, ty);
            min[0] = mathMin(x0, x2, x), min[1] = mathMin(y0, y2, y), max[0] = mathMax(x0, x2, x), max[1] = mathMax(y0, y2, y)
          }, bbox.fromArc = function (x, y, rx, ry, startAngle, endAngle, anticlockwise, min, max) {
            var vec2Min = vec2.min, vec2Max = vec2.max, diff = Math.abs(startAngle - endAngle);
            if (diff % PI2 < 1e-4 && diff > 1e-4)return min[0] = x - rx, min[1] = y - ry, max[0] = x + rx, void(max[1] = y + ry);
            if (start[0] = mathCos(startAngle) * rx + x, start[1] = mathSin(startAngle) * ry + y, end[0] = mathCos(endAngle) * rx + x, end[1] = mathSin(endAngle) * ry + y, vec2Min(min, start, end), vec2Max(max, start, end), startAngle %= PI2, startAngle < 0 && (startAngle += PI2), endAngle %= PI2, endAngle < 0 && (endAngle += PI2), startAngle > endAngle && !anticlockwise ? endAngle += PI2 : startAngle < endAngle && anticlockwise && (startAngle += PI2), anticlockwise) {
              var tmp = endAngle;
              endAngle = startAngle, startAngle = tmp
            }
            for (var angle = 0; angle < endAngle; angle += Math.PI / 2)angle > startAngle && (extremity[0] = mathCos(angle) * rx + x, extremity[1] = mathSin(angle) * ry + y, vec2Min(min, extremity, min), vec2Max(max, extremity, max))
          }, bbox
        }),define("echarts/coord/cartesian/Cartesian", ["require", "zrender/core/util"], function (require) {
          function dimAxisMapper(dim) {
            return this._axes[dim]
          }
          
          var zrUtil = require("zrender/core/util"), Cartesian = function (name) {
            this._axes = {}, this._dimList = [], this.name = name || ""
          };
          return Cartesian.prototype = {
            constructor: Cartesian, type: "cartesian", getAxis: function (dim) {
              return this._axes[dim]
            }, getAxes: function () {
              return zrUtil.map(this._dimList, dimAxisMapper, this)
            }, getAxesByScale: function (scaleType) {
              return scaleType = scaleType.toLowerCase(), zrUtil.filter(this.getAxes(), function (axis) {
                return axis.scale.type === scaleType
              })
            }, addAxis: function (axis) {
              var dim = axis.dim;
              this._axes[dim] = axis, this._dimList.push(dim)
            }, dataToCoord: function (val) {
              return this._dataCoordConvert(val, "dataToCoord")
            }, coordToData: function (val) {
              return this._dataCoordConvert(val, "coordToData")
            }, _dataCoordConvert: function (input, method) {
              for (var dimList = this._dimList, output = input instanceof Array ? [] : {}, i = 0; i < dimList.length; i++) {
                var dim = dimList[i], axis = this._axes[dim];
                output[dim] = axis[method](input[dim])
              }
              return output
            }
          }, Cartesian
        }),define("echarts/model/mixin/boxLayout", ["require"], function (require) {
          return {
            getBoxLayoutParams: function () {
              return {
                left: this.get("left"),
                top: this.get("top"),
                right: this.get("right"),
                bottom: this.get("bottom"),
                width: this.get("width"),
                height: this.get("height")
              }
            }
          }
        }),define("echarts/util/component", ["require", "zrender/core/util", "./clazz"], function (require) {
          var zrUtil = require("zrender/core/util"), clazz = require("./clazz"), parseClassType = clazz.parseClassType,
            base = 0, componentUtil = {}, DELIMITER = "_";
          return componentUtil.getUID = function (type) {
            return [type || "", base++, Math.random()].join(DELIMITER)
          }, componentUtil.enableSubTypeDefaulter = function (entity) {
            var subTypeDefaulters = {};
            return entity.registerSubTypeDefaulter = function (componentType, defaulter) {
              componentType = parseClassType(componentType), subTypeDefaulters[componentType.main] = defaulter
            }, entity.determineSubType = function (componentType, option) {
              var type = option.type;
              if (!type) {
                var componentTypeMain = parseClassType(componentType).main;
                entity.hasSubTypes(componentType) && subTypeDefaulters[componentTypeMain] && (type = subTypeDefaulters[componentTypeMain](option))
              }
              return type
            }, entity
          }, componentUtil.enableTopologicalTravel = function (entity, dependencyGetter) {
            function makeDepndencyGraph(fullNameList) {
              var graph = {}, noEntryList = [];
              return zrUtil.each(fullNameList, function (name) {
                var thisItem = createDependencyGraphItem(graph, name),
                  originalDeps = thisItem.originalDeps = dependencyGetter(name),
                  availableDeps = getAvailableDependencies(originalDeps, fullNameList);
                thisItem.entryCount = availableDeps.length, 0 === thisItem.entryCount && noEntryList.push(name), zrUtil.each(availableDeps, function (dependentName) {
                  zrUtil.indexOf(thisItem.predecessor, dependentName) < 0 && thisItem.predecessor.push(dependentName);
                  var thatItem = createDependencyGraphItem(graph, dependentName);
                  zrUtil.indexOf(thatItem.successor, dependentName) < 0 && thatItem.successor.push(name)
                })
              }), {graph: graph, noEntryList: noEntryList}
            }
            
            function createDependencyGraphItem(graph, name) {
              return graph[name] || (graph[name] = {predecessor: [], successor: []}), graph[name]
            }
            
            function getAvailableDependencies(originalDeps, fullNameList) {
              var availableDeps = [];
              return zrUtil.each(originalDeps, function (dep) {
                zrUtil.indexOf(fullNameList, dep) >= 0 && availableDeps.push(dep)
              }), availableDeps
            }
            
            entity.topologicalTravel = function (targetNameList, fullNameList, callback, context) {
              function removeEdge(succComponentType) {
                graph[succComponentType].entryCount--, 0 === graph[succComponentType].entryCount && stack.push(succComponentType)
              }
              
              function removeEdgeAndAdd(succComponentType) {
                targetNameSet[succComponentType] = !0, removeEdge(succComponentType)
              }
              
              if (targetNameList.length) {
                var result = makeDepndencyGraph(fullNameList), graph = result.graph, stack = result.noEntryList,
                  targetNameSet = {};
                for (zrUtil.each(targetNameList, function (name) {
                  targetNameSet[name] = !0
                }); stack.length;) {
                  var currComponentType = stack.pop(), currVertex = graph[currComponentType],
                    isInTargetNameSet = !!targetNameSet[currComponentType];
                  isInTargetNameSet && (callback.call(context, currComponentType, currVertex.originalDeps.slice()), delete targetNameSet[currComponentType]), zrUtil.each(currVertex.successor, isInTargetNameSet ? removeEdgeAndAdd : removeEdge)
                }
                zrUtil.each(targetNameSet, function () {
                  throw new Error("Circle dependency may exists")
                })
              }
            }
          }, componentUtil
        }),define("zrender/mixin/Animatable", ["require", "../animation/Animator", "../core/util", "../core/log"], function (require) {
          var Animator = require("../animation/Animator"), util = require("../core/util"), isString = util.isString,
            isFunction = util.isFunction, isObject = util.isObject, log = require("../core/log"),
            Animatable = function () {
              this.animators = []
            };
          return Animatable.prototype = {
            constructor: Animatable, animate: function (path, loop) {
              var target, animatingShape = !1, el = this, zr = this.__zr;
              if (path) {
                var pathSplitted = path.split("."), prop = el;
                animatingShape = "shape" === pathSplitted[0];
                for (var i = 0, l = pathSplitted.length; i < l; i++)prop && (prop = prop[pathSplitted[i]]);
                prop && (target = prop)
              } else target = el;
              if (!target)return void log('Property "' + path + '" is not existed in element ' + el.id);
              var animators = el.animators, animator = new Animator(target, loop);
              return animator.during(function (target) {
                el.dirty(animatingShape)
              }).done(function () {
                animators.splice(util.indexOf(animators, animator), 1)
              }), animators.push(animator), zr && zr.animation.addAnimator(animator), animator
            }, stopAnimation: function (forwardToLast) {
              for (var animators = this.animators, len = animators.length, i = 0; i < len; i++)animators[i].stop(forwardToLast);
              return animators.length = 0, this
            }, animateTo: function (target, time, delay, easing, callback) {
              function done() {
                count--, count || callback && callback()
              }
              
              isString(delay) ? (callback = easing, easing = delay, delay = 0) : isFunction(easing) ? (callback = easing, easing = "linear", delay = 0) : isFunction(delay) ? (callback = delay, delay = 0) : isFunction(time) ? (callback = time, time = 500) : time || (time = 500), this.stopAnimation(), this._animateToShallow("", this, target, time, delay, easing, callback);
              var animators = this.animators.slice(), count = animators.length;
              count || callback && callback();
              for (var i = 0; i < animators.length; i++)animators[i].done(done).start(easing)
            }, _animateToShallow: function (path, source, target, time, delay) {
              var objShallow = {}, propertyCount = 0;
              for (var name in target)if (target.hasOwnProperty(name))if (null != source[name]) isObject(target[name]) && !util.isArrayLike(target[name]) ? this._animateToShallow(path ? path + "." + name : name, source[name], target[name], time, delay) : (objShallow[name] = target[name], propertyCount++); else if (null != target[name])if (path) {
                var props = {};
                props[path] = {}, props[path][name] = target[name], this.attr(props)
              } else this.attr(name, target[name]);
              return propertyCount > 0 && this.animate(path, !1).when(null == time ? 500 : time, objShallow).delay(delay || 0), this
            }
          }, Animatable
        }),define("zrender/core/guid", [], function () {
          var idStart = 2311;
          return function () {
            return idStart++
          }
        }),define("zrender/core/LRU", ["require"], function (require) {
          var LinkedList = function () {
            this.head = null, this.tail = null, this._len = 0
          }, linkedListProto = LinkedList.prototype;
          linkedListProto.insert = function (val) {
            var entry = new Entry(val);
            return this.insertEntry(entry), entry
          }, linkedListProto.insertEntry = function (entry) {
            this.head ? (this.tail.next = entry, entry.prev = this.tail, entry.next = null, this.tail = entry) : this.head = this.tail = entry, this._len++
          }, linkedListProto.remove = function (entry) {
            var prev = entry.prev, next = entry.next;
            prev ? prev.next = next : this.head = next, next ? next.prev = prev : this.tail = prev, entry.next = entry.prev = null, this._len--
          }, linkedListProto.len = function () {
            return this._len
          }, linkedListProto.clear = function () {
            this.head = this.tail = null, this._len = 0
          };
          var Entry = function (val) {
            this.value = val, this.next, this.prev
          }, LRU = function (maxSize) {
            this._list = new LinkedList, this._map = {}, this._maxSize = maxSize || 10, this._lastRemovedEntry = null
          }, LRUProto = LRU.prototype;
          return LRUProto.put = function (key, value) {
            var list = this._list, map = this._map, removed = null;
            if (null == map[key]) {
              var len = list.len(), entry = this._lastRemovedEntry;
              if (len >= this._maxSize && len > 0) {
                var leastUsedEntry = list.head;
                list.remove(leastUsedEntry), delete map[leastUsedEntry.key], removed = leastUsedEntry.value, this._lastRemovedEntry = leastUsedEntry
              }
              entry ? entry.value = value : entry = new Entry(value), entry.key = key, list.insertEntry(entry), map[key] = entry
            }
            return removed
          }, LRUProto.get = function (key) {
            var entry = this._map[key], list = this._list;
            if (null != entry)return entry !== list.tail && (list.remove(entry), list.insertEntry(entry)), entry.value
          }, LRUProto.clear = function () {
            this._list.clear(), this._map = {}
          }, LRU
        }),define("echarts/coord/cartesian/axisLabelInterval", ["require", "zrender/core/util", "../axisHelper"], function (require) {
          var zrUtil = require("zrender/core/util"), axisHelper = require("../axisHelper");
          return function (axis) {
            var axisModel = axis.model, labelModel = axisModel.getModel("axisLabel"),
              labelInterval = labelModel.get("interval");
            return "category" !== axis.type || "auto" !== labelInterval ? "auto" === labelInterval ? 0 : labelInterval : axisHelper.getAxisLabelInterval(zrUtil.map(axis.scale.getTicks(), axis.dataToCoord, axis), axisModel.getFormattedLabels(), labelModel.getModel("textStyle").getFont(), axis.isHorizontal())
          }
        }),define("zrender/core/log", ["require", "../config"], function (require) {
          var config = require("../config");
          return function () {
            if (0 !== config.debugMode)if (1 == config.debugMode)for (var k in arguments)throw new Error(arguments[k]); else if (config.debugMode > 1)for (var k in arguments);
          }
        }),define("zrender/animation/Animator", ["require", "./Clip", "../tool/color", "../core/util"], function (require) {
          function defaultGetter(target, key) {
            return target[key]
          }
          
          function defaultSetter(target, key, value) {
            target[key] = value
          }
          
          function interpolateNumber(p0, p1, percent) {
            return (p1 - p0) * percent + p0
          }
          
          function interpolateString(p0, p1, percent) {
            return percent > .5 ? p1 : p0
          }
          
          function interpolateArray(p0, p1, percent, out, arrDim) {
            var len = p0.length;
            if (1 == arrDim)for (var i = 0; i < len; i++)out[i] = interpolateNumber(p0[i], p1[i], percent); else for (var len2 = p0[0].length, i = 0; i < len; i++)for (var j = 0; j < len2; j++)out[i][j] = interpolateNumber(p0[i][j], p1[i][j], percent)
          }
          
          function fillArr(arr0, arr1, arrDim) {
            var arr0Len = arr0.length, arr1Len = arr1.length;
            if (arr0Len !== arr1Len) {
              var isPreviousLarger = arr0Len > arr1Len;
              if (isPreviousLarger) arr0.length = arr1Len; else for (var i = arr0Len; i < arr1Len; i++)arr0.push(1 === arrDim ? arr1[i] : arraySlice.call(arr1[i]))
            }
            for (var len2 = arr0[0] && arr0[0].length, i = 0; i < arr0.length; i++)if (1 === arrDim) isNaN(arr0[i]) && (arr0[i] = arr1[i]); else for (var j = 0; j < len2; j++)isNaN(arr0[i][j]) && (arr0[i][j] = arr1[i][j])
          }
          
          function isArraySame(arr0, arr1, arrDim) {
            if (arr0 === arr1)return !0;
            var len = arr0.length;
            if (len !== arr1.length)return !1;
            if (1 === arrDim) {
              for (var i = 0; i < len; i++)if (arr0[i] !== arr1[i])return !1
            } else for (var len2 = arr0[0].length, i = 0; i < len; i++)for (var j = 0; j < len2; j++)if (arr0[i][j] !== arr1[i][j])return !1;
            return !0
          }
          
          function catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out, arrDim) {
            var len = p0.length;
            if (1 == arrDim)for (var i = 0; i < len; i++)out[i] = catmullRomInterpolate(p0[i], p1[i], p2[i], p3[i], t, t2, t3); else for (var len2 = p0[0].length, i = 0; i < len; i++)for (var j = 0; j < len2; j++)out[i][j] = catmullRomInterpolate(p0[i][j], p1[i][j], p2[i][j], p3[i][j], t, t2, t3)
          }
          
          function catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
            var v0 = .5 * (p2 - p0), v1 = .5 * (p3 - p1);
            return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1
          }
          
          function cloneValue(value) {
            if (isArrayLike(value)) {
              var len = value.length;
              if (isArrayLike(value[0])) {
                for (var ret = [], i = 0; i < len; i++)ret.push(arraySlice.call(value[i]));
                return ret
              }
              return arraySlice.call(value)
            }
            return value
          }
          
          function rgba2String(rgba) {
            return rgba[0] = Math.floor(rgba[0]), rgba[1] = Math.floor(rgba[1]), rgba[2] = Math.floor(rgba[2]), "rgba(" + rgba.join(",") + ")"
          }
          
          function createTrackClip(animator, easing, oneTrackDone, keyframes, propName) {
            var getter = animator._getter, setter = animator._setter, useSpline = "spline" === easing,
              trackLen = keyframes.length;
            if (trackLen) {
              var trackMaxTime, firstVal = keyframes[0].value, isValueArray = isArrayLike(firstVal), isValueColor = !1,
                isValueString = !1, arrDim = isValueArray && isArrayLike(firstVal[0]) ? 2 : 1;
              keyframes.sort(function (a, b) {
                return a.time - b.time
              }), trackMaxTime = keyframes[trackLen - 1].time;
              for (var kfPercents = [], kfValues = [], prevValue = keyframes[0].value, isAllValueEqual = !0, i = 0; i < trackLen; i++) {
                kfPercents.push(keyframes[i].time / trackMaxTime);
                var value = keyframes[i].value;
                if (isValueArray && isArraySame(value, prevValue, arrDim) || !isValueArray && value === prevValue || (isAllValueEqual = !1), prevValue = value, "string" == typeof value) {
                  var colorArray = color.parse(value);
                  colorArray ? (value = colorArray, isValueColor = !0) : isValueString = !0
                }
                kfValues.push(value)
              }
              if (!isAllValueEqual) {
                for (var lastValue = kfValues[trackLen - 1], i = 0; i < trackLen - 1; i++)isValueArray ? fillArr(kfValues[i], lastValue, arrDim) : !isNaN(kfValues[i]) || isNaN(lastValue) || isValueString || isValueColor || (kfValues[i] = lastValue);
                isValueArray && fillArr(getter(animator._target, propName), lastValue, arrDim);
                var start, w, p0, p1, p2, p3, lastFrame = 0, lastFramePercent = 0;
                if (isValueColor)var rgba = [0, 0, 0, 0];
                var onframe = function (target, percent) {
                  var frame;
                  if (percent < 0) frame = 0; else if (percent < lastFramePercent) {
                    for (start = Math.min(lastFrame + 1, trackLen - 1), frame = start; frame >= 0 && !(kfPercents[frame] <= percent); frame--);
                    frame = Math.min(frame, trackLen - 2)
                  } else {
                    for (frame = lastFrame; frame < trackLen && !(kfPercents[frame] > percent); frame++);
                    frame = Math.min(frame - 1, trackLen - 2)
                  }
                  lastFrame = frame, lastFramePercent = percent;
                  var range = kfPercents[frame + 1] - kfPercents[frame];
                  if (0 !== range)if (w = (percent - kfPercents[frame]) / range, useSpline)if (p1 = kfValues[frame], p0 = kfValues[0 === frame ? frame : frame - 1], p2 = kfValues[frame > trackLen - 2 ? trackLen - 1 : frame + 1], p3 = kfValues[frame > trackLen - 3 ? trackLen - 1 : frame + 2], isValueArray) catmullRomInterpolateArray(p0, p1, p2, p3, w, w * w, w * w * w, getter(target, propName), arrDim); else {
                    var value;
                    if (isValueColor) value = catmullRomInterpolateArray(p0, p1, p2, p3, w, w * w, w * w * w, rgba, 1), value = rgba2String(rgba); else {
                      if (isValueString)return interpolateString(p1, p2, w);
                      value = catmullRomInterpolate(p0, p1, p2, p3, w, w * w, w * w * w)
                    }
                    setter(target, propName, value)
                  } else if (isValueArray) interpolateArray(kfValues[frame], kfValues[frame + 1], w, getter(target, propName), arrDim); else {
                    var value;
                    if (isValueColor) interpolateArray(kfValues[frame], kfValues[frame + 1], w, rgba, 1), value = rgba2String(rgba); else {
                      if (isValueString)return interpolateString(kfValues[frame], kfValues[frame + 1], w);
                      value = interpolateNumber(kfValues[frame], kfValues[frame + 1], w)
                    }
                    setter(target, propName, value)
                  }
                }, clip = new Clip({
                  target: animator._target,
                  life: trackMaxTime,
                  loop: animator._loop,
                  delay: animator._delay,
                  onframe: onframe,
                  ondestroy: oneTrackDone
                });
                return easing && "spline" !== easing && (clip.easing = easing), clip
              }
            }
          }
          
          var Clip = require("./Clip"), color = require("../tool/color"), util = require("../core/util"),
            isArrayLike = util.isArrayLike, arraySlice = Array.prototype.slice,
            Animator = function (target, loop, getter, setter) {
              this._tracks = {}, this._target = target, this._loop = loop || !1, this._getter = getter || defaultGetter, this._setter = setter || defaultSetter, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
            };
          return Animator.prototype = {
            when: function (time, props) {
              var tracks = this._tracks;
              for (var propName in props)if (props.hasOwnProperty(propName)) {
                if (!tracks[propName]) {
                  tracks[propName] = [];
                  var value = this._getter(this._target, propName);
                  if (null == value)continue;
                  0 !== time && tracks[propName].push({time: 0, value: cloneValue(value)})
                }
                tracks[propName].push({time: time, value: props[propName]})
              }
              return this
            }, during: function (callback) {
              return this._onframeList.push(callback), this
            }, pause: function () {
              for (var i = 0; i < this._clipList.length; i++)this._clipList[i].pause();
              this._paused = !0
            }, resume: function () {
              for (var i = 0; i < this._clipList.length; i++)this._clipList[i].resume();
              this._paused = !1
            }, isPaused: function () {
              return !!this._paused
            }, _doneCallback: function () {
              this._tracks = {}, this._clipList.length = 0;
              for (var doneList = this._doneList, len = doneList.length, i = 0; i < len; i++)doneList[i].call(this)
            }, start: function (easing) {
              var lastClip, self = this, clipCount = 0, oneTrackDone = function () {
                clipCount--, clipCount || self._doneCallback()
              };
              for (var propName in this._tracks)if (this._tracks.hasOwnProperty(propName)) {
                var clip = createTrackClip(this, easing, oneTrackDone, this._tracks[propName], propName);
                clip && (this._clipList.push(clip), clipCount++, this.animation && this.animation.addClip(clip), lastClip = clip)
              }
              if (lastClip) {
                var oldOnFrame = lastClip.onframe;
                lastClip.onframe = function (target, percent) {
                  oldOnFrame(target, percent);
                  for (var i = 0; i < self._onframeList.length; i++)self._onframeList[i](target, percent)
                }
              }
              return clipCount || this._doneCallback(), this
            }, stop: function (forwardToLast) {
              for (var clipList = this._clipList, animation = this.animation, i = 0; i < clipList.length; i++) {
                var clip = clipList[i];
                forwardToLast && clip.onframe(this._target, 1), animation && animation.removeClip(clip)
              }
              clipList.length = 0
            }, delay: function (time) {
              return this._delay = time, this
            }, done: function (cb) {
              return cb && this._doneList.push(cb), this
            }, getClips: function () {
              return this._clipList
            }
          }, Animator
        }),define("echarts/coord/cartesian/AxisModel", ["require", "../../model/Component", "zrender/core/util", "../axisModelCreator", "../axisModelCommonMixin"], function (require) {
          function getAxisType(axisDim, option) {
            return option.type || (option.data ? "category" : "value")
          }
          
          var ComponentModel = require("../../model/Component"), zrUtil = require("zrender/core/util"),
            axisModelCreator = require("../axisModelCreator"), AxisModel = ComponentModel.extend({
              type: "cartesian2dAxis", axis: null, init: function () {
                AxisModel.superApply(this, "init", arguments), this.resetRange()
              }, mergeOption: function () {
                AxisModel.superApply(this, "mergeOption", arguments), this.resetRange()
              }, restoreData: function () {
                AxisModel.superApply(this, "restoreData", arguments), this.resetRange()
              }, getCoordSysModel: function () {
                return this.ecModel.queryComponents({
                  mainType: "grid",
                  index: this.option.gridIndex,
                  id: this.option.gridId
                })[0]
              }
            });
          zrUtil.merge(AxisModel.prototype, require("../axisModelCommonMixin"));
          var extraOption = {offset: 0};
          return axisModelCreator("x", AxisModel, getAxisType, extraOption), axisModelCreator("y", AxisModel, getAxisType, extraOption), AxisModel
        }),define("zrender/animation/Clip", ["require", "./easing"], function (require) {
          function Clip(options) {
            this._target = options.target, this._life = options.life || 1e3, this._delay = options.delay || 0, this._initialized = !1, this.loop = null != options.loop && options.loop, this.gap = options.gap || 0, this.easing = options.easing || "Linear", this.onframe = options.onframe, this.ondestroy = options.ondestroy, this.onrestart = options.onrestart, this._pausedTime = 0, this._paused = !1
          }
          
          var easingFuncs = require("./easing");
          return Clip.prototype = {
            constructor: Clip, step: function (globalTime, deltaTime) {
              if (this._initialized || (this._startTime = globalTime + this._delay, this._initialized = !0), this._paused)return void(this._pausedTime += deltaTime);
              var percent = (globalTime - this._startTime - this._pausedTime) / this._life;
              if (!(percent < 0)) {
                percent = Math.min(percent, 1);
                var easing = this.easing, easingFunc = "string" == typeof easing ? easingFuncs[easing] : easing,
                  schedule = "function" == typeof easingFunc ? easingFunc(percent) : percent;
                return this.fire("frame", schedule), 1 == percent ? this.loop ? (this.restart(globalTime), "restart") : (this._needsRemove = !0, "destroy") : null
              }
            }, restart: function (globalTime) {
              var remainder = (globalTime - this._startTime - this._pausedTime) % this._life;
              this._startTime = globalTime - remainder + this.gap, this._pausedTime = 0, this._needsRemove = !1
            }, fire: function (eventType, arg) {
              eventType = "on" + eventType, this[eventType] && this[eventType](this._target, arg)
            }, pause: function () {
              this._paused = !0
            }, resume: function () {
              this._paused = !1
            }
          }, Clip
        }),define("echarts/coord/axisModelCommonMixin", ["require", "zrender/core/util", "./axisHelper"], function (require) {
          function getName(obj) {
            return zrUtil.isObject(obj) && null != obj.value ? obj.value : obj
          }
          
          var zrUtil = require("zrender/core/util"), axisHelper = require("./axisHelper");
          return {
            getFormattedLabels: function () {
              return axisHelper.getFormattedLabels(this.axis, this.get("axisLabel.formatter"))
            }, getCategories: function () {
              return "category" === this.get("type") && zrUtil.map(this.get("data"), getName)
            }, getMin: function (origin) {
              var option = this.option, min = origin || null == option.rangeStart ? option.min : option.rangeStart;
              return this.axis && null != min && "dataMin" !== min && !zrUtil.eqNaN(min) && (min = this.axis.scale.parse(min)), min
            }, getMax: function (origin) {
              var option = this.option, max = origin || null == option.rangeEnd ? option.max : option.rangeEnd;
              return this.axis && null != max && "dataMax" !== max && !zrUtil.eqNaN(max) && (max = this.axis.scale.parse(max)), max
            }, getNeedCrossZero: function () {
              var option = this.option;
              return null == option.rangeStart && null == option.rangeEnd && !option.scale
            }, getCoordSysModel: zrUtil.noop, setRange: function (rangeStart, rangeEnd) {
              this.option.rangeStart = rangeStart, this.option.rangeEnd = rangeEnd
            }, resetRange: function () {
              this.option.rangeStart = this.option.rangeEnd = null
            }
          }
        }),define("echarts/coord/axisModelCreator", ["require", "./axisDefault", "zrender/core/util", "../model/Component", "../util/layout"], function (require) {
          var axisDefault = require("./axisDefault"), zrUtil = require("zrender/core/util"),
            ComponentModel = require("../model/Component"), layout = require("../util/layout"),
            AXIS_TYPES = ["value", "category", "time", "log"];
          return function (axisName, BaseAxisModelClass, axisTypeDefaulter, extraDefaultOption) {
            zrUtil.each(AXIS_TYPES, function (axisType) {
              BaseAxisModelClass.extend({
                type: axisName + "Axis." + axisType,
                mergeDefaultAndTheme: function (option, ecModel) {
                  var layoutMode = this.layoutMode,
                    inputPositionParams = layoutMode ? layout.getLayoutParams(option) : {},
                    themeModel = ecModel.getTheme();
                  zrUtil.merge(option, themeModel.get(axisType + "Axis")), zrUtil.merge(option, this.getDefaultOption()), option.type = axisTypeDefaulter(axisName, option), layoutMode && layout.mergeLayoutParam(option, inputPositionParams, layoutMode)
                },
                defaultOption: zrUtil.mergeAll([{}, axisDefault[axisType + "Axis"], extraDefaultOption], !0)
              })
            }), ComponentModel.registerSubTypeDefaulter(axisName + "Axis", zrUtil.curry(axisTypeDefaulter, axisName))
          }
        }),define("zrender/animation/easing", [], function () {
          var easing = {
            linear: function (k) {
              return k
            }, quadraticIn: function (k) {
              return k * k
            }, quadraticOut: function (k) {
              return k * (2 - k)
            }, quadraticInOut: function (k) {
              return (k *= 2) < 1 ? .5 * k * k : -.5 * (--k * (k - 2) - 1)
            }, cubicIn: function (k) {
              return k * k * k
            }, cubicOut: function (k) {
              return --k * k * k + 1
            }, cubicInOut: function (k) {
              return (k *= 2) < 1 ? .5 * k * k * k : .5 * ((k -= 2) * k * k + 2)
            }, quarticIn: function (k) {
              return k * k * k * k
            }, quarticOut: function (k) {
              return 1 - --k * k * k * k
            }, quarticInOut: function (k) {
              return (k *= 2) < 1 ? .5 * k * k * k * k : -.5 * ((k -= 2) * k * k * k - 2)
            }, quinticIn: function (k) {
              return k * k * k * k * k
            }, quinticOut: function (k) {
              return --k * k * k * k * k + 1
            }, quinticInOut: function (k) {
              return (k *= 2) < 1 ? .5 * k * k * k * k * k : .5 * ((k -= 2) * k * k * k * k + 2)
            }, sinusoidalIn: function (k) {
              return 1 - Math.cos(k * Math.PI / 2)
            }, sinusoidalOut: function (k) {
              return Math.sin(k * Math.PI / 2)
            }, sinusoidalInOut: function (k) {
              return .5 * (1 - Math.cos(Math.PI * k))
            }, exponentialIn: function (k) {
              return 0 === k ? 0 : Math.pow(1024, k - 1)
            }, exponentialOut: function (k) {
              return 1 === k ? 1 : 1 - Math.pow(2, -10 * k)
            }, exponentialInOut: function (k) {
              return 0 === k ? 0 : 1 === k ? 1 : (k *= 2) < 1 ? .5 * Math.pow(1024, k - 1) : .5 * (-Math.pow(2, -10 * (k - 1)) + 2)
            }, circularIn: function (k) {
              return 1 - Math.sqrt(1 - k * k)
            }, circularOut: function (k) {
              return Math.sqrt(1 - --k * k)
            }, circularInOut: function (k) {
              return (k *= 2) < 1 ? -.5 * (Math.sqrt(1 - k * k) - 1) : .5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
            }, elasticIn: function (k) {
              var s, a = .1, p = .4;
              return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p)))
            }, elasticOut: function (k) {
              var s, a = .1, p = .4;
              return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1)
            }, elasticInOut: function (k) {
              var s, a = .1, p = .4;
              return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), (k *= 2) < 1 ? -.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p)) : a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * .5 + 1);
            }, backIn: function (k) {
              var s = 1.70158;
              return k * k * ((s + 1) * k - s)
            }, backOut: function (k) {
              var s = 1.70158;
              return --k * k * ((s + 1) * k + s) + 1
            }, backInOut: function (k) {
              var s = 2.5949095;
              return (k *= 2) < 1 ? .5 * (k * k * ((s + 1) * k - s)) : .5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
            }, bounceIn: function (k) {
              return 1 - easing.bounceOut(1 - k)
            }, bounceOut: function (k) {
              return k < 1 / 2.75 ? 7.5625 * k * k : k < 2 / 2.75 ? 7.5625 * (k -= 1.5 / 2.75) * k + .75 : k < 2.5 / 2.75 ? 7.5625 * (k -= 2.25 / 2.75) * k + .9375 : 7.5625 * (k -= 2.625 / 2.75) * k + .984375
            }, bounceInOut: function (k) {
              return k < .5 ? .5 * easing.bounceIn(2 * k) : .5 * easing.bounceOut(2 * k - 1) + .5
            }
          };
          return easing
        }),define("echarts/coord/axisDefault", ["require", "zrender/core/util"], function (require) {
          var zrUtil = require("zrender/core/util"), defaultOption = {
              show: !0,
              zlevel: 0,
              z: 0,
              inverse: !1,
              name: "",
              nameLocation: "end",
              nameRotate: null,
              nameTruncate: {maxWidth: null, ellipsis: "...", placeholder: "."},
              nameTextStyle: {},
              nameGap: 15,
              silent: !1,
              triggerEvent: !1,
              tooltip: {show: !1},
              axisPointer: {},
              axisLine: {show: !0, onZero: !0, lineStyle: {color: "#333", width: 1, type: "solid"}},
              axisTick: {show: !0, inside: !1, length: 5, lineStyle: {width: 1}},
              axisLabel: {
                show: !0,
                inside: !1,
                rotate: 0,
                showMinLabel: null,
                showMaxLabel: null,
                margin: 8,
                textStyle: {fontSize: 12}
              },
              splitLine: {show: !0, lineStyle: {color: ["#ccc"], width: 1, type: "solid"}},
              splitArea: {show: !1, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}}
            }, categoryAxis = zrUtil.merge({
              boundaryGap: !0,
              splitLine: {show: !1},
              axisTick: {alignWithLabel: !1, interval: "auto"},
              axisLabel: {interval: "auto"}
            }, defaultOption), valueAxis = zrUtil.merge({boundaryGap: [0, 0], splitNumber: 5}, defaultOption),
            timeAxis = zrUtil.defaults({scale: !0, min: "dataMin", max: "dataMax"}, valueAxis),
            logAxis = zrUtil.defaults({logBase: 10}, valueAxis);
          return logAxis.scale = !0, {
            categoryAxis: categoryAxis,
            valueAxis: valueAxis,
            timeAxis: timeAxis,
            logAxis: logAxis
          }
        }),define("zrender/contain/cubic", ["require", "../core/curve"], function (require) {
          var curve = require("../core/curve");
          return {
            containStroke: function (x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
              if (0 === lineWidth)return !1;
              var _l = lineWidth;
              if (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)return !1;
              var d = curve.cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, null);
              return d <= _l / 2
            }
          }
        }),define("zrender/contain/arc", ["require", "./util"], function (require) {
          var normalizeRadian = require("./util").normalizeRadian, PI2 = 2 * Math.PI;
          return {
            containStroke: function (cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
              if (0 === lineWidth)return !1;
              var _l = lineWidth;
              x -= cx, y -= cy;
              var d = Math.sqrt(x * x + y * y);
              if (d - _l > r || d + _l < r)return !1;
              if (Math.abs(startAngle - endAngle) % PI2 < 1e-4)return !0;
              if (anticlockwise) {
                var tmp = startAngle;
                startAngle = normalizeRadian(endAngle), endAngle = normalizeRadian(tmp)
              } else startAngle = normalizeRadian(startAngle), endAngle = normalizeRadian(endAngle);
              startAngle > endAngle && (endAngle += PI2);
              var angle = Math.atan2(y, x);
              return angle < 0 && (angle += PI2), angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle
            }
          }
        }),define("zrender/contain/quadratic", ["require", "../core/curve"], function (require) {
          var curve = require("../core/curve");
          return {
            containStroke: function (x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
              if (0 === lineWidth)return !1;
              var _l = lineWidth;
              if (y > y0 + _l && y > y1 + _l && y > y2 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l)return !1;
              var d = curve.quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, null);
              return d <= _l / 2
            }
          }
        }),define("zrender/contain/line", [], function () {
          return {
            containStroke: function (x0, y0, x1, y1, lineWidth, x, y) {
              if (0 === lineWidth)return !1;
              var _l = lineWidth, _a = 0, _b = x0;
              if (y > y0 + _l && y > y1 + _l || y < y0 - _l && y < y1 - _l || x > x0 + _l && x > x1 + _l || x < x0 - _l && x < x1 - _l)return !1;
              if (x0 === x1)return Math.abs(x - x0) <= _l / 2;
              _a = (y0 - y1) / (x0 - x1), _b = (x0 * y1 - x1 * y0) / (x0 - x1);
              var tmp = _a * x - y + _b, _s = tmp * tmp / (_a * _a + 1);
              return _s <= _l / 2 * _l / 2
            }
          }
        }),define("zrender/contain/util", ["require"], function (require) {
          var PI2 = 2 * Math.PI;
          return {
            normalizeRadian: function (angle) {
              return angle %= PI2, angle < 0 && (angle += PI2), angle
            }
          }
        }),define("zrender/contain/windingLine", [], function () {
          return function (x0, y0, x1, y1, x, y) {
            if (y > y0 && y > y1 || y < y0 && y < y1)return 0;
            if (y1 === y0)return 0;
            var dir = y1 < y0 ? 1 : -1, t = (y - y0) / (y1 - y0);
            1 !== t && 0 !== t || (dir = y1 < y0 ? .5 : -.5);
            var x_ = t * (x1 - x0) + x0;
            return x_ > x ? dir : 0
          }
        }),define("echarts/chart/bar/BaseBarSeries", ["require", "../../model/Series", "../helper/createListFromArray"], function (require) {
          var SeriesModel = require("../../model/Series"),
            createListFromArray = require("../helper/createListFromArray");
          return SeriesModel.extend({
            type: "series.__base_bar__",
            getInitialData: function (option, ecModel) {
              var coordSys = option.coordinateSystem;
              if ("cartesian2d" !== coordSys)throw new Error("Bar only support cartesian2d coordinateSystem");
              return createListFromArray(option.data, this, ecModel)
            },
            getMarkerPosition: function (value) {
              var coordSys = this.coordinateSystem;
              if (coordSys) {
                var pt = coordSys.dataToPoint(value, !0), data = this.getData(), offset = data.getLayout("offset"),
                  size = data.getLayout("size"), offsetIndex = coordSys.getBaseAxis().isHorizontal() ? 0 : 1;
                return pt[offsetIndex] += offset + size / 2, pt
              }
              return [NaN, NaN]
            },
            defaultOption: {
              zlevel: 0,
              z: 2,
              coordinateSystem: "cartesian2d",
              legendHoverLink: !0,
              barMinHeight: 0,
              itemStyle: {normal: {}, emphasis: {}}
            }
          })
        }),define("zrender/animation/Animation", ["require", "../core/util", "../core/event", "./requestAnimationFrame", "./Animator"], function (require) {
          var util = require("../core/util"), Dispatcher = require("../core/event").Dispatcher,
            requestAnimationFrame = require("./requestAnimationFrame"), Animator = require("./Animator"),
            Animation = function (options) {
              options = options || {}, this.stage = options.stage || {}, this.onframe = options.onframe || function () {
                }, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, Dispatcher.call(this)
            };
          return Animation.prototype = {
            constructor: Animation, addClip: function (clip) {
              this._clips.push(clip)
            }, addAnimator: function (animator) {
              animator.animation = this;
              for (var clips = animator.getClips(), i = 0; i < clips.length; i++)this.addClip(clips[i])
            }, removeClip: function (clip) {
              var idx = util.indexOf(this._clips, clip);
              idx >= 0 && this._clips.splice(idx, 1)
            }, removeAnimator: function (animator) {
              for (var clips = animator.getClips(), i = 0; i < clips.length; i++)this.removeClip(clips[i]);
              animator.animation = null
            }, _update: function () {
              for (var time = (new Date).getTime() - this._pausedTime, delta = time - this._time, clips = this._clips, len = clips.length, deferredEvents = [], deferredClips = [], i = 0; i < len; i++) {
                var clip = clips[i], e = clip.step(time, delta);
                e && (deferredEvents.push(e), deferredClips.push(clip))
              }
              for (var i = 0; i < len;)clips[i]._needsRemove ? (clips[i] = clips[len - 1], clips.pop(), len--) : i++;
              len = deferredEvents.length;
              for (var i = 0; i < len; i++)deferredClips[i].fire(deferredEvents[i]);
              this._time = time, this.onframe(delta), this.trigger("frame", delta), this.stage.update && this.stage.update()
            }, _startLoop: function () {
              function step() {
                self._running && (requestAnimationFrame(step), !self._paused && self._update())
              }
              
              var self = this;
              this._running = !0, requestAnimationFrame(step)
            }, start: function () {
              this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
            }, stop: function () {
              this._running = !1
            }, pause: function () {
              this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
            }, resume: function () {
              this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
            }, clear: function () {
              this._clips = []
            }, animate: function (target, options) {
              options = options || {};
              var animator = new Animator(target, options.loop, options.getter, options.setter);
              return this.addAnimator(animator), animator
            }
          }, util.mixin(Animation, Dispatcher), Animation
        }),define("zrender/graphic/helper/poly", ["require", "./smoothSpline", "./smoothBezier"], function (require) {
          var smoothSpline = require("./smoothSpline"), smoothBezier = require("./smoothBezier");
          return {
            buildPath: function (ctx, shape, closePath) {
              var points = shape.points, smooth = shape.smooth;
              if (points && points.length >= 2) {
                if (smooth && "spline" !== smooth) {
                  var controlPoints = smoothBezier(points, smooth, closePath, shape.smoothConstraint);
                  ctx.moveTo(points[0][0], points[0][1]);
                  for (var len = points.length, i = 0; i < (closePath ? len : len - 1); i++) {
                    var cp1 = controlPoints[2 * i], cp2 = controlPoints[2 * i + 1], p = points[(i + 1) % len];
                    ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1])
                  }
                } else {
                  "spline" === smooth && (points = smoothSpline(points, closePath)), ctx.moveTo(points[0][0], points[0][1]);
                  for (var i = 1, l = points.length; i < l; i++)ctx.lineTo(points[i][0], points[i][1])
                }
                closePath && ctx.closePath()
              }
            }
          }
        }),define("zrender/Storage", ["require", "./core/util", "./core/env", "./container/Group", "./core/timsort"], function (require) {
          function shapeCompareFunc(a, b) {
            return a.zlevel === b.zlevel ? a.z === b.z ? a.z2 - b.z2 : a.z - b.z : a.zlevel - b.zlevel
          }
          
          var util = require("./core/util"), env = require("./core/env"), Group = require("./container/Group"),
            timsort = require("./core/timsort"), Storage = function () {
              this._roots = [], this._displayList = [], this._displayListLen = 0
            };
          return Storage.prototype = {
            constructor: Storage, traverse: function (cb, context) {
              for (var i = 0; i < this._roots.length; i++)this._roots[i].traverse(cb, context)
            }, getDisplayList: function (update, includeIgnore) {
              return includeIgnore = includeIgnore || !1, update && this.updateDisplayList(includeIgnore), this._displayList
            }, updateDisplayList: function (includeIgnore) {
              this._displayListLen = 0;
              for (var roots = this._roots, displayList = this._displayList, i = 0, len = roots.length; i < len; i++)this._updateAndAddDisplayable(roots[i], null, includeIgnore);
              displayList.length = this._displayListLen, env.canvasSupported && timsort(displayList, shapeCompareFunc)
            }, _updateAndAddDisplayable: function (el, clipPaths, includeIgnore) {
              if (!el.ignore || includeIgnore) {
                el.beforeUpdate(), el.__dirty && el.update(), el.afterUpdate();
                var userSetClipPath = el.clipPath;
                if (userSetClipPath) {
                  clipPaths = clipPaths ? clipPaths.slice() : [];
                  for (var currentClipPath = userSetClipPath, parentClipPath = el; currentClipPath;)currentClipPath.parent = parentClipPath, currentClipPath.updateTransform(), clipPaths.push(currentClipPath), parentClipPath = currentClipPath, currentClipPath = currentClipPath.clipPath
                }
                if (el.isGroup) {
                  for (var children = el._children, i = 0; i < children.length; i++) {
                    var child = children[i];
                    el.__dirty && (child.__dirty = !0), this._updateAndAddDisplayable(child, clipPaths, includeIgnore)
                  }
                  el.__dirty = !1
                } else el.__clipPaths = clipPaths, this._displayList[this._displayListLen++] = el
              }
            }, addRoot: function (el) {
              el.__storage !== this && (el instanceof Group && el.addChildrenToStorage(this), this.addToStorage(el), this._roots.push(el))
            }, delRoot: function (el) {
              if (null == el) {
                for (var i = 0; i < this._roots.length; i++) {
                  var root = this._roots[i];
                  root instanceof Group && root.delChildrenFromStorage(this)
                }
                return this._roots = [], this._displayList = [], void(this._displayListLen = 0)
              }
              if (el instanceof Array)for (var i = 0, l = el.length; i < l; i++)this.delRoot(el[i]); else {
                var idx = util.indexOf(this._roots, el);
                idx >= 0 && (this.delFromStorage(el), this._roots.splice(idx, 1), el instanceof Group && el.delChildrenFromStorage(this))
              }
            }, addToStorage: function (el) {
              return el.__storage = this, el.dirty(!1), this
            }, delFromStorage: function (el) {
              return el && (el.__storage = null), this
            }, dispose: function () {
              this._renderList = this._roots = null
            }, displayableSortFunc: shapeCompareFunc
          }, Storage
        }),define("zrender/Handler", ["require", "./core/util", "./mixin/Draggable", "./mixin/Eventful"], function (require) {
          function makeEventPacket(eveType, targetInfo, event) {
            return {
              type: eveType,
              event: event,
              target: targetInfo.target,
              topTarget: targetInfo.topTarget,
              cancelBubble: !1,
              offsetX: event.zrX,
              offsetY: event.zrY,
              gestureEvent: event.gestureEvent,
              pinchX: event.pinchX,
              pinchY: event.pinchY,
              pinchScale: event.pinchScale,
              wheelDelta: event.zrDelta,
              zrByTouch: event.zrByTouch
            }
          }
          
          function EmptyProxy() {
          }
          
          function isHover(displayable, x, y) {
            if (displayable[displayable.rectHover ? "rectContain" : "contain"](x, y)) {
              for (var isSilent, el = displayable; el;) {
                if (el.clipPath && !el.clipPath.contain(x, y))return !1;
                el.silent && (isSilent = !0), el = el.parent
              }
              return !isSilent || SILENT
            }
            return !1
          }
          
          var util = require("./core/util"), Draggable = require("./mixin/Draggable"),
            Eventful = require("./mixin/Eventful"), SILENT = "silent";
          EmptyProxy.prototype.dispose = function () {
          };
          var handlerNames = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
            Handler = function (storage, painter, proxy, painterRoot) {
              Eventful.call(this), this.storage = storage, this.painter = painter, this.painterRoot = painterRoot, proxy = proxy || new EmptyProxy, this.proxy = proxy, proxy.handler = this, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, Draggable.call(this), util.each(handlerNames, function (name) {
                proxy.on && proxy.on(name, this[name], this)
              }, this)
            };
          return Handler.prototype = {
            constructor: Handler, mousemove: function (event) {
              var x = event.zrX, y = event.zrY, lastHovered = this._hovered,
                hovered = this._hovered = this.findHover(x, y), hoveredTarget = hovered.target,
                lastHoveredTarget = lastHovered.target, proxy = this.proxy;
              proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : "default"), lastHoveredTarget && hoveredTarget !== lastHoveredTarget && lastHoveredTarget.__zr && this.dispatchToElement(lastHovered, "mouseout", event), this.dispatchToElement(hovered, "mousemove", event), hoveredTarget && hoveredTarget !== lastHoveredTarget && this.dispatchToElement(hovered, "mouseover", event)
            }, mouseout: function (event) {
              this.dispatchToElement(this._hovered, "mouseout", event);
              var innerDom, element = event.toElement || event.relatedTarget;
              do element = element && element.parentNode; while (element && 9 != element.nodeType && !(innerDom = element === this.painterRoot));
              !innerDom && this.trigger("globalout", {event: event})
            }, resize: function (event) {
              this._hovered = {}
            }, dispatch: function (eventName, eventArgs) {
              var handler = this[eventName];
              handler && handler.call(this, eventArgs)
            }, dispose: function () {
              this.proxy.dispose(), this.storage = this.proxy = this.painter = null
            }, setCursorStyle: function (cursorStyle) {
              var proxy = this.proxy;
              proxy.setCursor && proxy.setCursor(cursorStyle)
            }, dispatchToElement: function (targetInfo, eventName, event) {
              targetInfo = targetInfo || {};
              for (var eventHandler = "on" + eventName, eventPacket = makeEventPacket(eventName, targetInfo, event), el = targetInfo.target; el && (el[eventHandler] && (eventPacket.cancelBubble = el[eventHandler].call(el, eventPacket)), el.trigger(eventName, eventPacket), el = el.parent, !eventPacket.cancelBubble););
              eventPacket.cancelBubble || (this.trigger(eventName, eventPacket), this.painter && this.painter.eachOtherLayer(function (layer) {
                "function" == typeof layer[eventHandler] && layer[eventHandler].call(layer, eventPacket), layer.trigger && layer.trigger(eventName, eventPacket)
              }))
            }, findHover: function (x, y, exclude) {
              for (var list = this.storage.getDisplayList(), out = {}, i = list.length - 1; i >= 0; i--) {
                var hoverCheckResult;
                if (list[i] !== exclude && !list[i].ignore && (hoverCheckResult = isHover(list[i], x, y)) && (!out.topTarget && (out.topTarget = list[i]), hoverCheckResult !== SILENT)) {
                  out.target = list[i];
                  break
                }
              }
              return out
            }
          }, util.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (name) {
            Handler.prototype[name] = function (event) {
              var hovered = this.findHover(event.zrX, event.zrY), hoveredTarget = hovered.target;
              if ("mousedown" === name) this._downel = hoveredTarget, this._upel = hoveredTarget; else if ("mosueup" === name) this._upel = hoveredTarget; else if ("click" === name && this._downel !== this._upel)return;
              this.dispatchToElement(hovered, name, event)
            }
          }), util.mixin(Handler, Eventful), util.mixin(Handler, Draggable), Handler
        }),define("zrender/dom/HandlerProxy", ["require", "../core/event", "../core/util", "../mixin/Eventful", "../core/env", "../core/GestureMgr"], function (require) {
          function eventNameFix(name) {
            return "mousewheel" === name && env.browser.firefox ? "DOMMouseScroll" : name
          }
          
          function processGesture(proxy, event, stage) {
            var gestureMgr = proxy._gestureMgr;
            "start" === stage && gestureMgr.clear();
            var gestureInfo = gestureMgr.recognize(event, proxy.handler.findHover(event.zrX, event.zrY, null).target, proxy.dom);
            if ("end" === stage && gestureMgr.clear(), gestureInfo) {
              var type = gestureInfo.type;
              event.gestureEvent = type, proxy.handler.dispatchToElement({target: gestureInfo.target}, type, gestureInfo.event)
            }
          }
          
          function setTouchTimer(instance) {
            instance._touching = !0, clearTimeout(instance._touchTimer), instance._touchTimer = setTimeout(function () {
              instance._touching = !1
            }, 700)
          }
          
          function isPointerFromTouch(event) {
            var pointerType = event.pointerType;
            return "pen" === pointerType || "touch" === pointerType
          }
          
          function initDomHandler(instance) {
            function makeMouseHandler(fn, instance) {
              return function () {
                if (!instance._touching)return fn.apply(instance, arguments)
              }
            }
            
            zrUtil.each(touchHandlerNames, function (name) {
              instance._handlers[name] = zrUtil.bind(domHandlers[name], instance)
            }), zrUtil.each(pointerHandlerNames, function (name) {
              instance._handlers[name] = zrUtil.bind(domHandlers[name], instance)
            }), zrUtil.each(mouseHandlerNames, function (name) {
              instance._handlers[name] = makeMouseHandler(domHandlers[name], instance)
            })
          }
          
          function HandlerDomProxy(dom) {
            function mountHandlers(handlerNames, instance) {
              zrUtil.each(handlerNames, function (name) {
                addEventListener(dom, eventNameFix(name), instance._handlers[name])
              }, instance)
            }
            
            Eventful.call(this), this.dom = dom, this._touching = !1, this._touchTimer, this._gestureMgr = new GestureMgr, this._handlers = {}, initDomHandler(this), env.pointerEventsSupported ? mountHandlers(pointerHandlerNames, this) : (env.touchEventsSupported && mountHandlers(touchHandlerNames, this), mountHandlers(mouseHandlerNames, this))
          }
          
          var eventTool = require("../core/event"), zrUtil = require("../core/util"),
            Eventful = require("../mixin/Eventful"), env = require("../core/env"),
            GestureMgr = require("../core/GestureMgr"), addEventListener = eventTool.addEventListener,
            removeEventListener = eventTool.removeEventListener, normalizeEvent = eventTool.normalizeEvent,
            TOUCH_CLICK_DELAY = 300,
            mouseHandlerNames = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
            touchHandlerNames = ["touchstart", "touchend", "touchmove"],
            pointerEventNames = {pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1},
            pointerHandlerNames = zrUtil.map(mouseHandlerNames, function (name) {
              var nm = name.replace("mouse", "pointer");
              return pointerEventNames[nm] ? nm : name
            }), domHandlers = {
              mousemove: function (event) {
                event = normalizeEvent(this.dom, event), this.trigger("mousemove", event)
              }, mouseout: function (event) {
                event = normalizeEvent(this.dom, event);
                var element = event.toElement || event.relatedTarget;
                if (element != this.dom)for (; element && 9 != element.nodeType;) {
                  if (element === this.dom)return;
                  element = element.parentNode
                }
                this.trigger("mouseout", event)
              }, touchstart: function (event) {
                event = normalizeEvent(this.dom, event), event.zrByTouch = !0, this._lastTouchMoment = new Date, processGesture(this, event, "start"), domHandlers.mousemove.call(this, event), domHandlers.mousedown.call(this, event), setTouchTimer(this)
              }, touchmove: function (event) {
                event = normalizeEvent(this.dom, event), event.zrByTouch = !0, processGesture(this, event, "change"), domHandlers.mousemove.call(this, event), setTouchTimer(this)
              }, touchend: function (event) {
                event = normalizeEvent(this.dom, event), event.zrByTouch = !0, processGesture(this, event, "end"), domHandlers.mouseup.call(this, event), +new Date - this._lastTouchMoment < TOUCH_CLICK_DELAY && domHandlers.click.call(this, event), setTouchTimer(this)
              }, pointerdown: function (event) {
                domHandlers.mousedown.call(this, event)
              }, pointermove: function (event) {
                isPointerFromTouch(event) || domHandlers.mousemove.call(this, event)
              }, pointerup: function (event) {
                domHandlers.mouseup.call(this, event)
              }, pointerout: function (event) {
                isPointerFromTouch(event) || domHandlers.mouseout.call(this, event)
              }
            };
          zrUtil.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (name) {
            domHandlers[name] = function (event) {
              event = normalizeEvent(this.dom, event), this.trigger(name, event)
            }
          });
          var handlerDomProxyProto = HandlerDomProxy.prototype;
          return handlerDomProxyProto.dispose = function () {
            for (var handlerNames = mouseHandlerNames.concat(touchHandlerNames), i = 0; i < handlerNames.length; i++) {
              var name = handlerNames[i];
              removeEventListener(this.dom, eventNameFix(name), this._handlers[name])
            }
          }, handlerDomProxyProto.setCursor = function (cursorStyle) {
            this.dom.style.cursor = cursorStyle || "default"
          }, zrUtil.mixin(HandlerDomProxy, Eventful), HandlerDomProxy
        }),define("zrender/Painter", ["require", "./config", "./core/util", "./core/log", "./core/BoundingRect", "./core/timsort", "./Layer", "./animation/requestAnimationFrame", "./graphic/Image"], function (require) {
          function parseInt10(val) {
            return parseInt(val, 10)
          }
          
          function isLayerValid(layer) {
            return !!layer && (!!layer.__builtin__ || "function" == typeof layer.resize && "function" == typeof layer.refresh)
          }
          
          function preProcessLayer(layer) {
            layer.__unusedCount++
          }
          
          function postProcessLayer(layer) {
            1 == layer.__unusedCount && layer.clear()
          }
          
          function isDisplayableCulled(el, width, height) {
            return tmpRect.copy(el.getBoundingRect()), el.transform && tmpRect.applyTransform(el.transform), viewRect.width = width, viewRect.height = height, !tmpRect.intersect(viewRect)
          }
          
          function isClipPathChanged(clipPaths, prevClipPaths) {
            if (clipPaths == prevClipPaths)return !1;
            if (!clipPaths || !prevClipPaths || clipPaths.length !== prevClipPaths.length)return !0;
            for (var i = 0; i < clipPaths.length; i++)if (clipPaths[i] !== prevClipPaths[i])return !0
          }
          
          function doClip(clipPaths, ctx) {
            for (var i = 0; i < clipPaths.length; i++) {
              var clipPath = clipPaths[i];
              clipPath.setTransform(ctx), ctx.beginPath(), clipPath.buildPath(ctx, clipPath.shape), ctx.clip(), clipPath.restoreTransform(ctx)
            }
          }
          
          function createRoot(width, height) {
            var domRoot = document.createElement("div");
            return domRoot.style.cssText = ["position:relative", "overflow:hidden", "width:" + width + "px", "height:" + height + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", domRoot
          }
          
          var config = require("./config"), util = require("./core/util"), log = require("./core/log"),
            BoundingRect = require("./core/BoundingRect"), timsort = require("./core/timsort"),
            Layer = require("./Layer"), requestAnimationFrame = require("./animation/requestAnimationFrame"),
            MAX_PROGRESSIVE_LAYER_NUMBER = 5, tmpRect = new BoundingRect(0, 0, 0, 0),
            viewRect = new BoundingRect(0, 0, 0, 0), Painter = function (root, storage, opts) {
              var singleCanvas = !root.nodeName || "CANVAS" === root.nodeName.toUpperCase();
              this._opts = opts = util.extend({}, opts || {}), this.dpr = opts.devicePixelRatio || config.devicePixelRatio, this._singleCanvas = singleCanvas, this.root = root;
              var rootStyle = root.style;
              rootStyle && (rootStyle["-webkit-tap-highlight-color"] = "transparent", rootStyle["-webkit-user-select"] = rootStyle["user-select"] = rootStyle["-webkit-touch-callout"] = "none", root.innerHTML = ""), this.storage = storage;
              var zlevelList = this._zlevelList = [], layers = this._layers = {};
              if (this._layerConfig = {}, singleCanvas) {
                null != opts.width && (root.width = opts.width), null != opts.height && (root.height = opts.height);
                var width = root.width, height = root.height;
                this._width = width, this._height = height;
                var mainLayer = new Layer(root, this, 1);
                mainLayer.initContext(), layers[0] = mainLayer, zlevelList.push(0), this._domRoot = root
              } else {
                this._width = this._getSize(0), this._height = this._getSize(1);
                var domRoot = this._domRoot = createRoot(this._width, this._height);
                root.appendChild(domRoot)
              }
              this._progressiveLayers = [], this._hoverlayer, this._hoverElements = []
            };
          return Painter.prototype = {
            constructor: Painter, isSingleCanvas: function () {
              return this._singleCanvas
            }, getViewportRoot: function () {
              return this._domRoot
            }, refresh: function (paintAll) {
              var list = this.storage.getDisplayList(!0), zlevelList = this._zlevelList;
              this._paintList(list, paintAll);
              for (var i = 0; i < zlevelList.length; i++) {
                var z = zlevelList[i], layer = this._layers[z];
                !layer.__builtin__ && layer.refresh && layer.refresh()
              }
              return this.refreshHover(), this._progressiveLayers.length && this._startProgessive(), this
            }, addHover: function (el, hoverStyle) {
              if (!el.__hoverMir) {
                var elMirror = new el.constructor({style: el.style, shape: el.shape});
                elMirror.__from = el, el.__hoverMir = elMirror, elMirror.setStyle(hoverStyle), this._hoverElements.push(elMirror)
              }
            }, removeHover: function (el) {
              var elMirror = el.__hoverMir, hoverElements = this._hoverElements,
                idx = util.indexOf(hoverElements, elMirror);
              idx >= 0 && hoverElements.splice(idx, 1), el.__hoverMir = null
            }, clearHover: function (el) {
              for (var hoverElements = this._hoverElements, i = 0; i < hoverElements.length; i++) {
                var from = hoverElements[i].__from;
                from && (from.__hoverMir = null)
              }
              hoverElements.length = 0
            }, refreshHover: function () {
              var hoverElements = this._hoverElements, len = hoverElements.length, hoverLayer = this._hoverlayer;
              if (hoverLayer && hoverLayer.clear(), len) {
                timsort(hoverElements, this.storage.displayableSortFunc), hoverLayer || (hoverLayer = this._hoverlayer = this.getLayer(1e5));
                var scope = {};
                hoverLayer.ctx.save();
                for (var i = 0; i < len;) {
                  var el = hoverElements[i], originalEl = el.__from;
                  originalEl && originalEl.__zr ? (i++, originalEl.invisible || (el.transform = originalEl.transform, el.invTransform = originalEl.invTransform, el.__clipPaths = originalEl.__clipPaths, this._doPaintEl(el, hoverLayer, !0, scope))) : (hoverElements.splice(i, 1), originalEl.__hoverMir = null, len--)
                }
                hoverLayer.ctx.restore()
              }
            }, _startProgessive: function () {
              function step() {
                token === self._progressiveToken && self.storage && (self._doPaintList(self.storage.getDisplayList()), self._furtherProgressive ? (self._progress++, requestAnimationFrame(step)) : self._progressiveToken = -1)
              }
              
              var self = this;
              if (self._furtherProgressive) {
                var token = self._progressiveToken = +new Date;
                self._progress++, requestAnimationFrame(step)
              }
            }, _clearProgressive: function () {
              this._progressiveToken = -1, this._progress = 0, util.each(this._progressiveLayers, function (layer) {
                layer.__dirty && layer.clear()
              })
            }, _paintList: function (list, paintAll) {
              null == paintAll && (paintAll = !1), this._updateLayerStatus(list), this._clearProgressive(), this.eachBuiltinLayer(preProcessLayer), this._doPaintList(list, paintAll), this.eachBuiltinLayer(postProcessLayer)
            }, _doPaintList: function (list, paintAll) {
              function flushProgressiveLayer(layer) {
                var dpr = ctx.dpr || 1;
                ctx.save(), ctx.globalAlpha = 1, ctx.shadowBlur = 0, currentLayer.__dirty = !0, ctx.setTransform(1, 0, 0, 1, 0, 0), ctx.drawImage(layer.dom, 0, 0, width * dpr, height * dpr), ctx.restore()
              }
              
              for (var currentLayer, currentZLevel, ctx, scope, currentProgressiveLayer, layerProgress, progressiveLayerIdx = 0, width = this._width, height = this._height, frame = this._progress, i = 0, l = list.length; i < l; i++) {
                var el = list[i], elZLevel = this._singleCanvas ? 0 : el.zlevel, elFrame = el.__frame;
                if (elFrame < 0 && currentProgressiveLayer && (flushProgressiveLayer(currentProgressiveLayer), currentProgressiveLayer = null), currentZLevel !== elZLevel && (ctx && ctx.restore(), scope = {}, currentZLevel = elZLevel, currentLayer = this.getLayer(currentZLevel), currentLayer.__builtin__ || log("ZLevel " + currentZLevel + " has been used by unkown layer " + currentLayer.id), ctx = currentLayer.ctx, ctx.save(), currentLayer.__unusedCount = 0, (currentLayer.__dirty || paintAll) && currentLayer.clear()), currentLayer.__dirty || paintAll) {
                  if (elFrame >= 0) {
                    if (!currentProgressiveLayer) {
                      if (currentProgressiveLayer = this._progressiveLayers[Math.min(progressiveLayerIdx++, MAX_PROGRESSIVE_LAYER_NUMBER - 1)], currentProgressiveLayer.ctx.save(), currentProgressiveLayer.renderScope = {}, currentProgressiveLayer && currentProgressiveLayer.__progress > currentProgressiveLayer.__maxProgress) {
                        i = currentProgressiveLayer.__nextIdxNotProg - 1;
                        continue
                      }
                      layerProgress = currentProgressiveLayer.__progress, currentProgressiveLayer.__dirty || (frame = layerProgress), currentProgressiveLayer.__progress = frame + 1
                    }
                    elFrame === frame && this._doPaintEl(el, currentProgressiveLayer, !0, currentProgressiveLayer.renderScope)
                  } else this._doPaintEl(el, currentLayer, paintAll, scope);
                  el.__dirty = !1
                }
              }
              currentProgressiveLayer && flushProgressiveLayer(currentProgressiveLayer), ctx && ctx.restore(), this._furtherProgressive = !1, util.each(this._progressiveLayers, function (layer) {
                layer.__maxProgress >= layer.__progress && (this._furtherProgressive = !0)
              }, this)
            }, _doPaintEl: function (el, currentLayer, forcePaint, scope) {
              var ctx = currentLayer.ctx, m = el.transform;
              if ((currentLayer.__dirty || forcePaint) && !el.invisible && 0 !== el.style.opacity && (!m || m[0] || m[3]) && (!el.culling || !isDisplayableCulled(el, this._width, this._height))) {
                var clipPaths = el.__clipPaths;
                (scope.prevClipLayer !== currentLayer || isClipPathChanged(clipPaths, scope.prevElClipPaths)) && (scope.prevElClipPaths && (scope.prevClipLayer.ctx.restore(), scope.prevClipLayer = scope.prevElClipPaths = null, scope.prevEl = null), clipPaths && (ctx.save(), doClip(clipPaths, ctx), scope.prevClipLayer = currentLayer, scope.prevElClipPaths = clipPaths)), el.beforeBrush && el.beforeBrush(ctx), el.brush(ctx, scope.prevEl || null), scope.prevEl = el, el.afterBrush && el.afterBrush(ctx)
              }
            }, getLayer: function (zlevel) {
              if (this._singleCanvas)return this._layers[0];
              var layer = this._layers[zlevel];
              return layer || (layer = new Layer("zr_" + zlevel, this, this.dpr), layer.__builtin__ = !0, this._layerConfig[zlevel] && util.merge(layer, this._layerConfig[zlevel], !0), this.insertLayer(zlevel, layer), layer.initContext()), layer
            }, insertLayer: function (zlevel, layer) {
              var layersMap = this._layers, zlevelList = this._zlevelList, len = zlevelList.length, prevLayer = null,
                i = -1, domRoot = this._domRoot;
              if (layersMap[zlevel])return void log("ZLevel " + zlevel + " has been used already");
              if (!isLayerValid(layer))return void log("Layer of zlevel " + zlevel + " is not valid");
              if (len > 0 && zlevel > zlevelList[0]) {
                for (i = 0; i < len - 1 && !(zlevelList[i] < zlevel && zlevelList[i + 1] > zlevel); i++);
                prevLayer = layersMap[zlevelList[i]]
              }
              if (zlevelList.splice(i + 1, 0, zlevel), layersMap[zlevel] = layer, !layer.virtual)if (prevLayer) {
                var prevDom = prevLayer.dom;
                prevDom.nextSibling ? domRoot.insertBefore(layer.dom, prevDom.nextSibling) : domRoot.appendChild(layer.dom)
              } else domRoot.firstChild ? domRoot.insertBefore(layer.dom, domRoot.firstChild) : domRoot.appendChild(layer.dom)
            }, eachLayer: function (cb, context) {
              var z, i, zlevelList = this._zlevelList;
              for (i = 0; i < zlevelList.length; i++)z = zlevelList[i], cb.call(context, this._layers[z], z)
            }, eachBuiltinLayer: function (cb, context) {
              var layer, z, i, zlevelList = this._zlevelList;
              for (i = 0; i < zlevelList.length; i++)z = zlevelList[i], layer = this._layers[z], layer.__builtin__ && cb.call(context, layer, z)
            }, eachOtherLayer: function (cb, context) {
              var layer, z, i, zlevelList = this._zlevelList;
              for (i = 0; i < zlevelList.length; i++)z = zlevelList[i], layer = this._layers[z], layer.__builtin__ || cb.call(context, layer, z)
            }, getLayers: function () {
              return this._layers
            }, _updateLayerStatus: function (list) {
              var layers = this._layers, progressiveLayers = this._progressiveLayers, elCountsLastFrame = {},
                progressiveElCountsLastFrame = {};
              this.eachBuiltinLayer(function (layer, z) {
                elCountsLastFrame[z] = layer.elCount, layer.elCount = 0, layer.__dirty = !1
              }), util.each(progressiveLayers, function (layer, idx) {
                progressiveElCountsLastFrame[idx] = layer.elCount, layer.elCount = 0, layer.__dirty = !1
              });
              for (var currentProgressiveLayer, lastProgressiveKey, progressiveLayerCount = 0, frameCount = 0, i = 0, l = list.length; i < l; i++) {
                var el = list[i], zlevel = this._singleCanvas ? 0 : el.zlevel, layer = layers[zlevel],
                  elProgress = el.progressive;
                if (layer && (layer.elCount++, layer.__dirty = layer.__dirty || el.__dirty), elProgress >= 0) {
                  lastProgressiveKey !== elProgress && (lastProgressiveKey = elProgress, frameCount++);
                  var elFrame = el.__frame = frameCount - 1;
                  if (!currentProgressiveLayer) {
                    var idx = Math.min(progressiveLayerCount, MAX_PROGRESSIVE_LAYER_NUMBER - 1);
                    currentProgressiveLayer = progressiveLayers[idx], currentProgressiveLayer || (currentProgressiveLayer = progressiveLayers[idx] = new Layer("progressive", this, this.dpr), currentProgressiveLayer.initContext()), currentProgressiveLayer.__maxProgress = 0
                  }
                  currentProgressiveLayer.__dirty = currentProgressiveLayer.__dirty || el.__dirty, currentProgressiveLayer.elCount++, currentProgressiveLayer.__maxProgress = Math.max(currentProgressiveLayer.__maxProgress, elFrame), currentProgressiveLayer.__maxProgress >= currentProgressiveLayer.__progress && (layer.__dirty = !0)
                } else el.__frame = -1, currentProgressiveLayer && (currentProgressiveLayer.__nextIdxNotProg = i, progressiveLayerCount++, currentProgressiveLayer = null)
              }
              currentProgressiveLayer && (progressiveLayerCount++, currentProgressiveLayer.__nextIdxNotProg = i), this.eachBuiltinLayer(function (layer, z) {
                elCountsLastFrame[z] !== layer.elCount && (layer.__dirty = !0)
              }), progressiveLayers.length = Math.min(progressiveLayerCount, MAX_PROGRESSIVE_LAYER_NUMBER), util.each(progressiveLayers, function (layer, idx) {
                progressiveElCountsLastFrame[idx] !== layer.elCount && (el.__dirty = !0), layer.__dirty && (layer.__progress = 0)
              })
            }, clear: function () {
              return this.eachBuiltinLayer(this._clearLayer), this
            }, _clearLayer: function (layer) {
              layer.clear()
            }, configLayer: function (zlevel, config) {
              if (config) {
                var layerConfig = this._layerConfig;
                layerConfig[zlevel] ? util.merge(layerConfig[zlevel], config, !0) : layerConfig[zlevel] = config;
                var layer = this._layers[zlevel];
                layer && util.merge(layer, layerConfig[zlevel], !0)
              }
            }, delLayer: function (zlevel) {
              var layers = this._layers, zlevelList = this._zlevelList, layer = layers[zlevel];
              layer && (layer.dom.parentNode.removeChild(layer.dom), delete layers[zlevel], zlevelList.splice(util.indexOf(zlevelList, zlevel), 1));
            }, resize: function (width, height) {
              var domRoot = this._domRoot;
              domRoot.style.display = "none";
              var opts = this._opts;
              if (null != width && (opts.width = width), null != height && (opts.height = height), width = this._getSize(0), height = this._getSize(1), domRoot.style.display = "", this._width != width || height != this._height) {
                domRoot.style.width = width + "px", domRoot.style.height = height + "px";
                for (var id in this._layers)this._layers.hasOwnProperty(id) && this._layers[id].resize(width, height);
                util.each(this._progressiveLayers, function (layer) {
                  layer.resize(width, height)
                }), this.refresh(!0)
              }
              return this._width = width, this._height = height, this
            }, clearLayer: function (zlevel) {
              var layer = this._layers[zlevel];
              layer && layer.clear()
            }, dispose: function () {
              this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
            }, getRenderedCanvas: function (opts) {
              if (opts = opts || {}, this._singleCanvas)return this._layers[0].dom;
              var imageLayer = new Layer("image", this, opts.pixelRatio || this.dpr);
              imageLayer.initContext(), imageLayer.clearColor = opts.backgroundColor, imageLayer.clear();
              for (var displayList = this.storage.getDisplayList(!0), scope = {}, i = 0; i < displayList.length; i++) {
                var el = displayList[i];
                this._doPaintEl(el, imageLayer, !0, scope)
              }
              return imageLayer.dom
            }, getWidth: function () {
              return this._width
            }, getHeight: function () {
              return this._height
            }, _getSize: function (whIdx) {
              var opts = this._opts, wh = ["width", "height"][whIdx], cwh = ["clientWidth", "clientHeight"][whIdx],
                plt = ["paddingLeft", "paddingTop"][whIdx], prb = ["paddingRight", "paddingBottom"][whIdx];
              if (null != opts[wh] && "auto" !== opts[wh])return parseFloat(opts[wh]);
              var root = this.root, stl = document.defaultView.getComputedStyle(root);
              return (root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0) | 0
            }, pathToImage: function (path, dpr) {
              dpr = dpr || this.dpr;
              var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"),
                rect = path.getBoundingRect(), style = path.style, shadowBlurSize = style.shadowBlur,
                shadowOffsetX = style.shadowOffsetX, shadowOffsetY = style.shadowOffsetY,
                lineWidth = style.hasStroke() ? style.lineWidth : 0,
                leftMargin = Math.max(lineWidth / 2, -shadowOffsetX + shadowBlurSize),
                rightMargin = Math.max(lineWidth / 2, shadowOffsetX + shadowBlurSize),
                topMargin = Math.max(lineWidth / 2, -shadowOffsetY + shadowBlurSize),
                bottomMargin = Math.max(lineWidth / 2, shadowOffsetY + shadowBlurSize),
                width = rect.width + leftMargin + rightMargin, height = rect.height + topMargin + bottomMargin;
              canvas.width = width * dpr, canvas.height = height * dpr, ctx.scale(dpr, dpr), ctx.clearRect(0, 0, width, height), ctx.dpr = dpr;
              var pathTransform = {position: path.position, rotation: path.rotation, scale: path.scale};
              path.position = [leftMargin - rect.x, topMargin - rect.y], path.rotation = 0, path.scale = [1, 1], path.updateTransform(), path && path.brush(ctx);
              var ImageShape = require("./graphic/Image"),
                imgShape = new ImageShape({style: {x: 0, y: 0, image: canvas}});
              return null != pathTransform.position && (imgShape.position = path.position = pathTransform.position), null != pathTransform.rotation && (imgShape.rotation = path.rotation = pathTransform.rotation), null != pathTransform.scale && (imgShape.scale = path.scale = pathTransform.scale), imgShape
            }
          }, Painter
        }),define("echarts/chart/helper/createListFromArray", ["require", "../../data/List", "../../data/helper/completeDimensions", "zrender/core/util", "../../util/model", "../../CoordinateSystem"], function (require) {
          function firstDataNotNull(data) {
            for (var i = 0; i < data.length && null == data[i];)i++;
            return data[i]
          }
          
          function ifNeedCompleteOrdinalData(data) {
            var sampleItem = firstDataNotNull(data);
            return null != sampleItem && !zrUtil.isArray(getDataItemValue(sampleItem))
          }
          
          function createListFromArray(data, seriesModel, ecModel) {
            if (data = data || [], !zrUtil.isArray(data))throw new Error("Invalid data.");
            var coordSysName = seriesModel.get("coordinateSystem"), creator = creators[coordSysName],
              registeredCoordSys = CoordinateSystem.get(coordSysName),
              axesInfo = creator && creator(data, seriesModel, ecModel), dimensions = axesInfo && axesInfo.dimensions;
            dimensions || (dimensions = registeredCoordSys && (registeredCoordSys.getDimensionsInfo ? registeredCoordSys.getDimensionsInfo() : registeredCoordSys.dimensions.slice()) || ["x", "y"], dimensions = completeDimensions(dimensions, data, {defaultNames: dimensions.concat(["value"])}));
            var categoryIndex = axesInfo ? axesInfo.categoryIndex : -1, list = new List(dimensions, seriesModel),
              nameList = createNameList(axesInfo, data), categories = {},
              dimValueGetter = categoryIndex >= 0 && ifNeedCompleteOrdinalData(data) ? function (itemOpt, dimName, dataIndex, dimIndex) {
                return modelUtil.isDataItemOption(itemOpt) && (list.hasItemOption = !0), dimIndex === categoryIndex ? dataIndex : converDataValue(getDataItemValue(itemOpt), dimensions[dimIndex])
              } : function (itemOpt, dimName, dataIndex, dimIndex) {
                var value = getDataItemValue(itemOpt),
                  val = converDataValue(value && value[dimIndex], dimensions[dimIndex]);
                modelUtil.isDataItemOption(itemOpt) && (list.hasItemOption = !0);
                var categoryAxesModels = axesInfo && axesInfo.categoryAxesModels;
                return categoryAxesModels && categoryAxesModels[dimName] && "string" == typeof val && (categories[dimName] = categories[dimName] || categoryAxesModels[dimName].getCategories(), val = zrUtil.indexOf(categories[dimName], val), val < 0 && !isNaN(val) && (val = +val)), val
              };
            return list.hasItemOption = !1, list.initData(data, nameList, dimValueGetter), list
          }
          
          function isStackable(axisType) {
            return "category" !== axisType && "time" !== axisType
          }
          
          function getDimTypeByAxis(axisType) {
            return "category" === axisType ? "ordinal" : "time" === axisType ? "time" : "float"
          }
          
          function createNameList(result, data) {
            var categoryAxisModel, nameList = [], categoryDim = result && result.dimensions[result.categoryIndex];
            if (categoryDim && (categoryAxisModel = result.categoryAxesModels[categoryDim.name]), categoryAxisModel) {
              var categories = categoryAxisModel.getCategories();
              if (categories) {
                var dataLen = data.length;
                if (zrUtil.isArray(data[0]) && data[0].length > 1) {
                  nameList = [];
                  for (var i = 0; i < dataLen; i++)nameList[i] = categories[data[i][result.categoryIndex || 0]]
                } else nameList = categories.slice(0)
              }
            }
            return nameList
          }
          
          var List = require("../../data/List"), completeDimensions = require("../../data/helper/completeDimensions"),
            zrUtil = require("zrender/core/util"), modelUtil = require("../../util/model"),
            CoordinateSystem = require("../../CoordinateSystem"), getDataItemValue = modelUtil.getDataItemValue,
            converDataValue = modelUtil.converDataValue, creators = {
              cartesian2d: function (data, seriesModel, ecModel) {
                var axesModels = zrUtil.map(["xAxis", "yAxis"], function (name) {
                  return ecModel.queryComponents({
                    mainType: name,
                    index: seriesModel.get(name + "Index"),
                    id: seriesModel.get(name + "Id")
                  })[0]
                }), xAxisModel = axesModels[0], yAxisModel = axesModels[1];
                if (!xAxisModel)throw new Error('xAxis "' + zrUtil.retrieve(seriesModel.get("xAxisIndex"), seriesModel.get("xAxisId"), 0) + '" not found');
                if (!yAxisModel)throw new Error('yAxis "' + zrUtil.retrieve(seriesModel.get("xAxisIndex"), seriesModel.get("yAxisId"), 0) + '" not found');
                var xAxisType = xAxisModel.get("type"), yAxisType = yAxisModel.get("type"), dimensions = [{
                    name: "x",
                    type: getDimTypeByAxis(xAxisType),
                    stackable: isStackable(xAxisType)
                  }, {name: "y", type: getDimTypeByAxis(yAxisType), stackable: isStackable(yAxisType)}],
                  isXAxisCateogry = "category" === xAxisType, isYAxisCategory = "category" === yAxisType;
                completeDimensions(dimensions, data, {defaultNames: ["x", "y", "z"]});
                var categoryAxesModels = {};
                return isXAxisCateogry && (categoryAxesModels.x = xAxisModel), isYAxisCategory && (categoryAxesModels.y = yAxisModel), {
                  dimensions: dimensions,
                  categoryIndex: isXAxisCateogry ? 0 : isYAxisCategory ? 1 : -1,
                  categoryAxesModels: categoryAxesModels
                }
              }, singleAxis: function (data, seriesModel, ecModel) {
                var singleAxisModel = ecModel.queryComponents({
                  mainType: "singleAxis",
                  index: seriesModel.get("singleAxisIndex"),
                  id: seriesModel.get("singleAxisId")
                })[0];
                if (!singleAxisModel)throw new Error("singleAxis should be specified.");
                var singleAxisType = singleAxisModel.get("type"), isCategory = "category" === singleAxisType,
                  dimensions = [{
                    name: "single",
                    type: getDimTypeByAxis(singleAxisType),
                    stackable: isStackable(singleAxisType)
                  }];
                completeDimensions(dimensions, data);
                var categoryAxesModels = {};
                return isCategory && (categoryAxesModels.single = singleAxisModel), {
                  dimensions: dimensions,
                  categoryIndex: isCategory ? 0 : -1,
                  categoryAxesModels: categoryAxesModels
                }
              }, polar: function (data, seriesModel, ecModel) {
                var polarModel = ecModel.queryComponents({
                    mainType: "polar",
                    index: seriesModel.get("polarIndex"),
                    id: seriesModel.get("polarId")
                  })[0], angleAxisModel = polarModel.findAxisModel("angleAxis"),
                  radiusAxisModel = polarModel.findAxisModel("radiusAxis");
                if (!angleAxisModel)throw new Error("angleAxis option not found");
                if (!radiusAxisModel)throw new Error("radiusAxis option not found");
                var radiusAxisType = radiusAxisModel.get("type"), angleAxisType = angleAxisModel.get("type"),
                  dimensions = [{
                    name: "radius",
                    type: getDimTypeByAxis(radiusAxisType),
                    stackable: isStackable(radiusAxisType)
                  }, {name: "angle", type: getDimTypeByAxis(angleAxisType), stackable: isStackable(angleAxisType)}],
                  isAngleAxisCateogry = "category" === angleAxisType,
                  isRadiusAxisCateogry = "category" === radiusAxisType;
                completeDimensions(dimensions, data, {defaultNames: ["radius", "angle", "value"]});
                var categoryAxesModels = {};
                return isRadiusAxisCateogry && (categoryAxesModels.radius = radiusAxisModel), isAngleAxisCateogry && (categoryAxesModels.angle = angleAxisModel), {
                  dimensions: dimensions,
                  categoryIndex: isAngleAxisCateogry ? 1 : isRadiusAxisCateogry ? 0 : -1,
                  categoryAxesModels: categoryAxesModels
                }
              }, geo: function (data, seriesModel, ecModel) {
                return {dimensions: completeDimensions([{name: "lng"}, {name: "lat"}], data, {defaultNames: ["lng", "lat", "value"]})}
              }
            };
          return createListFromArray
        }),define("zrender/graphic/helper/smoothSpline", ["require", "../../core/vector"], function (require) {
          function interpolate(p0, p1, p2, p3, t, t2, t3) {
            var v0 = .5 * (p2 - p0), v1 = .5 * (p3 - p1);
            return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1
          }
          
          var vec2 = require("../../core/vector");
          return function (points, isLoop) {
            for (var len = points.length, ret = [], distance = 0, i = 1; i < len; i++)distance += vec2.distance(points[i - 1], points[i]);
            var segs = distance / 2;
            segs = segs < len ? len : segs;
            for (var i = 0; i < segs; i++) {
              var p0, p2, p3, pos = i / (segs - 1) * (isLoop ? len : len - 1), idx = Math.floor(pos), w = pos - idx,
                p1 = points[idx % len];
              isLoop ? (p0 = points[(idx - 1 + len) % len], p2 = points[(idx + 1) % len], p3 = points[(idx + 2) % len]) : (p0 = points[0 === idx ? idx : idx - 1], p2 = points[idx > len - 2 ? len - 1 : idx + 1], p3 = points[idx > len - 3 ? len - 1 : idx + 2]);
              var w2 = w * w, w3 = w * w2;
              ret.push([interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)])
            }
            return ret
          }
        }),define("zrender/graphic/helper/smoothBezier", ["require", "../../core/vector"], function (require) {
          var vec2 = require("../../core/vector"), v2Min = vec2.min, v2Max = vec2.max, v2Scale = vec2.scale,
            v2Distance = vec2.distance, v2Add = vec2.add;
          return function (points, smooth, isLoop, constraint) {
            var prevPoint, nextPoint, min, max, cps = [], v = [], v1 = [], v2 = [];
            if (constraint) {
              min = [1 / 0, 1 / 0], max = [-(1 / 0), -(1 / 0)];
              for (var i = 0, len = points.length; i < len; i++)v2Min(min, min, points[i]), v2Max(max, max, points[i]);
              v2Min(min, min, constraint[0]), v2Max(max, max, constraint[1])
            }
            for (var i = 0, len = points.length; i < len; i++) {
              var point = points[i];
              if (isLoop) prevPoint = points[i ? i - 1 : len - 1], nextPoint = points[(i + 1) % len]; else {
                if (0 === i || i === len - 1) {
                  cps.push(vec2.clone(points[i]));
                  continue
                }
                prevPoint = points[i - 1], nextPoint = points[i + 1]
              }
              vec2.sub(v, nextPoint, prevPoint), v2Scale(v, v, smooth);
              var d0 = v2Distance(point, prevPoint), d1 = v2Distance(point, nextPoint), sum = d0 + d1;
              0 !== sum && (d0 /= sum, d1 /= sum), v2Scale(v1, v, -d0), v2Scale(v2, v, d1);
              var cp0 = v2Add([], point, v1), cp1 = v2Add([], point, v2);
              constraint && (v2Max(cp0, cp0, min), v2Min(cp0, cp0, max), v2Max(cp1, cp1, min), v2Min(cp1, cp1, max)), cps.push(cp0), cps.push(cp1)
            }
            return isLoop && cps.push(cps.shift()), cps
          }
        }),define("zrender/mixin/Draggable", ["require"], function (require) {
          function Draggable() {
            this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this)
          }
          
          function param(target, e) {
            return {target: target, topTarget: e && e.topTarget}
          }
          
          return Draggable.prototype = {
            constructor: Draggable, _dragStart: function (e) {
              var draggingTarget = e.target;
              draggingTarget && draggingTarget.draggable && (this._draggingTarget = draggingTarget, draggingTarget.dragging = !0, this._x = e.offsetX, this._y = e.offsetY, this.dispatchToElement(param(draggingTarget, e), "dragstart", e.event))
            }, _drag: function (e) {
              var draggingTarget = this._draggingTarget;
              if (draggingTarget) {
                var x = e.offsetX, y = e.offsetY, dx = x - this._x, dy = y - this._y;
                this._x = x, this._y = y, draggingTarget.drift(dx, dy, e), this.dispatchToElement(param(draggingTarget, e), "drag", e.event);
                var dropTarget = this.findHover(x, y, draggingTarget).target, lastDropTarget = this._dropTarget;
                this._dropTarget = dropTarget, draggingTarget !== dropTarget && (lastDropTarget && dropTarget !== lastDropTarget && this.dispatchToElement(param(lastDropTarget, e), "dragleave", e.event), dropTarget && dropTarget !== lastDropTarget && this.dispatchToElement(param(dropTarget, e), "dragenter", e.event))
              }
            }, _dragEnd: function (e) {
              var draggingTarget = this._draggingTarget;
              draggingTarget && (draggingTarget.dragging = !1), this.dispatchToElement(param(draggingTarget, e), "dragend", e.event), this._dropTarget && this.dispatchToElement(param(this._dropTarget, e), "drop", e.event), this._draggingTarget = null, this._dropTarget = null
            }
          }, Draggable
        }),define("echarts/data/helper/completeDimensions", ["require", "zrender/core/util"], function (require) {
          function completeDimensions(dimensions, data, opt) {
            if (!data)return dimensions;
            opt = opt || {};
            var dimCount = opt.dimCount;
            if (null == dimCount) {
              var value0 = retrieveValue(data[0]);
              dimCount = zrUtil.isArray(value0) && value0.length || 1
            }
            for (var defaultNames = opt.defaultNames || [], extraPrefix = opt.extraPrefix || "extra", i = 0; i < dimCount; i++)if (!dimensions[i]) {
              var name = defaultNames[i] || extraPrefix + (i - defaultNames.length);
              dimensions[i] = guessOrdinal(data, i) ? {type: "ordinal", name: name} : name
            }
            return dimensions
          }
          
          function retrieveValue(o) {
            return zrUtil.isArray(o) ? o : zrUtil.isObject(o) ? o.value : o
          }
          
          var zrUtil = require("zrender/core/util"),
            guessOrdinal = completeDimensions.guessOrdinal = function (data, dimIndex) {
              for (var i = 0, len = data.length; i < len; i++) {
                var value = retrieveValue(data[i]);
                if (!zrUtil.isArray(value))return !1;
                var value = value[dimIndex];
                if (null != value && isFinite(value))return !1;
                if (zrUtil.isString(value) && "-" !== value)return !0
              }
              return !1
            };
          return completeDimensions
        }),define("echarts/data/DataDiffer", ["require"], function (require) {
          function defaultKeyGetter(item) {
            return item
          }
          
          function DataDiffer(oldArr, newArr, oldKeyGetter, newKeyGetter) {
            this._old = oldArr, this._new = newArr, this._oldKeyGetter = oldKeyGetter || defaultKeyGetter, this._newKeyGetter = newKeyGetter || defaultKeyGetter
          }
          
          function initIndexMap(arr, map, keyArr, keyGetter) {
            for (var i = 0; i < arr.length; i++) {
              var key = keyGetter(arr[i], i), existence = map[key];
              null == existence ? (keyArr.push(key), map[key] = i) : (existence.length || (map[key] = existence = [existence]), existence.push(i))
            }
          }
          
          return DataDiffer.prototype = {
            constructor: DataDiffer, add: function (func) {
              return this._add = func, this
            }, update: function (func) {
              return this._update = func, this
            }, remove: function (func) {
              return this._remove = func, this
            }, execute: function () {
              var i, oldArr = this._old, newArr = this._new, oldKeyGetter = this._oldKeyGetter,
                newKeyGetter = this._newKeyGetter, oldDataIndexMap = {}, newDataIndexMap = {}, oldDataKeyArr = [],
                newDataKeyArr = [];
              for (initIndexMap(oldArr, oldDataIndexMap, oldDataKeyArr, oldKeyGetter), initIndexMap(newArr, newDataIndexMap, newDataKeyArr, newKeyGetter), i = 0; i < oldArr.length; i++) {
                var key = oldDataKeyArr[i], idx = newDataIndexMap[key];
                if (null != idx) {
                  var len = idx.length;
                  len ? (1 === len && (newDataIndexMap[key] = null), idx = idx.unshift()) : newDataIndexMap[key] = null, this._update && this._update(idx, i)
                } else this._remove && this._remove(i)
              }
              for (var i = 0; i < newDataKeyArr.length; i++) {
                var key = newDataKeyArr[i];
                if (newDataIndexMap.hasOwnProperty(key)) {
                  var idx = newDataIndexMap[key];
                  if (null == idx)continue;
                  if (idx.length)for (var j = 0, len = idx.length; j < len; j++)this._add && this._add(idx[j]); else this._add && this._add(idx)
                }
              }
            }
          }, DataDiffer
        }),define("zrender/graphic/helper/roundRect", ["require"], function (require) {
          return {
            buildPath: function (ctx, shape) {
              var r1, r2, r3, r4, x = shape.x, y = shape.y, width = shape.width, height = shape.height, r = shape.r;
              width < 0 && (x += width, width = -width), height < 0 && (y += height, height = -height), "number" == typeof r ? r1 = r2 = r3 = r4 = r : r instanceof Array ? 1 === r.length ? r1 = r2 = r3 = r4 = r[0] : 2 === r.length ? (r1 = r3 = r[0], r2 = r4 = r[1]) : 3 === r.length ? (r1 = r[0], r2 = r4 = r[1], r3 = r[2]) : (r1 = r[0], r2 = r[1], r3 = r[2], r4 = r[3]) : r1 = r2 = r3 = r4 = 0;
              var total;
              r1 + r2 > width && (total = r1 + r2, r1 *= width / total, r2 *= width / total), r3 + r4 > width && (total = r3 + r4, r3 *= width / total, r4 *= width / total), r2 + r3 > height && (total = r2 + r3, r2 *= height / total, r3 *= height / total), r1 + r4 > height && (total = r1 + r4, r1 *= height / total, r4 *= height / total), ctx.moveTo(x + r1, y), ctx.lineTo(x + width - r2, y), 0 !== r2 && ctx.quadraticCurveTo(x + width, y, x + width, y + r2), ctx.lineTo(x + width, y + height - r3), 0 !== r3 && ctx.quadraticCurveTo(x + width, y + height, x + width - r3, y + height), ctx.lineTo(x + r4, y + height), 0 !== r4 && ctx.quadraticCurveTo(x, y + height, x, y + height - r4), ctx.lineTo(x, y + r1), 0 !== r1 && ctx.quadraticCurveTo(x, y, x + r1, y)
            }
          }
        }),define("zrender/core/event", ["require", "../mixin/Eventful", "./env"], function (require) {
          function getBoundingClientRect(el) {
            return el.getBoundingClientRect ? el.getBoundingClientRect() : {left: 0, top: 0}
          }
          
          function clientToLocal(el, e, out, calculate) {
            return out = out || {}, calculate || !env.canvasSupported ? defaultGetZrXY(el, e, out) : env.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (out.zrX = e.layerX, out.zrY = e.layerY) : null != e.offsetX ? (out.zrX = e.offsetX, out.zrY = e.offsetY) : defaultGetZrXY(el, e, out), out
          }
          
          function defaultGetZrXY(el, e, out) {
            var box = getBoundingClientRect(el);
            out.zrX = e.clientX - box.left, out.zrY = e.clientY - box.top
          }
          
          function normalizeEvent(el, e, calculate) {
            if (e = e || window.event, null != e.zrX)return e;
            var eventType = e.type, isTouch = eventType && eventType.indexOf("touch") >= 0;
            if (isTouch) {
              var touch = "touchend" != eventType ? e.targetTouches[0] : e.changedTouches[0];
              touch && clientToLocal(el, touch, e, calculate)
            } else clientToLocal(el, e, e, calculate), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
            return e
          }
          
          function addEventListener(el, name, handler) {
            isDomLevel2 ? el.addEventListener(name, handler) : el.attachEvent("on" + name, handler)
          }
          
          function removeEventListener(el, name, handler) {
            isDomLevel2 ? el.removeEventListener(name, handler) : el.detachEvent("on" + name, handler)
          }
          
          var Eventful = require("../mixin/Eventful"), env = require("./env"),
            isDomLevel2 = "undefined" != typeof window && !!window.addEventListener, stop = isDomLevel2 ? function (e) {
              e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0
            } : function (e) {
              e.returnValue = !1, e.cancelBubble = !0
            };
          return {
            clientToLocal: clientToLocal,
            normalizeEvent: normalizeEvent,
            addEventListener: addEventListener,
            removeEventListener: removeEventListener,
            stop: stop,
            Dispatcher: Eventful
          }
        }),define("zrender/animation/requestAnimationFrame", ["require"], function (require) {
          return "undefined" != typeof window && (window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (func) {
              setTimeout(func, 16)
            }
        }),define("echarts/chart/bar/barItemStyle", ["require", "../../model/mixin/makeStyleMapper"], function (require) {
          var _getBarItemStyle = require("../../model/mixin/makeStyleMapper")([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["stroke", "barBorderColor"], ["lineWidth", "barBorderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]);
          return {
            getBarItemStyle: function (excludes) {
              var style = _getBarItemStyle.call(this, excludes);
              if (this.getBorderLineDash) {
                var lineDash = this.getBorderLineDash();
                lineDash && (style.lineDash = lineDash)
              }
              return style
            }
          }
        }),define("echarts/chart/bar/helper", ["require", "zrender/core/util", "../../util/graphic"], function (require) {
          function setLabel(style, model, color, labelText, labelPositionOutside) {
            graphic.setText(style, model, color), style.text = labelText, "outside" === style.textPosition && (style.textPosition = labelPositionOutside)
          }
          
          var zrUtil = require("zrender/core/util"), graphic = require("../../util/graphic"), helper = {};
          return helper.setLabel = function (normalStyle, hoverStyle, itemModel, color, seriesModel, dataIndex, labelPositionOutside) {
            var labelModel = itemModel.getModel("label.normal"), hoverLabelModel = itemModel.getModel("label.emphasis");
            labelModel.get("show") ? setLabel(normalStyle, labelModel, color, zrUtil.retrieve(seriesModel.getFormattedLabel(dataIndex, "normal"), seriesModel.getRawValue(dataIndex)), labelPositionOutside) : normalStyle.text = "", hoverLabelModel.get("show") ? setLabel(hoverStyle, hoverLabelModel, color, zrUtil.retrieve(seriesModel.getFormattedLabel(dataIndex, "emphasis"), seriesModel.getRawValue(dataIndex)), labelPositionOutside) : hoverStyle.text = ""
          }, helper
        }),define("zrender/core/GestureMgr", ["require", "./event"], function (require) {
          function dist(pointPair) {
            var dx = pointPair[1][0] - pointPair[0][0], dy = pointPair[1][1] - pointPair[0][1];
            return Math.sqrt(dx * dx + dy * dy)
          }
          
          function center(pointPair) {
            return [(pointPair[0][0] + pointPair[1][0]) / 2, (pointPair[0][1] + pointPair[1][1]) / 2]
          }
          
          var eventUtil = require("./event"), GestureMgr = function () {
            this._track = []
          };
          GestureMgr.prototype = {
            constructor: GestureMgr, recognize: function (event, target, root) {
              return this._doTrack(event, target, root), this._recognize(event)
            }, clear: function () {
              return this._track.length = 0, this
            }, _doTrack: function (event, target, root) {
              var touches = event.touches;
              if (touches) {
                for (var trackItem = {
                  points: [],
                  touches: [],
                  target: target,
                  event: event
                }, i = 0, len = touches.length; i < len; i++) {
                  var touch = touches[i], pos = eventUtil.clientToLocal(root, touch, {});
                  trackItem.points.push([pos.zrX, pos.zrY]), trackItem.touches.push(touch)
                }
                this._track.push(trackItem)
              }
            }, _recognize: function (event) {
              for (var eventName in recognizers)if (recognizers.hasOwnProperty(eventName)) {
                var gestureInfo = recognizers[eventName](this._track, event);
                if (gestureInfo)return gestureInfo
              }
            }
          };
          var recognizers = {
            pinch: function (track, event) {
              var trackLen = track.length;
              if (trackLen) {
                var pinchEnd = (track[trackLen - 1] || {}).points,
                  pinchPre = (track[trackLen - 2] || {}).points || pinchEnd;
                if (pinchPre && pinchPre.length > 1 && pinchEnd && pinchEnd.length > 1) {
                  var pinchScale = dist(pinchEnd) / dist(pinchPre);
                  !isFinite(pinchScale) && (pinchScale = 1), event.pinchScale = pinchScale;
                  var pinchCenter = center(pinchEnd);
                  return event.pinchX = pinchCenter[0], event.pinchY = pinchCenter[1], {
                    type: "pinch",
                    target: track[0].target,
                    event: event
                  }
                }
              }
            }
          };
          return GestureMgr
        }),define("zrender/Layer", ["require", "./core/util", "./config", "./graphic/Style", "./graphic/Pattern"], function (require) {
          function returnFalse() {
            return !1
          }
          
          function createDom(id, type, painter, dpr) {
            var newDom = document.createElement(type), width = painter.getWidth(), height = painter.getHeight(),
              newDomStyle = newDom.style;
            return newDomStyle.position = "absolute", newDomStyle.left = 0, newDomStyle.top = 0, newDomStyle.width = width + "px", newDomStyle.height = height + "px", newDom.width = width * dpr, newDom.height = height * dpr, newDom.setAttribute("data-zr-dom-id", id), newDom
          }
          
          var util = require("./core/util"), config = require("./config"), Style = require("./graphic/Style"),
            Pattern = require("./graphic/Pattern"), Layer = function (id, painter, dpr) {
              var dom;
              dpr = dpr || config.devicePixelRatio, "string" == typeof id ? dom = createDom(id, "canvas", painter, dpr) : util.isObject(id) && (dom = id, id = dom.id), this.id = id, this.dom = dom;
              var domStyle = dom.style;
              domStyle && (dom.onselectstart = returnFalse, domStyle["-webkit-user-select"] = "none", domStyle["user-select"] = "none", domStyle["-webkit-touch-callout"] = "none", domStyle["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", domStyle.padding = 0, domStyle.margin = 0, domStyle["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = painter, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = dpr
            };
          return Layer.prototype = {
            constructor: Layer, elCount: 0, __dirty: !0, initContext: function () {
              this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
            }, createBackBuffer: function () {
              var dpr = this.dpr;
              this.domBack = createDom("back-" + this.id, "canvas", this.painter, dpr), this.ctxBack = this.domBack.getContext("2d"), 1 != dpr && this.ctxBack.scale(dpr, dpr)
            }, resize: function (width, height) {
              var dpr = this.dpr, dom = this.dom, domStyle = dom.style, domBack = this.domBack;
              domStyle.width = width + "px", domStyle.height = height + "px", dom.width = width * dpr, dom.height = height * dpr, domBack && (domBack.width = width * dpr, domBack.height = height * dpr, 1 != dpr && this.ctxBack.scale(dpr, dpr))
            }, clear: function (clearAll) {
              var dom = this.dom, ctx = this.ctx, width = dom.width, height = dom.height, clearColor = this.clearColor,
                haveMotionBLur = this.motionBlur && !clearAll, lastFrameAlpha = this.lastFrameAlpha, dpr = this.dpr;
              if (haveMotionBLur && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(dom, 0, 0, width / dpr, height / dpr)), ctx.clearRect(0, 0, width, height), clearColor) {
                var clearColorGradientOrPattern;
                clearColor.colorStops ? (clearColorGradientOrPattern = clearColor.__canvasGradient || Style.getGradient(ctx, clearColor, {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height
                  }), clearColor.__canvasGradient = clearColorGradientOrPattern) : clearColor.image && (clearColorGradientOrPattern = Pattern.prototype.getCanvasPattern.call(clearColor, ctx)), ctx.save(), ctx.fillStyle = clearColorGradientOrPattern || clearColor, ctx.fillRect(0, 0, width, height), ctx.restore()
              }
              if (haveMotionBLur) {
                var domBack = this.domBack;
                ctx.save(), ctx.globalAlpha = lastFrameAlpha, ctx.drawImage(domBack, 0, 0, width, height), ctx.restore()
              }
            }
          }, Layer
        }),define("echarts/preprocessor/helper/compatStyle", ["require", "zrender/core/util"], function (require) {
          function compatItemStyle(opt) {
            var itemStyleOpt = opt && opt.itemStyle;
            itemStyleOpt && zrUtil.each(POSSIBLE_STYLES, function (styleName) {
              var normalItemStyleOpt = itemStyleOpt.normal, emphasisItemStyleOpt = itemStyleOpt.emphasis;
              normalItemStyleOpt && normalItemStyleOpt[styleName] && (opt[styleName] = opt[styleName] || {}, opt[styleName].normal ? zrUtil.merge(opt[styleName].normal, normalItemStyleOpt[styleName]) : opt[styleName].normal = normalItemStyleOpt[styleName], normalItemStyleOpt[styleName] = null), emphasisItemStyleOpt && emphasisItemStyleOpt[styleName] && (opt[styleName] = opt[styleName] || {}, opt[styleName].emphasis ? zrUtil.merge(opt[styleName].emphasis, emphasisItemStyleOpt[styleName]) : opt[styleName].emphasis = emphasisItemStyleOpt[styleName], emphasisItemStyleOpt[styleName] = null)
            })
          }
          
          var zrUtil = require("zrender/core/util"),
            POSSIBLE_STYLES = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
          return function (seriesOpt) {
            if (seriesOpt) {
              compatItemStyle(seriesOpt), compatItemStyle(seriesOpt.markPoint), compatItemStyle(seriesOpt.markLine);
              var data = seriesOpt.data;
              if (data) {
                for (var i = 0; i < data.length; i++)compatItemStyle(data[i]);
                var markPoint = seriesOpt.markPoint;
                if (markPoint && markPoint.data)for (var mpData = markPoint.data, i = 0; i < mpData.length; i++)compatItemStyle(mpData[i]);
                var markLine = seriesOpt.markLine;
                if (markLine && markLine.data)for (var mlData = markLine.data, i = 0; i < mlData.length; i++)zrUtil.isArray(mlData[i]) ? (compatItemStyle(mlData[i][0]), compatItemStyle(mlData[i][1])) : compatItemStyle(mlData[i])
              }
            }
          }
        }),define("echarts/util/symbol", ["require", "./graphic", "zrender/core/BoundingRect"], function (require) {
          var graphic = require("./graphic"), BoundingRect = require("zrender/core/BoundingRect"),
            Triangle = graphic.extendShape({
              type: "triangle",
              shape: {cx: 0, cy: 0, width: 0, height: 0},
              buildPath: function (path, shape) {
                var cx = shape.cx, cy = shape.cy, width = shape.width / 2, height = shape.height / 2;
                path.moveTo(cx, cy - height), path.lineTo(cx + width, cy + height), path.lineTo(cx - width, cy + height), path.closePath()
              }
            }), Diamond = graphic.extendShape({
              type: "diamond",
              shape: {cx: 0, cy: 0, width: 0, height: 0},
              buildPath: function (path, shape) {
                var cx = shape.cx, cy = shape.cy, width = shape.width / 2, height = shape.height / 2;
                path.moveTo(cx, cy - height), path.lineTo(cx + width, cy), path.lineTo(cx, cy + height), path.lineTo(cx - width, cy), path.closePath()
              }
            }), Pin = graphic.extendShape({
              type: "pin",
              shape: {x: 0, y: 0, width: 0, height: 0},
              buildPath: function (path, shape) {
                var x = shape.x, y = shape.y, w = shape.width / 5 * 3, h = Math.max(w, shape.height), r = w / 2,
                  dy = r * r / (h - r), cy = y - h + r + dy, angle = Math.asin(dy / r), dx = Math.cos(angle) * r,
                  tanX = Math.sin(angle), tanY = Math.cos(angle);
                path.arc(x, cy, r, Math.PI - angle, 2 * Math.PI + angle);
                var cpLen = .6 * r, cpLen2 = .7 * r;
                path.bezierCurveTo(x + dx - tanX * cpLen, cy + dy + tanY * cpLen, x, y - cpLen2, x, y), path.bezierCurveTo(x, y - cpLen2, x - dx + tanX * cpLen, cy + dy + tanY * cpLen, x - dx, cy + dy), path.closePath()
              }
            }), Arrow = graphic.extendShape({
              type: "arrow",
              shape: {x: 0, y: 0, width: 0, height: 0},
              buildPath: function (ctx, shape) {
                var height = shape.height, width = shape.width, x = shape.x, y = shape.y, dx = width / 3 * 2;
                ctx.moveTo(x, y), ctx.lineTo(x + dx, y + height), ctx.lineTo(x, y + height / 4 * 3), ctx.lineTo(x - dx, y + height), ctx.lineTo(x, y), ctx.closePath()
              }
            }), symbolCtors = {
              line: graphic.Line,
              rect: graphic.Rect,
              roundRect: graphic.Rect,
              square: graphic.Rect,
              circle: graphic.Circle,
              diamond: Diamond,
              pin: Pin,
              arrow: Arrow,
              triangle: Triangle
            }, symbolShapeMakers = {
              line: function (x, y, w, h, shape) {
                shape.x1 = x, shape.y1 = y + h / 2, shape.x2 = x + w, shape.y2 = y + h / 2
              }, rect: function (x, y, w, h, shape) {
                shape.x = x, shape.y = y, shape.width = w, shape.height = h
              }, roundRect: function (x, y, w, h, shape) {
                shape.x = x, shape.y = y, shape.width = w, shape.height = h, shape.r = Math.min(w, h) / 4
              }, square: function (x, y, w, h, shape) {
                var size = Math.min(w, h);
                shape.x = x, shape.y = y, shape.width = size, shape.height = size
              }, circle: function (x, y, w, h, shape) {
                shape.cx = x + w / 2, shape.cy = y + h / 2, shape.r = Math.min(w, h) / 2
              }, diamond: function (x, y, w, h, shape) {
                shape.cx = x + w / 2, shape.cy = y + h / 2, shape.width = w, shape.height = h
              }, pin: function (x, y, w, h, shape) {
                shape.x = x + w / 2, shape.y = y + h / 2, shape.width = w, shape.height = h
              }, arrow: function (x, y, w, h, shape) {
                shape.x = x + w / 2, shape.y = y + h / 2, shape.width = w, shape.height = h
              }, triangle: function (x, y, w, h, shape) {
                shape.cx = x + w / 2, shape.cy = y + h / 2, shape.width = w, shape.height = h
              }
            }, symbolBuildProxies = {};
          for (var name in symbolCtors)symbolCtors.hasOwnProperty(name) && (symbolBuildProxies[name] = new symbolCtors[name]);
          var _Symbol2 = graphic.extendShape({
            type: "symbol",
            shape: {symbolType: "", x: 0, y: 0, width: 0, height: 0},
            beforeBrush: function () {
              var style = this.style, shape = this.shape;
              "pin" === shape.symbolType && "inside" === style.textPosition && (style.textPosition = ["50%", "40%"], style.textAlign = "center", style.textVerticalAlign = "middle")
            },
            buildPath: function (ctx, shape, inBundle) {
              var symbolType = shape.symbolType, proxySymbol = symbolBuildProxies[symbolType];
              "none" !== shape.symbolType && (proxySymbol || (symbolType = "rect", proxySymbol = symbolBuildProxies[symbolType]), symbolShapeMakers[symbolType](shape.x, shape.y, shape.width, shape.height, proxySymbol.shape), proxySymbol.buildPath(ctx, proxySymbol.shape, inBundle))
            }
          }), symbolPathSetColor = function (color) {
            if ("image" !== this.type) {
              var symbolStyle = this.style, symbolShape = this.shape;
              symbolShape && "line" === symbolShape.symbolType ? symbolStyle.stroke = color : this.__isEmptyBrush ? (symbolStyle.stroke = color, symbolStyle.fill = "#fff") : (symbolStyle.fill && (symbolStyle.fill = color), symbolStyle.stroke && (symbolStyle.stroke = color)), this.dirty(!1)
            }
          }, symbolUtil = {
            createSymbol: function (symbolType, x, y, w, h, color) {
              var isEmpty = 0 === symbolType.indexOf("empty");
              isEmpty && (symbolType = symbolType.substr(5, 1).toLowerCase() + symbolType.substr(6));
              var symbolPath;
              return symbolPath = 0 === symbolType.indexOf("image://") ? new graphic.Image({
                style: {
                  image: symbolType.slice(8),
                  x: x,
                  y: y,
                  width: w,
                  height: h
                }
              }) : 0 === symbolType.indexOf("path://") ? graphic.makePath(symbolType.slice(7), {}, new BoundingRect(x, y, w, h)) : new _Symbol2({
                shape: {
                  symbolType: symbolType,
                  x: x,
                  y: y,
                  width: w,
                  height: h
                }
              }), symbolPath.__isEmptyBrush = isEmpty, symbolPath.setColor = symbolPathSetColor, symbolPath.setColor(color), symbolPath
            }
          };
          return symbolUtil
        }),define("echarts/chart/helper/SymbolDraw", ["require", "../../util/graphic", "./Symbol"], function (require) {
          function SymbolDraw(symbolCtor) {
            this.group = new graphic.Group, this._symbolCtor = symbolCtor || _Symbol3
          }
          
          function symbolNeedsDraw(data, idx, isIgnore) {
            var point = data.getItemLayout(idx);
            return point && !isNaN(point[0]) && !isNaN(point[1]) && !(isIgnore && isIgnore(idx)) && "none" !== data.getItemVisual(idx, "symbol")
          }
          
          var graphic = require("../../util/graphic"), _Symbol3 = require("./Symbol"),
            symbolDrawProto = SymbolDraw.prototype;
          return symbolDrawProto.updateData = function (data, isIgnore) {
            var group = this.group, seriesModel = data.hostModel, oldData = this._data, SymbolCtor = this._symbolCtor,
              seriesScope = {
                itemStyle: seriesModel.getModel("itemStyle.normal").getItemStyle(["color"]),
                hoverItemStyle: seriesModel.getModel("itemStyle.emphasis").getItemStyle(),
                symbolRotate: seriesModel.get("symbolRotate"),
                symbolOffset: seriesModel.get("symbolOffset"),
                hoverAnimation: seriesModel.get("hoverAnimation"),
                labelModel: seriesModel.getModel("label.normal"),
                hoverLabelModel: seriesModel.getModel("label.emphasis")
              };
            data.diff(oldData).add(function (newIdx) {
              var point = data.getItemLayout(newIdx);
              if (symbolNeedsDraw(data, newIdx, isIgnore)) {
                var symbolEl = new SymbolCtor(data, newIdx, seriesScope);
                symbolEl.attr("position", point), data.setItemGraphicEl(newIdx, symbolEl), group.add(symbolEl)
              }
            }).update(function (newIdx, oldIdx) {
              var symbolEl = oldData.getItemGraphicEl(oldIdx), point = data.getItemLayout(newIdx);
              return symbolNeedsDraw(data, newIdx, isIgnore) ? (symbolEl ? (symbolEl.updateData(data, newIdx, seriesScope), graphic.updateProps(symbolEl, {position: point}, seriesModel)) : (symbolEl = new SymbolCtor(data, newIdx), symbolEl.attr("position", point)), group.add(symbolEl), void data.setItemGraphicEl(newIdx, symbolEl)) : void group.remove(symbolEl)
            }).remove(function (oldIdx) {
              var el = oldData.getItemGraphicEl(oldIdx);
              el && el.fadeOut(function () {
                group.remove(el)
              })
            }).execute(), this._data = data
          }, symbolDrawProto.updateLayout = function () {
            var data = this._data;
            data && data.eachItemGraphicEl(function (el, idx) {
              var point = data.getItemLayout(idx);
              el.attr("position", point)
            })
          }, symbolDrawProto.remove = function (enableAnimation) {
            var group = this.group, data = this._data;
            data && (enableAnimation ? data.eachItemGraphicEl(function (el) {
              el.fadeOut(function () {
                group.remove(el)
              })
            }) : group.removeAll())
          }, SymbolDraw
        }),define("echarts/component/axis/CartesianAxisView", ["require", "zrender/core/util", "../../util/graphic", "./AxisBuilder", "./AxisView", "./cartesianAxisHelper"], function (require) {
          var zrUtil = require("zrender/core/util"), graphic = require("../../util/graphic"),
            AxisBuilder = require("./AxisBuilder"), AxisView = require("./AxisView"),
            cartesianAxisHelper = require("./cartesianAxisHelper"), ifIgnoreOnTick = AxisBuilder.ifIgnoreOnTick,
            getInterval = AxisBuilder.getInterval, axisBuilderAttrs = ["axisLine", "axisLabel", "axisTick", "axisName"],
            selfBuilderAttrs = ["splitArea", "splitLine"], CartesianAxisView = AxisView.extend({
              type: "cartesianAxis",
              axisPointerClass: "CartesianAxisPointer",
              render: function (axisModel, ecModel, api, payload) {
                this.group.removeAll();
                var oldAxisGroup = this._axisGroup;
                if (this._axisGroup = new graphic.Group, this.group.add(this._axisGroup), axisModel.get("show")) {
                  var gridModel = axisModel.getCoordSysModel(), layout = cartesianAxisHelper.layout(gridModel, axisModel),
                    axisBuilder = new AxisBuilder(axisModel, layout);
                  zrUtil.each(axisBuilderAttrs, axisBuilder.add, axisBuilder), this._axisGroup.add(axisBuilder.getGroup()), zrUtil.each(selfBuilderAttrs, function (name) {
                    axisModel.get(name + ".show") && this["_" + name](axisModel, gridModel, layout.labelInterval)
                  }, this), graphic.groupTransition(oldAxisGroup, this._axisGroup, axisModel), CartesianAxisView.superCall(this, "render", axisModel, ecModel, api, payload)
                }
              },
              _splitLine: function (axisModel, gridModel, labelInterval) {
                var axis = axisModel.axis;
                if (!axis.scale.isBlank()) {
                  var splitLineModel = axisModel.getModel("splitLine"),
                    lineStyleModel = splitLineModel.getModel("lineStyle"), lineColors = lineStyleModel.get("color"),
                    lineInterval = getInterval(splitLineModel, labelInterval);
                  lineColors = zrUtil.isArray(lineColors) ? lineColors : [lineColors];
                  for (var gridRect = gridModel.coordinateSystem.getRect(), isHorizontal = axis.isHorizontal(), lineCount = 0, ticksCoords = axis.getTicksCoords(), ticks = axis.scale.getTicks(), p1 = [], p2 = [], lineStyle = lineStyleModel.getLineStyle(), i = 0; i < ticksCoords.length; i++)if (!ifIgnoreOnTick(axis, i, lineInterval)) {
                    var tickCoord = axis.toGlobalCoord(ticksCoords[i]);
                    isHorizontal ? (p1[0] = tickCoord, p1[1] = gridRect.y, p2[0] = tickCoord, p2[1] = gridRect.y + gridRect.height) : (p1[0] = gridRect.x, p1[1] = tickCoord, p2[0] = gridRect.x + gridRect.width, p2[1] = tickCoord);
                    var colorIndex = lineCount++ % lineColors.length;
                    this._axisGroup.add(new graphic.Line(graphic.subPixelOptimizeLine({
                      anid: "line_" + ticks[i],
                      shape: {x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1]},
                      style: zrUtil.defaults({stroke: lineColors[colorIndex]}, lineStyle),
                      silent: !0
                    })))
                  }
                }
              },
              _splitArea: function (axisModel, gridModel, labelInterval) {
                var axis = axisModel.axis;
                if (!axis.scale.isBlank()) {
                  var splitAreaModel = axisModel.getModel("splitArea"),
                    areaStyleModel = splitAreaModel.getModel("areaStyle"), areaColors = areaStyleModel.get("color"),
                    gridRect = gridModel.coordinateSystem.getRect(), ticksCoords = axis.getTicksCoords(),
                    ticks = axis.scale.getTicks(), prevX = axis.toGlobalCoord(ticksCoords[0]),
                    prevY = axis.toGlobalCoord(ticksCoords[0]), count = 0,
                    areaInterval = getInterval(splitAreaModel, labelInterval), areaStyle = areaStyleModel.getAreaStyle();
                  areaColors = zrUtil.isArray(areaColors) ? areaColors : [areaColors];
                  for (var i = 1; i < ticksCoords.length; i++)if (!ifIgnoreOnTick(axis, i, areaInterval)) {
                    var x, y, width, height, tickCoord = axis.toGlobalCoord(ticksCoords[i]);
                    axis.isHorizontal() ? (x = prevX, y = gridRect.y, width = tickCoord - x, height = gridRect.height) : (x = gridRect.x, y = prevY, width = gridRect.width, height = tickCoord - y);
                    var colorIndex = count++ % areaColors.length;
                    this._axisGroup.add(new graphic.Rect({
                      anid: "area_" + ticks[i],
                      shape: {x: x, y: y, width: width, height: height},
                      style: zrUtil.defaults({fill: areaColors[colorIndex]}, areaStyle),
                      silent: !0
                    })), prevX = x + width, prevY = y + height
                  }
                }
              }
            });
          CartesianAxisView.extend({type: "xAxis"}), CartesianAxisView.extend({type: "yAxis"})
        }),define("echarts/chart/helper/Symbol", ["require", "zrender/core/util", "../../util/symbol", "../../util/graphic", "../../util/number"], function (require) {
          function getSymbolSize(data, idx) {
            var symbolSize = data.getItemVisual(idx, "symbolSize");
            return symbolSize instanceof Array ? symbolSize.slice() : [+symbolSize, +symbolSize]
          }
          
          function getScale(symbolSize) {
            return [symbolSize[0] / 2, symbolSize[1] / 2]
          }
          
          function _Symbol4(data, idx, seriesScope) {
            graphic.Group.call(this), this.updateData(data, idx, seriesScope)
          }
          
          function driftSymbol(dx, dy) {
            this.parent.drift(dx, dy)
          }
          
          var zrUtil = require("zrender/core/util"), symbolUtil = require("../../util/symbol"),
            graphic = require("../../util/graphic"), numberUtil = require("../../util/number"),
            symbolProto = _Symbol4.prototype;
          symbolProto._createSymbol = function (symbolType, data, idx, symbolSize) {
            this.removeAll();
            var seriesModel = data.hostModel, color = data.getItemVisual(idx, "color"),
              symbolPath = symbolUtil.createSymbol(symbolType, -1, -1, 2, 2, color);
            symbolPath.attr({
              z2: 100,
              culling: !0,
              scale: [0, 0]
            }), symbolPath.drift = driftSymbol, graphic.initProps(symbolPath, {scale: getScale(symbolSize)}, seriesModel, idx), this._symbolType = symbolType, this.add(symbolPath)
          }, symbolProto.stopSymbolAnimation = function (toLastFrame) {
            this.childAt(0).stopAnimation(toLastFrame)
          }, symbolProto.getSymbolPath = function () {
            return this.childAt(0)
          }, symbolProto.getScale = function () {
            return this.childAt(0).scale
          }, symbolProto.highlight = function () {
            this.childAt(0).trigger("emphasis")
          }, symbolProto.downplay = function () {
            this.childAt(0).trigger("normal")
          }, symbolProto.setZ = function (zlevel, z) {
            var symbolPath = this.childAt(0);
            symbolPath.zlevel = zlevel, symbolPath.z = z
          }, symbolProto.setDraggable = function (draggable) {
            var symbolPath = this.childAt(0);
            symbolPath.draggable = draggable, symbolPath.cursor = draggable ? "move" : "pointer"
          }, symbolProto.updateData = function (data, idx, seriesScope) {
            this.silent = !1;
            var symbolType = data.getItemVisual(idx, "symbol") || "circle", seriesModel = data.hostModel,
              symbolSize = getSymbolSize(data, idx);
            if (symbolType !== this._symbolType) this._createSymbol(symbolType, data, idx, symbolSize); else {
              var symbolPath = this.childAt(0);
              symbolPath.silent = !1, graphic.updateProps(symbolPath, {scale: getScale(symbolSize)}, seriesModel, idx)
            }
            this._updateCommon(data, idx, symbolSize, seriesScope), this._seriesModel = seriesModel
          };
          var normalStyleAccessPath = ["itemStyle", "normal"], emphasisStyleAccessPath = ["itemStyle", "emphasis"],
            normalLabelAccessPath = ["label", "normal"], emphasisLabelAccessPath = ["label", "emphasis"];
          return symbolProto._updateCommon = function (data, idx, symbolSize, seriesScope) {
            var symbolPath = this.childAt(0), seriesModel = data.hostModel, color = data.getItemVisual(idx, "color");
            "image" !== symbolPath.type && symbolPath.useStyle({strokeNoScale: !0}), seriesScope = seriesScope || null;
            var itemStyle = seriesScope && seriesScope.itemStyle,
              hoverItemStyle = seriesScope && seriesScope.hoverItemStyle,
              symbolRotate = seriesScope && seriesScope.symbolRotate,
              symbolOffset = seriesScope && seriesScope.symbolOffset,
              labelModel = seriesScope && seriesScope.labelModel,
              hoverLabelModel = seriesScope && seriesScope.hoverLabelModel,
              hoverAnimation = seriesScope && seriesScope.hoverAnimation;
            if (!seriesScope || data.hasItemOption) {
              var itemModel = data.getItemModel(idx);
              itemStyle = itemModel.getModel(normalStyleAccessPath).getItemStyle(["color"]), hoverItemStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle(), symbolRotate = itemModel.getShallow("symbolRotate"), symbolOffset = itemModel.getShallow("symbolOffset"), labelModel = itemModel.getModel(normalLabelAccessPath), hoverLabelModel = itemModel.getModel(emphasisLabelAccessPath), hoverAnimation = itemModel.getShallow("hoverAnimation")
            } else hoverItemStyle = zrUtil.extend({}, hoverItemStyle);
            var elStyle = symbolPath.style;
            symbolPath.attr("rotation", (symbolRotate || 0) * Math.PI / 180 || 0), symbolOffset && symbolPath.attr("position", [numberUtil.parsePercent(symbolOffset[0], symbolSize[0]), numberUtil.parsePercent(symbolOffset[1], symbolSize[1])]), symbolPath.setColor(color), symbolPath.setStyle(itemStyle);
            var opacity = data.getItemVisual(idx, "opacity");
            null != opacity && (elStyle.opacity = opacity);
            for (var valueDim, dataType, dimensions = data.dimensions.slice(); dimensions.length && (valueDim = dimensions.pop(), dataType = data.getDimensionInfo(valueDim).type, "ordinal" === dataType || "time" === dataType););
            null != valueDim && labelModel.getShallow("show") ? (graphic.setText(elStyle, labelModel, color), elStyle.text = zrUtil.retrieve(seriesModel.getFormattedLabel(idx, "normal"), data.get(valueDim, idx))) : elStyle.text = "", null != valueDim && hoverLabelModel.getShallow("show") ? (graphic.setText(hoverItemStyle, hoverLabelModel, color), hoverItemStyle.text = zrUtil.retrieve(seriesModel.getFormattedLabel(idx, "emphasis"), data.get(valueDim, idx))) : hoverItemStyle.text = "", symbolPath.off("mouseover").off("mouseout").off("emphasis").off("normal"), symbolPath.hoverStyle = hoverItemStyle, graphic.setHoverStyle(symbolPath);
            var scale = getScale(symbolSize);
            if (hoverAnimation && seriesModel.isAnimationEnabled()) {
              var onEmphasis = function () {
                var ratio = scale[1] / scale[0];
                this.animateTo({scale: [Math.max(1.1 * scale[0], scale[0] + 3), Math.max(1.1 * scale[1], scale[1] + 3 * ratio)]}, 400, "elasticOut")
              }, onNormal = function () {
                this.animateTo({scale: scale}, 400, "elasticOut")
              };
              symbolPath.on("mouseover", onEmphasis).on("mouseout", onNormal).on("emphasis", onEmphasis).on("normal", onNormal)
            }
          }, symbolProto.fadeOut = function (cb) {
            var symbolPath = this.childAt(0);
            this.silent = symbolPath.silent = !0, symbolPath.style.text = "", graphic.updateProps(symbolPath, {scale: [0, 0]}, this._seriesModel, this.dataIndex, cb)
          }, zrUtil.inherits(_Symbol4, graphic.Group), _Symbol4
        }),define("echarts/component/helper/selectableMixin", ["require", "zrender/core/util"], function (require) {
          var zrUtil = require("zrender/core/util");
          return {
            updateSelectedMap: function (targetList) {
              this._selectTargetMap = zrUtil.reduce(targetList || [], function (targetMap, target) {
                return targetMap[target.name] = target, targetMap
              }, {})
            }, select: function (name) {
              var targetMap = this._selectTargetMap, target = targetMap[name], selectedMode = this.get("selectedMode");
              "single" === selectedMode && zrUtil.each(targetMap, function (target) {
                target.selected = !1
              }), target && (target.selected = !0)
            }, unSelect: function (name) {
              var target = this._selectTargetMap[name];
              target && (target.selected = !1)
            }, toggleSelected: function (name) {
              var target = this._selectTargetMap[name];
              if (null != target)return this[target.selected ? "unSelect" : "select"](name), target.selected
            }, isSelected: function (name) {
              var target = this._selectTargetMap[name];
              return target && target.selected
            }
          }
        }),define("echarts/chart/line/poly", ["require", "zrender/graphic/Path", "zrender/core/vector"], function (require) {
          function isPointNull(p) {
            return isNaN(p[0]) || isNaN(p[1])
          }
          
          function drawSegment(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
            for (var prevIdx = 0, idx = start, k = 0; k < segLen; k++) {
              var p = points[idx];
              if (idx >= allLen || idx < 0)break;
              if (isPointNull(p)) {
                if (connectNulls) {
                  idx += dir;
                  continue
                }
                break
              }
              if (idx === start) ctx[dir > 0 ? "moveTo" : "lineTo"](p[0], p[1]), v2Copy(cp0, p); else if (smooth > 0) {
                var nextIdx = idx + dir, nextP = points[nextIdx];
                if (connectNulls)for (; nextP && isPointNull(points[nextIdx]);)nextIdx += dir, nextP = points[nextIdx];
                var ratioNextSeg = .5, prevP = points[prevIdx], nextP = points[nextIdx];
                if (!nextP || isPointNull(nextP)) v2Copy(cp1, p); else {
                  isPointNull(nextP) && !connectNulls && (nextP = p), vec2.sub(v, nextP, prevP);
                  var lenPrevSeg, lenNextSeg;
                  if ("x" === smoothMonotone || "y" === smoothMonotone) {
                    var dim = "x" === smoothMonotone ? 0 : 1;
                    lenPrevSeg = Math.abs(p[dim] - prevP[dim]), lenNextSeg = Math.abs(p[dim] - nextP[dim])
                  } else lenPrevSeg = vec2.dist(p, prevP), lenNextSeg = vec2.dist(p, nextP);
                  ratioNextSeg = lenNextSeg / (lenNextSeg + lenPrevSeg), scaleAndAdd(cp1, p, v, -smooth * (1 - ratioNextSeg))
                }
                vec2Min(cp0, cp0, smoothMax), vec2Max(cp0, cp0, smoothMin), vec2Min(cp1, cp1, smoothMax), vec2Max(cp1, cp1, smoothMin), ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]), scaleAndAdd(cp0, p, v, smooth * ratioNextSeg)
              } else ctx.lineTo(p[0], p[1]);
              prevIdx = idx, idx += dir
            }
            return k
          }
          
          function getBoundingBox(points, smoothConstraint) {
            var ptMin = [1 / 0, 1 / 0], ptMax = [-(1 / 0), -(1 / 0)];
            if (smoothConstraint)for (var i = 0; i < points.length; i++) {
              var pt = points[i];
              pt[0] < ptMin[0] && (ptMin[0] = pt[0]), pt[1] < ptMin[1] && (ptMin[1] = pt[1]), pt[0] > ptMax[0] && (ptMax[0] = pt[0]), pt[1] > ptMax[1] && (ptMax[1] = pt[1])
            }
            return {min: smoothConstraint ? ptMin : ptMax, max: smoothConstraint ? ptMax : ptMin}
          }
          
          var Path = require("zrender/graphic/Path"), vec2 = require("zrender/core/vector"), vec2Min = vec2.min,
            vec2Max = vec2.max, scaleAndAdd = vec2.scaleAndAdd, v2Copy = vec2.copy, v = [], cp0 = [], cp1 = [];
          return {
            Polyline: Path.extend({
              type: "ec-polyline",
              shape: {points: [], smooth: 0, smoothConstraint: !0, smoothMonotone: null, connectNulls: !1},
              style: {fill: null, stroke: "#000"},
              buildPath: function (ctx, shape) {
                var points = shape.points, i = 0, len = points.length,
                  result = getBoundingBox(points, shape.smoothConstraint);
                if (shape.connectNulls) {
                  for (; len > 0 && isPointNull(points[len - 1]); len--);
                  for (; i < len && isPointNull(points[i]); i++);
                }
                for (; i < len;)i += drawSegment(ctx, points, i, len, len, 1, result.min, result.max, shape.smooth, shape.smoothMonotone, shape.connectNulls) + 1
              }
            }),
            Polygon: Path.extend({
              type: "ec-polygon",
              shape: {
                points: [],
                stackedOnPoints: [],
                smooth: 0,
                stackedOnSmooth: 0,
                smoothConstraint: !0,
                smoothMonotone: null,
                connectNulls: !1
              },
              buildPath: function (ctx, shape) {
                var points = shape.points, stackedOnPoints = shape.stackedOnPoints, i = 0, len = points.length,
                  smoothMonotone = shape.smoothMonotone, bbox = getBoundingBox(points, shape.smoothConstraint),
                  stackedOnBBox = getBoundingBox(stackedOnPoints, shape.smoothConstraint);
                if (shape.connectNulls) {
                  for (; len > 0 && isPointNull(points[len - 1]); len--);
                  for (; i < len && isPointNull(points[i]); i++);
                }
                for (; i < len;) {
                  var k = drawSegment(ctx, points, i, len, len, 1, bbox.min, bbox.max, shape.smooth, smoothMonotone, shape.connectNulls);
                  drawSegment(ctx, stackedOnPoints, i + k - 1, k, len, -1, stackedOnBBox.min, stackedOnBBox.max, shape.stackedOnSmooth, smoothMonotone, shape.connectNulls), i += k + 1, ctx.closePath()
                }
              }
            })
          }
        }),define("echarts/chart/line/lineAnimationDiff", ["require"], function (require) {
          function sign(val) {
            return val >= 0 ? 1 : -1
          }
          
          function getStackedOnPoint(coordSys, data, idx) {
            for (var stackedOnSameSign, baseAxis = coordSys.getBaseAxis(), valueAxis = coordSys.getOtherAxis(baseAxis), valueStart = baseAxis.onZero ? 0 : valueAxis.scale.getExtent()[0], valueDim = valueAxis.dim, baseDataOffset = "x" === valueDim || "radius" === valueDim ? 1 : 0, stackedOn = data.stackedOn, val = data.get(valueDim, idx); stackedOn && sign(stackedOn.get(valueDim, idx)) === sign(val);) {
              stackedOnSameSign = stackedOn;
              break
            }
            var stackedData = [];
            return stackedData[baseDataOffset] = data.get(baseAxis.dim, idx), stackedData[1 - baseDataOffset] = stackedOnSameSign ? stackedOnSameSign.get(valueDim, idx, !0) : valueStart, coordSys.dataToPoint(stackedData)
          }
          
          function diffData(oldData, newData) {
            var diffResult = [];
            return newData.diff(oldData).add(function (idx) {
              diffResult.push({cmd: "+", idx: idx})
            }).update(function (newIdx, oldIdx) {
              diffResult.push({cmd: "=", idx: oldIdx, idx1: newIdx})
            }).remove(function (idx) {
              diffResult.push({cmd: "-", idx: idx})
            }).execute(), diffResult
          }
          
          return function (oldData, newData, oldStackedOnPoints, newStackedOnPoints, oldCoordSys, newCoordSys) {
            for (var diff = diffData(oldData, newData), currPoints = [], nextPoints = [], currStackedPoints = [], nextStackedPoints = [], status = [], sortedIndices = [], rawIndices = [], dims = newCoordSys.dimensions, i = 0; i < diff.length; i++) {
              var diffItem = diff[i], pointAdded = !0;
              switch (diffItem.cmd) {
                case"=":
                  var currentPt = oldData.getItemLayout(diffItem.idx), nextPt = newData.getItemLayout(diffItem.idx1);
                  (isNaN(currentPt[0]) || isNaN(currentPt[1])) && (currentPt = nextPt.slice()), currPoints.push(currentPt), nextPoints.push(nextPt), currStackedPoints.push(oldStackedOnPoints[diffItem.idx]), nextStackedPoints.push(newStackedOnPoints[diffItem.idx1]), rawIndices.push(newData.getRawIndex(diffItem.idx1));
                  break;
                case"+":
                  var idx = diffItem.idx;
                  currPoints.push(oldCoordSys.dataToPoint([newData.get(dims[0], idx, !0), newData.get(dims[1], idx, !0)])), nextPoints.push(newData.getItemLayout(idx).slice()), currStackedPoints.push(getStackedOnPoint(oldCoordSys, newData, idx)), nextStackedPoints.push(newStackedOnPoints[idx]), rawIndices.push(newData.getRawIndex(idx));
                  break;
                case"-":
                  var idx = diffItem.idx, rawIndex = oldData.getRawIndex(idx);
                  rawIndex !== idx ? (currPoints.push(oldData.getItemLayout(idx)), nextPoints.push(newCoordSys.dataToPoint([oldData.get(dims[0], idx, !0), oldData.get(dims[1], idx, !0)])), currStackedPoints.push(oldStackedOnPoints[idx]), nextStackedPoints.push(getStackedOnPoint(newCoordSys, oldData, idx)), rawIndices.push(rawIndex)) : pointAdded = !1
              }
              pointAdded && (status.push(diffItem), sortedIndices.push(sortedIndices.length))
            }
            sortedIndices.sort(function (a, b) {
              return rawIndices[a] - rawIndices[b]
            });
            for (var sortedCurrPoints = [], sortedNextPoints = [], sortedCurrStackedPoints = [], sortedNextStackedPoints = [], sortedStatus = [], i = 0; i < sortedIndices.length; i++) {
              var idx = sortedIndices[i];
              sortedCurrPoints[i] = currPoints[idx], sortedNextPoints[i] = nextPoints[idx], sortedCurrStackedPoints[i] = currStackedPoints[idx], sortedNextStackedPoints[i] = nextStackedPoints[idx], sortedStatus[i] = status[idx]
            }
            return {
              current: sortedCurrPoints,
              next: sortedNextPoints,
              stackedOnCurrent: sortedCurrStackedPoints,
              stackedOnNext: sortedNextStackedPoints,
              status: sortedStatus
            }
          }
        }),define("echarts/component/helper/listComponent", ["require", "../../util/layout", "../../util/format", "../../util/graphic"], function (require) {
          function positionGroup(group, model, api) {
            _layout.positionElement(group, model.getBoxLayoutParams(), {
              width: api.getWidth(),
              height: api.getHeight()
            }, model.get("padding"))
          }
          
          var _layout = require("../../util/layout"), formatUtil = require("../../util/format"),
            graphic = require("../../util/graphic");
          return {
            layout: function (group, componentModel, api) {
              var rect = _layout.getLayoutRect(componentModel.getBoxLayoutParams(), {
                width: api.getWidth(),
                height: api.getHeight()
              }, componentModel.get("padding"));
              _layout.box(componentModel.get("orient"), group, componentModel.get("itemGap"), rect.width, rect.height), positionGroup(group, componentModel, api)
            }, addBackground: function (group, componentModel) {
              var padding = formatUtil.normalizeCssArray(componentModel.get("padding")),
                boundingRect = group.getBoundingRect(), style = componentModel.getItemStyle(["color", "opacity"]);
              style.fill = componentModel.get("backgroundColor");
              var rect = new graphic.Rect({
                shape: {
                  x: boundingRect.x - padding[3],
                  y: boundingRect.y - padding[0],
                  width: boundingRect.width + padding[1] + padding[3],
                  height: boundingRect.height + padding[0] + padding[2]
                }, style: style, silent: !0, z2: -1
              });
              graphic.subPixelOptimizeRect(rect), group.add(rect)
            }
          }
        }),define("echarts/component/axisPointer/findPointFromSeries", ["require", "zrender/core/util", "../../util/model"], function (require) {
          var zrUtil = require("zrender/core/util"), modelUtil = require("../../util/model");
          return function (finder, ecModel) {
            var seriesModel, point = [], seriesIndex = finder.seriesIndex;
            if (null == seriesIndex || !(seriesModel = ecModel.getSeriesByIndex(seriesIndex)))return {point: []};
            var data = seriesModel.getData(), dataIndex = modelUtil.queryDataIndex(data, finder);
            if (null == dataIndex || zrUtil.isArray(dataIndex))return {point: []};
            var el = data.getItemGraphicEl(dataIndex), coordSys = seriesModel.coordinateSystem;
            if (seriesModel.getTooltipPosition) point = seriesModel.getTooltipPosition(dataIndex) || []; else if (coordSys && coordSys.dataToPoint) point = coordSys.dataToPoint(data.getValues(zrUtil.map(coordSys.dimensions, function (dim) {
                return seriesModel.coordDimToDataDim(dim)[0]
              }), dataIndex, !0)) || []; else if (el) {
              var rect = el.getBoundingRect().clone();
              rect.applyTransform(el.transform), point = [rect.x + rect.width / 2, rect.y + rect.height / 2]
            }
            return {point: point, el: el}
          }
        }),define("echarts/component/marker/MarkerView", ["require", "../../echarts"], function (require) {
          return require("../../echarts").extendComponentView({
            type: "marker", init: function () {
              this.markerGroupMap = {}
            }, render: function (markerModel, ecModel, api) {
              var markerGroupMap = this.markerGroupMap;
              for (var name in markerGroupMap)markerGroupMap.hasOwnProperty(name) && (markerGroupMap[name].__keep = !1);
              var markerModelKey = this.type + "Model";
              ecModel.eachSeries(function (seriesModel) {
                var markerModel = seriesModel[markerModelKey];
                markerModel && this.renderSeries(seriesModel, markerModel, ecModel, api)
              }, this);
              for (var name in markerGroupMap)markerGroupMap.hasOwnProperty(name) && !markerGroupMap[name].__keep && this.group.remove(markerGroupMap[name].group)
            }, renderSeries: function () {
            }
          })
        }),define("echarts/component/marker/markerHelper", ["require", "zrender/core/util", "../../util/number"], function (require) {
          function hasXOrY(item) {
            return !(isNaN(parseFloat(item.x)) && isNaN(parseFloat(item.y)))
          }
          
          function hasXAndY(item) {
            return !isNaN(parseFloat(item.x)) && !isNaN(parseFloat(item.y))
          }
          
          function getPrecision(data, valueAxisDim, dataIndex) {
            var precision = -1;
            do precision = Math.max(numberUtil.getPrecision(data.get(valueAxisDim, dataIndex)), precision), data = data.stackedOn; while (data);
            return precision
          }
          
          function markerTypeCalculatorWithExtent(mlType, data, otherDataDim, targetDataDim, otherCoordIndex, targetCoordIndex) {
            var coordArr = [], value = numCalculate(data, targetDataDim, mlType),
              dataIndex = data.indicesOfNearest(targetDataDim, value, !0)[0];
            coordArr[otherCoordIndex] = data.get(otherDataDim, dataIndex, !0), coordArr[targetCoordIndex] = data.get(targetDataDim, dataIndex, !0);
            var precision = getPrecision(data, targetDataDim, dataIndex);
            return precision >= 0 && (coordArr[targetCoordIndex] = +coordArr[targetCoordIndex].toFixed(precision)), coordArr
          }
          
          var zrUtil = require("zrender/core/util"), numberUtil = require("../../util/number"),
            indexOf = zrUtil.indexOf, curry = zrUtil.curry, markerTypeCalculator = {
              min: curry(markerTypeCalculatorWithExtent, "min"),
              max: curry(markerTypeCalculatorWithExtent, "max"),
              average: curry(markerTypeCalculatorWithExtent, "average")
            }, dataTransform = function (seriesModel, item) {
              var data = seriesModel.getData(), coordSys = seriesModel.coordinateSystem;
              if (item && !hasXAndY(item) && !zrUtil.isArray(item.coord) && coordSys) {
                var dims = coordSys.dimensions, axisInfo = getAxisInfo(item, data, coordSys, seriesModel);
                if (item = zrUtil.clone(item), item.type && markerTypeCalculator[item.type] && axisInfo.baseAxis && axisInfo.valueAxis) {
                  var otherCoordIndex = indexOf(dims, axisInfo.baseAxis.dim),
                    targetCoordIndex = indexOf(dims, axisInfo.valueAxis.dim);
                  item.coord = markerTypeCalculator[item.type](data, axisInfo.baseDataDim, axisInfo.valueDataDim, otherCoordIndex, targetCoordIndex), item.value = item.coord[targetCoordIndex]
                } else {
                  for (var coord = [null != item.xAxis ? item.xAxis : item.radiusAxis, null != item.yAxis ? item.yAxis : item.angleAxis], i = 0; i < 2; i++)if (markerTypeCalculator[coord[i]]) {
                    var dataDim = seriesModel.coordDimToDataDim(dims[i])[0];
                    coord[i] = numCalculate(data, dataDim, coord[i])
                  }
                  item.coord = coord
                }
              }
              return item
            }, getAxisInfo = function (item, data, coordSys, seriesModel) {
              var ret = {};
              return null != item.valueIndex || null != item.valueDim ? (ret.valueDataDim = null != item.valueIndex ? data.getDimension(item.valueIndex) : item.valueDim, ret.valueAxis = coordSys.getAxis(seriesModel.dataDimToCoordDim(ret.valueDataDim)), ret.baseAxis = coordSys.getOtherAxis(ret.valueAxis), ret.baseDataDim = seriesModel.coordDimToDataDim(ret.baseAxis.dim)[0]) : (ret.baseAxis = seriesModel.getBaseAxis(), ret.valueAxis = coordSys.getOtherAxis(ret.baseAxis), ret.baseDataDim = seriesModel.coordDimToDataDim(ret.baseAxis.dim)[0], ret.valueDataDim = seriesModel.coordDimToDataDim(ret.valueAxis.dim)[0]), ret
            }, dataFilter = function (coordSys, item) {
              return !(coordSys && coordSys.containData && item.coord && !hasXOrY(item)) || coordSys.containData(item.coord)
            }, dimValueGetter = function (item, dimName, dataIndex, dimIndex) {
              return dimIndex < 2 ? item.coord && item.coord[dimIndex] : item.value
            }, numCalculate = function (data, valueDataDim, type) {
              if ("average" === type) {
                var sum = 0, count = 0;
                return data.each(valueDataDim, function (val, idx) {
                  isNaN(val) || (sum += val, count++)
                }, !0), sum / count
              }
              return data.getDataExtent(valueDataDim, !0)["max" === type ? 1 : 0]
            };
          return {
            dataTransform: dataTransform,
            dataFilter: dataFilter,
            dimValueGetter: dimValueGetter,
            getAxisInfo: getAxisInfo,
            numCalculate: numCalculate
          }
        }),define("echarts/chart/helper/LineDraw", ["require", "../../util/graphic", "./Line"], function (require) {
          function isPointNaN(pt) {
            return isNaN(pt[0]) || isNaN(pt[1])
          }
          
          function lineNeedsDraw(pts) {
            return !isPointNaN(pts[0]) && !isPointNaN(pts[1])
          }
          
          function LineDraw(ctor) {
            this._ctor = ctor || LineGroup, this.group = new graphic.Group
          }
          
          var graphic = require("../../util/graphic"), LineGroup = require("./Line"),
            lineDrawProto = LineDraw.prototype;
          return lineDrawProto.updateData = function (lineData) {
            var oldLineData = this._lineData, group = this.group, LineCtor = this._ctor, hostModel = lineData.hostModel,
              seriesScope = {
                lineStyle: hostModel.getModel("lineStyle.normal").getLineStyle(),
                hoverLineStyle: hostModel.getModel("lineStyle.emphasis").getLineStyle(),
                labelModel: hostModel.getModel("label.normal"),
                hoverLabelModel: hostModel.getModel("label.emphasis")
              };
            lineData.diff(oldLineData).add(function (idx) {
              if (lineNeedsDraw(lineData.getItemLayout(idx))) {
                var lineGroup = new LineCtor(lineData, idx, seriesScope);
                lineData.setItemGraphicEl(idx, lineGroup), group.add(lineGroup)
              }
            }).update(function (newIdx, oldIdx) {
              var lineGroup = oldLineData.getItemGraphicEl(oldIdx);
              return lineNeedsDraw(lineData.getItemLayout(newIdx)) ? (lineGroup ? lineGroup.updateData(lineData, newIdx, seriesScope) : lineGroup = new LineCtor(lineData, newIdx, seriesScope), lineData.setItemGraphicEl(newIdx, lineGroup), void group.add(lineGroup)) : void group.remove(lineGroup)
            }).remove(function (idx) {
              group.remove(oldLineData.getItemGraphicEl(idx))
            }).execute(), this._lineData = lineData
          }, lineDrawProto.updateLayout = function () {
            var lineData = this._lineData;
            lineData.eachItemGraphicEl(function (el, idx) {
              el.updateLayout(lineData, idx)
            }, this)
          }, lineDrawProto.remove = function () {
            this.group.removeAll()
          }, LineDraw
        }),define("echarts/component/axis/AxisBuilder", ["require", "zrender/core/util", "../../util/format", "../../util/graphic", "../../model/Model", "../../util/number", "zrender/core/vector", "zrender/core/matrix"], function (require) {
          function makeAxisEventDataBase(axisModel) {
            var eventData = {componentType: axisModel.mainType};
            return eventData[axisModel.mainType + "Index"] = axisModel.componentIndex, eventData
          }
          
          function endTextLayout(opt, textPosition, textRotate, extent) {
            var textAlign, textVerticalAlign, rotationDiff = remRadian(textRotate - opt.rotation),
              inverse = extent[0] > extent[1],
              onLeft = "start" === textPosition && !inverse || "start" !== textPosition && inverse;
            return isRadianAroundZero(rotationDiff - PI / 2) ? (textVerticalAlign = onLeft ? "bottom" : "top", textAlign = "center") : isRadianAroundZero(rotationDiff - 1.5 * PI) ? (textVerticalAlign = onLeft ? "top" : "bottom", textAlign = "center") : (textVerticalAlign = "middle", textAlign = rotationDiff < 1.5 * PI && rotationDiff > PI / 2 ? onLeft ? "left" : "right" : onLeft ? "right" : "left"), {
              rotation: rotationDiff,
              textAlign: textAlign,
              textVerticalAlign: textVerticalAlign
            }
          }
          
          function isSilent(axisModel) {
            var tooltipOpt = axisModel.get("tooltip");
            return axisModel.get("silent") || !(axisModel.get("triggerEvent") || tooltipOpt && tooltipOpt.show)
          }
          
          function fixMinMaxLabelShow(axisModel, textEls) {
            var showMinLabel = axisModel.get("axisLabel.showMinLabel"),
              showMaxLabel = axisModel.get("axisLabel.showMaxLabel"), firstLabel = textEls[0], nextLabel = textEls[1],
              lastLabel = textEls[textEls.length - 1], prevLabel = textEls[textEls.length - 2];
            showMinLabel === !1 ? firstLabel.ignore = !0 : null != axisModel.getMin() && isTwoLabelOverlapped(firstLabel, nextLabel) && (showMinLabel ? nextLabel.ignore = !0 : firstLabel.ignore = !0), showMaxLabel === !1 ? lastLabel.ignore = !0 : null != axisModel.getMax() && isTwoLabelOverlapped(prevLabel, lastLabel) && (showMaxLabel ? prevLabel.ignore = !0 : lastLabel.ignore = !0)
          }
          
          function isTwoLabelOverlapped(current, next, labelLayout) {
            var firstRect = current && current.getBoundingRect().clone(),
              nextRect = next && next.getBoundingRect().clone();
            if (firstRect && nextRect) {
              var mRotationBack = matrix.identity([]);
              return matrix.rotate(mRotationBack, mRotationBack, -current.rotation), firstRect.applyTransform(matrix.mul([], mRotationBack, current.getLocalTransform())), nextRect.applyTransform(matrix.mul([], mRotationBack, next.getLocalTransform())), firstRect.intersect(nextRect)
            }
          }
          
          var zrUtil = require("zrender/core/util"), formatUtil = require("../../util/format"),
            graphic = require("../../util/graphic"), Model = require("../../model/Model"),
            numberUtil = require("../../util/number"), remRadian = numberUtil.remRadian,
            isRadianAroundZero = numberUtil.isRadianAroundZero, vec2 = require("zrender/core/vector"),
            matrix = require("zrender/core/matrix"), v2ApplyTransform = vec2.applyTransform, retrieve = zrUtil.retrieve,
            PI = Math.PI, AxisBuilder = function (axisModel, opt) {
              this.opt = opt, this.axisModel = axisModel, zrUtil.defaults(opt, {
                labelOffset: 0,
                nameDirection: 1,
                tickDirection: 1,
                labelDirection: 1,
                silent: !0
              }), this.group = new graphic.Group;
              var dumbGroup = new graphic.Group({position: opt.position.slice(), rotation: opt.rotation});
              dumbGroup.updateTransform(), this._transform = dumbGroup.transform, this._dumbGroup = dumbGroup
            };
          AxisBuilder.prototype = {
            constructor: AxisBuilder, hasBuilder: function (name) {
              return !!builders[name]
            }, add: function (name) {
              builders[name].call(this)
            }, getGroup: function () {
              return this.group
            }
          };
          var builders = {
            axisLine: function () {
              var opt = this.opt, axisModel = this.axisModel;
              if (axisModel.get("axisLine.show")) {
                var extent = this.axisModel.axis.getExtent(), matrix = this._transform, pt1 = [extent[0], 0],
                  pt2 = [extent[1], 0];
                matrix && (v2ApplyTransform(pt1, pt1, matrix), v2ApplyTransform(pt2, pt2, matrix)), this.group.add(new graphic.Line(graphic.subPixelOptimizeLine({
                  anid: "line",
                  shape: {x1: pt1[0], y1: pt1[1], x2: pt2[0], y2: pt2[1]},
                  style: zrUtil.extend({lineCap: "round"}, axisModel.getModel("axisLine.lineStyle").getLineStyle()),
                  strokeContainThreshold: opt.strokeContainThreshold || 5,
                  silent: !0,
                  z2: 1
                })))
              }
            }, axisTick: function () {
              var axisModel = this.axisModel, axis = axisModel.axis;
              if (axisModel.get("axisTick.show") && !axis.scale.isBlank())for (var tickModel = axisModel.getModel("axisTick"), opt = this.opt, lineStyleModel = tickModel.getModel("lineStyle"), tickLen = tickModel.get("length"), tickInterval = getInterval(tickModel, opt.labelInterval), ticksCoords = axis.getTicksCoords(tickModel.get("alignWithLabel")), ticks = axis.scale.getTicks(), pt1 = [], pt2 = [], matrix = this._transform, i = 0; i < ticksCoords.length; i++)if (!ifIgnoreOnTick(axis, i, tickInterval)) {
                var tickCoord = ticksCoords[i];
                pt1[0] = tickCoord, pt1[1] = 0, pt2[0] = tickCoord, pt2[1] = opt.tickDirection * tickLen, matrix && (v2ApplyTransform(pt1, pt1, matrix), v2ApplyTransform(pt2, pt2, matrix)), this.group.add(new graphic.Line(graphic.subPixelOptimizeLine({
                  anid: "tick_" + ticks[i],
                  shape: {x1: pt1[0], y1: pt1[1], x2: pt2[0], y2: pt2[1]},
                  style: zrUtil.defaults(lineStyleModel.getLineStyle(), {stroke: axisModel.get("axisLine.lineStyle.color")}),
                  z2: 2,
                  silent: !0
                })))
              }
            }, axisLabel: function () {
              var opt = this.opt, axisModel = this.axisModel, axis = axisModel.axis,
                show = retrieve(opt.axisLabelShow, axisModel.get("axisLabel.show"));
              if (show && !axis.scale.isBlank()) {
                var labelModel = axisModel.getModel("axisLabel"), textStyleModel = labelModel.getModel("textStyle"),
                  labelMargin = labelModel.get("margin"), ticks = axis.scale.getTicks(),
                  labels = axisModel.getFormattedLabels(),
                  labelRotation = (retrieve(opt.labelRotate, labelModel.get("rotate")) || 0) * PI / 180,
                  labelLayout = innerTextLayout(opt.rotation, labelRotation, opt.labelDirection),
                  categoryData = axisModel.get("data"), textEls = [], silent = isSilent(axisModel),
                  triggerEvent = axisModel.get("triggerEvent");
                zrUtil.each(ticks, function (tickVal, index) {
                  if (!ifIgnoreOnTick(axis, index, opt.labelInterval)) {
                    var itemTextStyleModel = textStyleModel;
                    categoryData && categoryData[tickVal] && categoryData[tickVal].textStyle && (itemTextStyleModel = new Model(categoryData[tickVal].textStyle, textStyleModel, axisModel.ecModel));
                    var textColor = itemTextStyleModel.getTextColor() || axisModel.get("axisLine.lineStyle.color"),
                      tickCoord = axis.dataToCoord(tickVal),
                      pos = [tickCoord, opt.labelOffset + opt.labelDirection * labelMargin],
                      labelStr = axis.scale.getLabel(tickVal), textEl = new graphic.Text({
                        anid: "label_" + tickVal,
                        style: {
                          text: labels[index],
                          textAlign: itemTextStyleModel.get("align", !0) || labelLayout.textAlign,
                          textVerticalAlign: itemTextStyleModel.get("baseline", !0) || labelLayout.textVerticalAlign,
                          textFont: itemTextStyleModel.getFont(),
                          fill: "function" == typeof textColor ? textColor("category" === axis.type ? labelStr : "value" === axis.type ? tickVal + "" : tickVal, index) : textColor
                        },
                        position: pos,
                        rotation: labelLayout.rotation,
                        silent: silent,
                        z2: 10
                      });
                    triggerEvent && (textEl.eventData = makeAxisEventDataBase(axisModel), textEl.eventData.targetType = "axisLabel", textEl.eventData.value = labelStr), this._dumbGroup.add(textEl), textEl.updateTransform(), textEls.push(textEl), this.group.add(textEl), textEl.decomposeTransform()
                  }
                }, this), fixMinMaxLabelShow(axisModel, textEls)
              }
            }, axisName: function () {
              var opt = this.opt, axisModel = this.axisModel, name = retrieve(opt.axisName, axisModel.get("name"));
              if (name) {
                var labelLayout, nameLocation = axisModel.get("nameLocation"), nameDirection = opt.nameDirection,
                  textStyleModel = axisModel.getModel("nameTextStyle"), gap = axisModel.get("nameGap") || 0,
                  extent = this.axisModel.axis.getExtent(), gapSignal = extent[0] > extent[1] ? -1 : 1,
                  pos = ["start" === nameLocation ? extent[0] - gapSignal * gap : "end" === nameLocation ? extent[1] + gapSignal * gap : (extent[0] + extent[1]) / 2, "middle" === nameLocation ? opt.labelOffset + nameDirection * gap : 0],
                  nameRotation = axisModel.get("nameRotate");
                null != nameRotation && (nameRotation = nameRotation * PI / 180);
                var axisNameAvailableWidth;
                "middle" === nameLocation ? labelLayout = innerTextLayout(opt.rotation, null != nameRotation ? nameRotation : opt.rotation, nameDirection) : (labelLayout = endTextLayout(opt, nameLocation, nameRotation || 0, extent), axisNameAvailableWidth = opt.axisNameAvailableWidth, null != axisNameAvailableWidth && (axisNameAvailableWidth = Math.abs(axisNameAvailableWidth / Math.sin(labelLayout.rotation)), !isFinite(axisNameAvailableWidth) && (axisNameAvailableWidth = null)));
                var textFont = textStyleModel.getFont(), truncateOpt = axisModel.get("nameTruncate", !0) || {},
                  ellipsis = truncateOpt.ellipsis,
                  maxWidth = retrieve(opt.nameTruncateMaxWidth, truncateOpt.maxWidth, axisNameAvailableWidth),
                  truncatedText = null != ellipsis && null != maxWidth ? formatUtil.truncateText(name, maxWidth, textFont, ellipsis, {
                    minChar: 2,
                    placeholder: truncateOpt.placeholder
                  }) : name, tooltipOpt = axisModel.get("tooltip", !0), mainType = axisModel.mainType,
                  formatterParams = {componentType: mainType, name: name, $vars: ["name"]};
                formatterParams[mainType + "Index"] = axisModel.componentIndex;
                var textEl = new graphic.Text({
                  anid: "name",
                  __fullText: name,
                  __truncatedText: truncatedText,
                  style: {
                    text: truncatedText,
                    textFont: textFont,
                    fill: textStyleModel.getTextColor() || axisModel.get("axisLine.lineStyle.color"),
                    textAlign: labelLayout.textAlign,
                    textVerticalAlign: labelLayout.textVerticalAlign
                  },
                  position: pos,
                  rotation: labelLayout.rotation,
                  silent: isSilent(axisModel),
                  z2: 1,
                  tooltip: tooltipOpt && tooltipOpt.show ? zrUtil.extend({
                    content: name, formatter: function () {
                      return name
                    }, formatterParams: formatterParams
                  }, tooltipOpt) : null
                });
                axisModel.get("triggerEvent") && (textEl.eventData = makeAxisEventDataBase(axisModel), textEl.eventData.targetType = "axisName", textEl.eventData.name = name), this._dumbGroup.add(textEl), textEl.updateTransform(), this.group.add(textEl), textEl.decomposeTransform()
              }
            }
          }, innerTextLayout = AxisBuilder.innerTextLayout = function (axisRotation, textRotation, direction) {
            var textAlign, textVerticalAlign, rotationDiff = remRadian(textRotation - axisRotation);
            return isRadianAroundZero(rotationDiff) ? (textVerticalAlign = direction > 0 ? "top" : "bottom", textAlign = "center") : isRadianAroundZero(rotationDiff - PI) ? (textVerticalAlign = direction > 0 ? "bottom" : "top", textAlign = "center") : (textVerticalAlign = "middle", textAlign = rotationDiff > 0 && rotationDiff < PI ? direction > 0 ? "right" : "left" : direction > 0 ? "left" : "right"), {
              rotation: rotationDiff,
              textAlign: textAlign,
              textVerticalAlign: textVerticalAlign
            }
          }, ifIgnoreOnTick = AxisBuilder.ifIgnoreOnTick = function (axis, i, interval) {
            var rawTick, scale = axis.scale;
            return "ordinal" === scale.type && ("function" == typeof interval ? (rawTick = scale.getTicks()[i], !interval(rawTick, scale.getLabel(rawTick))) : i % (interval + 1))
          }, getInterval = AxisBuilder.getInterval = function (model, labelInterval) {
            var interval = model.get("interval");
            return null != interval && "auto" != interval || (interval = labelInterval), interval
          };
          return AxisBuilder
        }),define("echarts/component/axis/AxisView", ["require", "../axisPointer/modelHelper", "../../echarts"], function (require) {
          function _updateAxisPointer(axisView, axisModel, ecModel, api, payload, forceRender) {
            var Clazz = AxisView.getAxisPointerClass(axisView.axisPointerClass);
            if (Clazz) {
              var axisPointerModel = axisPointerModelHelper.getAxisPointerModel(axisModel);
              axisPointerModel ? (axisView._axisPointer || (axisView._axisPointer = new Clazz)).render(axisModel, axisPointerModel, api, forceRender) : disposeAxisPointer(axisView, api)
            }
          }
          
          function disposeAxisPointer(axisView, ecModel, api) {
            var axisPointer = axisView._axisPointer;
            axisPointer && axisPointer.dispose(ecModel, api), axisView._axisPointer = null
          }
          
          var axisPointerModelHelper = require("../axisPointer/modelHelper"),
            AxisView = require("../../echarts").extendComponentView({
              type: "axis",
              _axisPointer: null,
              axisPointerClass: null,
              render: function (axisModel, ecModel, api, payload) {
                this.axisPointerClass && axisPointerModelHelper.fixValue(axisModel), AxisView.superApply(this, "render", arguments), _updateAxisPointer(this, axisModel, ecModel, api, payload, !0)
              },
              updateAxisPointer: function (axisModel, ecModel, api, payload, force) {
                _updateAxisPointer(this, axisModel, ecModel, api, payload, !1)
              },
              remove: function (ecModel, api) {
                var axisPointer = this._axisPointer;
                axisPointer && axisPointer.remove(api), AxisView.superApply(this, "remove", arguments)
              },
              dispose: function (ecModel, api) {
                disposeAxisPointer(this, api), AxisView.superApply(this, "dispose", arguments)
              }
            }), axisPointerClazz = [];
          return AxisView.registerAxisPointerClass = function (type, clazz) {
            if (axisPointerClazz[type])throw new Error("axisPointer " + type + " exists");
            axisPointerClazz[type] = clazz
          }, AxisView.getAxisPointerClass = function (type) {
            return type && axisPointerClazz[type]
          }, AxisView
        }),define("echarts/chart/pie/labelLayout", ["require", "zrender/contain/text"], function (require) {
          function adjustSingleSide(list, cx, cy, r, dir, viewWidth, viewHeight) {
            function shiftDown(start, end, delta, dir) {
              for (var j = start; j < end; j++)if (list[j].y += delta, j > start && j + 1 < end && list[j + 1].y > list[j].y + list[j].height)return void shiftUp(j, delta / 2);
              shiftUp(end - 1, delta / 2)
            }
            
            function shiftUp(end, delta) {
              for (var j = end; j >= 0 && (list[j].y -= delta, !(j > 0 && list[j].y > list[j - 1].y + list[j - 1].height)); j--);
            }
            
            function changeX(list, isDownList, cx, cy, r, dir) {
              for (var lastDeltaX = dir > 0 ? isDownList ? Number.MAX_VALUE : 0 : isDownList ? Number.MAX_VALUE : 0, i = 0, l = list.length; i < l; i++)if ("center" !== list[i].position) {
                var deltaY = Math.abs(list[i].y - cy), length = list[i].len, length2 = list[i].len2,
                  deltaX = deltaY < r + length ? Math.sqrt((r + length + length2) * (r + length + length2) - deltaY * deltaY) : Math.abs(list[i].x - cx);
                isDownList && deltaX >= lastDeltaX && (deltaX = lastDeltaX - 10), !isDownList && deltaX <= lastDeltaX && (deltaX = lastDeltaX + 10), list[i].x = cx + deltaX * dir, lastDeltaX = deltaX
              }
            }
            
            list.sort(function (a, b) {
              return a.y - b.y
            });
            for (var delta, lastY = 0, len = list.length, upList = [], downList = [], i = 0; i < len; i++)delta = list[i].y - lastY, delta < 0 && shiftDown(i, len, -delta, dir), lastY = list[i].y + list[i].height;
            viewHeight - lastY < 0 && shiftUp(len - 1, lastY - viewHeight);
            for (var i = 0; i < len; i++)list[i].y >= cy ? downList.push(list[i]) : upList.push(list[i]);
            changeX(upList, !1, cx, cy, r, dir), changeX(downList, !0, cx, cy, r, dir)
          }
          
          function avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight) {
            for (var leftList = [], rightList = [], i = 0; i < labelLayoutList.length; i++)labelLayoutList[i].x < cx ? leftList.push(labelLayoutList[i]) : rightList.push(labelLayoutList[i]);
            adjustSingleSide(rightList, cx, cy, r, 1, viewWidth, viewHeight), adjustSingleSide(leftList, cx, cy, r, -1, viewWidth, viewHeight);
            for (var i = 0; i < labelLayoutList.length; i++) {
              var linePoints = labelLayoutList[i].linePoints;
              if (linePoints) {
                var dist = linePoints[1][0] - linePoints[2][0];
                labelLayoutList[i].x < cx ? linePoints[2][0] = labelLayoutList[i].x + 3 : linePoints[2][0] = labelLayoutList[i].x - 3, linePoints[1][1] = linePoints[2][1] = labelLayoutList[i].y, linePoints[1][0] = linePoints[2][0] + dist
              }
            }
          }
          
          var textContain = require("zrender/contain/text");
          return function (seriesModel, r, viewWidth, viewHeight) {
            var cx, cy, data = seriesModel.getData(), labelLayoutList = [], hasLabelRotate = !1;
            data.each(function (idx) {
              var textX, textY, linePoints, textAlign, layout = data.getItemLayout(idx),
                itemModel = data.getItemModel(idx), labelModel = itemModel.getModel("label.normal"),
                labelPosition = labelModel.get("position") || itemModel.get("label.emphasis.position"),
                labelLineModel = itemModel.getModel("labelLine.normal"), labelLineLen = labelLineModel.get("length"),
                labelLineLen2 = labelLineModel.get("length2"), midAngle = (layout.startAngle + layout.endAngle) / 2,
                dx = Math.cos(midAngle), dy = Math.sin(midAngle);
              cx = layout.cx, cy = layout.cy;
              var isLabelInside = "inside" === labelPosition || "inner" === labelPosition;
              if ("center" === labelPosition) textX = layout.cx, textY = layout.cy, textAlign = "center"; else {
                var x1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dx : layout.r * dx) + cx,
                  y1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dy : layout.r * dy) + cy;
                if (textX = x1 + 3 * dx, textY = y1 + 3 * dy, !isLabelInside) {
                  var x2 = x1 + dx * (labelLineLen + r - layout.r), y2 = y1 + dy * (labelLineLen + r - layout.r),
                    x3 = x2 + (dx < 0 ? -1 : 1) * labelLineLen2, y3 = y2;
                  textX = x3 + (dx < 0 ? -5 : 5), textY = y3, linePoints = [[x1, y1], [x2, y2], [x3, y3]]
                }
                textAlign = isLabelInside ? "center" : dx > 0 ? "left" : "right"
              }
              var font = labelModel.getModel("textStyle").getFont(),
                labelRotate = labelModel.get("rotate") ? dx < 0 ? -midAngle + Math.PI : -midAngle : 0,
                text = seriesModel.getFormattedLabel(idx, "normal") || data.getName(idx),
                textRect = textContain.getBoundingRect(text, font, textAlign, "top");
              hasLabelRotate = !!labelRotate, layout.label = {
                x: textX,
                y: textY,
                position: labelPosition,
                height: textRect.height,
                len: labelLineLen,
                len2: labelLineLen2,
                linePoints: linePoints,
                textAlign: textAlign,
                verticalAlign: "middle",
                font: font,
                rotation: labelRotate
              }, isLabelInside || labelLayoutList.push(layout.label)
            }), !hasLabelRotate && seriesModel.get("avoidLabelOverlap") && avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight)
          }
        }),define("echarts/component/axis/cartesianAxisHelper", ["require", "zrender/core/util"], function (require) {
          var zrUtil = require("zrender/core/util"), helper = {};
          return helper.layout = function (gridModel, axisModel, opt) {
            function getZero(dim, val) {
              var theAxis = grid.getAxis(dim);
              return theAxis.toGlobalCoord(theAxis.dataToCoord(0))
            }
            
            opt = opt || {};
            var grid = gridModel.coordinateSystem, axis = axisModel.axis, layout = {}, rawAxisPosition = axis.position,
              axisPosition = axis.onZero ? "onZero" : rawAxisPosition, axisDim = axis.dim, rect = grid.getRect(),
              rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height],
              axisOffset = axisModel.get("offset") || 0, posMap = {
                x: {top: rectBound[2] - axisOffset, bottom: rectBound[3] + axisOffset},
                y: {left: rectBound[0] - axisOffset, right: rectBound[1] + axisOffset}
              };
            posMap.x.onZero = Math.max(Math.min(getZero("y"), posMap.x.bottom), posMap.x.top), posMap.y.onZero = Math.max(Math.min(getZero("x"), posMap.y.right), posMap.y.left), layout.position = ["y" === axisDim ? posMap.y[axisPosition] : rectBound[0], "x" === axisDim ? posMap.x[axisPosition] : rectBound[3]], layout.rotation = Math.PI / 2 * ("x" === axisDim ? 0 : 1);
            var dirMap = {top: -1, bottom: 1, left: -1, right: 1};
            layout.labelDirection = layout.tickDirection = layout.nameDirection = dirMap[rawAxisPosition], layout.labelOffset = axis.onZero ? posMap[axisDim][rawAxisPosition] - posMap[axisDim].onZero : 0, axisModel.get("axisTick.inside") && (layout.tickDirection = -layout.tickDirection), zrUtil.retrieve(opt.labelInside, axisModel.get("axisLabel.inside")) && (layout.labelDirection = -layout.labelDirection);
            var labelRotate = axisModel.get("axisLabel.rotate");
            return layout.labelRotate = "top" === axisPosition ? -labelRotate : labelRotate, layout.labelInterval = axis.getLabelInterval(), layout.z2 = 1, layout
          }, helper
        }),define("echarts/component/axisPointer/globalListener", ["require", "zrender/core/env", "zrender/core/util", "../../util/model"], function (require) {
          function initGlobalListeners(zr, api) {
            function useHandler(eventType, cb) {
              zr.on(eventType, function (e) {
                var dis = makeDispatchAction(api);
                each(get(zr).records, function (record) {
                  record && cb(record, e, dis.dispatchAction)
                }), dispatchTooltipFinally(dis.pendings, api)
              })
            }
            
            get(zr).initialized || (get(zr).initialized = !0, useHandler("click", zrUtil.curry(doEnter, "click")), useHandler("mousemove", zrUtil.curry(doEnter, "mousemove")), useHandler("globalout", onLeave))
          }
          
          function dispatchTooltipFinally(pendings, api) {
            var actuallyPayload, showLen = pendings.showTip.length, hideLen = pendings.hideTip.length;
            showLen ? actuallyPayload = pendings.showTip[showLen - 1] : hideLen && (actuallyPayload = pendings.hideTip[hideLen - 1]), actuallyPayload && (actuallyPayload.dispatchAction = null, api.dispatchAction(actuallyPayload))
          }
          
          function onLeave(record, e, dispatchAction) {
            record.handler("leave", null, dispatchAction)
          }
          
          function doEnter(currTrigger, record, e, dispatchAction) {
            record.handler(currTrigger, e, dispatchAction)
          }
          
          function makeDispatchAction(api) {
            var pendings = {showTip: [], hideTip: []}, dispatchAction = function dispatchAction(payload) {
              var pendingList = pendings[payload.type];
              pendingList ? pendingList.push(payload) : (payload.dispatchAction = dispatchAction, api.dispatchAction(payload))
            };
            return {dispatchAction: dispatchAction, pendings: pendings}
          }
          
          var env = require("zrender/core/env"), zrUtil = require("zrender/core/util"),
            get = require("../../util/model").makeGetter(), each = zrUtil.each, globalListener = {};
          return globalListener.register = function (key, api, handler) {
            if (!env.node) {
              var zr = api.getZr();
              get(zr).records || (get(zr).records = {}), initGlobalListeners(zr, api);
              var record = get(zr).records[key] || (get(zr).records[key] = {});
              record.handler = handler
            }
          }, globalListener.unregister = function (key, api) {
            if (!env.node) {
              var zr = api.getZr(), record = (get(zr).records || {})[key];
              record && (get(zr).records[key] = null)
            }
          }, globalListener
        }),define("echarts/chart/helper/Line", ["require", "../../util/symbol", "zrender/core/vector", "./LinePath", "../../util/graphic", "zrender/core/util", "../../util/number"], function (require) {
          function makeSymbolTypeKey(symbolCategory) {
            return "_" + symbolCategory + "Type"
          }
          
          function createSymbol(name, lineData, idx) {
            var color = lineData.getItemVisual(idx, "color"), symbolType = lineData.getItemVisual(idx, name),
              symbolSize = lineData.getItemVisual(idx, name + "Size");
            if (symbolType && "none" !== symbolType) {
              zrUtil.isArray(symbolSize) || (symbolSize = [symbolSize, symbolSize]);
              var symbolPath = symbolUtil.createSymbol(symbolType, -symbolSize[0] / 2, -symbolSize[1] / 2, symbolSize[0], symbolSize[1], color);
              return symbolPath.name = name, symbolPath
            }
          }
          
          function createLine(points) {
            var line = new LinePath({name: "line"});
            return setLinePoints(line.shape, points), line
          }
          
          function setLinePoints(targetShape, points) {
            var p1 = points[0], p2 = points[1], cp1 = points[2];
            targetShape.x1 = p1[0], targetShape.y1 = p1[1], targetShape.x2 = p2[0], targetShape.y2 = p2[1], targetShape.percent = 1, cp1 ? (targetShape.cpx1 = cp1[0], targetShape.cpy1 = cp1[1]) : (targetShape.cpx1 = NaN, targetShape.cpy1 = NaN)
          }
          
          function updateSymbolAndLabelBeforeLineUpdate() {
            var lineGroup = this, symbolFrom = lineGroup.childOfName("fromSymbol"),
              symbolTo = lineGroup.childOfName("toSymbol"), label = lineGroup.childOfName("label");
            if (symbolFrom || symbolTo || !label.ignore) {
              for (var invScale = 1, parentNode = this.parent; parentNode;)parentNode.scale && (invScale /= parentNode.scale[0]), parentNode = parentNode.parent;
              var line = lineGroup.childOfName("line");
              if (this.__dirty || line.__dirty) {
                var percent = line.shape.percent, fromPos = line.pointAt(0), toPos = line.pointAt(percent),
                  d = vector.sub([], toPos, fromPos);
                if (vector.normalize(d, d), symbolFrom) {
                  symbolFrom.attr("position", fromPos);
                  var tangent = line.tangentAt(0);
                  symbolFrom.attr("rotation", Math.PI / 2 - Math.atan2(tangent[1], tangent[0])), symbolFrom.attr("scale", [invScale * percent, invScale * percent])
                }
                if (symbolTo) {
                  symbolTo.attr("position", toPos);
                  var tangent = line.tangentAt(1);
                  symbolTo.attr("rotation", -Math.PI / 2 - Math.atan2(tangent[1], tangent[0])), symbolTo.attr("scale", [invScale * percent, invScale * percent])
                }
                if (!label.ignore) {
                  label.attr("position", toPos);
                  var textPosition, textAlign, textVerticalAlign, distance = 5 * invScale;
                  if ("end" === label.__position) textPosition = [d[0] * distance + toPos[0], d[1] * distance + toPos[1]], textAlign = d[0] > .8 ? "left" : d[0] < -.8 ? "right" : "center", textVerticalAlign = d[1] > .8 ? "top" : d[1] < -.8 ? "bottom" : "middle"; else if ("middle" === label.__position) {
                    var halfPercent = percent / 2, tangent = line.tangentAt(halfPercent), n = [tangent[1], -tangent[0]],
                      cp = line.pointAt(halfPercent);
                    n[1] > 0 && (n[0] = -n[0], n[1] = -n[1]), textPosition = [cp[0] + n[0] * distance, cp[1] + n[1] * distance], textAlign = "center", textVerticalAlign = "bottom";
                    var rotation = -Math.atan2(tangent[1], tangent[0]);
                    toPos[0] < fromPos[0] && (rotation = Math.PI + rotation), label.attr("rotation", rotation)
                  } else textPosition = [-d[0] * distance + fromPos[0], -d[1] * distance + fromPos[1]], textAlign = d[0] > .8 ? "right" : d[0] < -.8 ? "left" : "center", textVerticalAlign = d[1] > .8 ? "bottom" : d[1] < -.8 ? "top" : "middle";
                  label.attr({
                    style: {
                      textVerticalAlign: label.__verticalAlign || textVerticalAlign,
                      textAlign: label.__textAlign || textAlign
                    }, position: textPosition, scale: [invScale, invScale]
                  })
                }
              }
            }
          }
          
          function Line(lineData, idx, seriesScope) {
            graphic.Group.call(this), this._createLine(lineData, idx, seriesScope)
          }
          
          var symbolUtil = require("../../util/symbol"), vector = require("zrender/core/vector"),
            LinePath = require("./LinePath"), graphic = require("../../util/graphic"),
            zrUtil = require("zrender/core/util"), numberUtil = require("../../util/number"),
            SYMBOL_CATEGORIES = ["fromSymbol", "toSymbol"], lineProto = Line.prototype;
          return lineProto.beforeUpdate = updateSymbolAndLabelBeforeLineUpdate, lineProto._createLine = function (lineData, idx, seriesScope) {
            var seriesModel = lineData.hostModel, linePoints = lineData.getItemLayout(idx),
              line = createLine(linePoints);
            line.shape.percent = 0, graphic.initProps(line, {shape: {percent: 1}}, seriesModel, idx), this.add(line);
            var label = new graphic.Text({name: "label"});
            this.add(label), zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
              var symbol = createSymbol(symbolCategory, lineData, idx);
              this.add(symbol), this[makeSymbolTypeKey(symbolCategory)] = lineData.getItemVisual(idx, symbolCategory)
            }, this), this._updateCommonStl(lineData, idx, seriesScope)
          }, lineProto.updateData = function (lineData, idx, seriesScope) {
            var seriesModel = lineData.hostModel, line = this.childOfName("line"),
              linePoints = lineData.getItemLayout(idx), target = {shape: {}};
            setLinePoints(target.shape, linePoints), graphic.updateProps(line, target, seriesModel, idx), zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
              var symbolType = lineData.getItemVisual(idx, symbolCategory), key = makeSymbolTypeKey(symbolCategory);
              if (this[key] !== symbolType) {
                this.remove(this.childOfName(symbolCategory));
                var symbol = createSymbol(symbolCategory, lineData, idx);
                this.add(symbol)
              }
              this[key] = symbolType
            }, this), this._updateCommonStl(lineData, idx, seriesScope)
          }, lineProto._updateCommonStl = function (lineData, idx, seriesScope) {
            var seriesModel = lineData.hostModel, line = this.childOfName("line"),
              lineStyle = seriesScope && seriesScope.lineStyle,
              hoverLineStyle = seriesScope && seriesScope.hoverLineStyle,
              labelModel = seriesScope && seriesScope.labelModel,
              hoverLabelModel = seriesScope && seriesScope.hoverLabelModel;
            if (!seriesScope || lineData.hasItemOption) {
              var itemModel = lineData.getItemModel(idx);
              lineStyle = itemModel.getModel("lineStyle.normal").getLineStyle(), hoverLineStyle = itemModel.getModel("lineStyle.emphasis").getLineStyle(), labelModel = itemModel.getModel("label.normal"), hoverLabelModel = itemModel.getModel("label.emphasis")
            }
            var visualColor = lineData.getItemVisual(idx, "color"),
              visualOpacity = zrUtil.retrieve(lineData.getItemVisual(idx, "opacity"), lineStyle.opacity, 1);
            line.useStyle(zrUtil.defaults({
              strokeNoScale: !0,
              fill: "none",
              stroke: visualColor,
              opacity: visualOpacity
            }, lineStyle)), line.hoverStyle = hoverLineStyle, zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
              var symbol = this.childOfName(symbolCategory);
              symbol && (symbol.setColor(visualColor), symbol.setStyle({opacity: visualOpacity}))
            }, this);
            var defaultLabelColor, defaultText, showLabel = labelModel.getShallow("show"),
              hoverShowLabel = hoverLabelModel.getShallow("show"), label = this.childOfName("label");
            if (showLabel || hoverShowLabel) {
              var rawVal = seriesModel.getRawValue(idx);
              defaultText = null == rawVal ? defaultText = lineData.getName(idx) : isFinite(rawVal) ? numberUtil.round(rawVal) : rawVal, defaultLabelColor = visualColor || "#000"
            }
            if (showLabel) {
              var textStyleModel = labelModel.getModel("textStyle");
              label.setStyle({
                text: zrUtil.retrieve(seriesModel.getFormattedLabel(idx, "normal", lineData.dataType), defaultText),
                textFont: textStyleModel.getFont(),
                fill: textStyleModel.getTextColor() || defaultLabelColor
              }), label.__textAlign = textStyleModel.get("align"), label.__verticalAlign = textStyleModel.get("baseline"), label.__position = labelModel.get("position")
            } else label.setStyle("text", "");
            if (hoverShowLabel) {
              var textStyleHoverModel = hoverLabelModel.getModel("textStyle");
              label.hoverStyle = {
                text: zrUtil.retrieve(seriesModel.getFormattedLabel(idx, "emphasis", lineData.dataType), defaultText),
                textFont: textStyleHoverModel.getFont(),
                fill: textStyleHoverModel.getTextColor() || defaultLabelColor
              }
            } else label.hoverStyle = {text: ""};
            label.ignore = !showLabel && !hoverShowLabel, graphic.setHoverStyle(this)
          }, lineProto.updateLayout = function (lineData, idx) {
            this.setLinePoints(lineData.getItemLayout(idx))
          }, lineProto.setLinePoints = function (points) {
            var linePath = this.childOfName("line");
            setLinePoints(linePath.shape, points), linePath.dirty()
          }, zrUtil.inherits(Line, graphic.Group), Line
        }),define("echarts/component/axisPointer/viewHelper", ["require", "zrender/core/util", "../../util/graphic", "zrender/contain/text", "../../util/format", "zrender/core/matrix", "../../coord/axisHelper", "../axis/AxisBuilder"], function (require) {
          function confineInContainer(position, width, height, api) {
            var viewWidth = api.getWidth(), viewHeight = api.getHeight();
            position[0] = Math.min(position[0] + width, viewWidth) - width, position[1] = Math.min(position[1] + height, viewHeight) - height, position[0] = Math.max(position[0], 0), position[1] = Math.max(position[1], 0)
          }
          
          var zrUtil = require("zrender/core/util"), graphic = require("../../util/graphic"),
            textContain = require("zrender/contain/text"), formatUtil = require("../../util/format"),
            matrix = require("zrender/core/matrix"), axisHelper = require("../../coord/axisHelper"),
            AxisBuilder = require("../axis/AxisBuilder"), helper = {};
          return helper.buildElStyle = function (axisPointerModel) {
            var style, axisPointerType = axisPointerModel.get("type"),
              styleModel = axisPointerModel.getModel(axisPointerType + "Style");
            return "line" === axisPointerType ? (style = styleModel.getLineStyle(), style.fill = null) : "shadow" === axisPointerType && (style = styleModel.getAreaStyle(), style.stroke = null), style
          }, helper.buildLabelElOption = function (elOption, axisModel, axisPointerModel, api, labelPos) {
            var value = axisPointerModel.get("value"),
              text = helper.getValueLabel(value, axisModel.axis, axisModel.ecModel, axisPointerModel.get("seriesDataIndices"), {
                precision: axisPointerModel.get("label.precision"),
                formatter: axisPointerModel.get("label.formatter")
              }), labelModel = axisPointerModel.getModel("label"), textStyleModel = labelModel.getModel("textStyle"),
              paddings = formatUtil.normalizeCssArray(labelModel.get("padding") || 0), font = textStyleModel.getFont(),
              textRect = textContain.getBoundingRect(text, font, labelPos.textAlign, labelPos.textBaseline),
              position = labelPos.position, width = textRect.width + paddings[1] + paddings[3],
              height = textRect.height + paddings[0] + paddings[2], align = labelPos.align;
            "right" === align && (position[0] -= width), "center" === align && (position[0] -= width / 2);
            var verticalAlign = labelPos.verticalAlign;
            "bottom" === verticalAlign && (position[1] -= height), "middle" === verticalAlign && (position[1] -= height / 2), confineInContainer(position, width, height, api);
            var bgColor = labelModel.get("backgroundColor");
            bgColor && "auto" !== bgColor || (bgColor = axisModel.get("axisLine.lineStyle.color")), elOption.label = {
              shape: {
                x: 0,
                y: 0,
                width: width,
                height: height,
                r: labelModel.get("borderRadius")
              },
              position: position.slice(),
              style: {
                text: text,
                textFont: font,
                textFill: textStyleModel.getTextColor(),
                textPosition: "inside",
                fill: bgColor,
                stroke: labelModel.get("borderColor") || "transparent",
                lineWidth: labelModel.get("borderWidth") || 0,
                shadowBlur: labelModel.get("shadowBlur"),
                shadowColor: labelModel.get("shadowColor"),
                shadowOffsetX: labelModel.get("shadowOffsetX"),
                shadowOffsetY: labelModel.get("shadowOffsetY")
              },
              z2: 10
            }
          }, helper.getValueLabel = function (value, axis, ecModel, seriesDataIndices, opt) {
            var text = axis.scale.getLabel(value, {precision: opt.precision}), formatter = opt.formatter;
            if (formatter) {
              var params = {value: axisHelper.getAxisRawValue(axis, value), seriesData: []};
              zrUtil.each(seriesDataIndices, function (idxItem) {
                var series = ecModel.getSeriesByIndex(idxItem.seriesIndex), dataIndex = idxItem.dataIndexInside,
                  dataParams = series && series.getDataParams(dataIndex);
                dataParams && params.seriesData.push(dataParams)
              }), zrUtil.isString(formatter) ? text = formatter.replace("{value}", text) : zrUtil.isFunction(formatter) && (text = formatter(params))
            }
            return text
          }, helper.getTransformedPosition = function (axis, value, layoutInfo) {
            var transform = matrix.create();
            return matrix.rotate(transform, transform, layoutInfo.rotation), matrix.translate(transform, transform, layoutInfo.position), graphic.applyTransform([axis.dataToCoord(value), (layoutInfo.labelOffset || 0) + (layoutInfo.labelDirection || 1) * (layoutInfo.labelMargin || 0)], transform)
          }, helper.buildCartesianSingleLabelElOption = function (value, elOption, layoutInfo, axisModel, axisPointerModel, api) {
            var textLayout = AxisBuilder.innerTextLayout(layoutInfo.rotation, 0, layoutInfo.labelDirection);
            layoutInfo.labelMargin = axisPointerModel.get("label.margin"), helper.buildLabelElOption(elOption, axisModel, axisPointerModel, api, {
              position: helper.getTransformedPosition(axisModel.axis, value, layoutInfo),
              align: textLayout.textAlign,
              verticalAlign: textLayout.textVerticalAlign
            })
          }, helper.makeLineShape = function (p1, p2, xDimIndex) {
            return xDimIndex = xDimIndex || 0, {
              x1: p1[xDimIndex],
              y1: p1[1 - xDimIndex],
              x2: p2[xDimIndex],
              y2: p2[1 - xDimIndex]
            }
          }, helper.makeRectShape = function (xy, wh, xDimIndex) {
            return xDimIndex = xDimIndex || 0, {
              x: xy[xDimIndex],
              y: xy[1 - xDimIndex],
              width: wh[xDimIndex],
              height: wh[1 - xDimIndex]
            }
          }, helper.makeSectorShape = function (cx, cy, r0, r, startAngle, endAngle) {
            return {cx: cx, cy: cy, r0: r0, r: r, startAngle: startAngle, endAngle: endAngle, clockwise: !0}
          }, helper
        }),define("echarts/component/axisPointer/BaseAxisPointer", ["require", "zrender/core/util", "../../util/clazz", "../../util/graphic", "../../util/model", "./modelHelper", "zrender/core/event", "../../util/throttle"], function (require) {
          function BaseAxisPointer() {
          }
          
          function updateProps(animationModel, moveAnimation, el, props) {
            propsEqual(get(el).lastProp, props) || (get(el).lastProp = props, moveAnimation ? graphic.updateProps(el, props, animationModel) : (el.stopAnimation(), el.attr(props)))
          }
          
          function propsEqual(lastProps, newProps) {
            if (zrUtil.isObject(lastProps) && zrUtil.isObject(newProps)) {
              var equals = !0;
              return zrUtil.each(newProps, function (item, key) {
                equals &= propsEqual(lastProps[key], item)
              }), !!equals
            }
            return lastProps === newProps
          }
          
          function updateLabelShowHide(labelEl, axisPointerModel) {
            labelEl[axisPointerModel.get("label.show") ? "show" : "hide"]()
          }
          
          function getHandleTransProps(trans) {
            return {position: trans.position.slice(), rotation: trans.rotation || 0}
          }
          
          function createIcon(handleModel, handlers) {
            var iconStr = handleModel.get("icon"), style = {x: -1, y: -1, width: 2, height: 2},
              opt = zrUtil.extend({style: {strokeNoScale: !0}, rectHover: !0, cursor: "move", draggable: !0}, handlers);
            return 0 === iconStr.indexOf("image://") ? (style.image = iconStr.slice(8), opt.style = style, new graphic.Image(opt)) : graphic.makePath(iconStr.replace("path://", ""), opt, style, "center")
          }
          
          function updateMandatoryProps(group, axisPointerModel, silent) {
            var z = axisPointerModel.get("z"), zlevel = axisPointerModel.get("zlevel");
            group && group.traverse(function (el) {
              "group" !== el.type && (null != z && (el.z = z), null != zlevel && (el.zlevel = zlevel), el.silent = silent)
            })
          }
          
          var zrUtil = require("zrender/core/util"), clazzUtil = require("../../util/clazz"),
            graphic = require("../../util/graphic"), get = require("../../util/model").makeGetter(),
            axisPointerModelHelper = require("./modelHelper"), eventTool = require("zrender/core/event"),
            throttle = require("../../util/throttle"), clone = zrUtil.clone, bind = zrUtil.bind;
          return BaseAxisPointer.prototype = {
            _group: null,
            _lastGraphicKey: null,
            _handle: null,
            _dragging: !1,
            _lastValue: null,
            _lastStatus: null,
            _payloadInfo: null,
            animationThreshold: 15,
            render: function (axisModel, axisPointerModel, api, forceRender) {
              var value = axisPointerModel.get("value"), status = axisPointerModel.get("status");
              if (this._axisModel = axisModel, this._axisPointerModel = axisPointerModel, this._api = api, forceRender || this._lastValue !== value || this._lastStatus !== status) {
                this._lastValue = value, this._lastStatus = status;
                var group = this._group, handle = this._handle;
                if (!status || "hide" === status)return group && group.hide(), void(handle && handle.hide());
                group && group.show(), handle && handle.show();
                var elOption = {};
                this.makeElOption(elOption, value, axisModel, axisPointerModel, api);
                var graphicKey = elOption.graphicKey;
                graphicKey !== this._lastGraphicKey && this.clear(api), this._lastGraphicKey = graphicKey;
                var moveAnimation = this._moveAnimation = this.determineAnimation(axisModel, axisPointerModel);
                if (group) {
                  var doUpdateProps = zrUtil.curry(updateProps, axisPointerModel, moveAnimation);
                  this.updatePointerEl(group, elOption, doUpdateProps, axisPointerModel), this.updateLabelEl(group, elOption, doUpdateProps, axisPointerModel)
                } else group = this._group = new graphic.Group, this.createPointerEl(group, elOption, axisModel, axisPointerModel), this.createLabelEl(group, elOption, axisModel, axisPointerModel), api.getZr().add(group);
                updateMandatoryProps(group, axisPointerModel, !0), this._renderHandle(value)
              }
            },
            remove: function (api) {
              this.clear(api)
            },
            dispose: function (api) {
              this.clear(api)
            },
            determineAnimation: function (axisModel, axisPointerModel) {
              var animation = axisPointerModel.get("animation"), axis = axisModel.axis,
                isCategoryAxis = "category" === axis.type, useSnap = axisPointerModel.get("snap");
              if (!useSnap && !isCategoryAxis)return !1;
              if ("auto" === animation || null == animation) {
                var animationThreshold = this.animationThreshold;
                if (isCategoryAxis && axis.getBandWidth() > animationThreshold)return !0;
                if (useSnap) {
                  var seriesDataCount = axisPointerModelHelper.getAxisInfo(axisModel).seriesDataCount,
                    axisExtent = axis.getExtent();
                  return Math.abs(axisExtent[0] - axisExtent[1]) / seriesDataCount > animationThreshold
                }
                return !1
              }
              return animation === !0
            },
            makeElOption: function (elOption, value, axisModel, axisPointerModel, api) {
            },
            createPointerEl: function (group, elOption, axisModel, axisPointerModel) {
              var pointerOption = elOption.pointer;
              if (pointerOption) {
                var pointerEl = get(group).pointerEl = new graphic[pointerOption.type](clone(elOption.pointer));
                group.add(pointerEl)
              }
            },
            createLabelEl: function (group, elOption, axisModel, axisPointerModel) {
              if (elOption.label) {
                var labelEl = get(group).labelEl = new graphic.Rect(clone(elOption.label));
                group.add(labelEl), updateLabelShowHide(labelEl, axisPointerModel)
              }
            },
            updatePointerEl: function (group, elOption, updateProps) {
              var pointerEl = get(group).pointerEl;
              pointerEl && (pointerEl.setStyle(elOption.pointer.style), updateProps(pointerEl, {shape: elOption.pointer.shape}))
            },
            updateLabelEl: function (group, elOption, updateProps, axisPointerModel) {
              var labelEl = get(group).labelEl;
              labelEl && (labelEl.setStyle(elOption.label.style), updateProps(labelEl, {
                shape: elOption.label.shape,
                position: elOption.label.position
              }), updateLabelShowHide(labelEl, axisPointerModel))
            },
            _renderHandle: function (value) {
              if (!this._dragging && this.updateHandleTransform) {
                var axisPointerModel = this._axisPointerModel, zr = this._api.getZr(), handle = this._handle,
                  handleModel = axisPointerModel.getModel("handle"), status = axisPointerModel.get("status");
                if (!handleModel.get("show") || !status || "hide" === status)return handle && zr.remove(handle), void(this._handle = null);
                var isInit;
                this._handle || (isInit = !0, handle = this._handle = createIcon(handleModel, {
                  onmousemove: function (e) {
                    eventTool.stop(e.event)
                  },
                  onmousedown: bind(this._onHandleDragMove, this, 0, 0),
                  drift: bind(this._onHandleDragMove, this),
                  ondragend: bind(this._onHandleDragEnd, this)
                }), zr.add(handle)), updateMandatoryProps(handle, axisPointerModel, !1);
                var includeStyles = ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
                handle.setStyle(handleModel.getItemStyle(null, includeStyles));
                var handleSize = handleModel.get("size");
                zrUtil.isArray(handleSize) || (handleSize = [handleSize, handleSize]), handle.attr("scale", [handleSize[0] / 2, handleSize[1] / 2]), throttle.createOrUpdate(this, "_doDispatchAxisPointer", handleModel.get("throttle") || 0, "fixRate"), this._moveHandleToValue(value, isInit)
              }
            },
            _moveHandleToValue: function (value, isInit) {
              updateProps(this._axisPointerModel, !isInit && this._moveAnimation, this._handle, getHandleTransProps(this.getHandleTransform(value, this._axisModel, this._axisPointerModel)))
            },
            _onHandleDragMove: function (dx, dy) {
              var handle = this._handle;
              if (handle) {
                this._dragging = !0;
                var trans = this.updateHandleTransform(getHandleTransProps(handle), [dx, dy], this._axisModel, this._axisPointerModel);
                this._payloadInfo = trans, handle.stopAnimation(), handle.attr(getHandleTransProps(trans)), get(handle).lastProp = null, this._doDispatchAxisPointer()
              }
            },
            _doDispatchAxisPointer: function () {
              var handle = this._handle;
              if (handle) {
                var payloadInfo = this._payloadInfo, payload = {
                  type: "updateAxisPointer",
                  x: payloadInfo.cursorPoint[0],
                  y: payloadInfo.cursorPoint[1],
                  tooltipOption: payloadInfo.tooltipOption,
                  highDownKey: "axisPointerHandle"
                }, axis = this._axisModel.axis;
                payload[axis.dim + "AxisId"] = this._axisModel.id, this._api.dispatchAction(payload)
              }
            },
            _onHandleDragEnd: function (moveAnimation) {
              this._dragging = !1;
              var handle = this._handle;
              if (handle) {
                var value = this._axisPointerModel.get("value");
                this._moveHandleToValue(value), this._api.dispatchAction({type: "hideTip"})
              }
            },
            getHandleTransform: null,
            updateHandleTransform: null,
            clear: function (api) {
              this._lastValue = null, this._lastStatus = null;
              var zr = api.getZr(), group = this._group, handle = this._handle;
              zr && group && (this._lastGraphicKey = null, group && zr.remove(group), handle && zr.remove(handle), this._group = null, this._handle = null, this._payloadInfo = null)
            },
            doClear: function () {
            },
            buildLabel: function (xy, wh, xDimIndex) {
              return xDimIndex = xDimIndex || 0, {
                x: xy[xDimIndex],
                y: xy[1 - xDimIndex],
                width: wh[xDimIndex],
                height: wh[1 - xDimIndex]
              }
            }
          }, BaseAxisPointer.prototype.constructor = BaseAxisPointer, clazzUtil.enableClassExtend(BaseAxisPointer), BaseAxisPointer
        }),define("echarts/chart/helper/LinePath", ["require", "../../util/graphic", "zrender/core/vector"], function (require) {
          function isLine(shape) {
            return isNaN(+shape.cpx1) || isNaN(+shape.cpy1)
          }
          
          var graphic = require("../../util/graphic"), vec2 = require("zrender/core/vector"),
            straightLineProto = graphic.Line.prototype, bezierCurveProto = graphic.BezierCurve.prototype;
          return graphic.extendShape({
            type: "ec-line",
            style: {stroke: "#000", fill: null},
            shape: {x1: 0, y1: 0, x2: 0, y2: 0, percent: 1, cpx1: null, cpy1: null},
            buildPath: function (ctx, shape) {
              (isLine(shape) ? straightLineProto : bezierCurveProto).buildPath(ctx, shape)
            },
            pointAt: function (t) {
              return isLine(this.shape) ? straightLineProto.pointAt.call(this, t) : bezierCurveProto.pointAt.call(this, t)
            },
            tangentAt: function (t) {
              var shape = this.shape,
                p = isLine(shape) ? [shape.x2 - shape.x1, shape.y2 - shape.y1] : bezierCurveProto.tangentAt.call(this, t);
              return vec2.normalize(p, p)
            }
          })
        }),define("echarts/component/tooltip/TooltipContent", ["require", "zrender/core/util", "zrender/tool/color", "zrender/core/event", "../../util/format", "zrender/core/env"], function (require) {
          function assembleTransition(duration) {
            var transitionCurve = "cubic-bezier(0.23, 1, 0.32, 1)",
              transitionText = "left " + duration + "s " + transitionCurve + ",top " + duration + "s " + transitionCurve;
            return zrUtil.map(vendors, function (vendorPrefix) {
              return vendorPrefix + "transition:" + transitionText
            }).join(";")
          }
          
          function assembleFont(textStyleModel) {
            var cssText = [], fontSize = textStyleModel.get("fontSize"), color = textStyleModel.getTextColor();
            return color && cssText.push("color:" + color), cssText.push("font:" + textStyleModel.getFont()), fontSize && cssText.push("line-height:" + Math.round(3 * fontSize / 2) + "px"), each(["decoration", "align"], function (name) {
              var val = textStyleModel.get(name);
              val && cssText.push("text-" + name + ":" + val)
            }), cssText.join(";")
          }
          
          function assembleCssText(tooltipModel) {
            var cssText = [], transitionDuration = tooltipModel.get("transitionDuration"),
              backgroundColor = tooltipModel.get("backgroundColor"),
              textStyleModel = tooltipModel.getModel("textStyle"), padding = tooltipModel.get("padding");
            return transitionDuration && cssText.push(assembleTransition(transitionDuration)), backgroundColor && (env.canvasSupported ? cssText.push("background-Color:" + backgroundColor) : (cssText.push("background-Color:#" + zrColor.toHex(backgroundColor)), cssText.push("filter:alpha(opacity=70)"))), each(["width", "color", "radius"], function (name) {
              var borderName = "border-" + name, camelCase = toCamelCase(borderName), val = tooltipModel.get(camelCase);
              null != val && cssText.push(borderName + ":" + val + ("color" === name ? "" : "px"))
            }), cssText.push(assembleFont(textStyleModel)), null != padding && cssText.push("padding:" + formatUtil.normalizeCssArray(padding).join("px ") + "px"), cssText.join(";") + ";"
          }
          
          function TooltipContent(container, api) {
            var el = document.createElement("div"), zr = this._zr = api.getZr();
            this.el = el, this._x = api.getWidth() / 2, this._y = api.getHeight() / 2, container.appendChild(el), this._container = container, this._show = !1, this._hideTimeout;
            var self = this;
            el.onmouseenter = function () {
              self._enterable && (clearTimeout(self._hideTimeout), self._show = !0), self._inContent = !0
            }, el.onmousemove = function (e) {
              if (e = e || window.event, !self._enterable) {
                var handler = zr.handler;
                eventUtil.normalizeEvent(container, e, !0), handler.dispatch("mousemove", e)
              }
            }, el.onmouseleave = function () {
              self._enterable && self._show && self.hideLater(self._hideDelay), self._inContent = !1
            }
          }
          
          var zrUtil = require("zrender/core/util"), zrColor = require("zrender/tool/color"),
            eventUtil = require("zrender/core/event"), formatUtil = require("../../util/format"), each = zrUtil.each,
            toCamelCase = formatUtil.toCamelCase, env = require("zrender/core/env"),
            vendors = ["", "-webkit-", "-moz-", "-o-"],
            gCssText = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;";
          return TooltipContent.prototype = {
            constructor: TooltipContent, _enterable: !0, update: function () {
              var container = this._container,
                stl = container.currentStyle || document.defaultView.getComputedStyle(container),
                domStyle = container.style;
              "absolute" !== domStyle.position && "absolute" !== stl.position && (domStyle.position = "relative")
            }, show: function (tooltipModel) {
              clearTimeout(this._hideTimeout);
              var el = this.el;
              el.style.cssText = gCssText + assembleCssText(tooltipModel) + ";left:" + this._x + "px;top:" + this._y + "px;" + (tooltipModel.get("extraCssText") || ""), el.style.display = el.innerHTML ? "block" : "none", this._show = !0
            }, setContent: function (content) {
              this.el.innerHTML = null == content ? "" : content
            }, setEnterable: function (enterable) {
              this._enterable = enterable
            }, getSize: function () {
              var el = this.el;
              return [el.clientWidth, el.clientHeight]
            }, moveTo: function (x, y) {
              var viewportRoot, zr = this._zr;
              zr && zr.painter && (viewportRoot = zr.painter.getViewportRoot()) && (x += viewportRoot.offsetLeft || 0, y += viewportRoot.offsetTop || 0);
              var style = this.el.style;
              style.left = x + "px", style.top = y + "px", this._x = x, this._y = y
            }, hide: function () {
              this.el.style.display = "none", this._show = !1
            }, hideLater: function (time) {
              !this._show || this._inContent && this._enterable || (time ? (this._hideDelay = time, this._show = !1, this._hideTimeout = setTimeout(zrUtil.bind(this.hide, this), time)) : this.hide())
            }, isShow: function () {
              return this._show
            }
          }, TooltipContent
        }),define("zrender", ["zrender/zrender"], function (zrender) {
          return zrender
        }),define("echarts", ["echarts/echarts"], function (echarts) {
          return echarts
        });
        var echarts = require("echarts");
        return echarts.graphic = require("echarts/util/graphic"), echarts.number = require("echarts/util/number"), echarts.format = require("echarts/util/format"), require("echarts/chart/bar"), require("echarts/chart/line"), require("echarts/chart/pie"), require("echarts/component/gridSimple"), require("echarts/component/title"), require("echarts/component/legend"), require("echarts/component/tooltip"), require("echarts/component/markPoint"), require("echarts/component/markLine"), require("zrender/vml/vml"), echarts
      })
    }).call(exports, function () {
      return this
    }())
  }, 129: function (module, exports) {
    module.exports = ["Asia/Shanghai|CST|+8", "Asia/Hong_Kong|HKT|+8", "America/New_York|EST EDT|-5 -4", "America/Toronto|EST EDT|-5 -4", "Asia/Singapore|SGT|+8", "Asia/Kolkata|IST|+5.5", "Europe/London|GMT BST|+0 +1", "Asia/Tokyo|JST|+9", "Europe/Berlin|CET CEST|+1 +2", "America/Chicago|CST CDT|-6 -5", "Europe/Madrid|CET CEST|+1 +2", "Europe/Zurich|CET CEST|+1 +2", "Europe/Amsterdam|CET CEST|+1 +2", "Europe/Paris|CET CEST|+1 +2", "Europe/Brussels|CET CEST|+1 +2", "Europe/Lisbon|WET WEST|+0 +1", "Europe/Copenhagen|CET CEST|+1 +2", "Europe/Helsinki|CET CEST|+1 +2", "GMT|GMT|+0", "Europe/Stockholm|CET CEST|+1 +2", "Europe/Oslo|CET CEST|+1 +2", "Europe/Rome|CET CEST|+1 +2", "Asia/Seoul|KST|+9", "Asia/Taipei|TST CST|+8 +8", "Australia/Sydney|EST|+10", "Mexico/General|CDT CST|-6 -5", "Brazil/East|BRT|-3", "Asia/Dubai|DST|+4", "Europe/Luxembourg|CET CEST|+1 +2", "Israel|IST IDT|+2 +3", "Africa/Harare|CAT|+2", "America/Mexico_City|CDT CST|-6 -5"]
  }
});