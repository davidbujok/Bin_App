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
//        Sanitize getStreetData = new Sanitize();
        Sanitize getStreetData = new Sanitize();
        HashMap<String, Details> getAllStreetData = getStreetData.getAllData();
        ArrayList<String> oddOrEven = new ArrayList<>();
        ArrayList<String> odd = new ArrayList<>();
        ArrayList<String> even = new ArrayList<>();
        ArrayList<String> neitherOddOrEvent = new ArrayList<>();
        ArrayList<String> thisIsWired = new ArrayList<>();


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
//        System.out.println("Neither list: " + neitherOddOrEvent);
//        System.out.println("Neither size: " + neitherOddOrEvent.size());
        neitherOddOrEvent.forEach((key) -> {
            if (key.matches(".*(odd|even|Odd|Even).*")) {
                thisIsWired.add(key);
            }
        });
        System.out.println("Wired list" + thisIsWired.stream().sorted().toList());
        System.out.println("Wired size: " + thisIsWired.size());

//        ArrayList<String> oddStreets = new ArrayList<>();
//        // Remove streets that contains word odd sucha as Brodd Road
//        odd.forEach((key) -> {
//            if (key.matches(".*[1-9].*")) {
//                System.out.println(key);
//                Pattern pattern = Pattern.compile("\\d+"); // Matches one or more digits
//                Matcher matcher = pattern.matcher(key);
//                Integer streetNumbers[] = new Integer[4];
//                while (matcher.find()) {
//                    String streetNumber = matcher.group();
//                    streetNumbers.add(Integer.parseInt(streetNumber));
//                    streetNumbers[0]
//                }
//                }
//            });
        };



    }
