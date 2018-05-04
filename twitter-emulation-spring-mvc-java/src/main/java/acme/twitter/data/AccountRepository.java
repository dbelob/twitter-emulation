package acme.twitter.data;

import acme.twitter.domain.Account;

/**
 * Account repository.
 */
public interface AccountRepository {
    Account save(Account account);

    Account findByUsername(String username);

    boolean isAccountExists(String username);
}