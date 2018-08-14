INSERT INTO account (username, password, description) VALUES ('jsmith', 'password', 'John Smith');
INSERT INTO account (username, password, description) VALUES ('jdoe', 'password', 'John Doe');
INSERT INTO account (username, password, description) VALUES ('rroe', 'password', 'Richard Roe');

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.',
            SYSDATE
        FROM account
        WHERE username = 'jsmith';
