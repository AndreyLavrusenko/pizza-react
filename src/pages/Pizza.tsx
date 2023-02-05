import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hook/redux";
import {fetchOnePizza} from "../redux/actions/pizzaActions";
import PizzaItem from "../components/PizzaItem/PizzaItem";


const Pizza = () => {
    const {id} = useParams()
    const location = useLocation()

    const {pizza, status} = useAppSelector(state => state.pizza)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePizza({id}))
        }
    }, [])

    if (status === 'loading') return <h2 style={{textAlign: "center"}}>Загрузка</h2>
    if (status === 'error') return <h2 style={{textAlign: "center"}}>При загрузке данных произошла ошибка</h2>


    return (
        <div className="container">
            <PizzaItem pizza={pizza} />
        </div>
    );


};

export default Pizza;