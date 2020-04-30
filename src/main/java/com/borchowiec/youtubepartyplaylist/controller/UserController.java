package com.borchowiec.youtubepartyplaylist.controller;

import com.borchowiec.youtubepartyplaylist.payload.UserIdResponse;
import com.borchowiec.youtubepartyplaylist.security.JwtTokenProvider;
import javafx.util.Pair;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final JwtTokenProvider tokenProvider;

    public UserController(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @GetMapping("/get-id")
    public UserIdResponse getId(@CookieValue(name = "userToken") String userToken) {
        String id = tokenProvider.getUserIdFromJWT(userToken);
        return new UserIdResponse(id);
    }

}
