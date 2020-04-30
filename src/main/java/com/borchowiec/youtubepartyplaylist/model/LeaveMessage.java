package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains info about user that joint room.
 */
public class LeaveMessage {
    private final MessageType type = MessageType.LEAVE;
    private String userId;

    public MessageType getType() {
        return type;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
