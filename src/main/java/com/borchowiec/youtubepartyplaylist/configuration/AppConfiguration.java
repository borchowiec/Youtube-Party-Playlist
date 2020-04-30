package com.borchowiec.youtubepartyplaylist.configuration;

import com.borchowiec.youtubepartyplaylist.filter.JwtTokenFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {
    @Bean
    public FilterRegistrationBean<JwtTokenFilter> jwtTokenFilterRegistrationBean(){
        FilterRegistrationBean<JwtTokenFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new JwtTokenFilter());
        registrationBean.addUrlPatterns("/", "/my/*", "/playlist/*");

        return registrationBean;
    }
}
