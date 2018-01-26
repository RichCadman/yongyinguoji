<?php
namespace Home\Controller;
class MmyController extends Base1Controller {
	//账户信息
    public function index(){
    	
    	$this->display();
    }

    //财产安全
    public function safe(){
    	
    	$this->display();
    }
    //操盘方案
    public function cases(){
    	
    	$this->display('case');
    }
    //终止方案记录
    public function case_list(){
    	
    	$this->display();
    }

    //追加保证金记录
    public function cashin_list(){
    	
    	$this->display();
    }

    //账户充值
    public function deposit(){
    	
    	$this->display();
    }
    //账户充值记录
    public function deposit_list(){
    	
    	$this->display();
    }

    //账户提现
    public function withdraw(){
    	
    	$this->display();
    }

    //账户提现记录
    public function withdraw_list(){
    	
    	$this->display();
    }
}