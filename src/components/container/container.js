import React, { Fragment, useState } from 'react';

import Header from '../header';
import Section from '../section';
import List from '../list';
import Form from '../form';

import './container.scss';

const Container = () => {
    const [records, setRecords] = useState([]),

    onSubmit = (entry) => {
        setRecords(
            [...records, entry].sort((a, b) => {
                if (a.recordName > b.recordName) return 1;
                if (a.recordName < b.recordName) return -1;
                return 0;
            }) // sorting array before setting it on state guaranty it's run ones when the state is calculated
        )
    };

    return (
        <Fragment>
            <Header />
            <main>
                <Section headingText='Add a new favourite'>
                    <Form onSubmit={ onSubmit } />
                </Section>
                <Section headingText='Records'>
                    <List records={ records } />
                </Section>
            </main>
        </Fragment>
    )
};

export default Container;