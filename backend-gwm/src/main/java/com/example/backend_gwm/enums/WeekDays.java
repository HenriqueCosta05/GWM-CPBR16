package com.example.backend_gwm.enums;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public enum WeekDays {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY;

    public static List<WeekDays> convertStringsToEnum(List<String> weekdays) {
        List<WeekDays> enums = new ArrayList<>();
        for (String weekday : weekdays) {
            enums.add(WeekDays.valueOf(weekday.toUpperCase()));
        }
        return enums;
    }
}
