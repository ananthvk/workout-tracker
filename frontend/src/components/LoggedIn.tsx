import React from "react"
import { useLocalStorage } from "usehooks-ts"
const IsLoggedIn = ({ children }: { children: React.ReactNode }) => {
    const [loginToken, _] = useLocalStorage("token", "")
    return <div>
        {loginToken ? children : <></>}
    </div>
}
const IsNotLoggedIn = ({ children }: { children: React.ReactNode }) => {
    const [loginToken, _] = useLocalStorage("token", "")
    return <div>
        {loginToken ? <></> : children}
    </div>
}
export { IsLoggedIn, IsNotLoggedIn }