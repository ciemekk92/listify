import React from 'react';
import { SVG } from '../../types/SVG';

export const Tags: React.FC<SVG> = (props) => {
    const { size, title, color, style } = props;
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={style}
        >
            <title>{title}</title>
            <path
                d="M0 10v-8l2-2h8l10 10-10 10-10-10zM4.5 6c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5v0c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5v0z"
                fill={color}
            />
        </svg>
    );
};
