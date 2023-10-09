package com.bin_app.scraper;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Sanitize {

    public static void main(String[] args) throws FileNotFoundException {

        HashMap<String, String> streets = new HashMap<>();
        ArrayList<String> correctStreets = new ArrayList<>();
        ArrayList<String> notCorrectStreets = new ArrayList<>();

        // George
//        File fileS = new File("/Users/user/final_project/Bin_App/scraper/bin_pickup_days.tsv");
//        File fileStreetsWithCorrectNames = new File("/Users/user/final_project/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/streets.tsv");


        // Lewis
//        File fileS = new File("/Users/lewis/ALL_NOTES/capstone_project/Bin_App/scraper/bin_pickup_days.tsv");
//        File fileStreetsWithCorrectNames = new File("/Users/lewis/ALL_NOTES/capstone_project/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/streets.tsv");

        
        File fileS = new File("/Users/davidbujok/repos/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/bin_pickup_days.tsv");
        File fileStreetsWithCorrectNames = new File("/Users/davidbujok/repos/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/streets.tsv");

        Scanner scanScrapper = new Scanner(fileS);
        Scanner scanScrapperCorrectStreets = new Scanner(fileStreetsWithCorrectNames);
        while (scanScrapper.hasNextLine()) {
            String data = scanScrapper.nextLine();
            String[] splitData = data.split("\t");
            streets.put(splitData[0], splitData[2]);
        }
        while (scanScrapperCorrectStreets.hasNextLine()) {
            String correctData = scanScrapperCorrectStreets.nextLine();
            String[] correctSplitData = correctData.split(" ");
            correctSplitData = Arrays.copyOf(correctSplitData, correctSplitData.length-2);
            correctStreets.add(String.join(" ",correctSplitData).trim());
        }

        for (String address: correctStreets) {
            if (!streets.containsKey(address)) {
                notCorrectStreets.add(address);
            }
        }
        ArrayList<String> furtherClearOfStreetNames = new ArrayList<>();
        ArrayList<String> furtherClearOfStreetNamesX = new ArrayList<>();
        for (String notCorrect: notCorrectStreets) {  //Bonnington road lane
            Set<String> streetsFiltered = streets.keySet() //Bonnington road EH*
                    .stream()
                    .filter(s -> (s.contains(notCorrect)))
                    .collect(Collectors.toSet());
            Set<String> streetsFilteredNot = streets.keySet() //Bonnington road EH*
                    .stream()
                    .filter(s -> (!s.contains(notCorrect)))
                    .collect(Collectors.toSet());
            streetsFiltered.toArray();
            furtherClearOfStreetNames.addAll(streetsFiltered);
            furtherClearOfStreetNamesX.addAll(streetsFilteredNot);
        }
        System.out.println(furtherClearOfStreetNames);
        System.out.println(furtherClearOfStreetNames.size());
        System.out.println("not correct streets: " + notCorrectStreets.size());
        System.out.println("correct streets: " + correctStreets.size());
        System.out.println("all streets: " + streets.size());
        System.out.println(furtherClearOfStreetNamesX);
        System.out.println(furtherClearOfStreetNamesX.size());

//        System.out.println(notCorrectStreets.size());
//        Pattern pattern = Pattern.compile("^Bonnington Road[ws-]");
//        System.out.println(pattern);
//        System.out.println(streets.containsKey("Bonnington Road EH6"));


        scanScrapper.close();
        scanScrapperCorrectStreets.close();
    }
}


