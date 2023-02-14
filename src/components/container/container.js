import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../header';
import Section from '../section';
import List from '../list';
import Form from '../form';

import './container.scss';

const sortRecords = (records) => {
    return records.sort((a, b) => {
        const nameA = a.recordName.toLowerCase(),
        nameB = b.recordName.toLowerCase();

        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
    });
}

const Container = () => {
    const [records, setRecords] = useState([]),
    [liveText, setLiveText] = useState('');

    useEffect(() => {
        axios.get('/api/records')
            .then(({ data }) => setRecords(sortRecords(data)))
    }, [])

    const onSubmit = (entry) => {
        axios.post('/api/records', entry)
            .then(({ data }) => {
                setRecords(sortRecords([...records, data]))
                setLiveText(`${ entry.recordName } successfully added.`)
            })
    };

    console.log(records)

    return (
        <Fragment>
            <Header />
            <main>
                <Section headingText='Add a new favourite' >
                    <Form onSubmit={ onSubmit } />
                </Section>
                <Section headingText='Records' >
                    <List records={ records } />
                </Section>
            </main>
            <div // type orca in terminal for testing accessibility features
                className='visually-hidden'
                aria-live='polite'
                aria-atomic='true' >
                { liveText }
            </div>
        </Fragment>
    )
};

export default Container;