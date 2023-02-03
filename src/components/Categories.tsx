import React from 'react';

interface IProps {
    value: number
    onClickCategory: (id: number) => void
}

const Categories = ({value, onClickCategory}: IProps) => {
    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        className={index === value ? 'active' : ''}
                        key={index}
                        onClick={() => onClickCategory(index)}
                    >{category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;