import axios, { authenticatedInstance } from "../common/instance"
import { FormEvent, useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { useNavigate, Link } from "react-router-dom"

const LoginPage = () => {
    const [loginToken, setLoginToken] = useLocalStorage("token", "")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        // Check if the user has already logged in
        if (loginToken.length != 0) {
            // Check if the token is valid
            authenticatedInstance.get('user')
                .then((_) => {
                    navigate('/')
                }).catch((err) => {
                    console.log(err)
                    setLoginToken("")
                })
        }
    }, [])

    const handleSubmit = (e: FormEvent) => {
        axios.post("token",
            { email: (e.target as any).email.value, password: (e.target as any).password.value })
            .then((res) => {
                setLoginToken(res.data.token)
                navigate('/')
            }).catch((err) => {
                setMessage(err.response.data.message)
            })
        e.preventDefault()
    }
    return <div className="max-w-sm mx-auto flex flex-col p-8 my-10 border border-gray-200 rounded-lg">
        <div className="flex flex-row justify-center align-middle mb-8">
            <h2 className="text-3xl font-semibold text-gray-700 my-3">
                Login
            </h2>
        </div>
        <form onSubmit={handleSubmit} className="">
            <div className="mb-5 flex flex-col p-3">
                <label htmlFor="email" className="font-semibold">Email</label>
                <input required type="email" placeholder="abc@xyz.com" name="email" className="duration-700 focus:border focus:border-blue-400 outline-none bg-gray-50 border border-gray-200 text-gray-800 text-md font-medium rounded-lg p-3" />
            </div>
            <div className="mb-5 flex flex-col p-3">
                <label htmlFor="password" className="font-semibold">Password</label>
                <input required type="password" name="password" className="duration-700 focus:border focus:border-blue-400 outline-none bg-gray-50 border border-gray-200 text-gray-800 text-md font-medium rounded-lg p-3" />
            </div>
            <div className="flex flex-row justify-between align-middle">
                <Link to="/signup">
                    <input type="button" value="Create account" className="text-gray-800  bg-gray-50 p-2 rounded-lg hover:bg-gray-100 duration-500 font-semibold" />
                </Link>
                <input type="submit" value="Submit" className="text-white bg-blue-600 p-2 rounded-lg hover:bg-blue-700 duration-500 font-semibold" />
            </div>
            {message ? <p className="text-md text-red-700 text-center mt-5">{message}</p> : <></>}
        </form>
    </div>

}
export { LoginPage }