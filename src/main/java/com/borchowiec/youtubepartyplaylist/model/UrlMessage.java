package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains url of video and user which sent this message.
 */
public class UrlMessage {
    private MessageType type;
    private String userId;
    private String url;

    public UrlMessage() {
    }

    public UrlMessage(MessageType type, String userId, String url) {
        this.type = type;
        this.userId = userId;
        this.url = url;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
