package com.example.backend_gwm.service.impl;

import com.example.backend_gwm.model.Meeting;
import com.example.backend_gwm.model.User;
import com.example.backend_gwm.repository.MeetingRepository;
import com.example.backend_gwm.repository.UserRepository;
import com.example.backend_gwm.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MeetingServiceImpl implements MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    @Override
    public Meeting getMeetingById(String id) {
        return meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found with id: " + id));
    }

    @Override
    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    @Override
    public Meeting updateMeeting(String id, Meeting meeting) {
        Optional<Meeting> existingMeetingOptional = meetingRepository.findById(id);
        if (existingMeetingOptional.isPresent()) {
            meeting.setId(id);
            return meetingRepository.save(meeting);
        } else {
            throw new RuntimeException("Meeting not found with id: " + id);
        }
    }

    @Override
    public void deleteMeeting(String id) {
        meetingRepository.deleteById(id);
    }


    @Transactional
    @Override
    public void associateUserWithMeeting(String userId, String meetingId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found with id: " + meetingId));

        user.getMeetings().forEach(m -> m.getUsers().remove(user));
        user.getMeetings().clear();

        user.getMeetings().add(meeting);
        meeting.getUsers().add(user);

        userRepository.save(user);
        meetingRepository.save(meeting);
    }
}

