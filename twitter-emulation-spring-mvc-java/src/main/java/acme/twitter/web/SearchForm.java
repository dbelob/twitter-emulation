package acme.twitter.web;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * Search form.
 */
public class SearchForm {
    @NotNull
    @NotEmpty
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}