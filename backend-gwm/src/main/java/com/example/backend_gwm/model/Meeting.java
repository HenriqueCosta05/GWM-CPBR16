package com.example.backend_gwm.model;

import com.example.backend_gwm.enums.UserRole;
import com.example.backend_gwm.util.GenerateLinkUtil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reunioes")
public class Meeting {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToMany
    @JoinTable(
            name = "user_meeting",
            joinColumns = @JoinColumn(name = "meeting_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

    @Column(name = "date")
    private Date date;

    @Column(name = "time")
    private LocalTime time;

    @Column(name = "link")
    private String link;

    @Column(name = "isConfirmed")
    private Boolean isConfirmed;

    public void setDate(Date date) {
        this.date = date;
        generateMeetingLink();
    }

    public void setTime(LocalTime time) {
        this.time = time;
        generateMeetingLink();
    }

    private void generateMeetingLink() {
        if (this.date != null && this.time != null) {
            LocalDate localDate = new java.sql.Date(this.date.getTime()).toLocalDate();
            this.link = GenerateLinkUtil.generateLink(localDate, this.time);
        }
    }
}
