import React, { Fragment, useState, useEffect, useRef } from 'react';
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
    [liveText, setLiveText] = useState(''),
    isMounted = useRef(true);

    useEffect(() => {
        ( async () => {
            const { data } = await axios.get('/api/records', {
                headers: {
                    'Cache-Control': 'private',
                    'X-Custom-Value': 'some-value'
                }
            })
            if (isMounted) {
                setRecords(sortRecords(data))
            }
        })();
        return () => {
            isMounted.current = false
        }
    }, [])

    const onSubmit = async (entry) => {
        const { data } = await axios.post('/api/records', entry);
        if (isMounted) {
            setRecords(sortRecords([...records, data]))
            setLiveText(`${ entry.recordName } successfully added.`)
        }
    };

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