package com.dbLab.service;

import java.util.List;

import com.dbLab.dao.*;

public interface ISysUserService {
	public int addSysUser(SysUser sysUser);
	
	public int updateSysUser(SysUser sysUser);
	
	public List<SysUser> listAll();

	public List<SysAssessment> listAllAssessment();
	
	public int login(String userName, String pwd);
	
	public int deleteUser(List<Integer> id);
	public int updateAssessment(List<Integer> assessment);
	
	public List<SysUser> queryUser(String userName);

	public List<cruiseEntity> getCruiseList();

	public List<portEntity> getPortList();

	public List<strollEntity> getStrollList();
}
