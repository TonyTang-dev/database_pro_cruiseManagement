package com.dbLab.dao;

public class rideEntity {
    private int rideID;
    private int strollID;
    private String rideDate;
    private int cruiseID;
    private int cruiseSeats;
    private String price;
    private int departureID;
    private int destinationID;
    private String dockablePort;

    public int getRideID() {
        return rideID;
    }

    public void setRideID(int rideID) {
        this.rideID = rideID;
    }

    public int getStrollID() {
        return strollID;
    }

    public void setStrollID(int strollID) {
        this.strollID = strollID;
    }

    public String getRideDate() {
        return rideDate;
    }

    public void setRideDate(String rideDate) {
        this.rideDate = rideDate;
    }

    public int getCruiseID() {
        return cruiseID;
    }

    public void setCruiseID(int cruiseID) {
        this.cruiseID = cruiseID;
    }

    public int getCruiseSeats() {
        return cruiseSeats;
    }

    public void setCruiseSeats(int cruiseSeats) {
        this.cruiseSeats = cruiseSeats;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public int getDepartureID() {
        return departureID;
    }

    public void setDepartureID(int departureID) {
        this.departureID = departureID;
    }

    public int getDestinationID() {
        return destinationID;
    }

    public void setDestinationID(int destinationID) {
        this.destinationID = destinationID;
    }

    public String getDockablePort() {
        return dockablePort;
    }

    public void setDockablePort(String dockablePort) {
        this.dockablePort = dockablePort;
    }
}
