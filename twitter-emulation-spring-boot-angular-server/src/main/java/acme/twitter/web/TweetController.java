package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import acme.twitter.dto.TweetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * Tweet controller.
 */
@Controller
@RequestMapping("/api/tweet")
public class TweetController {
    private AccountDao accountDao;
    private TweetDao tweetDao;

    @Autowired
    public TweetController(AccountDao accountDao, TweetDao tweetDao) {
        this.accountDao = accountDao;
        this.tweetDao = tweetDao;
    }

    @GetMapping("/tweets/{username}")
    @ResponseBody
    public List<TweetDto> getTweets(@PathVariable String username) throws AccountNotExistsException {
        Account account = accountDao.findByUsername(username);
        List<Tweet> tweets = tweetDao.findByAccount(account);

        return TweetDto.convertToDto(tweets);
    }

    @PostMapping("/tweets")
    public ResponseEntity<Void> addTweet(@RequestBody String text, Principal principal) {
        tweetDao.add(principal.getName(), text);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/timeline")
    @ResponseBody
    private List<TweetDto> getTimeline(Principal principal) throws AccountNotExistsException {
        Account account = accountDao.findByUsername(principal.getName());
        List<Tweet> tweets = tweetDao.findTimelineByAccount(account);

        return TweetDto.convertToDto(tweets);
    }
}
