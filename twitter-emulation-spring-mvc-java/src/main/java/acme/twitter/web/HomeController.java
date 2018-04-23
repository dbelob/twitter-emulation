package acme.twitter.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Home controller.
 */
@Controller
@RequestMapping("/")
public class HomeController {
    @RequestMapping(value = {"", "/login"}, method = GET)
    public String home(Model model) {
        return "login";
    }
}