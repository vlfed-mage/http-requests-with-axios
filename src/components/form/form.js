import React, { useState } from 'react';

import Input from '../input';

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
            <Input
                labelText='Record name'
                value={ recordName }
                onChange={ onChangeHandler }
                name='recordName' />
            <Input
                labelText='Artist name'
                value={ artistName }
                onChange={ onChangeHandler }
                name='artistName' />
            <Input
                type='textarea'
                labelText='Description'
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