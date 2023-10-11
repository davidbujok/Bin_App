package com.bin_app.controllers;

import com.bin_app.modules.Street;
import com.bin_app.repositories.StreetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StreetController  {
    @Autowired
    StreetRepository streetRepository;

    @GetMapping(value = "/streets")
    public ResponseEntity<List<Street>> getAllStreets(){
        return new ResponseEntity<>(streetRepository.findAll(), HttpStatus.OK);
    }
}
