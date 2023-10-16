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
    private String recyclingAndWasteId;
    private String gardenWasteId;
    private String recyclingAndWasteUrl;
    private String gardenWasteUrl;


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

    public Street(String name, String postcode, String recyclingAndWasteId, String recyclingAndWasteUrl) {
        this.name = name;
        this.postcode = postcode;
        this.recyclingAndWasteId = recyclingAndWasteId;
        this.gardenWasteId = "";
        this.recyclingAndWasteUrl = recyclingAndWasteUrl;
        this.gardenWasteUrl = "";
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

    public String getRecyclingAndWasteUrl() {
        return recyclingAndWasteUrl;
    }

    public String getPostcode() {
        return postcode;
    }

    public String getRecyclingAndWasteId() {
        return recyclingAndWasteId;
    }

    public void setRecyclingAndWasteId(String recyclingAndWaste) {
        this.recyclingAndWasteId = recyclingAndWaste;
    }

    public void setGardenWasteId(String gardenWasteId) {
        this.gardenWasteId = gardenWasteId;
    }

    public void setGardenWasteUrl(String gardenWasteUrl) {
        this.gardenWasteUrl = gardenWasteUrl;
    }

    public String getGardenWasteId() {
        return gardenWasteId;
    }

    public String getGardenWasteUrl() {
        return gardenWasteUrl;
    }

    public List<CollectionDates> getCollectionDates() {
        return collectionDates;
    }

    public Long getId() {
        return id;
    }


}
