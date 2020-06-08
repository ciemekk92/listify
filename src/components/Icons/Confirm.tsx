import React from 'react';

type SVGProps = {
    size: number;
    title: string;
    color: string;
};

export const Confirm: React.FC<SVGProps> = (props) => {
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
                points="416 128 192 384 96 288"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32px"
            />
        </svg>
    );
};
