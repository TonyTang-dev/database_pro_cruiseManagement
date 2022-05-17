package com.dbLab.dao;

public class cruiseEntity {
    private int cruiseID;
    private String cruiseName;
    private String isNewer;

    public void setCruiseID(int cruiseID) {
        this.cruiseID = cruiseID;
    }

    public void setCruiseName(String cruiseName) {
        this.cruiseName = cruiseName;
    }

    public void setIsNewer(int isNewer) {
        this.isNewer = isNewer==1?"是":"否";
    }

    public int getCruiseID() {
        return cruiseID;
    }

    public String getCruiseName() {
        return cruiseName;
    }

    public String getIsNewer() {
        return isNewer;
    }
}
