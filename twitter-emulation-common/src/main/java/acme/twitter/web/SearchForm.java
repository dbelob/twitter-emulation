package acme.twitter.web;

import jakarta.validation.constraints.NotNull;

/**
 * Search form.
 */
public class SearchForm {
    @NotNull
    private String usernamePart;

    public String getUsernamePart() {
        return usernamePart;
    }

    public void setUsernamePart(String username) {
        this.usernamePart = username;
    }
}
