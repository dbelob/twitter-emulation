package acme.twitter.dto;

import java.util.Date;

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
}
