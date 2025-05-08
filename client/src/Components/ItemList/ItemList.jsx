import React, { useState, useEffect, useRef } from 'react';
import './ItemList.css';
import testData from "../Assets/test.json";
import ProductItem from "../ProductItem/ProductItem";

export default function ItemList() {
    const containerRef = useRef(null);
    const itemWidth = 200; // adjust to your card width + margin
    const rows = 3;

    const [columns, setColumns] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate columns on resize
    useEffect(() => {
        const updateColumns = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const cols = Math.max(1, Math.floor(width / itemWidth));
            setColumns(cols);
        };
        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const itemsPerPage = columns * rows;
    const totalPages = Math.ceil(testData.length / itemsPerPage);

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = testData.slice(startIdx, startIdx + itemsPerPage);

    const goToPage = (page) => {
        const p = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(p);
    };

    const handlePrev = () => goToPage(currentPage - 1);
    const handleNext = () => goToPage(currentPage + 1);

    return (
        <div className="cont">
            <div className="info">ElectroMart - Products</div>

            <div className="item-list-container" ref={containerRef}>
                {currentItems.map((item, idx) => (
                    <div className="item-wrapper" key={startIdx + idx}>
                        <ProductItem
                            image={item.image}
                            name={item.name}
                            price={parseInt(item.price)}
                            quantity={item.quantity}
                        />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => goToPage(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
}
