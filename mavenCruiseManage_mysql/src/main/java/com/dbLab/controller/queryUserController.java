package com.dbLab.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbLab.dao.SysUser;
import com.dbLab.service.ISysUserService;
import com.dbLab.utils.stringUtil;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.alibaba.fastjson.JSONArray;

public class queryUserController implements Controller {
	private ISysUserService sysUserService;
	
	public void setSysUserService(ISysUserService sysUserService) {
		this.sysUserService = sysUserService;
	}
	
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
		// TODO Auto-generated method stub
		String userName = arg0.getParameter("userName");
		
		if(stringUtil.isEmpty(userName)) {
			return null;
		}
		
		try {
			List<SysUser> ret = sysUserService.queryUser(userName);
			
			JSONArray jsonArray = new JSONArray();
			
			jsonArray.addAll(ret);
			byte[] retArr = jsonArray.toJSONString().getBytes();
			arg1.getOutputStream().write(retArr);
			
			return null;
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
