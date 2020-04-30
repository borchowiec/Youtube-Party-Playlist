package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains info about user that joint room.
 */
public class JoinMessage {
    private final MessageType type = MessageType.JOIN;
    private String username;
    private String userId;
    private UserType userType;

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
