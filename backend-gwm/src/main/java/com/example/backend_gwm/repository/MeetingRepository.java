package com.example.backend_gwm.repository;

import com.example.backend_gwm.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, String> {
}
