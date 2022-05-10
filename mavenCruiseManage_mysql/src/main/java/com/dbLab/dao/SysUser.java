package com.dbLab.dao;

public class SysUser {
	private int userID;
	private String userName;

	private String password;
	private int sex;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public int getUserID() {
		return userID;
	}

	public String getUserName() {
		return userName;
	}

	public int getSex() {
		return sex;
	}

	public int getAge() {
		return age;
	}

	public String getTelephone() {
		return telephone;
	}

	public int getRole() {
		return role;
	}

	private int age;
	private String telephone;
	private int role;
}
