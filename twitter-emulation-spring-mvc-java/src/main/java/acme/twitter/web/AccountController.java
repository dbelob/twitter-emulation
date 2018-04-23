package acme.twitter.web;

import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Account controller.
 */
@Controller
@RequestMapping("/")
public class AccountController {
    @RequestMapping(value = "/register", method = GET)
    public String showRegistrationForm() {
        return "registration";
    }

    @RequestMapping(value = "/register", method = POST)
    public String processRegistration(
            @Valid RegistrationForm registrationForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "registration";
        }

        //TODO: save account

        //TODO: change to main page redirection
        return "redirect:/login";
    }
}