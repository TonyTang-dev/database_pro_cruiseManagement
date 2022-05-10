package com.dbLab.controller;

import com.dbLab.utils.stringUtil;
import com.dbLab.service.ISysUserService;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

public class updateAssessmentController implements Controller {
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
		
		String[] updateUserAssessment = userId.split(",");
		
		if(updateUserAssessment == null) {
			return null;
		}
		
		List<Integer> userAssessment = new ArrayList<Integer>();
		
		for(String getId:updateUserAssessment) {
			userAssessment.add(Integer.parseInt(getId));
		}
		
		try {
			int ret = sysUserService.updateAssessment(userAssessment);
			arg1.getOutputStream().write(String.valueOf(ret).getBytes());
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
