package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains url of video and user which sent this message.
 */
public class UrlMessage {
    private MessageType type;
    private String username;
    private String url;

    public UrlMessage() {
    }

    public UrlMessage(MessageType type, String username, String url) {
        this.type = type;
        this.username = username;
        this.url = url;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
