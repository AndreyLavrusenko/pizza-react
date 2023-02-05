import React from 'react'
import preloader from '../../assets/img/spinner_blue.svg'
import styles from './preloader.module.scss'


const Preloader = () => {
    return (
        <img className={styles.preloader} src={preloader} alt="Index"/>
    )
}

export default Preloader