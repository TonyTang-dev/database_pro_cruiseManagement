(function($){
	function login(event){
		event.preventDefault();
		
		var userName = $("#username").val();
		var password = $("#password").val();
		
		//ajax submit
		$.post("UserManager/loginController.do",
				{username:userName,password:password},
				function(data){
					if((typeof(data)!="undefined")&&
						(null!=data)&&(0==data)){
							
							$(".contain").hide();
							
							$("#content").load(
								"/UserManager/listUserController.do"
							);
						}
				});
	}
	$("#btnRtSubmit").bind("click",login);
})($);