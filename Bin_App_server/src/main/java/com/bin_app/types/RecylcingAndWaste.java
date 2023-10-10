package com.bin_app.types;

public enum RecylcingAndWaste {
    MONDAY("monday"),
    TUESDAY1("tuesday-1"),
    TUESDAY1A("tuesday-1a"),
    TUESDAY2("tuesday-2"),
    WEDNESDAY1("wednesday-1"),
    WEDNESDAY1A("wednesday-1a"),
    WEDNESDAY2("wednesday-2"),
    THURSDAY1("thursday-1"),
    THURSDAY1A("thursday-1a"),
    THURSDAY2("thursday-2"),
    FRIDAY1("friday-1"),
    FRIDAY1A("friday-1a"),
    FRIDAY2("friday-2");

    private String calendar;

    RecylcingAndWaste(String calendar) {
        this.calendar = calendar;
    }

    public String getCalendar() {
        return calendar;
    }
}
