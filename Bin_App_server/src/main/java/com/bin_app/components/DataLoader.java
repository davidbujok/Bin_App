package com.bin_app.components;

import com.bin_app.modules.Street;
import com.bin_app.repositories.StreetRepository;
import com.bin_app.scraper.Details;
import com.bin_app.scraper.Sanitize;
import com.bin_app.types.RecylcingAndWaste;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Objects;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {


    @Autowired
    StreetRepository streetRepository;


    public DataLoader() {
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {

        Sanitize getData = new Sanitize();
        HashMap<String, Details> getData1 = getData.getAllData();
        System.out.println(getData1.size());

        getData1.forEach((key, value) -> {


            Street street = new Street(key, value.getPostcode(), value.getRecycling(), value.getUrl());
            streetRepository.save(street);
        }) ;


    }
}
