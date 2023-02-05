import React from 'react';
import styles from './pagination.module.scss'
import ReactPaginate from "react-paginate";

interface IProps {
    onChangePage: (number: number) => void
}

const Pagination = ({onChangePage}: IProps) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..." 
            nextLabel=">"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
        />
    );
};

export default Pagination;