drop schema if exists public cascade;
create schema public;

create table person (
    id serial primary key,
    last_name varchar(100),
    middle_name varchar(100) default '',
    first_name varchar(100),
    date_of_birth date,
    address varchar(255) default '',
    phone varchar(20) default ''
);

create table student (
    id serial primary key,
    person_id integer not null,
    study_plan varchar(50),
    foreign key (person_id) references person(id) on delete cascade on update cascade 
);