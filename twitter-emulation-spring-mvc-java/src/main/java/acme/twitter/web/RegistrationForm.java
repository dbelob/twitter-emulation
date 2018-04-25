package acme.twitter.web;

import javax.validation.constraints.NotNull;

/**
 * Registration form.
 */
public class RegistrationForm {
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String passwordConfirmation;
    private String description;

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