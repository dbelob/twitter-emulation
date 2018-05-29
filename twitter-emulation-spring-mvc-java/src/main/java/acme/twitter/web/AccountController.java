package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistException;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Account controller.
 */
@Controller
@RequestMapping("/account")
public class AccountController {
    private static final Logger log = LoggerFactory.getLogger(AccountController.class);

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

            return "redirect:/login";
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
    public String showProfileForm(@PathVariable String username, Model model) throws AccountNotExistException {
        Account account = accountDao.findByUsername(username);
        model.addAttribute(new AccountForm(account.getUsername(), account.getDescription()));
        return "profileForm";
    }

    /**
     * Processes profile to cancel
     *
     * @param username username
     * @return view name
     */
    @RequestMapping(value = "/profile/{username}", method = POST, params = "cancel")
    public String cancelProfile(@PathVariable String username) {
        return "redirect:/account/show/" + username;
    }

    /**
     * Processes profile to save
     *
     * @param accountForm account form
     * @param errors      errors
     * @return view name
     */
    @RequestMapping(value = "/profile/{username}", method = POST, params = "save")
    public String processProfile(
            @Valid AccountForm accountForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "profileForm";
        }

        accountDao.update(accountForm.getUsername(), accountForm.getPassword(), accountForm.getDescription());

        return "redirect:/account/show/" + accountForm.getUsername();
    }

    /**
     * Deletes account
     *
     * @return view name
     */
    @RequestMapping(value = "/delete/{username}", method = GET)
    public String showDeleteForm() {
        return "deleteForm";
    }

    /**
     * Processes deletion to cancel
     *
     * @param username username
     * @return view name
     */
    @RequestMapping(value = "/delete/{username}", method = POST, params = "cancel")
    public String cancelDelete(@PathVariable String username) {
        return "redirect:/account/profile/" + username;
    }

    /**
     * Processes deletion to delete
     *
     * @param username username
     * @return view name
     */
    @RequestMapping(value = "/delete/{username}", method = POST, params = "delete")
    public String processDelete(@PathVariable String username) {
        tweetDao.deleteAll(username);
        accountDao.delete(username);

        return "redirect:/logout";
    }

    /**
     * Shows account form for current authenticated account
     *
     * @param principal principal
     * @return view name
     */
    @RequestMapping(value = "/show", method = GET)
    public String showAccountForm(Principal principal) {
        return "redirect:/account/show/" + principal.getName();
    }

    /**
     * Shows account form
     *
     * @param username  username
     * @param model     model
     * @param principal principal
     * @return view name
     */
    @RequestMapping(value = "/show/{username}", method = GET)
    public String showAccountForm(@PathVariable String username, Model model, Principal principal) throws AccountNotExistException {
        if (principal != null) {
            String authenticatedUsername = principal.getName();
            log.debug("authenticatedUsername: {}, username: {}", authenticatedUsername, username);

            Account authenticatedAccount = accountDao.findByUsername(authenticatedUsername);

            model.addAttribute("authenticatedAccount", authenticatedAccount);
        } else {
            log.debug("username: {}", username);
        }

        Account account = accountDao.findByUsername(username);
        List<Tweet> tweets = tweetDao.findAllByUsername(account);

        model.addAttribute(account);
        model.addAttribute(tweets);
        model.addAttribute(new SearchForm());

        return "accountForm";
    }

    /**
     * Processes search.
     *
     * @param username   username
     * @param searchForm search form
     * @return view name
     */
    @RequestMapping(value = "/search/{username}", method = POST)
    public String processSearch(
            @PathVariable String username,
            @Valid SearchForm searchForm,
            Errors errors,
            Model model) throws AccountNotExistException {
        if (errors.hasErrors()) {
            return "redirect:/account/show/" + username;
        }

        Account account = accountDao.findByUsername(username);
        List<Account> accounts = accountDao.findByUsernamePart(searchForm.getUsernamePart());

        model.addAttribute("authenticatedAccount", account);
        model.addAttribute(account);
        model.addAttribute("searchAccountList", accounts);

        return "searchForm";
    }
}