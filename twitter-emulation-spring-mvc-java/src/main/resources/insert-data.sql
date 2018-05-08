INSERT INTO account (username, password, description) VALUES ('jsmith', 'password', 'John Smith');

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.', SYSDATE FROM account WHERE username = 'jsmith';

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.', DATEADD(SECOND, -(1 * 60 * 60 + 30 * 60 + 34), SYSDATE) FROM account WHERE username = 'jsmith';

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.', DATEADD(SECOND, -(5 * 60 * 60 + 27 * 60 + 12), SYSDATE) FROM account WHERE username = 'jsmith';

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.', DATEADD(SECOND, -(5 * 60 * 60 + 27 * 60 + 14), SYSDATE) FROM account WHERE username = 'jsmith';

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.', DATEADD(SECOND, -(1 * 24 * 60 * 60 + 7 * 60 * 60 + 45 * 60 + 12), SYSDATE) FROM account WHERE username = 'jsmith';

INSERT INTO tweet (account_id, text, time)
    SELECT account_id, 'At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.', DATEADD(SECOND, -(6 * 24 * 60 * 60 + 16 * 60 * 60 + 54 * 60 + 56), SYSDATE) FROM account WHERE username = 'jsmith';
