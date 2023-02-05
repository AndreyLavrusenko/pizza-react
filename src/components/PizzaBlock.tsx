import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hook/redux";
import {addItem} from "../redux/reducer/cartSlice";
import {NavLink} from "react-router-dom";


interface IProps {
    title: string,
    id: number,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
}

const pizzaType: any = {0: 'Тонкое', 1: 'Традиционное'}

const PizzaBlock = ({title, price, imageUrl, sizes, types, id}: IProps) => {
    const [activeSize, setActiveSize] = useState(0)
    const [activeType, setActiveType] = useState(0)

    const cartItem = useAppSelector(state => state.cart.items.find(obj => obj.id === id))


    const dispatch = useAppDispatch()


    const onAddHandler = () => {
        const productObj = {
            id,
            title,
            price,
            imageUrl,
            types: pizzaType[activeType],
            sizes: sizes[activeSize],
        }

        dispatch(addItem(productObj))
    }

    return (
        <div  className="pizza-block-wrapper">
            <div className="pizza-block">
                <NavLink to={`pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                </NavLink>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type: number, index: number) => (
                            <li
                                key={index}
                                onClick={() => setActiveType(index)}
                                className={index === activeType ? 'active' : ""}
                            >{pizzaType[type]}
                            </li>
                        ))}

                    </ul>
                    <ul>
                        {sizes.map((size, index) => {
                            return <li
                                className={index === activeSize ? 'active' : ''}
                                key={index}
                                onClick={() => setActiveSize(index)}
                            >{size} см.
                            </li>
                        })}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button onClick={onAddHandler} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        <i>{cartItem?.count ? cartItem.count : 0}</i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;