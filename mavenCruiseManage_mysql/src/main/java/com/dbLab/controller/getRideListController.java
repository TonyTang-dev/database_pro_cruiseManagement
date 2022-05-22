package com.dbLab.controller;

import com.alibaba.fastjson.JSONArray;
import com.dbLab.service.ISysUserService;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class getRideListController implements Controller {
    private ISysUserService sysUserService;
    public void setSysUserService(ISysUserService sysUserService){
        this.sysUserService=sysUserService;
    }

    @Override
    public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1){
        arg1.setHeader("Content-type","text/json;charset=UTF-8");

        JSONArray jsonArray = new JSONArray();

        jsonArray.addAll(sysUserService.getRideList());

        byte retarr[] = jsonArray.toJSONString().getBytes();

        try {
            arg1.getOutputStream().write(retarr);
        }catch(Exception e){
            e.printStackTrace();
        }

        return null;
    }
}
