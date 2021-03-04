import {getData} from "../api/api";

const SET_USERS = 'SET-USERS'
const SET_DATA = 'SET-DATA'
const JOINED = 'JOINED'
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'


const initialState = {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
}

let chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOINED: {
            let copyState = {
                ...state,
                joined: true,
                userName: action.obj.userName,
                roomId: action.obj.roomId,
            }
            return copyState
        }
        case SET_DATA: {
            let copyState = {
                ...state,
                users: action.data.users,
                messages: action.data.messages.reverse(),
            };
            return copyState
        }
        case SET_USERS: {
            let copyState = {
                ...state,
                users: action.users,
            }
            return copyState
        }
        case ADD_NEW_MESSAGE: {
            let copyState = {
                ...state,
                messages: [action.message, ...state.messages],
            }
            return copyState
        }
        default:
            return state

    }
}
export const setUsers = (users) =>{
    return {
        type: SET_USERS,
        users
    }
}
export const setData = (data) =>{
    return {
        type: SET_DATA,
        data
    }
}
export const setJoined = (obj) =>{
    return {
        type: JOINED,
        obj
    }
}
export const addNewMessage = (message) =>{
    return {
        type: ADD_NEW_MESSAGE,
        message
    }
}

export const setDataThunkCreator = (obj) =>{
    return  async (dispatch) =>{
        let {data} = await getData(obj)
        dispatch(setData(data))
    }
}

export default chatReducer