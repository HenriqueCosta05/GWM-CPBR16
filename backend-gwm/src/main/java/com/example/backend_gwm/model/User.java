package com.example.backend_gwm.model;

import com.example.backend_gwm.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usuarios")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private UserRole userRole;

    @Column(name = "username")
    private String username;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "phone")
    private String phoneNumber;

    @Column(name = "zip")
    private String zip;

    @Column(name = "password")
    private String password;

    @Column(name = "cpf")
    private String cpf;

    @ElementCollection
    @CollectionTable(name = "user_schedule", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "schedule")
    private List<String> schedule;

    @ManyToMany
    @JoinTable(
            name = "user_meeting",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "meeting_id")
    )
    private List<Meeting> meetings;

    public List<String> getSchedule() {
        if (this.getUserRole().equals(UserRole.VOLUNTEER)) {
            return schedule;
        } else {
            throw new UnsupportedOperationException("Access denied. Only volunteers can access this field.");
        }
    }

    public void setSchedule(List<String> schedule) {
        if (this.getUserRole().equals(UserRole.VOLUNTEER)) {
            this.schedule = schedule;
        } else {
            throw new UnsupportedOperationException("Access denied. Only volunteers can access this field.");
        }
    }
}
