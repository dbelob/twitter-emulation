package acme.twitter.web;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * Login form.
 */
public class LoginForm {
    @NotNull
    @NotEmpty(message = "{username.empty}")
    private String username;

    @NotNull
    @NotEmpty(message = "{password.empty}")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}