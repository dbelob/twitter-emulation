package acme.twitter.web;

import acme.twitter.data.AccountRepository;
import acme.twitter.data.TweetRepository;
import acme.twitter.data.exception.AccountExistsException;
import acme.twitter.data.exception.AccountNotExistException;
import acme.twitter.data.exception.WrongPasswordException;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
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
    private MessageSourceAccessor messageSourceAccessor;

    @Autowired
    public AccountController(AccountRepository accountRepository, TweetRepository tweetRepository,
                             MessageSourceAccessor messageSourceAccessor) {
        this.accountRepository = accountRepository;
        this.tweetRepository = tweetRepository;
        this.messageSourceAccessor = messageSourceAccessor;
    }

    /**
     * Shows login form
     *
     * @param model model
     * @return view name
     */
    @RequestMapping(value = {"/login"}, method = GET)
    public String showLoginForm(Model model) {
        model.addAttribute(new LoginForm());
        return "loginForm";
    }

    /**
     * Processes login
     *
     * @param loginForm login form
     * @param errors    errors
     * @return view name
     */
    @RequestMapping(value = "/login", method = POST)
    public String processLogin(
            @Valid LoginForm loginForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "loginForm";
        }

        try {
            Account account = accountRepository.login(loginForm.getUsername(), loginForm.getPassword());

            return "redirect:/account/" + account.getUsername();
        } catch (AccountNotExistException e) {
            errors.reject("account.notexist", messageSourceAccessor.getMessage("account.notexist"));

            return "loginForm";
        } catch (WrongPasswordException e) {
            errors.reject("account.wrongpassword", messageSourceAccessor.getMessage("account.wrongpassword"));

            return "loginForm";
        }
    }

    /**
     * Shows registration form
     *
     * @param model model
     * @return view name
     */
    @RequestMapping(value = "/register", method = GET)
    public String showRegistrationForm(Model model) {
        model.addAttribute(new RegistrationForm());
        return "registrationForm";
    }

    /**
     * Processes registration
     *
     * @param registrationForm registration form
     * @param errors           errors
     * @return view name
     */
    @RequestMapping(value = "/register", method = POST)
    public String processRegistration(
            @Valid RegistrationForm registrationForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "registrationForm";
        }

        try {
            Account account = new Account(registrationForm.getUsername(), registrationForm.getPassword(), registrationForm.getDescription());
            account = accountRepository.save(account);

            return "redirect:/account/" + account.getUsername();
        } catch (AccountExistsException e) {
            errors.reject("account.exists", messageSourceAccessor.getMessage("account.exists"));

            return "registrationForm";
        }
    }

    /**
     * Shows main form
     *
     * @param username username
     * @param model    model
     * @return view name
     */
    @RequestMapping(value = "/{username}", method = GET)
    public String showMainForm(@PathVariable String username, Model model) {
        Account account = accountRepository.findByUsername(username);
        List<Tweet> tweets = tweetRepository.findAllByUsername(account);
        model.addAttribute(account);
        model.addAttribute(tweets);

        return "mainForm";
    }
}