package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import acme.twitter.dto.TweetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/timeline")
    @ResponseBody
    private List<TweetDto> getTimeline(Principal principal) throws AccountNotExistsException {
        if (principal != null) {
            Account account = accountDao.findByUsername(principal.getName());
            List<Tweet> tweets = tweetDao.findTimelineByAccount(account);

            return tweets.stream()
                    .map(t -> new TweetDto(
                            t.getAccount().getUsername(),
                            t.getAccount().getDescription(),
                            t.getText(),
                            t.getDate()))
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }
}
