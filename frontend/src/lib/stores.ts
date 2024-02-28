import { writable, type Writable } from 'svelte/store';

interface Workout{
    id: number,
    name: string
};

export let workoutList:Writable<Array<Workout>> = writable();

const fetchWorkouts = async () => {
    const response = await fetch("http://localhost:3000/api/v1/workouts");
    const data = await response.json();
    workoutList.set(data)
    return true;
}

export {fetchWorkouts};
