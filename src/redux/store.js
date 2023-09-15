import authReducer from "./slice/AuthSlice";
import PostReducer from "./slice/PostSlice";
import FilterTaskReducer from "./slice/FilterTaskSlice";
import NotifyReducer from "./slice/NotifySlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducers= combineReducers({
    auth: authReducer,
    tasks: PostReducer,
    filter: FilterTaskReducer,
    notify: NotifyReducer,
  
})

const store= configureStore({
    reducer: rootReducers

})

export default store