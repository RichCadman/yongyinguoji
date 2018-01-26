<?php
namespace Home\Controller;
class MregController extends BaseController {
	//注册页面
    public function index(){
    	
    	$this->display();
    }
    //忘记密码
    public function forget(){
    	
    	$this->display();
    }

    //注册协议
    public function agreement(){
    	
    	$this->display();
    }

    //验证码
    public function verify(){
    	$Verify = new \Think\Verify();
		$Verify->fontSize = 30;
		$Verify->length   = 4;
		$Verify->useNoise = false;
		$Verify->entry();
    }

    //验证验证码
    public function check(){
    	$phone=$_POST['phone'];
    	$ycode = $_POST['ycode'];
    	//验证验证码
    	$verify = new \Think\Verify();    
    	$res=$verify->check($ycode);
    	if($res){
    		//发送手机验证码并存表
    		//随机验证码
    		$code = rand(100000,999999);
    		/*发送短信*/
    		//如果成功(手机号是否是第一次发送)
    		/*if(发送短信结果){
    			//第一次
	    		$data['phone'] = $phone;
	    		$data['validcode'] = $code;
	    		$res1 = M("verify")->data($data)->add();
    		}else{
    			//第二次
    			$data['validcode'] = $code;
    			$res1 = M("verify")->where("phone = $phone")->data($data)->save();
    		}
    		if($res1){
    			$result['success'] = 'true';
    			$this->ajaxReturn($result);
    		}*/
    		$result['success'] = 'true';
    		$this->ajaxReturn($result);
    	}else{
    		$result['success'] = 'false';
    		$result['resultMsg'] = '验证码错误';
    		$this->ajaxReturn($result);
    	}
    }

    //验证验证码
    public function check123(){
        $phone=$_POST['phone'];
        
        //发送手机验证码并存表
        //随机验证码
        // $code = rand(100000,999999);
        /*发送短信*/
        //如果成功(手机号是否是第一次发送)
        /*if(发送短信结果){
            //第一次
            $data['phone'] = $phone;
            $data['validcode'] = $code;
            $res1 = M("verify")->data($data)->add();
        }else{
            //第二次
            $data['validcode'] = $code;
            $res1 = M("verify")->where("phone = $phone")->data($data)->save();
        }
        if($res1){
            $result['success'] = 'true';
            $this->ajaxReturn($result);
        }*/
        $result['success'] = 'true';
        $this->ajaxReturn($result);
        
    }

    //注册
    public function reg(){
    	$username = $_POST['username'];
    	$phone = $_POST['phone'];
    	$validcode = $_POST['validcode'];
    	$password = md5($_POST['password']);
    	//验证手机号是否已注册
    	$res1 = M("users")->where("phone = '$phone'")->find();
    	if(!$res1){
    		//验证手机验证码
	    	$res = M("verify")->where("phone = '$phone' and validcode = '$validcode'")->find();
	    	if($res){
	    		//成功
	    		$data['username'] = $username;
	    		$data['password'] = $password;
	    		$data['phone'] = $phone;
	    		$add = M("users")->data($data)->add();
	    		if($add){
	    			$result['success'] = 'true';
	    			$this->ajaxReturn($result);
	    		}else{
	    			$result['success'] = 'false';
		    		$result['resultMsg'] = '网络繁忙请稍后再试';
		    		$this->ajaxReturn($result);
	    		}
	    	}else{
	    		$result['success'] = 'false';
	    		$result['resultMsg'] = '手机验证码有误';
	    		$this->ajaxReturn($result);
	    	}	
    	}else{
    		$result['success'] = 'false';
    		$result['resultMsg'] = '用户已存在,请直接登录';
    		$this->ajaxReturn($result);
    	}
    }

    //找回密码
    public function forget_do(){
    	$phone = $_POST['phone'];
    	$validcode = $_POST['validcode'];
    	$password = md5($_POST['password']);
    	//验证手机验证码
	    $res = M("verify")->where("phone = '$phone' and validcode = '$validcode'")->find();
	    if($res){
	    	$data['password'] = $password;
	    	//修改密码
	    	$res1 = M("users")->where("phone = $phone")->data($data)->save();
	    	if($res1){
	    		$result['success'] = 'true';
	    		$this->ajaxReturn($result);
	    	}else{
	    		$result['success'] = 'false';
	    		$result['resultMsg'] = '网络繁忙请稍后再试';
	    		$this->ajaxReturn($result);
	    	}
	    }else{
	    	$result['success'] = 'false';
    		$result['resultMsg'] = '手机验证码有误';
    		$this->ajaxReturn($result);
	    }
    }
    
}