import React from 'react';
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
    return (
        <div className="container">
            <h1 className={styles.not_found}>Такой страницы не существует : 404</h1>
        </div>
    );
};

export default NotFoundBlock;