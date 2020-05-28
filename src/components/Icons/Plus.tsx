import React from 'react';

const Plus = (props: { title: string; size: number; color: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size}
            height={props.size}
            viewBox={`0 0 ${props.size} ${props.size}`}
        >
            <title>{props.title}</title>
            <line
                x1={props.size / 2}
                y1={props.size * 0.21875}
                x2={props.size / 2}
                y2={props.size * 0.78125}
                fill="none"
                stroke={props.color}
                style={{
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '2px'
                }}
            />
            <line
                x1={props.size * 0.78125}
                y1={props.size / 2}
                x2={props.size * 0.21875}
                y2={props.size / 2}
                stroke={props.color}
                style={{
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '2px'
                }}
            />
        </svg>
    );
};

export default Plus;
