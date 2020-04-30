package com.borchowiec.youtubepartyplaylist.filter;

import com.borchowiec.youtubepartyplaylist.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Stream;

@Component
@Order(0)
public class JwtTokenFilter implements Filter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        // get current token
        Cookie[] cookies = req.getCookies();
        String token = "";

        if (cookies != null) {
            token = Stream.of(cookies)
                    .filter(cookie -> cookie.getName().equals("userToken"))
                    .findFirst()
                    .orElse(new Cookie("userToken", ""))
                    .getValue();
        }

        // check token and if it's not correct, generate new
        if (!StringUtils.hasText(token) || !tokenProvider.validateToken(token)) {
            Cookie tokenCookie = new Cookie("userToken", tokenProvider.generateToken());
            tokenCookie.setPath("/");
            res.addCookie(tokenCookie);
        }

        filterChain.doFilter(request, response);
    }
}
