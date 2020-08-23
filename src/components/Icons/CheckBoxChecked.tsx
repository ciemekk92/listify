import React from 'react';
import { SVG } from '../../types';

export const CheckBoxChecked: React.FC<SVG> = (props) => {
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
                points="352 176 217.6 336 160 272"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
        </svg>
    );
};
