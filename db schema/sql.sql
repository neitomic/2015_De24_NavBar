create schema `2015_de24_navbar`;
use `2015_de24_navbar`;
create table Menu (
	id int auto_increment primary key,
    title nvarchar(100),
    link nvarchar(100),
    parent_menu_id int references Menu(id)
);
insert into menu (title, link) values ('Home', '');
insert into menu (title, link) values ('Products', '');
insert into menu (title, link, parent_menu_id) values ('Product 1', '', 2);
insert into menu (title, link, parent_menu_id) values ('Product 2', '', 2);
insert into menu (title, link, parent_menu_id) values ('Sub Product 1.1', '', 3);
insert into menu (title, link, parent_menu_id) values ('Sub Product 1.2', '', 3);
insert into menu (title, link, parent_menu_id) values ('Sub Product 2.1', '', 4);
insert into menu (title, link, parent_menu_id) values ('Sub Product 2.2', '', 4);
insert into menu (title, link) values ('Contact', '');
insert into menu (title, link) values ('About', '');