import React from 'react';
import {IPizza} from "../../models/IPizza";

import styles from './pizzaItem.module.scss'

interface IProps {
    pizza: IPizza
}

const PizzaItem = ({pizza}: IProps) => {
    return (
       <div className={styles.wrapper}>
           <img src={pizza.imageUrl} alt=""/>
           <h2 className={styles.title}>{pizza.title}</h2>
           <p className={styles.price}>от {pizza.price} ₽</p>
       </div>
    );
};

export default PizzaItem;