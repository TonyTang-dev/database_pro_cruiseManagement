package com.dbLab.controller;

import com.alibaba.fastjson.JSONArray;
import org.springframework.web.servlet.mvc.Controller;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbLab.service.ISysUserService;

public class getCorporationIOController implements Controller{
    private ISysUserService sysUserService;

    public void setSysUserService(ISysUserService sysUserService){
        this.sysUserService=sysUserService;
    }

    @Override
    public ModelAndView handleRequest(HttpServletRequest arg0,HttpServletResponse arg1){
        arg1.setHeader("Content-type","text/json;charset=UTF-8");

        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(sysUserService.getCorporationList());
        byte retarr[] = jsonArray.toJSONString().getBytes();

        try {
            arg1.getOutputStream().write(retarr);
        }catch(Exception e){
            throw new RuntimeException("return corporationList Exception");
        }

        return null;
    }
}
