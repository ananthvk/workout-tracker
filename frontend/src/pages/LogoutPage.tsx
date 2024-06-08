import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts"


const LogoutPage = () => {
    const navigate = useNavigate()
    const [_, setLoginToken] = useLocalStorage("token", "")
    useEffect(() => {
        setLoginToken("")
        navigate('/')
    })
    return <></>
}
export { LogoutPage }