package com.dbLab.dao;

public class SysAssessment {
    private int salaryID;

    public int getSalaryID() {
        return salaryID;
    }

    public void setSalaryID(int salaryID) {
        this.salaryID = salaryID;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setBasicSalary(int basicSalary) {
        this.basicSalary = basicSalary;
    }

    public void setBonus(int bonus) {
        this.bonus = bonus;
    }

    public void setDeduct(int deduct) {
        this.deduct = deduct;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public void setFinalSalary(int finalSalary) {
        this.finalSalary = finalSalary;
    }

    public String getRealName() {
        return realName;
    }

    public int getUserID() {
        return userID;
    }

    public int getBasicSalary() {
        return basicSalary;
    }

    public int getBonus() {
        return bonus;
    }

    public int getDeduct() {
        return deduct;
    }

    public int getGrade() {
        return grade;
    }

    public int getFinalSalary() {
        return finalSalary;
    }

    private String realName;
    private int userID;
    private int basicSalary;
    private int bonus;
    private int deduct;
    private int grade;
    private int finalSalary;

}
