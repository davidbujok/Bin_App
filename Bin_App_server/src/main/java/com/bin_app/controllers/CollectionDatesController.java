package com.bin_app.controllers;

import com.bin_app.modules.CollectionDates;
import com.bin_app.repositories.CollectionDatesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CollectionDatesController {

    @Autowired
    CollectionDatesRepository collectionDatesRepository;

    @GetMapping(value = "/collectionDates")
    public ResponseEntity<List<CollectionDates>> getAllCollectionDates(){
        return new ResponseEntity<>(collectionDatesRepository.findAll(), HttpStatus.OK);
    }
}
