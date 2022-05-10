package com.dbLab.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbLab.service.ISysUserService;
import com.dbLab.utils.stringUtil;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.dbLab.dao.SysUser;

public class UpdateUserController implements Controller {
	private ISysUserService sysUserService;
	
	public void setSysUserService(ISysUserService sysUserService) {
		this.sysUserService=sysUserService;
	}
	@Override
	public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
		// TODO update user information
		
		arg1.setHeader("Content-type", "text/html;charset=UTF-8");
		String userID = arg0.getParameter("userID");
		String userName = arg0.getParameter("userName");
		String password = arg0.getParameter("password");
		String realName = arg0.getParameter("realName");
		String departmentID = arg0.getParameter("departmentID");
		String jobPosition = arg0.getParameter("jobPosition");
		String sex = arg0.getParameter("sex");
		String degree = arg0.getParameter("degree");
		String bornDate = arg0.getParameter("bornDate");
		String userSN = arg0.getParameter("userSN");
		String telephone = arg0.getParameter("telephone");
		String mobile = arg0.getParameter("mobile");
		String Email = arg0.getParameter("Email");
		String InDate = arg0.getParameter("InDate");
		String Intro = arg0.getParameter("Intro");
		String Role = arg0.getParameter("Role");
		
		
		if(stringUtil.isEmpty(userName)) {
			arg1.getOutputStream().write("-1".getBytes());
			
			return null;
		}
		
		//		the pwd can not be none
		if(stringUtil.isEmpty(password)) {
			arg1.getOutputStream().write("-1".getBytes());
			
			return null;
		}

		//		create object
		SysUser sysUser = new SysUser();
		sysUser.setUserID(Integer.parseInt(userID));
		sysUser.setUserName(userName);
		sysUser.setPassword(password);
		sysUser.setSex(Integer.parseInt(sex));
//		sysUser.setAge(Integer.parseInt(age));
		sysUser.setTelephone(telephone);
		sysUser.setRole(Integer.parseInt(Role));
		
		
		int ret = sysUserService.updateSysUser(sysUser);
		
		arg1.getOutputStream().write(String.valueOf(ret).getBytes());
		
		return null;
	}

}
