package acme.twitter.controller;

import acme.twitter.service.TweetService;
import acme.twitter.web.TweetForm;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

/**
 * Tweet controller.
 */
@Controller
@RequestMapping("/tweet")
public class TweetController {
    private static final String NEW_TWEET_FORM = "newTweetForm";
    private static final String REDIRECT_ACCOUNT_SHOW = "redirect:/account/show";

    private final TweetService tweetService;

    @Autowired
    public TweetController(TweetService tweetService) {
        this.tweetService = tweetService;
    }

    /**
     * Shows tweet creation form
     *
     * @param model model
     * @return view name
     */
    @GetMapping
    public String showNewTweetForm(Model model) {
        model.addAttribute(new TweetForm());

        return NEW_TWEET_FORM;
    }

    /**
     * Processes tweet creation to save
     *
     * @param tweetForm tweet form
     * @param errors    errors
     * @param principal principal
     * @return view name
     */
    @PostMapping(params = "tweet")
    public String processNewTweet(
            @Valid TweetForm tweetForm,
            Errors errors,
            Principal principal) {
        if (errors.hasErrors()) {
            return NEW_TWEET_FORM;
        }

        tweetService.add(principal.getName(), tweetForm.getText());

        return REDIRECT_ACCOUNT_SHOW;
    }

    /**
     * Processes tweet creation to cancel
     *
     * @return view name
     */
    @PostMapping(params = "cancel")
    public String cancelNewTweet() {
        return REDIRECT_ACCOUNT_SHOW;
    }
}
