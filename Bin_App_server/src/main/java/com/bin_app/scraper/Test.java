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
        HashMap<String, Details> getAllStreetData = getStreetData.getAllData();
        ArrayList<String> oddOrEven = new ArrayList<>();
        ArrayList<String> odd = new ArrayList<>();
        ArrayList<String> even = new ArrayList<>();
        ArrayList<String> neitherOddOrEvent = new ArrayList<>();
        ArrayList<String> thisIsWeird = new ArrayList<>();


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
        System.out.println("Odd and even list: " + oddOrEven.stream().sorted().toList());
        System.out.println("Odd and even entries " + oddOrEven.size());
        System.out.println("Odd list" + odd.stream().sorted().toList());
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
        };
    }
