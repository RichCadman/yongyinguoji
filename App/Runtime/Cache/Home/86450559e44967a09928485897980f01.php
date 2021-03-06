<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!-- saved from url=(0022)http://www.webull.com/ -->
<html style = "font-size: 69%;">
<head lang = "zh">
	<meta http-equiv = "Content-Type" content = "text/html; charset=UTF-8">
	<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1">
	<meta name = "copyright" content = "中银网">
	<meta name = "description" content = "中银网,最懂中国投资者的互联网券商,国内唯一支持一个账号,一笔资金,一款软件即可进行全球资产配置的平台,白天交易A股,港股,恒指,晚上交易黄金,白银,原油,外汇,不错过任何投资机会,在线免费下载中银网交易软件">
	<meta name = "keywords" content = "中银网,中银网软件,互联网券商,原油期货,黄金期货,港股交易,人民币外汇,ETF,美股首页,美股行情,美股开户">
	<meta name = "viewport" content = "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
	<meta name = "format-detection" content = "telephone=no">
	<meta name="360-site-verification" content="a1352ea97ee33943a2c1149480300607" />
	<meta name="google-site-verification" content="WfnUo5LX-chD_doRst-vOtpXmBU0SsWTAzDoZS7Mqss" />
	<meta name="sogou_site_verification" content="RekGlZkvGr"/>
	<title>中银网|互联网券商|中银网官网|最懂中国投资者的互联网券商</title>
	<script async = "" src = "/zhongying1/Pub/mobile/js/analytics.js"></script>
	<script>
	var rem;
    !function () {
      function e() {
        var e = (document.documentElement.clientWidth || window.screen.width) / 375 * 62.5;
        document.documentElement.style.fontSize = e + "%", rem = e / 62.5
      }
      
      e(), window.addEventListener("resize", function () {
        e()
      })
    }()
	</script>
	<script>!function (e, t, a, n, c, o, s) {
      e.GoogleAnalyticsObject = c, e[c] = e[c] || function () {
          (e[c].q = e[c].q || []).push(arguments)
        }, e[c].l = 1 * new Date, o = t.createElement(a), s = t.getElementsByTagName(a)[0], o.async = 1, o.src = "/zhongying1/Pub/mobile/js/analytics.js", s.parentNode.insertBefore(o, s)
    }(window, document, "script", 0, "ga"), ga("create", "UA-93024071-1", "auto"), ga("send", "pageview")</script>
	<link href="/zhongying1/Pub/mobile/images/favicon.ico" rel="shortcut icon" />
	<link href="/zhongying1/Pub/mobile/css/index.css" rel="stylesheet" />
	<script type="text/javascript" src="/zhongying1/Pub/mobile/js/requestseo.js"></script>
