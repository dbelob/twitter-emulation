CREATE TABLE account (
  account_id IDENTITY PRIMARY KEY,
  username VARCHAR(16) UNIQUE NOT NULL,
  password VARCHAR(25) NOT NULL,
  description VARCHAR(30) NOT NULL
);

CREATE TABLE tweet (
  tweet_id IDENTITY PRIMARY KEY,
  account_id BIGINT NOT NULL,
  text VARCHAR(140) NOT NULL,
  time TIMESTAMP NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account(account_id)
);