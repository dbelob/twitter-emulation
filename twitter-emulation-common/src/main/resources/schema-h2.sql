CREATE TABLE account (
  account_id IDENTITY PRIMARY KEY NOT NULL,
  username VARCHAR(16) UNIQUE NOT NULL,
  password VARCHAR(25) NOT NULL,
  description VARCHAR(30) NOT NULL
);

CREATE TABLE tweet (
  tweet_id IDENTITY PRIMARY KEY NOT NULL,
  account_id BIGINT NOT NULL,
  text VARCHAR(140) NOT NULL,
  time TIMESTAMP NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE follower (
  who_account_id BIGINT NOT NULL,
  whom_account_id BIGINT NOT NULL,
  PRIMARY KEY (who_account_id, whom_account_id),
  FOREIGN KEY (who_account_id) REFERENCES account(account_id),
  FOREIGN KEY (whom_account_id) REFERENCES account(account_id),
  CHECK (who_account_id <> whom_account_id)
);
