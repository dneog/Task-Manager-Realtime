import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pogress: []
}

const FilterTaskSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_POGRESS(state,action){
        const { pogress, tasks}= action.payload
        let temp= []
        if(pogress=== 'All'){
          temp= tasks
        }else{
          temp = tasks.filter((product)=> product.pogress === pogress)
        }
        state.pogress= temp
    }
  }
});

export const {FILTER_BY_POGRESS} = FilterTaskSlice.actions
export const selectFilteredProducts= (state)=> state.filter.pogress

export default FilterTaskSlice.reducer