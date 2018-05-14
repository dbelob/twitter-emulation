package acme.twitter.web;

import acme.twitter.dao.TweetDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Tweet controller.
 */
@Controller
@RequestMapping("/tweet")
public class TweetController {
    private TweetDao tweetDao;

    @Autowired
    public TweetController(TweetDao tweetDao) {
        this.tweetDao = tweetDao;
    }

    /**
     * Shows tweet creation form
     *
     * @param model model
     * @return view name
     */
    @RequestMapping(value = "/{username}", method = GET)
    public String showNewTweetForm(Model model) {
        model.addAttribute(new TweetForm());
        return "newTweetForm";
    }

    /**
     * Processes tweet creation to cancel
     *
     * @param username username
     * @return view name
     */
    @RequestMapping(value = "/{username}", method = POST, params = "cancel")
    public String cancelNewTweet(@PathVariable String username) {
        return "redirect:/account/" + username;
    }

    /**
     * Processes tweet creation to save
     *
     * @param tweetForm tweet form
     * @param errors    errors
     * @return view name
     */
    @RequestMapping(value = "/{username}", method = POST, params = "tweet")
    public String processNewTweet(
            @PathVariable String username,
            @Valid TweetForm tweetForm,
            Errors errors) {
        if (errors.hasErrors()) {
            return "newTweetForm";
        }

        tweetDao.add(username, tweetForm.getText());

        return "redirect:/account/" + username;
    }
}