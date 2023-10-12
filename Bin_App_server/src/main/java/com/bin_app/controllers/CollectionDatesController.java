package com.bin_app.controllers;

import com.bin_app.modules.CollectionDates;
import com.bin_app.repositories.CollectionDatesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class CollectionDatesController {

    @Autowired
    CollectionDatesRepository collectionDatesRepository;

    @GetMapping(value = "/collectionDates")
    public ResponseEntity<List<CollectionDates>> getAllCollectionDates(
            @RequestParam(name = "street",required = false) String streetName,
            @RequestParam(name = "date", required = false) String date
    ){
        if(streetName!= null && date!=null){
            int year = Integer.parseInt(date.substring(0,4));
            int month = Integer.parseInt(date.substring(4,6));
            int day = Integer.parseInt(date.substring(6,8));
            Date newDate = new Date(year-1900,month-1,day);
            return new ResponseEntity<>(collectionDatesRepository.findCollectionDatesByStreetsNameAndDateGreaterThanOrderByDateAsc(streetName,newDate),HttpStatus.OK);
        }
        return new ResponseEntity<>(collectionDatesRepository.findAll(), HttpStatus.OK);
    }

}
