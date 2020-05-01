package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains url of video and user which sent this message.
 */
public class BasicMessage {
    private MessageType type;
    private String receiverId;
    private String messageContent;

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }
}
