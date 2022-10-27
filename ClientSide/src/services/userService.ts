import axios from "axios";
import jwt_decode from "jwt-decode";
import { User } from "../interfaces/User";

const api: string = process.env.REACT_APP_API || "";

// Add New User
export const signup = (newUser: User): Promise<any> => {
  return axios.post(`${api}register`, newUser);
};

// Signin
export const signin = (user: User): Promise<any> => {
  return axios.post(`${api}login`, user);
};

// Get User Details
export const getUser = (): Promise<any> => {
  return axios.get(`${api}profile`, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

// Get "Biz" payload from token
export const getBiz = () => {
  return (jwt_decode(sessionStorage.getItem("token") as string) as any).biz;
};

// Get "UserId" payload from token
export const getUserId = () => {
  return (jwt_decode(sessionStorage.getItem("token") as string) as any)._id;
};
export const getMyUserDetails = ():Promise<any>=>{
  return axios.get(`${api}profile`, {
      headers:{
          Authorization: sessionStorage.getItem('token') as string
      }
  })
}