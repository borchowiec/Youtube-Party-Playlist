package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains info about user that is present.
 */
public class PresentMessage {
    private final MessageType type = MessageType.PRESENT;
    private String username;
    private UserType userType;
    private String userId;
    private String playlistAuthorization;

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

    public String getPlaylistAuthorization() {
        return playlistAuthorization;
    }

    public void setPlaylistAuthorization(String playlistAuthorization) {
        this.playlistAuthorization = playlistAuthorization;
    }
}
