drop schema if exists public cascade;
create schema public;

create table person (
    id serial primary key,
    last_name varchar default '',
    middle_name varchar default '',
    first_name varchar default '',
    date_of_birth date default null,
    address varchar default '',
    phone varchar default ''
);

create table student (
    id serial primary key,
    person_id integer not null,
    study_plan varchar default '',
    foreign key (person_id) references person(id) on delete cascade on update cascade 
);