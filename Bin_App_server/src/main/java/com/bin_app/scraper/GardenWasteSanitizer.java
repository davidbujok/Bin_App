package com.bin_app.scraper;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Scanner;

public class GardenWasteSanitizer {




    public HashMap<String, String> getAllGardenData() throws FileNotFoundException {
        File fileScrapedCouncilStreetsGarden = new File("/Users/lewis/ALL_NOTES/capstone_project/Bin_App/scraper/garden_bins_matching.tsv");
        Scanner scanScraper = new Scanner(fileScrapedCouncilStreetsGarden);

        HashMap<String, String> allGardenStreetsMatching = new HashMap<>();


        while (scanScraper.hasNextLine()) {
            String currentGardenStreet = scanScraper.nextLine().toLowerCase();

            System.out.println("Current street before split" + currentGardenStreet);

            System.out.println(scanScraper.hasNextLine());

            String[] currentGardenStreetSplitString = currentGardenStreet.split("\t");

            System.out.println("Current street after split" + currentGardenStreetSplitString[0]);

            allGardenStreetsMatching.put(currentGardenStreetSplitString[0],(currentGardenStreetSplitString[3]));
//            allGardenStreetsMatching.get(currentStreetSplitString[0]).setFullUrl(currentStreetSplitString[2]);
        }
        return allGardenStreetsMatching;
    }
}
