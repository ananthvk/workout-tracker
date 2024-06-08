import axios from "axios"
import { FormEvent, useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [loginToken, setLoginToken] = useLocalStorage("token", "")
    const navigate = useNavigate()
    useEffect(() => {
        // Check if the user has already logged in
        if (loginToken.length != 0) {
            // Check if the token is valid
            axios.get('http://localhost:3000/api/v1/user', { headers: { Authorization: `Bearer ${loginToken}` } })
                .then((res) => {
                    navigate('/')
                }).catch((err) => {
                    console.log(err)
                    setLoginToken("")
                })
        }
    }, [])

    const handleSubmit = (e: FormEvent) => {
        axios.post("http://localhost:3000/api/v1/token",
            { email: (e.target as any).email.value, password: (e.target as any).password.value })
            .then((res) => {
                setLoginToken(res.data.token)
                navigate('/')
            })
        e.preventDefault()
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder="email" name="email" />
            </div>
            <input type="password" placeholder="password" name="password" />
            <input type="submit" value="submit" />
        </form>
    </div>
}
export { LoginPage }