/*notebook
*判断用户是否登陆里没登陆的部分还没写
*判断登陆状态switch里有2个alert加注释发布版删掉
*/
var login;//用户是否登陆
var todaydate;//远程更新的最新日期（不是本地现在日期）
var lastdate;//昨日答案解析的日期
var newest=new Array();//3篇最新文章的路径
var user={
	username:"",
	nickname:""
};
var remote={//远程url
	protocol:"http://",
	host:"micoke.dashboard.hyperbola.studio",
};
var ajax=new XMLHttpRequest();//Ajax object
var c_obj=JSON.parse(document.cookie);//cookie object
if(c_obj.username=="" || c_obj.username==null || c_obj.username==undefined){//判断用户是否登陆
   //没有登陆
	login=false;
}else{
	//本地有登陆记录
	ajax.open("POST",remote.protocol+remote.host+"/user/login.php",true);
	var postready={//向远端用来传送验证消息的对象
		username:c_obj.username,
		password:c_obj.password
	};
	ajax.send(JSON.stringify(postready));//将对象转换为json并发送
	var receive=JSON.parse(ajax.responseText);//接收到的数据object
	switch(receive.status){//判断登陆状态
		case "login_ok"://登陆成功
			login=true;
			user.username=c_obj.username;
			user.nickname=receive.nickname;
			break;
		case "login_not_exist"://用户不存在
			login="false";
			break;
		case "login_passed_err"://密码错误
			login="false";
			break;
		case "login_server_err"://服务器错误
			login="false";
			//alert("服务器异常");
			break;
		default://服务器坏了
			//alert("server_no_ack：在登录时服务器没有响应");
	}
}

