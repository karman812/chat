import * as axios from "axios";
import React from 'react';


export const getData = (obj) => {
    return axios.get(`/rooms/${obj.roomId}`)
}
export const redirect = (obj) => {
    axios.post(`/rooms`,obj)
}