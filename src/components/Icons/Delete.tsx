import React from 'react';
import { SVG } from '../../types/SVG';

export const Delete: React.FC<SVG> = (props) => {
    const { size, title, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 512 512"
        >
            <title>{title}</title>
            <path
                d="M432,144,403.33,419.74A32,32,0,0,1,371.55,448H140.46a32,32,0,0,1-31.78-28.26L80,144"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
            <rect
                x="32"
                y="64"
                width="448"
                height="80"
                rx="16"
                ry="16"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
            <line
                x1="312"
                y1="240"
                x2="200"
                y2="352"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
            <line
                x1="312"
                y1="352"
                x2="200"
                y2="240"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
        </svg>
    );
};
