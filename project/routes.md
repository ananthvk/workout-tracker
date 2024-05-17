# API Routes for backend

All routes have to be prefixed with the version, i.e. 
`/api/v1`, etc.

```
- [x] GET /user - If logged in, return current user information with all details
- [x] POST /users - Create a new user
- [x] POST /token - Authenticates the user and returns a JWT
- [ ] PATCH /user/{user_id} - Modifies user details

- [ ] GET /profile/{profile_id} - Return the profile of a user

- [ ] GET /exercise/{exercise_id} - Return all details about an exercise
- [ ] POST /excercises - Create a new exercise
- [ ] PATCH /exercise/{exercise_id} - Change exercise details
- [ ] GET /exercises - Return all exercise ids, along with their name
- [ ] DELETE /exercise/{exercise_id} - Delete an exercise

- [ ] GET /list/{list_id} - Return an exercise list
- [ ] POST /lists - Create a new exercise list
- [ ] PATCH /lists/{list_id} - Modifies an exercise list
- [ ] DELETE /lists/{list_id} - Delete an exercise list

- [ ] GET /session/{session_id} - Return all exercises performed in one workout session
- [ ] POST /sessions - Create a new workout session and add exercises to it
- [ ] DELETE /session/{session_id} - Delete a workout session
- [ ] PATCH /session/{session_id} - Modify a workout session

```