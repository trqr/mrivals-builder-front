import { useRef } from 'react';
import './HomeCard.css';

const HomeCard = ({ children, width, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)', backgroundColor = 'rgba(42, 42, 64, 0.8)' }) => {
    const divRef = useRef(null);

    const handleMouseMove = e => {
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
        divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            style={{ width: width, backgroundColor: backgroundColor }}
            className={`card-spotlight ${className}`}
        >
            {children}
        </div>
    );
};


export default HomeCard;