</head>
<body class = "zh">
	<!--header start-->
	<div class="header">
        <div class="nav">
            <div class="nav-header">
                <button class="nav-button">
                    <span class = "icon-bar"></span>
                    <span class = "icon-bar"></span>
                    <span
                    class = "icon-bar"></span>
                </button>
            </div>
            <nav class="nav-menus">
                <a class="item" href="/zhongying1/index.php/Mindex/index">首页</a>
                <a class="item" href="/zhongying1/index.php/Mproduct/index">产品介绍</a>
                <a class="item" href="/zhongying1/index.php/Mabout/index">关于我们</a>
                <a class="item" href="/zhongying1/index.php/Mjoin/index">加入我们</a>
                <a class="item" href="/zhongying1/index.php/Mhelp/index">帮助</a>
                <?php if($_SESSION['userinfo']): ?><a class="item" href = "/zhongying1/index.php/Mmy/index">我的账户</a>
                <a class="item" href = "/zhongying1/index.php/Mlogin/index">退出</a>
                <?php else: ?>
                <a class="item" href = "/zhongying1/index.php/Mlogin/index">登录</a><?php endif; ?>
            </nav>
        </div>
    </div>

    
	<!--header end-->
	<div id="home">
		<section animated="true" class="banner" >
			<div class="cont" style="background-image:url(/zhongying1/Pub/mobile/images/banner1.jpg);">
				<div class="tit fm-animate animate-top1 do-animate">中国领先的数据与软件综合服务提供商</div>

				<div class="txt fm-animate animate-top2 do-animate">
					CHINA&#39;S LEADING PROVIDER OF DATA
					<br />
					AND TRANSACTION SERVICES
				</div>
			</div>

			<div class="data-area clearfix">
				<div class="item">
					<div class="num clearfix">
						<div class="left"> <em class="counter" data-num="<?php echo ($tongji1["frist"]); ?>">0</em>
							万
						</div>

						<div class="right"> <em class="counter" data-num="<?php echo ($tongji1["last"]); ?>">0</em>
							万
						</div>
					</div>

					<div class="txt"><?php echo ($tongji1["type_title"]); ?></div>
				</div>

				<div class="item">
					<div class="num clearfix">
						<div class="left">
							<em class="counter" data-num="<?php echo ($tongji2["frist"]); ?>">0</em>
							个
						</div>

						<div class="right">
							<em class="counter" data-num="<?php echo ($tongji2["last"]); ?>">0</em>
							类
						</div>
					</div>

					<div class="txt"><?php echo ($tongji2["type_title"]); ?></div>
				</div>

				<div class="item">
					<div class="num clearfix">
						<div class="left">
							<em class="counter" data-num="<?php echo ($tongji3["frist"]); ?>">0</em>
							个
						</div>

						<div class="right">
							<em class="counter" data-num="<?php echo ($tongji3["last"]); ?>">0</em>
							兆
						</div>
					</div>

					<div class="txt"><?php echo ($tongji3["type_title"]); ?></div>
				</div>
			</div>
		</section>

		<section animated="true" class="trade">
			<div class="hd fm-animate animate-top1">精选全球优质的交易品种</div>

			<div class="cont">
				<ul class="list clearfix">
					<li class="item fm-animate animate-top2">
						<div class="pic">&nbsp;</div>

						<div class="tit">股票</div>
					</li>
					<li class="item fm-animate animate-top2">
						<div class="pic">&nbsp;</div>

						<div class="tit">期货</div>
					</li>
					<li class="item fm-animate animate-top2">
						<div class="pic">&nbsp;</div>

						<div class="tit">外汇</div>
					</li>
				</ul>
			</div>

			<div class="cont txt fm-animate animate-top3">
				中银网是国内领先的数据与交易综合服务提供商，支持一个账户、一笔资金、一款交易软件玩转股票、期货、外汇、期权、ETF基金、债券等全球资产配置。真正实现一个账户、交易全球。白天可以交易A股、恒指、A50，晚上交易美股、期货（黄金、白银、原油等）、外汇，全天24小时，不错过任何投资机会，全天24小时，金钱永不眠。
			</div>
		</section>

		<section animated="true" class="feature">
			<div class="hd fm-animate animate-top1 do-animate">
				以客户为中心
				<br />
				提供极致的客户体验
			</div>

			<div class="cont">
				<div class="swiper-container swiper-container-horizontal">
					<ul class="swiper-wrapper list clearfix">
						<li class="swiper-slide item swiper-slide-active" style="width: 375px;">
							<div class="pic">&nbsp;</div>

							<div class="tit">规范成熟的监管</div>

							<div class="txt">
								受SEC（美国证券交易监督委员会）、FINRA（美国金融监管局）监管，投资人受SIPC（证券投资人保护公司）保护，最高可享3000万美元的赔付。
							</div>
						</li>
						<li class="swiper-slide item fm-animate animate-top2 swiper-slide-next do-animate" style="width: 375px;">
							<div class="pic">&nbsp;</div>

							<div class="tit">稳定可靠的基础设施</div>

							<div class="txt">
								知名大型券商提供可靠的底层账户、交易、清算和资金托管服务。汤森路透提供全球实时数据服务；阿里云提供稳定可靠的交易及数据网络。
							</div>
						</li>
						<li class="swiper-slide item fm-animate animate-top2 do-animate" style="width: 375px;">
							<div class="pic">&nbsp;</div>

							<div class="tit">闪电开户</div>

							<div class="txt">简化50多项冗余调查，只需一张身份证3分钟在线开户。</div>
						</li>
						<li class="swiper-slide item fm-animate animate-top3 do-animate" style="width: 375px">
							<div class="pic">&nbsp;</div>

							<div class="tit">实时出入金</div>

							<div class="txt">与多家第三方支付机构合作，支持银联通道入金，实时到账，到账即可交易；出金只需软件提交需求即可，方便快捷。</div>
						</li>
						<li class="swiper-slide item fm-animate animate-top3 do-animate" style="width: 375px;">
							<div class="pic">&nbsp;</div>

							<div class="tit">软件易上手</div>

							<div class="txt">根据中国投资者量身打造，符合中国投资者的交易习惯，操作简单。</div>
						</li>
						<li class="swiper-slide item fm-animate animate-top3 do-animate" style="width: 375px;">
							<div class="pic">&nbsp;</div>

							<div class="tit">全渠道覆盖</div>

							<div class="txt">支持Windows、Android、iOS平台，满足不同用户随时随地交易需求。</div>
						</li>
					</ul>

					<div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
						<span
                        class = "swiper-pagination-bullet swiper-pagination-bullet-active"></span>
						<span
                        class = "swiper-pagination-bullet"></span>
						<span class = "swiper-pagination-bullet"></span>
						<span
                        class = "swiper-pagination-bullet"></span>
						<span class = "swiper-pagination-bullet"></span>
						<span
                        class = "swiper-pagination-bullet"></span>
					</div>
				</div>
			</div>
		</section>

		<section animated="true" class="cooperation">
			<div class="hd fm-animate animate-top1 do-animate">全面、快速、深度的数据服务</div>

			<div class="cont clearfix fm-animate animate-top2 do-animate">
				<div class="item">
					<div class="pic">&nbsp;</div>

					<div class="tit">多地区多品类海量数据</div>

					<div class="txt">数据覆盖24个国家/地区，100多家交易所；囊括股票、期货、外汇、期权、ETF基金、债券6大类别，全球资讯，尽在中银网</div>
				</div>

				<div class="item">
					<div class="pic">&nbsp;</div>

					<div class="tit">毫秒级实时行情</div>

					<div class="txt">
						全球各大市场指数，精选美洲、亚洲数百支股票，全球期货、外汇毫秒级的行情数据更新，时刻与市场保持同步，系统处理请求低至0.003秒
					</div>
				</div>

				<div class="item">
					<div class="pic">&nbsp;</div>

					<div class="tit">精准的市场数据</div>

					<div class="txt">最小单笔成交的精准数据，稳定密集连续报价，数据条件灵活提取</div>
				</div>

				<div class="item">
					<div class="pic">&nbsp;</div>

					<div class="tit">高手跟单</div>

					<div class="txt">来共享最优秀的操盘手交易数据，将投资者从繁琐的交易细节中解放出来，通过资源与交易的匹配，让更多的投资者受益</div>
				</div>
			</div>
		</section>

		<section animated="true" class="world-map">
			<div class="map-nav">
				<div class="item active" map-type="na-sa">美洲</div>

				<div class="item" map-type="eu-af">欧非</div>

				<div class="item" map-type="as-oa">亚太</div>
			</div>

			<div class="wrap">
				<div class="map na-sa">&nbsp;</div>

				<div class="map-content na-sa active">
					<div class="point-main exchange-128" data-exchangecode="TSXV" data-exchangeid="128">
						<div class="content">
							<div class="name">多伦多创业交易所</div>

							<div class="txt">总市值：373.3(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-16" data-exchangecode="TOR" data-exchangeid="16">
						<div class="content">
							<div class="name">多伦多证券交易所</div>

							<div class="txt">总市值：33021.74(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-15" data-exchangecode="PTX" data-exchangeid="15">
						<div class="content">
							<div class="name">加拿大国家证券交易所</div>

							<div class="txt">总市值：10.94(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-11" data-exchangecode="NYSE" data-exchangeid="11">
						<div class="content">
							<div class="name">纽约证券交易所</div>

							<div class="txt">总市值：286898.58(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-96" data-exchangecode="NSQ" data-exchangeid="96">
						<div class="content">
							<div class="name">纳斯达克证券交易所</div>

							<div class="txt">总市值：99706.2(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-108" data-exchangecode="MEX" data-exchangeid="108">
						<div class="content">
							<div class="name">墨西哥证券交易所</div>

							<div class="txt">总市值：4193.36(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-109" data-exchangecode="BVMF" data-exchangeid="109">
						<div class="content">
							<div class="name">巴西证券交易所</div>

							<div class="txt">总市值：9140.36(亿美元)</div>
						</div>
					</div>
				</div>

				<div class="data-list na-sa" style="display: block; transform: translate(-12.5rem, 0px); transition: transform 0.5s;">
					<div class="data-card  card-925154951 card-up" data-tickerid="">
						<div class="name">SPCDNX</div>
					</div>

					<div class="data-card card-right card-925154728 card-down" data-tickerid="">
						<div class="name">S&amp;P/TSX Composite</div>
					</div>

					<div class="data-card card-right card-913354186 card-up" data-tickerid="">
						<div class="name">NYSE</div>
					</div>

					<div class="data-card card-right card-913354090 card-down" data-tickerid="">
						<div class="name">NASDAQ</div>
					</div>

					<div class="data-card card-right card-925294714 card-down" data-tickerid="">
						<div class="name">Bovespa</div>
					</div>

					<div class="data-card  card-925154951 card-up" data-tickerid="">
						<div class="name">SPCDNX</div>
					</div>

					<div class="data-card card-right card-925154728 card-down" data-tickerid="">
						<div class="name">S&amp;P/TSX Composite</div>
					</div>

					<div class="data-card card-right card-913354186 card-up" data-tickerid="">
						<div class="name">NYSE</div>
					</div>
				</div>

				<div class="map-content eu-af">
					<div class="point-main exchange-47" data-exchangecode="ICX" data-exchangeid="47">
						<div class="content">
							<div class="name">OMX冰岛证券交易所</div>

							<div class="txt">总市值：88.75(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-49" data-exchangecode="OSL" data-exchangeid="49">
						<div class="content">
							<div class="name">奥斯陆证券交易所</div>

							<div class="txt">总市值：2644.5(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-46" data-exchangecode="HEX" data-exchangeid="46">
						<div class="content">
							<div class="name">OMX赫尔辛基证券交易所</div>

							<div class="txt">总市值：2733.9(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-45" data-exchangecode="CPH" data-exchangeid="45">
						<div class="content">
							<div class="name">OMX哥本哈根证券交易所</div>

							<div class="txt">总市值：4385.9(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-48" data-exchangecode="STO" data-exchangeid="48">
						<div class="content">
							<div class="name">OMX斯德哥尔摩证券交易所</div>

							<div class="txt">总市值：10490.47(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-25" data-exchangecode="DBG" data-exchangeid="25">
						<div class="content">
							<div class="name">德意志证券交易所</div>

							<div class="txt">总市值：22584.1(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-24" data-exchangecode="FRA" data-exchangeid="24">
						<div class="content">
							<div class="name">法兰克福证券交易所</div>

							<div class="txt">总市值：2234.65(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-117" data-exchangecode="TLV" data-exchangeid="117">
						<div class="content">
							<div class="name">特拉维夫证券交易所</div>

							<div class="txt">总市值：1719.31(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-39" data-exchangecode="MCE" data-exchangeid="39">
						<div class="content">
							<div class="name">西班牙证券交易所</div>

							<div class="txt">总市值：8251.26(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-40" data-exchangecode="VTX" data-exchangeid="40">
						<div class="content">
							<div class="name">瑞士交易所</div>

							<div class="txt">总市值：18761.37(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-42" data-exchangecode="PAR" data-exchangeid="42">
						<div class="content">
							<div class="name">巴黎泛欧证券交易所</div>

							<div class="txt">总市值：23453.25(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-20" data-exchangecode="LSE" data-exchangeid="20">
						<div class="content">
							<div class="name">伦敦证券交易所</div>

							<div class="txt">总市值：23104.62(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-41" data-exchangecode="AFX" data-exchangeid="41">
						<div class="content">
							<div class="name">阿姆斯特丹泛欧证券交易所</div>

							<div class="txt">总市值：15424.91(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-44" data-exchangecode="LIS" data-exchangeid="44">
						<div class="content">
							<div class="name">泛欧里斯本证券交易所</div>

							<div class="txt">总市值：686.82(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-43" data-exchangecode="BRU" data-exchangeid="43">
						<div class="content">
							<div class="name">泛欧布鲁塞尔证券交易所</div>

							<div class="txt">总市值：4212.11(亿美元)</div>
						</div>
					</div>
				</div>

				<div class="data-list eu-af" style="display: none;">
					<div class="data-card  card-925213640 card-down" data-tickerid="">
						<div class="name">ICEX Main</div>
					</div>

					<div class="data-card  card-913405368 card-down" data-tickerid="">
						<div class="name">BVLG</div>
					</div>

					<div class="data-card  card-913284020 card-down" data-tickerid="">
						<div class="name">FTSE 100</div>
					</div>

					<div class="data-card  card-913299056 card-down" data-tickerid="">
						<div class="name">CAC All Share</div>
					</div>

					<div class="data-card  card-913301800 card-down" data-tickerid="">
						<div class="name">IBEX 35</div>
					</div>

					<div class="data-card  card-913405351 card-down" data-tickerid="">
						<div class="name">BEL All Share</div>
					</div>

					<div class="data-card  card-913405270 card-down" data-tickerid="">
						<div class="name">AEX Index</div>
					</div>

					<div class="data-card  card-913293847 card-down" data-tickerid="">
						<div class="name">SMI PR</div>
					</div>

					<div class="data-card  card-913301905 card-down" data-tickerid="">
						<div class="name">DAX Price</div>
					</div>

					<div class="data-card card-right card-925206540 card-down" data-tickerid="">
						<div class="name">Oslo OBX</div>
					</div>

					<div class="data-card card-right card-925213654 card-up" data-tickerid="">
						<div class="name">OMX Helsinki 25</div>
					</div>

					<div class="data-card card-right card-925213647 card-down" data-tickerid="">
						<div class="name">OMX Copenhagen 20</div>
					</div>

					<div class="data-card card-right card-925213634 card-up" data-tickerid="">
						<div class="name">OMX Stockholm 30</div>
					</div>
				</div>

				<div class="map-content as-oa">
					<div class="point-main exchange-18" data-exchangecode="NSI" data-exchangeid="18">
						<div class="content">
							<div class="name">印度国家证券交易所</div>

							<div class="txt">总市值：20052.57(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-19" data-exchangecode="BSE" data-exchangeid="19">
						<div class="content">
							<div class="name">孟买证券交易所</div>

							<div class="txt">总市值：20028.96(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-22" data-exchangecode="TYO" data-exchangeid="22">
						<div class="content">
							<div class="name">东京证券交易所</div>

							<div class="txt">总市值：55390.31(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-1 active" data-exchangecode="SHH" data-exchangeid="1">
						<div class="content">
							<div class="name">上海证券交易所</div>

							<div class="txt">总市值：50778.6(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-2 active" data-exchangecode="SHZ" data-exchangeid="2">
						<div class="content">
							<div class="name">深圳证券交易所</div>

							<div class="txt">总市值：32600.56(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-3 active" data-exchangecode="HKG" data-exchangeid="3">
						<div class="content">
							<div class="name">香港交易所</div>

							<div class="txt">总市值：60573.31(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-105 active" data-exchangecode="ASX" data-exchangeid="105">
						<div class="content">
							<div class="name">澳大利亚证券交易所</div>

							<div class="txt">总市值：13460.35(亿美元)</div>
						</div>
					</div>

					<div class="point-main exchange-6 active" data-exchangecode="DLC" data-exchangeid="6">
						<div class="content">
							<div class="name">大连商品交易所</div>

							<div class="txt">&nbsp;</div>
						</div>
					</div>

					<div class="point-main exchange-17 active" data-exchangecode="SES" data-exchangeid="17">
						<div class="content">
							<div class="name">新加坡证券交易所</div>

							<div class="txt">总市值：6521.87(亿美元)</div>
						</div>
					</div>
				</div>

				<div class="data-list as-oa" style="display: none;">
					<div class="data-card  card-913294085 card-up" data-tickerid="">
						<div class="name">Nifty 500</div>
					</div>

					<div class="data-card  card-913255515 card-up" data-tickerid="">
						<div class="name">BSE Sensex 30</div>
					</div>

					<div class="data-card card-right card-913283994 card-down" data-tickerid="">
						<div class="name">TOPIX Index</div>
					</div>

					<div class="data-card card-right card-913243980 card-up" data-tickerid="">
						<div class="name">SSE COMPOSITE</div>
					</div>

					<div class="data-card card-right card-913244420 card-up" data-tickerid="">
						<div class="name">SZSE CMPNI</div>
					</div>

					<div class="data-card card-right card-913283993 card-up" data-tickerid="">
						<div class="name">Hang Seng Index</div>
					</div>

					<div class="data-card card-right card-925177426 card-down" data-tickerid="">
						<div class="name">ASX All Ordinaries</div>
					</div>
				</div>
			</div>
		</section>

		<section animated="true" class="partner">
			<div class="hd">您的订单传递到了这里</div>

			<div class="pic">&nbsp;</div>
		</section>

		<section class="investors" style="border-bottom: 0;">
			<div class="hd fm-animate animate-top1">投资人</div>

			<div class="pic fm-animate animate-top2">&nbsp;</div>
		</section>

		<section class="news">
			<div class="hd">新闻媒体</div>

			<div class="bd clearfix">
				<div class="hot">
					<div class="tit">
						<a href="<?php echo ($news_one["link"]); ?>" target="_blank">中银网:不忘初心履使命,砥砺前行创华章</a>
					</div>

					<div class="cont">
						<div class="pic">
							<a href="<?php echo ($news_one["link"]); ?>" target="_blank">
								<img alt="中银网:不忘初心履使命,砥砺前行创华章" src="/zhongying1/Pub/upload/<?php echo ($news_one["img"]); ?>" style="width: 12rem;height: 8rem;" />
							</a>
						</div>

						<div class="txt">
							<a href="<?php echo ($news_one["link"]); ?>" target="_blank">
								<?php echo ($news_one["content"]); ?>
							</a>
						</div>
					</div>
				</div>

				<ul class="list">
					<?php if(is_array($news)): foreach($news as $key=>$v): ?><li>
						<a class="clearfix" href="<?php echo ($v["link"]); ?>" target="_blank">
							<span class = "txt"><?php echo ($v["title"]); ?></span>
							<span class = "date"><?php echo ($v["time"]); ?></span>
						</a>
					</li><?php endforeach; endif; ?>
				</ul>
			</div>
		</section>
		<!--footer begin-->
		<div class="footer">
            <div class="wrap clearfix">
                <div class="cont cont-head">
                    <div class="tit">中银网下载</div>

                    <div class="download_wrap">
                        <div class="download clearfix">
                            <a class="btn apple" href="https://itunes.apple.com/cn/app/yun-xun-zhong-ying-wang/id1254310557?mt=8">IOS客户端</a>
                        </div>

                        <div class="download clearfix">
                            <a class="btn apple" href="http://118.190.3.124/ZhongYingWang.apk">Android客户端</a>
                        </div>
                    </div>
                </div>

                <div class="cont concat-cont">
                    <p class="tit">联系我们</p>

                    <div class="msg">
                        <div class="phone-2" ><a style="color:#fff" href="tel:<?php echo ($Tel["content"]); ?>"><?php echo ($Tel["content"]); ?></a></div>

                        <p class="email"><?php echo ($email["content"]); ?></p>

                        <p class="date">周一到周五 0:00&mdash;24:00</p>
                    </div>
                </div>

                <div class="tips-cont">
                    <p class="tips">
                        中银网网站上的任何内容均不可视为购买或出售证券、期货或其它投资产品的一种建议或招揽。任何信息及数据仅供投资者参考，所有历史数据均不可视为对未来走势的判断依据。投资者应仔细了解相关金融产品，明确其风险因素及自身的风险承受能力，或寻求专业的投资顾问的建议。投资有风险，入市须谨慎。
                    </p>

                    <p class="msg">
                        <a class="policy" href="policy_mobile.html">中银服务协议</a>
                    </p>

                    <div class="copyright">中银网 鲁ICP备17035173号-1</div>
                    <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1264485605'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s22.cnzz.com/z_stat.php%3Fid%3D1264485605%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));</script>
                    <!--baiduzdts-->
                    <script>
                    (function(){
                        var bp = document.createElement('script');
                        var curProtocol = window.location.protocol.split(':')[0];
                        if (curProtocol === 'https'){
                       bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                      }
                      else{
                      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                      }
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(bp, s);
                    })();
                    </script>
                    <!--baiduzdts-->
                    <!-- Global site tag (gtag.js) - Google Analytics -->
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-84130035-5"></script>
                    <script>
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', 'UA-84130035-5');
                    </script>

                    <p>&nbsp;</p>
                </div>
            </div>
        </div>
		<script src="/zhongying1/Pub/mobile/js/jquery.min.1.8.3.js"></script>
		<script src="/zhongying1/Pub/mobile/js/visit.js"></script>
		<!--footer  end-->
	</div>
	<script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/jquery.d882153f.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/echarts.3fb6b163.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/index.js"></script>
</body>
</html>