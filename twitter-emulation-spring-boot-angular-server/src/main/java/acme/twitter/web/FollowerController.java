package acme.twitter.web;

import acme.twitter.dao.FollowerDao;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import acme.twitter.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    //TODO: delete
    private FollowerDao followerDao;

    private AccountService accountService;

    @Autowired
    public FollowerController(FollowerDao followerDao,
                              AccountService accountService) {
        this.followerDao = followerDao;

        this.accountService = accountService;
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
    @ResponseStatus(HttpStatus.OK)
    public void addFollowing(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        Account whoAccount = accountService.findByUsername(principal.getName());
        Account whomAccount = accountService.findByUsername(username);

        followerDao.add(whoAccount.getUsername(), whomAccount.getUsername());
    }

    @DeleteMapping("/following/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteFollowing(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        Account whoAccount = accountService.findByUsername(principal.getName());
        Account whomAccount = accountService.findByUsername(username);

        followerDao.delete(whoAccount.getUsername(), whomAccount.getUsername());
    }
}
