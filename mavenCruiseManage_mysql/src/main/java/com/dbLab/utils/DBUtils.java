package com.dbLab.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;

public class DBUtils {
	private static DBUtils dbUtils=new DBUtils();
	
	private static String dbUrl;
	
	public static DBUtils getInstance() {
		return dbUtils;
	} // static utils
	
	@SuppressWarnings("unused")
	// initial utils
	private void init() {
		Properties p=new Properties();
		
		try {
			p.load(this.getClass().getResourceAsStream("/dbConn.props"));

			//			dbdriver
			String dbDriver=p.getProperty("db.driver");

			//for driver
			Class.forName(dbDriver);

			//url
			DBUtils.dbUrl=p.getProperty("db.url");
		}catch(Exception e) {
			throw new RuntimeException("DBUtils-init error", e);
		}
	}
	
	public Connection getConn() {
		try {
			//			for driver
			Class.forName("com.mysql.cj.jdbc.Driver");
			return DriverManager.getConnection(dbUrl);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	/* release all */	
	public void releaseAll(Connection conn, PreparedStatement pstm, ResultSet rs) {
		if(rs!=null) {
			try {
				rs.close();
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		if(pstm != null) {
			try {
				pstm.close();
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		if(conn != null) {
			try {
				conn.close();
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
}
