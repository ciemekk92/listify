import React from 'react';
import { SVG } from '../../types/SVG';

export const CheckBoxEmpty: React.FC<SVG> = (props) => {
    const { size, title, color } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 512 512"
        >
            <title>{title}</title>
            <rect
                x="64"
                y="64"
                width="384"
                height="384"
                rx="48"
                ry="48"
                fill="none"
                stroke={color}
                strokeLinejoin="round"
                strokeWidth="32px"
            />
        </svg>
    );
};
