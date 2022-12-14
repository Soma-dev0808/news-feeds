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
    origin: process.env.ALLOW_CORS,
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/news-feeds', async (req, res) => {
    const q = req.query.q as string;
    const from = req.query.from as string;
    const sortBy = req.query.sortBy as string;
    const language = req.query.language as string;

    const newsFeeds: NewsFetchResult = await getNewsFeeds({
        q,
        from,
        sortBy,
        language,
    });

    if (newsFeeds.status !== 'ok') {
        res.status(500).send("Internal server error");
        throw new Error("Internal server error");
    }
    res.send(newsFeeds);
});

app.get('/news-feeds/content', async (req, res) => {
    const urlForContent = req.query.contentUrl as string;

    if (urlForContent) {
        const news = await getNewsContent(urlForContent);
        const response = {
            status: 'ok',
            newsContent: news
        };
        res.send(response);
        return;
    }

    res.status(404).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

