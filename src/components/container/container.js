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

const Container = ({ setShowApp }) => {
    const [records, setRecords] = useState([]),
    [liveText, setLiveText] = useState(''),
    isMounted = useRef(true);

    useEffect(() => {
        axios.get('/api/records').then(({ data }) => {
            if (isMounted) setRecords(sortRecords(data))
        })
        return () => {
            isMounted.current = false
        }
    }, [])

    const onSubmit = (entry) => {
        axios.post('/api/records', entry).then(({ data }) => {
            if (isMounted) {
                setRecords(sortRecords([...records, data]))
                setLiveText(`${ entry.recordName } successfully added.`)
            }
        })
        setShowApp(false)
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

const Wrapper = () => { // force to unmount component
    const [showApp, setShowApp] = useState(true);
    return showApp && <Container setShowApp={ setShowApp } />
}

export default Wrapper;