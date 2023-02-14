import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../header';
import Section from '../section';
import List from '../list';
import Form from '../form';

import './container.scss';

const sortRecords = records =>
    records.sort((a, b) => {
        if (a.recordName > b.recordName) return 1;
        if (a.recordName < b.recordName) return -1;
        return 0;
    });

const Container = () => {
    const [records, setRecords] = useState([]),
    [liveText, setLiveText] = useState('');

    useEffect(() => {
        axios.get('/api/records')
            .then(({ data }) => setRecords(sortRecords(data)))
        // {
        //     "data": [
        //         {
        //             "recordName": "React Rave",
        //             "artistName": "The Developers",
        //             "description": "A rocking good rave bopping to the tune of JavaScript"
        //         },
        //         {
        //             "recordName": "Building an App",
        //             "artistName": "The Components",
        //             "description": "Sounds of the future."
        //         }
        //     ],
        //     "status": 200,
        //     "statusText": "OK",
        //     "headers": {
        //         "content-length": "230",
        //         "content-type": "application/json; charset=utf-8",
        //         "date": "Tue, 14 Feb 2023 13:36:04 GMT",
        //         "etag": "W/\"e6-xN0m3GArtAdj5F2IWPBNU3BYwCY\"",
        //         "vary": "Accept-Encoding",
        //         "x-powered-by": "Express"
        //     },
        //     "config": {
        //         "transitional": {
        //             "silentJSONParsing": true,
        //             "forcedJSONParsing": true,
        //             "clarifyTimeoutError": false
        //         },
        //         "adapter": [
        //             "xhr",
        //             "http"
        //         ],
        //         "transformRequest": [
        //             null
        //         ],
        //         "transformResponse": [
        //             null
        //         ],
        //         "timeout": 0,
        //         "xsrfCookieName": "XSRF-TOKEN",
        //         "xsrfHeaderName": "X-XSRF-TOKEN",
        //         "maxContentLength": -1,
        //         "maxBodyLength": -1,
        //         "env": {},
        //         "headers": {
        //             "Accept": "application/json, text/plain, */*"
        //         },
        //         "method": "get",
        //         "url": "/api/records"
        //     },
        //     "request": {}
        // }
    }, [])

    const onSubmit = (entry) => {
        setRecords(
            sortRecords([...records, entry]) // sorting array before setting it on state guaranty it's run ones when the state is calculated
        );
        setLiveText(`${ entry.recordName } successfully added.`)
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