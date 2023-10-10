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

import java.util.ArrayList;
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
//        HashMap<Date, String> getDates0 = CalculateDates.calculateDates(2023, 0, 3, "waste", "recycling glass");
//        getDates0.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("tuesday-2",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        thursday-1a
//        HashMap<Date, String> getDates1 = CalculateDates.calculateDates(2023, 0, 5, "recycling", "waste glass");
//        getDates1.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("thursday-1a",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        friday-2
//        HashMap<Date, String> getDates2 = CalculateDates.calculateDates(2023, 0, 6, "waste", "recycling glass");
//        getDates2.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("friday-2",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        friday-1
//        HashMap<Date, String> getDates3 = CalculateDates.calculateDates(2023, 0, 6, "recycling glass", "waste");
//        getDates3.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("friday-1",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////          wednesday-2
//        HashMap<Date, String> getDates4 = CalculateDates.calculateDates(2023, 0, 4, "waste", "recycling glass");
//        getDates4.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("wednesday-2",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        thursday-1
//        HashMap<Date, String> getDates5 = CalculateDates.calculateDates(2023, 0, 5, "recycling glass", "waste");
//        getDates5.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("thursday-1",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        tuesday-1
//        HashMap<Date, String> getDates6 = CalculateDates.calculateDates(2023, 0, 3, "recycling glass", "waste");
//        getDates6.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("tuesday-1",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        wednesday-1a
//        HashMap<Date, String> getDates7 = CalculateDates.calculateDates(2023, 0, 4, "recycling", "waste glass");
//        getDates7.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("wednesday-1a",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        friday-1a
//        HashMap<Date, String> getDates8 = CalculateDates.calculateDates(2023, 0, 6, "recycling", "waste glass");
//        getDates8.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("friday-1a",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        thursday-2
//        HashMap<Date, String> getDates9 = CalculateDates.calculateDates(2023, 0, 5, "waste", "recycling glass");
//        getDates9.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("thursday-2",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        wednesday-1
//        HashMap<Date, String> getDates10 = CalculateDates.calculateDates(2023, 0, 4, "recycling glass", "waste");
//        getDates10.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("wednesday-1",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        tuesday-1a
//        HashMap<Date, String> getDates11 = CalculateDates.calculateDates(2023, 0, 3, "recycling", "waste glass");
//        getDates11.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("tuesday-1a",value, key);
//            collectionDatesRepository.save(date);
//        });
//
////        monday
//        HashMap<Date, String> getDates12 = CalculateDates.calculateDates(2023, 0, 2, "recycling box", "glass");
//        getDates12.forEach((key, value) -> {
//            CollectionDates date = new CollectionDates("monday",value, key);
//            collectionDatesRepository.save(date);
//        });
    }
}
