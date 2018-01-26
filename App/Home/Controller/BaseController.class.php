<?php
namespace Home\Controller;
use Think\Controller;
class BaseController extends Controller {
   public function _initialize(){
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