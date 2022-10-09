create database aseguradora;

use aseguradora;

create table Ordenes(

    ord_id int auto_increment primary key not null,
    ord_cli varchar(50) not null,
    ord_num varchar(10) not null,
    ord_dir varchar(40) not null,
    ord_mod varchar(30) not  null,
    ord_mar varchar(20) not  null,
    key(ord_cli)

);