package com.dbLab.service;

import java.util.List;

import com.dbLab.dao.*;

public class SysUserServiceImpl implements ISysUserService {
	
	public SysUserDao sysUserDao;
	
	public void setSysUserDao(SysUserDao sysUserDao) {
		this.sysUserDao = sysUserDao;
	}
	

	@Override
	public int addSysUser(SysUser sysUser) {
		// TODO Auto-generated method stub
		return sysUserDao.addSysUser(sysUser);
	}
	
	@Override
	public int updateSysUser(SysUser sysUser) {
		// TODO update userinfor
		return sysUserDao.updateSysUser(sysUser);
	}

	@Override
	public List<SysUser> listAll() {
		// TODO Auto-generated method stub
		return sysUserDao.listAll();
	}

	@Override
	public List<SysAssessment> listAllAssessment() {
		// TODO Auto-generated method stub
		return sysUserDao.listAllAssessment();
	}

	@Override
	public int login(String userName, String pwd) {
		// TODO Auto-generated method stub
		return sysUserDao.findByUserNamePwd(userName, pwd);
	}
	
	@Override
	public int deleteUser(List<Integer> id) {
		//delete a single user by id
		return sysUserDao.delUserById(id);
	}

	@Override
	public int updateAssessment(List<Integer> assessment) {
		return sysUserDao.updateAssessment(assessment);
	}

	@Override
	public List<SysUser> queryUser(String userName) {
		//query user infor
		return sysUserDao.findByUserName(userName);
	}

	@Override
	public List<cruiseEntity> getCruiseList(){
		return sysUserDao.getCruiseList();
	}

	@Override
	public List<portEntity> getPortList(){
		return sysUserDao.getPortList();
	}

	@Override
	public List<strollEntity> getStrollList(){
		return sysUserDao.getStrollList();
	}
}
