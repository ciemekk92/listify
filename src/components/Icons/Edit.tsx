import React from 'react';

const Edit = (props: { title: string; size: number; color: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size}
            height={props.size}
            viewBox="0 0 512 512"
        >
            <title>{props.title}</title>
            <circle
                cx="256"
                cy="256"
                r="32"
                fill="none"
                stroke={props.color}
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
                stroke={props.color}
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
                stroke={props.color}
                style={{
                    strokeMiterlimit: 10,
                    strokeWidth: '32px'
                }}
            />
        </svg>
    );
};

export default Edit;
