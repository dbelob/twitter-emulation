package acme.twitter.web;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LoginForm {
    @NotNull
    @Size(min = 1, message = "{login.username.size}")
    private String username;

    @NotNull
    @Size(min = 1, message = "{login.password.size}")
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