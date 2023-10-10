package com.bin_app.components;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

public class CalculateDates {


    public static HashMap<Date, String> calculateDates(int year, int month, int date, String option1, String option2) {

    Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, 0);

        calendar.set(year, month, date);

    ArrayList<Calendar> dates = new ArrayList<>();

    Boolean colour = false;

    HashMap<Date, String> datesWithBinColours = new HashMap<>();
        datesWithBinColours.put(calendar.getTime(), option1);

        for(int i = 0; i < calendar.getMaximum(Calendar.WEEK_OF_YEAR) -1 ; i ++){
        calendar.add(Calendar.DATE, 7);
        dates.add(calendar);
        if(colour){
            datesWithBinColours.put(calendar.getTime(), option1);
            colour = false;
        } else {
            datesWithBinColours.put(calendar.getTime(), option2);
            colour = true;
        }}

        return datesWithBinColours;
    }
}
