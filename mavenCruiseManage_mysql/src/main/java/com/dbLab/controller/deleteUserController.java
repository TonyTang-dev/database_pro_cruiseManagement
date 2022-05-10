package com.dbLab.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbLab.service.ISysUserService;
import com.dbLab.utils.stringUtil;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

public class deleteUserController implements Controller {
	private ISysUserService sysUserService;
	
	public void setSysUserService(ISysUserService sysUserService) {
		this.sysUserService = sysUserService;
	}
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
		// TODO Auto-generated method stub
		
		String userId = arg0.getParameter("userId");
		
		if(stringUtil.isEmpty(userId)) {
			return null;
		}
		
		String[] delUserId = userId.split(",");
		
		if(delUserId == null) {
			return null;
		}
		
		List<Integer> userIdList = new ArrayList<Integer>();
		
		for(String getId:delUserId) {
			userIdList.add(Integer.parseInt(getId));
		}
		
		try {
			int ret = sysUserService.deleteUser(userIdList);
			arg1.getOutputStream().write(String.valueOf(ret).getBytes());
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
