export const authenticate = data => {
    if(typeof window !== "undefined"){
        localStorage.setItem("User",JSON.stringify(data))
        return true
    }else{
        return false
    }
}

export const isAuthenticated = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("User")){
            return JSON.parse(localStorage.getItem("User"))
        }else{
            return false
        }
    }else{
        return false
    }
}

export const removeAuthentication = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("User")){
            localStorage.removeItem("User")
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}