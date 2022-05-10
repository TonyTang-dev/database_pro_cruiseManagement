package com.dbLab.utils;

public class stringUtil {
	public static final boolean isEmpty(String str) {
		return (null==str)||str.trim().equals("");
	}
	
//	compare is empty?
	public static final boolean isNotEmpty(String str) {
		return !stringUtil.isEmpty(str);
	}
}
