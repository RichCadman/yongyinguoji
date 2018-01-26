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
  
  var _jquery = __webpack_require__(30), _jquery2 = _interopRequireDefault(_jquery);
  __webpack_require__(49), __webpack_require__(29);
  var _funutil = __webpack_require__(88), allHelpData = __webpack_require__(89), helpData = null;
  helpData = (0, _jquery2.default)(document.body).hasClass("en") ? allHelpData.en : allHelpData.zh, module.exports = !function () {
    function getQaCatalogList() {
      helpData.forEach(function (data) {
        qaTypeNav.append('<li class="qa-type" data-type="' + data.catalogId + '">' + data.catalogName + "</li>")
      })
    }
    
    function getQaTitleList(qaType) {
      titleList.css("display", "block"), titleList.empty(), helpData.forEach(function (catalogData) {
        catalogData.catalogId === qaType && (qaList = catalogData.qaList, qaList.forEach(function (qaData) {
          null != qaData.typeName && "" !== qaData.typeName && titleList.append('<p class="type-tit">' + qaData.typeName + "</p>");
          var liArr = qaData.list.map(function (data) {
            return null != data.title_link ? '<li><a class = "answer-item" target="_blank" data-answerid="' + data.id + '" href="' + data.title_link + '">' + data.title + "</a></li>" : '<li><a class = "answer-item" data-answerid="' + data.id + '">' + data.title + "</a></li>"
          });
          titleList.append('<ul class="list">' + liArr.join("") + "</ul>")
        }))
      })
    }
    
    function closeAnswerDetail() {
      overlay.css("display", "none"), answerDetail.removeClass("active"), brandNav2.empty()
    }
    
    function setTypeNavActive(qaType) {
      qaTypeNav.find(".qa-type").removeClass("active");
      var activeItem = qaTypeNav.find(".qa-type").filter('[data-type="' + qaType + '"]');
      activeItem.addClass("active"), brandNav1.html(activeItem.text()), brandNav2.empty()
    }
    
    function getQaDetail(answerId) {
      qaList && qaList.forEach(function (qaData) {
        var filterData = qaData.list.filter(function (data) {
          return data.id === answerId
        });
        if (filterData.length > 0) {
          var data = filterData[0];
          if (null != data.title_link)return;
          overlay.css("display", "block"), answerDetail.addClass("active"), answerDetail.empty(), answerDetail.append('<div class="close close-help"></div>\n            <article>\n              <div class="tit">' + data.title + "</div>\n              <div>" + (data.context.indexOf("<p>") === -1 ? "<p>" + data.context + "</p>" : data.context) + "</div>\n            </article>"), brandNav2.html("> " + data.title)
        }
      })
    }
    
    var brandNav1 = (0, _jquery2.default)(".brand-qa-1"), brandNav2 = (0, _jquery2.default)(".brand-qa-2"),
      titleList = (0, _jquery2.default)(".questions"), answerDetail = (0, _jquery2.default)(".answer"),
      qaTypeNav = (0, _jquery2.default)(".qa-list > .nav"), overlay = (0, _jquery2.default)(".overlay"),
      qaList = void 0;
    qaTypeNav.on("click", ".qa-type", function (event) {
      event.stopPropagation();
      var qaType = (0, _jquery2.default)(event.target).data("type");
      setTypeNavActive(qaType), getQaTitleList(qaType), closeAnswerDetail()
    }), titleList.on("click", ".answer-item", function (event) {
      event.stopPropagation(), getQaDetail((0, _jquery2.default)(event.target).data("answerid"))
    }), (0, _jquery2.default)("#helpDetail").on("click", ".close-help", closeAnswerDetail), function () {
      function initById(answerId) {
        var filterData = null, filterCatalogData = null;
        if (helpData.forEach(function (catalogData) {
            null == filterData && (qaList = catalogData.qaList, qaList.forEach(function (qaData) {
              null == filterData && qaData.list.forEach(function (data) {
                data.id === answerId && (filterData = data, filterCatalogData = catalogData)
              })
            }))
          }), null != filterCatalogData && null != filterData) {
          var _qaType = filterCatalogData.catalogId;
          return setTypeNavActive(_qaType), getQaTitleList(_qaType), getQaDetail(answerId), !0
        }
        return !1
      }
      
      function initByType(qaType) {
        var filterData = qaTypeNav.find(".qa-type").filter('[data-type="' + qaType + '"]');
        0 === filterData.length && (qaType = 0), setTypeNavActive(qaType), getQaTitleList(qaType)
      }
      
      getQaCatalogList();
      var qaType = Number((0, _funutil.getQuery)("type")) || 0, answerId = Number((0, _funutil.getQuery)("id")) || null;
      null != answerId ? initById(answerId) || initByType(qaType) : initByType(qaType)
    }()
  }()
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , function (module, exports, __webpack_require__) {
  "use strict";
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj}
  }
  
  Object.defineProperty(exports, "__esModule", {value: !0});
  var _jquery = __webpack_require__(30), _jquery2 = _interopRequireDefault(_jquery), _setting = __webpack_require__(33);
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
}, function (module, exports, __webpack_require__) {
  "use strict";
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj}
  }
  
  Object.defineProperty(exports, "__esModule", {value: !0});
  var _jquery = __webpack_require__(31), _jquery2 = _interopRequireDefault(_jquery);
  window.$ = _jquery2.default, window.jQuery = _jquery2.default, exports.default = _jquery2.default
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__(32)(2)
}, function (module, exports) {
  module.exports = jquery_d882153f
}, function (module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  var domainSettingTemp = void 0;
  domainSettingTemp = {QuoteApiDomain: "https://cn-quoteapi.webull.com/"};
  exports.domainSetting = domainSettingTemp, exports.supportLanguage = ["en", "zh"], exports.languageKey = "fm_hl", exports.queryLanguageKey = "hl", exports.isWebullApp = /webull(?!broker)/i.test(navigator.userAgent)
}, , , , , , , , , , , , , , , , function (module, exports) {
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function (module, exports, __webpack_require__) {
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
}, function (module, exports, __webpack_require__) {
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
        }, {id: 3, title: "How to open a Webull trading account?", context: __webpack_require__(108)}, {
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
        }, {id: 1004, title: "Are there fees for deposit?", context: __webpack_require__(116)}, {
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
          context: __webpack_require__(117)
        }, {
          id: 2002,
          title: "What are other fees charged for US stocks?",
          context: __webpack_require__(118)
        }, {id: 2003, title: "What are other fees charged for Hong Kong stocks?", context: __webpack_require__(119)}]
      }]
    }, {
      catalogId: 3, catalogName: "Account Transfer Guide", qaList: [{
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
          context: __webpack_require__(120)
        }, {id: 4031, title: "What is the pre-opening period?", context: __webpack_require__(121)}, {
          id: 4032,
          title: "What is the continuous trading session?",
          context: 'On each trading day, 9:30 am to 12:00 noon, and 1:00 to 4:00 pm is the continuous trading session of the securities market. In the continuous trading hours, the trading system will match orders one by one with the principle of price priority, and following the time sequence of the input of orders into the system. Orders input at an earlier time must be fully executed before orders at the same price but input at a later time are processed. During the continuous trading hours, the trading system only accepts the "Limit Order", "Enhanced Limit Order" and "Special Limit Order". You can choose to add "full or immediate cancellation" instructions so that if the order cannot be completed fully at one time, the order will be canceled entirely and will not be kept in the system. In addition, the order price input into the trading system (i) cannot deviate by 9 times or more and less than one-ninth or less from the nominal price (if any) and (ii) is subject to the quote rules (except those exempt). At the same time, the number of each order shall not exceed 3,000 lots.'
        }, {id: 4033, title: "What is the closing auction trading session?", context: __webpack_require__(122)}]
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
          context: "A risk control value of Interactive Brokers. Once an investor has started buying a stock on margin, the NYSE and FINRA require that a minimum amount of equity be maintained in the investor's margin account. These rules require investors to have at least 25% of the total market value of the securities they own in their margin account. This is called the maintenance margin. For market participants identified as <a href='https://static.webull.com/helpDetail?id=4042'>pattern day traders</a>, the maintenance margin requirement is a minimum of $25,000 (or 25% of the total market value of the securities, whichever is higher)."
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
          context: __webpack_require__(123)
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
        }, {id: 6006, title: "How is the financing interest rate charged?", context: __webpack_require__(124)}]
      }]
    }, {
      catalogId: 7, catalogName: "Account Security", qaList: [{
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
          context: __webpack_require__(125)
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
  module.exports = "<p>1. 点击“立即免费开户”，注册微牛账号</p><img src=" + JSON.stringify(__webpack_require__(91)) + ' alt=""><p>2. 选择所在地区（以下示例对应“中国大陆”地区）</p><img src=' + JSON.stringify(__webpack_require__(92)) + ' alt=""><p>3. 上传身份证，识别身份证信息 </p><img src=' + JSON.stringify(__webpack_require__(93)) + ' alt=""><img src=' + JSON.stringify(__webpack_require__(94)) + ' alt=""><p>4. 填写个人信息</p><img src=' + JSON.stringify(__webpack_require__(95)) + ' alt=""><p>5. 填写投资经验</p><img src=' + JSON.stringify(__webpack_require__(96)) + ' alt=""><p>6. 阅读披露信息，签署协议</p><img src=' + JSON.stringify(__webpack_require__(97)) + ' alt="">'
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/5756c24214ef7599.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/ee180deb0d48d73f.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/fd87b595a94c65fb.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/cbfedd568f41f763.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/7314ad46ea94b3df.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/3de1381f35346a28.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/b3cac9d2f44279dc.jpg"
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
  module.exports = "<p>收市竞价容许交易以收市价执行，是国际证券市场上常用的交易机制。在收市竞价交易时段内，有需要以收市价进行交易的市场参与者可在此时段输入买卖盘，这些买卖盘会互动从而令每只证券得出一个共识的收市价，并按此收市价执行。香港交易所引的入收市竞价交易时段旨在切合投资者的各种需求，便利他们以证券收市价执行交易，须知现时好些基金（例如指数追踪基金）均须按章以收市价进行投资。收市竞价交易时段长约8至10分钟，当中分为参考价定价时段、输入买卖盘时段、不可取消时段及随机收市时段，具体时间及运作如下：</p><table>    <tr>        <th>起止时间</th>        <th>时段细分</th>    </tr>    <tr>        <td>16:00 – 16:01</td>        <td>参考价定价时段</td>    </tr>    <tr>        <td>16:01 – 16:06</td>        <td>输入买卖盘时段</td>    </tr>    <tr>        <td>16:06 – 16:08</td>        <td>不可取消时段</td>    </tr>    <tr>        <td>16:08 – 16:10</td>        <td>随机收市时段</td>    </tr></table>"
}, function (module, exports) {
  module.exports = "<p>每个交易日首个输入交易系统的买盘或卖盘，是受一套开市报价规则所监管。按此规则，开市前时段内作出的开市报价不得偏离上日收市价(如有) 9倍或以上及少于九分之一或以下，每种股票的价位，视乎其股价而定。以下是股票的价位表。</p><table>    <tr>        <th>价格范围</th>        <th>价格最小变动单位</th>    </tr>    <tr>        <td>0.01 - 0.25</td>        <td>0.001</td>    </tr>    <tr>        <td>0.25 – 0.50</td>        <td>0.005</td>    </tr>    <tr>        <td>0.50 – 10.00</td>        <td>0.010</td>    </tr>    <tr>        <td>10.00 – 20.00</td>        <td>0.020</td>    </tr>    <tr>        <td>20.00 – 100.00</td>        <td>0.050</td>    </tr>    <tr>        <td>100.00 – 200.00</td>        <td>0.100</td>    </tr>    <tr>        <td>200.00 – 500.00</td>        <td>0.200</td>    </tr>    <tr>        <td>500.00 – 1,000.00</td>        <td>0.500</td>    </tr>    <tr>        <td>1,000.00 – 2,000.00</td>        <td>1.000</td>    </tr>    <tr>        <td>2,000.00 – 5,000.00</td>        <td>2.000</td>    </tr>    <tr>        <td>5,000.00 – 9995.00</td>        <td>5.000</td>    </tr></table>"
}, function (module, exports) {
  module.exports = '<p>    对于盛宝银行账户，不可融资交易股票，但可以融资交易股票差价合约，具体的融资利率与各币种的银行间拆借利率有关。如果在交易当日持仓和平仓差价合约，则不会有隔夜融资。如果客户持有隔夜个股差价合约头寸（即在证券交易所收市时持仓差价合约），则会收取融资利息：</p><br/><p>    如果持有差价合约多头头寸，则会进行借记，计算方法是基于相关股份交易使用的货币之相关银行同业拆放利率（例如，伦敦银行同业拆放利率LIBOR）加上加价3.5%（乘以实际天数/360天或实际天数/365天）。</p><p>    如果持有差价合约空头头寸，则会收到贷记，计算方法是基于相关股份交易使用的货币之相关银行同业拆借利率（例如，伦敦银行同业拆借利率LIBID）减去降价3.0%（乘以实际天数/360天或实际天数/365天）。贷记利率为负则需要支付利息，反之则会收到利息。</p><p>    银行同业拆借利率可以参考 <a href="http://www.global-rates.com/" target="_blank">Global Rates</a></p><br/><p>    对于盈透证券账户，可融资交易股票，具体的融资利率与各币种的银行间拆借利率有关。不同币种的融资利率不同，同一币种的融资利率也会不定期的波动。同样，只有持仓过夜才会收取融资利息。具体请参考 <a href="https://www.ibkr.com.cn/en/index.php?f=701" target="_blank">基准利率</a> 。以下利率数据采用2017年8月16日的基准利率（美元1.16%，港元0.066%）计算得出：</p><table style="text-align: center">    <tr>        <th>融资金额（美元）</th>        <th>融资利率</th>    </tr>    <tr>        <td>0-100,000</td>        <td style="text-align: center">3.61%</td>    </tr>    <tr>        <td>100,000.01-1,000,000</td>        <td style="text-align: center">3.11%</td>    </tr>    <tr>        <td>1,000,000.01-3,000,000</td>        <td style="text-align: center">2.61%</td>    </tr>    <tr>        <td>>3,000,000.00</td>        <td style="text-align: center">2.36%</td>    </tr></table><br/><table style="text-align: center">    <tr>        <th>融资金额（港元）</th>        <th>融资利率</th>    </tr>    <tr>        <td>0-780,000</td>        <td style="text-align: center">3.566%</td>    </tr>    <tr>        <td>780,000.01-7,800,000</td>        <td style="text-align: center">3.066%</td>    </tr>    <tr>        <td>7,800,000.01-780,000,000</td>        <td style="text-align: center">2.566%</td>    </tr>    <tr>        <td>>780,000,000.00</td>        <td style="text-align: center">2.566%</td>    </tr></table>'
}, function (module, exports) {
  module.exports = "<p>标的物前面的英文标识代表标的物所在的地区/市场。</p><table>    <tr>        <th>标识</th>        <th>市场</th>        <th>标识</th>        <th>市场</th>    </tr>    <tr>        <td>CN</td>        <td>中国</td>        <td>DK</td>        <td>丹麦</td>    </tr>    <tr>        <td>HK</td>        <td>香港</td>        <td>SE</td>        <td>瑞典</td>    </tr>    <tr>        <td>SG</td>        <td>新加坡</td>        <td>FI</td>        <td>芬兰</td>    </tr>    <tr>        <td>JP</td>        <td>日本</td>        <td>IS</td>        <td>冰岛</td>    </tr>    <tr>        <td>IN</td>        <td>印度</td>        <td>NO</td>        <td>挪威</td>    </tr>    <tr>        <td>US</td>        <td>美国</td>        <td>NL</td>        <td>荷兰</td>    </tr>    <tr>        <td>CA</td>        <td>加拿大</td>        <td>BE</td>        <td>比利时</td>    </tr>    <tr>        <td>UK</td>        <td>英国</td>        <td>PT</td>        <td>葡萄牙</td>    </tr>    <tr>        <td>DE</td>        <td>德国</td>        <td>FR</td>        <td>法国</td>    </tr></table>"
}, function (module, exports, __webpack_require__) {
  module.exports = '<p>1. Click "Free Account Opening Now" to register a Webull account</p><img src=' + JSON.stringify(__webpack_require__(109)) + ' alt=""><p>2. Select the region (the following example shows "mainland China")</p><img src=' + JSON.stringify(__webpack_require__(110)) + ' alt=""><p>3. Upload your ID card to identify your ID information</p><img src=' + JSON.stringify(__webpack_require__(111)) + ' alt=""><img src=' + JSON.stringify(__webpack_require__(112)) + ' alt=""><p>4. Fill in personal information</p><img src=' + JSON.stringify(__webpack_require__(113)) + ' alt=""><p>5. Fill out investment experience</p><img src=' + JSON.stringify(__webpack_require__(114)) + ' alt=""><p>6. Read the disclosure information and sign the agreement</p><img src=' + JSON.stringify(__webpack_require__(115)) + ' alt="">'
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/ff82960220de0432.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/44e55b353924ca6b.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/d670dd7b99988c50.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/19d28d992f315683.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/b3f78324ba8161ab.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/151db338dd5b6325.jpg"
}, function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__.p + "desktop/assets/images/aadfb440de4ded38.jpg"
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