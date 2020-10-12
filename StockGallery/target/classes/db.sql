select * from corpcode;
select * from corpcode where stock_code = '035720';
select * from KOSPICODE where ks_name = '신성이엔지';
select count(*) from kospicode;
select * from corpcode order by stock_code;

create table stockprice(
	sp_date date not null,
	sp_code char(6 char) not null,
	sp_endprice varchar2(10 char) not null,
	sp_startprice varchar2(10 char) not null,
	sp_highprice varchar2(10 char) not null,
	sp_lowprice varchar2(10 char) not null,
	sp_amount varchar2(20 char) not null
);

insert into corpcode values('000000', 'KOSPI', '00000000');

select * from s_005930 order by s_date;

create table s_gallery_member(
	sg_email varchar2(40 char) primary key,
	sg_name varchar2(10 char) not null,
	sg_pw varchar2(15 char) not null,
	sg_gender varchar2(2 char) not null,
	sg_addr varchar2(200 char) not null,
	sg_photo varchar2(200 char) not null
);

select * from s_gallery_member;

select * from s_gallery_sns;
create table s_gallery_sns(
	sgs_no number(4) primary key,	
	sgs_owner varchar2(50 char) not null,	
	sgs_txt varchar2(300 char) not null,
	sgs_when date not null,
	constraint sns_writer 
		foreign key(sgs_owner) references s_gallery_member(sg_email)
		on delete cascade
);



create sequence s_gallery_sns_seq;
drop table s_gallery_sns_reply cascade constraint purge;

insert into s_gallery_sns values(s_gallery_sns_seq.nextval, 'hoijookim@gmail.com', 'ㅋㅋㅋㅋ', sysdate);
insert into s_gallery_sns values(101, 'asdf', 'ㅡㅡ', sysdate);
insert into s_gallery_sns values(102, 'mango', 'ㅎㅎ', sysdate);
insert into s_gallery_sns values(103, 'guaba', 'ㅇㅇ', sysdate);
insert into s_gallery_sns values(103, 'guaba1', 'ㅇㅇ', sysdate);

create table s_gallery_sns_reply(
	sgsr_no number(6) primary key,	
	sgsr_sgs_no number(4) not null,	
	sgsr_owner varchar2(50 char) not null,
	sgsr_txt varchar2(300 char) not null,
	sgsr_when date not null,
	constraint sns_reply foreign key(sgsr_sgs_no) references s_gallery_sns(sgs_no)
		on delete cascade,
	constraint sns_reply_owner foreign key(sgsr_owner) references s_gallery_member(sg_email)
		on delete cascade
);

create sequence s_gallery_sns_reply_seq;
select * from s_gallery_sns_reply;
