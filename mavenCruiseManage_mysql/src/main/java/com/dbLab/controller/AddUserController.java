package com.dbLab.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbLab.service.ISysUserService;
import com.dbLab.utils.stringUtil;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.dbLab.dao.SysUser;

public class AddUserController implements Controller {
	public ISysUserService sysUserService;
	
	public void setSysUserService(ISysUserService sysUserService) {
		this.sysUserService=sysUserService;
	}
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
		// TODO add user information
		arg1.setHeader("Content-type", "text/html;charset=UTF-8");

		String userID = arg0.getParameter("userID");
		String userName = arg0.getParameter("userName");
		String password = arg0.getParameter("password");
		String sex = arg0.getParameter("sex");
		String age = arg0.getParameter("age");
		String telephone = arg0.getParameter("telephone");
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
		sysUser.setSex(sex.equals("男")?1:0);
		sysUser.setAge(Integer.parseInt(age));
		sysUser.setTelephone(telephone);
		sysUser.setRole(Role.equals("管理员")?1:0);


		int ret = sysUserService.addSysUser(sysUser);

		arg1.getOutputStream().write(String.valueOf(ret).getBytes());

		return null;
	}
}
