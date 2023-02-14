const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
const port = 5000;

const records = [
    {
        id: 1,
        recordName: 'React Rave',
        artistName: 'The Developers',
        description: 'A rocking good rave bopping to the tune of JavaScript',
    },
    {
        id: 2,
        recordName: 'Building an App',
        artistName: 'The Components',
        description: 'Sounds of the future.',
    },
];

app.get('/api/records', (req, res) => {
    res.send(records)
});

app.post('/api/records', (req, res) => {
    const newRecord = {
        ...req.body,
        id: records.reduce((acc, curr) => {
            return curr.id > acc ? curr.id : acc;
        }, 0) + 1
    };
    records.push(newRecord);
    res.send(newRecord);
})

app.listen(port, () => {
    console.log(`Server listening with port ${port}`)
});