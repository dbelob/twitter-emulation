package acme.twitter.dto;

import acme.twitter.domain.Tweet;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Tweet DTO.
 */
public class TweetDto {
    private String username;
    private String description;
    private String text;
    private Date date;

    public TweetDto(String username, String description, String text, Date date) {
        this.username = username;
        this.description = description;
        this.text = text;
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public String getDescription() {
        return description;
    }

    public String getText() {
        return text;
    }

    public Date getDate() {
        return date;
    }

    public static List<TweetDto> convertToDto(List<Tweet> tweets) {
        return tweets.stream()
                .map(t -> new TweetDto(
                        t.getAccount().getUsername(),
                        t.getAccount().getDescription(),
                        t.getText(),
                        t.getDate()))
                .collect(Collectors.toList());
    }
}
