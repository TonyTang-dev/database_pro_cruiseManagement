package com.dbLab.controller;

import com.alibaba.fastjson.JSONArray;
import com.dbLab.service.ISysUserService;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class getPassengerPayController implements Controller {
    private ISysUserService sysUserService;

    public void setSysUserService(ISysUserService sysUserService) {
        this.sysUserService = sysUserService;
    }

    @Override
    public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) throws IOException {
        arg1.setHeader("Content-type","text/json;charset=UTF-8");

        JSONArray jsonArray = new JSONArray();

        jsonArray.addAll(sysUserService.getPassengerList());

        byte[] retArr = jsonArray.toJSONString().getBytes();//StandardCharsets.UTF_8)
        arg1.getOutputStream().write(retArr);

        return null;
    }
}
