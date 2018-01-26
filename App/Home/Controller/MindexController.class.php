<?php
namespace Home\Controller;
class MindexController extends BaseController {
    public function index(){
    	//查询新闻
    	$news=M("news")->order("time desc")->limit("5")->select();
    	//单独显示
    	$news_one=M("news")->where("new=1")->find();
    	//头部数据统计
    	$tongji1=M("tongji")->where("type=1")->find();
    	$tongji2=M("tongji")->where("type=2")->find();
    	$tongji3=M("tongji")->where("type=3")->find();

    	$this->assign("tongji1",$tongji1);
    	$this->assign("tongji2",$tongji2);
    	$this->assign("tongji3",$tongji3);
    	$this->assign("news_one",$news_one);
    	$this->assign("news",$news);
    	$this->display();
    }

    //判断手机或电脑
    public function panduan(){
        $this->display();
    }
}