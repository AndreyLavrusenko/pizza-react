import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ISort} from "../../pages/Home";

interface IPizzas {
    searchValue: string
    search: string
    currentPage: number
    categoryId: number
    sortType: ISort
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (params: IPizzas, thunkApi) => {
        const {searchValue, search, currentPage, categoryId, sortType} = params
        let res = null

        if (searchValue) {
            res = await axios.get(`https://63dce73a2308e3e319f01eee.mockapi.io/items?page=${currentPage}&limit=4&${search}`)
        } else {
            res = await axios.get(`https://63dce73a2308e3e319f01eee.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sort}&order=desc`)
        }


        return res.data
    }
)

interface IPizza {
    id: string
}

export const fetchOnePizza = createAsyncThunk('pizza/fetchPizza', async (params: IPizza) => {
    const {id} = params

    const {data} = await axios.get(`https://63dce73a2308e3e319f01eee.mockapi.io/items/${id}`)

    return data
})