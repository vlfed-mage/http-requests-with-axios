import React, { useState } from 'react';

const initialEntryState = {
    recordName: '',
    artistName: '',
    description: ''
};

const Form = ({ onSubmit }) => {
    const [entry, setEntry] = useState(initialEntryState),
    { recordName, artistName, description } = entry,

    onChangeHandler = ({ target }) => {
        const { name, value } = target;

        setEntry({
           ...entry,
           [name]: value
        });
    },

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { recordName, artistName } = entry;

        if (!recordName || !artistName) {
            return;
        }

        onSubmit({ ...entry }); // pass a new object for preventing accidental modifying component's state
        setEntry(initialEntryState);
    };

    return (
        <form onSubmit={ onSubmitHandler } >
            <label
                htmlFor='recordName' >
                Record name
            </label>
            <input
                id='recordName'
                value={ recordName }
                onChange={ onChangeHandler }
                name='recordName' />
            <label
                htmlFor='artistName' >
                Artist name
            </label>
            <input
                id='artistName'
                value={ artistName }
                onChange={ onChangeHandler }
                name='artistName' />
            <label
                htmlFor='description' >
                Description
            </label>
            <textarea
                id='description'
                value={ description }
                onChange={ onChangeHandler }
                name='description' />
            <button
                type='submit'>
                Add
            </button>
        </form>
    );
};

export default Form;