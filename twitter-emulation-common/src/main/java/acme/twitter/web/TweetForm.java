package acme.twitter.web;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Tweet form.
 */
public class TweetForm {
    @NotNull
    @Size(min = 1, max = 140, message = "{tweet.size}")
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}