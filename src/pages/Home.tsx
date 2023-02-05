import React, {useContext, useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {category} from "../components/Sort";
import Skeleton from "../common/Skeleton";
import {IPizza} from "../models/IPizza";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import qs from 'qs';
import {useAppDispatch, useAppSelector} from "../hook/redux";
import {setCategoryId, setCurrentPage, setSortType, setFilters} from "../redux/reducer/filterSlice";
import {useNavigate} from "react-router-dom";


interface ISort {
    name: string,
    sort: string
}



const Home = () => {
    const {categoryId, sortType, currentPage} = useAppSelector(state => state.filter)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const [pizzas, setPizzas] = useState([])
    const [loading, setLoading] = useState(true)

    const {searchValue} = useContext(SearchContext)

    // Парсит url и достает от туда объекты которые передает в redux для загрузки нужных данных
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = category.find(item => item.sort === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sortProperty: sort
            }))

            isSearch.current = true
        }
    }, [])

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

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false

    }, [categoryId, sortType, searchValue, currentPage])


    // Записывает данные из state в url строку
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sort,
                categoryId,
                currentPage: currentPage
            })

            navigate(`?${queryString}`)
        }

        isMounted.current = true

    }, [categoryId, sortType, searchValue, currentPage])


    const onClickCategory = (id: number) => {
        dispatch(setCurrentPage(1))
        dispatch(setCategoryId(id))
    }

    const onChangeSort = (sortType: ISort) => {
        dispatch(setCurrentPage(1))
        dispatch(setSortType(sortType))
    }

    const pizzasList = pizzas
        // Поиск через фронт
        // .filter((obj: IPizza) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((pizza: IPizza) => (
        <PizzaBlock
            key={pizza.id}
            id={pizza.id}
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
            <Pagination onChangePage={(number: number) => dispatch(setCurrentPage(number))} />
        </div>
    );
};

export default Home;