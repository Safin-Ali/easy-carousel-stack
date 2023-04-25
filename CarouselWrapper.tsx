import React from 'react';
import './style/carousel-style.css';

interface Props {
    children: React.ReactElement
}

function CarouselWrapper({
    children,
}:Props) {
    return (<div className={`carousel-wrapper`}>
        {children}
    </div>
    )
};

export default CarouselWrapper;