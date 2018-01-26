<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="utf-8">
  <title>充值记录</title>
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
            <li class="nocur">
              <a href="/zhongying1/index.php/My/case_list.html">终止方案记录</a>
            </li>
            <li>
              <a href="/zhongying1/index.php/My/cashin_list.html">追加保证金记录</a>
            </li>
          </ul>
          <div class="search">
            <div class="sch">
              <form  action="/user/user_cashin_list_ajax" name="pagelist" id="pagelist">
                <input type="hidden" name="_csrf" value="fc73c90b-2b98-4e7b-bc09-012cadc8dcb3"/>
                <span class="schs sch-blk">日期：</span>
                <div class="sch-blk sch-mid">
                  <input type="text" name="starttime" id="starttime" class="sch-ipt schs" autocomplete="off" />
                  <span class="schs dt-sign" id="month1">00</span>
                  <span class="schs toline">—</span>
                  <input type="text" name="endtime" id="endtime" class="sch-ipt schs" autocomplete="off" />
                  <span class="schs dt-sign" id="month2">00</span>
                </div>
                <input type="hidden" name="curPage" id="page" value="1"/>
                <button type="button" class="btn btn-default schs sch-blk" id="listbtn">筛选</button>
              </form>
            </div>
          </div>
          <div class="user_con list"></div>
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
  <script src="/zhongying1/Pub/home/js/jquery.dropkick-min.js"></script>
  <script src="/zhongying1/Pub/home/js/checkidno.js"></script>
  <script src="/zhongying1/Pub/home/js/layer/layer.js"></script>
  <script src="/zhongying1/Pub/home/js/laydate/laydate.js"></script>
  <script src="/zhongying1/Pub/home/js/main.js"></script>
  <script type="text/javascript">
    $(document).ready(function(){
        laydate.skin('qianhuang');
        var start = {
            elem: '#starttime',
            format: 'YYYY-MM-DD 00:00:00',
            max: '2099-06-16 23:59:59', //最大日期
            choose: function(dates){ //选择好日期的回调
                end.min = dates;
                end.start = dates
                var dates = dates.split('-');
                $("#month1").text(dates[1]);
            }
        }
        var end = {
            elem: '#endtime',
            format: 'YYYY-MM-DD 23:59:59',
            max: '2099-06-16 23:59:59',
            choose: function(dates){ //选择好日期的回调
                start.max = dates;
                var dates = dates.split('-');
                $("#month2").text(dates[1]);
            }
        }
        laydate(start);
        laydate(end);
        withdraw_list();
    })
    $(".tip_btn_list .nob").click(function(){
        openifm($(this).attr('btit'),$(this).attr('burl'),$(this).attr('bheight'))
    })
    $(document).on('click',".pagination li:not('.disabled'),#listbtn",function(){
        withdraw_list();
    })
    function page(num){
        $("#page").val(num);
        withdraw_list();
    }
    $(document).on('click',"#okSearch",function(){
        $("#page").val($("#gopagenum").val());
        withdraw_list();
    })
    function withdraw_list(){
        var _this = $("#listbtn");
        var data=$('#pagelist').serialize(),url=$('#pagelist').attr('action');
        _this.attr('disabled',true);
        var olddata = $(".user_con.list").html();
        $(".user_con.list").html('');
        ajax.submit(url,data,function(d){
            var con='<div class="tablebox"><table width="95%;" border="0" cellpadding="0" cellspacing="0" class="mtable"><thead><tr><td>交易编号</td><td>方案编号</td><td>追加金额</td><td>交易时间</td></tr></thead><tbody>'
            var page='<div class="paginationlist">';
            if(d.success==false){
                $(".user_con.list").html(olddata);
                parent.layer.msg(d.resultMsg);
                _this.removeAttr('disabled');
                return;
            }else{
                if(d.data.list==null||d.data.list.length==0){
                  con += '<tr><td colspan="4">未查询到相关记录</td></tr>';
                }else{
                  for(var i=0;i<d.data.list.length;i++){
                      var data = d.data.list[i];
                      con +='<tr><td>'+data.tradeno+'</td><td>'+data.code+'</td><td>￥'+data.moneycny+'/$'+data.moneyusd+'</td><td>'+data.begintimeShow+'</td></tr>';
                  }
                  page+=d.data.pagehtml;
                }
                con+='</tbody></table></div><div class="clear"></div>';
                page+='</div>';
                $(".user_con.list").html(con+page);
                parent.layer.closeAll();
                _this.removeAttr('disabled');
            }
        },function(e){
            $(".user_con.list").html(olddata);
            parent.layer.msg('网络繁忙请稍后再试');
            _this.removeAttr('disabled');
            return;
        });
    }
</script>
</body>
</html>