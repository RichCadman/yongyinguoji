$(function(){
	var refer=document.referrer;
	var engine="";
	var keyword="";
	var source=0;
	var accessTool;
	//判断手机/电脑
	 var system = { 
	            win: false, 
	            mac: false, 
	            xll: false, 
	            ipad:false 
	        }; 
	        //检测平台 
	        var p = navigator.platform; 
	        system.win = p.indexOf("Win") == 0; 
	        system.mac = p.indexOf("Mac") == 0; 
	        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
	        system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false; 
	        //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面 
	        if (system.win || system.mac || system.xll||system.ipad) { 
	        	accessTool=0;
	        } else { 
	        	accessTool=1;
	        } 
	//  
	//域名访问
	if(refer==""){
		
		source=2;
	}else{
		var sosuo=refer.split(".")[1];
		var phone=refer.split(".")[0];
		var grep=null;
		var str=null;
		source=3;
		switch(sosuo){
        //百度
		case "baidu":
			if(phone=="https://m"){
				/* grep=/\?word\=.*\&/i;
			     str=refer.match(grep);
			     keyword=decodeURIComponent(str.toString().split("&")[0].split("=")[1]);*/
				keyword="";
			}else{
		     grep=/wd\=.*\&/i;
		     str=refer.match(grep);
		     keyword=decodeURIComponent(str.toString().split("&")[0].split("=")[1]);
			}
			  engine="百度";
		     //document.write(decodeURIComponent(keyword));
		     break;
		//谷歌 
		case "google":
		     grep=/&q\=.*\&/i;
		     str=refer.match(grep);
		     keyword=decodeURIComponent(str.toString().split("&")[1].split("=")[1]);
		     engine="谷歌";
		     break;
		//360
		case "so":
			if(phone=="https://m"){
				refer=decodeURIComponent(refer);
			}else{
		     grep=/q\=.*\&/i;
		     str=refer.match(grep);
		     keyword=decodeURIComponent(str.toString().split("&")[0].split("=")[1]);}
		     engine="360搜索";
		     break;
		//搜狗
		case "sogou":
			if(phone=="https://m"||phone=="https://wap"){
				grep=/keyword\=.*/i;
			     str=refer.match(grep);
			     keyword=decodeURIComponent(str.toString().split("&")[0].split("=")[1]);
			}else{
		     grep=/query\=.*/i;
		     str=refer.match(grep);
		     keyword=decodeURIComponent(str.toString().split("=")[1]);}
		     engine="搜狗";
		     break;
		//必应
		case "bing":
		     grep=/\?q\=.*\&/i;
		     str=refer.match(grep);
		     keyword=decodeURIComponent(str.toString().split("&")[0].split("=")[1]);
		     engine="必应";
		     break;
		//有道
		case "youdao":
		     grep=/\?q\=.*\&/i;
		     str=refer.match(grep);
		     keyword=decodeURIComponent(str.toString().split("&")[0].split("=")[1]);
		     engine="有道";
		     break;
		//中国搜索
		case "chinaso":
		     grep=/\?q\=.*/i;
		     str=refer.match(grep);
		     keyword=decodeURIComponent(str.toString().split("=")[1]);
		     engine="中国搜索";
		     break;
		
		 //神马搜索
		case "sm":
		     grep=/\?q\=.*\&/i;
		     str=refer.match(grep);
		     keyword=decodeURIComponent(str.toString().split("&")[0].split("=")[1]);
		     engine="神马搜索";
		     break;
		//站内跳转
		case "imzhongying":
			source=0;
			break;
	    //友情链接
		default:
			source=1;
			break;

		}
		//统计本地访问
		if(phone == "http://192"){
			source=0;
		}
		if(phone == "http://imzhongying"){
			source=0;
		}
	}
	 var seoModel = {
				"accessUrl" :window.location.href,
				"accessSource":source,
				"searchTool":engine,
			    "searchKey":keyword,
			    "accessTool":accessTool
			};
			$.ajax({
				on : true,//是否启用异步请求，必须启用
				url : "webseo/addSeo",
				type : "post",
				dataType : "text",
				data :seoModel,
				success : function(data) {
					
				} 
			});
});

