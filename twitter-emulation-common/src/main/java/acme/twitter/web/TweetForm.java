package acme.twitter.web;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

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
