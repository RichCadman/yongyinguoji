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
  <link href = "/zhongying1/Pub/mobile/css/join.css" rel = "stylesheet">
  <link href="/zhongying1/Pub/mobile/css/main.css" rel="stylesheet"/>
  <link rel="shortcut icon" href="favicon.ico"></head>
<body>
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
  <div id="mid">
    <div class="content user">
      <div class="wcon">
        <div class="user_left">
          <div class="ltit">操盘账户<img src="/zhongying1/Pub/mobile/images/arror.png" alt=""></div>
          <ul class="clearfix">
            <li>
              <a href="/zhongying1/index.php/Mmy/index">账户信息</a> 
            </li>
            <li >
              <a href="/zhongying1/index.php/Mmy/safe">账户安全</a> 
            </li>
            <li> 
              <a href="/zhongying1/index.php/Mmy/cases">操盘方案</a>
              
            </li>
            <li>
              <a href="/zhongying1/index.php/Mmy/deposit">账户充值</a>
              
            </li>
            <li class="cur">
              <a href="/zhongying1/index.php/Mmy/withdraw">账户提现</a>
              
            </li>
          </ul>
        </div>
        <div class="user_right fr">
          <ul class="tit">
            <li>
              <a href="/zhongying1/index.php/Mmy/withdraw">账户提现</a>
            </li>
            <li class="nocur">
              <a href="/zhongying1/index.php/Mmy/withdraw_list.html">提现记录</a>
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
  <script src="/zhongying1/Pub/mobile/js/jquery.min.js"></script>
  <script src="/zhongying1/Pub/mobile/js/layer/layer.js"></script>
  <script src="/zhongying1/Pub/mobile/js/laydate/laydate.js"></script>
  <script src="/zhongying1/Pub/mobile/js/main.js"></script>
   <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/jquery.d882153f.js"></script>
  <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/index.js"></script>
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