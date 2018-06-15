package acme.twitter.web;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * Search form.
 */
public class SearchForm {
    @NotNull
    @NotEmpty
    private String usernamePart;

    public String getUsernamePart() {
        return usernamePart;
    }

    public void setUsernamePart(String username) {
        this.usernamePart = username;
    }
}