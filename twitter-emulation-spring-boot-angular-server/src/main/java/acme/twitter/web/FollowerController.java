package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.FollowerDao;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * Follower controller.
 */
@Controller
@RequestMapping("/api/follower")
public class FollowerController {
    private AccountDao accountDao;
    private FollowerDao followerDao;

    @Autowired
    public FollowerController(AccountDao accountDao, FollowerDao followerDao) {
        this.accountDao = accountDao;
        this.followerDao = followerDao;
    }

    @GetMapping("/following/{username}")
    @ResponseBody
    public List<AccountDto> getFollowing(@PathVariable String username) {
        List<Account> accounts = followerDao.findFollowingByUsername(username);

        return AccountDto.convertToDto(accounts);
    }

    @GetMapping("/followers/{username}")
    @ResponseBody
    public List<AccountDto> getFollowers(@PathVariable String username) {
        List<Account> accounts = followerDao.findFollowersByUsername(username);

        return AccountDto.convertToDto(accounts);
    }

    @PostMapping("/following/{username}")
    public ResponseEntity<Void> addFollowing(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        Account whoAccount = accountDao.findByUsername(principal.getName());
        Account whomAccount = accountDao.findByUsername(username);

        followerDao.add(whoAccount.getUsername(), whomAccount.getUsername());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/following/{username}")
    public ResponseEntity<Void> deleteFollowing(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        Account whoAccount = accountDao.findByUsername(principal.getName());
        Account whomAccount = accountDao.findByUsername(username);

        followerDao.delete(whoAccount.getUsername(), whomAccount.getUsername());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
