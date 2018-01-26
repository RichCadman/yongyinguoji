<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>账户充值</title>
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
                        <li class="cur">
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
                            <a href="/zhongying1/index.php/Mmy/deposit">账户充值</a>
                        </li>
                        <li class="nocur">
                            <a href="/zhongying1/index.php/Mmy/deposit_list.html">充值记录</a>
                        </li>
                    </ul>
                    <div class="user_con">
                        <div class="deposit_box">
                            <div class="deposit_tit">选择充值银行</div>
                            <div class="banklist">
                                <ul>
                                    <li class="gwpay">
                                        <span title="网关支付">网关支付</span>
                                    </li>
                                    <li class="wp">
                                        <span title="微信支付">微信支付</span>
                                    </li>
                                    <li class="ap">
                                        <span title="支付宝">支付宝</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                            <div class="deposit_tit">填写充值金额</div>
                            <div id="safebox">
                                <form id="recharge_form" action="http://119.28.68.145:8188/api/redirectcashier" method="post"  target="_blank">
                                    <input type="hidden" name="_csrf" value="fc73c90b-2b98-4e7b-bc09-012cadc8dcb3"/>
                                    <input id="formhtml" name="formhtml" type="hidden"></form>
                                <form name="safeform" id="safeform" action="/account/recharge" onSubmit="return false;">
                                    <input type="hidden" name="_csrf" value="fc73c90b-2b98-4e7b-bc09-012cadc8dcb3"/>
                                    <div class="rl_input">
                                        <span class="ipt_name">账户余额</span>
                                        <span class="inputdesc"> <b class="red" id="balance">0.00</b>
                                            元
                                        </span>
                                    </div>
                                    <div class="rl_input">
                                        <span class="ipt_name">充值金额</span>
                                        <input type="text" name="money" id="money" class="input" placeholder="请输入充值金额"  onkeyup="this.value=this.value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" maxlength="10" autocomplete="off" />
                                    </div>

                                    <div class="safebtn">
                                        <input type="hidden" name="paycode" id="paycode"/>
                                        <button type="button" name="safesub" class="btn" id="godeposit">立即充值</button>
                                    </div>
                                </form>
                            </div>
                            <div id="banks_desc">
                                <table width="650" border="0" id="icbc_desc" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                                    <tbody>
                                        <tr>
                                            <td colspan="4">工商银行支付额度表</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">支付方式</td>
                                            <td colspan="2">支付额度</td>
                                            <td rowspan="2">开通方式</td>
                                        </tr>
                                        <tr>
                                            <td>每笔限额</td>
                                            <td>每日限额</td>
                                        </tr>
                                        <tr>
                                            <td>存量静态密码</td>
                                            <td colspan="2">累计300元</td>
                                            <td>已无法开通</td>
                                        </tr>
                                        <tr>
                                            <td>电子银行口令卡</td>
                                            <td>500</td>
                                            <td>1000</td>
                                            <td rowspan="4">柜台/网上自助开通</td>
                                        </tr>
                                        <tr>
                                            <td>电子银行口令卡+手机短信验证</td>
                                            <td>2000</td>
                                            <td>5000</td>
                                        </tr>
                                        <tr>
                                            <td>借记卡U盾</td>
                                            <td>100万</td>
                                            <td>100万</td>
                                        </tr>

                                    </tbody>
                                </table>
                                <table id="spdb_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                                    <tbody>
                                        <tr>
                                            <td colspan="4">上海浦发展银行借记卡支付额度表</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">支付方式</td>
                                            <td colspan="2">支付限额</td>
                                            <td rowspan="2">开通方式</td>
                                        </tr>
                                        <tr>
                                            <td>每笔限额</td>
                                            <td>每日限额</td>
                                        </tr>
                                        <tr>
                                            <td>动态密码</td>
                                            <td>5万</td>
                                            <td>20万</td>
                                            <td rowspan="2">柜面开通</td>
                                        </tr>
                                        <tr>
                                            <td>数字证书</td>
                                            <td>10万</td>
                                            <td>20万</td>
                                        </tr>

                                    </tbody>
                                </table>
                                <table id="abc_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                                    <tbody>
                                        <tr>
                                            <td colspan="4">农业银行行借记卡支付额度表</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">支付方式</td>
                                            <td colspan="2">支付限额</td>
                                            <td rowspan="2">开通方式</td>
                                        </tr>
                                        <tr>
                                            <td>每笔限额</td>
                                            <td>每日限额</td>
                                        </tr>
                                        <tr>
                                            <td>浏览证书+动态口令卡</td>
                                            <td>1000</td>
                                            <td>3000</td>
                                            <td rowspan="3">柜面开通</td>
                                        </tr>
                                        <tr>
                                            <td>Key宝总行证书</td>
                                            <td>无限额</td>
                                            <td>无限额</td>

                                        </tr>
                                        <tr>
                                            <td>K码</td>
                                            <td>1000</td>
                                            <td>1000</td>

                                        </tr>
                                    </tbody>
                                </table>
                                <table id="boc_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                                    <tbody>
                                        <tr>
                                            <td colspan="4">中国银行借记卡支付额度表</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">支付方式</td>
                                            <td colspan="2">支付限额</td>
                                            <td rowspan="2">开通方式</td>
                                        </tr>
                                        <tr>
                                            <td>每笔限额</td>
                                            <td>每日限额</td>
                                        </tr>
                                        <tr>
                                            <td>借记卡专业版</td>
                                            <td>5万</td>
                                            <td>50万</td>
                                            <td rowspan="2">柜面开通</td>
                                        </tr>
                                        <tr>
                                            <td>借记卡网银快付</td>
                                            <td>1000</td>
                                            <td>5000</td>
                                        </tr>

                                    </tbody>
                                </table>
                                <table id="ccb_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                                    <colgroup>
                                    <col style="width:230px">
                                    <col style="width:135px">
                                    <col style="width:135px">
                                    <col></colgroup>
                                <tbody>
                                    <tr>
                                        <td colspan="4">建设银行借记卡/准贷记卡支付额度表</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">支付方式</td>
                                        <td colspan="2">支付限额</td>
                                        <td rowspan="2">开通方式</td>
                                    </tr>
                                    <tr>
                                        <td>每笔限额</td>
                                        <td>每日限额</td>
                                    </tr>
                                    <tr>
                                        <td>帐户支付</td>
                                        <td>1000</td>
                                        <td>1000</td>
                                        <td rowspan="4">柜面开通</td>
                                    </tr>
                                    <tr>
                                        <td>动态口令卡</td>
                                        <td>5000</td>
                                        <td>5000</td>

                                    </tr>
                                    <tr>
                                        <td>网银盾（U宝）</td>
                                        <td>50万</td>
                                        <td>50万</td>

                                    </tr>

                                </tbody>
                            </table>
                            <table id="comm_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                                <colgroup>
                                <col style="width:230px">
                                <col style="width:135px">
                                <col style="width:135px">
                                <col></colgroup>
                            <tbody>
                                <tr>
                                    <td colspan="4">交通银行借记卡支付额度表</td>
                                </tr>
                                <tr>
                                    <td rowspan="2">支付方式</td>
                                    <td colspan="2">支付限额</td>
                                    <td rowspan="2">开通方式</td>
                                </tr>
                                <tr>
                                    <td>每笔限额</td>
                                    <td>每日限额</td>
                                </tr>
                                <tr>
                                    <td>借记卡手机注册</td>
                                    <td>5000</td>
                                    <td>5000</td>
                                    <td rowspan="2">柜面开通</td>
                                </tr>
                                <tr>
                                    <td>借记卡证书支付</td>
                                    <td>5万</td>
                                    <td>5万</td>
                                </tr>

                            </tbody>
                        </table>
                        <table id="cmb_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                            <colgroup>
                            <col style="width:230px">
                            <col style="width:135px">
                            <col style="width:135px">
                            <col></colgroup>
                        <tbody>
                            <tr>
                                <td colspan="4">招商银行支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>大众版网上支付功能</td>
                                <td>5000</td>
                                <td>5000</td>
                                <td>网上自助开通</td>
                            </tr>
                            <tr>
                                <td>专业版</td>
                                <td>无限额</td>
                                <td>无限额</td>
                                <td rowspan="3">柜面开通</td>
                            </tr>

                        </tbody>
                    </table>
                    <table id="cmbc_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                        <tbody>
                            <tr>
                                <td colspan="4">民生银行借记卡/信用卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>大众版</td>
                                <td>300</td>
                                <td>300</td>
                                <td rowspan="3">柜面开通</td>
                            </tr>
                            <tr>
                                <td>贵宾版数字证书</td>
                                <td>5000</td>
                                <td>5000</td>
                            </tr>
                            <tr>
                                <td>贵宾版（U宝）</td>
                                <td>2万</td>
                                <td>10万</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="ceb_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                        <tbody>
                            <tr>
                                <td colspan="4">中国光大银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>动态密码支付</td>
                                <td>5000</td>
                                <td>5000</td>
                                <td rowspan="3">柜面开通</td>
                            </tr>
                            <tr>
                                <td>阳光网盾</td>
                                <td>20万</td>
                                <td>50万</td>
                            </tr>
                            <tr>
                                <td>动态口令牌</td>
                                <td>50万</td>
                                <td>50万</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="cib_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                        <tbody>
                            <tr>
                                <td colspan="4">兴业银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>手机验证</td>
                                <td>自选1000/5000</td>
                                <td>自选1000/5000</td>
                                <td rowspan="3">柜面开通</td>
                            </tr>
                            <tr>
                                <td>电子支付卡（e卡）</td>
                                <td>5000</td>
                                <td>5000</td>
                            </tr>
                            <tr>
                                <td>证书支付</td>
                                <td>无限额</td>
                                <td>无限额</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="gdb_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                        <tbody>
                            <tr>
                                <td colspan="4">广东发展银行支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>借记卡手机动态验证码</td>
                                <td>3000</td>
                                <td>3000</td>
                                <td>网上自助开通</td>
                            </tr>
                            <tr>
                                <td>借记卡KEY盾</td>
                                <td>30万</td>
                                <td>30万</td>
                                <td>柜面开通</td>
                            </tr>

                        </tbody>
                    </table>
                    <table id="hxb_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                        <tbody>
                            <tr>
                                <td colspan="4">华夏银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>直接支付</td>
                                <td>300</td>
                                <td>1000</td>
                                <td rowspan="2">网上自助开通</td>
                            </tr>
                            <tr>
                                <td>电子钱包签约</td>
                                <td>5万</td>
                                <td>10万</td>

                            </tr>
                        </tbody>
                    </table>
                    <table id="psbc_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                        <tbody>
                            <tr>
                                <td colspan="4">中国邮政储蓄银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>手机动态密码版</td>
                                <td>3000</td>
                                <td>3000</td>
                                <td>柜面开通</td>
                            </tr>

                        </tbody>
                    </table>
                    <table id="hkbea_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                        <tbody>
                            <tr>
                                <td colspan="4">东亚银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>手机动态密码</td>
                                <td>5000</td>
                                <td>2万</td>
                                <td rowspan="2">柜面开通</td>
                            </tr>
                            <tr>
                                <td>USB-KEY/USB-KEY+口令卡</td>
                                <td colspan="2">100万</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="cib_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                        <tbody>
                            <tr>
                                <td colspan="4">兴业银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>手机验证</td>
                                <td>自选1000/5000</td>
                                <td>自选1000/5000</td>
                                <td rowspan="3">柜面开通</td>
                            </tr>
                            <tr>
                                <td>电子支付卡（e卡）</td>
                                <td>5000</td>
                                <td>5000</td>
                            </tr>
                            <tr>
                                <td>证书支付</td>
                                <td>无限额</td>
                                <td>无限额</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="bccb_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                        <tbody>
                            <tr>
                                <td colspan="4">北京银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>普通版</td>
                                <td colspan="">累计300</td>
                                <td colspan="">累计300</td>
                                <td rowspan="4">柜台开通</td>
                            </tr>
                            <tr>
                                <td>动态密码版</td>
                                <td colspan="">1万</td>
                                <td colspan="">1万</td>

                            </tr>

                            <tr>
                                <td>证书版</td>
                                <td colspan="2">100万</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="citic_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                        <tbody>
                            <tr>
                                <td colspan="4">中信银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>动态密码支付</td>
                                <td>客户自行设定</td>
                                <td>客户自行设定</td>
                                <td rowspan="3">柜面开通</td>
                            </tr>
                            <tr>
                                <td>文件证书</td>
                                <td>1000</td>
                                <td>5000</td>
                            </tr>
                            <tr>
                                <td>移动证书</td>
                                <td>100万</td>
                                <td>100万</td>
                            </tr>
                        </tbody>
                    </table>

                    <table id="bos_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">

                        <tbody>
                            <tr>
                                <td colspan="4">上海银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>借记卡专业版文件证书</td>
                                <td colspan="">5000</td>
                                <td colspan="">5000</td>
                                <td rowspan="5">柜台开通</td>
                            </tr>
                            <tr>
                                <td>借记卡专业版USB-KEY</td>
                                <td colspan="">5万</td>
                                <td colspan="">5万</td>

                            </tr>
                            <tr>
                                <td>信用卡大众版</td>
                                <td colspan="">3000</td>
                                <td colspan="">6000</td>

                            </tr>
                            <tr>
                                <td>信用卡专业版文件证书</td>
                                <td colspan="">3000</td>
                                <td colspan="">6000</td>

                            </tr>
                            <tr>
                                <td>信用卡专业版USB-KEY</td>
                                <td colspan="">5000</td>
                                <td colspan="">10000</td>

                            </tr>

                        </tbody>
                    </table>
                    <table id="szpab_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                        <tbody>
                            <tr>
                                <td colspan="4">平安银行支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>借记卡手机动态密码</td>
                                <td>客户自行设置</td>
                                <td>客户自行设置</td>
                                <td rowspan="2">柜面开通</td>
                            </tr>
                            <tr>
                                <td>信用卡网上直接支付</td>
                                <td>2500</td>
                                <td>2500</td>
                            </tr>

                        </tbody>
                    </table>
                    <table id="shrcb_desc" width="650" border="0" cellpadding="0" cellspacing="1" class="uc_oltable" style="display: none;">
                        <tbody>
                            <tr>
                                <td colspan="4">上海农商银行借记卡支付额度表</td>
                            </tr>
                            <tr>
                                <td rowspan="2">支付方式</td>
                                <td colspan="2">支付限额</td>
                                <td rowspan="2">开通方式</td>
                            </tr>
                            <tr>
                                <td>每笔限额</td>
                                <td>每日限额</td>
                            </tr>
                            <tr>
                                <td>卡号密码支付</td>
                                <td>2000</td>
                                <td>5000</td>
                                <td rowspan="4">柜面开通</td>
                            </tr>
                            <tr>
                                <td>短信专业版支付</td>
                                <td>1000</td>
                                <td>5000</td>
                            </tr>
                            <tr>
                                <td>证书专业版支付</td>
                                <td>50</td>
                                <td>100</td>
                            </tr>

                            <tr>
                                <td>手机支付</td>
                                <td>5000</td>
                                <td>5000</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="dtipmsg">
                    温馨提示：
                    <br>
                    <br>
                    1、在线充值收取千分之三的手续费，支付宝充值收取千分之十的手续费。出金每笔3元手续费；
                    <br>
                    2、账户姓名及身份证必须与银行卡一致且不能错误，确保出金安全到账；
                    <br>
                    3、入金的充值金额是根据银行网上支付限额有关，请各位客户注意；
                    <br>
                    4、入金时间：周一至周日24小时入金；
                    <br>
                    5、出金时间：周一至周五9:00-17：30出金 当天到账（遇节假日顺延）；
                    <br>6、正常入金一般10分钟到账，正常出金2小时内到账，请客户耐心等待；</div>

            </div>
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
<script src="/zhongying1/Pub/mobile/js/qrcode.js"></script>
 <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/jquery.d882153f.js"></script>
  <script type = "text/javascript" src = "/zhongying1/Pub/mobile/js/index.js"></script>
