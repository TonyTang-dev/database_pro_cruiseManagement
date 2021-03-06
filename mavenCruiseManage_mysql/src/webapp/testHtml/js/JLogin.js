$(function(){
	$("#login1-2 label").eq(0).addClass("ons").siblings().removeClass("ons");
	$("#login1-2 label").click(function(){
		var _index=$(this).index();
		$(".tab-box>div").eq(_index).show().siblings().hide();
		$("#login1-2 label").eq(_index).addClass("ons").siblings().removeClass("ons");
	});
	
	// 窗口宽高
	window.resizeBy(window.innerWidth,window.innerHeight);
	
	// 如果是记住密码，则要将密码显示
	try{
		var myinfo=JSON.parse(localStorage.getItem("myInfo"));
		$(".account").val(myinfo.name);
		$("#pwd1").val(myinfo.pwd);
	}catch(exception){
		$(".account").val("");
		$("#pwd1").val("");
	}
	
	var today=new Date().getHours();
	var msg="早上好！欢迎登录";
	if(today>=12&&today<18){
		msg="下午好！欢迎登录";
	}
	else if(today>=18&&today<24){
		msg="晚上好！欢迎登录";
	}
	$("#title").text(msg);
});

window.onload=function(){
	
}

function clickSubmit(index){
	var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	if($(".account").val()==="" && $(".account2").val()===""){
		Toast("请先输入账号信息哦");
		return;
	}
	if (myreg.test($(".account").val())==false && myreg.test($(".account2").val())==false) {
		Toast('手机号格式不正确')
		return false;
	} 
	else {
		if((index==1&&$(".account").val()=="18223075242" && $("#pwd1").val()=="123456")||
				(index==2&&$(".account").val()=="18223075242" && $("#txt_YZ").val()=="6535")){
			var userName=$(".account").val();
			var password=$("#pwd1").val();
			
			if(index==1&&$("#remPWD").attr("checked")=='checked'){
				var obj = {"name": $(".account").val(),"pwd": $("#pwd1").val()};
			　　	obj = JSON.stringify(obj); //转化为JSON字符串
			　　	localStorage.setItem("myInfo", obj);
			}
			else{
				localStorage.removeItem("myInfo");//清空缓存
			}
			
			// ajax
			$.ajax({
				url: "JSearch",
				type: "post",
				dataType: 'json',
				timeout:5000,
				cache:false,
				data:{
					username:userName,
					password:password
				},
				error:function(){
					// window.location.href="show404.html";
					window.location.href="userManage.html?name="+userName+"pwd="+password;
					// $(window).attr("location","show404.html");
					return false;
				},
				success:function(){
					window.location.href="userManage.html?name="+userName+"pwd="+password;
				},
				complete:function(){
					// window.location.href="JSearch.html";
				}
			});
		}
		else{
			Toast("您输入的账户或密码有误");
		}
		return true;
	}
}
//提示信息 封装
function Toast(msg){  
	duration=1000;  
	var m = document.createElement('div');
	if(msg==""){
		m.innerHTML="请先输入内容哦！";
	}
	else{
		m.innerHTML = msg; 
	}
	m.style.cssText="z-index: 99; font-size: .32rem;color: rgb(255, 255, 255);background-color: rgba(0, 0, 0, 0.6);padding: 10px 15px;margin: 0 0 0 -60px;border-radius: 4px;position: fixed;    top: 50%;left: 50%;width: 130px;text-align: center;";
	document.body.appendChild(m);  
	setTimeout(function() {  
		var d = 0.5;
		m.style.opacity = '0';  
		
		document.body.removeChild(m)
	}, duration);  
}

function contactUs(){
	window.alert("欢迎通过官方网站与我们联系哦！");
}