package com.bin_app.components;

import com.bin_app.modules.CollectionDates;
import com.bin_app.modules.Street;
import com.bin_app.repositories.CollectionDatesRepository;
import com.bin_app.repositories.StreetRepository;
import com.bin_app.scraper.Details;
import com.bin_app.scraper.GardenDetails;
import com.bin_app.scraper.GardenWasteSanitizer;
import com.bin_app.scraper.Sanitize;
import com.bin_app.types.RecyclingAndWaste;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.*;

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

        streetRepository.deleteAll();
        collectionDatesRepository.deleteAll();

//          tuesday-2
        HashMap<Date, String> getDates0 = CalculateDates.calculateRecyclingDates(2023, 0, 3, "waste", "recycling glass");
        getDates0.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("tuesday-2", null,value, key);
            collectionDatesRepository.save(date);
        });

//        thursday-1a
        HashMap<Date, String> getDates1 = CalculateDates.calculateRecyclingDates(2023, 0, 5, "recycling", "waste glass");
        getDates1.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("thursday-1a", null,value, key);
            collectionDatesRepository.save(date);
        });

//        friday-2
        HashMap<Date, String> getDates2 = CalculateDates.calculateRecyclingDates(2023, 0, 6, "waste", "recycling glass");
        getDates2.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("friday-2", null, value, key);
            collectionDatesRepository.save(date);
        });

//        friday-1
        HashMap<Date, String> getDates3 = CalculateDates.calculateRecyclingDates(2023, 0, 6, "recycling glass", "waste");
        getDates3.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("friday-1", null,value, key);
            collectionDatesRepository.save(date);
        });

//          wednesday-2
        HashMap<Date, String> getDates4 = CalculateDates.calculateRecyclingDates(2023, 0, 4, "waste", "recycling glass");
        getDates4.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("wednesday-2", null,value, key);
            collectionDatesRepository.save(date);
        });

//        thursday-1
        HashMap<Date, String> getDates5 = CalculateDates.calculateRecyclingDates(2023, 0, 5, "recycling glass", "waste");
        getDates5.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("thursday-1", null, value, key);
            collectionDatesRepository.save(date);
        });

//        tuesday-1
        HashMap<Date, String> getDates6 = CalculateDates.calculateRecyclingDates(2023, 0, 3, "recycling glass", "waste");
        getDates6.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("tuesday-1", null, value, key);
            collectionDatesRepository.save(date);
        });

//        wednesday-1a
        HashMap<Date, String> getDates7 = CalculateDates.calculateRecyclingDates(2023, 0, 4, "recycling", "waste glass");
        getDates7.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("wednesday-1a", null, value, key);
            collectionDatesRepository.save(date);
        });

//        friday-1a
        HashMap<Date, String> getDates8 = CalculateDates.calculateRecyclingDates(2023, 0, 6, "recycling", "waste glass");
        getDates8.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("friday-1a", null, value, key);
            collectionDatesRepository.save(date);
        });

//        thursday-2
        HashMap<Date, String> getDates9 = CalculateDates.calculateRecyclingDates(2023, 0, 5, "waste", "recycling glass");
        getDates9.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("thursday-2", null,value, key);
            collectionDatesRepository.save(date);
        });

//        wednesday-1
        HashMap<Date, String> getDates10 = CalculateDates.calculateRecyclingDates(2023, 0, 4, "recycling glass", "waste");
        getDates10.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("wednesday-1", null,value, key);
            collectionDatesRepository.save(date);
        });

//        tuesday-1a
        HashMap<Date, String> getDates11 = CalculateDates.calculateRecyclingDates(2023, 0, 3, "recycling", "waste glass");
        getDates11.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("tuesday-1a", null,value, key);
            collectionDatesRepository.save(date);
        });

