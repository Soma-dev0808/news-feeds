import * as http from 'http';
import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT_NUMBER || 5001;

app.get('/', (req, res) => {
    res.send('Successful response.');
    console.log('ssss');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

