import axios from "axios"

const backend = process.env.REACT_APP_API

export const createTodo = (input,userId,token) => {
    return axios.post(`${backend}/todo/create/${userId}`,input,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        return response.data
    }).catch(err => {
        return err
    })
}

export const getTodo = todoId => {
    return axios.get(`${backend}/todo/${todoId}`).then(response => response.data).catch(e=>e)
}

export const removeTodo = (todoId,userId,token) => {
    return axios.delete(`${backend}/todo/delete/${userId}/${todoId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.data).catch(e=>e)
}