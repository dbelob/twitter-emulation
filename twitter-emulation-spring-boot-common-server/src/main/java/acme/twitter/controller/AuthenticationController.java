package acme.twitter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {
    /**
     * Returns user information.
     *
     * @param principal principal
     * @return user information
     */
    @GetMapping("/user")
    public Principal getUser(Principal principal) {
        return principal;
    }
}
