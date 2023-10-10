package com.bin_app.modules;

import com.bin_app.types.FoodWaste;
import com.bin_app.types.GardenWaste;
import com.bin_app.types.RecyclingAndWaste;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "streets")
public class Street {

    private String name;
    private String postcode;
    private String recyclingAndWaste;
    private String url;

//    private FoodWaste foodWaste;
//
//    private GardenWaste gardenWaste;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "streets")
    @ManyToMany
    @JsonIgnoreProperties({"streets"})
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "streets_collection_dates",
            joinColumns = {
                    @JoinColumn(
                            name = "street_id",
                            nullable = false,
                            updatable = false
                    )
            },
            inverseJoinColumns = {
                    @JoinColumn(
                            name = "collection_date_id",
                            nullable = false,
                            updatable = false
                    )
            }
    )

    private List<CollectionDates> collectionDates;

    public Street(String name, String postcode, String recyclingAndWaste, String url) {
        this.name = name;
        this.postcode = postcode;
        this.recyclingAndWaste = recyclingAndWaste;
        this.url = url;
        this.collectionDates = new ArrayList<>();
    }

    public Street() {

    }

    public void setCollectionDates(List<CollectionDates> collectionDates) {
        this.collectionDates = collectionDates;
    }

    public void addCollectionDate(CollectionDates collectionDate) {
        collectionDates.add(collectionDate);
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }

    public String getPostcode() {
        return postcode;
    }

    public String getRecyclingAndWaste() {
        return recyclingAndWaste;
    }

    public void setRecyclingAndWaste(String recyclingAndWaste) {
        this.recyclingAndWaste = recyclingAndWaste;
    }
    //    public FoodWaste getFoodWaste() {
//        return foodWaste;
//    }
//
//    public GardenWaste getGardenWaste() {
//        return gardenWaste;
//    }

    public Long getId() {
        return id;
    }


}
