import React, {memo, useEffect, useRef, useState} from 'react';
import {ISort} from "../pages/Home";


interface IProps {
    value: ISort,
    onChangeSort: (obj: ISort) => void
}

export const category: ISort[] = [
    {name: 'популярности', sort: 'rating'},
    {name: 'цене', sort: 'price'},
    {name: 'алфавиту', sort: 'title'},
]

const Sort = memo(({value, onChangeSort}: IProps) => {
    const [popup, setPopup] = useState(false)

    const sortRef = useRef(null)

    // Скрывает окошко по клику вне этого окна
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            let path = event.composedPath().includes(sortRef.current);
            if (!path) setPopup(false);
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, [])

    const changeCategoryHandler = (obj: ISort) => {
        onChangeSort(obj)
        setPopup(false)
    }

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label" onClick={() => setPopup(prev => !prev)}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span>{value.name}</span>
            </div>
            {popup &&
                <div className="sort__popup">
                    <ul>
                        {category.map((obj, index) => {
                            return (
                                <li
                                    onClick={() => changeCategoryHandler(obj)}
                                    className={obj.sort === value.sort ? 'active' : ""}
                                    key={index}
                                >{obj.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }

        </div>
    );
});

export default Sort;