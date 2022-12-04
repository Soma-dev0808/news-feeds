import * as http from 'http';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { getNewsContent, getNewsFeeds } from './service/fetchNewsFeeds';
import { NewsFetchResult } from './utils/types';
import cors from 'cors';

dotenv.config();

const app = express();

const port = process.env.PORT_NUMBER || 5001;

var corsOptions = {
    origin: 'http://127.0.0.1:5173',
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/news-feeds', async (req, res) => {
    const newsFeeds: NewsFetchResult = await getNewsFeeds();

    if (newsFeeds.status !== 'ok') {
        res.status(500).send("Internal server error");
        throw new Error("Internal server error");
    }
    res.send(newsFeeds);
});

app.get('/news-feeds/content', async (req, res) => {
    const newsFeeds: NewsFetchResult = await getNewsFeeds();

    if (newsFeeds.status !== 'ok') {
        res.status(500).send("Internal server error");
        throw new Error("Internal server error");
    }

    if (newsFeeds.articles.length) {
        const news = await getNewsContent(newsFeeds.articles[0].url);
        const response = {
            status: 'ok',
            newsContent: news
        };
        res.send(response);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

