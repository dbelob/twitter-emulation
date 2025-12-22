package acme.twitter.controller;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.domain.AccountStatistics;
import acme.twitter.domain.Tweet;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import acme.twitter.service.TweetService;
import acme.twitter.web.AccountForm;
import acme.twitter.web.SearchForm;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;

/**
 * Account controller.
 */
@Controller
@RequestMapping("/account")
public class AccountController {
    private static final Logger log = LoggerFactory.getLogger(AccountController.class);

    private static final String ACCOUNT_FORM = "accountForm";
    private static final String DELETE_ACCOUNT_FORM = "deleteAccountForm";
    private static final String PROFILE_FORM = "profileForm";
    private static final String REGISTRATION_FORM = "registrationForm";
    private static final String SEARCH_FORM = "searchForm";

    private static final String FORWARD_ACCOUNT_TWEETS = "forward:/account/tweets";

    private static final String REDIRECT_ACCOUNT_PROFILE = "redirect:/account/profile";
    private static final String REDIRECT_ACCOUNT_SHOW = "redirect:/account/show";
    private static final String REDIRECT_LOGIN = "redirect:/login";
    private static final String REDIRECT_LOGOUT = "redirect:/logout";

    private static final String TITLE_ATTRIBUTE_CODE = "title";
    private static final String SEARCH_ACCOUNT_LIST_ATTRIBUTE_CODE = "searchAccountList";
    private static final String COPYRIGHT_DATE_ATTRIBUTE_CODE = "copyrightDate";

    private final AccountService accountService;
    private final TweetService tweetService;
    private final FollowerService followerService;
    private final MessageSourceAccessor messageSourceAccessor;

    @Autowired
    public AccountController(AccountService accountService, TweetService tweetService, FollowerService followerService,
                             MessageSourceAccessor messageSourceAccessor) {
        this.accountService = accountService;
        this.tweetService = tweetService;
        this.followerService = followerService;
        this.messageSourceAccessor = messageSourceAccessor;
    }

    /**
     * Shows registration form
     *
     * @param model model
     * @return view name
     */
    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute(new AccountForm());

