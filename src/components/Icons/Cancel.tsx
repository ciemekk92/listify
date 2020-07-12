import React from 'react';
import { SVG } from '../../types/SVG';

export const Cancel: React.FC<SVG> = (props) => {
    const { size, title, color } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 512 512"
        >
            <title>{title}</title>
            <line
                x1="368"
                y1="368"
                x2="144"
                y2="144"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
            <line
                x1="368"
                y1="144"
                x2="144"
                y2="368"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
        </svg>
    );
};
