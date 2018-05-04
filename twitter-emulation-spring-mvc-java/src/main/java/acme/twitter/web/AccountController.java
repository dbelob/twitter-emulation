package acme.twitter.web;

import acme.twitter.data.AccountRepository;
import acme.twitter.data.TweetRepository;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Account controller.
 */
@Controller
@RequestMapping("/account")
public class AccountController {
    private AccountRepository accountRepository;
    private TweetRepository tweetRepository;

    @Autowired
    public AccountController(AccountRepository accountRepository, TweetRepository tweetRepository) {
        this.accountRepository = accountRepository;
        this.tweetRepository = tweetRepository;
    }

    @RequestMapping(value = {"/login"}, method = GET)
    public String showLoginForm(Model model) {
        model.addAttribute(new LoginForm());
        return "loginForm";
    }

    @RequestMapping(value = "/login", method = POST)
    public String processLogin(
            @Valid LoginForm loginForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "loginForm";
        }

        Account account = accountRepository.findByUsername(loginForm.getUsername());

        return "redirect:/account/" + account.getUsername();
    }

    @RequestMapping(value = "/register", method = GET)
    public String showRegistrationForm(Model model) {
        model.addAttribute(new RegistrationForm());
        return "registrationForm";
    }

    @RequestMapping(value = "/register", method = POST)
    public String processRegistration(
            @Valid RegistrationForm registrationForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "registrationForm";
        }

        Account account = new Account(registrationForm.getUsername(), registrationForm.getPassword(), registrationForm.getDescription());
        accountRepository.save(account);

        return "redirect:/account/" + account.getUsername();
    }

    @RequestMapping(value = "/{username}", method = GET)
    public String showMainForm(@PathVariable String username, Model model) {
        Account account = accountRepository.findByUsername(username);
        List<Tweet> tweets = tweetRepository.findAllByUsername(account);
        model.addAttribute(account);
        model.addAttribute(tweets);

        return "mainForm";
    }
}