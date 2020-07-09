import React from 'react';
import { SVG } from '../../types/SVG';

export const Edit: React.FC<SVG> = (props) => {
    const { size, title, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 512 512"
        >
            <title>{title}</title>
            <circle
                cx="256"
                cy="256"
                r="32"
                fill="none"
                stroke={color}
                style={{
                    strokeMiterlimit: 10,
                    strokeWidth: '32px'
                }}
            />
            <circle
                cx="416"
                cy="256"
                r="32"
                fill="none"
                stroke={color}
                style={{
                    strokeMiterlimit: 10,
                    strokeWidth: '32px'
                }}
            />
            <circle
                cx="96"
                cy="256"
                r="32"
                fill="none"
                stroke={color}
                style={{
                    strokeMiterlimit: 10,
                    strokeWidth: '32px'
                }}
            />
        </svg>
    );
};
