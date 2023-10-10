package com.bin_app.components;

import com.bin_app.modules.CollectionDates;
import com.bin_app.modules.Street;
import com.bin_app.repositories.CollectionDatesRepository;
import com.bin_app.repositories.StreetRepository;
import com.bin_app.scraper.Details;
import com.bin_app.scraper.Sanitize;
import com.bin_app.types.RecyclingAndWaste;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Objects;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {


    @Autowired
    StreetRepository streetRepository;

    @Autowired
    CollectionDatesRepository collectionDatesRepository;




    public DataLoader() {
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {

//        Sanitize getData = new Sanitize();
//        HashMap<String, Details> getData1 = getData.getAllData();
//        System.out.println(getData1.size());
//
//        getData1.forEach((key, value) -> {
//
//
//            Street street = new Street(key, value.getPostcode(), value.getRecycling(), value.getUrl());
//            streetRepository.save(street);
//        }) ;

//          tuesday-2
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 3, "waste", "recycling glass");

        //  thursday-1a
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 5, "recycling", "waste glass");

//        friday-2
        //  HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 6, "waste", "recycling glass");

        //friday-1
//          HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 6, "recycling glass", "waste");

        //  wednesday-2
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 4, "waste", "recycling glass");

        //thursday-1
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 5, "recycling glass", "waste");

        //tuesday-1
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 3, "recycling glass", "waste");

        //wednesday-1a
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 4, "recycling", "waste glass");

        //friday-1a
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 6, "recycling", "waste glass");

        //thursday-2
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 5, "waste", "recycling glass");

        //wednesday-1
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 4, "recycling glass", "waste");

        //tuesday-1a
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 3, "recycling", "waste glass");

        //monday
//        HashMap<Date, String> getDates = CalculateDates.calculateDates(2023, 0, 2, "recycling box", "glass");
//
//
//
//
//
//
//
//
//
//        getDates.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("monday",value, key);
//            collectionDatesRepository.save(date);
//
//        });


    }
}
