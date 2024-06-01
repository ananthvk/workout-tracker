import requests
import pprint

API_BASE = "http://localhost:3000/api/v1"

password = "xdA8xfsd882F!"

# Reset the database
response = requests.post(
    f"{API_BASE}/reset-db",
)
print(response.json())


# Add a few muscle types
muscles = [
    "shoulder",
    "chest",
    "tricep",
    "forearm",
    "bicep",
    "quads",
    "hamstrings",
    "upper back",
]
for muscle in muscles:
    response = requests.post(f"{API_BASE}/category/muscles", json={"category": muscle})
    print(response.json())


# Add a few exercise types
types = ["cardio", "strength", "flexibility", "hiit"]
for type in types:
    response = requests.post(f"{API_BASE}/category/types", json={"category": type})
    print(response.json())

# Get all the muscles and types
muscles = requests.get(f"{API_BASE}/category/muscles").json()
types = requests.get(f"{API_BASE}/category/types").json()

# Build a dictionary with name - id mapping
muscle_dict = {}
for muscle in muscles:
    muscle_dict[muscle["category"]] = muscle["id"]

type_dict = {}
for type in types:
    type_dict[type["category"]] = type["id"]

# Add a few exercises
exercises = [
    {
        "name": "Lat pulldown",
        "exercise_types": [type_dict["strength"], type_dict["flexibility"]],
    },
    {
        "name": "Vertical row",
        "muscle_types": [
            muscle_dict["upper back"],
            muscle_dict["tricep"],
            muscle_dict["shoulder"],
        ],
        "exercise_types": [
            type_dict["cardio"],
            type_dict["flexibility"],
            type_dict["strength"],
        ],
    },
    {"name": "Dumbbel bench press"},
    {"name": "Bicep curls"},
]
exercise_ids = []
for exercise in exercises:
    response = requests.post(f"{API_BASE}/exercises", json=exercise)
    print(response.json())
    exercise_ids += [response.json()["exercise_id"]]

# Get details about a single exercise
response = requests.get(f"{API_BASE}/exercise/{exercise_ids[1]}")
pprint.pprint(response.json(), indent=2, sort_dicts=True)

# Create a workout session
# But before that, create an user
response = requests.post(
    f"{API_BASE}/users",
    json={"email": "yx@example.com", "password": password},
)
print(response.json())

# Get an authorization token
response = requests.post(
    f"{API_BASE}/token",
    json={"email": "yx@example.com", "password": password},
)
print(response.json())
token = response.json()["token"]

# Prepare the headers
headers = {"Authorization": f"Bearer {token}"}

# Get the email id of the user
response = requests.get(f"{API_BASE}/user", headers=headers)
print(response.json())

# Create a workout session
response = requests.post(
    f"{API_BASE}/sessions",
    headers=headers,
    json={
        "date_performed": "2024-06-01T15:24:00+05:30",
        "total_duration": "1:30",
    },
)
print(response.json())
session_id = response.json()["session_id"]

# Get the workout session
response = requests.get(
    f"{API_BASE}/session/{session_id}",
    headers=headers,
)
print(response.json())

# Add sets to a workout session
sets = [
    {"exercise_id": exercise_ids[0], "reps": 10,  "weight": 7},
    {"exercise_id": exercise_ids[0], "reps": 10, "weight": 10},
    {"exercise_id": exercise_ids[0], "reps": 10, "weight": 12},
    {"exercise_id": exercise_ids[1], "reps": 15, "duration": "1:30", "weight": 0},
    {"exercise_id": exercise_ids[1], "reps": 10, "duration": "0:45", "weight": 0},
    {"exercise_id": exercise_ids[2], "reps": 0, "duration": "1:20", "weight": 0},
]
for eset in sets:
    response = requests.post(
        f"{API_BASE}/session/{session_id}/sets", headers=headers, json=eset
    )
    print(response.json())

# Get all sets in the workout session
response = requests.get(
    f"{API_BASE}/session/{session_id}/sets", headers=headers
)
pprint.pprint(response.json())