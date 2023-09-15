import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notification: null
}

const NotifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    NOTIFY(state, action){
        state.notification= action.payload.notify
    }
  }
});

export const {NOTIFY} = NotifySlice.actions
export const selectNotification= (state)=> state.notify.notification

export default NotifySlice.reducer