<script type="text/javascript">
var setinterorder='';
$(document).ready(function () {
    $(".banklist li:first").click();
});
$(document).on('click',".banklist li:not('.select')",function(){
  $("#paycode").val($(this).attr('class'));
  var sid = '#'+$(this).attr('class')+'_desc';
  var hid='#'+$(".banklist .select").removeClass('select').attr('class')+'_desc';
  sid = sid.toLowerCase();
  hid = hid.toLowerCase();
  $(hid).css('display','none');
  $(sid).css('display','');
  $(this).addClass('select');
})

function paywindow(payname,money,orderno,piccode){
    /*
      点击充值提交之后
      1提交网银表单,打开充值等待窗口
      2如果是微信或支付宝则显示出二维码
      3触发心跳查询订单状态
    */
  if(payname!='支付宝'&&payname!='微信支付'){
    layer.confirm('<div class="paytip">充值银行：<span class="green">'+payname+'</span><br>充值金额：<span class="green">'+money+'</span>元 人民币</div><div class="tipmsg">请点击确认支付，再新打开的页面完成支付</div>', {
      title: '确认充值信息',
      btn: ['确认充值','取消'],
      area: '460px',
      offset: '200px'
    }, function(){
      $('#recharge_form').submit();
      orderheart(payname,money,orderno);
      layer.confirm('<div class="paytip"><div class="loading"><img src="..//zhongying1/Pub/mobile/images/loading.gif">自动检测中，请不要关闭此窗口</div></div><div class="tipmsg">成功完成付款后将自动跳转，若未跳转，请您点击下面的按钮查看订单是否成功</div>', {
        id: 'payconfirm',
        title: '充值中',
        btn: ['查看订单'],
        area: '460px',
        offset: '200px'
      }, function(){
        location.href='/user/user_deposit_list.html';
      });
    }, function(){
        layer.closeAll();
    });
  }else{
    orderheart(payname,money,orderno);
    qrfun(payname,money,piccode);
  }
}

