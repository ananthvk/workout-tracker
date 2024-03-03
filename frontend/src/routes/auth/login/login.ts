import { PUBLIC_API_BASE_URL } from "$env/static/public";

const hasUserLoggedIn = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
        try {
            const response = await fetch(`${PUBLIC_API_BASE_URL}/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            });
            const json: any = await response.json();
            if (json.verified) {
                return true;
            }
        } catch (err) {
            console.log(err)
        }
    }
    return false;
}
export { hasUserLoggedIn };