        return REGISTRATION_FORM;
    }

    /**
     * Processes registration
     *
     * @param accountForm account form
     * @param errors      errors
     * @return view name
     */
    @PostMapping("/register")
    public String processRegistration(
            @Valid AccountForm accountForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return REGISTRATION_FORM;
        }

        try {
            accountService.add(accountForm.getUsername(), accountForm.getPassword(), accountForm.getDescription());

            return REDIRECT_LOGIN;
        } catch (AccountExistsException _) {
            errors.reject("account.exists", messageSourceAccessor.getMessage("account.exists"));

            return REGISTRATION_FORM;
        }
    }

    /**
     * Shows profile form
     *
     * @param model     model
     * @param principal principal
     * @return view name
     * @throws AccountNotExistsException if account does not exist
     */
    @GetMapping("/profile")
    public String showProfileForm(Model model, Principal principal) throws AccountNotExistsException {
        Account account = accountService.findByUsername(principal.getName());
        model.addAttribute(new AccountForm(account.getUsername(), account.getDescription()));

        return PROFILE_FORM;
    }

    /**
     * Processes profile to cancel
     *
     * @return view name
     */
    @PostMapping(value = "/profile", params = "cancel")
    public String cancelProfile() {
        return REDIRECT_ACCOUNT_SHOW;
    }

    /**
     * Processes profile to save
     *
     * @param accountForm account form
     * @param errors      errors
     * @return view name
     */
    @PostMapping(value = "/profile", params = "save")
    public String processProfile(
            @Valid AccountForm accountForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return PROFILE_FORM;
        }

        accountService.update(accountForm.getUsername(), accountForm.getPassword(), accountForm.getDescription());

        return REDIRECT_ACCOUNT_SHOW;
    }

    /**
     * Deletes account
     *
     * @return view name
     */
    @GetMapping("/delete")
    public String showDeleteAccountForm() {
        return DELETE_ACCOUNT_FORM;
    }

    /**
     * Processes deletion to cancel
     *
     * @return view name
     */
    @PostMapping(value = "/delete", params = "cancel")
    public String cancelDelete() {
        return REDIRECT_ACCOUNT_PROFILE;
    }

    /**
     * Processes deletion to delete
     *
     * @param principal principal
     * @return view name
     */
    @PostMapping(value = "/delete", params = "delete")
    public String processDelete(Principal principal) {
        accountService.delete(principal.getName());

        return REDIRECT_LOGOUT;
    }

    /**
     * Shows account form for current authenticated account
     *
     * @param principal principal
     * @return view name
     */
    @GetMapping("/show")
    public String showAccountForm(Principal principal) {
        return String.format("%s/%s", REDIRECT_ACCOUNT_SHOW, principal.getName());
    }

    /**
     * Shows account form
     *
     * @param username  username
     * @param model     model
     * @param principal principal
     * @return view name
     * @throws AccountNotExistsException if account does not exist
     */
    @GetMapping("/show/{username}")
    public String showAccountForm(
            @PathVariable String username,
            Model model,
            Principal principal) throws AccountNotExistsException {
        if (principal != null) {
            log.debug("username: {}, principal.name: {}", username, principal.getName());
        } else {
            log.debug("username: {}", username);
        }

        // Forward for unauthorized or other account
        if ((principal == null) || !username.equals(principal.getName())) {
            return String.format("%s/%s", FORWARD_ACCOUNT_TWEETS, username);
        }

        Account account = accountService.findByUsername(username);
        AccountStatistics accountStatistics = getAccountStatistics(principal.getName(), username);
        List<Tweet> tweets = tweetService.findTimelineByAccount(account);

        model.addAttribute(account);
        model.addAttribute(accountStatistics);
        model.addAttribute(tweets);
        model.addAttribute(new SearchForm());
        model.addAttribute(COPYRIGHT_DATE_ATTRIBUTE_CODE, new Date());

        return ACCOUNT_FORM;
    }

    /**
     * Processes search.
     *
     * @param searchForm search form
     * @param errors     errors
     * @param model      model
     * @param principal  principal
     * @return view name
     * @throws AccountNotExistsException if account does not exist
     */
    @PostMapping("/search")
    public String processSearch(
            @Valid SearchForm searchForm,
            Errors errors,
            Model model,
            Principal principal) throws AccountNotExistsException {
        if (errors.hasErrors()) {
            return REDIRECT_ACCOUNT_SHOW;
        }

        Account account = accountService.findByUsername(principal.getName());
        AccountStatistics accountStatistics = getAccountStatistics(principal.getName(), principal.getName());
        List<Account> accounts = accountService.findByUsernamePart(searchForm.getUsernamePart());

        model.addAttribute(account);
        model.addAttribute(accountStatistics);
        model.addAttribute(TITLE_ATTRIBUTE_CODE, "Search Result");
        model.addAttribute(SEARCH_ACCOUNT_LIST_ATTRIBUTE_CODE, accounts);
        model.addAttribute(COPYRIGHT_DATE_ATTRIBUTE_CODE, new Date());

        return SEARCH_FORM;
    }

    /**
     * Processes tweets.
     *
     * @param username  username
     * @param model     model
     * @param principal principal
     * @return view name
     * @throws AccountNotExistsException if account does not exist
     */
    @GetMapping("/tweets/{username}")
    public String processTweets(
            @PathVariable String username,
            Model model,
            Principal principal) throws AccountNotExistsException {
        Account account = accountService.findByUsername(username);
        AccountStatistics accountStatistics = getAccountStatistics(
                (principal != null) ? principal.getName() : username,
                username);
        List<Tweet> tweets = tweetService.findByAccount(account);

        model.addAttribute(account);
        model.addAttribute(accountStatistics);
        model.addAttribute(TITLE_ATTRIBUTE_CODE, "Tweets");
        model.addAttribute(tweets);
        model.addAttribute(new SearchForm());
        model.addAttribute(COPYRIGHT_DATE_ATTRIBUTE_CODE, new Date());

        return ACCOUNT_FORM;
    }

    /**
     * Processes following.
     *
     * @param username  username
     * @param model     model
     * @param principal principal
     * @return view name
     * @throws AccountNotExistsException if account does not exist
     */
    @GetMapping("/following/{username}")
    public String processFollowing(
            @PathVariable String username,
            Model model,
            Principal principal) throws AccountNotExistsException {
        Account account = accountService.findByUsername(username);
        AccountStatistics accountStatistics = getAccountStatistics(
                (principal != null) ? principal.getName() : username,
                username);
        List<Account> accounts = followerService.findFollowingByUsername(username);

        model.addAttribute(account);
        model.addAttribute(accountStatistics);
        model.addAttribute(TITLE_ATTRIBUTE_CODE, "Following");
        model.addAttribute(SEARCH_ACCOUNT_LIST_ATTRIBUTE_CODE, accounts);
        model.addAttribute(new SearchForm());
        model.addAttribute(COPYRIGHT_DATE_ATTRIBUTE_CODE, new Date());

        return SEARCH_FORM;
    }

    /**
     * Processes followers.
     *
     * @param username  username
     * @param model     model
     * @param principal principal
     * @return view name
     * @throws AccountNotExistsException if account does not exist
     */
    @GetMapping("/followers/{username}")
    public String processFollowers(
            @PathVariable String username,
            Model model,
            Principal principal) throws AccountNotExistsException {
        Account account = accountService.findByUsername(username);
        AccountStatistics accountStatistics = getAccountStatistics(
                (principal != null) ? principal.getName() : username,
                username);
        List<Account> accounts = followerService.findFollowersByUsername(username);

        model.addAttribute(account);
        model.addAttribute(accountStatistics);
        model.addAttribute(TITLE_ATTRIBUTE_CODE, "Followers");
        model.addAttribute(SEARCH_ACCOUNT_LIST_ATTRIBUTE_CODE, accounts);
        model.addAttribute(new SearchForm());
        model.addAttribute(COPYRIGHT_DATE_ATTRIBUTE_CODE, new Date());

        return SEARCH_FORM;
    }

    private AccountStatistics getAccountStatistics(String whoUsername, String whomUsername) {
        int tweetsCount = tweetService.countByUsername(whomUsername);
        int followingCount = followerService.countFollowingByUsername(whomUsername);
        int followersCount = followerService.countFollowersByUsername(whomUsername);
        boolean isFollow = followerService.isExist(whoUsername, whomUsername);

        return new AccountStatistics(tweetsCount, followingCount, followersCount, isFollow);
    }

    /**
     * Follows account
     *
     * @param username  username
     * @param principal principal
     * @return view name
     * @throws AccountNotExistsException if account does not exist
     */
    @PostMapping("/follow/{username}")
    public String processFollow(
            @PathVariable String username,
            Principal principal) throws AccountNotExistsException {
        Account whoAccount = accountService.findByUsername(principal.getName());
        Account whomAccount = accountService.findByUsername(username);

        followerService.add(whoAccount.getUsername(), whomAccount.getUsername());

        return String.format("%s/%s", REDIRECT_ACCOUNT_SHOW, username);
    }

    /**
     * Unfollows account
     *
     * @param username  username
     * @param principal principal
     * @return view name
     * @throws AccountNotExistsException if account does not exist
     */
    @PostMapping("/unfollow/{username}")
    public String processUnfollow(
            @PathVariable String username,
            Principal principal) throws AccountNotExistsException {
        Account whoAccount = accountService.findByUsername(principal.getName());
        Account whomAccount = accountService.findByUsername(username);

        followerService.delete(whoAccount.getUsername(), whomAccount.getUsername());

        return String.format("%s/%s", REDIRECT_ACCOUNT_SHOW, username);
    }

    @ExceptionHandler(AccountNotExistsException.class)
    public String handleAccountNotExistException() {
        return REDIRECT_ACCOUNT_SHOW;
    }
}
