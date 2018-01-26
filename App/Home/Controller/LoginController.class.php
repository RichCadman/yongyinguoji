<?php
namespace Home\Controller;
class LoginController extends BaseController {
	//登录页面
    public function index(){
    	unset($_SESSION['userinfo']);
    	$this->display();
    }
    
    //登录
    public function login_do(){
    	$username = $_POST['username'];
    	$password = md5($_POST['password']);
    	$res = M("users")->where("phone = '$username' and password = '$password'")->find();
    	if($res){
    		$_SESSION['userinfo'] = $res;
    		$result['success'] = 'true';
			$this->ajaxReturn($result);
    	}else{
    		$result['success'] = 'false';
    		$result['error'] = 'error3';
    		$this->ajaxReturn($result);
    	}
    }
}