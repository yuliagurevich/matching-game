import React from 'react';

import './style.css';

const Card = ({ card, index, isTurned, onClick }) => {
    return (
        <div
            className="card"
            onClick={() => onClick(index)}
        >
            {isTurned ? card : "X"}
        </div>);
}

export default Card;