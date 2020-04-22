package com.borchowiec.youtubepartyplaylist.controller;

import com.borchowiec.youtubepartyplaylist.model.MessageType;
import com.borchowiec.youtubepartyplaylist.model.PlaylistMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import static java.lang.String.format;

@Controller
public class PlaylistController {

    private final SimpMessageSendingOperations messagingTemplate;

    public PlaylistController(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/playlist-ws/{roomId}/addUser")
    public void addUser(@DestinationVariable String roomId, @Payload PlaylistMessage message,
                        SimpMessageHeaderAccessor headerAccessor) {
        String currentRoomId = (String) headerAccessor.getSessionAttributes().put("room_id", roomId);
        if (currentRoomId != null) {
            PlaylistMessage leaveMessage = new PlaylistMessage(MessageType.LEAVE, message.getUsername());
            messagingTemplate.convertAndSend(format("/room/%s", currentRoomId), leaveMessage);
        }
        headerAccessor.getSessionAttributes().put("username", message.getUsername());
        messagingTemplate.convertAndSend(format("/room/%s", roomId), message);
    }
}
