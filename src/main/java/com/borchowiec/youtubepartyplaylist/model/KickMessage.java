package com.borchowiec.youtubepartyplaylist.model;

public class KickMessage {
    private final MessageType type = MessageType.KICK;
    private String userId;
    private String reason;

    public MessageType getType() {
        return type;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
