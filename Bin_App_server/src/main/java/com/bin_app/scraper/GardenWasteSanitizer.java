package com.bin_app.scraper;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Scanner;

public class GardenWasteSanitizer {
    public HashMap<String, GardenDetails> getAllGardenData() throws FileNotFoundException {
//      File fileScrapedCouncilStreetsGarden = new File("/Users/davidbujok/repos/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/garden_bins_matching.tsv");
        File fileScrapedCouncilStreetsGarden = new File("/Users/lewis/ALL_NOTES/capstone_project/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/garden_bins_matching.tsv");
//      File fileScrapedCouncilStreetsGarden = new File("/Users/user/final_project/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/garden_bins_matching.tsv");


        Scanner scanScraper = new Scanner(fileScrapedCouncilStreetsGarden);

        HashMap<String, GardenDetails> allGardenStreetsMatching = new HashMap<>();
        while (scanScraper.hasNextLine()) {
//            String currentGardenStreet = scanScraper.nextLine().toLowerCase().
            String currentGardenStreet = scanScraper.nextLine().toLowerCase().replace("&", ",");
            String[] currentGardenStreetSplitString = currentGardenStreet.split("\t");
            allGardenStreetsMatching.put(currentGardenStreetSplitString[0], new GardenDetails(currentGardenStreetSplitString[3], currentGardenStreetSplitString[2]));
            allGardenStreetsMatching.get(currentGardenStreetSplitString[0]).setFullUrl(currentGardenStreetSplitString[2]);
        }
        scanScraper.close();
        allGardenStreetsMatching.remove("address");

        return allGardenStreetsMatching;
    }
}
