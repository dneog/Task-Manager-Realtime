import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    userName: null,
    userID: null,
    isLoggedIn: false,
    users: null
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_USER(state, action){
      
        state.isLoggedIn= true
        state.email= action.payload.email
        state.userName= action.payload.userName
        state.userID= action.payload.userID
    },

    REMOVE_USER(state, action){
      state.isLoggedIn= false
      state.email= null
      state.userName= null
      state.userID= null
    
    },
    STORE_USERS(state, action){
      state.users= action.payload.users
    }
  }
});

export const {SET_USER, REMOVE_USER, STORE_USERS} = AuthSlice.actions
export const selectUserName= (state)=> state.auth.userName
export const selectID= (state)=> state.auth.userID
export const selectemail= (state)=> state.auth.email
export const selectIsLoggedIn= (state)=> state.auth.isLoggedIn
export const selectUsers = (state)=> state.auth.users

export default AuthSlice.reducer