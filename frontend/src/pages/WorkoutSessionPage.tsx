import { FormEvent } from "react"
import { authenticatedInstance } from "../common/instance";

const CreateWorkoutSessionPage = () => {
    const handleSubmit = (e: FormEvent) => {
        authenticatedInstance.post('sessions',
            {
                date_performed: (e.target as any).date_performed.value,
                total_duration: (e.target as any).total_duration.value
            }).then(_ => {
                // TODO: Add a popup instead
                alert("session added");
            }).catch(err => {
                alert("could not add session ")
                console.log(err)
            })
        e.preventDefault();
    }
    return <div>
        New session
        <form onSubmit={handleSubmit}>
            <input type="date" name="date_performed" defaultValue={new Date().toISOString().substring(0, 10)} required />
            <input type="text" name="total_duration" />
            <input type="submit" value="Add" />
        </form>
    </div>
}
export { CreateWorkoutSessionPage }