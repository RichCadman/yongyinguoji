<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="utf-8">
  <title>操盘方案</title>
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
            <li class="cur"> 
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
            <li>
              <a href="/zhongying1/index.php/Mmy/cases">操盘方案</a>
            </li>
            <li  class="nocur">
              <a href="/zhongying1/index.php/Mmy/case_list.html">终止方案记录</a>
            </li>
            <li class="nocur">
              <a href="/zhongying1/index.php/Mmy/cashin_list.html">追加保证金记录</a>
            </li>
          </ul>
          <div class="user_con case">
            <input type="hidden" id="balance" value="0.00">
            <input type="hidden" id="inrate" value="7.20">
            <form id="stoptradeform" action="/trade/stoptrade">
              <input type="hidden" name="_csrf" value="fc73c90b-2b98-4e7b-bc09-012cadc8dcb3"/>
            </form>
            <table width="95%;" border="0" cellpadding="0" cellspacing="0" class="mtable">
              <thead>
                <tr>
                  <td>方案编号</td>
                  <td>方案类型</td>
                  <td>总操盘资金($)</td>
                  <td>操盘保证金($)</td>
                  <td>追加保证金($)</td>
                  <td width="200">操作</td>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td colspan="6">暂无运行方案，请到国际期货创建方案</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
  <script src="/zhongying1/Pub/mobile/js/jquery.min.js"></script>
  <script src="/zhongying1/Pub/mobile/js/layer/layer.js"></script>
  <script src="/zhongying1/Pub/mobile/js/main.js"></script>
   <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/jquery.d882153f.js"></script>
  <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/index.js"></script>
  <script type="text/javascript">
    /*$(function(){
        $("#addm").click(function(){
            var _this = $(this);
            buybox($("#balance").val(),$("#inrate").val());
        })
        $("#stopc").click(function(){
            var _this = $(this);
            layer.confirm('<div class="paytip">确认终止方案？</div><div class="tipmsg">终止方案前，请先平仓！</div>', {
                title: '确认信息',
                btn: ['确认终止','取消'],
                area: '360px',
                offset: '290px'
            }, function(){
                if(_this.attr('unclick')==1) return;
                _this.attr('unclick',1);
                layer.closeAll();
                var url =$("#stoptradeform").attr("action"),data=$("#stoptradeform").serialize();
                ajax.submit(url,data,function(d){
                    if(d.success==true){
                        layer.msg('终止成功',function(){});
                        window.location.reload();
                    }
                    _this.removeAttr('unclick');
                },function(e){
                    layer.msg('网络繁忙请稍后再试',function(){});
                    _this.removeAttr('unclick');return;
                });
            }, function(){
                _this.removeAttr('unclick');
                layer.closeAll();
            });

        })
    })
    $(document).on('focus',"#money",function(){
        layer.closeAll('tips');
    })
    $(document).on('keyup',"#money",function(){
        var cny = $(this).val(), rate = $("#inrate").val(),realdl;
        realdl = toDecimal2(cny*rate);
        if(realdl==false) realdl='$ 0.00';else realdl='$ '+realdl;
        $("#truedl").text(realdl);
    })
    function buybox(balance,inrate){
        var noen='';
        balance = toDecimal2(balance);
        inrate = toDecimal2(inrate);
        var inusd=toDecimal2(100*inrate);
        if(balance<100){
            noen='<div class="noen noen100">余额不足100元,<a href="/user/user_deposit.html">请立即充值</a></div>';
        }
        layer.confirm('<div class="casepay_box"><div class="bname">账户余额：</div><div class="pred">'+balance+'<small>元</small></div><div class="bname">追加金额：</div><div class="pred"><input type="text" name="money" id="money" value="100" autocomplete="off" /><small id="moneysm">美元</small></div><div class="noen">扣除人民币:<span id="truedl">'+inusd+'元</span></div>'+noen+'</div>', {
            title: '追加保证金',
            btn: ['立即追加','取消'],
            area: '460px',
            offset: '200px',
            btnAlign: 'c',
            id: 'casepaybox'
        }, function(){
            if($(".noen100").length>0){
                layer.msg('您余额不足，请您先<a href="/user/user_deposit.html" class="depositbtn">充值</a>',{time: 10000,tipsMore: true,icon: 5},function(){});
                return;
            }
            var _ts = $(".layui-layer-btn0");
            if(_ts.attr('unclick')==1) return;
            var url = '/trade/tradecashin',money=toDecimal2($("#money").val()),data={money:money,_csrf:$("input[name='_csrf']").val()};

            if(money==''||money<100||isNaN(money)){
                layer.tips('请输入追加金额,最少100元', $("#money"), {tips: [3, '#f08519'],time: 0});
                return;
            }
            if(money>balance){
                layer.tips('追加金额超过余额', $("#money"), {tips: [3, '#f08519'],time: 0});
                return;
            }
            _ts.attr('unclick',1).text('追加中 ...');

            ajax.submit(url,data,function(d){
                if(d.success==true){
                    layer.msg('追加成功', {icon: 1});
                    setTimeout("location.href='/user/user_case.html';",3500);
                }else{
                    layer.tips(d.resultMsg, $("#money"), {tips: [3, '#f08519'],time: 0});
                }
                _ts.removeAttr('unclick').text('立即追加');
            },function(e){
                layer.msg('网络繁忙请稍后再试',{tipsMore: true},function(){});
                _ts.removeAttr('unclick').text('立即追加');return;
            });

        }, function(){
            // layer.closeAll();
        });
    }*/
</script>
  <style type="textcss">
  .layui-layer-btn .layui-layer-btn0{background: #FF5722;border: none;}
  .layui-layer-btn .layui-layer-btn0,.layui-layer-btn .layui-layer-btn1{padding: 3px 25px;font-size: 14px;}
  .layui-layer-btn .layui-layer-btn1{background: #fff;color: #02bbff;border: 2px solid #02bbff;padding: 1px 35px;}
  .layui-layer-btn.layui-layer-btn-c{padding-bottom: 30px;}
  a.depositbtn{color: red;font-size: 14px;}
  #money{width: 80px;height: 30px;line-height: 30px;margin-right: 5px;padding-left: 5px;}
</style>
</body>
</html>