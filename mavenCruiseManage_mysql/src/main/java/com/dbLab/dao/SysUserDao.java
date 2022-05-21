package com.dbLab.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.dbLab.utils.DBUtils;

public class SysUserDao {
	public DBUtils dbUtils;
	
	public void setDbUtils(DBUtils dbUtils) {
		this.dbUtils = dbUtils;
	}
	
	/*
		add user information
	*/
	public int addSysUser(SysUser sysUser) {
		//		sql statement
		String sql="insert into sys_user values(?,?,?,?,?,?,?)";
		//		get href
		Connection conn=dbUtils.getConn();
		PreparedStatement pstm = null;
		
		try {
			//			add filed
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1,sysUser.getUserID());
			pstm.setString(2,sysUser.getUserName());
			pstm.setString(3,sysUser.getPassword());
			pstm.setInt(4,sysUser.getSex().equals("男")?1:0);
			pstm.setInt(5,sysUser.getAge());
			pstm.setString(6,sysUser.getTelephone());
			pstm.setInt(7,sysUser.getRole().equals("管理员")?1:0);
			
			//			excuting operation
			pstm.executeUpdate();
			return 0;
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-addSysUser error",e);
		}finally {
			dbUtils.releaseAll(conn, pstm, null);
		}
	}
	
	/*
		update user information
	 */
	public int updateSysUser(SysUser sysUser) {
		//		sql statement
		String sql="update sys_user set userID=?,userName=?,password=?,sex=?,age=?,telephone=?,role=? where userID=?";
		
		//		get href
		Connection conn=dbUtils.getConn();
		PreparedStatement pstm = null;
		
		try {
			//			add filed
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1,sysUser.getUserID());
			pstm.setString(2,sysUser.getUserName());
			pstm.setString(3,sysUser.getPassword());
			pstm.setInt(4,sysUser.getSex().equals("男")?1:0);
			pstm.setInt(5,sysUser.getAge());
			pstm.setString(6,sysUser.getTelephone());
			pstm.setInt(7,sysUser.getRole().equals("管理员")?1:0);
			pstm.setInt(8,sysUser.getUserID());
			
			//			excuting operation
			pstm.executeUpdate();


			dbUtils.releaseAll(conn, pstm, null);

			return 0;
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-updateSysUser error",e);
		}finally {

		}
	}
	
	
	//	query
	public List<SysUser> listAll(){
		List<SysUser> dataList = new ArrayList<SysUser>();
		
		String sql = "select * from sys_user";
		
		//		get conn
		Connection conn = dbUtils.getConn();
		PreparedStatement pstm = null;
		
		ResultSet rs =null;
		
		try {
			pstm = conn	.prepareStatement(sql);
			rs = pstm.executeQuery();
			
			//			traverse
			while(rs.next()) {
				SysUser sysUser = new SysUser();
				sysUser.setUserID(rs.getInt("userID"));
				sysUser.setUserName(rs.getString("userName"));
				sysUser.setPassword(rs.getString("password"));
				sysUser.setSex(rs.getInt("sex"));
				sysUser.setAge(rs.getInt("age"));
				sysUser.setTelephone(rs.getString("telephone"));
				sysUser.setRole(rs.getInt("Role"));
				
				dataList.add(sysUser);
			}
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-listAll error",e);
		}finally {
			dbUtils.releaseAll(conn, pstm, rs);
		}
		
		return dataList;
	}

	// list all assessment view
	public List<SysAssessment> listAllAssessment(){
		List<SysAssessment> dataList = new ArrayList<SysAssessment>();

		String sql = "select * from view_assessment";

		//		get conn
		Connection conn = dbUtils.getConn();
		PreparedStatement pstm = null;

		ResultSet rs =null;

		try {
			pstm = conn	.prepareStatement(sql);
			rs = pstm.executeQuery();

			//			traverse
			while(rs.next()) {
				SysAssessment sysAssessment = new SysAssessment();
				sysAssessment.setSalaryID(rs.getInt("salaryID"));
				sysAssessment.setUserID(rs.getInt("userID"));
				sysAssessment.setRealName(rs.getString("realName"));
				sysAssessment.setBasicSalary(rs.getInt("basicSalary"));
				sysAssessment.setBonus(rs.getInt("bonus"));
				sysAssessment.setDeduct(rs.getInt("deduct"));
				sysAssessment.setGrade(rs.getInt("grade"));
				sysAssessment.setFinalSalary(rs.getInt("finalSalary"));

				dataList.add(sysAssessment);
			}
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-listAll error",e);
		}finally {
			dbUtils.releaseAll(conn, pstm, rs);
		}

		return dataList;
	}
	
	//	find by name
	public int findByUserNamePwd(String userName, String pwd) {
		String sql = "select * from sys_user t where t.userName=? and t.password=?";
		
		Connection conn=dbUtils.getConn();
		PreparedStatement pstm=null;
		
		ResultSet rs=null;
		
		try {
			//			query
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, userName);
			pstm.setString(2, pwd);
			
			rs = pstm.executeQuery();
			if(rs.next()) {
				return 0;
			}
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-findByUserName",e);
		}finally {
			//			release db
			dbUtils.releaseAll(conn, pstm, rs);
		}
		
		return -1;
	}
	
	//	delete user by id
	public int delUserById(List<Integer> id) {
		String sql = "delete from sys_user t where t.userID=?";

		Connection conn=dbUtils.getConn();
		PreparedStatement pstm=null;

		ResultSet rs=null;
		int rs2 = 0;

		try {
			//			query
			pstm = conn.prepareStatement(sql);
			for(int userId:id) {
				pstm.setInt(1, userId);
				pstm.addBatch();
			}

			int ret[] = pstm.executeBatch();

			return 0;
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-deleteById",e);
		}finally {
			//			release db
			dbUtils.releaseAll(conn, pstm, rs);
		}
	}

