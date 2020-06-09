import React from 'react';

type SVGProps = {
    size: number;
    title: string;
    color: string;
};

export const Plus: React.FC<SVGProps> = (props) => {
    const { size, title, color } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
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
