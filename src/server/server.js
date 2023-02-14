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
})

app.listen(port, () => {
    console.log(`Server listening with port ${port}`)
});