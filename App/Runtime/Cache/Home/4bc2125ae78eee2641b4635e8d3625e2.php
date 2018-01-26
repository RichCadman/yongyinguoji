<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="utf-8">
  <title>账户提现</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="robots" content="index,follow"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="HandheldFriendly" content="true">
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="renderer" content="webkit">
  <meta name="format-detection" content="telphone=no, email=no"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="author" content="SDTEAM">
  <link href = "/zhongying1/Pub/home/css/login-register.css" rel = "stylesheet">
  <link href="/zhongying1/Pub/home/css/main.css" rel="stylesheet"/>
  <link rel="shortcut icon" href="favicon.ico"></head>
<body>

  <div class = "header active">
    <div class = "nav clearfix">
      <a class = "logo" href = "index.html">
        <span class = "icon" style="background:tranparent;"><img style="width:130px;margin-top:-5px;" src="/zhongying1/Pub/home/images/logo.png" alt=""></span>
      </a>
      <nav class = "nav-menus">
        <a href = "/zhongying1/index.php/Index/index">首页</a>
                <a href = "/zhongying1/index.php/Product/index">产品介绍</a>
                <a href = "/zhongying1/index.php/About/index">关于我们</a>
                <a href = "/zhongying1/index.php/Join/index">加入我们</a>
                <a href = "/zhongying1/index.php/Help/index">帮助</a>
                <?php if($_SESSION['userinfo']): ?><a href = "/zhongying1/index.php/My/index" class = "active">我的账户</a>
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
    <div class="content user">
      <div class="wcon">
        <div class="user_left fl">
          <div class="ltit">操盘账户</div>
          <ul>
            <li>
              <a href="/zhongying1/index.php/My/index">账户信息</a> <i>></i>
            </li>
            <li>
              <a href="/zhongying1/index.php/My/safe">账户安全</a> <i>></i>
            </li>
            <li>
              <a href="/zhongying1/index.php/My/cases">操盘方案</a>
              <i>></i>
            </li>
            <li>
              <a href="/zhongying1/index.php/My/deposit">账户充值</a>
              <i>></i>
            </li>
            <li class="cur">
              <a href="/zhongying1/index.php/My/withdraw">账户提现</a>
              <i>></i>
            </li>

          </ul>
        </div>
        <div class="user_right fr">
          <ul class="tit">
            <li>
              <a href="/zhongying1/index.php/My/withdraw">账户提现</a>
            </li>
            <li class="nocur">
              <a href="/zhongying1/index.php/My/withdraw_list.html">提现记录</a>
            </li>
          </ul>
          <div class="user_con">

            <div class="momsgtip">
              <p class="desc">为了保障您的资金安全，首次提现前，必须通过实名认证、完成绑定银行卡、设置提现密码。</p>
              <div class="tip_btn_list">
                <span>实名认证</span>
                <button id="realnamebtn" class="btn nob" btit="实名认证" burl="user_safe_authent.html" bheight="320px">立即认证</button>

              </div>
              <div class="tip_btn_list">
                <span>银行卡</span>
                <button class="btn nob" btit="绑定银行卡" burl="user_safe_bankcard.html" bheight="455px">立即绑定</button>

              </div>
              <div class="tip_btn_list">
                <span>提现密码</span>
                <button class="btn nob" btit="提现密码" burl="user_safe_withdrawpass.html" bheight="410px">设置</button>
              </div>
            </div>

          </div>
        </div>
        <div class="clear"></div>
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
  <script src="/zhongying1/Pub/home/js/jquery.min.js"></script>
  <script src="/zhongying1/Pub/home/js/layer/layer.js"></script>
  <script src="/zhongying1/Pub/home/js/laydate/laydate.js"></script>
  <script src="/zhongying1/Pub/home/js/main.js"></script>
  <script type="text/javascript">
 /*$(".tip_btn_list .nob").click(function(){
  openifm($(this).attr('btit'),$(this).attr('burl'),$(this).attr('bheight'))
 })
 $("#money").blur(function(){
     var val=toDecimal2($(this).val());
     if (!val) {
         val = "0.00";
     }
     $(this).val(val);
     var balance=toDecimal2(parseFloat($("#balance").val()));
     var txfeerate=toDecimal2(parseFloat($("#txfeerate").val()));
     var minfee=toDecimal2(parseFloat($("#minfee").val()));
     var minwithdraw=toDecimal2(parseFloat($("#minwithdraw").val()));
     if(val<minwithdraw){
         layer.msg('提现金额不能低于'+minwithdraw+'元', function () {
             $("#money").focus();
         });
         return;
     }
     if(val>balance){
         layer.msg('提现金额不能高于账户余额', function () {
             $("#money").focus();
         });
         return;
     }
     var fee=txfeerate*val/1000;
     if(fee<minfee){
         fee=minfee;
     }
     $("#fee").html(toDecimal2(fee));
     $("#realmoney").html(toDecimal2(val-fee));
 })*/
 /*账户提现*/
 /*$("#gowithdraw").click(function () {

     if ($("#phonecode").val().length < 6) {
         layer.msg('请输入正确的手机验证码', function () {
         });
         $("#phonecode").select();
         return;
     }
     var mval = parseFloat($("#money").val());
     var balance=toDecimal2(parseFloat($("#balance").val()));
     var minwithdraw=toDecimal2(parseFloat($("#minwithdraw").val()));
     var realmoney = parseFloat($("#realmoney").text());
     if (isNaN(mval) || mval < minwithdraw || mval > balance) {
         layer.msg('提现金额不能低于'+minwithdraw+"元，且不能高于账户余额", function () {
             $("#money").focus();
         });
         return;
     }

     if ($("#withdrawpass").val().length < 6) {
         layer.msg('请输入正确的提现密码', function () {
             $("#withdrawpass").focus();
         });
         return;
     }
     var _this = $(this);
     var data = $('#safeform').serialize(), url = $('#safeform').attr('action');
     _this.attr('disabled', true).text('提交中...');
     ajax.submit(url, data, function (d) {
         if(d.success==true){
             parent.layer.closeAll();
             parent.layer.msg('提现申请提交成功<br>请耐心等待管理员审核');
             setTimeout(function () {
                 location.href = "/user/user_withdraw_list.html";
             }, 3000);
         }else{
             parent.layer.msg(d.resultMsg);
             _this.removeAttr('disabled').text('立即绑定');
         }

     }, function (e) {
         parent.layer.msg('网络繁忙请稍后再试');
         _this.removeAttr('disabled').text('立即绑定');
         return;
     });
 })*/
</script>
</body>
</html>