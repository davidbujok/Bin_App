package com.bin_app.scraper;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

public class Sanitize {


    HashMap<String, Details> data;

    public HashMap<String, Details> getData() {
        return data;
    }

    public void setData(HashMap<String, Details> data) {
        this.data = data;
    }

    public Sanitize() {
        this.data = null;

    }

    public HashMap<String, Details> getAllData() throws FileNotFoundException {

        HashMap<String, Details> scrapedCouncilStreets = new HashMap<>();
        ArrayList<String> allEdinburghStreets = new ArrayList<>();
        ArrayList<String> notMatchingStreets = new ArrayList<>();

//         George
//          File calendarLinksTsv = new File("/Users/user/final_project/Bin_App/scraper/calendar_links.tsv");
//        File fileScrapedCouncilStreets = new File("/Users/user/final_project/Bin_App/scraper/bin_pickup_days.tsv");
//        File fileAllEdinburghStreets = new File("/Users/user/final_project/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/streets.tsv");


//             Lewis
//          File calendarLinksTsv = new File("/Users/lewis/ALL_NOTES/capstone_project/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/calendar_links.tsv");
//          File fileScrapedCouncilStreets = new File("/Users/lewis/ALL_NOTES/capstone_project/Bin_App/scraper/bin_pickup_days.tsv");
 //         File fileAllEdinburghStreets = new File("/Users/lewis/ALL_NOTES/capstone_project/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/streets.tsv");
//

        File calendarLinksTsv = new File("/Users/davidbujok/repos/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/calendar_links.tsv");
        File fileScrapedCouncilStreets = new File("/Users/davidbujok/repos/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/bin_pickup_days.tsv");
        File fileAllEdinburghStreets = new File("/Users/davidbujok/repos/Bin_App/Bin_App_server/src/main/java/com/bin_app/scraper/streets.tsv");

        Scanner scanScraper = new Scanner(fileScrapedCouncilStreets);
        Scanner scanAllEdinburghStreets = new Scanner(fileAllEdinburghStreets);
        Scanner scanCalendarLinks = new Scanner(calendarLinksTsv);

        HashMap<String, String> calendarLinks = new HashMap<>();
        while(scanCalendarLinks.hasNextLine()){
            String currentCalendar = scanCalendarLinks.nextLine();
            String [] calendarSplit = currentCalendar.split("\t");
            calendarLinks.put(calendarSplit[0],calendarSplit[1]);
        }

        HashMap<String, String> allEdinburghStreetsWithPostcodes = new HashMap<>();
        while (scanScraper.hasNextLine()) {
            String currentStreet = scanScraper.nextLine().toLowerCase().replace("&", ",");
            String[] currentStreetSplitString = currentStreet.split("\t");
            scrapedCouncilStreets.put(currentStreetSplitString[0], new Details(currentStreetSplitString[2]));
            scrapedCouncilStreets.forEach((k,v) -> {
                v.setUrl(calendarLinks.get(v.getRecycling()));
            });
        }

        scanScraper.close();
        while (scanAllEdinburghStreets.hasNextLine()) {
            String currentEdinburghStreet = scanAllEdinburghStreets.nextLine().toLowerCase().replace("&", ",");
            String[] correctEdinburghStreetSplitString = currentEdinburghStreet.split(" ");
            List<String> convertArrayToArrayList = new ArrayList<>(Arrays.asList(correctEdinburghStreetSplitString));
            String postCode2 = convertArrayToArrayList.remove(convertArrayToArrayList.size()-1);
            String postCode1 = convertArrayToArrayList.remove(convertArrayToArrayList.size()-1);
            correctEdinburghStreetSplitString = Arrays.copyOf(correctEdinburghStreetSplitString, correctEdinburghStreetSplitString.length-2);
            allEdinburghStreetsWithPostcodes.put(String.join(" ", correctEdinburghStreetSplitString).trim(), postCode1 + postCode2);
            allEdinburghStreets.add(String.join(" ",correctEdinburghStreetSplitString).trim());
        }
        scanAllEdinburghStreets.close();
        allEdinburghStreets.remove(0);

        scrapedCouncilStreets.forEach((key, value) -> {
             if (allEdinburghStreetsWithPostcodes.containsKey(key)) {
                 String postCode = allEdinburghStreetsWithPostcodes.get(key);
                 value.setPostcode(postCode);
                }
            });

        System.out.println(allEdinburghStreets);

        return scrapedCouncilStreets;

    }
}


