package acme.twitter.controller;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotAllowedException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import acme.twitter.dto.AccountStatisticsDto;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import acme.twitter.service.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * Account controller.
 */
@RestController
@RequestMapping("/api/account")
public class AccountController {
    private final AccountService accountService;
    private final TweetService tweetService;
    private final FollowerService followerService;

    @Autowired
    public AccountController(AccountService accountService, TweetService tweetService, FollowerService followerService) {
        this.accountService = accountService;
        this.tweetService = tweetService;
        this.followerService = followerService;
    }

    @GetMapping("/accounts/{username}")
    public AccountDto getAccount(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        Account account = accountService.findByUsername(username);
        String password = ((principal != null) && username.equals(principal.getName())) ? account.getPassword() : null;

        return new AccountDto(account.getUsername(), password, account.getDescription());
    }

    @PostMapping("/accounts")
    @ResponseStatus(HttpStatus.OK)
    public void addAccount(@RequestBody AccountDto account) throws AccountExistsException {
        accountService.add(account.getUsername(), account.getPassword(), account.getDescription());
    }

    @PutMapping("/accounts/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void replaceAccount(@PathVariable String username, @RequestBody AccountDto account, Principal principal)
            throws AccountNotAllowedException {
        if (!username.equals(account.getUsername()) || !username.equals(principal.getName())) {
            throw new AccountNotAllowedException();
        }

        accountService.update(account.getUsername(), account.getPassword(), account.getDescription());
    }

    @DeleteMapping("/accounts/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAccount(@PathVariable String username, Principal principal) throws AccountNotAllowedException {
        if (!username.equals(principal.getName())) {
            throw new AccountNotAllowedException();
        }

        accountService.delete(username);
    }

    @GetMapping("/accounts")
    public List<AccountDto> getAccounts(@RequestParam(required = false) String usernamePart) {
        List<Account> accounts = accountService.findByUsernamePart(usernamePart);

        return AccountDto.convertToDto(accounts);
    }

    @GetMapping("/statistics/{username}")
    public AccountStatisticsDto getStatistics(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        String whoUsername = (principal != null) ? principal.getName() : username;
        String whomUsername = username;

        Account account = accountService.findByUsername(whomUsername);
        int tweetsCount = tweetService.countByUsername(whomUsername);
        int followingCount = followerService.countFollowingByUsername(whomUsername);
        int followersCount = followerService.countFollowersByUsername(whomUsername);
        boolean isFollow = followerService.isExist(whoUsername, whomUsername);

        return new AccountStatisticsDto(account.getUsername(), account.getDescription(), tweetsCount, followingCount, followersCount, isFollow);
    }
}
