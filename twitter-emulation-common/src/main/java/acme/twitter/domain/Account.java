package acme.twitter.domain;

/**
 * Account.
 */
public class Account extends AbstractAccount {
    private long id;

    public Account(long id, String username, String password, String description) {
        super(username, password, description);

        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
