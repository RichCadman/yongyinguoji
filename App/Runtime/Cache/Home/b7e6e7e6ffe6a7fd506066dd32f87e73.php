<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head lang = "zh">
	<meta charset = "utf-8">
	<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1">
	<meta name = "copyright" content = "中盈网">
	<meta name = "description" content = "中盈网,最懂中国投资者的互联网券商,国内唯一支持一个账号,一笔资金,一款软件即可进行全球资产配置的平台,白天交易A股,港股,恒指,晚上交易黄金,白银,原油,外汇,不错过任何投资机会,在线免费下载中盈网交易软件">
	<meta name = "keywords" content = "中盈网,中盈网软件,互联网券商,原油期货,黄金期货,港股交易,人民币外汇,ETF,美股首页,美股行情,美股开户">
	<meta name = "viewport" content = "width=device-width,initial-scale=1,maximum-scale=1">
	<title>注册</title>
	<script>!function (e, t, a, n, c, o, s) {
      e.GoogleAnalyticsObject = c, e[c] = e[c] || function () {
          (e[c].q = e[c].q || []).push(arguments)
        }, e[c].l = 1 * new Date, o = t.createElement(a), s = t.getElementsByTagName(a)[0], o.async = 1, o.src = "/zhongying1/Pub/home/js/analytics.js", s.parentNode.insertBefore(o, s)
    }(window, document, "script", 0, "ga"), ga("create", "UA-93024071-1", "auto"), ga("send", "pageview")</script>
	<link rel = "shortcut icon" href = "/zhongying1/Pub/home/images/favicon.ico">
	<link href = "/zhongying1/Pub/home/css/login-register.css" rel = "stylesheet">

	<script type="text/javascript" src="/zhongying1/Pub/home/js/requestseo.js"></script>
</head>
<body class = "zh">
	<div class = "header active">
		<div class = "nav clearfix">
			<a class = "logo" href = "index.html">
				<span class = "icon" style="background:tranparent;"><img style="width:130px;margin-top:10px;" src="/zhongying1/Pub/home/images/logo.png" alt=""></span>
			</a>
			<nav class = "nav-menus">
				<a href = "/zhongying1/index.php/Index/index">首页</a>
                <a href = "/zhongying1/index.php/Product/index">产品介绍</a>
                <a href = "/zhongying1/index.php/About/index">关于我们</a>
                <a href = "/zhongying1/index.php/Join/index">加入我们</a>
                <a href = "/zhongying1/index.php/Help/index">帮助</a>
                <?php if($_SESSION['userinfo']): ?><a href = "/zhongying1/index.php/My/index">我的账户</a>
                <a href = "/zhongying1/index.php/Login/index">退出</a>
                <?php else: ?>
                <a href = "/zhongying1/index.php/Login/index" class = "active">登录</a><?php endif; ?>
			</nav>
		</div>
	</div>
	<div class = "header fixed active" style = "display:none">
		<div class = "nav clearfix">
			<a class = "logo" href = "index.html">
				<span
            class = "icon"></span>
			</a>
			<nav class = "nav-menus">
				<a href = "index.html">首页</a>
				<a href = "introduce.html">产品介绍</a>
				<a href = "about.html" class = "active">关于我们</a>
				<a href = "join.html"
            >加入我们</a>
				<a href = "help.html">帮助</a>
			</nav>
		</div>
	</div>
	<div id="mid">
		<div class="content login">
			<div class="wcon">
				<div class="lgleft fl">
					<img src="/zhongying1/Pub/home/images/rlbanner.png"  width="719" height="475" />
				</div>
				<div class="lgright fr">
					<div class="lrtitle"> <strong class="fl">账户注册</strong>
						<span class="fr">
							已经注册？
							<a href="/zhongying1/index.php/Login/index">立即登录</a>
						</span>
					</div>
					<div id="lrform">
						<form name="regform" id="regform" action="/zhongying1/index.php/Reg/reg" onSubmit="return false;">
							<input type="hidden" name="_csrf" value="715b706e-71a8-440d-87d6-16980ca727b2"/>
							<div class="rl_input">
								<span class="ipt_name">用户名</span>
								<input type="text" name="username" id="username" class="input" placeholder="请输入用户名" maxlength="50" minlength="6" autocomplete="off"
                         onkeyup="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'') " onafterpaste="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'') "/>
							</div>
							<div class="rl_input">
								<span class="ipt_name">手机号码</span>
								<input type="hidden" name="agentcode" value="">
								<input type="text" name="phone" id="phone" class="input" placeholder="请输入手机号码" maxlength="11" autocomplete="off" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "/>
							</div>
							<div class="rl_input">
								<span class="ipt_name">手机验证</span>
								<input type="text" name="validcode" id="phonecode" class="input phonecode" placeholder="验证码" maxlength="6" autocomplete="off" onkeyup="value=value.replace(/[\W]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
								<button class="getcode" id="getcode" modle="reg">立即获取</button>
							</div>
							<div class="rl_input">
								<span class="ipt_name">设置密码</span>
								<input type="password" name="password" id="password" class="input" placeholder="请输入密码" maxlength="15" autocomplete="off"/>
							</div>
							<div class="rl_input last">
								<span class="ipt_name">确认密码</span>
								<input type="password" name="password2" id="password2" class="input" placeholder="请再次输入密码" maxlength="15" autocomplete="off"/>
							</div>
							<p class="reg_ckeckbox">
								<input type="checkbox" name="isread" value="1" id="isread" class="checked" />
								<label for="checked" class="iconfont">&nbsp;我已阅读并接受《
								<a href="/zhongying1/index.php/Reg/agreement" target="_blank">注册协议</a>
								》</label>
							</p>
							<button type="button" name="regbtn" class="rlbtn" id="regbtn">立即注册</button>
						</form>
					</div>
				</div>
			</div>
		</div>
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
    <!--footer  end-->
	<script src="/zhongying1/Pub/home/js/jquery.min.1.8.3.js"></script>
	<script src="/zhongying1/Pub/home/js/visit.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/home/js/jquery.d882153f.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/home/js/layer.js"></script>
	<script type = "text/javascript" src = "/zhongying1/Pub/home/js/main.js"></script>
	<script type="text/javascript" src="/zhongying1/Pub/home/js/platform.js"></script>
</body>
</html>