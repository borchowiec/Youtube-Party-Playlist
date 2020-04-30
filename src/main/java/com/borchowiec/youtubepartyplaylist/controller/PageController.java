package com.borchowiec.youtubepartyplaylist.controller;

import com.borchowiec.youtubepartyplaylist.exception.NotOwnerException;
import com.borchowiec.youtubepartyplaylist.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Returns pages of website.
 */
@Controller
public class PageController {
    private final JwtTokenProvider tokenProvider;

    public PageController(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    /**
     * @return Index page.
     */
    @GetMapping("/")
    public String mainPage() {
        return "index";
    }

    /**
     * @param playlistId id of user's playlist
     * @param model contains playlistId and google token
     * @param token google api token
     * @param userToken jwt user token
     * @return Page of user's playlist.
     */
    @GetMapping("/my/{playlistId}")
    public String myPlaylistPage(@PathVariable String playlistId, Model model, @Value("${googleToken}") String token,
                                 @CookieValue(name = "userToken") String userToken) {

        if (!playlistId.equals(tokenProvider.getUserIdFromJWT(userToken))) {
            throw new NotOwnerException("You are not owner of playlist of id: " + playlistId);
        }

        model.addAttribute("playlistId", playlistId);
        model.addAttribute("token", token);
        return "my";
    }

    /**
     * @param playlistId Id of playlist that user wants to join.
     * @param model contains google api token
     * @param token google api token
     * @return Guest playlist page.
     */
    @GetMapping("/playlist/{playlistId}")
    public String guestPlaylistPage(@PathVariable String playlistId, Model model,
                                    @Value("${googleToken}") String token) {
        model.addAttribute("playlistId", playlistId);
        model.addAttribute("token", token);
        return "playlist";
    }
}
