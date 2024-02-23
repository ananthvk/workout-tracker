-- Create a database called wtracker
create table if not exists usr(
    id bigserial primary key,
    name text not null,
    email text not null unique,
    password text not null,
    salt text not null
);

create table if not exists workout(
    id bigserial primary key,
    name text not null,
    description text
);

create table if not exists field_type(
    id bigserial primary key,
    name text not null
);

create index if not exists field_type_name_index ON field_type(name);

create table if not exists tracker(
    id bigserial primary key,
    field_type_id bigint references field_type(id) on delete restrict,
    usr_id bigint references usr(id) on delete cascade,
    workout_id bigint references workout(id) on delete restrict
);

create table if not exists workout_log(
    id bigserial primary key,
    date_added timestamp with time zone not null default now(),
    date_peformed timestamp with time zone not null default now(),
    tracker_id bigint references tracker(id) on delete cascade,
    usr_id bigint references usr(id) on delete cascade
);

create table if not exists workout_set(
    id bigserial primary key,
    time_field interval,
    number_field1 integer,
    number_field2 integer,
    workout_log_id bigint references workout_log(id) on delete cascade
);
