package acme.twitter.web;

import acme.twitter.web.validation.PasswordsMatch;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Account form.
 */
@PasswordsMatch(message = "{password.difference}")
public class AccountForm {
    @NotNull
    @Size(min = 1, max = 16, message = "{username.size}")
    private String username;

    @NotNull
    @Size(min = 5, max = 25, message = "{password.size}")
    private String password;

    @NotNull
    @Size(min = 5, max = 25, message = "{passwordConfirmation.size}")
    private String passwordConfirmation;

    @Size(min = 2, max = 30, message = "{description.size}")
    private String description;

    public AccountForm() {
    }

    public AccountForm(String username, String description) {
        this.username = username;
        this.description = description;
    }

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

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
