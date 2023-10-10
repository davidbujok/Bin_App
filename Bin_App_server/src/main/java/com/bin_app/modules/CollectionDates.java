package com.bin_app.modules;

import javax.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.Calendar;

@Entity
@Table(name = "collection_dates")
public class CollectionDates {

    private String name;

    private String colour;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public CollectionDates(String name, String colour, Date date) {
        this.name = name;
        this.colour = colour;
        this.date = date;
    }

    public CollectionDates() {
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public String getColour() {
        return colour;
    }

    public Date getDate() {
        return date;
    }



    public Long getId() {
        return id;
    }


}
