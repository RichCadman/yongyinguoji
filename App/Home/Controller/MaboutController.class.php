<?php
namespace Home\Controller;
class MaboutController extends BaseController {
    public function index(){
    	//发展历程
    	$licheng=M("licheng")->order("time asc")->select();
    	//联系我们
    	$lianxi1=M("lianxi")->where("type=1")->find();
    	$lianxi2=M("lianxi")->where("type=2")->find();
    	$lianxi3=M("lianxi")->where("type=3")->find();

    	$this->assign("lianxi1",$lianxi1);
    	$this->assign("lianxi2",$lianxi2);
    	$this->assign("lianxi3",$lianxi3);
    	$this->assign("licheng",$licheng);
    	$this->display();
    }
    
}