drop schema if exists `2015_de24_navbar`;
create schema `2015_de24_navbar`;
use `2015_de24_navbar`;
create table users (
	username varchar(50) primary key,
    password varchar(256) not null,
    menu_html text,
    css_properties text,
    remember_token varchar(100)
);
insert into users (username, password, menu_html, css_properties) values ('admin', 'admin', null, null);