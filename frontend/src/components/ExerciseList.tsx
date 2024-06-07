import { ReactNode, useEffect, useState } from "react";
import useSWR from 'swr';
import axios from "axios";

const ExerciseList = () => {
    const [exercises, setExercises] = useState<Array<object>>([])
    const [status, setStatus] = useState<string>("")

    useEffect(() => {
        setStatus('Loading')
        axios.get('http://localhost:3000/api/v1/exercises').then((response) => {
            setStatus('')
            setExercises(response.data)
        }).catch((err) => {
            console.log(err)
            setStatus('Error while loading data')
        })
    }, [])
    const exerciseNodes: ReactNode[] = exercises.map((x) => <li key={x.id}>{x.name}</li>)

    return <>
        <div>
            Exercises here
            {status ? <p>{status}</p> : <ul>{exerciseNodes}</ul>}
        </div>
    </>
}
export default ExerciseList;