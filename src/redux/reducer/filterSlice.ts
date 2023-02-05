import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ISort {
    name: string,
    sort: string
}

export interface CounterState {
    categoryId: number,
    sortType: ISort,
    currentPage: number,
}

const initialState: CounterState = {
    categoryId: 0,
    currentPage: 1,
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
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sortType = action.payload.sortProperty
        }
    },
})

export const {setCategoryId, setSortType, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer