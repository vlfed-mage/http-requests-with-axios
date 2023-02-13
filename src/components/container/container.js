import React, { Fragment } from 'react';
import Header from '../header';
import Section from '../section';
import List from '../list';
import Form from '../form';
import './container.scss';

const Container = () => (
    <Fragment>
        <Header />
        <main>
            <Section headingText='Add a new favourite'>
                <Form />
            </Section>
            <Section headingText='Records'>
                <List />
            </Section>
        </main>
    </Fragment>
);

export default Container;