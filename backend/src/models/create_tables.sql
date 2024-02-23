-- Create a database called wtracker

-- Holds login information of a user
create table if not exists usr(
    id bigserial primary key,
    name text not null,
    email text not null unique,
    password text not null,
    salt text not null
);

-- Contains information regarding a single workout
-- Say a pushup, or squat or any other exercise
create table if not exists workout(
    id bigserial primary key,
    name text not null,
    description text
);

-- Type of field, Rep&Weight, Rep&Time, Time&Calories, etc
create table if not exists field_type(
    id bigserial primary key,
    name text not null
);

create index if not exists field_type_name_index ON field_type(name);

-- A tracker is created by the user to track a particular exercise
-- I decided to keep the tracker separate from workout model, since a user may want
-- to customize tracking, such as changing the input fields, etc
-- This also allows the user to create multiple trackers for a single workout
create table if not exists tracker(
    id bigserial primary key,
    field_type_id bigint references field_type(id) on delete restrict,
    usr_id bigint references usr(id) on delete cascade,
    workout_id bigint references workout(id) on delete restrict
);

-- This table stores details about a single exercise
create table if not exists workout_log(
    id bigserial primary key,
    date_added timestamp with time zone not null default now(),
    date_peformed timestamp with time zone not null default now(),
    tracker_id bigint references tracker(id) on delete cascade,
    usr_id bigint references usr(id) on delete cascade
);

-- Contains information about a single set
create table if not exists workout_set(
    id bigserial primary key,
    time_field interval,
    number_field1 integer,
    number_field2 integer,
    workout_log_id bigint references workout_log(id) on delete cascade
);

-- TODO: Implement workout lists
-- Enable users to create custom workouts
-- Have a is_created_by_admin boolean flag in the models to 
-- differentiate between user created ones