package acme.twitter.dto;

import acme.twitter.domain.Tweet;

import java.util.Date;
import java.util.List;

/**
 * Tweet DTO.
 */
public record TweetDto(String username, String description, String text, Date date) {
    public static List<TweetDto> convertToDto(List<Tweet> tweets) {
        return tweets.stream()
                .map(t -> new TweetDto(
                        t.getAccount().getUsername(),
                        t.getAccount().getDescription(),
                        t.getText(),
                        t.getDate()))
                .toList();
    }
}
