import Cookies from "js-cookie"


const getUser = () => Cookies.get("username")

const getUserId = () => Cookies.get("user_id")

const removeUser = () => {
    Cookies.remove("username")
    Cookies.remove("user_id")
}


export { getUser, removeUser, getUserId }