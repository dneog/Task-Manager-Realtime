import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    task: []
}

const PostSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    STORE_TASKS(state, action){
        state.task= action.payload.tasks
      }
  }
});

export const {STORE_TASKS} = PostSlice.actions
export const selectTasks= (state)=> state.tasks.task

export default PostSlice.reducer