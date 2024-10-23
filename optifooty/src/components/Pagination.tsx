import React from 'react';
import './Pagination.css';

interface PaginationProps {
    totalPlayers: number;
    playersPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalPlayers,
    playersPerPage,
    currentPage,
    setCurrentPage,
}) => {
    const totalPages = Math.ceil(totalPlayers / playersPerPage);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const page = Number(event.currentTarget.id);
        setCurrentPage(page);
    };

    const showPaginationNumbers = () => {
        const paginationNumbers = [];
        const showMax = 3;
        let endPage;
        let startPage;

        if (totalPages <= showMax) {
            startPage = 1;
            endPage = totalPages;
        } else {
            startPage = currentPage;
            if (startPage !== totalPages && (startPage + 1) !== totalPages) {
                endPage = currentPage + showMax - 1;
            } else {
                endPage = totalPages;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationNumbers.push(i);
        }

        return showRenderPageNumbers(paginationNumbers);
    };

    const showRenderPageNumbers = (paginationNumbers: number[]) => {
        return paginationNumbers.map(number => (
            <li className="page-item" key={number}>
                <a
                    className={`page-link${currentPage === number ? ' active' : ''}`}
                    id={number.toString()}
                    onClick={handleClick}
                >
                    {number}
                </a>
            </li>
        ));
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="pagination">
            <button
                className="first-button"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
            >
                First
            </button>
            <button
                className="prev-button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {showPaginationNumbers()}
            <button
                className="next-button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
            <button
                className="last-button"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;