import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ISort {
    name: string,
    sort: string
}

export interface CounterState {
    categoryId: number,
    sortType: ISort
}

const initialState: CounterState = {
    categoryId: 0,
    sortType: {
        name: 'популярности',
        sort: 'rating',
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSortType: (state, action: PayloadAction<ISort>) => {
            state.sortType = action.payload
        }
    },
})

export const {setCategoryId, setSortType} = filterSlice.actions

export default filterSlice.reducer