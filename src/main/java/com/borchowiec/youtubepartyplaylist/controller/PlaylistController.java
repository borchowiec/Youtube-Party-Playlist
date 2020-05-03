package com.borchowiec.youtubepartyplaylist.controller;

import com.borchowiec.youtubepartyplaylist.model.*;
import com.borchowiec.youtubepartyplaylist.security.JwtTokenProvider;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import static java.lang.String.format;

@Controller
public class PlaylistController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final JwtTokenProvider tokenProvider;

    public PlaylistController(SimpMessageSendingOperations messagingTemplate, JwtTokenProvider tokenProvider) {
        this.messagingTemplate = messagingTemplate;
        this.tokenProvider = tokenProvider;
    }

    /**
     * Register user in room.
     * @param roomId User will be register in this room.
     * @param message Message that contains info about user.
     * @param headerAccessor
     */
    @MessageMapping("/playlist-ws/{roomId}/addUser")
    public void addUser(@DestinationVariable String roomId, @Payload JoinMessage message,
                        SimpMessageHeaderAccessor headerAccessor) {
        String currentRoomId = (String) headerAccessor.getSessionAttributes().put("room_id", roomId);
        if (currentRoomId != null) {
            LeaveMessage leaveMessage = new LeaveMessage();
            message.setUserId(message.getUserId());
            messagingTemplate.convertAndSend(format("/room/%s", roomId), leaveMessage);
        }
        headerAccessor.getSessionAttributes().put("userId", message.getUserId());
        messagingTemplate.convertAndSend(format("/room/%s", roomId), message);
    }

    /**
     * Adds video to specific playlist.
     * @param roomId all users in this room will receive message
     * @param message contains url of video.
     */
    @MessageMapping("/playlist-ws/{roomId}/addVideo")
    public void addVideo(@DestinationVariable String roomId, @Payload UrlMessage message) {
        messagingTemplate.convertAndSend(format("/room/%s", roomId), message);
    }

    /**
     * Sends new, updated playlist.
     * @param roomId all users in this room will receive message
     * @param message contains playlist
     */
    @MessageMapping("/playlist-ws/{roomId}/updatePlaylist")
    public void updatePlaylist(@DestinationVariable String roomId, @Payload UpdatedPlaylistMessage message) {
        messagingTemplate.convertAndSend(format("/room/%s", roomId), message);
    }

    /**
     * Sends new, updated playlist.
     * @param roomId all users in this room will receive message
     * @param message contains playlist
     */
    @MessageMapping("/playlist-ws/{roomId}/present")
    public void presentUser(@DestinationVariable String roomId, @Payload PresentMessage message) {
        messagingTemplate.convertAndSend(format("/room/%s", roomId), message);
    }

    /**
     * Notifies changing video.
     * @param roomId all users in this room will receive message.
     * @param message Contains info about current video.
     */
    @MessageMapping("/playlist-ws/{roomId}/currentVideo")
    public void currentVideo(@DestinationVariable String roomId, @Payload CurrentVideoMessage message) {
        messagingTemplate.convertAndSend(format("/room/%s", roomId), message);
    }

    /**
     * Sends message to specific user.
     * @param roomId all users in this room will receive message.
     * @param message Contains message.
     */
    @MessageMapping("/playlist-ws/{roomId}/message")
    public void message(@DestinationVariable String roomId, @Payload BasicMessage message) {
        messagingTemplate.convertAndSend(format("/room/%s", roomId), message);
    }

    /**
     * Adds token that authorize user to joining playlist.
     * @param playlistToken token of playlist. The same token as owner token.
     * @param response Contains cookie with authorization. Redirects to playlist.
     * @throws IOException
     */
    @GetMapping("/auth/{playlistToken}")
    public void authorize(@PathVariable String playlistToken, HttpServletResponse response) throws IOException {
        if (tokenProvider.validateToken(playlistToken)) {
            String id = tokenProvider.getUserIdFromJWT(playlistToken);

            Cookie cookie = new Cookie("playlistAuthorization", playlistToken);
            cookie.setPath("/");

            response.addCookie(cookie);
            response.sendRedirect("/playlist/" + id);
        }
    }
}
