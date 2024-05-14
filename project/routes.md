# API Routes for backend

All routes have to be prefixed with the version, i.e. 
`/api/v1`, etc.

```
GET /user/{user_id} - Return user information (If logged in, extra details such as email id)
PATCH /user/{user_id} - Modifies user details
POST /users - Create a new user
POST /token - Authenticates the user and returns a JWT

GET /exercise/{exercise_id} - Return all details about an exercise
POST /excercises - Create a new exercise
PATCH /exercise/{exercise_id} - Change exercise details
GET /exercises - Return all exercise ids, along with their name
DELETE /exercise/{exercise_id} - Delete an exercise

GET /list/{list_id} - Return an exercise list
POST /lists - Create a new exercise list
PATCH /lists/{list_id} - Modifies an exercise list
DELETE /lists/{list_id} - Delete an exercise list

GET /session/{session_id} - Return all exercises performed in one workout session
POST /sessions - Create a new workout session and add exercises to it
DELETE /session/{session_id} - Delete a workout session
PATCH /session/{session_id} - Modify a workout session

```