package com.bin_app.scraper;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class Sanitize {

    public static void main(String[] args) throws FileNotFoundException {

        HashMap<String, String> streets = new HashMap<>();
        ArrayList<String> correctStreets = new ArrayList<>();
        ArrayList<String> notCorrectStreets = new ArrayList<>();


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
            correctStreets.add(String.join(" ",correctSplitData));
        }

        scanScrapper.close();
        scanScrapperCorrectStreets.close();

    }
}


