/* 
	全局变量
 */
// 默认初始表格数据
var dataList=[	
			{
                "id":"0",
                "username":"userName",
                "password":'123456',
                "sex":"男",
                "age":'23',
                "role":"1"
			}
		];
// bootstrap-table对象-jquey节点
var $table=$("#usertab");
//薪资表
var $assessmentTab = $("#assessmentTab");

// 用户反馈信息测试
var feedback=["为什么帐号密码没输错却登录不了？","为什么不能缓存密码？","Its very perfect system."];

//存储用户当前选择的最新行
var updateRow = null;

//男女数量
var sexList=[          // 数据数组，name 为数据项名称，value 为数据项值
			{value:0, name:'男'},
			{value:0, name:'女'},
		];
var roleNameList=[];
var roleCountList=[0,0];



/* 
	类似于构造函数，自动执行，基于jquery实现，包括函数绑定和界面初始化
 */
$(function($){
        $.ajax({
			method: "GET",
			url:'/mavenCruiseManage/getRideListController.do',
			timeout: 5000,
			context:this,
			success:function(data,textStatus){
			    console.log(data[0]);
//				if(JSON.parse(data).length != 0){
//					var content = data[0];//JSON.parse(data)[0];
//					console.log(content.cruiseID);
//					console.log(content["price"]);
//
//				}
//				else{
//					alert("发生错误！");
//				}
			},
			error:function(data){
				// window.location.href="/mavenCruiseManage/show404.html";
			},
			complete:function(){

			}
		});


	// 初始化选中状态，首先选中控制台
	$("#console").css("background-color","#ff5500");
	
	// 点击个人头像的弹出提示
	$("#head-photo").click(function(){
		Toast("点击了个人头像");
	});
	
	/* 
		图形可视化，将用户信息基于图标展现---基于echarts.js
	 */
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init($('#pieGraph')[0]);

	// 指定图表的配置项和数据-------男女比例
	var option = {
		title: {
			text: '用户性别比例'
		},
		color: ["#ff5500","#0055ff"],
		tooltip: {},
		legend: {
			data:['女']
		},
		series : [
			{
				name: '性别',
				type: 'pie',    // 设置图表类型为饼图
				radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
				data: sexList
			}
		]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	
	
	// 基于准备好的dom，初始化echarts实例----学校分布
	var barChart = echarts.init($("#barGraph")[0]);
	// 指定图表的配置项和数据
	var optionBar = {
		title: {
			text: '权限分布情况'
		},
		color: ["#ff5500","#55ff00","#0000ff"],
		tooltip: {},
		legend: {
			data:['权限']
		},
		xAxis: {
			data: ['用户','管理员']//schoolNameList
		},
		yAxis: {},
		series: [{
			name: '权限',
			type: 'bar',
			data: roleCountList
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	barChart.setOption(optionBar);
	
	
	// 查询用户
	var feedbackPanel=$("#queryResult");
	var a=null;
	
	
	/* 
		查询用户信息的函数绑定
	 */
	$("#queryByName").click(function(){
		var userName = $("#queryUserName").val();
		if (userName == ""){
			Toast("请先输入查询内容再查询哦！");
			return;
		}
		$.ajax({
			method: "POST",
			url:'/mavenCruiseManage/queryUserController.do',
			data:{
				userName: userName,
			},
			timeout: 5000,
			context:this,
			success:function(data,textStatus){
				feedbackPanel.empty();
                var curObj = JSON.parse(data)
				
				if(curObj.length != 0){
					a=$("<span>查找到共"+curObj.length+"项纪录</span><br/>");
					feedbackPanel.append(a);
					
					/* 
						动态添加标签
					 */
					for(var i=0;i<curObj.length;i++){
						a=$("<span>ID："+curObj[i].userID+"</span><br/>");
						feedbackPanel.append(a);
						a=$("<span>用户名："+curObj[i].userName+"</span><br/>");
						feedbackPanel.append(a);
						a=$("<span>密码："+curObj[i].password+"</span><br/>");
						feedbackPanel.append(a);
						a=$("<span>性别："+curObj[i].sex+"</span><br/>");
						feedbackPanel.append(a);
						a=$("<span>年龄："+curObj[i].age+"</span><br/>");
						feedbackPanel.append(a);
						a=$("<span>号码："+curObj[i].telephone+"</span><br/>");
						feedbackPanel.append(a);
						a=$("<span>角色："+curObj[i].role+"</span><br/>");
						feedbackPanel.append(a);
					}
				}
				else{
					alert("用户"+userName+"的信息不存在！");
				}
			},
			error:function(data){
				window.location.href="/mavenCruiseManage/show404.html";
			},
			complete:function(){
				$("#queryUserName").val("");
			}
		});
	});
	
	
	/* 
		更新用户信息函数绑定
	*/
	$("#queryUpdateByName").click(function(){
		var userName = $("#queryUpdateUserName").val();
		if (userName == ""){
			Toast("请先输入查询内容再获取哦！");
			return;
		}
		
		var feedbackPanel = $("#updatePanel");
		
		$.ajax({
			method: "POST",
			url:'/mavenCruiseManage/queryUserController.do',
			data:{
				userName: userName,
			},
			timeout: 5000,
			context:this,
			success:function(data,textStatus){
				if(JSON.parse(data).length != 0){
					var content = JSON.parse(data)[0];
                    var keys = ["userID","userName","password","sex","age","telephone","role"];

					$.each($("#form-update").find("input"),function(index,element){
					    $(this).val(content[keys[index]]);
					});
					
					feedbackPanel.show();
				}
				else{
					alert("用户"+userName+"的信息不存在！");
				}
			},
			error:function(data){
				window.location.href="/mavenCruiseManage/show404.html";
			},
			complete:function(){
				$("#queryUpdateUserName").val("");
			}
		});
	});
	
	
	/* 
		解析url，获取登录状态
	*/
	var url = decodeURI(window.location.href);
	var userName="";
	var pwd="";
	try{
		// 如果能够获得链接数据，则代表用户是登录过来的
		var params = url .split("?name=")[1].split("pwd=");
		userName=params[0];
		pwd=params[1];
		
		$(".nick").text("昵称："+userName);
		
		$("#login").text("退出登录");
	}catch(exception){
		// 获取不到链接数据，说明用户是游客登录进来的
		userName="";
		pwd="";
	}
	
	
	/* 
		这里是纯前端测试的数据，先整合后暂时不使用
	 */
	// 先把自己的数据传入到数据列表中
	var data1={
		"id":"0",
        "username":userName,
        "password":'123456',
        "sex":"男",
        "age":'23',
        "role":"1"
	};
	if(!userName==""){
		dataList.unshift(data1);
	}
	
	/* 
		初始化表格属性
	 */
	$table.bootstrapTable({
		pagination: true,
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
        				field:"userID",
        				align:"center",
        				valign:"middle"
        			},{
        				title:"用户名",
        				field:"userName",
        				align:"center",
        				valign:"middle"
        			},{
        				title:"密码",
        				field:"password",
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
        			}
        			,{
        				title:"号码",
        				field:"telephone",
        				align:"center",
        				valign:"middle"
        			}
        			,{
        				title:"权限",
        				field:"role",
        				align:"center",
        				valign:"middle"
        			}
        		],

		data: dataList,
		
		url:"/mavenCruiseManage/getUserListController.do",
		method:"GET",
		
		/* 
			成功加载数据
		 */
		onLoadSuccess:function(data){
			// 数量统计
			for (var index=0;index<data.length;index++){
				//性别
				if(data[index].sex=='男'){
					sexList[0].value++;
				}
				else{
					sexList[1].value++;
				}
				
				// 权限
				if(data[index].role == '用户'){
                    roleCountList[0]++;
				}
				else{
				    roleCountList[1]++;
				}
			}
			// 刷新饼图的性别数据
			myChart.setOption(option);
			// 刷新柱状图的学校信息
			barChart.setOption(optionBar);
		},
		
		onRefresh(){
			Toast("表格数据已刷新");
		},
		onClickRow(row,$element){
			
		},
		onCheckAll(rows){
			// $("#del-btn").click(function(){
			// 	var result=confirm("确定要删除所有用户吗？");
			// 	if(result==true){
			// 		$table.bootstrapTable("removeAll");
			// 	}
			// });
		},
		onCheck(row){
			// 最新行数据暂存
			updateRow = row;
		}
	});
	/*考勤表*/
	$assessmentTab.bootstrapTable({
        pagination: true,
        striped:true,
        uniqueId:"id",

        columns:[
                    {
                        field:'select',
                        checkbox:true,
                        align:'center',
                        valign:"middle"
                    },{
                        title:"乘客编号",
                        field:"salaryID",
                        align:"center",
                        valign:"middle"
                    },{
                        title:"乘客名字",
                        field:"userID",
                        align:"center",
                        valign:"middle"
                    },{
                        title:"航程ID",
                        field:"basicSalary",
                        align:"center",
                        valign:"middle"
                    },{
                        title:"船舱ID",
                        field:"bonus",
                        align:"center",
                        valign:"middle"
                    },{
                        title:"支付金额",
                        field:"deduct",
                        align:"center",
                        valign:"middle"
                    }
                ],

        data: dataList,

        url:"/mavenCruiseManage/getUserAssessmentController.do",
        method:"GET",

        /*
            成功加载数据
         */
        onLoadSuccess:function(data){

        },

        onRefresh(){
            Toast("表格数据已刷新");
        },
        onClickRow(row,$element){

        },
        onCheckAll(rows){

        },
        onCheck(row){

        }
    });


	/* 
		根据行id，调用删除函数发送数据到后台以删除用户数据，删除函数绑定
	 */
	$("#deleteByIds").click(function(){
		var rows = $table.bootstrapTable('getSelections');
		//rows选中行的数据对象数组
		var delIdList = "";
		for(var i=0;i<rows.length;i++){
			delIdList += rows[i].userID+",";
		}
		
		if(delIdList != ""){
		 	var result=confirm("确定要删除下列用户吗？");
		 	if(result==true){
				// 调用删除操作
				delUser(delIdList.slice(0,-1));
		 	}
		}
	});
	/*
        根据顺序，输入考勤天数并处理
     */
    $("#commitAssessment").click(function(){
        //rows选中行的数据对象数组
        var assessmentIdList = $("#batchAssessment").val();

        if(assessmentIdList != ""){
            var result=confirm("确定提交数据吗？");
            if(result==true){
                // 调用删除操作
                $.ajax({
                    method: "POST",
                    url:'/mavenCruiseManage/updateAssessmentController.do',
                    data:{
                        userId: assessmentIdList
                    },
                    timeout: 5000,
                    context:this,
                    success:function(data,textStatus){
                        if((typeof(data)!="undefined")&&
                            (null!=data)&&(0==data)){
                                Toast("成功提交考勤信息！");
                        }
                        else{
                            alert("提交考勤信息失败，请重试！");
                        }

                        //refresh data
                        $assessmentTab.bootstrapTable('refresh');
                        // $table.bootstrapTable('refresh');
                        // window.location.reload();
                    },
                    error:function(data){
                        // console.log(data);
                        // alert("因暂无后端，故提交用户"+name2+"的信息失败！");
                        window.location.href="/mavenCruiseManage/show404.html";
                    }
                });
            }
        }
        else{
            Toast("请先输入考勤信息");
        }
    });
});


/* 
	dom实现添加函数绑定
 */
function addUser(){
//    最终要提交的data
    var commitData = {
        userID:"",
        userName:"",
        password:"",
        sex:"",
        age:"",
        telephone:"",
        Role:""
    };
    var indexField = ["userID","userName","password","sex","age","telephone","Role"];
//    通过表单获取所有的数据，存储为json格式
    var addData = $("#form-add").serializeArray();
    for(var i=0;i<addData.length;i++){
        commitData[indexField[i]] = addData[i].value;
        if(addData[i].value == ""){
            Toast("请先填写所有信息再添加哦！");
            return;
        }
    }

	/*dataList.push(data1);
	$table.bootstrapTable("append",data1);*/

	// 将新增用户信息发送给服务器
	$.ajax({
		method: "POST",
		url:'/mavenCruiseManage/addUserController.do',
		data:commitData,
		timeout: 5000,
		context:this,
		success:function(data,textStatus){
			if((typeof(data)!="undefined")&&
				(null!=data)&&(0==data)){
					alert("成功提交了用户"+commitData.userName+"的信息！");
			}
			else{
				alert("提交用户"+commitData.userName+"的信息失败，请重试！");
			}
			
			//refresh data
			$table.bootstrapTable('refresh');
			$assessmentTab.bootstrapTable('refresh');
			// window.location.reload();
		},
		error:function(data){
			// console.log(data);
			// alert("因暂无后端，故提交用户"+name2+"的信息失败！");
			window.location.href="/mavenCruiseManage/show404.html";
		}
	});

	// 之后将输入框清空便于下一次输入dom对象才有reset()方法
    $("#form-add")[0].reset();
}


/* 
	删除用户之前需要查询一下特定用户名的用户是否存在，再决定是否发出删除请求
 */
function delQuery(){
	var deleteResultPanel = $("#deleteResult");
	$.ajax({
		method: "POST",
		url:'/mavenCruiseManage/queryUserController.do',
		data:{
			userName: $("#deleteUserName").val(),
		},
		timeout: 5000,
		context:this,
		success:function(data,textStatus){
			deleteResultPanel.empty();
			
			var idList = "";
			var curObj = JSON.parse(data)
			if(JSON.parse(data).length != 0){
				a=$("<span>查找到共"+JSON.parse(data).length+"项纪录</span><br/>");
				deleteResultPanel.append(a);
				for(var i=0;i<JSON.parse(data).length;i++){
					idList+=JSON.parse(data)[i].userID+",";
					a=$("<span>ID："+curObj[i].userID+"</span><br/>");
					deleteResultPanel.append(a);
					a=$("<span>用户名："+curObj[i].userName+"</span><br/>");
					deleteResultPanel.append(a);
					a=$("<span>密码："+curObj[i].password+"</span><br/>");
					deleteResultPanel.append(a);
					a=$("<span>性别："+curObj[i].sex+"</span><br/>");
					deleteResultPanel.append(a);
					a=$("<span>年龄："+curObj[i].age+"</span><br/>");
					deleteResultPanel.append(a);
					a=$("<span>电话："+curObj[i].telephone+"</span><br/>");
					deleteResultPanel.append(a);
					a=$("<span>角色："+curObj[i].role+"</span><br/>");
					deleteResultPanel.append(a);
				}
			}
			else{
				alert("用户"+curObj[0].userName+"的信息不存在！");
			}
			if(idList != ""){
			    var result = false;
			    setTimeout(function(){
			        result=confirm("确定要删除下列用户吗？");
                    if(result==true){
                        // 调用删除操作
    //					这个idList后面还有个逗号
                        idList = idList.slice(0,-1);
                        delUser(idList);
                    }
                },1000);

			}
		},
		error:function(data){
			window.location.href="/mavenCruiseManage/show404.html";
		},
		complete:function(){
			$("#deleteUserName").val("");
		}
	});
}


/* 
	删除函数执行绑定
 */
function delUser(curIdList){
	if(curIdList=="" || curIdList==undefined){
		Toast("请先选中需要删除的用户信息哦！");
		return;
	}
	$.ajax({
		method: "POST",
		url:'/mavenCruiseManage/deleteUserController.do',
		data:{
			userId: curIdList
		},
		timeout: 5000,
		context:this,
		success:function(data,textStatus){
			if((typeof(data)!="undefined")&&
				(null!=data)&&(0==data)){
					Toast("成功删除了用户的信息！");
			}
			else{
				alert("删除用户的信息失败，请重试！");
			}
			
			//refresh data
			$table.bootstrapTable('refresh');
			$assessmentTab.bootstrapTable('refresh');
			// $table.bootstrapTable('refresh');
			// window.location.reload();
		},
		error:function(data){
			// console.log(data);
			// alert("因暂无后端，故提交用户"+name2+"的信息失败！");
			window.location.href="/mavenCruiseManage/show404.html";
		}
	});
}


/* 
	更新用户数据的绑定
 */
function updateUser(){

//    最终要提交的data
    var commitData = {
        userID:"",
        userName:"",
        password:"",
        sex:"",
        age:"",
        telephone:"",
        Role:""
    };
    var indexField = ["userID","userName","password","sex","age","telephone","Role"];

    var updateData = $("#form-update").serializeArray();
    for(var i=0;i<indexField.length;i++){
        if(updateData[i].value == ""){
            Toast("请完善用户信息后再提交哦");
            return;
        }
        commitData[indexField[i]] = updateData[i].value;
    }
	$.ajax({
		method: "POST",
		url:'/mavenCruiseManage/updateUserController.do',
		data:commitData,
		timeout: 5000,
		context:this,
		success:function(data,textStatus){
			if((typeof(data)!="undefined")&&
				(null!=data)&&(0==data)){
					alert("成功修改了用户"+commitData.userName+"的信息！");
			}
			else{
				alert("修改用户"+commitData.userName+"的信息失败，请重试！");
			}
			
			//refresh data
			$table.bootstrapTable('refresh');
			$assessmentTab.bootstrapTable('refresh');
			// window.location.reload();

        //  清空
            $("#form-update")[0].reset();
			$("#updatePanel").hide();
		},
		error:function(data){
			// console.log(data);
			// alert("因暂无后端，故提交用户"+name2+"的信息失败！");
			window.location.href="/mavenCruiseManage/show404.html";
		}
	});

}

/* 
	弹窗提示，函数封装---基于动态添加dom节点
 */
function Toast(msg){  
	duration=1000;  
	var m = document.createElement('div');
	if(msg==""){
		m.innerHTML="请先输入内容哦！";
	}
	else{
		m.innerHTML = msg; 
	}
	m.style.cssText="z-index: 99; font-size: 18px;font-weight:bold;font-family:'宋体';color: rgb(255, 255, 255);background-color: rgba(0, 0, 0, 0.6);padding: 10px 15px;margin: 0 0 0 -60px;border-radius: 4px;position: fixed;    top: 50%;left: 50%;width: 200px;text-align: center;";
	document.body.appendChild(m);  
	setTimeout(function() {  
		var d = 0.5;
		m.style.opacity = '0';  
		
		document.body.removeChild(m)
	}, duration);  
}



/* 
	由于我们需要动态hover效果和标签切换效果，所以基于js对效果进行
	绑定，切换之后需要修改背景色、悬停效果等
 */
var curIndex = 2;
function changePage(index){
	if(index == curIndex){
		return;
	}
	var $page = null;
	var $selectTag=null;
	switch(index){
		case 1:
			$page = $("#myData");
			$selectTag = $("#data");
			break;
		case 2:
			$page = $("#myConsole");
			$selectTag = $("#console");
			break;
		case 3:
			$page = $("#myAdd");
			$selectTag = $("#add");
			break;
		case 4:
			$page = $("#myQuery");
			$selectTag = $("#query");
			break;
		case 5:
			$page = $("#myUpdate");
			$selectTag = $("#update");
			
			if(updateRow != null){
				//设置输入标签可见性
				$("#updatePanel").show();

				// 设置输入框文本
                var keys = ["id","userName","password","realName","departmentID","jobPosition","sex","degree","bornDate","userSN","telephone","mobilePhone","email","inDate","intro","role"];
                // .each函数遍历
                $.each($("#form-update").find("input"),function(index,element){
                    $(this).val(updateRow[keys[index]]);
                });
				
				updateRow = null;
			}
			break;
		case 6:
			$page = $("#myDelete");
			$selectTag = $("#delete");
			break;
		case 7:
			$page = $("#myUserList");
			$selectTag = $("#listUser");
			break;
		case 8:
			$page = $("#mySetting");
			$selectTag = $("#setting");
			break;
	}
	var $cur_page = null;
	var $cur_tag = null;
	switch(curIndex){
		case 1:
			$cur_page = $("#myData");
			$cur_tag = $("#data");
			curIndex = index;
			break;
		case 2:
			$cur_page = $("#myConsole");
			$cur_tag = $("#console");
			curIndex = index;
			break;
		case 3:
			$cur_page = $("#myAdd");
			$cur_tag = $("#add");
			curIndex = index;
			break;
		case 4:
			$cur_page = $("#myQuery");
			$cur_tag = $("#query");
			curIndex = index;
			break;
		case 5:
			$cur_page = $("#myUpdate");
			$cur_tag = $("#update");
			curIndex = index;
			break;
		case 6:
			$cur_page = $("#myDelete");
			$cur_tag = $("#delete");
			curIndex = index;
			break;
		case 7:
			$cur_page = $("#myUserList");
			$cur_tag = $("#listUser");
			curIndex = index;
			break;
		case 8:
			$cur_page = $("#mySetting");
			$cur_tag = $("#setting");
			curIndex = index;
			break;
	}
	// 隐藏旧页面，展示新页面
	$cur_page.hide();
	$page.show();
	
	// 为选中标签着色
	$cur_tag.css("background-color","rgba(0,0,0,0)");
	
	// 由于设置CSS之后原先的设计失效，故动态添加悬浮指针效果
	$cur_tag.hover(function(){
		$cur_tag.css("background-color","#ff5500");
	},function(){
		$cur_tag.css("background-color","rgba(0,0,0,0)");
	});
	$selectTag.css("background-color","#ff5500");
	$selectTag.hover(function(){
		$selectTag.css("background-color","#ff5500");
	},function(){
		$selectTag.css("background-color","#ff5500");
	});
}