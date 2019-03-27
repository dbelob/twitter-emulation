package acme.twitter.dto;

import acme.twitter.domain.Account;

import java.util.List;
import java.util.stream.Collectors;

public class AccountDto {
    private String username;
    private String password;
    private String description;

    public AccountDto() {
    }

    public AccountDto(String username, String password, String description) {
        this.username = username;
        this.password = password;
        this.description = description;
    }

    public AccountDto(String username, String description) {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static List<AccountDto> convertToDto(List<Account> accounts) {
        return accounts.stream()
                .map(a -> new AccountDto(a.getUsername(), a.getDescription()))
                .collect(Collectors.toList());
    }
}
