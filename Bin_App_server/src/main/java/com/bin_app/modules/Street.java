package com.bin_app.modules;

import com.bin_app.types.FoodWaste;
import com.bin_app.types.GardenWaste;
import com.bin_app.types.RecyclingAndWaste;

import javax.persistence.*;

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

    public Street(String name, String postcode, String recyclingAndWaste, String url) {
        this.name = name;
        this.postcode = postcode;
        this.recyclingAndWaste = recyclingAndWaste;
        this.url = url;
    }

    public Street() {

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
