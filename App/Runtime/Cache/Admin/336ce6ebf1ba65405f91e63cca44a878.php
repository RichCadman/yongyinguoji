<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
    
<head>
        <title>Matrix Admin</title><meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/zhongying/Pub/admin/css/bootstrap.min.css" />
		<link rel="stylesheet" href="/zhongying/Pub/admin/css/bootstrap-responsive.min.css" />
        <link rel="stylesheet" href="/zhongying/Pub/admin/css/matrix-login.css" />
        <link href="/zhongying/Pub/admin/font-awesome/css/font-awesome.css" rel="stylesheet" />
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>

    </head>
    <body>
        <div id="loginbox">            
            <form id="loginform" method="post" class="form-vertical" action="/zhongying/admin.php/Login/login_do">
				 <div class="control-group normal_text"> <h3><img src="/zhongying/Pub/admin/img/logo.png" alt="Logo" /></h3></div>
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_lg"><i class="icon-user"></i></span><input type="text" name="admin" id="admin_name" />
                        </div>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_ly"><i class="icon-lock"></i></span><input type="password" name="password" id="password"   />
                        </div>
                    </div>
                </div>

                <script type="text/javascript">
                  function checkFile(){
                    var admin_name=$("#admin_name").val();
                    var password=$("#password").val();
                    if(admin_name==""){
                      alert("请填写用户名");
                      return false;
                    }else if(password==""){
                      alert("请填写密码");
                      return false;
                    }
                  }
                </script>


                <div class="form-actions">
                    <!-- <span class="pull-left"><a href="#" class="flip-link btn btn-info" id="to-recover">Lost password?</a></span> -->
                    <span class="pull-right"><button type="submit" onclick="return checkFile()" class="btn btn-success" /> 登录</button></span>
                </div>
            </form>
            <form id="recoverform" action="#" class="form-vertical">
				<p class="normal_text">Enter your e-mail address below and we will send you instructions how to recover a password.</p>
				
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_lo"><i class="icon-envelope"></i></span><input type="text" placeholder="E-mail address" />
                        </div>
                    </div>
               
                <div class="form-actions">
                    <span class="pull-left"><a href="#" class="flip-link btn btn-success" id="to-login">&laquo; Back to login</a></span>
                    <span class="pull-right"><a class="btn btn-info"/>Reecover</a></span>
                </div>
            </form>
        </div>
        
        <script src="/zhongying/Pub/admin/js/jquery.min.js"></script>  
        <script src="/zhongying/Pub/admin/js/matrix.login.js"></script> 
    </body>

</html>