function orderheart(payname,money,orderno){
  var url = '/account/checkOrderStatus';
  var csrf=$("input[name='_csrf']").val();
  var data = {_csrf:csrf,orderno:orderno};
  if(payname!='支付宝'&&payname!='微信支付') payname='网银充值-'+payname;
  setinterorder=setInterval(function(){
    ajax.submit(url,data,function(d){
      if(d.success==true&&d.resultMsg=='1'){
        var con = '<div class="paydesc success"><h2>恭喜您充值成功</h2><p>充值金额<span class="red">'+money+'</span>元。</p><p>充值方式<span class="red">'+payname+'</span></p><p><a href="/user/user_deposit.html" class="again">再冲一笔</a><a href="/user/user_deposit_list.html" class="dlist">充值记录</a></p></div>';
        clearInterval(setinterorder);
         $(".deposit_box").html(con);
         layer.closeAll();
      }else if(d.success==false||d.resultMsg=='2'){
        var con = '<div class="paydesc error"><h2>很遗憾您充值失败</h2><p>充值金额<span class="red">'+money+'</span>元。</p><p>充值方式<span class="red">'+payname+'</span></p><p>失败原因<span class="red">由于您长时间未充值，订单已经失效</span></p><p><a href="/user/user_deposit.html" class="again">再次尝试</a></p></div>';
        clearInterval(setinterorder);
        $(".deposit_box").html(con);
        layer.closeAll();
      }
    });
  },5000)
}
function qrfun(payname,money,piccode){
  var con = '<div id="qrcode"><div class="qrmsg"><div class="qcenter"><span class="red">'+payname+'</span>扫一扫付款（元）</div><div class="qrmoney">'+money+'</div></div><div class="qrbox"><div id="qrcodepic"></div><div class="qrtip"><img class="fl" src="..//zhongying1/Pub/mobile/images/qricon.png" alt="扫一扫标识"><div class="fl tip">手机打开<span class="red">'+payname+'</span><br>扫一扫继续付款</div></div></div></div>';
  $(".deposit_box").html(con);
    var qrcode;
    $("#qrcodepic").html("");
    // 创建二维码
    qrcode = new QRCode(document.getElementById("qrcodepic"), {
        width : 168,//设置宽高
        height : 168
    });
    qrcode.makeCode(piccode);
}
/*账户充值*/
$("#godeposit").click(function(){

  var mval = toDecimal2($("#money").val());
  var payname = $(".banklist .select span").text();

  if(isNaN(mval) || mval<100){
    layer.msg('充值金额最少100元人民币',function(){});
    $("#money").focus();
    return;
  }

  var _this = $(this);
  var data=$('#safeform').serialize(),url=$('#safeform').attr('action');

    if(payname!='支付宝'&&payname!='微信支付'){
        layer.confirm('<div class="paytip">充值银行：<span class="green">'+payname+'</span><br>充值金额：<span class="green">'+mval+'</span>元 人民币</div><div class="tipmsg">请点击确认支付，再新打开的页面完成支付</div>', {
            title: '确认充值信息',
            btn: ['确认充值','取消'],
            area: '460px',
            offset: '200px'
        }, function(){
            _this.attr('disabled',true).text('提交中...');
            var flag = false;
            var customno;
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType: 'json',
                async: false,
                success: function (d) {
                    if (d.success == true) {
                        $('#formhtml').val(d.data.formhtml);
                        customno = d.data.customno;
                        flag = true;
                    }else{
                        layer.msg(!d.resultMsg ? "充值失败" : d.resultMsg);
                    }
                    _this.removeAttr('disabled').text('立即充值');
                },
                error: function (jqXHR, textStatus, exception) {
                    layer.msg('网络繁忙请稍后再试');
                    _this.removeAttr('disabled').text('立即充值');return;
                }
            });
            if(flag){
                $('#recharge_form').submit();
                orderheart(payname, mval, customno);
                layer.confirm('<div class="paytip"><span class="loading" style="width: 100%">自动检测中，请不要关闭此窗口</span></div>' +
                    '<div class="tipmsg">成功完成付款后将自动跳转，若未跳转，请您点击下面的按钮查看订单是否成功</div>', {
                    id: 'payconfirm',
                    title: '充值中',
                    btn: ['查看订单'],
                    area: '460px',
                    offset: '200px'
                }, function(){
                    location.href='/user/user_deposit_list.html';
                });
            }
        }, function(){
            layer.closeAll();
        });
    }else{
        _this.attr('disabled',true).text('提交中...');
        ajax.submit(url,data,function(d){
            if (d.success == true) {
                var piccode = d.data.scanurl;
                layer.closeAll();
                qrfun(payname,mval,piccode);
                orderheart(payname,mval,d.data.customno);
            }else{
                layer.msg(d.resultMsg || "充值失败");
            }
            _this.removeAttr('disabled').text('立即充值');
        },function(e){
            layer.msg('网络繁忙请稍后再试');
            _this.removeAttr('disabled').text('立即充值');return;
        });
    }
})
</script>
</body>
</html>