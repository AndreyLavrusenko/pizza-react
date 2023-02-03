import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../common/Skeleton";
import {IPizza} from "../models/IPizza";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useAppDispatch, useAppSelector} from "../hook/redux";
import {setCategoryId, setSortType} from "../redux/reducer/filterSlice";


interface ISort {
    name: string,
    sort: string
}


const Home = () => {
    const {categoryId, sortType} = useAppSelector(state => state.filter)
    const dispatch = useAppDispatch()

    const [pizzas, setPizzas] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const {searchValue} = useContext(SearchContext)

    useEffect(() => {
        const getPizzas = async () => {
            setLoading(true)

            const search = searchValue ? 'search='+searchValue : ''
            let res = null

            if (searchValue) {
                res = await axios.get(`https://63dce73a2308e3e319f01eee.mockapi.io/items?page=${currentPage}&limit=4&${search}`)
            } else {
                res = await axios.get(`https://63dce73a2308e3e319f01eee.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sort}&order=desc`)
            }

            setPizzas(res.data)
            setLoading(false)
        }

        getPizzas()
    }, [categoryId, sortType, searchValue, currentPage])


    const onClickCategory = (id: number) => {
        setCurrentPage(1)
        dispatch(setCategoryId(id))
    }

    const onChangeSort = (sortType: ISort) => {
        setCurrentPage(1)
        dispatch(setSortType(sortType))
    }

    const pizzasList = pizzas
        // Поиск через фронт
        // .filter((obj: IPizza) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((pizza: IPizza) => (
        <PizzaBlock
            key={pizza.id}
            imageUrl={pizza.imageUrl}
            title={pizza.title}
            price={pizza.price}
            sizes={pizza.sizes}
            types={pizza.types}
        />
    ))



    const skeletonList = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort value={sortType} onChangeSort={onChangeSort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    loading ? skeletonList : pizzasList
                }
            </div>
            <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
        </div>
    );
};

export default Home;