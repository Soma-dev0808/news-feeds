import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/configureStore';
import { fetchNews } from '../services/newsService';

import type { GetQueryParamsObj, News } from '../utils/types';

interface NewsListState {
    isFetching: boolean,
    newsList: News[] | null;
    error: any;
};

const initialState: NewsListState = {
    isFetching: false,
    newsList: null,
    error: null,
};

const fetchNewsList = createAsyncThunk<{ newsList: News[]; }, { searchParamObj: GetQueryParamsObj; }>(
    'newsList/FetchNewsList',
    async ({ searchParamObj }) => {
        const res = await fetchNews(searchParamObj);
        return { newsList: res.articles };
    }
);


export const newsListSlice = createSlice({
    name: 'newsList',
    initialState,
    reducers: {
        setFavListNews: (state, action: PayloadAction<News[]>) => {
            state.newsList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsList.pending, (state) => {
                state.isFetching = true;
                state.newsList = [];
                state.error = null;
            })
            .addCase(fetchNewsList.fulfilled, (state, action) => {
                state.isFetching = false;
                state.newsList = action.payload.newsList;
            })
            .addCase(fetchNewsList.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.error;
            });
    }
});

const selectNewsList = (state: RootState) => state.newsListState;

const { setFavListNews } = newsListSlice.actions;
type SetFavListNews = typeof setFavListNews;

export { selectNewsList, fetchNewsList, setFavListNews };
export type { SetFavListNews };
export default newsListSlice.reducer;