import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                className={`px-4 py-2 ml-2 flex justify-start rounded ${currentPage === 1 ?
                    'bg-zinc-800' : 'bg-red-600 text-white'
                    }`}
                onClick={handlePrevious}
                disabled={currentPage === 1}>
                قبلی
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 rounded ${currentPage === page ?
                        'bg-red-600 text-white' : 'bg-zinc-800'
                        }`}
                    onClick={() => setCurrentPage(page)}  >
                    {page}
                </button>
            ))}
            <button
                className={`px-4 py-2 rounded ${currentPage === totalPages ?
                    'bg-zinc-800' : 'bg-red-600 text-white'
                    }`}
                onClick={handleNext}
                disabled={currentPage === totalPages} >
                بعدی
            </button>
        </div>
    );
};

export default Pagination;
