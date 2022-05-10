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
			pstm.setInt(4,sysUser.getSex());
			pstm.setInt(5,sysUser.getAge());
			pstm.setString(6,sysUser.getTelephone());
			pstm.setInt(7,sysUser.getRole());
			
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
		String sql="update sys_user set userID=?,userName=?,password=?,sex=?,age=?,telephone=?,role=?";
		
		//		get href
		Connection conn=dbUtils.getConn();
		PreparedStatement pstm = null;
		
		try {
			//			add filed
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1,sysUser.getUserID());
			pstm.setString(2,sysUser.getUserName());
			pstm.setString(3,sysUser.getPassword());
			pstm.setInt(4,sysUser.getSex());
			pstm.setInt(5,sysUser.getAge());
			pstm.setString(6,sysUser.getTelephone());
			pstm.setInt(7,sysUser.getRole());
			
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
}
