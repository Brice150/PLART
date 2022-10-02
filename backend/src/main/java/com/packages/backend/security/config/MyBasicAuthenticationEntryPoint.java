package com.packages.backend.security.config;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;
@Component
public class MyBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {
  /**
   * Used to make customizable error messages and codes when login fails
   */
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authEx)
    throws IOException {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    PrintWriter writer = response.getWriter();
    writer.println("HTTP Status 401 - " + authEx.getMessage());
  }
  @Override
  public void afterPropertiesSet() {
    setRealmName("YOUR REALM");
    super.afterPropertiesSet();
  }
}
