package com.bin_app.controllers;

import com.bin_app.modules.Street;
import com.bin_app.repositories.StreetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
public class StreetController  {
    @Autowired
    StreetRepository streetRepository;

    @GetMapping(value = "/streets")
    public ResponseEntity<List<Street>> getAllStreets(@RequestParam(name="date", required = false) String date){
        if(date == null){

        return new ResponseEntity<>(streetRepository.findAll(), HttpStatus.OK);
    }else{

            int year = Integer.parseInt(date.substring(0,4));
            int month = Integer.parseInt(date.substring(4,6));
            int day = Integer.parseInt(date.substring(6,8));

            Date newDate =new Date(year-1900,month-1,day);
            return new ResponseEntity<>(streetRepository.findByCollectionDatesDateGreaterThan(newDate), HttpStatus.OK);
        }
    }

}
