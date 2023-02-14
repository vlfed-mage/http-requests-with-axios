import React, { useRef } from 'react';
import uniqid from 'uniqid';

const Input = ({ type, labelText, ...props }) => {
    const { current } = useRef(uniqid());

    return (
        <>
            <label htmlFor={ current } >
                { labelText }
            </label>
            { type === 'textarea'
                ? <textarea { ...props }/>
                : <input { ...props }/>
            }
        </>
    );
};

export default Input;