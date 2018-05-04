package acme.twitter.web;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Registration form.
 */
public class RegistrationForm {
    @NotNull
    @Size(min = 1, max = 16, message = "{registration.username.size}")
    private String username;

    @NotNull
    @Size(min = 5, max = 25, message = "{registration.password.size}")
    private String password;

    @NotNull
    @Size(min = 5, max = 25, message = "{registration.passwordConfirmation.size}")
    private String passwordConfirmation;

    @Size(min = 2, max = 30, message = "{registration.description.size}")
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