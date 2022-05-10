$(function(){
	
	/* 
		后期--应修改为表单方式获取数据，增大便捷性
	 */
	// 手机号验证
	var phone=$("#phone");
	var prompt1=$("#prompt1");
	var rag1=/^[1][358][0-9]{9}$/;
	phone.focus(function(){
		$("#div1").show();
		phone.css("borderColor","#67a1e2");
		prompt1.text("请输入手机号");
	} );
	phone.blur(function(){
		phone.css("borderColor","#ddd");
		if(this.value==""){
			prompt1.text("手机号不能为空");
		}
		else{
			if(rag1.test(this.value)==true){
				$("#div1").hide();
			}
			else{
				prompt1.text("手机号格式不正确");
			}
		}
	});
	
	var userName = $("#nick");
	var userAge = $("#age");
	var userSchool = $("#school");
	
	// 性别验证
	var sex=$("#sex");
	sex.focus(function(){
		sex.css("borderColor","#67a1e2");
	});
	sex.blur(function(){
		sex.css("borderColor","#ddd");
		if(sex.val() == "" || (sex.val() != "男" && sex.val() != "女")){
			Toast("输入的性别格式有误"+sex.val());
			sex.val("");
		}
	});
	
	// 密码验证
	var pwd=$("#password");
	var prompt=$("#prompt3");
	var rag3=/^\w{8,20}$/;
	var rag4=/^\d{8,20}$/;
	var rag5=/^[A-z0-9]{8,10}$/;
	var rag6=/^[A-z0-9]{10,19}$/;
	pwd.focus(function(){
		$("#div3").show();
		pwd.css("borderColor",'#67a1e2');
		$("#div3").css("width",216);
		prompt.text("请设置登录密码");
		$("#grade1").css("backgroundColor","#f1d0b9");
		$("#grade2").css("backgroundColor","#f1d0b9");
		$("#grade3").css("backgroundColor","#f1d0b9");
	});
	pwd.blur(function(){
		pwd.css("backgroundColor","#ddd");
		if(this.value==""){
			prompt.text("请设置登录密码");
			$("#div3").css('width',216);
		}
		else{
			if(rag3.test(this.value)==true){
				if(rag4.test(this.value)==true){
					prompt.text("密码过于简单，有风险");
					$("#div3").css("width",216);
				}
				else{
					$("#div3").hide();
				}
				
				if(rag5.test(this.value)==true){
					if(rag4.test(this.value)==true){
						$("#grade1").css("backgroundColor","#ff893a");
					}
					else{
						$("#grade1").css("backgroundColor","#ff893a");
						$("#grade2").css("backgroundColor","#ff893a");
					}
				}
				if(rag6.test(this.value)==true){
					if(rag4.test(this.value)==true){
						$("#grade1").css("backgroundColor","#ff893a");
					}
					else{
						$("#grade1").css("backgroundColor","#ff893a");
						$("#grade3").css("backgroundColor","#ff893a");
						$("#grade2").css("backgroundColor","#ff893a");
					}
				}
			}
			else{
				prompt.text("密码需为8-20个由字母、数字和符号组成");
				$("#div3").css("width",300);
			}
		}
	});
	
	// 确认密码
	var pwds=$("#password1");
	var prompt4=$("#prompt4");
	pwds.focus(function(){
		$("#div4").show();
		prompt4.text("请在此输入密码");
	});
	pwds.blur(function(){
		if(this.value==""){
			prompt4.text("密码不能为空");
		}
		else{
			if(this.value==pwd.val()){
				$("#div4").hide();
			}
			else{
				prompt4.text("您两次输入的密码不一致");
			}
		}
	});
	
	
	/* 
		注册点击事件绑定
	 */
	$("#btn").click(function(){
		if(userName.val() == "" || userAge.val() == "" ||userSchool.val()==""||
			sex.val()==""||phone.val()==""||pwd.val()==""){
				Toast("请先完善注册信息后再注册哦！")
				return;
			}
		
		var sexID = sex.val()=="男"?1:0;
		
		$.ajax({
			method: "POST",
			url:'/mavenUserManager/addUserController.do',
			data:{
				userName: userName.val(),
				password: pwd.val(),
				sex: sexID,
				age: userAge.val(),
				mobilePhone: phone.val(),
				school: userSchool.val(),
				limit: "普通用户"
			},
			timeout: 10000,
			context:this,
			success:function(data,textStatus){
				if((typeof(data)!="undefined")&&
					(null!=data)&&(0==data)){
						alert("成功注册了用户"+userName.val()+"的信息！");
						setTimeout(function(){
							window.location.href="/mavenUserManager/JLogin.html";
						},2000);
				}
				else{
					alert("注册用户"+userName.val()+"的信息失败，请重试！");
				}
			},
			error:function(data){
				// console.log(data);
				// alert("因暂无后端，故提交用户"+name2+"的信息失败！");
				window.location.href="/mavenUserManager/show404.html";
			}
		});
	});
});


function contactUs(){
	window.alert("欢迎通过官方网站与我们联系哦！");
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