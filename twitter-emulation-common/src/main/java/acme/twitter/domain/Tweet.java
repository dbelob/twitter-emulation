package acme.twitter.domain;

import java.util.Date;

/**
 * Tweet.
 */
public class Tweet {
    private Account account;
    private String text;
    private Date date;

    public Tweet(Account account, String text, Date date) {
        this.account = account;
        this.text = text;
        this.date = date;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}