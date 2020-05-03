package com.borchowiec.youtubepartyplaylist.configuration;

import com.borchowiec.youtubepartyplaylist.filter.JwtTokenFilter;
import com.borchowiec.youtubepartyplaylist.filter.UsernameFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

    /**
     * Registers a filter that checks if the user has a valid token.
     */
    @Bean
    public FilterRegistrationBean<JwtTokenFilter> jwtTokenFilterRegistrationBean(){
        FilterRegistrationBean<JwtTokenFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new JwtTokenFilter());
        registrationBean.addUrlPatterns("/", "/my/*", "/playlist/*", "/auth/*");

        return registrationBean;
    }

    /**
     * Registers a filter that checks if the user has username.
     */
    @Bean
    public FilterRegistrationBean<UsernameFilter> UsernameFilterRegistrationBean(){
        FilterRegistrationBean<UsernameFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new UsernameFilter());
        registrationBean.addUrlPatterns("/", "/my/*", "/playlist/*", "/auth/*");

        return registrationBean;
    }
}
