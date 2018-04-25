package acme.twitter.data;

import acme.twitter.domain.Account;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcAccountRepository implements AccountRepository {
    @Override
    public Account save(Account account) {
        //TODO: implement
        return account;
    }
}