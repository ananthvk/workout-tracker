# Workout tracker
The primary purpose of this application is to track and derive insights into workout data. After a workout, people do not usually record or track details about their workout, such as weights used, reps performed, or total workout time. These details are crucial to record progress. This app can help to provide details and suggestions to enable the user to reach their goal.

## Goals
- Ease of use and ability to add workout details quickly
- Ability to add new workouts not on the app
- Cross-platform: Web and mobile
- Analysis of data in the form of graphs, charts, and statistics
- Integration with fitness tracking apps (such as Google Fit)


## Tech stack
- Backend: Nodejs (fastify)
- Fronted: Svelte
- Deployment: Docker
- Database: PostgreSQL

## Requirements
### Create a new workout tracker page
Used to create new workouts for tracking.
This page should have a workout name (input field), types (multiple select), and field type (RepsWeight, Reps, Time, TimeCalories).

### Add workout info page
This page should enable the user to add details about a workout. Should record date-time added, date-time performed, fields depending on the workout (For example, reps and weights for dumbbell exercises).

### Workout catalog page
This page should show a list of exercises categorized into various sections, such as cardio/strength or upper body/lower body. There should be an option to search and filter exercises.

### Workout details page
This page should provide detailed information about a workout. Description of the workout, recommended reps, weights, and time are displayed. Additional information, such as age and health restrictions, are also shown. There should also be links to YouTube videos / GIFs to perform the workout.

There should also be an option to add the workout to the user's list of workouts.

### Create workout plans page
This page should have a form to create workout plans. It can be a session plan, daily plan, weekly plan, or monthly plan. There should be a facility to add any number of workouts in a single plan (along with the recommended reps/weights/time) and rest periods between each workout. The plan can be shareable with a link.
The app should list workout plans in various categories (lose weight, build muscle mass, cardiovascular endurance, etcetra). Users should be able to create custom plans for themselves.

### Start workout plan page
A user can start a workout session from this page. The app should display the workout to be performed by the user along with the required number of reps and weight. Timers have to be present to handle rest and workout durations. There should be an option to manually increase/decrease the rest timer, reps, and weights.

### Statistics page
This page should show information about number of days exercised, frequency of exercises, calendar with markings, etcetra. Also, make various interactive graphs and charts to display information.

Show a subset of these statistics on the home page.

### Authentication pages
Login page, logout page, and sign-up pages

### Extras
- Custom user-defined workout fields
- Developer account with API access
- Ability to export/import data
- Dark theme / light theme
- Add Google/Facebook Oauth support
- Password reset and recovery (send code via email)
- 2FA
- Google Analytics

## Task list
-[ ] Create the database models
-[ ] Create various workout trackers(Reps and weights) using DB tools.
-[ ] Create the add workout info page (tracking page), should work with a default user
-[ ] Create a page to view history about a single workout
-[ ] Create user login/logout pages (add signup later)
-[ ] Complete the add new workout page (admin only)
-[ ] Finish the workout catalog page(list all workouts in the app)
TODO