$(function(){
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
	
	// 邮箱验证
	var email=$("#Emails");
	var prompt2=$("#prompt2");
	var rag2=/^[a-zA-Z0-9]{1,}@{1}\w+\.{1}\w+$/;
	email.focus(function(){
		$("#div2").show();
		email.css("borderColor","#67a1e2");
		prompt2.text("请输入邮箱");
	});
	email.blur(function(){
		email.css("borderColor","#ddd");
		if(this.value==""){
			prompt2.text("邮箱不能为空");
		}
		else{
			if(rag2.test(this.value)==true){
				$("#div2").hide();
			}
			else{
				prompt2.text("邮箱格式不正确");
			}
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
	
	// 按钮事件监听
	$("#btn").click(function(){
		$(window).attr("location","JVerifyEmail.html");
	});
});


function contactUs(){
	window.alert("欢迎通过官方网站与我们联系哦！");
}