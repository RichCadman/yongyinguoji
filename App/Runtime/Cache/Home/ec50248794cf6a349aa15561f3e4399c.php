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
            <li class="cur">
              <a href="/zhongying1/index.php/My/cases">操盘方案</a>
              <i>></i>
            </li>
            <li>
              <a href="/zhongying1/index.php/My/deposit">账户充值</a>
              <i>></i>
            </li>
            <li>
              <a href="/zhongying1/index.php/My/withdraw">账户提现</a>
              <i>></i>
            </li>

          </ul>
        </div>
        <div class="user_right fr">
          <ul class="tit">
            <li  class="nocur">
              <a href="/zhongying1/index.php/My/cases">操盘方案</a>
            </li>
            <li>
              <a href="/zhongying1/index.php/My/case_list.html">终止方案记录</a>
            </li>
            <li class="nocur">
              <a href="/zhongying1/index.php/My/cashin_list.html">追加保证金记录</a>
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
                  <td>终止保证金($)</td>
                  <td>方案盈亏($)</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="7">暂无记录</td>
                </tr>

              </tbody>
            </table>

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
  <script src="/zhongying1/Pub/home/js/main.js"></script>
  <script type="text/javascript">
    $(function(){
        $("#addm").click(function(){
            var _this = $(this);
            if(_this.attr('unclick')==1) return;
            _this.attr('unclick',1);
            buybox($("#balance").val(),$("#inrate").val());
        })
        $("#stopc").click(function(){
            var _this = $(this);
            if(_this.attr('unclick')==1) return;
            _this.attr('unclick',1);
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
        })
    })
    function page(num){
      window.location.href="/user/user_case_list?curPage="+num;
    }
    $(document).on('click',"#okSearch",function(){
        window.location.href="/user/user_case_list?curPage="+$("#gopagenum").val();
    })
    $(document).on('focus',"#money",function(){
        layer.closeAll('tips');
    })
    $(document).on('keyup',"#money",function(){
        var cny = $(this).val(), rate = $("#inrate").val(),realdl;
        realdl = toDecimal2(cny/rate);
        if(realdl==false) realdl='$ 0.00';else realdl='$ '+realdl;
        $("#truedl").text(realdl);
    })
    function buybox(balance,inrate){
        var noen='';
        balance = toDecimal2(balance);
        inrate = toDecimal2(inrate);
        var inusd=toDecimal2(balance/inrate);
        if(balance<100){
            noen='<div class="noen noen100">余额不足100元,<a href="/user/user_deposit.html">请立即充值</a></div>';
        }
        layer.confirm('<div class="casepay_box"><div class="bname">账户余额：</div><div class="pred">'+balance+'<small>元</small></div><div class="bname">追加金额：</div><div class="pred"><input type="text" name="money" id="money" value="'+balance+'" autocomplete="off" /><small id="moneysm">元</small></div><div class="noen">实际入金金额:<span id="truedl">$ '+inusd+'</span></div>'+noen+'</div>', {
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
                    layer.tips('追加金额超过余额', d.resultMsg, {tips: [3, '#f08519'],time: 0});
                    return;
                }
                _ts.removeAttr('unclick').text('立即追加');
            },function(e){
                layer.msg('网络繁忙请稍后再试',{tipsMore: true},function(){});
                _ts.removeAttr('unclick').text('立即追加');return;
            });

        }, function(){
            // layer.closeAll();
        });
    }
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