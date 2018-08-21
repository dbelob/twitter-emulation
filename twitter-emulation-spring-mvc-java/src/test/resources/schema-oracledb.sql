CREATE SEQUENCE account_seq MINVALUE 1 INCREMENT BY 1;
CREATE SEQUENCE tweet_seq MINVALUE 1 INCREMENT BY 1;

CREATE TABLE account (
  account_id NUMBER NOT NULL,
  username VARCHAR2(16) NOT NULL,
  password VARCHAR2(25) NOT NULL,
  description VARCHAR2(30) NOT NULL,
  CONSTRAINT account_pk PRIMARY KEY (account_id),
  CONSTRAINT account_uk UNIQUE (username)
);

CREATE TABLE tweet (
  tweet_id NUMBER NOT NULL,
  account_id NUMBER NOT NULL,
  text VARCHAR(140) NOT NULL,
  time TIMESTAMP NOT NULL,
  CONSTRAINT twitter_pk PRIMARY KEY (tweet_id),
  CONSTRAINT twitter_account_fk FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE follower (
  who_account_id NUMBER NOT NULL,
  whom_account_id NUMBER NOT NULL,
  CONSTRAINT follower_pk PRIMARY KEY (who_account_id, whom_account_id),
  CONSTRAINT follower_who_account_fk FOREIGN KEY (who_account_id) REFERENCES account(account_id),
  CONSTRAINT follower_whom_account_fk FOREIGN KEY (whom_account_id) REFERENCES account(account_id),
  CONSTRAINT follower_account_id_chk CHECK (who_account_id <> whom_account_id)
);

CREATE OR REPLACE TRIGGER account_bi BEFORE INSERT ON account FOR EACH ROW
BEGIN
  IF NVL(:new.account_id, 0) = 0 THEN
    :new.account_id := account_seq.NEXTVAL;
  END IF;
END;

CREATE OR REPLACE TRIGGER tweet_bi BEFORE INSERT ON tweet FOR EACH ROW
BEGIN
  IF NVL(:new.tweet_id, 0) = 0 THEN
    :new.tweet_id := tweet_seq.NEXTVAL;
  END IF;
END;
