import React from 'react';
import { SVG } from '../../types';

export const Edit: React.FC<SVG> = (props) => {
    const { size, title, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
        >
            <title>{title}</title>
            <path
                d="M12.3 3.7l4 4-12.3 12.3h-4v-4l12.3-12.3zM13.7 2.3l2.3-2.3 4 4-2.3 2.3-4-4z"
                fill={color}
            />
        </svg>
    );
};
