package com.bin_app.scraper;
import com.bin_app.modules.CollectionDates;
import com.bin_app.modules.Street;
import com.bin_app.scraper.Sanitize;
import org.springframework.data.crossstore.ChangeSetPersister;

import javax.naming.Name;
import javax.swing.text.html.parser.Parser;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Test {
    public static void main(String[] args) throws Exception {
        Sanitize getStreetData = new Sanitize();
        GardenWasteSanitizer getGardenData = new GardenWasteSanitizer();
        HashMap<String, Details> getAllStreetData = getStreetData.getAllData();
        HashMap<String, GardenDetails> getAllGardenStreets = getGardenData.getAllGardenData();
        ArrayList<String> oddOrEven = new ArrayList<>();
        ArrayList<String> odd = new ArrayList<>();
        ArrayList<String> even = new ArrayList<>();
        ArrayList<String> neitherOddOrEvent = new ArrayList<>();
        ArrayList<String> thisIsWeird = new ArrayList<>();

        System.out.println("THIS IS SISHSIH "+ getAllGardenStreets.keySet().stream().sorted().toList());
        System.out.println(getAllGardenStreets.containsKey("Lanark Road 4-28 even"));


        getAllStreetData.forEach(( name, value ) -> System.out.println(name));
        System.out.println(getAllStreetData.size());
        System.out.println(getAllGardenStreets.size());

        ArrayList<String> getAllStreetDataWithNumbers = new ArrayList<>();
        getAllStreetData.forEach((name, value) -> {
            if (name.matches(".*[0-9].*")) {
                getAllStreetDataWithNumbers.add(name);
            }
        });
        System.out.println("Recycling streets with numbers " + getAllStreetDataWithNumbers.size());
//        getAllStreetDataWithNumbers.forEach((System.out::println));
        ArrayList<String> getAllGardenDataWithNumbers = new ArrayList<>();
        getAllGardenStreets.forEach((name, value) -> {
            if (name.matches(".*[0-9].*")) {
                getAllGardenDataWithNumbers.add(name);
            }
        });
        System.out.println("Garden streets with numbers " + getAllGardenDataWithNumbers.size());
//        getAllGardenDataWithNumbers.forEach((System.out::println));


        getAllStreetData.forEach((key, value) -> {
            Street street = new Street(key, value.getPostcode(), value.getRecycling(), value.getUrl());
            if (key.matches(".*(odd|even|Odd|Even).*")) {
                oddOrEven.add(key);
            }
            if (key.contains("odd") && !key.contains("even")) {
                odd.add(key);
            }
            if (key.contains("even") && !key.contains("odd")) {
                even.add(key);
            }
            if (!odd.contains(key) && !even.contains(key)) {
                neitherOddOrEvent.add(key);
            }
        }) ;

        ArrayList<String> oddOrEvenGarden = new ArrayList<>();
        ArrayList<String> oddGarden = new ArrayList<>();
        ArrayList<String> evenGarden = new ArrayList<>();
        ArrayList<String> neitherOddOrEventGarden = new ArrayList<>();
        ArrayList<String> thisIsWeirdGarden = new ArrayList<>();

        getAllGardenStreets.forEach((key, value) -> {
//            Street street = new Street(key, value.getPostcode(), value.getRecycling(), value.getUrl());
            if (key.matches(".*(odd|even|Odd|Even).*")) {
                oddOrEvenGarden.add(key);
            }
            if (key.contains("odd") && !key.contains("even")) {
                oddGarden.add(key);
            }
            if (key.contains("even") && !key.contains("odd")) {
                evenGarden.add(key);
            }
            if (!odd.contains(key) && !even.contains(key)) {
                neitherOddOrEventGarden.add(key);
            }
        }) ;
        // THIS IS FOR RECYCLING
        System.out.println("Odd and even list " + oddOrEven.stream().sorted().toList());
        System.out.println("Odd and even entries " + oddOrEven.size());
        System.out.println("Odd list " + odd.stream().sorted().toList());
        System.out.println("Odd entries " + odd.size());
        System.out.println("Even list: " + even.stream().sorted().toList());
        System.out.println("Even entries " + even.size());
        neitherOddOrEvent.forEach((key) -> {
            if (key.matches(".*(odd|even|Odd|Even).*")) {
                thisIsWeird.add(key);
            }
        });
        System.out.println("Wired list" + thisIsWeird.stream().sorted().toList());
        System.out.println("Wired size: " + thisIsWeird.size());

        System.out.println("THIS IS GARDEN !!! !!!!!!!!!!!! !!!!!!!!! !!!!!!!!!!!!!!!!!!");
        System.out.println("Odd and even list: " + oddOrEvenGarden.stream().sorted().toList());
        System.out.println("Odd and even entries " + oddOrEvenGarden.size());
        System.out.println("Odd list" + oddGarden.stream().sorted().toList());
        System.out.println("Odd entries " + oddGarden.size());
        System.out.println("Even list: " + evenGarden.stream().sorted().toList());
        System.out.println("Even entries " + evenGarden.size());
        neitherOddOrEventGarden.forEach((key) -> {
            if (key.matches(".*( odd| even| Odd| Even).*")) {
                thisIsWeirdGarden.add(key);
            }
        });
        System.out.println("Wired list" + thisIsWeirdGarden.stream().sorted().toList());
        System.out.println("Wired size: " + thisIsWeirdGarden.size());

        System.out.println(getAllGardenStreets.keySet().contains("even"));
        System.out.println(getAllGardenStreets.containsKey("dalkeith street"));
    };
};

