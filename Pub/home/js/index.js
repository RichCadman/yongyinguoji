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
    
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
        return arr2
      }
      return Array.from(arr)
    }
    
    var _jquery = __webpack_require__(30), _jquery2 = _interopRequireDefault(_jquery);
    __webpack_require__(126), __webpack_require__(127), __webpack_require__(128), __webpack_require__(29);
    var _setting = __webpack_require__(33), _funutil = __webpack_require__(88), _echarts = __webpack_require__(154),
      _echarts2 = _interopRequireDefault(_echarts), timeZoneDataList = __webpack_require__(156);
    module.exports = !function () {
      function initExchangeChart() {
        exchangeData && exchangeData.length > 0 && exchangeData.forEach(function (itemData) {
          if (null != itemData) {
            var exchangeName = itemData.exchangeName, utcOffset = itemData.utcOffset, dst = itemData.dst,
              minuteCapital = itemData.minuteCapital, showCode = itemData.showCode,
              jChartDiv = (0, _jquery2.default)(".chart").filter('[data-exchange="' + exchangeName + '"]');
            if (0 != jChartDiv.length) {
              var myChart = _echarts2.default.init(jChartDiv[0]), maxCount = jChartDiv.data("maxcount"), option = {
                tooltip: {trigger: "axis", axisPointer: {type: "line", animation: !1}},
                grid: {left: "10", right: "5", bottom: "5", top: "60"},
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
      
      (0, _jquery2.default)(".counter").counterUp();
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
      }, startIndexDataTimer = function startIndexDataTimer() {/*
        _jquery2.default.ajax({
          url: _setting.domainSetting.QuoteApiDomain + "api/quote/tickerRealTimes?tickerIds=" + encodeURIComponent(tickerIdList.join(",")),
          dataType: "json",
          success: indexDataTimeCallback
        }), setTimeout(startIndexDataTimer, 3e4)*/
      };
      setTimeout(startExchangeTimer, 6e4), setTimeout(startIndexDataTimer, 3e4), function () {
        var worldMap = (0, _jquery2.default)(".world-map"), mapNavItem = worldMap.find(".nav .item");
        mapNavItem.on({
          click: function (event) {
            (0, _jquery2.default)(document.body).scrollTop(worldMap.offset().top - (0, _jquery2.default)(".header").height());
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
      }(), function () {
        function isCompVisible(element) {
          var windowHeight = (0, _jquery2.default)(window).height(), rect = element.getBoundingClientRect(),
            topRate = (windowHeight - rect.top) / rect.height, bottomRate = rect.bottom / windowHeight;
          return bottomRate > .1 && bottomRate <= 1 || topRate > .1 && topRate <= 1
        }
        
        var exchangeChartDiv = (0, _jquery2.default)(".global-exchange > .cont");
        (0, _jquery2.default)(window).on({
          scroll: function () {
            // isCapitalShown || isCompVisible(exchangeChartDiv[0]) && (isCapitalShown = !0, initExchangeChart())
          }, load: function () {
            // isCapitalShown || isCompVisible(exchangeChartDiv[0]) && (isCapitalShown = !0, initExchangeChart())
          }
        })
      }(), function () {
        (0, _jquery2.default)(".global-exchange,.world-map").find(".chart,.data-card").on({
          click: function (event) {
            var tickerId = (0, _jquery2.default)(event.currentTarget).data("tickerid");
            null != tickerId && "" != tickerId && window.open("https://app.webull.com/ticker?id=" + tickerId + "&hl=" + language)
          }
        })
      }()
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
  }, 88: function (module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: !0}), exports.find = exports.getLocale = exports.getQuery = exports.getCookies = void 0;
    var _setting = __webpack_require__(33), getCookies = exports.getCookies = function (key) {
      var reg = new RegExp("[,; ]" + key + "=([^\\s,;]*)"), match = document.cookie.match(reg);
      return match && decodeURIComponent(match[1])
    }, getQuery = exports.getQuery = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"), result = window.location.search.substr(1).match(reg);
      return null != result ? decodeURIComponent(result[2]) : null
    };
    exports.getLocale = function () {
      var hl = getQuery(_setting.queryLanguageKey) || getCookies(_setting.languageKey) || "",
        languageSuffix = hl.split(/[-_]/)[0];
      return _setting.supportLanguage.indexOf(languageSuffix) === -1 && (languageSuffix = navigator.language.split(/[-_]/)[0], _setting.supportLanguage.indexOf(languageSuffix) === -1 && (languageSuffix = _setting.supportLanguage[0])), languageSuffix
    }, exports.find = function (array, callback) {
      var val = null;
      return null == array ? val : (array.forEach(function (item) {
        if (callback(item))return val = item
      }), val)
    }
  }, 126: function (module, exports) {
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
  }, 127: function (module, exports) {
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
  }, 128: function (module, exports) {
  }, 154: function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__(155)(1)
  }, 155: function (module, exports) {
    module.exports = echarts_3fb6b163
  }, 156: function (module, exports) {
    module.exports = ["Asia/Shanghai|CST|+8", "Asia/Hong_Kong|HKT|+8", "America/New_York|EST EDT|-5 -4", "America/Toronto|EST EDT|-5 -4", "Asia/Singapore|SGT|+8", "Asia/Kolkata|IST|+5.5", "Europe/London|GMT BST|+0 +1", "Asia/Tokyo|JST|+9", "Europe/Berlin|CET CEST|+1 +2", "America/Chicago|CST CDT|-6 -5", "Europe/Madrid|CET CEST|+1 +2", "Europe/Zurich|CET CEST|+1 +2", "Europe/Amsterdam|CET CEST|+1 +2", "Europe/Paris|CET CEST|+1 +2", "Europe/Brussels|CET CEST|+1 +2", "Europe/Lisbon|WET WEST|+0 +1", "Europe/Copenhagen|CET CEST|+1 +2", "Europe/Helsinki|CET CEST|+1 +2", "GMT|GMT|+0", "Europe/Stockholm|CET CEST|+1 +2", "Europe/Oslo|CET CEST|+1 +2", "Europe/Rome|CET CEST|+1 +2", "Asia/Seoul|KST|+9", "Asia/Taipei|TST CST|+8 +8", "Australia/Sydney|EST|+10", "Mexico/General|CDT CST|-6 -5", "Brazil/East|BRT|-3", "Asia/Dubai|DST|+4", "Europe/Luxembourg|CET CEST|+1 +2", "Israel|IST IDT|+2 +3", "Africa/Harare|CAT|+2", "America/Mexico_City|CDT CST|-6 -5"]
  }
});