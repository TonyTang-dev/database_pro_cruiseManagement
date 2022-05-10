$(function($) {
	var $table = $("#usertab");
	
	// 初始化#usertab所指向的这个table标签
	$table.bootstrapTable({
		height: "600px",
		
		// 所需要填充表格的静态数据
		data: [{
			"id": 1,
			"username": "李明",
			"sex": "男",
			"age": "12",
			"phone": 133567890,
			"address": "星网锐捷"
		}],
		url:"/userManager/getUserListController.do",
		method:"GET",
		// 所需要显示的列字段信息
		columns: [
			{
			field: "select",
			checkbox: true,
			align: "center",
			valign: "middle"
			}, {
				title: "编号",
				field: "id",
				align: "center",
				valign: "middle"
			}, {
				title: "用户名",
				field: "username",
				align: "center",
				valign: "middle"
			}, {
				title: "性别",
				field: "sex",
				align: "center",
				valign: "middle",
				fromatter:function(value,row,index){
					return ((typeof(value)!="undefined")&&
							(value==0))?"男":"女";
				}
			}, {
				title: "年龄",
				field: "age",
				align: "center",
				valign: "middle"
			}, {
				title: "电话",
				field: "phone",
				align: "center",
				valign: "middle"
			}, {
				title: "住址",
				field: "address",
				align: "center",
				valign: "middle"
			}
		]
		
	});
	
	//$("#add_user_Btn").bind("click",addUser);
});
function addUser(){
	var userName = $("#username").val();
	var password = $("#password").val();
	var sex = $("#sex").val();
	var age = $("#age").val();
	var mobilePhone = $("#mobilephone").val();
	var address = $("#address").val();
	
	var param={
		userName:userName,
		password:password,
		sex:sex,
		age:age,
		mobilePhone:mobilePhone,
		address:address
	};
	
	//ajax request
	$.ajax({
		url:"/userManager/addUserController.do",
		data:param,
		success:function(data){
			if((typeof(data)!="undefined")&&(data==0)){
				$table.bootstrapTable("refresh");
			}
		},
		complete:function(){
			$("#myModal").modal("hide");
		},
		context:this
	});
}