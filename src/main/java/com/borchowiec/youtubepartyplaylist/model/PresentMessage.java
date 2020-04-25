package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains info about user that is present.
 */
public class PresentMessage {
    private final MessageType type = MessageType.PRESENT;
    private String username;
    private UserType userType;

    public PresentMessage() {
    }

    public PresentMessage(String username, UserType userType) {
        this.username = username;
        this.userType = userType;
    }

    public MessageType getType() {
        return type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }
}
