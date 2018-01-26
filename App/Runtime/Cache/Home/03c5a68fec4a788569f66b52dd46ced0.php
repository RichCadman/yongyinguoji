<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="utf-8">
  <title>账户信息</title>
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
            <li class="cur">
              <a href="/zhongying1/index.php/Mmy/index">账户信息</a> 
            </li>
            <li>
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
            <li>账户信息</li>
          </ul>
          <div class="user_con">
            <div class="m1">
              <div class="mlist">
                <span class="ctitle">账户余额：</span>
                <div class="money">
                  <span>0.00</span>
                  元
                </div>
              </div>
              <div class="mlist">
                <span class="ctitle">信管家账号：</span>
                <div class="money">
                  <span>338191</span>
                </div>
              </div>
              <div class="mlist">
                <div class="uname"  style="width: 90%;">
                  你好！
                  <span><?php echo ($_SESSION['userinfo']['username']); ?></span>
                </div>
                <a href="#" class="lbtn">充值</a>
                <a href="#" class="lbtn">提现</a>
              </div>
            </div>
            <div class="m2">
              <div class="mtitle">当前方案明细：</div>
              <form id="runMemTradePlanform" action="/user/queryRunMemTradePlan_ajax">
                <input type="hidden" name="_csrf" value="fc73c90b-2b98-4e7b-bc09-012cadc8dcb3"/>
              </form>
              <table border="0" cellpadding="0" cellspacing="1" class="mtable">
                <thead>
                  <tr>
                    <td style="width:20%;">方案编号</td>
                    <td style="width:20%;">方案类型</td>
                    <td style="width:15%;">总操盘资金($)</td>
                    <td style="width:15%;">操盘保证金($)</td>
                    <td style="width:15%;">亏损平仓线($)</td>
                    <td style="width:15%;">追加保证金($)</td>
                  </tr>
                </thead>
                <tbody id="runMemTradePlanContent"></tbody>
              </table>
            </div>
            <div class="m2 nob">
              <div class="mtitle">累计终止方案信息：</div>
              <table border="0" cellpadding="0" cellspacing="1" class="mtable">
                <thead>
                  <tr>
                    <td>累计终止方案</td>
                    <td>累计支出保证金</td>
                    <td>累计追加保证金</td>
                    <td>累计支出管理费</td>
                    <td>实际盈亏</td>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>0</code>
                      <small>条</small>
                    </td>
                    <td>
                      <code></code>
                      <small>美元</small>
                    </td>
                    <td>
                      <code></code>
                      <small>美元</small>
                    </td>
                    <td>
                      <code></code>
                      <small>美元</small>
                    </td>
                    <td>
                      <code></code>
                      <small>美元</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
  <form action="/logout" method="post" id="logout" style="display: none">
    <input type="hidden" name="_csrf" value="fc73c90b-2b98-4e7b-bc09-012cadc8dcb3"/>
  </form>

  <script src="/zhongying1/Pub/mobile/js/jquery.min.js"></script>
  <script src="/zhongying1/Pub/mobile/js/jquery.dropkick-min.js"></script>
  <script src="/zhongying1/Pub/mobile/js/checkidno.js"></script>
  <script src="/zhongying1/Pub/mobile/js/layer/layer.js"></script>
  <script src="/zhongying1/Pub/mobile/js/laydate/laydate.js"></script>
  <script src="/zhongying1/Pub/mobile/js/main.js"></script>
  <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/jquery.d882153f.js"></script>
  <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/index.js"></script>
  <script type="text/javascript">
    var url=$("#runMemTradePlanform").attr('action');
    var data=$("#runMemTradePlanform").serialize();
    ajax.submit(url, data, function (d) {
        var content="";
        if (d.success==true) {
            content="<tr><td>"+d.data.code+"</td><td>"
                +d.data.typename+"</td><td>"
                +d.data.totalmoney+"</td><td>"
                +d.data.deposit+"</td><td>"
                +d.data.forcesale+"</td><td>"
                +d.data.depositmore+"</td></tr>";
        } else {
            content="<tr><td colspan='6'>没有正在交易的方案</td><tr>";
        }
        $("#runMemTradePlanContent").html(content);
    }, function (e) {
        $("#runMemTradePlanContent").html("<tr><td colspan='6'>网络繁忙请稍后再试</td><tr>");
    });
</script>
</body>
</html>