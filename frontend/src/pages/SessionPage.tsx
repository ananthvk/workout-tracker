import { useParams } from "react-router-dom";
import useSWR from "swr";
import { authenticatedInstance } from "../common/instance";

const fetcher = (url: string) => authenticatedInstance.get(url).then((res) => res.data)

const SessionPage = () => {
    let { id } = useParams();
    let { data, error, isLoading } = useSWR(`session/${id}/sets`, fetcher)
    if (error) return <div>Error while loading</div>
    if (isLoading) return <div>Loading...</div>

    return <div>

        {data.map((x: any) => <div key={x.id}>
            {x.exercise_id}, {x.weight} kg, {x.reps}
        </div>)}
    </div>
}
export { SessionPage }