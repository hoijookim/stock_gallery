create table corpcode(
	stock_code varchar2(6) primary key,
	corp_name varchar2(50 char) not null,
	corp_code varchar2(8) not null
);

select * from corpcode;

select count(*) from corpcode;

drop table corpcode cascade constraint purge;