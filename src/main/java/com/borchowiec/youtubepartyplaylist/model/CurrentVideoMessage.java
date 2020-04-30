package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains info about current video.
 */
public class CurrentVideoMessage {
    private final MessageType type = MessageType.CURRENT_VIDEO;
    private int index;
    private String video;

    public CurrentVideoMessage() {
    }

    public CurrentVideoMessage(int index, String video) {
        this.index = index;
        this.video = video;
    }

    public MessageType getType() {
        return type;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }
}
