package com.example.backend_gwm.util;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class GenerateLinkUtil {

    private static final String BASE_URL = "https://meet.jit.si/";

    public static String generateLink(LocalDate date, LocalTime time) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("ddMMyyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmm");

        String formattedDate = date.format(dateFormatter);
        String formattedTime = time.format(timeFormatter);

        return BASE_URL + "obstare" + formattedDate + formattedTime;
    }
}
