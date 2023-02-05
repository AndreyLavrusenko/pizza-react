import {createSlice} from '@reduxjs/toolkit'
import {IPizza} from "../../models/IPizza";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {calcTotalCount} from "../../utils/calcTotalCount";


export interface CounterState {
    totalPrice: number,
    items: IPizza[],
    totalCount: number,
}

const data = localStorage.getItem('cart')

const initialState: CounterState = {
    totalPrice: data ? calcTotalPrice(JSON.parse(data)) : 0,
    totalCount: data ? calcTotalCount(JSON.parse(data)) : 0,
    items: data ? JSON.parse(data) : [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find(item => item.id === action.payload.id)

            if (findItem && findItem.count) {
                findItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }

            state.totalCount++
            state.totalPrice += action.payload.price
        },
        minusItem: (state, action) => {
            const findItem = state.items.find(item => item.id === action.payload.id)

            if (findItem && findItem.count) {
                if (findItem.count > 1) {
                    findItem.count--
                    state.totalCount--
                    state.totalPrice -= action.payload.price
                }
            }
        },
        removeItem: (state, action) => {
            const arr = state.items.filter(item => item.id === action.payload)

            // Изменяет цену после удаления одного товара
            const price = arr.reduce((sum, obj) => {
                // @ts-ignore
                return obj.price * obj.count + sum
            }, 0)

            // Изменяет общее количество товаров
            const quantity = arr.reduce((sum, obj) => {
                // @ts-ignore
                return obj.count + sum
            }, 0)

            state.totalCount -= quantity
            state.totalPrice -= price

            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearItem: (state) => {
            state.items.length = 0
            state.totalCount = 0
            state.totalPrice = 0
        }
    },
})


export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions

export default cartSlice.reducer