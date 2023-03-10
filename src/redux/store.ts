import { configureStore } from '@reduxjs/toolkit'
import filterSlice from "./reducer/filterSlice";
import cartSlice from "./reducer/cartSlice";
import pizzaSlice from "./reducer/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizza: pizzaSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store