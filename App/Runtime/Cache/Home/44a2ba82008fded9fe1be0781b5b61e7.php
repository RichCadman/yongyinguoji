<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!-- saved from url=(0022)http://www.webull.com/ -->
<html style = "font-size: 69%;">
<head lang = "zh">
	<meta http-equiv = "Content-Type" content = "text/html; charset=UTF-8">
	<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1">
	<meta name = "copyright" content = "中盈网">
	<meta name = "description" content = "中盈网,最懂中国投资者的互联网券商,国内唯一支持一个账号,一笔资金,一款软件即可进行全球资产配置的平台,白天交易A股,港股,恒指,晚上交易黄金,白银,原油,外汇,不错过任何投资机会,在线免费下载中盈网交易软件">
	<meta name = "keywords" content = "中盈网,中盈网软件,互联网券商,原油期货,黄金期货,港股交易,人民币外汇,ETF,美股首页,美股行情,美股开户">
	<meta name = "viewport" content = "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
	<meta name = "format-detection" content = "telephone=no">
	<meta name="360-site-verification" content="a1352ea97ee33943a2c1149480300607" />
	<meta name="google-site-verification" content="WfnUo5LX-chD_doRst-vOtpXmBU0SsWTAzDoZS7Mqss" />
	<meta name="sogou_site_verification" content="RekGlZkvGr"/>
	<title>中盈网|互联网券商|中盈网官网|最懂中国投资者的互联网券商</title>
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
	<link href = "/zhongying1/Pub/mobile/css/login-register.css" rel = "stylesheet">
	<script type="text/javascript" src="/zhongying1/Pub/mobile/js/requestseo.js"></script>
</head>
<body class = "zh">
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

    
	<div id="home">
		<div id="mid">
			<div class="content login">
				<div class="wcon clearfix">
					<div class="lgright">
						<div class="lrtitle clearfix"> <strong class="fl">账户登录</strong>
							<span class="fr">
								还没账号？
								<a href="/zhongying1/index.php/Mreg/index">立即注册</a>
							</span>
						</div>
						<div id="lrform">
							<form name="login" id="login" action="/zhongying1/index.php/Mlogin/login_do" onSubmit="return false;">
								<input type="hidden" name="_csrf" value="715b706e-71a8-440d-87d6-16980ca727b2"/>
								<div class="rl_input"> <i class="phoneicon"></i>
									<input type="text" name="username" id="username" class="input" placeholder="请输入手机号码或用户名" maxlength="50" autocomplete="off"
                                   onkeyup="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'') " onafterpaste="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'') "/>
								</div>
								<div class="rl_input"> <i class="pwdicon"></i>
									<input type="password" name="password" id="password" class="input" placeholder="请输入密码"
                                   autocomplete="off" maxlength="15"/>
								</div>
								<!-- <div class="rl_input" id="showcode">
									<i class="codeicon"></i>
									<input type="text" name="vcode" id="ycode" maxlength="6"
								                                   onkeyup="value=value.replace(/[W]/g,'')"
								                                   onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^d]/g,''))"
								                                   autocomplete="off" disabled="true" class="input" placeholder="输入验证码"/>
									<img src="/valicode" class="logincode"/>
								</div> -->
								<button type="button" name="loginbtn" id="loginbtn" class="rlbtn">立即登录</button>
								<div class="links">
									<a href="/zhongying1/index.php/Mreg/forget" class="fl">忘记密码?</a>
									<a href="/zhongying1/index.php/Mreg/index" class="fr">免费注册</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
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
	<script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/layer.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/main.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/index.js"></script>
</body>
</html>