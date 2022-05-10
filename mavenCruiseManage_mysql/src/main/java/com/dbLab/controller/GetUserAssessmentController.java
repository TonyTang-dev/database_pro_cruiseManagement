package com.dbLab.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbLab.service.ISysUserService;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.alibaba.fastjson.JSONArray;

public class GetUserAssessmentController implements Controller {

    public ISysUserService sysUserService;

    public void setSysUserService(ISysUserService sysUserService) {
        this.sysUserService = sysUserService;
    }

    @Override
    public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
        // TODO Auto-generated method stub

        arg1.setHeader("Content-type", "text/json;charset=UTF-8");
        JSONArray jsonArray = new JSONArray();

        jsonArray.addAll(sysUserService.listAllAssessment());
        byte[] retArr = jsonArray.toJSONString().getBytes();
        arg1.getOutputStream().write(retArr);

        return null;
    }

}
