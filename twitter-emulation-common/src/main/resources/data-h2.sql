INSERT INTO account (username, password, description) VALUES ('jsmith', 'password', 'John Smith');
INSERT INTO account (username, password, description) VALUES ('jdoe', 'password', 'John Doe');
INSERT INTO account (username, password, description) VALUES ('rroe', 'password', 'Richard Roe');
INSERT INTO account (username, password, description) VALUES ('alone', 'password', 'John Alone');

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.',
            CURRENT_TIMESTAMP
        FROM account
        WHERE username = 'jsmith';
INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.',
            DATEADD(HOUR, -1, DATEADD(MINUTE, -30, DATEADD(SECOND, -34, CURRENT_TIMESTAMP)))
        FROM account
        WHERE username = 'jsmith';
INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.',
            DATEADD(HOUR, -5, DATEADD(MINUTE, -27, DATEADD(SECOND, -12, CURRENT_TIMESTAMP)))
        FROM account
        WHERE username = 'jsmith';
INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.',
            DATEADD(HOUR, -5, DATEADD(MINUTE, -27, DATEADD(SECOND, -14, CURRENT_TIMESTAMP)))
        FROM account
        WHERE username = 'jsmith';
INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.',
            DATEADD(DAY, -1, DATEADD(HOUR, -7, DATEADD(MINUTE, -45, DATEADD(SECOND, -12, CURRENT_TIMESTAMP))))
        FROM account
        WHERE username = 'jsmith';
INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.',
            DATEADD(DAY, -6, DATEADD(HOUR, -16, DATEADD(MINUTE, -54, DATEADD(SECOND, -56, CURRENT_TIMESTAMP))))
        FROM account
        WHERE username = 'jsmith';

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Some people care too much. I think it''s called love.',
            CURRENT_TIMESTAMP
        FROM account
        WHERE username = 'jdoe';
INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'You can''t stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.',
            DATEADD(HOUR, -1, DATEADD(MINUTE, -30, DATEADD(SECOND, -34, CURRENT_TIMESTAMP)))
        FROM account
        WHERE username = 'jdoe';
INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'It is more fun to talk with someone who doesn''t use long, difficult words but rather short, easy words like "What about lunch?"',
            DATEADD(HOUR, -5, DATEADD(MINUTE, -27, DATEADD(SECOND, -12, CURRENT_TIMESTAMP)))
        FROM account
        WHERE username = 'jdoe';

INSERT INTO follower (who_account_id, whom_account_id)
    SELECT a1.account_id, a2.account_id
        FROM account a1, account a2
        WHERE a1.username = 'jsmith'
          AND a2.username = 'jdoe';
INSERT INTO follower (who_account_id, whom_account_id)
    SELECT a1.account_id, a2.account_id
        FROM account a1, account a2
        WHERE a1.username = 'jsmith'
          AND a2.username = 'rroe';
INSERT INTO follower (who_account_id, whom_account_id)
    SELECT a1.account_id, a2.account_id
        FROM account a1, account a2
        WHERE a1.username = 'jdoe'
          AND a2.username = 'jsmith';
