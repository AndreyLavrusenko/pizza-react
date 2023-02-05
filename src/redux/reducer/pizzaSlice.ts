import {createSlice} from '@reduxjs/toolkit'
import {IPizza} from "../../models/IPizza";
import {fetchOnePizza, fetchPizzas} from "../actions/pizzaActions";

export interface CounterState {
    items: IPizza[],
    pizza: IPizza,
    status: string,
}

const initialState: CounterState = {
    items: [],
    pizza: {} as IPizza,
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending.toString()]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled.toString()]: (state, action) => {
            state.status = 'success'
            state.items = action.payload
        },
        [fetchPizzas.rejected.toString()]: (state) => {
            state.status = 'error'
            state.items = []
        },

        [fetchOnePizza.pending.toString()]: (state) => {
            state.pizza = {} as IPizza
            state.status = 'loading'
        },
        [fetchOnePizza.fulfilled.toString()]: (state, action) => {
            state.status = 'success'
            state.pizza = action.payload
        },
        [fetchOnePizza.rejected.toString()]: (state) => {
            state.status = 'error'
            state.pizza = {} as IPizza
        },

    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer