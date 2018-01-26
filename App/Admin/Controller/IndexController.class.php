<?php
namespace Admin\Controller;
class IndexController extends BaseController {
	//首页统计数据
    public function tongji_index(){
    	$tongji = M("tongji")->select();

    	$this->assign("tongji",$tongji);
    	$this->display();
    }

    //修改统计页面
    public function mod_tongji($id){
    	$tongji = M("tongji")->where("id=$id")->find();
    	$this->assign("tongji",$tongji);
    	$this->display();
    }

    //修改
    public function mod_tongji_do($id){
    	$data['type_title'] = $_POST['type_title'];
    	$data['frist'] = $_POST['frist'];
    	$data['last'] = $_POST['last'];
    	$res=M("tongji")->where("id=$id")->save($data);
    	if($res){
    		echo "<script>alert('修改成功');window.location='/zhongying/admin.php/Index/tongji_index';</script>";
    	}else{
    		echo "<script>alert('修改失败');window.history.go(-1);</script>";
    	}
    }

    //联系我们
    public function lianxi(){
    	$lianxi=M("lianxi")->select();

    	$this->assign("lianxi",$lianxi);
    	$this->display();
    }

     //修改联系我们页面
    public function mod_lianxi($id){
    	$lianxi = M("lianxi")->where("id=$id")->find();
    	$this->assign("lianxi",$lianxi);
    	$this->display();
    }
    //修改
    public function mod_lianxi_do($id){
    	$data['title'] = $_POST['title'];
    	$data['content'] = $_POST['content'];
    	$res=M("lianxi")->where("id=$id")->save($data);
    	if($res){
    		echo "<script>alert('修改成功');window.location='/zhongying/admin.php/Index/lianxi';</script>";
    	}else{
    		echo "<script>alert('修改失败');window.history.go(-1);</script>";
    	}
    }

    //历程
    public function licheng(){
    	$licheng=M("licheng")->select();
    	$this->assign("licheng",$licheng);
    	$this->display();
    }

    //修改历程页面
    public function mod_licheng($id){
    	$licheng = M("licheng")->where("id=$id")->find();
    	$this->assign("licheng",$licheng);
    	$this->display();
    }

    //修改
    public function mod_licheng_do($id){
    	$data['title'] = $_POST['title'];
    	$data['time'] = $_POST['time'];
    	$res=M("licheng")->where("id=$id")->save($data);
    	if($res){
    		echo "<script>alert('修改成功');window.location='/zhongying/admin.php/Index/licheng';</script>";
    	}else{
    		echo "<script>alert('修改失败');window.history.go(-1);</script>";
    	}
    }

    //新闻
    public function news(){
    	$news=M("news")->select();
    	$this->assign("news",$news);
    	$this->display();
    }

    //修改新闻中转页面
    public function mod_news_zz($id){
    	$info=M("news")->where("id=$id")->find();
    	$new=$info['new'];
    	if($new==1){
    		//热点新闻
    		header("location:".__APP__."/Index/mod_hot_news/id/".$id);
    	}else{
    		header("location:".__APP__."/Index/mod_news/id/".$id);
    	}
    }
    //修改热点新闻页面
    public function mod_hot_news($id){
    	$hot_news = M("news")->where("id=$id")->find();
    	$this->assign("hot_news",$hot_news);
    	$this->display();
    }
    
    //修改
    public function mod_hot_news_do($id){
    	//上传图片
        $upload=new \Think\Upload();
        $upload->maxSize=20971520;//设置附件上传大小20M
        $upload->exts=array('jpg','jpeg','png','gif');//设置附件上传类型
        $upload->rootPath="./pub/upload/";//设置附件上传目录 文件上传保存的根路径
        $upload->savePath="image/";//设置附件上传目录  文件上传的保存路径（相对于根路径）
        $upload->saveRule =uniqid();//文件名称设置（无参数的函数）  
        $info=$upload->upload();
        //var_dump($info);exit;
        if($info){
        	foreach ($info as $k=>$v){
        		$data['img']=$v['savepath'].$v['savename']; 
        	}
        	$data['title'] = $_POST['title'];
	    	$data['link'] = $_POST['link'];
            $data['content'] = $_POST['content1'];
	    	$res=M("news")->where("id=$id")->save($data);
	    	if($res){
	    		echo "<script>alert('修改成功');window.location='/zhongying/admin.php/Index/news';</script>";
	    	}else{
	    		echo "<script>alert('修改失败');window.history.go(-1);</script>";
	    	}
        }
    	
    }

    //修改新闻页面
    public function mod_news($id){
    	$news = M("news")->where("id=$id")->find();
    	$this->assign("news",$news);
    	$this->display();
    }
    //修改
    public function mod_news_do($id){
    	$data['title'] = $_POST['title'];
    	$data['link'] = $_POST['link'];
    	$res=M("news")->where("id=$id")->save($data);
    	if($res){
    		echo "<script>alert('修改成功');window.location='/zhongying/admin.php/Index/news';</script>";
    	}else{
    		echo "<script>alert('修改失败');window.history.go(-1);</script>";
    	}
    }

    //删除新闻
    public function del_news($id){
        $res = M("news")->where("id=$id")->delete();
        if($res){
            echo "<script>alert('删除成功');window.location='/zhongying/admin.php/Index/news';</script>";
        }else{
            echo "<script>alert('删除失败');window.history.go(-1);</script>";
        }
    }

    //添加新闻
    public function add_news(){

    	$this->display();
    }

    //添加
    public function add_news_do(){
        if($_FILES['img']['error']==0){
            //上传图片
            $upload=new \Think\Upload();
            $upload->maxSize=20971520;//设置附件上传大小20M
            $upload->exts=array('jpg','jpeg','png','gif');//设置附件上传类型
            $upload->rootPath="./pub/upload/";//设置附件上传目录 文件上传保存的根路径
            $upload->savePath="image/";//设置附件上传目录  文件上传的保存路径（相对于根路径）
            $upload->saveRule =uniqid();//文件名称设置（无参数的函数）  
            $info=$upload->upload();
            if($info){
                foreach ($info as $k=>$v){
                    $data['img']=$v['savepath'].$v['savename']; 
                } 
                $data['title'] = $_POST['title'];
                $data['link'] = $_POST['link'];
                $data['content'] = $_POST['content1'];
                $data['time'] = $_POST['time'];
                $data['new'] = $_POST['new'];
                $res = M("news")->add($data);
                if($res){
                    //查询原来的热点新闻
                    $info = M("news")->where("id!=$res and new=1")->find();
                    $id = $info['id'];
                    if($id){
                        $da['new'] = 0;
                        M("news")->where("id=$id")->save($da);
                    }
                    echo "<script>alert('添加成功');window.location='/zhongying/admin.php/Index/news';</script>";             
                }else{
                    echo "<script>alert('添加失败');window.history.go(-1);</script>";
                } 
            }else{
                echo "<script>alert('添加失败');window.history.go(-1);</script>";
            }
        }else{
            $data['title'] = $_POST['title'];
            $data['link'] = $_POST['link'];
            $data['time'] = $_POST['time'];
            $data['new'] = $_POST['new'];
            $res = M("news")->add($data);
            if($res){
                echo "<script>alert('添加成功');window.location='/zhongying/admin.php/Index/news';</script>";
            }else{
                echo "<script>alert('添加失败');window.history.go(-1);</script>";
            } 
        }
    }
}