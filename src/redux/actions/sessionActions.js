import axios from 'axios';
import {CATCH_JWT} from "../../config/Constants";
import {CLEAR_AUTH, REGISTER_DRIVER, SESSION_LOGIN, SESSION_LOGOUT} from "../constants";


export const login = (email, password) => async (dispatch) => {
    await dispatch({
        type: SESSION_LOGIN,
        payload: axios.post(`/api/v1/catch/driver-login`, {email, password})
    })

};


export const registerCoroporate = (data) => async (dispatch) => {
    await dispatch({
        type: REGISTER_DRIVER,
        payload: axios.post(`/api/v1/catch/create-corporate-user`, data)
    });
};

export const clearAuthToken = () => {
    if (localStorage.getItem(CATCH_JWT)) {
        localStorage.removeItem(CATCH_JWT);
    }
};
export const clearAuthentication = () => (dispatch) => {
    clearAuthToken();
    dispatch({
        type: CLEAR_AUTH
    });
};

export const logout = () => dispatch => dispatch({type: SESSION_LOGOUT});
