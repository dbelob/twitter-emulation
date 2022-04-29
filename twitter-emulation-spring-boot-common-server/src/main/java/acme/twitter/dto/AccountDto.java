package acme.twitter.dto;

import acme.twitter.domain.AbstractAccount;
import acme.twitter.domain.Account;

import java.util.List;

/**
 * Account DTO.
 */
public class AccountDto extends AbstractAccount {
    public AccountDto() {
        super(0, null, null, null);
    }

    public AccountDto(long id, String username, String password, String description) {
        super(id, username, password, description);
    }

    public AccountDto(long id, String username, String description) {
        super(id, username, null, description);
    }

    public static List<AccountDto> convertToDto(List<Account> accounts) {
        return accounts.stream()
                .map(a -> new AccountDto(a.getId(), a.getUsername(), a.getDescription()))
                .toList();
    }
}
