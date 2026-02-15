package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "flight")
public class Flight {

    @Id
    private String _id;

    private String flightName;
    private String from;
    private String to;
    private String departureTime;
    private String arrivalTime;
    private double price;
    private int availableSeats;

    // ✅ Dynamic Pricing Fields (INSIDE CLASS)
    private List<Double> priceHistory = new ArrayList<>();
    private Double frozenPrice;
    private LocalDateTime freezeExpiry;

    // Getters and Setters

    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }

    public String getFlightName() {
        return flightName;
    }

    public void setFlightName(String flightName) {
        this.flightName = flightName;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    // ✅ Price History
    public List<Double> getPriceHistory() {
        return priceHistory;
    }

    public void setPriceHistory(List<Double> priceHistory) {
        this.priceHistory = priceHistory;
    }

    // ✅ Freeze Price
    public Double getFrozenPrice() {
        return frozenPrice;
    }

    public void setFrozenPrice(Double frozenPrice) {
        this.frozenPrice = frozenPrice;
    }

    public LocalDateTime getFreezeExpiry() {
        return freezeExpiry;
    }

    public void setFreezeExpiry(LocalDateTime freezeExpiry) {
        this.freezeExpiry = freezeExpiry;
    }
}
