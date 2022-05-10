package com.dbLab.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbLab.utils.stringUtil;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.dbLab.service.ISysUserService;

public class LoginController implements Controller {
	public ISysUserService sysUserService;
	
	public void setSysUserService(ISysUserService sysUserService) {
		this.sysUserService=sysUserService;
	}
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
		// TODO Auto-generated method stub
		
		arg1.setHeader("Content-type", "text/html;charset=UTF-8");
		
		String userName = arg0.getParameter("username");
		
		String password = arg0.getParameter("password");


		if(stringUtil.isEmpty(userName)) {
			arg1.getOutputStream().write("-1".getBytes());

			return null;
		}

		if(stringUtil.isEmpty(password)) {
			arg1.getOutputStream().write("-2".getBytes());

			return null;
		}
		
		
		int ret = sysUserService.login(userName, password);
		
		arg1.getOutputStream().write(String.valueOf(ret).getBytes());
		
		return null;
	}

}
