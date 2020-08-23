import React from 'react';
import { SVG } from '../../types';

export const ArrowUp: React.FC<SVG> = (props) => {
    const { size, title, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 512 512"
        >
            <title>{title}</title>
            <polyline
                points="112 244 256 100 400 244"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
            <line
                x1="256"
                y1="120"
                x2="256"
                y2="412"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
        </svg>
    );
};
