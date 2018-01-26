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
          <div class="ltit">
            操盘账户
            <img src="/zhongying1/Pub/mobile/images/arror.png" alt=""></div>
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
            <li class="cur">
              <a href="/zhongying1/index.php/Mmy/deposit">账户充值</a>
              
            </li>
            <li>
              <a href="/zhongying1/index.php/Mmy/withdraw">账户提现</a>
              
            </li>

          </ul>
        </div>
        <div class="user_right">
          <ul class="tit">
            <li class="nocur">
              <a href="/zhongying1/index.php/Mmy/deposit">账户充值</a>
            </li>
            <li>
              <a href="/zhongying1/index.php/Mmy/deposit_list.html">充值记录</a>
            </li>
          </ul>
          <div class="search">
            <div class="sch">
              <form action="/user/user_deposit_list_ajax" name="pagelist" id="pagelist">
                <input type="hidden" name="_csrf" value="fc73c90b-2b98-4e7b-bc09-012cadc8dcb3"/>
                <div class="clearfix">
                  <span class="schs sch-blk">日期：</span>
                  <div class="sch-blk sch-mid">
                    <input type="text" name="starttime" id="starttime" class="sch-ipt schs" autocomplete="off" />
                    <span class="schs dt-sign" id="month1">00</span>
                    <span class="schs toline">—</span>
                    <input type="text" name="endtime" id="endtime" class="sch-ipt schs" autocomplete="off" />
                    <span class="schs dt-sign" id="month2">00</span>
                  </div>
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
  <script src="/zhongying1/Pub/mobile/js/jquery.min.js"></script>
  <script src="/zhongying1/Pub/mobile/js/jquery.dropkick-min.js"></script>
  <script src="/zhongying1/Pub/mobile/js/checkidno.js"></script>
  <script src="/zhongying1/Pub/mobile/js/layer/layer.js"></script>
  <script src="/zhongying1/Pub/mobile/js/laydate/laydate.js"></script>
  <script src="/zhongying1/Pub/mobile/js/main.js"></script>
   <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/jquery.d882153f.js"></script>
  <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/index.js"></script>
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
            var con='<div class="tablebox"><table width="95%;" border="0" cellpadding="0" cellspacing="0" class="mtable"><thead><tr><td>订单号</td><td>充值方式</td><td>充值金额(￥)</td><td>实际到帐(￥)</td><td>充值时间</td><td>状态</td></tr></thead><tbody>'
            var page='<div class="paginationlist">';
            if(d.success==false){
                $(".user_con.list").html(olddata);
                parent.layer.msg(d.resultMsg);
                _this.removeAttr('disabled');
                return;
            }else{
                if(d.data.list==null||d.data.list.length==0){
                con += '<tr><td colspan="6">未查询到相关记录</td></tr>';
                }else{
                    for(var i=0;i<d.data.list.length;i++){
                        var data = d.data.list[i];
                        var scls="c3";
                        if(data.status==1){
                            scls="c2";//成功
                        }else if(data.status==2){
                            scls="c1";//成功
                        }
                        if(data.money==null){
                            data.money="--";
                        }
                        con +='<tr><td>'+data.orderno+'</td><td>'+data.instcodeShow+'</td><td>'+data.tjmoney+'</td><td>'+data.money+'</td><td>'+data.begintimeShow+'</td><td><b class="'+scls+'">'+data.statusShow+'</b></td><td></td></tr>';
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