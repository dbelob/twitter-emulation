package acme.twitter.dto;

import acme.twitter.domain.AbstractAccount;
import acme.twitter.domain.Account;

import java.util.List;

/**
 * Account DTO.
 */
public class AccountDto extends AbstractAccount {
    public AccountDto() {
        super(null, null, null);
    }

    public AccountDto(String username, String password, String description) {
        super(username, password, description);
    }

    public AccountDto(String username, String description) {
        super(username, null, description);
    }

    public static List<AccountDto> convertToDto(List<Account> accounts) {
        return accounts.stream()
                .map(a -> new AccountDto(a.getUsername(), a.getDescription()))
                .toList();
    }
}
