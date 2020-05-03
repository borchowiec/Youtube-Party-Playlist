package com.borchowiec.youtubepartyplaylist.filter;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Random;
import java.util.stream.Stream;

/**
 * Checks of user has username. If not, set random username.
 */
@Component
@Order(1)
public class UsernameFilter implements Filter {

    private static final String ANIMALS[] = {
            "Giraffe", "Chameleon", "Elephant", "Crocodile", "Duck", "Deer", "Hippo", "Hedgehog", "Kitten", "Dolphin",
            "Panda", "Octopus",  "Lamb", "Owl", "Sloth", "Seal", "Bunny", "Piglet", "Fox", "Hamster", "Penguin"
    };

    private static final String ADJECTIVES[] = {
            "Large", "Small", "Cute", "Strong", "Happy", "Poor", "Intelligent", "Nice", "Huge", "Pink", "Red", "Green",
            "Yellow", "Orange", "Hungry", "Evil", "Tiny", "Tall", "Good", "Bad", "Short", "Black", "Gray"
    };

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        // get current username
        Cookie[] cookies = req.getCookies();
        String username = "";

        if (cookies != null) {
            username = Stream.of(cookies)
                    .filter(cookie -> cookie.getName().equals("username"))
                    .findFirst()
                    .orElse(new Cookie("username", ""))
                    .getValue();
        }

        // check if user has username
        if (!StringUtils.hasText(username)) {
            Cookie usernameCookie = new Cookie("username", generateUsername());
            usernameCookie.setPath("/");
            res.addCookie(usernameCookie);
        }

        filterChain.doFilter(request, response);
    }

    private String generateUsername() {
        return ADJECTIVES[new Random().nextInt(ADJECTIVES.length)] + ANIMALS[new Random().nextInt(ANIMALS.length)];
    }
}
