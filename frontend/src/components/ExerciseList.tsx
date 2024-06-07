import { ReactNode } from "react";
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const ExerciseList = () => {
    const { data, error, isLoading } = useSWR("http://localhost:3000/api/v1/exercises", fetcher)
    if (error) return <div>Error while loading</div>
    if (isLoading) return <div>Loading...</div>
    const exerciseNodes: ReactNode[] = data.map((x: any) => <li key={x.id}>{x.name}</li>)

    return <>
        <div>
            Exercises here
            {status ? <p>{status}</p> : <ul>{exerciseNodes}</ul>}
        </div>
    </>
}
export default ExerciseList;