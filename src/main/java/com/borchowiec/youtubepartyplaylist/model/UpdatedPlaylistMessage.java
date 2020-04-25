package com.borchowiec.youtubepartyplaylist.model;

/**
 * Contains current state of playlist.
 */
public class UpdatedPlaylistMessage {
    private final MessageType type = MessageType.UPDATED_PLAYLIST;
    private String playlist;

    public UpdatedPlaylistMessage() {
    }

    public UpdatedPlaylistMessage(String playlist) {
        this.playlist = playlist;
    }

    public MessageType getType() {
        return type;
    }

    public String getPlaylist() {
        return playlist;
    }

    public void setPlaylist(String playlist) {
        this.playlist = playlist;
    }
}
