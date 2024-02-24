-- Populate the database with some initial data

-- Firstly, we shall create three users for the database
insert into usr(name, email, password, salt) values ('Foo', 'foo@example.com', 'password', 'dev');
insert into usr(name, email, password, salt) values ('Bar', 'bar@example.com', 'password2', 'dev');
insert into usr(name, email, password, salt) values ('Bob', 'bob@bob.com', 'password3', 'dev');

-- Create a few workout_type s
insert into workout_type(name) values('cardio');
insert into workout_type(name) values('strength');
insert into workout_type(name) values('flexibility');
insert into workout_type(name) values('hiit');
insert into workout_type(name) values('stretch');

-- Create a few muscle target types
insert into muscle(name) values('abs');
insert into muscle(name) values('biceps');
insert into muscle(name) values('triceps');
insert into muscle(name) values('shoulder');
insert into muscle(name) values('chest');
insert into muscle(name) values('forearms');
insert into muscle(name) values('upper back');
insert into muscle(name) values('lower back');
insert into muscle(name) values('quads');
insert into muscle(name) values('glutes');
insert into muscle(name) values('calves');
insert into muscle(name) values('overall');

-- Create a few workouts
insert into workout(name, description) values('Push Up', 'The push-up is a common calisthenics exercise beginning from the prone position. By raising and lowering the body using the arms, push-ups exercise the pectoral muscles, triceps, and anterior deltoids.');
insert into workout(name, description) values('Bicep curls', 'A bicep curl usually starts with the arm in a fully extended position, holding a weight with a supinated (palms facing up) grip. A full repetition consists of bending or "curling" the elbow until it is fully flexed, then slowly lowering the weight to the starting position');
insert into workout(name, description) values('Treadmill', 'A treadmill is a device generally used for walking, running, or climbing while staying in the same place');

-- Populate many-to-many join tables for workout

-- For pushup, add strength and flexibility
insert into workout_type_workout_relation(workout_id, workout_type_id) values (1, 2);
insert into workout_type_workout_relation(workout_id, workout_type_id) values (1, 3);
-- For bicep curls, add strength
insert into workout_type_workout_relation(workout_id, workout_type_id) values (2, 2);
-- For treadmill, add cardio
insert into workout_type_workout_relation(workout_id, workout_type_id) values (3, 1);

-- For pushup, add triceps, abs, chest
insert into muscle_workout_relation(workout_id, muscle_id) values (1, 3);
insert into muscle_workout_relation(workout_id, muscle_id) values (1, 1);
insert into muscle_workout_relation(workout_id, muscle_id) values (1, 5);

-- For bicep curls, add bicep
insert into muscle_workout_relation(workout_id, muscle_id) values (2, 2);

-- For treadmill, add overall
insert into muscle_workout_relation(workout_id, muscle_id) values (3, (SELECT id FROM muscle WHERE name LIKE 'overall'));

-- Create few field types for tracker
insert into field_type(name) values('Reps');
insert into field_type(name) values('RepsWeight');
insert into field_type(name) values('TimeWeight');
insert into field_type(name) values('TimeCalories');
insert into field_type(name) values('TimeDistance');

-- Create a few trackers for the first user
insert into tracker(field_type_id, usr_id, workout_id) values (1, 1, 1);
insert into tracker(field_type_id, usr_id, workout_id) values (2, 1, 2);
-- insert into tracker(field_type_id, user_id, workout_id) values (5, 1, 3);

-- Create a workout log for pushup, and bicep curls
insert into workout_log(tracker_id, usr_id) values (1, 1);
insert into workout_log(tracker_id, usr_id) values (2, 1);

-- Add sets to the created workout log
insert into workout_set(workout_log_id, number_field1) values(1, 10);
insert into workout_set(workout_log_id, number_field1) values(1, 10);
insert into workout_set(workout_log_id, number_field1) values(1, 8);

insert into workout_set(workout_log_id, number_field1, number_field2) values(2, 10, 7);
insert into workout_set(workout_log_id, number_field1, number_field2) values(2, 10, 7);
insert into workout_set(workout_log_id, number_field1, number_field2) values(2, 12, 5);

