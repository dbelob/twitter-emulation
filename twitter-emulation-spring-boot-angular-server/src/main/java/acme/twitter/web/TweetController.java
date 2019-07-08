package acme.twitter.web;

import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import acme.twitter.dto.TweetDto;
import acme.twitter.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    //TODO: delete
    private TweetDao tweetDao;

    private AccountService accountService;

    @Autowired
    public TweetController(TweetDao tweetDao,
                           AccountService accountService) {
        this.tweetDao = tweetDao;

        this.accountService = accountService;
    }

    @GetMapping("/tweets/{username}")
    @ResponseBody
    public List<TweetDto> getTweets(@PathVariable String username) throws AccountNotExistsException {
        Account account = accountService.findByUsername(username);
        List<Tweet> tweets = tweetDao.findByAccount(account);

        return TweetDto.convertToDto(tweets);
    }

    @PostMapping("/tweets")
    @ResponseStatus(HttpStatus.OK)
    public void addTweet(@RequestBody String text, Principal principal) {
        tweetDao.add(principal.getName(), text);
    }

    @GetMapping("/timeline")
    @ResponseBody
    private List<TweetDto> getTimeline(Principal principal) throws AccountNotExistsException {
        Account account = accountService.findByUsername(principal.getName());
        List<Tweet> tweets = tweetDao.findTimelineByAccount(account);

        return TweetDto.convertToDto(tweets);
    }
}
