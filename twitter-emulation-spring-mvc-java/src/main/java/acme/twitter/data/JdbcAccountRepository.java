package acme.twitter.data;

import acme.twitter.domain.Account;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class JdbcAccountRepository implements AccountRepository {
    //TODO: delete
    private Map<String, Account> accounts = new HashMap<>();

    public JdbcAccountRepository() {
        Account account = new Account("jsmith", "password", "John Smith");

        accounts.put(account.getUsername(), account);
    }

    @Override
    public Account save(Account account) {
        //TODO: implement
        accounts.put(account.getUsername(), account);

        return account;
    }

    @Override
    public Account findByUsername(String username) {
        //TODO: implement
        return accounts.get(username);
    }
}