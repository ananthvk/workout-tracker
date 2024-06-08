import { ReactNode } from "react";
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default () => {
    const { data, error, isLoading } = useSWR("http://localhost:3000/api/v1/exercises", fetcher)
    if (error) return <div>Error while loading</div>
    if (isLoading) return <div>Loading...</div>
    const exerciseNodes: ReactNode[] = data.map((x: any) => {
        return <div key={x.id}
            className="text-lg text-gray-800 h-auto max-w-full rounded-lg p-3 duration-500 hover:shadow-lg hover:bg-gray-100">
            <p className="text-center font-semibold text-lg">
                {x.name}
            </p>
            <img src={x.image_url} className="rounded-lg"/>
        </div>
    })

    return <>
        <h2 className="text-center text-4xl font-bold text-gray-800 my-8">
            Exercises
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">{exerciseNodes}</div>
    </>
}