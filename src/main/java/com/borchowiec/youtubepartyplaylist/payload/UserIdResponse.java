package com.borchowiec.youtubepartyplaylist.payload;

public class UserIdResponse {
    private String userId;

    public UserIdResponse(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
