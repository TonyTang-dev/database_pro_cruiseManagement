// 全局变量
var dataList=[	
			{
				"id":"1",
				"username":"张三",
				"sex":"男",
				"age":"12",
				"phone":"15117652864",
				"school":"CQU",
				"limit":"普通用户"
			},
			{
				"id":"2",
				"username":"李芳",
				"sex":"女",
				"age":"23",
				"phone":"18652637862",
				"school":"QingHua",
				"limit":"普通用户"
			},
			{
				"id":"3",
				"username":"王五",
				"sex":"女",
				"age":"12",
				"phone":"18652637862",
				"school":"CQU",
				"limit":"普通用户"
			},
			{
				"id":"4",
				"username":"赵芳",
				"sex":"男",
				"age":"23",
				"phone":"18652637862",
				"school":"QingHua",
				"limit":"普通用户"
			},
			{
				"id":"5",
				"username":"李丽",
				"sex":"女",
				"age":"12",
				"phone":"18652637862",
				"school":"CQU",
				"limit":"普通用户"
			},
			{
				"id":"6",
				"username":"王麻子",
				"sex":"女",
				"age":"12",
				"phone":"18652637862",
				"school":"QingHua",
				"limit":"普通用户"
			},
			{
				"id":"7",
				"username":"小二",
				"sex":"男",
				"age":"23",
				"phone":"18652637862",
				"school":"CQU",
				"limit":"普通用户"
			}
		];
// bootstrap-table对象
var $table=$("#usertab");

// 用户反馈信息测试
var feedback=["为什么帐号密码没输错却登录不了？","为什么不能缓存密码？","Its very perfect system."];

// 自动执行
$(function($){
	var feedbackPanel=$("#chat-text");
	var a=null;
	for(var i=0;i<feedback.length;i++){
		a=$("<span>"+(i+1)+". "+feedback[i]+"</span><br/>");
		feedbackPanel.append(a);
	}
	
	// alert("欢迎！");
	// 获取传过来的参数
	var url = decodeURI(window.location.href);
	var userName="";
	var pwd="";
	try{
		var params = url .split("?name=")[1].split("pwd=");
		userName=params[0];
		pwd=params[1];
	}catch(exception){
		userName="";
		pwd="";
	}
	
	// 先把自己的数据传入到数据列表中
	var data1={
		"id":"0",
		"username":userName,
		"sex":"man",
		"age":"12",
		"phone":userName,
		"school":"CQU",
		"limit":"我"
	};
	if(!userName==""){
		dataList.unshift(data1);
	}
	
	$table.bootstrapTable({
		pagination: true,
		search: true,
		striped:true,
		uniqueId:"id",
		columns:[
			{
				field:'select',
				checkbox:true,
				align:'center',
				valign:"middle"
			},{
				title:"编号",
				field:"id",
				align:"center",
				valign:"middle"
			},{
				title:"用户名",
				field:"username",
				align:"center",
				valign:"middle"
			},{
				title:"性别",
				field:"sex",
				align:"center",
				valign:"middle"
			},{
				title:"年龄",
				field:"age",
				align:"center",
				valign:"middle"
			},{
				title:"电话",
				field:"phone",
				align:"center",
				valign:"middle"
			}
			,{
				title:"学校",
				field:"school",
				align:"center",
				valign:"middle"
			}
			,{
				title:"权限",
				field:"limit",
				align:"center",
				valign:"middle"
			}
		],
		data: dataList,
		
		onRefresh(){
			alert("点击了刷新表格");
		},
		onClickRow(row,$element){
			$("#delID").text(row.id);
			$("#delName").text(row.username);
			$("#delSex").text(row.sex);
			$("#delAge").text(row.age);
			$("#delNum").text(row.phone);
			$("#delSch").text(row.school);
			$("#delLimit").text(row.limit);
		},
		onCheckAll(rows){
			$("#del-btn").click(function(){
				var result=confirm("确定要删除所有用户吗？");
				if(result==true){
					$table.bootstrapTable("removeAll");
				}
			});
		},
		onCheck(row){
			$("#delID").text(row.id);
			$("#delName").text(row.username);
			$("#delSex").text(row.sex);
			$("#delAge").text(row.age);
			$("#delNum").text(row.phone);
			$("#delSch").text(row.school);
			$("#delLimit").text(row.limit);
		}
	});
});

function addUser(){
	// var $table=$("#usertab");
	var data1={
		"id":dataList.length,
		"username":$("#addUserName").val(),
		"sex":$("#addUserSex").val(),
		"age":$("#addUserAge").val(),
		"phone":$("#addUserNum").val(),
		"school":$("#addUserSch").val(),
		"limit":$("#addUserLimit").val()
	};
	if($("#addUserName").val()==""
		&& $("#addUserSex").val()==""
		&& $("#addUserAge").val()==""
		&& $("#addUserNum").val()==""
		&& $("#addUserSch").val()==""
		&& $("#addUserLimit").val()==""){
			Toast("请先填写所有信息在添加哦！");
			return;
	}
	dataList.push(data1);
	$table.bootstrapTable("append",data1);
	
	// 将新增用户信息发送给服务器
	
	var name2=$("#addUserName").val();
	var sex2=$("#addUserSex").val();
	var age2=$("#addUserAge").val();
	var num2=$("#addUserNum").val();
	var sch2=$("#addUserSch").val();
	var limit2=$("#addUserLimit").val();
	$.ajax({
		type:'post',
		url:'./JLogin',
		data:{
			name:name2,
			sex:sex2,
			age:age2,
			num:num2,
			sch:sch2,
			limit:limit2
		},
		timeout: 5000,
		dataType:'json',
		success:function(data,textStatus){
			alert("提交了用户"+name2+"的信息！");
		},
		error:function(data){
			// console.log(data);
			alert("提交用户"+name2+"的信息失败！");
			window.location.href="./show404.html";
		}
	});
	
	// 之后将输入框清空便于下一次输入
	$("#addUserName").val("");
	$("#addUserSex").val("");
	$("#addUserAge").val("");
	$("#addUserNum").val("");
	$("#addUserSch").val("");
	$("#addUserLimit").val("");
}

function delUser(){
	if($("#delID").text()==""){
		Toast("请先选中需要删除的用户信息哦！");
		return;
	}
	
	var result=confirm("确定要删除用户"+$("#delName").text()+"吗？");
	if(result==true){
		$table.bootstrapTable("removeByUniqueId",$("#delID").text());
	}
	else{
		//
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