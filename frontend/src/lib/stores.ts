import { writable, type Writable } from 'svelte/store';
import { PUBLIC_API_BASE_URL } from "$env/static/public";
interface Workout {
    id: number,
    name: string
};

export let workoutList: Writable<Array<Workout>> = writable();

// fetchWorkouts contains the promise of the executed fetch
const fetchWorkouts = (async () => {
    const response = await fetch(`${PUBLIC_API_BASE_URL}/workouts`);
    const data = await response.json();
    workoutList.set(data)
    return true;
})();

export { fetchWorkouts };
