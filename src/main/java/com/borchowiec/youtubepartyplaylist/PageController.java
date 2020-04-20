package com.borchowiec.youtubepartyplaylist;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    /**
     * @return Index page.
     */
    @GetMapping("/")
    public String mainPage() {
        return "index";
    }
}
