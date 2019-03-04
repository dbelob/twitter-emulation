package acme.twitter.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/api")
public class AuthenticationController {
    @GetMapping("/user")
    @ResponseBody
    public Principal user(Principal user) {
        return user;
    }
}
