var countdown=60;
function settime(obj){
	if(countdown==0){
		obj.removeAttribute("disabled");
		obj.value="获取验证码";
		countdown=60;
		return;
	}
	else{
		obj.setAttribute("disabled",true);
		obj.value="重新发送("+countdown+")";
		countdown--;
	}
	setTimeout(function(){
		settime(obj);
	},1000);
}
function finishReg(){
	$(".finish").css("backgroundColor", "#acd252");
	Toast("已输入验证码内容："+$("#code").val());
	setTimeout(function(){
		window.location.replace("./JLogin.html");
		// window.history.back(2);
	},3000);
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
	m.style.cssText="font-size: .32rem;color: rgb(255, 255, 255);background-color: rgba(0, 0, 0, 0.6);padding: 10px 15px;margin: 0 0 0 -60px;border-radius: 4px;position: fixed;    top: 50%;left: 50%;width: 130px;text-align: center;";
	document.body.appendChild(m);  
	setTimeout(function() {  
		var d = 0.5;
		m.style.opacity = '0';  
		
		document.body.removeChild(m)
	}, duration);  
}