//        monday
        HashMap<Date, String> getDates12 = CalculateDates.calculateRecyclingDates(2023, 0, 2, "recycling box", "glass");
        getDates12.forEach((key, value) -> {
            CollectionDates date = new CollectionDates("monday", null, value, key);
            collectionDatesRepository.save(date);
        });

        HashMap<Date, String> getGardenDatesThursday2 = CalculateDates.calculateGardenDates(2023, 0, 19);
        getGardenDatesThursday2.forEach((key, value) -> {
            CollectionDates date = new CollectionDates(null,"thursday-2", value, key);
            collectionDatesRepository.save(date);
        });

        HashMap<Date, String> getGardenDatesThursday1 = CalculateDates.calculateGardenDates(2023, 0, 26);
        getGardenDatesThursday1.forEach((key, value) -> {
            CollectionDates date = new CollectionDates(null,"thursday-1", value, key);
            collectionDatesRepository.save(date);
        });

        HashMap<Date, String> getGardenDatesTuesday2 = CalculateDates.calculateGardenDates(2023, 0, 17);
        getGardenDatesTuesday2.forEach((key, value) -> {
            CollectionDates date = new CollectionDates(null,"tuesday-2",  value, key);
            collectionDatesRepository.save(date);
        });

        HashMap<Date, String> getGardenDatesTuesday1 = CalculateDates.calculateGardenDates(2023, 0, 24);
        getGardenDatesTuesday1.forEach((key, value) -> {
            CollectionDates date = new CollectionDates(null,"tuesday-1", value, key);
            collectionDatesRepository.save(date);
        });

        HashMap<Date, String> getGardenDatesWednesday1 = CalculateDates.calculateGardenDates(2023, 0, 25);
        getGardenDatesWednesday1.forEach((key, value) -> {
            CollectionDates date = new CollectionDates(null,"wednesday-1", value, key);
            collectionDatesRepository.save(date);
        });

        HashMap<Date, String> getGardenDatesWednesday2 = CalculateDates.calculateGardenDates(2023, 0, 18);
        getGardenDatesWednesday2.forEach((key, value) -> {
            CollectionDates date = new CollectionDates(null,"wednesday-2",value, key);
            collectionDatesRepository.save(date);
        });

        HashMap<Date, String> getGardenDatesFriday1 = CalculateDates.calculateGardenDates(2023, 0, 27);
        getGardenDatesFriday1.forEach((key, value) -> {
            CollectionDates date = new CollectionDates(null,"friday-1", value, key);
            collectionDatesRepository.save(date);
        });

        HashMap<Date, String> getGardenDatesFriday2 = CalculateDates.calculateGardenDates(2023, 0, 20);
        getGardenDatesFriday2.forEach((key, value) -> {
            CollectionDates date = new CollectionDates(null,"friday-2", value, key);
            collectionDatesRepository.save(date);
        });





        Sanitize getStreetData = new Sanitize();
        HashMap<String, Details> getAllStreetData = getStreetData.getAllData();
        List<CollectionDates> allDatesFromDatabase = collectionDatesRepository.findAll();

        GardenWasteSanitizer getGardenWasteDetails = new GardenWasteSanitizer();
        HashMap<String, GardenDetails> getAllGardenWasteDetails = getGardenWasteDetails.getAllGardenData();


        getAllStreetData.forEach((key, value) -> {
            Street street = new Street(key, value.getPostcode(), value.getRecycling(), value.getUrl());

            getAllGardenWasteDetails.forEach((k, v) -> {
               if(k.contains(key)) {
                   street.setGardenWasteId(v.getGardenWasteId());
                   street.setGardenWasteUrl(v.getGardenWasteUrl());
               }
           });


            for (CollectionDates date: allDatesFromDatabase) {
                if (value.getRecycling().equals(date.getRecyclingCalendar())) {
                    street.addCollectionDate(date);
                }
                if (value.getRecycling().equals(date.getGardenCalendar())){
                    street.addCollectionDate(date);
                }
            }
            streetRepository.save(street);



        }) ;

    }
}
