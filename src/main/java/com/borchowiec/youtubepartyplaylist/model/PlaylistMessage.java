package com.borchowiec.youtubepartyplaylist.model;

public class PlaylistMessage {
    private MessageType type;
    private String username;

    public PlaylistMessage() {
    }

    public PlaylistMessage(MessageType type, String username) {
        this.type = type;
        this.username = username;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
