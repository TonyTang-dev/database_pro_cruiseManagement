/* 全局变量 */
$cruiseTab = $("#cruiseTab");
$portTab = $("#portTab");
$strollTab = $("#strollTab");
$corporationIOTab = $("#corporationIOTab");
$passengerTab = $("#passengerTab");


$(function($){
	/*船只*/
	$cruiseTab.bootstrapTable({
		pagination: true,
		striped:true,
	
		columns:[
					{
						field:'select',
						checkbox:true,
						align:'center',
						valign:"middle"
					},{
						title:"游轮编号",
						field:"cruiseID",
						align:"center",
						valign:"middle"
					},{
						title:"游轮名字",
						field:"cruiseName",
						align:"center",
						valign:"middle"
					},{
						title:"是否为新",
						field:"isNewer",
						align:"center",
						valign:"middle"
					}
				],
	
		// data: dataList,
	
		url:"/mavenCruiseManage/getCruiseListController.do",
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
	/*港口*/
	$portTab.bootstrapTable({
		pagination: true,
		striped:true,
	
		columns:[
					{
						field:'select',
						checkbox:true,
						align:'center',
						valign:"middle"
					},{
						title:"港口ID",
						field:"portID",
						align:"center",
						valign:"middle"
					},{
						title:"港口名字",
						field:"portName",
						align:"center",
						valign:"middle"
					}
				],
	
		// data: dataList,
	
		url:"/mavenCruiseManage/getPortListController.do",
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
	/*巡游*/
	$strollTab.bootstrapTable({
		pagination: true,
		striped:true,
	
		columns:[
					{
						field:'select',
						checkbox:true,
						align:'center',
						valign:"middle"
					},{
						title:"巡游编号",
						field:"strollID",
						align:"center",
						valign:"middle"
					},{
						title:"巡游时长",
						field:"strollLength",
						align:"center",
						valign:"middle"
					}
				],
	
		// data: dataList,
	
		url:"/mavenCruiseManage/getStrollListController.do",
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
	/*乘客支付记录*/
	$corporationIOTab.bootstrapTable({
		pagination: true,
		striped:true,
	
		columns:[
					{
						field:'select',
						checkbox:true,
						align:'center',
						valign:"middle"
					},{
						title:"收支编号",
						field:"ioID",
						align:"center",
						valign:"middle"
					},{
						title:"总收入",
						field:"income",
						align:"center",
						valign:"middle"
					},{
						title:"乘客总退款",
						field:"refund",
						align:"center",
						valign:"middle"
					}
				],
	
		// data: dataList,
	
		url:"/mavenCruiseManage/getCorporationListController.do",
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
	/*考勤表*/
    $passengerTab.bootstrapTable({
        pagination: true,
        striped:true,
        uniqueId:"passengerID",

        columns:[
                    {
                        field:'select',
                        checkbox:true,
                        align:'center',
                        valign:"middle"
                    },{
                        title:"乘客编号",
                        field:"passengerID",
                        align:"center",
                        valign:"middle"
                    },{
                        title:"乘客名字",
                        field:"passengerName",
                        align:"center",
                        valign:"middle"
                    },{
                        title:"航程ID",
                        field:"rideID",
                        align:"center",
                        valign:"middle"
                    },{
                        title:"船舱ID",
                        field:"cabinID",
                        align:"center",
                        valign:"middle"
                    },{
                        title:"支付金额",
                        field:"payment",
                        align:"center",
                        valign:"middle"
                    }
                ],

        data: dataList,

        url:"/mavenCruiseManage/getPassengerListController.do",
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
});
