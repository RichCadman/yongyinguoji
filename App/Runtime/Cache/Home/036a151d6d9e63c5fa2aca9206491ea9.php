<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="utf-8">
  <title>账户安全</title>
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
  <meta name="author" content="SDTEAM"/>
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
            <li class="cur">
              <a href="/zhongying1/index.php/Mmy/safe">账户安全</a> 
            </li>
            <li>
              <a href="/zhongying1/index.php/Mmy/cases">操盘方案</a>
              
            </li>
            <li>
              <a href="/zhongying1/index.php/Mmy/deposit">账户充值</a>
              
            </li>
            <li>
              <a href="/zhongying1/index.php/Mmy/withdraw">账户提现</a>
              
            </li>

          </ul>
        </div>
        <div class="user_right fr">
          <ul class="tit">
            <li>账户安全</li>
          </ul>
          <div class="user_con mt0">
            <ul class="safe">
              <li class="cur clearfix">
                <i class="fl icon phone"></i>
                <div class="fl name">绑定手机</div>
                <div class="fl desc">
                  <span>181****6352</span>
                  ，使用此号码登录
                  <span>中银国际</span>
                </div>
                <button class="fl btn" btit="修改绑定手机" burl="user_safe_editphone.html" bheight="290px">更改</button>
              </li>
              <li class="clearfix">
                <i class="fl icon realname"></i>
                <div class="fl name">身份认证</div>
                <div class="fl desc">实名认证后，才能申请操盘方案和提现</div>
                <button class="fl btn" id="realnamebtn" btit="实名认证" burl="user_safe_authent.html" bheight="320px">认证</button>

              </li>
              <li class="clearfix">
                <i class="fl icon withdawpass"></i>
                <div class="fl name">提现密码</div>
                <div class="fl desc">设置或修改提现密码</div>
                <button class="fl btn" btit="提现密码" burl="user_safe_withdrawpass.html" bheight="410px">更改</button>
              </li>
              <li class="cur clearfix">
                <i class="fl icon loginpass"></i>
                <div class="fl name">登录密码</div>
                <div class="fl desc">设置或修改登录密码</div>
                <button class="fl btn" btit="登录密码" burl="user_safe_pass.html" bheight="340px">更改</button>
              </li>
              <!--            <li class="cur">
              <i class="fl icon loginpass"></i>
              <div class="fl name">信管家密码</div>
              <div class="fl desc">修改信管家密码</div>
              <button class="fl btn" btit="登录密码" burl="user_safe_xgjpass.html" bheight="390px">更改</button>
            </li>
            -->
            <li class="clearfix">
              <i class="fl icon bankcard"></i>
              <div class="fl name">绑定银行卡</div>
              <div class="fl desc">绑定银行卡后才能申请提现</div>

              <button class="fl btn" btit="绑定银行卡" burl="user_safe_bankcard.html" bheight="455px" >绑定</button>
            </li>
            <li class="clearfix">
              <i class="fl icon address"></i>
              <div class="fl name">绑定住址</div>
              <div class="fl desc">绑定您的真实住址,不定期有小礼品相送</div>
              <button class="fl btn" btit="绑定住址" burl="user_safe_address.html" bheight="340px">设置</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</div>
<script src="/zhongying1/Pub/mobile/js/jquery.min.js"></script>
<script src="/zhongying1/Pub/mobile/js/jquery.dropkick-min.js"></script>
<script src="/zhongying1/Pub/mobile/js/checkidno.js"></script>
<script src="/zhongying1/Pub/mobile/js/layer/layer.js"></script>
<script src="/zhongying1/Pub/mobile/js/laydate/laydate.js"></script>
<script src="/zhongying1/Pub/mobile/js/main.js"></script>
 <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/jquery.d882153f.js"></script>
  <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/index.js"></script>
<script type="text/javascript">
    /*$(".safe .btn.fl[btit]").click(function(){
        openifm($(this).attr('btit'),$(this).attr('burl'),$(this).attr('bheight'))
    });
    $('#deleteBankCard').click(function (e) {
        var _this = $(this);
        layer.confirm('<div class="paytip">确认解除绑定银行卡？</div>', {
            title: '确认解除绑定',
            btn: ['确定','取消'],
            area: '460px',
            offset: '200px'
        }, function () {
            _this.attr('disabled', true).text('解绑中...');
            var data = _this.parent().serialize(), url = _this.parent().attr('action');
            ajax.submit(url, data, function (d) {
                if(d.success==true){
                    layer.msg('解除绑定成功！',{icon:1},function(){
                        window.location.href = "/user/user_safe";
                    });
                }else{
                    layer.msg(d.resultMsg, function () {
                    });
                    _this.removeAttr('disabled').text('解除绑定');
                }
            }, function (e) {
                layer.msg('网络繁忙请稍后再试', function () {
                });
                _this.removeAttr('disabled').text('解除绑定');
                return;
            });
        }, function () {

        });
        return false;
    });*/
</script>
</body>
</html>