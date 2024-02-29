import { PUBLIC_API_BASE_URL } from "$env/static/public";
const fetchWorkout = async (id: any) => {
    const response = await fetch(`${PUBLIC_API_BASE_URL}/workout/${id}`);
    if (response.status >= 400 && response.status < 600) {
        throw new Error(`Error ${response.status}`);
    }
    const data = await response.json();
    return data;
};
export {fetchWorkout};