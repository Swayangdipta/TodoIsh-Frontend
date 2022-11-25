import axios from "axios"

const backend = process.env.REACT_APP_API


export const loginUser = (input) => {
    return axios.post(`${backend}/login`,input,{
        Accept: "application/json",
        "Content-Type": "application/json",
        data: {
            email: input.email,
            password: input.password
        }
    }).then(response => {
        return response.data
    }).catch(err => {
        console.log(err);
        return err
    })
}

export const registerUser = input => {
    return axios.post(`${backend}/register`,input,{
        Accept: "application/json",
        "Content-Type": "application/json"
    }).then(response => {
        return response.data
    }).catch(err=>{
        console.log(err);
        return err
    })
}

export const logoutUser = () => {
    return axios.get(`${backend}/logout`).then(response => response.data).catch(e=>e)
}