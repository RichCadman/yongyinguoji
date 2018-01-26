<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head lang = "zh">
	<meta charset = "utf-8">
	<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1">
	<meta name = "copyright" content = "中银网">
	<meta name = "description" content = "中银网,最懂中国投资者的互联网券商,国内唯一支持一个账号,一笔资金,一款软件即可进行全球资产配置的平台,白天交易A股,港股,恒指,晚上交易黄金,白银,原油,外汇,不错过任何投资机会,在线免费下载中银网交易软件">
	<meta name = "keywords" content = "中银网,中银网软件,互联网券商,原油期货,黄金期货,港股交易,人民币外汇,ETF,美股首页,美股行情,美股开户">
	<meta name = "viewport" content = "width=device-width,initial-scale=1,maximum-scale=1">
	<meta name="360-site-verification" content="a1352ea97ee33943a2c1149480300607" />
	<meta name="google-site-verification" content="WfnUo5LX-chD_doRst-vOtpXmBU0SsWTAzDoZS7Mqss" />
	<meta name="sogou_site_verification" content="RekGlZkvGr"/>
	<title>中银网|互联网券商|中银网官网|最懂中国投资者的互联网券商</title>
	<script>
	!function (e, t, a, n, c, o, s) {
      e.GoogleAnalyticsObject = c, e[c] = e[c] || function () {
          (e[c].q = e[c].q || []).push(arguments)
        }, e[c].l = 1 * new Date, o = t.createElement(a), s = t.getElementsByTagName(a)[0], o.async = 1, o.src = "/zhongying1/Pub/home/js/analytics.js", s.parentNode.insertBefore(o, s)
    }(window, document, "script", 0, "ga"), ga("create", "UA-93024071-1", "auto"), ga("send", "pageview")
	</script>
	<link href="/zhongying1/Pub/home/images/favicon.ico" rel="shortcut icon" />
	<link href="/zhongying1/Pub/home/css/index.css" rel="stylesheet" />
	<script type="text/javascript" src="/zhongying1/Pub/home/js/requestseo.js"></script>
