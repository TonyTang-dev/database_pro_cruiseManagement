package com.dbLab.dao;

public class passengerEntity {
    private int passengerID;
    private String passengerName;
    private int rideID;
    private int cabinID;
    private int userID;
    private int payment;

    public void setPassengerID(int passengerID) {
        this.passengerID = passengerID;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public void setRideID(int rideID) {
        this.rideID = rideID;
    }

    public void setCabinID(int cabinID) {
        this.cabinID = cabinID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setPayment(int payment) {
        this.payment = payment;
    }

    public int getPassengerID() {
        return passengerID;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public int getRideID() {
        return rideID;
    }

    public int getCabinID() {
        return cabinID;
    }

    public int getUserID() {
        return userID;
    }

    public int getPayment() {
        return payment;
    }
}
