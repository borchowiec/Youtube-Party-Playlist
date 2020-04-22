package com.borchowiec.youtubepartyplaylist.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Returns pages of website.
 */
@Controller
public class PageController {
    /**
     * @return Index page.
     */
    @GetMapping("/")
    public String mainPage() {
        return "index";
    }

    /**
     * @return Page of user's playlist.
     */
    @GetMapping("/my/{playlistId}")
    public String myPlaylistPage(@PathVariable String playlistId, Model model) {
        model.addAttribute("playlistId", playlistId);
        return "my";
    }

    /**
     * @return Guest playlist page.
     */
    @GetMapping("/playlist/{playlistId}")
    public String guestPlaylistPage(@PathVariable String playlistId, Model model) {
        model.addAttribute("playlistId", playlistId);
        return "playlist";
    }
}