</head>
<body class = "zh">
	<div class="header">
		<div class="nav clearfix">
			<a class="logo" href="index.html">
				<span class = "icon" style="background:tranparent;"><img style="width:130px;margin-top:10px;" src="/zhongying1/Pub/home/images/logo.png" alt=""></span>
			</a>
			<nav class="nav-menus">
				<a class="active" href="/zhongying1/index.php/Index/index">首页</a>
				<a href = "/zhongying1/index.php/Product/index">产品介绍</a>
                <a href = "/zhongying1/index.php/About/index">关于我们</a>
                <a href = "/zhongying1/index.php/Join/index">加入我们</a>
                <a href = "/zhongying1/index.php/Help/index">帮助</a>
                <?php if($_SESSION['userinfo']): ?><a href = "/zhongying1/index.php/My/index">我的账户</a>
                <a href = "/zhongying1/index.php/Login/index">退出</a>
                <?php else: ?>
                <a href = "/zhongying1/index.php/Login/index">登录</a><?php endif; ?>
			</nav>
		</div>
	</div>

	<div id="home">
		<section class="banner"  style="background-image:url(/zhongying1/Pub/home/images/banner1.jpg);">
			<div class="cont">
				<div class="tit fm-animate animate-top1">中国领先的数据与软件综合服务提供商</div>

				<div class="txt fm-animate animate-top2">
					CHINA&#39;S LEADING PROVIDER OF DATA
					<br />
					AND TRANSACTION SERVICES
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
			</div>
		</section>

		<section class="trade">
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

		<section class="feature">
			<div class="hd fm-animate animate-top1">以客户为中心，提供极致的客户体验</div>

			<div class="cont">
				<ul class="list clearfix">
					<li class="item fm-animate animate-top2">
						<div class="pic">&nbsp;</div>

						<div class="tit">规范成熟的监管</div>

						<div class="txt">
							受SEC（美国证券交易监督委员会）、FINRA（美国金融监管局）监管，投资人受SIPC（证券投资人保护公司）保护，最高可享3000万美元的赔付。
						</div>
					</li>
					<li class="item fm-animate animate-top2">
						<div class="pic">&nbsp;</div>

						<div class="tit">稳定可靠的基础设施</div>

						<div class="txt">
							知名大型券商提供可靠的底层账户、交易、清算和资金托管服务。汤森路透提供全球实时数据服务；阿里云提供稳定可靠的交易及数据网络。
						</div>
					</li>
					<li class="item fm-animate animate-top2">
						<div class="pic">&nbsp;</div>

						<div class="tit">闪电开户</div>

						<div class="txt">简化50多项冗余调查，只需一张身份证3分钟在线开户。</div>
					</li>
					<li class="item fm-animate animate-top3">
						<div class="pic">&nbsp;</div>

						<div class="tit">实时出入金</div>

						<div class="txt">与多家第三方支付机构合作，支持银联通道入金，实时到账，到账即可交易；出金只需软件提交需求即可，方便快捷。</div>
					</li>
					<li class="item fm-animate animate-top3">
						<div class="pic">&nbsp;</div>

						<div class="tit">软件易上手</div>

						<div class="txt">根据中国投资者量身打造，符合中国投资者的交易习惯，操作简单。</div>
					</li>
					<li class="item fm-animate animate-top3">
						<div class="pic">&nbsp;</div>

						<div class="tit">全渠道覆盖</div>

						<div class="txt">支持Windows、Android、iOS平台，满足不同用户随时随地交易需求。</div>
					</li>
				</ul>
			</div>
		</section>

		<section class="cooperation">
			<div class="hd fm-animate animate-top1">全面、快速、深度的数据服务</div>

			<div class="cont clearfix fm-animate animate-top2">
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

					<div class="txt">共享最优秀的操盘手交易数据，将投资者从繁琐的交易细节中解放出来，通过资源与交易的匹配，让更多的投资者受益</div>
				</div>
			</div>
		</section>

		<section class="world-map">
			<div class="nav">
				<div class="item active" map-type="global">全球</div>

				<div class="item" map-type="na-sa">美洲</div>

				<div class="item" map-type="eu-af">欧非</div>

				<div class="item" map-type="as-oa">亚太</div>
			</div>

			<div class="map">&nbsp;</div>

			<div class="map-content global active">
				<div class="point-main exchange-3" data-exchangecode="HKG" data-exchangeid="3">
					<div class="content">
						<div class="name">香港交易所</div>

						<div class="txt">总市值：60573.31(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-22" data-exchangecode="TYO" data-exchangeid="22">
					<div class="content">
						<div class="name">东京证券交易所</div>

						<div class="txt">总市值：55390.31(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-16" data-exchangecode="TOR" data-exchangeid="16">
					<div class="content">
						<div class="name">多伦多证券交易所</div>

						<div class="txt">总市值：33021.74(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-20" data-exchangecode="LSE" data-exchangeid="20">
					<div class="content">
						<div class="name">伦敦证券交易所</div>

						<div class="txt">总市值：23104.62(亿美元)</div>
					</div>
				</div>

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

				<div class="point-main exchange-40" data-exchangecode="VTX" data-exchangeid="40">
					<div class="content">
						<div class="name">瑞士交易所</div>

						<div class="txt">总市值：18761.37(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-41" data-exchangecode="AFX" data-exchangeid="41">
					<div class="content">
						<div class="name">阿姆斯特丹泛欧证券交易所</div>

						<div class="txt">总市值：15424.91(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-48" data-exchangecode="STO" data-exchangeid="48">
					<div class="content">
						<div class="name">OMX斯德哥尔摩证券交易所</div>

						<div class="txt">总市值：10490.47(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-43" data-exchangecode="BRU" data-exchangeid="43">
					<div class="content">
						<div class="name">泛欧布鲁塞尔证券交易所</div>

						<div class="txt">总市值：4212.11(亿美元)</div>

						<div class="txt">&nbsp;</div>
					</div>
				</div>

				<div class="point-main exchange-24" data-exchangecode="FRA" data-exchangeid="24">
					<div class="content">
						<div class="name">法兰克福证券交易所</div>

						<div class="txt">总市值：2234.65(亿美元)</div>
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

				<div class="point-main exchange-1" data-exchangecode="SHH" data-exchangeid="1">
					<div class="content">
						<div class="name">上海证券交易所</div>

						<div class="txt">总市值：50778.6(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-2" data-exchangecode="SHZ" data-exchangeid="2">
					<div class="content">
						<div class="name">深圳证券交易所</div>

						<div class="txt">总市值：32600.56(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-17" data-exchangecode="SES" data-exchangeid="17">
					<div class="content">
						<div class="name">新加坡证券交易所</div>

						<div class="txt">总市值：6521.87(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-47" data-exchangecode="ICX" data-exchangeid="47">
					<div class="content">
						<div class="name">OMX冰岛证券交易所</div>

						<div class="txt">总市值：88.75(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-42" data-exchangecode="PAR" data-exchangeid="42">
					<div class="content">
						<div class="name">巴黎泛欧证券交易所</div>

						<div class="txt">总市值：23453.25(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-44" data-exchangecode="LIS" data-exchangeid="44">
					<div class="content">
						<div class="name">泛欧里斯本证券交易所</div>

						<div class="txt">总市值：686.82(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-25" data-exchangecode="DBG" data-exchangeid="25">
					<div class="content">
						<div class="name">德意志证券交易所</div>

						<div class="txt">总市值：22584.1(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-109" data-exchangecode="BVMF" data-exchangeid="109">
					<div class="content">
						<div class="name">巴西证券交易所</div>

						<div class="txt">总市值：9140.36(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-45" data-exchangecode="CPH" data-exchangeid="45">
					<div class="content">
						<div class="name">OMX哥本哈根证券交易所</div>

						<div class="txt">总市值：4385.9(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-43" data-exchangecode="BRU" data-exchangeid="43">
					<div class="content">
						<div class="name">泛欧布鲁塞尔证券交易所</div>

						<div class="txt">总市值：4212.11(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-46" data-exchangecode="HEX" data-exchangeid="46">
					<div class="content">
						<div class="name">OMX赫尔辛基证券交易所</div>

						<div class="txt">总市值：2733.9(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-49" data-exchangecode="OSL" data-exchangeid="49">
					<div class="content">
						<div class="name">奥斯陆证券交易所</div>

						<div class="txt">总市值：2644.5(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-108" data-exchangecode="MEX" data-exchangeid="108">
					<div class="content">
						<div class="name">墨西哥证券交易所</div>

						<div class="txt">总市值：4193.36(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-105" data-exchangecode="ASX" data-exchangeid="105">
					<div class="content">
						<div class="name">澳大利亚证券交易所</div>

						<div class="txt">总市值：13460.35(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-15" data-exchangecode="PTX" data-exchangeid="15">
					<div class="content">
						<div class="name">加拿大国家证券交易所</div>

						<div class="txt">总市值：10.94(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-39" data-exchangecode="MCE" data-exchangeid="39">
					<div class="content">
						<div class="name">西班牙证券交易所</div>

						<div class="txt">总市值：8251.26(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-128" data-exchangecode="TSXV" data-exchangeid="128">
					<div class="content">
						<div class="name">多伦多创业交易所</div>

						<div class="txt">总市值：373.3(亿美元)</div>
					</div>
				</div>

				<div class="point exchange-117" data-exchangecode="TLV" data-exchangeid="117">
					<div class="content">
						<div class="name">特拉维夫证券交易所</div>

						<div class="txt">总市值：1719.31(亿美元)</div>
					</div>
				</div>
				<svg class="rect-svg" height="611" version="1.1" width="1252" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<polyline class="g-rect-fill line-925213634" data-exchangecode="STO" data-exchangeid="48" points="643.5 130, 643.5 76, 180 76"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="TOR" data-exchangeid="16" points="317.5 210, 317.5 190, 180 190"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="NYSE" data-exchangeid="11" points="322.5 255, 322.5 302, 180 302"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="NSQ" data-exchangeid="96" points="312.5 270, 312.5 302, 180 302"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="NYSE" data-exchangeid="11" points="322.5 255, 322.5 526, 180 526"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="NSQ" data-exchangeid="96" points="312.5 270, 312.5 526, 180 526"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="BRU" data-exchangeid="43" points="621.5 200, 621.5 414, 180 414"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="HKG" data-exchangeid="3" points="988.5 302, 988.5 76, 1114 76"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="SHZ" data-exchangeid="2" points="1002.5 292, 1002.5 190, 1114 190"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="SHH" data-exchangeid="1" points="1009.5 272, 1009.5 190, 1114 190"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="TYO" data-exchangeid="22" points="1064.5 268, 1064.5 302, 1114 302"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="NSI" data-exchangeid="18" points="866.5 335, 866.5 414, 1114 414"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="BSE" data-exchangeid="19" points="849.5 330, 849.5 430, 1080 430,1080 526, 1114 526"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="LSE" data-exchangeid="20" points="580.5 190, 410 190, 410 478"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="VTX" data-exchangeid="40" points="612.5 224, 572 224, 572 478"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="FRA" data-exchangeid="24" points="634.5 211, 734.5 211, 734 478"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="AFX" data-exchangeid="41" points="607.5 195, 607.5 171, 897 171, 897 478"></polyline>
				</svg>

				<div class="data-card  card-925213634 card-down" data-tickerid="">
					<div class="name">
						OMX
						<br />
						Stockholm 30
					</div>

				</div>

				<div class="data-card  card-925154728 card-up" data-tickerid="">
					<div class="name">
						S&amp;P/TSX
						<br />
						Composite
					</div>

				</div>

				<div class="data-card  card-913354362 card-down" data-tickerid="">
					<div class="name">S&amp;P 500</div>

				</div>

				<div class="data-card  card-913405351 card-up" data-tickerid="">
					<div class="name">BEL All Share</div>

				</div>

				<div class="data-card  card-913353822 card-down" data-tickerid="">
					<div class="name">DOW</div>

				</div>

				<div class="data-card card-right card-913283993 card-up" data-tickerid="">
					<div class="name">Hang Seng Index</div>

				</div>

				<div class="data-card card-right card-913425713 card-down" data-tickerid="">
					<div class="name">CSI 300</div>

				</div>

				<div class="data-card card-right card-913283994 card-down" data-tickerid="">
					<div class="name">TOPIX Index</div>

				</div>

				<div class="data-card card-right card-913294085 card-up" data-tickerid="">
					<div class="name">Nifty 500</div>

				</div>

				<div class="data-card card-right card-913255515 card-up" data-tickerid="">
					<div class="name">BSE Sensex 30</div>

				</div>

				<div class="data-card  card-913284020 card-up" data-tickerid="">
					<div class="name">FTSE 100</div>

				</div>

				<div class="data-card  card-913293847 card-up" data-tickerid="">
					<div class="name">SMI PR</div>

				</div>

				<div class="data-card  card-913301905 card-up" data-tickerid="">
					<div class="name">DAX Price</div>

				</div>

				<div class="data-card  card-913405270 card-up" data-tickerid="">
					<div class="name">AEX Index</div>

				</div>
			</div>

			<div class="map-content na-sa">
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
				<svg class="rect-svg" height="650" version="1.1" width="1252" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<polyline class="g-rect-fill" data-exchangecode="TSXV" data-exchangeid="128" points="375 108, 235 108"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="TOR" data-exchangeid="16" points="672.5 130, 672.5 100, 950 100"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="NYSE" data-exchangeid="11" points="693.5 185, 693.5 216, 950 216"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="NSQ" data-exchangeid="96" points="676.5 202, 676.5 328, 950 328"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="BVMF" data-exchangeid="109" points="920.5 630, 920.5 440, 950 440"></polyline>
				</svg>

				<div class="data-card  card-925154951 card-up" data-tickerid="">
					<div class="name">SPCDNX</div>

				</div>

				<div class="data-card card-right card-925154728 card-up" data-tickerid="">
					<div class="name">
						S&amp;P/TSX
						<br />
						Composite
					</div>

				</div>

				<div class="data-card card-right card-913354186 card-down" data-tickerid="">
					<div class="name">NYSE</div>

				</div>

				<div class="data-card card-right card-913354090 card-down" data-tickerid="">
					<div class="name">NASDAQ</div>

				</div>

				<div class="data-card card-right card-925294714 card-up" data-tickerid="">
					<div class="name">Bovespa</div>

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
				<svg class="rect-svg" height="650" version="1.1" width="1252" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<polyline class="g-rect-fill" data-exchangecode="ICX" data-exchangeid="47" points="417.5 54, 160 54"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="LIS" data-exchangeid="44" points="589.5 175, 589.5 150, 160 150"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="LSE" data-exchangeid="20" points="542.5 180, 542.5 202, 200.5 202, 200.5 272, 160 272"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="PAR" data-exchangeid="42" points="567.5 210, 567.5 242, 230.5 242, 230.5 384, 160 384"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="MCE" data-exchangeid="39" points="520.5 287, 260.5 287, 260.5 496, 160 496"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="OSL" data-exchangeid="49" points="627.5 95, 627.5 45, 1090 45"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="HEX" data-exchangeid="46" points="727.5 95, 1040.5 95, 1040.5 157, 1090 157"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="STO" data-exchangeid="48" points="673.5 118, 1000.5 118, 1000.5 269, 1090 269"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="CPH" data-exchangeid="45" points="648.5 147, 980.5 147, 980.5 381, 1090 381"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="DBG" data-exchangeid="25" points="620.5 187, 880 187, 880 480"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="BRU" data-exchangeid="43" points="582.5 200, 582.5 320, 370 320, 370 480"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="AFX" data-exchangeid="41" points="603.5 182, 603.5 350, 540 350, 540 480"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="VTX" data-exchangeid="40" points="610.5 236, 710 236, 710 480"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="FRA" data-exchangeid="24" points="607 202, 880 202, 880 480"></polyline>
				</svg>

				<div class="data-card  card-925213640 card-down" data-tickerid="">
					<div class="name">ICEX Main</div>

				</div>

				<div class="data-card  card-913405368 card-up" data-tickerid="">
					<div class="name">BVLG</div>

				</div>

				<div class="data-card  card-913284020 card-up" data-tickerid="">
					<div class="name">FTSE 100</div>

				</div>

				<div class="data-card  card-913299056 card-up" data-tickerid="">
					<div class="name">CAC All Share</div>

				</div>

				<div class="data-card  card-913301800 card-up" data-tickerid="">
					<div class="name">IBEX 35</div>

				</div>

				<div class="data-card  card-913405351 card-up" data-tickerid="">
					<div class="name">BEL All Share</div>

				</div>

				<div class="data-card  card-913405270 card-up" data-tickerid="">
					<div class="name">AEX Index</div>

				</div>

				<div class="data-card  card-913293847 card-up" data-tickerid="">
					<div class="name">SMI PR</div>

				</div>

				<div class="data-card  card-913301905 card-up" data-tickerid="">
					<div class="name">DAX Price</div>

				</div>

				<div class="data-card card-right card-925206540 card-down" data-tickerid="">
					<div class="name">Oslo OBX</div>

				</div>

				<div class="data-card card-right card-925213654 card-down" data-tickerid="">
					<div class="name">OMX Helsinki 25</div>

				</div>

				<div class="data-card card-right card-925213647 card-down" data-tickerid="">
					<div class="name">
						OMX
						<br />
						Copenhagen 20
					</div>
				</div>

				<div class="data-card card-right card-925213634 card-down" data-tickerid="">
					<div class="name">
						OMX
						<br />
						Stockholm 30
					</div>

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

				<div class="point-main exchange-1" data-exchangecode="SHH" data-exchangeid="1">
					<div class="content">
						<div class="name">上海证券交易所</div>

						<div class="txt">总市值：50778.6(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-2" data-exchangecode="SHZ" data-exchangeid="2">
					<div class="content">
						<div class="name">深圳证券交易所</div>

						<div class="txt">总市值：32600.56(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-3" data-exchangecode="HKG" data-exchangeid="3">
					<div class="content">
						<div class="name">香港交易所</div>

						<div class="txt">总市值：60573.31(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-105" data-exchangecode="ASX" data-exchangeid="105">
					<div class="content">
						<div class="name">澳大利亚证券交易所</div>

						<div class="txt">总市值：13460.35(亿美元)</div>
					</div>
				</div>

				<div class="point-main exchange-17" data-exchangecode="SES" data-exchangeid="17">
					<div class="content">
						<div class="name">新加坡证券交易所</div>

						<div class="txt">总市值：6521.87(亿美元)</div>
					</div>
				</div>
				<svg class="rect-svg" height="650" version="1.1" width="1252" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<polyline class="g-rect-fill" data-exchangecode="NSI" data-exchangeid="18" points="457.5 180, 457.5 158, 215 158"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="BSE" data-exchangeid="19" points="422.5 180, 422.5 270, 215 270"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="TYO" data-exchangeid="22" points="855.5 53, 1035 53"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="SHH" data-exchangeid="1" points="742.5 106,842.5 106, 842.5 160, 1035 160"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="SHZ" data-exchangeid="2" points="711.5 142, 711.5 272, 1035 272"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="HKG" data-exchangeid="3" points="697.5 152, 697.5 384, 1035 384"></polyline>
					<polyline class="g-rect-fill" data-exchangecode="ASX" data-exchangeid="105" points="950.5 545, 950.5 496, 1035 496"></polyline>
				</svg>

				<div class="data-card  card-913294085 card-up" data-tickerid="">
					<div class="name">Nifty 500</div>

				</div>

				<div class="data-card  card-913255515 card-up" data-tickerid="">
					<div class="name">BSE Sensex 30</div>

				</div>

				<div class="data-card card-right card-913283994 card-down" data-tickerid="">
					<div class="name">TOPIX Index</div>

				</div>

				<div class="data-card card-right card-913243980 card-down" data-tickerid="">
					<div class="name">
						SSE
						<br />
						COMPOSITE
					</div>

				</div>

				<div class="data-card card-right card-913244420 card-down" data-tickerid="">
					<div class="name">SZSE CMPNI</div>

				</div>

				<div class="data-card card-right card-913283993 card-up" data-tickerid="">
					<div class="name">Hang Seng Index</div>

				</div>

				<div class="data-card card-right card-925177426 card-up" data-tickerid="">
					<div class="name">
						ASX
						<br />
						All Ordinaries
					</div>

				</div>
			</div>
		</section>

		<section class="partner">
			<div class="hd fm-animate animate-top1">您的订单传递到了这里</div>

			<div class="pic fm-animate animate-top2">&nbsp;</div>
		</section>

		<section class="investors">
			<div class="hd fm-animate animate-top1">投资人</div>

			<div class="pic fm-animate animate-top2">&nbsp;</div>
		</section>

		<section class="news">
			<div class="hd">新闻媒体</div>

			<div class="bd clearfix">
				<div class="hot">
					<div class="pic">
						<a href="<?php echo ($news_one["link"]); ?>" target="_blank">
							<img alt="中银网:不忘初心履使命,砥砺前行创华章" src="/zhongying1/Pub/upload/<?php echo ($news_one["img"]); ?>" style="width: 176px;height: 110px;" />
						</a>
					</div>

					<div class="cont">
						<div class="tit">
							<a href="<?php echo ($news_one["link"]); ?>" target="_blank"><?php echo ($news_one["title"]); ?></a>
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
	</div>
	<!--footer begin-->
    <div class="footer">
        <style>

           .footer .download {
                margin-top: 0
            }
        </style>
        <div class="wrap clearfix">
            <div class="left">
                <div class="cont clearfix">
                    <p class="tit">中银网下载</p>

                    <div class="download clearfix">
                        <a class="btn apple" href="https://itunes.apple.com/cn/app/yun-xun-zhong-ying-wang/id1254310557?mt=8">Apple Store</a>
                        <a class="btn google" href="http://118.190.3.124/ZhongYingWang_Setup.exe">Windows</a>
                        <a class="btn android" href="http://118.190.3.124/ZhongYingWang.apk">Android APK</a>

                        <div class="qrcode">
                            <div class="pic android">
                                <div class="arrow">&nbsp;</div>
                            </div>

                            <div class="text">Android</div>
                        </div>

                        <div class="qrcode">
                            <div class="pic ios">
                                <div class="arrow">&nbsp;</div>
                            </div>

                            <div class="text">IOS</div>
                        </div>
                    </div>
                </div>

                <div class="tips-cont">
                    <p class="tips">
                        中银网网站上的任何内容均不可视为购买或出售证券、期货或其它投资产品的一种建议或招揽。任何信息及数据仅供投资者参考，所有历史数据均不可视为对未来走势的判断依据。投资者应仔细了解相关金融产品，明确其风险因素及自身的风险承受能力，或寻求专业的投资顾问的建议。投资有风险，入市须谨慎。
                    </p>

                    <p class="msg">
                        <a class="policy" href="policy.html">中银服务协议</a>
                        <span class = "copyright">中银网 鲁ICP备17035173号-1</span>
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
                    </p>
                </div>
            </div>

            <div class="right">
                <div class="cont concat-cont">
                    <p class="tit">联系我们</p>

                    <div class="msg">
                        <p class="telephone"><?php echo ($Tel["content"]); ?></p>

                        <p class="email"><?php echo ($email["content"]); ?></p>

                        <p class="date">周一到周五0:00-24:00</p>
                    </div>
                </div>

                <div class="cont">
                    <div class="clearfix">
                        <p class="qr_code">&nbsp;</p>
                    </div>

                    <div class="text clearfix">中银网资讯公众号</div>
                </div>
            </div>
        </div>
    </div>
	<script src="/zhongying1/Pub/home/js/jquery.min.1.8.3.js"></script>
	<script src="/zhongying1/Pub/home/js/visit.js"></script>
	<!--footer  end-->
	<script type = "text/javascript" src = "/zhongying1/Pub/home/js/jquery.d882153f.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/home/js/echarts.3fb6b163.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/home/js/index.js"></script>
	<script type="text/javascript" src="/zhongying1/Pub/home/js/platform.js"></script>
</body>
</html>