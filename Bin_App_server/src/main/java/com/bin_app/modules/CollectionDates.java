package com.bin_app.modules;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

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

    @ManyToMany
    @JsonIgnoreProperties({"collection_dates"})
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "streets_collection_dates",
            joinColumns = {
                    @JoinColumn(
                            name = "collection_date_id",
                            nullable = false,
                            updatable = false
                    )
            },
            inverseJoinColumns = {
                    @JoinColumn(
                            name = "street_id",
                            nullable = false,
                            updatable = false
                    )
            }
    )
    private List<Street> streets;

    public CollectionDates(String name, String colour, Date date) {
        this.name = name;
        this.colour = colour;
        this.date = date;
        this.streets = new ArrayList<>();
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
