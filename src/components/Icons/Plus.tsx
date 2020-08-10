import React from 'react';
import { SVG } from '../../types/SVG';

export const Plus: React.FC<SVG> = (props) => {
    const { size, title, color, style } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={style}
        >
            <title>{title}</title>
            <line
                x1={size / 2}
                y1={size * 0.21875}
                x2={size / 2}
                y2={size * 0.78125}
                fill="none"
                stroke={color}
                style={{
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '2px'
                }}
            />
            <line
                x1={size * 0.78125}
                y1={size / 2}
                x2={size * 0.21875}
                y2={size / 2}
                stroke={color}
                style={{
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '2px'
                }}
            />
        </svg>
    );
};
