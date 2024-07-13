package com.example.backend_gwm.service;

import com.example.backend_gwm.model.Meeting;

import java.util.List;

public interface MeetingService {
    List<Meeting> getAllMeetings();

    Meeting getMeetingById(String id);

    Meeting createMeeting(Meeting meeting);

    Meeting updateMeeting(String id, Meeting meeting);

    void deleteMeeting(String id);

}
