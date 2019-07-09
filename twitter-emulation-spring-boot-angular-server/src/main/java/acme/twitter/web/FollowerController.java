package acme.twitter.web;

import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
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
    private FollowerService followerService;
    private AccountService accountService;

    @Autowired
    public FollowerController(FollowerService followerService,
                              AccountService accountService) {
        this.followerService = followerService;
        this.accountService = accountService;
    }

    @GetMapping("/following/{username}")
    @ResponseBody
    public List<AccountDto> getFollowing(@PathVariable String username) {
        List<Account> accounts = followerService.findFollowingByUsername(username);

        return AccountDto.convertToDto(accounts);
    }

    @GetMapping("/followers/{username}")
    @ResponseBody
    public List<AccountDto> getFollowers(@PathVariable String username) {
        List<Account> accounts = followerService.findFollowersByUsername(username);

        return AccountDto.convertToDto(accounts);
    }

    @PostMapping("/following/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void addFollowing(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        Account whoAccount = accountService.findByUsername(principal.getName());
        Account whomAccount = accountService.findByUsername(username);

        followerService.add(whoAccount.getUsername(), whomAccount.getUsername());
    }

    @DeleteMapping("/following/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteFollowing(@PathVariable String username, Principal principal) throws AccountNotExistsException {
        Account whoAccount = accountService.findByUsername(principal.getName());
        Account whomAccount = accountService.findByUsername(username);

        followerService.delete(whoAccount.getUsername(), whomAccount.getUsername());
    }
}
