import Header from "./Header"
import { verifyTokenForPage } from "@/utils/verifyToken";
import { getToken } from "@/utils/generateToken";

export default async function HeaderServer() {
    const token = await getToken()
    const user = verifyTokenForPage(token)
    return <Header user={user}/>
}