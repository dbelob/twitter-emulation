package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistException;
import acme.twitter.dao.exception.WrongPasswordException;
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
    private AccountDao accountDao;
    private TweetDao tweetDao;
    private MessageSourceAccessor messageSourceAccessor;

    @Autowired
    public AccountController(AccountDao accountDao, TweetDao tweetDao,
                             MessageSourceAccessor messageSourceAccessor) {
        this.accountDao = accountDao;
        this.tweetDao = tweetDao;
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
            Account account = accountDao.login(loginForm.getUsername(), loginForm.getPassword());

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
        model.addAttribute(new AccountForm());
        return "registrationForm";
    }

    /**
     * Processes registration
     *
     * @param accountForm account form
     * @param errors      errors
     * @return view name
     */
    @RequestMapping(value = "/register", method = POST)
    public String processRegistration(
            @Valid AccountForm accountForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "registrationForm";
        }

        try {
            accountDao.add(accountForm.getUsername(), accountForm.getPassword(), accountForm.getDescription());

            return "redirect:/account/" + accountForm.getUsername();
        } catch (AccountExistsException e) {
            errors.reject("account.exists", messageSourceAccessor.getMessage("account.exists"));

            return "registrationForm";
        }
    }

    /**
     * Shows profile form
     *
     * @param username username
     * @param model    model
     * @return view name
     */
    @RequestMapping(value = "/profile/{username}", method = GET)
    public String showProfileForm(@PathVariable String username, Model model) {
        Account account = accountDao.findByUsername(username);
        model.addAttribute(new AccountForm(account.getUsername(), account.getDescription()));
        return "profileForm";
    }

    @RequestMapping(value = "/profile/{username}", method = POST)
    public String processProfile(
            @Valid AccountForm accountForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "profileForm";
        }

        accountDao.update(accountForm.getUsername(), accountForm.getPassword(), accountForm.getDescription());

        return "redirect:/account/" + accountForm.getUsername();
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
        Account account = accountDao.findByUsername(username);
        List<Tweet> tweets = tweetDao.findAllByUsername(account);
        model.addAttribute(account);
        model.addAttribute(tweets);

        return "mainForm";
    }
}