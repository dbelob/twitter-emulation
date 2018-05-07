create table Account (
  id identity,
  username varchar(16) unique not null,
  password varchar(25) not null,
  description varchar(30) not null
);

create table Tweet (
  id identity,
  text varchar(140) not null,
  time timestamp not null
);