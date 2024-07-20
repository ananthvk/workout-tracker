import { FormEvent, useEffect } from "react"
import { authenticatedInstance } from "../common/instance";
import useSWR from "swr";

const fetcher = (url: string) => authenticatedInstance.get(url).then((res) => res.data)

const CreateWorkoutSessionPage = () => {

    const { data, error, isLoading } = useSWR("sessions", fetcher)

    if (error) return <div>Error while loading</div>
    if (isLoading) return <div>Loading...</div>

    const pastSessions = data.map((x: any) => <div key={x.id}><a href={`/session/${x.id}`}>{x.date_performed}</a></div>)

    const handleSubmit = (e: FormEvent) => {
        authenticatedInstance.post('sessions',
            {
                date_performed: (e.target as any).date_performed.value,
                total_duration: (e.target as any).total_duration.value
            }).then(_ => {
                // TODO: Add a popup instead_
                alert("session added");
            }).catch(err => {
                alert("could not add session ")
                console.log(err)
            })
        e.preventDefault();
    }
    return <div className="flex flex-col p-2">
        <div className="p-2 mb-3">
            <h2 className="fg-gray-800 text-xl font-bold mb-3">
                New session
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="date" name="date_performed" defaultValue={new Date().toISOString().substring(0, 10)} required  className="duration-700 focus:border focus:border-blue-400 outline-none bg-gray-50 border border-gray-200 text-gray-800 text-md font-medium p-2 rounded-lg mr-3"/>
                <input type="text" name="total_duration" placeholder="Duration" className="duration-700 focus:border focus:border-blue-400 outline-none bg-gray-50 border border-gray-200 text-gray-800 text-md font-medium rounded-lg p-2 mr-3"/>
                <input type="submit" value="Add" className="text-white bg-blue-600 px-3 py-2 rounded-lg hover:bg-blue-700 duration-500 font-semibold"/>
            </form>
        </div>
        <h2 className="fg-gray-800 text-xl font-bold">
            Past sessions
        </h2>
        <div>
            {pastSessions}
        </div>
    </div>
}
export { CreateWorkoutSessionPage }