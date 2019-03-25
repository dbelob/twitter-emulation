package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.FollowerDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.domain.AccountStatistics;
import acme.twitter.dto.AccountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Account controller.
 */
@Controller
@RequestMapping("/api/account")
public class AccountController {
    private AccountDao accountDao;
    private TweetDao tweetDao;
    private FollowerDao followerDao;

    @Autowired
    public AccountController(AccountDao accountDao, TweetDao tweetDao, FollowerDao followerDao) {
        this.accountDao = accountDao;
        this.tweetDao = tweetDao;
        this.followerDao = followerDao;
    }

    /**
     * Processes registration.
     *
     * @param account account
     */
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody AccountDto account) throws AccountExistsException {
        accountDao.add(account.getUsername(), account.getPassword(), account.getDescription());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/profile")
    @ResponseBody
    public AccountDto profile(Principal principal) throws AccountNotExistsException {
        Account account = accountDao.findByUsername(principal.getName());

        return new AccountDto(account.getUsername(), account.getPassword(), account.getDescription());
    }

    @PostMapping("/profile")
    public ResponseEntity<Void> profile(@RequestBody AccountDto account) {
        accountDao.update(account.getUsername(), account.getPassword(), account.getDescription());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> delete(Principal principal) {
        tweetDao.deleteAll(principal.getName());
        accountDao.delete(principal.getName());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/statistics/{username}")
    @ResponseBody
    public AccountStatistics getAccountStatistics(@PathVariable String username, Principal principal) {
        String whoUsername = (principal != null) ? principal.getName() : username;
        String whomUsername = username;

        int tweetsCount = tweetDao.countByUsername(whomUsername);
        int followingCount = followerDao.countFollowingByUsername(whomUsername);
        int followersCount = followerDao.countFollowersByUsername(whomUsername);
        boolean isFollow = followerDao.isExist(whoUsername, whomUsername);

        return new AccountStatistics(tweetsCount, followingCount, followersCount, isFollow);
    }

    @GetMapping("/following/{username}")
    @ResponseBody
    public List<AccountDto> following(@PathVariable String username) {
        List<Account> accounts = followerDao.findFollowingByUsername(username);

        return convertToDto(accounts);
    }

    @GetMapping("/followers/{username}")
    @ResponseBody
    public List<AccountDto> followers(@PathVariable String username) {
        List<Account> accounts = followerDao.findFollowersByUsername(username);

        return convertToDto(accounts);
    }

    private List<AccountDto> convertToDto(List<Account> accounts) {
        return accounts.stream()
                .map(a -> new AccountDto(a.getUsername(), a.getDescription()))
                .collect(Collectors.toList());
    }
}
