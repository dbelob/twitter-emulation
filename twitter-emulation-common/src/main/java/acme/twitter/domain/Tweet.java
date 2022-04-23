package acme.twitter.domain;

import java.util.Date;

/**
 * Tweet.
 */
public class Tweet {
    private long id;
    private Account account;
    private String text;
    private Date date;

    public Tweet(long id, Account account, String text, Date date) {
        this.id = id;
        this.account = account;
        this.text = text;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
