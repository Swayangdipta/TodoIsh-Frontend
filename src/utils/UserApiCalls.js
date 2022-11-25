import axios from "axios"

const backend = process.env.REACT_APP_API

export const getUserInfo = (userId) => {
    return axios.get(`${backend}/user/${userId}`).then(response=>response.data).catch(e=>e)
}