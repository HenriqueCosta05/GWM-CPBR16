package com.example.backend_gwm.controller;

import com.example.backend_gwm.model.Meeting;
import com.example.backend_gwm.model.User;
import com.example.backend_gwm.service.MeetingService;
import com.example.backend_gwm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        List<Meeting> meetings = meetingService.getAllMeetings();
        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        Meeting createdMeeting = meetingService.createMeeting(meeting);
        return new ResponseEntity<>(createdMeeting, HttpStatus.CREATED);
    }

    @PostMapping("/{meetingId}/users/{userId}")
    public ResponseEntity<String> addUserToMeeting(@PathVariable String meetingId, @PathVariable String userId) {
        userService.addMeetingToUser(userId, meetingId);
        return ResponseEntity.ok("Usuário associado à reunião com sucesso.");
    }


}

