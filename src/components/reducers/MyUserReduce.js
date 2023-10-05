import cookie from "react-cookies";

const MyUserReduce = (currentState, action) => {
    switch (action.Type) {
        case "login":
            return action.payload
        case "logout":
            cookie.remove('token')
            cookie.remove('user')
            return null
        default:
    }

    return currentState
}

export default MyUserReduce