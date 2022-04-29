package acme.twitter.domain;

/**
 * Account.
 */
public class Account extends AbstractAccount {
    public Account(long id, String username, String password, String description) {
        super(id, username, password, description);
    }

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
