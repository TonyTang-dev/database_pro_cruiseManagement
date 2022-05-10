$(function($){
	$("#loginform").on("submit",function(e){
		var userName=$(".userName").val();
		var password=$("#pwd").val();
		
		// ajax
		$.ajax({
			url: "JSearch",
			type: "post",
			dataType: 'json',
			timeout:2000,
			cache:false,
			data:{
				username:userName,
				password:password
			},
			error:function(){
				window.location.href="JSearch.html";
				// $(window).attr("location","show404.html");
				return false;
			},
			success:function(){
				window.location.href="JSearch.html";
			},
			complete:function(){
				// window.location.href="JSearch.html";
			}
		});
	});
});