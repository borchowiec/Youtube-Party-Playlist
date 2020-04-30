package com.borchowiec.youtubepartyplaylist.event;

import com.borchowiec.youtubepartyplaylist.model.LeaveMessage;
import com.borchowiec.youtubepartyplaylist.model.MessageType;
import com.borchowiec.youtubepartyplaylist.model.PlaylistMessage;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import static java.lang.String.format;

@Component
public class WebSocketEventListener {

  private final SimpMessageSendingOperations messagingTemplate;

  public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

    String userId = (String) headerAccessor.getSessionAttributes().get("userId");
    String roomId = (String) headerAccessor.getSessionAttributes().get("room_id");
    if (userId != null) {
      LeaveMessage message = new LeaveMessage();
      message.setUserId(userId);
      messagingTemplate.convertAndSend(format("/room/%s", roomId), message);
    }
  }
}
