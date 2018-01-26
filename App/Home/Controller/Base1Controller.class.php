<?php
namespace Home\Controller;
use Think\Controller;
class Base1Controller extends Controller {
   public function _initialize(){
		if(!isset($_SESSION['userinfo'])){
		    echo "<script type='text/javascript'>alert('请先登录');window.location=\"/zhongying1/index.php/Login/index\";</script>";
		}
        //电话
        $Tel=M("lianxi")->where("type=1")->find();
        //邮箱
        $email=M("lianxi")->where("type=2")->find();

        $this->assign("email",$email);
        $this->assign("Tel",$Tel);
   }


   //空方法
   public function _empty(){
      $this->redirect("Index/index");
   }
}