//	更新考勤
	public int updateAssessment(List<Integer> assessment) {
		String assessmentSql = "update user_assessment set grade=? where ID=?";

		Connection conn=dbUtils.getConn();
		PreparedStatement pstm=null;

		ResultSet rs=null;
		int rs2 = 0;

		try {
			//			query
			pstm = conn.prepareStatement(assessmentSql);

//			先粗定义一个薪资ID
			int assessID=0;
			for(int grade:assessment) {
				pstm.setInt(1, grade);
				pstm.setInt(2, assessID);
				pstm.addBatch();
				assessID += 1;
			}

			int ret[] = pstm.executeBatch();

			return 0;
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-deleteById",e);
		}finally {
			//			release db
			dbUtils.releaseAll(conn, pstm, rs);
		}
	}
	
	//	find by name
	public List<SysUser> findByUserName(String userName) {
		List<SysUser> dataList = new ArrayList<SysUser>();
		String sql = "select * from sys_user t where t.userName=?";
		
		Connection conn=dbUtils.getConn();
		PreparedStatement pstm=null;
		
		ResultSet rs=null;
		
		try {
			//			query
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, userName);
			
			rs = pstm.executeQuery();
			while(rs.next()) {
				SysUser sysUser = new SysUser();
				sysUser.setUserID(rs.getInt("userID"));
				sysUser.setUserName(rs.getString("userName"));
				sysUser.setPassword(rs.getString("password"));
				sysUser.setSex(rs.getInt("sex"));
				sysUser.setAge(rs.getInt("age"));
				sysUser.setTelephone(rs.getString("telephone"));
				sysUser.setRole(rs.getInt("Role"));
				
				dataList.add(sysUser);
			}
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-findByUserName",e);
		}finally {
			//			release db
			dbUtils.releaseAll(conn, pstm, rs);
		}
		
		return dataList;
	}

	/*获取游轮列表*/
	public List<cruiseEntity> getCruiseList(){
		List<cruiseEntity> dataList = new ArrayList<cruiseEntity>();
		String sql = "select * from cruise";

		Connection conn=dbUtils.getConn();
		PreparedStatement pstm=null;

		ResultSet rs=null;

		try {
			//			query
			pstm = conn.prepareStatement(sql);

			rs = pstm.executeQuery();
			while(rs.next()) {
				cruiseEntity cruise = new cruiseEntity();
                cruise.setCruiseID(rs.getInt("cruiseID"));
                cruise.setCruiseName(rs.getString("cruiseName"));
                cruise.setIsNewer(rs.getInt("isNewer"));

				dataList.add(cruise);
			}
		}catch(Exception e) {
			throw new RuntimeException("SysUserDao-findByUserName",e);
		}finally {
			//			release db
			dbUtils.releaseAll(conn, pstm, rs);
		}

		return dataList;
	}

	/*获取港口列表*/
	public List<portEntity> getPortList(){
		List<portEntity> portList = new ArrayList<portEntity>();

		String sql = "select * from port";

		Connection conn = dbUtils.getConn();
		PreparedStatement pstm = null;

		ResultSet rs = null;

		try{
			pstm = conn.prepareStatement(sql);

			rs = pstm.executeQuery();

			while(rs.next()){
				portEntity port = new portEntity();
				port.setPortID(rs.getInt("portID"));
				port.setPortName(rs.getString("portName"));

				portList.add(port);
			}

		}catch(Exception e){
			throw new RuntimeException("getPortList throw exception");
		}finally {
			dbUtils.releaseAll(conn,pstm,rs);
		}

		return portList;
	}

    /*获取巡游列表*/
    public List<strollEntity> getStrollList(){
        List<strollEntity> strollList = new ArrayList<strollEntity>();

        String sql = "select * from stroll";

        Connection conn = dbUtils.getConn();
        PreparedStatement pstm = null;

        ResultSet rs = null;
        try{
            pstm = conn.prepareStatement(sql);
            rs = pstm.executeQuery();

            while(rs.next()){
                strollEntity stroll = new strollEntity();
                stroll.setStrollID(rs.getInt("strollID"));
                stroll.setStrollLength(rs.getInt("strollLength"));

                strollList.add(stroll);
            }
        }catch(Exception e){
            throw new RuntimeException("throw getStrollList Exception");
        }finally {
            dbUtils.releaseAll(conn,pstm,rs);
        }

        return strollList;
    }

	/*获取乘客表*/
	public List<passengerEntity> getPassengerList(){
		List<passengerEntity> passengerList = new ArrayList<passengerEntity>();
		String sql = "select * from passengerPay";

		Connection conn=dbUtils.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		try{
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();

			while(rs.next()){
				passengerEntity passenger = new passengerEntity();
				passenger.setPassengerID(rs.getInt("passengerID"));
				passenger.setPassengerName(rs.getString("passengerName"));
				passenger.setRideID(rs.getInt("rideID"));
				passenger.setUserID(rs.getInt("userID"));
				passenger.setCabinID(rs.getInt("cabinID"));
				passenger.setPayment(rs.getInt("payment"));

				passengerList.add(passenger);
			}
		}catch(Exception e){
			throw new RuntimeException("get passengerList exception");
		}finally {
			dbUtils.releaseAll(conn,pstm,rs);
		}

		return passengerList;
	}

    /*获取公司收支表*/
    public List<corporationIOEntity> getCorporationList(){
        List<corporationIOEntity> corporation = new ArrayList<>();
        String sql = "select * from corporation_io";

        Connection conn = dbUtils.getConn();
        PreparedStatement pstm = null;

        ResultSet rs = null;
        try{
            pstm = conn.prepareStatement(sql);
            rs = pstm.executeQuery();
            while(rs.next()){
                corporationIOEntity corporationIO = new corporationIOEntity();
                corporationIO.setIoID(rs.getInt("ioID"));
                corporationIO.setIncome(rs.getInt("income"));
                corporationIO.setRefund(rs.getInt("refund"));

                corporation.add(corporationIO);
            }
        }catch(Exception e){
            throw new RuntimeException("getCorporationList Eexception");
        }finally{
            dbUtils.releaseAll(conn,pstm,rs);
        }

        return corporation;
    }
}
