package acme.twitter.web;

import acme.twitter.dao.FollowerDao;
import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Follower controller.
 */
@Controller
@RequestMapping("/api/follower")
public class FollowerController {
    private FollowerDao followerDao;

    @Autowired
    public FollowerController(FollowerDao followerDao) {
        this.followerDao = followerDao;
    }

    @GetMapping("/following/{username}")
    @ResponseBody
    public List<AccountDto> following(@PathVariable String username) {
        List<Account> accounts = followerDao.findFollowingByUsername(username);

        return AccountDto.convertToDto(accounts);
    }

    @GetMapping("/followers/{username}")
    @ResponseBody
    public List<AccountDto> followers(@PathVariable String username) {
        List<Account> accounts = followerDao.findFollowersByUsername(username);

        return AccountDto.convertToDto(accounts);
    }
}
