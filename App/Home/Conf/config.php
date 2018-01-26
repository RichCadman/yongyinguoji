<?php
return array(
	//'配置项'=>'配置值'
	/* 默认设定 */
    'DEFAULT_MODULE'        =>  'Home',  // 默认模块
    'DEFAULT_CONTROLLER'    =>  'Index', // 默认控制器名称
    'DEFAULT_ACTION'        =>  'panduan', // 默认操作名称
    'DEFAULT_CHARSET'       =>  'utf-8', // 默认输出编码
    'DEFAULT_TIMEZONE'      =>  'PRC',	// 默认时区
    'DEFAULT_AJAX_RETURN'   =>  'JSON',  // 默认AJAX 数据返回格式,可选JSON XML ...
    'DEFAULT_JSONP_HANDLER' =>  'jsonpReturn', // 默认JSONP格式返回的处理方法
    'DEFAULT_FILTER'        =>  'htmlspecialchars', // 默认参数过滤方法 用于I函数...
	
	//添加模板变量规则
     'TMPL_PARSE_STRING' =>array(
            '__PUBLIC__'=> __ROOT__.'/Pub',
            '__APUBLIC__' => __ROOT__.'/Pub/admin', // 后台admin路径 替换规则
            '__ACSS__' => __ROOT__.'/Pub/admin/css', // 后台css路径 替换规则
            '__AJS__' => __ROOT__.'/Pub/admin/js', // 后台js路径替换规则
            '__AIMAGES__' => __ROOT__.'/Pub/admin/images', // 后台image路径替换规则
            '__AIMG__' => __ROOT__.'/Pub/admin/img', // 后台img路径替换规则
            
            '__UPLOAD__' => __ROOT__.'/Pub/upload', // 增加新的上传路径替换规则

            '__HPUBLIC__' => __ROOT__.'/Pub/home', // 前台路径 替换规则
            '__HCSS__' => __ROOT__.'/Pub/home/css', // 前台css路径 替换规则
            '__HJS__' => __ROOT__.'/Pub/home/js', // 前台js路径替换规则
            '__HIMAGES__' => __ROOT__.'/Pub/home/images', // 前台image路径替换规则
            '__HIMG__' => __ROOT__.'/Pub/home/img', // 前台img路径替换规则


            '__MPUBLIC__' => __ROOT__.'/Pub/mobile', // 前台路径 替换规则
            '__MCSS__' => __ROOT__.'/Pub/mobile/css', // 前台css路径 替换规则
            '__MJS__' => __ROOT__.'/Pub/mobile/js', // 前台js路径替换规则
            '__MIMAGES__' => __ROOT__.'/Pub/mobile/images', // 前台image路径替换规则
            '__MIMG__' => __ROOT__.'/Pub/mobile/img', // 前台img路径替换规则
            
            ),
);