package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.FollowerDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotAllowedException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import acme.twitter.dto.AccountStatisticsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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

    @GetMapping("/accounts/{username}")
    @ResponseBody
    public AccountDto getAccount(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        Account account = accountDao.findByUsername(username);
        String password = ((principal != null) && username.equals(principal.getName())) ? account.getPassword() : null;

        return new AccountDto(account.getUsername(), password, account.getDescription());
    }

    @PostMapping("/accounts")
    @ResponseStatus(HttpStatus.OK)
    public void addAccount(@RequestBody AccountDto account) throws AccountExistsException {
        accountDao.add(account.getUsername(), account.getPassword(), account.getDescription());
    }

    @PutMapping("/accounts/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void replaceAccount(@PathVariable String username, @RequestBody AccountDto account, Principal principal)
            throws AccountNotAllowedException {
        if (!username.equals(account.getUsername()) || !username.equals(principal.getName())) {
            throw new AccountNotAllowedException();
        }

        accountDao.update(account.getUsername(), account.getPassword(), account.getDescription());
    }

    @DeleteMapping("/accounts/{username}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public void deleteAccount(@PathVariable String username, Principal principal) throws AccountNotAllowedException {
        if (!username.equals(principal.getName())) {
            throw new AccountNotAllowedException();
        }

        tweetDao.deleteAll(username);
        followerDao.deleteAll(username);
        accountDao.delete(username);
    }

    @GetMapping("/accounts")
    @ResponseBody
    public List<AccountDto> getAccounts(@RequestParam(required = false) String usernamePart) {
        List<Account> accounts = accountDao.findByUsernamePart(usernamePart);

        return AccountDto.convertToDto(accounts);
    }

    @GetMapping("/statistics/{username}")
    @ResponseBody
    public AccountStatisticsDto getStatistics(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        String whoUsername = (principal != null) ? principal.getName() : username;
        String whomUsername = username;

        Account account = accountDao.findByUsername(whomUsername);
        int tweetsCount = tweetDao.countByUsername(whomUsername);
        int followingCount = followerDao.countFollowingByUsername(whomUsername);
        int followersCount = followerDao.countFollowersByUsername(whomUsername);
        boolean isFollow = followerDao.isExist(whoUsername, whomUsername);

        return new AccountStatisticsDto(account.getUsername(), account.getDescription(), tweetsCount, followingCount, followersCount, isFollow);
    }
}
