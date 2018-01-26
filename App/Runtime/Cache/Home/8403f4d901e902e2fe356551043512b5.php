<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html>

<html style = "font-size: 69%;">
<head lang = "zh">
    <meta http-equiv = "Content-Type" content = "text/html; charset=UTF-8">
    <meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1">
    <meta name = "copyright" content = "中银网">
    <meta name = "description" content = "中银网,最懂中国投资者的互联网券商,国内唯一支持一个账号,一笔资金,一款软件即可进行全球资产配置的平台,白天交易A股,港股,恒指,晚上交易黄金,白银,原油,外汇,不错过任何投资机会,在线免费下载中银网交易软件">
    <meta name = "keywords" content = "中银网,中银网软件,互联网券商,原油期货,黄金期货,港股交易,人民币外汇,ETF,美股首页,美股行情,美股开户">
    <meta name = "viewport" content = "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name = "format-detection" content = "telephone=no">
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
    }()</script>
    <script>!function (e, t, a, n, c, o, s) {
      e.GoogleAnalyticsObject = c, e[c] = e[c] || function () {
          (e[c].q = e[c].q || []).push(arguments)
        }, e[c].l = 1 * new Date, o = t.createElement(a), s = t.getElementsByTagName(a)[0], o.async = 1, o.src = "/zhongying1/Pub/mobile/js/analytics.js", s.parentNode.insertBefore(o, s)
    }(window, document, "script", 0, "ga"), ga("create", "UA-93024071-1", "auto"), ga("send", "pageview")</script>
    <link rel = "shortcut icon" href = "/zhongying1/Pub/mobile/images/favicon.ico">
    <link href = "/zhongying1/Pub/mobile/css/join.css" rel = "stylesheet">
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
    <div id = "join">
        <div id = "banner" class = "banner"  style="background-image:url(/zhongying1/Pub/mobile/images/banner4.jpg);">
            <div class = "cont-c clearfix">
                <div class = "cont1">
                    <div class = "tit">以梦为马  莫负韶华</div>
                    <div class = "txt">
                        这里有金融大咖，
                        <br>
                        这里有技术大牛。
                        <br>
                        这里是靓仔与美女的聚集地，
                        <br>这里是80、90后有志青年的乌托邦。</div>
                    <div class = "txt">
                        我们有实力，
                        <br>
                        我们有情怀，
                        <br>
                        我们肩负让交易更简单的使命，
                        <br>我们同时享受着每快0.001秒的欢欣鼓舞。</div>
                    <div class = "txt">
                        扁平化的管理，
                        <br>
                        让你可以直面BOSS，畅所欲言。
                        <br>
                        最优厚的待遇，
                        <br>
                        让你可以追求更有品质的生活。
                        <br>你还在犹豫什么？还不赶快加入我们，诗酒趁年华。</div>
                </div>
                <div class = "cont2">
                    <div class = "more-btn">更多职位</div>
                </div>
            </div>
        </div>
        <div class = "cont-road">
            <div class = "cont-wrap">
                <div class = "tit">我们在路上</div>
                <div class = "swiper-common swiper-container swiper-container-horizontal">
                    <ul class = "swiper-wrapper content">
                        <li class = "swiper-slide service swiper-slide-active" style = "width: 414px;">
                            <div class = "icon"></div>
                            <div class = "item-t">强大的股东背景</div>
                            <div class = "item-c">
                                中投海外贸易发展基金与
                                <br>
                                省商务厅下属国企山东国
                                <br>际贸易集团战略入股</div>
                        </li>
                        <li class = "swiper-slide provider swiper-slide-next" style = "width: 414px;">
                            <div class = "icon"></div>
                            <div class = "item-t">一流的研发团队</div>
                            <div class = "item-c">
                                来自华为、网易、360等名
                                <br>
                                企科技与金融人才、985/211
                                <br>名校毕业精英鼎力加盟</div>
                        </li>
                        <li class = "swiper-slide space" style = "width: 414px;">
                            <div class = "icon"></div>
                            <div class = "item-t">极具竞争力的产品</div>
                            <div class = "item-c">
                                独家支持一个账户，交易全
                                <br>
                                球。丰富的产品线以及极致
                                <br>的客户体验</div>
                        </li>
                        <li class = "swiper-slide people" style = "width: 414px;">
                            <div class = "icon"></div>
                            <div class = "item-t">强大的合作伙伴</div>
                            <div class = "item-c">
                                全球知名券商作为底层清
                                <br>
                                算通道，花旗、富国等知
                                <br>名银行作为资金托管</div>
                        </li>
                        <li class = "swiper-slide vc" style = "width: 414px;">
                            <div class = "icon"></div>
                            <div class = "item-t">光明的行业前景</div>
                            <div class = "item-c">
                                朝阳行业，风投大咖、科技
                                <br>大佬已累计数百亿布局此行业</div>
                        </li>
                    </ul>
                    <div class = "swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
                        <span
                        class = "swiper-pagination-bullet swiper-pagination-bullet-active"></span>
                        <span
                        class = "swiper-pagination-bullet"></span>
                        <span class = "swiper-pagination-bullet"></span>
                        <span
                        class = "swiper-pagination-bullet"></span>
                        <span class = "swiper-pagination-bullet"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class = "cont-feature">
            <div class = "cont-wrap">
                <div class = "benefit">
                    <div class = "tit">我们提供</div>
                    <ul class = "content">
                        <li class = "b1">
                            <div class = "icon"></div>
                            专业系统的入职培训
                        </li>
                        <li class = "b2">
                            <div class = "icon"></div>
                            有诱惑力的薪酬
                        </li>
                    </ul>
                    <ul class = "content">
                        <li class = "b3">
                            <div class = "icon"></div>
                            五险一金福利
                        </li>
                        <li class = "b4">
                            <div class = "icon"></div>
                            免费茶饮、甜点
                        </li>
                    </ul>
                    <ul class = "content">
                        <li class = "b5">
                            <div class = "icon"></div>
                            带薪休假
                        </li>
                        <li class = "b6">
                            <div class = "icon"></div>
                            生日会
                        </li>
                    </ul>
                    <ul class = "content">
                        <li class = "b7">
                            <div class = "icon"></div>
                            加班福利
                        </li>
                        <li class = "b8">
                            <div class = "icon"></div>
                            定期团建
                        </li>
                    </ul>
                </div>
                <div class = "team-pic swiper-common swiper-container swiper-container-horizontal">
                    <ul class = "swiper-wrapper">
                        <li class = "swiper-slide team1 swiper-slide-active" style = "width: 414px;">
                            <div class = "title">多样化的培养方案</div>
                        </li>
                        <li class = "swiper-slide team2 swiper-slide-next" style = "width: 414px;">
                            <div class = "title">妙趣横生的生日会</div>
                        </li>
                        <li class = "swiper-slide team3" style = "width: 414px;">
                            <div class = "title">惬意的部门小聚</div>
                        </li>
                    </ul>
                    <div class = "swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
                        <span
                        class = "swiper-pagination-bullet swiper-pagination-bullet-active"></span>
                        <span
                        class = "swiper-pagination-bullet"></span>
                        <span class = "swiper-pagination-bullet"></span>
                    </div>
                </div>
            </div>
        </div>
        <div id = "job-content" class = "job-cont">
            <div class = "job-title">我们需要这样的你</div>
            <div class = "job-list">
                <div class = "swiper-container free-mode swiper-container-horizontal swiper-container-free-mode">
                    <ul class = "nav swiper-wrapper">
                        <li class = "swiper-slide active manager swiper-slide-active">管理岗位</li>
                        <li class = "swiper-slide develop swiper-slide-next">技术岗位</li>
                        <li class = "swiper-slide product">产品岗位</li>
                        <li class = "swiper-slide design">设计岗位</li>
                        <li class = "swiper-slide market">市场岗位</li>
                        <li class = "swiper-slide operations">运营岗位</li>
                    </ul>
                </div>
                <ul class = "sub-nav">
                    <li class = "">
                        <div class = "title">产品总监</div>
                    </li>
                    <li class = "operations-director">
                        <div class = "title">运营总监</div>
                    </li>
                    <li class = "">
                        <div class = "title">销售总监</div>
                    </li>
                    <li class = "ued-director">
                        <div class = "title">UED设计经理</div>
                    </li>
                </ul>
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
    </div>
    <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/jquery.d882153f.js"></script>
    <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/join.js"></script>
</body>
</html>